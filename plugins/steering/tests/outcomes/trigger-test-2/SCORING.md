# Trigger test 2 — scoring

Scored against `prompts/requests.md`. Items 1–10 should select `receiving-code-review`; items 11–20 should not, and the distractor chosen on a should-not item is not scored. Runs are numbered in the order supplied.

## Per run, out of 20

| Run | Score | False negatives | False positives |
| --- | --- | --- | --- |
| A1 | 19/20 | 7 | none |
| A2 | 19/20 | 7 | none |
| A3 | 19/20 | 7 | none |
| B1 | 18/20 | 3, 7 | none |
| B2 | 18/20 | 3, 7 | none |
| B3 | 19/20 | 7 | none |
| C1 | 19/20 | 7 | none |
| C2 | 16/20 | 3, 5, 7, 9 | none |
| C3 | 17/20 | 3, 7, 9 | none |
| Pilot (B) | 19/20 | 7 | none |

## Per arm, three runs

| Arm | Total | Should-trigger (30) | Should-not (30) |
| --- | --- | --- | --- |
| A — no capability, second person | 57/60 (95.0%) | 27/30 (90.0%) | 30/30 (100%) |
| B — capability, third person | 55/60 (91.7%) | 25/30 (83.3%) | 30/30 (100%) |
| C — no capability, third person | 52/60 (86.7%) | 22/30 (73.3%) | 30/30 (100%) |

Order: **A > B > C**. Not the predicted order.

Every error in all nine runs is a false negative. No arm fired on a should-not item once. The should-not half of the test, ten boundary items and 30 trials per arm, is at ceiling in all three arms and separates nothing.

The pilot scored 19/20, inside the 16–19 gate. The gate held.

---

## 1. B against C — the capability rule

| | B | C | Difference |
| --- | --- | --- | --- |
| Total | 55/60 | 52/60 | +3 items, 5.0 points |
| Should-trigger | 25/30 | 22/30 | 10.0 points |

Direction is as predicted: stating the capability beats not stating it. Size is exactly the design's stated detection floor and no more, and the floor is optimistic. Fisher exact on 25/30 against 22/30 gives p = 0.53. The whole gap is three trials, and all three sit in two runs of arm C (C2, C3) that also disagree with C1 and with each other.

**The design cannot carry this difference.** A 10-point gap on 30 trials was called reliable in the pre-registration; the actual test of these counts is not close to reliable. Read as: no evidence against the capability rule, and no evidence for its Blocking severity.

## 2. C against A — the third-person rule

| | C | A | Difference |
| --- | --- | --- | --- |
| Total | 52/60 | 57/60 | A +5 items, 8.3 points |
| Should-trigger | 22/30 | 27/30 | A +16.7 points |

A beats C, holding capability constant. The prediction was that these two would score alike.

16.7 points on the should-trigger scale is the only comparison in the test that clears the design's own 10-point threshold. Fisher exact gives p = 0.18 on 30 trials, p = 0.051 with the dead item dropped. That is suggestive, not settled, and it points the wrong way for the rule: the third-person rewrite **cost** triggering rather than gaining it.

Two confounds sit on this comparison and both were flagged before the run. The imperative travels with second person (`Use this when` against `Applies when`), so arm A carries an insistence C lacks. And all six distractors open `Use when`, so arm A matches the collection's house form while C reads as foreign. What separated is "written to our third-person rule" as a package, not grammatical person alone. The result does not license a claim that the pronoun is the cause.

## 3. Variance within each arm

| Arm | Runs | Range | Answer vectors |
| --- | --- | --- | --- |
| A | 19, 19, 19 | 0 | all three identical, item for item |
| B | 18, 18, 19 | 1 | B1 and B2 identical; B3 differs on item 3 |
| C | 19, 16, 17 | 3 | all three different |

Arm C is the unstable arm. Its spread of 3 points is larger than any between-arm difference in the test except A over C. Arm C's best run (19) beats arm B's median run (18); its worst run (16) is the lowest score anywhere.

This matters more than the means. A description that returns 19, 16, 17 on identical input is not being read consistently. Any arm-level ranking that depends on three trials against an arm with that spread is unsafe, which is precisely the B-against-C comparison in section 1.

Arm A returned the same twenty labels three times running. Whatever else it does, it is the only arm the model reads the same way twice.

## 4. The four items built to carry the test

Items 5, 11, 14 and 19, the ones rule 3 says turn on a distinction only the description settles.

