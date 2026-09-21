import { z } from "zod";
import type { Lang } from "../i18n/locale";
const zh = z
  .string()
  .min(1)
  .regex(/[\u3400-\u9fff]/, "应包含中文");
const en = z
  .string()
  .min(1)
  .regex(/[A-Za-z]/, "应包含英文");
const id = z.string().regex(/^[a-z0-9-]+$/);
const refs = z.array(z.string().regex(/^[WGHFL]\d{2,3}$/)).min(1);
const position = z
  .object({ x: z.number().min(0).max(1), y: z.number().min(0).max(1) })
  .strict();
export const typeLabels = {
  location: "地点",
  character: "人物",
  boss: "妖王与头目",
  architecture: "建筑",
  item: "器物",
  story: "故事",
} as const;
export const layerLabels = {
  game: "游戏",
  "journey-to-the-west": "《西游记》",
  "real-world": "现实文化遗产",
} as const;
export const confidenceLabels = {
  confirmed: "已确认",
  "high-confidence": "高可信",
  probable: "可能相关",
  speculative: "仅视觉推测",
  unknown: "尚未核实",
} as const;
export const evidenceLabels = {
  "developer-statement": "开发者资料",
  "government-source": "政府公开资料",
  "museum-source": "博物馆资料",
  "heritage-source": "文保机构资料",
  "academic-source": "学术资料",
  "visual-comparison": "视觉对照",
  "community-theory": "社区推测",
} as const;
export const sourceLabels = {
  "primary-text": "古籍原文",
  "game-guide": "游戏资料",
  "government-source": "政府 / 文博资料",
  "developer-statement": "开发者资料",
  "museum-source": "博物馆资料",
  "academic-source": "学术资料",
} as const;
export const novelRelationLabels = {
  direct: "原著直接出现",
  recombined: "原著元素重组",
} as const;
export const heritageRelationLabels = {
  "cultural-comparison": "现实文化对照",
  "developer-confirmed": "开发者确认采用",
} as const;
type LabelsOf<T> = Record<keyof T, string>;
const typeLabelsEn: LabelsOf<typeof typeLabels> = {
  location: "Place",
  character: "Character",
  boss: "Yaoguai & boss",
  architecture: "Architecture",
  item: "Object",
  story: "Story",
};
const layerLabelsEn: LabelsOf<typeof layerLabels> = {
  game: "The game",
  "journey-to-the-west": "Journey to the West",
  "real-world": "Real-world heritage",
};
/**
 * The wording of 9.3 in DEVELOPMENT_SPEC.md. A visual resemblance must not
 * read as a confirmed modeling source in either language.
 */
const confidenceLabelsEn: LabelsOf<typeof confidenceLabels> = {
  confirmed: "Confirmed",
  "high-confidence": "High confidence",
  probable: "Likely influence",
  speculative: "Visual similarity only",
  unknown: "Not yet verified",
};
const evidenceLabelsEn: LabelsOf<typeof evidenceLabels> = {
  "developer-statement": "Developer material",
  "government-source": "Government publication",
  "museum-source": "Museum material",
  "heritage-source": "Heritage authority material",
  "academic-source": "Academic material",
  "visual-comparison": "Visual comparison",
  "community-theory": "Community theory",
};
const sourceLabelsEn: LabelsOf<typeof sourceLabels> = {
  "primary-text": "Primary text",
  "game-guide": "Game material",
  "government-source": "Government / heritage body",
  "developer-statement": "Developer material",
  "museum-source": "Museum material",
  "academic-source": "Academic material",
};
const novelRelationLabelsEn: LabelsOf<typeof novelRelationLabels> = {
  direct: "Appears directly in the novel",
  recombined: "Recombined from the novel",
};
const heritageRelationLabelsEn: LabelsOf<typeof heritageRelationLabels> = {
  "cultural-comparison": "Real-world cultural comparison",
  "developer-confirmed": "Confirmed by the developer",
};
/**
 * `license` in media.json is a free-text rights record, not an enum, but it
 * is rendered. Each value needs a display form in both languages or an
 * English page would print the Chinese record verbatim; validate-data.ts
 * fails on any licence string missing from this table.
 */
