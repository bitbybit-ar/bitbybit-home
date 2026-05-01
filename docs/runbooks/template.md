# Runbook: <Scenario>

- **Owner**: <team or person>
- **Severity**: SEV-1 | SEV-2 | SEV-3
- **Last reviewed**: YYYY-MM-DD

---

## Change Log

| Date | Section | Change | Reason |
|---|---|---|---|
| YYYY-MM-DD | — | Initial version. | <why this runbook exists> |

---

## Symptoms

How do you know this is happening? List the alerts, error messages,
user reports, or dashboards that surface this scenario. Be specific
enough that someone paged at 3am can confirm "yes, this runbook
applies".

## Quick triage

Step-by-step checks to confirm the scenario and assess blast radius.
Each step should be runnable in under a minute.

1. Check X.
2. Check Y.
3. If Z, jump to Mitigation. Otherwise this runbook does not apply.

## Mitigation

Step-by-step recovery actions. Include exact commands, exact URLs,
exact button labels.

```bash
# Example command
```

If a step is destructive, say so explicitly and require confirmation.

## Verify recovery

How do you confirm the issue is fixed? What signal returns to normal?

## Root cause investigation

Once recovery is verified, dig in:

- Logs to read.
- Dashboards to inspect.
- Queries to run.
- People to ping.

## Post-incident

- File a postmortem if SEV-1 or SEV-2.
- Update this runbook with anything new you learned (and append a row
  to its `## Change Log`).
- Close out the incident channel/ticket.
