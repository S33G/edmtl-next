const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const english = require('../src/data/services.en.json');
const french = require('../src/data/services.fr.json');

const base = process.env.EDMTL_TEST_URL || 'http://localhost:3000';
const origin = new URL(base).origin;
const failures = [];
const results = [];
const screenshotDirectory = process.env.EDMTL_SCREENSHOT_DIR || path.join(os.tmpdir(), 'edmtl-browser-screenshots');
let browser;

async function scenario(name, run) {
  try {
    await run();
    results.push(name);
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push({ name, error: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}

async function fixture(path, width = 1280) {
  const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
  const events = [];
  const posts = [];
  const pending = [];
  const errors = [];
  const state = { response: 'error' };
  await context.exposeBinding('__recordEdmtlEvent', ({ page }, event) => {
    events.push({ path: new URL(page.url()).pathname, ...event });
  });
  await context.addInitScript(() => {
    window.dataLayer = [];
    const push = window.dataLayer.push.bind(window.dataLayer);
    window.dataLayer.push = (...events) => {
      for (const event of events) window.__recordEdmtlEvent(event);
      return push(...events);
    };
  });
  await context.route('**/*', async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin !== origin) {
      // No analytics, form data or other requests leave the local test browser.
      await route.fulfill({ status: 200, contentType: 'application/javascript', body: '' });
      return;
    }
    if (request.method() === 'POST') {
      posts.push({ path: url.pathname, body: new URLSearchParams(request.postData()), contentType: request.headers()['content-type'] });
      if (state.response === 'pending') pending.push(route);
      else if (state.response === 'network') await route.abort('failed');
      else await route.fulfill({ status: state.response === 'success' ? 200 : 500, body: 'Mock form response' });
      return;
    }
    await route.continue();
  });
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(error.message));
  page.setDefaultTimeout(12000);
  await page.goto(`${base}${path}`, { waitUntil: 'networkidle', timeout: 60000 });
  return { context, page, events, posts, pending, errors, state, close: () => context.close() };
}

async function waitFor(check, message) {
  const deadline = Date.now() + 12000;
  while (!check()) {
    if (Date.now() > deadline) throw new Error(message);
    await new Promise((resolve) => setTimeout(resolve, 30));
  }
}

function servicesFor(locale) { return locale === 'fr' ? french : english; }
function prefix(locale) { return locale === 'fr' ? '/fr' : ''; }
function quoteForm(page) { return page.locator('form[name="contact-form"]'); }
async function selected(page) { return quoteForm(page).locator('input[name="services"]:checked').evaluateAll((inputs) => inputs.map((input) => input.value).sort()); }
async function fillContact(page, locale, includeOptional = true) {
  const form = quoteForm(page);
  await form.getByLabel(locale === 'fr' ? 'Nom' : 'Name', { exact: false }).fill('Browser Test Visitor');
  await form.getByLabel(locale === 'fr' ? 'Téléphone' : 'Phone', { exact: false }).fill('438 555 0198');
  if (includeOptional) {
    await form.getByLabel(locale === 'fr' ? 'Courriel' : 'Email', { exact: false }).fill('browser@example.test');
    await form.getByLabel(locale === 'fr' ? 'Code postal' : 'Postal code', { exact: false }).fill('H1A 1A1');
  }
}
function noPersonalAnalytics(events) {
  const serialized = JSON.stringify(events);
  for (const value of ['Browser Test Visitor', '438 555 0198', 'browser@example.test', 'H1A 1A1']) assert.ok(!serialized.includes(value), 'Analytics must not include form values');
}

