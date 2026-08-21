---
name: writing-skills
description: Writes a new Agent Skill or fixes an existing one, producing a SKILL.md, its reference files, and a record of what the skill changed. Use this whenever someone mentions writing, creating, drafting, or improving a skill, a SKILL.md, or a skill description. It also applies when someone asks how to make an agent do something the same way every time, when a skill does not trigger or does not load, when a skill is being ignored, or when an agent forgets its instructions partway through a task. Use it when someone wants a runbook, a checklist, or a prompt they keep retyping turned into something reusable. Use it even when the word skill never appears, if the request is about capturing a repeatable way of working.
---

# Writing skills

This skill produces a SKILL.md, its reference files, and a record measuring what the skill
changed. Every run produces both the skill and the record. The person asked for a skill, so deliver
a whole one. A step you could not run becomes a line in the record. It is never a reason to hold
the file back.

## What you deliver

Deliver one complete SKILL.md and its reference files. Complete means a person uses it as it
stands. Fill every hole. Keep any note about the file's own status out of the file. Write every
sentence as a finished instruction. The person acts on it as written and never adds words to
complete it.

Where the skill is new, write it to `<record directory>/<skill-name>-delivery/<skill-name>/`. Name
that inner directory after the skill. Step 1 locates the record directory. A person installs the
skill by moving that inner directory to the install path, so nothing installs it on its own. The
install path is the directory the person named. Where they named none, use `skills/<skill-name>/`
under the plugin holding the record.

The skill directory holds `SKILL.md` and a `reference/` directory. Every reference file sits in
that directory. One task, run three times, named that directory two different ways, and no run
found a name to follow.

Where the skill already exists, edit the installed SKILL.md where it sits. That file is already
installed, so there is nothing to hold back.

The file you wrote is the delivered file, whichever of those two branches you took. Write its
absolute path on the `delivered` line of the checklist below, as soon as you know it. Every step
below that names the delivered path means that file. Step 14 copies the path into `measured.md`,
at `<record directory>/<skill-name>-delivery/measured.md`.

`measured.md` says what was and was not measured about the delivered file. It sits outside the
directory a person installs, so it never loads with the skill. Moving the skill past it is the
person's act of accepting what it says.

Do not put measurement status inside the SKILL.md. `../../shared/skill-rules.md` counts a statement
about a test not yet run as content that changes nothing for the agent reading it. The agent
loading the skill is not the reader of that status.

## Read the artifact test first

**Open `../../shared/authoring.md` now, before you plan or write anything.** Fill the artifact-test
block that file contains. Put the filled block in your reply. It returns one class and the number of
the deciding test.

Then route on the class.

- The class is a skill. Run the workflow below.
- The class is anything else. Stop. Name the class and the deciding test. Hand the request to the
  skill that file names for that class.
- A line in the block reads `cannot tell`. Stop and ask the person the question that file tells you
  to ask. Do not write a SKILL.md anyway. Where you cannot ask, put that question in your report
  and stop there.

Do not settle the class from the request alone. Someone asking you to write a skill is naming the
outcome they want, not the artifact that delivers it.

## What has already failed

These approaches were tried on this work and did not hold. They are a record for you, the author.
Put none of them in the skill you write.

- **A gate that withholds the artifact.** An earlier version sent a run that could not dispatch to
  write its work under a name marking it unmeasured, outside any install path. This happened on six
  runs. Every one returned a file whose own text disowned it, with holes left unfilled and a
  closing request that a person finish the writing. The same task, tried twice with no skill loaded
  at all, produced a working skill both times. A gate that blocks delivery loses to no gate at all.
- **A gate that only says stop.** A run met an error at the evidence step, recorded it, then wrote
  the description, the body and the reference split, and delivered a finished SKILL.md. That
  skill's own gate forbade keeping the file. An agent that expects to deliver something delivers
  it rather than stopping.
- **A name that fails when `npm run audit` runs.** The unmeasured naming put the file in a
  directory whose name never matched the frontmatter name. `npm run audit` then failed
  `lint-name-matches-directory`
  on every run. One run met that failure and audited a copy at a passing path instead. A delivered
  directory named after the skill removes the failure and the motive together.
