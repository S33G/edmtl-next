# Client V6 and confirmed responses — validation

Validated 16 September 2026 on `codex/figma-refresh`.

## Delivered

Six primary services, dedicated and embedded quote forms, updated homepage and service copy, verified Google testimonials and conversational Québec French. The client's selected images from the response PDF and ZIP are installed as optimized responsive WebP assets. Gallery thumbnails fill their frames; enlarged comparisons preserve the full image.

Commercial window cleaning is now a text-only section on Window Cleaning. Its former EN/FR URLs permanently redirect to that section; old form identifiers select Window Cleaning. The polymeric-sand page remains separate.

All client questions are resolved in [the answers and photo ledger](client-v6-follow-up-questions.md). The existing Terms approval gate remains in effect.

## Checks passed

- Production static build.
- TypeScript and ESLint.
- Quote rendering, preselection, required/optional fields and private language-draft checks.
- All 14 Terms publication-gate scenarios.
- All 77 export checks across 28 English/French pages: metadata, canonicals, language alternatives, sitemap, image references, forms and redirect configuration.
- All 16 browser scenarios with external requests blocked and submissions mocked: six visible options, multiple selections, legacy aliases, French errors, failure recovery, optional fields, duplicate prevention, one successful conversion event, localized confirmations and language-switch preservation.
- Layout checks at 320, 375, 768 and 1440 pixels; six homepage cards in two desktop rows; keyboard menu and gallery focus behavior.
- Visual review of the updated desktop homepage/gallery, French small-screen homepage and mobile service form. No horizontal overflow in the captured scenarios.
- Direct browser verification that the retired French commercial URL reaches `/fr/services/window-cleaning#commercial`, whose commercial section has no photograph.
- Supplied Google review links opened: Gordon, Suzan and Valerie each show five stars, and the selected quotes match.
- Git whitespace checks.

Local preview: http://localhost:3000 (French: http://localhost:3000/fr).
