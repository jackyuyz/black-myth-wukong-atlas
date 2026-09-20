# Black Myth Wukong Atlas — Development Specification

## 1. Project Overview

**Repository:** `black-myth-wukong-atlas`  
**Project type:** Frontend-only interactive cultural atlas  
**Primary goal:** Help users explore *Black Myth: Wukong* through an interactive chapter map while learning how locations, characters, artifacts, architecture, and visual design connect to *Journey to the West* and real-world Chinese cultural heritage.

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

### 2.2 Scope boundaries

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

## 3. Suggested Tech Stack

Preferred implementation:

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- React Zoom Pan Pinch or equivalent lightweight pan/zoom library
- Motion / Framer Motion only where animation materially improves the experience

Deployment targets:

- Vercel, or
- GitHub Pages

The application must remain deployable as a static frontend.

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

- project title: **Black Myth Wukong Atlas**
- short subtitle/tagline
- short project explanation
- six chapter cards
- clear disclaimer that this is a fan-made educational/cultural project
- navigation to About and Sources

### 5.3 Chapter cards

Each chapter card should display:

- chapter number
- chapter Chinese title
- primary region name
- English title if available
- representative image
- optional short theme sentence

Expected six main regions:

1. Black Wind Mountain / 黑风山
2. Yellow Wind Ridge / 黄风岭
3. The New West / 小西天
4. Webbed Hollow / 盘丝岭
5. Flaming Mountains / 火焰山
6. Mount Huaguo / 花果山

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

### 6.2 Coordinate system

All marker coordinates must use **normalized coordinates from 0 to 1**.

Example:

```json
{
  "x": 0.624,
  "y": 0.418
}
```

Do not store pixel coordinates.

### 6.3 Marker categories

Recommended v1 categories:

```text
location
character
boss
architecture
item
heritage
story
```

The UI may combine some categories visually if needed.

Suggested user-facing filters:

- Places
- Characters & Bosses
- Artifacts
- Architecture
- Journey to the West
- Real-World Heritage

### 6.4 Marker visual language

Markers should be visually distinct but stylistically consistent.

Recommended concepts:

- place: gate / mountain / temple icon
- boss: horned mask / creature icon
- artifact: talisman / vessel / relic icon
- architecture: pavilion / column icon
- literature: scroll icon
- heritage: map pin / monument icon

Avoid modern flat SaaS-style marker graphics. Visual design should feel influenced by Chinese ink, bronze, stone rubbing, parchment, seal carving, or restrained game-inspired fantasy aesthetics.

---

## 7. Information Panel / Drawer

Clicking a marker should open a right-side information panel on desktop and a bottom sheet or full-screen panel on mobile.

### 7.1 Required content structure

Every marker may contain some or all of the following sections.

#### A. Header

- Chinese name
- English name
- category badge
- chapter / region
- hero image if available

#### B. In the Game

Concise explanation of:

- what the place/person/object is
- where it appears
- narrative role
- relevant game relationship

Avoid turning this section into a full strategy guide.

#### C. Journey to the West

Where relevant:

- original chapter number
- original chapter title
- short summary
- brief excerpt
- explanation of how the game adapts, expands, reverses, or reinterprets the original
- citation

#### D. Real-World Heritage

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

Only the first five should be treated as strong evidence.

#### E. Fun Facts

1–4 short details that are:

- interesting
- source-backed when factual
- visually memorable
- useful to students learning culture/history

#### F. Sources

Display a compact source list with source type.

Example labels:

```text
Primary Text
Developer Source
Government / Heritage
Museum
Academic
Game Reference
Community Reference
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
  "overview": "...",
  "markers": []
}
```

### 8.2 Recommended marker schema

```json
{
  "id": "guanyin-temple",
  "type": "architecture",
  "nameZh": "观音禅院",
  "nameEn": "Guanyin Temple",
  "position": {
    "x": 0.50,
    "y": 0.44
  },
  "summary": "...",
  "game": {
    "description": "...",
    "images": [
      "/images/game/ch1/guanyin-temple-01.webp"
    ]
  },
  "journeyToTheWest": {
    "chapterNumbers": [16, 17],
    "chapterTitles": ["..."],
    "summary": "...",
    "excerpt": "...",
    "adaptationNote": "...",
    "sources": ["src-jttw-016"]
  },
  "realWorld": [
    {
      "nameZh": "...",
      "nameEn": "...",
      "location": "Shanxi, China",
      "connection": "visual reference",
      "confidence": "confirmed",
      "evidenceType": "government-source",
      "description": "...",
      "images": ["/images/heritage/example.webp"],
      "sources": ["src-heritage-001"]
    }
  ],
  "funFacts": [
    {
      "text": "...",
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

Each image should ideally have metadata in the content record:

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

The experience should feel:

- cinematic
- scholarly but not academic-looking
- mysterious
- tactile
- inspired by ink, stone, parchment, bronze, smoke, temple architecture, carved seals, and Chinese landscape painting

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
- six chapter cards
- one fully implemented chapter map: Chapter 1
- at least 8–15 markers for Chapter 1
- marker filtering
- responsive info panel
- source links
- at least one *Journey to the West* excerpt connection
- at least one verified real-world heritage connection
- mobile support

The remaining five chapters can then reuse the same data and UI structure.

---

## 16. Coding Agent Rules

Agents working on this repository should follow these rules:

1. Do not introduce a backend unless explicitly requested.
2. Do not add authentication or databases.
3. Keep chapter content in JSON, not hard-coded in components.
4. Do not invent historical, literary, or game facts.
5. Preserve normalized map coordinates.
6. Use bilingual names where provided.
7. Keep citations and source IDs intact.
8. Treat speculative real-world connections as speculative.
9. Prioritize map usability over decorative UI.
10. Keep components reusable across all six chapters.
11. Avoid large new dependencies when a lightweight implementation is sufficient.
12. Any new content field should be documented before broad use.

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
├── src/
│   ├── components/
│   ├── data/
│   │   ├── chapters/
│   │   └── sources.json
│   ├── pages/
│   ├── hooks/
│   ├── types/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
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
