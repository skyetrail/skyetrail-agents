# Decisions

Working notes for whoever picks this up. Not skill material. Nothing links to this file and it
should stay that way.

These skills were designed in a long conversation. The files carry the result. This carries the
reasoning, because a fresh session will otherwise re-derive these differently and quietly diverge.

## Settled

| Decision | Chose | Rejected | Why |
| --- | --- | --- | --- |
| Rule file name | `steering-rules` | `handoff-rules`, `instruction-rules` | Hand-off is one of the conditions inside the file, not its scope, so anyone writing a skill never opens it. Instructions files are a named artifact in Copilot, so that name reads as rules for writing those. |
| Rule format | Flat entries with rule, severity, condition | Graded 0 to 2 scorecards with a pass mark | The middle grade was the rule restated as partly present, which a model works out for itself. Several cells had four or five separate rules packed into one score. |
| Rule file count | Two files | One combined file | `writing-agents` has no use for the skill rules. A single file would load them and then need an instruction to ignore them, and an instruction to skip part of a file means the boundary is wrong. |
| Routing between the three skills | Descriptions, plus the "Where this stops" section in each body | A shared routing-note file | A note in the shared directory is only read after a skill has loaded, by which point routing already happened. |
| Fixture location | `tests/`, linked from nothing | Alongside the rule files | Fixtures loaded on every audit, and an auditor that reads three worked examples first pattern matches to them. |
| Named agents | Promote composing at dispatch. Never fail an audit for a named agent. | Enforce it | Three cases are legitimate: used identically in many places, the harness enforces a tool restriction only at that layer, someone else owns it as a policy boundary. |
| Format guidance in `writing-skills` | Keep it | Drop it, since Anthropic's page says you do not need a writing skills skill | Local observation is that 4.x and 5 class models write skill syntax poorly in practice. This is a house fact contradicting general guidance, which is the content a skill should carry. Marked below as the first thing to measure. |
| Baseline position | Step 1, before any writing | A final verification step | Running it first means the skill addresses failures that were observed rather than guessed. |

## Open, with a position

**Redirect clauses in descriptions.** Each description currently ends by naming a sibling skill,
such as telling the reader to use `auditing-skills` instead when checking without changing.
Recommendation was to cut them, because descriptions are the trigger, skills undertrigger more
than they overtrigger, and the same information is already in each body. Anthropic's page never
mentions cross-referencing and all three of its example descriptions are purely positive, which is
weak evidence against rather than proof. Kept pending the A/B in `TESTING.md`.

**Boundary rules marked blocking.** `skill-rules.md` marks "the skill says what it does not cover"
as blocking. That rule is ours, not Anthropic's. It came from one observed failure, where two
sibling skills in obra/superpowers gave opposite advice on parallel dispatch and neither
description said which scope it was in. Blocking is a strong severity for one observation.

**What belongs in a description.** Anthropic's page says both what the skill does and when to use
it. The superpowers `writing-skills` skill says when only, never what, with a specific claim that
a workflow summary in the description makes the agent follow the summary instead of the body.
Current position splits these. Capability and triggers are in. A workflow summary is out. That
split is in `skill-rules.md` as three separate entries.

**Whether the format guidance earns its place.** Anthropic's page states plainly that models
generate properly structured SKILL.md content without a skill to help. Local experience says
otherwise. The baseline comparison settles it. If a subagent with no skill loaded writes correct
frontmatter and structure unaided, cut steps 2 and 3 of `writing-skills` to the house-specific
parts and the skill gets much shorter.

## What went wrong on the previous attempt

A run in Kiro produced most of this and had to be reverted. Worth knowing so it is not repeated.

- It wrote Kiro steering documents into `.kiro/steering/` instead of Agent Skills. Kiro does not
  read `.claude/` at all, so the two are not interchangeable. The target is the Agent Skills
  standard inside the existing plugin.
- It merged the two rule files into one, which forced an instruction to ignore half of it.
- It put the fixtures among the reference files, so they loaded on every audit.
- It named the steering rules file after one of its conditions.
- It skipped the baseline comparison and deferred the fixture audit, reporting both as concerns
  rather than as blocks, and returned DONE_WITH_CONCERNS. A check that did not run is not a
  concern.
- The stated cause for the deferral was that it could not read the fixture URLs. The URLs read
  fine. Treat stated causes for skipped steps with suspicion.
- It never wrote a build report.

It did one thing right that should be preserved. It extended the existing lint script rather than
writing a second one.

## Environment

Claude Code, so subagents are available and the baseline comparison can actually run. `claude -p`
is available, which the skill-creator description optimiser needs. An existing agent plugin is the
target. An existing lint script exists and was extended once already. The lint script lives in a
separate repository, not in the target plugin's repo; the skills reference it as the mechanical
gate and fall back to saying so when it is absent.

## Resolved in the 2026-07-31 test round

Evidence for each is in the repository's TEST_REPORT.md and in `tests/baselines/`.

- **Redirect clauses: cut.** The A/B ran, three runs per variant. Variant B matched or beat A on
  every measure: 39/39 versus 38/39 on positives, zero false fires both, and the same picks on 17
  of 18 ambiguous classifications. The clauses were removed from all three descriptions.
- **Format guidance: the model has the format.** The forbidden-skills baseline wrote a valid
  SKILL.md unaided. Steps 2 and 3 keep only the house discipline; no syntax teaching was added,
  and mechanical limits belong to the lint script.
- **Boundary rules marked blocking: kept blocking.** An unprimed auditor, pointed at a file
  outside its two target kinds, forced the audit through. That is a second reproduction of the
  failure the rule exists to prevent.
- **Return rules rescoped to hand-off.** The `always` condition made the Return cluster demand a
  report format from in-conversation skills whose return is the artifact, which generated
  blocking noise on every audited file. This is a condition change inside the settled flat
  format, not a format change.
- **Calibration.** All three audits exceeded the five-finding gate (9, 9, 16). The counting rule
  (one finding per root cause, dependent rules not applicable) went into auditing-skills, and the
  dependent-rule line into steering-rules.
- **Baselines are contaminated by installed skills.** A bare baseline dispatch self-loaded an
  installed skill-authoring skill. Baseline dispatches now forbid skill use and record the
  attempt if the agent reaches for one anyway.
- **Baseline records live in `tests/baselines/`, one file per skill,** named by the Evidence rule
  so an auditor has a place to check, and linked from nothing so they never load with a skill.