- **A checklist line a run grades on its own word.** Every run in one round ticked a line it had
  just failed. Two of them described the failing case in their own records first. A ticked line now
  carries the path of the file that proves the claim, so a reader can confirm it without the run's
  agreement.
- **A step pointing forward.** One step said a later step named the directory to write to. The
  agent read no further and reported the directory missing, while four files sat in it. Every step
  below is complete where it stands.
- **A description summarising the workflow.** The agent follows the summary and never opens the
  body.
- **A skill tuned on shape alone.** An agent following it cut correct subject content that the
  same model wrote with no skill loaded. Steps 3, 7 and 9 below exist for that.

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
block with the work.

Append to every line you tick the path of the file that proves the claim, or the command another
reader runs to confirm it. A tick with nothing appended is not a tick, because a reader cannot
check it. Ticked lines look like this:

```text
[x] 4  Baseline dispatched with no skill loaded; output saved
       plugins/skyetrail/tests/baselines/bug-report-triage-runs/without-skill.md
[x] 12 `npm run audit` run on the delivered path; the printed path matches
       plugins/skyetrail/tests/baselines/bug-report-triage-runs/audit.md
```

A line you cannot tick stays unticked and carries one line saying why.

```text
writing-skills
delivered: <absolute path of the SKILL.md you wrote>
[ ] 0  ../../shared/authoring.md artifact-test block filled; the class is a skill
[ ] 1  Case decided: new skill, large change, or small change
[ ] 2  Objective written into the record
[ ] 3  Subject knowledge listed in the record before any section order applied
[ ] 4  Baseline dispatched with no skill loaded; output saved
[ ] 5  Misses numbered; each one quoted from that saved output
[ ] 6  Description written against the Discovery table
[ ] 7  Body written against the section order and the rule tables; every condition settled by its own test; draft read against the step 3 list; no authoring history; every deferred value carries a default the reader acts on alone
[ ] 8  Every numbered miss addressed, and nothing else
[ ] 9  Nothing correct from the step 4 output dropped
[ ] 10 Detail moved into reference files, in the directory "What you deliver" names
[ ] 11 Baseline dispatched with the skill loaded; output saved; table filled
[ ] 12 `npm run audit` run on the delivered path; the printed path matches
[ ] 13 Independent audit dispatched; findings saved
[ ] 14 measured.md written; every path in it opens
```

A small change ticks 0, 1, 2, 12, 13 and 14, and marks 3 to 11 not in this case. Every other case
ticks all of them.

1. **Decide the case.** The case you choose sets which steps you run.

   - No skill exists for this request yet. Run every step.
   - A skill exists and the change is large. Run every step.
   - A skill exists and the change is small. Run steps 0, 1, 2, 12, 13 and 14 only.

   A change is small where the description and the sentence saying what the skill produces both
   stay word for word the same. Every other change is large.

   The record is the file `tests/baselines/<skill-name>.md`, inside the plugin directory holding
   the skill you write. List that plugin directory to find it. Create the directory where it does
   not exist. Where the skill does not belong to any plugin, put the record beside the skill's own
   directory and name that path inside the record. The directory holding the record is the record
   directory, and every other path in this skill hangs off it.

   The record contains one line reading `Small changes since the last full loop: <count>`. Raise
   it by one for a small change. Set it to zero when a run of every step finishes. The cap is
   three. The fourth change runs every step, whatever its size. Without the cap, small changes
   accumulate, and nobody ever meets a change large enough to run the loop.

2. **Anchor the objective.** Write the person's request into the record you located in step 1, word
   for word, under a heading `## Objective`. Where the record already has that heading from an
   earlier loop, replace what sits under it with the current request.

   Nothing a skill loads at run time points at the record, so the SKILL.md never links to it.

3. **List what you know about the subject.** This skill shapes a document. It supplies no subject
   knowledge, and the model already holds much of it. Open `../../shared/authoring.md` at the
   section headed "What the rule files carry and what they do not". Write the list that section
   asks for into the record, before you apply any section order. That section also names what one
   run dropped this way.

   This step does not need a dispatch. Run it before you dispatch anything. A dispatch that fails
   does not excuse it.

