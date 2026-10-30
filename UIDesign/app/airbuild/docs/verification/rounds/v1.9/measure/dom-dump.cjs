const { chromium } = require('/home/hatch/workspace/muse-build/shot/node_modules/playwright-core');
const http = require('http'); const fs = require('fs'); const path = require('path');
const DIST = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/dist';
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
  for (const s of ['home','chat','briefing','draft','detail','components']) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const p = await ctx.newPage();
    await p.goto('http://localhost:' + port + '/?screen=' + s, { waitUntil: 'networkidle', timeout: 20000 });
    await p.waitForTimeout(800);
    const data = await p.evaluate(() => {
      const out = [];
      const cs = (el) => { const s = getComputedStyle(el); return { font: s.fontSize + '/' + s.fontWeight, bg: s.backgroundColor, bgImg: (s.backgroundImage||'').slice(0,120), radius: s.borderRadius, border: s.borderTopWidth + ' ' + s.borderTopColor, shadow: (s.boxShadow||'').slice(0,120), filter: s.backdropFilter, pad: s.padding, w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height }; };
      const push = (label, el) => { if (!el) return; const r = el.getBoundingClientRect(); out.push({ label, x: Math.round(r.x), y: Math.round(r.y), ...cs(el) }); };
      document.querySelectorAll('.ab-glass').forEach((el, i) => push('glass[' + i + ']', el));
      document.querySelectorAll('div').forEach((el) => {
        const t = (el.textContent || '');
        if (t.startsWith('Yes. Keep the soft green')) push('userBubble', el);
        if (t.startsWith('I\u2019ve put together')) push('agentBubble', el);
        if (t.startsWith('Your daily report')) push('bareBubble', el);
      });
      document.querySelectorAll('button[aria-label="Send"]').forEach((el) => push('sendBtn', el));
      document.querySelectorAll('button[aria-label="Send"] svg').forEach((el) => push('sendArrowSvg', el));
      document.querySelectorAll('.ab-typing-dot').forEach((el, i) => push('typingDot[' + i + ']', el));
      const ind = [...document.querySelectorAll('div')].find(el => el.getAttribute('aria-hidden') !== null && el.className.includes('w-[134px]'));
      push('homeIndicator', ind);
      push('bodyFont', document.body);
      return out;
    });
    console.log('== screen ' + s);
    for (const d of data) console.log(JSON.stringify(d));
    await ctx.close();
  }
  await browser.close(); server.close();
})().catch(e => { console.error('DOM-FAIL', e.message); process.exit(1); });
