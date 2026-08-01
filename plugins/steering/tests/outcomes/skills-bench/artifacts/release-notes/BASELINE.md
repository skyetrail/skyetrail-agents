# Baseline record, release-notes skill

Written by the bench owner from the producing agent's report, because the producer was scoped to
write only inside this directory and `writing-skills` step 6 asks for the record in the plugin's
`tests/baselines/`. The producer said plainly that it could not write there, which is the
behaviour the skill asks for when a step cannot be completed.

## Step 1, no skill loaded

The producer ran four independent baselines rather than the one the workflow asks for, reasoning
that the complaint behind this skill is inconsistency between attempts, and one sample cannot show
inconsistency. Workers were `general-purpose` on `sonnet`, named explicitly, and forbidden from
loading any installed skill.

All four runs handled the same six judgment calls correctly every time: excluded the pull request
still open and in review, excluded the two internal-only entries, treated a feature and its
same-window revert as nothing to announce, removed a customer's name from a performance item,
flagged a renamed command-line flag as breaking even though the tracker labelled it a feature, and
credited the security fix without describing how to exploit it.

Two failures were real and repeated in every run.

1. **Invented release metadata written as fact.** All four runs made up a version number, and three
   of four also filled in a release date from the machine's own clock. Both went into the
   publish-ready block with nothing marking them as guesses.
2. **No fixed shape.** Section names, casing, and order differed in all four runs, and whether a
   summary paragraph appeared above the sections was close to a coin toss.

## Step 6, skill loaded

A fresh worker on the drafted files reproduced all six correct judgment calls, used the bracketed
placeholders instead of guessing a version and date, and matched the template's headings and order,
including leaving out a heading with nothing under it. Its stated reasoning named the placeholder
rule and the fixed shape as what changed its behaviour.

## Step 7, audit

The producer's own audit found three real gaps and it fixed all three before finishing: context sat
below the workflow rather than above it, there was no stop condition for input that is not a ship
log, and there was no self-check before treating the notes as done. One gap it left open and
declared rather than papering over, that the boundary section cannot name a skill that takes over
for the internal engineering changelog, because no such skill exists here.

## What this record cannot show

The lint step did not run. The producer judged that it could not bound what a repository-wide
command would read or write from inside a directory-scoped session, and followed the fallback in
`shared/lint.md` by declaring the linter unavailable instead of re-deriving its checks by hand.
That is the instructed behaviour, and it is also a gap in our own steering rather than in this
skill. See the note filed against `shared/lint.md`.
