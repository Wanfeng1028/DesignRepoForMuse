const { chromium } = require('/home/hatch/workspace/muse-build/shot/node_modules/playwright-core');
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const BASE = 'file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/dist/index.html';
const VIDEO_DIR = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/rounds/v1.11/video';
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
  // 1) sheet open/close
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, recordVideo: { dir: VIDEO_DIR, size: { width: 390, height: 844 } } });
    const page = await ctx.newPage();
    await page.goto(BASE + '?screen=detail');
    await page.waitForTimeout(800);
    await harness(page);
    await page.waitForTimeout(1200); // entrance spring visible
    const handle = page.locator('div').filter({ hasText: '' }).first(); // placeholder, replaced below
    // find handle: the sheet's top grip element (4px bar) - locate via detail panel container
    const grip = await page.evaluate(() => {
      const els = [...document.querySelectorAll('span')];
      const bar = els.find(el => el.offsetHeight === 4 && el.offsetWidth === 40);
      if (!bar) return null;
      const r = bar.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    console.log('grip:', JSON.stringify(grip));
    await page.mouse.move(grip.x, grip.y);
    await page.mouse.down();
    await page.waitForTimeout(300); // let React dragging state flip
    await page.mouse.move(grip.x, grip.y + 60, { steps: 12 });
    await page.waitForTimeout(200);
    await page.mouse.move(grip.x, grip.y + 160, { steps: 12 });
    await page.waitForTimeout(200);
    await page.mouse.up();
    await page.waitForTimeout(1200); // dismiss 350ms + onDismiss
    const sheetState = await page.evaluate(() => {
      const sec = document.querySelector('section');
      return sec ? { transform: getComputedStyle(sec).transform, rectY: sec.getBoundingClientRect().y } : 'no-section';
    });
    console.log('sheet after drag:', JSON.stringify(sheetState));
    const reopen = page.locator('button', { hasText: 'Show detail panel' });
    await reopen.click();
    await page.waitForTimeout(1200); // re-entrance spring
    const done = page.locator('button').filter({ has: page.locator('svg') }).first();
    await done.click();
    await page.waitForTimeout(800);
    await ctx.close();
    console.log('sheet video done');
  }
  // 2) send message
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, recordVideo: { dir: VIDEO_DIR, size: { width: 390, height: 844 } } });
    const page = await ctx.newPage();
    await page.goto(BASE + '?screen=briefing');
    await page.waitForTimeout(800);
    await harness(page);
    const input = page.locator('input[placeholder="Message"]');
    await input.click();
    await input.fill('Any updates on Hands Time?');
    await page.waitForTimeout(300);
    const sendBtn = page.locator('button').filter({ has: page.locator('svg') }).last();
    await sendBtn.click();
    await page.waitForTimeout(2500); // typing 1200ms + reply in + scroll
    await ctx.close();
    console.log('send video done');
  }
  // 3) push/pop
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, recordVideo: { dir: VIDEO_DIR, size: { width: 390, height: 844 } } });
    const page = await ctx.newPage();
    await page.goto(BASE + '?screen=home');
    await page.waitForTimeout(800);
    await harness(page);
    const tile = page.locator('button[aria-label^="Open"]').first();
    await tile.click();
    await page.waitForTimeout(1000); // push 400ms + settle
    const back = page.locator('button').first();
    await back.click();
    await page.waitForTimeout(1000); // pop 400ms + settle
    await ctx.close();
    console.log('push-pop video done');
  }
  // 4) pager swipe (wheel horizontal scroll + snap)
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, recordVideo: { dir: VIDEO_DIR, size: { width: 390, height: 844 } } });
    const page = await ctx.newPage();
    await page.goto(BASE + '?screen=briefing');
    await page.waitForTimeout(800);
    await harness(page);
    const pagerPos = await page.evaluate(() => {
      const el = document.querySelector('.ab-pager');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2, sl0: el.scrollLeft };
    });
    console.log('pager:', JSON.stringify(pagerPos));
    await page.mouse.move(pagerPos.x, pagerPos.y);
    await page.mouse.wheel(240, 0);
    await page.waitForTimeout(1200);
    const sl1 = await page.evaluate(() => document.querySelector('.ab-pager').scrollLeft);
    console.log('pager scrollLeft after wheel:', sl1);
    await page.mouse.wheel(-240, 0);
    await page.waitForTimeout(1200);
    const sl2 = await page.evaluate(() => document.querySelector('.ab-pager').scrollLeft);
    console.log('pager scrollLeft after back:', sl2);
    await ctx.close();
    console.log('pager video done');
  }
  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });
