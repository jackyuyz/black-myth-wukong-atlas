import { isDeepStrictEqual } from "node:util";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { z } from "zod";
import {
  chapterSchema,
  licenseLabels,
  mediaSchema,
  sourceSchema,
} from "../src/types/schema";
export function validateData(
  input: { chapters: unknown[]; sources: unknown; media: unknown },
  checkFiles = false,
) {
  const sources = z.record(sourceSchema).parse(input.sources);
  const media = z.record(mediaSchema).parse(input.media);
  const chapters = z.array(chapterSchema).length(6).parse(input.chapters);
  const fail = (message: string): never => {
    throw new Error(message);
  };
  const checkRefs = (value: unknown) => {
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      if (key === "sources" || key === "evidenceSourceIds") {
        for (const ref of child as string[]) {
          if (!sources[ref]) fail(`无法解析来源：${ref}`);
        }
      }
      if (child && typeof child === "object") checkRefs(child);
    }
  };
  const mediaRef = (ref: string) => {
    if (!media[ref]) fail(`缺少素材：${ref}`);
  };
  /**
   * Both language columns ship together. Every `xxxZh` needs an `xxxEn`
   * beside it that is actually a translation, so an English page can never
   * go out half-written or padded with copied Chinese. `numeralZh` is the one
   * exception: English derives its chapter ordinal from `order`.
   */
  const checkTranslations = (value: unknown, where: string) => {
    if (Array.isArray(value))
      return value.forEach((item) => checkTranslations(item, where));
    if (!value || typeof value !== "object") return;
    const record = value as Record<string, unknown>;
    for (const [key, child] of Object.entries(record)) {
      const stem = key.slice(0, -2);
      if (key.endsWith("Zh") && key !== "numeralZh") {
        const twin = record[`${stem}En`];
        if (twin === undefined) fail(`缺少英文字段：${where} ${stem}En`);
        if (Array.isArray(child)) {
          if (!Array.isArray(twin) || twin.length !== child.length)
            fail(`中英文条目数不一致：${where} ${key}`);
        } else if (twin === child) fail(`英文字段未翻译：${where} ${key}`);
      }
      if (key.endsWith("En") && record[`${stem}Zh`] === undefined)
        fail(`缺少中文字段：${where} ${stem}Zh`);
      if (child && typeof child === "object") checkTranslations(child, where);
    }
  };
  for (const [key, item] of Object.entries(media)) {
    if (!["cleared", "public-domain"].includes(item.licenseStatus))
      fail(`素材未经许可：${key}`);
    if (item.provenanceType.startsWith("original-") && !item.firstParty)
      fail(`原创素材缺少归属：${key}`);
    if (
      item.provenanceType === "generated" &&
      (item.documentary ||
        !item.generator ||
        !item.generationDate ||
        !item.promptSummary ||
        !item.reviewedByHuman)
    )
      fail(`生成素材元数据或审核缺失：${key}`);
    if (item.documentary && !item.sourceUrl) fail(`纪实素材缺少出处：${key}`);
    if (!licenseLabels[item.license]) fail(`许可缺少中英文展示标签：${key}`);
    if (item.file.includes("..")) fail(`素材路径不安全：${key}`);
    if (checkFiles && !existsSync(resolve("public", "." + item.file)))
      fail(`素材文件缺失：${item.file}`);
    checkRefs(item);
    checkTranslations(item, `素材 ${key}`);
  }
  for (const [key, source] of Object.entries(sources))
    checkTranslations(source, `来源 ${key}`);
  const allIds = new Set<string>();
  const orders = new Set<number>();
  for (const chapter of chapters) {
    if (allIds.has(chapter.id) || orders.has(chapter.order))
      fail("章节编号重复");
    allIds.add(chapter.id);
    orders.add(chapter.order);
    checkRefs(chapter);
    checkTranslations(chapter, `章节 ${chapter.id}`);
    mediaRef(chapter.atmosphereMediaId);
    const permitted =
      chapter.mapMode === "schematic"
        ? ["verified-high-level", "verified-markers"].includes(
            chapter.topologyStatus,
          )
        : chapter.topologyStatus === "verified-markers";
    if (
      !permitted &&
      (chapter.anchors.length ||
        chapter.areas.length ||
        chapter.routes.length ||
        chapter.mapMediaId ||
        chapter.markers.some((m) => m.position))
    )
      fail(`未核验地图不能带坐标或路线：${chapter.id}`);
    if (permitted) {
      if (!chapter.topologyLog || !chapter.mapMediaId)
        fail("地图缺少拓扑记录或底图");
      if (checkFiles && !existsSync(chapter.topologyLog!))
        fail("拓扑记录不存在");
      mediaRef(chapter.mapMediaId!);
      const map = media[chapter.mapMediaId!];
      if (
        map.assetRole !== "chapter-map" ||
        map.mapMode !== chapter.mapMode ||
        map.topologyStatus !== chapter.topologyStatus
      )
        fail("地图素材与章节核验状态不一致");
      if (
        chapter.mapMode === "schematic" &&
        (!["路线示意图", "非地理比例", "非官方地图"].every((t) =>
          chapter.mapNoticeZh.includes(t),
        ) ||
          !["route diagram", "not to geographic scale", "not an official map"].every(
            (t) => chapter.mapNoticeEn.toLowerCase().includes(t),
          ))
      )
        fail("缺少完整地图说明");
    }
    const ids = new Set<string>();
    for (const marker of chapter.markers) {
      if (ids.has(marker.id)) fail("标记编号重复");
      ids.add(marker.id);
      if (
        !marker.layers.includes("game") ||
        marker.layers.includes("journey-to-the-west") !==
          !!marker.journeyToTheWest ||
        marker.layers.includes("real-world") !== !!marker.realWorld?.length
      )
        fail("内容层标签与正文不一致");
      if (!marker.journeyToTheWest && !marker.noDirectNovelZh)
        fail("缺少原著关系说明");
      marker.game.mediaIds?.forEach(mediaRef);
      marker.game.mediaIds?.forEach((ref) => {
        if (
          !media[ref].documentary ||
          media[ref].assetRole !== "game-reference" ||
          media[ref].provenanceType !== "game-capture"
        )
          fail("游戏配图必须是已授权的实机画面素材");
      });
      if (marker.journeyToTheWest) {
        const novel = marker.journeyToTheWest;
        const excerptSource = sources[novel.excerptSourceId];
        if (!excerptSource) fail(`原著摘引来源无法解析：${novel.excerptSourceId}`);
        if (!novel.sources.includes(novel.excerptSourceId))
          fail("原著摘引来源必须列入原著来源");
        if (excerptSource.type !== "primary-text")
          fail("原著摘引必须指向原始文本");
        novel.mediaIds?.forEach(mediaRef);
        novel.mediaIds?.forEach((ref) => {
          if (
            !media[ref].documentary ||
            !["historical-documentary", "historical-analogue"].includes(
              media[ref].assetRole,
            )
          )
            fail("原著配图必须是历史图像素材");
        });
      }
      for (const heritage of marker.realWorld ?? []) {
        if (
          heritage.confidence === "confirmed" &&
          ["visual-comparison", "community-theory"].includes(
            heritage.evidenceType,
          )
        )
          fail("视觉猜测不能标为已确认");
        if (
          heritage.relationship === "developer-confirmed" &&
          heritage.evidenceType !== "developer-statement"
        )
          fail("开发者确认必须有开发者证据");
        heritage.mediaIds?.forEach(mediaRef);
        heritage.mediaIds?.forEach((ref) => {
          if (
            !media[ref].documentary ||
            media[ref].assetRole !== "heritage-documentary"
          )
            fail("遗产配图必须是纪实素材");
        });
      }
    }
    for (const anchor of chapter.anchors) {
      if (ids.has(anchor.id)) fail("连接点编号重复");
      ids.add(anchor.id);
    }
    if (checkFiles && permitted) {
      const topology = JSON.parse(readFileSync(chapter.topologyLog!, "utf8"));
      const actualNodes = [
        ...chapter.markers
          .filter((m) => m.position)
          .map((m) => ({ id: m.id, name: m.nameZh, position: m.position })),
        ...chapter.anchors.map((a) => ({
          id: a.id,
          name: a.nameZh,
          position: a.position,
        })),
      ];
      if (
        actualNodes.length !== topology.nodes.length ||
        actualNodes.some(
          (node) =>
            !topology.nodes.some(
              (n: any) =>
                n.id === node.id &&
                n.name === node.name &&
                JSON.stringify(n.position) === JSON.stringify(node.position),
            ),
        )
      )
        fail("地图节点与已复核线框不一致");
      const expectedEdges = topology.edges.map((e: any) => ({
        from: e.fromId,
        to: e.toId,
        kind: e.kind,
        mode: e.mode,
        sources: e.sources,
        ...(e.label ? { labelZh: e.label } : {}),
        ...(e.condition ? { conditionZh: e.condition } : {}),
      }));
      // Translations of a label are not route semantics: strip them, then
      // compare node order, branching, mode and sources exactly as before.
      const actualEdges = chapter.routes.map(
        ({ labelEn, conditionEn, ...edge }) => edge,
      );
      if (!isDeepStrictEqual(actualEdges, expectedEdges))
        fail("地图连线与已复核线框不一致");
    }
    for (const edge of chapter.routes) {
      if (
        ![edge.from, edge.to].every(
          (id) =>
            chapter.markers.some((m) => m.id === id && m.position) ||
            chapter.anchors.some((a) => a.id === id),
        )
      )
        fail("路线端点缺少有效标记");
    }
  }
  if (checkFiles) {
    const allowed = new Set(Object.values(media).map((m) => m.file));
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = `${dir}/${entry.name}`;
        if (entry.isDirectory()) walk(path);
        else if (!allowed.has(path.slice("public".length)))
          fail(`未登记的公开素材：${path}`);
      }
    };
    walk("public");
  }
  return { chapters, sources, media };
}
export function loadData() {
  const read = (path: string) => JSON.parse(readFileSync(path, "utf8"));
  return {
    chapters: Array.from({ length: 6 }, (_, i) =>
      read(`src/data/chapters/chapter-0${i + 1}.json`),
    ),
    sources: read("src/data/sources.json"),
    media: read("src/data/media.json"),
  };
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const data = validateData(loadData(), true);
  console.log(
    `数据校验通过：${data.chapters.length} 回，${data.chapters.reduce((sum, c) => sum + c.markers.length, 0)} 张阅读卡；引用、地图与素材权限有效。`,
  );
}
