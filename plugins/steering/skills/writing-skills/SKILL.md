---
name: writing-skills
description: Writes a new Agent Skill or fixes an existing one, producing a SKILL.md, its reference files, and a record of what the skill changed. Use this whenever someone mentions writing, creating, drafting, or improving a skill, a SKILL.md, or a skill description, and also when they ask how to make an agent do something the same way every time, say a skill is not triggering, is not loading, or is being ignored, or say an agent forgets its instructions partway through a task. Use it when someone wants a runbook, a checklist, or a prompt they keep retyping turned into something reusable. Use it even when the word skill never appears, if the request is about capturing a repeatable way of working.
---

# Writing skills

This skill produces a SKILL.md, its reference files, and a record measuring what the skill
changed. The record is as much the product as the file is. A draft carrying no record is not a
skill, and nobody installs one.

## Read the artifact test first

**Open `../../shared/authoring.md` now, before you plan or write anything.** Fill the artifact-test
block that file carries. Put the filled block in your reply. It returns one class and the number of
the deciding test.

Then route on the class.

- The class is a skill. Run the workflow below.
- The class is anything else. Stop. Name the class and the deciding test. Hand the request to the
  skill that file names for that class.
- A line in the block reads `cannot tell`. Stop and ask the person the question that file tells you
  to ask. Do not write a SKILL.md anyway.

Do not settle the class from the request alone. Someone asking you to write a skill is naming the
outcome they want, not the artifact that carries it.

## What has already failed

These approaches were tried on this work and did not hold. They are a record for you, the author.
Put none of them in the skill you write.

- **A gate that only says stop.** A run met an error at the evidence step, recorded it, then wrote
  the description, the body and the reference split, and delivered a finished SKILL.md. That
  skill's own gate forbade keeping the file. An agent that expects to deliver something delivers
  it rather than stopping, so step 3 below names what you return in place of a deliverable.
- **A step pointing forward.** One step said a later step named the directory to write to. The
  agent read no further and reported the directory missing, while four files sat in it. Every step
  below is complete where it stands.
- **A description summarising the workflow.** The agent follows the summary and never opens the
  body.
- **A skill tuned on shape alone.** An agent following it cut correct subject content that the
  same model wrote with no skill loaded. Step 8 below exists for that.

## Scope

In scope: a new SKILL.md, a change to an existing one, the reference files it loads, and the
record measuring it.

Out of scope, with the owner of each:

- Auditing a skill and changing nothing. `auditing-skills` owns that.
- Writing a prompt for an agent that will not see this conversation. `writing-agents` owns that.
- Judging writing style. `../../shared/ste.md` governs the sentences you write here, and no audit
  grades a target on it.
- Any other request where the artifact test returns a class other than a skill. The boundary sits
  in that test. This list names the cases seen most, not the whole set.

A direct instruction from the person wins over anything in this skill.

Where a request runs past this scope, stop and name the document that owns it. Do not stretch this
skill to cover it.

## Workflow

Copy this checklist into your reply before you start. Tick each line as you finish it. Return the
block with the work. A line you cannot tick stays unticked and carries one line saying why.

```text
writing-skills
[ ] 0  ../../shared/authoring.md artifact-test block filled; the class is a skill
[ ] 1  Case decided: new skill, large change, or small change
[ ] 2  Objective written into the record
[ ] 3  Baseline dispatched with no skill loaded; output saved
[ ] 4  Misses numbered; each one quoted from that output
[ ] 5  Description written against the Discovery table
[ ] 6  Body written against the section order and the rule tables; every condition settled by its own test; no authoring history; a default for every deferred value
[ ] 7  Every numbered miss addressed, and nothing else
[ ] 8  Nothing correct from the step 3 output dropped
[ ] 9  Detail moved into reference files
[ ] 10 Baseline dispatched with the skill loaded; table filled
[ ] 11 `npm run audit` run; result in the record
[ ] 12 Independent audit dispatched; findings in the record
```

A small change ticks 0, 1, 2, 11 and 12, and marks 3 to 10 not run. Every other case ticks all of
them.

