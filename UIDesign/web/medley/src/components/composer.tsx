import { cn } from "../lib/utils";
import { Icon } from "./icons";
import { Input } from "./ui/input";

export type ComposerMic = "circle" | "plain" | "stop";

/**
 * Desktop composer: wide pill input bar (52px, radius 26) with plus, placeholder,
 * optional model label pill, and the four mic/send states from the mobile screens:
 * circle (dark: orange mic / light: black mic), plain (grey line mic), stop
 * (white circle + 12px black square), sendDark (black mic circle).
 */
export function Composer({
  dark,
  placeholder,
  modelLabel,
  mic = "circle",
  sendDark = false,
  className,
}: {
  dark: boolean;
  placeholder: string;
  modelLabel?: string;
  mic?: ComposerMic;
  sendDark?: boolean;
  className?: string;
}) {
  const sub = dark ? "#9A9BA2" : "#6B6C72";
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex h-[52px] items-center gap-2.5 rounded-input px-2 pl-3.5",
          dark ? "bg-dark-input" : "bg-light-card border border-light-divider shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
        )}
      >
        <span className="inline-flex" style={{ color: sub }}>{Icon.plus(sub)}</span>
        <Input
          dark={dark}
          aria-label={placeholder}
          placeholder={placeholder}
          className="min-w-0 flex-1 border-0 bg-transparent px-0"
        />
        {modelLabel && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-[16px] px-2.5 py-1.5 text-secondary font-semibold shrink-0",
              dark ? "bg-dark-row text-dark-sub" : "bg-user-bubble-light text-light-sub",
            )}
          >
            {modelLabel}
            {Icon.chevronDown(sub, 14)}
          </span>
        )}
        {mic === "plain" ? (
          <span className="inline-flex shrink-0 pr-1.5" style={{ color: sub }}>{Icon.mic(sub)}</span>
        ) : mic === "stop" ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
            <span className="h-3 w-3 rounded-[2px] bg-black-btn" />
          </span>
        ) : (
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
            style={{ background: sendDark ? "#111214" : dark ? "#E2A181" : "#111214" }}
          >
            {Icon.mic("#FFFFFF")}
          </span>
        )}
      </div>
    </div>
  );
}
