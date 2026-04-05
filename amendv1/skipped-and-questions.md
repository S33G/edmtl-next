# EDMTL Amendment v1 — Skipped Items & Open Questions

Everything below was either **skipped** during implementation (insufficient info in the plan) or **needed a decision** before we could act on it.

**Last Updated:** 2026-04-05

---

## Skipped Items (Deferred)

### S1. French Translation — Polymeric Sand Page Content — ⏸️ DEFERRED

The plan provides English-only body text for the new Polymeric Sand Replacement page (title, subtitle, 3 intro paragraphs). The site supports French and the old Exterior Maintenance page had French content.

**What we need:** French translation for:
- Page title ("Polymeric Sand Replacement")
- Subtitle ("Specialised polymeric sand replacement for your driveway, walkway, patio and other paved surfaces.")
- All 3 intro paragraphs

**What happens if unanswered:** The French version of this page will show stale/mismatched Exterior Maintenance text.

**Decision:** Skip for now.

---

### S2. French Service Name in Navigation — ⏸️ DEFERRED

`config/site.json` has a French services list. We updated the English entry from "General Exterior Maintenance" → "Polymeric Sand Replacement", but the French entry still reads "Entretien Extérieur Général".

**What we need:** The French service name (e.g. "Remplacement de Sable Polymérique"?).

**What happens if unanswered:** The French nav/footer will still show the old service name.

**Decision:** Skip for now.

---

### S3. URL Slug — ✅ RESOLVED

~~The page URL was `/services/exterior-maintenance`.~~

**Decision:** Changed slug to `polymeric-sand-replacement`. URL is now `/services/polymeric-sand-replacement`. Updated across all files (services.json, site.json, page.tsx, opengraph-image.tsx, LocalizedContent.tsx).

---

### S4. Polymeric Sand Service Icon — ✅ RESOLVED

The home page service card uses `/images/icons/general-maintenance.svg` (a generic maintenance icon).

**Decision:** Generic icon is fine for now. No change needed.

---

## Open Questions (All Resolved)

### Q1. Image Filename Mismatch — `guttercleaningbeforeafter` — ✅ CONFIRMED

Used `guttercleaningbeforeafter1.png`. Confirmed correct.

---

### Q2. Gutter Cleaning "Caulking" Section — No Image — ✅ CONFIRMED

Removed image reference only, kept section text intact. Confirmed correct.

---

### Q3. Pressure Washing "Surfaces We Clean" — No Image — ✅ CONFIRMED

Removed image reference only, kept section content intact. Confirmed correct.

---

### Q4. Front Page Background — Fade Level — ✅ CONFIRMED

Applied `opacity: 0.15`, `brightness: 0.7`, `contrast: 0.8` with dark gradient overlay. Confirmed looks good.

---

### Q5. Review Card Heights — ✅ RESOLVED

Fixed min-height approach did not work. Changed to CSS Grid `h-full` on cards so all cards in the same grid row stretch to match the tallest testimonial dynamically.

---

### Q6. Service Page Image Order — ✅ CONFIRMED

First image = hero/header, second/third/etc = section images in DOM order. Confirmed correct.

---

### Q7. OpenGraph Image for Polymeric Sand — ✅ CONFIRMED

Updated OG image to `polymericsand1.png`. Confirmed correct.
