# Baseline record, repo-setup

Task for every run: work out how linting works in a repository and record it so later agents do
not repeat the work, in a way that is safe to run again. Fixture at
`tests/outcomes/setup-bench/fixture`, a deliberately ambiguous repository: no `lint` script in
`package.json`, a `Makefile` target that lints only `src/`, two pre-commit hooks covering
different files, a README that points at the hooks, and a `verify` script that looks lint-adjacent
and is not. Worker model Sonnet throughout.

## Step 1, no skill loaded, three runs

Every run was told to work from its own knowledge and not to load any installed skill. All three
reported checking whether an installed skill covered this and finding none that did.

What all three did well, which is why the skill teaches none of it:

- Established that `npm run lint` does not exist by running it, rather than by reading
  `package.json` and inferring.
- Found all three competing definitions, and noticed that the Makefile target and the pre-commit
  hooks cover different files, so they are not interchangeable.
- Went past the configuration to the actual state, finding no ESLint config file, an empty `src/`,
  and no `tools/` directory for the ruff hook to match.
- Flagged the README's claim that CI runs the same checks as unverifiable, because the fixture has
  no CI configuration.
- Cleaned up after themselves.

Four failures, each repeated often enough to act on.

| Failure | Run 1 | Run 2 | Run 3 |
| --- | --- | --- | --- |
| Answered instead of taking the decision to a person | yes | yes | yes |
| Where the answer was recorded | `LINTING.md` | `LINTING.md` | `CLAUDE.md` |
| Changed the repository while establishing facts | wrote a probe file into `src/` | ran `npm install`, wrote a probe file | no |
| Idempotence designed, rather than a side effect of the file chosen | no | no | no |

On the first: all three hedged carefully and documented the disagreement, and all three still led
with `make lint` as the answer. Recording an ambiguity is not the same as routing it to the person
who owns it.

On the last: all three said re-running was safe because writing a whole file overwrites it. That
is true only because each invented a private file it alone owned. None faced a file that already
held someone else's content, so none of them was idempotent by design. Run 3 spotted the hazard
itself and wrote it down: the safety holds "only if whoever writes it later also does a full
overwrite of this same file rather than appending a second `## Linting` block".

## Step 6, skill loaded

Same task, same fixture, fresh agent, told explicitly that no person was available.

| Failure from step 1 | Result |
| --- | --- |
| Answered instead of asking | Fixed. Stopped with status `NEEDS_DECISION` and did not pick a command. |
| Inconsistent destination | Fixed. Wrote the marked block in `AGENTS.md`. |
| Changed the repository | Fixed. Read-only apart from the block. Declined to run `npx eslint` or `pre-commit` because both would have installed packages first, and said so rather than skipping it silently. |
| Idempotence incidental | See the re-run below. |

It recorded both candidates, what each covers, why neither could be confirmed without an install,
and the specific question a person has to answer. It checked its own output for exactly one pair
of markers before reporting, which the skill's step 6 asks for.

## The re-run, which is the case step 1 never faced

Content was added to `AGENTS.md` on both sides of the block, a house-rules section above and
release and ownership sections below, and the file was recorded before a second agent ran over the
same directory with the same instructions.

See `tests/outcomes/setup-bench/RERUN.md` for what happened.
