# Roadmap

> **Status:** Active
> **Last updated:** 2026-05-01

---

## Change Log

| Date | Section | Change | Reason |
|---|---|---|---|
| 2026-05-01 | Header | Migrated to the new doc-header standard. | Per-doc change logs replace the central docs CHANGELOG. |
| 2026-04-30 | — | Initial version. | Capture the planned post-scaffold work. |

---

Forward-looking plan for the BitByBit landing site. Items move from
**Now → Next → Later** as priorities firm up. This document is for
external readers too — keep it readable.

For shipped product changes, see the root `CHANGELOG.md`. For decisions
behind a roadmap item, see `architecture/decisions/`.

## Now

- Replace the placeholder Lightning address (`bitbybit@geyser.fund`)
  with the real one and set `NEXT_PUBLIC_LIGHTNING_ADDRESS` in Vercel.
- Refresh the color palette (move off arena's purple/gold/green into a
  group-level identity).
- Replace arena's logo with a BitByBit-group logo.
- Audit Lighthouse: target Performance ≥95, Accessibility 100, SEO 100.
- Submit `sitemap.xml` to Google Search Console after first deploy.

## Next

- Add a `/contact` page once we have a real form or email to point at.
- Add a small "what's new" feed surfaced from each project's
  `CHANGELOG.md` (so the landing reflects active development).
- Replicate this `docs/` structure into `bitbybit-arena` and
  `bitbybit-habits`.
- Add more partners to the Partners carousel as relationships form.

## Later

- Blog or "field notes" section if and when there is something
  substantive to write — never publish empty rooms.
- Newsletter or RSS, if there is recurring content worth subscribing to.

## Out of scope

- Authentication, accounts, or any backend on this site. The landing
  page stays static.
- Hosting project content here. Each project owns its own subdomain.
