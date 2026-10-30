const { chromium } = require('/home/hatch/workspace/muse-build/shot/node_modules/playwright-core');
const http = require('http'); const fs = require('fs'); const path = require('path');
const DIST = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/dist';
const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = urlPath === '/' ? 'index.html' : urlPath.replace(/^\//, '');
  const full = path.join(DIST, file);
  if (!full.startsWith(DIST) || !fs.existsSync(full)) { res.writeHead(404); res.end('nf'); return; }
  const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
  res.writeHead(200, { 'Content-Type': MIME[path.extname(full)] || 'application/octet-stream' }); fs.createReadStream(full).pipe(res);
});
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const browser = await chromium.launch({ executablePath: process.env.PW_CHROME, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  await p.goto('http://localhost:' + port + '/?screen=briefing', { waitUntil: 'networkidle', timeout: 20000 });
  await p.waitForTimeout(800);
  const data = await p.evaluate(() => {
    const out = [];
    document.querySelectorAll('section, div').forEach((el) => {
      const t = (el.textContent || '');
      if (t.includes('Hands Time led the growth') && el.className.includes('relative')) {
        const r = el.getBoundingClientRect(); out.push({ card: 'airDaily?', x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) });
      }
    });
    // cards row: the flex row containing both cards
    const rows = [...document.querySelectorAll('div')].filter(el => el.className.includes('flex gap-3 overflow-hidden'));
    rows.forEach((el) => { const r = el.getBoundingClientRect(); out.push({ row: 'cardsRow', x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }); });
    // second bare message bubble
    document.querySelectorAll('div').forEach((el) => {
      if ((el.textContent || '').startsWith('Check Mood')) { const r = el.getBoundingClientRect(); out.push({ secondMsg: true, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), bottom: Math.round(r.bottom) }); }
    });
    // composer top
    const comp = document.querySelector('input')?.closest('div');
    return out;
  });
  console.log(JSON.stringify(data, null, 1));
  await browser.close(); server.close();
})().catch(e => { console.error(e.message); process.exit(1); });
