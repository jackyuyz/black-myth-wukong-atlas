import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, relative, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const assetRoot = resolve(root, "assets");
const gameRoot = resolve(assetRoot, "source/game/official-reference");
const gameLinkPath = resolve(assetRoot, "research/official-game-media-links.json");
const gameManifestPath = resolve(assetRoot, "research/game-reference-assets.json");
const inventoryPath = resolve(assetRoot, "research/local-file-inventory.json");
const updatedAt = "2026-09-20";

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

const earlyConceptNotes = {
  Concept_guishiwei: {
    titleZh: "守卫与面具早期概念（身份未确认）",
    subjectCandidateZh: "红甲守卫、白色面具或巨型头部",
    identityConfidence: "unresolved",
    altZh: "蒙眼红甲守卫持弓站在巨大的白色面具头部旁。",
  },
  Concept_heifenshan1: {
    titleZh: "黑风山瀑布峡谷早期概念",
    subjectCandidateZh: "黑风山瀑布、峡谷、造像与水面",
    identityConfidence: "official-file-label",
    altZh: "阴暗峡谷中的瀑布、浅水、岩壁造像与巨大生物轮廓。",
  },
  Concept_heifenshan2: {
    titleZh: "黑风山洞口寺门早期概念",
    subjectCandidateZh: "黑风山洞口、山路与寺门",
    identityConfidence: "official-file-label",
    altZh: "山壁洞口内可见寺门与向上延伸的石阶山路。",
  },
  Concept_heifenshan3: {
    titleZh: "黑风山夜林生物早期概念",
    subjectCandidateZh: "夜林、墓地、灯笼与黑色兽形生物",
    identityConfidence: "environment-only",
    altZh: "黑色兽形生物位于挂有灯笼的昏暗树林与墓地之间。",
  },
  Concept_heifenshan4: {
    titleZh: "黑风山密林石像早期概念",
    subjectCandidateZh: "密林山路、石像与主角背影",
    identityConfidence: "official-file-label",
    altZh: "主角站在雾气密林的山路上，两侧散布巨大石质头部。",
  },
  Concept_huodaolang: {
    titleZh: "火刀狼早期概念",
    subjectCandidateZh: "持燃烧长刀的白发狼形武者；与最终角色对应关系待核实",
    identityConfidence: "official-file-label-not-final-identity",
    altZh: "白发狼形武者持一柄燃烧的长刀，背后为深色背景。",
  },
  Concept_landscape1: {
    titleZh: "水潭岩窟与木构早期概念",
    subjectCandidateZh: "黑风山候选环境",
    identityConfidence: "environment-only",
    altZh: "长有苔藓的岩窟水潭旁搭有竹木栈道与棚架。",
  },
  Concept_landscape2: {
    titleZh: "峡谷巨型多臂造像早期概念",
    subjectCandidateZh: "黑风山候选环境与巨型造像",
    identityConfidence: "environment-only",
    altZh: "峡谷水面上方耸立一尊动物头部、多臂的巨型造像。",
  },
  Concept_landscape3: {
    titleZh: "瀑布山崖聚落早期概念",
    subjectCandidateZh: "黑风山候选环境",
    identityConfidence: "environment-only",
    altZh: "多层木构聚落沿山崖展开，溪流与瀑布穿过建筑之间。",
  },
  Concept_landscape6: {
    titleZh: "LINGXUGUAN 瀑布寺观早期概念",
    subjectCandidateZh: "官方画面标注 LINGXUGUAN 的早期环境",
    identityConfidence: "official-image-label",
    altZh: "瀑布从山崖落下，远处岩壁间分布多座寺观建筑。",
  },
  Concept_langren: {
    titleZh: "狼人敌人早期概念",
    subjectCandidateZh: "两种狼形人身敌人设计",
    identityConfidence: "official-file-label",
    altZh: "两名狼形人身武者并列，一名持长刃，一名持香炉形兵器。",
  },
  Concept_lingxudaozhang: {
    titleZh: "灵虚道长早期概念",
    subjectCandidateZh: "官方画面标注 LINGXUDAOZHANG 的早期角色；不可直接等同最终版灵虚子",
    identityConfidence: "official-image-label-not-final-identity",
    altZh: "白色狼狐形道者持拂尘站立，旁边附有一颗人形头部设定。",
  },
  Concept_tudi: {
    titleZh: "土地公早期概念",
    subjectCandidateZh: "老人、鼠形与胡须草图等土地角色方案",
    identityConfidence: "official-file-label",
    altZh: "土地角色多方案设定，包括持烟斗老人、鼠形角色与胡须头像草图。",
  },
  Concept_wukong: {
    titleZh: "悟空/猴形主角早期概念",
    subjectCandidateZh: "猴形主角的早期服装与面部方案；不是最终模型确认图",
    identityConfidence: "official-file-label-not-final-model",
    altZh: "猴形主角的正侧面与服装细节早期设定图。",
  },
};

