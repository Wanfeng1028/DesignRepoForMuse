// codegen: hand-written
import { Phone } from "../components/Phone";
import { TopBar, ModelPill, UserBubble, AiMeta, ActionRow, InputBar, Icon } from "../components/chrome";
import { tokens } from "../tokens";

const C = tokens.colors;

export const meta = { id: "chat-light-router-en", title: "Router settings chat (light)", source: "ov_r1_c1" };

function Bullet({ children }: { children: string }) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
      <span style={{ flexShrink: 0, fontSize: 15, lineHeight: 1.5 }}>•</span>
      <span style={{ fontSize: 15, lineHeight: 1.5 }}>{children}</span>
    </div>
  );
}

export default function ChatLightRouterEn() {
  return (
    <Phone theme="light">
      <TopBar
        dark={false}
        left={Icon.menu(C.lightText)}
        center={<ModelPill dark={false} label="GPT-6.1 Sol" />}
        right={
          <>
            {Icon.clock(C.lightText)}
            {Icon.edit(C.lightText)}
          </>
        }
      />
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 20px" }}>
        <UserBubble dark={false}>How do I check my home router for open ports and weak settings?</UserBubble>
        <div style={{ background: C.userBubbleLight, borderRadius: tokens.radius.card, padding: "16px", marginTop: 8 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: `1.5px solid ${C.lightSub}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: C.lightSub,
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              !
            </span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.45 }}>
                Claude Sonnet 5.5 can&apos;t continue this chat
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: C.lightSub, margin: "8px 0 0 0" }}>
                Anthropic&apos;s safety system flagged this request (cybersecurity). Medley switched to GPT-6.1 Sol
                for the rest of this chat. You weren&apos;t charged for the blocked attempt.
              </p>
              <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Learn more</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Send feedback</span>
              </div>
            </div>
          </div>
        </div>
        <AiMeta dark={false} model="GPT-6.1 Sol · Switched" sub="Thought for 4s" />
        <p style={{ fontSize: 16, lineHeight: 1.55, margin: "0" }}>
          Start in your router&apos;s admin page. Most weak spots are settings you can fix in a few minutes.
        </p>
        <Bullet>Update the firmware and change the default admin password.</Bullet>
        <Bullet>Turn off remote management, WPS and UPnP unless you need them.</Bullet>
        <Bullet>Check the connected devices list for anything you don&apos;t recognize.</Bullet>
        <ActionRow dark={false} credits="44 credits" />
        <div style={{ height: 8 }} />
      </div>
      <InputBar dark={false} placeholder="Message GPT-6.1 Sol" mic="plain" />
    </Phone>
  );
}
