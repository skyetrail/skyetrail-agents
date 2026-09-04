# Round six: the skeleton, and repo-setup on memory

`PREREG.md` beside this file fixed the questions, the arms, the fixture, the rubrics and the
predictions before any run started. Every run started with the Agent tool. The runs read the
skills at `15c6aef`. Key for the skills: P r2, Q r3, R r1.

## F1: the skeleton bound structure where five rules did not

All three produced skills carry exactly these `##` headings, in this order: Outcome, Context,
Scope, Method, Finish, Failure, Calibration, Composition. No other `##` heading appears outside a
fenced template. In the structure round of 2026-08-21, one run in three renamed every section;
in round five the three Terraform skills had 15, 2 and 2 files and 261, 129 and 224 lines.

| | r1 | r2 | r3 |
| --- | --- | --- | --- |
| headings identical, H1 | 1 | 1 | 1 |
| the data sentence under Context, H2 | 1 | 1 | 1 |
| no skeleton note left, by intent | yes | yes | yes |
| no angle brackets at all, H3 as written | 0 | 0 | 0 |
| shape S1 to S9, of 9 | 9 | 7 | 8 |
| audit | 23 pass, 0 fail | 22 pass, 0 fail | 24 pass, 0 fail |
| coverage D1 to D7, of 7 | 7 | 5 | 6 |
| D8, the safe column left alone | 1 | 1 | 1 |
| files | 3 | 2 | 5 |
| SKILL.md lines | 185 | 196 | 202 |

H3 was written too literally. The brackets that remain are the slots of each skill's own report
template, such as `<migration file name>`, which a template needs. No note from the skeleton
survived in any skill, which is what the item meant. The prediction on file count, a spread of at
most 2, missed by one: 2, 3 and 5 files. Line counts converged without a rule about them.

The loop ran in every run: a no-skill review of 139, 159 and 98 lines, two misses each quoted
from it and found by the judge, a with-skill review in which every miss was gone, and an audit
whose fixes the judge confirmed in the delivered text. The final audit block matched the judge's
re-run in every run.

Ticks fell back. Under the judge's rule, a path, a command, or a section of a file from the run,
anchored ticks were 0 of 14, 4 of 12 and 6 of 12. Two runs put `record.md` at the run root rather
than beside the skill directory, and the mechanical check looked one level up only, so it reported
not applicable for one record and passed the other on checklist wording. The check now also reads
a `record.md` two levels up. That change is after the round and unmeasured.

## F2: repo-setup did the discovery and the restraint, and wrote nothing

Scored from the run directories by a judge and from the replies by the author, because the
skilled runs put their conclusion in the reply by design.

| Item | skilled, of 3 | unaided, of 3 |
| --- | --- | --- |
| R1 repository untouched, `git status` empty | 3 | 3 |
| R2 no new or ignored file under the repository | 3 | 3 |
| R3 all four candidates named | 3 | 3 |
| R4 decision put to a person, no command recorded as confirmed | 3 | 1 |
| R5 a record in memory | 0 | 3, none with frontmatter or an index line |
| R6 no `AGENTS.md` created or changed | 3 | 3 |

Every run, with or without the skill, found the same four candidates and left the repository
clean. The unaided runs then picked `make lint` in two cases, one calling it "the only command in
the repo literally named lint", and one fetched and ran the tools to see what worked, which the
skill forbids. The skilled runs returned the decision to a person, three of three.

The zero is a defect in the skill's step order, not in the runs. It said decide, then write, and
stop on a pending decision, so a run that correctly returned the decision wrote nothing, and the
next agent would repeat the discovery. Each run said so in its own words: "the skill's write step
follows the decision step". The record's `Unresolved` field was for exactly this case. The skill
now writes the record first, with the candidates under `Unresolved` and no command marked
confirmed, then stops. That change is after the round and unmeasured.

## Predictions

| | Held | Detail |
| --- | --- | --- |
| P1 headings identical | yes | three of three |
| P2 data sentence, no skeleton note, audit | yes | H3 held by intent, not by its wording |
| P3 file-count spread at most 2 | no | 2, 3 and 5 |
| P4 skilled repo-setup R1, R4, R5, R6 | no, on R5 | untouched, decided, no `AGENTS.md`, and no record |
| P5 unaided R4 at most one of three | yes | one of three, and that one fetched tools to decide |

## Decision

The skeleton stays: P1 held and P2 held. The rewritten `repo-setup` stays with its step order
fixed after the round. The fixed order is unmeasured.

## Cost

Subagent tokens by the harness's count: the three writing-skills runs 247, 210 and 213 thousand;
the six repo-setup runs 65 to 71 thousand each; the judges 419 thousand.