1. **Decide the case.** The case you land on names which steps you run.

   - No skill exists for this request yet. Run every step.
   - A skill exists and the change is large. Run every step.
   - A skill exists and the change is small. Run steps 0, 1, 2, 11 and 12 only.

   A change is small where the description and the sentence saying what the skill produces both
   stay word for word the same. Every other change is large.

   The record is the file `tests/baselines/<skill-name>.md`, inside the plugin directory holding
   the skill you write. List that plugin directory to find it. Create the directory where it does
   not exist. Where the skill sits in no plugin, put the record beside the skill's own directory
   and name that path inside the record.

   The record carries one line reading `Small changes since the last full loop: <count>`. Raise it
   by one for a small change. Set it to zero when a run of every step finishes. Three is the cap,
   and the fourth change runs every step whatever its size. Without the cap, small changes
   accumulate, and nobody ever meets a change large enough to run the loop.

2. **Anchor the objective.** Write the person's request into the record you located in step 1, word
   for word, under a heading `## Objective`. Where the record already carries that heading from an
   earlier loop, replace what sits under it with the current request.

   Nothing a skill loads at run time points at the record, so the SKILL.md never links to it.

3. **Baseline with no skill loaded.** Take the task from what the person asked for. Where they
   named no task, ask for one. Do not invent one, because a task you chose measures the skill
   against your own reading of the request.

   Dispatch one subagent on that task, in a fresh context. Tell it to work from its own knowledge
   and to invoke no installed skill. Where an installed skill covers the task, you measure that
   skill rather than the model. Name the model and the effort level in the dispatch. Save the whole
   output under `tests/baselines/<skill-name>-runs/`, beside the record.

   Where the run reaches for an installed skill anyway, read that skill. Where its description
   names the condition the person described, extend that skill rather than writing a new one, and
   say which skill. Otherwise record which skill the run reached for. Either way that run is void.
   Dispatch a replacement with that skill forbidden by name.

   **Where you cannot dispatch.** Copy the error text into the record. Then stop. You hold no
   deliverable at that point, and text written past this line is not one.

   Do not run the task yourself in place of the subagent. You already hold the request and the
   misses you expect, so your own run measures your reading rather than the model's.

   Where the person still wants the text, write it to `<skill-name>-unverified.md` beside the
   record. Never write it into the skill's own directory. Never name it `SKILL.md`. That file is a
   proposal for a person to run this loop against. It is not a skill. Report the run blocked, quote
   the dispatch error, and give that path. A file sitting at the install path reads as finished,
   whatever the report says. `../../shared/authoring.md` states the same rule for every other gate
   this skill names and you could not run.

4. **Number the misses.** A miss is anything the run produced that a person must correct before
   using the result. Anything you would only word differently is not a miss.

   Quote the text settling each miss from the run's own output. A miss you cannot quote is not a
   miss. Number them, and hold those numbers to the end of the loop.

5. **Write the description.** This is the trigger and the most common point of failure. Write it
   against every rule in the Discovery table of `../../shared/skill-rules.md`. Open that file and
   work down the table.

6. **Write the body.** Order the sections the way `../../shared/steering-rules.md` orders its own.
   Open it and read the section list. A copy of that list here drifts from it, and an agent then
   reads two lists that differ.

   Write the body against every rule in that file, and against the Boundary and Content tables of
   `../../shared/skill-rules.md`. Open both and work down them. Write every sentence against
   `../../shared/ste.md`.

   Settle each condition in the Conditions block of `../../shared/steering-rules.md` by that
   block's own test. Put every answer in the record. Name the test that returned false for any
   condition you set false. Two conditions can hold together, and a false answer for one is never a
   true answer for another. A run that read two of them as exclusive dropped a blocking rule from a
   security review prompt.

   A section restates the description where every sentence in it states a capability or a trigger
   the description already states. Compare the two sentence by sentence. Cut such a section. The
   description loads before the body, so the agent pays for the same words twice.

   Put no authoring history in the body, or in any file the skill loads. A failure met doing the
   work the skill steers belongs, because the reader meets that same work. A failure met writing
   the skill does not, because the reader has never seen an earlier draft. Test a sentence about a
   past failure by asking whether the reader can reach what it names. One run mirrored the section
   headed "What has already failed" into its artifact. That artifact opened with "A prior version
   of a prompt like this one treated ...", which the receiving agent could not resolve.

   Give a default for every value the body or a reference file leaves to the reader's own setup. A
   window in days, a severity scale, and a naming convention are examples, not the whole list.
   Write the value, then say the reader may set another. A pointer to the team's own window is dead
   where the team has none. A default the reader may replace is not an invented fact.

