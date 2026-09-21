# 素材来源目录

更新日期：2026-09-20

本目录把“可直接进入项目的素材”和“只供研究、仍需授权的参考图”分开。许可信息以来源页面在下载日展示的内容为准；发布时仍应保留署名和许可链接。

## A. 已下载且许可明确

| 集合 | 文件数 | 作者 / 许可 | 内容和使用范围 |
|---|---:|---|---|
| 府城玉皇庙二十八宿彩塑 | 4 | Patrick20242023 / CC BY-SA 4.0 | 亢金龙、参水猿与鬼金羊、昴日鸡、奎木狼；配合 `[H01][H04]` |
| 府城玉皇庙建筑环境 | 3 | Windmemories / CC BY-SA 4.0 | 入口、门殿、彩绘木构；只作地点与建筑背景 |
| 隰县小西天建筑环境 | 5 | 三猎 / CC BY-SA 4.0 | 入口、上下院、大雄宝殿、通道、吻兽；不包含殿内悬塑 |
| 高平铁佛寺 | 6 | Windmemories / CC BY-SA 4.0 | 正殿、主尊、紫微大帝、诸天彩塑群与局部；不绑定具体 Boss |
| 《西游记》历史图像 | 9 | 佚名、葛饰北斋等 / Public domain | 1590 年古籍图、李卓吾评本、约 15 世纪插图、清代皮影与跨文化传播图像 |

逐文件来源页、作者覆盖关系、中文 alt、角色和使用边界统一见 `source-assets.json`。尺寸、字节数和 SHA-256 见 `local-file-inventory.json`。网页使用 `assets/optimized/` 中的 WebP，`assets/source/` 保留来源原件或 Commons 官方派生文件。

## B. 官方游戏参考：研究副本，禁止公开构建

`official-game-media-links.json` 保存了从游戏科学官网提取的 106 条概念图、截图和壁纸 URL；其中 80 张不重复桌面素材已保存研究副本，26 张移动端重复壁纸只保留链接。另从 Steam 官方商店保存 6 张最终版截图。86 张本地原图与预览图均隔离在 `official-reference` 路径，状态为 `permission-required`、`research-only`、`useInPublicBuild: false`，不能直接用于生产页面。

官方总入口：<https://gamesci.cn/wukong/>；Steam 商店：<https://store.steampowered.com/app/2358720/Black_Myth_Wukong/>。逐图来源、身份判断与权利边界见 `game-reference-assets.json`，详细规则见 `OFFICIAL_GAME_MEDIA_README.md`。

## C. 第三方实机、界面与行旅图：逐图授权入库

已从 GameSpot、The Escapist、PC Gamer、Destructoid、Game8、GamerSky、PC Invasion / Prima Games 和 GameStar 保存 53 张经画面核验的研究副本，并生成 53 张 WebP 预览。素材覆盖：

- 第一回广智、广谋、幽魂、灵虚子、白衣秀士、金池长老、黑风大王、黑熊精、波里个浪与赤髯龙；
- 三口钟、辟火罩获得与装备界面、黑风山和隐·旧观音禅院行旅图；
- 第二至六回 29 张代表性头目战斗帧。

用户于 2026-09-20 确认这些收集图片已获得本项目使用授权。当前只把其中 34 张与既有节点精确对应的素材登记为 `cleared`、`public-build`、`useInPublicBuild: true`，其余素材继续留在研究库，避免为了“有图”而使用近似画面。逐图页面、原始图片 URL、页面署名、中文 alt、尺寸、哈希与发布状态见 `community-gameplay-assets.json`；公开构建中的副本同时登记在 `src/data/media.json`。

## D. 证据页与地图研究

- `restricted-documentary-links.json` 保存 H01–H06 政府或媒体证据页；页面图片权利未知，只存链接。
- `MAP_TOPOLOGY_RESEARCH.md` 保存第一回路线骨架、官方行旅图更新依据和交叉核对来源；团队实机截图完成前仍为 `unverified`。
- `ASSET_COVERAGE.md` 说明哪些搜索项已经完成，哪些项目必须由团队截图、获得授权、生成或使用 SVG/代码制作。

## E. 仍然存在的权利缺口

1. **小西天大雄宝殿内部悬塑**：关联报道已记录，但仍未找到许可明确的可下载内部照片。
2. **尚未精确匹配的游戏节点**：已授权素材覆盖 35 个既有节点；其余人物、地点与法宝没有准确画面时继续采用文字卡，不能用近似图或生成图替代。
3. **第一回地图最终底图**：已保存黑风山与隐·旧观音禅院行旅图研究参考，但必须以最新版游戏中的团队自有截图和完整走图核实拓扑，再重新绘制项目地图。
