// v1.7 interaction videos (Playwright video .webm). Three clips, one per behavior.
// Usage: node video-v17.cjs <outdir>
const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const BASE = 'file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/dist/index.html';
async function optical(page) {
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach(el => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) {
        el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
      }
    });
  });
  await page.waitForTimeout(500);
}
async function setup(browser, outdir, name) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, recordVideo: { dir: path.join(outdir, 'raw'), size: { width: 1280, height: 800 } } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  await optical(page);
  await page.locator('[data-window="main"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  return { ctx, page, name };
}
async function finish(rec, outdir) {
  const vpath = await rec.page.video().path();
  await rec.ctx.close();
  const dest = path.join(outdir, rec.name + '.webm');
  fs.renameSync(vpath, dest);
  console.log('video', rec.name, fs.statSync(dest).size, 'bytes');
}
(async () => {
  const outdir = process.argv[2];
  fs.mkdirSync(path.join(outdir, 'raw'), { recursive: true });
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const M = '[data-window="main"] ';
  let rec = await setup(browser, outdir, 'drawer-collapse');
  await rec.page.locator(M + '.ab-traffic-light').first().hover(); await rec.page.waitForTimeout(600);
  await rec.page.locator(M + 'button[aria-label="Toggle left sidebar"]').click(); await rec.page.waitForTimeout(700);
  await rec.page.locator(M + 'button[aria-label="Toggle left sidebar"]').click(); await rec.page.waitForTimeout(700);
  await rec.page.locator(M + 'button[aria-label="Toggle preview"]').first().click(); await rec.page.waitForTimeout(700);
  await rec.page.locator(M + 'button[aria-label="Toggle preview"]').first().click(); await rec.page.waitForTimeout(700);
  await finish(rec, outdir);
  rec = await setup(browser, outdir, 'send-message');
  await rec.page.locator(M + '.ab-followup-input').click(); await rec.page.waitForTimeout(300);
  await rec.page.locator(M + '.ab-followup-input').fill('Hello AirBuild'); await rec.page.waitForTimeout(500);
  await rec.page.locator(M + 'button[aria-label="Send"]').click(); await rec.page.waitForTimeout(2600);
  await finish(rec, outdir);
  rec = await setup(browser, outdir, 'tabs-sessions');
  await rec.page.locator(M + 'button[aria-label="Open new preview tab"]').click(); await rec.page.waitForTimeout(700);
  await rec.page.locator(M + 'button[role="tab"]').first().click(); await rec.page.waitForTimeout(700);
  await rec.page.locator(M + 'button[aria-label="Open Hands Time"]').click(); await rec.page.waitForTimeout(800);
  await rec.page.locator(M + 'button[aria-label="Open Hourtown"]').click(); await rec.page.waitForTimeout(800);
  await finish(rec, outdir);
  fs.rmSync(path.join(outdir, 'raw'), { recursive: true, force: true });
  await browser.close();
})().catch((e) => { console.error('VIDEO-FAIL', e.message); process.exit(1); });
