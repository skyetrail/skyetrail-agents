# Audit: handoff-rules.md

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/handoff-rules.md`
Rules: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`
Repository at commit 7deb2ae, working tree clean. Nothing was edited, staged, or committed.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`, exits clean:
`All generated files are up to date.`

`npm run lint -- --explain` reports that a top-level `.md` under a plugin's `shared/` is a
reference surface, and that reference surfaces get reference resolution only. This target is
`plugins/steering/shared/handoff-rules.md`, so it is a reference surface.

So the lint did reach the target, with one check: reference resolution, which passed. These
checks did not run on it: frontmatter hazards, name format and length, description length, and
body line count. The explain output states that reference surfaces carry no frontmatter, so the
frontmatter and length checks do not apply to this kind of file. Coverage above is taken from
the explain command, not from prose.

I did not re-derive any mechanical limit by hand. One partial exception, disclosed: to judge the
two Context rules, which are judgment rules about whether a reference resolves, I confirmed by
hand that `./steering-rules.md` exists next to the target. The lint's pass tells me references
resolved, but not which ones, and the Context rules ask about more than paths.

### Conditions applied, and why

`steering-rules.md` says to apply the conditions that match the document's own use. For this
target I applied **always**, **advisory**, and **reused**. I did not apply **hand-off** or
**changes something**.

- **advisory**: the file's own voice is auditor-facing. Lines 6 to 8 speak of severity, reporting,
  and marking a rule warn. That is work that reviews and changes nothing.
- **reused**: it is a shared rule file consulted across many runs, not a one-off.
- **hand-off not applied**: the condition describes a prompt dispatched to an agent that runs
  detached from the author. `DECISIONS.md` line 303 records that these rules "never apply to a
  plain skill", which is the author's own reading of the gate. A reference file consulted inside a
  live session is not a hand-off. Under the other reading, every reference file in the plugin would
  owe a named report format and a status set, which is the overreach the repository already
  recorded in `TEST_REPORT.md` line 46.
- **changes something not applied**: nothing here directs a file or state change.

The target is judged as a conditional supplement to `steering-rules.md`, as instructed. Where the
declared parent discharges an obligation, and the target incorporates the parent by reference at
lines 4 and 6, the target passes. Where the obligation is discharged only by a calling skill the
target never names, that is recorded as a finding.

## 2. Findings

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| Outcome 1 (Blocking, always). The finished outcome is stated, not just a topic or an area of work. | Pass | | Lines 6 to 8 incorporate the parent's reporting outcome. `steering-rules.md` line 13 states it. |
| Outcome 2 (Advisory, always). The outcome statement sits at the top, before context and method. | Not applicable | | No outcome section of its own. The `## Outcome` heading at line 22 is a rule table about the audited document, not this file's own outcome. |
| Context 1 (Blocking, always). Nothing refers to something the agent cannot resolve. | Pass | | Lines 4 and 6 name `./steering-rules.md` by relative path. `findings.md` at line 18 is inside a worked example. |
| Context 2 (Blocking, always). Every fact the agent needs is written out or pointed at by a path it can read. | Pass | | Line 4. The only external dependency is the parent, given by path. |
| Context 3 (Important, always). Approaches already tried and found not to work are stated. | Pass | | Lines 10 to 20 name the most common misreading and show it. |
| Context 4 (Advisory, always). Context sits above the method. | Not applicable | | No method section exists to position against. |
| Scope 1 (Blocking, always). What is in scope is named. | Pass | | Line 3. |
| Scope 2 (Blocking, always). What is out of scope is named explicitly. | Pass | | Line 4, "Do not read it otherwise." The negative case is stated, not implied. |
| Scope 3 (Blocking, always). A named category carries a membership test. Any list of kinds is marked as examples. | Pass | | Line 3 gives a membership test for hand-off. No closed list of kinds appears. |
| Scope 4 (Blocking, always). The instruction says to stop and report on reaching a scope limit. | Pass | | Lines 7 to 8. Mark warn, state what you could not determine, do not guess. |
| Scope 5 (Advisory, always). The scope statement sits above the method. | Not applicable | | No method section exists. |
| Scope 6 (Blocking, advisory). The instruction states the agent must not modify anything, and says what to do where a fix looks obvious. | Fail | Difference | Absent from the whole file and from the declared parent. `auditing-skills/SKILL.md` lines 29 to 30 carries it. A blanket statement here would contradict `writing-agents/SKILL.md` lines 40 to 51, which uses this same file to write files. So no wrong action can be named. |
| Method 1 (Important, always). One default approach is given rather than a menu of options. | Pass | | No competing options are offered. Lines 7 to 8 give one default for the uncertain case. |
| Method 2 (Blocking, always). The order is fixed where sequence affects correctness. | Pass | | Line 4 fixes the order against the parent. Rule order within the tables does not affect correctness and is left open. |
| Method 3 (Important, always). Constraints appear only where correctness or safety needs them, and each says why. | Pass | | Lines 50 to 51 state why the whole Return cluster is gated on hand-off. Line 3 gives the why for line 4. |
| Method 4 (Important, always). Any check that must run before work starts is named as the first step. | Pass | | Lines 3 to 4. The applicability gate is the first thing in the file. |
| Finish 1 (Blocking, changes something). A runnable check is named and settles whether the work is done. | Not applicable | | Condition not met. |
| Finish 2 (Important, always). The instruction says the agent runs the check itself before reporting. | Not applicable | | No finish check of its own. The `## Finish` table at line 34 is about the audited document. |
| Finish 3 (Blocking, advisory). The finish criteria are specific enough that two runs return the same result. | Warn | Difference | Line 56 turns on "fixed enough" and line 73 on "context the call does not need". Neither carries a test. Lines 7 to 8 give a warn path, which mitigates but does not converge two runs. I have no repeat-run evidence for this file, so I cannot tell. |
| Finish 4 (Important, advisory). The instruction says what evidence each finding must carry. | Fail | Difference | Absent here and from the parent. `auditing-skills/SKILL.md` line 115 supplies it. No observed harm, so difference rather than defect. |
| Finish 5 (Advisory, always). The finish check sits late in the document. | Not applicable | | No finish check of its own. |
| Failure 1 (Blocking, always). Conditions that should stop the work are stated. | Pass | | Line 4 states the condition under which the agent stops using this file. |
| Failure 2 (Important, always). A retry limit is named, and something must change before a retry. | Not applicable | | The file directs no attempt that could be retried. |
| Failure 3 (Blocking, changes something). Weakening the check or editing the test to make it pass is forbidden. | Not applicable | | Condition not met. |
| Failure 4 (Blocking, advisory). What to do where input is missing, unexpected, or cannot be assessed, with a status for each case. | Pass | | Lines 7 to 8 give the case this file owns, cannot assess, with a named status, warn. Line 4 covers the unexpected case. The missing-input case belongs to the caller that supplies the target, and `auditing-skills/SKILL.md` line 22 holds it. |
| Failure 5 (Advisory, always). The stop conditions sit directly after the finish check. | Not applicable | | No finish check exists to position against. |
| Calibration 1 (Blocking, advisory). Examples of what counts are given. | Pass | | Lines 17 to 20, the Good block. |
| Calibration 2 (Blocking, advisory). Examples of what does not count are given. | Pass | | Lines 13 to 16, the Bad block. |
| Calibration 3 (Blocking, advisory). The default outcome is stated, so the agent justifies escalating rather than approving. | Fail | Defect | Absent here and from `steering-rules.md`. Only `auditing-skills/SKILL.md` line 82 states it. An auditor reading the two rule files alone escalates by default. `TEST_REPORT.md` line 9 records that happening: 9, 9, and 16 findings against a threshold of 5. This audit's own kickoff had to restate the default by hand. |
| Calibration 4 (Important, advisory). Where a run showed a miss, the shape of the miss is described, not its label. | Pass | | Lines 13 to 20 show the shape a real misreading takes in the text. |
| Composition 1 (Important, reused). Every named hole in a template is required or carries a default. | Not applicable | | The file is a rule list, not a template with holes. |
| Composition 2 (Advisory, reused). The set of template fields is fixed and gathers no unused payload. | Pass | | Lines 53 to 60 fix six report requirements. Nothing gathers a payload most callers skip. |
| Composition 3 (Important, changes something). What happens to partial work when a run stops is stated. | Not applicable | | Condition not met. |
| Voice 1 (Important, always). A sentence that instructs names its actor, and that actor can choose to act. | Fail | Defect | Line 73, "the instruction is checked for context the call does not need". Compare line 72, "The caller checks that the report is usable", which names its actor. As written, an auditor cannot tell whether line 73 states a property of the target, which is auditable in the target, or an action the caller performs, which is not. That changes whether the row can produce a finding at all. |
| Voice 2 (Blocking, always). A property sentence keeps the property's owner as its subject and gains no actor. | Pass | | Rows at lines 26, 32, 55, 66, and 70 all keep the owner as subject. Line 73 is reported once, under Voice 1. |
| Voice 3 (Important, always). Nothing that cannot choose to act takes an action verb. | Pass | | Line 71 "Each status declares" and line 57 "The detail goes to a named file" match the parent's own idiom at `steering-rules.md` lines 108 and 119. No behaviour changes. |

