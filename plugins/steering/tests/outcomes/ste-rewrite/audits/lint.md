# Audit: lint.md

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/lint.md`
Rules: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`
Repository at commit 7deb2ae, working tree clean. Nothing was edited, staged, or committed.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`, exits clean:
`All generated files are up to date.`

`npm run lint -- --explain` reports that a top-level `.md` under a plugin's `shared/` is a
reference surface, and that reference surfaces get reference resolution only. This target is
`plugins/steering/shared/lint.md`, so it is a reference surface.

So the lint did reach the target, with one check: reference resolution, which passed. These checks
did not run on it: frontmatter hazards, name format and length, description length, and body line
count. The explain output states that reference surfaces carry no frontmatter, so the frontmatter
and length checks do not apply to this kind of file. Coverage above is taken from the explain
command, not from prose. This is the file's own instruction at lines 57 to 61, followed.

I did not re-derive any mechanical limit by hand. One exception, disclosed: to judge the two
Context rules, which are judgment rules about whether a reference resolves, I confirmed by hand
that `AGENTS.md` exists at the repository root and holds a `repo-setup` block at lines 55 to 70,
and that `plugins/steering/skills/repo-setup/SKILL.md` exists. Reference resolution passing does
not tell me which references it resolved, and `repo-setup` is named as a bare skill name rather
than a path, so the lint would not cover it in any case.

### Conditions applied, and why

`steering-rules.md` says to apply the conditions that match the document's own use. For this
target I applied **always**, **advisory**, **reused**, and **changes something**. I did not apply
**hand-off**.

- **advisory**: the work this file directs is establishing what the lint is, running it, and
  reporting what it did not reach. That investigates and changes the target nothing.
- **changes something**: applied because of one branch. Lines 22 to 24 direct the agent to
  establish the command through `repo-setup` and then record it, which writes a file. Applying it
  costs nothing and makes the audit more complete: it turned up two passes and one not applicable.
- **reused**: it is a shared file consulted across many runs.
- **hand-off not applied**: the condition describes a prompt dispatched to an agent running
  detached from the author. `DECISIONS.md` line 303 records that the hand-off rules "never apply
  to a plain skill". A reference file consulted inside a live session is not a hand-off. Under the
  other reading, this file would owe a named report format and a status set, which is the
  overreach the repository already recorded in `TEST_REPORT.md` line 46.

Unlike `handoff-rules.md`, this file declares no parent. Line 3 states its own purpose and it is
read on its own terms.

## 2. Findings

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| Outcome 1 (Blocking, always). The finished outcome is stated, not just a topic or an area of work. | Pass | | Lines 3 to 6. The limits are settled once and a report can cite the result. |
| Outcome 2 (Advisory, always). The outcome statement sits at the top, before context and method. | Pass | | Lines 3 to 6, above the method at line 13. |
| Context 1 (Blocking, always). Nothing refers to something the agent cannot resolve. | Fail | Defect | The `## In this repository` heading at line 55 names no repository. Line 20 shows the author knew the distinction, saying "In this plugin's own repository", and did not carry it into the heading. The plugin ships through `marketplace.json`, and lines 22 to 24 anticipate a repository with no `npm run lint`. In a foreign checkout an agent reads lines 55 to 66 as facts about the repository it is working in, runs `npm run lint -- --explain` where no such script exists, or takes `npm run lint` as settled and skips the ordered lookup at lines 14 to 24. |
| Context 2 (Blocking, always). Every fact the agent needs is written out or pointed at by a path it can read. | Pass | | Line 17 names `AGENTS.md`, which holds the block at lines 55 to 70. Line 23 names `repo-setup`, and `auditing-skills/SKILL.md` lines 79 to 80 declare a skill name a working reference. Line 61 gives the command in full. |
| Context 3 (Important, always). Approaches already tried and found not to work are stated. | Pass | | Lines 64 to 66, a description in this file could disagree with the lint, and that happened four times. Also lines 24 and 30 to 31. |
| Context 4 (Advisory, always). Context sits above the method. | Pass | | Lines 7 to 11 sit above `## Finding the command` at line 13. |
| Scope 1 (Blocking, always). What is in scope is named. | Pass | | Lines 7 to 9. A lint checks what it can decide on its own. |
| Scope 2 (Blocking, always). What is out of scope is named explicitly. | Pass | | Lines 9 to 11. Judgment stays with the rules files. |
| Scope 3 (Blocking, always). A named category carries a membership test. Any list of kinds is marked as examples. | Pass | | Line 8 gives the membership test and marks its list "For example". The three cases at line 28 are a genuine enumeration over one dimension, and lines 50 to 53 handle the case where the mapping is unclear, so the list does not close prematurely. Lines 51 to 52 mark their list as examples. |
| Scope 4 (Blocking, always). The instruction says to stop and report on reaching a scope limit. | Pass | | Lines 30 to 31, 38 to 39, and 47. Report the gap rather than work around it, stated three times. |
| Scope 5 (Advisory, always). The scope statement sits above the method. | Pass | | Lines 7 to 11, above line 13. |
| Scope 6 (Blocking, advisory). The instruction states the agent must not modify anything, and says what to do where a fix looks obvious. | Fail | Difference | The first half is absent. The second half is met at lines 32 to 34, where the obvious fix is to add a lint and the instruction says to tell a person instead, and at lines 22 to 24, which delegate rather than guess. A blanket no-modify statement would contradict the recording step at line 23, and `auditing-skills/SKILL.md` lines 29 to 30 carries the no-edit rule for the audit that calls this file. So no wrong action can be named. |
| Method 1 (Important, always). One default approach is given rather than a menu of options. | Pass | | Line 14, an ordered lookup, not a menu. Line 20 names the default outright. |
| Method 2 (Blocking, always). The order is fixed where sequence affects correctness. | Fail | Defect | Line 14 says "Look for it in this order" and makes the recorded `AGENTS.md` command step 1. Line 20, inside step 2, then says of `npm run lint`, "Try it before anything else." Sequence affects correctness here: in a repository whose recorded command is not `npm run lint`, an agent that takes line 20 at face value runs the wrong command, or concludes there is no lint. The two readings agree in this repository, so nothing goes wrong here, and the exposure is elsewhere. |
| Method 3 (Important, always). Constraints appear only where correctness or safety needs them, and each says why. | Pass | | Lines 57 to 58 constrain and lines 64 to 66 say why. Lines 47 to 48 give the why for taking coverage from no document. Two or three constraints leave the why implied, at lines 24, 38, and 52, with no harm I can name. |
| Method 4 (Important, always). Any check that must run before work starts is named as the first step. | Pass | | The whole file is the pre-work check, and lines 45 to 46 say to establish what the command reads before recording a clean result. |
| Finish 1 (Blocking, changes something). A runnable check is named and settles whether the work is done. | Pass | | Lines 20 and 61. Lines 45 to 48 state what a clean result does not settle, which is what makes the criterion usable. |
| Finish 2 (Important, always). The instruction says the agent runs the check itself before reporting. | Pass | | Lines 20, 45 to 46, and 57 to 61. |
| Finish 3 (Blocking, advisory). The finish criteria are specific enough that two runs return the same result. | Pass | | Both the lint result and the coverage statement come from a deterministic command, lines 57 to 66, and the explain output names file kinds, so the mapping to a target is mechanical. This is the file's whole purpose. |
| Finish 4 (Important, advisory). The instruction says what evidence each finding must carry. | Pass | | Line 38, name the command and say why. Line 47, say which check did not run. Lines 53 to 54, say what you saw. |
| Finish 5 (Advisory, always). The finish check sits late in the document. | Pass | | Lines 45 to 48 and 55 to 66, at the end. |
| Failure 1 (Blocking, always). Conditions that should stop the work are stated. | Pass | | Lines 38 to 39, do not run a command whose reach you cannot bound. Lines 52 to 54, if nothing changes, do not run it again. The file never stops the wider audit, which lines 30 to 31 make deliberate. |
| Failure 2 (Important, always). A retry limit is named, and something must change before a retry. | Pass | | Lines 51 to 53. Both halves, exactly as the rule asks. |
| Failure 3 (Blocking, changes something). Weakening the check or editing the test to make it pass is forbidden. | Pass | | Lines 30 to 31, 39, and 45 to 48. It forbids presenting a non-lint result as a lint result and forbids accepting a pass that never opened the target, which is the failure mode the rule guards. |
| Failure 4 (Blocking, advisory). What to do where input is missing, unexpected, or cannot be assessed, with a status for each case. | Fail | Difference | The three cases at lines 32 to 48 map onto the rule's three exactly, and each carries a stated action. None carries a named status value. Two reports of the same case can label it differently, though line 47's "coverage gap" comes close to a name. Named statuses are a hand-off concept, and this file's own use is not a hand-off, so the letter fails and no wrong action follows. |
| Failure 5 (Advisory, always). The stop conditions sit directly after the finish check. | Pass | | Lines 50 to 54 follow the coverage check at lines 45 to 48. |
| Calibration 1 (Blocking, advisory). Examples of what counts are given. | Pass | | Lines 8 to 9 and 51 to 52. |
| Calibration 2 (Blocking, advisory). Examples of what does not count are given. | Pass | | Lines 9 to 10, judgment is not a lint check. Lines 45 to 46, this case looks like a pass and is not one. |
| Calibration 3 (Blocking, advisory). The default outcome is stated, so the agent justifies escalating rather than approving. | Pass | | Lines 45 to 46 and 48. A clean run is not a pass until coverage is established, and nothing fails when the gap is found. Both directions of the default are named for the decision this file owns. |
| Calibration 4 (Important, advisory). Where a run showed a miss, the shape of the miss is described, not its label. | Pass | | Lines 47 to 48. A lint can report every file up to date while never opening the file you audit. That is the shape, and line 66 gives the observed count. |
| Composition 1 (Important, reused). Every named hole in a template is required or carries a default. | Not applicable | | The file is a procedure, not a template with holes. |
| Composition 2 (Advisory, reused). The set of template fields is fixed and gathers no unused payload. | Not applicable | | No template and no field set. |
| Composition 3 (Important, changes something). What happens to partial work when a run stops is stated. | Pass | | Lines 51 to 54. Record that the command could not run and say what you saw. |
| Voice 1 (Important, always). A sentence that instructs names its actor, and that actor can choose to act. | Pass | | Imperatives throughout, at lines 14, 24, 33, 38, and 57, which name the reader as the actor. |
| Voice 2 (Blocking, always). A property sentence keeps the property's owner as its subject and gains no actor. | Pass | | Lines 3, 10 to 11, and 12 keep the owner as subject and import no hidden actor. |
| Voice 3 (Important, always). Nothing that cannot choose to act takes an action verb. | Fail | Difference | Lines 64 to 66, "A description written out in this file could disagree with the lint" and "the command cannot disagree with what the lint does". A description cannot disagree with anything. This is the pattern `steering-rules.md` lines 189 to 196 names as bad, and its fix is to say what a reader meets instead. Line 11, "Each repository decides", is the same family. Lines 57 to 58 already tell the agent what to do, so no wrong action follows. |

