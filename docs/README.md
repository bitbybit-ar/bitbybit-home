# Documentation

> **Status:** Active
> **Last updated:** 2026-05-01

---

## Change Log

| Date | Section | Change | Reason |
|---|---|---|---|
| 2026-05-01 | Structure, Doc standard | Switched from a single central `CHANGELOG.md` for docs to per-doc inline `## Change Log` sections. Project release log moved to repo root. SECURITY folded into CONTRIBUTING. Added `_template.md`. | The single global doc-changelog made it impossible to track which doc actually changed. Each doc now owns its own deltas; the repo-root `CHANGELOG.md` tracks product releases only. |
| 2026-04-30 | — | Initial version. | Establish a canonical `docs/` template to copy across BitByBit projects. |

---

## What this folder is

Internal documentation for the BitByBit landing site, and the
**canonical docs template** for every BitByBit project. This folder is
not served by the site.

## Structure

```
docs/
├── README.md                 ← you are here
├── _template.md              ← copy this for new docs
├── ROADMAP.md                ← upcoming work, public-friendly
├── about/                    ← mission, values, team backgrounders
├── architecture/
│   ├── overview.md           ← high-level system + reasoning
│   ├── decisions/            ← Architecture Decision Records (ADRs)
│   │   ├── 0001-record-architecture-decisions.md
│   │   └── template.md       ← copy this for new ADRs
│   └── diagrams/             ← Mermaid sources
├── guides/
│   ├── getting-started.md    ← clone, install, run locally
│   ├── deployment.md         ← Vercel, custom domains, env vars
│   └── development.md        ← workflows, conventions, tooling
├── reference/
│   ├── glossary.md
│   └── faq.md
└── runbooks/
    ├── template.md           ← copy this for new runbooks
    └── deploy-rollback.md
```

`CHANGELOG.md` (project release log) and `CONTRIBUTING.md` (contribution
+ vulnerability disclosure policy) live at the **repo root**, not here.
Per-doc edits are recorded inside each doc.

## Doc standard

Every file in this folder carries an inline header. The full standard is
in `CLAUDE.md` at the repo root; the short version:

1. Title (`# ...`).
2. Quoted block with `**Status:**` and `**Last updated:**` (ISO date).
3. `---` separator.
4. `## Change Log` table — newest row at the top, columns
   `Date | Section | Change | Reason`.
5. `---` separator.
6. `## Table of Contents` — only when the doc has 5+ sections or is
   longer than ~150 lines.
7. Body.

Specialized templates (ADRs, runbooks) keep their own additional header
fields but still carry an inline `## Change Log` section.

## How to use this template in another BitByBit project

1. Copy the entire `docs/` folder into the new project's repo root.
2. Copy `CLAUDE.md` from this repo's root and adjust the project-shape
   section.
3. Copy the root `CHANGELOG.md` skeleton (delete the entries, keep the
   format).
4. Empty the project-specific content but keep the **structure** and
   **templates** identical across projects. Consistency is the point.
5. Write `architecture/overview.md` first — every other doc references it.
6. Add ADRs as decisions are made (one ADR per decision).

## Doc style (in addition to the structural rules above)

- **Sentence case** for headings, not Title Case.
- **Second person** ("you run", not "the user runs") in guides and
  runbooks.
- **Imperative mood** for runbook steps ("Run `npm test`", not "You
  should run `npm test`").
- **Descriptive link text** — never "click here".
- **No emoji** unless explicitly requested.
- **Code blocks always tagged** with the language.
- **Date format**: ISO 8601 (`YYYY-MM-DD`).
- **Hard wrap** Markdown at ~80 columns.

## What to write in each doc

| File | Purpose |
|---|---|
| Root `CHANGELOG.md` | Every product-level change, grouped by release |
| Root `CONTRIBUTING.md` | How to contribute + vulnerability disclosure policy |
| `ROADMAP.md` | What's coming next, by phase |
| `architecture/overview.md` | System diagram + key invariants |
| `architecture/decisions/NNNN-*.md` | One decision per file, frozen once accepted |
| `guides/*.md` | Tutorials and how-tos for contributors |
| `runbooks/*.md` | Step-by-step recovery procedures for incidents |
| `reference/*.md` | Lookup material — glossary, FAQ, API surface |

When in doubt, ask: "If I joined this project tomorrow, which file would
hold this answer?" Put it there.
