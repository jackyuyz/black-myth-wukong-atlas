export type Lang = "zh" | "en";
export const langs: Lang[] = ["zh", "en"];
export const htmlLang: Record<Lang, string> = { zh: "zh-CN", en: "en" };
export const hrefLang: Record<Lang, string> = { zh: "zh-Hans", en: "en" };
export function langOf(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "zh";
}
/** The route without its locale prefix: `/en/about` and `/about` both give `/about`. */
export function barePath(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}
export function localePath(lang: Lang, path: string): string {
  if (lang === "zh") return path;
  return path === "/" ? "/en" : `/en${path}`;
}
export function swapLocale(pathname: string, lang: Lang): string {
  return localePath(lang, barePath(pathname));
}
type Localized<K extends string> = { [P in `${K}Zh` | `${K}En`]: string };
/** `pick(lang, marker, "name")` reads `nameZh` or `nameEn`. */
export function pick<K extends string>(
  lang: Lang,
  value: Localized<K>,
  key: K,
): string {
  return lang === "zh" ? value[`${key}Zh` as const] : value[`${key}En` as const];
}
export function pickMaybe<K extends string>(
  lang: Lang,
  value: Partial<Localized<K>>,
  key: K,
): string | undefined {
  return lang === "zh" ? value[`${key}Zh` as const] : value[`${key}En` as const];
}
