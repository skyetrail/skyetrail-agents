# Eval: repo-setup

Skill at `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/repo-setup/SKILL.md`, commit `a4a4316`. Harness claude, executor sonnet, judge opus. Static load 123 lines across 1 file(s). Run root `/Users/pete/workspace/skyetrail-agents-runs/eval/repo-setup/second-run`.

| Case | Trial | trigger | completion | economy | result |
| --- | --- | --- | --- | --- | --- |
| asks-where-to-write-the-record | 1 | 3 of 3 | NEEDS_CONTEXT | ? calls, ? s, tokens not measured | check exit 0 |
| confirms-working-npm-lint-once-told-where | 1 | 3 of 3 | DONE | ? calls, ? s, tokens not measured | check exit 0 |
| asks-which-candidate-when-none-confirm-today | 1 | 3 of 3 | NEEDS_DECISION | ? calls, ? s, tokens not measured | check exit 0; judge pass: "A person needs to say which candidate is the lint command: `make lint`, which checks only the JavaScript file, or the pre-commit hooks" |
| asks-which-candidate-when-none-confirm-today | 2 | 3 of 3 | NEEDS_DECISION | ? calls, ? s, tokens not measured | check exit 0; judge pass: "A person must decide which of these is the lint command: `make lint` (JavaScript only...), or the pre-commit hooks (JavaScript and Python...)" |
| given-the-chosen-candidate-confirms-it | 1 | 3 of 3 | DONE | ? calls, ? s, tokens not measured | check exit 0 |
| says-none-found-rather-than-inventing-one | 1 | 3 of 3 | NEEDS_DECISION | ? calls, ? s, tokens not measured | check exit 0; judge pass: "**Lint command:** none found. ... This repository has no lint command. `npm run lint` fails with `npm error Missing script: "lint"`" |
| says-none-found-rather-than-inventing-one | 2 | 3 of 3 | NEEDS_DECISION | ? calls, ? s, tokens not measured | check exit 0; judge pass: "**Lint command:** None found. ... This repository has no lint command of any kind. A person must decide whether to add one" |
| declines-unrelated-refactor-request | - | 3 of 3 declined | - | - | - |

## Status: DONE

Economy sources:

- asks-where-to-write-the-record t1: no log at /Users/pete/.claude/eval-tools.log
- confirms-working-npm-lint-once-told-where t1: no log at /Users/pete/.claude/eval-tools.log
- asks-which-candidate-when-none-confirm-today t1: no log at /Users/pete/.claude/eval-tools.log
- asks-which-candidate-when-none-confirm-today t2: no log at /Users/pete/.claude/eval-tools.log
- given-the-chosen-candidate-confirms-it t1: no log at /Users/pete/.claude/eval-tools.log
- says-none-found-rather-than-inventing-one t1: no log at /Users/pete/.claude/eval-tools.log
- says-none-found-rather-than-inventing-one t2: no log at /Users/pete/.claude/eval-tools.log

| Status | Means | The caller must |
| --- | --- | --- |
| DONE | Each case passed on each trial. | Re-run `npm run eval -- check <run root>` and compare checks.json. |
| DONE_WITH_CONCERNS | A case passed on some trials, or a condition failed. | Read each failed row before using the skill. |
| BLOCKED | An executor did not return. | Open its directory. Re-dispatch, or report the block upward. |
| NEEDS_CONTEXT | The eval was refused. | Fix the eval against the rule named. |
