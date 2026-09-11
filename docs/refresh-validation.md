# EDMTL refresh validation

Validated locally on September 11, 2026, on `codex/figma-refresh`, based on main commit `388b465`.

| Check | Result |
| --- | --- |
| Next.js production build and static export | Passed; 28 English/French content pages plus generated assets |
| TypeScript | Passed |
| ESLint, including validation scripts | Passed without warnings |
| Static export acceptance | 77 checks passed |
| Quote form server rendering and private language handoff | Passed |
| Terms production approval gate | 14 rendered-component scenarios passed |
| Browser regression | 15 scenarios passed, using mocked submissions and blocked external requests |
| Working-tree whitespace check | Passed |

The export checks cover language attributes, localized metadata, canonical and reciprocal language links, service forms and preselection, exactly four homepage service cards, the 22-page indexable sitemap, noindex exclusions, responsive image references, social preview images, app icons and legacy redirects.

Browser coverage includes both form placements, required and optional fields, multiple and secondary service selections, legacy query links, language changes without lost entries, HTTP/network failures and retries, duplicate protection, one conversion after success, English/French confirmation routes and analytics without personal field values. Mobile-menu and gallery keyboard focus, filtering, enlargement and Escape controls were verified.

Visual reviews covered 320px, 375px, 768px and 1440px layouts, including longer French copy. The dedicated quote introduction was simplified after review; both Name and Phone now appear above the fixed mobile action bar at 320px and 375px. Before/after comparison images retain both sides.

The local preview is served at `http://localhost:3000`. No live quote requests were sent during testing. Netlify form delivery and deployment are not exercised by local mocked tests.

Terms remain subject to client approval. See the [English draft](terms-draft.en.md), [French draft](terms-draft.fr.md), and separate [review notes](terms-review.en.md). Production builds with Netlify's `CONTEXT=production` serve a contact placeholder unless the explicit approval setting is enabled; drafts remain excluded from search indexing.
