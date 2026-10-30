const { chromium } = require('/home/hatch/workspace/muse-build/shot/node_modules/playwright-core');
const http = require('http');
const fs = require('fs');
const path = require('path');
const DIST = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/dist';
const server = http.createServer((req, res) => {
  const f = req.url === '/' ? 'index.html' : req.url.replace(/^\//, '');
  const full = path.join(DIST, f);
  if (!fs.existsSync(full)) { res.writeHead(404); res.end('nf'); return; }
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.createReadStream(full).pipe(res);
});
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const browser = await chromium.launch({ executablePath: process.env.PW_CHROME, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  await p.goto('http://localhost:' + port + '/?screen=briefing', { waitUntil: 'networkidle', timeout: 20000 });
  await p.waitForTimeout(800);
  const info = await p.evaluate(() => {
    const out = {};
    const inner = document.querySelector('main') || document.body;
    const kids = Array.from(document.querySelectorAll('body *')).filter(el => el.children.length === 0 || el.tagName === 'HEADER' || el.tagName === 'SECTION');
    const rect = (el) => { const r = el.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.bottom), Math.round(r.height)]; };
    out.viewport = [window.innerWidth, window.innerHeight];
    // find by text
    const all = Array.from(document.querySelectorAll('p, h3, div, header, section'));
    const find = (t) => all.find(el => el.textContent && el.textContent.trim().startsWith(t));
    for (const [k, t] of [['msg1', 'Your daily report'], ['msg2', 'Check Mood'], ['composer', 'Any updates'], ['topbar', 'Ato']]) {
      const el = find(t);
      if (el) out[k] = rect(el);
    }
    const cards = document.querySelectorAll('[class*="overflow-hidden"]');
    out.cardsRow = null;
    const row = Array.from(document.querySelectorAll('div')).find(el => el.className.includes('overflow-hidden') && el.textContent.includes('Made in airbuild'));
    if (row) out.cardsRow = rect(row);
    const firstCard = Array.from(document.querySelectorAll('div')).find(el => el.textContent.includes('At a glance'));
    if (firstCard) out.firstCardApprox = rect(firstCard);
    return out;
  });
  console.log(JSON.stringify(info, null, 1));
  await browser.close(); server.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
