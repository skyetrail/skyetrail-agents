# Baseline record: auditing-skills

Round 1, 2026-07-31. Full detail in the repository's TEST_REPORT.md. Behaviour was measured by
running the skill fresh against three SKILL.md targets and one out-of-scope target. Model sonnet.

## What the runs showed

The skill produced complete rule-by-rule reports with evidence on every in-scope target, and its
three-fixes-first sections were coherent. The failures were calibration and scope, not coverage:

- All three audits exceeded the five-finding gate (9, 9, and 16), driven by cascade counting,
  where one missing section scored as two to four rule failures.
- Identical defects drew different verdicts across runs: the same missing baseline record scored
  fail, fail, and warn; dependent position rules scored not-applicable in one run and fail in
  another.
- Pointed at a file that is neither target kind, with no hint, the auditor forced a full audit
  through rather than stopping. Primed with the expected behaviour, it stopped. The stop
  behaviour came from the prompt, not the skill.

## What the round changed

Those observations produced the out-of-scope stop instruction, the mapping for the remaining
steering-document kinds, the one-finding-per-root-cause counting rule, the dependent-rule
not-applicable rule, and the lint-first workflow step.
