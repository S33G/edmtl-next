# Clarifying Questions - EDMTL Amendment v1

These questions arose during analysis of `plan.md` against the current codebase. Items were **skipped** or flagged where assumptions would be needed.

---

## 1. Image Filename Mismatch: `guttercleaningbeforeafter`

**Plan says (line 67):** `guttercleaningbeforeafter` (no file extension, no "1" suffix)
**Actual file available:** `amendv1/pngs-for-website-pt1/guttercleaningbeforeafter1.png`

**Question:** Should we use `guttercleaningbeforeafter1.png`? It's the only file that closely matches. The plan omitted the `.png` extension and the `1` suffix.

---

## 2. Gutter Cleaning "Caulking" Section - Display No Image

**Plan says (line 70):** "Please display no image for the 'CAULKING' section."

**Current state:** The Caulking section on the Gutter Cleaning page currently has an image mapped (`/images/services/gutter-cleaning.png`).

**Question:** Should we simply remove the image from this section, or should the entire Caulking section be removed? The plan only says "display no image", so we'll just remove the image reference.

---

## 3. Pressure Washing "Surfaces We Clean" - Display No Image

**Plan says (line 72):** "Please display no image for 'SURFACES WE CLEAN' section."

**Current state:** This section currently has an image (`/images/services/hard-surface-washing.png`).

**Question:** Confirm: we remove only the image, keeping the section text/content intact? That's what we'll do based on the plan wording.

---

## 4. Exterior Maintenance Slug - Keep or Change?

**Plan says:** Rename "Exterior Maintenance" to "Polymeric Sand Replacement" as a dedicated page.

**Current state:** The URL slug is `exterior-maintenance` which maps to `/services/exterior-maintenance`.

**Question:** Should the URL slug also change to `polymeric-sand` (or `polymeric-sand-replacement`)? Changing the slug will change the URL, which could break any existing links/bookmarks. The plan doesn't mention URL changes. **We will keep the slug `exterior-maintenance` for now** to avoid breaking links, but the displayed title/content will all say "Polymeric Sand Replacement".

---

## 5. French Translations

**Current state:** The site has French locale support. The plan provides English-only content for the new Polymeric Sand page text.

**Question:** Should we also update the French content/translations for:
- The service name in `site.json` (currently "Entretien Exterieur General")
- Any French version of the new body text for Polymeric Sand?

**Skipped for now** - only English changes will be made as specified in the plan.

---

## 6. Front Page Background Image Positioning

**Plan says (line 53-55):** "Please add the following photo file name as a background. Make the photo faded and with less contrast so that the logo and text are still visually bold and readable."
**File:** `frontpagesplash.png`

**Questions:**
- The hero section currently has no background image - it uses a gradient background. Should the image be full-width behind the entire hero section?
- "Faded and with less contrast" - should we use an overlay + CSS filter (opacity, brightness, contrast)? What level of fade is acceptable?
- **We will implement as:** full-width background image on the hero section with a dark overlay + reduced opacity/contrast via CSS so text remains readable.

---

## 7. Review Box Heights - Fixed or Min-Height?

**Plan says (line 9-10):** "Match heights of the review text boxes so they remain the same size instead of vertical resizing depending on the amount of lines of text."

**Question:** Should all review cards have the same fixed height (potentially truncating very long reviews), or should we set a min-height that accommodates the longest review? 

**We will implement as:** A fixed minimum height on all review cards so they appear uniform, with overflow handling if text exceeds.

---

## 8. Service Page Image Mapping - Section Position vs Section Name

**Plan says:** "I have labelled these as the position of the current photos shown on the service pages numerically as they appear in order"

For some service pages, the "first image" is the hero/header image, followed by section images. We're interpreting:
- **First image** = Hero/header image at the top of the service page
- **Second image, Third image, etc.** = Images within each content section, in order

**Question:** Is this interpretation correct? The sections in `services.json` define the order, so "Second image" = first section's image, "Third image" = second section's image, etc.

---

## 9. Icon for Polymeric Sand Service

**Current state:** The service card on the home page uses `/images/icons/general-maintenance.svg` for the exterior-maintenance service.

**Question:** Should this icon remain as-is, or should a new icon be provided for Polymeric Sand? No new icon was included in the amendment images.

**Skipped** - keeping the existing icon.

---

## 10. OpenGraph Image for Polymeric Sand Page

**Current state:** The OG image for `exterior-maintenance` uses `moss-removal.png`.

**Question:** Should the OG image be updated to use `polymericsand1.png` instead? The plan doesn't mention OG images, but since we're replacing the entire page content it would make sense.

**We will update** the OG image mapping to use the new polymeric sand image for consistency.
