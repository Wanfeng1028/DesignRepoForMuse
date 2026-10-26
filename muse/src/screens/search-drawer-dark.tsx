// codegen: spark-x2.6 draft, hand-adapted to shared chrome/tokens API
import { Phone } from "../components/Phone";
import { tokens } from "../tokens";
import { Icon } from "../components/chrome";

export const meta = { id: "search-drawer-dark", title: "Search drawer (dark)", source: "ov_r1_c3" };

const C = tokens.colors;

const nav = [
  { label: "Images", kind: "square" as const },
  { label: "Projects", kind: "square" as const },
  { label: "Agent tasks", kind: "dots" as const, badge: "1 running" },
  { label: "Flashcards", kind: "square" as const },
];

const recent = [
  { label: "Lisbon on a budget", dot: "#E4754A" },
  { label: "Fix my Python script", dot: "#4A7DE4" },
  { label: "Cell biology notes", dot: "#2EB5A5" },
  { label: "Q3 report summary", dot: "#9B5DE5" },
  { label: "Cover letter draft", dot: "#3FA34D" },
  { label: "Spanish verbs quiz", dot: "#4A7DE4" },
];

export default function SearchDrawerDark() {
  return (
    <Phone theme="dark">
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1, minWidth: 0, background: "#16171A", overflowY: "auto", padding: "12px 20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                flex: 1, height: 48, borderRadius: tokens.radius.input, background: C.darkInput,
                display: "flex", alignItems: "center", gap: 10, padding: "0 14px",
              }}
            >
              {Icon.search(C.darkSub)}
              <span style={{ flex: 1, fontSize: tokens.font.listItem, color: C.darkDim }}>Search</span>
              {Icon.edit(C.darkSub)}
            </div>
            {Icon.menu(C.darkSub)}
          </div>
          <div style={{ marginTop: 8 }}>
            {nav.map((r) => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {r.kind === "square" ? (
                    <span style={{ display: "flex", color: C.darkSub, flexShrink: 0 }}>
                      {r.label === "Images" ? Icon.image(C.darkSub) : r.label === "Projects" ? Icon.folder(C.darkSub) : Icon.cards(C.darkSub)}
                    </span>
                  ) : (
                    <span style={{ width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 2, flexShrink: 0 }}>
                      <span style={{ width: 3, height: 3, borderRadius: "50%", background: C.darkSub }} />
                      <span style={{ width: 3, height: 3, borderRadius: "50%", background: C.darkSub }} />
                      <span style={{ width: 3, height: 3, borderRadius: "50%", background: C.darkSub }} />
                    </span>
                  )}
                  <span style={{ fontSize: 16, fontWeight: 500, color: C.darkText }}>{r.label}</span>
                </div>
                {r.badge && (
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent }} />
                    <span style={{ fontSize: tokens.font.secondary, color: C.darkSub }}>{r.badge}</span>
                  </span>
                )}
              </div>
            ))}
          </div>
          <div style={{ fontSize: tokens.font.secondary, color: C.darkSub, marginTop: 10 }}>Pinned</div>
          <div style={{ marginTop: 10, background: C.darkCard, borderRadius: tokens.radius.card, padding: "14px 16px" }}>
            <span style={{ fontSize: tokens.font.listItem, fontWeight: 600, color: C.darkText }}>Thesis outline</span>
          </div>
          <div style={{ fontSize: tokens.font.secondary, color: C.darkSub, marginTop: 20 }}>Recent</div>
          <div style={{ marginTop: 2 }}>
            {recent.map((r) => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0" }}>
                <span style={{ fontSize: tokens.font.listItem, fontWeight: 500, color: C.darkText }}>{r.label}</span>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: r.dot, flexShrink: 0 }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, background: C.darkCard, borderRadius: tokens.radius.card, padding: "14px 16px" }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.darkText }}>About 240 messages left</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
            <span
              style={{
                width: 36, height: 36, borderRadius: "50%", background: C.darkRow,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 15, fontWeight: 700, color: C.darkText, flexShrink: 0,
              }}
            >
              A
            </span>
            <span style={{ fontSize: tokens.font.listItem, fontWeight: 700, color: C.darkText }}>Alex</span>
            <span
              style={{
                border: `1px solid ${C.darkDivider}`, borderRadius: tokens.radius.chip, padding: "1px 8px",
                fontSize: tokens.font.caption, color: C.darkSub,
              }}
            >
              Pro
            </span>
            <span style={{ marginLeft: "auto", display: "flex" }}>{Icon.gear(C.darkSub)}</span>
          </div>
        </div>
        <div style={{ width: 62, background: "rgba(0,0,0,0.45)", flexShrink: 0 }} />
      </div>
    </Phone>
  );
}
