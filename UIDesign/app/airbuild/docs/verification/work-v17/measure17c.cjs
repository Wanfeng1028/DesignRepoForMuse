const { chromium } = require('/home/hatch/workspace/muse-build/shot/node_modules/playwright-core');
const http = require('http');
const fs = require('fs');
const path = require('path');
const DIST = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/dist';
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let f = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\//, '') || 'index.html';
  const full = path.join(DIST, f);
  if (!full.startsWith(DIST) || !fs.existsSync(full)) { res.writeHead(404); res.end('nf'); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(full)] || 'application/octet-stream' });
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
    const r = (el) => { const b = el.getBoundingClientRect(); return [Math.round(b.top), Math.round(b.bottom), Math.round(b.height)]; };
    const out = {};
    const ps = Array.from(document.querySelectorAll('p'));
    const msg2p = ps.find(el => el.textContent.includes('Check Mood'));
    if (msg2p) { out.msg2text = r(msg2p); let b = msg2p; for (let i = 0; i < 4 && b.parentElement; i++) { b = b.parentElement; if (b.className.includes('rounded')) { out.msg2bubble = r(b); break; } } }
    const comp = Array.from(document.querySelectorAll('div')).find(el => el.querySelector('input'));
    if (comp) out.composerBox = r(comp);
    const list = Array.from(document.querySelectorAll('div')).find(el => el.className.includes('overflow-hidden') && el.textContent.includes('Your daily report'));
    if (list) out.list = r(list);
    const header = document.querySelector('header');
    if (header) out.header = r(header);
    return out;
  });
  console.log(JSON.stringify(info, null, 1));
  await browser.close(); server.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
