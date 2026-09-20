# Black Myth Wukong Atlas — Visual & Asset Requirements

## 1. Purpose

This document defines the visual assets needed for the `black-myth-wukong-atlas` website.

The v1 product is a Simplified-Chinese experience named **黑神话：悟空文化地图**. English filenames and asset IDs are preferred, but assets containing visible language must use reviewed Chinese copy. English-language UI artwork is deferred until the localization phase.

It is intended for:

- image-research agents
- image-generation agents
- designers
- developers preparing web assets

The website is centered on an interactive map, so assets should support exploration rather than behave like decorative filler.

---

## 2. Visual Direction

The required visual identity is an original **“《黑神话：悟空》气质的文化展览 UI”**: it should immediately evoke the game's restrained Chinese dark-fantasy atmosphere while functioning like a clear, source-backed digital museum. This is inspiration, not imitation; do not reproduce the official logo, HUD, menu composition, icon set, item frames, key art, or proprietary typography.

Target visual identity:

- cinematic
- dark but readable
- Chinese ink and landscape-painting influence
- weathered stone
- old parchment
- temple wood
- bronze and iron
- carved seals
- smoke, ash, snow, sand, mist, fire, and mountain atmosphere
- restrained fantasy
- museum/exhibition quality rather than fan-wiki quality
- warm bone-colored Chinese typography on soot-black / weathered mineral surfaces
- limited cinnabar-red accents for selection and evidence emphasis
- cinematic chapter atmosphere with readable, quiet UI chrome
- original motifs derived from ink wash, seal carving, rubbing, temple wood, bronze, and scroll composition

Avoid:

- neon cyberpunk
- bright esports UI
- generic fantasy medieval visuals
- cartoon-style icons
- overly glossy mobile-game HUD
- excessive gold ornament
- AI imagery with fake Chinese characters
- direct imitation of the official game UI, logo, key art, screenshots, or trademarked graphic treatments
- decorative English text in the Chinese v1 interface

No raster image may contain generated or baked-in Chinese text. Titles, labels, seals, and captions must be typeset in the interface or added later from reviewed vector text.

---

## 3. Asset Categories

The project needs the following visual groups.

### 3.1 Mandatory source strategy

Every asset request must be assigned exactly one production method before work begins:

| Method | Use for | Never use for |
|---|---|---|
| **SEARCH — documentary** | Real heritage sites, sculpture, architecture, museum objects, historical editions, public-domain prints, government/developer evidence pages | Atmosphere-only filler with no reusable license |
| **SEARCH — official/game reference** | Accurate character, boss, item, location, journal, map topology, and comparison frames | Assets with unknown ownership copied directly into the public repository |
| **GENERATE — non-documentary** | Original chapter atmospheres, illustrated map surfaces, textures, dividers, abstract silhouettes, loading/empty art, early logo concepts | “Proof” of a real place, historical object, game screenshot, official character design, or source claim |
| **CREATE — programmatic/original vector** | UI chrome, filters, badges, focus rings, evidence labels, map pins, simple icons, gradients, masks, texture overlays | Photographic or historical claims |

Default decision rule:

1. If the asset proves **what the game actually shows**, **what a real site looks like**, or **what a historical object/edition contains**, it must be searched, sourced, and licensed.
2. If the asset only establishes mood, navigation, hierarchy, or atmosphere, it should be generated or built programmatically.
3. If a generated map uses game geography, first research and record the route/landmark topology; generation may style that verified structure but may not invent it and call it accurate.
4. When usage rights are unknown, default to keeping only the URL and metadata. If the team explicitly requests an internal research copy, it may be stored only in a clearly isolated `official-reference` or `community-reference` path with `permission-required`, `research-only`, and `useInPublicBuild: false`; the public build must exclude it.
5. Never use generated visuals inside a “现实实景”“游戏实机”“原著版本” comparison slot.

### 3.2 Required asset classes and provenance