## 3. Counts by severity

Fails and warns:

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 2 | 1 | 3 |
| Important | 2 | 0 | 2 |
| Advisory | 0 | 0 | 0 |
| All | 4 | 1 | 5 |

Defects: 2. Differences: 3.

Rule outcomes across all 36 rules: 20 pass, 11 not applicable, 4 fail, 1 warn. Not applicable is
not a pass. Eleven rules never applied, mostly because this file has no method section and no
finish check of its own, which is expected of a supplement.

One blocking defect, Calibration 3, means the target needs work before use. The blocking
difference, Scope 6, does not hold the target back. Read it as a signal about the rule.

## 4. The three fixes to make first

1. **State the default outcome.** Calibration 3, blocking defect. Add one line to
   `steering-rules.md`, or to this file, saying the default outcome is pass and the agent must
   justify escalating. Put it in the parent so both files inherit it. This is the only finding with
   observed harm behind it, in `TEST_REPORT.md` line 9.
2. **Fix line 73.** Voice 1, important defect. Either "The caller checks the instruction for
   context the call does not need", which instructs and names its actor, or "The instruction
   carries no context the call does not need", which states a property. Either resolves the
   ambiguity. The second matches every other row in that table.
3. **Close the parent-chain gap.** Scope 6 and Finish 4, one root cause. This file defers shared
   audit machinery to `steering-rules.md` at lines 4 and 6, but three pieces of that machinery live
   only in `auditing-skills/SKILL.md`: the no-edit rule at lines 29 to 30, the evidence requirement
   at line 115, and the default outcome above. Move them into `steering-rules.md`, or have this
   file name the calling skill. Note that the no-edit wording has to allow for `writing-agents`,
   which uses the same rules to write files.

## 5. Anything I did that nobody asked for

- Read `auditing-skills/SKILL.md` in full and the first 60 lines of `writing-agents/SKILL.md`.
  Neither is a target. I needed them to establish which conditions match this file's own use and
  to tell an obligation the composite discharges from one nothing discharges.
- Read `AGENTS.md`, and the parts of `DECISIONS.md` and `TEST_REPORT.md` that name these files.
  `DECISIONS.md` line 303 and `TEST_REPORT.md` lines 9 and 46 are load-bearing for the hand-off
  determination and for Calibration 3.
- Decided the hand-off condition myself rather than asking. The reasoning is in section 1 so it can
  be overturned without redoing the audit. If hand-off does apply, the 20 rules in this file's own
  tables would also be turned on it, and the result would change.
- Grepped the repository for callers of the shared files, and confirmed the plugin ships through
  `marketplace.json`.
- Ran `git log` and `git status` to confirm the stated commit and clean tree. Both matched.
- Changed no file except this report.
