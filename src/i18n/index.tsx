import type { ComponentProps } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import type { Lang } from "./locale";
import { langOf, localePath } from "./locale";
import { ui } from "./ui";
export * from "./locale";
export { ui } from "./ui";
export function useLang(): Lang {
  return langOf(useLocation().pathname);
}
/** Interface copy for the locale of the current route. */
export function useUi() {
  return ui[useLang()];
}
/** Prefixes an internal path with the locale of the current route. */
export function useLocalePath() {
  const lang = useLang();
  return (path: string) => localePath(lang, path);
}
export function LocaleLink({
  to,
  ...rest
}: Omit<ComponentProps<typeof Link>, "to"> & { to: string }) {
  return <Link to={useLocalePath()(to)} {...rest} />;
}
export function LocaleNavLink({
  to,
  ...rest
}: Omit<ComponentProps<typeof NavLink>, "to"> & { to: string }) {
  return <NavLink to={useLocalePath()(to)} {...rest} />;
}
/**
 * Marks Chinese text that stays on an English page — a cited excerpt, an
 * original name in parentheses, a source title — so assistive technology
 * does not read it with English pronunciation rules.
 */
/**
 * The Chinese original of a name, shown only on the English pages. A reader
 * who wants to search for the term, or check it against a Chinese source,
 * needs the characters; the Chinese pages already have them.
 */
export function OriginalName({
  children,
  className = "original-name",
}: {
  children: string;
  className?: string;
}) {
  if (useLang() === "zh") return null;
  return (
    <span className={className} lang="zh-Hans">
      {children}
    </span>
  );
}
/**
 * Content prose. Chinese deliberately kept inside an English sentence — a
 * character being contrasted with another, a name given in the original —
 * is wrapped so a screen reader on an `lang="en"` page does not try to
 * pronounce it as English.
 */
export function Text({ children }: { children: string | undefined }) {
  const lang = useLang();
  if (lang === "zh" || !children) return <>{children}</>;
  return (
    <>
      {children.split(/([\u3400-\u9fff\u300a\u300b\u300c\u300d]+)/).map((part, index) =>
        index % 2 ? (
          <span key={index} lang="zh-Hans">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
export function Zh({
  children,
  traditional = false,
  ...rest
}: ComponentProps<"span"> & { traditional?: boolean }) {
  return (
    <span lang={traditional ? "zh-Hant" : "zh-Hans"} {...rest}>
      {children}
    </span>
  );
}