const laterConceptNotes = {
  blackmyth_wukong_concept_06: ["佛像洞窟中的鼠形角色概念", "鼠形角色站在大型佛像环绕的洞窟中。"],
  blackmyth_wukong_concept_07: ["雪山寺观入口环境概念", "积雪覆盖的山崖寺观入口与层层石阶。"],
  blackmyth_wukong_concept_08: ["雪山洞口栈桥环境概念", "从深色洞口望向雪山上的木构栈桥与寺观。"],
  blackmyth_wukong_concept_09: ["雪中古寺庭院环境概念", "古寺庭院覆盖积雪，石碑分列在参道两侧。"],
  blackmyth_wukong_concept_c_02: ["土地公鸟形方案概念", "带有人类面孔与胡须的鸟形土地角色停在枯枝上。"],
  blackmyth_wukong_concept_c_03: ["小雷音寺佛像妖物概念", "白发强壮妖物持长兵器并骑在三头兽形生物上。"],
  blackmyth_wukong_concept_c_04: ["金刚像角色概念", "白色多面角色身披繁复佛教护法风格甲胄并持短兵器。"],
  blackmyth_wukong_concept_c_05: ["四将翼虫形角色概念", "暗色翼虫形角色穿戴残破甲胄，四肢末端呈弯钩状。"],
  blackmyth_wukong_concept_c_06: ["蓝彩长角角色概念", "蓝色面孔、双长角与长尾的角色身穿宽大黄绿色衣袍。"],
  blackmyth_wukong_concept_c_07: ["魔像红翼角色概念", "面具形头部角色身披甲胄，背后展开暗红色翼状结构。"],
  blackmyth_wukong_concept_c_08: ["马猴精角色概念", "白毛猴形妖物背负另一张蓝色面具并手持长刀。"],
  blackmyth_wukong_concept_c_09: ["亢金龙角色概念", "白发人形角色身着红袍，身旁盘绕一条白龙。"],
};

const screenshotNotes = {
  blackmyth_wukong_screenshot_013: ["亢金龙雪地战斗特写", "主角在雪山场景中与白色龙形敌人近距离交战。"],
  blackmyth_wukong_screenshot_014: ["亢金龙雪地战斗全景", "白龙盘旋于雪山寺观上方，闪电落在结冰水面。"],
  blackmyth_wukong_screenshot_015: ["亢金龙雷电攻击", "雪山战场上白龙释放密集雷电，主角位于前景。"],
  blackmyth_wukong_screenshot_016: ["亢金龙掠过冰面", "白龙从主角近前掠过，结冰水面与雷电充满画面。"],
  blackmyth_wukong_screenshot_017: ["亢金龙近身棍击", "主角跃起挥棍击向低空盘旋的白龙。"],
  blackmyth_wukong_screenshot_018: ["亢金龙空中攻击", "主角在白龙下方跃起，雪山与天空构成战斗背景。"],
  blackmyth_wukong_screenshot_019: ["雪地造像群中的主角", "主角侧身站在积雪覆盖的多尊跪姿造像之间。"],
  blackmyth_wukong_screenshot_020: ["雪地火圈战斗", "主角站在雪地火圈中央，远处敌人迎面冲来。"],
  blackmyth_wukong_screenshot_021: ["雪山石塔敌人对峙", "主角在雪山石塔之间面向持长兵器的敌人。"],
  blackmyth_wukong_screenshot_022: ["黑暗场景法术攻击", "主角挥动燃烧棍棒，敌人身上伸出多条红黑线状法术。"],
  blackmyth_wukong_screenshot_023: ["竹林战斗仰视镜头", "主角在昏暗竹林中挥棍，敌人从上方掠过。"],
  blackmyth_wukong_screenshot_024: ["竹林战斗俯视镜头", "断裂竹竿与飞散竹叶围绕交战中的主角和敌人。"],
  blackmyth_wukong_screenshot_025: ["林间石门巨人对峙", "主角冲向古老石门前的巨大人形敌人。"],
  blackmyth_wukong_screenshot_026: ["林中金色碎片法术", "主角面对林中敌人，画面充满飞散的金色纸片状碎片。"],
  blackmyth_wukong_screenshot_027: ["赤色洞窟战斗", "主角在赤色洞窟遗迹中与持大型武器的敌人交战。"],
  blackmyth_wukong_screenshot_028: ["雪中古寺亢金星造像", "主角站在雪中古寺庭院，仰望巨大的亢金星骑龙造像。"],
  blackmyth_wukong_screenshot_029: ["黑熊精峡谷战斗", "眼泛红光的巨大黑熊精在山谷石道上逼近主角。"],
  blackmyth_wukong_screenshot_031: ["天命人使用葫芦", "猴形主角在火光旁抬起红色葫芦。"],
  blackmyth_wukong_screenshot_032: ["白龙近距离攻击", "白色龙首张口扑向画面前方的主角。"],
};

