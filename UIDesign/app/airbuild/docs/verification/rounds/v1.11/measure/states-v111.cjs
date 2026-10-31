const { chromium } = require('/home/hatch/workspace/muse-build/shot/node_modules/playwright-core');
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const BASE = 'file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/dist/index.html';
const OUT = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/rounds/v1.11/states';
async function harness(page) {
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach(el => {
      if (el.children.length === 0 && el.textContent.trim()) {
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs >= 20) el.style.fontFamily = '"SF Pro Display", sans-serif';
      }
    });
  });
  await page.waitForTimeout(500);
}
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  // briefing sent state
  let page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await page.goto(BASE + '?screen=briefing');
  await page.waitForTimeout(1200);
  await harness(page);
  const input = page.locator('input[placeholder="Message"]');
  await input.click();
  await input.fill('Any updates on Hands Time?');
  await page.locator('button').filter({ has: page.locator('svg') }).last().click();
  await page.waitForTimeout(2200);
  await page.screenshot({ path: OUT + '/briefing-sent.png' });
  await page.close();
  // detail reopened state
  page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await page.goto(BASE + '?screen=detail');
  await page.waitForTimeout(1200);
  await harness(page);
  await page.mouse.move(195, 62); await page.mouse.down(); await page.waitForTimeout(300);
  await page.mouse.move(195, 222, { steps: 12 }); await page.waitForTimeout(200); await page.mouse.up();
  await page.waitForTimeout(1200);
  await page.locator('button', { hasText: 'Show detail panel' }).click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: OUT + '/detail-reopened.png' });
  await page.close();
  // home after push-pop
  page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await page.goto(BASE + '?screen=home');
  await page.waitForTimeout(1200);
  await harness(page);
  await page.locator('button[aria-label^="Open"]').first().click();
  await page.waitForTimeout(1000);
  await page.locator('button').first().click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: OUT + '/home-after-push-pop.png' });
  await page.close();
  await browser.close();
  console.log('states done');
})().catch(e => { console.error(e.message); process.exit(1); });