7. **Address the numbered misses, and nothing else.** Read the `## Objective` heading in the record
   again first. Take each numbered miss. Describe the shape it takes in the work, not the label it
   falls under. The Calibration section of `../../shared/steering-rules.md` carries that rule with
   a worked pair. Leave out anything the run already got right.

8. **Keep what the unaided run got right.** Put the step 3 output beside your draft and read the
   two against each other. Where the unaided run gave a correct, specific instruction about the
   subject, that instruction stays in the draft. Move it into whichever section the order puts it
   in.

   This skill shapes a document. It supplies no subject knowledge, and the model already holds much
   of it. Then work the section headed "What the rule files carry and what they do not" in
   `../../shared/authoring.md`. It has you name every instruction in the draft that came from your
   own knowledge rather than from a rule file. It also lists what one run dropped this way.

   Deferring content to another document counts as dropping it, unless you move it into a
   reference file and point at where it went.

9. **Move detail into reference files.** Move a passage one step needs and the other steps do not.
   Keep a passage every step needs. A rule table, a worked example, and a set of cases are the
   kinds moved most, not the whole list. `../../shared/skill-rules.md` sets how you arrange a
   reference file.

   Write each pointer as an instruction carrying the path, at the point the reader needs it. A
   reader skips a bare "see the reference", and then works without the passage entirely. Make the
   pointer plainer rather than copying the passage back.

10. **Baseline with the skill loaded, and grade it.** Run the same task again, in a fresh context,
    with the skill loaded, at the model and effort level step 3 named. Save the output beside the
    first run.

    Fill one row per numbered miss. Each row carries the number, whether the run still shows the
    miss, and the quoted text settling that call. Put the table in the record.

    Where you cannot dispatch, follow the branch in step 3. It applies here word for word.

11. **Check the mechanics.** Run `npm run audit -- <path>` over the draft, from the root of this
    plugin's repository. The command takes the path, so the draft need not sit in that repository.
    This settles every mechanical check once, so no later finding argues them again. Put the result
    in the record. Where the command cannot run, or runs without reaching your file, follow what
    `../../shared/lint.md` says and record what did not run.

12. **Audit, and not by yourself.** Dispatch a fresh agent to audit the draft, using
    `auditing-skills`. Read the `## Objective` heading in the record again first. Where the draft
    no longer answers those words, say which words it dropped.

    Do not audit your own draft. You know what you meant each line to say, so you read the intent
    rather than the text. You then pass wording that a reader with no context would not pass.

    Where you cannot dispatch, follow the branch in step 3. Put the audit findings in the record.

## The gate

Run the command and the audit yourself before you report anything. Do not hand a draft to the
person with a request to check it.

Read the step 10 table one row at a time.

- The run still shows the miss. The skill does not address it.
- The run no longer shows the miss. The skill addresses it.

Where the skill addresses no miss at all, it changes nothing. Do not keep it.

Where the run with the skill shows a miss carrying no number, give it the next number. The skill
introduced that one, so put it and the run's own reasoning into the skill. Then run steps 7 to 10
again.

The loop settles at the round of steps 7 to 10 that adds no new number and leaves every miss
addressed. The work is done when the loop settles, the command's result sits in the record, and
the audit carries no blocking finding.

## When to stop

Stop at any of these, and report what you found.

- The artifact test returns a class other than a skill, or a line reading `cannot tell`.
- The person named no task and will not name one.
- You cannot dispatch a subagent, or cannot read a rule file this skill names.
- Two further rounds of steps 7 to 10 leave a numbered miss showing.
- Any other point where you would have to assert something you cannot check.

Retry a dispatch at most twice, and only after something changed. Re-sending the same prompt to the
same model is not a retry.

Do not weaken a gate to make it pass. Do not ease the task, loosen a rule, edit a recorded result,
or lower the bar for what counts as a miss. Fix the skill instead, or stop. A result earned by
changing the gate measures nothing.

## What survives a stop

Keep the draft and the record when you stop. Name both paths in your report. Leave the
keep-or-discard call to the person. Revert nothing on your own.

## Rules

- `../../shared/authoring.md` for the artifact test. Read it before anything else.
- `../../shared/skill-rules.md` for a SKILL.md. It names which other rule files apply and when.
- `../../shared/steering-rules.md` for the conditions, the section order, and the scope rules.
- `../../shared/lint.md` for which command settles the mechanical checks, and for what to do where
  it does not run.
- `../../shared/ste.md` for every sentence you write.
