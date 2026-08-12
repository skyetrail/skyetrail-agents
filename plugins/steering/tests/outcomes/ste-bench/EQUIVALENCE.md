# Equivalence check on the STE rewrite

Run before scoring anything, to catch a content change hiding inside a style change. A content
change would corrupt the comparison, and it would corrupt it in the flattering direction.

## Verdict on version 1: NOT EQUIVALENT

The checker read both versions section by section and found three places where the rewrite moved a
threshold or changed what a reader attests to. It cleared everything else: every category, every
exclusion, every status, every calibration example, and both named recurring misses appear in both
versions with matching substance.

| Where | The current prompt demands | The rewrite demanded |
| --- | --- | --- |
| Checklist, item 1 | "Confirmed the full target is readable", an access claim | "I read the full target", a completed-reading claim |
| Return, item 5 | anything that "seems worth a person's attention" | anything "a person needs to see", a higher bar |
| Return, opening | "Return exactly these sections" | "Return these sections", the strictness marker dropped |

The first one can move the score. A reviewer who opened every file without reading each line can
honestly tick the first box and not the second, so the rewrite could change how much of the fixture
gets read, which changes what gets found. The second affects only the unscored out-of-scope section.
The third is cosmetic.

The checker also raised, then dismissed, a fourth: the Scope prose names "code or config" in one
version and only "the code" in the other. It confirmed the Calibration section, which is the
operative text for deciding what counts, says "code or config" in both. Dismissed correctly.

## What happened next

Version 2 fixes all three. The four runs already dispatched against version 1 became a pilot and were
never scored. They showed that the rewrite ran and produced reports, not that they measured
anything, so they were deleted in the cleanup recorded in `../../README.md`.

Version 1 itself stays, at `prompts/ste-prompt.md` and `prompts/ste-prompt-fixture2.md`. A diff
against version 2 is what makes the three verdicts in the table above checkable.

## Why this check exists

An STE rewrite tends to clarify, and clarity is a content change. Without this gate the experiment
would have compared a clearer prompt against a longer one and reported the difference as a style
effect. The rewrite was mine, I believed it was faithful, and it was not in three places.
