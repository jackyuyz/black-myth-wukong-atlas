import { Link, useLocation } from "react-router-dom";
import { hrefLang, swapLocale, useLang, useUi } from "../i18n";
import type { Lang } from "../i18n";
const options: { lang: Lang; label: string; lettering: string }[] = [
  { lang: "zh", label: "中文", lettering: "zh-Hans" },
  { lang: "en", label: "EN", lettering: "en" },
];
/**
 * Two real links rather than a scripted switch: every route is prerendered in
 * both languages, so the toggle keeps working with scripts turned off. The
 * search string and hash travel with it, so a deep link to a reading card
 * opens the same card in the other language.
 */
export function LanguageToggle({
  variant = "header",
}: {
  variant?: "header" | "floating";
}) {
  const current = useLang();
  const t = useUi();
  const { pathname, search, hash } = useLocation();

  if (variant === "floating") {
    const target: Lang = current === "zh" ? "en" : "zh";
    return (
      <nav className="floating-lang-toggle" aria-label={t.languageNavLabel}>
        <Link
          to={swapLocale(pathname, target) + search + hash}
          hrefLang={hrefLang[target]}
          aria-label={target === "zh" ? t.switchToZh : t.switchToEn}
          data-current-lang={current}
          data-sound="select"
        >
          <span lang="zh-Hans">中</span>
          <i aria-hidden="true">/</i>
          <span lang="en">EN</span>
        </Link>
      </nav>
    );
  }

  return (
    <nav className="lang-toggle" aria-label={t.languageNavLabel}>
      {options.map((option) => {
        const active = option.lang === current;
        return (
          <Link
            key={option.lang}
            to={swapLocale(pathname, option.lang) + search + hash}
            lang={option.lettering}
            hrefLang={hrefLang[option.lang]}
            aria-current={active ? "true" : undefined}
            aria-label={option.lang === "zh" ? t.switchToZh : t.switchToEn}
            data-sound="select"
          >
            {option.label}
          </Link>
        );
      })}
    </nav>
  );
}
