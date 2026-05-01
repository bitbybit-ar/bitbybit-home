# BitByBit landing — agent instructions

This file is the canonical guide for any AI agent (or human) working on the
BitByBit landing site. Read it before editing the repo.

## Project shape

- Static-only Next.js 16 (App Router) site at `bitbybit.com.ar`.
- No backend, no database, no API routes, no auth, no runtime data fetching.
- next-intl (es default, en secondary). next-themes for light/dark.
- Deploys to Vercel Hobby from a private GitHub repo under
  <https://github.com/bitbybit-ar>.

## Documentation standard

Every document under `docs/` — plus the root `CHANGELOG.md`,
`CONTRIBUTING.md`, and `CLAUDE.md` itself — **must** follow the structure
below. ADR files and runbook files keep their own specialized header
(Status / Deciders / Date for ADRs; Owner / Severity / Last reviewed for
runbooks) but still carry an inline `## Change Log` section.

Top-level files at the repo root:

- `README.md` — project overview, quick links.
- `CHANGELOG.md` — product release log (Keep a Changelog + SemVer).
- `CONTRIBUTING.md` — contribution flow + vulnerability disclosure.
- `CLAUDE.md` — this file.

Everything else under `docs/`.

### Required header

```markdown
# <Document title>

> **Status:** Active | Draft | Deprecated | Superseded by <link>
> **Last updated:** YYYY-MM-DD

---

## Change Log

| Date | Section | Change | Reason |
|---|---|---|---|
| YYYY-MM-DD | — | Initial version. | <why this doc exists> |

---
```

Rules for the header:

- **Status** values: `Active`, `Draft`, `Deprecated`, or
  `Superseded by <relative-link>`. No other values.
- **Last updated** is the date of the most recent meaningful edit. Keep it
  in sync with the top row of the change log.
- **No GitHub issue reference yet** — once issues exist, add a
  `> **GitHub Issue:** [#NNN](url)` line above `Status`.
- The change log lives **inside the doc**, not in a central file. One
  global `CHANGELOG.md` at the repo root tracks **product releases**; per-
  doc change logs track **doc deltas**. They are different things.
- Change-log rows are append-style, **newest at the top**, with absolute
  ISO dates (`YYYY-MM-DD`).
- The **Reason** column is required — what motivated the change, not just
  what changed. If the answer is "typo" or "rephrasing", the row is
  probably not worth recording.
- Use `—` in `Section` for whole-document edits.

### Table of Contents

Add a `## Table of Contents` immediately after the change log **only if**
the document has 5+ top-level sections or is longer than ~150 lines.
Short docs (mission, code of conduct, security, glossary, FAQ) do not
need a TOC.

### Style rules

- Sentence case for headings.
- Imperative mood in runbooks and guides.
- ISO 8601 dates everywhere.
- Hard-wrap at ~80 columns.
- One blank line between sections.
- Code fences always tagged with the language.
- No emoji unless the user explicitly asked.

### Where the canonical template lives

`docs/_template.md`. Copy it when creating a new doc. Do not invent a
different header shape.

## Code rules (enforced)

- Static-only. Adding API routes, server actions, runtime data fetching,
  or any backend integration is out of scope. If you need any of those,
  the work belongs on a project subdomain, not on this repo.
- Every user-facing string goes through next-intl. Add the key to **both**
  `messages/es.json` and `messages/en.json` in the same change.
- New colors/spacing/typography go into `styles/_theme.scss` as tokens.
  Never hardcode hex or px values.
- One `<h1>` per page. It lives in `Story`. Other sections use `<h2>`.
- External links carry `target="_blank" rel="noopener noreferrer"`.
- All raster images go through `next/image`. `priority` only on the hero.
- Follow the existing component layout: `Foo/index.tsx` +
  `Foo/foo.module.scss`.

## When you make a change

1. Update the affected doc's `## Change Log` table.
2. Update `## Last updated` to today's date.
3. If the change is user-visible at the product level, also add a row in
   the **root** `CHANGELOG.md` under `## [Unreleased]`.
4. If the change is a significant architectural decision, also add an
   ADR under `docs/architecture/decisions/`.

## Pointers

- Stack and routing: `docs/architecture/overview.md`.
- Local setup: `docs/guides/getting-started.md`.
- Deployment: `docs/guides/deployment.md`.
- Conventions: `docs/guides/development.md`.
- Doc template: `docs/_template.md`.
- Project release log: root `CHANGELOG.md`.
