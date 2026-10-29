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
    darkBg: "#121316",
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
    blackBtn: "#111214",
    whiteBtn: "#FFFFFF",
    chartAmber: "#8C553C",
    userBubbleDark: "#191A1E",
    userBubbleLight: "#EDEEF0",
    modelClaude: "#B0703C",
    modelGlm: "#C65D7B",
    modelKimi: "#9A9A3E",
    modelDeepseek: "#5B8A99",
    modelGpt: "#3FA34D",
  },
  font: {
    family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Noto Sans SC', sans-serif",
    welcomeTitle: 38,
    greeting: 27,
    pageTitle: 20,
    sectionTitle: 16,
    body: 16,
    listItem: 15,
    secondary: 13,
    caption: 12,
    hugeNumber: 44,
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
