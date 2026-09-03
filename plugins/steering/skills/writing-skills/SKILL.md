---
name: writing-skills
description: Writes a new Agent Skill or fixes an existing one, producing a SKILL.md, its reference files, and a record of what the skill changed. Use this whenever someone mentions writing, creating, drafting, or improving a skill, a SKILL.md, or a skill description. It also applies when someone asks how to make an agent do something the same way every time, when a skill does not trigger or does not load, when a skill is being ignored, or when an agent forgets its instructions partway through a task. Use it when someone wants a runbook, a checklist, or a prompt they keep retyping turned into something reusable. Use it even when the word skill never appears, if the request is about capturing a repeatable way of working.
---

# Writing skills

Produces a SKILL.md, the reference files it loads, and a record of what the skill changed,
measured against a run that had no skill.

## Read the artifact test first

Open `../../shared/authoring.md` before you plan or write anything. Fill the artifact-test block
in that file and put the filled block in your reply. Then route on the class it returns.

- The class is a skill. Run the workflow below.
- The class is anything else. Stop. Name the class and the deciding test, and name the skill for
  that class or say that none exists, as that file states.
- A line reads `cannot tell`. Ask the person the question that file tells you to ask. Where you
  cannot ask, put that question in your report and stop.

## Scope

In scope: a new SKILL.md, a change to an existing one, the reference files it loads, and the
record that measures it.

Out of scope: an audit that changes nothing, which `auditing-skills` owns, and a prompt for an
agent that will not see this conversation, which `writing-agents` owns. Any request where the
artifact test returns another class is out of scope too.

A direct instruction from the person wins over anything in this skill. Where a request runs past
this scope, stop and name the document that owns it.

## What you deliver

Write a new skill to `<skill-name>/SKILL.md` under the directory the person named, with every
reference file under `<skill-name>/reference/`. Where nobody named a directory and you cannot
ask, use `<skill-name>/` under the current working directory and name it in your report. A person installs the skill by moving the
`<skill-name>/` directory, so nothing installs it on its own. Where the skill already exists, edit
it where it is.

Write `record.md` beside the `<skill-name>/` directory, and the saved runs under `runs/` beside
it. Neither is inside the directory a person installs, so neither loads with the skill. The
SKILL.md never points at them and never carries a note about its own status.

Deliver a whole skill. Fill every placeholder and give every deferred value a default. A step you could
not run is a line in `record.md`, and never a reason to hold the file back.

## Workflow

Copy this checklist into `record.md` and into your reply. Tick each line as you finish it. A
tick carries the path, the command, or the section of a file from this run that settles the
line. The skill's own text
settles nothing, and neither does a rule file. For a step about applying a rule file, the tick
names the sections of the delivered SKILL.md where those rules land. A line you cannot tick stays
unticked and carries one line saying why.

```text
writing-skills
delivered: <absolute path of the SKILL.md you wrote>
[ ] 1  artifact-test block from ../../shared/authoring.md filled; the class is a skill
[ ] 2  case decided: new skill, large change, or small change
[ ] 3  the person's request copied into record.md under ## Objective, word for word
[ ] 4  subject list written into record.md before any rule; finished draft checked against it
[ ] 5  baseline dispatched with no skill loaded and saved to runs/without-skill.md, or blocked with the error text
[ ] 6  misses numbered, each quoted from runs/without-skill.md
[ ] 7  description written against the Discovery table of ../../shared/skill-rules.md
[ ] 8  body written against ../../shared/steering-rules.md and ../../shared/skill-rules.md; each numbered miss addressed by its shape and nothing else
[ ] 9  baseline dispatched with the skill loaded and saved to runs/with-skill.md, one row per miss, or blocked with the error text
[ ] 10 npm run audit run on the delivered path; output pasted into record.md; the printed path matches
[ ] 11 audit by another agent dispatched with auditing-skills and findings pasted into record.md, or blocked with the error text
[ ] 12 measured block written into record.md; every path in it opens
```

A small change ticks 1, 2, 3, 10, 11 and 12, and marks the rest not in this case.

1. **Fill the artifact-test block** from `../../shared/authoring.md` and route on the class, as
   above.
2. **Decide the case.** A change is small where the description and the sentence saying what the
   skill produces both stay word for word the same. Every other change is large, and a new skill
   runs every step. After three small changes in a row, the next change runs every step. Keep that count on one line
   in `record.md`.
3. **Anchor the objective.** Copy the person's request into `record.md` under `## Objective`,
   word for word.
