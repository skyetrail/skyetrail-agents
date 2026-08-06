# Skills lint

Settles the mechanical limits for a target once, so a report can cite a lint result instead of
re-deriving those limits by hand and no finding re-argues them.

The linter checks that the frontmatter carries no YAML hazards, the name format and length and that
the name matches its directory, the description length, the body line count, and that every
reference resolves, in markdown links and in backticked relative paths alike. Judgment stays with
the rules files; these limits belong to the script.

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
pass and is not. Before recording a clean result, establish what the command actually reads: the
paths it walks, and whether your target is under one of them. Where it is not, report a coverage
gap and say which check did not run. A lint that reports every file up to date while never opening
the file you are auditing is worse than no lint, because it produces a pass nobody questions.

Where a run fails without settling which of these applies, such as a timeout or an error naming no
cause, run it once more only after something has changed. Where nothing has changed, do not run it
again: record that it could not be run and say what you saw.

## In this repository

`npm run lint` runs from the repository root. A lint failure writes nothing and lists every problem
with its file.

What it opens differs by check, so say which check did not run rather than that the lint did not
run. Which checks a file gets follows from what kind of file it is.

- **A component**, meaning a file the plugin manifest lists as something an agent loads by name.
  `skills/*/SKILL.md`, `commands/*.md`, and `agents/*.md` are the components today. These get
  everything: frontmatter hazards, description length, body line count, and reference resolution.
  Only a skill also has its name checked against its directory, because only a skill is named by
  its directory.
- **A reference surface**, meaning a file that loads alongside a component rather than being one.
  A top-level `.md` under `shared/` and a plugin's `SUMMARY.md` are reference surfaces today. These
  get reference resolution only. The frontmatter and length checks read a component's frontmatter,
  and these files have none.
- **Excluded**, meaning anything under a plugin's `tests/`. Not opened at all, by design, since
  those are records that may cite paths from earlier rounds.

Where a target is none of these, say so and name the checks that did not reach it, rather than
reporting either a pass or a total gap.

CI runs on any change under `plugins/**`, so a broken reference anywhere above cannot merge. The
pre-commit hook is narrower: its file trigger matches components, a plugin's README, and the
manifests, but no reference surface. A commit touching only a reference surface runs no hook
locally and is caught by CI alone.
