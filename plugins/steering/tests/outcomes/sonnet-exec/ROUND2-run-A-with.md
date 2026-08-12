## Artifact test (`../../shared/authoring.md`)

```
Artifact test

1 script   You can write down the command or the regex that
           returns the answer, and running it needs no judgement.  no
2 answer   The guidance serves one occasion, and the only reader
           is the person in this conversation.                     no
3 prompt   The agent that needs the guidance will not hold this
           conversation.                                           no
4 skill    The agent that needs the guidance holds this
           conversation.                                           yes

Class: skill
Deciding test: 4
```

Test 1 is no: sorting duplicate vs. defect vs. support question vs. unreproducible needs judgement, not a fixed check. Test 2 is no: the team wants this run every time on every incoming report, not once for one reader. Test 3 is no: the agent that triages a report is the same agent a team member is talking to when they bring the report in. Test 4 is yes on that reasoning. Class: **skill**.

## Workflow checklist (`writing-skills`)

```text
writing-skills
[x] 0  authoring.md artifact-test block filled; the class is a skill
[x] 1  Case decided: new skill (no existing bug-triage skill found in either reachable plugin)
[x] 2  Objective written into the record
[ ] 3  Baseline dispatched with no skill loaded; output saved — BLOCKED, no dispatch tool in this session
[ ] 4  Misses numbered — blocked, depends on step 3's output, which does not exist
[x] 5  Description written against the Discovery table (unverified — no baseline to check it against)
[x] 6  Body written against the section order and rule tables; every condition settled by its own test
[ ] 7  Numbered misses addressed — blocked, step 4 produced no misses
[ ] 8  Nothing correct from step 3 dropped — blocked, step 3 produced no output to compare against
[ ] 9  Detail moved into reference files — not applicable; the unverified draft is one file, not a skill directory
[ ] 10 Baseline dispatched with the skill loaded — blocked, same cause as step 3
[x] 11 Lint run; result in the record — ran, target outside lint's reach (coverage gap, not a pass)
[ ] 12 Independent audit dispatched — BLOCKED, same cause as step 3
```

## What stopped the loop

Step 3 requires dispatching a subagent, in a fresh context, and collecting its output within the turn. No tool in this session does that:

- `ToolSearch` for a dispatch/subagent tool returned nothing.
- `mcp__ccd_session__spawn_task` opens a chip for a person to click later; it returns no output to this turn.
- `SendMessage` targets a named teammate in an agent-team session; none exists here.
- `TaskCreate`/`TaskList`/`TaskGet`/`TaskUpdate`/`TaskStop` are a to-do tracker, not an agent dispatcher.

Error text recorded in place of a tool error: *"No tool in this session's tool set dispatches a fresh agent in a fresh context and returns its output within this turn."* This matches a named "When to stop" condition in `writing-skills` ("You cannot dispatch a subagent") and a prior, independent hit of the same block already recorded in this scratchpad against the sibling skill `writing-agents` (`pr-security-review-record.md`).

Per the skill's own instruction at that gate, I stopped the loop (steps 3, 4, 7, 8, 10, 12 did not run) rather than continuing to a finished SKILL.md. Because the request explicitly wanted the text, I wrote the permitted fallback: a proposal file named `<skill-name>-unverified.md`, never named `SKILL.md`, never placed in a skill's own directory.

Lint (step 11) did run (`npm run lint -- --explain` and `npm run lint` from `/Users/pete/workspace/skyetrail-agents`, per the confirmed `repo-setup` command in `AGENTS.md`), but it only opens `plugins/*/skills/*/SKILL.md` and adjacent plugin files — it never reaches a file sitting in the scratchpad, outside every plugin. That is a coverage gap, not a clean pass, and it clears once someone places the draft inside a real plugin's `skills/` directory.

## What survives the stop

- Draft (unverified, do not install as-is): `/private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/bug-report-triage-unverified.md`
- Record (full trace of every step, what ran, what didn't, and why): `/private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/bug-report-triage-record.md`

The draft classifies a report as duplicate/defect/support question/unreproducible (in that priority order, with membership tests, not just labels), then takes the matching action, with a bounded repro-attempt cap, explicit stop conditions (no repro path and no reporter contact; two plausible originals; wrong-team product), and a rule that a stopped triage leaves the report untouched rather than half-closed. It also names two rule-table gaps that could not be honestly satisfied without inventing content: no known skill exists in this workspace to name as the owner of a filed defect or a support hand-off (a role is named instead), and no "approaches already tried and failed" evidence exists for this task, so that section was left out rather than fabricated.

This draft has not been baseline-tested or independently audited. Keep-or-discard, and where it ultimately belongs (which plugin, if any), is your call — nothing was written into a real skill directory or committed.