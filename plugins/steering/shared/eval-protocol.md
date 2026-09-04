# Eval protocol

The contract between an eval, the skill it tests, the runner that executes it, and the author that
writes it. The skills `eval-runner` and `eval-author` apply this file. It supplies criteria and
defines no task of its own. `./steering-rules.md` defines the terms used here.

## Contents

- The eval
- Conditions
- No person in the loop
- One directory per executor
- Economy
- The results page

## The eval

A skill keeps its eval at `evals/eval.yaml` beside `SKILL.md`, with fixtures under
`evals/fixtures/`. Nothing in `SKILL.md` or under `reference/` points at `evals/`, so the eval
never loads with the skill. `npm run eval -- plan <path> --dry` reads an eval and refuses one that
breaks a rule below, naming the rule.

| Rule | Severity |
| --- | --- |
| The eval names its skill, and every case lists that skill under `skills`. | Blocking |
| The eval has at least three cases, each with `name`, `skills`, `query` and `files`. | Blocking |
| Each case has `check`, `expected_behavior`, or both, except a case marked `trigger: none`. | Blocking |
| At least one case is marked `trigger: none`, a query the skill must decline. | Important |
| `query` is what a person would say. It does not give an instruction the skill gives, or a hint at the answer. | Important |
| `check` is one shell command that reads only `in/` and `out/` in its directory, and its exit code decides. | Blocking |
| `expected_behavior` is one paragraph a judge decides from the output alone, and it does not restate the check. | Important |
| A case that would make the skill ask a question is two cases: one that expects the question, one that supplies the answer under `facts`. | Important |
| No fixture is the file the skill was measured against when it was written. | Blocking |
| More than eight cases carries a sentence saying why. | Advisory |

The values the eval sets, each with its default: `model`, the model that executes, `sonnet`;
`judge`, the model that judges, `opus`; `trials`, runs per judged case, `3`, and `1` for a case
with a check and no judgement; `budget`, per trial, `tool_calls: 40`, `seconds: 600`, and
`tokens: 120000` where the harness reports tokens. A case marked `repo: true` has its `in/`
initialised as a git repository with one commit before it runs, for a skill whose checks read git.

## Conditions

A case is scored on all four and passes where all four pass. The eval passes where each case
passes on each trial.

| Condition | Passes where |
| --- | --- |
| trigger | A classifier that sees the plugin's skill descriptions and the query, and never a skill body, names this skill. For a case marked `trigger: none` it names none. Three trials. |
| completion | The executor's returned status equals the case's `expect_status`, `DONE` unless set, and no record the executor wrote holds an unticked line. |
| economy | Tool calls and seconds are within budget, and tokens are within budget where the harness reports them. |
| result | The `check` exits zero, and the judge passes the `expected_behavior`. |

## No person in the loop

An eval runs unattended. The executor's prompt says there is no person to ask. Where the skill
would ask, the executor returns the status the skill names for that case, with the question it
would have asked, and stops. The question case passes on that status and on a check that finds
the question. The answered case holds the answer under `facts`, which the runner writes into
the prompt as facts established before dispatch, and passes on `DONE`.

## One directory per executor

The script creates one directory per case and trial under a run root. Each holds `in/`, the
fixtures; `out/`, where the executor writes everything it produces; `prompt.md`, its whole
instruction; and `executor.json`, which the runner fills with the returned status and the harness's
agent id. The executor is told that directory is its working directory and its only place to
write. No two executors share a path, and none reads another's. Every check runs with that
directory as its working directory.

## Economy

The script reads economy from the harness's own logs and never from what the executor says about
itself. A hook the repository configures appends one line per tool call, with a timestamp, the
agent id where the payload has one, and the tool name. Tool calls and seconds come from those
lines for the executor's agent id. Tokens come from the harness's export where one exists, and a
missing token figure is not measured, never a fail. An executor's own account of its calls is a claim. Where a log exists the script reports the
difference. The results page names the source of
each number.

## The results page

`npm run eval -- results <run root>` writes `RESULTS.md` under `<plugin>/tests/evals/<skill>/<date>/`,
outside the skill. It holds one row per case and trial with the four conditions, each with its
number and its evidence path, then the eval's status: `DONE` where each case passes on each trial;
`DONE_WITH_CONCERNS` where a case passes on some trials; `BLOCKED` where an executor did not return;
`NEEDS_CONTEXT` where the eval was refused. The caller re-runs `npm run eval -- check <run root>`
and compares. The runner edits no file of the skill under test.
