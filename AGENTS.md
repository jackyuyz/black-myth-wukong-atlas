# AGENTS.md

Operating rules for agents working in `black-myth-wukong-atlas`.

## What this project is

An interactive, Simplified-Chinese cultural atlas of *Black Myth: Wukong*, named **黑神话：悟空文化地图**. A visitor picks a chapter, explores a 2D map, clicks a landmark, and reads three layers: **游戏中的呈现 →《西游记》中的出处与改编 → 现实文化与实地遗产**.

It is a static frontend. It is **not** a strategy guide, combat wiki, completion tracker, or community product.

## Read these before changing anything

| File | Authority over |
|---|---|
| `DEVELOPMENT_SPEC.md` | Product scope, routes, data model, UI, MVP definition |
| `KNOWLEDGE_BASE.md` | Every factual claim about the game, the novel, and heritage sites |
| `ASSET_REQUIREMENTS.md` | Visual direction, asset provenance, image rights gate |
| `assets/research/*.md`, `assets/research/*.json` | What has already been collected; check before downloading anything |

Where they disagree, `KNOWLEDGE_BASE.md` wins on facts and `ASSET_REQUIREMENTS.md` wins on asset provenance.

## Non-negotiables

1. No backend, auth, database, CMS, or user accounts. All content loads from static local files.
2. Never invent a historical, literary, or game fact. If `KNOWLEDGE_BASE.md` marks something 待考证, it stays out of the public interface.
3. Never conflate the four relationship types: 原著直接出现 / 原著元素重组 / 现实文化对照 / 开发者确认采用. Each needs its own source.
4. Keep chapter content in JSON under `src/data/`, not hard-coded in components.
5. Keep source IDs (`W###`, `G##`, `H##`, `L##`, `F##`) intact and resolvable through `src/data/sources.json`.
6. v1 ships a Chinese-only visible interface. Every label, error, empty state, alt text, and accessibility name is Chinese. `*En` fields may exist in data but are not rendered.
7. Never expose a raw English enum value (`confirmed`, `government-source`, `schematic`) in the interface. Map it to its Chinese display label.

## Map rules

Chapter maps declare a `mapMode`. v1 uses `schematic`.

- **`schematic`** is a scroll-style route diagram. Marker coordinates are illustration-layout positions. Requires `topologyStatus: verified-high-level`, meaning the route order and branching are backed by the chapter's topology log. The map must carry a persistent Chinese notice such as **“路线示意图，非地理比例，非官方地图”**.
- **`geographic`** claims real spatial layout and requires `topologyStatus: verified-markers`.

Inventing *layout* on a verified route is design work. Inventing an area, landmark, or branch the topology log does not support is fabrication, in either mode. A chapter whose topology is still `unverified` ships as an overview image with no markers.

Coordinates are always normalized 0–1, never pixels.

## Evidence rules

- A real-world heritage block appears only when a specific game object and a specific site are connected by a recorded source. **Omitting the section is the correct output when no such source exists** — do not render an empty section, a placeholder, or an apology.
- Chapter 1 currently has no verified real-world prototype. Do not bind Shanxi sites used by other chapters to 黑风山.
- Visual similarity alone is never `confirmed`. Use the confidence scale in `DEVELOPMENT_SPEC.md` §7.1.D.
- Biographies from the in-game 影神图 are game lore, not novel canon. Label them as such.
- Spoilers beyond the current chapter stay collapsed behind a Chinese warning.

## Asset rules

- Only `cleared`, `public-domain`, and documented first-party `original-*` assets may ship as binaries in the public build. `permission-required`, `link-only`, `do-not-use`, and `unknown` stay in the research manifests.
- Most collected game imagery is `permission-required`. **Marker cards must therefore work with no photograph at all**: original silhouette or seal motif, Chinese prose, a short 原著 excerpt, and source links. No grey placeholders, no layouts that collapse without a hero image.
- Never generate a heritage photograph, a game screenshot, a historical book page, or anything that will sit in a 现实/游戏/原著 comparison slot.
- No raster image may contain baked-in Chinese text. Typeset text in the interface.
- Every production asset needs a `media.json` record before any chapter JSON may reference it.

## Style and implementation

- React + Vite + TypeScript + Tailwind, React Router, a lightweight pan/zoom library. Avoid large new dependencies when a small implementation suffices.
- Visual direction is an original **《黑神话：悟空》气质的文化展览 UI**: ink, weathered stone, bronze, temple wood, soot-black surfaces, bone-colored text, restrained cinnabar accents. It is homage, not replica — never trace the official logo, HUD, item frames, iconography, or key art.
- The map stays the visual center. Atmosphere must never obscure navigation, controls, or evidence status.
- Components must be reusable across all six chapters.
- Accessibility is required, not optional: keyboard-reachable markers, visible focus, WCAG AA contrast, reduced-motion support, and no meaning carried by color alone.

## Before you finish

- Document any new content field in `DEVELOPMENT_SPEC.md` before using it widely.
- Re-check that no Chinese label is missing, no English enum leaked, and no unsourced claim was added to fill a card.
