/* Render the real terms component under deployment settings without changing app files. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const sourceRoot = path.resolve(__dirname, '../src');
for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, filename) => {
    const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
      fileName: filename,
      transformers: {
        before: [(context) => {
          const visit = (node) => {
            if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text.startsWith('@/')) {
              return ts.factory.updateImportDeclaration(node, node.modifiers, node.importClause, ts.factory.createStringLiteral(path.join(sourceRoot, node.moduleSpecifier.text.slice(2))), node.attributes);
            }
            return ts.visitEachChild(node, visit, context);
          };
          return (file) => ts.visitNode(file, visit);
        }],
      },
    });
    module._compile(result.outputText, filename);
  };
}
// CSS has no effect on server markup; keep the actual page and child components.
require.extensions['.css'] = () => {};

const { TermsPage } = require('../src/components/SupportingPages.tsx');
const original = { CONTEXT: process.env.CONTEXT, EDMTL_TERMS_APPROVED: process.env.EDMTL_TERMS_APPROVED };
const scenarios = [
  { name: 'unapproved production', context: 'production', approval: undefined, published: false },
  { name: 'explicitly unapproved production', context: 'production', approval: 'false', published: false },
  { name: 'uppercase approval is not authorization', context: 'production', approval: 'TRUE', published: false },
  { name: 'numeric approval is not authorization', context: 'production', approval: '1', published: false },
  { name: 'local review', context: undefined, approval: undefined, published: true },
  { name: 'deploy preview review', context: 'deploy-preview', approval: undefined, published: true },
  { name: 'approved production', context: 'production', approval: 'true', published: true },
];
let checked = 0;

function setEnvironment(name, value) {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

try {
  for (const scenario of scenarios) {
    setEnvironment('CONTEXT', scenario.context);
    setEnvironment('EDMTL_TERMS_APPROVED', scenario.approval);
    for (const locale of ['en', 'fr']) {
      const html = renderToStaticMarkup(React.createElement(TermsPage, { locale }));
      const heading = locale === 'fr' ? 'Conditions de service' : 'Terms of service';
      const placeholder = locale === 'fr' ? 'Communiquez avec EDMTL pour confirmer les conditions' : 'Contact EDMTL to confirm the terms';
      assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Every state needs one page heading');
      assert.ok(html.includes(heading), 'The page title must use the requested language');
      assert.match(html, /href="mailto:info@edmtl\.com"/, 'Customers must retain an email contact');
      assert.match(html, /href="tel:4385003099"/, 'Customers must retain a phone contact');
      if (scenario.published) {
        assert.match(html, /<article\b/, 'Review or approved terms must render the terms body');
        assert.equal((html.match(/<h2\b/g) || []).length, 7, 'All seven draft sections must render');
        assert.ok(html.includes(locale === 'fr' ? 'Modes de paiement' : 'Payment methods'), 'Commercial terms must be present for review');
        assert.ok(html.includes(`href="${locale === 'fr' ? '/fr' : ''}/privacy-policy"`), 'Privacy link must match the page language');
        assert.ok(!html.includes(placeholder), 'Contact placeholder must not replace review or approved terms');
      } else {
        assert.ok(html.includes(placeholder), 'Unapproved production must show the localized contact placeholder');
        assert.doesNotMatch(html, /<article\b|<h2\b/, 'Unapproved terms must not appear anywhere in server markup');
        assert.doesNotMatch(html, /Payment methods|Modes de paiement|e-transfer|Interac/, 'Unapproved commercial terms must be absent, not merely hidden');
      }
      checked += 1;
      console.log(`PASS Terms ${locale}: ${scenario.name}`);
    }
  }
} finally {
  for (const [name, value] of Object.entries(original)) setEnvironment(name, value);
}

console.log(`Terms publication gate: ${checked} rendered component scenarios passed.`);
