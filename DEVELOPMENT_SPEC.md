# Black Myth Wukong Atlas — Development Specification

## 1. Project Overview

**Repository:** `black-myth-wukong-atlas`  
**Project type:** Frontend-only interactive cultural atlas  
**Primary goal:** Help users explore *Black Myth: Wukong* through an interactive chapter map while learning how locations, characters, artifacts, architecture, and visual design connect to *Journey to the West* and real-world Chinese cultural heritage.

**v1 language:** Simplified Chinese. English filenames, route segments, IDs, component names, and data keys are allowed, but every user-facing label, navigation item, explanation, error, empty state, image alt text, and accessibility label must be Chinese in v1. English UI is a later localization phase, not an MVP requirement.

This is **not** a strategy guide, combat wiki, completion tracker, or account-based community product. The experience should prioritize cultural exploration, visual storytelling, and source-backed connections between:

1. the game world,
2. the literary source (*Journey to the West*), and
3. real-world architecture, sculpture, heritage sites, mythology, Buddhism, Daoism, and folk culture.

The site should feel like an interactive museum exhibit built around a game map.

---

## 2. Product Principles

### 2.1 Core experience

A user should be able to:

1. choose one of the six main chapters,
2. enter a stylized interactive map,
3. zoom and pan around the map,
4. click cultural or gameplay landmarks,
5. open an information panel,
6. read a concise game-context explanation,
7. see the relevant *Journey to the West* chapter or excerpt,
8. view verified real-world filming/modeling/reference sources where available,
9. follow citations to original or authoritative sources.

The experience must be understandable to a visitor who has never played the game and has little prior knowledge of Chinese literature or religion. The homepage and first marker opened should make the three-layer reading model explicit: **游戏中的呈现 →《西游记》中的出处或差异 → 现实文化与实地遗产**. Specialized terms such as 悬塑、二十八宿、道观、法宝、影神图 should receive a short plain-Chinese explanation on first use. Do not assume familiarity with the plot, Buddhist/Daoist systems, or Chinese architectural vocabulary.

### 2.2 Chinese-first content and localization

- The primary project title shown in v1 is **黑神话：悟空文化地图**. `Black Myth Wukong Atlas` may appear as a small repository/project identifier, not as the dominant UI title.
- All visible chapter, filter, panel, evidence, source, control, and status labels must use Chinese.
- Chinese copy should favor clear modern prose over unexplained classical or academic language. Necessary classical quotations must be followed by a concise modern-Chinese explanation.
- Names from the game use the official Chinese spelling in `KNOWLEDGE_BASE.md`. English names may be stored in optional `*En` fields for future localization but should not be required or shown by default.
- The data model must leave room for a future English locale without duplicating evidence records, media metadata, IDs, coordinates, or source URLs.
- Do not mix Chinese and English merely as decoration. English text must not become a substitute for a deliberate future translation pass.

### 2.3 Scope boundaries

Do **not** build the following unless explicitly requested later:

- backend API
- authentication
- user accounts
- comments
- content submission forms
- achievement tracking
- inventory tracking
- save game integration
- strategy/combat builds
- boss difficulty ratings
- walkthrough routing
- admin dashboard
- CMS
- relational database
- Supabase/PostgreSQL dependency

All content should be loadable from static local data files.

---

## 3. Tech Stack

Chosen implementation:

- React
- Vite
- TypeScript, scoped to the data layer (see 3.1)
- Tailwind CSS
- React Router
- React Zoom Pan Pinch or equivalent lightweight pan/zoom library
- a build-time prerenderer such as `vite-react-ssg` (see 3.2)
- Motion / Framer Motion only where animation materially improves the experience

Deployment targets:

- Vercel, or
- GitHub Pages

The application must remain deployable as a static frontend.

### 3.1 TypeScript scope

