## Edits applied to `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/trigger-test-2/prompts/requests.md`

Five changes. Two are defects that would have cost the test real signal; three are hardening. No key flipped; the ten/ten split is intact.

**Item 11 — defect, rewritten.** Was: "My branch is finished and the tests are green. Can you go over the diff and tell me what is weak before anyone else sees it?" Now: "Nobody else has looked at this branch yet. Can you go over my diff and tell me what is weak in it?"

`finishing-a-development-branch` is described as "Use when implementation is complete, all tests pass, and you need to decide how to integrate the work". The old item opened with a near-verbatim match to that trigger. Item 11 is one of the four rule-3 items and its whole job is to force a choice between "code review of my code" and "feedback already received" — but a runner could take `finishing-a-development-branch` off the tests-green cue, score correct, and settle nothing. Item 16 already owns that cue legitimately. The rewrite leaves item 11 with no home among the six, which is what its rule-3 note assumes.

**Item 17 — arguable key, rewritten.** Was: "The rework list is long and none of the tasks depend on each other. Can you farm them out and run them at the same time?" Now: "The changes agreed after last week's pass over my branch do not depend on each other. Can you farm them out and run them at the same time?"

The key was defensible on the wrong side. `receiving-code-review` has an Implementation Order section governing exactly this: "One item at a time, test each" and a Common Mistakes row "Batch without testing → One at a time, test each". So the skill has a direct opinion on the old item, and a careful reader could key it yes — the same section that makes item 3 a yes. Two homes on one item. Adding "agreed" closes the receiving-side half explicitly, leaving only the dispatch mechanism, which is `subagent-driven-development`'s.

**Item 16 — hardening.** Dropped "and the tests pass". The item carried two verbatim echoes of the `finishing-a-development-branch` description at once ("all tests pass", "integrate the work"). It was free for every arm. "Everything raised on my branch is now settled" still gives it a clean home and keeps the review-closure temptation live.

**Item 15 — hardening.** "before I touch anything" → "before I start". `writing-plans` is described as "before touching code". Same reason as 16: a verbatim echo of a distractor's description makes a should-not item unable to separate arms.

**Item 4 — hardening.** Added "Do I have to do it?" The item had no ask, and `brainstorming`'s description opens "You MUST use this before any creative work - creating features, building components, adding functionality" — a bare statement that someone wants invalidation and metrics built is reachable from that. Framing the ask as obligation to the person who raised it puts it back on the receiving side, where the YAGNI section answers it. This is the least necessary of the five and the cheapest to revert.

## Per-item verdicts

Runners see the seven descriptions only, not the skill bodies (test 1's `DESIGN.md`), so "has a home" means the description matches, not the body.

Should-select, key holds and no distractor competes: 1, 2, 5, 6, 7, 8, 9, 10, and 4 as edited. Each maps to named skill content — 5 to "Gracefully Correcting Your Pushback", 7 to "GitHub Thread Replies", 9 to the worked "Fix 1-6" example, 4 to the YAGNI check, 10 and 8 to the External Reviewers checks.

Should-not, key holds: 12, 13, 14, 18, 19, 20, and 11, 15, 16, 17 as edited. Distractor coverage is one item each — 15 `writing-plans`, 16 `finishing-a-development-branch`, 17 `subagent-driven-development`, 18 `using-git-worktrees`, 19 `writing-skills`, 20 `brainstorming` — with 11, 12, 13, 14 answering `none`. No should-not item has two distractor homes after the edits.

## Residual risks I did not edit

**Item 3 is the weakest should-select.** "Eight things to change ... where do I start?" is reachable from `writing-plans` ("a spec or requirements for a multi-step task, before touching code"), and item 15 is the designated `writing-plans` item. What separates them is scale and ask: eight small things needing an order, against a fortnight of restructuring needing a written document. I judge that separation real, and I did not want to sharpen item 3 in a way that changed what it tests. Flagging it as the item most likely to fail for a reason other than the description.

**Item 14 will punish arm B if arm B's second sentence ends "and applies the ones that hold."** The user has accepted the point and is now root-causing a defect. Under a capability clause that includes applying accepted points, applying is what they are doing. The key is right about the skill — it offers nothing for "where the state goes wrong" — but the arm wording should stop at the decision, not the application, or item 14 taxes the arm the pre-registration predicts will win. This is a note about `ARMS.md`, not the item.

**Item 5 and item 7 test the same property.** Both turn on whether the description covers the outgoing half of the exchange. That is fine — it is the property the key says a vague description misses — but it means the four rule-3 items are really three distinctions.

**"Rework" appears in 15 and 18 only, both should-not.** It was in three should-not items and zero should-select before the item 17 rewrite. Two is inside noise. Worth not adding a third.

**Item 1's "branch" is a conditional, every other item's is a git branch.** Kept verbatim as instructed. Both readings land on the skill, so no key risk.

## Set-level checks

Rule 3 holds: items 5, 11, 14, 19 each turn on a distinction only the description settles, and 12 (requesting against receiving) is a fifth. Item 11 only holds after the rewrite.

Rule 1 holds across all twenty, on the broad reading the author declared. No item now carries verbatim wording from any of the seven descriptions; the closest survivor is item 15's "steps" against `writing-plans`' "multi-step task", which I left because the alternative phrasings collide with item 3's ordering ask.

Ten and ten intact.