const steamNotes = {
  "steam-00": ["Steam 官方截图：林中火焰兵器战斗", "林中寺院前，主角与手持燃烧兵器的敌人战斗。"],
  "steam-01": ["Steam 官方截图：水面棍势战斗", "赤色毛发的敌人在浅水寺院遗迹中挥出明亮棍势。"],
  "steam-02": ["Steam 官方截图：秋林兽形妖王战斗", "金黄秋林与寺院前，一只披甲兽形妖物迎战主角。"],
  "steam-03": ["Steam 官方截图：古寺白毛巨猿战斗", "白毛巨猿在古寺庭院中攻击倒地的主角。"],
  "steam-04": ["Steam 官方截图：骸骨洞窟巨蛛战斗", "巨型白色蜘蛛在遍布骸骨的洞窟中面对持棍主角。"],
  "steam-05": ["Steam 官方截图：雪地火圈战斗", "主角在雪地火圈前使用葫芦，敌人从后方接近。"],
};

const officialLinks = JSON.parse(readFileSync(gameLinkPath, "utf8"));
const officialById = new Map(officialLinks.items.map((item) => [item.id, item]));
const steamUrls = new Map([
  ["steam-00", "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/ss_86c4b7462bba219a0d0b89931a35812b9f188976.1920x1080.jpg?t=1760601605"],
  ["steam-01", "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/ss_d9391ab31a4d15dddf7ba4949bfa44f5d9170580.1920x1080.jpg?t=1760601605"],
  ["steam-02", "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/ss_524a39da392ee83dde091033562bc719d46b5838.1920x1080.jpg?t=1760601605"],
  ["steam-03", "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/ss_968bbc9caceb7d798bd0c393e1e9b4c44ed6d835.1920x1080.jpg?t=1760601605"],
  ["steam-04", "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/ss_415397426d4c939ebb8a93ac66831f28ee7199be.1920x1080.jpg?t=1760601605"],
  ["steam-05", "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/ss_63477e8ce2c0582b81c6ed576377d78e692b5642.1920x1080.jpg?t=1760601605"],
]);
const sourceImages = walk(gameRoot).filter((path) => extname(path).toLowerCase() === ".jpg");
const sourceDimensions = readDimensions(sourceImages);

const gameItems = sourceImages.map((path) => {
  const localPath = projectPath(path);
  const stem = path.split(sep).at(-1).replace(/\.jpg$/, "");
  const optimizedPath = localPath
    .replace("assets/source/game/official-reference/", "assets/optimized/game/official-reference/")
    .replace(/\.jpg$/, ".webp");
  const dimensions = sourceDimensions.get(path);
  let titleZh;
  let altZh;
  let subjectCandidateZh;
  let identityConfidence = "visual-only-unverified-identity";
  let remoteUrl;
  let sourcePage;
  let assetRole;
  let releaseStatus;

  if (localPath.includes("/steam/")) {
    [titleZh, altZh] = steamNotes[stem];
    subjectCandidateZh = "最终发行版官方商店截图；具体角色与章节需用游戏内游记或自有实机记录复核";
    identityConfidence = "official-release-screenshot-visual-only";
    remoteUrl = steamUrls.get(stem);
    sourcePage = "https://store.steampowered.com/app/2358720/Black_Myth_Wukong/";
    assetRole = "official-release-screenshot-reference";
    releaseStatus = "release-store-media";
  } else {
    const official = officialById.get(stem);
    remoteUrl = official.remoteUrl;
    sourcePage = officialLinks.sourcePage;
    if (localPath.includes("/early-concepts/")) {
      const note = earlyConceptNotes[stem];
      ({ titleZh, altZh, subjectCandidateZh, identityConfidence } = note);
      assetRole = "official-early-concept-reference";
      releaseStatus = "early-concept-not-final-canonical-art";
    } else if (localPath.includes("/concepts/")) {
      [titleZh, altZh] = laterConceptNotes[stem];
      subjectCandidateZh = "按官方画面文字与可见内容描述；角色最终名称仍需复核";
      identityConfidence = "official-image-label-or-visual-description";
      assetRole = "official-concept-reference";
      releaseStatus = "concept-art-not-final-model";
    } else if (localPath.includes("/screenshots/")) {
      [titleZh, altZh] = screenshotNotes[stem];
      subjectCandidateZh = "游戏科学官网实机截图；具体任务节点仍需用游戏内游记或自有实机记录复核";
      identityConfidence = stem === "blackmyth_wukong_screenshot_029" ? "high-black-bear-visual" : "official-screenshot-visual-only";
      assetRole = "official-screenshot-reference";
      releaseStatus = "official-pre-release-screenshot";
    } else {
      titleZh = `游戏科学官方桌面壁纸 ${stem.replace("blackmyth_wukong_wallpaper_", "#")}`;
      altZh = "《黑神话：悟空》官方桌面壁纸，画面用于章节场景、材质与光影研究。";
      subjectCandidateZh = "章节或场景环境；具体地点未在文件名中确认";
      assetRole = "official-wallpaper-reference";
      releaseStatus = "official-desktop-wallpaper";
    }
  }

  return {
    id: `game-reference-${stem}`,
    titleZh,
    localPath,
    optimizedPath,
    remoteUrl,
    sourcePage,
    retrievedAt: updatedAt,
    assetRole,
    provenanceType: "official-game-media",
    releaseStatus,
    subjectCandidateZh,
    identityConfidence,
    licenseStatus: "permission-required",
    storageScope: "research-only",
    copyrightOwner: "Game Science Interactive Technology Co., Ltd. / applicable publisher",
    dimensions: {
      width: dimensions.pixelWidth,
      height: dimensions.pixelHeight,
    },
    bytes: statSync(path).size,
    sha256: hashFile(path),
    altZh,
    evidenceScopeZh: "可用于内部视觉研究、角色/场景识别与授权候选清单；不是可直接公开发布的授权证明，也不能单独证明现实取景关联。",
    useInPublicBuild: false,
  };
});

