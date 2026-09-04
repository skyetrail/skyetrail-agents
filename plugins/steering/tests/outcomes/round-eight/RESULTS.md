# Round eight: the tick check reaches the record, and the ticks anchored

`PREREG.md` beside this file fixed the runs, the scoring and the predictions before any run
started. Three runs of `writing-skills` at `b762661` on the migration fixture, with the round-six
prompt, each dispatching its own children. A usage limit cut every run and both audit helpers
mid-flight; each run resumed from its own transcript, two retried the audit with a changed
instruction, and one found its first audit had landed before the cut. The records state this.

## Numbers

| | r1 | r2 | r3 |
| --- | --- | --- | --- |
| record.md placed at | run root | run root | run root |
| K1 last pasted block shows the tick check as pass or advisory | pass | not applicable | pass |
| K2 judge's re-run agrees with that block on the tick check | yes, 57 lines identical | no | yes, 57 lines identical |
| K3 anchored ticks under the strict rule | 14 of 14 | 12 of 12 | 12 of 12 |
| K4 a tick advisory seen, ticks changed after it | none seen | none seen | none seen |
| misses numbered, quotes found verbatim | 2, 2 of 2 | 2, 1 of 2 (dash characters differ) | 1, fragments found, one cut inside a parenthesis |
| with-skill rows that hold | 2 of 2 | 2 of 2 | 1 of 1 |
| audit findings, fixed | 4, 3 fixed | 4, 2 fixed and 2 differences left with reasons | 5 across 6 rows, 5 fixed, 1 left |
| final audit | 24 pass, 0 fail | 25 pass, 0 fail on re-run | 24 pass, 0 fail |

All three records sat at the run root, two levels above the SKILL.md, where the check did not look
in round six. The judge's own re-run reported the tick check as pass on all three, so the check now
reaches a record there.

## What did not hold as predicted

P1 asked for the check to show in every run's own last block. In r2 both pasted blocks show it as
not applicable, with the reason "no ticked checklist". The judge's re-run minutes later shows pass
with the same script, and the script had not changed, so r2 ran its final audit before its ticks
were on disk, against the Delivery text that puts the final audit after the checklist. r2 also
audited the skill directory rather than the SKILL.md path, which changes nothing in the counts.

P3 could not be exercised: no run ever saw a tick advisory, because where the check ran it either
passed or found no ticks yet.

## Why the ticks anchored this time

Every tick names a section of the record, a path under `runs/`, or a section of the delivered
SKILL.md. r1's record says it changed two ticks from the skeleton's rule-file form to "a resolvable
path", because the rule-file form "does not resolve from this record.md's own directory", which is
what the check's rule says. That is the one visible case of the check's rule shaping a tick. The
other two runs anchored in record sections from the start. Three runs cannot separate the check's
effect from run-to-run variance, and round six's 10 of 38 stands beside this round's 38 of 38.

## A disclosed read

r2's record discloses that a `find` and `cat` sweep of `plugins/steering` before the artifact
test read `tests/baselines/writing-skills.md`, the pointer to two results pages and a line saying
the skill runs on sonnet only. The record says nothing drew on it, and the file holds no fixture
content, so it changes no number here. The judge noted the record's summary of the file undercounts
its lines.

## Decision

The check fix is recorded as measured: it reaches a record at the run root. P1 failed as worded,
on one run's ordering rather than on the check. The ticks item leaves the open list with its two
figures, 10 of 38 and 38 of 38, and no rule added.

## Cost

Subagent tokens by the harness's count: 250, 254 and 298 thousand for the runs, including the
resumes; 171 thousand for the judge.