4. **Baseline with no skill loaded.** Take the task from what the person asked for. Where they did
   not name a task, ask for one. Do not invent one, because a task you chose measures the skill
   against your own reading of the request. Where you cannot ask, write one task from the request,
   and name it in the record and in your report as your own.

   Dispatch one subagent on that task, in a fresh context. Tell it to work from its own knowledge,
   and tell it not to invoke any installed skill. Where an installed skill covers the task, you
   measure that skill rather than the model. Name the model and the effort level in the dispatch.
   Save the whole output to `<record directory>/<skill-name>-runs/without-skill.md`.

   Where the run uses an installed skill anyway, read that skill. Where its description
   names the condition the person described, extend that skill rather than writing a new one, and
   say which skill. Otherwise record which skill the run used. Either way that run is void.
   Dispatch a replacement with that skill forbidden by name.

   **Where you cannot dispatch.** Copy the error text into the record, word for word, under a
   heading `## Blocked`, with the number of this step beside it. Then carry on. Run every remaining
   step that does not need a dispatch, and deliver the skill.

   Write a whole skill. The person asked for one, and a missing measurement is not a missing skill.
   Fill every hole, settle every default, and do not write any sentence asking the person to finish
   the writing. The section headed "What you deliver" says where the file goes and what may not sit
   inside it.

   Do not run the task yourself in place of the subagent. You already hold the request and the
   misses you expect, so your own run measures your reading rather than the model's.

5. **Number the misses.** A miss is anything the run produced that a person must correct before
   using the result. Anything you would only word differently is not a miss.

   Quote the text settling each miss from `without-skill.md`, word for word. A miss you cannot
   quote is not a miss. A quote a reader cannot find in that file is not a quote. Number the
   misses, and hold those numbers to the end of the loop.

6. **Write the description.** This is the trigger and the most common point of failure. Write it
   against every rule in the Discovery table of `../../shared/skill-rules.md`. Open that file and
   work down the table.

7. **Write the body.** Take the section order and each heading's text from
   `../../shared/steering-rules.md`. Open it and read the section list. A copy of that list here
   drifts from it, and an agent then reads two lists that differ.

   Write the body against every rule in that file, and against the Boundary and Content tables of
   `../../shared/skill-rules.md`. Open both and work down them. Write every sentence against
   `../../shared/ste.md`.

   Settle each condition in the Conditions block of `../../shared/steering-rules.md` by that
   block's own test. Put every answer in the record. Name the test that returned false for any
   condition you set false. More than one condition can be true, and a false answer for one is
   never a true answer for another. A run that read two of them as exclusive dropped a blocking
   rule from a security review prompt.

   A section restates the description where every sentence in it states a capability or a trigger
   the description already states. Compare the two sentence by sentence. Cut such a section. The
   description loads before the body, so the agent pays for the same words twice.

   Do not put any authoring history in the body, or in any file the skill loads. A failure met doing the
   work the skill steers belongs, because the reader meets that same work. A failure met writing
   the skill does not, because the reader has never seen an earlier draft. Test a sentence about a
   past failure by asking whether the reader can reach what it names. One run mirrored the section
   headed "What has already failed" into its artifact. That artifact opened with "A prior version
   of a prompt like this one treated ...", which the receiving agent could not resolve.

   Give a default for every value the body or a reference file leaves to the reader's own setup. A
   window in days, a severity scale, a set of labels, and a naming convention are examples, not the
   whole list.

   The default is a value the reader acts on alone. Write `7 days`, and not "the window your team
   uses". A sentence telling the reader to ask a person or a team is not a default, because the
   reader stops there. Write the value, then say the reader may set another. A default the reader
   may replace is not an invented fact.

   Where the deferred thing is a set, name every member and the test that assigns each one. A
   member name settles nothing alone, because the reader still picks by feel. One task run twice
   left the severity scale to the reader both times. An unaided run of that task gave four tiers,
   each with the test that assigns it.

   Read the draft against the subject list step 3 wrote into the record, before you leave this
   step. Name every instruction in the draft that came from your own knowledge of the subject
   rather than from a rule file. Where you can name none, you dropped them all. Put them back.

   Deferring content to another document counts as dropping it, unless you move it into a reference
   file and point at where it went.