TypeScript is required for `src/types/`, `src/data/`, and the validation script in 3.3. Components may be plain `.jsx`. Vite compiles both without extra configuration, so an individual component can be renamed to `.tsx` when its props become complex enough to benefit.

The reasoning is that this project's risk is bad *data*, not bad rendering: a mistyped source ID or an invalid confidence value damages the site's credibility, while a component bug is visible immediately. Put the type safety where the risk is.

### 3.2 Prerendering

The site must be prerendered to static HTML at build time. Every v1 route — `/`, `/chapters`, `/chapter/:chapterId` for all six chapters, `/about`, `/sources` — must ship its Chinese content inside the HTML source rather than rendering it only after hydration.

This is a product requirement, not a performance nicety. The project's value is a body of searchable cultural writing: roughly ninety marker cards covering 观音禅院、亢金龙、辟水金睛兽 and similar terms. Content that exists only after JavaScript runs cannot be indexed, linked with a preview, or read without scripts.

If `/entity/:entityId` routes are added later, they must be prerendered too, or not added.

### 3.3 Data validation gate

A validation script must run in `prebuild` and in CI, and must fail the build on any of the following:

1. a source ID referenced by a chapter or marker that does not resolve in `src/data/sources.json`;
2. a `confidence`, `evidenceType`, `type`, `layers`, `mapMode`, or `topologyStatus` value outside its allowed set;
3. a media ID referenced by chapter data that is missing from `src/data/media.json`, or whose `licenseStatus` is not `cleared`, `public-domain`, or a documented first-party `original-*`;
4. a marker carrying coordinates on a map whose `mapMode`/`topologyStatus` combination does not permit them, per 6.2;
5. a `realWorld` entry with no `sources`, or a marker whose `journeyToTheWest` block cites no chapter number.

Most content in this repository is written by agents across many sessions. A build that fails loudly on a broken citation is a stronger safeguard than any review convention, because a broken citation otherwise renders as ordinary-looking text that nobody notices.

---

## 4. Information Architecture

### 4.1 Primary routes

Suggested routes:

```text
/
/chapters
/chapter/:chapterId
/about
/sources
```

Optional future routes:

```text
/explore/characters
/explore/heritage
/explore/journey-to-the-west
/entity/:entityId
```

These optional routes should not be required for v1.

---

## 5. Homepage

### 5.1 Purpose

Introduce the project and provide access to the six game chapters.

### 5.2 Required elements

- primary project title: **黑神话：悟空文化地图**
- short subtitle/tagline
- short project explanation
- six chapter cards
- clear disclaimer that this is a fan-made educational/cultural project
- Chinese navigation to “关于项目” and “资料来源”
- a compact explanation of the three content layers: “游戏 / 原著 / 现实”

### 5.3 Chapter cards

Each chapter card should display:

- chapter number
- chapter Chinese title
- primary region name
- representative image
- optional short theme sentence

English chapter titles may exist in data for future localization but are hidden in the default v1 interface.

Expected six main regions:

1. 第一回·火照黑云 / 黑风山
2. 第二回·风起黄昏 / 黄风岭
3. 第三回·夜生白露 / 小西天
4. 第四回·曲度紫鸳 / 盘丝岭
5. 第五回·日落红尘 / 火焰山
6. 第六回·未竟 / 花果山

---

## 6. Interactive Chapter Map

### 6.1 Core behavior

Each chapter page should contain a large map or illustrated chapter overview image.

Users must be able to:

- drag/pan
- zoom in/out
- reset view
- click map markers
- filter marker categories
- view marker names on hover/focus where practical

### 6.2 Map mode

Each chapter map declares a `mapMode`, defined in `ASSET_REQUIREMENTS.md` Section 3.2.A. The v1 default is `schematic`: a scroll-style route diagram whose marker positions describe the **order and branching** of the chapter, not its geography. `geographic` maps claim real spatial layout and are gated behind first-party map captures.

