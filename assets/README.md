# Assets workspace

本目录保存《黑神话：悟空文化地图》的素材源文件、生成图与研究记录。v1 界面为简体中文；文件名和机器可读 ID 使用英文。

## Directory layout

```text
assets/
├── generated/          # 原创气氛图与纹理；不能作为事实证据
├── optimized/          # 为网页转换的 WebP；保留与 source 对应的目录结构
├── research/           # 来源目录、授权信息、生成任务书与清单
└── source/
    ├── game/           # 隔离保存的官方与第三方游戏研究参考；禁止进入公开构建
    ├── heritage/       # 有授权记录的实景、建筑、造像照片
    └── literature/     # 公版或已授权的历史图像
```

## Use rules

1. `source/` 中的素材可用于“现实实景”或“原著版本”内容，但页面必须同时展示出处与授权信息。
2. `generated/` 中的素材只用于气氛、章节封面、空状态或纹理。生成图不得放入“现实实景”“游戏实机”“原著版本”证据位。
3. 游戏图片若未取得再发布授权，只能放在 `source/game/official-reference/` 或 `source/game/community-reference/` 研究隔离区，状态为 `permission-required`、`research-only`、`useInPublicBuild: false`；不得由前端或公开构建自动导入。
4. 实景照片只能证明画面本身。游戏与遗产之间的关联仍须引用 `KNOWLEDGE_BASE.md` 中的 H 类来源。
5. 不在位图中生成中文文字、官方 Logo、HUD、角色或可识别的官方构图；中文标题由前端排版。

## Current inventory

- `source/heritage/`：18 张 CC BY-SA 4.0 实景、建筑与造像照片。
- `source/literature/`：9 张公版《西游记》古籍、绘画或皮影图像。
- `source/game/official-reference/`：86 张游戏科学官网或 Steam 官方商店高清研究参考；不具备公开发布许可。
- `source/game/community-reference/`：53 张第三方攻略媒体发布的实机、游戏界面与行旅图研究参考；均已核对画面主体，但仍不具备公开发布许可。
- `generated/`：1 张原创非纪实首页风格基准草案；每张图的最终提示词和用途记录在 `research/ASSET_GENERATION_BRIEFS.md`。
- `optimized/`：167 张 WebP 派生图，其中 139 张为禁止进入公开构建的游戏研究预览。
- `research/official-game-media-links.json`：106 条游戏科学官网媒体链接；其中 80 条桌面版高清素材已保存研究副本，26 条移动端重复壁纸只保留链接。
- `research/game-reference-assets.json`：86 张本地官方游戏研究图片的完整权利与来源清单。
- `research/community-gameplay-assets.json`：53 张本地第三方实机与游戏界面图片的逐图来源、权利边界、尺寸和 SHA-256。
- `research/local-file-inventory.json`：所有本地图片的尺寸、文件大小和 SHA-256。

当前共有 334 个本地图像文件：167 张源图或生成图，以及 167 张 WebP 派生图。以 `local-file-inventory.json` 的机器统计为准。

开发前请先阅读：

- [`PREVIEW.md`](PREVIEW.md)
- [`ASSET_SOURCE_CATALOG.md`](research/ASSET_SOURCE_CATALOG.md)
- [`ASSET_COVERAGE.md`](research/ASSET_COVERAGE.md)
- [`GAME_ELEMENT_COVERAGE.md`](research/GAME_ELEMENT_COVERAGE.md)
- [`ASSET_GENERATION_BRIEFS.md`](research/ASSET_GENERATION_BRIEFS.md)
- [`game-reference-assets.json`](research/game-reference-assets.json)
- [`community-gameplay-assets.json`](research/community-gameplay-assets.json)
- [`source-assets.json`](research/source-assets.json)
- [`media-manifest.json`](research/media-manifest.json)
- [`ATTRIBUTION.md`](ATTRIBUTION.md)
