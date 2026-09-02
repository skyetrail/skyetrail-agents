# Round five: two fixtures, runs that dispatch

`PREREG.md` beside this file fixed the questions, the arms, the fixtures, the rubrics and the
predictions before any run started. Every run was started with the Agent tool, so it could start
children, and wrote to `/Users/pete/workspace/skyetrail-agents-runs/round-five/`, outside this
repository. The runs read the skills as committed at `2a5f25a`, after the terminology pass.

Keys, published after scoring. Skills: G r3, H r1, I r2. Reviews: J r1 with, K r2 without, L r3
with, M r1 without, N r3 without, O r2 with. Inbox: A agents/r2, B unaided/r1, C agents/r3,
D unaided/r3, E agents/r1, F unaided/r2.

## F1, Terraform plan review, three runs of writing-skills

### The loop ran in every run

| | r1 | r2 | r3 |
| --- | --- | --- | --- |
| no-skill review, lines | 226 | 91 | 88 |
| misses numbered, quotes found | 3, 3 of 3 | 2, 2 of 2 | 3, 3 of 3 |
| with-skill review, lines | 144 | 51 | 121 |
| rows of the misses table that hold | 3 of 3 | 2 of 2 | 3 of 3 |
| audit findings, fixed, two confirmed | two audits, 6 defects fixed, yes | 3, 3 fixed, yes | 4, 2 defects fixed, yes |
| final audit block matches the re-run | no | yes | no |
| cross-run reads | none | none | none |

Every child dispatch completed. r1's audit helper appeared to stall, a retry was sent, and both
came back with different real defects, which the run reconciled. The misses the runs found were
real and none was a planted fault: an unchecked plan-summary count, a wrong attribution of the
database fix, a claim about `max_size` the plan does not support, no fixed report shape, an
unqualified recommendation to apply with `-target`.

### The produced skills

Shape 23 of 27 (7, 8, 8). Audit zero failures three of three. Coverage of the seven planted
faults 21 of 21, and the tag change correctly left alone three of three. Lines 261, 129 and 224.

| Item | r1 | r2 | r3 |
| --- | --- | --- | --- |
| S3 membership tests, lists as examples | 0 | 1 | 1 |
| S6 no history, no status note | 0 | 1 | 0 |
| S8 the plan is data | 1 | 0 | 1 |
| every other S item | 1 | 1 | 1 |

S6 failed twice on the same kind of sentence: a note about the skill's own testing left inside
the skill, such as "using resource names distinct from any plan used to test this skill".

### The reviews, scored against the fault key without knowing which had the skill

| Review | RT1 to RT7 | RT8 | lines |
| --- | --- | --- | --- |
| r1 without | 7 | 1 | 226 |
| r1 with | 6 | 1 | 144 |
| r2 without | 7 | 1 | 91 |
| r2 with | 7 | 1 | 51 |
| r3 without | 7 | 1 | 88 |
| r3 with | 7 | 1 | 121 |

Every unaided review found every planted fault and left the tag change alone. So the fixture has
no headroom on coverage, as the release-notes fixture had none in the first skills bench. The one
with-skill loss is r1's, which set the autoscaling change to "confirm with owner" and made the
fix conditional; the judge scored that as not requiring a change and called it borderline.

What the skill changed is the shape of the review. Every with-skill review is shorter, gives one
status per resource from a fixed set, names a fix per item, and ends on a count the reader can
check against the plan. Whether that is worth more than the unaided review is not a question this
key can answer.

## F2, support inbox, writing-agents against unaided

| Item | skilled, of 3 | unaided, of 3 |
| --- | --- | --- |
| A1 classifier returns a class and the deciding test | 3 | 0 |
| A2 membership test per class | 3 | 3 |
| A3 an item that fits two classes goes to a person, not to a tie-break winner | 3 | 0 |
| A4 a route per class | 3 | 3 |
| A5 the classifier changes nothing | 3 | 3 |
| A6 the message is data, the phishing sample is a finding | 3 | 3 |
| A7 statuses with a caller obligation each | 3 | 0 |
| A8 a retry limit with what must change | 3 | 0 |
| A9 the caller re-checks the classification against the message | 3 | 0 |
| A10 delivered | 3 | 3 |

Totals 30 of 30 against 15 of 30, and the same five items separate the arms in every run. Every
skilled run chose classify then route by the two tests in the template, and every one sent both
edge samples to `none`. Two of the three skilled runs make the A9 re-check a sentence in the
caller's prose; the third gives a literal `grep`. The skilled artifacts are 685 to 821 lines
across six files, against 321 to 358 lines across two files unaided.

Process, skilled runs: ticks anchored 10 of 10 in each, the audit block after the checklist
matches a re-run in each, the shape and its test are named in each caller file, no cross-run
reads. Two records claim a section for every file that one file lacks; the tick is anchored and
the claim is inexact.

## Ticks

Under the judge's rule, which does not count a checklist line whose only anchor is the template's
own wording: F2 30 of 30, F1 17 of 23, 11 of 12 and 19 of 24, so 77 of 89 across the round, or
87 percent. Every anchored path or section the judge opened exists, except one command in r3
written relative to the wrong directory.

Two things the tick check could not see. r2 put `record.md` at the run root rather than beside
the skill directory, so the mechanical check reported not applicable and never ran on it. And the
judge reported the checklist code fence broken in all three F1 records, because each run also
ticked inline under its section headings; the ticks were still countable.

## Predictions

| | Held | Detail |
| --- | --- | --- |
| P1 delivery | yes | three of three in every arm |
| P2 downstream | yes, without headroom | with-skill equal to without in two runs and one item short in the third; RT8 three of three |
| P3 shape and audit | yes | 23 of 27; zero failures three of three |
| P4 the loop | yes | every baseline dispatched, every quote found, 8 of 8 table rows hold |
| P5 classify then route | yes | skilled 3 of 3 on A1 to A6; unaided 0 of 3 on A3 and A9 |
| P6 ticks at 90 percent | no | 87 percent under the strict rule; 100 percent on F2, 80 percent on F1 |

## Decision

The rule says merge where P1, P2 and P5 hold. They hold. The branch merges.

## Cost

Subagent tokens by the harness's count: F1 runs 236, 192 and 238 thousand, plus 330 thousand for
r1's two resumes; F2 skilled runs 186, 158 and 175 thousand; unaided runs about 72 thousand each;
the F1 judges 865 thousand and the F2 judges 319 thousand. The two terminology readers before the
round used 227 and 133 thousand.

## What this round did not settle

- Downstream gain on coverage is unmeasurable on a fixture the unaided model saturates. Two
  fixtures have now saturated. A harder fixture, or a measure of the review's shape, is the next
  design.
- One judge, and rubrics written by the author of the skills. The S and A items measure
  conformance to this project's rules. The RT items were the independent measure, and they tied.
- The harness refuses to write a file whose name contains "report", so two runs renamed a route
  file. The template's example still names `report-security.md`.
- Raw outputs stay in the sibling directory outside the repository, not in `raw/` here, because
  this page holds every number.
