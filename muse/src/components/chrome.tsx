import type { ReactNode } from "react";
import { tokens } from "../tokens";

const C = tokens.colors;

function svgProps(color: string, size = 20) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
}

export const Icon = {
  menu: (c: string) => (
    <svg {...svgProps(c)}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
  ),
  back: (c: string) => (
    <svg {...svgProps(c)}><path d="M15 18l-6-6 6-6" /></svg>
  ),
  close: (c: string) => (
    <svg {...svgProps(c)}><path d="M18 6L6 18M6 6l12 12" /></svg>
  ),
  plus: (c: string) => (
    <svg {...svgProps(c)}><path d="M12 5v14M5 12h14" /></svg>
  ),
  mic: (c: string) => (
    <svg {...svgProps(c)}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 19v3" /></svg>
  ),
  check: (c: string, s = 20) => (
    <svg {...svgProps(c, s)}><path d="M20 6L9 17l-5-5" /></svg>
  ),
  chevronDown: (c: string, s = 16) => (
    <svg {...svgProps(c, s)}><path d="M6 9l6 6 6-6" /></svg>
  ),
  chevronRight: (c: string, s = 16) => (
    <svg {...svgProps(c, s)}><path d="M9 18l6-6-6-6" /></svg>
  ),
  search: (c: string) => (
    <svg {...svgProps(c)}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
  ),
  edit: (c: string) => (
    <svg {...svgProps(c)}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
  ),
  clock: (c: string) => (
    <svg {...svgProps(c)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  ),
  copy: (c: string, s = 18) => (
    <svg {...svgProps(c, s)}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
  ),
  refresh: (c: string, s = 18) => (
    <svg {...svgProps(c, s)}><path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v6h-6" /></svg>
  ),
  like: (c: string, s = 18) => (
    <svg {...svgProps(c, s)}><path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /></svg>
  ),
  dislike: (c: string, s = 18) => (
    <svg {...svgProps(c, s)}><path d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" /></svg>
  ),
  more: (c: string, s = 18) => (
    <svg {...svgProps(c, s)}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
  ),
  info: (c: string) => (
    <svg {...svgProps(c)}><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></svg>
  ),
  gear: (c: string) => (
    <svg {...svgProps(c)}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
  ),
  send: (c: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
  ),
  news: (c: string) => (
    <svg {...svgProps(c)}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 11h8M8 15h5" /></svg>
  ),
  pdf: (c: string) => (
    <svg {...svgProps(c)}><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></svg>
  ),
  image: (c: string) => (
    <svg {...svgProps(c)}><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="1.5" /><path d="M21 16l-5-5L5 19" /></svg>
  ),
  cards: (c: string) => (
    <svg {...svgProps(c)}><rect x="3" y="7" width="13" height="12" rx="2" /><path d="M7 7V5a2 2 0 0 1 2-2h11v12" /></svg>
  ),
  mapPin: (c: string, s = 20) => (
    <svg {...svgProps(c, s)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
  ),
  calendar: (c: string, s = 20) => (
    <svg {...svgProps(c, s)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></svg>
  ),
  folder: (c: string) => (
    <svg {...svgProps(c)}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
  ),
  searchOrbit: (c: string) => (
    <svg {...svgProps(c)}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /><path d="M4 4a8 8 0 0 1 3-1.5" /></svg>
  ),
  download: (c: string) => (
    <svg {...svgProps(c)}><path d="M12 3v10" /><path d="M7 10l5 5 5-5" /><path d="M4 19h16" /></svg>
  ),
  trash: (c: string) => (
    <svg {...svgProps(c)}><path d="M4 7h16" /><path d="M9 7V5h6v2" /><path d="M6 7l1 13h10l1-13" /><path d="M10 11v5M14 11v5" /></svg>
  ),
  logout: (c: string) => (
    <svg {...svgProps(c)}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg>
  ),
};

export function ModelDots({ size = 6 }: { size?: number }) {
  const dots = [C.accent, "#4A7DE4", "#2EB5A5", "#9B5DE5", "#3FA34D"];
  return (
    <span style={{ display: "inline-flex", gap: 2, alignItems: "center" }}>
      {dots.map((d, i) => (
        <span key={i} style={{ width: size, height: size, borderRadius: "50%", background: d, display: "inline-block" }} />
      ))}
    </span>
  );
}

// Medley mark traced from the welcome / CN-home logo pixels (cn_r0_c0 native
// box x19-35, y43.5-61.5): two white loops separated by a diagonal swoosh cut,
// plus the orange block at (30,47,2,5). viewBox uses those native coordinates.
export function MedleyMark({ size = 24, color = "#F5F5F7" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="19 43 17 19" fill="none">
      <path d="M20.5 44 L21 43.5 L22 43.5 L23 43.5 L24 43.5 L24.5 44 L25 44.5 L26 44.5 L26.5 45 L27 45.5 L27.5 46 L27.5 47 L27.5 48 L27.5 49 L27.5 50 L27 50.5 L26.5 51 L26 51.5 L25 51.5 L24.5 52 L24 52.5 L23.5 53 L23 53.5 L22 53.5 L21.5 54 L21 54.5 L20.5 54 L20.5 53 L20.5 52 L20.5 51 L20.5 50 L20.5 49 L20.5 48 L20.5 47 L20.5 46 L20.5 45 L20.5 44 Z" fill={color} />
      <path d="M31.5 44 L32 43.5 L33 43.5 L34 43.5 L34.5 44 L34 44.5 L33.5 45 L34 45.5 L34.5 46 L34 46.5 L33.5 47 L33.5 48 L33.5 49 L33.5 50 L33.5 51 L33.5 52 L33.5 53 L33.5 54 L33.5 55 L33.5 56 L33.5 57 L34 57.5 L34.5 58 L34 58.5 L33.5 59 L34 59.5 L34.5 60 L34 60.5 L33 60.5 L32.5 60 L32 59.5 L31 59.5 L30 59.5 L29.5 59 L29 58.5 L28.5 58 L28.5 57 L28.5 56 L29 55.5 L29.5 55 L29 54.5 L28.5 54 L28 53.5 L27.5 54 L27.5 55 L27.5 56 L27 56.5 L26.5 57 L26.5 58 L26 58.5 L25.5 59 L25.5 60 L25 60.5 L24.5 61 L24 61.5 L23 61.5 L22 61.5 L21 61.5 L20 61.5 L19.5 61 L19.5 60 L20 59.5 L20.5 59 L21 58.5 L21.5 58 L22 57.5 L22.5 57 L22.5 56 L23 55.5 L24 55.5 L24.5 55 L25 54.5 L25.5 54 L26 53.5 L26.5 53 L27 52.5 L28 52.5 L28.5 52 L29 51.5 L30 51.5 L30.5 51 L31 50.5 L32 50.5 L32.5 50 L32 49.5 L31.5 49 L31.5 48 L31.5 47 L31 46.5 L30.5 46 L30 45.5 L29.5 45 L30 44.5 L31 44.5 L31.5 44 Z" fill={color} />
      <rect x="30" y="47" width="2" height="5" fill={C.accent} />
    </svg>
  );
}

export function ModelDot({ model, size = 8 }: { model: string; size?: number }) {
  let color: string = C.accent;
  if (model.includes("GLM")) color = "#C65D7B";
  else if (model.includes("DeepSeek")) color = "#5B8A99";
  else if (model.includes("Claude")) color = "#B0703C";
  else if (model.includes("Kimi")) color = "#9A9A3E";
  else if (model.includes("GPT")) color = "#3FA34D";
  return (
    <span style={{ width: size, height: size, borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />
  );
}

export function TopBar({
  dark,
  left,
  center,
  right,
}: {
  dark: boolean;
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        flexShrink: 0,
        color: dark ? C.darkText : C.lightText,
      }}
    >
      <div style={{ width: 72, display: "flex", alignItems: "center" }}>{left}</div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>{center}</div>
      <div style={{ width: 72, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 16 }}>{right}</div>
    </div>
  );
}

export function ModelPill({ dark, label }: { dark: boolean; label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 12px",
        borderRadius: 20,
        background: dark ? C.darkInput : "#EDEEF0",
        fontSize: 14,
        fontWeight: 600,
        color: dark ? C.darkText : C.lightText,
      }}
    >
      <ModelDots />
      {label}
      {Icon.chevronDown(dark ? C.darkSub : C.lightSub)}
    </span>
  );
}

export function InputBar({
  dark,
  placeholder,
  modelLabel,
  sendDark,
  mic = "circle",
}: {
  dark: boolean;
  placeholder: string;
  modelLabel?: string;
  sendDark?: boolean;
  mic?: "circle" | "plain" | "stop";
}) {
  return (
    <div style={{ padding: "12px 16px 0 16px", flexShrink: 0 }}>
      <div
        style={{
          height: 52,
          borderRadius: tokens.radius.input,
          background: dark ? C.darkInput : "#FFFFFF",
          border: dark ? "none" : "1px solid #E6E7EA",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 8px 0 14px",
          boxShadow: dark ? "none" : "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <span style={{ display: "flex", color: dark ? C.darkSub : C.lightSub }}>{Icon.plus(dark ? C.darkSub : C.lightSub)}</span>
        <span style={{ flex: 1, fontSize: 15, color: dark ? C.darkDim : C.lightDim }}>{placeholder}</span>
        {modelLabel && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 13,
              fontWeight: 600,
              color: dark ? C.darkSub : C.lightSub,
              background: dark ? C.darkRow : "#EDEEF0",
              padding: "6px 10px",
              borderRadius: 16,
            }}
          >
            {modelLabel}
            {Icon.chevronDown(dark ? C.darkSub : C.lightSub, 14)}
          </span>
        )}
        {mic === "plain" ? (
          <span style={{ display: "flex", color: dark ? C.darkSub : C.lightSub, flexShrink: 0, paddingRight: 6 }}>
            {Icon.mic(dark ? C.darkSub : C.lightSub)}
          </span>
        ) : mic === "stop" ? (
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ width: 12, height: 12, background: "#111214", borderRadius: 2 }} />
          </span>
        ) : (
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: sendDark ? "#111214" : dark ? C.accent : "#111214",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              flexShrink: 0,
            }}
          >
            {Icon.mic("#FFFFFF")}
          </span>
        )}
      </div>
    </div>
  );
}

