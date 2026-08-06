# Baseline record: writing-skills

Round 1, 2026-07-31. Full detail in the repository's TEST_REPORT.md. Task: capture a six-step
docs-site deploy runbook as an Agent Skill. Model sonnet, one run per arm.

## Without the skill

The unaided subagent, with skill use forbidden, produced a valid SKILL.md: parsing frontmatter,
a legal name, a third-person description, numbered steps, a failure section, and bundled scripts
one hop away. Syntax and structure are not failures the skill needs to address.

Observed failures the skill does address:

- The description summarised the workflow step by step, which trains the agent to follow the
  summary instead of the body.
- The body carried a section restating the description.
- Nothing was verified: no baseline, no evidence, and judgment calls were flagged but untested.

A first bare run, before skill use was forbidden, silently loaded an installed skill-authoring
skill. That produced the step 1 instruction to forbid installed skills in baseline dispatches.

## With the skill

The agent ran the whole loop: dispatched its own no-skill baselines against a fixture, recorded
five concrete failures in the baseline agent's own words, wrote a skill in which every rule
traces to one of them, re-ran with the skill and saw the gate hold, and caught a YAML parse bug
in its own first draft at the audit step.

## What the comparison settled

The skill's value is the method, not format teaching: the baseline gate, the description and
scope discipline, and the audit step. Format prose would fail the "nothing the model already
knows" rule.

## Step 7 changed, 2026-08-01, baseline not repeated

Step 7 read "audit against the rule files, or by using `auditing-skills`". That choice let the
author audit its own draft. The skill this plugin's own tooling produced took it, self-audited,
fixed three gaps and missed four that an independent auditor later found, one of them blocking.
Step 7 now requires dispatching a fresh agent, with self-audit allowed only where no subagent
exists and only if the record says the audit was not independent.

Handled under this skill's own small-change clause: step 7 alone, and the baseline was not
repeated. The change does not alter what the skill claims to produce, only who checks it.

Recorded here because an audit found the record missing, not because the change was noticed at the
time. The rule requiring this note is in the file that was edited, and editing it is exactly when
it was forgotten.

Later the same day, three further audit findings were fixed without repeating the baseline: the
artifact-check list was opened with a membership test and a fallback, and two passages restating
`skill-rules.md` were replaced with pointers, one of which had already drifted from its source.