## 3. Counts by severity

Fails and warns:

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 4 | 0 | 4 |
| Important | 1 | 0 | 1 |
| Advisory | 0 | 0 | 0 |
| All | 5 | 0 | 5 |

Defects: 2. Differences: 3.

Rule outcomes across all 36 rules: 29 pass, 2 not applicable, 5 fail, 0 warn. Not applicable is not
a pass. No rule was marked warn, because nothing in this file was undecidable from what I could
read.

Two blocking defects, Context 1 and Method 2, mean the target needs work before use. Both bite only
outside this checkout. The two blocking differences do not hold the target back. Read them as
signals about the rules.

## 4. The three fixes to make first

1. **Name the repository in the last section.** Context 1, blocking defect. Change the heading at
   line 55 from `In this repository` to the wording the file already uses at line 20, "In this
   plugin's own repository", and say at line 57 that an agent working anywhere else follows the
   lookup at lines 14 to 24 instead. Right now the section that tells an agent how to establish
   coverage is the section most likely to mislead one working in another repository, which is the
   case the file was written for.
2. **Remove the ordering conflict in step 2.** Method 2, blocking defect. Line 20's "Try it before
   anything else" contradicts line 14's "Look for it in this order". Replace it with wording that
   keeps step 1 first, such as "Try it before step 3".
