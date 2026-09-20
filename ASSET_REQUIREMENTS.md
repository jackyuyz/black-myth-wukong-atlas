# Black Myth Wukong Atlas — Visual & Asset Requirements

## 1. Purpose

This document defines the visual assets needed for the `black-myth-wukong-atlas` website.

It is intended for:

- image-research agents
- image-generation agents
- designers
- developers preparing web assets

The website is centered on an interactive map, so assets should support exploration rather than behave like decorative filler.

---

## 2. Visual Direction

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

Avoid:

- neon cyberpunk
- bright esports UI
- generic fantasy medieval visuals
- cartoon-style icons
- overly glossy mobile-game HUD
- excessive gold ornament
- AI imagery with fake Chinese characters

---

## 3. Asset Categories

The project needs the following visual groups.

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

Possible strategy:

- research existing fan-made maps for structural reference
- produce a custom stylized map inspired by Chinese scroll painting
- manually place website markers on top

Do not embed clickable labels into the image itself.

---

## 4. Chapter Hero Images

Need one strong hero image for each chapter card and chapter landing state.

### Chapter 1 — Black Wind Mountain

Mood:

- forest
- mountain monastery
- smoke/fire
- black clouds
- mossy stone
- Buddhist temple atmosphere

### Chapter 2 — Yellow Wind Ridge

Mood:

- yellow sand
- desert cliffs
- ruined kingdom
- wind erosion
- ancient stone/Buddhist remains

### Chapter 3 — The New West

Mood:

- snow
- giant monastery
- Buddhist sculptural density
- pagoda/prison imagery
- cold blue-gray atmosphere

### Chapter 4 — Webbed Hollow

Mood:

- deep cave
- purple vegetation
- silk/web motifs
- Daoist temple
- eerie but beautiful mountain scenery

### Chapter 5 — Flaming Mountains

Mood:

- fire
- volcanic/red canyon
- furnace
- smoke
- ash
- iron/bronze

### Chapter 6 — Mount Huaguo

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

---

## 5. Map Marker Icons

Need a coherent icon set.

Recommended categories:

```text
place
boss
character
artifact
architecture
literature
heritage
story
```

Style:

- monochrome or two-tone
- carved-seal / ink-brush / stone-rubbing influence
- readable at 24–40 px
- transparent SVG preferred

Recommended forms:

- Place: mountain gate / pavilion
- Boss: mask / horn / beast silhouette
- Character: profile / seal
- Artifact: talisman / ritual object
- Architecture: temple roof / column
- Literature: scroll / book
- Heritage: monument / site marker
- Story: flame / knot / narrative glyph

Need states:

- default
- hover
- selected
- disabled/filtered

Markers should remain legible over busy map backgrounds.

---

## 6. Character / Boss Images

For each major marker character, ideally acquire:

1. game screenshot or official/promotional image
2. optional in-game portrait/journal reference image
3. optional historical artwork/reference image if culturally relevant

Priority characters by chapter:

### Chapter 1

- Black Bear Guai
- Elder Jinchi
- Lingxuzi
- Guangzhi
- Guangmou
- Whiteclad Noble

### Chapter 2

- Yellow Wind Sage
- Tiger Vanguard
- Stone Vanguard
- Shigandang
- Fuban
- Lingji Bodhisattva

### Chapter 3

- Yellowbrow
- Maitreya
- Kang-Jin Loong
- Kang-Jin Star
- selected Captains

### Chapter 4

- Violet Spider
- Fourth Sister
- Hundred-Eyed Daoist Master
- Venom Daoist
- Duskveil
- spider sisters as a group

### Chapter 5

- Bull Demon King
- Princess Iron Fan
- Red Boy
- Yaksha King
- Keeper of Flaming Mountains
- Bishui Golden-Eyed Beast

### Chapter 6

- Destined One
- Great Sage’s Broken Shell
- Erlang Shen
- Four Heavenly Kings

Preferred image treatment:

- character isolated on dark neutral background where possible
- 4:5 or square crop
- enough negative space for UI overlays

---

## 7. Artifact Images

Need clean images for major narrative objects.

High priority:

- kasaya / 锦襕袈裟
- Plantain Fan / 芭蕉扇
- Golden Cymbals / 金铙
- Human Seed Bag / 人种袋
- Jingubang / 如意金箍棒
- major bells
- important talismans
- Great Sage relics

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

