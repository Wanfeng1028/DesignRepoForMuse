const { chromium } = require('/home/hatch/workspace/muse-build/shot/node_modules/playwright-core');
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const BASE = 'file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/dist/index.html';
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-blink-features=AutomationControlled'] });
  const out = [];
  // 1) briefing send button press (need text so send is active; type first)
  let page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await page.goto(BASE + '?screen=briefing');
  await page.waitForTimeout(1200);
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach(el => {
      if (el.children.length === 0 && el.textContent.trim()) {
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs >= 20) el.style.fontFamily = '"SF Pro Display", sans-serif';
      }
    });
  });
  await page.waitForTimeout(500);
  const input = page.locator('input[placeholder*="Message"], input[type="text"]').first();
  await input.click();
  await input.fill('hello');
  await page.waitForTimeout(200);
  const sendBtn = page.locator('button').filter({ has: page.locator('svg') }).last();
  const box = await sendBtn.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(150);
  const down = await sendBtn.evaluate(el => { const s = getComputedStyle(el); return { transform: s.transform, opacity: s.opacity }; });
  await page.mouse.up();
  await page.waitForTimeout(500);
  const up = await sendBtn.evaluate(el => { const s = getComputedStyle(el); return { transform: s.transform, opacity: s.opacity }; });
  out.push(`briefing send press: down transform=${down.transform} opacity=${down.opacity} | up transform=${up.transform} opacity=${up.opacity}`);
  await page.close();
  // 2) chat back chevron press
  page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await page.goto(BASE + '?screen=chat');
  await page.waitForTimeout(1200);
  const backBtn = page.locator('button').first();
  const bb = await backBtn.boundingBox();
  await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(150);
  const down2 = await backBtn.evaluate(el => { const s = getComputedStyle(el); return { transform: s.transform, opacity: s.opacity }; });
  await page.mouse.up();
  await page.waitForTimeout(500);
  const up2 = await backBtn.evaluate(el => { const s = getComputedStyle(el); return { transform: s.transform, opacity: s.opacity }; });
  out.push(`chat back press: down transform=${down2.transform} opacity=${down2.opacity} | up transform=${up2.transform} opacity=${up2.opacity}`);
  await page.close();
  // 3) draft Download button press
  page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await page.goto(BASE + '?screen=draft');
  await page.waitForTimeout(1200);
  const dlBtn = page.locator('button', { hasText: 'Download' }).first();
  const db = await dlBtn.boundingBox();
  await page.mouse.move(db.x + db.width / 2, db.y + db.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(150);
  const down3 = await dlBtn.evaluate(el => { const s = getComputedStyle(el); return { transform: s.transform, opacity: s.opacity }; });
  await page.mouse.up();
  await page.waitForTimeout(500);
  const up3 = await dlBtn.evaluate(el => { const s = getComputedStyle(el); return { transform: s.transform, opacity: s.opacity }; });
  out.push(`draft Download press: down transform=${down3.transform} opacity=${down3.opacity} | up transform=${up3.transform} opacity=${up3.opacity}`);
  await page.close();
  // 4) reduced-motion: briefing send completes with zero delay + no transitions
  page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await page.goto(BASE + '?screen=briefing');
  await page.waitForTimeout(1200);
  const rmCheck = await page.evaluate(() => {
    const btn = document.querySelector('button');
    const s = btn ? getComputedStyle(btn).transition : 'no-button';
    const msg = document.querySelector('.ab-message-in');
    return { btnTransition: s, hasMessageInClass: !!msg };
  });
  const input2 = page.locator('input[placeholder*="Message"], input[type="text"]').first();
  await input2.click();
  await input2.fill('reduced motion test');
  const t0 = Date.now();
  const sendBtn2 = page.locator('button').filter({ has: page.locator('svg') }).last();
  await sendBtn2.click();
  await page.waitForTimeout(300);
  const after = await page.evaluate(() => ({
    hasUserMsg: document.body.innerText.includes('reduced motion test'),
    hasTyping: document.querySelectorAll('.ab-typing-dot').length > 0,
    hasAgentReply: document.body.innerText.includes('Hands Time is still leading'),
    msgIn: document.querySelectorAll('.ab-message-in').length
  }));
  out.push(`reduced-motion: btnTransition=${rmCheck.btnTransition} | send+300ms userMsg=${after.hasUserMsg} typing=${after.hasTyping} agentReply=${after.hasAgentReply} (expect: userMsg true, agentReply true with 0 delay)`);
  await page.close();
  await browser.close();
  console.log(out.join('\n'));
})().catch(e => { console.error(e.message); process.exit(1); });
