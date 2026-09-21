import type { Marker } from "../types/schema";
import { labels, licenseLabel } from "../types/schema";
import { media, sources } from "../data";
import {
  OriginalName,
  Text,
  Zh,
  pick,
  pickMaybe,
  useLang,
  useUi,
} from "../i18n";
export function SourceLinks({ ids }: { ids: string[] }) {
  const lang = useLang();
  return (
    <ul className="citations">
      {[...new Set(ids)].map((id) => (
        <li key={id}>
          <a href={sources[id].url} target="_blank" rel="noreferrer">
            <Zh>{sources[id].titleZh}</Zh>
            <span aria-hidden="true"> ↗</span>
          </a>
          <OriginalName className="citation-translated-title">
            {sources[id].titleEn}
          </OriginalName>
          <small>{labels[lang].source[sources[id].type]}</small>
        </li>
      ))}
    </ul>
  );
}
export function HeritagePhoto({
  id,
  compact = false,
}: {
  id: string;
  compact?: boolean;
}) {
  const lang = useLang();
  const t = useUi();
  const item = media[id];
  return (
    <figure className={compact ? "heritage-photo compact" : "heritage-photo"}>
      <img
        src={item.file}
        alt={pick(lang, item, "alt")}
        loading="lazy"
        width="960"
        height="720"
      />
      <figcaption>
        <strong>{pick(lang, item, "title")}</strong>
        <span>
          {t.photoBy}
          <Text>{item.creator}</Text> ·{" "}
          <a href={item.sourceUrl} target="_blank" rel="noreferrer">
            {t.photoSourceLink}
          </a>{" "}
          ·{" "}
          <a href={item.licenseUrl} target="_blank" rel="noreferrer">
            {licenseLabel(item.license, lang)}
          </a>
        </span>
        {!compact && (
          <span>
            <Text>{pick(lang, item, "modificationNote")}</Text>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
function HistoricalImage({ id }: { id: string }) {
  const lang = useLang();
  const t = useUi();
  const item = media[id];
  return (
    <figure className="historical-image">
      <div className="historical-image-mat">
        <img
          src={item.file}
          alt={pick(lang, item, "alt")}
          loading="lazy"
          width="720"
          height="540"
        />
      </div>
      <figcaption>
        <strong>{pick(lang, item, "title")}</strong>
        <span>
          <Text>{pick(lang, item, "usageNote")}</Text>
        </span>
        <span>
          <Text>{item.creator}</Text> ·{" "}
          <a href={item.sourceUrl} target="_blank" rel="noreferrer">
            {t.imageSourceLink}
          </a>
          {item.licenseUrl && (
            <>
              {" · "}
              <a href={item.licenseUrl} target="_blank" rel="noreferrer">
                {licenseLabel(item.license, lang)}
              </a>
            </>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
function GameImage({ id }: { id: string }) {
  const lang = useLang();
  const t = useUi();
  const item = media[id];
  return (
    <figure className="game-image">
      <div className="game-image-frame">
        <img
          src={item.file}
          alt={pick(lang, item, "alt")}
          loading="lazy"
          width="1280"
          height="720"
        />
        <span className="game-image-stamp">{t.gameImageStamp}</span>
      </div>
      <figcaption>
        <strong>{pick(lang, item, "title")}</strong>
        <span>
          <Text>{pick(lang, item, "usageNote")}</Text>
        </span>
        <span>
          <Text>{item.creator}</Text> ·{" "}
          <a href={item.sourceUrl} target="_blank" rel="noreferrer">
            {t.gameSourceLink}
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
export function ReadingCard({ marker }: { marker: Marker }) {
  const lang = useLang();
  const t = useUi();
  const novel = marker.journeyToTheWest;
  return (
    <article className="reading-card">
      <div className="eyebrow">
        {pick(lang, marker, "area")} <span> / </span>{" "}
        {labels[lang].type[marker.type]}
      </div>
      <h2>
        {pick(lang, marker, "name")}
        <OriginalName className="card-original-name">
          {marker.nameZh}
        </OriginalName>
      </h2>
      <p className="card-deck">
        <Text>{pick(lang, marker, "summary")}</Text>
      </p>
      <p className="reading-key">
        {t.readingKeyBase}
        {marker.realWorld ? t.readingKeyHeritage : ""}
      </p>
      {novel && (
        <div className="novel-frontispiece">
          <blockquote className="novel-excerpt novel-excerpt-featured">
            <span className="novel-excerpt-label">{t.novelExcerptLabel}</span>
            <p lang="zh-Hant">{novel.excerptZh}</p>
            {lang === "en" && (
              <p className="novel-excerpt-translation">
                <span>{t.workingTranslationLabel}</span>
                {novel.excerptEn}
                <small>{t.workingTranslationNote}</small>
              </p>
            )}
            <cite>
              {t.novelExcerptCite}
              <a
                href={sources[novel.excerptSourceId]!.url}
                target="_blank"
                rel="noreferrer"
              >
                <Zh>{sources[novel.excerptSourceId]!.titleZh}</Zh>
                <span aria-hidden="true"> ↗</span>
              </a>
            </cite>
          </blockquote>
          {!!novel.mediaIds?.length && (
            <div
              className="historical-gallery"
              aria-label={t.historicalGalleryLabel}
            >
              <div className="historical-gallery-label">
                <span>{t.historicalGalleryTitle}</span>
                <small>{t.historicalGalleryNote}</small>
              </div>
              <div className="historical-gallery-grid">
                {novel.mediaIds.map((id) => (
                  <HistoricalImage key={id} id={id} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <section>
        <h3>
          <span>{t.sectionGameMark}</span> {t.sectionGame}
        </h3>
        <p>
          <Text>{pick(lang, marker.game, "description")}</Text>
        </p>
        {!!marker.game.mediaIds?.length && (
          <div className="game-gallery" aria-label={t.gameGalleryLabel}>
            <div className="game-gallery-label">
              <span>{t.gameGalleryTitle}</span>
              <small>{t.gameGalleryNote}</small>
            </div>
            <div className="game-gallery-grid">
              {marker.game.mediaIds.map((id) => (
                <GameImage key={id} id={id} />
              ))}
            </div>
          </div>
        )}
        <SourceLinks ids={marker.game.sources} />
      </section>
      <section>
        <h3>
          <span>{t.sectionNovelMark}</span> {t.sectionNovel}
        </h3>
        {novel ? (
          <>
            <div className="badge">
              {labels[lang].novelRelation[novel.relationship]}
            </div>
            <p className="chapter-ref">{t.novelChapters(novel.chapterNumbers)}</p>
            {(lang === "zh" ? novel.chapterTitlesZh : novel.chapterTitlesEn).map(
              (title) => (
                <p key={title} className="chapter-title">
                  {title}
                </p>
              ),
            )}
            <p>
              <Text>{pick(lang, novel, "summary")}</Text>
            </p>
            <div className="adaptation">
              <strong>{t.adaptationTitle}</strong>
              <p>
                <Text>{pick(lang, novel, "adaptationNote")}</Text>
              </p>
            </div>
            <SourceLinks ids={novel.sources} />
          </>
        ) : (
          <p>
            <Text>{pickMaybe(lang, marker, "noDirectNovel")}</Text>
          </p>
        )}
      </section>
      {marker.realWorld?.map((site) => (
        <section key={site.nameZh} className="heritage-section">
          <h3>
            <span>{t.sectionHeritageMark}</span> {t.sectionHeritage}
          </h3>
          <p className="eyebrow">{pick(lang, site, "location")}</p>
          <h4>
            {pick(lang, site, "name")}
            <OriginalName className="card-original-name">
              {site.nameZh}
            </OriginalName>
          </h4>
          <div className="badges">
            <span className="badge">
              {labels[lang].heritageRelation[site.relationship]}
            </span>
            <span className="badge">
              {labels[lang].confidence[site.confidence]}
            </span>
            <span className="badge">
              {labels[lang].evidence[site.evidenceType]}
            </span>
          </div>
          <p>
            <Text>{pick(lang, site, "description")}</Text>
          </p>
          {site.mediaIds?.map((id) => (
            <HeritagePhoto key={id} id={id} />
          ))}
          <div className="evidence-scope">
            <strong>{t.evidenceScopeTitle}</strong>
            <p>
              <Text>{pick(lang, site, "evidenceScope")}</Text>
            </p>
          </div>
          <SourceLinks ids={site.sources} />
        </section>
      ))}
      {!!marker.funFacts.length && (
        <section>
          <h3>{t.funFactsTitle}</h3>
          {marker.funFacts.map((f) => (
            <div key={f.textZh}>
              <p>
                <Text>{pick(lang, f, "text")}</Text>
              </p>
              <SourceLinks ids={f.sources} />
            </div>
          ))}
        </section>
      )}
      {marker.spoiler && (
        <details className="spoiler">
          <summary data-sound="open">
            {pick(lang, marker.spoiler, "warning")}
          </summary>
          <p>
            <Text>{pick(lang, marker.spoiler, "text")}</Text>
          </p>
          <SourceLinks ids={marker.spoiler.sources} />
        </details>
      )}
    </article>
  );
}
