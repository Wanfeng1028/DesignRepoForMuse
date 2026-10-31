const { chromium } = require('playwright-core');
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 430, height: 920 } });
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/docs/verification/rounds/v1.9/measure/glow-identity.html');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/docs/verification/rounds/v1.9/measure/glow-identity.png', clip: { x: 0, y: 0, width: 390, height: 852 } });
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
