import { useState } from "react";
import { cn } from "../lib/utils";
import { Icon } from "./icons";
import { Input } from "./ui/input";
import { glassChromeStyle, glassSmallStyle } from "./liquid-glass";

export type ComposerMic = "circle" | "plain" | "stop" | "arrow";

/**
 * Desktop composer: wide pill input bar (v1.3: 48px single-line; v1.6:
 * home-EN is 54px — its light card band measures 77-78 img px = 53.2-53.9
 * CSS in HD5 home-en, with plus/mic/placeholder all centred on the bar
 * centre, so the 54px height is real, not an edge misread; all other
 * single-row composers stay 48px) with plus, placeholder, optional model
 * label pill, and the mic/send states from the mobile screens: circle
 * (dark: vivid-orange mic 36px / light: black mic 40px — the CN black disc
 * measures 58 img px = 40.1 CSS), plain (grey line mic), stop (v1.3
 * M-stop: vivid-orange circle + dark square, Lisbon-EN generating state),
 * arrow (agent instruction composer: white circle + dark up-arrow, no
 * plus). sendDark = black mic circle. The model-label chevron morphs
 * (M4: 180deg rotation on tap); the end glyph fade-scales in on state
 * change (M2/M3 transition).
 */
export function Composer({
  dark,
  placeholder,
  modelLabel,
  mic = "circle",
  sendDark = false,
  hidePlus = false,
  stacked = false,
  tall = false,
  className,
}: {
  dark: boolean;
  placeholder: string;
  modelLabel?: string;
  mic?: ComposerMic;
  sendDark?: boolean;
  hidePlus?: boolean;
  /** Two-line CN form: placeholder row on top, plus / model pill / mic row
   * below (CN home + CN Lisbon stills). v1.6: placeholder 48 + controls 48
   * + bottom safe-area padding 24 + light border 2 = 122 CSS, matching the
   * measured CN stacked card (177 img px = 122.4 CSS). */
  stacked?: boolean;
  /** Home-EN only: 54px single-row bar (see header comment). */
  tall?: boolean;
  className?: string;
}) {
  const sub = dark ? "#9A9BA2" : "#6B6C72";
  const [labelOpen, setLabelOpen] = useState(false);
  const pillNode = modelLabel ? (
    <span
      onClick={() => setLabelOpen((v) => !v)}
      style={glassSmallStyle}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 rounded-[16px] px-2.5 py-1.5 text-secondary font-semibold shrink-0",
        dark ? "glass-tint-dark glass-rim-dark text-dark-sub" : "glass-tint-bubble glass-rim text-light-sub",
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
        className={cn(
          "morph-in flex shrink-0 items-center justify-center rounded-full text-white",
          dark && !sendDark ? "h-9 w-9" : "h-10 w-10",
        )}
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
          style={glassChromeStyle}
          className={cn(
            "flex flex-col rounded-input pb-6",
            dark ? "glass-tint-dark glass-rim-dark" : "glass-tint-light glass-rim-shadow-rest border border-light-divider",
          )}
        >
          <div className="flex h-[48px] items-center pl-5 pr-4">
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
        style={glassChromeStyle}
        className={cn(
          "flex items-center gap-2.5 rounded-input px-2 pl-3.5",
          tall ? "h-[54px]" : "h-[48px]",
          dark ? "glass-tint-dark glass-rim-dark" : "glass-tint-light glass-rim-shadow-rest border border-light-divider",
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
