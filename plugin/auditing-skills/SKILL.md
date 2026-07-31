---
name: auditing-skills
description: Audits a skill or an agent prompt against the house rules and reports what to fix, marking each finding blocking, important, or advisory. Use this whenever someone asks to review, check, audit, lint, or sanity-check a skill, a SKILL.md, or a prompt written for a subagent, when they want to know why a skill is not triggering or not being followed, or when a skill is about to ship. To write or fix a skill rather than assess one, use writing-skills instead.
---

# Auditing skills

Produces a findings list ordered by severity, and the three things to fix first. Changes nothing.

## Which rules apply

- A SKILL.md. Use `../shared/skill-rules.md` and `../shared/steering-rules.md`.
- A prompt written for a subagent. Use `../shared/steering-rules.md` only.

## Workflow

1. Read the file in full, including every reference file it names.
2. Work through each rule. Mark it pass, fail, warn, or not applicable. A rule whose condition is
   not met is not applicable, which is not the same as a pass.
3. Apply the calibration below before writing anything down.
4. Report.

## Calibration

A finding is something that would change what an agent does.

These are findings.

- A description so vague the skill will not be found.
- A body so long that it consumes context the rest of the work needs.
- A rule that contradicts another rule, in the same file or in a file it links to.
- No stated limit on what the skill covers.
- A check the agent cannot actually run.
- Content that would not change what an agent does, taking up space the real content needs.

These are not findings.

- Wording you would have phrased differently.
- A section shorter than its neighbours.
- A heading you would have named something else.
- A missing section the task did not need.
- A stylistic preference with no effect on behaviour.

The default outcome is pass. Escalate only when you can say what an agent would do wrong because
of it. When unsure, mark it warn and give one line of reason.

## Report

| Rule | Result | Evidence |
| --- | --- | --- |

Every fail and warn carries evidence, meaning the line or section it came from. Then give counts
by severity, then the three fixes to make first.

Any blocking failure means the file needs work before use. Advisory items are listed once and
never block.

## Where this stops

Does not edit the file. If a fix is obvious, name it in the report rather than making it, and use
`writing-skills` to apply it.

Does not judge writing style, including punctuation, heading case, and tone. Those do not change
what an agent does.

Does not re-run checks the file's own author already ran and recorded. Confirm the record is
complete instead.

A direct instruction from the person wins over anything here.
