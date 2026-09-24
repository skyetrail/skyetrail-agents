# Eval protocol

The contract between an eval, the skill it tests, the runner that executes it, and the author that
writes it. The skills `eval-runner` and `eval-author` apply this file. It supplies criteria and
defines no task of its own. `./terms.md` defines the terms used here.

## Contents

- The eval
- Measures
- No person in the loop
- One directory per executor
- Economy
- The results page

## The eval

A skill keeps its eval at `evals/eval.yaml` beside `SKILL.md`, with fixtures under
`evals/fixtures/`. Nothing in `SKILL.md` or under `reference/` points at `evals/`, so the eval never
loads with the skill. `npm run eval -- plan <path> --dry` reads an eval and refuses one that breaks
a rule below, naming the rule.

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
`judge`, the model that judges, `opus`; `trials`, runs per judged case, `3`, and `1` for a case with
a check and no judgement; `budget`, per trial, `tool_calls: 40`, `seconds: 600`, and
`tokens: 120000` where the harness reports tokens. A case marked `repo: true` has its `in/`
initialised as a git repository with one commit before it runs, for a skill whose checks read git.

## Measures

A case is scored on all four and passes where all four pass. The eval passes where each case passes
on each trial.

| Measure | Passes where |
| --- | --- |
| trigger | A classifier that sees the plugin's skill descriptions and the query, and never a skill body, names this skill. For a case marked `trigger: none` it names another skill or none. Three trials. |
| completion | The executor's returned status equals the case's `expect_status`, `DONE` unless set. The count of unticked lines in any record the executor wrote is reported beside it. |
| economy | Tool calls and seconds are within budget, and tokens are within budget where the harness reports them. |
| result | The `check` exits zero, and the judge passes the `expected_behavior`. |

## No person in the loop

An eval runs unattended. The executor's prompt says there is no person to ask. Where the skill would
ask, the executor returns the status the skill names for that case, with the question it would have
asked, and stops. The question case passes on that status and on a check that finds the question.
The answered case has the answer under `facts`, which the runner writes into the prompt as facts
established before dispatch, and passes on `DONE`.

## One directory per executor

An executor never sees the eval it is measured by. The script creates one directory per case and
trial under a blind root, `_blind/` beside the run roots, named by a random token, so no path names
the case. Each contains two directories and nothing else. `work/` contains `in/`, the fixtures;
`out/`, where the executor writes everything it produces; `prompt.md`, its whole prompt; and
`executor.json`, which the runner fills with the returned status and the harness's agent id. `repo/`
is a copy of the repository that contains the skill, without `.git`, without any skill's `evals/`,
and without any plugin's `tests/`. The executor is told that `work/` is its working directory and
its only place to write, and that it may read the copy and run the commands the skill names there.
No two executors share a path, and none reads another's. `plan.json` at the run root maps each case
to its directories. Every check runs with `work/` as its working directory. The check step copies
each judged trial's `in/` and `out/` to `_judge/<run>/<item id>/`, so the judge sees no case name,
trial number or condition either.

The first eval run of `writing-skills` with three trials showed why. With the live repository
readable, seven of thirteen executors read the eval's checks or its fixtures. With the staged copy,
none of six did.

## Economy

The script reads economy from the harness's own logs and never from what the executor says about
itself, because that account is a claim. In Claude Code the log is the transcript the harness writes
for every dispatched agent, under
`~/.claude/projects/<project>/<session>/subagents/agent-<id>.jsonl`, found by the agent id the
dispatch tool reported. Tool calls are its tool-use blocks. Seconds run from its first line to its
last. Tokens are the ones the model processed fresh, which is input, cache writes, and output,
summed once per API turn. Cache reads are reported beside them and not counted. Children the
executor dispatched have transcripts of their own and are not counted. Where no transcript exists,
the script falls back to a hook the repository configures, which writes one line per tool call with
the agent id. A figure the script cannot read counts as not measured and never as a fail. Where a
log exists, the script reports the difference between the log and the executor's own account of its
calls. The results page names the source of each number.

## The results page

`npm run eval -- results <run root>` writes `RESULTS.md` under
`<plugin>/tests/evals/<skill>/<date>/`, outside the skill. It contains one row per case and trial
with the four measures, each with its number and its evidence path, then the eval's status: `DONE`
where each case passes on each trial; `DONE_WITH_CONCERNS` where a case passes on some trials;
`BLOCKED` where an executor did not return; `NEEDS_CONTEXT` where the eval was refused. The caller
re-runs `npm run eval -- check <run root>` and compares. The runner edits no file of the skill under
test.
