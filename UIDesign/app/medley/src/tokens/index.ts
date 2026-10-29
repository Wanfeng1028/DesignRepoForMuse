/**
 * Medley mobile tokens. Every value is copied from
 * ../../muse/DESIGN-TOKENS.md (173 measured lines); the Tailwind v4
 * @theme variables in src/index.css are the same values in CSS form.
 * Keep the two files in sync; do not invent a new value here.
 * Provenance notes: [measured] = PIL pixel sampling, [visual] = scaled
 * from the collage, [approx] = small-dot colour sampling, precision not
 * claimable. See README "Residual" for what stays unresolved.
 */
export const tokens = {
  colors: {
    darkBg: '#121316',
    darkCard: '#1e1f23',
    darkInput: '#1f2024',
    userBubbleDark: '#191a1e', // measured
    darkRow: '#2f3034',
    darkDivider: '#2a2c31', // visual
    darkText: '#f5f5f7', // visual (JPEG stroke blending)
    darkSub: '#9a9ba2', // visual
    darkDim: '#6b6c72', // visual
    lightBg: '#f5f6f8', // measured
    lightCard: '#ffffff',
    lightDivider: '#e6e7ea', // visual
    lightText: '#17181c', // visual
    lightSub: '#6b6c72', // visual
    lightDim: '#9a9ba2', // visual
    lightBubble: '#edeef0', // measured
    accent: '#e2a181', // measured (Lisbon mic centre), replaces old #e4754a
    brandDot: '#fd6718', // measured: welcome dot centre pixels (253,103,24); distinct from mic peach
    darkPill: '#303135', // measured: pricing Yearly pill sample (48,49,53)
    blackBtn: '#111214', // visual
    whiteBtn: '#ffffff',
    chartAmber: '#8c553c', // measured, replaces old #b07a3b
    modelClaude: '#b0703c', // approx
    modelGlm: '#c65d7b', // approx
    modelKimi: '#9a9a3e', // approx
    modelDeepseek: '#5b8a99', // approx
    modelGpt: '#3fa34d', // approx
  },
  font: {
    family:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Noto Sans SC', sans-serif",
    welcomeTitle: 38,
    greeting: 27,
    pageTitle: 20,
    sectionTitle: 16,
    body: 16,
    listItem: 15,
    secondary: 13,
    caption: 12,
    hugeNumber: 44,
    statusBar: 13, // measured: 10:24 cap height
  },
  spacing: { pagePadding: 20, sectionGap: 28, rowPaddingY: 14, cardGap: 12 },
  radius: { input: 26, button: 26, bubble: 20, card: 16, sheet: 24, chip: 20, phone: 44 },
  phone: { width: 390, height: 852 },
  // Measured interaction facts carried over verbatim:
  savingsSliderFill: { monthly: '16%', yearly: '44%' },
  agentTeam: { credits: '1,240 of 6,000', step: 'Step 3 of 8', progress: '20%' },
  credits: { total: '12,480', byModel: { glmMessages: 590, deepseekAmount: '4,620' } },
} as const

export type Tokens = typeof tokens

export function modelDotColor(model: string): string {
  if (model.includes('GLM')) return tokens.colors.modelGlm
  if (model.includes('DeepSeek')) return tokens.colors.modelDeepseek
  if (model.includes('Claude')) return tokens.colors.modelClaude
  if (model.includes('Kimi')) return tokens.colors.modelKimi
  if (model.includes('GPT')) return tokens.colors.modelGpt
  return tokens.colors.accent
}

/** Savings curve: $200/month, 6%/yr, monthly compounding, 30 samples. FV(15y)=58,163.7 ~ $58,164. */
export function savingsCurvePoints(): string {
  const pts: string[] = []
  for (let i = 0; i < 30; i++) {
    const years = (i / 29) * 15
    const n = Math.round(years * 12)
    const r = 0.06 / 12
    const fv = n === 0 ? 0 : 200 * ((Math.pow(1 + r, n) - 1) / r)
    const x = (i / 29) * 278
    const y = 104 - (fv / 60000) * (104 - 10)
    pts.push(`${i === 0 ? 'M0 104' : `L${x.toFixed(1)} ${y.toFixed(1)}`}`)
  }
  return pts.join(' ')
}