export const licenseLabels: Record<string, Record<Lang, string>> = {
  "CC BY 4.0": { zh: "署名 4.0", en: "CC BY 4.0" },
  "CC BY-SA 4.0": { zh: "署名—相同方式共享 4.0", en: "CC BY-SA 4.0" },
  "公有领域": { zh: "公有领域", en: "Public domain" },
  "经权利人授权用于本项目": {
    zh: "经权利人授权用于本项目",
    en: "Licensed to this project by the rights holder",
  },
  "经权利人授权用于本项目（2026-09-20 确认）": {
    zh: "经权利人授权用于本项目（2026-09-20 确认）",
    en: "Licensed to this project by the rights holder (confirmed 2026-09-20)",
  },
  "已确认可用于本项目公开发布（2026-09-21）": {
    zh: "已确认可用于本项目公开发布（2026-09-21）",
    en: "Cleared for public release in this project (confirmed 2026-09-21)",
  },
  "SIL Open Font License 1.1": {
    zh: "SIL 开放字体许可证 1.1",
    en: "SIL Open Font License 1.1",
  },
};
export const licenseLabel = (license: string, lang: Lang) =>
  licenseLabels[license]?.[lang] ?? license;
/**
 * Display labels per locale. Every enum reaches the interface through this
 * table, so no raw value such as `government-source` is ever rendered.
 */
export const labels: Record<
  Lang,
  {
    type: LabelsOf<typeof typeLabels>;
    layer: LabelsOf<typeof layerLabels>;
    confidence: LabelsOf<typeof confidenceLabels>;
    evidence: LabelsOf<typeof evidenceLabels>;
    source: LabelsOf<typeof sourceLabels>;
    novelRelation: LabelsOf<typeof novelRelationLabels>;
    heritageRelation: LabelsOf<typeof heritageRelationLabels>;
  }
> = {
  zh: {
    type: typeLabels,
    layer: layerLabels,
    confidence: confidenceLabels,
    evidence: evidenceLabels,
    source: sourceLabels,
    novelRelation: novelRelationLabels,
    heritageRelation: heritageRelationLabels,
  },
  en: {
    type: typeLabelsEn,
    layer: layerLabelsEn,
    confidence: confidenceLabelsEn,
    evidence: evidenceLabelsEn,
    source: sourceLabelsEn,
    novelRelation: novelRelationLabelsEn,
    heritageRelation: heritageRelationLabelsEn,
  },
};
export const sourceSchema = z
  .object({
    titleZh: zh,
    titleEn: en,
    publisherZh: zh,
    publisherEn: en,
    url: z.string().url(),
    type: z.enum([
      "primary-text",
      "game-guide",
      "government-source",
      "developer-statement",
      "museum-source",
      "academic-source",
    ]),
    scopeZh: zh,
    scopeEn: en,
  })
  .strict();
export const mediaSchema = z
  .object({
    file: z.string().regex(/^\/(art|audio|fonts|images|maps)\/[a-z0-9/.-]+$/),
    titleZh: zh,
    titleEn: en,
    altZh: zh,
    altEn: en,
    usageNoteZh: zh,
    usageNoteEn: en,
    assetRole: z.enum([
      "chapter-map",
      "chapter-atmosphere",
      "game-reference",
      "heritage-documentary",
      "historical-documentary",
      "historical-analogue",
      "comparison-frame",
      "decorative-interpretation",
      "ui-texture",
      "ui-icon",
      "wordmark",
      "audio-track",
      "typeface",
      "asset-documentation",
    ]),
    provenanceType: z.enum([
      "sourced",
      "game-capture",
      "generated",
      "original-vector",
      "original-illustration",
      "original-photography",
      "original-document",
    ]),
    documentary: z.boolean(),
    creator: z.string().min(1),
    license: z.string().min(1),
    licenseStatus: z.enum([
      "cleared",
      "public-domain",
      "permission-required",
      "link-only",
      "do-not-use",
      "unknown",
    ]),
    licenseUrl: z.string().url().optional(),
    sourceUrl: z.string().url().optional(),
    firstParty: z.boolean().optional(),
    evidenceSourceIds: z.array(z.string()),
    evidenceScopeZh: zh,
    evidenceScopeEn: en,
    modificationNoteZh: zh,
    modificationNoteEn: en,
    mapMode: z.enum(["schematic", "geographic"]).optional(),
    topologyStatus: z
      .enum(["unverified", "verified-high-level", "verified-markers"])
      .optional(),
    generator: z.string().optional(),
    generationDate: z.string().optional(),
    promptSummary: z.string().optional(),
    reviewedByHuman: z.boolean().optional(),
  })
  .strict();
