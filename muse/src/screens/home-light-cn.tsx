// codegen: moonshotai/kimi-k3 (draft reviewed and repaired: M mark redrawn as a clean M polyline, suggestion spacing tightened)
import { Phone } from "../components/Phone";
import { TopBar, InputBar, SuggestionRow, Icon, MedleyMark } from "../components/chrome";
import { tokens } from "../tokens";

export const meta = { id: "home-light-cn", title: "Home (light, CN)", source: "cn_r0_c1" };

export default function HomeLightCn() {
  const c = tokens.colors;
  return (
    <Phone theme="light">
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          background: c.lightBg,
        }}
      >
        <TopBar
          dark={false}
          left={Icon.menu(c.lightText)}
          center={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: c.userBubbleLight,
                borderRadius: 20,
                padding: 3,
              }}
            >
              <span
                style={{
                  background: c.lightCard,
                  borderRadius: 16,
                  padding: "6px 14px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: c.lightText,
                }}
              >
                聊天
              </span>
              <span
                style={{
                  padding: "6px 14px",
                  fontSize: 14,
                  fontWeight: 500,
                  color: c.lightSub,
                }}
              >
                智能体
              </span>
            </div>
          }
          right={Icon.clock(c.lightText)}
        />

        <div style={{ flex: 1, minHeight: 0 }} />

        <div style={{ padding: `0 ${tokens.spacing.pagePadding}px` }}>
          <MedleyMark size={30} color={c.lightText} />
          <div
            style={{
              marginTop: 14,
              fontSize: tokens.font.greeting,
              fontWeight: 700,
              lineHeight: 1.25,
              color: c.lightText,
            }}
          >
            晚上好，Alex
          </div>
        </div>

        <div
          style={{
            padding: `18px ${tokens.spacing.pagePadding}px 0`,
            borderTop: `1px solid ${c.lightDivider}`,
            marginTop: 18,
          }}
        >
          <SuggestionRow dark={false} icon={Icon.news(c.lightSub)} text="今天有什么新闻" />
          <SuggestionRow dark={false} icon={Icon.pdf(c.lightSub)} text="总结一份 PDF" />
          <SuggestionRow dark={false} icon={Icon.searchOrbit(c.lightSub)} text="深度研究一个话题" badge="Pro" />
          <SuggestionRow dark={false} icon={Icon.cards(c.lightSub)} text="把笔记做成闪卡" />
        </div>

        <div style={{ height: 12 }} />

        <InputBar dark={false} placeholder="有问题，尽管问" modelLabel="自动" sendDark />
      </div>
    </Phone>
  );
}
