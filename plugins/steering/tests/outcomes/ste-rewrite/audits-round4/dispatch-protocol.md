# Re-audit round 4: dispatch-protocol.md

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/dispatch-protocol.md`, 129 lines.

Prior report compared against:
`/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits-round3/dispatch-protocol.md`,
which audited this target at commit `d72544f`.

Rules applied: `plugins/steering/shared/steering-rules.md` and `plugins/steering/shared/handoff-rules.md`,
as the caller directed.

Repository at commit `19459c8`, working tree clean. Nothing was created, edited, staged, or
committed. The only file I wrote is this report.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
lint (advisory): plugins/steering/SUMMARY.md: is 193 lines and has no "## Contents" heading; a reference file over 100 lines opens with a contents list
All generated files are up to date.
```

The run exits clean. The one advisory is against `plugins/steering/SUMMARY.md`, not against this
target. Recorded once, as an advisory item should be. It does not block.

`npm run lint -- --explain` says a top-level `.md` under a plugin's `shared/` is a reference
surface, that reference surfaces get reference resolution, and that any `.md` over 100 lines gets
an advisory contents-list check.

**The lint reached the target with both of the checks that apply to it, and both passed.**
Reference resolution ran over the two paths at lines 3 and 4, `./steering-rules.md` and
`./handoff-rules.md`, and both resolve. The contents-list check ran because the file is 129 lines,
and it passed: the Contents heading sits at line 11.

These checks did not run on the target: frontmatter hazards, name format and length, description
length, and body line count. The explain output states those apply to components, meaning
`skills/*/SKILL.md`, `commands/*.md`, and `agents/*.md`, and that reference surfaces carry no
frontmatter. Coverage above is taken from the explain command, not from prose.

**One coverage gap still matters to this target, unchanged from round 3.** Line 8 names a skill by
bare name rather than by path. Reference resolution only resolves paths, so nothing mechanical
checks that claim. I verified it by grep instead: `writing-agents/SKILL.md` lines 46, 57, and 91
are the only inbound references outside `tests/`.

I re-derived no mechanical limit by hand.

### The call on the hand-off condition, which the caller asked for

**I call it does not hold, and the new sentence settles it.**

`steering-rules.md` lines 60 to 63 now read: "Every condition is about the document in front of
you, not about anything that document describes. A file of rules for writing hand-off prompts is
not itself a hand-off, because the agent reading it sits in the conversation its author is having."

This target is a file of rules for the caller's side of dispatching an agent. Its line 8 to 9 says
it supplies criteria and defines no task of its own, and I checked that claim rather than accepting
it: the task that applies it is `writing-agents/SKILL.md`, workflow steps 3 and 7. The agent that
opens this file is running `writing-agents` inside the conversation its author is having. So the
condition is about the prompts this file governs, not about this file, and it does not hold here.

Round 2 and round 3 both called it the other way, on the reasoning that an agent opening the file
in a later session has not seen the author's conversation. The new sentence rules that reasoning
out by name. It settles the question.

**I applied `handoff-rules.md` anyway, because the caller directed it.** `auditing-skills` line 45
says a direct instruction from the person overrides the audit, so the caller's rule list wins over
my condition call. Every row below that depends on `handoff-rules.md` is marked H, so the report
can be read either way. If the condition call is followed instead of the caller's list, the two
prior H rows that survive to this round drop to not applicable and the surviving count falls to
zero. New finding 2 is about that gap itself.

### The call on the describes work condition

**I call it does not hold**, on the test at `steering-rules.md` lines 65 to 72. This file names
nothing a reader finishes. It is one principle, two terms, eight invariants, a status table, three
shapes, and a rule about which determinations belong to a script. The imperatives it holds are
instructions about how to read the criteria, which lines 69 to 72 say do not make a task.

New this round: `steering-rules.md` lines 74 to 76 say that where **describes work** fails, so do
**advisory** and **changes something**, and all three are marked not applicable together. Round 3
held that this target meets **changes something**. That is now ruled out.

Conditions applied: **always** and **reused**. Not applied: **hand-off** by the rules and applied
by caller direction, **describes work**, **advisory**, **changes something**. So the live surface
in `steering-rules.md` is Context, Scope less its advisory row, Composition rows 1 and 2, and
Voice. Outcome, Method, Finish, Failure, and Calibration are all not applicable.

