const { chromium } = require('/home/hatch/workspace/muse-build/shot/node_modules/playwright-core');
const http = require('http');
const fs = require('fs');
const path = require('path');
const DIST = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/dist';
const server = http.createServer((req, res) => {
  let f = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\//, '') || 'index.html';
  const full = path.join(DIST, f);
  if (!full.startsWith(DIST) || !fs.existsSync(full)) { res.writeHead(404); res.end('nf'); return; }
  const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' }; res.writeHead(200, { 'Content-Type': MIME[path.extname(full)] || 'application/octet-stream' });
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
  for (const t of ['Your daily report is ready', 'Check Mood', 'Hands Time led the growth', 'At a glance', 'Any updates on Hands Time', 'Performance', 'Discovery']) {
    const loc = p.getByText(t, { exact: false }).first();
    try { const bb = await loc.boundingBox({ timeout: 3000 }); console.log(t.slice(0, 28), '=>', bb ? [Math.round(bb.y), Math.round(bb.y + bb.height)] : 'null'); }
    catch (e) { console.log(t.slice(0, 28), '=> ERR'); }
  }
  // inner screen geometry: phone frame content box
  const body = await p.evaluate(() => { const r = document.body.getBoundingClientRect(); return [r.width, r.height]; });
  console.log('body', body);
  await browser.close(); server.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
