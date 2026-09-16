/* Static-export acceptance checks. Run after building: node scripts/test-export.cjs */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.resolve(root, process.env.EDMTL_EXPORT_DIR || 'out');
const origin = 'https://edmtl.com';
const english = require('../src/data/services.en.json');
const french = require('../src/data/services.fr.json');
const serviceSlugs = english.map((service) => service.slug);
const primarySlugs = ['gutter-cleaning', 'window-cleaning', 'pressure-washing', 'dryer-vent-cleaning', 'deck-staining', 'polymeric-sand-replacement'];
const indexablePaths = ['/', '/contact', '/faq', '/gallery', '/privacy-policy', ...serviceSlugs.map((slug) => `/services/${slug}`)];
const noindexPaths = ['/terms', '/thank-you', '/game'];
const localized = (locale, route) => locale === 'fr' ? `/fr${route === '/' ? '' : route}` : route;
const routes = ['en', 'fr'].flatMap((locale) => [...indexablePaths, ...noindexPaths].map((route) => ({ locale, basePath: route, route: localized(locale, route) })));
const failures = [];
let passed = 0;

function check(name, run) {
  try { run(); passed += 1; console.log(`PASS ${name}`); }
  catch (error) { failures.push({ name, message: error.message }); console.error(`FAIL ${name}: ${error.message}`); }
}

