# Assets workspace

本目录保存《黑神话：悟空文化地图》的素材源文件、生成图与研究记录。v1 界面为简体中文；文件名和机器可读 ID 使用英文。

## Directory layout

```text
assets/
├── generated/          # 原创气氛图与纹理；不能作为事实证据
├── optimized/          # 为网页转换的 WebP；保留与 source 对应的目录结构
├── research/           # 来源目录、授权信息、生成任务书与清单
└── source/
    ├── heritage/       # 有授权记录的实景、建筑、造像照片
    └── literature/     # 公版或已授权的历史图像
```

## Use rules

1. `source/` 中的素材可用于“现实实景”或“原著版本”内容，但页面必须同时展示出处与授权信息。
2. `generated/` 中的素材只用于气氛、章节封面、空状态或纹理。生成图不得放入“现实实景”“游戏实机”“原著版本”证据位。
3. 官方游戏图片若未取得再发布授权，只记录在研究清单中，状态为 `permission-required`，不把二进制文件提交到仓库。
4. 实景照片只能证明画面本身。游戏与遗产之间的关联仍须引用 `KNOWLEDGE_BASE.md` 中的 H 类来源。
5. 不在位图中生成中文文字、官方 Logo、HUD、角色或可识别的官方构图；中文标题由前端排版。

## Current inventory

- `source/heritage/`：18 张 CC BY-SA 4.0 实景、建筑与造像照片。
- `source/literature/`：9 张公版《西游记》古籍、绘画或皮影图像。
- `generated/`：1 张原创非纪实首页风格基准草案；每张图的最终提示词和用途记录在 `research/ASSET_GENERATION_BRIEFS.md`。
- `optimized/`：28 张 WebP 网页派生图，包含所有来源图和首页草案。
- `research/official-game-media-links.json`：106 条游戏科学官网媒体链接；只供研究，没有保存官方图二进制。
- `research/local-file-inventory.json`：所有本地图片的尺寸、文件大小和 SHA-256。

开发前请先阅读：

- [`PREVIEW.md`](PREVIEW.md)
- [`ASSET_SOURCE_CATALOG.md`](research/ASSET_SOURCE_CATALOG.md)
- [`ASSET_COVERAGE.md`](research/ASSET_COVERAGE.md)
- [`ASSET_GENERATION_BRIEFS.md`](research/ASSET_GENERATION_BRIEFS.md)
- [`source-assets.json`](research/source-assets.json)
- [`media-manifest.json`](research/media-manifest.json)
- [`ATTRIBUTION.md`](ATTRIBUTION.md)