8. **Address the numbered misses, and nothing else.** Read the `## Objective` heading in the record
   again first. Take each numbered miss. Describe the shape it takes in the work, not the label it
   falls under. The Calibration section of `../../shared/steering-rules.md` states that rule with
   a worked pair. Leave out anything the run already got right.

   Where step 5 did not run, the misses stay unnumbered. Write that line into the record, and go on
   to step 10. Do not invent a miss to fill the step.

9. **Keep what the unaided run got right.** Put `without-skill.md` beside your draft and read the
   two against each other. Where the unaided run gave a correct, specific instruction about the
   subject, that instruction stays in the draft. Move it into whichever section the order puts it
   in.

10. **Move detail into reference files.** Move a passage one step needs and the other steps do not.
    Keep a passage every step needs. A rule table, a worked example, and a set of cases are the
    kinds moved most, not the whole list. Open `../../shared/skill-rules.md` and work down its
    rules for reference files. They set how you arrange the file you move a passage into.

    The section headed "What you deliver" names the directory every reference file goes in. Three
    runs of one task split the detail three ways.

    Write each pointer as an instruction that states the path, at the point the reader needs it. A
    reader skips a bare "see the reference", and then works without the passage entirely. Make the
    pointer plainer rather than copying the passage back.

11. **Baseline with the skill loaded, and grade it.** Run the same task again, in a fresh context,
    with the skill loaded, at the model and effort level step 4 named. Save the output to
    `<record directory>/<skill-name>-runs/with-skill.md`.

    Fill one row per numbered miss. Each row states the number, whether the run still shows the
    miss, and the quoted text settling that call. Quote from `with-skill.md`, word for word, so
    another reader finds the same text in the same file. Put the table in the record.

    Where you cannot dispatch, follow the branch in step 4. It applies here word for word.

12. **Check the mechanics, on the file you deliver.** Run `npm run audit -- <path>` from the root of
    this plugin's repository. Give it the absolute path on the `delivered` line of your checklist,
    and no other path. The command takes any path, so the delivered file need not sit in that
    repository. This settles every mechanical check once, so no later finding argues them again.

    The command prints the absolute path it read, on a line beginning `SKILL.md`. Copy that line
    and the closing count line into the record, word for word. The path on the `SKILL.md` line
    matches the `delivered` line character for character, or the command measured some other file.
    Its counts then say nothing about yours. Save the whole output to
    `<record directory>/<skill-name>-runs/audit.md`.

    Run the command once, on that file, where it sits. Do not copy the file to another path and
    audit the copy. Do not create a directory to make a check pass. One run extracted its draft to
    a path built to satisfy the name check, audited it, deleted it, and reported eighteen passes
    and no failures. The file it delivered returns four passes and two failures.

    Another reader runs the same command on the same path and gets the same lines. Where the two
    disagree, that reader's run is the one that counts.

    Where the command cannot run, or runs without reaching your file, follow what
    `../../shared/lint.md` says and record what did not run.

13. **Audit, and not by yourself.** Dispatch a fresh agent to audit the delivered file, using
    `auditing-skills`. Give it the absolute path on the `delivered` line of your checklist, and no
    other path. Read the `## Objective` heading in the record again first. Where the draft no
    longer answers those words, say which words it dropped.

    Save the findings to `<record directory>/<skill-name>-runs/audit-independent.md`, and put them
    in the record.

    Do not audit your own draft. You know what you meant each line to say, so you read the intent
    rather than the text. You then pass wording that a reader with no context would not pass.

    Where you cannot dispatch, follow the branch in step 4.