function decode(value) {
  return value.replace(/&(?:amp|quot|apos|lt|gt|#(\d+)|#x([\da-f]+));/gi, (match, decimal, hex) => {
    if (decimal) return String.fromCodePoint(Number(decimal));
    if (hex) return String.fromCodePoint(parseInt(hex, 16));
    return { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' }[match.toLowerCase()] || match;
  });
}

function attributes(source) {
  const values = {};
  for (const match of source.matchAll(/([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
    values[match[1].toLowerCase()] = decode(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return values;
}

function parse(html) {
  // Inspect the exported document, excluding React's serialized component payload.
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, '').replace(/<!--[\s\S]*?-->/g, '');
  const tags = [...markup.matchAll(/<([a-z][\w:-]*)\b([^>]*?)\/?\s*>/gi)].map((match) => ({ name: match[1].toLowerCase(), attrs: attributes(match[2]) }));
  return { markup, tags, select: (name) => tags.filter((tag) => tag.name === name).map((tag) => tag.attrs) };
}

function routeFile(route) {
  const clean = decodeURIComponent(route).replace(/\/$/, '');
  return path.join(output, clean ? `${clean}.html` : 'index.html');
}

function exportedReference(reference, pageRoute) {
  const url = new URL(reference, `${origin}${pageRoute}`);
  if (url.origin !== origin) return null;
  const pathname = decodeURIComponent(url.pathname);
  const direct = path.resolve(output, `.${pathname}`);
  assert.ok(direct === output || direct.startsWith(`${output}${path.sep}`), `Asset escapes export directory: ${reference}`);
  return [direct, routeFile(pathname), path.join(direct, 'index.html')].find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
}

function expectedAlternates(basePath) {
  return { 'en-ca': `${origin}${localized('en', basePath)}`, 'fr-ca': `${origin}${localized('fr', basePath)}`, 'x-default': `${origin}${localized('en', basePath)}` };
}

function verifyAlternates(links, basePath) {
  const alternateLinks = links.filter((link) => link.rel === 'alternate' && link.hreflang);
  assert.equal(alternateLinks.length, 3, 'Expected exactly the English, French and default language alternates');
  const actual = Object.fromEntries(alternateLinks.map((link) => [link.hreflang.toLowerCase(), new URL(link.href).href]));
  assert.deepEqual(actual, expectedAlternates(basePath));
  for (const href of Object.values(actual)) assert.ok(exportedReference(href, basePath), `Alternate target missing: ${href}`);
}

if (!fs.existsSync(output)) {
  console.error(`Export directory missing: ${output}. Build the site first.`);
  process.exit(1);
}

check('English and French service inventories match; six primary services are retained', () => {
  assert.deepEqual(french.map((service) => service.slug), serviceSlugs);
  assert.deepEqual(english.filter((service) => service.primary).map((service) => service.slug), primarySlugs);
  assert.deepEqual(french.filter((service) => service.primary).map((service) => service.slug), primarySlugs);
});

const pages = new Map();
for (const route of routes) {
  check(`${route.route}: exported HTML, language, heading and canonical metadata`, () => {
    const filename = routeFile(route.route);
    assert.ok(fs.existsSync(filename), `Missing ${path.relative(output, filename)}`);
    const html = fs.readFileSync(filename, 'utf8');
    const document = parse(html);
    pages.set(route.route, { ...document, html });
    assert.equal(document.select('html').length, 1, 'Expected one document root');
    assert.equal(document.select('html')[0].lang, route.locale);
    assert.equal(document.select('h1').length, 1, 'Expected exactly one server-rendered h1');
    assert.equal(document.select('main').length, 1, 'Expected one main landmark');
    const canonical = document.select('link').filter((link) => link.rel === 'canonical');
    assert.equal(canonical.length, 1, 'Expected one canonical link');
    assert.equal(new URL(canonical[0].href).href, `${origin}${route.route}`);
    verifyAlternates(document.select('link'), route.basePath);
    const title = document.markup.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1];
    assert.ok(title && title.trim(), 'Missing page title');
    assert.equal((title.match(/EDMTL/g) || []).length, 1, 'Title must not duplicate EDMTL branding');
    const description = document.select('meta').find((meta) => meta.name === 'description')?.content;
    assert.ok(description && description.trim(), 'Missing meta description');
    assert.ok(!/(?:https?:)?\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?=[:/"'\s\\]|$)/i.test(html), 'Public HTML contains a localhost URL');
  });

  check(`${route.route}: indexing policy and image references`, () => {
    const document = pages.get(route.route);
    assert.ok(document, 'Page could not be read');
    const robots = document.select('meta').find((meta) => meta.name === 'robots')?.content || '';
    const tokens = robots.toLowerCase().split(/[,\s]+/);
    assert.ok(tokens.includes(noindexPaths.includes(route.basePath) ? 'noindex' : 'index'), `Unexpected robots value: ${robots}`);
    if (!noindexPaths.includes(route.basePath)) assert.ok(!tokens.includes('noindex'), 'Indexable page contains noindex');
    const references = [];
    for (const image of document.select('img')) {
      assert.ok(Object.hasOwn(image, 'alt'), 'Image missing alt attribute');
      if (image.src) references.push(image.src);
      if (image.srcset) references.push(...image.srcset.split(',').map((item) => item.trim().split(/\s+/)[0]));
    }
    for (const source of document.select('source')) {
      if (source.srcset) references.push(...source.srcset.split(',').map((item) => item.trim().split(/\s+/)[0]));
    }
    const socialImages = document.select('meta').filter((meta) => meta.property === 'og:image' || meta.name === 'twitter:image');
    assert.ok(socialImages.some((meta) => meta.property === 'og:image'), 'Missing Open Graph image');
    references.push(...socialImages.map((meta) => meta.content));
    for (const link of document.select('link').filter((item) => ['icon', 'apple-touch-icon'].includes(item.rel) || (item.rel === 'preload' && item.as === 'image'))) {
      if (link.href) references.push(link.href);
      if (link.imagesrcset) references.push(...link.imagesrcset.split(',').map((item) => item.trim().split(/\s+/)[0]));
    }
    for (const reference of new Set(references)) {
      assert.ok(reference, 'Image reference is empty');
      if (/^data:/.test(reference)) continue;
      const url = new URL(reference, `${origin}${route.route}`);
      assert.equal(url.origin, origin, `Unexpected remote image: ${reference}`);
      assert.ok(exportedReference(reference, route.route), `Image missing from export: ${reference}`);
    }
  });

  if (route.basePath === '/contact' || route.basePath.startsWith('/services/')) {
    check(`${route.route}: one quote form with correct language and service`, () => {
      const document = pages.get(route.route);
      assert.ok(document, 'Page could not be read');
      const forms = document.select('form');
      assert.equal(forms.length, 1, 'Each service/contact page must render exactly one form');
      assert.equal(forms[0].name, 'contact-form');
      assert.equal(forms[0].method.toUpperCase(), 'POST');
      const inputs = document.select('input');
      assert.equal(inputs.find((input) => input.name === 'form-name')?.value, 'contact-form');
      assert.equal(inputs.find((input) => input.name === 'locale')?.value, route.locale);
      for (const name of ['name', 'phone', 'email', 'postal-code', 'services']) assert.ok(inputs.some((input) => input.name === name), `Missing field: ${name}`);
      if (route.basePath.startsWith('/services/')) {
        const slug = route.basePath.split('/').at(-1);
        const selected = inputs.filter((input) => input.name === 'services' && Object.hasOwn(input, 'checked')).map((input) => input.value);
        assert.deepEqual(selected, [slug], 'Service page must preselect its service');
      }
    });
  }
}

for (const locale of ['en', 'fr']) {
  check(`${localized(locale, '/')}: exactly six primary home service cards`, () => {
    const document = pages.get(localized(locale, '/'));
    assert.ok(document, 'Home page missing');
    const cards = document.select('a').filter((link) => (link.class || '').split(/\s+/).includes('service-card'));
    assert.equal(cards.length, 6);
    assert.deepEqual(cards.map((card) => card.href), primarySlugs.map((slug) => localized(locale, `/services/${slug}`)));
  });
}

check('Sitemap includes exactly the indexable routes and reciprocal language alternatives', () => {
  const xml = fs.readFileSync(path.join(output, 'sitemap.xml'), 'utf8');
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  const expected = ['en', 'fr'].flatMap((locale) => indexablePaths.map((route) => `${origin}${localized(locale, route)}`));
  const actual = entries.map((entry) => decode(entry.match(/<loc>([^<]+)<\/loc>/)?.[1] || ''));
  assert.deepEqual([...actual].sort(), [...expected].sort());
  assert.equal(new Set(actual).size, actual.length, 'Duplicate sitemap URLs');
  for (const entry of entries) {
    const url = decode(entry.match(/<loc>([^<]+)<\/loc>/)[1]);
    const pathname = new URL(url).pathname;
    const basePath = pathname.replace(/^\/fr(?=\/|$)/, '') || '/';
    const links = [...entry.matchAll(/<xhtml:link\b([^>]+)\/?\s*>/g)].map((match) => attributes(match[1]));
    verifyAlternates(links, basePath);
  }
});

check('Robots advertises the production sitemap and manifest icons resolve', () => {
  const robots = fs.readFileSync(path.join(output, 'robots.txt'), 'utf8');
  assert.match(robots, /^Sitemap:\s*https:\/\/edmtl\.com\/sitemap\.xml\s*$/mi);
  assert.ok(!/^Disallow:\s*\/\s*$/mi.test(robots), 'Robots must not block the entire public site');
  const manifest = JSON.parse(fs.readFileSync(path.join(output, 'manifest.webmanifest'), 'utf8'));
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 2, 'Expected installable app icons');
  for (const icon of manifest.icons) {
    assert.ok(icon.src && exportedReference(icon.src, '/'), `Manifest icon missing: ${icon.src}`);
  }
});

check('Export has no stale public page routes or development URLs', () => {
  const htmlFiles = walk(output).filter((file) => file.endsWith('.html') && !file.includes(`${path.sep}_next${path.sep}`));
  const expected = new Set([...routes.map(({ route }) => routeFile(route)), path.join(output, '404.html'), path.join(output, '__forms.html')]);
  for (const file of htmlFiles) {
    assert.ok(expected.has(file), `Unexpected exported page: ${path.relative(output, file)}`);
    const html = fs.readFileSync(file, 'utf8');
    assert.ok(!/(?:https?:)?\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?=[:/"'\s\\]|$)/i.test(html), `Development URL in ${path.relative(output, file)}`);
  }
});

check('Netlify redirects preserve legacy URLs without loops; form discovery is excluded from indexing', () => {
  const config = fs.readFileSync(path.join(root, 'netlify.toml'), 'utf8');
  const blocks = [...config.matchAll(/\[\[redirects\]\]([\s\S]*?)(?=\[\[|$)/g)].map((match) => match[1]);
  const redirects = blocks.map((block) => ({ from: block.match(/^from\s*=\s*"([^"]+)"/m)?.[1], to: block.match(/^to\s*=\s*"([^"]+)"/m)?.[1], status: Number(block.match(/^status\s*=\s*(\d+)/m)?.[1]), force: /^force\s*=\s*true/m.test(block) }));
  const expected = ['en', 'fr'].flatMap((locale) => [
    ['commercial-window-cleaning', 'window-cleaning#commercial'], ['deck-refinishing', 'deck-staining'], ['gutter-services', 'gutter-cleaning'],
  ].map(([from, to]) => [localized(locale, `/services/${from}`), localized(locale, `/services/${to}`)]));
  expected.push(['/en/contact', '/contact'], ['/thank-you.html', '/thank-you']);
  for (const [from, to] of expected) {
    const matching = redirects.filter((redirect) => redirect.from === from);
    assert.equal(matching.length, 1, `Expected exactly one redirect for ${from}`);
    assert.equal(matching[0].to, to);
    assert.equal(matching[0].status, 301);
    assert.ok(exportedReference(to, '/'), `Redirect destination missing: ${to}`);
    assert.notEqual(from, to, `Self-redirect: ${from}`);
  }
  const destinationMap = new Map(redirects.map(({ from, to }) => [from, to]));
  for (const locale of ['en', 'fr']) {
    assert.ok(!destinationMap.has(localized(locale, '/services/polymeric-sand-replacement')), 'Restored polymeric-sand page must not redirect away');
  }
  for (const { from } of redirects) {
    const seen = new Set();
    let destination = from;
    while (destinationMap.has(destination)) {
      assert.ok(!seen.has(destination), `Redirect loop starting at ${from}`);
      seen.add(destination);
      destination = destinationMap.get(destination);
    }
  }
  assert.ok(redirects.find((redirect) => redirect.from === '/thank-you.html')?.force, 'Legacy thank-you file needs a forced redirect');
  const formHeaders = config.match(/\[\[headers\]\]\s*for\s*=\s*"\/__forms\.html"([\s\S]*?)(?=\[\[|$)/)?.[1];
  assert.ok(formHeaders && /X-Robots-Tag\s*=\s*"noindex,\s*nofollow"/.test(formHeaders), 'Form discovery file needs noindex/nofollow');
  const formDocument = parse(fs.readFileSync(path.join(output, '__forms.html'), 'utf8'));
  for (const name of ['name', 'phone', 'email', 'postal-code', 'services', 'locale']) assert.ok(formDocument.select('input').some((input) => input.name === name), `Netlify discovery missing ${name}`);
});

console.log(`\nStatic export: ${passed} checks passed; ${failures.length} failed across ${routes.length} EN/FR pages.`);
if (failures.length) process.exitCode = 1;
