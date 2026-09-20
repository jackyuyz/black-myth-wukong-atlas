import test from "node:test";
import assert from "node:assert/strict";
import { loadData, validateData } from "./validate-data";
function rejects(
  name: string,
  change: (data: ReturnType<typeof loadData>) => void,
) {
  test(name, () => {
    const data = loadData();
    change(data);
    assert.throws(() => validateData(data));
  });
}
test("当前发布数据通过完整文件与拓扑校验", () =>
  assert.doesNotThrow(() => validateData(loadData(), true)));
rejects(
  "不存在的来源必须失败",
  (d) => (d.chapters[0].markers[0].game.sources = ["G99"]),
);
rejects(
  "非法类别枚举必须失败",
  (d) => (d.chapters[0].markers[0].type = "heritage"),
);
rejects(
  "无回目的原著卡必须失败",
  (d) => (d.chapters[0].markers[0].journeyToTheWest.chapterNumbers = []),
);
rejects(
  "无来源的实地关联必须失败",
  (d) => (d.chapters[2].markers[0].realWorld[0].sources = []),
);
rejects(
  "受限媒体不能公开",
  (d) =>
    (d.media["heritage-yuhuang-kang-jin-long-01"].licenseStatus =
      "permission-required"),
);
rejects(
  "媒体引用不存在必须失败",
  (d) => (d.chapters[2].markers[0].realWorld[0].mediaIds = ["missing"]),
);
rejects(
  "未经核验的总览不能携带坐标",
  (d) => (d.chapters[1].markers[0].position = { x: 0.5, y: 0.5 }),
);
rejects(
  "路线核验不能作为地理坐标核验",
  (d) => (d.chapters[0].mapMode = "geographic"),
);
rejects(
  "坐标不得超出归一化范围",
  (d) => (d.chapters[0].markers[0].position.x = 1200),
);
rejects("视觉比较不能标为确认取材", (d) => {
  d.chapters[2].markers[0].realWorld[0].confidence = "confirmed";
  d.chapters[2].markers[0].realWorld[0].evidenceType = "visual-comparison";
});
rejects(
  "开发者确认不能只引政府报道",
  (d) =>
    (d.chapters[2].markers[0].realWorld[0].relationship =
      "developer-confirmed"),
);
rejects(
  "游戏和原著知识层不能混标",
  (d) => (d.chapters[0].markers[0].layers = ["game"]),
);
rejects(
  "装饰图不能代替纪实文物照片",
  (d) => (d.chapters[2].markers[0].realWorld[0].mediaIds = ["atmosphere-01"]),
);
rejects(
  "英文界面文案必须失败",
  (d) => (d.chapters[0].overviewZh = "Placeholder"),
);
rejects(
  "新增但没有验证规则的内容字段必须失败",
  (d) => (d.chapters[0].unreviewedField = "不应发布"),
);