A `schematic` map must display a persistent, non-dismissible Chinese notice near the map frame, for example **“路线示意图，非地理比例，非官方地图”**. It should be part of the map chrome rather than a tooltip or a footnote, because it is the statement that keeps authored coordinates honest.

Do not describe a `schematic` map as a game map, a 行旅图, or an accurate layout anywhere in the interface.

### 6.3 Coordinate system

All marker coordinates must use **normalized coordinates from 0 to 1**.

Example:

```json
{
  "x": 0.624,
  "y": 0.418
}
```

Do not store pixel coordinates.

On a `schematic` map these numbers are illustration-layout positions chosen alongside the artwork. They are still data rather than baked pixels, so the same marker set survives a redraw of the map surface. Route order and branching must match the chapter's topology research log; layout within that route is a design decision.

### 6.4 Marker categories

Keep **what the marker is** separate from **which knowledge layers it contains**.

Recommended v1 entity types:

```text
location
character
boss
architecture
item
story
```

Recommended content layers:

```text
game
journey-to-the-west
real-world
```

A temple in the game remains an `architecture` or `location` marker even when it contains a `real-world` connection. Do not change the entity type to `heritage`, and do not treat the literary/real-world layers as interchangeable evidence.

Suggested user-facing entity filters:

- 地点
- 人物与妖王
- 器物
- 建筑

Suggested user-facing layer filters/badges:

- 游戏
- 《西游记》
- 现实文化遗产

### 6.5 Marker visual language

Markers should be visually distinct but stylistically consistent.

Recommended concepts:

- place: gate / mountain / temple icon
- boss: horned mask / creature icon
- character: profile / seal icon
- artifact: talisman / vessel / relic icon
- architecture: pavilion / column icon
- story: flame / knot icon
- Journey-to-the-West layer badge: scroll / thread-bound book icon
- real-world layer badge: map pin / monument icon

Avoid modern flat SaaS-style marker graphics. The UI must feel recognizably inspired by the visual world of *Black Myth: Wukong*: restrained dark Chinese fantasy, ink wash, weathered stone and bronze, temple wood, carved seals, smoke and cinematic chapter atmosphere. It must remain an original fan-project design rather than copying the official logo, HUD, icons, layouts, or proprietary artwork.

---

## 7. Information Panel / Drawer

Clicking a marker should open a right-side information panel on desktop and a bottom sheet or full-screen panel on mobile.

### 7.1 Required content structure

Every marker may contain some or all of the following sections.

#### A. Header

- Chinese name (primary)
- category badge in Chinese
- chapter / region in Chinese
- hero image if available
- optional English name field reserved for the future locale; hidden by default in v1

#### B. 游戏中的呈现

Concise explanation of:

- what the place/person/object is
- where it appears
- narrative role
- relevant game relationship

Avoid turning this section into a full strategy guide.

#### C. 《西游记》中的出处与改编

Where relevant:

- original chapter number
- original chapter title
- short summary
- brief excerpt
- explanation of how the game adapts, expands, reverses, or reinterprets the original
- citation

#### D. 现实文化与实地遗产

Where relevant:

- real location / heritage site name
- province / city
- historical period
- architecture/sculpture/art type
- nature of connection to the game
- confidence label
- supporting source

Suggested confidence values:

```text
confirmed
high-confidence
probable
speculative
unknown
```

These are internal data keys. Display them in Chinese as:

| Key | v1 label |
|---|---|
| `confirmed` | 已确认 |
| `high-confidence` | 高可信 |
| `probable` | 可能相关 |
| `speculative` | 仅视觉推测 |
| `unknown` | 尚未核实 |

Suggested evidence labels:

```text
developer-statement
government-source
museum-source
heritage-source
academic-source
visual-comparison
community-theory
```

Evidence-type keys must likewise receive Chinese display labels and short explanations. Never expose raw English enum values in the v1 interface.

Only the first five should be treated as strong evidence.

#### E. 文化小知识

1–4 short details that are:

