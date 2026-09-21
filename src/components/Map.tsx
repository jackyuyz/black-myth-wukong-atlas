import type { Chapter, Marker } from "../types/schema";
import { media, chapters } from "../data";
import { LocaleLink, Text, pick, pickMaybe, useLang, useUi } from "../i18n";
export function MapSymbol({ type }: { type: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      {["location", "architecture"].includes(type) ? (
        <>
          <path d="M4 14l12-8 12 8H4Zm3 2h18M9 16v11m14-11v11M5 27h22M14 20h4v7M16 3v3" />
        </>
      ) : type === "item" ? (
        <>
          <path d="M10 7h12l-2 7 5 12H7l5-12-2-7ZM11 11h10M12 21h8M16 3v4" />
        </>
      ) : (
        <>
          <path d="M8 10 6 4l8 5h4l8-5-2 6 2 9-10 9L6 19l2-9Z" />
          <path d="m10 15 4 2m8-2-4 2m-6 6h8M16 17v4" />
        </>
      )}
    </svg>
  );
}
export function InteractiveMap({
  chapter,
  visible,
  onSelect,
}: {
  chapter: Chapter;
  visible: Marker[];
  onSelect: (marker: Marker) => void;
}) {
  const lang = useLang();
  const t = useUi();
  const positionFor = (id: string) =>
    chapter.markers.find((m) => m.id === id)?.position ??
    chapter.anchors.find((a) => a.id === id)!.position;
  return (
    <div className="map-frame">
      <div className="map-topline">
        <span>{t.mapTopLeft}</span>
        <span>{t.mapTopRight}</span>
      </div>
      <div
        className="map-static-viewport"
        tabIndex={0}
        role="region"
        aria-label={t.mapRegionLabel(pick(lang, chapter, "region"))}
      >
        <div
          className="map-canvas"
          style={{
            backgroundImage: `linear-gradient(to right, #1a251c 0%, transparent 7%, transparent 93%, #1a251c 100%), linear-gradient(to bottom, #1a251c 0%, transparent 7%, transparent 93%, #1a251c 100%), url(${media[chapter.mapMediaId!].file})`,
          }}
        >
          <svg
            className="route-lines"
            viewBox="0 0 1200 700"
            aria-hidden="true"
          >
            {chapter.routes.map((edge, i) => {
              const a = positionFor(edge.from),
                b = positionFor(edge.to);
              return (
                <path
                  key={i}
                  className={`route ${edge.kind} ${edge.mode}`}
                  d={
                    edge.mode === "return"
                      ? `M${a.x * 1200} ${a.y * 700} C1150 492 892 405 ${b.x * 1200} ${b.y * 700}`
                      : `M${a.x * 1200} ${a.y * 700} L${b.x * 1200} ${b.y * 700}`
                  }
                />
              );
            })}
          </svg>
          {chapter.areas.map((area) => (
            <div
              key={area.id}
              className="map-area"
              style={{
                left: `${area.position.x * 100}%`,
                top: `${area.position.y * 100}%`,
              }}
            >
              {pick(lang, area, "name")}
            </div>
          ))}
          {chapter.anchors.map((a) => (
            <div
              className="map-anchor"
              key={a.id}
              style={{
                left: `${a.position.x * 100}%`,
                top: `${a.position.y * 100}%`,
              }}
            >
              <span>◇</span>
              {pick(lang, a, "name")}
            </div>
          ))}
          {chapter.markers
            .filter((m) => m.position)
            .map((m) => (
              <a
                key={m.id}
                id={`map-${m.id}`}
                className={`map-marker ${visible.some((v) => v.id === m.id) ? "" : "filtered-out"}`}
                href={`#${m.id}`}
                aria-label={t.mapMarkerLabel(pick(lang, m, "name"))}
                style={{
                  left: `${m.position!.x * 100}%`,
                  top: `${m.position!.y * 100}%`,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(m);
                }}
                data-sound="marker"
              >
                <span className="marker-glyph">
                  <MapSymbol type={m.type} />
                </span>
                <span className="marker-label">{pick(lang, m, "name")}</span>
              </a>
            ))}
          {chapter.routes.some((route) => route.mode === "teleport") && (
            <div className="map-note note-teleport">{t.mapNoteTeleport}</div>
          )}
          {chapter.routes.some((route) => route.mode === "return") && (
            <div className="map-note note-return">{t.mapNoteReturn}</div>
          )}
          {chapter.routes.some((route) => route.mode === "reward") && (
            <div className="map-note note-reward">{t.mapNoteReward}</div>
          )}
          <span className="map-seal" aria-hidden="true">
            {t.mapSealTop}
            <br />
            {t.mapSealBottom}
          </span>
        </div>
      </div>
      <div className="map-bottomline">
        <span>{pick(lang, chapter, "mapNotice")}</span>
        <span className="map-mobile-hint">{t.mapMobileHint}</span>
      </div>
    </div>
  );
}
export function RouteConditions({ chapter }: { chapter: Chapter }) {
  const lang = useLang();
  const t = useUi();
  return (
    <details className="route-explanation">
      <summary data-sound="open">{t.routeSummary}</summary>
      <p>{t.routeText}</p>
      {chapter.routes
        .filter((r) => r.conditionZh)
        .map((r) => (
          <p key={`${r.from}-${r.to}`}>
            <strong>
              {pickMaybe(lang, r, "label")}
              {t.labelSeparator}
            </strong>
            <Text>{pickMaybe(lang, r, "condition")}</Text>
          </p>
        ))}
    </details>
  );
}
export function HomeMapPreview() {
  const lang = useLang();
  const t = useUi();
  const chapter = chapters[0];
  const nodes = [
    ...chapter.markers
      .filter((m) => m.position)
      .map((m) => ({ id: m.id, position: m.position! })),
    ...chapter.anchors,
  ];
  const pos = (id: string) => nodes.find((n) => n.id === id)!.position;
  const temple = chapter.markers.find((m) => m.id === "guanyin-temple")!;
  return (
    <div className="home-map-preview" aria-label={t.homePreviewLabel}>
      <svg viewBox="0 0 1200 700" aria-hidden="true">
        {chapter.routes.map((edge, i) => {
          const a = pos(edge.from),
            b = pos(edge.to);
          return (
            <path
              key={i}
              d={`M${a.x * 1200} ${a.y * 700} L${b.x * 1200} ${b.y * 700}`}
              strokeDasharray={edge.kind === "optional" ? "6 10" : undefined}
            />
          );
        })}
        {nodes.map((n) => (
          <circle
            key={n.id}
            cx={n.position.x * 1200}
            cy={n.position.y * 700}
            r="6"
          />
        ))}
      </svg>
      <span className="preview-region first">
        {pick(lang, chapter.areas[0], "name")}
      </span>
      <span className="preview-region second">
        {pick(lang, chapter.areas[1], "name")}
      </span>
      <span className="preview-region third">
        {pick(lang, chapter.areas[2], "name")}
      </span>
      <LocaleLink
        className="preview-temple"
        to={`/chapter/${chapter.id}#guanyin-temple`}
        data-sound="marker"
      >
        <MapSymbol type="architecture" />
        {pick(lang, temple, "name")} <span>↗</span>
      </LocaleLink>
      <p>{pick(lang, chapter, "mapNotice")}</p>
    </div>
  );
}
