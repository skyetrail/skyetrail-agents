# Trigger test: it ran, and it cannot answer the question

Designed on 2026-08-07. Run for the first time on 2026-08-11. Raw runs in `./runs/`, the arms in
`./ARMS.md`, the scoring in `./SCORING.md`.

## The result

Both arms scored 36 of 36. Every run, both arms, returned the same selection on all twelve requests.

| Arm | Total | Recall | False triggers |
| --- | --- | --- | --- |
| A, no capability stated, second person | 36/36 | 18/18 | 0/18 |
| B, capability stated, third person | 36/36 | 18/18 | 0/18 |

Variance within an arm: zero, both arms.

## What it does not license

The design pre-committed to reading no difference as the clearest case there is for cutting a
blocking rule. **This result does not earn that reading.**

Both arms hit the ceiling. A ceiling cannot separate "the rules change nothing" from "the test had
no room to show a change", and only the first would justify cutting the rule.

The power is not there either. With 18 should-trigger trials per arm, a true miss rate of 10% in arm
A shows zero misses about 15% of the time, and a 5% rate shows zero about 40% of the time. So this
design cannot rule out a real degradation of five to ten percent. Any test on 36/36 against 36/36
returns p = 1.0, and would do so for two identical descriptions.

Six of the twelve requests name PR comments or review items outright. A description would have to be
badly broken to miss them.

## The near miss produced no signal

Request 7 is the design's one instrument for catching a description that keys on the words "code
review" rather than on the direction of the feedback. Both arms carried that bigram deliberately.
Neither fell for it, and one run's reasoning shows it separated the cases on direction rather than
vocabulary.

So the item did not merely fail to separate the arms. It produced nothing at all. That is a fact
about the item.

## Two deviations, both declared before the runs

The six distractor descriptions came from the superpowers copy in the local plugin cache, version
6.1.1, not from the commit `44c9b2d6` the external probe pinned. The fourteen directory names
reproduce the probe's mechanical selection exactly, so the set is right, but individual wording may
have drifted.

Each runner prompt carries one added line naming the source collection and telling the runner not to
answer from memory. It is identical in both arms. It exists so a runner recognising the real
collection cannot recall the true description, which would contaminate arm A only. The design does
not mention a preamble.

## One thing recorded before a reader asks

An earlier version of this directory held six run files that no agent produced. They were caught
because they were byte-identical across two arms, which independent runs cannot be. The scored
content here has that same shape.

What differs: these runs were executed, and the first carries per-item reasoning the other five do
not. The record says so here rather than waiting for the question.

## Where this leaves the two rules

The description rules stay. They are neither justified nor refuted by this.

Settling them needs items that sit near a decision boundary and enough trials to see a five percent
difference. That is a different test, not another run of this one.
