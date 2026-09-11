# EDMTL terms — client review notes

Status: draft for client review. Standalone review copies are available in [English](terms-draft.en.md) and [French](terms-draft.fr.md). These notes are internal and are not customer-facing terms.

The draft uses facts already published by EDMTL: free quotes with no obligation to book, the existing service area and quoted travel beyond it, major credit cards and e-transfer, and existing contact details. It does not create fees, deposits or warranty deadlines.

## Preview and production safeguards

- Local builds and deploy previews show the seven draft sections for review. Internal review notes are not shown on the customer-facing page; its introduction uses “Working together” / “Travailler ensemble”.
- When `CONTEXT=production` and `EDMTL_TERMS_APPROVED` is not exactly `true`, `/terms` and `/fr/terms` show a simple contact placeholder instead of the unapproved terms.
- Only set `EDMTL_TERMS_APPROVED=true` after the client has approved both language versions and the remaining commercial decisions. The gate is evaluated at build time, so changing the setting requires a new production build.
- Both terms URLs remain `noindex` and excluded from the sitemap, including after the approval flag changes. Indexing requires a separate, deliberate update to metadata, Netlify headers and the sitemap after approval.

## Decisions required before approval

- Confirm the legal business name, business address and the contact responsible for service terms.
- Define how a quote is accepted, when a booking becomes confirmed and how long a quote remains valid.
- Confirm whether prices include applicable taxes, travel, materials and disposal; state how extra work is approved.
- Decide whether deposits are required, when balances are due and how receipts are provided. Define any refund arrangements.
- Confirm cancellation, rescheduling, no-show and weather-related procedures. Any notice period or charge must be explicitly approved.
- Define property-access requirements, water/electricity availability, preparation, parking and the treatment of unsafe or inaccessible work areas.
- Confirm how pre-existing damage, delicate surfaces and any damage reported after service are documented and handled.
- Define the scope and remedy of the advertised satisfaction guarantee, including the procedure and any time limit for reporting concerns.
- Confirm insurance wording and any exclusions with the business's insurer.
- Confirm how disputes and complaints are handled, and have the final English and French text reviewed for the requirements applicable to the business.

## Publication checks

- Approve the same commercial decisions in both languages; confirm which version governs, if appropriate.
- Update the standalone draft documents and page text to the approved versions before enabling the production approval flag. Remove the draft labels from the standalone documents only once approved.
- Confirm the production placeholder is shown with approval unset, and the approved copy is shown with `EDMTL_TERMS_APPROVED=true`. Treat search indexing as a separate approval step using the safeguards above.
- Keep consent language in the quote form consistent with a free inquiry: submitting an inquiry must not imply acceptance of unapproved commercial terms.
- Verify the privacy policy's existing analytics retention and cookie disclosures against the live Google configuration. The design update preserves those disclosures; it does not independently confirm account settings.
