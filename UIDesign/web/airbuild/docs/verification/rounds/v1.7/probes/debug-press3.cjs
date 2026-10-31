const { chromium } = require('/home/hatch/workspace/rea-tool/node_modules/playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/dist/index.html', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  const r = await page.evaluate(() => {
    const el = document.querySelector('[data-window="main"] button[aria-label="Toggle left sidebar"]');
    const hits = [];
    for (const ss of document.styleSheets) {
      let rules; try { rules = ss.cssRules; } catch (e) { continue; }
      for (const rule of rules) {
        if (!rule.selectorText) continue;
        try {
          if (el.matches(rule.selectorText)) {
            const t = rule.style.getPropertyValue('transform');
            const s = rule.style.getPropertyValue('scale');
            if (t || s) hits.push(rule.selectorText + ' => transform:' + t + ' scale:' + s + ' prio:' + rule.style.getPropertyPriority('transform'));
          }
        } catch (e) {}
      }
    }
    const cs = getComputedStyle(el);
    return { hits, inline: el.style.cssText, computedTransform: cs.transform, scale: cs.scale, translate: cs.translate, rotate: cs.rotate };
  });
  console.log(JSON.stringify(r, null, 1));
  await browser.close();
})().catch((e) => { console.error('DBG-FAIL', e.message); process.exit(1); });
