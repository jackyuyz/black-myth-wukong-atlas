import { useCallback, useEffect, useRef, useState } from "react";
import { media } from "../data";
import { useUi } from "../i18n";
import { LanguageToggle } from "./LanguageToggle";

const MUSIC_ENABLED_KEY = "wukong-atlas-background-music";
const MUSIC_TRACK_KEY = "wukong-atlas-background-track";
const MUSIC_POSITION_KEY = "wukong-atlas-background-position";
const MUSIC_VOLUME = 0.24;
const VIEWPORT_GUTTER = 12;

const tracks = [
  { id: "music-black-cloud-red-fire", title: "Black Cloud, Red Fire" },
  { id: "music-smoke-rises-high", title: "Smoke Rises High" },
  { id: "music-mischievous-as-ever", title: "Mischievous As Ever" },
] as const;

type Position = { x: number; y: number };

export function BackgroundMusic() {
  const t = useUi();
  const audioRef = useRef<HTMLAudioElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const positionRef = useRef<Position | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [dragging, setDragging] = useState(false);
  const current = tracks[trackIndex];

  const clampPosition = useCallback((next: Position): Position => {
    const panel = panelRef.current;
    if (!panel) return next;
    const maxX = Math.max(VIEWPORT_GUTTER, window.innerWidth - panel.offsetWidth - VIEWPORT_GUTTER);
    const maxY = Math.max(VIEWPORT_GUTTER, window.innerHeight - panel.offsetHeight - VIEWPORT_GUTTER);
    return {
      x: Math.min(Math.max(next.x, VIEWPORT_GUTTER), maxX),
      y: Math.min(Math.max(next.y, VIEWPORT_GUTTER), maxY),
    };
  }, []);

  const placePanel = useCallback(
    (next: Position) => {
      const clamped = clampPosition(next);
      positionRef.current = clamped;
      setPosition(clamped);
      return clamped;
    },
    [clampPosition],
  );

  useEffect(() => {
    const storedEnabled = window.localStorage.getItem(MUSIC_ENABLED_KEY);
    const storedTrack = Number(window.localStorage.getItem(MUSIC_TRACK_KEY));
    const storedPosition = window.localStorage.getItem(MUSIC_POSITION_KEY);
    setEnabled(storedEnabled !== "off");
    setTrackIndex(
      Number.isInteger(storedTrack) &&
        storedTrack >= 0 &&
        storedTrack < tracks.length
        ? storedTrack
        : 0,
    );
    if (storedPosition) {
      try {
        const parsed = JSON.parse(storedPosition) as Partial<Position>;
        if (Number.isFinite(parsed.x) && Number.isFinite(parsed.y)) {
          positionRef.current = { x: parsed.x as number, y: parsed.y as number };
          setPosition(positionRef.current);
        }
      } catch {
        window.localStorage.removeItem(MUSIC_POSITION_KEY);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !positionRef.current) return;
    placePanel(positionRef.current);
  }, [placePanel, ready]);

  useEffect(() => {
    const keepInViewport = () => {
      if (!positionRef.current) return;
      const next = placePanel(positionRef.current);
      window.localStorage.setItem(MUSIC_POSITION_KEY, JSON.stringify(next));
    };
    window.addEventListener("resize", keepInViewport);
    return () => window.removeEventListener("resize", keepInViewport);
  }, [placePanel]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(MUSIC_ENABLED_KEY, enabled ? "on" : "off");
    window.localStorage.setItem(MUSIC_TRACK_KEY, String(trackIndex));
  }, [enabled, ready, trackIndex]);

  useEffect(() => {
    if (!ready) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = MUSIC_VOLUME;

    if (!enabled) {
      audio.pause();
      setAutoplayBlocked(false);
      return;
    }

    let disposed = false;
    const removeUnlockListeners = () => {
      document.removeEventListener("pointerdown", unlock, true);
      document.removeEventListener("keydown", unlock, true);
    };
    const start = async () => {
      try {
        await audio.play();
        if (!disposed) setAutoplayBlocked(false);
        removeUnlockListeners();
      } catch {
        if (!disposed) setAutoplayBlocked(true);
      }
    };
    const unlock = () => void start();

    void start();
    document.addEventListener("pointerdown", unlock, {
      capture: true,
      once: true,
    });
    document.addEventListener("keydown", unlock, {
      capture: true,
      once: true,
    });

    return () => {
      disposed = true;
      removeUnlockListeners();
    };
  }, [enabled, ready, trackIndex]);

  const moveTrack = (offset: number) => {
    setTrackIndex((index) => (index + offset + tracks.length) % tracks.length);
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      setEnabled(true);
      void audio.play().then(
        () => setAutoplayBlocked(false),
        () => setAutoplayBlocked(true),
      );
    } else {
      setEnabled(false);
      audio.pause();
    }
  };

  const beginDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    dragRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
    placePanel({ x: rect.left, y: rect.top });
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const drag = (event: React.PointerEvent<HTMLButtonElement>) => {
    const active = dragRef.current;
    if (!active || active.pointerId !== event.pointerId) return;
    placePanel({
      x: event.clientX - active.offsetX,
      y: event.clientY - active.offsetY,
    });
  };

  const finishDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    if (positionRef.current) {
      window.localStorage.setItem(
        MUSIC_POSITION_KEY,
        JSON.stringify(positionRef.current),
      );
    }
  };

  const moveWithKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const direction: Record<string, Position> = {
      ArrowLeft: { x: -16, y: 0 },
      ArrowRight: { x: 16, y: 0 },
      ArrowUp: { x: 0, y: -16 },
      ArrowDown: { x: 0, y: 16 },
    };
    const delta = direction[event.key];
    if (!delta) return;
    event.preventDefault();
    const rect = panelRef.current?.getBoundingClientRect();
    const origin = positionRef.current ?? {
      x: rect?.left ?? VIEWPORT_GUTTER,
      y: rect?.top ?? VIEWPORT_GUTTER,
    };
    const next = placePanel({ x: origin.x + delta.x, y: origin.y + delta.y });
    window.localStorage.setItem(MUSIC_POSITION_KEY, JSON.stringify(next));
  };

  return (
    <aside
      ref={panelRef}
      className={`background-music${playing ? " is-playing" : ""}${dragging ? " is-dragging" : ""}`}
      aria-label={`${t.musicRegionLabel}: ${current.title}`}
      style={
        position
          ? { left: position.x, top: position.y, right: "auto", bottom: "auto" }
          : undefined
      }
    >
      <button
        type="button"
        className="music-drag-handle"
        aria-label={t.musicDragHandle}
        title={t.musicDragHandle}
        onPointerDown={beginDrag}
        onPointerMove={drag}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onKeyDown={moveWithKeyboard}
      >
        <span aria-hidden="true">•••</span>
      </button>
      <span className="music-orbit" aria-hidden="true" />
      <div className="music-controls">
        <button
          className="music-skip"
          type="button"
          onClick={() => moveTrack(-1)}
          aria-label={t.musicPrevious}
          title={t.musicPrevious}
        >
          ‹
        </button>
        <button
          className="music-toggle"
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? t.musicPause : t.musicPlay}
          title={playing ? t.musicPause : t.musicPlay}
        >
          <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
        </button>
        <button
          className="music-skip"
          type="button"
          onClick={() => moveTrack(1)}
          aria-label={t.musicNext}
          title={t.musicNext}
        >
          ›
        </button>
      </div>
      <LanguageToggle variant="floating" />
      <p className="music-status" aria-live="polite">
        {t.musicNowPlaying}: {current.title}
        {enabled && autoplayBlocked ? `. ${t.musicAutoplayBlocked}` : ""}
      </p>
      <audio
        ref={audioRef}
        src={media[current.id].file}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => moveTrack(1)}
      />
    </aside>
  );
}
