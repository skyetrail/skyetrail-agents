---
name: auditing-skills
description: Audits any document written to steer an agent against every best practice this project holds, and reports what to fix, marking each finding blocking, important, or advisory. Use this whenever someone asks to lint, audit, review, check, or sanity-check a skill, a SKILL.md, a slash command, a prompt written for a subagent, a hand-off brief, a runbook, or an AGENTS.md or CLAUDE.md instruction file, to check a skill or a SKILL.md against best practices, to scan a repository or plugin for skills that need fixing, when they want to know why a skill is not triggering or not being followed, why a subagent came back with nothing useful, or when a skill is about to ship.
---

# Auditing skills

This audit produces a findings table, ordered by severity, and the three things to fix first. The
Report section below fixes that table's columns. This audit changes nothing.

One pass covers every best practice this project holds. Two things settle them, and they do not
overlap. The command `npm run audit -- <path>` settles every mechanical check. The rule files
settle every judgement check. Never re-derive a mechanical check by hand, even where the answer
looks plain. This file calls `npm run audit` the command. The word audit stays with this pass,
which is judgement work.

## Which rules apply

Use `../../shared/steering-rules.md` for every target. Then add a file for what the target is, and
another for each condition the target meets.

- A SKILL.md. Add `../../shared/skill-rules.md`.
- A target meeting the **hand-off** condition, meaning the agent reading the target itself will not
  see the conversation its author had. Add `../../shared/handoff-rules.md`. A prompt written for a
  subagent and a hand-off brief are two examples, not the whole list. A file of rules for writing
  hand-off prompts does not meet it, because you read that file inside this conversation.
  `../../shared/steering-rules.md` states the test and why two earlier audits split on it.
- Anything else written to shape what an agent does. A command, a runbook, and a one-off request
  are examples, not the whole list. Where a person wrote it to steer an agent, it belongs here,
  and it needs no extra file for what it is. It still takes a file for each condition it meets.

Decide the conditions from what the target holds, not from how you are using it. Route by
condition rather than by what you would call the document, because more than one name fits the
same document.

Where the target is none of these, stop and report `OUT_OF_SCOPE`. Say what the target appears to
be. Do not force the rules onto it. Where you cannot read the target or a rule file, stop and
report `BLOCKED`. Name the file you could not read. Do not audit from memory instead. These stop conditions sit here, ahead of the
workflow, not beside the report. They are pre-work gates. They decide whether the audit starts at
all.

## Where this stops

This audit does not edit the target. Where a fix is obvious, name it in the report. Do not make
the fix. Use `writing-skills` to apply it.

This audit does not judge writing style. This includes punctuation, heading case, and tone.
Those do not change what an agent does.

This audit runs the command in step 1 on the target, whether or not the author recorded a result.
One command costs little, and two parties running it on one file is the check that holds. This
audit repeats none of the author's reading, searching, or judgement. Confirm the record is complete
instead.

A direct instruction from the person overrides this audit.

## Workflow

1. Run `npm run audit -- <path>` over the target, from the root of this plugin's repository. The
   command takes the target path, so the target need not sit in that repository. Record its
   result and cite it in the report. This settles every mechanical check once. The findings never
   re-argue them. Where you cannot run the command, or it runs without reaching the target,
   follow what `../../shared/lint.md` says about that case. That file also covers a repository
   with no such command, and says when you may run a command again. Then say in the report what
   did not run. Do not re-derive a mechanical check by hand instead. Where you re-derive one
   anyway, say so in the report. A report that hides an unrun check is worse than one that admits
   a gap.
2. Read the target in full. Read every reference file it names too. A rule the target satisfies
   in a file you did not open reads as a failure.
3. Work through each rule. Mark it pass, fail, warn, or not applicable. This lets the reader tell
   a rule that held from one that never applied. A rule whose condition does not hold is not
   applicable. Not applicable is not the same as a pass.
4. Apply the calibration below before you write anything down. This stops first impressions from
   hardening into findings.
5. Report.

Where the target holds more than one skill, such as a plugin or a repository, list the skills
first. Then run these steps once per skill. Give one table per skill, then one summary across them.

## Calibration

A finding is something that would change what an agent does. That test decides any case the two
lists below do not name. Both lists are examples, not the whole set.

These are findings.

