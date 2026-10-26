// codegen: spark-x2.6 draft, hand-adapted to shared chrome/tokens API
import { Phone } from "../components/Phone";
import { MedleyMark } from "../components/chrome";
import { tokens } from "../tokens";

export const meta = { id: "welcome-dark", title: "Welcome (dark)", source: "cn_r0_c0" };

const C = tokens.colors;

export default function WelcomeDark() {
  return (
    <Phone theme="dark">
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px 0" }}>
          <MedleyMark size={26} />
          <span style={{ fontSize: 17, fontWeight: 700, color: C.darkText }}>Medley</span>
        </div>
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: tokens.font.welcomeTitle, fontWeight: 700, color: C.darkText, lineHeight: 1.15 }}>
              Let's discover
            </span>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: C.accent, flexShrink: 0, alignSelf: "center" }} />
          </div>
          <div style={{ marginTop: 16, fontSize: 16, color: C.darkSub }}>Every top AI in one app.</div>
          <div style={{ marginTop: 6, fontSize: 15, color: C.darkDim }}>Claude, GPT, Gemini, DeepSeek, Kimi and GLM</div>
        </div>
        <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            type="button"
            style={{
              height: 52, borderRadius: tokens.radius.button, background: C.whiteBtn, border: "none",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              fontSize: 16, fontWeight: 700, color: C.blackBtn, cursor: "pointer",
            }}
          >
            <span
              style={{
                width: 22, height: 22, borderRadius: "50%", background: C.whiteBtn, border: "1px solid #D8D8DC",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 800, color: C.blackBtn, flexShrink: 0,
              }}
            >
              G
            </span>
            Continue with Google
          </button>
          <button
            type="button"
            style={{
              height: 52, borderRadius: tokens.radius.button, background: "transparent", border: `1px solid ${C.darkDivider}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 600, color: C.darkText, cursor: "pointer",
            }}
          >
            Try without an account
          </button>
          <div style={{ textAlign: "left", fontSize: tokens.font.caption, lineHeight: 1.45, color: C.darkDim, padding: "2px 20px 0" }}>
            By continuing, you confirm you&rsquo;re 18 or older and agree to the Terms and Privacy Policy.
          </div>
        </div>
      </div>
    </Phone>
  );
}
