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
      const out = [];
      document.querySelectorAll('*').forEach((el) => {
        const cs = getComputedStyle(el);
        if (cs.overflowY === 'auto') {
          out.push({ tag: el.tagName, testid: el.getAttribute('data-testid') || '', sh: el.scrollHeight, ch: el.clientHeight, overflow: el.scrollHeight > el.clientHeight + 1 });
        }
      });
      return out;
    });
    console.log(`${id}: ${rows.map((r) => `[${r.testid || r.tag} sh=${r.sh} ch=${r.ch} scrolls=${r.overflow}]`).join(' ') || '(no auto containers)'}`);
    await page.close();
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