| Asset class | Required method | v1 requirement |
|---|---|---|
| Chapter map topology | Search/verify first; then original illustration or programmatic composition | Chapter 1 required; Chapters 2–6 may use non-interactive placeholders until verified |
| Chapter hero atmosphere | Generate or create original composite; sourced game key art only if usage is cleared | Six required, clearly non-official when generated |
| Exact character/boss/item appearance | Official/game reference search | Chapter 1 priorities only for MVP; do not generate a fake canonical portrait |
| Heritage and sculpture images | Documentary search only | Begin with verified Chapter 3 connections; no forced Chapter 1 heritage image |
| Historical *Journey to the West* images | Public-domain/licensed search | Optional; provenance required |
| Marker icons and evidence badges | Original SVG/programmatic | One consistent, accessible set required |
| Panel surfaces, smoke, ink, paper, stone | Generate or procedural CSS/SVG | Small reusable library required |
| Logo/wordmark | Original vector/type composition | Chinese primary wordmark required; must not mimic the official logo |

The source strategy and asset metadata in this document take precedence over filling every visual slot. An intentionally empty documentary slot is better than an attractive but unsupported image.

### A. Chapter Maps

One map or illustrated overview per chapter.

Required:

```text
chapter-01-map
chapter-02-map
chapter-03-map
chapter-04-map
chapter-05-map
chapter-06-map
```

Preferred characteristics:

- high resolution
- wide or square enough for zoom/pan
- clear landmark separation
- minimal baked-in labels
- no UI overlays
- no waypoint icons
- visually coherent with chapter atmosphere

Ideal minimum size:

```text
3000 px longest edge
```

Preferred:

```text
4096 × 4096
or equivalent high-resolution landscape composition
```

If using an original illustrated map rather than a game screenshot/map extraction, preserve recognizable geography but do not falsely imply it is an official game map.

Required strategy:

1. Search official gameplay footage, the team's own captures, and multiple reliable route references to establish only the high-level area sequence and landmark relationships.
2. Record the evidence used for topology. Fan maps may help discovery but are not a sole authoritative or automatically reusable source.
3. Produce a custom map surface inspired by Chinese scroll painting and the chapter's weather/material language.
4. Set `assetRole` to `chapter-map`, record `provenanceType` as `generated` or `original-illustration`, and record `topologyStatus` as `unverified`, `verified-high-level`, or `verified-markers`; never label it as an official game map.
5. Manually place HTML/SVG website markers over the image after visual QA. Coordinates remain data, not baked pixels.

Do not embed clickable labels into the image itself.

Because the knowledge base does not yet contain verified map coordinates, no agent may invent normalized marker positions simply to complete a screen. A map may ship as a chapter overview until its markers are validated against the chosen final map image.

---

## 4. Chapter Hero Images

Need one strong hero image for each chapter card and chapter landing state.

### Chapter 1 — 黑风山

Mood:

- forest
- mountain monastery
- smoke/fire
- black clouds
- mossy stone
- Buddhist temple atmosphere

### Chapter 2 — 黄风岭

Mood:

- yellow sand
- desert cliffs
- ruined kingdom
- wind erosion
- ancient stone/Buddhist remains

### Chapter 3 — 小西天

Mood:

- snow
- giant monastery
- Buddhist sculptural density
- pagoda/prison imagery
- cold blue-gray atmosphere

### Chapter 4 — 盘丝岭

Mood:

- deep cave
- purple vegetation
- silk/web motifs
- Daoist temple
- eerie but beautiful mountain scenery

### Chapter 5 — 火焰山

Mood:

- fire
- volcanic/red canyon
- furnace
- smoke
- ash
- iron/bronze

### Chapter 6 — 花果山

Mood:

- monumental mountains
- waterfalls
- clouds
- Water Curtain Cave
- mythic homecoming

Preferred aspect ratio:

```text
16:9
```

Minimum:

```text
1920 × 1080
```

These hero images are atmosphere, not evidence. Prefer original or generated scenes without recognizable copied characters, logos, UI, or exact compositions from official key art. Internally label them as non-documentary and provide a Chinese alt description of what is actually shown.

---

## 5. Map Marker Icons

Need a coherent icon set.

Create two related but distinct systems.

Entity icons:

```text
place
boss
character
artifact
architecture
story
```

Content-layer badges:

```text
game
journey-to-the-west
real-world
```

Style:

- monochrome or two-tone
- carved-seal / ink-brush / stone-rubbing influence
- readable at 24–40 px
- transparent SVG preferred
- original vector construction preferred over image generation for final production icons

Recommended forms:

