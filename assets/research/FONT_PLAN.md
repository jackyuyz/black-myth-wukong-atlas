# 中文字体方案

## 已选字体

| 用途 | 字体 | 建议字重 | 许可 | 官方来源 | 当前存储方式 |
|---|---|---|---|---|---|
| 标题、章节名、较短引文 | Noto Serif SC / Noto Serif CJK SC | 600、700 | SIL Open Font License 1.1 | <https://github.com/notofonts/noto-cjk/tree/main/Serif> | 暂不提交庞大的完整字体；实现阶段生成所需字重和字符范围的 WOFF2 子集 |
| 正文、控件、来源和无障碍文字 | Noto Sans SC / Noto Sans CJK SC | 400、500、600 | SIL Open Font License 1.1 | <https://github.com/notofonts/noto-cjk/tree/main/Sans> | 暂不提交庞大的完整字体；实现阶段生成所需字重和字符范围的 WOFF2 子集 |

## 选择理由

- 两个家族均有简体中文区域版本，标题与正文搭配稳定。
- 正文不依赖书法体，适合长说明、来源链接和移动端阅读。
- Noto CJK 1.002 及以后使用 SIL OFL 1.1，可嵌入应用；自托管时应保留许可文本。
- 字体覆盖汉字、标点、数字与拉丁字符，仍须用知识库中的生僻名称做最终 glyph 测试。

## 实现约束

1. 不把完整多语言 OTC/大字体包直接送给网页用户。
2. 优先使用项目实际字符集合生成 WOFF2，并保留常用简体中文字符回退。
3. 字体文件真正加入仓库时，同时保存对应版本的 `OFL.txt`，并在本表填写版本、文件路径与校验值。
4. 推荐回退：

```css
--font-display: "Noto Serif SC", "Songti SC", "STSong", serif;
--font-body: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
```

5. 不使用 AI 生成汉字、官方游戏 Logo 字形描摹或来源不明的“书法字体”。

