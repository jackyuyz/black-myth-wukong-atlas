# 六回地图拓扑研究记录

更新日期：2026-09-20

当前状态：`verified-high-level`，仅适用于 `mapMode: schematic`。

独立复核成员：`/root/topology_review`。用户已授权调用独立子代理作为第二成员；本成员独立打开原研究清单、交叉检查来源并修正初始骨架。主代理集成时仍需检查最终示意图与本线框一致，不能把本记录视为实机地理坐标复验。

配套文件：[机器可读拓扑](chapter-01-topology.json)、[原创黑白复核线框](chapter-01-topology.svg)。线框画布为 1200 × 700；JSON 只保存 0–1 的插画布局坐标，不是游戏地图坐标。线框是研究材料，不是第三方地图复刻；未下载游戏截图或地图图片。

## 核准范围与重要修正

主线区域顺序为苍狼林 → 翠竹林 → 黑风洞；本次仅选择 12 个文化阅读标记及 3 个连接锚点，不承诺完整收集路线。广智、幽魂不能被串成必须完成的主线；幽魂虽在行进通路附近，击败它是可选遭遇，线框支线画法并不声称其地理位置是独立岔路末端。波里个浪属于蛇径河流探索分支，与通往广谋的方向分开。

隐·旧观音禅院通过敲响三口钟的条件传送进入，不能画成白衣秀士后方可直接走到的普通寺院。第三口钟在白衣秀士后方支路，图上依初次常见探索顺序从此处画传送线；该画法并不声称敲钟顺序被强制固定。三钟条件同时包括广智场地、广谋场地与白衣秀士后方，必须在界面说明。完成金池长老遭遇后返回钟旁，再取得辟火罩；**辟火罩领取标记放在第三钟旁，不在金池长老战场内**。[G10][G11][G12]

锦襕袈裟适合做阅读条目，本轮不赋予拾取点。牯护院、色蕴、马天霸、葫芦仙人、申猴及后续回访的赤髯龙不在本轮选取范围；原待核查骨架里列出它们不等于已逐点批准上线。

## 四份既有路线资料的检查结果