async function main() {
  fs.mkdirSync(screenshotDirectory, { recursive: true });
  browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
  try {
    for (const locale of ['en', 'fr']) {
      await scenario(`${locale}: dedicated form and legacy query preselection`, async () => {
        const f = await fixture(`${prefix(locale)}/contact?service=polymeric-sand-replacement`);
        try {
          await f.page.waitForFunction(() => document.querySelector('input[value="polymeric-sand-replacement"]')?.checked);
          assert.equal(await quoteForm(f.page).count(), 1);
          assert.deepEqual(await selected(f.page), ['polymeric-sand-replacement']);
          assert.equal(await quoteForm(f.page).locator('textarea:visible').count(), 0);
          assert.equal(await f.page.locator('html').getAttribute('lang'), locale);
          assert.equal(await quoteForm(f.page).getAttribute('action'), `${prefix(locale)}/thank-you`);
          assert.equal(await quoteForm(f.page).locator('input[name="email"]').getAttribute('required'), null);
          assert.equal(await quoteForm(f.page).locator('input[name="postal-code"]').getAttribute('required'), null);
          if (locale === 'en') await f.page.screenshot({ path: path.join(screenshotDirectory, 'contact-desktop.png'), fullPage: true });
          assert.deepEqual(f.errors, []);
        } finally { await f.close(); }
      });

      await scenario(`${locale}: all service forms preselect their page service`, async () => {
        const f = await fixture(`${prefix(locale)}/services/${servicesFor(locale)[0].slug}`);
        try {
          for (const service of servicesFor(locale)) {
            await f.page.goto(`${base}${prefix(locale)}/services/${service.slug}`, { waitUntil: 'networkidle', timeout: 60000 });
            assert.equal(await quoteForm(f.page).count(), 1, service.slug);
            assert.deepEqual(await selected(f.page), [service.slug]);
            assert.equal(await quoteForm(f.page).getByRole('checkbox', { name: service.title, exact: true }).isVisible(), true);
            if (locale === 'en' && service.slug === 'window-cleaning') await f.page.screenshot({ path: path.join(screenshotDirectory, 'window-cleaning-desktop.png'), fullPage: true });
          }
          await waitFor(() => f.events.some((event) => event.event === 'view_item' && event.locale === locale), 'Service view analytics missing');
          assert.deepEqual(f.errors, []);
        } finally { await f.close(); }
      });
    }

    await scenario('Older service links and commercial enquiries retain usable choices', async () => {
      const f = await fixture('/contact?service=gutter-services,deck-refinishing');
      try {
        await f.page.waitForFunction(() => document.querySelector('input[value="deck-staining"]')?.checked);
        assert.deepEqual(await selected(f.page), ['deck-staining', 'gutter-cleaning']);
        await f.page.goto(`${base}/contact?service=commercial-window-cleaning`, { waitUntil: 'networkidle' });
        const choice = quoteForm(f.page).getByRole('checkbox', { name: 'Window Cleaning', exact: true });
        assert.equal(await quoteForm(f.page).getByRole('checkbox').count(), 6);
        assert.equal(await choice.isChecked(), true);
        await choice.uncheck();
        assert.equal(await choice.isVisible(), true);
        await choice.check();
        await f.page.locator('.site-header').getByRole('link', { name: 'Français', exact: true }).click();
        await f.page.waitForURL(`${base}/fr/contact?service=commercial-window-cleaning`);
        await f.page.waitForFunction(() => document.querySelector('input[value="window-cleaning"]')?.checked);
        assert.deepEqual(await selected(f.page), ['window-cleaning']);
      } finally { await f.close(); }
    });

    await scenario('French validation is accessible and blocks incomplete requests', async () => {
      const f = await fixture('/fr/contact');
      try {
        await quoteForm(f.page).getByRole('button', { name: 'Demander ma soumission gratuite', exact: true }).click();
        await f.page.getByText('Entrez votre nom.', { exact: true }).waitFor();
        assert.equal(await f.page.getByText('Entrez votre numéro de téléphone.', { exact: true }).isVisible(), true);
        assert.equal(await f.page.getByText('Choisissez au moins un service.', { exact: true }).isVisible(), true);
        assert.equal(await f.page.locator(':focus').getAttribute('name'), 'name');
        assert.equal(f.posts.length, 0);
        await fillContact(f.page, 'fr', false);
        await quoteForm(f.page).getByRole('checkbox', { name: 'Lavage de vitres', exact: true }).check();
        await quoteForm(f.page).getByLabel('Courriel', { exact: false }).fill('invalid-email');
        await quoteForm(f.page).getByRole('button', { name: 'Demander ma soumission gratuite', exact: true }).click();
        await f.page.getByText('Entrez une adresse courriel valide ou laissez ce champ vide.', { exact: true }).waitFor();
        assert.equal(f.posts.length, 0);
        assert.equal(f.events.filter((event) => event.event === 'generate_lead').length, 0);
      } finally { await f.close(); }
    });

    await scenario('Six visible service choices, multi-select and failed retry preserve fields', async () => {
      const f = await fixture('/contact');
      try {
        const form = quoteForm(f.page);
        const secondary = form.getByRole('checkbox', { name: 'Dryer Vent Cleaning', exact: true });
        assert.equal(await secondary.isVisible(), true);
        assert.equal(await form.getByRole('checkbox').count(), 6);
        await secondary.check();
        await form.getByRole('checkbox', { name: 'Window Cleaning', exact: true }).check();
        await form.getByRole('checkbox', { name: 'Gutter Cleaning', exact: true }).check();
        await fillContact(f.page, 'en');
        await form.getByRole('button', { name: 'Request my free quote', exact: true }).click();
        await form.getByRole('alert').waitFor();
        assert.equal(f.posts.length, 1);
        assert.equal(f.posts[0].path, '/');
        assert.match(f.posts[0].contentType, /application\/x-www-form-urlencoded/);
        assert.equal(f.posts[0].body.get('postal-code'), 'H1A 1A1');
        assert.equal(f.posts[0].body.get('locale'), 'en');
        assert.equal(f.posts[0].body.get('form-name'), 'contact-form');
        assert.equal(f.posts[0].body.get('message'), '');
        assert.deepEqual(f.posts[0].body.get('services').split(', ').sort(), ['dryer-vent-cleaning', 'gutter-cleaning', 'window-cleaning']);
        assert.equal(await form.getByLabel('Name', { exact: false }).inputValue(), 'Browser Test Visitor');
        assert.equal(await form.getByLabel('Email', { exact: false }).inputValue(), 'browser@example.test');
        assert.equal(await form.getByRole('button', { name: 'Request my free quote', exact: true }).isEnabled(), true);
        assert.equal(f.events.filter((event) => event.event === 'generate_lead').length, 0);
        await waitFor(() => f.events.some((event) => event.event === 'form_error' && event.error_type === 'submission_failed'), 'Submission error event missing');
        assert.equal(f.events.filter((event) => event.event === 'form_start').length, 1);
        assert.equal(f.events.filter((event) => event.event === 'service_select').length, 3);
        noPersonalAnalytics(f.events);
        f.state.response = 'network';
        await form.getByRole('button', { name: 'Request my free quote', exact: true }).click();
        await waitFor(() => f.events.some((event) => event.event === 'form_error' && event.error_type === 'network_error'), 'Network error event missing');
        assert.equal(await form.getByLabel('Phone', { exact: false }).inputValue(), '438 555 0198');
      } finally { await f.close(); }
    });

    for (const locale of ['en', 'fr']) await scenario(`${locale}: success sends one lead, locks duplicates and reaches localized confirmation`, async () => {
      const servicePath = `${prefix(locale)}/services/window-cleaning`;
      const f = await fixture(servicePath);
      try {
        f.state.response = 'pending';
        await fillContact(f.page, locale, false);
        const form = quoteForm(f.page);
        await form.getByRole('button', { name: locale === 'fr' ? 'Demander ma soumission gratuite' : 'Request my free quote', exact: true }).click();
        await waitFor(() => f.pending.length === 1, 'Submission was not intercepted');
        assert.equal(f.events.filter((event) => event.event === 'generate_lead').length, 0, 'Lead cannot fire before server success');
        await form.evaluate((element) => element.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
        assert.equal(f.posts.length, 1);
        assert.equal(await form.locator('button[type="submit"]').isDisabled(), true);
        await f.page.locator('.site-header').getByRole('link', { name: locale === 'fr' ? 'English' : 'Français', exact: true }).click();
        assert.equal(new URL(f.page.url()).pathname, servicePath, 'Language navigation remains locked until the result is known');
        await f.pending[0].fulfill({ status: 200, body: 'Mock success' });
        await waitFor(() => f.events.some((event) => event.event === 'generate_lead'), 'Lead event missing');
        await form.evaluate((element) => element.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
        assert.equal(f.posts.length, 1, 'The redirect interval remains locked');
        assert.equal(f.posts[0].body.get('locale'), locale);
        assert.equal(f.posts[0].body.get('email'), '');
        assert.equal(f.posts[0].body.get('postal-code'), '');
        assert.equal(f.posts[0].body.get('services'), 'window-cleaning');
        await f.page.waitForURL(`${base}${prefix(locale)}/thank-you`, { timeout: 15000 });
        assert.equal(await f.page.locator('html').getAttribute('lang'), locale);
        assert.equal(f.events.filter((event) => event.event === 'generate_lead').length, 1);
        noPersonalAnalytics(f.events);
        assert.deepEqual(f.errors, []);
      } finally { await f.close(); }
    });

    for (const sourcePath of ['/contact?service=deck-refinishing#quote', '/services/deck-staining#quote']) await scenario(`${sourcePath.startsWith('/contact') ? 'Dedicated' : 'Embedded'} language switching preserves details and selections without URL data`, async () => {
      const f = await fixture(sourcePath);
      try {
        await f.page.waitForFunction(() => document.querySelector('input[value="deck-staining"]')?.checked);
        await fillContact(f.page, 'en');
        await quoteForm(f.page).getByRole('checkbox', { name: 'Window Cleaning', exact: true }).check();
        await quoteForm(f.page).getByRole('checkbox', { name: 'Dryer Vent Cleaning', exact: true }).check();
        await f.page.locator('.site-header').getByRole('link', { name: 'Français', exact: true }).click();
        await f.page.waitForURL(`${base}/fr${sourcePath}`);
        await f.page.waitForFunction(() => document.querySelector('input[name="name"]')?.value === 'Browser Test Visitor');
        assert.deepEqual(await selected(f.page), ['deck-staining', 'dryer-vent-cleaning', 'window-cleaning']);
        assert.equal(await quoteForm(f.page).getByLabel('Téléphone', { exact: false }).inputValue(), '438 555 0198');
        assert.equal(await quoteForm(f.page).getByLabel('Courriel', { exact: false }).inputValue(), 'browser@example.test');
        assert.equal(await quoteForm(f.page).getByLabel('Code postal', { exact: false }).inputValue(), 'H1A 1A1');
        assert.equal(await f.page.evaluate(() => sessionStorage.getItem('edmtl:quote-language-handoff')), null);
        const before = f.page.url();
        await f.page.locator('.site-header').getByRole('link', { name: 'Français', exact: true }).click();
        assert.equal(f.page.url(), before);
        assert.equal(await quoteForm(f.page).getByLabel('Nom', { exact: false }).inputValue(), 'Browser Test Visitor');
        for (const value of ['Browser', '438', 'example', 'H1A']) assert.ok(!f.page.url().includes(value));
        noPersonalAnalytics(f.events);
      } finally { await f.close(); }
    });

    for (const width of [320, 375, 768]) {
      await scenario(`${width}px: mobile overflow, touch targets and menu focus`, async () => {
        const f = await fixture('/fr/services/pressure-washing', width);
        try {
          for (const routePath of ['/fr/services/pressure-washing', '/fr/services/polymeric-sand-replacement', '/fr/contact', '/fr/gallery', '/fr', '/']) {
            await f.page.goto(`${base}${routePath}`, { waitUntil: 'networkidle', timeout: 60000 });
            const dimensions = await f.page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth }));
            assert.ok(dimensions.scroll <= dimensions.viewport + 1, `${routePath} overflows: ${JSON.stringify(dimensions)}`);
            if (width === 375) await f.page.screenshot({ path: path.join(screenshotDirectory, `${routePath.replace(/^\//, '').replaceAll('/', '-') || 'home'}-mobile.png`), fullPage: true });
          }
          await f.page.goto(`${base}/fr/contact`, { waitUntil: 'networkidle' });
          for (const input of await quoteForm(f.page).locator('.field input').all()) {
            const box = await input.boundingBox();
            assert.ok(box.height >= 48, `Field touch height is ${box.height}px`);
            const size = await input.evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
            assert.ok(size >= 16, `Field font size is ${size}px`);
          }
          const menu = f.page.locator('.site-header').getByRole('button', { name: 'Menu', exact: true });
          assert.equal(await menu.isVisible(), true);
          await menu.click();
          const dialog = f.page.locator('#mobile-navigation');
          assert.equal(await dialog.isVisible(), true);
          assert.equal(await dialog.evaluate((element) => element.contains(document.activeElement)), true);
          await f.page.keyboard.press('Escape');
          await dialog.waitFor({ state: 'hidden' });
          assert.equal(await menu.evaluate((element) => element === document.activeElement), true);
          assert.notEqual(await f.page.evaluate(() => document.body.style.overflow), 'hidden');
          assert.deepEqual(f.errors, []);
        } finally { await f.close(); }
      });
    }

    await scenario('1440px: desktop pages fit and service quote sits beside the content', async () => {
      const f = await fixture('/', 1440);
      try {
        for (const routePath of ['/', '/fr', '/services/window-cleaning', '/fr/services/pressure-washing', '/contact', '/fr/contact', '/fr/gallery']) {
          await f.page.goto(`${base}${routePath}`, { waitUntil: 'networkidle', timeout: 60000 });
          const dimensions = await f.page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth }));
          assert.ok(dimensions.scroll <= dimensions.viewport + 1, `${routePath} overflows: ${JSON.stringify(dimensions)}`);
          assert.equal(await f.page.locator('.desktop-nav').isVisible(), true);
          assert.equal(await f.page.locator('.menu-toggle').isVisible(), false);
          if (routePath.includes('/services/')) {
            assert.equal(await f.page.locator('.service-detail-card, .service-projects figcaption').count(), 0, 'Service pages go straight to uncaptioned photos');
            const story = await f.page.locator('.service-story').boundingBox();
            const quote = await f.page.locator('.service-quote').boundingBox();
            assert.ok(quote.x >= story.x + story.width, 'Desktop quote form is alongside the service story');
          }
          if (routePath === '/' || routePath === '/fr') {
            const cards = await f.page.locator('.primary-services .service-card').evaluateAll(elements => elements.map(element => ({ x: element.offsetLeft, y: element.offsetTop })));
            assert.equal(cards.length, 6);
            assert.equal(new Set(cards.map(card => card.x)).size, 3, 'Three desktop service columns');
            assert.equal(new Set(cards.map(card => card.y)).size, 2, 'Two desktop service rows');
            assert.equal(await f.page.locator('.card-number').count(), 0);
          }
          if (routePath === '/') await f.page.screenshot({ path: path.join(screenshotDirectory, 'home-desktop.png'), fullPage: true });
        }
        assert.deepEqual(f.errors, []);
      } finally { await f.close(); }
    });

    await scenario('Gallery filter, enlargement, keyboard trap and Escape restore focus', async () => {
      const f = await fixture('/fr/gallery', 375);
      try {
        const allCount = await f.page.locator('.gallery-card').count();
        await f.page.getByRole('button', { name: 'Lavage de vitres', exact: true }).click();
        const filteredCount = await f.page.locator('.gallery-card').count();
        assert.ok(filteredCount > 0 && filteredCount < allCount);
        assert.equal(await f.page.getByRole('button', { name: 'Lavage de vitres', exact: true }).getAttribute('aria-pressed'), 'true');
        const opener = f.page.locator('.gallery-image-button').first();
        await opener.click();
        const dialog = f.page.locator('.gallery-dialog');
        await dialog.waitFor({ state: 'visible' });
        const close = dialog.getByRole('button', { name: 'Fermer la photo agrandie', exact: true });
        assert.equal(await close.evaluate((element) => element === document.activeElement), true);
        await f.page.keyboard.press('Tab');
        assert.equal(await close.evaluate((element) => element === document.activeElement), true);
        await f.page.keyboard.press('Escape');
        await dialog.waitFor({ state: 'hidden' });
        assert.equal(await opener.evaluate((element) => element === document.activeElement), true);
        assert.notEqual(await f.page.evaluate(() => document.body.style.overflow), 'hidden');
        assert.deepEqual(f.errors, []);
      } finally { await f.close(); }
    });
  } finally {
    await browser.close();
  }
  console.log(JSON.stringify({ passed: results.length, failed: failures.length, failures }, null, 2));
  console.log(`Screenshots: ${screenshotDirectory}`);
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