- interesting
- source-backed when factual
- visually memorable
- useful to students learning culture/history

#### F. 资料来源

Display a compact source list with source type.

Example labels:

```text
古籍原文
开发者资料
政府 / 文博资料
博物馆资料
学术资料
游戏资料
社区资料
```

---

## 8. Static Data Model

The frontend should use one primary JSON file per chapter.

Suggested structure:

```text
src/data/chapters/
  chapter-01.json
  chapter-02.json
  chapter-03.json
  chapter-04.json
  chapter-05.json
  chapter-06.json
```

### 8.1 Recommended chapter schema

```json
{
  "id": "chapter-01",
  "order": 1,
  "titleZh": "火照黑云",
  "regionZh": "黑风山",
  "regionEn": "Black Wind Mountain",
  "mapImage": "/maps/chapter-01.webp",
  "mapMode": "schematic",
  "topologyStatus": "verified-high-level",
  "mapNoticeZh": "路线示意图，非地理比例，非官方地图",
  "overviewZh": "...",
  "markers": []
}
```

### 8.2 Recommended marker schema

```json
{
  "id": "guanyin-temple",
  "type": "architecture",
  "layers": ["game", "journey-to-the-west"],
  "nameZh": "观音禅院",
  "nameEn": "Guanyin Temple",
  "position": {
    "x": 0.50,
    "y": 0.44
  },
  "summaryZh": "...",
  "game": {
    "descriptionZh": "...",
    "images": [
      "/images/game/ch1/guanyin-temple-01.webp"
    ]
  },
  "journeyToTheWest": {
    "chapterNumbers": [16, 17],
    "chapterTitlesZh": ["..."],
    "summaryZh": "...",
    "excerptZh": "...",
    "excerptSourceId": "src-jttw-016",
    "adaptationNoteZh": "...",
    "sources": ["src-jttw-016"]
  },
  "realWorld": [
    {
      "nameZh": "...",
      "nameEn": "...",
      "locationZh": "中国山西",
      "connection": "visual reference",
      "confidence": "confirmed",
      "evidenceType": "government-source",
      "descriptionZh": "...",
      "images": ["/images/heritage/example.webp"],
      "sources": ["src-heritage-001"]
    }
  ],
  "funFacts": [
    {
      "textZh": "...",
      "sources": ["src-heritage-001"]
    }
  ],
  "sources": ["src-game-001"]
}
```

### 8.3 Shared source file

Use one shared source index:

```text
src/data/sources.json
```

Example:

```json
{
  "src-jttw-016": {
    "title": "西游记 第十六回",
    "author": "吴承恩",
    "publisher": "维基文库",
    "url": "https://...",
    "type": "primary-text"
  }
}
```

This prevents repeating full URLs and metadata in every marker.

For future English support, either add parallel `*En` fields or introduce a locale dictionary keyed by the same stable entity ID. Do not fork coordinates, source records, evidence levels, or media provenance by language.

---

## 9. Content Rules

### 9.1 Never mix evidence levels

The application must clearly distinguish between:

- original novel content
- game content
- verified real-world references
- interpretation
- community speculation

### 9.2 Original novel content

Claims about *Journey to the West* should identify:

- chapter number
- chapter title where possible
- source URL

Short excerpts may be shown when legally appropriate.

### 9.3 Real-world references

Never present visual similarity alone as a confirmed modeling source.

Use wording such as:

- “confirmed reference”
- “officially identified filming/modeling location”
- “likely visual influence”
- “visual similarity; not officially confirmed”

### 9.4 Game lore

When a biography or relationship comes from the in-game portrait / journal / codex system, identify it as game lore rather than original novel canon.

### 9.5 Writing for visitors from any cultural background

