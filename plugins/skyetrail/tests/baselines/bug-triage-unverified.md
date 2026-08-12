# bug-triage — unverified proposal

This is a draft, not a skill. `writing-skills` stopped at step 4 because this session cannot
dispatch a subagent. `bug-triage.md` beside this file carries the error text from the actual
attempt. Nothing here went through the baseline-with-skill-loaded run, the miss count, or the
independent audit that `writing-skills` requires before a draft may be installed. Run those steps
against the two blocks below before treating this as done. Do not copy either block to
`plugins/skyetrail/skills/bug-triage/` until that has happened.

The first block is the proposed `SKILL.md`. The second is the proposed
`references/reply-templates.md` it points at.

## Proposed SKILL.md

```markdown
---
name: bug-triage
description: Sorts an incoming bug report into one of four outcomes, duplicate, defect, support question, or unreproducible, then carries out the action each one needs, closing and linking a duplicate, filing a defect with a severity, replying to a support question, or asking the reporter for the missing repro detail. Use whenever a new bug report, issue, or ticket needs triage, sorting, deduping, or routing, when someone asks to triage, sort, classify, dedupe, prioritize, or route a report, or when a report's title or body uses words such as bug, crash, broken, not working, doesn't work, error, exception, regression, duplicate, or can't reproduce.
license: MIT
metadata:
  version: "0.1.0"
---

# Bug report triage

Every incoming bug report ends in one of four dispositions: duplicate, defect, support question,
or unreproducible. Decide the disposition, then carry out the action it needs. A report is not
triaged until it carries the label and the action is done.

## Before you triage

Decide the disposition from the report's own evidence: the steps, the error text, a screenshot, a
log. Do not decide it from the reporter's tone, title, or account history. A terse or angry report
can still name a real defect. A calm, detailed one can still turn out to be a duplicate.

Closing a report as unreproducible with no question asked often reopens once the reporter reads
the closure. Ask for the missing detail first. Unreproducible is not the same as wrong.

## Scope

In scope: one bug report, arriving as a new item or an update to an existing one, in a tracker
this skill can read and write, such as an issue tracker, a ticket queue, or an email inbox.

Out of scope, with the owner of each:

- A feature request. It names no defect. Route it to the team's roadmap process. Ask the team for
  that process where none exists.
- A security vulnerability report. Do not triage it in a public tracker, and do not comment on it
  there. Route it to the team's private security process. Stop and tell the team where they have
  none.
- Spam, abuse, or a report with no content a person could act on. Flag it for moderation instead
  of labeling it a defect.
- A report that needs access this skill lacks, such as a private log or a paid environment. Say
  so and stop. Do not guess the disposition.
- Any other report the team routes through a different process. Ask the team which process where
  they have not named one.

These are examples, not the whole list of what falls outside triage.

Route a security report, a feature request, and any other out-of-scope report to the team's own
process for it, not to a step below. A direct instruction from the person wins over this skill.

### The four dispositions

A report is a **duplicate** where an open or closed report already describes the same defect.
Search the title, the body, and the error text. A duplicate often uses different words for the
same defect, so a title-only match misses it.

A report is a **defect** where the software behaves in a way the team did not intend, and no
earlier report already covers it.

A report is a **support question** where it asks how to do something the software already
supports, or where the reporter's own setup causes the problem, such as a missing permission or a
wrong setting.

A report is **unreproducible** where the reporter's steps do not produce the reporter's result,
and the report carries no other evidence, such as a screenshot, a log, or an exact error message,
that would let the team reproduce it another way.

## Workflow

Copy this checklist into your reply. Tick each line as you finish it.

\`\`\`text
bug-triage
[ ] 1  Already-triaged check done
[ ] 2  Report read in full, including any image or attachment
[ ] 3  Scope check done
[ ] 4  Split, where the report holds more than one problem
[ ] 5  Duplicate search done, across title, body, and error text
[ ] 6  Disposition decided against the four tests above
[ ] 7  Matching action taken, meeting its own finish test below
[ ] 8  Disposition label applied and visible in the tracker
\`\`\`

1. **Check for an existing disposition first.** Where the report already carries a duplicate,
   defect, support question, or unreproducible label, do not re-triage it without a stated
   reason.
2. **Read the report in full.** Read the title, the body, and any attached image or file before
   deciding anything. Render and view an attached image. Do not decide from the fact that one is
   attached.
3. **Check scope.** Where the report is a security disclosure, a feature request, spam, or needs
   access you lack, stop here. Follow the matching line under Scope instead of the steps below.
4. **Split a report that holds two problems.** Where one report describes two distinct problems,
   split it into two reports, and triage each on its own against the rest of this workflow.
5. **Search for a duplicate.** Search open and closed reports for the same defect, by body and
   error text as well as by title. Where two searches return two different canonical reports for
   the same new report, stop and ask a person which one is canonical. Where one match holds, the
   disposition is duplicate.
6. **Decide the disposition.** Where no duplicate exists, test for a support question first: does
   the report ask how to do something the software already supports, or trace to the reporter's
   own setup? Test this before you attempt reproduction, because a setup problem needs no
   reproduction step. Where it is not a support question, reproduce the report's steps.
   Reproduction that shows the unintended behavior means the disposition is defect. Reproduction
   that fails, with no other evidence such as a screenshot, a log, or an exact error message,
   means the disposition is unreproducible.
7. **Take the matching action.**
   - **Duplicate.** Link the report to the canonical report's ID. Close the new report. Post the
     link where the reporter sees it.
   - **Defect.** File it, or update the existing item, with a severity. Use Critical, High,
     Medium, or Low as the default scale. The team may use its own scale instead. Carry over the
     reporter's repro steps.
   - **Support question.** Reply with the answer, or redirect to the team's support channel.
     Where the team has not named a destination, reply directly on the report, and ask the team
     for a destination.
   - **Unreproducible.** Reply asking the reporter for the missing detail, such as exact steps, a
     screenshot, or a log. Set a follow-up date 14 days out as the default. The team may set a
     different window.
8. **Label the disposition.** Apply a label or field naming the disposition, so the tracker shows
   it without opening the report.

Triaging many reports at once is batch work. Before you act on any of them, write the proposed
disposition for every report to a plan file. Have the person confirm the plan before you carry
out any action in it.

## Finish check

A report is done only where its disposition label is applied and its matching action meets its
own test below. A batch is done only where every report in it meets this.

- **Duplicate.** The label is applied, and the linked ID is a report that describes the same
  defect.
- **Defect.** The label is applied, and the filed or updated item carries a severity and the
  reporter's repro steps.
- **Support question.** The label is applied, and a reply or a redirect is posted.
- **Unreproducible.** The label is applied, and a reply asking for the missing detail, with a
  follow-up date, is posted.

A label with no matching action, or an action that does not meet its own test, is not a finished
triage.

## Stop conditions

Stop and report, rather than guess, where:

- The report needs access this skill lacks.
- The report is a security disclosure. Route it to the team's private process instead of triaging
  it here.
- Two searches for a duplicate return different canonical reports for the same new report. Ask a
  person which one is canonical.
- A tool the workflow depends on, such as the tracker or the search, fails. Retry once, after you
  confirm the failure is not a rate limit or a timeout that a second try clears. A second
  identical failure means the tool is broken. Report that, not the report untriaged.

Do not apply a label to make the finish check above pass. A label posted before its matching
action is not a completed triage, whatever the tracker shows.

## Reply templates

`references/reply-templates.md` carries the reply text for each disposition, and one worked
example for two of them. Open it before you post a reply, so the wording matches the disposition.
Treat the wording as a starting point, not a fixed script. Keep the fields marked required, such
as the canonical ID or the missing detail. Change the rest to fit the report.

## Partial work

Where a batch stops partway, every report that already carries both its label and its finished
action stays as is. Do not undo it. Report which reports in the plan still carry no action, so a
person can resume from there.
```

