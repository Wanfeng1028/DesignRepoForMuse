
import { chromium } from '/home/hatch/workspace/muse-build/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
const OUT = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/docs/verification/rounds/v1.7';
const IDS = ['welcome-dark'];
const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
for (const id of IDS) {
  await page.goto(`http://localhost:5201/?screen=${id}&bare=1`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${id}.png` });
  console.log('shot', id);
}
await browser.close();
