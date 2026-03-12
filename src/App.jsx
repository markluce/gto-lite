import { useState, useEffect } from "react";
import {
  sections,
  introContent,
  tableSetup,
  preflopRanges,
  gtoTerms,
  classicExample,
  philosophy,
} from "./data/gtoData";
import PreflopTrainer from "./components/PreflopTrainer";

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("gto-theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem("gto-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}

function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("intro");
  const [expandedTerm, setExpandedTerm] = useState(null);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="max-w-[1100px] mx-auto">
      {/* Header */}
      <header
        className="relative px-8 py-14 text-center border-b border-border transition-colors duration-300"
        style={{
          background: `linear-gradient(135deg, var(--t-header-from), var(--t-header-via), var(--t-header-to))`,
        }}
      >
        <button
          onClick={toggleTheme}
          className="absolute top-5 right-5 w-11 h-11 rounded-full bg-surface/60 backdrop-blur-sm border border-border text-xl cursor-pointer transition-all duration-300 hover:bg-surface-hover hover:scale-110 flex items-center justify-center"
          title={theme === "dark" ? "切換到淺色模式" : "切換到深色模式"}
        >
          {theme === "dark" ? "\u2600\uFE0F" : "\uD83C\uDF19"}
        </button>

        <p className="text-accent text-sm font-mono tracking-widest mb-2">
          GAME THEORY OPTIMAL
        </p>
        <h1 className="text-5xl font-bold text-text mb-3">
          GTO{" "}
          <span className="bg-gradient-to-r from-accent to-poker-blue bg-clip-text text-transparent">
            Lite
          </span>
        </h1>
        <p className="text-text-secondary text-lg mb-4">
          GTO 現金桌策略入門 — 繁體中文互動指南
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <span className="bg-accent/15 text-accent-light px-4 py-1.5 rounded-full text-sm border border-accent/30">
            6-Max NLH
          </span>
          <span className="bg-accent/15 text-accent-light px-4 py-1.5 rounded-full text-sm border border-accent/30">
            100BB Deep
          </span>
          <span className="bg-accent/15 text-accent-light px-4 py-1.5 rounded-full text-sm border border-accent/30">
            {gtoTerms.length} 個核心術語
          </span>
        </div>
      </header>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl px-4 py-3 border-b border-border transition-colors duration-300">
        <div className="flex gap-2 overflow-x-auto pb-1 justify-center flex-wrap">
          {sections.map((s) => (
            <button
              key={s.id}
              className={`px-4 py-2 border rounded-lg text-sm whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeSection === s.id
                  ? "bg-accent border-accent font-semibold shadow-lg shadow-accent/20"
                  : "bg-surface border-border text-text-secondary hover:bg-surface-hover hover:text-text"
              }`}
              style={
                activeSection === s.id
                  ? { color: "var(--t-active-tab-text)" }
                  : {}
              }
              onClick={() => scrollToSection(s.id)}
            >
              <span>{s.icon}</span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="p-6 flex flex-col gap-12">
        {/* Intro */}
        <section id="intro" className="scroll-mt-20">
          <SectionHeader icon="🎯" title="GTO 是什麼？" color="#22c55e" />
          <div
            className="rounded-2xl px-8 py-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, #22c55e 6%, var(--t-surface)), color-mix(in srgb, #3498db 6%, var(--t-surface)))",
              border:
                "1px solid color-mix(in srgb, #22c55e 20%, var(--t-border))",
            }}
          >
            <p className="text-sm text-accent font-mono tracking-wider mb-4">
              {introContent.fullName}
            </p>
            <blockquote className="text-xl text-text font-medium leading-relaxed mb-4 italic max-w-[700px] mx-auto">
              「{introContent.question}」
            </blockquote>
            <p className="text-text-secondary text-base leading-relaxed max-w-[600px] mx-auto">
              {introContent.answer}
            </p>
          </div>
        </section>

        {/* Table Setup */}
        <section id="setup" className="scroll-mt-20">
          <SectionHeader icon="🪑" title="標準牌桌設定" color="#3498db" />

          <div className="rounded-xl border border-border bg-surface p-6 mb-4">
            <h3 className="text-lg font-bold text-text mb-4 text-center">
              {tableSetup.format}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {tableSetup.conditions.map((c, i) => (
                <div
                  key={i}
                  className="rounded-lg px-4 py-3 border border-border"
                  style={{ backgroundColor: "var(--t-code-bg)" }}
                >
                  <div className="text-xs text-text-secondary mb-1">
                    {c.label}
                  </div>
                  <div className="text-sm font-semibold text-accent-light">
                    {c.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Position Circle */}
            <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4 text-center">
              位置順序
            </h4>
            <div className="flex justify-center gap-2 flex-wrap mb-4">
              {tableSetup.positions.map((p) => (
                <div key={p.order} className="flex flex-col items-center gap-1">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold border-2"
                    style={{
                      backgroundColor: `${p.color}20`,
                      borderColor: p.color,
                      color: p.color,
                    }}
                  >
                    {p.name}
                  </div>
                  <span className="text-[0.65rem] text-text-secondary">
                    {p.full}
                  </span>
                </div>
              ))}
            </div>

            <TipBox text={tableSetup.reason} />
          </div>
        </section>

        {/* Preflop Ranges */}
        <section id="preflop" className="scroll-mt-20">
          <SectionHeader icon="🃏" title="Preflop 開局範圍" color="#e74c3c" />

          {/* Interactive Hand Matrix */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
              互動式開局表 — 點擊位置查看 Range，點擊手牌查看詳情
            </h3>
            <PreflopTrainer />
          </div>

          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
            各位置開局概覽
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {preflopRanges.map((r, i) => (
              <div
                key={i}
                className="rounded-xl border bg-surface p-5"
                style={{ borderColor: `${r.color}40` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-lg font-bold px-3 py-1 rounded-lg"
                    style={{
                      backgroundColor: `${r.color}20`,
                      color: r.color,
                    }}
                  >
                    {r.position}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: r.color }}
                  >
                    {r.percentage}
                  </span>
                </div>
                <p className="text-text-secondary text-sm mb-3">
                  {r.description}
                </p>
                {r.hands && (
                  <div className="flex flex-wrap gap-1.5">
                    {r.hands.map((h, j) => (
                      <code
                        key={j}
                        className="font-mono text-xs px-2 py-1 rounded border"
                        style={{
                          backgroundColor: "var(--t-code-bg)",
                          borderColor: "var(--t-border)",
                          color: "var(--t-accent-light)",
                        }}
                      >
                        {h}
                      </code>
                    ))}
                  </div>
                )}
                {r.strategies && (
                  <div className="flex flex-col gap-2">
                    {r.strategies.map((s, j) => (
                      <div
                        key={j}
                        className="rounded-lg px-4 py-2.5 border border-border"
                        style={{ backgroundColor: "var(--t-code-bg)" }}
                      >
                        <span className="text-sm font-semibold text-text">
                          {s.name}
                        </span>
                        <p className="text-xs text-text-secondary mt-0.5">
                          {s.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* GTO Terms */}
        <section id="terms" className="scroll-mt-20">
          <SectionHeader icon="📖" title="GTO 核心術語" color="#f39c12" />
          <div className="flex flex-col gap-3">
            {gtoTerms.map((t, i) => {
              const isOpen = expandedTerm === i;
              return (
                <div
                  key={i}
                  className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                    isOpen ? "shadow-lg" : "border-border"
                  }`}
                  style={
                    isOpen
                      ? {
                          borderColor: t.color,
                          boxShadow: `0 0 20px ${t.color}20`,
                        }
                      : {}
                  }
                >
                  <button
                    className="w-full flex items-center gap-4 px-5 py-4 bg-surface border-none text-text cursor-pointer text-left transition-colors duration-200 hover:bg-surface-hover"
                    onClick={() => setExpandedTerm(isOpen ? null : i)}
                  >
                    <span
                      className="text-lg font-bold font-mono px-3 py-1 rounded-lg shrink-0"
                      style={{
                        backgroundColor: `${t.color}20`,
                        color: t.color,
                      }}
                    >
                      {t.term}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-text-secondary">
                        {t.fullName}
                      </span>
                    </div>
                    <span className="text-xs text-text-secondary shrink-0">
                      {isOpen ? "▼" : "▶"}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      className="px-5 pb-5 pt-2"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${t.color} 3%, var(--t-bg))`,
                      }}
                    >
                      <p className="text-text text-sm leading-relaxed mb-3">
                        {t.definition}
                      </p>
                      {t.formula && (
                        <div
                          className="rounded-lg px-4 py-2.5 mb-3 font-mono text-sm"
                          style={{
                            backgroundColor: "var(--t-code-bg)",
                            border: "1px solid var(--t-border)",
                            color: "var(--t-accent-light)",
                          }}
                        >
                          {t.formula}
                        </div>
                      )}
                      <div
                        className="flex items-start gap-2 rounded-lg px-4 py-3"
                        style={{
                          backgroundColor: "var(--t-tip-bg)",
                          border: "1px solid var(--t-tip-border)",
                        }}
                      >
                        <span className="text-sm shrink-0 mt-px">💡</span>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {t.example}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Classic Example */}
        <section id="example" className="scroll-mt-20">
          <SectionHeader icon="♠️" title="經典牌例分析" color="#9b59b6" />
          <div className="rounded-xl border border-border bg-surface overflow-hidden">
            {/* Setup */}
            <div className="px-6 py-4 border-b border-border">
              <div className="flex flex-wrap gap-3 justify-center">
                <Tag label="籌碼" value={classicExample.setup.stacks} />
                <Tag label="位置" value={classicExample.setup.positions} />
                <Tag label="動作" value={classicExample.setup.action} />
                <Tag label="底池" value={classicExample.setup.pot} />
              </div>
            </div>

            {/* Flop */}
            <div className="px-6 py-6 text-center border-b border-border">
              <div className="text-xs text-text-secondary uppercase tracking-wider mb-3">
                Flop
              </div>
              <div className="flex justify-center gap-3">
                {classicExample.flop.cards.map((card, i) => (
                  <div
                    key={i}
                    className="w-16 h-22 rounded-xl border-2 border-border bg-surface-hover flex items-center justify-center text-2xl font-bold shadow-lg"
                    style={{
                      color: card.includes("♣") || card.includes("♠")
                        ? "var(--t-text)"
                        : card.includes("♦")
                        ? "#3498db"
                        : "#e74c3c",
                    }}
                  >
                    {card}
                  </div>
                ))}
              </div>
              <p className="text-text-secondary text-sm mt-2">
                {classicExample.flop.description}
              </p>
            </div>

            {/* Strategy */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="px-6 py-5 border-b md:border-b-0 md:border-r border-border">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-bold px-3 py-1 rounded-lg bg-poker-green/20 text-poker-green">
                    BTN
                  </span>
                  <span className="text-xs text-text-secondary">進攻方</span>
                </div>
                <p className="text-text font-medium text-sm mb-1">
                  {classicExample.strategy.btn.action}
                </p>
                <p className="text-text-secondary text-xs mb-2">
                  原因：{classicExample.strategy.btn.reason}
                </p>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {classicExample.strategy.btn.detail}
                </p>
              </div>
              <div className="px-6 py-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-bold px-3 py-1 rounded-lg bg-poker-purple/20 text-poker-purple">
                    BB
                  </span>
                  <span className="text-xs text-text-secondary">防守方</span>
                </div>
                <ul className="flex flex-col gap-1 mb-2">
                  {classicExample.strategy.bb.actions.map((a, i) => (
                    <li key={i} className="text-text text-sm flex items-center gap-2">
                      <span className="text-accent">▸</span> {a}
                    </li>
                  ))}
                </ul>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {classicExample.strategy.bb.reason}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section id="philosophy" className="scroll-mt-20">
          <SectionHeader icon="🧠" title="GTO 核心哲學" color="#27ae60" />

          {/* Core Statement */}
          <div
            className="rounded-2xl px-8 py-8 text-center mb-6"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, #27ae60 8%, var(--t-surface)), color-mix(in srgb, #22c55e 5%, var(--t-surface)))",
              border:
                "1px solid color-mix(in srgb, #27ae60 25%, var(--t-border))",
            }}
          >
            <p className="text-2xl font-bold text-text mb-2">
              「{philosophy.core}」
            </p>
            <p className="text-text-secondary text-base">
              {philosophy.meaning}
            </p>
          </div>

          {/* Paradox */}
          <div className="rounded-xl border border-border bg-surface p-6 mb-6">
            <h4 className="text-poker-gold font-semibold text-sm uppercase tracking-wider mb-3">
              {philosophy.paradox.title}
            </h4>
            <p className="text-text text-lg font-medium mb-2">
              {philosophy.paradox.content}
            </p>
            <p className="text-text-secondary text-sm mb-4">
              {philosophy.paradox.detail}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {philosophy.exploits.map((e, i) => (
                <div
                  key={i}
                  className="rounded-lg px-4 py-3 border border-border flex items-center gap-3"
                  style={{ backgroundColor: "var(--t-code-bg)" }}
                >
                  <span className="text-text-secondary text-sm">
                    {e.condition}
                  </span>
                  <span className="text-accent-light">→</span>
                  <span className="text-accent-light font-semibold text-sm">
                    {e.action}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                className="rounded-lg px-4 py-3 text-center"
                style={{
                  backgroundColor: "color-mix(in srgb, #27ae60 8%, var(--t-surface))",
                  border: "1px solid color-mix(in srgb, #27ae60 20%, var(--t-border))",
                }}
              >
                <p className="text-poker-green font-bold text-lg">
                  {philosophy.metaphor.gto}
                </p>
              </div>
              <div
                className="rounded-lg px-4 py-3 text-center"
                style={{
                  backgroundColor: "color-mix(in srgb, #f39c12 8%, var(--t-surface))",
                  border: "1px solid color-mix(in srgb, #f39c12 20%, var(--t-border))",
                }}
              >
                <p className="text-poker-gold font-bold text-lg">
                  {philosophy.metaphor.exploit}
                </p>
              </div>
            </div>
          </div>

          {/* Deeper Topics */}
          <div
            className="rounded-xl px-6 py-5"
            style={{
              backgroundColor: "var(--t-tip-bg)",
              border: "1px solid var(--t-tip-border)",
            }}
          >
            <h4 className="text-poker-gold font-semibold text-sm uppercase tracking-wider mb-3">
              還可以往下挖的迷人世界
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {philosophy.deeper.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-text text-sm">
                  <span className="text-poker-gold">✦</span> {d}
                </div>
              ))}
            </div>
            <p className="text-text-secondary text-sm mt-4 text-center italic">
              {philosophy.closing}
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center px-8 pt-10 pb-12 border-t border-border mt-12">
        <p className="text-lg font-medium text-text mb-2">
          由 Mark Luce 與 Claude (Anthropic) 攜手合作打造
        </p>
        <a
          href="mailto:markluceai@gmail.com"
          className="text-accent hover:text-accent-light transition-colors text-base no-underline"
        >
          markluceai@gmail.com
        </a>
        <p className="text-text-secondary/60 text-xs mt-3">
          馬克路思科技有限公司 | 統一編號 60670979 |
          臺中市中區大誠里臺灣大道一段501號10樓之1
        </p>
        <p className="text-text-secondary text-sm mt-4">
          GTO Lite — 撲克策略入門繁體中文版
        </p>
      </footer>
    </div>
  );
}

function SectionHeader({ icon, title, color }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-2xl">{icon}</span>
      <h2 className="text-2xl font-bold" style={{ color }}>
        {title}
      </h2>
    </div>
  );
}

function TipBox({ text }) {
  return (
    <div
      className="flex items-center gap-2 rounded-lg px-4 py-3 justify-center"
      style={{
        backgroundColor: "var(--t-tip-bg)",
        border: "1px solid var(--t-tip-border)",
      }}
    >
      <span className="text-sm">💡</span>
      <p className="text-text-secondary text-sm font-medium">{text}</p>
    </div>
  );
}

function Tag({ label, value }) {
  return (
    <div
      className="rounded-lg px-3 py-2 border border-border text-center"
      style={{ backgroundColor: "var(--t-code-bg)" }}
    >
      <div className="text-[0.65rem] text-text-secondary">{label}</div>
      <div className="text-sm font-semibold text-accent-light">{value}</div>
    </div>
  );
}

export default App;
