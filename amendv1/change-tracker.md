# EDMTL Amendment v1 - Change Tracker

**Created:** 2026-04-05
**Last Updated:** 2026-04-05
**Source:** `amendv1/plan.md`
**Status Legend:** `[ ]` = Pending | `[x]` = Done | `[S]` = Skipped (see reason) | `[?]` = Needs clarification
**Build Status:** ✅ `npm run build` passes (20/20 pages generated, 0 errors)

---

## SECTION 1: FRONT PAGE AMENDMENTS

### 1.1 Bold Service Text in Hero Section
- **Plan:** Make "Window Cleaning / Gutter Cleaning / etc" text bold. Keep font size and colour the same.
- **File:** `src/components/LocalizedContent.tsx` (lines 204-216)
- **Change:** Add `font-bold` (or `font-semibold`) to the service list text `<p>` tags
- **Status:** `[x]`

### 1.2 Google Reviews - Match Card Heights
- **Plan:** Match heights of review text boxes so they remain the same size.
- **File:** `src/components/LocalizedContent.tsx` (lines 387-407)
- **Change:** Add fixed min-height to review card divs so all cards are uniform height
- **Status:** `[x]`

### 1.3 FAQ Section - Minimize Vertical Space
- **Plan:** Minimize vertical space used by each FAQ text box. Too much dead space.
- **Files:** `src/components/LocalizedContent.tsx` (lines 456-493), `src/app/globals.css` (`.card` class)
- **Change:** Reduce padding on FAQ `.card` class and/or the FAQ-specific container. The `.card` class has `min-height: 180px` and `padding: 20px` which likely causes the dead space.
- **Status:** `[x]`

### 1.4 Contact Section - Swap Get in Touch / Request a Quote (Desktop)
- **Plan:** Desktop: switch left/right position of "Get in Touch" and "Request a Quote".
- **File:** `src/components/ContactFormSection.tsx` (lines 114-321)
- **Change:** Swap the order of the two `<div>` children inside the `grid lg:grid-cols-2` so "Request a Quote" is on the left and "Get in Touch" is on the right on desktop.
- **Status:** `[x]`

### 1.5 Contact Section - Request a Quote First (Mobile)
- **Plan:** Mobile: ensure "Request a Quote" box appears first and above "Get in Touch".
- **File:** `src/components/ContactFormSection.tsx`
- **Change:** Use CSS `order` classes (`order-first lg:order-last` etc.) or simply swap the DOM order and use `lg:order-*` to get the desired desktop layout. Since the grid stacks vertically on mobile, putting "Request a Quote" first in DOM order will make it appear first on mobile.
- **Status:** `[x]`

### 1.6 Reduce Vertical Padding Between All Sections
- **Plan:** Reduce vertical padding between sections on the front page.
- **File:** `src/components/LocalizedContent.tsx`
- **Current values:**
  - Hero section: `pt-20 pb-40 md:py-40` (line 184)
  - Services section: `py-5 lg:py-40` (line 281)
  - Trust/Reviews section: `py-5 lg:py-40` (line 344)
  - FAQ section: `py-5` (line 456)
  - Why Choose Us section: `py-16 md:py-24` (line 496)
  - Contact section: `py-12 md:py-20` (in ContactFormSection.tsx line 100)
- **Change:** Reduce the `lg:py-40` values on services and trust sections, reduce hero bottom padding, etc.
- **Status:** `[x]`

---

## SECTION 2: SERVICE PAGES AMENDMENTS

### 2.1 Rename Exterior Maintenance to Polymeric Sand Replacement
- **Plan:** Change title to "Polymeric Sand Replacement"
- **File:** `config/services.json` - exterior-maintenance entry (lines 222-246)
- **Changes:**
  - `"title"`: "General Exterior Maintenance" -> "Polymeric Sand Replacement"
  - `"pageTitle"`: "Exterior Maintenance Services Montreal" -> "Polymeric Sand Replacement Montreal"
  - `"subtitle"`: Replace with new tagline from plan
  - `"description"`: Update to match new service
- **Status:** `[x]`

### 2.2 Delete "Polymeric Sand Replacement" Section (Old)
- **Plan:** Delete the existing "Polymeric Sand Replacement" section from the exterior maintenance page.
- **File:** `config/services.json` - exterior-maintenance sections array
- **Change:** Remove the "Polymeric Sand Replacement" object from the sections array
- **Status:** `[x]`

### 2.3 Delete "Moss Removal & Soft Washing" Section
- **Plan:** Delete this section from the page.
- **File:** `config/services.json` - exterior-maintenance sections array
- **Change:** Remove the "Moss Removal & Soft Washing" object from sections array
- **Also:** Remove from `serviceSectionImages` in `page.tsx` (line 69)
- **Status:** `[x]`