- Place: mountain gate / pavilion
- Boss: mask / horn / beast silhouette
- Character: profile / seal
- Artifact: talisman / ritual object
- Architecture: temple roof / column
- Story: flame / knot / narrative glyph
- Game layer: restrained mask / gamepad-free emblem; do not reuse official iconography
- Journey layer: scroll / thread-bound book
- Real-world layer: monument / site marker

Need states:

- default
- hover
- selected
- disabled/filtered
- keyboard focus
- unavailable / evidence pending where needed

Markers should remain legible over busy map backgrounds.

Final icons must be delivered as editable SVG with no rasterized text and tested at 24 px, 32 px, and 40 px. Selection cannot rely on cinnabar red alone; combine color with silhouette, ring, label, or motion-safe emphasis.

---

## 6. Character / Boss Images

Exact character and boss depictions are **search assets**, because visual identity is itself a game fact. For each major marker character, ideally acquire:

1. game screenshot or official/promotional image
2. optional in-game portrait/journal reference image
3. optional historical artwork/reference image if culturally relevant

Generated character art may be used only as clearly labeled decorative interpretation, never as a portrait of “the character in the game,” never in a game-vs-reality comparison, and never as evidence for costume, anatomy, weapon, or lore. If official/promotional or captured imagery cannot be licensed, prefer a text-led card, an original abstract silhouette, or a link to the source over a fake canonical portrait.

Priority characters by chapter:

### Chapter 1

- 黑熊精
- 金池长老
- 灵虚子
- 广智
- 广谋
- 白衣秀士

### Chapter 2

- 黄风大圣
- 虎先锋
- 石先锋
- 石敢当
- 蝜蝂
- 灵吉菩萨 / 无头僧

### Chapter 3

- 黄眉
- 弥勒
- 亢金龙
- 亢金星君
- 选定的魔将

### Chapter 4

- 紫蛛儿
- 四妹
- 百眼魔君
- 黑手道人
- 毒敌大王
- 晦月魔君
- 蜘蛛姐妹群像

### Chapter 5

- 牛魔王
- 铁扇公主
- 红孩儿
- 夜叉王
- 火焰山土地
- 璧水金睛兽（注意游戏用“璧”，原著坐骑用“辟”）

### Chapter 6

- 天命人
- 大圣残躯
- 二郎显圣真君
- 四大天王

Preferred image treatment:

- character isolated on dark neutral background where possible
- 4:5 or square crop
- enough negative space for UI overlays
- no baked-in English or Chinese labels
- source, capture context, rights status, and spoiler level recorded in metadata

---

## 7. Artifact Images

Need clean images for major narrative objects. Exact in-game appearance is a **search/reference task**; a generated object can be used only as a decorative, non-canonical motif and must not be captioned as the game item.

High priority:

- 锦襕袈裟
- 辟火罩
- 定风珠
- 芭蕉扇
- 绣花针
- 金铙
- 人种袋
- 如意金箍棒
- 重要钟器与符箓
- 大圣遗物

Preferred:

- isolated object image
- neutral/dark background
- 1:1 or 4:5
- high enough resolution for zoom card

Also research historical visual analogues where appropriate:

- Buddhist robes
- ritual cymbals
- fans
- staffs
- bells
- Daoist talismans

Historical analogue images must not be presented as “the exact model source” unless verified.

For each artifact card, keep three possible image roles separate in metadata and UI:

- `game-reference`: the item as depicted in the game;
- `historical-analogue`: a real object or art tradition useful for understanding it;
- `decorative-interpretation`: an original/generated atmosphere asset with no evidentiary value.

---

## 8. Real-World Heritage Photography

This is one of the most important asset groups.

For each verified or high-confidence heritage reference, collect:

1. wide exterior shot
2. interior shot if legally available
3. detail shot of relevant sculpture/architecture
4. optional map/location photograph

Heritage work must follow the evidence tiers in `KNOWLEDGE_BASE.md`, not a generic tourism list.

### Tier A — source and clear for production first

These currently have the strongest documented project relevance:

- **山西临汾隰县小西天·大雄宝殿悬塑** — search wide context and specific suspended-sculpture detail; document the connection scope using [H02][H03].
- **山西晋城泽州府城玉皇庙·二十八宿彩塑** — search the 亢金龙 sculpture and contextual views; document character/sculpture connection using [H01][H04].
- **山西高平铁佛寺·二十四诸天彩塑** — search contextual and detail photography; use only the connection actually stated by [H04][H05], without inventing a one-to-one boss match.