14. **Write `measured.md`.** Fill this block and write it to
    `<record directory>/<skill-name>-delivery/measured.md`. Write it on every run. A run where
    every step ran writes it too.

    ```text
    Measured

    skill      <name from the frontmatter>
    delivered  <the absolute path your checklist carries>
    re-run     npm run audit -- <that same path>

    4  baseline, no skill loaded  <path>  ran | not in this case | blocked: <error text>
    5  misses numbered            <path>  ran | not in this case | blocked: <reason>
    11 baseline, skill loaded     <path>  ran | not in this case | blocked: <error text>
    12 mechanical audit           <path>  ran | not in this case | blocked: <reason>
    13 independent audit          <path>  ran | not in this case | blocked: <error text>
    ```

    Read the `## Blocked` heading in the record. Every step listed there takes a `blocked` line
    carrying its error text. Use `not in this case` only where step 1 chose a case that does
    not call for that step. Every other step takes a `ran` line.

    Open every path in the block before you write the line. A `ran` line naming a file that is not
    there is a false line, and another reader finds it with one `ls`.

    Say in your report what the block says. Do not report a step as run because you meant to run it.

## The gate

Run the command and the audit yourself before you report anything. Do not hand a draft to the
person with a request to check it.

Read the step 11 table one row at a time.

- The run still shows the miss, so the skill does not address it.
- The run no longer shows the miss. The skill addresses it.

Where the skill addresses no miss at all, it changes nothing. Say that in your report, and leave
the keep-or-discard call to the person.

Where the run with the skill shows a miss that has no number, give it the next number. The skill
introduced that one, so put it and the run's own reasoning into the skill. Then run steps 8 to 11
again.

The loop settles at the round of steps 8 to 11 that does not add a new number and leaves every miss
addressed. The work is done when the loop settles, `audit.md` names the delivered path, and
`audit-independent.md` carries no unfixed blocking finding.

A dispatch you could not make stops the loop before it starts. The work is then done when three
things hold. The skill is at the delivered path. `audit.md` names that path. `measured.md`
carries a `blocked` line for every step that did not run. Say in your report that no baseline
measured this skill.

Every gate above is one another reader settles from what you delivered.

- The mechanical check. That reader runs `npm run audit -- <delivered path>` and compares the
  printed `SKILL.md` line and the count line against `audit.md`.
- The baselines. That reader opens `without-skill.md` and `with-skill.md`, and looks for every
  quote your step 5 and step 11 rows carry. A quote nobody can find in those files settles nothing,
  whatever the row says about it.
- The audit. That reader opens `audit-independent.md` and holds each finding against the delivered
  file.
- The measurement. That reader opens each path in `measured.md` and sees whether it is there.

The first is a command that reader runs again. The other three are files that reader opens. Who ran
the audit is a claim, and no reader can reach it. So the word independent is a report. Write it
down, and rest no gate on it.

No gate here withholds the artifact. A gate that did not run is a `blocked` line in `measured.md`,
and the skill is still delivered alongside it.

## When to stop

Stop at any of these, and report what you found.

- The artifact test returns a class other than a skill, or a line reading `cannot tell`.
- You can ask the person for a task, and they refuse to name one.
- You cannot read a rule file this skill names.
- Steps 8 to 11, run twice more, still leave a numbered miss showing.
- Any other point where you would have to assert something you cannot check.

A dispatch you cannot make is not on that list. Record it under `## Blocked` in the record, and
carry on to the delivery.

Retry a dispatch at most twice, and only where the second attempt differs from the first, such as a
different prompt or a different model. Re-sending the same prompt to the same model is not a retry.

Do not weaken a gate to make it pass. Do not ease the task, loosen a rule, or edit a recorded
result. Do not audit a copy in place of the delivered file, and do not lower the bar for what
counts as a miss. Fix the skill instead, or stop. A result earned by changing the gate measures
nothing.

## What survives a stop

Keep the skill and the record when you stop. Write what you have to the path the section headed
"What you deliver" names. Run step 14, so `measured.md` marks every step that did not run. Name the
delivered path, the record, and `measured.md` in your report. Leave the keep-or-discard call to the
person. Revert nothing on your own.

## Rules

- `../../shared/authoring.md` for the artifact test. Read it before anything else.
- `../../shared/skill-rules.md` for a SKILL.md. It names which other rule files apply and when.
- `../../shared/steering-rules.md` for the conditions, the section order, and the scope rules.
- `../../shared/lint.md` for which command settles the mechanical checks, and for what to do where
  it does not run.
- `../../shared/ste.md` for every sentence you write.
