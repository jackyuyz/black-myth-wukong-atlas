import { useEffect, useRef, useState } from "react";
import { media } from "../data";
import { useUi } from "../i18n";

const MUSIC_ENABLED_KEY = "wukong-atlas-background-music";
const MUSIC_TRACK_KEY = "wukong-atlas-background-track";
const MUSIC_VOLUME = 0.24;

const tracks = [
  { id: "music-black-cloud-red-fire", title: "Black Cloud, Red Fire" },
  { id: "music-smoke-rises-high", title: "Smoke Rises High" },
  { id: "music-mischievous-as-ever", title: "Mischievous As Ever" },
] as const;

export function BackgroundMusic() {
  const t = useUi();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const current = tracks[trackIndex];

  useEffect(() => {
    const storedEnabled = window.localStorage.getItem(MUSIC_ENABLED_KEY);
    const storedTrack = Number(window.localStorage.getItem(MUSIC_TRACK_KEY));
    setEnabled(storedEnabled !== "off");
    setTrackIndex(
      Number.isInteger(storedTrack) &&
        storedTrack >= 0 &&
        storedTrack < tracks.length
        ? storedTrack
        : 0,
    );
    setReady(true);
  }, []);

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
    const next = !enabled;
    setEnabled(next);
    if (!next) audioRef.current?.pause();
    else {
      void audioRef.current?.play().then(
        () => setAutoplayBlocked(false),
        () => setAutoplayBlocked(true),
      );
    }
  };

  return (
    <aside className="background-music" aria-label={t.musicRegionLabel}>
      <div className="music-copy" aria-live="polite">
        <span>
          <span aria-hidden="true">♪</span> {t.musicLabel}
        </span>
        <strong>{current.title}</strong>
        {enabled && autoplayBlocked && <small>{t.musicAutoplayBlocked}</small>}
      </div>
      <select
        className="music-track-select"
        aria-label={t.musicTrackLabel}
        value={trackIndex}
        onChange={(event) => setTrackIndex(Number(event.target.value))}
      >
        {tracks.map((track, index) => (
          <option value={index} key={track.id}>
            {track.title}
          </option>
        ))}
      </select>
      <div className="music-controls">
        <button
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
          aria-pressed={enabled}
          aria-label={enabled ? t.musicPause : t.musicPlay}
          title={enabled ? t.musicPause : t.musicPlay}
        >
          {enabled ? "Ⅱ" : "▶"}
        </button>
        <button
          type="button"
          onClick={() => moveTrack(1)}
          aria-label={t.musicNext}
          title={t.musicNext}
        >
          ›
        </button>
      </div>
      <audio
        ref={audioRef}
        src={media[current.id].file}
        preload="metadata"
        onEnded={() => moveTrack(1)}
      />
    </aside>
  );
}
