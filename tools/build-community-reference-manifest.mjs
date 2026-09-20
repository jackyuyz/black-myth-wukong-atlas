import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { extname, relative, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sourceRoot = resolve(root, "assets/source/game/community-reference");
const optimizedRoot = resolve(root, "assets/optimized/game/community-reference");
const manifestPath = resolve(root, "assets/research/community-gameplay-assets.json");
const updatedAt = "2026-09-20";

const gameSpotPage = "https://www.gamespot.com/gallery/black-myth-wukong-bosses-locations-guide/2900-5706/";
const gameSpotBase = "https://www.gamespot.com/wp-content/uploads/original/1816/18167535/";

function gameSpot(localPath, titleZh, sourceFile, chapter, altZh, spoilerLevel = "medium") {
  return {
    localPath: `gamespot/${localPath}`,
    titleZh,
    remoteUrl: `${gameSpotBase}${sourceFile}`,
    sourcePage: gameSpotPage,
    sourceTitle: "Black Myth: Wukong – All Bosses Guide",
    creator: "Jason Rodriguez / GameSpot",
    creditLine: "Screenshot published by GameSpot",
    chapter,
    subjectType: "boss-battle",
    altZh,
    spoilerLevel,
  };
}

const items = [
  gameSpot("chapter-1/guangzhi.jpg", "第一回实机：广智", "4353226-black-myth-wukong-bosses-boss-guide-1b.jpg", 1, "天命人在林中寺院场景与手持火焰长柄武器的广智交战。", "low"),
  gameSpot("chapter-1/lingxuzi.jpg", "第一回实机：灵虚子", "4353227-black-myth-wukong-bosses-boss-guide-1c.jpg", 1, "天命人在观音禅院与大型白狼灵虚子交战。", "low"),
  gameSpot("chapter-1/whiteclad-noble.jpg", "第一回实机：白衣秀士", "4353228-black-myth-wukong-bosses-boss-guide-1d.jpg", 1, "天命人在白雾泽水域与白衣秀士交战。", "low"),
  gameSpot("chapter-1/black-wind-king.jpg", "第一回实机：黑风大王", "4353229-black-myth-wukong-bosses-boss-guide-1e.jpg", 1, "天命人在洞府内与黑风大王的人形形态交战。", "low"),
  gameSpot("chapter-1/black-bear-guai.jpg", "第一回实机：黑熊精", "4353230-black-myth-wukong-bosses-boss-guide-1x.jpg", 1, "天命人在燃烧的山顶战场面对巨大黑熊精。", "medium"),
  gameSpot("chapter-1/red-loong.jpg", "第一回隐藏头目实机：赤髯龙", "4353717-black-myth-wukong-bosses-boss-guide-x4a.jpg", 1, "天命人在瀑布后的隐藏区域与赤髯龙交战。", "medium"),
  gameSpot("chapter-1/elder-jinchi.jpg", "第一回实机：金池长老", "4353231-black-myth-wukong-bosses-boss-guide-1y.jpg", 1, "天命人在隐·旧观音禅院与金池长老及周围尸众交战。", "medium"),

  gameSpot("chapter-2/stone-vanguard.jpg", "第二回实机：石先锋", "4353234-black-myth-wukong-bosses-boss-guide-2c.jpg", 2, "天命人在黄风岭岩石场地与石先锋交战。"),
  gameSpot("chapter-2/shigandang.jpg", "第二回实机：石敢当", "4353423-black-myth-wukong-bosses-boss-guide-2z1.jpg", 2, "天命人与被佛目唤醒的巨型石敢当交战。"),
  gameSpot("chapter-2/tiger-vanguard.jpg", "第二回实机：虎先锋", "4353235-black-myth-wukong-bosses-boss-guide-2d.jpg", 2, "天命人在卧虎寺血池场景与虎先锋交战。"),
  gameSpot("chapter-2/yellow-wind-sage.jpg", "第二回实机：黄风大圣", "4353238-black-myth-wukong-bosses-boss-guide-2x.jpg", 2, "天命人在黄沙战场与黄风大圣交战。", "high"),
  gameSpot("chapter-2/yellow-robed-squire.jpg", "第二回实机：黄袍员外", "4353239-black-myth-wukong-bosses-boss-guide-2y1.jpg", 2, "天命人在荒漠空地与黄袍员外交战。"),
  gameSpot("chapter-2/fuban.jpg", "第二回隐藏头目实机：蝜蝂", "4353241-black-myth-wukong-bosses-boss-guide-2y3.jpg", 2, "巨型甲虫蝜蝂从沙海中现身。", "high"),

  gameSpot("chapter-3/macaque-chief.jpg", "第三回实机：赤尻马猴", "4353242-black-myth-wukong-bosses-boss-guide-3a.jpg", 3, "天命人在雪地环境与持刃的赤尻马猴交战。"),
  gameSpot("chapter-3/kang-jin-loong.jpg", "第三回实机：亢金龙", "4353243-black-myth-wukong-bosses-boss-guide-3b.jpg", 3, "白色亢金龙盘旋在冰湖战场上方。"),
  gameSpot("chapter-3/captain-wise-voice.jpg", "第三回实机：魔将·妙音", "4353245-black-myth-wukong-bosses-boss-guide-3d.jpg", 3, "天命人在浮屠界与魔将·妙音交战。"),
  gameSpot("chapter-3/kang-jin-star.jpg", "第三回实机：亢金星君", "4353246-black-myth-wukong-bosses-boss-guide-3e.jpg", 3, "亢金星君在人形状态下施展雷电攻击。"),
  gameSpot("chapter-3/yellowbrow.jpg", "第三回实机：黄眉", "4353251-black-myth-wukong-bosses-boss-guide-3x1.jpg", 3, "天命人在小雷音寺场景与黄眉交战。", "high"),

  gameSpot("chapter-4/second-sister.jpg", "第四回实机：二姐", "4353252-black-myth-wukong-bosses-boss-guide-4a.jpg", 4, "天命人在盘丝岭村落场景与二姐交战。"),
  gameSpot("chapter-4/zhu-bajie.jpg", "第四回实机：猪八戒", "4353255-black-myth-wukong-bosses-boss-guide-4d.jpg", 4, "受法术影响的猪八戒在盘丝洞场景与天命人交战。", "high"),
  gameSpot("chapter-4/violet-spider.jpg", "第四回实机：紫蛛儿", "4353256-black-myth-wukong-bosses-boss-guide-4e.jpg", 4, "巨大蜘蛛形态的紫蛛儿位于盘丝洞战场。", "high"),
  gameSpot("chapter-4/hundred-eyed-daoist-master.jpg", "第四回实机：百眼魔君", "4353257-black-myth-wukong-bosses-boss-guide-4x.jpg", 4, "天命人在黄花观区域与百眼魔君交战。", "high"),
  gameSpot("chapter-4/venom-daoist.jpg", "第四回实机：黑手道人", "4353258-black-myth-wukong-bosses-boss-guide-4y1.jpg", 4, "天命人与施展毒术的黑手道人交战。"),
  gameSpot("chapter-4/scorpionlord.jpg", "第四回隐藏头目实机：毒敌大王", "4353259-black-myth-wukong-bosses-boss-guide-4y2.jpg", 4, "天命人在紫云山与蝎形妖王毒敌大王交战。", "high"),
  gameSpot("chapter-4/duskveil.jpg", "第四回隐藏头目实机：晦月魔君", "4353261-black-myth-wukong-bosses-boss-guide-4y4.jpg", 4, "晦月魔君在紫云山血色战场展开大型身躯。", "high"),

  gameSpot("chapter-5/pale-axe-stalwart.jpg", "第五回实机：皓斧力士", "4353262-black-myth-wukong-bosses-boss-guide-5a.jpg", 5, "天命人在灰烬林与持斧的皓斧力士交战。"),
  gameSpot("chapter-5/five-element-carts.jpg", "第五回实机：五行战车", "4353263-black-myth-wukong-bosses-boss-guide-5b.jpg", 5, "火焰山中的五行战车向战场喷吐火焰。"),
  gameSpot("chapter-5/keeper-of-flaming-mountains.jpg", "第五回实机：火焰山土地", "4353265-black-myth-wukong-bosses-boss-guide-5d.jpg", 5, "天命人在水墨般的异空间与火焰山土地交战。", "high"),
  gameSpot("chapter-5/red-boy-yaksha-king.jpg", "第五回实机：红孩儿与夜叉王", "4353266-black-myth-wukong-bosses-boss-guide-5x.jpg", 5, "红孩儿或其夜叉王阶段在火焰山战场发动攻击。", "high"),
  gameSpot("chapter-5/bishui-golden-eyed-beast.jpg", "第五回隐藏头目实机：璧水金睛兽", "4353268-black-myth-wukong-bosses-boss-guide-5y2.jpg", 5, "天命人在熔岩洞窟与璧水金睛兽交战。", "high"),

  gameSpot("chapter-6/supreme-inspector.jpg", "第六回实机：王灵官", "4353269-black-myth-wukong-bosses-boss-guide-6a.jpg", 6, "天命人与手掌形头部、驾驭火轮的王灵官交战。", "high"),
  gameSpot("chapter-6/stone-monkey.jpg", "第六回实机：石猿", "4353278-black-myth-wukong-bosses-boss-guide-6x1.jpg", 6, "终局战场中的石猿与天命人对峙。", "high"),
  gameSpot("chapter-6/great-sages-broken-shell.jpg", "第六回实机：大圣残躯", "4353279-black-myth-wukong-bosses-boss-guide-6x2.jpg", 6, "大圣残躯在终局战场与天命人交战。", "high"),
  gameSpot("chapter-6/erlang-sacred-divinity.jpg", "隐藏结局实机：二郎显圣真君", "4353482-black-myth-wukong-bosses-boss-guide-x1.jpg", 6, "天命人在梅山秘境与二郎显圣真君交战。", "high"),
  gameSpot("chapter-6/four-heavenly-kings.jpg", "隐藏结局实机：四大天王", "4353483-black-myth-wukong-bosses-boss-guide-x2.jpg", 6, "巨型石猿形态的天命人面对四大天王。", "high"),
  gameSpot("chapter-6/erlang-transformed.jpg", "隐藏结局实机：二郎神巨型法相", "4353484-black-myth-wukong-bosses-boss-guide-x3.jpg", 6, "巨型石猿与二郎神变化的巨型兽形法相交战。", "high"),

  {
    localPath: "escapist/chapter-1/wandering-wight-portrait.jpg",
    titleZh: "第一回实机：幽魂近景",
    remoteUrl: "https://www.escapistmagazine.com/wp-content/uploads/2024/08/WanderingWightWukong.jpg",
    sourcePage: "https://www.escapistmagazine.com/how-to-beat-wandering-wight-in-black-myth-wukong/",
    sourceTitle: "How To Beat Wandering Wight in Black Myth: Wukong",
    creator: "Dan Wenerowicz / The Escapist",
    creditLine: "Screenshot by The Escapist",
    chapter: 1,
    subjectType: "boss-portrait",
    altZh: "第一回头目幽魂的近距离实机画面。",
    spoilerLevel: "low",
  },
  {
    localPath: "escapist/chapter-1/wandering-wight-battle.jpg",
    titleZh: "第一回实机：幽魂战斗",
    remoteUrl: "https://www.escapistmagazine.com/wp-content/uploads/2024/08/WanderingWightBattleWukong.jpg",
    sourcePage: "https://www.escapistmagazine.com/how-to-beat-wandering-wight-in-black-myth-wukong/",
    sourceTitle: "How To Beat Wandering Wight in Black Myth: Wukong",
    creator: "Dan Wenerowicz / The Escapist",
    creditLine: "Screenshot by The Escapist",
    chapter: 1,
    subjectType: "boss-battle",
    altZh: "天命人在潮湿雾林空地与幽魂交战。",
    spoilerLevel: "low",
  },
  {
    localPath: "escapist/chapter-1/fireproof-mantle-icon.jpg",
    titleZh: "第一回界面：辟火罩图标",
    remoteUrl: "https://www.escapistmagazine.com/wp-content/uploads/2024/08/FireproofWukong.jpg",
    sourcePage: "https://www.escapistmagazine.com/how-to-get-the-fireproof-mantle-in-black-myth-wukong/",
    sourceTitle: "How To Get the Fireproof Mantle in Black Myth: Wukong",
    creator: "The Escapist",
    creditLine: "Screenshot published by The Escapist",
    chapter: 1,
    subjectType: "item-ui",
    altZh: "游戏界面中的辟火罩法宝图标与属性信息。",
    spoilerLevel: "medium",
  },
  {
    localPath: "escapist/chapter-1/fireproof-mantle-item.jpg",
    titleZh: "第一回界面：辟火罩装备页",
    remoteUrl: "https://www.escapistmagazine.com/wp-content/uploads/2024/08/FireproofMantleWukong.jpg",
    sourcePage: "https://www.escapistmagazine.com/how-to-get-the-fireproof-mantle-in-black-myth-wukong/",
    sourceTitle: "How To Get the Fireproof Mantle in Black Myth: Wukong",
    creator: "The Escapist",
    creditLine: "Screenshot published by The Escapist",
    chapter: 1,
    subjectType: "item-ui",
    altZh: "游戏法宝装备界面中选中的辟火罩。",
    spoilerLevel: "medium",
  },
  {
    localPath: "pc-invasion/chapter-1/guangmou-feature.jpg",
    titleZh: "第一回实机：广谋",
    remoteUrl: "https://www.pcinvasion.com/wp-content/uploads/2024/08/black-myth-wukong-guangmou-boss-guide-featured-image.jpg",
    sourcePage: "https://primagames.com/gaming/black-myth-wukong-guangmou-boss-guide-and-cheese-strategy",
    sourceTitle: "Black Myth Wukong: Guangmou Boss Guide and Cheese Strategy",
    creator: "PC Invasion / Prima Games",
    creditLine: "Gameplay image published by PC Invasion and Prima Games",
    chapter: 1,
    subjectType: "boss-battle",
    altZh: "天命人在竹林蛇径附近与施放蛇毒法术的广谋交战。",
    spoilerLevel: "low",
  },
  ...[
    ["fireproof-mantle-overview.jpg", "第一回界面：获得辟火罩", "1", "获得辟火罩时的法宝说明界面。", "item-ui"],
    ["fireproof-mantle-bell.jpg", "第一回实机：古钟场景", "2", "天命人站在第一回可敲响的古钟旁。", "location-route"],
    ["fireproof-mantle-elder-jinchi.jpg", "第一回实机：金池长老与辟火罩线索", "3", "天命人在隐·旧观音禅院与金池长老交战。", "boss-battle"],
  ].map(([file, titleZh, suffix, altZh, subjectType]) => ({
    localPath: `destructoid/chapter-1/${file}`,
    titleZh,
    remoteUrl: `https://www.destructoid.com/wp-content/uploads/2024/08/fireproof-mantle-black-myth-wukong-${suffix}.jpg`,
    sourcePage: "https://www.destructoid.com/how-to-get-the-fireproof-mantle-in-black-myth-wukong/",
    sourceTitle: "How to get the Fireproof Mantle in Black Myth: Wukong",
    creator: "Destructoid",
    creditLine: "Gameplay screenshot published by Destructoid",
    chapter: 1,
    subjectType,
    altZh,
    spoilerLevel: "medium",
  })),
  ...[
    ["bell-one.jpg", "第一回实机：第一口钟", "kEZ38xvWmLbdU4L4PjpK4M", "第一回山林寺院区域中的第一口古钟。"],
    ["bell-two.jpg", "第一回实机：第二口钟", "G6g8DtFne8GDL2YsoKfeTM", "第一回竹林区域中的第二口古钟。"],
    ["bell-three.jpg", "第一回实机：第三口钟", "Bp8irxKFB9bmtmWxgmcBsM", "第一回白雾泽附近的第三口古钟。"],
    ["fireproof-mantle-corpse.jpg", "第一回实机：辟火罩取得位置", "chfMH7YzknAohbcJYrJm6N", "金池长老战后悬挂遗骸与辟火罩取得位置。"],
  ].map(([file, titleZh, cdnId, altZh]) => ({
    localPath: `pc-gamer/chapter-1/${file}`,
    titleZh,
    remoteUrl: `https://cdn.mos.cms.futurecdn.net/${cdnId}.jpg`,
    sourcePage: "https://www.pcgamer.com/games/rpg/black-myth-wukong-bell-locations/",
    sourceTitle: "Black Myth: Wukong bell locations—Where to find all three",
    creator: "Sean Martin / PC Gamer",
    creditLine: "Gameplay screenshot published by PC Gamer",
    chapter: 1,
    subjectType: "location-route",
    altZh,
    spoilerLevel: "medium",
  })),
  ...[
    ["baw-li-guhh-lang-banner.png", "第一回实机：波里个浪近景", "3967734/09d27af35477b93670b40bc78ac8300f", "第一回蛤蟆头目波里个浪的攻略横幅近景。", "boss-portrait"],
    ["baw-li-guhh-lang-battle.png", "第一回实机：波里个浪战斗", "3972038/c8d83298231d41c493b6f28b2a85ba2f", "天命人在水潭区域与波里个浪交战。", "boss-battle"],
  ].map(([file, titleZh, imageId, altZh, subjectType]) => ({
    localPath: `game8/chapter-1/${file}`,
    titleZh,
    remoteUrl: `https://img.game8.co/${imageId}.png/show`,
    sourcePage: "https://game8.co/games/Black-Myth-Wukong/archives/468577",
    sourceTitle: "Baw-Li-Guhh-Lang Location and How to Beat",
    creator: "Black Myth: Wukong Walkthrough Team / Game8",
    creditLine: "Gameplay image published by Game8",
    chapter: 1,
    subjectType,
    altZh,
    spoilerLevel: "low",
  })),
  {
    localPath: "gamestar/chapter-1/baw-li-guhh-lang.jpg",
    titleZh: "第一回实机：波里个浪场地全景",
    remoteUrl: "https://images.cgames.de/images/gamestar/226/black-myth-wukong-bossliste-baw-li-guhh-lang_6306499.jpg",
    sourcePage: "https://www.gamestar.de/artikel/black-myth-wukong-alle-bosse%2C3418446.html",
    sourceTitle: "Black Myth: Wukong - Alle Bosse und wo ihr sie findet",
    creator: "GameStar",
    creditLine: "Gameplay screenshot published by GameStar",
    chapter: 1,
    subjectType: "boss-battle",
    altZh: "波里个浪在第一回水潭战场与天命人交战，画面保留头目名称 HUD。",
    spoilerLevel: "low",
  },
  {
    localPath: "gamersky/chapter-1/black-wind-mountain-journeyers-chart.jpg",
    titleZh: "第一回界面：黑风山行旅图",
    remoteUrl: "https://img1.gamersky.com/image2024/12/20241212_syj_380_18/14.jpg",
    sourcePage: "https://www.gamersky.com/handbook/202412/1859918.shtml",
    sourceTitle: "《黑神话悟空》行旅图一览 官方地图一览",
    creator: "Shy夏夏 / 游民星空整理",
    creditLine: "Official Journeyer's Chart image republished by GamerSky",
    chapter: 1,
    subjectType: "world-map-ui",
    altZh: "游戏内黑风山行旅图，显示山体、水系、寺院与区域路径。",
    spoilerLevel: "medium",
  },
  {
    localPath: "gamersky/chapter-1/secret-ancient-guanyin-temple-chart.jpg",
    titleZh: "第一回界面：隐·旧观音禅院行旅图",
    remoteUrl: "https://img1.gamersky.com/image2024/12/20241212_syj_380_18/116.jpg",
    sourcePage: "https://www.gamersky.com/handbook/202412/1859918.shtml",
    sourceTitle: "《黑神话悟空》行旅图一览 官方地图一览",
    creator: "Shy夏夏 / 游民星空整理",
    creditLine: "Official Journeyer's Chart image republished by GamerSky",
    chapter: 1,
    subjectType: "world-map-ui",
    altZh: "游戏内隐·旧观音禅院行旅图，显示寺院布局与周边地形。",
    spoilerLevel: "medium",
  },
];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    })
    .sort();
}

