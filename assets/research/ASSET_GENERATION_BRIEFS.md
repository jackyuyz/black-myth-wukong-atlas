# 原创视觉生成任务书

本文件可直接交给图片生成 agent。所有任务都属于**非纪实视觉**：不能用于证明游戏画面、原著版本或真实遗产外观。生成后须人工检查，并将最终提示词、生成工具、日期和文件校验值写回 `media-manifest.json`。

## 统一美术约束

- 气质：原创、克制的中式暗黑幻想文化展览，不临摹《黑神话：悟空》官方 Logo、HUD、菜单、人物、武器、关键美术或现成构图。
- 材质：水墨晕染、拓片、风化石、旧纸、寺院木构、青铜、铁器、烟、灰、雾。
- 配色：烟黑、骨白、暗褐、失饱和青绿；朱砂红只作很小的视觉锚点。
- 构图：给 HTML 中文标题、卡片和控件留出低细节负空间。
- 禁止：任何文字、汉字、伪汉字、印章文字、Logo、水印、HUD、边框、现代建筑、可识别的游戏人物或官方场景复刻。
- 无障碍：主体和负空间之间要有稳定明度差；背景不应比界面文字更抢眼。
- 标记：`assetRole: chapter-hero` 或 `decorative-texture`，`provenanceType: generated`，`licenseStatus: project-original`。

## G01 — 首页总览风格基准

**文件名：** `homepage-atmosphere-hero-v1.png`

**用途：** 首页首屏 16:9 背景，同时作为后续六回气氛图的风格基准。

**状态：** 已生成风格基准草案 `assets/generated/homepage-atmosphere-hero-v1.png`。当前输出为 1672×941，构图验收通过，但低于生产下限 1920×1080；正式上线前应使用同一提示词以目标分辨率重出或执行经过人工检查的高质量放大。

**提示词：**

> Create an original cinematic 16:9 website hero background for a Chinese cultural atlas about a mythic journey. A vast ink-wash mountain landscape at predawn, a small ancient timber monastery silhouette embedded in weathered cliffs, a thin waterfall, old pines, layered mist and drifting ash, with subtle stone-rubbing and aged-paper texture. Restrained Chinese dark fantasy, quiet museum-exhibition quality, realistic atmospheric depth blended with expressive ink edges. Palette: soot black, warm bone, dark umber, desaturated jade, with only one tiny non-textual cinnabar accent. Keep the left-center area calm and low-detail for an HTML Chinese title; place visual weight toward the right and lower edges. No people, no monkey, no weapons, no monsters, no recognizable existing game location or copied key-art composition. No text, no Chinese characters, no pseudo-characters, no seal script, no logo, no watermark, no HUD, no UI frame. Atmosphere only, not documentary evidence.

**验收：**

- 16:9 横图，建议 2560×1440 或更高。
- 左中区域可以叠放两行中文标题并保持可读。
- 不得出现疑似官方角色、金箍棒、Logo 或可辨认的文字笔画组合。
- 页面必须标注“原创气氛图”或通过元数据明确其非纪实属性。

## G02–G07 — 六回章节气氛图

以下提示词都要在末尾附加统一禁用语：

> Original non-documentary atmosphere art. No recognizable game character, no copied official composition, no text, no Chinese characters, no pseudo-characters, no logo, no watermark, no HUD, no UI frame. Leave calm negative space for HTML labels.

| ID / 文件名 | 构图与章节关键词 | 色彩与留白 |
|---|---|---|
| `G02` / `chapter-01-black-wind-hero.png` | 雨后密林、山寺、湿润青石阶、山火余烟、远处钟楼剪影；避免直接复刻官方黑风山 | 墨黑、苔绿、烟灰；左侧留白 |
| `G03` / `chapter-02-yellow-wind-hero.png` | 风蚀峡谷、残破石窟、沙幕中的古国遗迹、细小佛塔轮廓 | 土黄、赭石、灰蓝；上方留白 |
| `G04` / `chapter-03-new-west-hero.png` | 暴雪中的高大寺院群、层叠廊庑、冰雾与远处塔影；不可复制小西天实景或游戏画面 | 冷灰、骨白、极少暗金；右上留白 |
| `G05` / `chapter-04-webbed-hollow-hero.png` | 深洞天光、潮湿石壁、紫色野生植物、自然蛛丝般的线性节奏、远处道观屋脊 | 乌紫、青灰、腐叶褐；中央留白 |
| `G06` / `chapter-05-flaming-mountains-hero.png` | 火山峡谷、废弃炉窑、铁与青铜残片、远处熔光、厚烟与灰烬 | 焦黑、铁锈红、暗铜；左上留白 |
| `G07` / `chapter-06-mount-huaguo-hero.png` | 云海中的巨峰与瀑布群、天然洞口、雨后天光、归返故土的庄严感 | 墨青、云白、深绿；下方留白 |

推荐通用起句：

> Create an original cinematic 16:9 chapter hero for a Chinese myth-and-heritage digital exhibition, combining realistic atmospheric depth with ink-wash transitions and subtle rubbing texture.

## G08 — 第一回原创地图底图（先阻塞）

**文件名：** `chapter-01-map-v1.png`

**状态：** `blocked-by-topology-research`

**为什么暂不生成：** 当前知识库没有经过核对的地图坐标。先根据团队自有实机截图、官方资料和多份路线参考，建立高层级的区域顺序与地标关系；不得让生成模型自行发明一张“看似准确”的地图。

拓扑确认后使用：

> Create a top-down oblique illustrated map surface for a Chinese myth-and-heritage atlas, following the supplied topology diagram exactly. Translate only the verified paths, elevation bands, water, forest masses, temple compounds and landmark silhouettes into an original hand-painted Chinese scroll-map style. Weathered mineral pigments, ink wash, stone-rubbing texture, restrained dark-fantasy atmosphere, clear landmark separation, generous areas for HTML/SVG markers. Do not add, remove or relocate landmarks. No text, no labels, no symbols, no pins, no characters, no logo, no watermark, no HUD. This is an original interpretive map, not an official game map.

生成时必须把经过核实的线框/拓扑图作为参考图传入，并将 `topologyStatus` 至少设为 `verified-high-level`。

## G09–G12 — 可平铺装饰纹理

每张建议生成 2048×2048，再人工制作无缝版本和 WebP 派生图。

| ID / 文件名 | 提示词核心 | 使用位置 |
|---|---|---|
| `G09` / `texture-soot-paper.png` | nearly black handmade paper, subtle soot and fibers, low contrast, no marks or writing | 页面底色、抽屉面板 |
| `G10` / `texture-stone-rubbing.png` | weathered dark stone rubbing, sparse mineral grain, restrained directional wear | 地图工具栏、来源卡片 |
| `G11` / `texture-smoke-alpha.png` | isolated wisps of pale smoke on transparent or clean black background, soft and sparse | 首屏轻动效蒙版 |
| `G12` / `divider-ink-wash.png` | horizontal abstract ink diffusion with eroded edges and a tiny non-textual cinnabar dot | 区块分隔 |

纹理不得包含脸、建筑、文字、印章或明显中心主体。更简单的噪点、渐变、边框与图标应优先使用 CSS/SVG 编程创建，而不是生成位图。

## 不应生成的素材

- 游戏人物、Boss、武器、法宝的“准确立绘”。
- 游戏关卡截图或官方地图替代图。
- 小西天、玉皇庙、铁佛寺等真实遗产的“拟真照片”。
- 古籍页面、历史版画或博物馆藏品的伪造版本。
- 带中文标题的海报、Logo 和按钮；文字由前端或矢量排版完成。
