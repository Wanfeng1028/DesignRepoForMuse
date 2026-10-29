import { MedleyMark } from "./medley-mark";
import { Button } from "./ui/button";

/**
 * Dark welcome panel: M mark + "Medley" wordmark, 38px "Let's discover"
 * headline with the accent-orange dot, sub-lines, white Google CTA and the
 * outlined "Try without an account" button, plus the 18+ terms footnote.
 */
export function WelcomePanel({
  tagline,
  modelLine,
  googleLabel,
  tryLabel,
  footnote,
}: {
  tagline: string;
  modelLine: string;
  googleLabel: string;
  tryLabel: string;
  footnote: string;
}) {
  return (
    <div className="flex flex-col bg-dark-bg text-dark-text px-5 py-3 min-h-[480px]">
      <div className="flex items-center gap-2 pt-0">
        <MedleyMark size={26} />
        <span className="text-[17px] font-bold">Medley</span>
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-baseline gap-2">
          <span className="text-welcome-title font-bold leading-[1.15]">Let&apos;s discover</span>
          <span className="h-3 w-3 shrink-0 self-center rounded-full bg-accent" />
        </div>
        <div className="mt-4 text-body text-dark-sub">{tagline}</div>
        <div className="mt-1.5 text-list-item text-dark-dim">{modelLine}</div>
      </div>
      <div className="flex flex-col gap-3 pb-4">
        <Button className="w-full">
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-[#D8D8DC] bg-white text-[13px] font-extrabold">
            G
          </span>
          {googleLabel}
        </Button>
        <Button variant="outline" className="w-full border-dark-divider text-dark-text font-semibold">
          {tryLabel}
        </Button>
        <div className="px-5 pt-0.5 text-left text-caption leading-[1.45] text-dark-dim">{footnote}</div>
      </div>
    </div>
  );
}
