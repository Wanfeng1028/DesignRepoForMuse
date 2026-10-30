import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Icon } from "./icons";
import { ModelDot } from "./medley-mark";

export type Theme = "dark" | "light";
export const isDark = (t: Theme) => t === "dark";

/** User bubble: right-aligned, radius 20 with a small top-right corner, line-height 1.35. */
export function UserBubble({ dark, children }: { dark: boolean; children: ReactNode }) {
  return (
    <div className="flex justify-end my-2">
      <div
        className={cn(
          "max-w-[85%] px-4 py-3 text-body leading-[1.35]",
          dark ? "bg-user-bubble-dark text-dark-text" : "bg-user-bubble-light text-light-text",
        )}
        style={{ borderRadius: 20, borderTopRightRadius: 6 }}
      >
        {children}
      </div>
    </div>
  );
}

/** Follow-up chip: bordered pill under a user turn (Lisbon "Make day 2 all about food."). */
export function FollowUpChip({ dark, children }: { dark: boolean; children: ReactNode }) {
  return (
    <div className="flex justify-end my-1">
      <div
        className={cn("px-[18px] py-2.5 text-list-item rounded-chip border", dark ? "border-dark-divider text-dark-text" : "border-light-divider text-light-text")}
      >
        {children}
      </div>
    </div>
  );
}

/** AiMeta header: single model dot + model name, optional sub line (never a 5-dot cluster).
 * v1.3 sweep: the sub line carries a trailing chevron in the original
 * (Train "thought for 6s ›", Kyoto "found 12 places ›"). */
export function AiMeta({ dark, model, sub }: { dark: boolean; model: string; sub?: string }) {
  const subColor = dark ? "#9A9BA2" : "#6B6C72";
  return (
    <div className="mt-4 mb-2">
      <div className={cn("flex items-center gap-1.5 text-[14px] font-semibold", dark ? "text-dark-text" : "text-light-text")}>
        <ModelDot model={model} />
        {model}
      </div>
      {sub && (
        <div className={cn("mt-1 flex items-center gap-0.5 text-secondary", dark ? "text-dark-sub" : "text-light-sub")}>
          <span>{sub}</span>
          {Icon.chevronRight(subColor, 14)}
        </div>
      )}
    </div>
  );
}

/** Copy / refresh / like / dislike / more row, with optional leading credits label. */
export function ActionRow({ dark, credits }: { dark: boolean; credits?: string }) {
  const c = dark ? "#9A9BA2" : "#6B6C72";
  return (
    <div className="flex items-center gap-4 my-3">
      {credits ? <span className={cn("text-secondary mr-auto", dark ? "text-dark-sub" : "text-light-sub")}>{credits}</span> : <span className="mr-auto" />}
      {Icon.copy(c)}
      {Icon.refresh(c)}
      {Icon.like(c)}
      {Icon.dislike(c)}
      {Icon.more(c)}
    </div>
  );
}

export type ChatBlock =
  | { kind: "paragraph"; text: string; bold?: boolean }
  | { kind: "heading"; text: string }
  | { kind: "bullets"; items: string[] };

export function ChatBody({ dark, blocks }: { dark: boolean; blocks: ChatBlock[] }) {
  return (
    <div className={cn("text-body leading-[1.55]", dark ? "text-dark-text" : "text-light-text")}>
      {blocks.map((b, i) =>
        b.kind === "heading" ? (
          <div key={i} className="font-bold mt-3.5 first:mt-0">{b.text}</div>
        ) : b.kind === "bullets" ? (
          <div key={i} className="mt-2 flex flex-col gap-1.5">
            {b.items.map((t) => (
              <div key={t} className="flex gap-2 text-list-item leading-[1.45]">
                <span className={dark ? "text-dark-sub" : "text-light-sub"}>•</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        ) : (
          <p key={i} className={cn("my-0 mb-2", b.bold && "font-bold")}>{b.text}</p>
        ),
      )}
    </div>
  );
}

/** One full chat turn: user bubble, or an AI reply with meta, body and actions. */
export function ChatMessage({
  dark,
  role,
  model,
  sub,
  credits,
  blocks,
  children,
}: {
  dark: boolean;
  role: "user" | "ai";
  model?: string;
  sub?: string;
  credits?: string;
  blocks?: ChatBlock[];
  children?: ReactNode;
}) {
  if (role === "user") return <UserBubble dark={dark}>{children}</UserBubble>;
  return (
    <div>
      {model && <AiMeta dark={dark} model={model} sub={sub} />}
      {blocks && <ChatBody dark={dark} blocks={blocks} />}
      {children}
      <ActionRow dark={dark} credits={credits} />
    </div>
  );
}
