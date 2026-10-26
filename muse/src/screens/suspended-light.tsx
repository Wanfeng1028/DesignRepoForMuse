// codegen: moonshotai/kimi-k3 (draft reviewed: unused imports trimmed)
import { Phone } from "../components/Phone";
import { Icon } from "../components/chrome";
import { tokens } from "../tokens";

export const meta = { id: "suspended-light", title: "Account suspended (light)", source: "ov_r2_c3" };

export default function SuspendedLight() {
  const c = tokens.colors;
  const f = tokens.font;
  return (
    <Phone theme="light">
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          background: c.lightBg,
          padding: tokens.spacing.pagePadding,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            border: `2px solid ${c.lightDivider}`,
            background: c.lightCard,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
            marginBottom: 24,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="10" stroke={c.lightSub} strokeWidth="2" />
            <line x1="8" y1="20" x2="20" y2="8" stroke={c.lightSub} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.25, color: c.lightText }}>
          Your account is suspended
        </div>

        <div style={{ fontSize: 14, lineHeight: 1.55, color: c.lightText, marginTop: 16 }}>
          We suspended this account for breaking the usage policy: repeated requests for prohibited content.
        </div>

        <div style={{ fontSize: 14, lineHeight: 1.55, fontWeight: 700, color: c.lightText, marginTop: 12 }}>
          Suspended until Nov 2, 2026.
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 24 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginTop: 3, flexShrink: 0 }}>
            <circle cx="9" cy="9" r="7" stroke={c.lightSub} strokeWidth="1.6" />
            <line x1="9" y1="8" x2="9" y2="12.5" stroke={c.lightSub} strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="9" cy="5.6" r="0.9" fill={c.lightSub} />
          </svg>
          <span style={{ fontSize: f.listItem, lineHeight: 1.55, color: c.lightSub, flex: 1 }}>
            Your Pro subscription is still active in Google Play. You can cancel it there.
          </span>
        </div>

        <div
          style={{
            fontSize: f.listItem,
            fontWeight: 600,
            color: c.lightText,
            textDecoration: "underline",
            marginLeft: 28,
            marginTop: 8,
          }}
        >
          Manage subscription
        </div>

        <div style={{ fontSize: f.listItem, color: c.lightSub, marginTop: 20 }}>You can still:</div>

        {([
          { label: "Export my data", icon: Icon.download(c.lightSub) },
          { label: "Delete account", icon: Icon.trash(c.lightSub) },
          { label: "Sign out", icon: Icon.logout(c.lightSub) },
        ] as const).map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 0",
              borderBottom: `1px solid ${c.lightDivider}`,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: f.listItem, fontWeight: 500, color: c.lightText }}>{row.icon}{row.label}</span>
            {Icon.chevronRight(c.lightSub, 16)}
          </div>
        ))}

        <div style={{ flex: 1 }} />

        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              flex: 1,
              height: 52,
              borderRadius: tokens.radius.button,
              background: c.blackBtn,
              color: "#FFFFFF",
              fontSize: f.listItem,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Appeal
          </div>
          <div
            style={{
              flex: 1,
              height: 52,
              borderRadius: tokens.radius.button,
              border: "1px solid #D8D9DD",
              color: c.lightText,
              fontSize: f.listItem,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Contact support
          </div>
        </div>
      </div>
    </Phone>
  );
}
