---
name: eval-runner
description: Runs a skill's eval, the runnable test at evals/eval.yaml beside its SKILL.md, with no person in the loop, dispatching one fresh executor per case and trial, and writes a results page a caller can re-check. Use whenever someone asks to run or check the evals for a skill, or wants to know whether a skill still passes. Use it before merging a change to a skill, and when a skill has an evals directory that nobody has run.
---

# Eval runner

Produces a results page under `<plugin>/tests/evals/<skill>/<date>/RESULTS.md` and a run root of
one directory per case and trial, by running `../../shared/eval-protocol.md` against one skill.

## Scope

In scope: one end-to-end run of one skill's eval, where the skill has `evals/eval.yaml`.

Out of scope: writing or changing an eval, which `eval-author` owns, and changing the skill
under test, which `writing-skills` owns. Writing style is out of scope too. A skill with no eval is a stop, not
a task: say so and name `eval-author`.

A direct instruction from the person wins over anything in this skill.

Where the skill under test dispatches children of its own, run this skill in the session rather
than as a dispatched agent. Each dispatch adds a level, and in one run two audit helpers three
levels down hung on a shell command and never returned.

## Workflow

Copy this checklist into `record.md` at the run root and into your reply. Tick each line as you
finish it. A tick carries the path, the command, or the section of a file from this run that
settles the line. The skill's own text settles nothing, and neither does a rule file. A line you
cannot tick stays unticked and carries one line saying why.

```text
eval-runner
run root: <absolute path>
[ ] 1 npm run eval -- plan <SKILL.md> --run-root <root> run; output pasted; no refusal
[ ] 2 one executor dispatched per prompt.md, fresh context, the plan's model; every executor.json filled
[ ] 3 trigger-prompt.md dispatched; trigger.json saved at the run root
[ ] 4 npm run eval -- check <root> run; output pasted
[ ] 5 judge-prompt.md dispatched at the plan's judge model; judge.json saved; check run again
[ ] 6 npm run eval -- results <root> run; the RESULTS.md path pasted
[ ] 7 no file of the skill under test changed; git status on its directory pasted
```

1. **Plan.** Run `npm run eval -- plan <path to SKILL.md> --run-root <root>` from the directory
   that holds this plugin's `package.json`, with a run root outside every repository, and paste
   its output into `record.md`. Where it prints a refusal, stop and return `NEEDS_CONTEXT` with
   the rule it names. The plan writes one directory per case and trial, each with `prompt.md`.
2. **Dispatch the executors.** For each directory in `plan.json`, dispatch one fresh agent with
   your harness's dispatch tool, at the model `plan.json` names, and give it the contents of that
   directory's `prompt.md` and nothing else. Run them in parallel. When one returns, write its
   status, its question, and the agent id your dispatch tool reported into that directory's
   `executor.json`. Where an executor does not return, dispatch it once more with the same prompt
   and a note to write its status block to `out/status.md` as well; where it still does not
   return, leave `status` null, which the results page reports as `BLOCKED`. Never run a case
   yourself.
3. **Dispatch the trigger classifier.** Dispatch one agent with the contents of
   `trigger-prompt.md` and nothing else, at the plan's model, and save the JSON it returns as
   `trigger.json` at the run root.
4. **Check.** Run `npm run eval -- check <root>` and paste its output. The script runs every check
   command twice, reads each trial's cost from the harness's logs, and writes `judge-prompt.md`.
5. **Dispatch the judge.** Dispatch one agent at the model `plan.json` names as `judge` with the
   contents of `judge-prompt.md` and nothing else, and save the JSON it returns as `judge.json`
   at the run root. Then run `npm run eval -- check <root>` again, so the judge's verdicts enter
   `checks.json`. Where no case is judged, the check output says so, and this step is not in this
   case.
6. **Results.** Run `npm run eval -- results <root>` and paste the path it prints. The page holds
   the four conditions per case and trial and the eval's status.
7. **Prove you changed nothing.** Run `git status --porcelain <skill directory>` and paste its
   output. It prints nothing.

## Delivery

Report the eval's status from the results page, the path of the page, and the run root. The
statuses and what the caller does with each are in `../../shared/dispatch-protocol.md`. A caller
re-runs `npm run eval -- check <root>` and compares `checks.json`.

Stop, and report what you have, where the skill has no eval, where the plan refuses the eval,
where more than half the executors do not return after a retry, or where you cannot run the
script. A stop still leaves `record.md` and every directory the run produced in place.
