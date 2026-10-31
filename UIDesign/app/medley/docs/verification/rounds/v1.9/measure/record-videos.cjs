const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const VDIR = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/docs/verification/rounds/v1.9/video';
const DIST = 'file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html';
async function applyDisplayOverride(page) {
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach((el) => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) {
        el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
      }
    });
  });
}
async function clip(browser, name, screen, actions, totalMs) {
  const ctx = await browser.newContext({
    viewport: { width: 430, height: 920 },
    recordVideo: { dir: VDIR, size: { width: 430, height: 920 } },
  });
  const page = await ctx.newPage();
  await page.goto(`${DIST}?screen=${screen}`);
  await applyDisplayOverride(page);
  await actions(page);
  await page.waitForTimeout(totalMs);
  const vpath = await page.video().path();
  await ctx.close();
  const target = path.join(VDIR, name);
  fs.renameSync(vpath, target);
  console.log(`${name}: ${fs.statSync(target).size} bytes`);
}
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--allow-file-access-from-files'] });
  // 1. title rotation: 7.5s catches the 5000ms replay + cursor blink
  await clip(browser, 'title-rotation.webm', 'welcome-dark', async () => {}, 7500);
  // 2. sheet open/close: mount enter -> dismiss via handle -> reopen
  await clip(browser, 'sheet-open-close.webm', 'model-picker-a', async (page) => {
    await page.waitForTimeout(1200);
    await page.click('[data-testid="sheet-handle"]');
    await page.waitForTimeout(1000);
    await page.click('[data-testid="reopen-sheet"]');
  }, 1500);
  // 3. send message: type -> send -> thinking (900ms) -> streaming
  await clip(browser, 'send-message.webm', 'chat-dark-lisbon-en', async (page) => {
    await page.waitForTimeout(1200);
    await page.click('[data-testid="chat-composer"]');
    await page.type('[data-testid="chat-composer"]', 'Hello Medley', { delay: 60 });
    await page.click('[data-testid="composer-send"]');
    await page.waitForTimeout(2000);
  }, 1200);
  // 4. tab switch: Agents -> back to Chat
  await clip(browser, 'tab-switch.webm', 'home-light-cn', async (page) => {
    await page.waitForTimeout(1200);
    await page.getByRole('tab', { name: '智能体' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('tab', { name: '聊天' }).click();
  }, 1200);
  await browser.close();
  console.log('done');
})().catch((e) => { console.error(e); process.exit(1); });