- Each card must first answer “这是什么、在游戏哪里、为什么值得看” before introducing specialist detail.
- Clearly state when a game entity has no direct counterpart in the novel.
- Do not use “大家都知道”“显然”“原作党”等 insider phrasing.
- Do not require the reader to recognize a deity, constellation, Buddhist object, Daoist practice, dynasty, province, or architectural component from its name alone.
- Spoilers beyond the current chapter must be collapsed behind a Chinese spoiler warning.
- A real-world site is shown only when the specific connection has evidence; the absence of a verified site is valid and must not be filled with a guess.

---

## 10. Image Handling

Store only local image paths inside JSON.

Recommended folder structure:

```text
public/
  maps/
  images/
    game/
    heritage/
    characters/
    items/
    architecture/
    ui/
```

Prefer WebP or AVIF for large web images.

Each production image must have metadata in `src/data/media.json`:

- alt text
- credit
- source URL
- usage note

Do not bulk-copy copyrighted game screenshots into a public repository without reviewing usage rights.

---

## 11. Responsive Design

Desktop:

- map fills most of viewport
- info drawer opens on right
- filters float over map or sit in compact top toolbar

Tablet:

- map remains primary
- narrower slide-over panel

Mobile:

- full-width map
- bottom sheet / full-screen info panel
- simplified marker controls
- pinch zoom support

---

## 12. Accessibility

Required:

- keyboard-accessible markers
- visible focus states
- meaningful alt text
- text contrast meeting WCAG AA where practical
- no information communicated by color alone
- reduced-motion support
- controls labeled for screen readers

---

## 13. Visual Direction

The experience should use an original **“《黑神话：悟空》气质的文化展览 UI”**. This is a required product attribute, not an optional mood-board suggestion. It should feel:

- cinematic
- scholarly but not academic-looking
- mysterious
- tactile
- inspired by ink, stone, parchment, bronze, smoke, temple architecture, carved seals, and Chinese landscape painting
- cinematic and chapter-specific: forest fire, yellow sand, snow, cave silk, furnace ash, or cloud-wrapped mountains may tint the atmosphere without hurting readability
- restrained and tactile: warm bone-colored text, soot-black surfaces, oxidized metal, muted mineral colors, and a limited cinnabar-red accent
- composed with generous negative space, vertical or seal-like headings where appropriate, and subtle asymmetry inspired by scroll painting

Interaction details should support the same language: seal-press selection, light ink diffusion, drifting mist, and short brush-like reveals are appropriate when performant and reduced-motion-safe. Core UI chrome, filters, tabs, and citations must remain easy to identify; atmosphere must never obscure navigation or evidence status.

This direction is an homage, not a replica. Do not trace or reproduce the official game logo, type treatment, HUD, menu layout, item frames, iconography, screenshots, or promotional key art. Do not label generated imagery as official game imagery.

Avoid:

- generic game wiki styling
- bright neon cyberpunk UI
- glassmorphism overload
- mobile-game HUD aesthetics
- dense tables
- dashboard-like analytics layout

The map must remain the visual center of the experience.

---

## 14. Suggested Components

```text
AppShell
TopNavigation
ChapterSelector
ChapterCard
InteractiveMap
MapControls
MapMarker
MarkerLegend
InfoDrawer
ContentSection
GameSection
JourneySection
HeritageSection
FunFactsSection
SourceList
ImageComparison
ChapterNavigation
```

Optional:

```text
ImageLightbox
RealityVsGameSlider
MiniRelationshipLinks
SearchOverlay
```

---

## 15. MVP Definition

A successful v1 should include:

- polished homepage
- complete Chinese-first UI with no English-only controls, errors, or accessibility labels
- a clear “游戏 / 原著 / 现实” onboarding explanation for visitors unfamiliar with the subject
- six chapter cards
- one fully implemented chapter map: Chapter 1, as a `schematic` scroll-style route map with its "路线示意" notice
- at least 8–15 markers for Chapter 1
- marker filtering
- responsive info panel
- source links
- at least one *Journey to the West* excerpt connection
- at least one verified real-world heritage connection somewhere in the v1 experience; it may be a clearly labeled Chapter 3 preview (for example, 隰县小西天 or 府城玉皇庙) and must not be falsely attached to Chapter 1
- a visibly *Black Myth: Wukong*-inspired but original interface as defined in Section 13
- mobile support
- all v1 routes prerendered to static HTML per 3.2
- a passing data validation gate per 3.3, wired into `prebuild` and CI