For the first production pass, a reusable, clearly licensed detail that shows the relevant feature is more valuable than collecting four generic exterior photographs per site.

### Tier B — research leads, not production-ready mappings

The following may be searched as a research backlog, but must not receive a “confirmed game location” label or a paired comparison until a specific game object and supporting evidence are recorded:

- 云冈石窟、华严寺、悬空寺、善化寺、觉山寺、永安寺
- 佛光寺、南禅寺、金阁寺、应县木塔、崇福寺
- 镇国寺、双林寺、广胜寺、西溪二仙庙
- 重庆大足石刻、陕西蓝田水陆庵、四川安岳相关石刻及其他知识库候选地点

Do not spend MVP asset time collecting broad tourism galleries for Tier B sites. First resolve the exact chapter, game object, relationship type, evidence page, and image license.

For every image, record:

```text
site name
location
photographer/source
source URL
license / usage status
what feature it shows
relevant game connection
evidence source ID and evidence scope
documentary / non-documentary status
```

Prefer images from:

- official government pages
- heritage-site websites
- museums
- Wikimedia Commons
- licensed cultural institutions
- photography with clear reuse permissions

Do not assume a government-hosted image is automatically free to redistribute.

Generated heritage photography is forbidden. If no reusable documentary image exists, use a source link, licensed map, textual callout, or a clearly decorative non-site-specific texture; do not synthesize the building or sculpture.

---

## 9. Reality vs. Game Comparison Assets

For strong verified connections, prepare paired images. Both sides of a comparison are **search assets**: the heritage side must be documentary, and the game side must be an official/captured game reference with recorded rights status. Generation is not allowed for either side.

Suggested examples to investigate:

### Xiaoxitian

Need:

- real suspended-sculpture interior
- comparable game temple/interior scene

### Yuhuang Temple

Need:

- Twenty-Eight Mansion sculpture detail
- comparable Kang-Jin / celestial character imagery

### Tiefosi

Need:

- relevant guardian sculpture / mask detail
- comparable game character design detail

### Wooden architecture sites

Need:

- bracket sets
- rooflines
- temple halls
- gate structures
- comparable game architecture

This fourth group remains a research pattern, not a confirmed pair. Do not publish it until a specific site, specific game structure, and evidence scope are named.

For each comparison pair, the agent must specify whether the relationship is:

- confirmed source
- officially associated
- probable visual influence
- visual comparison only

Do not create misleading side-by-side pairs without a confidence label.

---

## 10. Literary Visuals

The site may use subtle visuals to support *Journey to the West* sections.

Needed:

- old-book / thread-bound book texture
- scroll texture
- chapter-title divider
- ink-brush line motifs
- seal-stamp motif
- page-corner ornaments

These decorative surfaces and motifs may be generated or created as original SVG/CSS. They must not contain pseudo-calligraphy or fabricated quotations.

Optional historical imagery:

- public-domain or licensed illustrations from older editions of *Journey to the West*
- traditional prints depicting Sun Wukong, Bull Demon King, Princess Iron Fan, spider spirits, etc.

Historical illustrations are **search-only documentary assets**. Do not generate an image in an “old print” style and imply that it comes from a historical edition.

If historical illustrations are used, store:

- edition
- date
- artist if known
- source institution
- copyright/public-domain status

---

## 11. UI Background Textures

Need a small reusable texture library.

Recommended:

### Texture 1 — dark paper

Use for:

- info panels
- section backgrounds

### Texture 2 — weathered stone

Use for:

- chapter header accents
- map frame

### Texture 3 — ink wash

Use for:

- transitions
- hover gradients
- decorative masks

### Texture 4 — red seal

Use sparingly for:

- active state
- category badge
- chapter number

### Texture 5 — smoke/mist overlay

Use lightly for:

- hero images
- map atmosphere

Textures must tile or scale cleanly and should not reduce text readability.

Textures are good generation targets, but CSS/SVG/noise-mask implementations are preferred when they are lighter and easier to theme. Deliver clean surfaces without text, logos, recognizable heritage sites, character likenesses, or faux artifacts. Test them behind Chinese body text at WCAG AA contrast.

