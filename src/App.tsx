import { Fragment, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { chapters, media, sources } from "./data";
import type { Chapter, Marker } from "./types/schema";
import { labels, licenseLabel } from "./types/schema";
import {
  ReadingCard,
  SourceLinks,
  HeritagePhoto,
} from "./components/ReadingCard";
import {
  HomeMapPreview,
  InteractiveMap,
  MapSymbol,
  RouteConditions,
} from "./components/Map";
import { InterfaceSounds } from "./components/InterfaceSounds";
import { BackgroundMusic } from "./components/BackgroundMusic";
import { LanguageToggle } from "./components/LanguageToggle";
import {
  LocaleLink,
  LocaleNavLink,
  OriginalName,
  Text,
  Zh,
  barePath,
  htmlLang,
  pick,
  ui,
  useLang,
  useUi,
} from "./i18n";
function PageEffects() {
  const { pathname, hash } = useLocation();
  const lang = useLang();
  useEffect(() => {
    const t = ui[lang];
    const route = barePath(pathname);
    const chapter = chapters.find((c) => route.endsWith(c.id));
    const title = chapter
      ? t.chapterDocumentTitle(pick(lang, chapter, "region"), chapter.order)
      : t.routeTitles[route];
    document.title = t.documentTitle(title);
    document.documentElement.lang = htmlLang[lang];
    if (!hash) window.scrollTo(0, 0);
    else {
      const element = document.getElementById(
        decodeURIComponent(hash.slice(1)),
      );
      if (element instanceof HTMLDetailsElement) element.open = true;
      element?.scrollIntoView({ block: "start" });
    }
  }, [pathname, hash, lang]);
  return null;
}
function AppShell({ children }: { children: React.ReactNode }) {
  const t = useUi();
  return (
    <>
      <PageEffects />
      <a className="skip-link" href="#main-content">
        {t.skipToContent}
      </a>
      <header className="site-header">
        <LocaleLink className="brand" to="/" data-sound="navigate">
          <img
            src="/art/wukong-header-logo.png"
            width="46"
            height="46"
            alt=""
          />
          <span>
            {t.brandName}
            <small>{t.brandSub}</small>
          </span>
        </LocaleLink>
        <nav aria-label={t.navLabel}>
          <LocaleNavLink to="/" end data-sound="navigate">
            {t.navHome}
          </LocaleNavLink>
          <LocaleNavLink to="/chapters" data-sound="navigate">
            {t.navChapters}
          </LocaleNavLink>
          <LocaleNavLink to="/sources" data-sound="navigate">
            {t.navSources}
          </LocaleNavLink>
          <LocaleNavLink to="/about" data-sound="navigate">
            {t.navAbout}
          </LocaleNavLink>
        </nav>
        <div className="header-actions">
          <span className="header-note">{t.headerNote}</span>
          <LanguageToggle />
          <InterfaceSounds />
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <span>
          {t.footerName} <span className="footer-dot">·</span> {t.footerKind}
        </span>
        <p>{t.footerDisclaimer}</p>
        <p className="footer-course">
          {t.footerCoursePrefix}{" "}
          <a
            href="https://439blackmyth.github.io/439WukongWebsite/index.html"
            target="_blank"
            rel="noreferrer"
          >
            {t.footerCourseName}
          </a>{" "}
          {t.footerCourseSuffix}
          <span className="footer-dot" aria-hidden="true">
            ·
          </span>
          {t.footerAuthorLabel}{" "}
          <a href="https://github.com/jackyuyz" target="_blank" rel="noreferrer">
            Jack Yu
          </a>
        </p>
        <LocaleLink to="/sources">{t.footerLink}</LocaleLink>
      </footer>
      <BackgroundMusic />
    </>
  );
}
function LayerGuide() {
  const t = useUi();
  return (
    <div className="layer-guide">
      {t.guide.map((step, index) => (
        <Fragment key={step.title}>
          {index > 0 && (
            <span className="guide-arrow" aria-hidden="true">
              →
            </span>
          )}
          <div>
            <span>{step.mark}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
function ChapterCards() {
  const lang = useLang();
  const t = useUi();
  return (
    <div className="chapter-grid">
      {chapters.map((c) => (
        <LocaleLink
          className={`chapter-card chapter-${c.order}`}
          to={`/chapter/${c.id}`}
          key={c.id}
          data-sound="navigate"
        >
          <img
            src={media[c.atmosphereMediaId].file}
            alt={pick(lang, media[c.atmosphereMediaId], "alt")}
            loading="lazy"
          />
          <div className="chapter-card-top">
            <span>{t.chapterOrdinal(c.order)}</span>
            <small>
              {c.topologyStatus === "unverified"
                ? t.cardReadingOnly
                : t.cardMapped}
            </small>
          </div>
          <div className="chapter-card-bottom">
            <p>{pick(lang, c, "title")}</p>
            <h3>
              {pick(lang, c, "region")}
              <OriginalName>{c.regionZh}</OriginalName>
            </h3>
            <span>{pick(lang, c, "theme")}</span>
            <b aria-hidden="true">↗</b>
          </div>
        </LocaleLink>
      ))}
    </div>
  );
}
function Home() {
  const lang = useLang();
  const t = useUi();
  const featured = chapters[2].markers[0];
  const heritage = featured.realWorld![0];
  const featuredName = pick(lang, featured, "name");
  return (
    <main id="main-content">
      <section
        className="home-hero"
        style={{ backgroundImage: `url(${media["atmosphere-01"].file})` }}
      >
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="red-mark" /> {t.heroEyebrow}
          </p>
          <h1>
            {t.heroTitleLead}
            <br />
            {t.heroTitleBefore}
            <span>{t.heroTitleAccent}</span>
            {t.heroTitleAfter}
          </h1>
          <p className="hero-intro">
            {t.heroIntroA}
            <br />
            {t.heroIntroB}
          </p>
          <div className="hero-actions">
            <LocaleLink
              className="button primary"
              to="/chapter/chapter-01"
              data-sound="navigate"
            >
              {t.heroPrimary} <span>↗</span>
            </LocaleLink>
            <LocaleLink
              className="text-link"
              to="/chapters"
              data-sound="navigate"
            >
              {t.heroSecondary} <span>→</span>
            </LocaleLink>
          </div>
          <div className="hero-facts">
            {t.heroFacts.map((fact) => (
              <span key={fact.label}>
                <strong>{fact.value}</strong>
                {fact.label}
              </span>
            ))}
          </div>
        </div>
        <HomeMapPreview />
        <div className="hero-sidewriting" aria-hidden="true">
          {t.heroSidewriting}
        </div>
        <span className="art-caption">{t.heroArtCaption}</span>
      </section>
      <div className="page-container">
        <section className="intro-section">
          <div className="section-heading">
            <p className="eyebrow">{t.introEyebrow}</p>
            <h2>{t.introTitle}</h2>
            <p>{t.introText}</p>
          </div>
          <LayerGuide />
        </section>
        <section className="chapters-section">
          <div className="section-heading row">
            <div>
              <p className="eyebrow">{t.chaptersEyebrow}</p>
              <h2>{t.chaptersTitle}</h2>
            </div>
            <p>
              {t.chaptersNoteA}
              <br />
              {t.chaptersNoteB}
            </p>
          </div>
          <ChapterCards />
        </section>
        <section className="heritage-feature">
          <HeritagePhoto id={heritage.mediaIds![0]} compact />
          <div>
            <p className="eyebrow">{t.featureEyebrow}</p>
            <h2>
              {t.featureTitleName(featuredName)}
              <br />
              {t.featureTitleTail}
            </h2>
            <p>
              <Text>{pick(lang, featured, "summary")}</Text>{" "}
              <Text>{pick(lang, heritage, "description")}</Text>
            </p>
            <div className="badges">
              <span className="badge">
                {labels[lang].heritageRelation[heritage.relationship]}
              </span>
              <span className="badge">
                {labels[lang].evidence[heritage.evidenceType]}
              </span>
            </div>
            <LocaleLink
              className="text-link"
              to="/chapter/chapter-03#kang-jin-loong"
              data-sound="navigate"
            >
              {t.featureLink(featuredName)} <span>→</span>
            </LocaleLink>
          </div>
        </section>
      </div>
    </main>
  );
}
function ChaptersPage() {
  const t = useUi();
  return (
    <main id="main-content" className="page-container standalone">
      <p className="eyebrow">{t.chaptersPageEyebrow}</p>
      <h1>{t.chaptersPageTitle}</h1>
      <p className="page-lede">{t.chaptersPageLede}</p>
      <ChapterCards />
      <LayerGuide />
    </main>
  );
}
function Drawer({
  marker,
  onClose,
}: {
  marker: Marker | null;
  onClose: () => void;
}) {
  const lang = useLang();
  const t = useUi();
  const dialog = useRef<HTMLDialogElement>(null);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (!marker) return;
    setExpanded(false);
    const previous = document.activeElement as HTMLElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    dialog.current?.scrollTo(0, 0);
    return () => {
      dialog.current?.close();
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, [marker]);
  return (
    <dialog
      ref={dialog}
      className={`info-drawer${expanded ? " expanded" : ""}`}
      aria-label={
        marker ? t.drawerLabel(pick(lang, marker, "name")) : t.drawerLabelFallback
      }
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="drawer-inner">
        <div className="drawer-toolbar">
          <span>{t.drawerToolbar}</span>
          <div className="drawer-actions">
            <button
              className="drawer-size-toggle"
              onClick={() => setExpanded((value) => !value)}
              aria-label={
                expanded ? t.drawerCollapseLabel : t.drawerExpandLabel
              }
              data-sound="select"
            >
              {expanded ? t.drawerCollapse : t.drawerExpand}
            </button>
            <button
              onClick={onClose}
              aria-label={t.drawerCloseLabel}
              data-sound="close"
            >
              {t.drawerClose}
            </button>
          </div>
        </div>
        {marker && <ReadingCard marker={marker} />}
      </div>
    </dialog>
  );
}
const filterIds = [
  "all",
  "location",
  "people",
  "item",
  "architecture",
  "story",
];
function ChapterRail({ chapter }: { chapter: Chapter }) {
  const lang = useLang();
  const t = useUi();
  const rail = useRef<HTMLDivElement>(null);
  const previous = chapters[chapter.order - 2];
  const next = chapters[chapter.order];
  useEffect(() => {
    rail.current
      ?.querySelector<HTMLAnchorElement>("a.active")
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [chapter.id]);
  return (
    <div className="chapter-rail-shell">
      {previous ? (
        <LocaleLink
          className="chapter-rail-arrow"
          to={`/chapter/${previous.id}`}
          state={{ chapterDirection: "previous" }}
          aria-label={t.previousChapterLabel(pick(lang, previous, "region"))}
          data-sound="navigate"
        >
          ‹
        </LocaleLink>
      ) : (
        <span className="chapter-rail-arrow disabled" aria-hidden="true">
          ‹
        </span>
      )}
      <div className="chapter-tabs" aria-label={t.chapterTabsLabel} ref={rail}>
        {chapters.map((c) => (
          <LocaleNavLink
            key={c.id}
            to={`/chapter/${c.id}`}
            data-sound="navigate"
            state={{
              chapterDirection:
                c.order === chapter.order
                  ? "current"
                  : c.order > chapter.order
                    ? "next"
                    : "previous",
            }}
          >
            <span>{t.chapterOrdinal(c.order)}</span>
            {pick(lang, c, "region")}
          </LocaleNavLink>
        ))}
      </div>
      {next ? (
        <LocaleLink
          className="chapter-rail-arrow"
          to={`/chapter/${next.id}`}
          state={{ chapterDirection: "next" }}
          aria-label={t.nextChapterLabel(pick(lang, next, "region"))}
          data-sound="navigate"
        >
          ›
        </LocaleLink>
      ) : (
        <span className="chapter-rail-arrow disabled" aria-hidden="true">
          ›
        </span>
      )}
    </div>
  );
}
function ChapterPage({ chapter }: { chapter: Chapter }) {
  const location = useLocation();
  const lang = useLang();
  const t = useUi();
  const [category, setCategory] = useState("all");
  const [layer, setLayer] = useState("all");
  const [selected, setSelected] = useState<Marker | null>(null);
  const previous = chapters[chapter.order - 2];
  const next = chapters[chapter.order];
  const region = pick(lang, chapter, "region");
  const direction =
    (location.state as { chapterDirection?: string } | null)
      ?.chapterDirection ?? "current";
  const visible = chapter.markers.filter(
    (m) =>
      (category === "all" ||
        (category === "people"
          ? ["boss", "character"].includes(m.type)
          : m.type === category)) &&
      (layer === "all" ||
        m.layers.includes(layer as keyof (typeof labels)["zh"]["layer"])),
  );
  const mapped = chapter.topologyStatus !== "unverified";
  return (
    <main
      id="main-content"
      className={`chapter-page chapter-motion-${direction}`}
    >
      <ChapterRail chapter={chapter} />
      <div className="chapter-heading">
        <div>
          <p className="eyebrow">
            {t.chapterOrdinal(chapter.order)} <span> / </span>{" "}
            {pick(lang, chapter, "title")}
          </p>
          <h1>
            {region}
            <OriginalName>{chapter.regionZh}</OriginalName>
            <span>{pick(lang, chapter, "theme")}</span>
          </h1>
        </div>
        <div className="chapter-heading-actions">
          <nav className="chapter-stepper" aria-label={t.chapterStepperLabel}>
            {previous ? (
              <LocaleLink
                to={`/chapter/${previous.id}`}
                state={{ chapterDirection: "previous" }}
                aria-label={t.previousChapterLabel(
                  pick(lang, previous, "region"),
                )}
                data-sound="navigate"
              >
                ←
              </LocaleLink>
            ) : (
              <span aria-hidden="true">—</span>
            )}
            <small>{chapter.order} / 6</small>
            {next ? (
              <LocaleLink
                to={`/chapter/${next.id}`}
                state={{ chapterDirection: "next" }}
                aria-label={t.nextChapterLabel(pick(lang, next, "region"))}
                data-sound="navigate"
              >
                →
              </LocaleLink>
            ) : (
              <span aria-hidden="true">—</span>
            )}
          </nav>
          <LocaleLink
            to="/chapters"
            className="text-link"
            data-sound="navigate"
          >
            {t.backToChapters}
          </LocaleLink>
        </div>
      </div>
      <div className={mapped ? "exploration-layout" : "overview-layout"}>
        <aside className="explore-sidebar">
          <div className="sidebar-intro">
            <span className="eyebrow">
              {mapped ? t.sidebarEyebrowMapped : t.sidebarEyebrowReading}
            </span>
            <h2>
              {mapped ? t.sidebarTitleMapped(region) : t.sidebarTitleReading}
            </h2>
            <p>
              <Text>{pick(lang, chapter, "readingGuide")}</Text>
            </p>
          </div>
          <fieldset className="filter-group">
            <legend>{t.filterLegend}</legend>
            <div className="filter-buttons">
              {filterIds.map((id) => (
                <button
                  key={id}
                  aria-pressed={category === id}
                  onClick={() => setCategory(id)}
                  data-sound="select"
                >
                  {t.filters[id]}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="layer-select">
            {t.layerSelectLabel}
            <select
              value={layer}
              onChange={(e) => setLayer(e.target.value)}
              data-sound="select"
            >
              <option value="all">{t.layerAll}</option>
              {Object.entries(labels[lang].layer).map(([key, label]) => (
                <option value={key} key={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <div className="result-count" aria-live="polite">
            {t.resultCount(visible.length)}
            {mapped
              ? t.mappedCount(visible.filter((m) => m.position).length)
              : ""}
          </div>
          <div className="marker-list">
            {visible.map((m) => (
              <a
                key={m.id}
                href={`#${m.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelected(m);
                }}
                data-sound="marker"
              >
                <MapSymbol type={m.type} />
                <span>
                  {pick(lang, m, "name")}
                  <small>
                    {labels[lang].type[m.type]}
                    {!m.position ? t.listReadingOnly : ""}
                  </small>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          {!visible.length && (
            <div className="empty-state">
              <p>{t.emptyState}</p>
              <button
                data-sound="select"
                onClick={() => {
                  setCategory("all");
                  setLayer("all");
                }}
              >
                {t.emptyStateReset}
              </button>
            </div>
          )}
        </aside>
        <div className="map-column">
          {mapped ? (
            <>
              <InteractiveMap
                chapter={chapter}
                visible={visible}
                onSelect={setSelected}
              />
              <RouteConditions chapter={chapter} />
            </>
          ) : (
            <div
              className="chapter-overview"
              style={{
                backgroundImage: `url(${media[chapter.atmosphereMediaId].file})`,
              }}
            >
              <p className="eyebrow">
                {t.chapterOrdinal(chapter.order)} ·{" "}
                {pick(lang, chapter, "title")}
              </p>
              <h2>{region}</h2>
              <p>
                <Text>{pick(lang, chapter, "overview")}</Text>
              </p>
              <span>{pick(lang, chapter, "mapNotice")}</span>
            </div>
          )}
          <div className="map-reading-hint">
            <span>{t.mapReadMark}</span>
            <p>
              {mapped ? t.mapReadHintMapped : t.mapReadHintReading}
              <br />
              <small>{t.mapReadHintLayers}</small>
            </p>
            <a href="#chapter-reading" data-sound="open">
              {t.readInOrder}
            </a>
          </div>
        </div>
      </div>
      <section className="chapter-reading page-container" id="chapter-reading">
        <div className="section-heading">
          <p className="eyebrow">{t.chapterReadingEyebrow}</p>
          <h2>{t.chapterReadingTitle}</h2>
          <p>
            <Text>{pick(lang, chapter, "overview")}</Text>
          </p>
        </div>
        <div className="reading-index">
          {chapter.markers.map((m) => (
            <details key={m.id} id={m.id}>
              <summary data-sound="open">
                <span className="index-type">{labels[lang].type[m.type]}</span>
                <strong>{pick(lang, m, "name")}</strong>
                <span className="index-summary">
                  <Text>{pick(lang, m, "summary")}</Text>
                </span>
                <span aria-hidden="true">＋</span>
              </summary>
              <ReadingCard marker={m} />
            </details>
          ))}
        </div>
        <SourceLinks ids={chapter.sources} />
      </section>
      <nav className="next-chapter page-container" aria-label={t.chapterNavLabel}>
        {previous ? (
          <LocaleLink
            to={`/chapter/${previous.id}`}
            state={{ chapterDirection: "previous" }}
            data-sound="navigate"
          >
            {t.previousChapterLink(pick(lang, previous, "region"))}
          </LocaleLink>
        ) : (
          <LocaleLink to="/" data-sound="navigate">
            {t.backToHome}
          </LocaleLink>
        )}
        {next && (
          <LocaleLink
            to={`/chapter/${next.id}`}
            state={{ chapterDirection: "next" }}
            data-sound="navigate"
          >
            {t.nextChapterLink(pick(lang, next, "region"))}
          </LocaleLink>
        )}
      </nav>
      <Drawer marker={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
function ChapterRoute() {
  const { chapterId } = useParams();
  const chapter = chapters.find((c) => c.id === chapterId);
  return chapter ? (
    <ChapterPage key={chapter.id} chapter={chapter} />
  ) : (
    <NotFound />
  );
}
function About() {
  const t = useUi();
  return (
    <main id="main-content" className="prose-page">
      <p className="eyebrow">{t.aboutEyebrow}</p>
      <h1>
        {t.aboutTitleA}
        <br />
        {t.aboutTitleB}
      </h1>
      <p className="page-lede">{t.aboutLede}</p>
      <LayerGuide />
      <h2>{t.aboutLayersTitle}</h2>
      <p>{t.aboutLayersText}</p>
      <ul>
        {t.aboutRelations.map((relation) => (
          <li key={relation.term}>
            <strong>{relation.term}</strong>
            {relation.text}
          </li>
        ))}
      </ul>
      <h2>{t.aboutMapTitle}</h2>
      <p>{t.aboutMapText}</p>
      <p>{t.aboutLoreText}</p>
      <h2>{t.aboutImageTitle}</h2>
      <p>{t.aboutImageText}</p>
      <h2>{t.aboutFirstTitle}</h2>
      <p>{t.aboutFirstText}</p>
      <p>{t.aboutDisclaimer}</p>
      <LocaleLink
        className="button primary"
        to="/chapter/chapter-01"
        data-sound="navigate"
      >
        {t.aboutCta}
      </LocaleLink>
    </main>
  );
}
function SourcesPage() {
  const lang = useLang();
  const t = useUi();
  const heritageMedia = Object.entries(media).filter(
    ([, item]) => item.assetRole === "heritage-documentary",
  );
  return (
    <main id="main-content" className="prose-page sources-page">
      <p className="eyebrow">{t.sourcesEyebrow}</p>
      <h1>
        {t.sourcesTitleA}
        <br />
        {t.sourcesTitleB}
      </h1>
      <p className="page-lede">{t.sourcesLede}</p>
      <h2>{t.sourcesHeritageTitle}</h2>
      <p className="heritage-source-lede">{t.sourcesHeritageLede}</p>
      <div className="heritage-source-gallery">
        {heritageMedia.map(([id, item]) => (
          <article className="heritage-source-card" key={id}>
            <HeritagePhoto id={id} compact />
            <p>
              <Text>{pick(lang, item, "evidenceScope")}</Text>
            </p>
            {item.evidenceSourceIds.length > 0 && (
              <SourceLinks ids={item.evidenceSourceIds} />
            )}
          </article>
        ))}
      </div>
      <h2>{t.sourcesTextTitle}</h2>
      <div className="source-index">
        {Object.entries(sources).map(([id, s]) => (
          <article key={id} id={`source-${id}`}>
            <span className="badge">{labels[lang].source[s.type]}</span>
            <h3>
              <a href={s.url} target="_blank" rel="noreferrer">
                <Zh>{s.titleZh}</Zh>
                <span aria-hidden="true"> ↗</span>
              </a>
              <OriginalName className="source-translated-title">
                {s.titleEn}
              </OriginalName>
            </h3>
            <p>
              <Text>{pick(lang, s, "scope")}</Text>
            </p>
            <small>
              {pick(lang, s, "publisher")} · {t.sourceId(id)}
            </small>
          </article>
        ))}
      </div>
      <h2>{t.sourcesMediaTitle}</h2>
      {Object.entries(media).map(([id, item]) => (
        <article className="media-credit" key={id}>
          <h3>{pick(lang, item, "title")}</h3>
          <p>
            <Text>{pick(lang, item, "usageNote")}</Text>{" "}
            <Text>{pick(lang, item, "evidenceScope")}</Text>
          </p>
          <p>
            {t.creditCreator}
            <Text>{item.creator}</Text> ·{" "}
            {item.assetRole === "audio-track"
              ? t.creditAudio
              : item.assetRole === "typeface"
                ? t.creditTypeface
                : item.assetRole === "asset-documentation"
                  ? t.creditDocumentation
              : item.documentary
                ? t.creditDocumentary
                : t.creditOriginal} ·{" "}
            {licenseLabel(item.license, lang)}
          </p>
          <p>
            <Text>{pick(lang, item, "modificationNote")}</Text>
          </p>
          <div className="credit-links">
            {item.sourceUrl && (
              <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                {t.creditSourceLink}
              </a>
            )}
            {item.licenseUrl && (
              <a href={item.licenseUrl} target="_blank" rel="noreferrer">
                {t.creditLicenseLink}
              </a>
            )}
          </div>
        </article>
      ))}
      <h2>{t.sourcesFontTitle}</h2>
      <p>{t.sourcesFontText}</p>
    </main>
  );
}
function NotFound() {
  const t = useUi();
  return (
    <main id="main-content" className="prose-page not-found">
      <p className="eyebrow">{t.notFoundEyebrow}</p>
      <h1>{t.notFoundTitle}</h1>
      <p>{t.notFoundText}</p>
      <LocaleLink className="button primary" to="/chapters" data-sound="navigate">
        {t.notFoundCta}
      </LocaleLink>
    </main>
  );
}
/** The same pages under every locale prefix; paths resolve relative to it. */
function SiteRoutes() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="chapters" element={<ChaptersPage />} />
      <Route path="chapter/:chapterId" element={<ChapterRoute />} />
      <Route path="about" element={<About />} />
      <Route path="sources" element={<SourcesPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default function App() {
  const shell = (
    <AppShell>
      <SiteRoutes />
    </AppShell>
  );
  return (
    <Routes>
      <Route path="/en/*" element={shell} />
      <Route path="/*" element={shell} />
    </Routes>
  );
}
