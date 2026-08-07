---
name: auditing-skills
description: Audits a skill or an agent prompt against the house rules and reports what to fix, marking each finding blocking, important, or advisory. Use this whenever someone asks to review, check, audit, lint, or sanity-check a skill, a SKILL.md, or a prompt written for a subagent, when they want to know why a skill is not triggering or not being followed, or when a skill is about to ship.
---

# Auditing skills

This audit produces a findings list, in order of severity, and the three things to fix first.
This audit changes nothing.

## Which rules apply

- A SKILL.md. Use `../../shared/skill-rules.md` and `../../shared/steering-rules.md`.
- A prompt written for a subagent. Use `../../shared/steering-rules.md` and
  `../../shared/handoff-rules.md`.
- Anything else written to shape what an agent does. A command, a hand-off brief, a runbook, and
  a one-off request are examples, not the whole list. Where a person wrote it to steer an agent,
  it belongs here. Use `../../shared/steering-rules.md` only. Apply the conditions that match how
  you will use the document.

Where the target is none of these, stop. Report it as out of scope. Say what the target appears
to be. Do not force the rules onto it. Where you cannot read the target or a rule file, stop.
Report that instead of auditing from memory. These stop conditions sit here, ahead of the
workflow, not beside the report. They are pre-work gates. They decide whether the audit starts at
all.

## Where this stops

This audit does not edit the target. Where a fix is obvious, name it in the report. Do not make
the fix. Use `writing-skills` to apply it.

This audit does not judge writing style. This includes punctuation, heading case, and tone.
Those do not change what an agent does.

This audit does not re-run checks that the target's own author already ran and recorded. Confirm
the record is complete instead.

A direct instruction from the person overrides this audit.

## Workflow

1. Run the lint command named in `../../shared/lint.md` over the target. Record its result. This
   settles the mechanical limits once. The findings never re-argue them. Where you cannot run the
   lint, or it runs without reaching the target, follow what `../../shared/lint.md` says about
   that case. This includes when you may run the lint again. Then say in the report what did not
   run. Do not re-derive the mechanical limits by hand instead. Where you
   re-derive the limits anyway, say so in the report. A report that hides an unrun check is worse
   than one that admits a gap.
2. Read the target in full. Read every reference file it names too. A rule the target satisfies
   in a file you did not open reads as a failure.
3. Work through each rule. Mark it pass, fail, warn, or not applicable. This lets the reader tell
   a rule that held from one that never applied. A rule whose condition does not hold is not
   applicable. Not applicable is not the same as a pass.
4. Apply the calibration below before you write anything down. This stops first impressions from
   hardening into findings.
5. Report.

## Calibration

A finding is something that would change what an agent does. That test decides any case the two
lists below do not name. Both lists are examples, not the whole set.

These are findings.

- A description so vague that a reader cannot find the skill.
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

The default outcome is pass. Escalate only when you can say what an agent would do wrong because
of it. Fail means the rule is broken and you can point at where. Warn means you cannot tell from
what you can read whether the rule is broken. The rule's severity carries how much the break
matters, not the choice between warn and fail. Where unsure, mark it warn. Give one line of
reason.

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

Where the caller supplies a prior report for the same target, report the differences. Confirm or
retire each prior finding. Then list only what is new. Do not re-derive rows whose inputs stay
the same. Name the report you compared against.

## Report

| Rule | Result | Evidence |
| --- | --- | --- |

State the lint result first. Every fail and warn carries evidence. Evidence is the line or
section it came from. Then give counts by severity. Then give the three fixes to make first.
Keep the table's wording fixed. Then you can compare two runs over the same target without
editing either. Do not report findings as prose ranked by severity instead of this table. That
was the earlier form. You could not compare two runs of it without rewriting one of them.

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
