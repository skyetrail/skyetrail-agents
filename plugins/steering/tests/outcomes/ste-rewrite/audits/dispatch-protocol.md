# Audit: dispatch-protocol.md

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/dispatch-protocol.md`
Rules: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md` and
`/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/handoff-rules.md`
Commit: 7deb2ae, working tree clean. Nothing was committed, staged, or edited.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
All generated files are up to date.
```

The lint passed.

`npm run lint -- --explain` reports which kinds of file get which checks. The target is a
top-level `.md` under a plugin's `shared/`, which the explain output calls a reference surface.
Reference surfaces get **reference resolution only**. They carry no frontmatter, so the
frontmatter and length checks do not apply.

So the lint reached the target, for reference resolution only. The target holds exactly one file
reference, `./steering-rules.md` at line 3, and the lint resolved it.

Checks that did **not** reach the target: frontmatter hazards, name format and length,
description length, and body line count. Those apply to components, meaning
`skills/*/SKILL.md`, `commands/*.md`, and `agents/*.md`.

I did not re-derive any mechanical limit by hand. The lint settled them.

### Conditions that apply to the target

- **always** applies.
- **hand-off** applies. The target is a shared reference file read by an agent that did not see
  the author's conversation. `handoff-rules.md` was therefore read and applied.
- **changes something** applies. The protocol governs dispatch of work that modifies files and
  state. The target itself relies on this, at invariant 5 (weakening a check, editing a test) and
  invariant 6 (partial work when a run stops).
- **reused** applies. The target is a shared reference read on every dispatch, not a one-off.
- **advisory** does **not** apply. The target does not govern work that changes nothing. Every
  rule conditioned on advisory is therefore marked not applicable, including the whole
  Calibration section.

### How the hand-off rules were applied

The target is a reference document read by a caller, not a prompt that dispatches an agent and
receives a status. Each hand-off rule was applied as a property of the target: does the target
state this for its reader. Where the target has no such element at all because of what it is, the
row says so. This is a judgement call and it changes several results, so it is stated here rather
than buried.

## 2. Findings

Rules are listed in the order they appear in the two rules files. Source column: S is
`steering-rules.md`, H is `handoff-rules.md`.

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| S Outcome: the finished outcome is stated, not just a topic (Blocking) | Pass | | The seven invariants at lines 39 to 55 are the checkable finished state of a dispatch. Line 3 alone would be only a topic. |
| S Outcome: the outcome statement sits at the top (Advisory) | Pass | | Purpose at lines 3 to 4; the invariants sit third, after principle and terms, which are context. |
| S Context: nothing refers to something the agent cannot resolve (Blocking) | Pass | | Only `./steering-rules.md` at line 3, which the lint resolved. |
| S Context: every fact is written out or pointed at by a readable path (Blocking) | Pass | | The statuses, terms and shapes are written out in full. See the H Context row for the pointer that misses. |
| S Context: approaches already tried and found not to work are stated (Important) | Pass | | Lines 26 to 28 on empty script results; line 44 on re-dispatch not being a retry; line 52 on not reverting automatically; line 85 on conventions not written down. |
| S Context: context sits above the method (Advisory) | Pass | | One principle (line 15) and Two terms (line 30) sit above Three shapes (line 88) and Establishing facts (line 102). |
| S Scope: what is in scope is named (Blocking) | Pass | | Lines 3 to 4, "This covers what the caller does with it". |
| S Scope: what is out of scope is named explicitly (Blocking) | Pass | | Line 3, the agent's side is named as living elsewhere. The pointer is wrong, which is a separate row, but the boundary is stated. |
| S Scope: a category carries a membership test, and any list of kinds carries an examples marker (Blocking) | **Fail** | **Defect** | Invariant 5, lines 48 to 50: "the prompt forbids three things. The agent must not weaken a check. It must not edit a test. It must not narrow a command to make it pass." The count is fixed and no marker opens it. An agent that deletes a failing test file, stubs the function under test, adds a skip marker, or lowers a threshold in config reads all four as permitted, because none is on the list. Secondary evidence: line 104, "Anything that can be counted, parsed, matched, or read from a file is script work", is a closed list with no trailing generalisation. |
| S Scope: stop and report on reaching a scope limit (Blocking) | Pass | | Lines 99 to 100, "Stop and report what is missing where work fits none of them ... Do not force the work into the nearest shape." |
| S Scope: the scope statement sits above the method (Advisory) | Pass | | Lines 3 to 4, above both method sections. |
| S Scope: the agent must not modify anything, and what to do where a fix looks obvious (Blocking, advisory) | Not applicable | | The advisory condition does not apply. |
| S Method: one default approach rather than a menu (Important) | Pass | | Line 90, "**Fan out.** The default." Line 106 names the hybrid as the common case. |
| S Method: the order is fixed where sequence affects correctness (Blocking) | Pass | | Invariant 1 (before dispatch), invariant 7 (collect before the turn ends), line 95 (nothing dispatched until facts are established and validated), lines 112 to 114 (recheck before a worker starts). |
| S Method: constrain only where correctness or safety needs it, and say why (Important) | Pass | | Lines 17 to 19 give four reasons for the script rule; line 42 gives the reason for caller obligations; line 52 gives the reason for keeping partial work; line 81 gives the reason for a fixed status set. |
| S Method: any check that must run before work starts is named as the first step (Important) | Pass | | Invariant 1 is first, and it is the pre-dispatch check. |
| S Finish: a check the agent can run itself is named, and its result settles whether the work is done (Blocking, changes something) | **Fail** | **Defect** | Line 19 says a script "gives the caller an exit code to gate on" and lines 21 to 24 list four things a script settles, but no script, path, or command exists anywhere in the file. A caller has nothing it can run, so whether a dispatch is correctly set up is settled by judgement. `./lint.md` sits in the same directory and settles the command for this repository, and the target never points at it. Same fix as the H Finish row below. |
| S Finish: the agent runs the check itself before reporting (Important) | Pass | | Invariant 5, lines 46 to 48. |
| S Finish: finish criteria repeatable across two runs (Blocking, advisory) | Not applicable | | The advisory condition does not apply. |
| S Finish: what evidence each finding must carry (Important, advisory) | Not applicable | | The advisory condition does not apply. |
| S Finish: the finish check sits late in the document (Advisory) | Pass | | Validation and recheck sit in the final section, lines 108 to 114. |
| S Failure: conditions that should stop the work are stated (Blocking) | Pass | | Lines 72 to 73 (skipped step means BLOCKED or NEEDS_CONTEXT) and lines 99 to 100 (stop where no shape fits). |
| S Failure: a retry limit is named, and something must change before a retry (Important) | **Fail** | **Defect** | Invariant 4, lines 44 to 45, requires a limit to be stated and correctly says re-dispatching the same prompt to the same model is not a retry, but names no limit and gives no default. The consumer proves the harm: `plugins/steering/skills/writing-agents/SKILL.md` line 80 tells an agent "Add the retry limit" from this file. There is none to take, so each caller invents one. |
| S Failure: weakening the check or editing the test is forbidden (Blocking, changes something) | Pass | | Invariant 5, lines 48 to 50. The prohibition is present. Its closed form is the Scope row above. |
| S Failure: what to do where input is missing or cannot be assessed, with a status for each (Blocking, advisory) | Not applicable | | The advisory condition does not apply. |
| S Failure: stop conditions sit directly after the finish check (Advisory) | **Fail** | Difference | Stop conditions sit in two places, lines 72 to 73 inside Statuses and lines 99 to 100 at the end of Three shapes, with no finish check for them to follow. We would gather them in one place. No agent acts wrongly on this. |
| S Calibration: examples of what counts (Blocking, advisory) | Not applicable | | The advisory condition does not apply. |
| S Calibration: examples of what does not count (Blocking, advisory) | Not applicable | | The advisory condition does not apply. |
| S Calibration: the default outcome is stated (Blocking, advisory) | Not applicable | | The advisory condition does not apply. |
| S Calibration: a miss is described by shape, not label (Important, advisory) | Not applicable | | The advisory condition does not apply. |
| S Composition: every named hole is required or carries a default (Important, reused) | Pass | | Lines 22 to 23 make "Whether the caller filled every hole in a prompt" script work, so an unfilled hole fails loudly at the gate. |
| S Composition: the set of fields established for a template is fixed (Advisory, reused) | Pass | | Lines 82 to 83, "fixed and documented, so it does not accumulate fields most callers never fill." |
| S Composition: what happens to partial work when a run stops (Important, changes something) | Pass | | Invariant 6, lines 51 to 53. |
| S Voice: a sentence that instructs names its actor (Important) | **Fail** | Difference | Bare imperatives with no named actor at line 17 ("Dispatch an agent only for..."), line 27 ("State what an empty result means"), line 62 ("Standardise this core"), line 78 ("So state the wider reach"), line 85 ("Write the caller's obligation..."), lines 99 to 100, and line 112 ("Close that gap deliberately"). Line 4 establishes the caller as the reader once, and the reader carries it. We would name the actor each time. I cannot name a wrong action. |
| S Voice: a property sentence keeps the property's owner as its subject (Blocking) | Pass | | The invariants use "The prompt states", "The retry limit is stated", "The caller checks that the report is complete". |
| S Voice: nothing that cannot choose takes an action verb (Important) | Pass | | A script may act under the rules file. "The prompt forbids" (line 48) and "Every status declares" (line 75) are the same stative idiom the rules file itself models with "The description states the capability". |
| H Outcome: the outcome is checkable without asking the author (Important) | Pass | | The invariants are each a testable property, and lines 21 to 24 say four of them are script-checkable. |
| H Context: local conventions the agent could not infer are stated (Important) | **Fail** | **Defect** | Lines 3 to 4 say `./steering-rules.md` covers "what the prompt says and what the agent returns". It does not. `steering-rules.md` lines 20 to 22 state that every hand-off rule, which includes the whole Return section, lives in `handoff-rules.md` and none of them lives in `steering-rules.md`. The target never names `handoff-rules.md`, though it sits in the same directory. A caller that follows the pointer for "what the agent returns" lands in a file with no Return rules, and only reaches them if it notices a conditional pointer there. This is the root cause of three rows below. |
| H Finish: the exact commands are named (Important) | **Fail** | **Defect** | No command appears anywhere in the file, while lines 19 and 21 to 24 require a script gate with an exit code. `./lint.md` in the same directory settles the command for this repository and is never named. |
| H Finish: the evidence goes in the report, so nobody re-runs the check (Important) | Pass | | Invariant 5, lines 46 to 48, and line 23, "Whether a returned report holds each command the prompt named, with that command's result." |
| H Failure: a named status exists for an insufficient instruction (Important) | Pass | | NEEDS_CONTEXT, line 70, with "This is the caller's failure, not the agent's." |
| H Failure: stopping is stated to carry no penalty (Important) | **Fail** | **Defect** | Nothing in the file says stopping costs nothing. Lines 99 to 100 tell the agent to stop and not to force the work into the nearest shape, and lines 72 to 73 attach BLOCKED to a skipped step, which reads as a mark against the agent. The document names the wrong behaviour it fears without removing the incentive for it. |
| H Return: the sections of the report are named (Blocking) | **Fail** | **Defect** | No report structure is named, and invariant 3 (line 43) requires only that "Where the detail goes and what returns to the caller are both named". Line 81 says the goal is that reports can be merged, which an unstructured report defeats. Shares its root cause with the H Context row: the delegation points at the wrong file. |
| H Return: the wording is fixed enough to compare two runs (Important) | Pass | | Lines 80 to 83 fix the status set and the field set for exactly this purpose. |
| H Return: the detail goes to a named file, and only a capped summary returns (Important) | **Fail** | **Defect** | Invariant 3, line 43, is weaker than the rule. It is satisfied by naming "return your findings in your reply", with no file and no cap. That is the failure `handoff-rules.md` lines 10 to 20 open with. |
| H Return: failures are included in the summary rather than only written to the file (Important) | **Warn** | Difference | Lines 66 to 73 carry failure upward through the status, and lines 72 to 73 forbid calling a skipped check a concern. Whether the status alone is meant to satisfy this, or whether the summary is also expected to carry failures, cannot be told from the file. |
| H Return: a section asks the agent to list anything it did that nobody asked for (Important) | **Fail** | Difference | Not mentioned anywhere. Same root cause as the H Context row, so it needs no separate fix. |
| H Return: the report format sits at the end of the document (Advisory) | Not applicable | | The report format section is missing, and that missing section is already the finding above. |
| H Composition: facts are established before dispatch and each carries its origin (Important) | Pass | | Invariant 1, lines 39 to 40. |
| H Composition: a deterministic determination is made by a script (Important) | Pass | | One principle, lines 17 to 24, and Establishing facts, lines 104 to 110. |
| H Composition: facts are written as a fixed set of named fields to a file, not prose (Important) | Pass | | Lines 32 to 35 define the field, line 106 has a script emit the measurable fields into a shared structure, lines 82 to 83 fix the set. |
| H Composition: the model or effort level is named explicitly (Important) | **Fail** | **Defect** | Neither model nor effort appears anywhere. Line 45 mentions "the same model" only to say a re-dispatch to it is not a retry. Naming the model at dispatch is caller-side work, squarely inside the target's stated scope. A caller reading this file lets the model inherit, and two runs of the same prompt stop being comparable. Mitigated for callers who arrive through `writing-agents/SKILL.md` line 52, which supplies it, but line 92 of that skill also sends readers here as the reference for the caller. |
| H Composition: statuses are enumerated and the caller's obligation for each is stated (Blocking) | **Fail** | **Defect** | The table at lines 65 to 70 has one column, Means. No caller obligation is given for any of the four. Line 85 pushes the obligation into "the artifact that runs the work" and gives no default, while invariant 2 (line 42) says "A status with no defined caller action is decoration". The consumer proves the harm: `writing-agents/SKILL.md` lines 79 to 80 tells an agent to take "the status set, with each status's scope of effect and the caller's obligation for it" from this file. Two of the three are here. The obligation is not, so it gets invented per call, which line 80 of the target forbids. |
| H Composition: each status declares whether it stops one agent or the whole run (Important) | Pass | | Lines 75 to 78, "The four above affect one agent. A status added for a particular run may not." |
| H Composition: the caller checks the report is usable and does not re-run the checks (Important) | Pass | | Invariant 5, lines 47 to 48. |
| H Composition: where a predefined named agent is dispatched, the instruction is checked for context the call does not need (Advisory) | **Fail** | Difference | Predefined named agents are not mentioned. `writing-agents/SKILL.md` has a "Converting a named agent" section that sends the reader here for four things, so the case exists in this plugin. Advisory, so it blocks nothing. |

## 3. Counts by severity

Rows audited: 56.

| Severity | Fail | Warn | Pass | Not applicable | Rows |
| --- | --- | --- | --- | --- | --- |
| Blocking | 4 | 0 | 10 | 6 | 20 |
| Important | 8 | 1 | 17 | 2 | 28 |
| Advisory | 2 | 0 | 5 | 1 | 8 |
| **Total** | **14** | **1** | **32** | **9** | **56** |

Four Blocking failures. The document needs work before use.

Defects: 10. Differences: 5. Total findings: 15.

Defects, by row: closed list of three prohibitions; no runnable check named; no retry limit
named; local convention pointer wrong and `handoff-rules.md` never named; no exact command;
stopping not stated to carry no penalty; report sections not named; detail and cap not required;
model or effort not named; statuses carry no caller obligation.

Differences, by row: stop conditions not gathered after a finish check; instructing sentences do
not name their actor; failures in the summary (warn); no section for unrequested work; predefined
named agents not covered.

## 4. The three fixes to make first

**1. Give the Statuses table a caller obligation column, and name a default retry limit.**
Fixes the Blocking row on caller obligations and the Important row on the retry limit. This is
the highest value fix because a consumer already asks this file for both by name:
`writing-agents/SKILL.md` lines 79 to 80 says to take the status set with each status's caller
obligation, and to add the retry limit, from this file. Neither is here. The target's own line 42
calls a status with no defined caller action decoration, and its own line 80 forbids inventing
additions per call, so the current state contradicts two of its own sentences. `SKILL.md` line 65
already carries a working limit, "at most twice per agent", which the target could adopt as the
default.

**2. Close the list of three prohibitions in invariant 5 with a membership test.**
Fixes the Blocking Scope row. Lines 48 to 50 name three ways to make a check pass without doing
the work, and the count "three things" seals the list. Write the test first, then the examples.
Something like: any change that makes a check pass without doing the work the check tests.
Deleting a failing test, stubbing the code under test, adding a skip marker, weakening a check,
editing a test, and narrowing a command are examples, not the whole list. This is the exact
failure the rules file illustrates with the injection case, and here it sits on the one paragraph
that stands between a dispatched agent and a faked pass.

**3. Name `./handoff-rules.md`, and correct lines 3 to 4.**
Fixes the Blocking row on report sections, the Important row on local conventions, and clears the
two Return rows that share the same root cause. Lines 3 to 4 currently send a reader to
`./steering-rules.md` for "what the agent returns", and that file says every hand-off rule lives
in `handoff-rules.md` instead. While in that paragraph, strengthen invariant 3 at line 43 so the
detail goes to a named file and what returns to the caller is capped, because the current wording
is satisfied by "return your findings in your reply".

Next after these three: name a script or point at `./lint.md` for the gate (two rows), name the
model at dispatch, and state that stopping carries no penalty.

## 5. Anything I did that nobody asked for

- I read `plugins/steering/skills/writing-agents/SKILL.md` lines 40 to 93, which was not on the
  list of files to read. It is the consumer that sends agents to the target. I read it to test
  whether the gaps I found are real rather than theoretical, and it changed two findings from
  "we would write it another way" to "an agent is told to take something from this file that is
  not in it". Those are the caller obligation row and the retry limit row.
- I read the first 40 lines of `plugins/steering/shared/lint.md`, which sits in the same
  directory as the target. It settles the lint command for this repository, and it is the obvious
  thing the target could point at for the gate it demands. That is now part of two findings.
- I grepped the repository for inbound references to the target. That is how I found the consumer
  skill.
- I stated my own interpretation of how the hand-off rules apply to a reference document rather
  than a dispatch prompt, in section 1. Nobody asked me to explain the method. Several results
  turn on it, so hiding it would have made the table unreadable.
- Two observations outside the audit, offered and not counted anywhere. Lines 76 and 99 and 112
  each run two separate ideas together with no paragraph break, so a reader can attach the second
  idea to the wrong subject. Line 76 is the worst case, where a sentence about added statuses is
  followed immediately by an unrelated sentence about a fact whose origin no longer matches. This
  is formatting, which this audit does not judge, so it appears here rather than in the table.
- I did not commit, stage, or edit anything. The only file I wrote is this report. I did not
  re-derive any mechanical limit by hand.