### 2.4 Delete "Gutter Caulking" Section
- **Plan:** Delete this section from the page.
- **File:** `config/services.json` - exterior-maintenance sections array
- **Change:** Remove the "Gutter Caulking" object from sections array
- **Status:** `[x]`

### 2.5 Replace Tagline (Subtitle)
- **Plan:** Replace with: "Specialised polymeric sand replacement for your driveway, walkway, patio and other paved surfaces."
- **File:** `config/services.json` - exterior-maintenance `subtitle` field
- **Status:** `[x]`

### 2.6 Replace Body Text (Intro)
- **Plan:** Replace with new 3-paragraph body text about polymeric sand.
- **File:** `config/services.json` - exterior-maintenance `intro` array
- **Change:** Replace existing intro paragraphs with the 3 new paragraphs from the plan
- **Status:** `[x]`

### 2.7 Update Site Config Service Names
- **File:** `config/site.json` - services.en array (line 100)
- **Change:** "General Exterior Maintenance" -> "Polymeric Sand Replacement"
- **Also:** `config/site.json` - services.fr array (line 110) - **SKIPPED** (no French translation provided)
- **Status:** `[x]`

### 2.8 Remove Section Image Mappings for Deleted Sections
- **File:** `src/app/services/[slug]/page.tsx` (lines 68-71)
- **Change:** Remove `exterior-maintenance` entry from `serviceSectionImages` (since all sub-sections are deleted and replaced with single page content)
- **Status:** `[x]`

---

## SECTION 3: PHOTO REPLACEMENT INSTRUCTIONS

### 3.1 Front Page Splash Background
- **Plan:** Add `frontpagesplash.png` as background to hero section. Faded with less contrast.
- **Source:** `amendv1/pngs-for-website-pt1/frontpagesplash.png`
- **Destination:** Copy to `public/images/` 
- **File to edit:** `src/components/LocalizedContent.tsx` - hero section (line 182-277)
- **Status:** `[ ]`

### 3.2 Residential Window Cleaning - Image Replacements
- **First image:** Leave in place (hero: `/images/services/window-cleaning-header.png`)
- **Second image:** Replace with `windowcleaningexternalframe1.png`
  - Currently: `Interior & Exterior Window Cleaning` -> `/images/services/exterior-window-cleaning.png`
  - **Source:** `amendv1/pngs-for-website-pt1/windowcleaningexternalframe1.png`
  - **Status:** `[x]`
- **Third image:** Replace with `windowcleaninginteriortrack1.png`
  - Currently: `Residential Window Cleaning` -> `/images/services/interior-window-cleaning.png`
  - **Source:** `amendv1/pngs-for-website-pt1/windowcleaninginteriortrack1.png`
  - **Status:** `[x]`

