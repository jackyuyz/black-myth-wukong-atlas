import type { Marker } from "../types/schema";
import {
  typeLabels,
  confidenceLabels,
  evidenceLabels,
  sourceLabels,
} from "../types/schema";
import { media, sources } from "../data";
export function SourceLinks({ ids }: { ids: string[] }) {
  return (
    <ul className="citations">
      {[...new Set(ids)].map((id) => (
        <li key={id}>
          <a href={sources[id].url} target="_blank" rel="noreferrer">
            {sources[id].titleZh}
            <span aria-hidden="true"> ↗</span>
          </a>
          <small>{sourceLabels[sources[id].type]}</small>
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
  const item = media[id];
  return (
    <figure className={compact ? "heritage-photo compact" : "heritage-photo"}>
      <img
        src={item.file}
        alt={item.altZh}
        loading="lazy"
        width="960"
        height="720"
      />
      <figcaption>
        <strong>{item.titleZh}</strong>
        <span>
          摄影：{item.creator} ·{" "}
          <a href={item.sourceUrl} target="_blank" rel="noreferrer">
            图片来源 ↗
          </a>{" "}
          ·{" "}
          <a href={item.licenseUrl} target="_blank" rel="noreferrer">
            署名—相同方式共享 4.0
          </a>
        </span>
        {!compact && <span>{item.modificationNoteZh}</span>}
      </figcaption>
    </figure>
  );
}
function HistoricalImage({ id }: { id: string }) {
  const item = media[id];
  return (
    <figure className="historical-image">
      <div className="historical-image-mat">
        <img
          src={item.file}
          alt={item.altZh}
          loading="lazy"
          width="720"
          height="540"
        />
      </div>
      <figcaption>
        <strong>{item.titleZh}</strong>
        <span>{item.usageNoteZh}</span>
        <span>
          {item.creator} ·{" "}
          <a href={item.sourceUrl} target="_blank" rel="noreferrer">
            图像来源 ↗
          </a>
          {item.licenseUrl && (
            <>
              {" · "}
              <a href={item.licenseUrl} target="_blank" rel="noreferrer">
                {item.license}
              </a>
            </>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
function GameImage({ id }: { id: string }) {
  const item = media[id];
  return (
    <figure className="game-image">
      <div className="game-image-frame">
        <img
          src={item.file}
          alt={item.altZh}
          loading="lazy"
          width="1280"
          height="720"
        />
        <span className="game-image-stamp">授权画面</span>
      </div>
      <figcaption>
        <strong>{item.titleZh}</strong>
        <span>{item.usageNoteZh}</span>
        <span>
          {item.creator} ·{" "}
          <a href={item.sourceUrl} target="_blank" rel="noreferrer">
            图片出处 ↗
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
export function ReadingCard({ marker }: { marker: Marker }) {
  const novel = marker.journeyToTheWest;
  return (
    <article className="reading-card">
      <div className="eyebrow">
        {marker.areaZh} <span> / </span> {typeLabels[marker.type]}
      </div>
      <h2>{marker.nameZh}</h2>
      <p className="card-deck">{marker.summaryZh}</p>
      <p className="reading-key">
        游戏中的呈现 → 原著中的出处与改编
        {marker.realWorld ? " → 现实文化与实地遗产" : ""}
      </p>
      {novel && (
        <div className="novel-frontispiece">
          <blockquote className="novel-excerpt novel-excerpt-featured">
            <span className="novel-excerpt-label">《西游记》原著原文</span>
            <p>{novel.excerptZh}</p>
            <cite>
              原文节选 ·{" "}
              <a
                href={sources[novel.excerptSourceId]!.url}
                target="_blank"
                rel="noreferrer"
              >
                {sources[novel.excerptSourceId]!.titleZh}
                <span aria-hidden="true"> ↗</span>
              </a>
            </cite>
          </blockquote>
          {!!novel.mediaIds?.length && (
            <div className="historical-gallery" aria-label="原著历史图像参考">
              <div className="historical-gallery-label">
                <span>原著图像参考</span>
                <small>历史版本图像 · 非游戏造型</small>
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
          <span>一</span> 游戏中的呈现
        </h3>
        <p>{marker.game.descriptionZh}</p>
        {!!marker.game.mediaIds?.length && (
          <div className="game-gallery" aria-label="游戏画面参考">
            <div className="game-gallery-label">
              <span>游戏画面参考</span>
              <small>授权素材 · 对应当前节点</small>
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
          <span>二</span> 《西游记》中的出处与改编
        </h3>
        {novel ? (
          <>
            <div className="badge">
              {novel.relationship === "direct"
                ? "原著直接出现"
                : "原著元素重组"}
            </div>
            <p className="chapter-ref">
              {novel.chapterNumbers.map((n) => `第${n}回`).join("、")}
            </p>
            {novel.chapterTitlesZh.map((t) => (
              <p key={t} className="chapter-title">
                {t}
              </p>
            ))}
            <p>{novel.summaryZh}</p>
            <div className="adaptation">
              <strong>游戏怎样改写</strong>
              <p>{novel.adaptationNoteZh}</p>
            </div>
            <SourceLinks ids={novel.sources} />
          </>
        ) : (
          <p>{marker.noDirectNovelZh}</p>
        )}
      </section>
      {marker.realWorld?.map((site) => (
        <section key={site.nameZh} className="heritage-section">
          <h3>
            <span>三</span> 现实文化与实地遗产
          </h3>
          <p className="eyebrow">{site.locationZh}</p>
          <h4>{site.nameZh}</h4>
          <div className="badges">
            <span className="badge">
              {site.relationship === "cultural-comparison"
                ? "现实文化对照"
                : "开发者确认采用"}
            </span>
            <span className="badge">{confidenceLabels[site.confidence]}</span>
            <span className="badge">{evidenceLabels[site.evidenceType]}</span>
          </div>
          <p>{site.descriptionZh}</p>
          {site.mediaIds?.map((id) => (
            <HeritagePhoto key={id} id={id} />
          ))}
          <div className="evidence-scope">
            <strong>这条证据能说明什么？</strong>
            <p>{site.evidenceScopeZh}</p>
          </div>
          <SourceLinks ids={site.sources} />
        </section>
      ))}
      {!!marker.funFacts.length && (
        <section>
          <h3>再多看一眼</h3>
          {marker.funFacts.map((f) => (
            <div key={f.textZh}>
              <p>{f.textZh}</p>
              <SourceLinks ids={f.sources} />
            </div>
          ))}
        </section>
      )}
      {marker.spoiler && (
        <details className="spoiler">
          <summary>{marker.spoiler.warningZh}</summary>
          <p>{marker.spoiler.textZh}</p>
          <SourceLinks ids={marker.spoiler.sources} />
        </details>
      )}
    </article>
  );
}
