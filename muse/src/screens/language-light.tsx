// codegen: moonshotai/kimi-k3 (draft reviewed: unused imports trimmed, title/footnote spacing tightened)
import { Phone } from "../components/Phone";
import { TopBar, Icon } from "../components/chrome";
import { tokens } from "../tokens";

export const meta = { id: "language-light", title: "App language (light)", source: "cn_r0_c3" };

const rows = [
  { name: "System default", sub: "English (United States)", check: true },
  { name: "English", sub: "", check: false },
  { name: "简体中文", sub: "Chinese (Simplified)", check: false },
  { name: "繁體中文", sub: "Chinese (Traditional)", check: false },
  { name: "日本語", sub: "Japanese", check: false },
  { name: "한국어", sub: "Korean", check: false },
  { name: "Español", sub: "Spanish (Latin America)", check: false },
  { name: "Português (Brasil)", sub: "Portuguese (Brazil)", check: false },
  { name: "Français", sub: "French", check: false },
  { name: "Deutsch", sub: "German", check: false },
];

export default function LanguageLight() {
  const c = tokens.colors;
  return (
    <Phone theme="light">
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <TopBar dark={false} left={Icon.back(c.lightText)} center={<span />} right={<span />} />

        <div
          style={{
            padding: `4px ${tokens.spacing.pagePadding}px 8px`,
            fontSize: tokens.font.pageTitle,
            fontWeight: 700,
            lineHeight: 1.3,
            color: c.lightText,
          }}
        >
          App language
        </div>

        <div style={{ padding: `0 ${tokens.spacing.pagePadding}px` }}>
          {rows.map((row) => (
            <div
              key={row.name}
              style={{
                padding: "10px 0",
                borderBottom: `1px solid ${c.lightDivider}`,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
                <div
                  style={{
                    fontSize: tokens.font.listItem,
                    fontWeight: 500,
                    lineHeight: 1.35,
                    color: c.lightText,
                  }}
                >
                  {row.name}
                </div>
                {row.sub ? (
                  <div
                    style={{
                      marginTop: 3,
                      fontSize: tokens.font.secondary,
                      lineHeight: 1.35,
                      color: c.lightSub,
                    }}
                  >
                    {row.sub}
                  </div>
                ) : null}
              </div>
              {row.check ? <span style={{ flexShrink: 0 }}>{Icon.check(c.lightText)}</span> : null}
            </div>
          ))}
        </div>

        <div
          style={{
            padding: `${tokens.spacing.pagePadding}px`,
            borderTop: `1px solid ${c.lightDivider}`,
            marginTop: 12,
            fontSize: tokens.font.secondary,
            lineHeight: 1.4,
            color: c.lightSub,
          }}
        >
          Answers follow the language you write in.
        </div>
      </div>
    </Phone>
  );
}
