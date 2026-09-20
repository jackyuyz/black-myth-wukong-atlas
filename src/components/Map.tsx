import { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import type { Chapter, Marker } from "../types/schema";
import { media, chapters } from "../data";
const MAP_WIDTH = 1400;
const MAP_HEIGHT = 820;
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
  const host = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1000);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(610);
  const [reduced, setReduced] = useState(false);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (!host.current) return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);
    });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!expanded) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", close);
    };
  }, [expanded]);
  const initialScale =
    width < 700
      ? 0.62
      : Math.max(
          0.5,
          Math.min(
            (width - 35) / MAP_WIDTH,
            (height - 90) / MAP_HEIGHT,
            expanded ? 1.18 : 1.02,
          ),
        );
  const positionFor = (id: string) =>
    chapter.markers.find((m) => m.id === id)?.position ??
    chapter.anchors.find((a) => a.id === id)!.position;
  return (
    <div
      className={`map-frame${expanded ? " is-expanded" : ""}`}
      ref={host}
    >
      <div className="map-topline">
        <span>按住拖拽 · 滚轮缩放 · 点选印记</span>
        <button
          className="map-expand-toggle"
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-label={expanded ? "退出大图模式" : "放大地图"}
          aria-pressed={expanded}
        >
          {expanded ? "退出大图" : "展开大图"}
        </button>
      </div>
      <TransformWrapper
        key={`${initialScale}-${expanded}`}
        initialScale={initialScale}
        minScale={0.3}
        maxScale={3.2}
        centerOnInit={width >= 700}
        initialPositionX={width < 700 ? 24 : 0}
        initialPositionY={width < 700 ? (height - 700 * initialScale) / 2 : 0}
        limitToBounds={false}
        wheel={{ step: 0.1 }}
        panning={{ excluded: ["map-marker", "map-expand-toggle"] }}
        doubleClick={{ disabled: true }}
        onTransformed={(_, state) => setScale(state.scale)}
      >
        {({ zoomIn, zoomOut, resetTransform, centerView, zoomToElement }) => (
          <>
            <TransformComponent
              wrapperClass="map-viewport"
              contentClass="map-content"
            >
              <div
                className="map-canvas"
                style={{
                  backgroundImage: `url(${media[chapter.mapMediaId!].file})`,
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
                    {area.nameZh}
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
                    {a.nameZh}
                  </div>
                ))}
                {chapter.markers
                  .filter((m) => m.position)
                  .map((m) => (
                    <a
                      key={m.id}
                      id={`map-${m.id}`}
                      onFocus={(event) => {
                        if (event.currentTarget.matches(":focus-visible"))
                          zoomToElement(
                            `map-${m.id}`,
                            Math.max(initialScale, 0.8),
                            0,
                          );
                      }}
                      className={`map-marker ${visible.some((v) => v.id === m.id) ? "" : "filtered-out"}`}
                      href={`#${m.id}`}
                      aria-label={`阅读${m.nameZh}`}
                      style={{
                        left: `${m.position!.x * 100}%`,
                        top: `${m.position!.y * 100}%`,
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelect(m);
                      }}
                    >
                      <span className="marker-glyph">
                        <MapSymbol type={m.type} />
                      </span>
                      <span className="marker-label">{m.nameZh}</span>
                    </a>
                  ))}
                {chapter.routes.some((route) => route.mode === "teleport") && (
                  <div className="map-note note-teleport">条件传送</div>
                )}
                {chapter.routes.some((route) => route.mode === "return") && (
                  <div className="map-note note-return">回行路线</div>
                )}
                {chapter.routes.some((route) => route.mode === "reward") && (
                  <div className="map-note note-reward">条件取得</div>
                )}
                <span className="map-seal" aria-hidden="true">
                  山川
                  <br />
                  有据
                </span>
              </div>
            </TransformComponent>
            <div className="map-controls" aria-label="地图视图控制">
              <button
                onClick={() => zoomIn(0.2, reduced ? 0 : 200)}
                aria-label="放大地图"
              >
                ＋
              </button>
              <span aria-live="off">{Math.round(scale * 100)}%</span>
              <button
                onClick={() => zoomOut(0.2, reduced ? 0 : 200)}
                aria-label="缩小地图"
              >
                −
              </button>
              <button
                onClick={() => {
                  resetTransform(0);
                  if (width >= 700) centerView(initialScale, 0);
                }}
                aria-label="重置地图视图"
              >
                复位
              </button>
            </div>
          </>
        )}
      </TransformWrapper>
      <div className="map-bottomline">
        <span>{chapter.mapNoticeZh}</span>
        <span>鼠标滚轮 / 双指缩放 · Esc 退出大图</span>
      </div>
    </div>
  );
}
export function RouteConditions({ chapter }: { chapter: Chapter }) {
  return (
    <details className="route-explanation">
      <summary>读图说明：主线、可选探索与条件传送</summary>
      <p>
        实线表示主要区域先后，虚线表示可选探索，点线表示传送与返回。连线省略了中间路段，不代表直达路线；人物点的布局也不表示实际岔路。
      </p>
      {chapter.routes
        .filter((r) => r.conditionZh)
        .map((r) => (
          <p key={`${r.from}-${r.to}`}>
            <strong>{r.labelZh}：</strong>
            {r.conditionZh}
          </p>
        ))}
    </details>
  );
}
export function HomeMapPreview() {
  const chapter = chapters[0];
  const nodes = [
    ...chapter.markers
      .filter((m) => m.position)
      .map((m) => ({ id: m.id, position: m.position! })),
    ...chapter.anchors,
  ];
  const pos = (id: string) => nodes.find((n) => n.id === id)!.position;
  return (
    <div className="home-map-preview" aria-label="第一回路线预览">
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
      <span className="preview-region first">{chapter.areas[0].nameZh}</span>
      <span className="preview-region second">{chapter.areas[1].nameZh}</span>
      <span className="preview-region third">{chapter.areas[2].nameZh}</span>
      <a
        className="preview-temple"
        href={`/chapter/${chapter.id}#guanyin-temple`}
      >
        <MapSymbol type="architecture" />
        {chapter.markers.find((m) => m.id === "guanyin-temple")!.nameZh}{" "}
        <span>↗</span>
      </a>
      <p>{chapter.mapNoticeZh}</p>
    </div>
  );
}
