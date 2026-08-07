# Re-audit, round 3: handoff-rules.md

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/handoff-rules.md`
Rules: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`
Prior report: `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits-round2/handoff-rules.md`, which audited this target at commit `d015e2e`.
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
any file over 100 lines. This target is `plugins/steering/shared/handoff-rules.md`, so it is a
reference surface.

**The lint reached the target, with one check that ran and one that did not apply.** Reference
resolution ran and passed. The contents-list check did not apply: the file is 78 lines and the check
starts above 100. These checks did not run on it at all: frontmatter hazards, name format and length,
description length, and body line count. The explain output states that reference surfaces carry no
frontmatter, so those do not apply to this kind of file. Coverage above is taken from the explain
command, not from prose, which is what `./lint.md` lines 45 to 53 require.

I re-derived no mechanical limit by hand. One exception, disclosed, and the same one both prior
reports made: to judge the Context rules I confirmed by hand that `./steering-rules.md` sits next to
the target, and that `plugins/steering/skills/auditing-skills/SKILL.md` and
`plugins/steering/skills/writing-agents/SKILL.md` exist and hold what lines 11 to 13 say they hold.
Reference resolution passing does not say which references resolved, and lines 11 to 13 name two
skills by bare name rather than by path, so the lint would not have covered them in any case.

### Conditions applied, and why

Applied: **always**, **advisory**, **reused**. Not applied: **hand-off**, **changes something**,
**describes work**.

**describes work: does not hold.** This is my call, not the file's. Line 11 claims it
("This file supplies criteria and defines no task of its own") and `steering-rules.md` line 52 tells
me to treat that as a claim to check. I checked it and it holds.

- The test at `steering-rules.md` lines 56 to 58 asks for the outcome. This file names nothing a
  reader finishes. It is twenty rule rows, a severity convention, and one worked example of a rule
  readers misread.
- The task that applies them is defined elsewhere and I confirmed it: `auditing-skills/SKILL.md`
  lines 47 to 63 is a five-step workflow ending in a report, and `writing-agents/SKILL.md` lines 35
  to 58 is a seven-step workflow ending in a dispatch.
- Lines 7 to 9 ("mark the rule warn. State what you could not determine. Do not guess either way")
  are the one thing that looks like a procedure. `steering-rules.md` lines 60 to 63 exclude it by
  name: "A rule catalogue often says ... 'mark the rule warn where you cannot tell'. Those sentences
  belong to a task defined elsewhere." This is the tension the round-2 report recorded and declined
  to escalate. The new test resolves it rather than leaving it to the auditor's charity.

So the nine rules conditioned on **describes work** do not apply: the four Method rules, Finish 2 and
Finish 5, and Failure 1, 2 and 5. Whether the remaining five rules in those three sections also drop
is a live ambiguity, and it is new finding 1 below.

**hand-off: does not apply to this file's own use.** Same call as the round-2 report, made again and
by me. The condition asks whether the agent reading the document will not see the author's
conversation; for a shared reference file the honest answer is "sometimes", so it has to be settled
on the document's own use. This file returns no artifact to any caller. Its own Return cluster at
lines 55 to 56 says why that matters: "A report matters where results cross a context boundary."
Applying hand-off would turn this file's twenty rules on itself and demand a report format, a status
set and caller obligations from a file that dispatches nothing. If that call is overturned, the
twenty rows in this file's own tables turn on it and the result changes substantially.

**advisory** applies: the work these rules govern reviews and changes nothing. **reused** applies: a
shared rule file consulted across many runs. **changes something** does not: nothing here directs a
file or state change.

## 2. Prior findings

