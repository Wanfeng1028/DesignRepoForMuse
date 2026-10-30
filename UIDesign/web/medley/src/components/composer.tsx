import { useState } from "react";
import { cn } from "../lib/utils";
import { Icon } from "./icons";
import { Input } from "./ui/input";

export type ComposerMic = "circle" | "plain" | "stop" | "arrow";

/**
 * Desktop composer: wide pill input bar (v1.3: 48px — original bar band
 * ~70px@600 / ~80px@660, i.e. ~46px CSS, measured in P2-11) with plus,
 * placeholder, optional model label pill, and the mic/send states from the
 * mobile screens: circle (dark: vivid-orange mic / light: black mic),
 * plain (grey line mic), stop (v1.3 M-stop: vivid-orange circle + dark
 * square, Lisbon-EN generating state), arrow (agent instruction composer:
 * white circle + dark up-arrow, no plus). sendDark = black mic circle.
 * The model-label chevron morphs (M4: 180deg rotation on tap); the end
 * glyph fade-scales in on state change (M2/M3 transition).
 */
export function Composer({
  dark,
  placeholder,
  modelLabel,
  mic = "circle",
  sendDark = false,
  hidePlus = false,
  stacked = false,
  className,
}: {
  dark: boolean;
  placeholder: string;
  modelLabel?: string;
  mic?: ComposerMic;
  sendDark?: boolean;
  hidePlus?: boolean;
  /** Two-line CN form: placeholder row on top, plus / model pill / mic row
   * below (CN home + CN Lisbon stills; ~93px tall vs 48px single-line). */
  stacked?: boolean;
  className?: string;
}) {
  const sub = dark ? "#9A9BA2" : "#6B6C72";
  const [labelOpen, setLabelOpen] = useState(false);
  const pillNode = modelLabel ? (
    <span
      onClick={() => setLabelOpen((v) => !v)}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 rounded-[16px] px-2.5 py-1.5 text-secondary font-semibold shrink-0",
        dark ? "bg-dark-row text-dark-sub" : "bg-user-bubble-light text-light-sub",
      )}
    >
      {modelLabel}
      <span className="morph-rotate inline-flex" data-open={labelOpen}>
        {Icon.chevronDown(sub, 14)}
      </span>
    </span>
  ) : null;
  const micNode =
    mic === "plain" ? (
      <span key="plain" className="morph-in inline-flex shrink-0 pr-1.5" style={{ color: sub }}>{Icon.mic(sub)}</span>
    ) : mic === "stop" ? (
      <span key="stop" className="morph-in flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-composer-stop">
        <span className="h-3 w-3 rounded-[2px] bg-black-btn" />
      </span>
    ) : mic === "arrow" ? (
      <span key="arrow" className="morph-in flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
        {Icon.send("#111214")}
      </span>
    ) : (
      <span
        key="circle"
        className="morph-in flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
        style={{ background: sendDark ? "#111214" : dark ? "#D95E27" : "#111214" }}
      >
        {Icon.mic("#FFFFFF")}
      </span>
    );
  if (stacked) {
    const placeholderColor = dark ? "#6B6C72" : "#9A9BA2";
    return (
      <div className={cn("w-full", className)}>
        <div
          className={cn(
            "flex flex-col rounded-input",
            dark ? "bg-dark-input" : "bg-light-card border border-light-divider shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
          )}
        >
          <div className="flex h-[46px] items-center pl-5 pr-4">
            <span className="text-body" style={{ color: placeholderColor }}>{placeholder}</span>
          </div>
          <div className="flex h-[48px] items-center gap-2.5 px-2 pl-3.5">
            {!hidePlus && <span className="inline-flex" style={{ color: sub }}>{Icon.plus(sub)}</span>}
            {pillNode}
            <span className="flex-1" />
            {micNode}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex h-[48px] items-center gap-2.5 rounded-input px-2 pl-3.5",
          dark ? "bg-dark-input" : "bg-light-card border border-light-divider shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
        )}
      >
        {!hidePlus && <span className="inline-flex" style={{ color: sub }}>{Icon.plus(sub)}</span>}
        <Input
          dark={dark}
          aria-label={placeholder}
          placeholder={placeholder}
          className="min-w-0 flex-1 border-0 bg-transparent px-0"
        />
        {pillNode}
        {micNode}
      </div>
    </div>
  );
}
