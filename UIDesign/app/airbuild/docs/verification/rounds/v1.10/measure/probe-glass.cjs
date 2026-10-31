// Probe: backdrop-filter url() (nikdelvin displacement) support in headless
// shell 1243, over a striped backdrop. Writes probe-glass.png + prints
// computed backdrop-filter strings. Technique only (MIT source logic ported
// in miniature); no product code touched.
const { chromium } = require('/home/hatch/workspace/muse-build/shot/node_modules/playwright-core');
const fs = require('fs');
const OUT = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/rounds/v1.10/measure/probe-glass.html';
function dispMap(w, h, r, depth) {
  const svg = `<svg height="${h}" width="${w}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><style>.mix{ mix-blend-mode: screen; }</style><defs><linearGradient id="Y" x1="0" x2="0" y1="${Math.ceil((r / h) * 15)}%" y2="${Math.floor(100 - (r / h) * 15)}%"><stop offset="0%" stop-color="#0F0" /><stop offset="100%" stop-color="#000" /></linearGradient><linearGradient id="X" x1="${Math.ceil((r / w) * 15)}%" x2="${Math.floor(100 - (r / w) * 15)}%" y1="0" y2="0"><stop offset="0%" stop-color="#F00" /><stop offset="100%" stop-color="#000" /></linearGradient></defs><rect x="0" y="0" height="${h}" width="${w}" fill="#808080" /><g filter="blur(2px)"><rect x="0" y="0" height="${h}" width="${w}" fill="#000080" /><rect x="0" y="0" height="${h}" width="${w}" fill="url(#Y)" class="mix" /><rect x="0" y="0" height="${h}" width="${w}" fill="url(#X)" class="mix" /><rect x="${depth}" y="${depth}" height="${h - 2 * depth}" width="${w - 2 * depth}" fill="#808080" rx="${r}" ry="${r}" filter="blur(${depth}px)" /></g></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
function dispFilter(w, h, r, depth, strength, cab) {
  const map = dispMap(w, h, r, depth);
  const chan = (scale, row, res) => `<feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${scale}" xChannelSelector="R" yChannelSelector="G" /><feColorMatrix type="matrix" values="${row}" result="${res}" />`;
  const svg = `<svg height="${h}" width="${w}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><defs><filter id="displace" color-interpolation-filters="sRGB"><feImage x="0" y="0" height="${h}" width="${w}" href="${map}" result="displacementMap" />${chan(strength + cab * 2, '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0', 'dR')}${chan(strength + cab, '0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0', 'dG')}${chan(strength, '0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0', 'dB')}<feBlend in="dR" in2="dG" mode="screen" /><feBlend in2="dB" mode="screen" /></filter></defs></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg) + '#displace';
}
const f16 = dispFilter(120, 120, 60, 8, 16, 2);
const f100 = dispFilter(120, 120, 60, 8, 100, 2);
const html = `<!doctype html><html><body style="margin:0"><div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,#111 0 16px,#fff 16px 32px)"></div>
<div id="ctl" style="position:absolute;left:20px;top:20px;width:120px;height:120px;border-radius:60px;background:rgba(255,255,255,.15);backdrop-filter:blur(5px) saturate(1.5)"></div>
<div id="d16" style="position:absolute;left:170px;top:20px;width:120px;height:120px;border-radius:60px;background:rgba(255,255,255,.15);backdrop-filter:blur(2px) url('${f16}') blur(5px) saturate(1.5)"></div>
<div id="d100" style="position:absolute;left:320px;top:20px;width:120px;height:120px;border-radius:60px;background:rgba(255,255,255,.15);backdrop-filter:blur(2px) url('${f100}') blur(5px) saturate(1.5)"></div>
</body></html>`;
fs.writeFileSync(OUT, html);
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 470, height: 170 }, deviceScaleFactor: 1 });
  await page.goto('file://' + OUT);
  await page.waitForTimeout(1500);
  const cs = await page.evaluate(() => ['ctl', 'd16', 'd100'].map(id => { const el = document.getElementById(id); return id + ' :: ' + getComputedStyle(el).backdropFilter; }));
  console.log(cs.join('\n'));
  await page.screenshot({ path: '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/rounds/v1.10/measure/probe-glass.png' });
  await browser.close();
})().catch(e => { console.error('PROBE-FAIL', e.message); process.exit(1); });