export const markerSchema = z
  .object({
    id,
    nameZh: zh,
    nameEn: en,
    type: z.enum([
      "location",
      "character",
      "boss",
      "architecture",
      "item",
      "story",
    ]),
    layers: z
      .array(z.enum(["game", "journey-to-the-west", "real-world"]))
      .min(1),
    areaZh: zh,
    areaEn: en,
    summaryZh: zh,
    summaryEn: en,
    position: position.optional(),
    game: z
      .object({
        descriptionZh: zh,
        descriptionEn: en,
        mediaIds: z.array(id).min(1).optional(),
        sources: refs,
      })
      .strict(),
    journeyToTheWest: z
      .object({
        relationship: z.enum(["direct", "recombined"]),
        chapterNumbers: z.array(z.number().int().min(1).max(100)).min(1),
        chapterTitlesZh: z.array(zh).min(1),
        chapterTitlesEn: z.array(en).min(1),
        summaryZh: zh,
        summaryEn: en,
        excerptZh: zh,
        // A working translation by this project, shown beneath the cited
        // original. Published English translations are still in copyright.
        excerptEn: en,
        excerptSourceId: z.string().regex(/^[WGHFL]\d{2,3}$/),
        mediaIds: z.array(id).min(1).optional(),
        adaptationNoteZh: zh,
        adaptationNoteEn: en,
        sources: refs,
      })
      .strict()
      .optional(),
    noDirectNovelZh: zh.optional(),
    noDirectNovelEn: en.optional(),
    realWorld: z
      .array(
        z
          .object({
            nameZh: zh,
            nameEn: en,
            locationZh: zh,
            locationEn: en,
            descriptionZh: zh,
            descriptionEn: en,
            evidenceScopeZh: zh,
            evidenceScopeEn: en,
            relationship: z.enum([
              "cultural-comparison",
              "developer-confirmed",
            ]),
            confidence: z.enum([
              "confirmed",
              "high-confidence",
              "probable",
              "speculative",
              "unknown",
            ]),
            evidenceType: z.enum([
              "developer-statement",
              "government-source",
              "museum-source",
              "heritage-source",
              "academic-source",
              "visual-comparison",
              "community-theory",
            ]),
            sources: refs,
            mediaIds: z.array(id).optional(),
          })
          .strict(),
      )
      .min(1)
      .optional(),
    funFacts: z.array(
      z.object({ textZh: zh, textEn: en, sources: refs }).strict(),
    ),
    spoiler: z
      .object({
        warningZh: zh,
        warningEn: en,
        textZh: zh,
        textEn: en,
        sources: refs,
      })
      .strict()
      .optional(),
    sources: refs,
  })
  .strict();
export const chapterSchema = z
  .object({
    id,
    order: z.number().int().min(1).max(6),
    numeralZh: zh,
    titleZh: zh,
    titleEn: en,
    regionZh: zh,
    regionEn: en,
    themeZh: zh,
    themeEn: en,
    overviewZh: zh,
    overviewEn: en,
    readingGuideZh: zh,
    readingGuideEn: en,
    sources: refs,
    atmosphereMediaId: id,
    mapMediaId: id.optional(),
    mapMode: z.enum(["schematic", "geographic"]),
    topologyStatus: z.enum([
      "unverified",
      "verified-high-level",
      "verified-markers",
    ]),
    topologyLog: z
      .string()
      .regex(/^assets\/research\/[a-zA-Z0-9_.\/-]+$/)
      .optional(),
    mapNoticeZh: zh,
    mapNoticeEn: en,
    markers: z.array(markerSchema),
    areas: z.array(z.object({ id, nameZh: zh, nameEn: en, position }).strict()),
    anchors: z.array(
      z
        .object({ id, nameZh: zh, nameEn: en, position, sources: refs })
        .strict(),
    ),
    routes: z.array(
      z
        .object({
          from: id,
          to: id,
          kind: z.enum(["main", "optional"]),
          mode: z.enum(["route", "teleport", "return", "reward"]),
          labelZh: zh.optional(),
          labelEn: en.optional(),
          conditionZh: zh.optional(),
          conditionEn: en.optional(),
          sources: refs,
        })
        .strict(),
    ),
  })
  .strict();
export type Chapter = z.infer<typeof chapterSchema>;
export type Marker = z.infer<typeof markerSchema>;
export type Media = z.infer<typeof mediaSchema>;
export type Source = z.infer<typeof sourceSchema>;