### 3.3 Gutter Cleaning - Image Replacements
- **First image:** Replace with `guttercleaningbeforeafter1.png` (see clarifying-questions.md #1)
  - Currently: hero -> `/images/services/gutter-services-header.png`
  - **Source:** `amendv1/pngs-for-website-pt1/guttercleaningbeforeafter1.png`
  - **Status:** `[x]`
- **Second image:** Replace with `gutterguards1.png`
  - Currently: `Gutter Guards` -> `/images/services/gutter-guard-installation.png`
  - **Source:** `amendv1/pngs-for-website-pt1/gutterguards1.png`
  - **Status:** `[x]`
- **Third image:** Replace with `downspoutrepair1.png`
  - Currently: `Downspout Repair` -> `/images/services/maintenance-&-repairs-(gutter).png`
  - **Source:** `amendv1/pngs-for-website-pt2/downspoutrepair1.png`
  - **Status:** `[x]`
- **Fourth image (Caulking):** Display NO image
  - Currently: `Caulking` -> `/images/services/gutter-cleaning.png`
  - **Change:** Remove from `serviceSectionImages` mapping
  - **Status:** `[x]`

### 3.4 Pressure Washing - Image Replacements
- **First image:** Leave in place (hero: `/images/services/pressure-washing.png`)
- **Second image (Surfaces We Clean):** Display NO image
  - Currently: `/images/services/hard-surface-washing.png`
  - **Change:** Remove from `serviceSectionImages` mapping
  - **Status:** `[x]`
- **Third image:** Replace with `pressurewashingsiding1.png`
  - Currently: `Using the Right Pressure` -> `/images/services/soft-surface-cleaning.png`
  - **Source:** `amendv1/pngs-for-website-pt2/pressurewashingsiding1.png`
  - **Status:** `[x]`
- **Fourth image:** Replace with `pressurewashingcomposite1.png`
  - Currently: `Before and After Difference` -> `/images/services/surface-cleaning-and-preparation.png`
  - **Source:** `amendv1/pngs-for-website-pt2/pressurewashingcomposite1.png`
  - **Status:** `[x]`

### 3.5 Deck Staining - Image Replacements
- **First image:** Leave in place (hero: `/images/services/deck-refinishing-header.png`)
- **Second image:** Replace with `deckstaining1.png`
  - Currently: `Staining` -> `/images/services/staining-&-sealing.png`
  - **Source:** `amendv1/pngs-for-website-pt2/deckstaining1.png`
  - **Status:** `[x]`

### 3.6 Commercial Window Cleaning - Image Replacements
- **First image:** Replace with `commercialwindowcleaning1.png`
  - Currently: hero -> `/images/services/commercial-window-cleaning.png`
  - **Source:** `amendv1/pngs-for-website-pt2/commercialwindowcleaning1.png`
  - **Status:** `[x]`

### 3.7 Downspout Repair - Image Replacements
- **First image:** Replace with `downspoutrepair1.png`
  - Currently: hero -> `/images/icons/downspout.svg` (SVG icon, not a photo)
  - **Source:** `amendv1/pngs-for-website-pt2/downspoutrepair1.png`
  - **Status:** `[x]`

### 3.8 Dryer Vent Cleaning - Image Replacements
- **First image:** Replace with `dryerventcleaning1.png`
  - Currently: hero -> `/images/icons/dryer-vent.svg` (SVG icon, not a photo)
  - **Source:** `amendv1/pngs-for-website-pt2/dryerventcleaning1.png`
  - **Status:** `[x]`

### 3.9 Polymeric Sand (Exterior Maintenance) - Image Replacement
- **First image:** Replace with `polymericsand1.png`
  - Currently: hero -> `/images/services/moss-removal.png`
  - **Source:** `amendv1/pngs-for-website-pt2/polymericsand1.png`
  - **Also update:** `opengraph-image.tsx` mapping
  - **Status:** `[x]`

---

## SKIPPED ITEMS

| # | Item | Reason |
|---|------|--------|
| S1 | French translation for new Polymeric Sand content | Plan only provides English text. See clarifying-questions.md #5 |
| S2 | URL slug change for exterior-maintenance | Not mentioned in plan. See clarifying-questions.md #4 |
| S3 | New icon for Polymeric Sand service card | No icon provided in amendment images. See clarifying-questions.md #9 |
| S4 | French service name update in site.json | No French translation provided. See clarifying-questions.md #5 |

---

## FILES TO BE MODIFIED

| File | Sections Affected |
|------|-------------------|
| `src/components/LocalizedContent.tsx` | 1.1, 1.2, 1.3, 1.6, 3.1 |
| `src/components/ContactFormSection.tsx` | 1.4, 1.5 |
| `src/app/globals.css` | 1.3 (FAQ card styling) |
| `config/services.json` | 2.1-2.6 |
| `config/site.json` | 2.7 |
| `src/app/services/[slug]/page.tsx` | 2.8, 3.2-3.9 (image mappings) |
| `src/app/services/[slug]/opengraph-image.tsx` | 3.9 (OG image mapping) |

## IMAGES TO COPY TO `public/images/services/`

| Source | Destination |
|--------|-------------|
| `amendv1/pngs-for-website-pt1/frontpagesplash.png` | `public/images/frontpagesplash.png` |
| `amendv1/pngs-for-website-pt1/windowcleaningexternalframe1.png` | `public/images/services/windowcleaningexternalframe1.png` |
| `amendv1/pngs-for-website-pt1/windowcleaninginteriortrack1.png` | `public/images/services/windowcleaninginteriortrack1.png` |
| `amendv1/pngs-for-website-pt1/guttercleaningbeforeafter1.png` | `public/images/services/guttercleaningbeforeafter1.png` |
| `amendv1/pngs-for-website-pt1/gutterguards1.png` | `public/images/services/gutterguards1.png` |
| `amendv1/pngs-for-website-pt2/downspoutrepair1.png` | `public/images/services/downspoutrepair1.png` |
| `amendv1/pngs-for-website-pt2/pressurewashingsiding1.png` | `public/images/services/pressurewashingsiding1.png` |
| `amendv1/pngs-for-website-pt2/pressurewashingcomposite1.png` | `public/images/services/pressurewashingcomposite1.png` |
| `amendv1/pngs-for-website-pt2/deckstaining1.png` | `public/images/services/deckstaining1.png` |
| `amendv1/pngs-for-website-pt2/commercialwindowcleaning1.png` | `public/images/services/commercialwindowcleaning1.png` |
| `amendv1/pngs-for-website-pt2/dryerventcleaning1.png` | `public/images/services/dryerventcleaning1.png` |
| `amendv1/pngs-for-website-pt2/polymericsand1.png` | `public/images/services/polymericsand1.png` |
