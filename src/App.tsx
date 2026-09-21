import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { chapters, media, sources } from "./data";
import type { Chapter, Marker } from "./types/schema";
import { typeLabels, layerLabels, sourceLabels } from "./types/schema";
import {
  ReadingCard,
  SourceLinks,
  HeritagePhoto,
} from "./components/ReadingCard";
import {
  HomeMapPreview,
  InteractiveMap,
  MapSymbol,
  RouteConditions,
} from "./components/Map";
import { InterfaceSounds } from "./components/InterfaceSounds";
function PageEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const chapter = chapters.find((c) => pathname.endsWith(c.id));
    const title = chapter
      ? `${chapter.regionZh} · 第${chapter.numeralZh}回`
      : {
          "/chapters": "六回山川",
          "/about": "关于项目",
          "/sources": "资料来源",
        }[pathname];
    document.title = title
      ? `${title}｜黑神话：悟空文化地图`
      : "黑神话：悟空文化地图";
    if (!hash) window.scrollTo(0, 0);
    else {
      const element = document.getElementById(
        decodeURIComponent(hash.slice(1)),
      );
      if (element instanceof HTMLDetailsElement) element.open = true;
      element?.scrollIntoView({ block: "start" });
    }
  }, [pathname, hash]);
  return null;
}
function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageEffects />
      <a className="skip-link" href="#main-content">
        跳到正文
      </a>
      <header className="site-header">
        <Link className="brand" to="/" data-sound="navigate">
          <img
            src="/art/wukong-header-logo.png"
            width="46"
            height="46"
            alt=""
          />
          <span>
            黑神话：悟空<small>文化地图</small>
          </span>
        </Link>
        <nav aria-label="主导航">
          <NavLink to="/" end data-sound="navigate">
            首页
          </NavLink>
          <NavLink to="/chapters" data-sound="navigate">
            六回山川
          </NavLink>
          <NavLink to="/sources" data-sound="navigate">
            资料来源
          </NavLink>
          <NavLink to="/about" data-sound="navigate">
            关于项目
          </NavLink>
        </nav>
        <div className="header-actions">
          <span className="header-note">循游戏之迹 · 见文化之源</span>
          <InterfaceSounds />
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <span>
          黑神话：悟空文化地图 <span className="footer-dot">·</span>{" "}
          民间文化科普项目
        </span>
        <p>
          非官方作品，与游戏科学无隶属关系。游戏与相关标识权利归各自权利人所有。
        </p>
        <Link to="/sources">每一处关联，都有出处 ↗</Link>
      </footer>
    </>
  );
}
function LayerGuide() {
  return (
    <div className="layer-guide">
      <div>
        <span>壹</span>
        <h3>走进游戏</h3>
        <p>认识一处山川、一位人物、一件器物。</p>
      </div>
      <span className="guide-arrow" aria-hidden="true">
        →
      </span>
      <div>
        <span>贰</span>
        <h3>翻开原著</h3>
        <p>对照《西游记》，看故事如何被重新讲述。</p>
      </div>
      <span className="guide-arrow" aria-hidden="true">
        →
      </span>
      <div>
        <span>叁</span>
        <h3>看见现实</h3>
        <p>循着确切证据，认识真实的文物与遗产。</p>
      </div>
    </div>
  );
}
function ChapterCards() {
  return (
    <div className="chapter-grid">
      {chapters.map((c) => (
        <Link
          className={`chapter-card chapter-${c.order}`}
          to={`/chapter/${c.id}`}
          key={c.id}
          data-sound="navigate"
        >
          <img
            src={media[c.atmosphereMediaId].file}
            alt={media[c.atmosphereMediaId].altZh}
            loading="lazy"
          />
          <div className="chapter-card-top">
            <span>第{c.numeralZh}回</span>
            <small>
              {c.topologyStatus === "unverified" ? "文化选读" : "地图已展开"}
            </small>
          </div>
          <div className="chapter-card-bottom">
            <p>{c.titleZh}</p>
            <h3>{c.regionZh}</h3>
            <span>{c.themeZh}</span>
            <b aria-hidden="true">↗</b>
          </div>
        </Link>
      ))}
    </div>
  );
}
function Home() {
  const featured = chapters[2].markers[0];
  const heritage = featured.realWorld![0];
  return (
    <main id="main-content">
      <section
        className="home-hero"
        style={{ backgroundImage: `url(${media["atmosphere-01"].file})` }}
      >
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="red-mark" /> 一部游戏 · 一部古典 · 万里山川
          </p>
          <h1>
            循西游之迹
            <br />见<span>众生</span>之源
          </h1>
          <p className="hero-intro">
            从黑风山的一场火，走向书页里的西游。
            <br />
            在一幅文化地图里，读懂游戏、原著与真实遗产。
          </p>
          <div className="hero-actions">
            <Link
              className="button primary"
              to="/chapter/chapter-01"
              data-sound="navigate"
            >
              展开黑风山 <span>↗</span>
            </Link>
            <Link className="text-link" to="/chapters" data-sound="navigate">
              览六回山川 <span>→</span>
            </Link>
          </div>
          <div className="hero-facts">
            <span>
              <strong>六</strong>回山川
            </span>
            <span>
              <strong>三</strong>重阅读
            </span>
            <span>
              <strong>一</strong>路溯源
            </span>
          </div>
        </div>
        <HomeMapPreview />
        <div className="hero-sidewriting" aria-hidden="true">
          山川有形 · 文化有源
        </div>
        <span className="art-caption">原创意境插画 · 非游戏实机</span>
      </section>
      <div className="page-container">
        <section className="intro-section">
          <div className="section-heading">
            <p className="eyebrow">读图有道</p>
            <h2>不止看见，也能读懂。</h2>
            <p>没有玩过游戏，也可以从一个名字开始。</p>
          </div>
          <LayerGuide />
        </section>
        <section className="chapters-section">
          <div className="section-heading row">
            <div>
              <p className="eyebrow">六回山川 · 由此入卷</p>
              <h2>一回一境，一境一问。</h2>
            </div>
            <p>
              六回均可拖拽探索
              <br />
              左右滑动切换山川
            </p>
          </div>
          <ChapterCards />
        </section>
        <section className="heritage-feature">
          <HeritagePhoto id={heritage.mediaIds![0]} compact />
          <div>
            <p className="eyebrow">第三回文化选读 · 从游戏走向实地</p>
            <h2>
              {featured.nameZh}，
              <br />
              不只在游戏里。
            </h2>
            <p>
              {featured.summaryZh} {heritage.descriptionZh}
            </p>
            <div className="badges">
              <span className="badge">现实文化对照</span>
              <span className="badge">政府公开资料</span>
            </div>
            <Link
              className="text-link"
              to="/chapter/chapter-03#kang-jin-loong"
              data-sound="navigate"
            >
              阅读{featured.nameZh}的文化联系 <span>→</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
function ChaptersPage() {
  return (
    <main id="main-content" className="page-container standalone">
      <p className="eyebrow">展卷 · 六回山川</p>
      <h1>选择一回，循迹而行。</h1>
      <p className="page-lede">
        六回均已展开路线示意图。可拖拽、缩放地图，从一个地点、人物或器物开始阅读。
      </p>
      <ChapterCards />
      <LayerGuide />
    </main>
  );
}
function Drawer({
  marker,
  onClose,
}: {
  marker: Marker | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!marker) return;
    const previous = document.activeElement as HTMLElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    dialog.current?.scrollTo(0, 0);
    return () => {
      dialog.current?.close();
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, [marker]);
  return (
    <dialog
      ref={dialog}
      className="info-drawer"
      aria-label={marker ? `${marker.nameZh}文化阅读` : "文化阅读"}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="drawer-inner">
        <div className="drawer-toolbar">
          <span>循迹 · 阅读</span>
          <button
            onClick={onClose}
            aria-label="关闭文化阅读"
            data-sound="close"
          >
            关闭 ×
          </button>
        </div>
        {marker && <ReadingCard marker={marker} />}
      </div>
    </dialog>
  );
}
const filters = [
  ["all", "全部"],
  ["location", "地点"],
  ["people", "人物与妖王"],
  ["item", "器物"],
  ["architecture", "建筑"],
  ["story", "故事"],
];
function ChapterRail({ chapter }: { chapter: Chapter }) {
  const rail = useRef<HTMLDivElement>(null);
  const previous = chapters[chapter.order - 2];
  const next = chapters[chapter.order];
  useEffect(() => {
    rail.current
      ?.querySelector<HTMLAnchorElement>("a.active")
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [chapter.id]);
  return (
    <div className="chapter-rail-shell">
      {previous ? (
        <Link
          className="chapter-rail-arrow"
          to={`/chapter/${previous.id}`}
          state={{ chapterDirection: "previous" }}
          aria-label={`上一回：${previous.regionZh}`}
          data-sound="navigate"
        >
          ‹
        </Link>
      ) : (
        <span className="chapter-rail-arrow disabled" aria-hidden="true">
          ‹
        </span>
      )}
      <div className="chapter-tabs" aria-label="章节选择" ref={rail}>
        {chapters.map((c) => (
          <NavLink
            key={c.id}
            to={`/chapter/${c.id}`}
            data-sound="navigate"
            state={{
              chapterDirection:
                c.order === chapter.order
                  ? "current"
                  : c.order > chapter.order
                    ? "next"
                    : "previous",
            }}
          >
            <span>第{c.numeralZh}回</span>
            {c.regionZh}
          </NavLink>
        ))}
      </div>
      {next ? (
        <Link
          className="chapter-rail-arrow"
          to={`/chapter/${next.id}`}
          state={{ chapterDirection: "next" }}
          aria-label={`下一回：${next.regionZh}`}
          data-sound="navigate"
        >
          ›
        </Link>
      ) : (
        <span className="chapter-rail-arrow disabled" aria-hidden="true">
          ›
        </span>
      )}
    </div>
  );
}
function ChapterPage({ chapter }: { chapter: Chapter }) {
  const location = useLocation();
  const [category, setCategory] = useState("all");
  const [layer, setLayer] = useState("all");
  const [selected, setSelected] = useState<Marker | null>(null);
  const previous = chapters[chapter.order - 2];
  const next = chapters[chapter.order];
  const direction =
    (location.state as { chapterDirection?: string } | null)
      ?.chapterDirection ?? "current";
  const visible = chapter.markers.filter(
    (m) =>
      (category === "all" ||
        (category === "people"
          ? ["boss", "character"].includes(m.type)
          : m.type === category)) &&
      (layer === "all" || m.layers.includes(layer as keyof typeof layerLabels)),
  );
  const mapped = chapter.topologyStatus !== "unverified";
  return (
    <main
      id="main-content"
      className={`chapter-page chapter-motion-${direction}`}
    >
      <ChapterRail chapter={chapter} />
      <div className="chapter-heading">
        <div>
          <p className="eyebrow">
            第{chapter.numeralZh}回 <span> / </span> {chapter.titleZh}
          </p>
          <h1>
            {chapter.regionZh}
            <span>{chapter.themeZh}</span>
          </h1>
        </div>
        <div className="chapter-heading-actions">
          <nav className="chapter-stepper" aria-label="切换前后回目">
            {previous ? (
              <Link
                to={`/chapter/${previous.id}`}
                state={{ chapterDirection: "previous" }}
                aria-label={`上一回：${previous.regionZh}`}
                data-sound="navigate"
              >
                ←
              </Link>
            ) : (
              <span aria-hidden="true">—</span>
            )}
            <small>{chapter.order} / 6</small>
            {next ? (
              <Link
                to={`/chapter/${next.id}`}
                state={{ chapterDirection: "next" }}
                aria-label={`下一回：${next.regionZh}`}
                data-sound="navigate"
              >
                →
              </Link>
            ) : (
              <span aria-hidden="true">—</span>
            )}
          </nav>
          <Link to="/chapters" className="text-link" data-sound="navigate">
            返回六回山川 ↗
          </Link>
        </div>
      </div>
      <div className={mapped ? "exploration-layout" : "overview-layout"}>
        <aside className="explore-sidebar">
          <div className="sidebar-intro">
            <span className="eyebrow">
              {mapped ? "在此入卷" : "本回文化选读"}
            </span>
            <h2>
              {mapped ? `沿着线索，读懂${chapter.regionZh}` : "先识其意，再入山川"}
            </h2>
            <p>{chapter.readingGuideZh}</p>
          </div>
          <fieldset className="filter-group">
            <legend>看什么</legend>
            <div className="filter-buttons">
              {filters.map(([id, label]) => (
                <button
                  key={id}
                  aria-pressed={category === id}
                  onClick={() => setCategory(id)}
                  data-sound="select"
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="layer-select">
            读哪一层
            <select
              value={layer}
              onChange={(e) => setLayer(e.target.value)}
              data-sound="select"
            >
              <option value="all">全部知识层</option>
              {Object.entries(layerLabels).map(([key, label]) => (
                <option value={key} key={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <div className="result-count" aria-live="polite">
            {visible.length} 条文化线索
            {mapped
              ? ` · ${visible.filter((m) => m.position).length} 个地图标记`
              : ""}
          </div>
          <div className="marker-list">
            {visible.map((m) => (
              <a
                key={m.id}
                href={`#${m.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelected(m);
                }}
                data-sound="marker"
              >
                <MapSymbol type={m.type} />
                <span>
                  {m.nameZh}
                  <small>
                    {typeLabels[m.type]}
                    {!m.position ? " · 文化选读" : ""}
                  </small>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          {!visible.length && (
            <div className="empty-state">
              <p>此分类暂无可显示的标记</p>
              <button
                data-sound="select"
                onClick={() => {
                  setCategory("all");
                  setLayer("all");
                }}
              >
                查看全部线索
              </button>
            </div>
          )}
        </aside>
        <div className="map-column">
          {mapped ? (
            <>
              <InteractiveMap
                chapter={chapter}
                visible={visible}
                onSelect={setSelected}
              />
              <RouteConditions chapter={chapter} />
            </>
          ) : (
            <div
              className="chapter-overview"
              style={{
                backgroundImage: `url(${media[chapter.atmosphereMediaId].file})`,
              }}
            >
              <p className="eyebrow">
                第{chapter.numeralZh}回 · {chapter.titleZh}
              </p>
              <h2>{chapter.regionZh}</h2>
              <p>{chapter.overviewZh}</p>
              <span>{chapter.mapNoticeZh}</span>
            </div>
          )}
          <div className="map-reading-hint">
            <span>阅</span>
            <p>
              {mapped
                ? "点选图上的印记，打开一段故事。"
                : "从左侧或下方选一张阅读卡，走进这一回。"}
              <br />
              <small>游戏中的呈现 → 原著出处与改编 → 有据可查的现实文化</small>
            </p>
            <a href="#chapter-reading" data-sound="open">
              顺序阅读 ↓
            </a>
          </div>
        </div>
      </div>
      <section className="chapter-reading page-container" id="chapter-reading">
        <div className="section-heading">
          <p className="eyebrow">把线索连成故事</p>
          <h2>本回阅读手记</h2>
          <p>{chapter.overviewZh}</p>
        </div>
        <div className="reading-index">
          {chapter.markers.map((m) => (
            <details key={m.id} id={m.id}>
              <summary data-sound="open">
                <span className="index-type">{typeLabels[m.type]}</span>
                <strong>{m.nameZh}</strong>
                <span className="index-summary">{m.summaryZh}</span>
                <span aria-hidden="true">＋</span>
              </summary>
              <ReadingCard marker={m} />
            </details>
          ))}
        </div>
        <SourceLinks ids={chapter.sources} />
      </section>
      <nav className="next-chapter page-container" aria-label="前后回目">
        {chapter.order > 1 ? (
          <Link
            to={`/chapter/${chapters[chapter.order - 2].id}`}
            state={{ chapterDirection: "previous" }}
            data-sound="navigate"
          >
            ← 上一回 · {chapters[chapter.order - 2].regionZh}
          </Link>
        ) : (
          <Link to="/" data-sound="navigate">
            ← 回到首页
          </Link>
        )}
        {chapter.order < 6 && (
          <Link
            to={`/chapter/${chapters[chapter.order].id}`}
            state={{ chapterDirection: "next" }}
            data-sound="navigate"
          >
            下一回 · {chapters[chapter.order].regionZh} →
          </Link>
        )}
      </nav>
      <Drawer marker={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
function ChapterRoute() {
  const { chapterId } = useParams();
  const chapter = chapters.find((c) => c.id === chapterId);
  return chapter ? (
    <ChapterPage key={chapter.id} chapter={chapter} />
  ) : (
    <NotFound />
  );
}
function About() {
  return (
    <main id="main-content" className="prose-page">
      <p className="eyebrow">关于这幅地图</p>
      <h1>
        让每一次探索，
        <br />
        都有文化的回响。
      </h1>
      <p className="page-lede">
        黑神话：悟空文化地图，是一个面向普通读者的中文文化科普项目。你不必熟悉游戏操作，也不必先读完百回小说。
      </p>
      <LayerGuide />
      <h2>三个层次，四种关联</h2>
      <p>
        游戏中的形象与故事，首先是游戏创作。《西游记》原文回答“书里怎样写”；真实文物与遗产，则需要自己的证据。
      </p>
      <ul>
        <li>
          <strong>原著直接出现：</strong>名字、人物或器物在指定回目中可查。
        </li>
        <li>
          <strong>原著元素重组：</strong>游戏把文学材料重新安排或续写。
        </li>
        <li>
          <strong>现实文化对照：</strong>
          公开资料支持某个游戏形象与特定文物的联系。
        </li>
        <li>
          <strong>开发者确认采用：</strong>
          只有开发者材料明确支持，才使用这个标签。
        </li>
      </ul>
      <h2>这幅图怎样阅读</h2>
      <p>
        六回均使用路线示意图，呈现主要区域的先后与部分可选关联。它们不是地理比例图，也不是官方地图；可在图中拖拽、缩放并点选文化印记。
      </p>
      <p>
        文化卡片中的“影神图”指游戏内介绍角色故事的资料系统。即使来自影神图，也应归于游戏设定，不能自动当作小说原文。
      </p>
      <h2>文字先行，图片有据</h2>
      <p>
        山形与印记是项目原创装饰，不充当游戏实机或真实建筑的图像证据。未经授权的游戏截图不进入网站。纪实照片保留作者、出处与许可；没有核实的实地关联就不展示。
      </p>
      <h2>给第一次读《西游记》的你</h2>
      <p>
        先选一个熟悉的名字，读游戏简介；再比较原著段落，留意差异；最后打开来源。每张卡的层次和引用都保留在页面正文中，关闭脚本也能阅读。
      </p>
      <p>
        这是民间教育与文化探索项目，与游戏科学无隶属关系。游戏及相关标识的权利归各自权利人所有。
      </p>
      <Link
        className="button primary"
        to="/chapter/chapter-01"
        data-sound="navigate"
      >
        从黑风山开始 ↗
      </Link>
    </main>
  );
}
function SourcesPage() {
  return (
    <main id="main-content" className="prose-page sources-page">
      <p className="eyebrow">循迹有据</p>
      <h1>
        每一处关联，
        <br />
        都能回到出处。
      </h1>
      <p className="page-lede">
        原著、游戏资料与文物报道各自证明不同的事实。阅读卡中的引用指向这里同一份来源索引。
      </p>
      <h2>文字与研究资料</h2>
      <div className="source-index">
        {Object.entries(sources).map(([id, s]) => (
          <article key={id} id={`source-${id}`}>
            <span className="badge">{sourceLabels[s.type]}</span>
            <h3>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.titleZh} ↗
              </a>
            </h3>
            <p>{s.scopeZh}</p>
            <small>
              {s.publisherZh} · 来源编号 {id}
            </small>
          </article>
        ))}
      </div>
      <h2>图片与原创素材</h2>
      {Object.entries(media).map(([id, item]) => (
        <article className="media-credit" key={id}>
          <h3>{item.titleZh}</h3>
          <p>
            {item.usageNoteZh} {item.evidenceScopeZh}
          </p>
          <p>
            创作者：{item.creator} ·{" "}
            {item.documentary ? "纪实照片" : "原创非纪实矢量作品"} ·{" "}
            {item.license === "CC BY-SA 4.0"
              ? "署名—相同方式共享 4.0"
              : "署名 4.0"}
          </p>
          <p>{item.modificationNoteZh}</p>
          <div className="credit-links">
            {item.sourceUrl && (
              <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                图片原始来源 ↗
              </a>
            )}
            {item.licenseUrl && (
              <a href={item.licenseUrl} target="_blank" rel="noreferrer">
                阅读许可 ↗
              </a>
            )}
          </div>
        </article>
      ))}
      <h2>字体</h2>
      <p>
        当前使用设备自带的宋体与清晰黑体回退，不下载或分发系统字体。已选定的思源与诺托中文字体子集计划记录在项目素材文档中。
      </p>
    </main>
  );
}
function NotFound() {
  return (
    <main id="main-content" className="prose-page not-found">
      <p className="eyebrow">此处尚未入卷</p>
      <h1>没有找到这一页。</h1>
      <p>回到六回山川，重新选择一处文化入口。</p>
      <Link className="button primary" to="/chapters" data-sound="navigate">
        查看六回山川 →
      </Link>
    </main>
  );
}
export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapters" element={<ChaptersPage />} />
        <Route path="/chapter/:chapterId" element={<ChapterRoute />} />
        <Route path="/about" element={<About />} />
        <Route path="/sources" element={<SourcesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppShell>
  );
}