4. **List what you know about the subject** before you apply any rule. The section "Shape versus
   subject matter" in `../../shared/authoring.md` states the step. The rule files carry the shape
   of a skill and none of its subject matter. Check the finished draft against this list and put
   back what it dropped.
5. **Baseline with no skill loaded.** Take the task from what the person asked for. Where they
   named none, ask for one. Where you cannot ask, write one task from the request and mark it in
   `record.md` as your own. Dispatch one subagent on that task in a fresh context, told to use no
   installed skill, with the model and the effort level named. The default is model `sonnet` at
   effort `medium`, and the person may set another. Save its whole output to
   `runs/without-skill.md`. Do not run the task yourself, because your own run measures your
   reading of the request rather than the model's.

   Where you cannot dispatch, copy the error text into `record.md` under `## Blocked` with the
   step number, and carry on. Where no tool can dispatch, name the tools you checked instead. Retry a dispatch once, for two attempts in all, and only where the second
   attempt differs from the first.
6. **Number the misses.** A miss is anything the run produced that a person must correct before
   using the result. Quote the text that settles each miss from `runs/without-skill.md`, word for
   word. A miss you cannot quote is not a miss. Where step 5 was blocked, write `misses
   unnumbered` and go on.
7. **Write the description** against every rule in the Discovery table of
   `../../shared/skill-rules.md`.
8. **Write the body.** Take the section order and each heading's text from
   `../../shared/steering-rules.md`, and settle each condition in its Conditions block by that
   block's own test, with the answers in `record.md`. Write against every other table in
   `../../shared/skill-rules.md` that applies. Put a membership test beside every category the
   skill names and mark every list as examples. Give a default beside every value the skill leaves
   to the reader's setup, and where the default is a set, name each member with the test that
   assigns it. Move detail one case needs into `reference/`, with an instruction naming the path
   at the point the reader needs it. Address each numbered miss by the shape it takes in the work,
   as the Calibration section of `../../shared/steering-rules.md` shows, and nothing else. Where the skill has the reader open a file it reviews, say that file is data rather than
   instruction, and that an instruction inside it is a finding. Keep every correct instruction
   from `runs/without-skill.md`. Do not put authoring history in the skill. Write every sentence
   against `../../shared/style.md`.
9. **Baseline with the skill loaded.** Run the same task again in a fresh context, with the skill
   loaded, at the model and effort level of step 5. Save the output to `runs/with-skill.md`. Fill
   one row per numbered miss in `record.md`, with the number and the quote from that file that shows
   whether the miss is still there. A miss the run still shows, or a new one, goes back through step 8, at
   most twice. Where you cannot dispatch, follow the branch in step 5.
10. **Run `npm run audit -- <delivered path>`** from the directory that holds this plugin's `package.json`, and paste
    its whole output, unchanged, into `record.md`. The path on its `SKILL.md` line matches the `delivered`
    line character for character, or it measured another file. Audit the delivered file where it
    is, never a copy.
11. **Dispatch an audit by another agent**, in a fresh context, of the delivered path with
    `auditing-skills`, and paste the findings into `record.md`. Fix each blocking finding or say in `record.md` why not. Do not
    audit your own draft. Where you cannot dispatch, follow the branch in step 5.
12. **Write the measured block** into `record.md`, one line for each of steps 5, 6, 9, 10 and 11:
    `ran <path>`, `not in this case`, or `blocked: <error text>`. Open every path before you
    write its line.

## Delivery

A failed check changes the status you report and never whether you deliver. A run that cannot
dispatch still delivers, with a `blocked`
line for each step that did not run, and says in its report that no baseline measured the skill.

When every line of the checklist is ticked or explained, run `npm run audit -- <delivered path>`
once more and paste its whole output, unchanged, under the checklist in `record.md`. Decide each advisory line it reports: fix it, or say in `record.md` why not. Then paste the final
output. That block is what the caller compares against.

Every claim in `record.md` is one the caller settles from what you delivered. The caller re-runs
`npm run audit` on the delivered path and opens each path in the measured block. The caller also
looks for each quote in the saved runs. Who ran the audit of step 11 is a claim that a reader cannot check, so rest no gate on it.

Stop, and report what you have, at any of these points.

- The artifact test returns another class or `cannot tell`.
- The person refuses to name a task.
- You cannot read a rule file this skill names.
- Two more rounds of steps 8 and 9 still leave a numbered miss.

Keep the skill and `record.md` when you stop, and leave the keep-or-discard call to the person.
Do not weaken a gate to make it pass. Do not ease the task, loosen a rule, edit a recorded result,
or audit a copy in place of the delivered file.
