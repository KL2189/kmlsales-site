# kmlsales.com

Source for the KML Sales website, built with [Astro](https://astro.build).

## Run locally

```bash
npm ci
npm run dev      # http://localhost:4321
npm run build    # outputs the static site to dist/
```

## Where things live

| What | File |
| --- | --- |
| Booking link, email, Tempo link | `src/config.ts` |
| Services (homepage + services page) | `src/data/services.ts` |
| Homepage | `src/pages/index.astro` |
| Blog posts (Markdown) | `src/content/blog/*.md` |
| Base styles and dark interactive theme | `src/styles/global.css`, `src/styles/immersive.css` |
| Interactive process example | `src/components/ProcessExplorer.astro` |
| Header, footer, newsletter form | `src/layouts/Base.astro` |

## Add a blog post

Create `src/content/blog/my-post.md`:

```md
---
title: Post title
description: One-sentence summary shown on the blog list.
date: 2026-10-11
readMinutes: 4
---

Post body in Markdown.
```

## Forms

Contact and newsletter forms use Netlify Forms. Submissions show up in Netlify under **Forms**.

## Deploy

Hosted on Netlify (project `kmlsales`). `netlify.toml` sets the build command and output folder.
`scripts/og.mjs` renders the social share image at build time.

## Writing rules for site copy

- Two sentences max per paragraph. The strongest line stands alone.
- No three-item lists for rhetorical effect, no staccato fragments.
- No "it's not X, it's Y" contrasts, no colon setups ("The result: ..."), no em dashes.
- Speak to the reader in second person. No "most teams" generalizations.
- Brand colors only: black, white, and grays. No blue or purple.

## Interactive redesign

The homepage uses a continuous black background, a CSS gradient centerpiece, and an interactive demo-request example. Motion can be paused and respects reduced-motion preferences.

The process example shows the expected path and the recovery path when no contact is recorded. It is illustrative, not a live CRM integration.

Approved logos and local Inter and Libre Baskerville fonts live in `public/`. Font licenses are included. The social share image is generated during the build.

The design distinguishes GTM workflow design from separately scoped implementation. Contact, newsletter, and app notification forms retain Netlify Forms integration. Local testing does not verify delivery through Netlify.

For a restricted local environment, run `ASTRO_TELEMETRY_DISABLED=1 npm run build` to disable optional Astro telemetry.