## 2. Prior findings

The round-3 report carried six rows in its findings table and one in its new-findings table. All
seven are tracked here. Source column convention is kept: S is `steering-rules.md`, H is
`handoff-rules.md`. Round 3's line numbers are one to two lower than the current ones, because the
intro gained a line.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| S Conditions: line 7 claimed the **catalogue** condition on a narrower test, and lines 113 to 114 and 126 to 128 do describe work (Blocking, fail, **defect**) | **retired** | Retired in round 3 and still retired on stronger ground. `steering-rules.md` lines 69 to 72 still say an imperative does not make a task, and the whole **catalogue** condition is gone from the Conditions list at lines 46 to 55. I checked the target's line 8 to 9 claim against `writing-agents/SKILL.md` steps 3 and 7 rather than accepting it |
| S Conditions: line 7 named two skills as appliers and only one applies this file (Blocking, fail, **defect**) | **retired** | Retired in round 3 and still retired. Line 8 names one, "The skill `writing-agents` applies this file." Grep over the repository excluding `tests/` returns three inbound references, all in `writing-agents/SKILL.md`, at lines 46, 57, and 91 |
| S Conditions: the carve-out did not say whether it reached the identically named Finish and Failure sections of `handoff-rules.md` (Blocking, fail, **defect**) | **retired** | Retired in round 3 by the word "below", and now retired because the carve-out sentence is gone entirely. `steering-rules.md` lines 78 to 80 replace it with "Read the Applies-when column for what drops out, one row at a time. No section drops out whole." Nothing now reaches across into the other file's sections, so there is nothing left to be ambiguous about |
| H Context: line 4 describes `handoff-rules.md` as covering "what the agent returns", and that file covers more (Important, warn, **difference**) | **retired** | Fixed. Lines 4 to 5 now read "`./handoff-rules.md` covers everything that applies because the agent will not see this conversation. That includes the report's sections and the caller's side of composing the prompt." I checked the new description against that file: its Composition section at lines 67 to 78 is caller-side work, and the new wording names it. Accurate |
| H Composition: invariant 8's wording is stricter than the rule it implements (Important, fail, **difference**) | **retired** | Fixed, on the rule side. `handoff-rules.md` line 74 now reads "The model and the effort level are both named explicitly ... Naming one and inheriting the other still leaves two runs incomparable." Invariant 8 at line 63 reads "The prompt names the model and the effort level." The two now agree. Judged below: the fix went the right way |
| H Composition: a predefined named agent is never covered (Advisory, fail, **difference**) | **confirmed** | The target still never mentions a predefined named agent, while `handoff-rules.md` line 78 still carries the Advisory rule and `writing-agents/SKILL.md` lines 74 to 84 still keeps its "Converting a named agent" section and routes the reader back here. Advisory, so it blocks nothing. Under my own condition call this row is not applicable rather than confirmed; it is confirmed under the caller's rule list |
| New finding 1: `steering-rules.md` lines 64 to 67 conflict with the Applies-when column of the same file's Finish and Failure tables (Blocking, fail, **defect**) | **retired** | The prose that conflicted is gone. Lines 78 to 80 now say the column decides, one row at a time, and that no section drops out whole. Two auditors reading the same file can no longer reach different Blocking counts on this target. The resolution went the wide way, which is judged below rather than filed |

Retired 6. Confirmed 1. Changed 0.

### The four rows round 3 revisited, rechecked once more

The conditions moved again, so I did not assume a retirement survives.

- **S Finish, no runnable check or command named.** Stays not applicable, and now settled rather
  than contested. Finish 1 at `steering-rules.md` line 153 is conditioned on **changes something**,
  which lines 74 to 76 now force to fail alongside **describes work**. Round 3 recorded this as the
  one row where two readings diverged. There is now one reading.
- **S Failure, stop conditions in two places.** Stays not applicable, on **describes work**.
- **S Voice, bare imperatives.** Stays retired on content. `steering-rules.md` lines 215 to 218
  still state that a bare imperative passes.
- **H Finish, the exact commands are named.** Stays retired on the target's own content. Invariant
  5 at lines 53 to 54 requires the agent to prove its work "with the commands and their output",
  and line 30 presupposes "each command the prompt named".

### On the deliberate changes, judged rather than reported as drift

