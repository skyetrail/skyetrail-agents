# Baseline record: auditing-skills

Rounds 1 to 3, 2026-07-31. Full detail in the repository's TEST_REPORT.md. The comparison task:
review `writing-agents/SKILL.md` before shipping. Model sonnet. The baseline reviewer was given
the target and told it could read the files the target links; it was not given this skill.

## Without the skill

The reviewer found the rule files through the target's own links and applied them competently,
including the dependent-rule meta-rule. What it did not have was the calibration and the report
discipline:

- Findings came back in prose tiers (fix before shipping, worth fixing, nice to have) rather
  than the fixed severity-tagged table, so two runs cannot be compared without editing.
- No counts by severity and no lint statement.
- A taste finding slipped in (no worked example, flagged from "my own general sense"), which the
  calibration section exists to filter.
- One rule was misapplied: sibling skill names were flagged as unresolvable nicknames, though a
  skill name is the plugin's own resolution convention.

It also independently found the same two genuine blocking defects the with-skill audit found,
which raises confidence in both.

## With the skill

Fresh agents running this skill produced the fixed Rule, Result, Evidence table with severity
counts and a lint statement, applied the default-to-pass calibration, counted one finding per
root cause, and checked the baseline records where the Evidence rule points. Round-over-round:
9 findings before the calibration fixes, 2 to 5 after, with previously confirmed blocking items
resolving and staying resolved.

## What the comparison settled

Rule application comes free once the rules are reachable from the target. The skill's value is
the calibration, the fixed comparable report, the severity counts, and the out-of-scope stop.
The discriminator added in round 3 was re-verified in the 2026-07-31 re-run round. Across the
adoption sweep, the re-run, and one interrupted extra sample, severity-level calls were stable
on every target, and all remaining variance was confined to pass-versus-warn calls on advisory
and minor rows, at most three rows between any two runs of the same target. The margin wobble
is real and recorded; the calls that gate shipping did not move.
