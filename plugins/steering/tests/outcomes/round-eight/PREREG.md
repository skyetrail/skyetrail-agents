# Pre-registration: round eight, does the tick check reach the record, and do ticks anchor?

Written and committed before any run started. Skill under test: `writing-skills` at `b762661`.
The change since round six: the mechanical tick check reads a `record.md` two levels above a
SKILL.md, where two of three round-six runs placed theirs, and the check reported not applicable.

## Runs

Three runs of `writing-skills` on the migration fixture, `../writing-skills-diet/fixture/`,
started with the Agent tool so they can dispatch, with the same prompt as round six. No unaided
arm and no skill judge; the produced skills were scored in round six.

## Scoring, by a process judge from the run directories

| Item | Meaning |
| --- | --- |
| K1 | the final pasted audit block in `record.md` lists `skill-tick-anchors` as pass or advisory, not as not applicable |
| K2 | the judge's own re-run of `npm run audit` on the delivered path agrees with that block on the tick check |
| K3 | anchored ticks under the strict rule: a path, a command, or a section of a file from this run; checklist wording alone or a rule file alone is not anchored |
| K4 | whether any pasted block in the record reports a tick advisory, and whether the ticks changed after it |

## Predictions

- P1 K1 holds in three of three: the check reaches every record, wherever the run put it.
- P2 K3 is at least 75 percent across the three records, against 26 percent in round six and 80
  percent in round five, where the records sat beside the skill directory.
- P3 Where a run sees a tick advisory, it changes the tick before the final block, in every case.

## Decision rule

The check fix is recorded as measured where P1 holds. P2 and P3 are recorded either way. Where
P2 fails with P1 holding, the check reaches the record and the ticks still do not anchor, which
points at the check's rule rather than at where it looks.
