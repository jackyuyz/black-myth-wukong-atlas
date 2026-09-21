import { mkdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { allRoutes, chapters, media } from "../src/data";
import {
  barePath,
  hrefLang,
  htmlLang,
  langOf,
  localePath,
  pick,
  pickMaybe,
} from "../src/i18n/locale";
import { ui } from "../src/i18n/ui";
const { render } = await import(
  pathToFileURL(resolve(".ssr/entry-server.js")).href
);
const template = readFileSync("dist/index.html", "utf8");
if (!template.includes("<!--app-html-->"))
  throw new Error("预渲染入口模板缺失");
// hreflang wants absolute URLs; supply SITE_URL when the domain is known.
const origin = (process.env.SITE_URL ?? "").replace(/\/$/, "");
/**
 * The rendered text of a page, with markup and entities resolved. A sentence
 * can be split across nodes — a language-tagged span, React's comment
 * separators — so the prose is checked against this rather than the raw
 * source, which is also what a reader or a crawler actually sees.
 */
const readable = (html: string) =>
  html
    .replace(/<!--.*?-->/gs, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
for (const route of [...allRoutes, "/404", "/en/404"]) {
  const lang = langOf(route);
  const t = ui[lang];
  const bare = barePath(route);
  const notFound = bare === "/404";
  const chapter = chapters.find((c) => bare.endsWith(c.id));
  const title = chapter
    ? t.chapterDocumentTitle(pick(lang, chapter, "region"), chapter.order)
    : t.routeTitles[bare];
  const alternates = notFound
    ? ""
    : (["zh", "en"] as const)
        .map(
          (other) =>
            `<link rel="alternate" hreflang="${hrefLang[other]}" href="${origin}${localePath(other, bare)}"/>`,
        )
        .join("");
  const html = template
    .replace('<html lang="zh-CN">', () => `<html lang="${htmlLang[lang]}">`)
    .replace(
      /<meta name="description" content="[^"]*"\/>/,
      () =>
        `<meta name="description" content="${t.siteDescription}"/>${alternates}`,
    )
    .replace(/<title>[^<]*<\/title>/, () => `<title>${t.documentTitle(title)}</title>`)
    .replace("<!--app-html-->", () => render(route));
  const text = readable(html);
  const brand = lang === "zh" ? "黑神话：悟空" : "Black Myth: Wukong";
  if (!text.includes(brand)) throw new Error(`缺少正文：${route}`);
  // Every reading card must reach the HTML source in both languages.
  for (const marker of chapter?.markers ?? []) {
    const novel = marker.journeyToTheWest
      ? pick(lang, marker.journeyToTheWest, "summary")
      : pickMaybe(lang, marker, "noDirectNovel")!;
    if (!text.includes(pick(lang, marker.game, "description")))
      throw new Error(`预渲染遗漏游戏正文：${route} / ${marker.id}`);
    if (!text.includes(novel))
      throw new Error(`预渲染遗漏原著正文：${route} / ${marker.id}`);
  }
  const dir = notFound
    ? `dist${route.slice(0, -"/404".length)}`
    : route === "/"
      ? "dist"
      : `dist${route}`;
  mkdirSync(dir, { recursive: true });
  if (notFound) writeFileSync(`${dir}/404.html`, html);
  else {
    writeFileSync(`${dir}/index.html`, html);
    if (route !== "/") writeFileSync(`dist${route}.html`, html);
  }
}
for (const item of Object.values(media))
  if (!statSync(`dist${item.file}`).isFile()) throw new Error("公开素材未输出");
console.log(
  `静态预渲染完成：${allRoutes.length} 个中英文页面及两个错误页；所有阅读卡均存在于 HTML。`,
);
