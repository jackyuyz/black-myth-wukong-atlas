# Design QA — expanded knowledge reading window

- Source visual truth: `/var/folders/gg/m56sp7p91czcgcqrkcgbd5800000gn/T/TemporaryItems/NSIRD_screencaptureui_DWWBR3/截屏2026-09-21 02.44.05.png`
- Source pixels: 1631 × 1261
- Implementation: `http://127.0.0.1:4175/chapter/chapter-01`
- Implementation capture: Codex in-app browser capture displayed inline during this task; the browser API does not expose a persistent screenshot file path.
- Comparison viewport: 1631 × 1261 CSS px, device pixel ratio 1
- State: Chinese Chapter One, Guangzhi reading panel open; collapsed baseline and expanded reading-window states tested
- Density normalization: source and implementation compared at the same 1631 × 1261 pixel/CSS viewport

## Full-view comparison evidence

The source capture and the matching collapsed implementation capture were emitted together in one browser comparison step. The right-side panel retains the source composition: dimmed map backdrop, dark green reading surface, sticky top rule, bone-coloured typography, gold accents, quotation block, section hierarchy, and documentary image card. The only intentional addition is the “放大阅读” control beside “关闭”.

The expanded state was then captured at the same viewport. It uses a centered 1120 px reading window with a 24 px viewport margin, preserves the same visual tokens, keeps the reading column at 920 px, and enlarges the documentary image without stretching or cropping it.

## Focused region comparison evidence

- Toolbar: the new action uses the existing bordered-button style, remains visually subordinate to the title, and changes to “缩回侧栏” in the expanded state.
- Reading header and quotation: font family, weights, spacing, gold border, and contrast remain consistent with the source panel.
- Game image card: the original 16:9 crop, attribution, licence marker, and caption remain intact at both sizes.
- Small viewport: at 720 × 900, the dialog occupies the full viewport and the redundant size toggle is hidden.

## Required fidelity surfaces

- Fonts and typography: Passed. Existing serif/sans fallbacks, hierarchy, line height, wrapping, and optical weights are unchanged; the expanded column remains narrow enough for comfortable reading.
- Spacing and layout rhythm: Passed. The collapsed panel preserves its existing layout. The expanded window uses balanced outer margins, a centered content column, and the same vertical rhythm.
- Colors and visual tokens: Passed. Existing `--line`, `--gold`, soot-black and dark-green surfaces are reused; focus styles remain visible.
- Image quality and asset fidelity: Passed. No assets were replaced or regenerated. The licensed source image keeps its original crop and sharpness.
- Copy and content: Passed. Chinese and English action labels are complete and no reading content changes between modes.

## Interaction and accessibility checks

- Expand and collapse work from the sticky toolbar.
- The same dialog and reading-card instance is retained, so scroll position remains unchanged when switching modes (verified at `scrollTop: 672`).
- `Escape` closes the modal and returns focus to the originating map marker.
- Native modal focus containment and backdrop-click close behavior remain in place.
- Mobile uses the existing full-screen reader and hides the redundant expand control.
- English labels were verified: “Enlarge reading” and “Return to panel”.
- Browser console: no warnings or errors.

## Findings

No actionable P0, P1, or P2 issues remain. The source does not depict an expanded state; the new centered window is an intentional extension of the existing visual system rather than a literal source-state match.

## Comparison history

- Initial implementation: expanded window rendered centered with the intended column width; collapsed layout matched the supplied panel reference apart from the intentional new control.
- Accessibility refinement: removed toggle-button pressed semantics that exposed the control as a checkbox in the accessibility tree; it now remains a normal button with a state-specific accessible label.
- Post-fix evidence: Chinese and English controls expose normal button roles, the expanded and collapsed screenshots remain visually unchanged, and keyboard focus restoration still passes.

## Follow-up polish

No blocking polish items. A future optional enhancement could remember the reader's preferred panel size across visits, but persistence was not part of this request.

---

## Previous QA record — chapter navigation alignment

- Source visual truth: `/var/folders/gg/m56sp7p91czcgcqrkcgbd5800000gn/T/codex-clipboard-45a5dc18-c50e-47d5-bfc8-d7c17328bd34.png`
- Implementation: `http://127.0.0.1:4173/chapter/chapter-01`
- Implementation screenshot: browser-rendered inline capture of the top 279 px
- Viewport and density: source 1652 × 279 px; implementation clip 1652 × 279 px from a 1652 × 900 CSS px viewport; device pixel ratio 1
- State: Chinese Chapter One page, no drawer open, first chapter active

The supplied reference was a focused top-of-page crop. The implementation was captured at the same width and crop height. The chapter rail's content viewport ran from x = 48 to x = 1589; its tabs ran from x = 83.5 to x = 1553.5, producing equal 35.5 px insets. At 1200 px wide the rail overflowed normally, Chapter Six remained reachable, and the first tab remained reachable at scroll position zero.

The original P2 finding was surplus horizontal space after Chapter Six, making the group read as left-heavy. Flexible spacer tracks before and after the links fixed the imbalance while collapsing to zero during overflow. Fonts, colors, imagery, copy, navigation, console output, validation, typecheck, tests, build and prerender all passed. Previous final result: passed.

final result: passed