function projectPath(path) {
  return relative(root, path).split(sep).join("/");
}

function hashFile(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function readDimensions(paths) {
  const output = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", ...paths], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 8,
  });
  const result = new Map();
  let current;
  for (const line of output.split("\n")) {
    if (line && !line.startsWith(" ")) {
      current = resolve(line.replace(/:$/, ""));
      result.set(current, {});
    } else if (current) {
      const match = line.match(/^\s+(pixelWidth|pixelHeight):\s+(\d+)$/);
      if (match) result.get(current)[match[1]] = Number(match[2]);
    }
  }
  return result;
}

const sourceFiles = walk(sourceRoot).filter((path) => [".jpg", ".jpeg", ".png"].includes(extname(path).toLowerCase()));
const metadataByPath = new Map(items.map((item) => [item.localPath, item]));
const missingMetadata = sourceFiles
  .map((path) => relative(sourceRoot, path).split(sep).join("/"))
  .filter((path) => !metadataByPath.has(path));
const missingFiles = items.filter((item) => !existsSync(resolve(sourceRoot, item.localPath))).map((item) => item.localPath);

if (missingMetadata.length || missingFiles.length || items.length !== sourceFiles.length) {
  throw new Error(`Community reference mismatch. Missing metadata: ${missingMetadata.join(", ") || "none"}; missing files: ${missingFiles.join(", ") || "none"}; metadata=${items.length}; files=${sourceFiles.length}`);
}

