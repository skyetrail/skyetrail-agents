# Trigger test — scoring

Scored exactly as `DESIGN.md` states: correct selections out of twelve, a hit on a should-not-trigger request counting against. Only the selection of the skill under test (`receiving-code-review`) counts. On requests 8–12 the specific distractor chosen is not scored, so `writing-plans` vs `none` on 8 is neither credit nor penalty — only "did not take the skill under test" matters.

Key: 1–6 should select; 7–12 should not.

## Per run

| Run | Should-trigger correct (of 6) | Should-not-trigger correct (of 6) | Total |
| --- | --- | --- | --- |
| A1 | 6 | 6 | **12 / 12** |
| A2 | 6 | 6 | **12 / 12** |
| A3 | 6 | 6 | **12 / 12** |
| B1 | 6 | 6 | **12 / 12** |
| B2 | 6 | 6 | **12 / 12** |
| B3 | 6 | 6 | **12 / 12** |

## Per arm

| Arm | Total | Recall (18 should-trigger trials) | False-trigger rate (18 should-not trials) |
| --- | --- | --- | --- |
| A (no capability, second person) | **36 / 36** | 18/18 = 1.00 | 0/18 = 0.00 |
| B (capability stated, third person) | **36 / 36** | 18/18 = 1.00 | 0/18 = 0.00 |

Difference: **zero**. Not a small difference — the two arms returned the same answer on all twelve requests in all six runs.

## Request 7 — the deliberate near miss

Neither arm fell for it. All six runs answered `none`.

This is the design's one instrument for detecting a description that keys on the bigram "code review" rather than on the direction of the feedback, and both arms carried that bigram deliberately. It fired in neither. A1's rationale shows the discrimination was made on direction, not vocabulary: it separates "review code proactively" from "handle feedback already received". So the near miss did not merely fail to separate the arms — it produced no signal at all. That is a fact about the item as much as about the descriptions.

## Variance within an arm

Zero, in both arms. Three runs of A agree item-for-item; three runs of B agree item-for-item. No reliability finding is available, in either direction: the task never landed near a decision boundary where sampling noise could show up.

One thing to keep in the record rather than to conclude from. This directory's earlier fabricated results were caught because six run files were byte-identical across two different arms, which independent runs cannot be. The scored content here has that same shape. What distinguishes it is that A1 carries per-item reasoning the other five do not, and that these runs were actually executed. I raise it because the design's own history makes identical vectors a thing a reader will ask about, and the answer should be on the page before they ask, not after.

## Which requests each arm got wrong

Neither arm got anything wrong. There is no shared failure set and no arm-specific one, so the question of whether both arms fail on the same requests has no content to answer.

## Verdict

**No difference.** In the design's own terms, that is the outcome the numbers support.

Now the honest qualification, which matters more than the verdict.

The design pre-committed to reading "no difference" as *the clearest case for cutting a blocking rule there is*. This particular no-difference does not earn that reading in full, because it is a **ceiling result**. Both arms scored the maximum. A ceiling cannot distinguish "the rules change nothing" from "the test had no room to show a change". Those are different claims and only the first one licenses cutting the rule.

Where the sample is too small, concretely:

- **18 should-trigger trials per arm.** If arm A's true per-item miss rate were 10%, the probability of observing zero misses across 18 trials is 0.90^18 ≈ **15%**. At a 5% miss rate it is 0.95^18 ≈ **40%**. So this design cannot rule out a real degradation of 5–10% in arm A; it would have been missed a large fraction of the time.
- **Any statistical test on 36/36 vs 36/36 returns p = 1.0** and would do so for two identical descriptions. The test as run has no discriminating power at the top of its range.
- **Twelve requests, six of them easy.** Requests 1, 3 and 6 name PR comments or review items outright. A description would have to be badly broken to miss them. The items that could separate the arms are the ones where the capability has to be inferred (4, 5) and the near miss (7), and all three were unanimous.

What the result does support, stated at its true strength: **on requests of this difficulty, neither the capability-statement rule nor the third-person rule changes which skill is selected.** That is a real finding and it is the first objective evidence the probe's two most-cited rules have ever had. It is not yet evidence that the Blocking rule can be cut, because the test never made either arm work hard.

If the question is to be settled rather than gestured at, the next version needs harder should-trigger items — requests where the user describes the situation without naming a PR or a review — and more runs. Six runs at ceiling is the same amount of information as one run at ceiling.

## Three caveats on the material, carried forward from the build

1. **Distractor provenance.** The six distractor descriptions came from superpowers v6.1.1 in the local plugin cache, not from the probe's pinned commit `44c9b2d6`. The fourteen directory names reproduce the probe's mechanical selection exactly, so the *set* is right, but individual wording may have drifted. Given that all six runs are unanimous and no distractor was ever in contention against the skill under test, drift is unlikely to have changed any outcome here. It would matter more in a harder redesign.
2. **The preamble is an undeclared addition.** Each runner prompt carries one line stating the descriptions are adapted from the MIT-licensed obra/superpowers collection and that the runner should not answer from memory. The design does not mention a preamble. It is identical in both arms, so it cannot explain a between-arm difference, and there is no between-arm difference to explain. It should be written into the design before any rerun, not left as a build-time judgement call.
3. **These are the first real runs.** The design said "designed, not run". It has now been run, six times, and the result is a null at ceiling.