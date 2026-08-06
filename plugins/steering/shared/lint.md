# Skills lint

Settles the mechanical limits for a target once, so a report can cite a lint result instead of
re-deriving those limits by hand and no finding re-argues them.

A lint checks what a script can decide on its own, such as whether a file parses, whether it is
within a stated limit, and whether the things it points at exist. Judgment stays with the rules
files; these limits belong to the script. Which of them a given repository's lint actually performs
is that repository's business, not this file's, so establish it rather than assuming.

## Finding the command

The lint command belongs to the repository being worked in, not to this plugin. Look for it in
this order.

1. The `repo-setup` block in the repository's `AGENTS.md`, which records the command a person
   confirmed. Where it exists, it is the answer.
2. `npm run lint`, the default worth trying before anything else. In this plugin's own repository
   it is the answer, it runs from the repository root, and it is fixed.
3. Nothing recorded and no `npm run lint`. Use the `repo-setup` skill to establish the command and
   record it, rather than guessing from what the repository appears to contain.

## When it does not settle the target

Three cases, and they are not the same. In all three, say what happened and continue with the
judgment rules; never re-derive the mechanical limits by hand and present the result as a lint
result.

**No lint command exists for this repository.** Say so. Where a person is present, tell them the
repository needs one, because every skill that leans on this file is working without its mechanical
gate until it has one.

**A command exists but you cannot run it from where you are**, which is the usual case for an agent
scoped to a subdirectory of a repository whose lint runs from the root. Report the command you could
not run and why. Do not run a command whose reach you cannot bound in order to avoid reporting the
gap.

**The command runs, exits clean, and never opened your target.** This is the one that looks like a
pass and is not. Before recording a clean result, establish what the command actually reads and
whether your target is under it. Where the repository offers a way to ask the command itself, use
that; otherwise read the script. Do not take a description of coverage from a document, including
this one, since prose about what a script does goes stale without anything failing. Where the target
is not covered, report a coverage gap and say which check did not run. A lint that reports every
file up to date while never opening the file you are auditing is worse than no lint, because it
produces a pass nobody questions.

Where a run fails without settling which of these applies, such as a timeout or an error naming no
cause, run it once more only after something has changed. Where nothing has changed, do not run it
again: record that it could not be run and say what you saw.

## In this repository

`npm run lint` runs from the repository root. Ask the command what it covers rather than reading it
here:

```
npm run lint -- --explain
```

That prints which kinds of file get which checks, from the same data the run itself uses, so it
cannot disagree with what the lint does. A description written out here could, and did, four times.