The remaining five chapters can then reuse the same data and UI structure.

### 15.1 What Chapter 1 can and cannot show

Chapter 1 carries the strongest literary layer in the project — 第十六至十七回 supply 广智、广谋、金池长老、黑熊精、白衣秀士、凌虚子 and 辟火罩 — so the 游戏/原著 pairing can be fully realized at MVP.

Its real-world layer cannot. `KNOWLEDGE_BASE.md` states that no temple prototype for 观音禅院 has been established, and that Shanxi sites used by other chapters must not be bound to this location. **An empty 现实文化与实地遗产 section on a Chapter 1 marker is a correct result, not a gap to fill.** The panel should simply omit the section rather than render a placeholder, an apology, or a "尚未核实" card for every marker.

The single verified heritage connection required above therefore ships as a self-contained Chapter 3 preview, clearly labeled as belonging to 第三回 and reachable from the homepage or the onboarding explanation rather than from a Chapter 1 marker.

### 15.2 Text-first marker cards

Almost all Chapter 1 game imagery currently carries `licenseStatus: permission-required` and is excluded from the public build. Marker cards must therefore be designed to work with no photographic image at all: original silhouette or seal motif, Chinese prose, a short 原著 excerpt, and source links. Do not ship grey image placeholders, broken frames, or layouts that collapse without a hero image.

---

## 16. Coding Agent Rules

Agents working on this repository should follow these rules:

1. Do not introduce a backend unless explicitly requested.
2. Do not add authentication or databases.
3. Keep chapter content in JSON, not hard-coded in components.
4. Do not invent historical, literary, or game facts.
5. Preserve normalized map coordinates, and respect the `mapMode` gate: authored coordinates are allowed on a `schematic` map with verified route order, never on an unverified one.
6. Ship a Chinese-only visible interface for v1; retain optional English fields only for future localization.
7. Keep citations and source IDs intact.
8. Treat speculative real-world connections as speculative.
9. Prioritize map usability over decorative UI.
10. Keep components reusable across all six chapters.
11. Avoid large new dependencies when a lightweight implementation is sufficient.
12. Any new content field should be documented before broad use, and added to the validation script in the same change.
13. Never weaken or skip the validation gate to make a build pass. Fix the data, or remove the claim.
14. Keep every route prerenderable: no content may depend on a runtime-only data source, and nothing essential may appear only after hydration.
15. Do not force a real-world heritage block onto a marker when `KNOWLEDGE_BASE.md` says the connection is unverified; omit the section instead of rendering an empty or apologetic one.
16. Preserve media provenance and license status; generated, documentary, official-game, and comparison images must never be conflated.

---

## 17. Recommended Repository Structure

```text
black-myth-wukong-atlas/
├── public/
│   ├── maps/
│   └── images/
│       ├── game/
│       ├── heritage/
│       ├── characters/
│       ├── items/
│       ├── architecture/
│       └── ui/
├── scripts/
│   └── validate-data.ts
├── src/
│   ├── components/
│   ├── data/
│   │   ├── chapters/
│   │   ├── media.json
│   │   └── sources.json
│   ├── pages/
│   ├── hooks/
│   ├── types/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── AGENTS.md
├── README.md
├── DEVELOPMENT_SPEC.md
├── KNOWLEDGE_BASE.md
├── ASSET_REQUIREMENTS.md
└── package.json
```

---

## 18. Long-Term Optional Enhancements

Only after the map experience is stable:

