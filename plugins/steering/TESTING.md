# Testing these skills

Two separate questions. Run them in this order, because a skill that never triggers cannot be
baselined.

1. **Triggering.** Does the right skill fire on the right request? Measured on descriptions.
2. **Behaviour.** Does the skill body change what the agent does? Measured on outcomes.

Neither can run on claude.ai. Both need Claude Code.

---

## Test 1: triggering, and the open question about redirects

Each of the three descriptions currently ends with a clause redirecting to a sibling, such as
telling the reader to use `auditing-skills` instead when checking a skill without changing it.
Those clauses may be helping or may be suppressing triggers. This test settles it.

Build two variants of the plugin. Variant A is as written. Variant B is identical with the
redirect clauses removed from all three descriptions and nothing else changed.

Run the query set below against each variant. Run each query at least three times, because
triggering is not deterministic. Record which skill fired, or none.

### What to measure

- Trigger rate per skill on its own positives. Higher is better.
- False fires on the negatives. Lower is better.
- On the ambiguous queries, which skill fired and whether the answer was still useful. A wrong
  skill that redirects in its first paragraph is a much smaller failure than no skill firing.

### Query set

**Should trigger `writing-skills`**

- I want to capture how we do PR reviews so it happens the same way every time.
- Write a skill for generating our weekly ops report.
- Turn what we just did into something reusable.
- Draft a SKILL.md for the deployment checklist.
- My spreadsheet skill exists but nobody uses it, can you make it better.

**Should trigger `auditing-skills`**

- Review this SKILL.md before I ship it.
- Lint the skills in this plugin.
- Check this subagent prompt for problems.
- Sanity check these three skills against our rules.

**Should trigger `writing-agents`**

- I need to hand this refactor off to a subagent.
- Write me a prompt template for the workers.
- Fan this out across the eight transforms.
- We have a named reviewer agent, I want to compose it per call instead.

**Should trigger none of the three**

- What is the difference between a skill and an MCP server?
- Fix the failing test in auth.py.
- Summarise this document.

**Genuinely ambiguous, watch what happens**

- Why is my skill not triggering?
- Improve this skill.
- Review my agent setup.

The three ambiguous ones are the whole point of the redirect clauses. If variant B handles them
as well as variant A, the clauses are costing description space for nothing.

---

## Test 2: behaviour

For each skill, take one realistic task from its query set. Dispatch a subagent with no skill
loaded, and record what it did and the reasoning it gave where it went wrong. Dispatch a fresh
subagent on the same task with the skill loaded. Compare.

If behaviour is the same either way, that skill has no effect and should not be kept. If the
second run fails in a new way, put that failure and the agent's own words into the skill and run
it again.

`auditing-skills` has the easiest task to judge, because its output is a findings list and you
can say whether you agree with the findings. Start there.

---

## First thing to run

Point `auditing-skills` at the other two skills and at itself. It costs one command, it exercises
the calibration, and the failure it catches is the one that matters most. An auditor that returns
twenty findings on a 59 line skill is too aggressive and will be abandoned within a month.

---

## Test 3: outcomes

Test 2 shows a tool changes what an agent does. Test 3 shows the change is an improvement. Run
it once the first two pass.

For a hand-off produced by `writing-agents`: seed a small fixture repository with a known set of
problems, written into an answer key before any run. Dispatch the old instruction and the
tool-produced instruction against the same fixture with the same worker model, at least three
runs each, since single runs vary. Score every review against the key: problems found, problems
missed, false alarms. The produced hand-off wins only if it finds more of the planted problems
without raising more false alarms.

For a skill produced by `writing-skills`: same shape. One agent gets the produced skill, another
gets the plain request, on a fixture task with known traps. Score the completed work against the
key, not the wording of the output.

Two rules keep the scores honest. The answer key never appears in any prompt. Whoever scores a
run is not the agent that ran it, and counting against the key is script work where a script can
do it.