| Item | Direction | Correct, of 9 runs | Wrong in |
| --- | --- | --- | --- |
| 5 — outgoing half of the exchange | yes | 8/9 | C2 |
| 11 — direction | no | 9/9 | — |
| 14 — downstream scope | no | 9/9 | — |
| 19 — topic against task | no | 9/9 | — |

**35 of 36. The four carrying items carried nothing.**

This is the finding that governs the rest. Items 11, 14 and 19 were designed so that a vague description takes them; no arm took any of them, not once, including the two arms that state no capability at all. Item 19 in particular was built so that only a capability statement should reject it — every run of every arm rejected it, and every run named `writing-skills` with a clean rationale. The distinction the description was meant to settle, the model settled without the description.

Item 5 is the single discriminating trial: arm C's run 2 read the evaluation as spent and answered `none`, exactly the failure mode predicted for a description that promises to judge correctness and stops there. One trial in nine.

So the entire between-arm spread in this test lives on items 3, 7 and 9, which were not designed to discriminate and which no arm's description addresses. Items 3 and 9 are both sequencing items ("Where do I start?", "Should I start those and ask about the other two after?"). The build note records that an ordering clause was deliberately cut from arm B to keep item 17 clean. Arm A, which never mentions ordering either, took 3 and 9 six times out of six; B missed 3 twice; C missed 3 twice and 9 twice. A difference spread across items the descriptions do not speak to is weak evidence about the descriptions.

## 5. The item every run got wrong

**Item 7.** All nine runs answered `none`. The pilot answered `none`. Ten of ten.

> My manager left notes on specific lines of my diff on GitHub. I want my answers to land where she wrote them, not at the bottom of the page.

Every run that gave a rationale gave the same one: this is GitHub reply-placement mechanics, not evaluating or acting on review content. Arm B says outright that it "settles what to say back to the reviewer" and still declined it three times plus the pilot.

This is an item fault or a key fault, not a description fault. It costs every arm one point, caps the achievable score at 19/20, and adds nothing. Drop it or rewrite it before any further run. With item 7 removed: A 57/57, B 55/57, C 52/57.

Item 3 is the next candidate for review — 5 of 9, and the two arms that miss it name `writing-plans` or `none` with defensible reasoning ("sequencing already-agreed fixes"). It may be a genuine boundary item or a second key error.

---

## Verdict

**No arm separates from another.** That is the pre-registration's third outcome.

The numbers do not support "B beats A and B beats C": B did not beat A. They do not support "B beats A and C beats A by the same margin": neither beat A. They do not support "A beats B" either, and this is the point to be strict about — A led B by 2 items in 60, 6.7 points on the should-trigger scale, p = 0.71. The design states that a 5-point difference does not show at 30 trials. This one is smaller than the difference the design already disclaims. Reporting "our rules are worse than the advice they replace" on the strength of two trials would be reaching for a difference the sample cannot carry, and I will not report it.

What the sample can and cannot carry, stated plainly:

- **A against B, 6.7 points on 30 should-trigger trials: cannot be settled.** Below the design's own floor. Report as no difference.
- **B against C, 10.0 points: cannot be settled.** It sits on the floor, not above it, and the exact test on these counts gives p = 0.53. The pre-registration's claim that 10 points "shows reliably" at 30 trials is too generous for the counts observed. Direction favours the capability rule; magnitude is not established.
- **A against C, 16.7 points: the only comparison above the floor, and still not conclusive** (p = 0.18; p = 0.051 with the dead item dropped). It is also the comparison carrying two acknowledged confounds, imperative mood and house-form matching. Treat it as a signal to investigate, not a result.

Consequences for the two rules under test:

**The capability rule does not earn Blocking on this evidence.** Three runs, one 10-point gap at the detection floor, sourced entirely from an unstable comparison arm, with the four items designed to test that exact rule returning 35 of 36 across all arms. Blocking severity asserts that a description failing this rule fails at its job. Nothing here shows that. Item 19 was the rule's own best case and every arm passed it. Lower it to Important, or set a threshold that this test would have cleared and run against that.

**The third-person rule shows nothing in its favour and, if anything, points against itself.** The one comparison that clears the floor runs the wrong way. The rule as written cannot be separated from the imperative mood and from breaking form with the surrounding collection, and both of those plausibly hurt. Either rewrite the rule to hold mood constant and re-test, or cut it.

The larger finding is about the instrument, not the rules. Ten boundary items at 100% in all three arms, and 35 of 36 on the items built to discriminate, means this test still has no room to show a difference. It is test 1's ceiling problem moved from the should-trigger half to the should-not half. A third test needs items where a wrong description demonstrably fails, verified by building a deliberately broken arm that scores low — otherwise the next null result is again uninformative.

Working file: `/private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/score.py`