writeFileSync(
  gameManifestPath,
  `${JSON.stringify({
    schemaVersion: 1,
    updatedAt,
    rightsNoteZh: "本清单中的本地图片均来自游戏科学官网或《黑神话：悟空》Steam 官方商店。文件只保存在 research-only 路径，版权状态为 permission-required，公开构建必须排除。",
    count: gameItems.length,
    excludedDuplicateSetZh: "未保存游戏官网 26 张移动端壁纸，因为它们与桌面版壁纸内容重复。",
    items: gameItems,
  }, null, 2)}\n`,
);

const localByOfficialId = new Map(
  gameItems
    .filter((item) => item.sourcePage === officialLinks.sourcePage)
    .map((item) => [item.localPath.split("/").at(-1).replace(/\.jpg$/, ""), item]),
);
officialLinks.updatedAt = updatedAt;
officialLinks.rightsNoteZh = "这些 URL 来自游戏科学官网。桌面版高分辨率素材已在明确隔离的 official-reference 路径保存为内部研究副本；状态仍为 permission-required，公开构建必须排除。移动端重复壁纸仅保留链接。";
officialLinks.items = officialLinks.items.map((item) => {
  const local = localByOfficialId.get(item.id);
  if (!local) return item;
  return {
    ...item,
    localBinaryStored: true,
    localPath: local.localPath,
    optimizedPath: local.optimizedPath,
    storageScope: "research-only",
    useInPublicBuild: false,
  };
});
writeFileSync(gameLinkPath, `${JSON.stringify(officialLinks, null, 2)}\n`);

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const allImages = walk(assetRoot).filter((path) => imageExtensions.has(extname(path).toLowerCase()));
const allDimensions = readDimensions(allImages);
const inventoryItems = allImages.map((path) => {
  const localPath = projectPath(path);
  const dimensions = allDimensions.get(path);
  let kind = "source";
  if (localPath.includes("/optimized/")) kind = "optimized";
  else if (localPath.includes("/generated/")) kind = "generated";
  if (localPath.includes("/source/game/official-reference/")) kind = "research-only-official-reference";
  if (localPath.includes("/source/game/community-reference/")) kind = "research-only-community-reference";
  if (localPath.includes("/optimized/game/official-reference/")) kind = "research-preview-official-reference";
  if (localPath.includes("/optimized/game/community-reference/")) kind = "research-preview-community-reference";
  return {
    path: localPath,
    kind,
    width: dimensions.pixelWidth,
    height: dimensions.pixelHeight,
    bytes: statSync(path).size,
    sha256: hashFile(path),
  };
});
writeFileSync(
  inventoryPath,
  `${JSON.stringify({ schemaVersion: 1, updatedAt, items: inventoryItems }, null, 2)}\n`,
);

console.log(`Wrote ${gameItems.length} game reference items and ${inventoryItems.length} local image inventory items.`);
