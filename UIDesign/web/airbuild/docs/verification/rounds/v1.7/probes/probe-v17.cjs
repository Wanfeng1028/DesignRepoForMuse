// v1.7 interaction probe: DOM/computed measurements for every interaction item.
// Same browser + file:// method as v1.6; harness optical override only.
// Usage: node probe-v17.cjs <outtxt>
const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
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
const out = [];
const log = (s) => { out.push(s); console.log(s); };
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  await optical(page);
  const main = page.locator('[data-window="main"]');
  await main.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const cs = async (sel, props) => page.evaluate(([sel, props]) => {
    const el = document.querySelector(sel);
    const c = getComputedStyle(el);
    const r = {}; for (const p of props) r[p] = c[p];
    const b = el.getBoundingClientRect(); r._rect = [Math.round(b.width), Math.round(b.height)];
    return r;
  }, [sel, props]);
  const mainSel = (inner) => `[data-window="main"] ${inner}`;
  log('scrollTop at load: ' + await page.evaluate(() => document.querySelector('[data-window="main"] .ab-scroll').scrollTop));
  // 1. window geometry
  log('window rect: ' + JSON.stringify(await cs('[data-window="main"] .ab-window', ['width', 'height'])));
  log('drawer transition: ' + JSON.stringify(await cs(mainSel('.ab-drawer'), ['transitionDuration', 'transitionTimingFunction', 'gridTemplateColumns'])));
  // 2. traffic lights: idle glyph 0, hover glyph 1 + scale
  const tl = page.locator(mainSel('.ab-traffic-light')).first();
  log('traffic glyph idle opacity: ' + await page.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] .ab-traffic-glyph')).opacity));
  await tl.hover(); await page.waitForTimeout(800);
  log('traffic glyph hover opacity: ' + await page.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] .ab-traffic-glyph')).opacity));
  log('traffic light hover transform: ' + await page.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] .ab-traffic-light')).transform));
  await page.mouse.move(0, 0); await page.waitForTimeout(200);
  // 3. send disabled empty -> enabled typed
  const sendBtn = page.locator(mainSel('button[aria-label="Send"]'));
  log('send empty disabled: ' + await sendBtn.isDisabled() + ' opacity: ' + await page.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] button[aria-label="Send"]')).opacity));
  const input = page.locator(mainSel('.ab-followup-input'));
  await input.click(); await input.fill('Hello AirBuild');
  log('send typed disabled: ' + await sendBtn.isDisabled() + ' opacity: ' + await page.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] button[aria-label="Send"]')).opacity));
  // 4. press states (mouse.down -> computed transform). Shell lag note:
  // on this heavy backdrop-blur page the headless shell runs transitions
  // slower than nominal (120ms rule reads identity at 150ms, 0.96 at 400ms+),
  // so press reads wait 800ms, same lesson as v1.6 R25.
  async function pressTransform(locator, selEval) {
    const box = await locator.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.waitForTimeout(200);
    await page.mouse.down(); await page.waitForTimeout(800);
    const t = await page.evaluate((s) => getComputedStyle(document.querySelector(s)).transform, selEval);
    await page.mouse.up(); await page.waitForTimeout(800);
    return t;
  }
  async function moveTo(locator) {
    const box = await locator.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.waitForTimeout(800);
  }
  async function clickAt(locator) {
    const box = await locator.boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2); await page.waitForTimeout(300);
  }
  log('press send transform: ' + await pressTransform(sendBtn, '[data-window="main"] button[aria-label="Send"]'));
  log('press capsule transform: ' + await pressTransform(page.locator(mainSel('button[aria-label="Create a new project"]')), '[data-window="main"] button[aria-label="Create a new project"]'));
  log('press tile transform: ' + await pressTransform(page.locator(mainSel('button[aria-label="Open Hands Time"]')), '[data-window="main"] button[aria-label="Open Hands Time"]'));
  await clickAt(page.locator(mainSel('button[aria-label="Open Hourtown"]'))); await page.waitForTimeout(400);
  // 5. tile hover bg (800ms wait, R25 lesson) + active border after switch
  const tile = page.locator(mainSel('button[aria-label="Open Hands Time"]'));
  await moveTo(tile);
  log('tile hover bg: ' + await page.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] button[aria-label="Open Hands Time"]')).backgroundColor));
  // 6. project switch push
  await clickAt(tile); await page.waitForTimeout(80);
  log('push animation: ' + await page.evaluate(() => { const el = document.querySelector('[data-window="main"] .ab-push-in'); const c = getComputedStyle(el); return c.animationName + ' ' + c.animationDuration + ' ' + c.animationTimingFunction; }));
  log('current project btn: ' + await page.locator(mainSel('button[aria-label^="Current project:"]')).getAttribute('aria-label'));
  log('active tile border: ' + await page.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] button[aria-label="Open Hands Time"]')).borderColor));
  await clickAt(page.locator(mainSel('button[aria-label="Open Hourtown"]'))); await page.waitForTimeout(400);
  log('back to project btn: ' + await page.locator(mainSel('button[aria-label^="Current project:"]')).getAttribute('aria-label'));
  // 7. device tab switch pane animation + new tab
  await clickAt(page.locator(mainSel('button[aria-label="Open new preview tab"]'))); await page.waitForTimeout(80);
  log('pane animation: ' + await page.evaluate(() => { const el = document.querySelector('[data-window="main"] .ab-pane-in'); const c = getComputedStyle(el); return c.animationName + ' ' + c.animationDuration + ' ' + c.animationTimingFunction; }));
  log('device tabs: ' + await page.evaluate(() => [...document.querySelectorAll('[data-window="main"] button[role="tab"]')].map((b) => b.textContent.trim() + ':' + b.getAttribute('aria-selected')).join(' | ')));
  const iosTab = page.locator(mainSel('button[role="tab"]')).first();
  await moveTo(iosTab);
  log('tab hover bg (inactive iOS tab now inactive): ' + await page.evaluate(() => getComputedStyle(document.querySelectorAll('[data-window="main"] button[role="tab"]')[0]).backgroundColor));
  await clickAt(iosTab); await page.waitForTimeout(300);
  log('device tabs after back: ' + await page.evaluate(() => [...document.querySelectorAll('[data-window="main"] button[role="tab"]')].map((b) => b.textContent.trim() + ':' + b.getAttribute('aria-selected')).join(' | ')));
  // 8. collapse toggles
  log('grid before collapse: ' + await page.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] .ab-drawer')).gridTemplateColumns));
  await clickAt(page.locator(mainSel('button[aria-label="Toggle left sidebar"]'))); await page.waitForTimeout(400);
  log('grid sidebar-collapsed: ' + await page.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] .ab-drawer')).gridTemplateColumns));
  await clickAt(page.locator(mainSel('button[aria-label="Toggle left sidebar"]'))); await page.waitForTimeout(400);
  log('grid restored: ' + await page.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] .ab-drawer')).gridTemplateColumns));
  await clickAt(page.locator(mainSel('button[aria-label="Toggle preview"]')).first()); await page.waitForTimeout(400);
  log('grid preview-collapsed: ' + await page.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] .ab-drawer')).gridTemplateColumns));
  await clickAt(page.locator(mainSel('button[aria-label="Toggle preview"]')).first()); await page.waitForTimeout(400);
  log('grid restored2: ' + await page.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] .ab-drawer')).gridTemplateColumns));
  // 9. scroll: overscroll + wheel moves scrollTop
  log('scroll overscroll: ' + await page.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] .ab-scroll')).overscrollBehavior));
  await page.evaluate(() => { document.querySelector('[data-window="main"] .ab-scroll').scrollTop = 0; });
  const st0 = await page.evaluate(() => document.querySelector('[data-window="main"] .ab-scroll').scrollTop);
  const sb = await page.locator(mainSel('.ab-scroll')).boundingBox();
  await page.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2);
  await page.mouse.wheel(0, 400); await page.waitForTimeout(400);
  const st1 = await page.evaluate(() => document.querySelector('[data-window="main"] .ab-scroll').scrollTop);
  log('scrollTop wheel: ' + st0 + ' -> ' + st1);
  // 10. send flow: user bubble + thinking + reply + scroll to bottom
  await input.click(); await input.fill('Hello AirBuild');
  await clickAt(sendBtn); await page.waitForTimeout(200);
  log('after send user bubble present: ' + await page.evaluate(() => [...document.querySelectorAll('[data-window="main"] .ab-user-bubble')].some((b) => b.textContent.includes('Hello AirBuild'))));
  log('thinking dots visible: ' + await page.evaluate(() => document.querySelectorAll('[data-window="main"] .ab-typing-dot').length));
  await page.waitForTimeout(1500);
  log('demo reply present: ' + await page.evaluate(() => [...document.querySelectorAll('[data-window="main"] .ab-agent-bubble')].some((b) => b.textContent.includes('fold that into the next pass'))));
  const st2 = await page.evaluate(() => { const el = document.querySelector('[data-window="main"] .ab-scroll'); return [el.scrollTop, el.scrollHeight - el.clientHeight]; });
  log('scroll after send (top, max): ' + JSON.stringify(st2));
  // 11. message-in + typing animation params
  log('message-in: ' + await page.evaluate(() => { const el = document.querySelector('[data-window="main"] .ab-message-in'); const c = getComputedStyle(el); return c.animationName + ' ' + c.animationDuration + ' ' + c.animationTimingFunction; }));
  log('typing dots after reply (expect 0, thinking replaced by reply): ' + await page.evaluate(() => document.querySelectorAll('[data-window="main"] .ab-typing-dot').length));
  // 12. focus-visible via keyboard
  await page.keyboard.press('Tab');
  let focusHit = 'none';
  for (let i = 0; i < 60; i++) {
    const hit = await page.evaluate(() => { const el = document.activeElement; if (!el) return null; const c = getComputedStyle(el); const ow = c.outlineWidth; const bs = c.boxShadow; if (ow === '2px' || (bs && bs.includes('rgb(25, 135, 247)'))) return (el.getAttribute('aria-label') || el.tagName) + ' outline=' + ow + ' shadow=' + bs; return null; });
    if (hit) { focusHit = hit; break; }
    await page.keyboard.press('Tab');
  }
  log('focus-visible hit: ' + focusHit);
  // 13. tiny labels + statusbar + composer + bubble typography
  log('H1: ' + JSON.stringify(await cs('h1', ['fontSize', 'fontWeight'])));
  log('H2: ' + JSON.stringify(await cs('section h2', ['fontSize', 'fontWeight'])));
  log('statusbar time: ' + await page.evaluate(() => { const el = document.querySelector('[data-window="main"] .ab-pane-in, [data-window="main"]'); return document.querySelectorAll('[data-window="main"] span')[0] ? 'n/a' : 'n/a'; }) + ' phone-time=' + await page.evaluate(() => [...document.querySelectorAll('[data-window="main"] span')].find((s) => s.textContent === '9:41') ? '9:41 present' : 'MISSING'));
  log('phone time weight: ' + await page.evaluate(() => { const s = [...document.querySelectorAll('span')].find((x) => x.textContent === '9:41'); return s ? getComputedStyle(s).fontWeight + ' ' + getComputedStyle(s).fontSize : 'missing'; }));
  log('tab label: ' + JSON.stringify(await cs(mainSel('button[role="tab"] strong'), ['fontSize', 'fontWeight'])));
  log('composer input: ' + JSON.stringify(await cs(mainSel('.ab-followup-input'), ['fontSize', 'lineHeight'])));
  log('agent bubble: ' + JSON.stringify(await cs(mainSel('.ab-agent-bubble'), ['fontSize', 'lineHeight'])));
  // 14. toast still renders
  log('toast: ' + await page.evaluate(() => { const t = document.querySelector('[data-window="main"] .ab-toast-in'); return t ? t.textContent : 'missing'; }));
  await ctx.close();
  // 15. reduced-motion context
  const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const p2 = await ctx2.newPage();
  await p2.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
  await p2.waitForTimeout(1200);
  log('reduced-motion message-in duration: ' + await p2.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] .ab-message-in')).animationDuration));
  log('reduced-motion drawer transition: ' + await p2.evaluate(() => getComputedStyle(document.querySelector('[data-window="main"] .ab-drawer')).transitionDuration));
  await browser.close();
  fs.writeFileSync(process.argv[2], out.join('\n') + '\n');
})().catch((e) => { console.error('PROBE-FAIL', e.message); process.exit(1); });
