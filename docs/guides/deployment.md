# Deployment

> **Status:** Active
> **Last updated:** 2026-05-01

---

## Change Log

| Date | Section | Change | Reason |
|---|---|---|---|
| 2026-05-01 | Header | Migrated to the new doc-header standard. | Per-doc change logs replace the central docs CHANGELOG. |
| 2026-04-30 | Environment variables | Added `NEXT_PUBLIC_LIGHTNING_ADDRESS`. | Support section needs a Lightning address sourced from env. |
| 2026-04-30 | — | Initial version. | First-deploy and rollback playbook. |

---

The site deploys to Vercel on the Hobby plan from a private GitHub
repository under <https://github.com/bitbybit-ar>.

## First deploy

1. Push the repo to GitHub (private OK on the Hobby plan).
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework: **Next.js** (auto-detected).
4. Environment variables: set `NEXT_PUBLIC_BASE_URL` to
   `https://bitbybit.com.ar` for the **Production** environment, and
   `NEXT_PUBLIC_LIGHTNING_ADDRESS` to the real BitByBit Lightning
   address. Preview deploys can leave them unset and fall back to
   Vercel preview URLs / placeholder values.
5. Click **Deploy**.

## Custom domain

1. Vercel → project → **Settings → Domains**.
2. Add `bitbybit.com.ar` and `www.bitbybit.com.ar`.
3. Configure the apex domain (`bitbybit.com.ar`) as the canonical and
   set `www` to redirect to it.
4. Update DNS at your registrar:
   - `bitbybit.com.ar` → Vercel `A` records (or `ALIAS`/`ANAME` if
     supported).
   - `www.bitbybit.com.ar` → CNAME to `cname.vercel-dns.com`.
5. Wait for Vercel to issue the SSL certificate (a few minutes).

## Continuous deployment

- Pushes to `main` trigger a production deploy.
- PR branches trigger preview deploys with a Vercel-generated URL.
- The Vercel GitHub integration adds a status check to each PR — wait
  for it to be green before merging.

## Rolling back

See `docs/runbooks/deploy-rollback.md`.

## After deploy: SEO checklist

- Visit `https://bitbybit.com.ar/sitemap.xml` and confirm both locales
  appear with `hreflang` alternates.
- Visit `https://bitbybit.com.ar/robots.txt` and confirm the sitemap
  pointer is present and the host is correct.
- Submit the sitemap to **Google Search Console** and **Bing
  Webmaster Tools**. Add a verification meta tag if either prompts.
- Test the structured data:
  <https://search.google.com/test/rich-results>.
- Test the OG image preview:
  <https://www.opengraph.xyz/url/https%3A%2F%2Fbitbybit.com.ar>.
- Run Lighthouse against production. Target Performance ≥95,
  Accessibility 100, Best Practices ≥95, SEO 100.

## Environment variables

| Variable | Required | Used for |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | yes | canonical URLs, sitemap, robots, OG, JSON-LD |
| `NEXT_PUBLIC_LIGHTNING_ADDRESS` | no | Lightning address shown in the Support section. Falls back to a placeholder when unset — replace before launch |

There are no secrets. Anything secret means you are building the wrong
thing on this site.