export function SuggestionRow({
  dark,
  icon,
  text,
  badge,
}: {
  dark: boolean;
  icon: ReactNode;
  text: string;
  badge?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 0",
        borderBottom: `1px solid ${dark ? C.darkDivider : C.lightDivider}`,
        fontSize: tokens.font.listItem,
        fontWeight: 500,
        color: dark ? C.darkText : C.lightText,
      }}
    >
      <span style={{ color: dark ? C.darkSub : C.lightSub, display: "flex" }}>{icon}</span>
      <span style={{ flex: 1 }}>{text}</span>
      {badge && (
        <span style={{ fontSize: 11, fontWeight: 700, color: dark ? C.darkSub : C.lightSub, border: `1px solid ${dark ? C.darkDivider : C.lightDivider}`, borderRadius: 6, padding: "2px 6px" }}>
          {badge}
        </span>
      )}
    </div>
  );
}

export function UserBubble({ dark, children }: { dark: boolean; children: ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", margin: "8px 0" }}>
      <div
        style={{
          maxWidth: "85%",
          background: dark ? C.userBubbleDark : C.userBubbleLight,
          color: dark ? C.darkText : C.lightText,
          borderRadius: 20,
          borderTopRightRadius: 6,
          padding: "12px 16px",
          fontSize: tokens.font.body,
          lineHeight: 1.35,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function AiMeta({ dark, model, sub }: { dark: boolean; model: string; sub?: string }) {
  return (
    <div style={{ margin: "16px 0 8px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: dark ? C.darkText : C.lightText }}>
        <ModelDot model={model} />
        {model}
      </div>
      {sub && <div style={{ fontSize: 13, color: dark ? C.darkSub : C.lightSub, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export function ActionRow({ dark, credits }: { dark: boolean; credits?: string }) {
  const c = dark ? C.darkSub : C.lightSub;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "12px 0" }}>
      {credits && <span style={{ fontSize: 13, color: c, marginRight: "auto" }}>{credits}</span>}
      {!credits && <span style={{ marginRight: "auto" }} />}
      {Icon.copy(c)}
      {Icon.refresh(c)}
      {Icon.like(c)}
      {Icon.dislike(c)}
      {Icon.more(c)}
    </div>
  );
}
