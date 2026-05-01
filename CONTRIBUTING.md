# Contributing

> **Status:** Active
> **Last updated:** 2026-05-01

---

## Change Log

| Date | Section | Change | Reason |
|---|---|---|---|
| 2026-05-01 | Code of conduct | Folded the former `docs/CODE_OF_CONDUCT.md` in here. | Code of conduct is a contribution concern, not a separate doc. |
| 2026-05-01 | Reporting a vulnerability, Doc updates | Folded the former `SECURITY.md` policy in here. Updated the doc-update step to reference per-doc change logs and the root `CHANGELOG.md`. | One file is enough: vulnerability disclosure is a contributor concern, not a separate document. Per-doc change logs replace the central docs CHANGELOG. |
| 2026-04-30 | — | Initial version. | Set the bar for contributions before the first external commit. |

---

## Table of Contents

1. [Before you start](#before-you-start)
2. [Local development](#local-development)
3. [Making changes](#making-changes)
4. [Commit messages](#commit-messages)
5. [Pull requests](#pull-requests)
6. [Architecture decisions](#architecture-decisions)
7. [Code of conduct](#code-of-conduct)
8. [Reporting a vulnerability](#reporting-a-vulnerability)
9. [Open source license](#open-source-license)

---

## Before you start

- Open an issue describing the change before sending a PR for anything
  larger than a typo. Alignment first, code second.
- Read `docs/architecture/overview.md` to understand the constraints
  (static site, no backend, SEO-first).
- Read the project README for setup.

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Visit `http://localhost:3000` — you will be redirected to `/es`.

## Making changes

- Keep the site **fully static**. Adding API routes, runtime data, or
  any backend integration is out of scope.
- Translate every user-facing string in `messages/es.json` and
  `messages/en.json`. No hardcoded copy in components.
- Use existing design tokens from `styles/_theme.scss`. If you need a
  new token, add it to the theme map; never hardcode a hex.
- One `<h1>` per page (it lives in `Story`). Use `<h2>` and `<h3>` for
  sub-sections.
- For each doc you touched, append a row to that doc's
  `## Change Log` and update its `Last updated` date.
- For product-visible changes, also append a bullet under
  `## [Unreleased]` in the **root** `CHANGELOG.md`.

## Commit messages

- Imperative mood: "Add hreflang to OG image", not "Added hreflang".
- One concern per commit. Refactors and feature work do not share a
  commit.

## Pull requests

- Reference the issue.
- Describe the user-visible change in the PR body.
- Run `npm run build` locally and confirm there are no TypeScript or
  ESLint errors.
- Smoke-test in the browser: scroll the home page, toggle theme,
  toggle locale, follow each external link, view source for JSON-LD.

## Architecture decisions

Anything that changes how the site is structured, deployed, or
secured needs an ADR in `docs/architecture/decisions/`. Copy
`template.md`, fill it in, link it from the PR.

## Code of conduct

We are a small group building together. The bar is simple:
**be kind, be honest, be useful**.

### Expected behavior

- Treat others with respect, regardless of experience, identity, or
  background.
- Assume good faith. If something reads wrong, ask before assuming.
- Disagree with ideas, not with people.
- Credit others' work when you build on it.

### Unacceptable behavior

- Harassment, insults, or personal attacks.
- Discrimination or exclusion based on identity.
- Sharing others' private information without consent.
- Sustained disruption of discussion.

### Enforcement

Report concerns to the project maintainers via GitHub or directly to a
team member. Reports stay confidential. Maintainers may warn, mute, or
ban contributors who break this code.

### Scope of conduct

This applies in all project spaces — issues, PRs, commits, chats —
and when representing the project in public.

## Reporting a vulnerability

If you find a security issue in the BitByBit landing site:

1. **Do not open a public GitHub issue.**
2. Email the maintainers via the contact information on
   <https://github.com/bitbybit-ar> or open a private security advisory
   on the repository.
3. Include enough detail to reproduce: URL, steps, expected vs actual
   behavior, and your environment.

We aim to acknowledge reports within 72 hours and to ship a fix or
mitigation within a reasonable window depending on severity.

### Security scope

In scope:

- The deployed site at `bitbybit.com.ar`.
- The source code in this repository.

Out of scope:

- The project subdomains (`habits.bitbybit.com.ar`,
  `arena.bitbybit.com.ar`) — report those to the respective project's
  security policy.
- Findings against third-party services we link to.
- Theoretical issues with no demonstrated impact.

### Hardening already in place

- HTTPS-only via Vercel, HSTS preload header set.
- Security headers: CSP, X-Frame-Options DENY, X-Content-Type-Options
  nosniff, Referrer-Policy strict-origin-when-cross-origin,
  Permissions-Policy locks down camera/mic/geolocation.
- Static site, no backend, no user input — no SQL, no auth surface.
- All external links open in a new tab with `rel="noopener noreferrer"`.

## Open source license

By contributing you agree your contributions are licensed under the
project's open-source license.