---

## 8. Real-World Heritage Photography

This is one of the most important asset groups.

For each verified or high-confidence heritage reference, collect:

1. wide exterior shot
2. interior shot if legally available
3. detail shot of relevant sculpture/architecture
4. optional map/location photograph

Priority sites to research include:

- Yungang Grottoes
- Huayan Temple
- Hanging Temple
- Shanhua Temple
- Jueshan Temple
- Yong’an Temple
- Foguang Temple
- Nanchan Temple
- Jinge Temple
- Yingxian Wooden Pagoda
- Chongfu Temple
- Zhenguo Temple
- Shuanglin Temple
- Xiaoxitian, Xixian
- Guangsheng Temple
- Tiefosi
- Yuhuang Temple, Zezhou
- Xixi Erxian Temple

For every image, record:

```text
site name
location
photographer/source
source URL
license / usage status
what feature it shows
relevant game connection
```

Prefer images from:

- official government pages
- heritage-site websites
- museums
- Wikimedia Commons
- licensed cultural institutions
- photography with clear reuse permissions

Do not assume a government-hosted image is automatically free to redistribute.

---

## 9. Reality vs. Game Comparison Assets

For strong verified connections, prepare paired images.

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

Optional historical imagery:

- public-domain or licensed illustrations from older editions of *Journey to the West*
- traditional prints depicting Sun Wukong, Bull Demon King, Princess Iron Fan, spider spirits, etc.

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

---

## 12. Logo / Wordmark

Need a project wordmark for:

**Black Myth Wukong Atlas**

Optional Chinese secondary label:

**黑神话·悟空文化地图**

Recommended style:

- elegant serif or custom display typography
- restrained brush/calligraphic influence
- avoid imitating the official game logo too closely
- clearly distinguish fan project branding from Game Science branding

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
- message: “No markers in this category”

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

---

## 16. Image Metadata File

All sourced assets should have metadata.

Recommended file:

```text
src/data/media.json
```

Example:

```json
{
  "heritage-xiaoxitian-01": {
    "file": "/images/heritage/xiaoxitian-01.webp",
    "title": "Xiaoxitian suspended sculpture interior",
    "source": "...",
    "sourceUrl": "...",
    "creator": "...",
    "license": "...",
    "altZh": "隰县小西天大雄宝殿悬塑",
    "altEn": "Suspended sculptures inside Xiaoxitian Temple",
    "usageNote": "Used as real-world heritage reference"
  }
}
```

---

## 17. Search Tasks for a Research Agent

An image research agent should search for:

### Per chapter

- chapter landscape overview
- major location screenshots
- boss/character reference images
- major object/artifact screenshots

### Heritage

- official photography of candidate sites
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
resolution
recommended use
confidence of relevance
```

---

## 18. Generation Tasks for an Image-Generation Agent

When licensed/source images are unavailable, original visual assets may be generated for non-documentary purposes.

Good generation targets:

- chapter-map illustrations
- neutral texture backgrounds
- decorative chapter dividers
- marker icon concepts
- project logo concepts
- atmospheric hero backgrounds that do not claim to be game screenshots

Generated images must be labeled internally as generated.

Do **not** generate fake “real-world heritage photographs” and present them as documentary images.

Do **not** generate fake screenshots and present them as game footage.

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

1. logo/wordmark
2. homepage hero
3. six chapter hero images
4. Chapter 1 map
5. Chapter 1 marker icons
6. Chapter 1 game images
7. Chapter 1 *Journey to the West* decorative visual
8. Chapter 1 real-world heritage images
9. panel textures

### Phase 2

- maps for Chapters 2–6
- major characters
- major artifacts
- heritage comparisons

### Phase 3

- historical illustrations
- advanced transitions
- custom icon refinements
- image comparison sliders
- expanded visual archive

---

## 21. Final Asset Quality Checklist

Every asset should be reviewed for:

- correct subject
- sufficient resolution
- visual consistency
- legibility in dark UI
- copyright/license status
- source attribution
- documentary vs. generated distinction
- cultural accuracy
- no fake Chinese text
- no misleading “official” implication
- optimized web file size

The website should look visually rich, but every documentary image should remain traceable to a real source.
