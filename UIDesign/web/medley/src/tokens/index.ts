/**
 * Medley design tokens, mirrored 1:1 from muse/DESIGN-TOKENS.md (173 measured
 * lines: colors, type, radii, spacing, slider fills, status-bar icons,
 * agent-team times, credits 1240/6000, savings compound curve).
 * The same values live as Tailwind v4 @theme variables in src/index.css;
 * this module is the typed TS mirror for components that need raw values
 * (SVG charts, sliders, progress bars).
 */
export const tokens = {
  colors: {
    darkBg: "#111518",
    darkCard: "#1E1F23",
    darkInput: "#1F2024",
    darkRow: "#2F3034",
    darkDivider: "#2A2C31",
    darkText: "#F5F5F7",
    darkSub: "#9A9BA2",
    darkDim: "#6B6C72",
    lightBg: "#F5F6F8",
    lightCard: "#FFFFFF",
    lightDivider: "#E6E7EA",
    lightText: "#17181C",
    lightSub: "#6B6C72",
    lightDim: "#9A9BA2",
    accent: "#E2A181",
    /** v1.3 accent split (Q12): one shared token painted four different
     * original colors, so each site now owns its token. Values are
     * measured, not copied from the shared token. */
    /** v1.5: welcome title cursor is SAPPHIRE in the photo-9 state
     * (glowing dot core #B4D3EF measured at (526,612); edge #2E7CE6 is
     * the hue-matched blur-corrected sapphire estimate). The v1.4
     * #FF6521 orange dot is the OLD capture's state, demoted, not averaged. */
    welcomeDot: "#2E7CE6",
    welcomeCursorCore: "#B4D3EF",
    /** v1.5: welcome panel base in the photo-9 state. Clean top-centre
     * median (13,14,16); the v1.4 #111518 is the old capture's flat bg. */
    welcomeBase: "#0D0E10",
    /** v1.5: brand dot cluster (photo-9 welcome header + home Auto pill):
     * three glossy balls on a rising diagonal, green low-left, steel-blue
     * mid, magenta high-right. Highlights are measured disc-centre peaks
     * (green (157,205,193), blue (175,196,213), pink (217,183,207));
     * bases are blur-corrected estimates, flagged as such. */
    brandDotGreen: { highlight: "#9DCDC1", base: "#2FA08C" },
    brandDotBlue: { highlight: "#AFC4D5", base: "#5B84A6" },
    brandDotPink: { highlight: "#D9B7CF", base: "#C65D7B" },
    /** v1.5: home light surface wash (photo-9 TR: #F5F6F8 at top cooling
     * to ~#D2E5E3 low on the screen). Light chat stays flat (photo-9 BR
     * reads flat ~#F5F4F9), so this gradient is home-only. */
    homeLightWash: ["#F5F6F8", "#EFF3F4", "#E1EBEC", "#D2E5E3", "#D9E7E7"],
    composerMicDark: "#D95E27",
    composerStop: "#DFA282",
    drawerRunningDot: "#FFFFFF",
    modelDotsFirst: "#E2A181",
    legendClaude: "#966955",
    legendGlm: "#916478",
    legendKimi: "#817D57",
    legendDeepseek: "#5F788C",
    blackBtn: "#111214",
    whiteBtn: "#FFFFFF",
    chartAmber: "#8C553C",
    userBubbleDark: "#1D242E",
    userBubbleLight: "#EDEEF0",
    modelClaude: "#B0703C",
    modelGlm: "#C65D7B",
    modelKimi: "#9A9A3E",
    /** v1.3 C6: Train DeepSeek dot is blue in the original, not teal-grey. */
    modelDeepseek: "#5F788C",
    modelGpt: "#3FA34D",
  },
  font: {
    family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Noto Sans SC', sans-serif",
    welcomeTitle: 41,
    greeting: 27,
    pageTitle: 20,
    sectionTitle: 16,
    body: 16,
    listItem: 15,
    secondary: 13,
    caption: 12,
    hugeNumber: 37,
    statusBar: 13,
  },
  spacing: {
    pagePadding: 20,
    sectionGap: 28,
    rowPaddingY: 14,
    cardGap: 12,
  },
  radius: {
    input: 26,
    button: 26,
    bubble: 20,
    card: 16,
    sheet: 24,
    chip: 20,
  },
  /** Measured slider fills from the savings screen (DESIGN-TOKENS.md sec. 8). */
  savingsSliderFill: { monthly: "16%", yearlyReturn: "44%" },
  /** Measured agent-team progress: fill x7..35 / track x7..148 = 20% (sec. 8). */
  agentTeamProgress: "20%",
  credits: { used: 1240, total: 6000 },
  /** Savings curve: $200/mo, 6%/yr, monthly compounding; FV(15y) = $58,164. */
  savings: { monthly: 200, yearlyReturn: 0.06, years: 15, finalBalance: 58164, putIn: 36000, growth: 22164 },
} as const;

export type Tokens = typeof tokens;

/** Model dot color by model-family name fragment (measured approximations). */
export function modelDotColor(model: string): string {
  const c = tokens.colors;
  if (/GLM/i.test(model)) return c.modelGlm;
  if (/DeepSeek/i.test(model)) return c.modelDeepseek;
  if (/Claude/i.test(model)) return c.modelClaude;
  if (/Kimi/i.test(model)) return c.modelKimi;
  if (/GPT/i.test(model)) return c.modelGpt;
  return c.accent;
}
