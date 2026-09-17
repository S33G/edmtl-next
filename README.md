# EDMTL — Entretien Domestique Montréal

A bilingual, statically exported Next.js website for EDMTL. English routes remain at the site root; equivalent French pages live under `/fr`. Separate locale layouts set the correct HTML language before JavaScript runs.

## Run locally

```sh
npm install
npm run dev
```

For the production export and local preview:

```sh
npm run build
npm run preview
```

Open http://localhost:3000. The preview serves `out/` and mirrors the configured legacy redirects. It does not send quote requests; browser tests intercept submissions with mock responses.

## Content and design

- `src/data/services.en.json` and `services.fr.json`: six service pages and six primary homepage cards. Keep slugs, section IDs and photograph assignments aligned between languages.
- `src/components/HomePage.tsx`: homepage copy, real customer reviews and labelled French translations. Original reviews remain in `config/reviews.json`.
- `src/components/SupportingPages.tsx`: FAQ, gallery introduction, privacy, terms and confirmation copy.
- `config/site.json`: existing business contact details and bilingual FAQ answers.
- `src/lib/i18n.ts`: locale types, navigation translations and URL helpers.
- `src/app/globals.css`: cream, beige, white and gold theme, responsive layouts and accessible controls.
- `src/data/gallery.ts`: verified before/after comparisons and project photographs, with descriptive alternative text. V6 removes visible captions.
- `public/images/`: existing source photographs. Run `npm run images` to regenerate responsive WebP copies, the image manifest and app icons. Original photographs remain available at their existing URLs.

Older markdown and configuration files are retained as source references; they no longer drive the refreshed page layouts.

## Pages and search visibility

The homepage links to gutter cleaning, window cleaning, pressure washing, dryer-vent cleaning, deck sanding & staining, and polymeric sand replacement. Commercial window cleaning is a text-only section on the window-cleaning page; its former English/French pages redirect there. Every public page has an English and French route, including the game and confirmation page. See [V6 follow-up questions](docs/client-v6-follow-up-questions.md) for the client’s confirmed answers and photo assignments.

Metadata includes localized titles/descriptions, self-canonical URLs, reciprocal language alternatives and localized social previews. Service pages include Service and Breadcrumb structured data. `src/app/sitemap.ts` and `robots.ts` are the only sitemap/robots sources.

Permanent Netlify redirects preserve older deck-refinishing/gutter-services aliases. V6 restores polymeric-sand-replacement as a standalone page in both languages and removes its former redirect to pressure-washing. Internal links, canonical URLs and the sitemap point directly to current destinations.

Thank-you pages, the game, the form-discovery utility and unapproved Terms pages are excluded from indexing.

## Quote forms and analytics

The same form appears on `/contact` and every service page. All six primary choices are visible without a disclosure. Name, phone and at least one service are required; email and postal code are optional. Legacy service query values resolve to the current service names. Older commercial service query values now select Window Cleaning.

Netlify discovers `contact-form` through `public/__forms.html`. Fields include name, phone, email, postal-code, services, locale and the existing hidden message field. Successful submissions redirect to the matching locale’s thank-you page. There is no visible message field.

The latest Google Tag Manager container and event tracking are retained. A lead event fires once after a successful server response. Form values are never included in the form’s analytics events. Failed submissions keep entries; language switching transfers a draft through tab-scoped session storage, consumes it on arrival and rejects expired drafts after ten minutes.

## Terms approval

Read the standalone [English draft](docs/terms-draft.en.md), [French draft](docs/terms-draft.fr.md), and separate [English review notes](docs/terms-review.en.md) / [French review notes](docs/terms-review.fr.md).

Local and deploy previews show the draft page text. Netlify production builds (`CONTEXT=production`) show a contact placeholder unless `EDMTL_TERMS_APPROVED=true` is explicitly set after client approval. Approval and search indexing are separate steps: the Terms pages remain noindex and outside the sitemap until those settings are deliberately updated.

No deployment is required to review this branch. Netlify’s existing deployment command also invokes a Discord notification script; use `npm run build` alone for local validation.

## Verification

```sh
npm run build
npx tsc --noEmit
npm run lint
npm test
npm run preview
# In another terminal:
npm run test:browser
```

The browser suite requires Playwright and Chrome. Set `PLAYWRIGHT_MODULE_PATH` to an available Playwright module when it is outside local dependencies. Set `PLAYWRIGHT_CHANNEL` to choose a browser channel, or `bundled` for Playwright’s installed Chromium. `EDMTL_TEST_URL` defaults to http://localhost:3000.

The suite blocks external requests and mocks all submissions. It covers required/optional fields, six visible choices, multiple services, preselection, failures and retries, both language redirects, duplicate prevention, draft preservation, analytics without personal values, keyboard controls, and 320/375/768/1440px layouts. The export suite checks all 28 pages and their SEO, forms, image references, route inventory and redirects.
