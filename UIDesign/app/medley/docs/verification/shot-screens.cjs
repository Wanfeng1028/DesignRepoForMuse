// Screenshot helper for this set only.
// The task names /opt/meta-chromium/chrome, but that binary refuses to
// start in this VM without the image-owned WebGL policy supplied by
// browser-daemon ("Hatch WebGL domain policy is required for browser
// startup", exit 13, both via CLI and via Playwright). The fallback used
// here is Playwright's own stock Chromium headless shell
// (~/.cache/ms-playwright/chromium_headless_shell-1243), same Blink
// family, with --allow-file-access-from-files so the file:// build (base
// './') loads its ES modules. Viewport is exactly 390x844; each screen
// renders via ?screen=<id> (see src/App.tsx, scaled 0.9906 so the 852px
// phone frame fits the 844px window without cropping).
const { execFileSync } = require('child_process')
const path = require('path')

const IDS = ['welcome-dark','home-light-en','home-light-cn','chat-dark-lisbon-en','chat-dark-lisbon-cn','chat-light-train-en','chat-light-savings-en','chat-dark-kyoto-en','chat-light-router-en','chat-info-sheet','search-drawer-dark','model-picker-a','model-picker-b','pricing-dark','credits-light','suspended-light','agent-team-dark','language-light']
const SHELL = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-linux/headless_shell'

function main() {
  // Default: framed shots into this dir (existing behaviour).
  // Bare mode: node shot-screens.cjs --bare <outdir> [screen-id]
  // writes frameless verification shots (?screen=<id>&bare=1) for Q8.
  const args = process.argv.slice(2)
  const bare = args.includes('--bare')
  const rest = args.filter((a) => a !== '--bare')
  const outDir = bare ? path.resolve(__dirname, rest[0] || 'rounds/v1.5') : __dirname
  const only = bare ? rest[1] : rest[0]
  const dist = path.resolve(__dirname, '../../dist/index.html')
  const ids = only ? [only] : IDS
  for (const id of ids) {
    const url = 'file://' + dist + '?screen=' + id + (bare ? '&bare=1' : '')
    execFileSync(SHELL, ['--headless','--disable-gpu','--no-sandbox','--allow-file-access-from-files','--hide-scrollbars','--window-size=390,844','--virtual-time-budget=8000','--screenshot=' + path.join(outDir, id + '.png'), url], { stdio: 'ignore' })
    console.log('shot', id)
  }
}
main()
