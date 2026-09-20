import { z } from "zod";
const zh = z
  .string()
  .min(1)
  .regex(/[\u3400-\u9fff]/, "应包含中文");
const id = z.string().regex(/^[a-z0-9-]+$/);
const refs = z.array(z.string().regex(/^[WGHFL]\d{2,3}$/)).min(1);
const position = z
  .object({ x: z.number().min(0).max(1), y: z.number().min(0).max(1) })
  .strict();
export const typeLabels = {
  location: "地点",
  character: "人物",
  boss: "妖王与头目",
  architecture: "建筑",
  item: "器物",
  story: "故事",
} as const;
export const layerLabels = {
  game: "游戏",
  "journey-to-the-west": "《西游记》",
  "real-world": "现实文化遗产",
} as const;
export const confidenceLabels = {
  confirmed: "已确认",
  "high-confidence": "高可信",
  probable: "可能相关",
  speculative: "仅视觉推测",
  unknown: "尚未核实",
} as const;
export const evidenceLabels = {
  "developer-statement": "开发者资料",
  "government-source": "政府公开资料",
  "museum-source": "博物馆资料",
  "heritage-source": "文保机构资料",
  "academic-source": "学术资料",
  "visual-comparison": "视觉对照",
  "community-theory": "社区推测",
} as const;
export const sourceLabels = {
  "primary-text": "古籍原文",
  "game-guide": "游戏资料",
  "government-source": "政府 / 文博资料",
  "developer-statement": "开发者资料",
  "museum-source": "博物馆资料",
  "academic-source": "学术资料",
} as const;
export const sourceSchema = z
  .object({
    titleZh: zh,
    publisherZh: zh,
    url: z.string().url(),
    type: z.enum([
      "primary-text",
      "game-guide",
      "government-source",
      "developer-statement",
      "museum-source",
      "academic-source",
    ]),
    scopeZh: zh,
  })
  .strict();
export const mediaSchema = z
  .object({
    file: z.string().regex(/^\/(art|images|maps)\/[a-z0-9/.-]+$/),
    titleZh: zh,
    altZh: zh,
    usageNoteZh: zh,
    assetRole: z.enum([
      "chapter-map",
      "chapter-atmosphere",
      "game-reference",
      "heritage-documentary",
      "historical-documentary",
      "historical-analogue",
      "comparison-frame",
      "decorative-interpretation",
      "ui-texture",
      "ui-icon",
      "wordmark",
    ]),
    provenanceType: z.enum([
      "sourced",
      "game-capture",
      "generated",
      "original-vector",
      "original-illustration",
      "original-photography",
    ]),
    documentary: z.boolean(),
    creator: z.string().min(1),
    license: z.string().min(1),
    licenseStatus: z.enum([
      "cleared",
      "public-domain",
      "permission-required",
      "link-only",
      "do-not-use",
      "unknown",
    ]),
    licenseUrl: z.string().url().optional(),
    sourceUrl: z.string().url().optional(),
    firstParty: z.boolean().optional(),
    evidenceSourceIds: z.array(z.string()),
    evidenceScopeZh: zh,
    modificationNoteZh: zh,
    mapMode: z.enum(["schematic", "geographic"]).optional(),
    topologyStatus: z
      .enum(["unverified", "verified-high-level", "verified-markers"])
      .optional(),
    generator: z.string().optional(),
    generationDate: z.string().optional(),
    promptSummary: z.string().optional(),
    reviewedByHuman: z.boolean().optional(),
  })
  .strict();
export const markerSchema = z
  .object({
    id,
    nameZh: zh,
    type: z.enum([
      "location",
      "character",
      "boss",
      "architecture",
      "item",
      "story",
    ]),
    layers: z
      .array(z.enum(["game", "journey-to-the-west", "real-world"]))
      .min(1),
    areaZh: zh,
    summaryZh: zh,
    position: position.optional(),
    game: z.object({ descriptionZh: zh, sources: refs }).strict(),
    journeyToTheWest: z
      .object({
        relationship: z.enum(["direct", "recombined"]),
        chapterNumbers: z.array(z.number().int().min(1).max(100)).min(1),
        chapterTitlesZh: z.array(zh).min(1),
        summaryZh: zh,
        excerptZh: zh.optional(),
        adaptationNoteZh: zh,
        sources: refs,
      })
      .strict()
      .optional(),
    noDirectNovelZh: zh.optional(),
    realWorld: z
      .array(
        z
          .object({
            nameZh: zh,
            locationZh: zh,
            descriptionZh: zh,
            evidenceScopeZh: zh,
            relationship: z.enum([
              "cultural-comparison",
              "developer-confirmed",
            ]),
            confidence: z.enum([
              "confirmed",
              "high-confidence",
              "probable",
              "speculative",
              "unknown",
            ]),
            evidenceType: z.enum([
              "developer-statement",
              "government-source",
              "museum-source",
              "heritage-source",
              "academic-source",
              "visual-comparison",
              "community-theory",
            ]),
            sources: refs,
            mediaIds: z.array(id).optional(),
          })
          .strict(),
      )
      .min(1)
      .optional(),
    funFacts: z.array(z.object({ textZh: zh, sources: refs }).strict()),
    spoiler: z
      .object({ warningZh: zh, textZh: zh, sources: refs })
      .strict()
      .optional(),
    sources: refs,
  })
  .strict();
export const chapterSchema = z
  .object({
    id,
    order: z.number().int().min(1).max(6),
    numeralZh: zh,
    titleZh: zh,
    regionZh: zh,
    themeZh: zh,
    overviewZh: zh,
    readingGuideZh: zh,
    sources: refs,
    atmosphereMediaId: id,
    mapMediaId: id.optional(),
    mapMode: z.enum(["schematic", "geographic"]),
    topologyStatus: z.enum([
      "unverified",
      "verified-high-level",
      "verified-markers",
    ]),
    topologyLog: z
      .string()
      .regex(/^assets\/research\/[a-zA-Z0-9_.\/-]+$/)
      .optional(),
    mapNoticeZh: zh,
    markers: z.array(markerSchema),
    areas: z.array(z.object({ id, nameZh: zh, position }).strict()),
    anchors: z.array(
      z.object({ id, nameZh: zh, position, sources: refs }).strict(),
    ),
    routes: z.array(
      z
        .object({
          from: id,
          to: id,
          kind: z.enum(["main", "optional"]),
          mode: z.enum(["route", "teleport", "return", "reward"]),
          labelZh: zh.optional(),
          conditionZh: zh.optional(),
          sources: refs,
        })
        .strict(),
    ),
  })
  .strict();
export type Chapter = z.infer<typeof chapterSchema>;
export type Marker = z.infer<typeof markerSchema>;
export type Media = z.infer<typeof mediaSchema>;
export type Source = z.infer<typeof sourceSchema>;