The round-2 report left three findings open. None retired, one confirmed, two changed.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| Scope 3 (Blocking, always). Line 11 names two skills as the appliers with no membership test and no examples marker. Was: Fail, **defect**. | **Confirmed, and downgraded to a difference** | Line 11 is unchanged: "The skills `auditing-skills` and `writing-agents` apply these rules." Still a closed list, and still incomplete: `steering-rules.md` line 25 routes any reader meeting **hand-off** here whatever it is running, and this audit applied the file while running neither named skill. What changed is the consequence. Round 2 named the wrong action as reading line 13 and hunting for machinery in two skills it was not running. Line 13 no longer says that. It now says "every procedural property an audit needs lives in the skill that runs it", which sends every reader to its own skill regardless of the list above it. I can no longer name what an agent does wrong, so this is now a difference. |
| Context 2 (Blocking, always). Line 13 claimed the stop conditions and the evidence rule live in those two skills. `writing-agents` has no evidence rule. Was: Fail, difference. | **Changed** | The false specific claim is gone. Lines 12 to 13 now generalise: "So every procedural property an audit needs lives in the skill that runs it." The problem survives in weaker form, because the universal claim is still not true of one of the two skills named one sentence earlier. `writing-agents/SKILL.md` step 5 (lines 50 to 51) runs an audit and the skill supplies no evidence rule, no pass/fail/warn marking and no report for it. Still a difference on the same grounds round 2 gave: that audit is a self-check before dispatch with no consumer for the evidence rule, so no wrong action follows. |
| Scope 6 (Blocking, advisory). No statement that the agent must not modify anything, and none of what to do where a fix looks obvious. Was: Fail, difference. | **Changed** | Still absent from the file itself, so the rule's letter still fails. What changed is reach. Round 2's objection was that line 13 named only the stop conditions and the evidence rule as delegated, so nothing told a reader the no-edit rule was also elsewhere. Line 13 now delegates every procedural property, and `auditing-skills/SKILL.md` line 36 carries it: "This audit does not edit the target. Where a fix is obvious, name it in the report." Still a difference, and the narrowing is still right: a blanket no-edit statement here would contradict `writing-agents`, which reads this same file to write files. |

### Two rows round 2 retired by rule change, revisited

Round 2 retired Finish 3 and Finish 4 because the **catalogue** condition scoped out the whole Finish
section. **catalogue** is gone. Under my reading of the replacement they stay not applicable, so
those retirements hold. Under the competing reading they both revive, together with Failure 4. That
is new finding 1, and the swing is two Blocking rows and one Important row on this file.

## 3. New findings

Only findings the round-2 report does not contain. One.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| `steering-rules.md` lines 64 to 67 conflict with the Applies-when column of the same file's Finish and Failure tables. Severity assigned Blocking, because it decides whether two Blocking rules run against this target. | Blocking | **Fail** | **Defect** | Lines 64 to 65 say "Where **describes work** fails, the Method, Finish, and Failure rules **below** do not apply", and the reason at lines 66 to 67 is about the whole section: "Where a document defines no task, none of the three has anything to test." But the Applies-when column conditions only nine of those fourteen rows on **describes work**. The other five carry **changes something** or **advisory**: Finish 1 (line 140), Finish 3 (line 142), Finish 4 (line 143), Failure 3 (line 152), Failure 4 (line 153). This target meets **advisory**, so the two readings disagree about three rows on it. Prose reading: Finish 3, Finish 4 and Failure 4 are not applicable. Column reading: all three apply, and all three fail, because "fixed enough" at line 61 carries no test, no evidence rule is stated, and lines 7 to 9 give one status ("warn") for one of the three cases the rule names. What an agent does wrong: two auditors of this file return Blocking counts of 1 and 3 on consecutive runs and hand the author contradictory instructions, which is the same shape the round-2 report filed against `dispatch-protocol.md` for the old carve-out's reach. The root cause is in `steering-rules.md`, not in this target. It surfaces here because this is the file whose condition set makes the two readings diverge. I took the prose reading, because lines 66 to 67 give a reason and the word "below" scopes it to that file. |

All other rules pass or are not applicable. Rule outcomes across the 36 rules in `steering-rules.md`:
19 pass, 14 not applicable, 3 fail, 0 warn. Not applicable is not a pass.

Three things I checked and did not escalate, recorded so a later pass does not spend the time again.

- Line 7 repeats `steering-rules.md`'s "Any blocking failure means the document needs work before
  use". `auditing-skills/SKILL.md` lines 139 to 143 reconciles that sentence with its own narrower
  rule that only a defect blocks, but it names only `steering-rules.md`, not this file, which carries
  the identical sentence. The reconciling reason generalises cleanly (this file has no defect and
  difference marking either), so a reader who follows it gets the right answer. It also maps to no
  rule in `steering-rules.md`, which is why it sits here rather than in the table.
