// Stem-weight probe shots (v1.7): reference weight renders + live gallery titles,
// all at deviceScaleFactor 3, SF Pro Display (harness optical override on live page).
// Usage: node stem-shoot.cjs <outdir>
const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
async function glyphBox(page, sel, idx) {
  return page.evaluate(([sel, idx]) => {
    const el = document.querySelector(sel);
    const node = el.firstChild;
    const r = document.createRange();
    r.setStart(node, idx); r.setEnd(node, idx + 1);
    const rect = r.getClientRects()[0];
    const er = el.getBoundingClientRect();
    return { x: rect.x - er.x, w: rect.width, elW: er.width, elH: er.height };
  }, [sel, idx]);
}
(async () => {
  const outdir = process.argv[2];
  fs.mkdirSync(outdir, { recursive: true });
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 3 });
  const page = await ctx.newPage();
  const meta = {};
  const probe = 'file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/docs/verification/rounds/v1.7/probes/stem-probe.html';
  await page.goto(probe, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);
  for (const id of ['h1-600', 'h1-700', 'h1-800', 'h2-600', 'h2-700', 'h2-800', 'H-600', 'H-700', 'H-800']) {
    const box = await glyphBox(page, '#' + id, id.startsWith('h2') ? 11 : id.startsWith('H') ? 0 : 3);
    const cap = id.startsWith('h2') ? await glyphBox(page, '#' + id, 4) : null;
    await page.locator('#' + id).screenshot({ path: path.join(outdir, id + '.png') });
    meta[id] = { glyph: box, cap: cap };
  }
  const live = 'file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/dist/index.html';
  await page.goto(live, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach(el => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.fontSize) >= 20 && el.children.length === 0 && el.textContent.trim()) {
        el.style.fontFamily = '"SF Pro Display", "SF Pro Text", sans-serif';
      }
    });
  });
  await page.waitForTimeout(500);
  const h1box = await glyphBox(page, 'h1', 3);
  const h2box = await glyphBox(page, 'section h2', 11);
  const h2cap = await glyphBox(page, 'section h2', 4);
  await page.locator('h1').screenshot({ path: path.join(outdir, 'live-h1.png') });
  await page.locator('section h2').first().screenshot({ path: path.join(outdir, 'live-h2.png') });
  meta.liveH1 = { glyph: h1box, cap: null };
  meta.liveH2 = { glyph: h2box, cap: h2cap };
  fs.writeFileSync(path.join(outdir, 'stem-meta.json'), JSON.stringify(meta, null, 2));
  await browser.close();
  console.log('stem shots done');
})().catch((e) => { console.error('STEM-FAIL', e.message); process.exit(1); });
