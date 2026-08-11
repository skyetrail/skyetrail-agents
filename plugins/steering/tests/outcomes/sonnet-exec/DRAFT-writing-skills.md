---
name: writing-skills
description: Writes a new Agent Skill or fixes an existing one, producing a SKILL.md and its reference files. Use this whenever someone mentions writing, creating, drafting, or improving a skill or a SKILL.md, and also when they ask how to get an agent to do something the same way every time, say a skill is not triggering, or say a skill is being ignored. Use it even when the word skill is not used, if the request is about capturing a repeatable way of working.
---

# Writing skills

This skill produces a SKILL.md, its reference files, and a record showing the skill changes
behaviour.

## First check the artifact

Read `../../shared/authoring.md` and work down its tests. The first test that holds names the
artifact this request needs.

- A skill. Continue with this skill.
- A prompt. Stop. Name `writing-agents` and hand the request over.
- A script. Stop. Name the check a command or a regex can decide. Write no document.
- Nothing. Stop. Answer the person in this conversation.

Where no test holds, stop and ask the person. Do not write a SKILL.md anyway.

## Where this stops

This skill does not audit a skill without changing it. That is the job of `auditing-skills`. This
skill does not write prompts for subagents. That is the job of `writing-agents`. This skill does
not judge writing style. A direct instruction from the person overrides this skill.

## Workflow

Run these steps in order. Steps 3 and 4 decide what the skill has to say, so run them before you
write any of it.

1. **Anchor the objective.** Write the request into the record at `tests/baselines/<skill-name>.md`,
   under a heading `## Objective`. `../../shared/authoring.md` says how to write it and what to do
   with it later. Step 9 names which directory holds the record. Read the heading again at steps 7
   and 10.

2. **Size the change.** A change is small where the description and the lines saying what the skill
   produces both stay word for word the same. Any other change is large. A small change to a skill
   that already holds a record runs step 10 alone. Everything else runs every step.

   Raise the record's small-change count by one for a small change. Set it to 0 when a full loop
   finishes. The record carries that count on one line, reading
   `Small changes since the last full loop: <integer>`. The lint holds the cap, so do not count by
   hand.

3. **Baseline.** Take the task from what the person asked for. Where they named no task, ask for
   one. Do not invent one, because a task you chose measures the skill against your own reading of
   the request.

   Dispatch two subagents on that task, each in a fresh context with no skill loaded. Tell each one
   to work from its own knowledge, and to invoke no installed skill. A skill that covers the task
   would stand in for the model and spoil the measurement. Name the model and the effort level in
   both dispatches.

   Write each run's whole output to its own file under `tests/baselines/<skill-name>-runs/`, named
   `<round>-<n>.md`. Then run these two commands and put both results in the record.

   ```
   ls tests/baselines/<skill-name>-runs/<round>-*.md | wc -l
   wc -c tests/baselines/<skill-name>-runs/<round>-*.md
   ```

   The first count must equal the number of runs you claim. Two runs of one task that match to the
   byte are not two runs. Evidence you did not collect is not evidence.

   Settle whether a subagent is available by dispatching one. Where an error comes back, copy the
   error text into the record and stop. Do not run the task yourself instead. You already hold the
   request and the misses you expect, so your own run measures your reading rather than the model's.

4. **Number the misses.** A miss is something a run did that a person must correct before using the
   result. Anything you would only phrase differently is not a miss. Number each miss, and hold
   those numbers to the end of the loop.

   Mark a miss both runs show as taught. Mark a miss one run shows as a candidate. Do not teach a
   candidate.

   Where a run invoked an installed skill, read that skill.

   - **Its description names the condition the person described.** Extend that skill. Write no new
     one. Say which skill.
   - **Its description does not name that condition.** Carry on. Record which skill the run reached
     for, and which word of its description fails to cover the request.

   Either way that run is void. Dispatch a replacement with that skill forbidden by name.

5. **Write the description.** This is the trigger and the most common point of failure. Write it
   against every rule in the Discovery table of `../../shared/skill-rules.md`. Open that file and
   work down the table. Summarising the workflow is the usual mistake, because a summary gives the
   agent something to follow instead of the body.

6. **Write the body.** Order the sections the way `../../shared/steering-rules.md` orders its own.
   That file lists them in order, and a second copy of the list here would drift from it. Write the
   body against every rule in that file, and against the Boundary and Content tables of
   `../../shared/skill-rules.md`. Open both and work down them. Write every sentence against
   `../../shared/ste.md`.

   A section restates the description where every sentence in it states a capability or a trigger
   the description already states. Compare the two sentence by sentence. Cut a section that restates
   it. The description loads before the body, so a repeat spends context twice.

7. **Address the numbered misses, and nothing else.** Read `## Objective` again first. Take each
   miss marked taught. For each one, describe the shape it takes in the work. Do not describe the
   label it falls under. The Calibration section of `../../shared/steering-rules.md` carries that
   rule with a worked pair. Leave every candidate out.

8. **Move detail into reference files.** Move a passage where one step needs it and the other steps
   do not. Keep a passage where every step needs it. A rule table, a worked example, and a set of
   cases are examples of the first kind, not the whole list. `../../shared/skill-rules.md` sets how
   you arrange a reference file.

9. **Baseline again, and grade it.** Run the same task twice more, each in a fresh context with the
   skill loaded, at the same model and effort level as step 3. Write these runs to their own files
   under the same directory, and run the same two commands over them.

   Fill one row per numbered miss. Each row carries four cells.

   - The number.
   - Whether run one still shows the miss.
   - Whether run two still shows the miss.
   - The quoted text settling each call.

   Record that table in `tests/baselines/<skill-name>.md`, under the plugin directory that holds the
   skill you write. The Evidence rule in `../../shared/skill-rules.md` names that directory. Where
   the skill sits in no plugin, put the record under the skill's own directory, and name that
   location inside the record.

10. **Lint, then audit, and not by yourself.** Run the lint command named in
    `../../shared/lint.md`. This settles the mechanical limits. Then follow the audit rule in
    `../../shared/authoring.md`. Read `## Objective` again first. Where the skill no longer answers
    those words, stop and say which words it dropped.

## The baseline is the gate

Read the table from step 9, one row at a time.

- Both runs still show the miss. The skill does not address it.
- One run of two still shows it. Run the task once more with the skill. Take the majority of three.
- Neither run shows it. The skill addresses it.

Where the skill addresses no taught miss, it changes nothing. Do not keep it.

A run that still shows a taught miss is a fail. Do not re-run it for a better result. The third run
above is the only extra run in this gate.

Where a run with the skill shows a miss carrying no number, give it the next number. Mark it taught
even where only one run shows it, because the skill introduced it. Put it and that run's own
reasoning into the skill. Then run steps 7 to 9 again.

The loop settles at the pass of steps 7 to 9 that adds no new number and leaves every taught miss
addressed. Where two further passes do not settle it, stop. Report which numbered misses still show.

`../../shared/authoring.md` holds the stop conditions, the retry limit, what happens to the draft,
and the rule against easing a gate to make it pass.

## Rules

- `../../shared/authoring.md` for the artifact test, the objective record, the audit rule, and the
  stop conditions.
- `../../shared/skill-rules.md` for a SKILL.md. It states which other rule files apply to a skill
  and under which conditions.
- `../../shared/steering-rules.md` for the section order, the scope rules, and the shape rule.
- `../../shared/lint.md` for the lint command.
- `../../shared/ste.md` for every sentence you write.
