import { cn } from "../lib/utils";
import { Icon } from "./icons";

export type SourceBadge = { label: string };

/**
 * Sources chip: small square badges + "N sources".
 * Lisbon: T/L/V badges (6x crop confirmed). Train: S/R/K badges + "4 sources"
 * (v1.3 S8 — the audit's "blank" reading is superseded by the original
 * Train screen, which shows S R K letter badges).
 */
export function SourceChips({ dark, badges, countLabel }: { dark: boolean; badges: string[]; countLabel: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 mt-3.5 rounded-chip border px-3 py-[5px] text-caption",
        dark ? "border-dark-divider text-dark-sub" : "border-light-divider text-light-sub",
      )}
    >
      {badges.map((b, i) => (
        <span
          key={i}
          className={cn(
            "inline-flex h-4 w-4 items-center justify-center rounded text-[10px] font-bold shrink-0",
            dark ? "bg-dark-row text-dark-text" : "bg-user-bubble-light text-light-text",
          )}
        >
          {b}
        </span>
      ))}
      <span className="ml-1">{countLabel}</span>
    </div>
  );
}

/** Inline source line used on the Chinese Lisbon screen (text + action icons). */
export function SourceLine({ dark, meta, children }: { dark: boolean; meta: string; children?: React.ReactNode }) {
  const c = dark ? "#9A9BA2" : "#6B6C72";
  return (
    <div className="flex items-center gap-3 mt-3.5">
      <span className={cn("text-secondary whitespace-nowrap", dark ? "text-dark-sub" : "text-light-sub")}>{meta}</span>
      <span className="mr-auto" />
      <span className="inline-flex gap-3.5" style={{ color: c }}>
        {Icon.copy(c)}
        {Icon.refresh(c)}
        {Icon.like(c)}
        {Icon.dislike(c)}
        {Icon.more(c)}
      </span>
      {children}
    </div>
  );
}