Three changes reach this target. All three work.

**The `handoff-rules.md` description at lines 4 to 5 works.** It is now accurate against that
file's contents, and it is the fix that retired the oldest surviving row on this target. It also
creates the overlap that new finding 1 is about, which is a smaller thing than what it fixed.

**Changing `handoff-rules.md` to "the model and the effort level" is right, and it is the right
side to change.** The reason attached to invariant 8 at lines 63 to 64 is that two runs of one
prompt stop being comparable when the setting is inherited. That reason only holds if both settings
are named. A prompt naming the model and inheriting the effort level is as incomparable as one that
names neither. So the old "or" wording did not implement its own stated reason, and the invariant
did. Loosening the invariant to match the rule would have kept the disagreement and lost the
property. Tightening the rule to match the invariant kept the property and removed the
disagreement. Correct direction.

**Replacing the carve-out prose with "read the Applies-when column, one row at a time" works.**
It removes the contradiction round 3 filed, and it removes the guesswork round 3 had to do about
which of two readings to take. The cost is that the resolution went the wide way: with **describes
work**, **advisory**, and **changes something** all failing together, nothing in `steering-rules.md`
now reads invariant 5's anti-gaming list at lines 54 to 57 or invariant 6's partial-work rule at
lines 58 to 60. Those are the two most substantive invariants in the file, and an edit that deletes
either passes a full audit clean. Round 3 recorded the same residual, narrower, and said the rules
accept the cost deliberately. That is still true, and I record it the same way rather than filing
it. The change made the residual settled rather than contested, which is a net gain.

## 3. New findings

Only findings the round-3 report does not contain. Two.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| S Scope 2: "What is out of scope is named explicitly, rather than left implied by what is in scope." | Blocking | **warn** | **difference** | Lines 4 to 5 now hand `handoff-rules.md` "the caller's side of composing the prompt", which reads as putting that ground outside this file. Invariants 1, 2, 5, and 8 are that ground, and they restate `handoff-rules.md` Composition rows 1, 5, 6, 7, and 4. One pair has already drifted and is still apart: invariant 5 at line 54 and the DONE row at line 76 say the caller checks the report is **complete**, while `handoff-rules.md` line 77 says the caller checks it is **usable**. Another pair, invariant 8 against Composition row 4, drifted and was fixed this round by editing the rule file, which left the duplication that produced it in place. Warn because line 6, "This file covers what the caller does with both", can be read as reclaiming that ground, so I cannot tell from the text whether the overlap is meant. Difference because complete and usable plausibly name the same check here and I cannot name a wrong action today, only the next drift |
| S Conditions, `steering-rules.md` lines 60 to 63 read with line 31 and `handoff-rules.md` line 4. Severity assigned by me, because the Conditions block is prose and carries no severity, the same gap round 3 had to guess at | Important | **warn** | **defect** | The settled sentence makes `handoff-rules.md` unreachable for an audit of this target. Line 31 says "an agent auditing a document that is not a hand-off never reads them", and `handoff-rules.md` line 4 says "Do not read it otherwise." Under the settled reading this target is not a hand-off, so those eighteen rows do not apply to it. But the target's own lines 3 to 5 tell its reader that `handoff-rules.md` covers part of its subject, and the caller's brief for this round directs that file at this target. What an agent does wrong: an auditor that follows the settled reading never opens `handoff-rules.md`, and the two findings this round retired came from opening it. Nothing else compares invariants 1, 2, 5, and 8 against Composition rows 1, 5, 6, 7, and 4, so the next drift between them goes uncaught, which is the same failure mode as new finding 1 seen from the other side. Warn because the target's own text is not what breaks, and because a reader could hold that the caller's instruction is the standing arrangement rather than an exception |

Assigning Important to the second row rather than Blocking is my call, not the rules'. Round 3
flagged the same gap: the Conditions block at `steering-rules.md` lines 46 to 84 is prose and
carries no severities, while line 17 says every entry carries one. This is the third round running
in which that gap has forced the same guess.

### Things I checked and did not escalate

Recorded so a later pass does not spend the time again.

- **Line 118, "Anything that can be counted, parsed, matched, or read from a file is script
  work",** is a closed list of four verbs. Line 22 supplies the real membership test, "A script
  makes any determination that runs deterministically", and line 31 supplies the counter-test.
  Round 3 reached the same place. Not escalated.