| 资料 | 本次打开结果 | 可以证明的范围 | 不能据此证明的内容 |
|---|---|---|---|
| [游民星空第一章路线指引（G07）](https://www.gamersky.com/handbook/202412/1858397.shtml) | 可读取 | 苍狼林、翠竹林、黑风洞的章节先后及所选角色/寺院/法宝在流程中的关系 | 这是推荐全收集顺序，不能把所有箭头理解为必经主线 |
| [Game8 原区域地图入口](https://game8.co/games/Black-Myth-Wukong/archives/470912) | 浏览工具返回 Internal Error | 无，本次不计为成功复核证据 | 不声称四份入口均可用或均支持每个节点 |
| [PowerPyx 土地庙清单（G08）](https://www.powerpyx.com/black-myth-wukong-all-shrines-fast-travel-points/) | 可读取 | 第一回三个常规区域及独立隐藏寺院、林外/蛇径/洞内/见谛峰等名称归属 | 本页未逐个说明人物与法宝位置，不能单独给全部 12 标记背书 |
| [BWIKI 地图条目](https://wiki.biligame.com/wukong/%E5%9C%B0%E5%9B%BE) | 可读取 | 中文区域树和第一回隐藏区域名称，与 G07/G08 相符 | 地图页本身未给出完整三钟传送过程；不能替代具体条目 |

Game8 不可读的缺口由以下可读取的具体条目补核，未降低“每节点至少两处一致来源”的要求。BWIKI 地图的“苍狼林／翠竹林／黑风洞”段落作为中文命名辅助，不取用其地图图片。

## 补充来源元数据

下列编号由主代理同步到 `src/data/sources.json`；本记录不修改来源主文件。

| ID | 页面标题／出版者／日期 | URL | 本次核对定位 |
|---|---|---|---|
| G07 | 《黑神话悟空》第一章黑风山路线指引／游民星空／2024-12-12 | https://www.gamersky.com/handbook/202412/1858397.shtml | 正文“苍狼林”“翠竹林”“黑风洞”三段 |
| G08 | Black Myth Wukong All Shrines (Fast Travel Points)／PowerPyx／2024-08-20 | https://www.powerpyx.com/black-myth-wukong-all-shrines-fast-travel-points/ | Chapter 1: Black Wind Mountain |
| G09 | Black Myth: Wukong Boss Guide – All Bosses／PowerPyx／2024-08-20 | https://www.powerpyx.com/black-myth-wukong-boss-guide-all-bosses/ | 第一回各具名 Boss 的 Location 字段；不引用打法或数值 |
| G10 | Black Myth Wukong Bell Locations – How to Reach Ancient Guanyin Temple／PowerPyx／2024-08-20 | https://www.powerpyx.com/black-myth-wukong-bell-locations-how-to-reach-ancient-guanyin-temple/ | Bell 1、Bell 2、Bell 3 与末段传送说明 |
| G11 | Black Myth Wukong All Vessel Locations／PowerPyx／2024-08-20 | https://www.powerpyx.com/black-myth-wukong-all-vessel-locations/ | 1. Fireproof Mantle，尤其第 3 步 |
| G12 | 《黑神话悟空》金池长老位置说明 第一回隐藏BOSS在哪／游民星空／2024-11-26 | https://www.gamersky.com/handbook/202411/1850941.shtml | “金池长老位置”中敲三钟、返回与悬尸领取法宝的段落 |

只摘要路线事实，不复制第三方图文或人物传记。这里的游戏来源是第三方流程参考，不应在公开界面标为“官方确认”。

## 逐节点双来源记录

第二来源均定位到具体小节；这里只记录地图所属与连接关系，不扩写游戏生平。

| 节点 ID／名称 | 核准所属或关系 | 第一处来源 | 第二处一致来源 |
|---|---|---|---|
| `forest-outside` 林外（锚点） | 苍狼林，通往观音禅院之前 | G07 苍狼林段 | G08 Forest of Wolves 列表 |
| `guangzhi` 广智 | 苍狼林·林外探索区；关联第一口钟 | G07 苍狼林段 | G09 Guangzhi 的 Location；G10 Bell 1 |
| `wandering-wight` 幽魂 | 苍狼林·林外的可选遭遇 | G07 苍狼林段 | G09 Wandering Wight 的 Location；该来源也记载推进至金池时可能尚未打幽魂，非主线前置 |
| `guanyin-temple` 观音禅院 | 苍狼林主线路径，不能与隐藏旧禅院混同 | G07 苍狼林段 | G08 Forest of Wolves 列表；G09 Lingxuzi 的 Location |
| `lingxuzi` 灵虚子 | 观音禅院 | G07 苍狼林段 | G09 Lingxuzi 的 Location |
| `snake-trail` 蛇径（锚点） | 翠竹林，后山与白雾泽之间 | G07 翠竹林段 | G08 Bamboo Grove 列表 |
| `baw-li-guhh-lang` 波里个浪 | 蛇径河流探索分支 | G07 翠竹林段 | G09 Baw-Li-Guhh-Lang 的 Location 与 Guangmou 的相反行进分向 |
| `guangmou` 广谋 | 翠竹林·蛇径，关联第二口钟 | G07 翠竹林段 | G09 Guangmou 的 Location；G10 Bell 2 |
| `whiteclad-noble` 白衣秀士 | 翠竹林·白雾泽 | G07 翠竹林段 | G09 Whiteclad Noble 的 Location；G10 Bell 3 |
| `third-bell` 第三口钟（锚点） | 白衣秀士后方支路，进入黑风洞前 | G10 Bell 3 | G12 白衣秀士之后“先走左边”段 |
| `ancient-guanyin-temple` 隐·旧观音禅院 | 三钟条件传送的独立隐藏区域 | G10 开头及 Bell 3 后说明 | G12 三钟与旧禅院段；G08 Secret 列表 |
| `elder-jinchi` 金池长老 | 隐·旧观音禅院 | G09 Elder Jinchi 的 Location | G12 旧禅院开门与金池段 |
| `fireproof-mantle` 辟火罩 | 完成旧禅院支线后回第三钟旁取得 | G11 Fireproof Mantle 第 3 步 | G12 金池后调查悬尸段；G10 末段 |
| `black-wind-king` 黑风大王 | 黑风洞·洞内 | G07 黑风洞段 | G09 Black Wind King 的 Location |
| `black-bear-guai` 黑熊精 | 黑风洞·见谛峰 | G07 黑风洞段 | G09 Black Bear Guai 的 Location |

两个推荐顺序并非全都相同：G07 把波里个浪列在广谋之前，G09 的文章索引先列广谋。二者位置描述一致，分歧来自可选探索顺序，因此图中将波里个浪放为蛇径分支，不画成通往广谋的必经节点。广智和幽魂同样不固定相互先后。

## 通过后的展示约束

1. JSON 中 `main` 表示所选主区域顺序；`optional` 表示可选探索或隐藏支线。连线省略了中间路段，不可写“直达”。
2. `mode: teleport` 与 `mode: return` 必须区别于普通路线，采用点线并显示中文条件说明。`mode: reward` 只表达条件领取关系。
3. 所有坐标均为线框完成后选择的插画布局坐标；SVG 中无游戏地形测绘主张。最终美术可以改变路径曲线及背景，但不得改变节点所属、分支、传送/返回含义。
4. 地图常驻“路线示意图，非地理比例，非官方地图”。锚点不是额外文化卡片；只有 `isMarker: true` 的 12 点参与卡片浏览。
5. 第一回没有核实的现实寺院取景映射，地图与卡片不得暗示观音禅院对应某座山西寺庙。

## `verified-markers` 仍未达到

没有团队当前游戏版本的行旅图全图、局部截图、平台和截图者记录，没有逐点实机定位。本轮不宣称完成该级别。未来如改为 `geographic`，必须重新取得第一方证据并逐点复验，不能复用本示意图坐标作为地理坐标。

[Steam 官方 1.0.13.16669 更新公告](https://store.steampowered.com/news/app/2358720/view/527580578293220145?l=schinese) 是原研究记录保留的行旅图机制来源；本轮没有用该公告给上述具体路线节点背书。

## 集成复核

2026-09-20，主代理对照 JSON 节点、边与黑白 SVG 源码完成复核，接受第二成员的线框。正式界面沿用全部 15 个节点、15 条边与归一化位置；特别保留三钟条件、金池后的返回和辟火罩领取地点。界面视觉检查另记录在实现验证报告。

## 第二至六回高层路线补充（2026-09-20）

本轮继续采用 `mapMode: schematic` 与 `topologyStatus: verified-high-level`。五回均只核准区域先后、并行分支、条件入口和奖励关系；没有团队实机逐点截图，因此没有升级为 `verified-markers`，也不把插画坐标解释为游戏地理坐标。

| 回目 | 上线规模 | 主序列与分支范围 | 主要路线来源 |
|---|---:|---|---|
| 第二回 | 6 个文化点、6 个连接点、12 条边 | 沙门村后分向卧虎寺与挟魂崖，再汇入黄风阵；黄袍员外支线进入隐·斯哈哩国 | G08、G09、G13；隐藏区 G14 |
| 第三回 | 6 个文化点、6 个连接点、11 条边 | 雪山径 → 浮屠界 → 苦海 → 极乐谷 → 小雷音寺；瓜田支路；浮屠塔条件传送至梅山 | G08、G09、G15；梅山 G16 |
| 第四回 | 6 个文化点、7 个连接点、13 条边 | 兰喜村 → 盘丝洞 → 黄花观；黑手道人两次遭遇后进入隐·紫云山 | G08、G09；隐藏区 G17 |
| 第五回 | 7 个文化点、8 个连接点、15 条边 | 灰烬林 → 丹灶谷 → 火光地；皓斧力士与五行战车条件链进入隐·璧水洞 | G08、G09、G18；隐藏区 G19 |
| 第六回 | 9 个文化点、5 个连接点、16 条边 | 青嶂道后开放山体四条遗物路线，汇入水帘洞、天真顶与石卵终局；五蕴另列可选支线 | G08、G09、G20 |

### 关键边界

1. 第二回虎先锋与石先锋是并行推进线，不画成固定先后；斯哈哩国由条件支线进入。
2. 第三回梅山入口保留在浮屠塔，不挪到第六回花果山；图中明确使用条件传送。
3. 第四回同一张黑手道人卡承载两次遭遇，拓扑用两条虚线指向该卡，不伪造两个独立人物。
4. 第五回五行战车使用汇总节点，表示跨区域任务进度，不声称所有战车集中在同一地点。
5. 第六回四件遗物路线允许开放探索顺序；图中的上下分支是排版，不是地理方位。水帘洞之后才进入线性的终局段。

机器可读记录为 `chapter-02-topology.json` 至 `chapter-06-topology.json`。每个文件保存页面实际采用的节点、归一化布局位置、边、条件和来源；`scripts/validate-data.ts` 在构建前逐项比对，防止页面数据与研究记录漂移。