## Proposed references/reply-templates.md

```markdown
# Reply templates for bug-triage

One template per disposition, and two worked examples. `../SKILL.md` names when to use each.

## Duplicate

> This looks like the same issue as #<canonical-id>. I am closing this one and tracking further
> discussion there. Where your report holds an extra detail, such as a different trigger or a
> different environment, add it as a comment on #<canonical-id> instead.

Required: the canonical report's ID.

## Defect

Report fields to carry into the tracker:

- Title: a short description of the defect.
- Severity: Critical, High, Medium, or Low. Default scale; the team may use its own.
- Repro steps: carried over from the report.
- Assignee: unassigned by default. The triage queue owns it until a person claims it.

## Support question

> This is not a defect. It looks like <cause, such as a missing permission or a config setting>.
> <How to fix it>. Reply here where this does not solve it, and the team will look again.

Default destination where the team has not named one: reply directly on the report, and add a
support or question label.

## Unreproducible

> I could not reproduce this by following the steps in the report. Could you add <missing detail,
> such as your OS and version, a screenshot, or the exact error text>? I will follow up again by
> <date, 14 days out by default> where I have not heard back.

## Worked example: duplicate

Report: "App crashes when I click export on the reports page. Using Chrome on a Mac. Screenshot
attached showing a blank white screen after the click."

1. Already-triaged check: no label present.
2. Read in full: text plus screenshot. The screenshot shows a blank page, not an error dialog.
3. Scope check: not a security report, not a feature request, not spam, no access issue.
4. Split check: one problem, nothing to split.
5. Duplicate search: search "export crash", "export blank page", and the exact error text. One
   open report, #482, describes the same blank screen on export in Chrome.
6. Disposition: duplicate, of #482.
7. Action: post the duplicate reply linking #482, close this report.
8. Label: duplicate.

## Worked example: support question

Report: "I can't find the export button anywhere on the reports page."

1. Already-triaged check: no label present.
2. Read in full: text only, no attachment.
3. Scope check: not a security report, not a feature request, not spam, no access issue.
4. Split check: one problem, nothing to split.
5. Duplicate search: search "export button", "missing export", and "can't find export". No open
   or closed report matches.
6. Disposition: test for a support question first. The export button shows only where the
   reporter's role has export permission. This report traces to the reporter's own setup, so the
   disposition is support question, not defect.
7. Action: reply that export needs the Exporter role, and explain how to request it.
8. Label: support question.
```
