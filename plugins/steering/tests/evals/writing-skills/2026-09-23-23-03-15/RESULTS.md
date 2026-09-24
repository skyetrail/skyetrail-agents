# Eval: writing-skills

Skill at `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/writing-skills/SKILL.md`, commit `fdc70f5`. Harness claude, executor sonnet, judge opus. Static load 294 lines across 2 file(s). Run root `/Users/pete/skyetrail-agents-runs/eval/writing-skills/20260923-160315`.

| Case | Trial | trigger | completion | economy | result |
| --- | --- | --- | --- | --- | --- |
| description-quotes-real-error-text | 1 | 3 of 3 | DONE | 72 calls, 2883 s, 670074 tokens (13520312 cache reads) OVER BUDGET | check exit 0; judge pass: "such as canceling statement due to lock timeout, deadlock detected, or column "contact" does not exist right after a deploy." |
| description-quotes-real-error-text | 2 | 3 of 3 | DONE | 54 calls, 2434 s, 597950 tokens (6751358 cache reads) OVER BUDGET | check exit 0; judge pass: "Also trigger after a deploy-time failure such as `null value in column "state" violates not-null constraint` or `column "contact" does not exist`" |
| description-quotes-real-error-text | 3 | 3 of 3 | DONE | 55 calls, 6477 s, 822956 tokens (8478828 cache reads) OVER BUDGET | check exit 0; judge pass: "pastes an error such as "canceling statement due to statement timeout" or "column does not exist" that showed up after a deploy." |
| scope-names-successor-for-every-item | 1 | 3 of 3 | DONE | 81 calls, 2755 s, 522863 tokens (14680775 cache reads) OVER BUDGET | check exit 0; judge pass: "The person handles each of these directly. No other skill in this collection takes them over. Name them in the review and stop." |
| scope-names-successor-for-every-item | 2 | 3 of 3 | DONE | 46 calls, 2366 s, 867449 tokens (3859680 cache reads) OVER BUDGET | check exit 0; judge pass: "writing a corrected migration; and running it. No other skill in this set takes over from here." |
| scope-names-successor-for-every-item | 3 | 3 of 3 | DONE | 122 calls, 8206 s, 1339728 tokens (24938474 cache reads) OVER BUDGET | check exit 0; judge pass: "and any table the migration does not touch. No skill takes these over. Take them to the person." |
| context-flags-stale-row-count | 1 | 3 of 3 | DONE | 60 calls, 1926 s, 501145 tokens (8400410 cache reads) OVER BUDGET | check exit 0; judge pass: "tables that hold tens of millions of rows or more ... Use these defaults where nothing tells you otherwise." |
| context-flags-stale-row-count | 2 | 3 of 3 | DONE | 56 calls, 2502 s, 731906 tokens (7742069 cache reads) OVER BUDGET | check exit 0; judge pass: "such as "about 90 million rows," is a default to confirm, not a number to carry into the report unchecked" |
| context-flags-stale-row-count | 3 | 3 of 3 | DONE | 46 calls, 5498 s, 1037562 tokens (4615160 cache reads) OVER BUDGET | check exit 0; judge pass: "The request states, for each table the migration touches, its approximate row count, its write pattern" |
| finish-check-runs-by-the-agent | 1 | 3 of 3 | DONE | 41 calls, 2214 s, 685890 tokens (3547196 cache reads) OVER BUDGET | check exit 0; judge pass: "Before you hand back the review, check it yourself against the migration file." |
| finish-check-runs-by-the-agent | 2 | 3 of 3 | DONE | 47 calls, 2146 s, 559979 tokens (4766943 cache reads) OVER BUDGET | check exit 0; judge pass: "You, the agent carrying out this review, run this check yourself before you hand back the report" |
| finish-check-runs-by-the-agent | 3 | 3 of 3 | DONE | 60 calls, 6539 s, 649058 tokens (8523032 cache reads) OVER BUDGET | check exit 0; judge pass: "Open the migration file. Match each of its top-level statements, in order, to the row that quotes it." |
| small-change-touches-only-the-named-line | 1 | 3 of 3 | DONE_WITH_CONCERNS (expected DONE), 6 unticked | 22 calls, 1054 s, 184361 tokens (1709658 cache reads) OVER BUDGET | check exit 0; judge pass: "Read `reference/lock-behavior.md` for which statements block reads and which block writes." |
| small-change-touches-only-the-named-line | 2 | 3 of 3 | DONE, 6 unticked | 48 calls, 5601 s, 360850 tokens (5984304 cache reads) OVER BUDGET | check exit 0; judge pass: "Read `reference/lock-behavior.md` for which statements block reads and which block writes." |
| small-change-touches-only-the-named-line | 3 | 3 of 3 | DONE | 8 calls, 1783 s, 133783 tokens (487765 cache reads) OVER BUDGET | check exit 0; judge pass: "Read `reference/lock-behavior.md` for which statements block reads and which block writes." |
| audit-request-declines-writing-skills | - | 3 of 3 declined | - | - | - |
| recurring-need-unclear-asks-before-writing | 1 | 3 of 3 | NEEDS_CONTEXT | 25 calls, 506 s, 140500 tokens (1891351 cache reads) OVER BUDGET | check exit 0 |
| recurring-need-confirmed-writes-skill | 1 | 3 of 3 | DONE | 69 calls, 5700 s, 731452 tokens (11251577 cache reads) OVER BUDGET | check exit 0; judge pass: "whichever engineer is on call at deploy time, each in their own conversation — not the person in this conversation, and not one occasion. No." |
| recurring-need-confirmed-writes-skill | 2 | 3 of 3 | DONE | 78 calls, 2802 s, 669223 tokens (12643429 cache reads) OVER BUDGET | check exit 0; judge pass: "(2) no — the recurrence fact rules out "one occasion," and the future_reader fact rules out "the only reader is the person in this conversation"" |
| recurring-need-confirmed-writes-skill | 3 | 3 of 3 | DONE_WITH_CONCERNS (expected DONE) | 92 calls, 4688 s, 1115879 tokens (10493863 cache reads) OVER BUDGET | check exit 0; judge pass: "Test 2 reads no. The recurrence fact states this need comes up on every future migration, indefinitely, not once." |

