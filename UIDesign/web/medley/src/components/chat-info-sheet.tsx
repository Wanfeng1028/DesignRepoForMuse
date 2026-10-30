import { BrandDots, ModelDot } from "./medley-mark";
import { Icon } from "./icons";

export type ChatInfoTool = { name: string; right: string };
export type ChatInfoReply = { model: string; dot: string; right: string };
export type ChatInfoStat = { value: string; label: string };
export type ChatInfoMetric = { label: string; value: string };

/**
 * Chat-info sheet: on mobile a bottom sheet (radius 24) over a dimmed chat
 * (top bar + user bubble + model line only, no AI body — verified in
 * DESIGN-TOKENS.md sec. 6); on desktop it is the right panel. Stats, model
 * chips, tools, a latest-reply metric grid and reply rows are all props.
 */
export function ChatInfoSheet({
  stats,
  modelChips,
  tools,
  latestReply,
  latestMetrics,
  replies,
  footnote,
  title = "Chat info",
}: {
  stats: ChatInfoStat[];
  modelChips: { name: string; dot: string }[];
  tools: ChatInfoTool[];
  latestReply: { model: string; dot: string; time: string };
  latestMetrics: ChatInfoMetric[];
  replies: ChatInfoReply[];
  footnote: string;
  title?: string;
}) {
  return (
    <div className="bg-white text-light-text rounded-sheet shadow-[0_-12px_32px_rgba(23,24,28,0.10)] p-5 pt-3">
      <div className="flex justify-center">
        <div className="h-1 w-9 rounded-full bg-[#D8D9DD]" />
      </div>
      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-page-title font-bold">{title}</span>
        {/* v1.3 sweep: sheet header carries a close X (ov-chatinfo). */}
        {Icon.close("#17181C")}
      </div>
      <div className="mt-3 flex gap-2">
        {stats.map((s) => (
          <div key={s.label} className="flex-1">
            <div className="text-greeting font-bold leading-[1.1]">{s.value}</div>
            <div className="text-secondary text-light-sub mt-[3px]">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-4">
        {modelChips.map((m) => (
          <span key={m.name} className="inline-flex items-center gap-1.5 text-secondary font-medium">
            <span className="h-2 w-2 rounded-full" style={{ background: m.dot }} />
            {m.name}
          </span>
        ))}
      </div>
      <div className="mt-3.5 text-section-title font-bold">Tools</div>
      {tools.map((t) => (
        <div key={t.name} className="flex items-center justify-between py-[7px] text-list-item">
          <span>{t.name}</span>
          <span className="text-secondary text-light-sub">{t.right}</span>
        </div>
      ))}
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-section-title font-bold">Replies</span>
        <span className="text-secondary text-light-sub">Latest first</span>
      </div>
      <div className="mt-2 rounded-card bg-light-bg p-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[14px] font-bold">
            <span className="h-2 w-2 rounded-full" style={{ background: latestReply.dot }} />
            {latestReply.model}
          </span>
          <span className="text-secondary text-light-sub">{latestReply.time}</span>
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {latestMetrics.map((m) => (
            <div key={m.label}>
              <div className="text-caption text-light-sub">{m.label}</div>
              <div className="text-list-item font-bold mt-0.5">{m.value}</div>
            </div>
          ))}
        </div>
      </div>
      {replies.map((r) => (
        <div key={r.model} className="flex items-center justify-between border-t-[0.5px] border-light-divider py-[9px]">
          <span className="inline-flex items-center gap-2 text-[14px] font-bold">
            <span className="h-2 w-2 rounded-full" style={{ background: r.dot }} />
            {r.model}
          </span>
          <span className="text-secondary text-light-sub">{r.right}</span>
        </div>
      ))}
      <div className="mt-1.5 text-caption leading-[1.45] text-light-sub">{footnote}</div>
    </div>
  );
}

/** Dimmed chat remnant shown behind the sheet (v1.3 S4: top bar with
 * hamburger / Auto pill / clock / edit, then bubble + model line). */
export function ChatInfoBackdrop({ bubbleText, modelLine }: { bubbleText: string; modelLine: string }) {
  const sub = "#6B6C72";
  return (
    <div className="opacity-45 bg-light-bg px-5 py-3" aria-hidden="true">
      <div className="flex items-center justify-between pb-3">
        <span className="inline-flex" style={{ color: sub }}>{Icon.menu("#17181C")}</span>
        {/* v1.3 sweep: thread top-bar Auto is bare (no pill). v1.6: its
            dots are the 3-dot diagonal BrandDots, like every other Auto. */}
        <span className="inline-flex items-center gap-1.5 px-1 py-[7px] text-[14px] font-semibold text-light-text">
          <BrandDots />
          Auto
          {Icon.chevronDown(sub, 14)}
        </span>
        <span className="inline-flex items-center gap-3" style={{ color: sub }}>
          {Icon.clock("#17181C")}
          {Icon.edit("#17181C")}
        </span>
      </div>
      <div className="flex justify-end">
        <div className="max-w-[85%] bg-user-bubble-light px-4 py-3 text-body leading-[1.35]" style={{ borderRadius: 20 }}>
          {bubbleText}
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        {/* v1.3 sweep: backdrop model line has a single model dot, not a cluster. */}
        <ModelDot model="Claude Sonnet 5.5" />
        <span className="text-[14px] font-bold text-light-text">{modelLine}</span>
      </div>
    </div>
  );
}
