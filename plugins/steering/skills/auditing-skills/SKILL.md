---
name: auditing-skills
description: Audits a skill or an agent prompt against the house rules and reports what to fix, marking each finding blocking, important, or advisory. Use this whenever someone asks to review, check, audit, lint, or sanity-check a skill, a SKILL.md, or a prompt written for a subagent, when they want to know why a skill is not triggering or not being followed, or when a skill is about to ship.
---

# Auditing skills

Produces a findings list ordered by severity, and the three things to fix first. Changes nothing.

## Which rules apply

- A SKILL.md. Use `../../shared/skill-rules.md` and `../../shared/steering-rules.md`.
- A prompt written for a subagent. Use `../../shared/steering-rules.md` and
  `../../shared/handoff-rules.md`.
- Anything else written to shape what an agent does. A command, a hand-off brief, a runbook, and a
  one-off request are examples, not the whole list. If a person wrote it to steer an agent, it
  belongs here. Use `../../shared/steering-rules.md` only, with the conditions that match how the
  document will be used.

If the target is none of these, stop and report it as out of scope, saying what the target appears
to be. Do not force the rules onto it. If the target or a rule file cannot be read, stop and
report that instead of auditing from memory. These stop conditions sit here, ahead of the
workflow, rather than beside the report, because they are pre-work gates: they decide whether
the audit starts at all.

## Where this stops

Does not edit the target. If a fix is obvious, name it in the report rather than making it, and use
`writing-skills` to apply it.

Does not judge writing style, including punctuation, heading case, and tone. Those do not change
what an agent does.

Does not re-run checks the target's own author already ran and recorded. Confirm the record is
complete instead.

A direct instruction from the person wins over anything here.

## Workflow

1. Run the lint command named in `../../shared/lint.md` over the target and record its result,
   so the mechanical limits are settled once and never re-argued in the findings. Where it cannot
   be run, or runs without reaching the target, follow what `../../shared/lint.md` says about that case,
   including when a second attempt is allowed. Then say in the report what did not run, rather than
   re-deriving the mechanical limits by hand without saying you have done so. A report that hides
   an unrun check is worse than one that admits a gap.
2. Read the target in full, including every reference file it names.
3. Work through each rule. Mark it pass, fail, warn, or not applicable. A rule whose condition is
   not met is not applicable, which is not the same as a pass.
4. Apply the calibration below before writing anything down, so first impressions do not harden
   into findings.
5. Report.

## Calibration

A finding is something that would change what an agent does. That test decides any case the two
lists below do not name; both are examples, not the whole set.

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
- A sibling skill named by its name, such as `writing-skills`. A skill name is how this plugin
  resolves a skill, so it is a working reference and not an unresolvable nickname.

The default outcome is pass. Escalate only when you can say what an agent would do wrong because
of it. Fail means the rule is broken and you can point at where. Warn means you cannot tell from
what you can read whether the rule is broken. How much the break matters is carried by the
rule's severity, not by choosing warn over fail. When unsure, mark it warn and give one line of
reason.

Count one finding per root cause. A missing section is one finding even when several rules depend
on it; list the dependent rules under that finding rather than as findings of their own. A rule
about the position or wording of a section that does not exist is not applicable.

## Two audits for a ship decision

When the audit gates a release or an adoption, run two independent audits of the same target and
reconcile them: a finding both report is a finding, a finding only one reports becomes a warn
carrying both readings, and severity is the higher of the two. One audit is enough for ordinary
work.

Where the two audits pass and fail the same rule on the same text, that is not a one-reporter
finding and does not become a warn. Report it as a finding against that text, at the higher
severity, giving both readings. Two readers who disagreed about what a line says have shown the
line is unclear, which is worth more than either verdict.

## Re-auditing a target

When the caller supplies a prior report for the same target, report the differences: confirm or
retire each prior finding, then list only what is new. Do not re-derive rows whose inputs have
not changed, and name the report you compared against.

## Report

| Rule | Result | Evidence |
| --- | --- | --- |

State the lint result first. Every fail and warn carries evidence, meaning the line or section it
came from. Then give counts by severity, then the three fixes to make first. Keep the table's
wording fixed, so two runs over the same target can be compared without editing either.

Mark every fail and warn a defect or a difference, and count them separately. A defect is one where
you can name what an agent would do wrong: an unlisted project type gets no setup, a real finding is
filed out of scope, a credential reaches a log. A difference is where the target works another way
and you cannot say what goes wrong, only that we would have written it otherwise. Unmarked, the two
read alike at the same severity, and nobody can tell a document that will misbehave from one that is
merely unfamiliar.

Only a defect blocks. Severity says how much a problem matters; defect or difference says whether
there is one. A blocking difference does not hold the target back, and it is worth reading as a
signal about the rule rather than the target: a rule that fires at blocking severity on something
nobody can name a consequence for is reaching past what it can judge.

Any blocking failure means the target needs work before use. Advisory items are listed once and
never block.
