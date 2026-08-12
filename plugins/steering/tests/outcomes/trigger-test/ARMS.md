Both arms built. Not run.

**Skill under test: `receiving-code-review`.**

The design does not name it. It is forced by the external probe, which this design exists to close out: `external-probe/RESULTS.md` says the trigger test was the one objective check on that skill's description, both audits faulted it in opposite directions, and it was never run. The twelve requests confirm it — all six should-trigger requests are about receiving review feedback.

**The six distractors** (the design does not name them; taken from the superpowers collection the probe used):

`brainstorming`, `finishing-a-development-branch`, `subagent-driven-development`, `using-git-worktrees`, `writing-plans`, `writing-skills`

Why these six: they are the probe's other six audited skills. That set was fixed by a pre-registered mechanical rule — every third of fourteen sorted alphabetically, plus two declared additions — before anyone read the files. Given that an earlier version of this directory carried hand-written runs, a distractor set I could have tuned is worth avoiding. This one I did not choose.

Two exclusions were deliberate:

- `requesting-code-review` is excluded even though it is the nearest neighbour. Its name carries "code review", so it would give request 7 a legitimate home. Request 7 is the near miss, built to catch a description that keys on those words. A second "code review" name absorbs it and destroys its diagnostic value.
- `systematic-debugging` is excluded even though it would give request 10 a home. Adding it means substituting my judgment for the pre-registered set. Requests 7 and 10 therefore have no home in the menu, and `none` is correct for both. That costs nothing under the design's scoring, which only counts whether the skill under test is selected.

**Arm A** (states no capability, second person — satisfies neither rule):

> Use this when a reviewer has left code review comments on your pull request, when you find the feedback unclear or technically questionable, and before you implement any suggestion a reviewer makes. Be careful here, because your first reaction to a comment is often wrong, and agreement is not the same thing as being right.

**Arm B** (states the capability, third person — satisfies both):

> Applies when a reviewer has left code review comments on a pull request, when the feedback is unclear or looks technically questionable, and before any reviewer suggestion is implemented. Checks whether each comment is technically correct, decides which to accept, which to question, and which to defer, and applies the ones that hold.

Held constant across the two: the same three trigger conditions in the same order, the same scope, and the same surface vocabulary, including the bigram "code review" so the near miss is equally live in both. Both open with the conditions and close with a second sentence, so sentence order does not vary. Only the second sentence changes in kind — capability named versus not — and person changes throughout. Arm A 55 words / 325 characters, arm B 53 words / 336 characters. Neither arm uses an insistent form the other lacks.

**Files**

- `/private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/trigger/arm-a.md`
- `/private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/trigger/arm-b.md`

`diff` returns one hunk, four lines, at the same line numbers. Both files are 75 lines. Nothing else differs.

Description order is alphabetical and identical in both arms, so order cannot explain a difference. The skill under test sits third of seven.

**Key stripped.** The runner prompts carry the twelve requests verbatim (diffed against the source, identical) with no Should-select column, no near-miss note, and no count of how many should trigger.

Three things to check before running:

1. The six distractor descriptions come from superpowers v6.1.1 in the local plugin cache, not from pinned commit `44c9b2d6`. No local copy of that commit exists, and I did not fetch one. The fourteen directory names in the cache reproduce the probe's mechanical selection exactly, so the set is right, but individual distractor wording may have drifted since the pinned commit. Verifying against the pinned tree needs a network fetch, which I left for you to authorise.
2. Each prompt carries one added line telling the runner the descriptions are adapted from the MIT-licensed obra/superpowers collection, that some wording was altered, and not to answer from memory. It is identical in both arms. It serves the licence and it blocks a runner that recognises the real collection from recalling the true description, which would contaminate arm A only. The design does not mention a preamble, so flagging it as my call.
3. The design calls for three runs per arm. Nothing here runs them.