- Line 11's "The skills ... apply these rules" gives an action verb to a document, which `Voice`
  line 196 forbids for anything that cannot choose. Read as a property sentence with the property's
  owner as its subject, which is the form `steering-rules.md` lines 216 to 220 blesses, it passes. I
  did not escalate it. The same construction is used across the plugin.
- Lines 18 to 25 give a worked bad and good example of the rule readers misread. That satisfies
  Calibration 1, 2 and 4, and Context 3. All pass.

### On the two deliberate changes, judged rather than reported as drift

The **describes work** condition works on this file, and it works better than **catalogue** did.
Round 2 had to record a tension it chose not to escalate: the file claimed "no workflow of its own"
while lines 7 to 9 direct work. The new test at `steering-rules.md` lines 60 to 63 names that exact
sentence pattern and rules it out of the test, so the auditor no longer has to be generous. Moving
the condition into the Applies-when column also stopped it exempting fourteen rules at once. The one
thing it did not carry over is the prose at lines 64 to 67, which still speaks in whole sections.
That is new finding 1.

The lint's advisory channel and contents-list check do not reach this file, which is 78 lines. The
advisory channel behaved as `--explain` describes it: it printed a finding against a different file
and the run still exited clean.

## 4. Counts by severity

New findings:

| Severity | Fail | Warn | Defects | Differences | Total |
| --- | --- | --- | --- | --- | --- |
| Blocking | 1 | 0 | 1 | 0 | 1 |
| Important | 0 | 0 | 0 | 0 | 0 |
| Advisory | 0 | 0 | 0 | 0 | 0 |
| **Total** | **1** | **0** | **1** | **0** | **1** |

Surviving prior findings:

| Severity | Fail | Warn | Defects | Differences | Total |
| --- | --- | --- | --- | --- | --- |
| Blocking | 3 | 0 | 0 | 3 | 3 |
| Important | 0 | 0 | 0 | 0 | 0 |
| Advisory | 0 | 0 | 0 | 0 | 0 |
| **Total** | **3** | **0** | **0** | **3** | **3** |

Combined: 4 open findings, all Blocking, 1 defect and 3 differences.

Round 2 for comparison: 3 open, 1 defect and 2 differences. The count rose by one but the defect
count did not. Round 2's one defect became a difference, and the one new defect is in the rules file
rather than in the target.

One blocking defect means the target needs work before use, but the work is in
`steering-rules.md` lines 64 to 67, not here. The three blocking differences do not hold the target
back. Read those as signals about the rules rather than about the file.

## 5. Anything I did that nobody asked for

- Made the **describes work** call myself and wrote the reasoning into section 1 rather than only
  reporting which way I went, so it can be overturned without redoing the audit. The same for the
  hand-off call, which nobody asked me to make for this target.
- Read `auditing-skills/SKILL.md` and `writing-agents/SKILL.md` in full. Neither is a target. Lines
  11 to 13 make a claim about both, and two rows in section 2 exist only because I checked it.
- Checked whether the five Finish and Failure rows not conditioned on **describes work** apply to
  this target. Nobody asked. It is the whole of new finding 1, and it changes the Blocking count by
  two either way.
- Ran `git diff d015e2e d72544f` over the target and over `steering-rules.md`, to separate what the
  commit changed from what it left alone. The target changed by three lines. That is why the Scope 3
  row is confirmed on unchanged text rather than quietly retired.
- Ran `grep` for inbound references to this file across the repository, excluding `tests/`. That is
  how I established that line 11's list is still incomplete rather than merely short:
  `auditing-skills/SKILL.md` line 18 and `writing-agents/SKILL.md` lines 41, 51 and 89 reference it,
  and `dispatch-protocol.md` line 4 leans on it while naming a different applier.
- Ran `git log` and `git status` to confirm the stated commit and clean tree. Both matched.
- Changed no file except this report and its two siblings in `/tmp/ste-audit-3/`.
