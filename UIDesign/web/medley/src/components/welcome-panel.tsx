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
        <span className="text-[19px] font-bold">Medley</span>
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-baseline gap-2">
          <span className="text-welcome-title font-bold leading-[1.15]">Let&apos;s discover</span>
          {/* v1.4: CN HD dot interior median (255,101,33) = #FF6521, 16px
              (22 img px); v1.3 #D95E27 was a downscaled-crop average. */}
          <span className="h-4 w-4 shrink-0 self-center rounded-full bg-welcome-dot" />
        </div>
        <div className="mt-3 text-body text-[#B0B4B6]">{tagline}</div>
        <div className="mt-1.5 text-[14px] text-[#8E9295]">{modelLine}</div>
      </div>
      <div className="flex flex-col gap-2 pb-4">
        {/* v1.4: Google fill measured #EDEEF2 (237,238,242); G disc is a
            plain white 20px disc with no grey ring (sharp 236->254 edge). */}
        <Button className="w-full bg-[#EDEEF2]">
          <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white text-[13px] font-extrabold">
            G
          </span>
          {googleLabel}
        </Button>
        {/* v1.4: Try button is a transparent outline pill (interior = panel
            bg exactly), 1px border ~#43474C; v1.3 filled-pill form was wrong. */}
        <Button variant="outline" className="w-full border-[#43474C] bg-transparent font-semibold text-dark-text">
          {tryLabel}
        </Button>
        {/* v1.4: footnote 12px / 1.31 pitch / #84878B (B-cap 12 img px,
            pitch 22 img px); left edge aligns with title (no extra px-5). */}
        <div className="pt-2 text-left text-[12px] leading-[1.31] text-[#84878B]">{footnote}</div>
      </div>
    </div>
  );
}
