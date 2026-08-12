```markdown
---
name: bug-report-triage
description: Sorts an incoming bug report into one of four outcomes — duplicate, defect, support question, or unreproducible — and performs the matching action for each. Use when a new bug report, issue, or ticket arrives and needs a first-pass decision before it enters the backlog. Triggers on "new bug report", "triage this ticket", "triage this issue", "is this a duplicate", "sort this bug", "classify this report".
---

# Bug Report Triage

## Purpose

This skill sorts a bug report into one category. It then does the standard action for that category. Every report gets the same process, every time.

## The four outcomes

| Outcome | Definition |
|---|---|
| **Duplicate** | An open or recent report already covers this issue. |
| **Defect** | The report shows a real, reproducible bug. |
| **Support question** | The report describes expected behavior, or asks how to do something. It is not a bug. |
| **Unreproducible** | The report does not give enough information to confirm or deny a bug. |

## Before you start

Gather these facts from the report first. Ask for any that are missing before you classify.

- The expected result.
- The observed result.
- The exact steps to reproduce.
- The environment: product version, OS, browser, config, account type.
- Attached evidence: logs, screenshots, error text, a sample file.

## Step 1: Check for a security or safety issue

Scan the report for these signals, regardless of category:

- A security vulnerability or exploit.
- Exposed credentials, keys, or personal data.
- Data loss or data corruption.
- An active production outage.

If any signal is present, escalate now through the team's incident channel. Do this before you continue triage. State the signal in your escalation message. Continue triage after escalation, for record-keeping.

## Step 2: Search for a duplicate

Search the tracker for existing reports on the same symptom. Search by error text and by behavior, not only by the title's wording. Two reports with different titles can describe the same bug.

A report is a duplicate when the root symptom matches an existing open or recently closed report, even if the trigger steps differ.

A report is *not* a duplicate when it shares a symptom but the trigger, scope, or environment is materially different. Mark it "related" instead, and continue triage on its own merits.

**If you find a duplicate, go to [Duplicate actions](#duplicate-actions) and stop.**

## Step 3: Decide bug vs. question

Read the expected result the reporter stated. Check it against the documented, intended behavior.

- If the documented behavior matches what the product did, this is not a bug. **Go to [Support question actions](#support-question-actions) and stop.**
- If the reporter is asking "how do I…" rather than reporting a break, **go to [Support question actions](#support-question-actions) and stop.**
- If the product's behavior conflicts with documented or reasonable expected behavior, continue to Step 4.

## Step 4: Attempt reproduction

Follow the reporter's steps in the stated environment.

- **The bug reproduces.** Go to [Defect actions](#defect-actions) and stop.
- **The bug does not reproduce, and steps or environment details are missing or incomplete.** Go to [Unreproducible actions](#unreproducible-actions) and stop.
- **The bug does not reproduce, and the steps are complete and clear.** Try one adjacent variation (different data, different account, different build). If it still does not reproduce, go to [Unreproducible actions](#unreproducible-actions) and stop.

---

## Duplicate actions

1. Identify the original report's ID.
2. Add a comment on the new report. State the original report's ID and link.
3. Copy any new evidence from the new report — a log, a wider-impact note, a new environment — onto the original report.
4. Label the new report `duplicate`. Close it.
5. Reply to the reporter. State that the team is already tracking this. Give the original report's ID.

## Defect actions

1. Score severity and priority with the rubric below.
2. Write the reproduction steps, environment, and expected-vs-actual result into the tracker record.
3. Label the report `bug`. Set its severity and priority. Assign it to the owning team or component.
4. Reply to the reporter. Confirm the team reproduced the bug. Give the tracking ID.

**Severity rubric:**

| Severity | Signal |
|---|---|
| Critical | Data loss, security exposure, or the product is unusable for most users. |
| High | A core function is broken. No workaround exists. |
| Medium | A function is broken, but a workaround exists. |
| Low | A cosmetic or minor issue. Core function is unaffected. |

## Support question actions

1. Do not label this `bug`.
2. Answer the question directly, or link the relevant doc or FAQ section.
3. Label the report `question` or `support`. Close it, or route it to the support queue per team convention.
4. Reply to the reporter. Answer the question. State that they can reopen the report if the product's actual behavior does not match the documentation.

## Unreproducible actions

1. List the exact missing items: steps, version, logs, a sample file, account details.
2. Reply to the reporter in one message. Ask for the listed items.
3. Label the report `needs-info`. Set a follow-up reminder for 7 days out.
4. **If the reporter replies with the missing information:** restart triage at Step 2.
5. **If the reporter has not replied after 7 days:** close the report as unreproducible. State in the closing comment that it can reopen with new information.

---

## Triage record

For a report to count as triaged, its record must show all of these:

- The assigned category (duplicate, defect, support question, unreproducible).
- The evidence used to decide the category.
- The label(s) applied.
- Confirmation that the reporter got a reply.

## Example

**Report:** "Clicking Export CSV on the Reports page does nothing. Chrome 128, macOS, account role: Viewer. No error in console."

**Triage:**

1. Security scan: no signal. Continue.
2. Duplicate search: no matching open report on "Export CSV." Continue.
3. Bug vs. question: docs state the Viewer role can export. This is not expected behavior. Continue.
4. Reproduction: reproduces on a Viewer test account, Chrome 128, macOS. **Defect confirmed.**

**Action:** Severity = High (core function broken, no workaround). Filed as `bug`, `high`, assigned to the Reports team. Reporter told: "Confirmed — tracking as BUG-4821."

## Notes for adapting this skill

- This skill names generic actions (label, assign, close, reply). Map them to the team's actual tool — GitHub Issues, Jira, Linear, Zendesk, or other.
- The 7-day follow-up window is a default. Set a different window in team convention, and use it consistently.
- Keep the severity rubric's wording consistent with the team's own tracker fields, if the team already has named severity levels.
```

This SKILL.md is self-contained and tool-agnostic — it defines the decision tree, the four terminal actions, an escalation override for security/data-loss/outage signals, a severity rubric, and the record fields needed to call a report "triaged." Drop it in a skill directory as `SKILL.md` and rename the generic tracker actions (label, assign, close, reply) to match the team's actual tool.