3. **State the no-modify rule.** Scope 6, blocking difference. The file directs an investigation
   but never says the agent leaves the target alone. Add it here, or in `steering-rules.md` so both
   shared rule files inherit it, and word it so it still allows the recording step at line 23 and
   `writing-agents`, which writes files under the same rules.

Failure 4 and Voice 3 are real against the letter of the rules and neither points at a wrong
action. Treat them as lower priority than the three above.

## 5. Anything I did that nobody asked for

- Read `auditing-skills/SKILL.md` in full and part of `writing-agents/SKILL.md`. Neither is a
  target. I needed them to establish which conditions match this file's own use, and to find where
  obligations this file does not carry are discharged.
- Read `AGENTS.md`, and the parts of `DECISIONS.md` and `TEST_REPORT.md` that name this file.
  `DECISIONS.md` line 303 and `TEST_REPORT.md` line 46 are load-bearing for the hand-off
  determination.
- Confirmed the plugin ships through `marketplace.json` and `.claude-plugin/marketplace.json`. The
  Context 1 finding rests on this file reaching repositories other than its own, so I checked
  rather than assumed.
- Decided the hand-off condition myself rather than asking. The reasoning is in section 1 so it can
  be overturned without redoing the audit.
- Applied the **changes something** condition on the strength of one branch at lines 22 to 24. A
  reader who thinks that branch delegates the write entirely would drop three rows, Finish 1,
  Failure 3, and Composition 3, from pass to not applicable. No finding depends on it.
- Ran `git log` and `git status` to confirm the stated commit and clean tree. Both matched.
- Changed no file except this report.
