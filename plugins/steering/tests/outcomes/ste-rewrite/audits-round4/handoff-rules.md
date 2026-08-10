# Re-audit, round 4: handoff-rules.md

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/handoff-rules.md`, 78 lines, unchanged in count.
Rules: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`.
Prior report: `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits-round3/handoff-rules.md`, which audited this target at commit `d72544f`.
Repository at commit `19459c8`, working tree clean. Nothing was edited, staged, or committed.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
lint (advisory): plugins/steering/SUMMARY.md: is 193 lines and has no "## Contents" heading; a reference file over 100 lines opens with a contents list
All generated files are up to date.
```

The run exits clean. The one advisory names `plugins/steering/SUMMARY.md`, not this target.

**The lint reached the target, with one check that ran and one that did not fire.**
`npm run lint -- --explain` names a top-level `.md` under a plugin's `shared/` as a reference surface,
and says a reference surface gets reference resolution. It also says any `.md` over 100 lines gets an
advisory contents-list check, "whether it is a reference surface or a file some component links to".

- Reference resolution. The target names `./steering-rules.md` at lines 4 and 6. It resolves. Pass.
- Contents list. The target is 78 lines, under the 100-line threshold, so the check reached the file
  and had nothing to say. The file did not change length this round.

**Checks that did not reach the target.** Frontmatter hazards, name format and length, description
length, and body line count. `--explain` says those run over components only, and that a reference
surface carries no frontmatter. Stated exclusion, not a coverage gap. Same result as the prior report.

I re-derived no mechanical limit by hand as a rule verdict. One exception, disclosed, and the same one
all three prior reports made: to judge the Context rules I confirmed by hand that
`plugins/steering/skills/auditing-skills/SKILL.md` and
`plugins/steering/skills/writing-agents/SKILL.md` exist and hold what lines 11 to 13 say they hold.
Reference resolution does not report which references resolved, and lines 11 to 13 name two skills by
bare name rather than by path, so the lint would not have covered them in any case.

### Conditions established for the target

| Condition | Met | Why |
| --- | --- | --- |
| always | yes | By definition. |
| hand-off | **no, and now settled by the rules file rather than by me** | `steering-rules.md` line 61, new this round: "A file of rules for writing hand-off prompts is not itself a hand-off, because the agent reading it sits in the conversation its author is having." That is this file by name. Line 63 of that file also says to record which way you went, so: not a hand-off. Two prior audits called this opposite ways and both had to argue it from first principles. Neither has to now. |
| reused | yes | A shared rule file consulted across many runs. |
| describes work | no | Line 11 claims it and `steering-rules.md` lines 56 to 58 says to check the claim. It holds. The file is twenty rule rows, a severity convention, and one worked example. `auditing-skills` lines 47 to 63 and `writing-agents` lines 35 to 58 define the tasks that apply it. Lines 7 to 9, "mark the rule warn", are ruled out of the test by `steering-rules.md` lines 69 to 72. |
| advisory | not applicable | `steering-rules.md` lines 74 to 76, new this round. All three fail together. |
| changes something | not applicable | Same line. |

Because **hand-off** is not met, none of this file's own twenty rules applies to itself. That is by
design and lines 55 to 56 say why.

Twenty-two of the thirty-seven rows in `steering-rules.md` are not applicable: eleven carrying
**describes work**, eight carrying **advisory**, three carrying **changes something**. Composition
rows 1 and 2 are also not applicable, because the target is not a template. Thirteen rows were live
and I worked all of them. The prior round judged this target against twenty-two rows. The applicable
set shrank by nine, entirely because of the new lines 74 to 76.

## 2. Prior findings

The prior report left three findings open in its section 2 and one new finding in its section 3. It
also revisited two rows it had retired by rule change. All are below.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| **Scope 3 (Blocking, always).** Line 11 names two skills as the appliers with no membership test and no examples marker. Was: confirmed, difference. | **confirmed** | Line 11 is unchanged: "The skills `auditing-skills` and `writing-agents` apply these rules." Still closed, still incomplete. `steering-rules.md` lines 29 to 31 routes any reader meeting **hand-off** here whatever it is running, and this audit applied the file while running neither named skill. Still a difference, on the prior report's grounds: line 13 sends every reader to its own skill regardless of the list above it, so I cannot name what an agent does wrong. Worth recording that I read the same shape as a near miss on `steering-rules.md` line 13. The difference is that the list there is complete, which I checked by grep, and this one is not. |
| **Context 2 (Blocking, always).** Lines 12 to 13 claim every procedural property lives in the skill that runs it, which is not true of `writing-agents`. Was: changed, difference. | **confirmed** | Unchanged text: "So every procedural property an audit needs lives in the skill that runs it." `writing-agents/SKILL.md` step 5 runs an audit and supplies no evidence rule, no marking, and no report for it. Still a difference on the same grounds: that audit is a self-check before dispatch with no consumer for the evidence rule. Newly worth saying, because it was not true last round: the two sibling files carrying this same sentence both had it softened this round. `skill-rules.md` lines 8 to 10 and `steering-rules.md` lines 13 to 15 now read "Where a procedural property an audit needs is missing here, look in ...". This file kept the untrue universal. The fix exists two files over and was not applied here. |
| **Scope 6 (Blocking, advisory).** No statement that the agent must not modify anything, and none of what to do where a fix looks obvious. Was: changed, difference. | **retired, by scoping** | The text is still absent, so the rule's letter would still fail if the row ran. It does not run. The row at `steering-rules.md` line 111 carries **advisory**, which lines 74 to 76 now marks not applicable for this file. The target did not change. The condition did. `auditing-skills` line 36 carries the blanket form for anyone auditing in any case. |
| **Round 3 new 1 (Blocking, defect).** `steering-rules.md` prose claimed the Method, Finish, and Failure sections drop out whole, while the column conditioned only nine of their rows, so two auditors of this file returned Blocking counts of 1 and 3. | **retired** | The prose is gone. `steering-rules.md` lines 78 to 80 replace it: "Read the Applies-when column for what drops out, one row at a time." The three rows that swung on this target were Finish 3, Finish 4, and Failure 4, and all three carry **advisory**, which lines 74 to 76 now marks not applicable. So both readings now agree, and they agree on the answer the prose gave. This was the prior round's only new finding and the round removed it. |
| **Two rows revisited.** Round 2 retired Finish 3 and Finish 4 because the old condition scoped out the whole Finish section. Round 3 kept them not applicable under a reading it had to choose. | retired, stays retired | Both stay not applicable, now by a stated mechanism rather than a chosen reading. Both rows carry **advisory** at `steering-rules.md` lines 155 and 156. |

**Prior finding counts.** Retired 2. Confirmed 2. Changed 0.

## 3. New findings

Only findings the prior report does not contain. I worked all thirteen live rows again. The file
changed by two lines this round, both Composition rows, and both new findings and near misses below
sit on that text.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| **1. Scope 3.** Where a category of work is named, a membership test defines it. Any list of kinds carries a marker saying they are examples, not the whole set. | Blocking | fail | difference | **This is a fix that introduced a new problem.** Line 72 was rewritten from "Any determination a script could make deterministically is made by a script, not by a dispatched agent or read by hand" to "A script makes every determination that runs deterministically. Nothing else settles one." The old wording carried the membership test in its own words: could a script make this determination? The new wording names the category by a property of the determination, "that runs deterministically", and gives no test for it. A determination does not run; a script does. So an auditor checking a hand-off prompt that asserts "the working tree is clean at commit X" has two readings. Under the old wording the test was plain, since `git status` could settle it, so it had to be scripted. Under the new wording the auditor can ask whether that determination "runs deterministically", find that it was not run at all but made by hand, and pass the prompt. That is the exact case the rule exists to catch. Marked a difference rather than a defect because the charitable reading, where "runs deterministically" means "always returns the same answer", preserves the rule and is probably what was meant, and I cannot say with confidence which reading an auditor lands on. The fix is to put the old test back in the new sentence: "A script makes every determination a script could make. Nothing else settles one." |

### Near misses I did not escalate

- Line 74 was rewritten in the same commit and is a clean strengthening. "The model or effort level is
  named explicitly ... This keeps two runs of the same prompt comparable" became "The model and the
  effort level are both named explicitly ... Naming one and inheriting the other still leaves two runs
  incomparable." The "or" that let an author satisfy the rule by naming one of two is gone, and the
  reason now names the failure mode instead of the benefit. Recorded because the caller asked for
  fixes that introduce new problems, and this one is the negative result: it introduces none.
- Line 7 repeats `steering-rules.md`'s "Any blocking failure means the document needs work before
  use". `auditing-skills` lines 145 to 149 reconciles that sentence with its own narrower rule that
  only a defect blocks, but it names only `steering-rules.md`, not this file, which carries the
  identical sentence. The reconciling reason generalises cleanly, so a reader who follows it gets the
  right answer. The prior report recorded this too and I agree with leaving it.
- Line 11's "The skills ... apply these rules" gives an action verb to a document. Read as a property
  sentence with the property's owner as its subject, which `steering-rules.md` lines 228 to 233
  blesses, it passes. The same construction runs across the plugin.
- Line 15, "Readers misread the rule about detail and summary most often", points at readings the
  agent cannot read. The worked example at lines 18 to 25 makes the pointer unnecessary, so nothing
  depends on it.
- Lines 18 to 25 give a worked bad and good example of the rule readers misread. Under the new
  scoping the Calibration rows those examples satisfy are not applicable to this file, so the
  examples now earn nothing from the rules. They still earn their keep with the reader. This is a
  symptom of the Calibration scope-out reported against `steering-rules.md`, not a finding here.

## 4. Counts by severity

### New findings

| | Blocking | Important | Advisory | Total |
| --- | --- | --- | --- | --- |
| defect | 0 | 0 | 0 | 0 |
| difference | 1 | 0 | 0 | 1 |
| **Total** | **1** | **0** | **0** | **1** |

One fail. No warns.

### Surviving prior findings

| Finding | Severity | Result | Defect or difference |
| --- | --- | --- | --- |
| Scope 3, closed and incomplete applier list at line 11 | Blocking | fail | difference |
| Context 2, untrue universal at lines 12 to 13 | Blocking | fail | difference |

| | Blocking | Important | Advisory | Total |
| --- | --- | --- | --- | --- |
| defect | 0 | 0 | 0 | 0 |
| difference | 2 | 0 | 0 | 2 |
| **Total** | **2** | **0** | **0** | **2** |

Combined: 3 open findings, 0 defects and 3 differences. The prior round had 4 open, 1 defect and 3
differences. The one defect is gone and no new defect replaced it.

**No open finding on this target is a defect, so nothing here holds the target back.** Read the three
Blocking differences as signals about the rules rather than about the file. Two of the three turn on
the same thing, a closed list of appliers and a universal claim about them, and the fix for the second
already exists in two sibling files.

### Do the changes work

- **Every condition is about the document in front of you.** This is the change that mattered most
  here and it works. `steering-rules.md` line 61 settles by name the exact file class that two prior
  audits called opposite ways. The prior report had to argue **hand-off** from first principles and
  said that if the call were overturned, all twenty of this file's own rows would turn on it. Nobody
  has to argue it again.
- **The prose claiming whole sections drop out is gone.** Works. It was the prior round's only new
  finding, it was raised against this target, and it is retired.
- **advisory and changes something fail with describes work.** Works for this target, and it does more
  than settle the ambiguity: it retires the Scope 6 difference that three rounds carried, and it makes
  the two readings of Finish 3, Finish 4, and Failure 4 agree. The cost is that this file's worked
  example at lines 18 to 25 no longer satisfies any applicable rule. That cost is reported against
  `steering-rules.md`, not here.
- **The two Composition rewrites.** One clean, one lost the test it used to carry. New finding 1 and
  the first near miss.

### The three to fix first

1. New finding 1. Put the membership test back in line 72. The old wording had it and the new one
   does not.
2. Context 2, still confirmed. Apply to lines 12 to 13 the wording the two sibling files took this
   round: "Where a procedural property an audit needs is missing here, look in the skill that runs
   the audit."
3. Scope 3, still confirmed. Give line 11 a marker, since `steering-rules.md` lines 29 to 31 routes
   readers here who are running neither named skill.

## 5. Anything I did that nobody asked for

- Ran `git diff d72544f..HEAD` over all five files in `shared/`, not only this target. Nobody asked.
  This target changed by two lines, both in the Composition table, and that is how I knew to work
  those two rows hardest rather than spreading the effort evenly.
- Compared the three sibling rule files' delegation sentences against each other. Nobody asked. It is
  how I found that the fix for this file's Context 2 finding was written twice this round and applied
  to the other two files but not to this one, which turns a stale confirmed row into an actionable
  one.
- Grepped the repository for inbound references to this file, excluding `tests/`, to check whether
  line 11's list is still incomplete rather than merely short. It is: `steering-rules.md` line 29 and
  `dispatch-protocol.md` line 4 both reach readers who are running neither named skill.
- Read `auditing-skills/SKILL.md` in full and `writing-agents/SKILL.md` in part. Neither is a target.
  Two rows in section 2 exist only because I checked what they hold.
- Recorded the **hand-off** call in section 1 even though the rules file now settles it, so a later
  reader can see that it was settled by the file rather than chosen again by me.
- Counted how many rows the new scoping removes on this target, nine, and said so, because the drop
  in open findings is partly a scope change rather than only a set of fixes.
- Recorded five near misses rather than dropping them silently, including one that is a negative
  result: the second Composition rewrite introduced no problem.
- Ran `git log` and `git status` to confirm the stated commit and clean tree. Both matched.
- Edited, staged, and committed nothing. This report and its three siblings in `/tmp/ste-audit-4/`
  are the only files I wrote.
