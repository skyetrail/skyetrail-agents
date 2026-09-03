# Trigger test 2: harder items, three arms

Written and committed before anything ran. Results go in `RESULTS.md`. Nothing here changes
afterwards.

## Why a second test

Trigger test 1 ran on 2026-08-11. Both arms scored 36 of 36. Every run in both arms returned the
same answer on all twelve requests.

That is a ceiling. A ceiling cannot separate two things: the rules change nothing, or the test had
no room to show a change.

Six of its twelve requests named PR comments or review items outright. A description had to be
badly broken to miss them.

Its power was also short. With 18 should-trigger trials per arm, a true miss rate of 10 percent
shows zero misses about 15 percent of the time.

## The two rules under test

Both live in `../../shared/skill-rules.md`, in the Discovery table.

- The description states the capability, in the words someone looking for it would use. **Blocking.**
- The description speaks in the third person. **Important.**

Neither rule has ever named a consequence. The external probe fired both on almost every file it
read. Two audits of one sentence reached opposite verdicts on both.

## Three arms, not two

Test 1 used two arms. Its arm A broke both rules at once, so a difference could not be traced to
either rule.

Three arms separate them.

| Arm | Capability stated | Third person |
| --- | --- | --- |
| A | no | no |
| C | no | yes |
| B | yes | yes |

B against C isolates the capability rule. C against A isolates the third-person rule.

Everything else stays equal across the three: the same trigger conditions in the same order, the
same scope, and the same length to within a few words.

## Items

Twenty requests. Ten should select the skill under test. Ten should not.

The skill under test stays `receiving-code-review`, as in test 1, with the same six distractors.

Three rules govern the items, and each answers a way test 1 was too easy.

1. **No item repeats the description's own words.** Test 1 asked about "review comments" and "review
   items". An item now describes the situation a person is in.
2. **Every should-not item sits next to the boundary.** Requesting a review, giving a review,
   debugging after a review, and planning after a review all belong here. A far-away item measures
   nothing.
3. **At least four items turn on a distinction the description alone settles.** These are the items
   a vague description gets wrong.

The answer key never appears in a runner's prompt.

## The pilot, which gates the run

Test 1 failed because its items were too easy, and nobody found that out until after it ran.

So arm B runs once first. Where arm B scores 20 of 20, the items are too easy and the main run does
not start. The items get harder and the pilot repeats.

Where arm B scores 16 to 19, the items sit near the boundary and the main run starts.

Where arm B scores below 14, the items are too hard or the key is wrong. An independent reader
checks the key before anything else runs.

The pilot result goes in `RESULTS.md` whatever it says, including a pilot that stopped the test.

## Runs

Three arms. Three runs each. Nine runs.

That gives 30 should-trigger trials and 30 should-not trials per arm.

At 30 trials, a real difference of 10 percentage points or more shows reliably. A difference of 5
points does not. The design cannot settle a small difference and does not claim to.

Each run works alone. No run reads another run's output.

## Scoring

Correct selections out of twenty. A hit on a should-not-trigger request counts against.

Report per run and per arm. Report the variance within an arm separately, because three runs of one
arm disagreeing is a fact about reliability rather than accuracy.

## Predictions

Written now, so they can be wrong.

- **Arm B beats arm A.** Confidence: low. Test 1 found nothing, at a ceiling that hid everything.
- **The capability rule matters more than the third-person rule**, so B beats C by more than C beats
  A. Confidence: moderate. A capability statement carries information. Grammatical person does not.
- **The third-person rule shows nothing**, so C and A score alike. Confidence: moderate.
- **The pilot passes on the first attempt.** Confidence: low. Writing an item near a boundary is the
  hard part of this design.

## What each outcome means

**B beats A, and B beats C.** The capability rule earns its Blocking severity.

**B beats A, and C beats A by the same margin.** The third-person rule carries the effect, and the
capability rule does not. That would surprise me.

**No arm separates from another.** Two rules that survived a harder test with 30 trials per arm and
still show nothing. Lower the Blocking rule, or cut both.

**A beats B.** Our rules are worse than the advice they replace.

## What this cannot show

Twenty items, chosen by one author, on one skill, with one model. A rule that helps a different
skill or a different model stays unmeasured.

The test measures selection only. A description that triggers correctly and then misleads the agent
about what the skill does would pass here.
