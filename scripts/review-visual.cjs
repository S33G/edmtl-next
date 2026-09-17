const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');

const output = process.env.VISUAL_OUTPUT_DIR;
if (!output) throw new Error('Set VISUAL_OUTPUT_DIR to the screenshot directory.');
const base = process.env.PREVIEW_URL || 'http://localhost:3000';
const scenarios = [
  { name: 'home-desktop', route: '/', width: 1440, height: 1050 },
  { name: 'home-french-desktop', route: '/fr', width: 1440, height: 1050 },
  { name: 'gallery-desktop', route: '/gallery', width: 1440, height: 1050 },
  { name: 'polymeric-french-tablet', route: '/fr/services/polymeric-sand-replacement', width: 768, height: 1024 },
  { name: 'home-mobile', route: '/', width: 375, height: 812 },
  { name: 'home-french-mobile', route: '/fr', width: 375, height: 812 },
  { name: 'home-french-small', route: '/fr', width: 320, height: 812 },
  { name: 'service-mobile', route: '/services/gutter-cleaning', width: 375, height: 812 },
  { name: 'contact-french-mobile', route: '/fr/contact', width: 375, height: 812 },
  { name: 'contact-french-small', route: '/fr/contact', width: 320, height: 812 },
];

async function main() {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome', headless: true });
  const report = [];
  try {
    const selected = process.env.VISUAL_SCENARIOS?.split(',');
    for (const scenario of scenarios.filter(item => !selected || selected.includes(item.name))) {
      const page = await browser.newPage({ viewport: { width: scenario.width, height: scenario.height }, deviceScaleFactor: 1 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.route('https://**/*', route => route.abort());
      await page.goto(base + scenario.route, { waitUntil: 'networkidle' });
      if (process.env.PREVIEW_LOCAL_CSS === '1') {
        const css = (await fs.readFile(path.join(__dirname, '..', 'src', 'app', 'globals.css'), 'utf8'))
          .replace(/^@import[^;]+;/m, '').replace(/@theme inline\s*\{[^}]+\}/, '');
        await page.addStyleTag({ content: css });
      }
      await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(image => { image.loading = 'eager'; return image.decode().catch(() => {}); })); });
      await page.screenshot({ path: path.join(output, `${scenario.name}.png`), fullPage: true });
      await page.screenshot({ path: path.join(output, `${scenario.name}-viewport.png`) });
      if (scenario.name === 'service-mobile') {
        await page.locator('.service-intro a[href="#quote"]').click();
        await page.screenshot({ path: path.join(output, 'service-form-mobile.png') });
      }
      const sizing = await page.evaluate(() => ({
        width: innerWidth, documentWidth: document.documentElement.scrollWidth,
        background: getComputedStyle(document.body).backgroundColor,
        heading: { font: getComputedStyle(document.querySelector('h1')).fontFamily, size: getComputedStyle(document.querySelector('h1')).fontSize },
        overflow: [...document.querySelectorAll('main *, .site-header *')].filter(element => {
          const rect = element.getBoundingClientRect();
          return rect.width && (rect.right > innerWidth + 1 || rect.left < -1);
        }).map(element => ({ tag: element.tagName, class: element.className, text: element.textContent?.slice(0, 60) })).slice(0, 12),
      }));
      report.push({ name: scenario.name, ...sizing });
      await page.close();
    }
  } finally { await browser.close(); }
  await fs.writeFile(path.join(output, 'visual-review.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