- **Line 8 is a list of one with no examples marker.** Scope 3 asks any list of kinds to carry a
  marker. This is a claim of fact rather than a category and it is true today by grep. It goes
  stale silently if a second skill starts reading this file, which nothing mechanical would catch.
  Worth one clause if anyone touches the line.
- **Invariants 2, 5, and 8 give action verbs to a prompt, and line 72 says "every template uses
  them".** A prompt and a template cannot choose to act. `steering-rules.md` lines 226 to 233 bless
  exactly this form as a property sentence an auditor tests, and warn against rewriting it into an
  order. Passes.
- **Composition rows 1 and 2 are not applicable.** The document is **reused**, but it holds no
  template with named holes and establishes no field set of its own. It defines the terms hole and
  field at lines 36 to 40 and never requires a hole to be marked required or to carry a default.
  Judging that as a gap would judge the file by what it describes, which lines 60 to 61 forbid.
- **Context 3, approaches already tried and found not to work.** Lines 31 to 33 on empty script
  results, lines 91 to 93 on an agent that reads a stop as a mark against it, and lines 100 to 101
  on conventions held rather than written down. Passes.

## 4. Counts by severity

New findings.

| Severity | Fail | Warn | Defects | Differences | Total |
| --- | --- | --- | --- | --- | --- |
| Blocking | 0 | 1 | 0 | 1 | 1 |
| Important | 0 | 1 | 1 | 0 | 1 |
| Advisory | 0 | 0 | 0 | 0 | 0 |
| **Total** | **0** | **2** | **1** | **1** | **2** |

Surviving prior findings, meaning confirmed plus changed.

| Severity | Fail | Warn | Defects | Differences | Total |
| --- | --- | --- | --- | --- | --- |
| Blocking | 0 | 0 | 0 | 0 | 0 |
| Important | 0 | 0 | 0 | 0 | 0 |
| Advisory | 1 | 0 | 0 | 1 | 1 |
| **Total** | **1** | **0** | **0** | **1** | **1** |

Combined open: 3 findings. Defects 1, differences 2. Blocking 1, Important 1, Advisory 1.

No fail sits above Advisory. Round 3 for comparison: 4 open, 1 defect, 3 differences, with one
Blocking fail. Round 2: 6 open, 3 defects. Round 1: 15 open, 4 Blocking, 10 defects.

By `auditing-skills` lines 140 to 143, only a defect blocks, and the one defect here is a warn whose
root cause sits in `steering-rules.md` and `handoff-rules.md` rather than in this target. Nothing
filed against the target's own text is a defect. Four rounds in, this file's own content is clean
against every rule that reaches it; what remains is about which rules reach it.

## 5. Anything I did that nobody asked for

- Stated my reasoning for the **describes work** call as well as the hand-off call, and stated what
  changes if either is overturned, so neither needs redoing. The caller asked only about hand-off.
- Applied `handoff-rules.md` as the caller directed while holding that the rules' own routing now
  excludes it, and marked every affected row H so the report reads either way. I did not silently
  pick one.
- Judged which side of the model-and-effort disagreement was the right one to change, rather than
  only recording that it is now consistent. The caller asked whether it is right; I gave the reason
  as well as the verdict.
- Rechecked the four rows round 3 had already revisited, rather than assuming a retirement survives
  a third rule rewrite. All four hold, one of them now on settled rather than contested ground.
- Read the lint script at `eng/generate-readmes.mjs` lines 226 to 260 and 470 to 476 to establish
  which files the contents-list check actually opens, rather than taking the explain wording. The
  check runs over reference surfaces and over files a component links to by path. This target is a
  reference surface, so it is reached. `lint.md` line 51 says to read the script rather than trust
  prose, so this was in scope, but nobody asked for it on this target.
- Verified the applier claim at line 8 by grep and read `writing-agents/SKILL.md` to confirm which
  lines reach this file.
- Ran `git diff d72544f 19459c8` over the target and all five shared files, to tell a fix apart
  from a pre-existing line. It changed nothing.
- Ran `git log` and `git status` to confirm the stated commit and clean tree. Both matched.
- Wrote no file except this report and its two siblings in `/tmp/ste-audit-4/`. The directory
  already held reports from other runs; I did not touch them.
