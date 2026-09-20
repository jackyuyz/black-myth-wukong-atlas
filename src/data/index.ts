import ch1 from "./chapters/chapter-01.json";
import ch2 from "./chapters/chapter-02.json";
import ch3 from "./chapters/chapter-03.json";
import ch4 from "./chapters/chapter-04.json";
import ch5 from "./chapters/chapter-05.json";
import ch6 from "./chapters/chapter-06.json";
import mediaData from "./media.json";
import sourcesData from "./sources.json";
import type { Chapter, Media, Source } from "../types/schema";
export const chapters = [ch1, ch2, ch3, ch4, ch5, ch6] as Chapter[];
export const media = mediaData as Record<string, Media>;
export const sources = sourcesData as Record<string, Source>;
export const allRoutes = [
  "/",
  "/chapters",
  ...chapters.map((c) => `/chapter/${c.id}`),
  "/about",
  "/sources",
];
