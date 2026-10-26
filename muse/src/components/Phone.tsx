import type { CSSProperties, ReactNode } from "react";
import { tokens } from "../tokens";

function SignalIcon({ dark }: { dark: boolean }) {
  const c = dark ? "#F5F5F7" : "#17181C";
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill={c}>
      <rect x="0" y="7" width="3" height="5" rx="1" />
      <rect x="5" y="5" width="3" height="7" rx="1" />
      <rect x="10" y="2" width="3" height="10" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
  );
}

function WifiIcon({ dark }: { dark: boolean }) {
  const c = dark ? "#F5F5F7" : "#17181C";
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round">
      <path d="M1 4.5C4 1.5 12 1.5 15 4.5" />
      <path d="M3.5 7.5C5.5 5.5 10.5 5.5 12.5 7.5" />
      <circle cx="8" cy="10.2" r="1.1" fill={c} stroke="none" />
    </svg>
  );
}

function BatteryIcon({ dark }: { dark: boolean }) {
  const c = dark ? "#F5F5F7" : "#17181C";
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={c} opacity="0.5" />
      <rect x="2" y="2" width="18" height="8" rx="2" fill={c} />
      <path d="M23 4v4a2.2 2.2 0 0 0 0-4z" fill={c} opacity="0.5" />
    </svg>
  );
}

export function StatusBar({ dark }: { dark: boolean }) {
  return (
    <div
      style={{
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px 0 28px",
        fontSize: tokens.font.statusBar,
        fontWeight: 600,
        color: dark ? tokens.colors.darkText : tokens.colors.lightText,
        flexShrink: 0,
      }}
    >
      <span>10:24</span>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <SignalIcon dark={dark} />
        <WifiIcon dark={dark} />
        <BatteryIcon dark={dark} />
      </span>
    </div>
  );
}

export function HomeIndicator({ dark }: { dark: boolean }) {
  return (
    <div style={{ height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div
        style={{
          width: 134,
          height: 5,
          borderRadius: 3,
          background: dark ? "#3A3B40" : "#C9CACC",
        }}
      />
    </div>
  );
}

export function Phone({
  theme,
  children,
  style,
}: {
  theme: "dark" | "light";
  children: ReactNode;
  style?: CSSProperties;
}) {
  const dark = theme === "dark";
  return (
    <div
      style={{
        width: tokens.phone.width,
        height: tokens.phone.height,
        borderRadius: tokens.radius.phone,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: dark ? tokens.colors.darkBg : tokens.colors.lightBg,
        color: dark ? tokens.colors.darkText : tokens.colors.lightText,
        fontFamily: tokens.font.family,
        border: "2px solid #1C1C1E",
        boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
        flexShrink: 0,
        ...style,
      }}
    >
      <StatusBar dark={dark} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>{children}</div>
      <HomeIndicator dark={dark} />
    </div>
  );
}