## Status: DONE_WITH_CONCERNS

Economy sources:

- description-quotes-real-error-text t1: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-a0eb21a3b52b0f89b.jsonl
- description-quotes-real-error-text t2: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-a8ae6d0668943574f.jsonl
- description-quotes-real-error-text t3: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-ab523d26d935f31c4.jsonl
- scope-names-successor-for-every-item t1: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-a89c0037ccf14f6d1.jsonl
- scope-names-successor-for-every-item t2: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-ab9d3c84c25fb87d8.jsonl
- scope-names-successor-for-every-item t3: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-a335f995c0ff48335.jsonl
- context-flags-stale-row-count t1: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-ab65393d6ffc88c03.jsonl
- context-flags-stale-row-count t2: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-a47b9aa7d688354de.jsonl
- context-flags-stale-row-count t3: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-a33b50982a61a92bd.jsonl
- finish-check-runs-by-the-agent t1: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-a6c93c567182a44a5.jsonl
- finish-check-runs-by-the-agent t2: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-a155a52a6d8913185.jsonl
- finish-check-runs-by-the-agent t3: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-a1358ea601905ef1e.jsonl
- small-change-touches-only-the-named-line t1: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-abed74f4bf8534f42.jsonl
- small-change-touches-only-the-named-line t2: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-a6a4cf2855e79f68a.jsonl
- small-change-touches-only-the-named-line t3: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-a5590dedab3f06395.jsonl
- recurring-need-unclear-asks-before-writing t1: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-a0ced3899f1b9f7b2.jsonl
- recurring-need-confirmed-writes-skill t1: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-a22cf1324292297ae.jsonl
- recurring-need-confirmed-writes-skill t2: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-a0ca7b32c0610eae2.jsonl
- recurring-need-confirmed-writes-skill t3: transcript /Users/pete/.claude/projects/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/subagents/agent-ab6c3d97347f12e07.jsonl

| Status | Means | The caller must |
| --- | --- | --- |
| DONE | Each case passed on each trial. | Re-run `npm run eval -- check <run root>` and compare checks.json. |
| DONE_WITH_CONCERNS | A case passed on some trials, or a condition failed. | Read each failed row before using the skill. |
| BLOCKED | An executor did not return. | Open its directory. Re-dispatch, or report the block upward. |
| NEEDS_CONTEXT | The eval was refused. | Fix the eval against the rule named. |
