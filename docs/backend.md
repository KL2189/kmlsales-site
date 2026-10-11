# Contact and newsletter storage

Status: database deployed to Supabase project `ghjfztaaqnwljkigwsio`; server-role writes and deduplication verified in a rolled-back transaction. Netlify secrets, function publication, and browser-to-database verification are pending.

## Flow

Visitor submits contact or newsletter form → Netlify Forms accepts and retains it → signed formSubmitted event → store-forms function validates fields → Supabase RPC writes the record in one transaction.

Netlify remains the intake record. Supabase holds structured inquiries and newsletter consent. Browser success means Netlify accepted the submission, not that the asynchronous database copy has finished. No email campaign or notification provider is connected by this change.

## Data and access

- `private.website_submissions`: contact fields, source, consent, received time, review status, submission ID.
- `private.newsletter_subscribers`: normalized unique email, consent timestamp/version, source, subscription status.
- Both tables have RLS enabled and no anonymous or authenticated grants. The service role can access them. The only public-schema RPC is executable by the service role.
- Supabase credentials exist only in Netlify Functions environment variables. Do not add PUBLIC_ prefixes or put credentials in source control.
- A contact inquiry only adds a subscriber when its newsletter checkbox was selected.
- Duplicate event delivery does not duplicate an inquiry. Newsletter addresses are deduplicated. Previously unsubscribed addresses remain unsubscribed on resubmission; review fresh consent manually before resubscribing.
- No-JavaScript submissions use a stable content hash, so repeated identical messages are intentionally deduplicated.

## Deployment

1. Create the approved `kmlsales-site` project in the KML Sales organization. Confirm any cost before accepting a paid plan.
2. Apply `supabase/migrations/*_website_submissions.sql` to that project.
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` on the exact Netlify `kmlsales` site, production context and Functions scope. Mark the key secret. Redeploy after environment changes.
4. Publish this branch only when configuration is ready.
5. Submit clearly labeled synthetic test contact and newsletter entries through the deployed browser forms. Read them back from both Netlify and Supabase. Verify contact without consent does not subscribe, checkbox consent does subscribe, duplicate email does not duplicate, and existing opt-out stays opted out.
6. Check database grants and Supabase security advisors. Verify anonymous reads/writes cannot access either private table or invoke the RPC.

## Failure handling and ownership

Keith owns the Netlify Forms inbox and reviews new inquiries. Inspect `store-forms` function failures if a submission is absent in Supabase. Errors expose status codes, never submitted messages or secret keys. Failed function invocations throw for platform retry. Do not assume retry succeeded: verify the Supabase record.

Netlify keeps the accepted entry if Supabase is unavailable. After fixing configuration or database availability, replay the retained data through the same `storeSubmission` helper using its original submission ID. This avoids duplicate records. Do not delete Netlify submissions until storage has been reconciled.

Before sending newsletters, connect an email provider with a working unsubscribe link and synchronize opt-outs to `newsletter_subscribers.status`. Storage alone is not an email delivery or unsubscribe service. Until then, handle unsubscribe requests received at keith@kmlsales.com manually.

## Local checks

Run `npm run test:backend`, `npm run check:backend`, and `ASTRO_TELEMETRY_DISABLED=1 npm run build`. The tests cover normalization, consent, spam, retry IDs, validation, missing secrets, and storage failures using a mocked network. They do not prove deployed event delivery or database permissions.

## Existing dependency findings

The repository's Astro 5 dependency tree has npm audit advisories, including its nested sharp image dependency. This deployment produces static files, not an Astro request server. A major framework upgrade needs its own compatibility check; it is not silently included in the form-storage change.
