## The three descriptions

**Arm A** — capability not stated, second person. 56 words, 325 characters.

> Use this when a reviewer has left code review comments on your pull request, when you find the feedback unclear or technically questionable, and before you implement any suggestion a reviewer makes. Your first reaction to a comment is often wrong, and agreeing with a comment is not the same thing as the comment being right.

**Arm C** — capability not stated, third person. 53 words, 311 characters.

> Applies when a reviewer has left code review comments on a pull request, when the feedback is unclear or looks technically questionable, and before any reviewer suggestion is implemented. A first reaction to a comment is often wrong, and agreeing with a comment is not the same thing as the comment being right.

**Arm B** — capability stated, third person. 56 words, 340 characters.

> Applies when a reviewer has left code review comments on a pull request, when the feedback is unclear or looks technically questionable, and before any reviewer suggestion is implemented. Checks each comment against the code, decides which to accept, which to question and which to leave alone, and settles what to say back to the reviewer.

**What is held equal.** Three trigger conditions, in the same order in all three: a reviewer has left comments; the feedback is unclear or technically questionable; before a suggestion is implemented. Same scope. Same bigram "code review", so the direction-flip items stay equally live in every arm. Same two-sentence shape, conditions first. Lengths 53 to 56 words.

**What varies, and only what varies.** B and C carry a byte-identical first sentence, so B against C changes the second sentence alone: a capability statement against a claim about the situation. A against C changes person alone: `Use this when` / `your pull request` / `you find` / `you implement` / `Your first reaction` become `Applies when` / `a pull request` / `the feedback is` / `is implemented` / `A first reaction`. The second sentences of A and C are the same 25 words apart from that one pronoun.

## The diff

Three files, 84 lines each, at:

- `/private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/tt2/arm-a.md`
- `/private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/tt2/arm-c.md`
- `/private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/tt2/arm-b.md`

Each of the three pairwise diffs returns exactly one hunk, and every changed line sits inside the four-line blockquote under `**receiving-code-review**`, at the same line numbers in both files:

- A against C: one hunk at line 27, four lines changed of ten.
- C against B: one hunk at line 28, three lines changed of nine. Three, not four, because B and C share the first blockquote line verbatim.
- A against B: one hunk at line 27, four lines changed of ten.

Nothing else differs. The header, the six distractor blocks, the description order, the twenty requests and the return format are byte-identical in all three. This is by construction: the three files are generated from one template with one substitution, by `/private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/tt2/build.py`.

## Checks run

- Description order is alphabetical and identical across the three. `receiving-code-review` sits third of seven.
- The twenty requests were extracted programmatically from the source table and compare equal, verbatim, in all three files. No `Should select` column, no counts, no near-miss note, no rule-3 section. The key does not appear.
- No 3-gram of any arm description appears in any of the twenty items, so pre-registration rule 1 holds against all three arms.
- The source-collection line and the do-not-answer-from-memory instruction are in the shared template, so they are word-identical across the arms.

## Judgment calls and residual risks

**Arm B stops at the decision.** Its capability clause ends "settles what to say back to the reviewer" and never claims to implement or apply. This follows your note on item 14. Test 1's arm B ended "and applies the ones that hold", so this is a deliberate departure from that wording, not a copy.

**I dropped an ordering clause from arm B.** A draft read "decides which to accept, which to question and which to leave alone, in what order, and what to say back." I cut "in what order". It would have given item 17 ("do not depend on each other, run them at the same time") a hook in the arm the pre-registration predicts will win, on a should-not item. Items 3 and 9 do not need it: both meet trigger condition one squarely, and that condition is identical in all three arms.

**The imperative travels with person and cannot be separated from it.** `Use this when` is an instruction to the reader, so it is the second-person form; `Applies when` is not. Arm A therefore carries a mild insistence that C lacks, and the rules file says insistence helps triggering. The confound is inherent to the rule as written, and test 1 made the same choice. A second consequence: all six distractors open `Use when`, so arm A matches the collection's house form while B and C read as foreign. If C separates from A, that separation is "written to our third-person rule" as a package, not grammatical person in isolation. Worth stating in RESULTS.md whichever way it falls.

**Distractor wording is from the local cache, superpowers 6.1.1, not from pinned commit `44c9b2d6`.** Same caveat test 1 recorded and did not close. The seven directory names reproduce the probe's mechanical selection, so the set is right; individual distractor wording may have drifted. Verifying needs a network fetch, which I did not make.

**Nothing was run.** The pre-registration gates the main run behind a single arm B pilot, scored 16 to 19 of 20. The three prompts are built and not executed.