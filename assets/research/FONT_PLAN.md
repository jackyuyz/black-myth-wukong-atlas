# 中文字体方案

## 已选字体

| 用途 | 字体 | 建议字重 | 许可 | 官方来源 | 当前存储方式 |
|---|---|---|---|---|---|
| 标题、章节名、较短引文 | Noto Serif SC / Noto Serif CJK SC | 400、500 | SIL Open Font License 1.1 | <https://github.com/notofonts/noto-cjk/tree/main/Serif> | `public/fonts/noto-serif-sc-*-subset.woff2` |
| 正文、控件、来源和无障碍文字 | Noto Sans SC / Noto Sans CJK SC | 400、600、700 | SIL Open Font License 1.1 | <https://github.com/notofonts/noto-cjk/tree/main/Sans> | `public/fonts/noto-sans-sc-*-subset.woff2` |

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

## 当前实现记录

- 字体来源：Fontsource 打包的 Google Noto Sans SC 与 Noto Serif SC；字体版本、包版本和官方来源记录在 `public/fonts/font-manifest.json`。
- 许可：SIL Open Font License 1.1，允许网页嵌入；许可正文保存在 `public/fonts/ofl-noto-sc.txt`。
- 文件：正文使用 Noto Sans SC 400、600、700；标题使用 Noto Serif SC 400、500。每个文件的 SHA-256 和字节数记录在字体清单中。
- 子集：`npm run fonts:build` 从 `src/` 与 `index.html` 的实际字符重新生成 WOFF2；命令需要安装支持 Brotli 的 Python FontTools。新增用户可见文字后应重新运行该命令。
- 回退：正文为 `"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif`；标题为 `"Noto Serif SC", "Songti SC", "STSong", serif`。
