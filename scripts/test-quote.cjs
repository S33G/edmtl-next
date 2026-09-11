const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, filename) => {
    const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
      fileName: filename,
    });
    module._compile(result.outputText, filename);
  };
}

const handoff = require('../src/lib/quote-draft.ts');
const values = new Map();
global.window = {
  location: { pathname: '/services/window-cleaning' },
  sessionStorage: {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  },
};
const draft = { name: 'Test Visitor', phone: '438 555 0100', email: '', postalCode: 'H1A 1A1', selectedServices: ['window-cleaning', 'dryer-vent-cleaning'] };
let submitting = false;
const unregister = handoff.registerQuoteDraftProvider(() => ({ draft, isSubmitting: submitting }));

assert.equal(values.size, 0, 'Ordinary edits do not persist contact details');
assert.equal(handoff.prepareQuoteLanguageSwitch(), true);
assert.equal(values.size, 1);
window.location.pathname = '/fr/services/window-cleaning';
assert.deepEqual(handoff.consumeQuoteLanguageDraft(), draft, 'Equivalent French page restores all entered details');
assert.equal(handoff.consumeQuoteLanguageDraft(), null, 'Draft is consumed only once');
assert.equal(values.size, 0);

window.location.pathname = '/services/window-cleaning';
handoff.prepareQuoteLanguageSwitch();
assert.equal(handoff.consumeQuoteLanguageDraft(), null, 'Reloading the original language cannot restore a handoff');
handoff.prepareQuoteLanguageSwitch();
window.location.pathname = '/fr/contact';
assert.equal(handoff.consumeQuoteLanguageDraft(), null, 'Drafts cannot leak onto a different page');

window.location.pathname = '/contact';
handoff.prepareQuoteLanguageSwitch();
let [key, serialized] = [...values][0];
values.set(key, JSON.stringify({ ...JSON.parse(serialized), expiresAt: Date.now() - 1 }));
window.location.pathname = '/fr/contact';
assert.equal(handoff.consumeQuoteLanguageDraft(), null, 'Expired drafts are discarded');
assert.equal(values.size, 0);

submitting = true;
assert.equal(handoff.prepareQuoteLanguageSwitch(), false, 'Language switching is blocked while a submission is in flight');
assert.equal(values.size, 0);
submitting = false;
values.set(key, '{invalid json');
assert.equal(handoff.consumeQuoteLanguageDraft(), null);
assert.equal(values.size, 0, 'Invalid data is consumed without crashing');
unregister();
assert.equal(handoff.prepareQuoteLanguageSwitch(), true, 'Pages without a quote form can switch language');
delete global.window;
assert.equal(handoff.prepareQuoteLanguageSwitch(), true, 'Handoff is safe to import on the server');

const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const ContactFormSection = require('../src/components/ContactFormSection.tsx').default;
const { getServices, getPrimaryServices } = require('../src/lib/services.ts');

for (const locale of ['en', 'fr']) {
  assert.equal(getPrimaryServices(locale).length, 4);
  for (const service of getServices(locale)) {
    const html = renderToStaticMarkup(React.createElement(ContactFormSection, { locale, serviceSlug: service.slug }));
    const inputs = html.match(/<input\b[^>]*>/g);
    const named = (name) => inputs.find((tag) => tag.includes(`name="${name}"`));
    assert.equal((html.match(/<form\b/g) ?? []).length, 1, 'Each card contains exactly one actual form');
    assert.match(html, /id="quote"/);
    assert.match(html, /data-netlify="true"/);
    assert.match(named('name'), /required=""/);
    assert.match(named('phone'), /required=""/);
    assert.doesNotMatch(named('email'), /required=/);
    assert.doesNotMatch(named('postal-code'), /required=/);
    assert.match(named('locale'), new RegExp(`value="${locale}"`));
    assert.match(named('message'), /type="hidden"/);
    assert.doesNotMatch(html, /<textarea/);
    const selected = inputs.filter((tag) => tag.includes('type="checkbox"') && tag.includes('checked=""'));
    assert.equal(selected.length, 1);
    assert.ok(selected[0].includes(`value="${service.slug}"`), 'Current service is preselected in server HTML');
    for (const field of ['name', 'phone', 'email', 'postal-code']) {
      const input = named(field);
      const id = input.match(/id="([^"]+)"/)[1];
      assert.ok(html.includes(`for="${id}"`), `Label is connected to ${field}`);
      assert.match(input, /autoComplete="/);
    }
    assert.ok(html.includes(locale === 'fr' ? 'Obtenez un devis gratuit' : 'Get a free quote'));
    assert.ok(html.includes(`action="${locale === 'fr' ? '/fr' : ''}/thank-you"`));
    if (!service.primary) assert.match(html, /aria-expanded="true"/, 'Preselected secondary service is visible');
  }
}

const legacy = renderToStaticMarkup(React.createElement(ContactFormSection, { serviceSlug: 'polymeric-sand-replacement' }));
assert.match(legacy, /checked=""[^>]*value="pressure-washing"|value="pressure-washing"[^>]*checked=""/);
console.log('Quote form: bilingual SSR, required fields, service preselection and private language handoff checks passed.');