### 11.1 Chinese typography assets

Typography is part of the asset plan, not an implementation afterthought.

- Select one licensed Chinese display face for chapter titles and one highly readable Chinese text face for body copy; a single family may serve both if its hierarchy is strong.
- The display face may suggest 宋体、碑刻或克制的书写感, but body text must not imitate brush calligraphy.
- Verify Simplified-Chinese glyph coverage, punctuation, numerals, Latin filenames/source titles, and uncommon proper names used in the knowledge base.
- Record font name, foundry/source URL, version, license, allowed web embedding, local file path, and fallback stack.
- Self-host only when the license permits it. Prefer WOFF2 and avoid shipping unnecessary weights or a full oversized family.
- Do not use AI-generated glyphs, traced official logo lettering, or unreviewed faux-seal characters.
- Test title and body styles on mobile with long Chinese place names, source citations, and spoiler warnings before approval.

---

## 12. Logo / Wordmark

Need a project wordmark for:

**黑神话：悟空文化地图**

Optional future English secondary label:

**Black Myth Wukong Atlas**

Recommended style:

- elegant serif or custom display typography
- restrained brush/calligraphic influence
- avoid imitating the official game logo too closely
- clearly distinguish fan project branding from Game Science branding
- Chinese title must be real editable type or reviewed vector lettering, never AI-rendered glyphs

Need variants:

- horizontal logo
- compact header logo
- icon/favicon
- monochrome version

---

## 13. Favicon / App Icon

Need simple symbolic mark.

Possible concepts:

- stylized mountain + staff
- seal containing 猴 / 悟-inspired abstract mark
- ring/hoop + mountain silhouette
- atlas compass translated into Chinese seal geometry

Avoid direct reproduction of official game trademarks.

---

## 14. Empty / Loading / Transition Art

Optional but useful:

### Loading state

- animated ink spread
- smoke drifting
- seal imprint

### Empty filtered map

- faint landscape silhouette
- message: “此分类暂无可显示的标记”

### Chapter transition

- short ink-wash wipe
- chapter title appears like a stamped seal or scroll heading

Animations must remain subtle and performant.

---

## 15. Image Specifications

### Maps

```text
Format: WebP / AVIF
Longest edge: 3000–5000 px
Preferred file size: under 2.5 MB after optimization
```

### Hero images

```text
Format: WebP / AVIF
Aspect ratio: 16:9
Target: 1920×1080 or higher
```

### Card images

```text
Format: WebP
Aspect ratio: 4:5 or 1:1
Target: 1000–1600 px longest edge
```

### Heritage comparison images

```text
Format: WebP
Preferred: minimum 1600 px wide
```

### Icons

```text
Format: SVG
Canvas: 24×24 / 32×32 / 48×48 compatible
```

### Delivery conventions

- Use lowercase English filenames with hyphens: `ch03-xiaoxitian-heritage-01.webp`, not Chinese filenames or spaces.
- Keep the stable asset ID separate from crop/format variants, for example `ch01-hero` with `ch01-hero-640.avif`, `ch01-hero-1280.webp`, and `ch01-hero-1920.webp`.
- Provide responsive derivatives for large heroes/maps; do not send the 4096 px master to every mobile device.
- Keep editable/vector or highest-quality masters outside the optimized public delivery path when practical.
- Use sRGB output, remove unnecessary metadata from delivery copies, and never upscale a documentary source to meet a nominal size target.
- Test focal-point crops at 16:9, 4:5, and mobile portrait where the same image is reused.
- Record crop variants and focal point in `media.json`; alt text describes the visible crop, not the uncropped master.

---

## 16. Image Metadata and Rights Gate

Every production asset, including generated and original-vector assets, must have metadata before it can be referenced by chapter JSON.

Recommended file:

```text
src/data/media.json
```

Example:

