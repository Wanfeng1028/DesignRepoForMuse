// codegen: spark-x2.6 draft, hand-adapted to shared chrome/tokens API
import type { ReactNode } from "react";
import { Phone } from "../components/Phone";
import { tokens } from "../tokens";
import { AiMeta, Icon, InputBar, TopBar, UserBubble } from "../components/chrome";

export const meta = { id: "chat-dark-lisbon-cn", title: "Lisbon chat (dark, CN)", source: "cn_r0_c2" };

const C = tokens.colors;

function Tag({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        border: `1px solid ${C.darkDivider}`, borderRadius: 6, padding: "1px 7px",
        fontSize: 11, color: C.darkSub, flexShrink: 0, lineHeight: 1.6,
      }}
    >
      {children}
    </span>
  );
}

function CnItem({ text, tags }: { text: string; tags?: string[] }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: tokens.font.listItem, lineHeight: 1.5, color: C.darkText }}>
      <span style={{ color: C.darkSub, flexShrink: 0 }}>–</span>
      <span style={{ flex: 1 }}>{text}</span>
      {tags && (
        <span style={{ display: "inline-flex", gap: 6, flexShrink: 0 }}>
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </span>
      )}
    </div>
  );
}

export default function ChatDarkLisbonCn() {
  return (
    <Phone theme="dark">
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <TopBar
          dark
          left={Icon.menu(C.darkText)}
          center={
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.3 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: C.darkText }}>里斯本穷游三天</span>
              <span style={{ fontSize: tokens.font.caption, color: C.darkSub }}>旅行</span>
            </div>
          }
          right={<span style={{ display: "flex", gap: 16 }}>{Icon.edit(C.darkText)}{Icon.more(C.darkText)}</span>}
        />
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "4px 20px 16px" }}>
          <UserBubble dark>帮我规划三天里斯本穷游，我喜欢美食和看风景。</UserBubble>
          <AiMeta dark model="GLM-5 · 自动" sub="搜索了 6 个网站，思考了 3 秒" />
          <div style={{ fontSize: tokens.font.body, lineHeight: 1.55, color: C.darkText }}>
            这份行程花费不高，节奏轻松，好风景留给日落。
          </div>
          <div style={{ fontSize: tokens.font.body, fontWeight: 700, lineHeight: 1.55, color: C.darkText, marginTop: 14 }}>
            第一天：阿尔法玛和城堡
          </div>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
            <CnItem text="早上 9 点前坐 28 路电车，人少。" tags={["visitlisboa"]} />
            <CnItem text="午饭找一家街坊小馆，12 欧以内。" />
            <CnItem text="傍晚去 Senhora do Monte 看日落。" tags={["timeout", "+1"]} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
            <span style={{ fontSize: tokens.font.secondary, color: C.darkSub, whiteSpace: "nowrap" }}>3 个来源</span>
            <span style={{ fontSize: tokens.font.secondary, color: C.darkSub, marginRight: "auto", whiteSpace: "nowrap" }}>
              28 积分 1.1 秒 71 tok/s
            </span>
            <span style={{ display: "inline-flex", gap: 14, color: C.darkSub }}>
              {Icon.copy(C.darkSub)}
              {Icon.refresh(C.darkSub)}
              {Icon.like(C.darkSub)}
              {Icon.dislike(C.darkSub)}
              {Icon.more(C.darkSub)}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", margin: "14px 0 2px" }}>
            <div
              style={{
                border: `1px solid ${C.darkDivider}`, borderRadius: tokens.radius.chip, padding: "10px 18px",
                fontSize: tokens.font.listItem, color: C.darkText,
              }}
            >
              第二天全部安排吃的。
            </div>
          </div>
          <AiMeta dark model="Claude Sonnet 5.5" sub="思考了 2 秒" />
          <div style={{ fontSize: tokens.font.body, lineHeight: 1.55, color: C.darkText }}>
            第二天适合慢慢吃。上午 11 点前到 Time Out 市场，赶在午饭高峰之前，点几样小食分着吃，比一顿大餐更划算。下午走到
            Bairro Alto，买一个葡式蛋挞。
          </div>
        </div>
        <InputBar dark placeholder="有问题，尽管问" modelLabel="Sonnet 5.5" mic="stop" />
      </div>
    </Phone>
  );
}