const dimensions = readDimensions(sourceFiles);
mkdirSync(optimizedRoot, { recursive: true });

const manifestItems = items
  .map((item) => {
    const sourcePath = resolve(sourceRoot, item.localPath);
    const sourceDimensions = dimensions.get(sourcePath);
    const optimizedRelativePath = item.localPath.replace(/\.(jpe?g|png)$/i, ".webp");
    const optimizedPath = resolve(optimizedRoot, optimizedRelativePath);
    mkdirSync(resolve(optimizedPath, ".."), { recursive: true });

    const cwebpArgs = ["-quiet", "-q", "82"];
    if (sourceDimensions.pixelWidth > 1280) cwebpArgs.push("-resize", "1280", "0");
    cwebpArgs.push(sourcePath, "-o", optimizedPath);
    execFileSync("cwebp", cwebpArgs);

    const id = `community-gameplay-${item.localPath.replace(/\.[^.]+$/, "").replaceAll("/", "-")}`;
    return {
      id,
      titleZh: item.titleZh,
      localPath: projectPath(sourcePath),
      optimizedPath: projectPath(optimizedPath),
      remoteUrl: item.remoteUrl,
      sourcePage: item.sourcePage,
      sourceTitle: item.sourceTitle,
      creator: item.creator,
      creditLine: item.creditLine,
      retrievedAt: updatedAt,
      assetRole: item.subjectType === "world-map-ui" ? "game-reference-map" : "game-reference",
      provenanceType: "third-party-game-capture",
      chapter: item.chapter,
      subjectType: item.subjectType,
      identityConfidence: "high-source-captioned-and-visually-checked",
      licenseStatus: "permission-required",
      storageScope: "research-only",
      copyrightOwner: "Game Science / screenshot publisher or uploader",
      dimensions: {
        width: sourceDimensions.pixelWidth,
        height: sourceDimensions.pixelHeight,
      },
      bytes: statSync(sourcePath).size,
      sha256: hashFile(sourcePath),
      altZh: item.altZh,
      evidenceScopeZh: "仅用于内部画面核验、章节叙事、角色识别与 UI 研究；来源页公开展示不等于获得再发布许可。不能单独证明现实取景关联，也不得直接进入公开构建。",
      spoilerLevel: item.spoilerLevel,
      useInPublicBuild: false,
    };
  })
  .sort((a, b) => a.localPath.localeCompare(b.localPath, "en"));

writeFileSync(
  manifestPath,
  `${JSON.stringify({
    schemaVersion: 1,
    updatedAt,
    rightsNoteZh: "本清单保存第三方攻略媒体发布的《黑神话：悟空》实机截图、游戏界面与行旅图研究副本。它们均为 permission-required、research-only、useInPublicBuild: false；公开页面使用前必须另行取得许可或替换为团队自有截图。",
    qualityNoteZh: "所有图片均已人工核对画面主体；第三方标题用于身份交叉确认。优化版最长边不超过原图，宽图最大宽度为 1280 像素，WebP 质量 82。",
    count: manifestItems.length,
    items: manifestItems,
  }, null, 2)}\n`,
);

console.log(`Wrote ${manifestItems.length} community gameplay items and WebP previews.`);