- full-text search
- entity cross-links
- chapter-to-chapter navigation trail
- real-world heritage map of China
- image comparison sliders
- timeline of *Journey to the West* episodes
- relationship graph for selected characters
- bilingual UI toggle
- classroom presentation mode

These should remain optional enhancements rather than requirements for initial development.

## 19. Initial implementation schema (2026-09-20)

The executable schema lives in `src/types/schema.ts`. All content fields below are validated before building. All text ending in `Zh` must contain Chinese text. No chapter content is stored in components.

- Chapter: `numeralZh`, `themeZh`, `overviewZh`, `readingGuideZh`, `sources`, `atmosphereMediaId`, optional `mapMediaId`, `mapNoticeZh`, `mapMode`, `topologyStatus`, `markers`, `routes` and `areas`. The existing `id`, `order`, `titleZh`, `regionZh` remain. Other chapters can have reading cards without `position`; these are not map markers.
- `areas`: `{ id, nameZh, position }` for verified schematic areas. `routes`: `{ from, to, kind: main | optional, sources }`, referencing marker IDs; connections only represent researched route relationships. All positions use normalized coordinates and pass the map gate. A topological map needs a local `topologyLog` path. Unverified chapters have no areas, routes, map media or coordinates.
- Marker: `areaZh`, `summaryZh`, `sources`, optional `position`, `game: { descriptionZh, sources }`, optional `journeyToTheWest`, optional `realWorld`, `funFacts`, optional `spoiler: { warningZh, textZh, sources }`. `journeyToTheWest` contains `relationship: direct | recombined`, chapter numbers, chapter titles, summary, adaptation note, a required original-text excerpt, its exact `excerptSourceId`, and sources. The excerpt source must resolve to `primary-text` and also appear in that block's `sources`. These are shown as 原著直接出现 / 原著元素重组. Markers without a literary block must carry `noDirectNovelZh`; do not fabricate a chapter reference.
- Heritage: `nameZh`, `locationZh`, `descriptionZh`, `evidenceScopeZh`, `relationship: cultural-comparison | developer-confirmed`, `confidence`, `evidenceType`, `sources`, optional `mediaIds`. Explicit evidence scope prevents a visual comparison from becoming a claim about scanning. `developer-confirmed` requires developer evidence; `confirmed` cannot use visual-comparison/community-theory evidence.
- Media index: keyed by stable ID, using local `file`, Chinese title/alt/usage note, asset role, documentary flag, provenance, creator, license/license URL/status, source URL, evidence source IDs/scope, modification note. Original vectors have `firstParty: true` and a production license. Documentary photos retain attribution and share-alike terms. Original atmosphere vectors are non-documentary and do not portray an exact game location.
- Source index: keyed by original W/G/H/L/F IDs or new G07+ research IDs; each has `titleZh`, `publisherZh`, `url`, `type`, `scopeZh`. Source types map to Chinese labels. Existing IDs are never repurposed.

Build-time static rendering uses React's server renderer plus React Router's static router. All ten required route pages include the full Chinese reading cards in native disclosure elements, so closed drawers do not hide the writing from static HTML or script-free readers. The same cards are reused in interactive dialogs. Hash links identify cards and work without JavaScript. No fetch is needed to read content. Unknown paths use the generated Chinese 404 page. Vite's automatic directory deletion is disabled in accordance with repository deletion rules.

### 19.1 Verified route semantics

`anchors` contains non-card junctions `{ id, nameZh, position, sources }`; `routes.from/to` may reference either an anchor or a positioned marker. Each route also has `mode: route | teleport | return | reward`, optional `labelZh`, optional `conditionZh`. Conditional links must display their Chinese explanation, and teleport/return lines use a different stroke from ordinary exploration. The first map follows `assets/research/chapter-01-topology.json` and its reviewed wireframe exactly. Validation compares node coordinates, names, source lists and edge semantics against that research graph to prevent unsupported edits. `areas` are editorial region labels only, not navigable nodes.
