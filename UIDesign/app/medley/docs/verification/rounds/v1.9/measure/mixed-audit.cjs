const { chromium } = require('playwright-core');
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const IDS = ['welcome-dark','home-light-en','home-light-cn','chat-dark-lisbon-en','chat-dark-lisbon-cn','chat-light-train-en','chat-light-savings-en','chat-dark-kyoto-en','chat-light-router-en','chat-info-sheet','search-drawer-dark','model-picker-a','model-picker-b','pricing-dark','credits-light','suspended-light','agent-team-dark','language-light'];
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--allow-file-access-from-files'] });
  for (const id of IDS) {
    const page = await browser.newPage({ viewport: { width: 430, height: 920 } });
    await page.goto(`file:///home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/dist/index.html?screen=${id}`);
    await page.waitForTimeout(3000);
    const rows = await page.evaluate(() => {
      const res = [];
      document.querySelectorAll('*').forEach((el) => {
        const cs = getComputedStyle(el);
        if (parseFloat(cs.fontSize) >= 20 && el.children.length > 0) {
          const direct = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim().slice(0, 30));
          if (direct.length) res.push({ tag: el.tagName, cls: (el.className.baseVal !== undefined ? '' : el.className || '').toString().slice(0, 60), direct });
        }
      });
      return res;
    });
    console.log(`${id}: ${rows.length ? JSON.stringify(rows) : '(no mixed-content >=20px elements)'}`);
    await page.close();
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
