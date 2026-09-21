import { useEffect, useRef, useState } from "react";

type SoundKind =
  | "click"
  | "select"
  | "marker"
  | "open"
  | "close"
  | "navigate";

const SOUND_STORAGE_KEY = "wukong-atlas-interface-sound";

function strike(
  context: AudioContext,
  options: {
    type: OscillatorType;
    from: number;
    to: number;
    delay?: number;
    duration: number;
    volume: number;
  },
) {
  const start = context.currentTime + (options.delay ?? 0);
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  oscillator.type = options.type;
  oscillator.frequency.setValueAtTime(options.from, start);
  oscillator.frequency.exponentialRampToValueAtTime(options.to, start + options.duration);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1800, start);
  filter.Q.setValueAtTime(0.7, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(options.volume, start + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + options.duration);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + options.duration + 0.02);
}

function bladeDraw(context: AudioContext) {
  const start = context.currentTime;
  const duration = 0.105;
  const frameCount = Math.ceil(context.sampleRate * duration);
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const samples = buffer.getChannelData(0);

  for (let index = 0; index < frameCount; index += 1) {
    const progress = index / frameCount;
    const edge = Math.sin(Math.PI * progress) * (1 - progress * 0.35);
    samples[index] = (Math.random() * 2 - 1) * edge;
  }

  const scrape = context.createBufferSource();
  const scrapeTone = context.createBiquadFilter();
  const scrapeGain = context.createGain();

  scrape.buffer = buffer;
  scrapeTone.type = "bandpass";
  scrapeTone.frequency.setValueAtTime(1050, start);
  scrapeTone.frequency.exponentialRampToValueAtTime(4300, start + duration);
  scrapeTone.Q.setValueAtTime(1.15, start);
  scrapeTone.Q.linearRampToValueAtTime(2.1, start + duration);
  scrapeGain.gain.setValueAtTime(0.0001, start);
  scrapeGain.gain.exponentialRampToValueAtTime(0.032, start + 0.01);
  scrapeGain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  scrape.connect(scrapeTone);
  scrapeTone.connect(scrapeGain);

  if (typeof context.createStereoPanner === "function") {
    const pan = context.createStereoPanner();
    pan.pan.setValueAtTime(-0.2, start);
    pan.pan.linearRampToValueAtTime(0.2, start + duration);
    scrapeGain.connect(pan);
    pan.connect(context.destination);
  } else {
    scrapeGain.connect(context.destination);
  }

  scrape.start(start);
  scrape.stop(start + duration);

  [
    { frequency: 1760, end: 1640, volume: 0.019, ring: 0.14 },
    { frequency: 2670, end: 2440, volume: 0.008, ring: 0.1 },
  ].forEach(({ frequency, end, volume, ring }) => {
    const ringStart = start + 0.03;
    const oscillator = context.createOscillator();
    const ringGain = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, ringStart);
    oscillator.frequency.exponentialRampToValueAtTime(end, ringStart + ring);
    ringGain.gain.setValueAtTime(0.0001, ringStart);
    ringGain.gain.exponentialRampToValueAtTime(volume, ringStart + 0.003);
    ringGain.gain.exponentialRampToValueAtTime(0.0001, ringStart + ring);
    oscillator.connect(ringGain);
    ringGain.connect(context.destination);
    oscillator.start(ringStart);
    oscillator.stop(ringStart + ring + 0.01);
  });

  strike(context, {
    type: "triangle",
    from: 145,
    to: 92,
    delay: 0.026,
    duration: 0.065,
    volume: 0.018,
  });
}

function playSound(context: AudioContext, kind: SoundKind) {
  switch (kind) {
    case "marker":
      strike(context, {
        type: "triangle",
        from: 205,
        to: 128,
        duration: 0.11,
        volume: 0.038,
      });
      strike(context, {
        type: "sine",
        from: 760,
        to: 520,
        delay: 0.018,
        duration: 0.13,
        volume: 0.016,
      });
      break;
    case "open":
      strike(context, {
        type: "sine",
        from: 285,
        to: 420,
        duration: 0.13,
        volume: 0.027,
      });
      strike(context, {
        type: "triangle",
        from: 570,
        to: 710,
        delay: 0.028,
        duration: 0.1,
        volume: 0.012,
      });
      break;
    case "close":
      strike(context, {
        type: "triangle",
        from: 410,
        to: 225,
        duration: 0.1,
        volume: 0.027,
      });
      break;
    case "navigate":
      bladeDraw(context);
      break;
    case "select":
      strike(context, {
        type: "triangle",
        from: 330,
        to: 245,
        duration: 0.085,
        volume: 0.03,
      });
      strike(context, {
        type: "sine",
        from: 640,
        to: 555,
        delay: 0.012,
        duration: 0.08,
        volume: 0.011,
      });
      break;
    default:
      strike(context, {
        type: "triangle",
        from: 255,
        to: 175,
        duration: 0.075,
        volume: 0.03,
      });
      strike(context, {
        type: "sine",
        from: 720,
        to: 510,
        delay: 0.01,
        duration: 0.06,
        volume: 0.01,
      });
  }
}

export function InterfaceSounds() {
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  const contextRef = useRef<AudioContext | null>(null);

  const getContext = () => {
    if (contextRef.current) return contextRef.current;
    const AudioContextConstructor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextConstructor) return null;
    contextRef.current = new AudioContextConstructor();
    return contextRef.current;
  };

  const play = (kind: SoundKind) => {
    const context = getContext();
    if (!context) return;
    if (context.state === "suspended") void context.resume();
    playSound(context, kind);
  };

  useEffect(() => {
    const stored = window.localStorage.getItem(SOUND_STORAGE_KEY);
    const next = stored !== "off";
    enabledRef.current = next;
    setEnabled(next);

    const handleClick = (event: MouseEvent) => {
      if (!enabledRef.current) return;
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      const trigger = origin.closest<HTMLElement>("[data-sound]");
      if (!trigger || trigger.matches(":disabled")) return;
      play((trigger.dataset.sound as SoundKind) || "click");
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      if (contextRef.current) void contextRef.current.close();
      contextRef.current = null;
    };
  }, []);

  const toggle = () => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    window.localStorage.setItem(SOUND_STORAGE_KEY, next ? "on" : "off");
    if (next) play("open");
  };

  return (
    <button
      className="sound-toggle"
      type="button"
      aria-pressed={enabled}
      aria-label={`界面声音：${enabled ? "开启" : "关闭"}`}
      onClick={toggle}
    >
      <span>界面声音</span>
      <b>{enabled ? "开" : "关"}</b>
    </button>
  );
}
