const { chromium } = require('/home/hatch/workspace/muse-build/shot/node_modules/playwright-core');
const http = require('http');
const fs = require('fs');
const path = require('path');
const DIST = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/dist';
const OUT = process.argv[2];
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = urlPath === '/' ? 'index.html' : urlPath.replace(/^\//, '');
  const full = path.join(DIST, file);
  if (!full.startsWith(DIST) || !fs.existsSync(full)) { res.writeHead(404); res.end('nf'); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(full)] || 'application/octet-stream' });
  fs.createReadStream(full).pipe(res);
});
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const browser = await chromium.launch({ executablePath: process.env.PW_CHROME, args: ['--no-sandbox'] });
  for (const [s, w, h] of [['home', 390, 844], ['chat', 390, 844], ['briefing', 390, 844], ['draft', 390, 844], ['detail', 390, 844], ['components', 390, 844], ['chat', 430, 932]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    const out = path.join(OUT, s + '-' + w + '.png');
    try {
      await p.goto('http://localhost:' + port + '/?screen=' + s, { waitUntil: 'networkidle', timeout: 20000 });
      await p.waitForTimeout(800);
      await p.screenshot({ path: out });
      console.log('OK', out);
    } catch (e) { console.log('FAIL', out, e.message.slice(0, 120)); }
    await ctx.close();
  }
  await browser.close();
  server.close();
})().catch(e => { console.error('SHOT-FAIL', e.message); process.exit(1); });