- A description so vague that an agent looking for the skill does not find it.
- A body so long that it consumes context the rest of the work needs.
- A rule that contradicts another rule, in the same file or in a file it links to.
- No stated limit on what the skill covers.
- A check the agent cannot actually run.
- Content that would not change what an agent does, taking up space the real content needs.

These are not findings.

- Wording you would phrase differently.
- A section shorter than its neighbours.
- A heading you would name something else.
- A missing section the task did not need.
- A stylistic preference with no effect on behaviour.
- A sibling skill named by its name, such as `writing-skills`. A skill name is how this plugin
  resolves a skill. So a skill name is a working reference, not an unresolvable nickname.

`../../shared/steering-rules.md` states the default outcome. Fail means the rule is broken and you
can point at where. Warn means you cannot tell from what you can read whether the rule is broken.
The rule's severity carries how much the break matters, not the choice between warn and fail. Where
unsure, mark it warn. Give one line of reason.

Count one finding per root cause. A missing section is one finding even when several rules depend
on it. List the dependent rules under that finding, not as findings of their own. A rule about
the position or wording of a section that does not exist is not applicable.

## Two audits for a ship decision

Where the audit gates a release or an adoption, run two independent audits of the same target.
Reconcile the two audits. A finding that both report is a finding. A finding that only one
reports becomes a warn carrying both readings. Severity is the higher of the two. One audit is
enough for ordinary work.

Where the two audits pass and fail the same rule on the same text, that is not a one-reporter
finding. It does not become a warn. Report it as a finding against that text, at the higher
severity, giving both readings. Two readers who disagree about what a line says show that the
line is unclear. That is worth more than either verdict.

## Re-auditing a target

Where the caller supplies a prior report for the same target, report the differences. Mark each
prior finding confirmed, retired, or changed. Confirmed means it is still there as written. Retired
means it is gone. Changed means it is still there in a different form, which is what a fix that
moved a fault rather than removing it produces. Then list only what is new. Do not re-derive rows
whose inputs stay the same. Name the report you compared against.

A re-audit table carries one more column than a first audit. Head it **Since last audit** and put it
before Result. It holds confirmed, retired, or changed, and nothing else. Do not head it status,
which names the values this skill returns to a caller. A retired row carries only that mark, and
leaves Result, Defect or difference, and Evidence empty, because a retired finding has no current
result to give. The new-findings table gains no such column, because every row in it is new.

Without the third mark, a half-fixed finding fits neither confirmed nor retired, and two rounds of
this audit invented the word rather than reporting the gap.

## Report

| Rule | Source | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- | --- |

State the command's result first. Every fail and warn carries evidence. Evidence is the line or
section it came from. Then give counts by severity. Then give the three fixes to make first.
Keep the table's wording fixed. Then you can compare two runs over the same target without
editing either. Do not report findings as prose ranked by severity instead of this table. That
was the earlier form. You could not compare two runs of it without rewriting one of them.

Source takes one of three words, and nothing else.

- **Command**. `npm run audit` reported it.
- **Published**. The rule file names the published best practice behind the rule.
- **House**. Everything else. This project wrote the rule, and it holds here.

Read Source off the rule file, not off what the rule reminds you of. Where a rule file records no
published origin, mark it House. Where a rule file records no origins at all, say so once above the
table. House then reads as unrecorded, not as ours. A reader can then check a published rule at its
source, and weigh a house rule as ours. Claim a published origin the rule file does not record, and
you send a reader to a page that does not carry the rule.

Mark every fail and warn a defect or a difference. Count the defects and the differences
separately. A defect is one where you can name what an agent would do wrong. An unlisted project
type gets no setup. A real finding ends up out of scope. A credential reaches a log. A difference
is where the target works another way. You cannot say what goes wrong. You can only say that we
would write it another way. Unmarked, the two read alike at the same severity. Nobody can tell a
document that will misbehave from one that is merely unfamiliar.

Only a defect blocks. Severity says how much a problem matters. Defect or difference says whether
there is one. A blocking difference does not hold the target back. Read it instead as a signal
about the rule, not the target. A rule that fires at blocking severity on something nobody can
name a consequence for reaches past what it can judge.

A blocking defect means the target needs work before use. The report lists advisory items once.
Advisory items never block. This is narrower than the same sentence in
`../../shared/steering-rules.md`. That sentence speaks of any blocking failure. That file has no
defect and difference marking. So that file cannot draw the distinction. This file does draw the
distinction.
