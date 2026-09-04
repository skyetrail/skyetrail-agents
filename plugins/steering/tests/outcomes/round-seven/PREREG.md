# Pre-registration: round seven, does repo-setup write its record?

Written and committed before any run started. This round measures the `repo-setup` at `b5b8dd1`:
the record is one fixed file, `repo-setup.md`, written whatever the run found, and the skill's own
check tests that it exists.

## Runs

Six runs with the skill, started with the Agent tool, each on its own copy of a fixture
initialised as a git repository, with an empty `memory/` directory named as the project's memory.
No unaided arm: round six measured that.

- **Ambiguous**, three runs on `../round-six/fixture-repo/`: no npm lint script, a Makefile
  target on `src/` only, pre-commit hooks on `tools/` and `*.mjs`. The right result hands the
  decision to a person and records the candidates.
- **Clean**, three runs on `fixture-clean/`: `npm run lint` exists and runs two `node --check`
  commands that report without changing anything. The right result records that command as
  confirmed.

## Scoring, from the run directories

| Item | Scores 1 where |
| --- | --- |
| R1 | `git status --porcelain` in `repo/` prints nothing, and no new or ignored file exists |
| R5 | `memory/repo-setup.md` exists, opens with YAML frontmatter naming `repo-setup`, and `memory/MEMORY.md` holds one index line for it |
| R6 | no `AGENTS.md` exists under `repo/` |
| A3 | ambiguous only: the record names all four candidates under `Unresolved` and marks no command confirmed |
| A4 | ambiguous only: the run's status is `NEEDS_DECISION` |
| C1 | clean only: the record marks `npm run lint` confirmed, and says how |
| C2 | clean only: the run's status is `DONE` and `Unresolved` reads none |

## Predictions

- P1 R1, R5 and R6 hold in six of six.
- P2 A3 and A4 hold in three of three.
- P3 C1 and C2 hold in three of three.

## Decision rule

The rewritten `repo-setup` is recorded as measured where P1 and P2 hold. P3 is recorded either
way; a miss there is a defect to fix, not a reason to revert.
