# Runbook: roll back a bad deploy

- **Owner**: BitByBit team
- **Severity**: SEV-2
- **Last reviewed**: 2026-05-01

---

## Change Log

| Date | Section | Change | Reason |
|---|---|---|---|
| 2026-05-01 | Post-incident | Updated the doc-update step to reference per-doc change logs and the root `CHANGELOG.md`. | Per-doc change logs replace the central docs CHANGELOG. |
| 2026-04-30 | — | Initial version. | First runbook for the most likely incident on a static site. |

---

## Symptoms

- The site is broken or visibly regressed at <https://bitbybit.com.ar>
  after a recent merge to `main`.
- Vercel build succeeded but the production deploy is wrong (typo,
  broken layout, wrong copy, broken external link).

## Quick triage

1. Open Vercel → project → **Deployments**. Confirm the broken deploy
   is the current production deploy and that the previous deploy was
   working.
2. Decide: roll back, or roll forward with a fix.
   - If the fix is one line and obvious, roll forward.
   - Otherwise, roll back first, fix later.

## Mitigation — roll back

1. In the Vercel **Deployments** list, find the last known-good deploy.
2. Click the `...` menu → **Promote to Production**.
3. Wait ~30 seconds for the alias to swap.
4. Hard-refresh `https://bitbybit.com.ar` to confirm.

## Mitigation — roll forward

1. `git revert <bad-commit-sha>` on `main` (or fix the bug).
2. Push. Vercel builds and deploys automatically.
3. Watch the deploy in the Vercel dashboard.

## Verify recovery

- The site loads at the apex domain.
- The home page renders all five sections.
- `/sitemap.xml` and `/robots.txt` resolve.
- The Vercel deployment status is **Ready**.

## Root cause investigation

- Which commit introduced the regression? `git log --since=...`
- Was it caught by `npm run build` locally? If not, why did
  TypeScript/ESLint not catch it?
- Was an external link the cause? (project subdomain DNS, GitHub URL
  that 404s, etc.)

## Post-incident

- If a check would have caught the bug, add it to CI.
- If user-visible, append a bullet to the **root** `CHANGELOG.md` under
  `## [Unreleased]`.
- Append a row to this runbook's `## Change Log` if the procedure
  itself changed during recovery.
- Note any patterns in this runbook for future incidents.
