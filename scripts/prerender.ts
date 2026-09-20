import { mkdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { allRoutes, chapters, media } from "../src/data";
const { render } = await import(
  pathToFileURL(resolve(".ssr/entry-server.js")).href
);
const template = readFileSync("dist/index.html", "utf8");
if (!template.includes("<!--app-html-->"))
  throw new Error("预渲染入口模板缺失");
for (const route of [...allRoutes, "/404"]) {
  const chapter = chapters.find((c) => route.endsWith(c.id));
  const title = chapter
    ? `${chapter.regionZh} · 第${chapter.numeralZh}回｜黑神话：悟空文化地图`
    : {
        "/chapters": "六回山川",
        "/about": "关于项目",
        "/sources": "资料来源",
        "/404": "没有找到这一页",
      }[route];
  const html = template
    .replace("<!--app-html-->", render(route))
    .replace(
      "<title>黑神话：悟空文化地图</title>",
      `<title>${title || "黑神话：悟空文化地图"}</title>`,
    );
  if (!html.includes("黑神话：悟空")) throw new Error(`缺少中文正文：${route}`);
  for (const marker of chapter?.markers ?? [])
    if (
      !html.includes(marker.game.descriptionZh) ||
      !html.includes(
        marker.journeyToTheWest?.summaryZh ?? marker.noDirectNovelZh!,
      )
    )
      throw new Error(`预渲染遗漏正文：${marker.id}`);
  const dir = route === "/" ? "dist" : `dist${route}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(route === "/404" ? "dist/404.html" : `${dir}/index.html`, html);
  if (route !== "/" && route !== "/404")
    writeFileSync(`dist${route}.html`, html);
}
for (const item of Object.values(media))
  if (!statSync(`dist${item.file}`).isFile()) throw new Error("公开素材未输出");
console.log(
  `静态预渲染完成：${allRoutes.length} 个中文页面及独立错误页；所有阅读卡均存在于 HTML。`,
);
