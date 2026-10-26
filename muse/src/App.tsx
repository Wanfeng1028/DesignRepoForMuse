import type { ComponentType } from "react";

type ScreenModule = {
  default: ComponentType;
  meta: { id: string; title: string; source: string };
};

const modules = import.meta.glob<ScreenModule>("./screens/*.tsx", { eager: true });

const ORDER = [
  "welcome-dark",
  "home-light-en",
  "home-light-cn",
  "chat-dark-lisbon-en",
  "chat-dark-lisbon-cn",
  "chat-light-train-en",
  "chat-light-savings-en",
  "chat-dark-kyoto-en",
  "chat-light-router-en",
  "chat-info-sheet",
  "search-drawer-dark",
  "model-picker-a",
  "model-picker-b",
  "pricing-dark",
  "credits-light",
  "suspended-light",
  "agent-team-dark",
  "language-light",
];

const screens = Object.values(modules)
  .map((m) => ({ Component: m.default, meta: m.meta }))
  .sort((a, b) => {
    const ia = ORDER.indexOf(a.meta.id);
    const ib = ORDER.indexOf(b.meta.id);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });

export default function App() {
  return (
    <div style={{ background: "#0B0B0E", minHeight: "100vh", padding: "32px", fontFamily: "-apple-system, sans-serif" }}>
      <h1 style={{ color: "#F5F5F7", fontSize: 28, margin: "0 0 8px 0" }}>Medley 截图 1:1 复原</h1>
      <p style={{ color: "#9A9BA2", fontSize: 14, margin: "0 0 32px 0" }}>
        共 {screens.length} 屏（目标 18 屏）· 每个屏独立渲染，id 形如 screen-welcome-dark
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
        {screens.map(({ Component, meta }) => (
          <section key={meta.id} id={`screen-${meta.id}`} style={{ flexShrink: 0 }}>
            <div style={{ color: "#F5F5F7", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{meta.title}</div>
            <div style={{ color: "#6B6C72", fontSize: 12, marginBottom: 12 }}>{meta.source}</div>
            <Component />
          </section>
        ))}
      </div>
    </div>
  );
}