```json
{
  "heritage-xiaoxitian-01": {
    "file": "/images/heritage/xiaoxitian-01.webp",
    "titleZh": "隰县小西天大雄宝殿悬塑",
    "assetRole": "heritage-documentary",
    "provenanceType": "sourced",
    "documentary": true,
    "sourceTitle": "...",
    "sourceUrl": "...",
    "creator": "...",
    "license": "...",
    "licenseStatus": "cleared",
    "evidenceSourceIds": ["H02", "H03"],
    "evidenceScopeZh": "用于展示报道明确对照的悬塑视觉，不证明整座小雷音寺均为原样扫描。",
    "altZh": "隰县小西天大雄宝殿内层叠分布的悬塑",
    "altEn": "Suspended sculptures inside Xiaoxitian Temple",
    "usageNoteZh": "现实文化遗产对照图",
    "spoilerLevel": "none"
  }
}
```

Allowed `assetRole` values:

```text
chapter-map
chapter-atmosphere
game-reference
heritage-documentary
historical-documentary
historical-analogue
comparison-frame
decorative-interpretation
ui-texture
ui-icon
wordmark
```

Allowed `provenanceType` values:

```text
sourced
game-capture
generated
original-vector
original-illustration
original-photography
```

Allowed `licenseStatus` values:

```text
cleared
public-domain
permission-required
link-only
do-not-use
unknown
```

Only `cleared`, `public-domain`, and documented first-party `original-*` assets may be shipped as local binaries in the public site. `permission-required`, `link-only`, `do-not-use`, and `unknown` stay in the research manifest and must not be copied into production asset folders.

Generated assets additionally require `generator`, `generationDate`, `promptSummary`, and `reviewedByHuman`; they must always set `documentary` to `false`. A generated asset may not cite an H/G/W source ID as proof, though its prompt can be informed by non-proprietary mood and chapter facts.

Chapter maps additionally require `topologyStatus`. Only `verified-markers` maps may be used with finalized normalized marker coordinates; `unverified` and `verified-high-level` maps are overview images only.

---

## 17. Search Tasks for a Research Agent

An image research agent should search for:

### Per chapter

- official or first-party-captured chapter landscape references used to verify terrain and landmark order
- major location screenshots with chapter, sub-area, capture context, and spoiler level
- boss/character reference images needed to show exact game appearance
- major object/artifact screenshots needed to show exact game appearance

### Heritage

- reusable documentary photography of Tier A sites before Tier B candidates
- close-ups of relevant sculptures
- architectural details shown in game comparisons
- publicly documented scanning/modeling visits

### Literary / historical

- public-domain Journey to the West illustrations
- traditional prints
- Buddhist/Daoist iconography relevant to specific characters

For every candidate image, return:

```text
asset ID
suggested filename
subject
source URL
source institution
license / reuse note
license status: cleared / public-domain / permission-required / link-only / do-not-use / unknown
resolution
recommended use
confidence of relevance
asset role
documentary: true / false
evidence source ID
what the cited source actually proves
spoiler level
```

A search result URL or government-hosted page is not permission to download and republish its image. The research output must distinguish “use as citation/link” from “ship the image binary.” Prefer primary and institutional sources for evidence, then separately seek a reusable photograph of the same object if the evidence page's image rights are unclear.

---

## 18. Generation Tasks for an Image-Generation Agent

Original visual assets may be generated for non-documentary purposes. Generation is not a fallback for missing evidence; if a documentary or exact game-reference image is unavailable, leave that role empty and keep researching.

Good generation targets:

- chapter-map illustrations
- neutral texture backgrounds
- decorative chapter dividers
- marker icon concepts
- project logo concepts
- atmospheric hero backgrounds that do not claim to be game screenshots
- abstract, non-canonical silhouettes for cards where exact character imagery cannot be shipped
- ink/smoke edge masks and non-photographic ambient overlays

Generated images must be labeled internally as generated.

Generation prompt rules:

- Describe materials, weather, palette, camera distance, negative space, and chapter mood; do not request the official logo, a copied HUD, a named promotional composition, or a replica of a copyrighted key visual.
- Ask for **no letters, no Chinese characters, no seals containing text, no watermark, and no UI**. Add all text later with reviewed fonts/vector paths.
- Avoid recognizable copies of exact game characters unless the output is strictly an internal concept study; generated character likenesses are not production game-reference assets.
- Avoid invented Buddhist/Daoist inscriptions, mudras, ritual implements, or historical claims. Cultural review is required when these details are prominent.
- Preserve quiet areas for Chinese headings and controls, but do not bake text into the raster.
- Record prompt summary, model/tool, date, aspect ratio, and human review in `media.json`.

