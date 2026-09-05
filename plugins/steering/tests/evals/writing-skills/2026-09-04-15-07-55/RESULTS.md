# Eval: writing-skills

Skill at `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/writing-skills/SKILL.md`, commit `446b984`. Harness claude, executor sonnet, judge opus. Static load 253 lines across 2 file(s). Run root `/Users/pete/workspace/skyetrail-agents-runs/eval/writing-skills/first-run`.

Trials overridden to 1 on the command line; the eval asks for more.

| Case | Trial | trigger | completion | economy | result |
| --- | --- | --- | --- | --- | --- |
| description-quotes-real-error-text | 1 | 3 of 3 | DONE_WITH_CONCERNS (expected DONE), 2 unticked | ? calls, ? s, tokens not measured | check exit 0; judge pass: "an error seen after a migration ran, such as `canceling statement due to lock timeout`, `CREATE INDEX CONCURRENTLY cannot run inside a transaction block`" |
| scope-names-successor-for-every-item | 1 | 3 of 3 | no status (expected DONE), 2 unticked | ? calls, ? s, tokens not measured | check exit 0; judge pass: "Out of scope, and no skill in this collection takes it over:" |
| context-flags-stale-row-count | 1 | 3 of 3 | no status (expected DONE), 1 unticked | ? calls, ? s, tokens not measured | check exit 0; judge pass: "that figure describes the table at the time someone wrote it down, not at review time" |
| finish-check-runs-by-the-agent | 1 | 3 of 3 | DONE_WITH_CONCERNS (expected DONE), 1 unticked | ? calls, ? s, tokens not measured | check exit 0; judge pass: "Before reporting, check the report against the file: every statement numbered in Method step 2 has a line in the report" |
| small-change-touches-only-the-named-line | 1 | 3 of 3 | DONE_WITH_CONCERNS (expected DONE), 8 unticked | ? calls, ? s, tokens not measured | check exit 0; judge pass: "Read `reference/lock-behavior.md` for which statements block reads and which block writes." |
| audit-request-declines-writing-skills | - | 3 of 3 declined | - | - | - |
| recurring-need-unclear-asks-before-writing | 1 | 3 of 3 | NEEDS_CONTEXT | ? calls, ? s, tokens not measured | check exit 1; judge fail: "no output written" |
| recurring-need-confirmed-writes-skill | 1 | 3 of 3 | DONE_WITH_CONCERNS (expected DONE), 2 unticked | ? calls, ? s, tokens not measured | check exit 0; judge pass: "the guidance serves more than one occasion, and it is read by more people than the person in this conversation" |

## Status: BLOCKED

Economy sources:

- description-quotes-real-error-text t1: no log at /Users/pete/.claude/eval-tools.log
- scope-names-successor-for-every-item t1: no log at /Users/pete/.claude/eval-tools.log
- context-flags-stale-row-count t1: no log at /Users/pete/.claude/eval-tools.log
- finish-check-runs-by-the-agent t1: no log at /Users/pete/.claude/eval-tools.log
- small-change-touches-only-the-named-line t1: no log at /Users/pete/.claude/eval-tools.log
- recurring-need-unclear-asks-before-writing t1: no log at /Users/pete/.claude/eval-tools.log
- recurring-need-confirmed-writes-skill t1: no log at /Users/pete/.claude/eval-tools.log

| Status | Means | The caller must |
| --- | --- | --- |
| DONE | Each case passed on each trial. | Re-run `npm run eval -- check <run root>` and compare checks.json. |
| DONE_WITH_CONCERNS | A case passed on some trials, or a condition failed. | Read each failed row before using the skill. |
| BLOCKED | An executor did not return. | Open its directory. Re-dispatch, or report the block upward. |
| NEEDS_CONTEXT | The eval was refused. | Fix the eval against the rule named. |
