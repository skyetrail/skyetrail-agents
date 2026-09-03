# Tests

This directory holds the evidence behind the skills.

- `baselines/`, one short file per skill this plugin maintains, pointing at the results pages that
  measured it. The Evidence rule in `auditing-skills` asks for one per skill.
- `outcomes/`, one directory per experiment. Each keeps its results page and the pre-registration
  or design that fixed its question before the runs. The three fixtures still in use stay with
  their rounds: the migration under `writing-skills-diet/`, and the Terraform plan and the inbox
  samples under `round-five/`.

## What was removed, and where it is

Fixtures, prompts, keys, scoring sheets and side-by-side files of the superseded rounds were
removed in three passes, because the results pages hold every number they produced. Where a
results page names one of those files, git holds it.

- First pass: recover from `b4bc3c5`.
- Second pass: recover from `c7b9d5c`.
- Third pass, 2026-09-01: recover from `a1400dd`, the last commit before the removal. This pass
  also removed `TEST_REPORT.md`, the report on the first drafts from 2026-07-31, and the
  experiment output that sat under `plugins/skyetrail/tests/baselines/`.
