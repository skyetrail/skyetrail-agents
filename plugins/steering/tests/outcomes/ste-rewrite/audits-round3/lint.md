# Re-audit, round 3: lint.md

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/lint.md`
Rules: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`
Prior report: `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits-round2/lint.md`, which audited this target at commit `d015e2e`.
Repository at commit `d72544f`, working tree clean. Nothing was edited, staged, or committed. The
only file written is this report.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
lint (advisory): plugins/steering/SUMMARY.md: is 193 lines and has no "## Contents" heading; a reference file over 100 lines opens with a contents list
All generated files are up to date.
```

The run exits clean. The one advisory is against `plugins/steering/SUMMARY.md`, not against this
target.

`npm run lint -- --explain` reports that a top-level `.md` under a plugin's `shared/` is a reference
surface, and that reference surfaces get reference resolution plus an advisory contents-list check on
any file over 100 lines. This target is `plugins/steering/shared/lint.md`, so it is a reference
surface.

**The lint reached the target, with one check that ran and one that did not apply.** Reference
resolution ran and passed. The contents-list check did not apply: the file is 75 lines and the check
starts above 100. These checks did not run on it at all: frontmatter hazards, name format and length,
description length, and body line count. The explain output states that reference surfaces carry no
frontmatter, so those do not apply to this kind of file. Coverage above is taken from the explain
command, not from prose. That is this target's own instruction at lines 66 to 67, followed.

The two commands also exercise the target's own procedure end to end. Step 1 at lines 23 to 24 finds
the recorded command in the repository's `AGENTS.md`, and the last section at lines 66 to 71 supplies
the explain call. Both worked as written, as they did in round 2.

I re-derived no mechanical limit by hand. One exception, disclosed, and the same one round 2 made: to
judge the Context rules I confirmed by hand that `AGENTS.md` exists at the repository root and holds a
`repo-setup` block naming `npm run lint`, and that `plugins/steering/skills/repo-setup/SKILL.md`
exists. Reference resolution passing does not say which references resolved, and `repo-setup` is named
by bare skill name rather than by path, so the lint would not have covered it in any case.

### Conditions applied, and why

Applied: **always**, **advisory**, **reused**, **changes something**, **describes work**. Not
applied: **hand-off**.

**describes work: holds.** This is my call. The replacement condition is decided on the outcome
(`steering-rules.md` lines 56 to 58), not on the presence of an imperative, and this file has one:
the mechanical limits for a target are settled, or the gap that stops them being settled is reported.
Lines 3 to 6 state it. Lines 18 to 29 are an ordered lookup that ends in a command. Lines 31 to 58
say what to do in each way it can fail. That is a task a reader finishes, not criteria that a task
defined in another document applies. So all fourteen Method, Finish and Failure rules apply to this
target.

This is the same call round 2 made about the old **catalogue** condition, and the file is right not
to claim the condition: `handoff-rules.md` and `dispatch-protocol.md` both declare "defines no task
of its own" and this one does not.

**changes something** applies, and the file settles it rather than leaving it to be inferred. Line 10:
"Recording a confirmed command through `repo-setup` is the one change this file asks for."
**advisory** applies: the work this file directs investigates and changes the target nothing.
**reused** applies: a shared file consulted across many runs. **hand-off** does not: a reference file
consulted inside a live session returns no artifact across a context boundary.

This file declares no parent. Lines 3 to 6 state its own purpose and it is read on its own terms.

## 2. Prior findings

The round-2 report left four findings open. One retired, one changed, two confirmed.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| Scope 3 (Blocking, always). Line 8's prohibition named a closed list of three, "Do not edit the target, the lint script, or its configuration", with no membership test and no trailing generalisation. Was: Fail, **defect**. | **Retired** | Lines 7 to 10 now put the membership test first and the examples second, which is the form `steering-rules.md` lines 100 to 111 asks for: "Change nothing at all to make a check reach further or to make it pass. The target, the lint script, its configuration, an ignore file, a CI definition, and a fixture are examples, not the whole list." The four things round 2 named as the wrong action (an ignore file, a CI workflow, a per-directory config, a fixture) are now either named or covered by the test. The one fix round 2 recommended, taken in a stronger form than it asked for. |
| Scope 6 (Blocking, advisory). No blanket statement that the agent must not modify anything. Was: Fail, difference. | **Changed** | Materially closer, still not the rule's letter. "Change nothing at all" is now the subject of the prohibition rather than a list of three, but it stays scoped by purpose, "to make a check reach further or to make it pass". An agent modifying the target for an unrelated reason is not stopped by this sentence. Still a difference, and the narrowing is still right: a blanket statement would contradict line 10's own permitted recording step and `writing-skills`, which edits targets under the same rules. `auditing-skills/SKILL.md` line 36 carries the blanket form for anyone auditing, so no wrong action follows. |
| Failure 4 (Blocking, advisory). The three cases each carry a stated action but none carries a named status value. Was: Fail, difference. | **Confirmed** | Unchanged. Lines 33 to 58 still give three cases with actions and no status names. Line 51's "report a coverage gap" is still the closest thing to a name. Still a difference: named statuses are a hand-off concept, this file's own use is not a hand-off, and no wrong action follows. |
| Voice 3 (Important, always). "A description written out in this file could disagree with the lint" and "the command cannot disagree with what the lint does". A description cannot disagree with anything. Was: Fail, difference. | **Confirmed** | Unchanged, at lines 73 to 75. `steering-rules.md` line 222 still names this exact case: "Bad, because a file cannot disagree with anything". Line 15, "Each repository decides which checks its own lint performs", is the same family and also unchanged. Still a difference: lines 66 to 67 already tell the agent what to do, so no wrong action follows. |

Round 2 retired two further findings by edit, Context 1 (the unnamed repository in the heading) and
Method 2 (the contradictory lookup order). I confirmed both texts are still in place, at lines 60 to
64 and lines 25 to 26. Both stay retired.

## 3. New findings

Only findings the round-2 report does not contain. One.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| Scope 3 (Blocking, always). Where a category of work is named, a membership test defines it. Any list of kinds carries a marker saying they are examples, not the whole set. | Blocking | **Fail** | Difference | Line 33: "There are three cases. They are not the same." That is a closed enumeration of the ways the lint fails to settle a target, with no membership test and no examples marker, and the sentence goes out of its way to assert the closure. The file itself already meets a situation outside the three, at lines 54 to 58: "Sometimes a run fails without settling which case applies." The lint has also since gained an advisory channel, so a run can now exit clean, reach the target and still report a finding against it, which is a fourth thing a reader may meet and which line 33 does not admit exists. I cannot name what an agent does wrong, which is why this is a difference: I ran the command, met the advisory, and recorded it without difficulty, and the section is titled "When it does not settle the target", which an advisory finding does not do. The fix is the same one clause the file already applies at line 9: "or any other case where the command does not settle the target". |

All other rules pass or are not applicable. Rule outcomes across the 36 rules in `steering-rules.md`:
31 pass, 2 not applicable, 3 fail, 0 warn. Not applicable is not a pass. No rule was marked warn,
because nothing in this file was undecidable from what I could read.

Four things I checked and did not escalate, recorded so a later pass does not spend the time again.

- **The strengthened prohibition and the permitted change now overlap.** Line 8 says "Change nothing
  at all to make a check reach further", and recording a confirmed command in `AGENTS.md` does make a
  check reach further on the next run. Under the old three-item list there was no overlap, because
  `AGENTS.md` was not on the list. The carve-out is stated in the very next sentence, at line 10, and
  it says "the one change this file asks for", so a reader reaching step 3 at lines 27 to 29 has the
  answer two lines above. No wrong action follows. This is the closest thing to a new problem
  introduced by the round-3 fix, and it does not clear the bar.
- **The examples list at lines 8 to 9 has no head noun.** "The target, the lint script, its
  configuration, an ignore file, a CI definition, and a fixture are examples, not the whole list"
  could attach to the reading sentence before it as well as to the prohibition. Both readings are
  harmless, since one permits reading and the other forbids changing.
- **The advisory channel is not described in this file, and should not be.** The fact that a clean
  run can carry a finding is not written out here, but lines 66 to 67 send the reader to
  `npm run lint -- --explain`, which states it: "An advisory finding prints and never stops the run."
  So Context 2 passes by pointer, and it passes by the mechanism this file was rewritten four times
  to establish. This is the design working.
- **Step 3 at line 27 still opens with a flat assertion** where steps 1 and 2 are conditional. Round
  2 checked this and passed it. Unchanged, and the ordered lookup means it is only ever read when it
  is true.

### On the deliberate changes, judged rather than reported as drift

Two changes reach this file. The **describes work** condition replaced **catalogue**, and this file
correctly meets neither exemption, so its Method, Finish and Failure rules are judged on their merits
as they were in round 2. All eleven of the fourteen that apply on their other conditions pass except
Failure 4, which is the confirmed difference above. Failure 2 is worth naming as a pass: lines 54 to
58 give a retry limit and require something to change first, which is exactly what the rule asks and
is rarer than it should be.

The lint's advisory channel and contents-list check do not reach this file, which is 75 lines. The
advisory channel behaved as `--explain` describes it.

**This is the first round in three where the fix did not introduce a defect.** Round 2 recorded that
each of the two prior rounds introduced a new defect while fixing an old one. The round-3 edit to
lines 7 to 10 closed the round-2 defect and the only new finding is a difference on unchanged text.

## 4. Counts by severity

New findings:

| Severity | Fail | Warn | Defects | Differences | Total |
| --- | --- | --- | --- | --- | --- |
| Blocking | 1 | 0 | 0 | 1 | 1 |
| Important | 0 | 0 | 0 | 0 | 0 |
| Advisory | 0 | 0 | 0 | 0 | 0 |
| **Total** | **1** | **0** | **0** | **1** | **1** |

Surviving prior findings:

| Severity | Fail | Warn | Defects | Differences | Total |
| --- | --- | --- | --- | --- | --- |
| Blocking | 2 | 0 | 0 | 2 | 2 |
| Important | 1 | 0 | 0 | 1 | 1 |
| Advisory | 0 | 0 | 0 | 0 | 0 |
| **Total** | **3** | **0** | **0** | **3** | **3** |

Combined: 4 open findings, 0 defects and 4 differences.

Round 2 for comparison: 4 open, 1 defect and 3 differences. The count is the same and the defect is
gone.

**No open finding on this target is a defect, so nothing here holds the target back.** Read the four
blocking and important differences as signals about the rules rather than about the file. Three of
the four turn on the same thing: the rules ask a reference document consulted inside a live session
for named statuses and a blanket no-edit clause, and this file's use supplies neither a caller nor a
report for them to serve.

## 5. Anything I did that nobody asked for

- Ran the file's own procedure while auditing it, rather than only reading it. Step 1 finds the
  recorded command in `AGENTS.md` and the last section supplies the explain call. Both worked, which
  is evidence about the target that reading alone would not give.
- Made the **describes work** call myself and wrote the reasoning into section 1, including why this
  file is right not to claim the condition while two of its siblings do.
- Checked whether the round-3 fix at lines 7 to 10 collides with the permitted recording step at line
  10, and whether the new examples list is ambiguous about what it exemplifies. Neither cleared the
  bar. They are in section 3 rather than dropped, because the caller asked specifically for fixes
  that introduce new problems and I want the negative result on the record.
- Checked whether the lint's new advisory channel leaves a gap in this file, since it is the file
  that tells agents how to read a lint result. It does not, because the file sends the reader to
  `--explain` rather than describing the lint itself.
- Ran `git diff d015e2e d72544f` over the target and over `steering-rules.md`, to separate what the
  commit changed from what it left alone. The target changed by four lines, all in the one paragraph.
- Ran `grep` for inbound references to this file across the repository, excluding `tests/`. Four
  consumers: `auditing-skills/SKILL.md` lines 49 and 51, `writing-skills/SKILL.md` line 62,
  `skill-rules.md` line 13, and `DECISIONS.md`. Nobody asked, and it is how I satisfied myself that
  the purpose-scoped prohibition does not contradict a skill that legitimately edits files.
- Ran `git log` and `git status` to confirm the stated commit and clean tree. Both matched.
- Changed no file except this report and its two siblings in `/tmp/ste-audit-3/`.
