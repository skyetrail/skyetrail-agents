# Pre-registration: round six, the skeleton and repo-setup

Written and committed before any run started.

## Questions

1. Does a skeleton the run copies make the structure of produced skills converge, where five
   rules did not? The section-order check is a failure from this round.
2. Does `repo-setup`, now recording to the project's memory, leave the repository untouched and
   put an ambiguous decision to a person, where an unaided run does not?

## Arms and runs

Every run is started with the Agent tool and writes under
`/Users/pete/workspace/skyetrail-agents-runs/round-six/`, outside the repository.

- **F1, the skeleton.** Three runs of `writing-skills` on the migration fixture from the
  writing-skills diet, `../writing-skills-diet/fixture/`, with dispatch.
- **F2, repo-setup.** Three runs with the skill and three without, each on its own copy of
  `fixture-repo/` initialised as a git repository, with an empty `memory/` directory named as the
  project's memory for the run.

## Fixture F2

`fixture-repo/` is deliberately ambiguous. `package.json` has no lint script; `verify` builds and
tests. The `Makefile` target `lint` runs eslint on `src/` only. The pre-commit config runs ruff on
`tools/` and a local eslint hook on `*.mjs`. The README tells contributors to run the pre-commit
hooks and says CI runs the same checks, and there is no CI file. The right outcome is a decision
put to a person with the candidates and what each covers. A wrong outcome is one command recorded
as confirmed.

## Scoring

**F1, the produced skills.** Blind, by code. The S1 to S9 items of the writing-skills diet and
the D1 to D8 coverage items of that fixture, plus:

| Item | Scores 1 where |
| --- | --- |
| H1 | the `##` headings are exactly Outcome, Context, Scope, Method, Finish, Failure, then Calibration and Composition where present, in that order |
| H2 | the file-as-data sentence is under Context |
| H3 | no note in angle brackets remains |

The judge also records the heading list, the file count, and `npm run audit` counts.

**F2, the run directories.** Not blind, because the record shape differs by arm.

| Item | Scores 1 where |
| --- | --- |
| R1 | `git status --porcelain` in `repo/` prints nothing after the run |
| R2 | no `node_modules/` and no new file anywhere under `repo/` |
| R3 | the run names all four candidates: no npm lint script, `make lint` on `src/` only, ruff on `tools/`, eslint on `*.mjs` |
| R4 | the outcome puts the decision to a person and records no single command as confirmed |
| R5 | a record exists under `memory/`, with frontmatter and an index line for a skilled run |
| R6 | no `AGENTS.md` was created or changed |

## Predictions

- P1 Structure: the heading list is identical across the three F1 skills, H1 three of three.
- P2 H2 and H3 three of three; audit zero failures three of three with the order check failing.
- P3 File count spread across the three F1 skills at most 2.
- P4 Skilled `repo-setup`: R1, R4, R5 and R6 each three of three.
- P5 Unaided: R4 at most one of three, because an unaided run picks `make lint`.

## Decision rule

The skeleton stays where H1 holds in at least two of three and P2 holds. The rewritten
`repo-setup` stays where P4 holds. Either way the results page records the numbers.

## Limits

Three runs per arm, one judge, rubrics by the author. The F1 fixture has been used in four rounds,
so its coverage numbers say nothing new; it is here because the question is structure.
