# Round seven: repo-setup writes its record on both paths

`PREREG.md` beside this file fixed the runs, the scoring and the predictions before any run
started. Six runs with the skill at `b5b8dd1`, started with the Agent tool, three on the ambiguous
repository from round six and three on a clean repository with a working `npm run lint`. A judge
checked every run directory on disk; the run's status came from its reply.

## Every run wrote the record and left the repository alone

| Item | ambiguous, of 3 | clean, of 3 |
| --- | --- | --- |
| R1 repository untouched: `git status` empty, no ignored file, no `node_modules` | 3 | 3 |
| R5 `memory/repo-setup.md` with frontmatter naming `repo-setup`, one index line in `MEMORY.md` | 3 | 3 |
| R6 no `AGENTS.md` under the repository | 3 | 3 |
| A3 all four candidates named, no command marked confirmed | 3 | |
| A4 status `NEEDS_DECISION` | 3 | |
| C1 `npm run lint` marked confirmed, with how | | 3 |
| C2 status `DONE`, `Unresolved: none` | | 3 |

In round six the same three ambiguous runs wrote nothing. The reorder, write the record then stop,
closed that: each record lists the candidates under `Unresolved` and marks no command confirmed,
and each index line says the lint is unresolved. The clean runs each tried `npm run lint` first,
saw it exit zero, and recorded it as confirmed by running it, with `Unresolved: none`.

## Two readings the judge flagged

- A3 by the letter: "no npm lint script" sits on the `Lint command` line in all three records, one
  line above `Unresolved`, and the other three candidates sit under it. The record names all four,
  so the judge scored 1 and said so.
- R5 by the letter: five `MEMORY.md` files hold a heading, a blank line and the index line, and one
  holds the index line alone. Each holds exactly one line naming the record, which is what the
  rule asked.

## What the round showed about the skill

Two ambiguous runs ran the eslint candidate through `npx`, one with `--no-install`, and both said
nothing was installed. That held only because an earlier round's unaided run had left eslint in
the npx cache. Running `npx` on a tool that is not in `node_modules` fetches it, which is the
install step the skill forbids. The skill now says so in step 3. That sentence is after the round
and unmeasured.

The records use "Confirmed" for a failure as well as for a success, as in "confirmed failing
today". The skill's `Confirmed by` field means the command works. Left as an observation.

## Predictions

P1, P2 and P3 all held: six of six on R1, R5 and R6; three of three on A3 and A4; three of three
on C1 and C2.

## Decision

The rewritten `repo-setup` is measured and stays. The open item closes.

## Cost

Subagent tokens by the harness's count: 63 to 75 thousand per run, 84 thousand for the judge.