Do **not** generate fake “real-world heritage photographs” and present them as documentary images.

Do **not** generate fake screenshots and present them as game footage.

Do **not** generate historical book pages, “old photographs,” museum objects, maps with invented place labels, or simulated evidence and present them as sources.

### 18.1 Programmatic / original-vector tasks

Prefer code or editable vectors, not image generation, for:

- navigation, tabs, filters, drawers, tooltips, citation blocks, confidence badges, spoiler controls, and focus states;
- map pins and category icons;
- seal borders, ink dividers, corner ornaments, masks, gradients, grain, and subtle paper/stone overlays;
- loading and empty-state motion where CSS/SVG can provide a smaller accessible result;
- Chinese wordmark lockups after typography is selected.

These assets must include hover, selected, disabled, keyboard-focus, high-contrast, and reduced-motion behavior where applicable.

---

## 19. Suggested Chapter Map Art Direction

If generating custom chapter maps, use a consistent system.

### Chapter 1

Palette direction:

- black ink
- wet forest green
- ember red
- temple wood brown

### Chapter 2

Palette direction:

- ochre
- sand yellow
- pale stone
- dusty red

### Chapter 3

Palette direction:

- snow gray
- cold blue
- old-gold temple accents
- black ink

### Chapter 4

Palette direction:

- deep purple
- moss green
- cave black
- muted gold

### Chapter 5

Palette direction:

- ash black
- furnace red
- rust
- ember orange

### Chapter 6

Palette direction:

- cloud white
- mountain blue-gray
- jade green
- muted gold

These are art-direction notes, not rigid CSS color requirements.

---

## 20. Priority Order

### Phase 1 — Required for MVP

1. Chinese-primary logo/wordmark, original vector and clearly distinct from the official game logo
2. licensed Chinese display/body typography with a documented web-embedding and fallback plan
3. programmatic UI foundation: type hierarchy, palette, panel surfaces, evidence labels, controls, focus states, and reduced-motion behavior
4. one original/generated homepage atmosphere hero with no baked text
5. six original/generated chapter atmosphere images with consistent art direction
6. Chapter 1 topology research log and one custom Chapter 1 overview map; markers remain `待定位` until validated on the final image
7. one original SVG marker/evidence icon set with all interaction states
8. a minimal, rights-reviewed set of Chapter 1 game-reference images for the 8–15 MVP markers; text-first fallback where rights are not cleared
9. one public-domain or licensed *Journey to the West* literary image if a suitable edition is found; otherwise use an original decorative book/scroll treatment
10. a small panel texture/mask library, preferably CSS/SVG or generated non-documentary surfaces
11. one verified heritage comparison preview from Chapter 3 (隰县小西天 or 府城玉皇庙) **only if both imagery and reuse rights are cleared**; otherwise ship the citation and text without local images

Do not request Chapter 1 real-world heritage photographs for MVP unless later research verifies a specific Chapter 1 game-to-site relationship. `KNOWLEDGE_BASE.md` currently states that the actual temple prototype is not established.

### Phase 2

- maps for Chapters 2–6
- major characters
- major artifacts
- Tier A heritage comparisons: 隰县小西天、府城玉皇庙、高平铁佛寺
- additional Chapter 1 game captures and literary/historical analogues after rights review

### Phase 3

- historical illustrations
- advanced transitions
- custom icon refinements
- image comparison sliders
- expanded visual archive
- Tier B heritage candidates only after evidence-to-game mapping is resolved

---

## 21. Final Asset Quality Checklist

Every asset should be reviewed for:

- correct subject
- sufficient resolution
- visual consistency
- legibility in dark UI
- copyright/license status
- source attribution
- asset role and provenance type
- documentary vs. generated distinction
- evidence scope for every game-to-heritage comparison
- production rights gate (`cleared`, `public-domain`, or documented first-party original)
- cultural accuracy
- no fake Chinese text
- no misleading “official” implication
- optimized web file size
- Chinese alt text and caption
- spoiler level
- readable crop at desktop, tablet, and mobile breakpoints
- compatibility with keyboard focus, high contrast, and reduced motion when interactive

The website should look visually rich, but every documentary image should remain traceable to a real source.
