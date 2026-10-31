import { BrandDots } from "./medley-mark";
import { tokens } from "../tokens";
import { Button } from "./ui/button";
import { glassChromeStyle } from "./liquid-glass";

/**
 * Dark welcome panel, photo-9 state (v1.5): dot-cluster mark + "Medley"
 * wordmark, 41px "Let's discover" headline with the SAPPHIRE glowing
 * cursor dot, sub-lines, white Google CTA and the outlined "Try without
 * an account" button, plus the 18+ terms footnote.
 * Ambient light (measured, not a flat fill): blue halo upper-right,
 * warm brown-orange glow lower-left, green glow lower-right, over the
 * #0D0E10 base. Old-capture flat #111518 + orange dot is a different
 * state, recorded in the CHANGELOG, not averaged in.
 * Rotation behaviour (photo-9 footnote): the headline rotates through
 * sentences and the cursor stays sapphire; the static render shows the
 * captured "Let's discover" + sapphire state and does not fake rotation.
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
    <div
      className="flex flex-col text-dark-text px-5 py-3 min-h-[480px]"
      style={{
        background: [
          "radial-gradient(300px circle at 88% 42%, rgba(64,102,150,0.46), transparent 100%)",
          "radial-gradient(280px circle at 16% 76%, rgba(116,66,46,0.62), transparent 100%)",
          "radial-gradient(320px circle at 92% 108%, rgba(52,110,95,0.90), transparent 70%)",
          tokens.colors.welcomeBase,
        ].join(", "),
      }}
    >
      <div className="flex items-center gap-2 pt-0">
        <BrandDots />
        <span className="text-[19px] font-bold">Medley</span>
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-baseline gap-2">
          <span className="text-welcome-title font-bold leading-[1.15]">Let&apos;s discover</span>
          {/* v1.5: sapphire glowing cursor (photo-9 core #B4D3EF at
              (526,612), edge #2E7CE6 estimate). 16px kept from v1.4. */}
          <span
            className="h-4 w-4 shrink-0 self-center rounded-full"
            style={{
              background: `radial-gradient(circle at 35% 30%, #E4F2FF 0%, ${tokens.colors.welcomeCursorCore} 30%, ${tokens.colors.welcomeDot} 78%)`,
              boxShadow: "0 0 14px rgba(46,124,230,0.55)",
            }}
          />
        </div>
        <div className="mt-3 text-body text-[#B0B4B6]">{tagline}</div>
        <div className="mt-1.5 text-[14px] text-[#8E9295]">{modelLine}</div>
      </div>
      <div className="flex flex-col gap-2 pb-4">
        {/* v1.4: Google fill measured #EDEEF2 (237,238,242); G disc is a
            plain white 20px disc with no grey ring (sharp 236->254 edge). */}
        <Button className="w-full bg-[#EDEEF2] glass-rim">
          <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white text-[13px] font-extrabold">
            G
          </span>
          {googleLabel}
        </Button>
        {/* v1.4: Try button is a transparent outline pill (interior = panel
            bg exactly), 1px border ~#43474C; v1.3 filled-pill form was wrong. */}
        <Button variant="outline" style={glassChromeStyle} className="w-full border-[#43474C] bg-transparent font-semibold text-dark-text glass-rim-dark">
          {tryLabel}
        </Button>
        {/* v1.4: footnote 12px / 1.31 pitch / #84878B (B-cap 12 img px,
            pitch 22 img px); left edge aligns with title (no extra px-5). */}
        <div className="pt-2 text-left text-[12px] leading-[1.31] text-[#84878B]">{footnote}</div>
      </div>
    </div>
  );
}
