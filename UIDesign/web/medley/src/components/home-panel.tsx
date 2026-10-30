import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Icon } from "./icons";
import { MedleyMark, ModelDots } from "./medley-mark";
import { Composer } from "./composer";

export type Suggestion = { icon: "news" | "pdf" | "image" | "cards" | "searchOrbit"; text: string; badge?: string };

function suggestionIcon(kind: Suggestion["icon"], color: string) {
  switch (kind) {
    case "news": return Icon.news(color);
    case "pdf": return Icon.pdf(color);
    case "image": return Icon.image(color);
    case "cards": return Icon.cards(color);
    case "searchOrbit": return Icon.searchOrbit(color);
  }
}

/** Suggestion row: 20px icon, 15px medium text, bottom divider, optional badge. */
export function SuggestionRow({ icon, text, badge, dark = false }: Suggestion & { dark?: boolean }) {
  const sub = dark ? "#9A9BA2" : "#6B6C72";
  return (
    <div className={cn("flex items-center gap-3 border-b py-[14px] text-list-item font-medium", dark ? "border-dark-divider text-dark-text" : "border-light-divider text-light-text")}>
      <span className="inline-flex" style={{ color: sub }}>{suggestionIcon(icon, sub)}</span>
      <span className="flex-1">{text}</span>
      {badge && (
        <span className={cn("text-[13px]", dark ? "text-dark-sub" : "text-light-sub")}>
          {badge}
        </span>
      )}
    </div>
  );
}

export type HomePanelProps = {
  greeting: string;
  suggestions: Suggestion[];
  composerPlaceholder: string;
  composerModelLabel?: string;
  /** EN home: Auto pill top bar. CN home: segmented Chat/Agents top bar + M mark. */
  variant: "en" | "cn";
  segmentLabels?: [string, string];
  dark?: boolean;
};

/**
 * Home panel (light, EN + CN variants). EN: menu / Auto pill / clock top bar,
 * greeting, suggestion list, plain-mic composer. CN: segmented Chat/Agents
 * pill, M mark above the greeting, "Pro" badge on the research row, model
 * label + black send composer. The greeting sits low on the page with the
 * composer pinned below, as on the mobile home screens.
 */
export function HomePanel({ greeting, suggestions, composerPlaceholder, composerModelLabel, variant, segmentLabels, dark = false }: HomePanelProps) {
  const text = dark ? "#F5F5F7" : "#17181C";
  const sub = dark ? "#9A9BA2" : "#6B6C72";
  const [autoOpen, setAutoOpen] = useState(false);
  return (
    <div className={cn("flex flex-col", dark ? "bg-dark-bg text-dark-text" : "bg-light-bg text-light-text")}>
      <div className="flex h-14 items-center justify-between px-4">
        <span className="inline-flex w-[72px]" style={{ color: text }}>{Icon.menu(text)}</span>
        <span className="flex flex-1 items-center justify-center">
          {variant === "en" ? (
            <span onClick={() => setAutoOpen((v) => !v)} className="inline-flex cursor-pointer items-center gap-1.5 rounded-chip bg-user-bubble-light px-3 py-[7px] text-[14px] font-semibold">
              <ModelDots />
              Auto
              <span className="morph-rotate inline-flex" data-open={autoOpen}>
                {Icon.chevronDown(sub)}
              </span>
            </span>
          ) : (
            <span className="inline-flex items-center rounded-chip bg-user-bubble-light p-[3px]">
              <span className="rounded-[16px] bg-light-card px-3.5 py-1.5 text-[14px] font-bold">{segmentLabels?.[0]}</span>
              <span className="px-3.5 py-1.5 text-[14px] font-medium text-light-sub">{segmentLabels?.[1]}</span>
            </span>
          )}
        </span>
        {/* v1.3 P2-6: dashed-ring clock in the original home top bar. */}
        <span className="flex w-[72px] justify-end" style={{ color: text }}>{Icon.clockDashed(text)}</span>
      </div>
      <div className="flex-1" />
      <div className="px-5">
        {variant === "cn" && (
          <div className="mb-3.5">
            <MedleyMark size={27} color={text} />
          </div>
        )}
        <div className="text-greeting font-bold leading-[1.25] mb-[18px]">{greeting}</div>
        <div className="border-t border-light-divider">
          {suggestions.map((s) => (
            <SuggestionRow key={s.text} {...s} dark={dark} />
          ))}
        </div>
      </div>
      <div className="h-3" />
      <div className="px-4 pb-1">
        <Composer
          dark={dark}
          placeholder={composerPlaceholder}
          modelLabel={composerModelLabel}
          mic={variant === "en" ? "plain" : "circle"}
          sendDark={variant === "cn"}
          stacked={variant === "cn"}
        />
      </div>
    </div>
  );
}

export type { ReactNode };
