# Re-audit, round 4: steering-rules.md against itself

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`, 254 lines.
Rules: the same file, read in full. Auditing it against itself is intended.
Prior report: `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits-round3/steering-rules.md`, which audited this target at commit `d72544f`.
Repository at commit `19459c8`, working tree clean. Nothing was edited, staged, or committed.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
lint (advisory): plugins/steering/SUMMARY.md: is 193 lines and has no "## Contents" heading; a reference file over 100 lines opens with a contents list
All generated files are up to date.
```

The run exits clean. The one advisory names `plugins/steering/SUMMARY.md`, not this target.

**The lint reached the target, with two checks, and both passed.** `npm run lint -- --explain` names a
top-level `.md` under a plugin's `shared/` as a reference surface, and says a reference surface gets
reference resolution. It also says any `.md` over 100 lines gets an advisory contents-list check,
"whether it is a reference surface or a file some component links to".

- Reference resolution. The target names one path, `./handoff-rules.md` at line 29. It resolves. Pass.
- Contents list. The target is 254 lines, over the threshold, and carries `## Contents` at line 33.
  Pass. This check now reaches the target by two routes rather than one. It reaches it as a reference
  surface, and again because `auditing-skills/SKILL.md` line 13 links it and the component path now
  walks every `.md` a component links.

**Checks that did not reach the target.** Frontmatter hazards, name format and length, description
length, and body line count. `--explain` says those run over components only, meaning
`skills/*/SKILL.md`, `commands/*.md`, and `agents/*.md`. A reference surface carries no frontmatter.
This is a stated exclusion, not a coverage gap. Same result as the prior report.

`--explain` also says nothing under a plugin's `tests/` is opened, so the lint never checked the prior
report's line citations. Every line number in this report is taken from the current file by hand.

I re-derived no mechanical limit by hand as a rule verdict.

### Conditions established for the target

| Condition | Met | Why |
| --- | --- | --- |
| always | yes | By definition. |
| hand-off | no | Line 61 now settles this class of file by name. A file of rules is not itself a hand-off, because the agent reading it sits in the conversation its author is having. |
| reused | yes | A shared rule file read by three skills. Not a one-off. |
| describes work | no | Checked rather than accepted, per lines 56 to 58. The file supplies criteria. The tasks that apply them are defined in `auditing-skills`, `writing-skills`, and `writing-agents`, which lines 13 to 15 now name. Lines 69 to 72 rule its own imperatives out of the test. |
| advisory | not applicable | Lines 74 to 76, new this round: where **describes work** fails, so do **advisory** and **changes something**. Mark all three not applicable together. |
| changes something | not applicable | Same line. |

Twenty-two of the thirty-seven rows are therefore not applicable: eleven carrying **describes work**,
eight carrying **advisory**, three carrying **changes something**. Composition rows 1 and 2 are also
not applicable, because the target is not a template. Fifteen rows were live and I worked all of them.

This is a much larger scope-out than the prior round applied, and it is the direct effect of the new
lines 74 to 76. Section 3 finding 2 is about what came out with it.

## 2. Prior findings

The prior report carried twenty rows in its section 2 and three new findings in its section 3. Its
prior new 6 merged into the Voice 3 row, as it did last round, so twenty-two rows appear below.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| **Context 1.** Unresolvable references to prior runs and rewrites. | confirmed | Unchanged, and one instance added. Lines 126 to 128 still read "One reviewer read the first wording." Lines 244 to 251 still carry "Five rewrites in this project" with the five listed. Line 190 still carries "Reach for this after a run shows a miss." New line 62 adds "Two audits of one such file called this opposite ways and returned different counts." No run, rewrite, or audit is readable from the document. |
| **Context 2 (round 1).** Important severity has no stated effect. | retired, stays retired | Lines 18 to 19 still state it. |
| **Scope 4.** No stop-and-report on reaching a scope limit. | **retired** | The text is still absent, but the prior report's own stated reason for the fail is gone. It read "this file names no applier, so a reader cannot get there from here." Lines 13 to 15 now name all three appliers and say "Where a procedural property an audit needs is missing here, look in the skill that runs the audit." `auditing-skills` lines 28 to 32 carries the stop conditions, and a skill name is a working reference. |
| **Scope 6.** No must-not-modify statement. | **retired, by scoping** | The text is still absent. The row at line 111 carries **advisory**, which lines 74 to 76 now mark not applicable for this file. The target did not change. The condition did. |
| **Finish 2.** The agent runs the check itself before reporting. | retired, stays retired | Still not applicable. Line 154 still carries **describes work**. |
| **Finish 3.** Two runs would return the same result. | **retired** | Retired twice over. The prose the prior report named as its only surviving cause is gone, replaced by lines 78 to 80. The row at line 155 carries **advisory**, now not applicable. |
| **Finish 4.** What evidence each finding must carry. | **retired** | Still absent from the file. The row at line 156 carries **advisory**, now not applicable, and lines 13 to 15 route the reader to `auditing-skills` line 127, which supplies it. |
| **Failure 1.** Conditions that should stop the work. | retired, stays retired | Line 163 still carries **describes work**. |
| **Failure 2.** A retry limit. | retired, stays retired | Line 164 still carries **describes work**. |
| **Failure 4.** No statuses for missing or unassessable input. | **retired, by scoping** | Still absent. Line 166 carries **advisory**, now not applicable. `auditing-skills` lines 89 to 92 carries "Where unsure, mark it warn" in any case. |
| **Calibration 3.** No default outcome stated. | retired, stays retired | Line 21 still reads "The default outcome for every rule here is pass." The row is also not applicable now, which is finding 2 below. |
| **Voice 1.** Whether a bare imperative satisfies the actor rule. | retired, stays retired | Lines 213 to 215 still settle it. |
| **Voice 3.** Action verbs on things that cannot choose. Prior new 6 merged here. | confirmed | Unchanged instances at lines 10 to 11, 203, 237 and 249. New text adds more: line 13 "The skills ... apply this file", line 62 "Two audits ... called this opposite ways", line 79 "No section drops out whole", line 108 "a membership test defines it". Many of these are the property form lines 228 to 233 explicitly bless, which is why this stays a difference. |
| **Prior new 1.** The condition could not be settled, and the guess moved fourteen rows. | **retired** | The surviving half was the prose disagreeing with the column. Lines 78 to 80 replace it and hand the decision to the column: "Read the Applies-when column for what drops out, one row at a time." That sentence carries its own error, reported as new finding 1, but the swing this finding named is closed. |
| **Prior new 2.** The file names no document that applies it. | **retired** | Lines 13 to 15 name `writing-skills`, `auditing-skills`, and `writing-agents`. I confirmed by grep that those three are the only skills that read this file, so the list is complete. The self-fail against its own line 99 is gone. Clean fix. |
| **Prior new 3.** The requirement sat in prose with no severity. | retired, stays retired | Still a table row at line 99. |
| **Prior new 4.** The escalate sentence suppressed every difference. | retired, stays retired | Lines 21 to 23 unchanged. |
| **Prior new 5.** The condition appeared in no Applies-when column. | retired, stays retired | **describes work** appears in eleven rows: lines 89, 90, 144 to 147, 154, 157, 163, 164, 167. Two more than last round, because both Outcome rows joined. |
| **Observation outside the target.** `skill-rules.md` claimed the default outcome lives in the two skills. | retired, stays retired | Still absent from `skill-rules.md` lines 8 to 11. |
| **Round 3 new 1.** Prose claimed three whole sections drop out while the column conditioned only nine rows. | **retired** | The prose is gone. Lines 78 to 80 replace it and say the column decides one row at a time. This was the round's headline fix and it removed the fault it aimed at. It introduced a different one in the replacement sentence, reported as new finding 1. |
| **Round 3 new 2.** Outcome 1 demanded, at Blocking, the property its own condition defines as absent, so every criteria file failed it by construction. | **changed** | The false positive is gone: lines 89 and 90 now carry **describes work**, so neither row fires against a criteria file. The fault moved rather than being removed. **describes work** is decided by looking for the outcome, per lines 65 to 67: "Where the document names something a reader finishes, the condition holds." Outcome 1 then asks whether the finished outcome is stated. A document that states only a topic fails the condition, so the row is marked not applicable and nothing is filed. A document that states an outcome passes the row by the same act that met the condition. The rule can no longer fail anything. What an agent does wrong: auditing a task document whose outcome is written as an area of work, it files no Outcome finding at all, where the previous wording filed one wrongly against criteria files. Over-firing became silent under-firing, and under-firing is the one nobody notices. |
| **Round 3 new 3.** **advisory** and **changes something** could not be settled for a document that defines no task. | **changed** | The no-task half is settled. Lines 74 to 76 say all three fail together. The fault moved to documents that do define a task. Two problems remain, and they share this root. First, new line 60 says "Every condition is about the document in front of you, not about anything that document describes", while lines 50 and 51 define both conditions against "the work", which is what the document describes. Second, the two definitions are written as mutually exclusive, since line 51 ends "and changes nothing", yet `lint.md` defines work that both investigates and records a command in `AGENTS.md`. Nothing says what to mark when the work does both. The prior round marked both conditions met for that file. A strict reading of line 51 forbids that, and it moves eight rows, five of them Blocking. |

**Prior finding counts.** Retired 18. Confirmed 2. Changed 2.

Fourteen of the eighteen are clean retirements by edit. Four are retired by scoping alone, meaning
lines 74 to 76 removed the row rather than the file removing the fault: Scope 6, Finish 3, Finish 4,
and Failure 4. The table says which is which, because a later reader should know that four Blocking
rows left the list without a word of the target changing.

## 3. New findings

Only findings the prior report does not contain. I worked all fifteen live rows again.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| **1. Context 2.** Every fact the agent needs is either written out or pointed at by a path it can read. | Blocking | fail | **defect** | **This is a fix that introduced a new problem, and it inverted the error it replaced.** New line 79 states "No section drops out whole." That is false of four sections, and false in exactly the case the change was written to serve. All four Method rows carry **describes work**: lines 144, 145, 146, 147. So Method drops out whole whenever that condition fails. Under the new lines 74 to 76, Finish drops out whole as well, because its five rows carry **changes something**, **describes work**, **advisory**, **advisory**, **describes work**, and all three conditions now fail together. Failure drops out whole for the same reason. Calibration drops out whole, because all four of its rows carry **advisory**. Line 80 compounds it: "Some rows in Method, Finish, and Failure carry **describes work**, and the rest carry a condition of their own." For Method there is no rest. What an agent does wrong: working a criteria file and finding all four Method rows not applicable, it reads line 79 as telling it the result is impossible, and either hunts for a Method row that survives or keeps one applicable against the column the same paragraph told it to trust. The replaced prose said too much drops out. The replacement says too little. The fix is to delete the sentence, since line 78 already carries the whole instruction. |
| **2. Context 2.** Every fact the agent needs is either written out or pointed at by a path it can read. | Blocking | fail | **defect** | **This is a fix that introduced a new problem.** Lines 74 to 76 mark **advisory** not applicable whenever **describes work** fails. That removes eleven rows from every criteria file. Four of them are the intended targets and nobody will miss them: Scope 6, Finish 3, Finish 4, Failure 4 were long-standing differences that three rounds agreed should not fire. The other four are the whole Calibration section, and they were earning their keep on precisely this class of file. Line 175 asks that the default outcome be stated. Round 1 filed that rule as a fail against this very file, which is a criteria file, and line 21 exists because of it. Lines 173 and 174 ask for examples of what counts and what does not; this file supplies both at lines 116 to 124 and again at lines 181 to 188, which is evidence the author thought a criteria file owes them. The blanket now makes all four unreachable on any file of this kind. What an agent does wrong: auditing a new criteria file that states no default outcome, it marks line 175 not applicable and files nothing, and every later audit run against that file over-escalates, which is the exact failure line 21 exists to prevent. The fix is to condition the four Calibration rows on something that survives, or to name Calibration as an exception in lines 74 to 76. |

### Near misses I did not escalate

- Line 13's list of three appliers is closed and carries no examples marker. I checked by grep and it
  is complete: `auditing-skills`, `writing-skills`, and `writing-agents` are the only skills that read
  this file. `dispatch-protocol.md` line 3 references it without applying it. Naming three instances
  is not naming a category of kinds, and line 99 asks only for at least one. The prior round filed
  the same shape against `handoff-rules.md` line 11, and I have confirmed it there, because that
  list is demonstrably incomplete: lines 29 to 31 of this file route any reader meeting **hand-off**
  to that file whatever it is running. The asymmetry is deliberate and I state it in both reports.
- Line 76 says "Mark all three not applicable together", which applies the marking vocabulary to
  conditions rather than to rules. `auditing-skills` lines 58 to 60 marks rules. The intent is plain
  and the effect is the same, so no agent does anything wrong.
- Lines 82 to 83 present the section order as the order a written document should use, and the list
  ends with Voice, which line 203 says is not a section. A writer following line 82 could add a Voice
  section. This is unchanged text and no prior round filed it.
- The `## Contents` list at line 33 opens with "Conditions", which is bold prose at line 46 rather
  than a heading. Presentation only.

## 4. Counts by severity

### New findings

| | Blocking | Important | Advisory | Total |
| --- | --- | --- | --- | --- |
| defect | 2 | 0 | 0 | 2 |
| difference | 0 | 0 | 0 | 0 |
| **Total** | **2** | **0** | **0** | **2** |

Both are fails. No warns. Both are fixes that introduced a new problem.

### Surviving prior findings

| Finding | Severity | Result | Defect or difference |
| --- | --- | --- | --- |
| Context 1, unresolvable references | Blocking | fail | difference |
| Voice 3, action verbs on things that cannot choose | Important | fail | difference |
| Round 3 new 2, changed: Outcome 1 can no longer fail | Blocking | fail | **defect** |
| Round 3 new 3, changed: the two work conditions for a document that has work | Blocking | fail | **defect** |

| | Blocking | Important | Advisory | Total |
| --- | --- | --- | --- | --- |
| defect | 2 | 0 | 0 | 2 |
| difference | 1 | 1 | 0 | 2 |
| **Total** | **3** | **1** | **0** | **4** |

Combined: 6 open findings, 4 defects and 2 differences. The prior round had 10 open, 4 defects and 6
differences. The differences fell by four, which is what the scoping change was for. The defect count
held at four, and three of the four defects now open are new or moved this round.

### Do the changes work

| Change | Works? |
| --- | --- |
| The prose claiming whole sections drop out is gone, and the column decides one row at a time | The removal works and closes round 3's headline finding. The replacement sentence at line 79 is false of four sections, so the round traded an overreach for an understatement. New finding 1. |
| **advisory** and **changes something** fail together with **describes work** | Half. It settles the case the prior round could not settle and it retires four Blocking differences that three rounds had all agreed were noise. It also disables the four Calibration rules on every criteria file, and those were doing real work. New finding 2. It leaves the document-with-work case unsettled, and new line 60 now pulls against lines 50 and 51 there. Changed prior finding, round 3 new 3. |
| Both Outcome rows carry **describes work** | The false positive is gone. The rule is now unfailable, because the condition is decided by the same test the rule applies. Changed prior finding, round 3 new 2. |
| Every condition is about the document in front of you | Works for **hand-off**, which is what it was written for. Line 61 settles by name the file class two prior audits called opposite ways, and `handoff-rules.md` is settled this round without argument. It collides with lines 50 and 51 for the other two conditions, since those are defined against work the document describes. |
| The file names the three skills that apply it | Clean fix. Lines 13 to 15. The list is complete and the self-fail against line 99 is retired. |

### The three to fix first

1. New finding 1. Delete line 79. Line 78 already carries the instruction, and the deleted sentence is
   false of Method, Finish, Failure, and Calibration.
2. New finding 2. Keep the four Calibration rows reachable on a criteria file, either by naming them
   as an exception in lines 74 to 76 or by conditioning them on something other than **advisory**.
3. Changed round 3 new 2. Decide whether Outcome 1 is meant to fire at all now. If it is, its test
   has to differ from the test at lines 65 to 67, or the row will keep passing everything.

## 5. Anything I did that nobody asked for

- I ran `git diff d72544f..HEAD` over all five files in `shared/`, not only this target. Nobody asked
  for the diff. I used it to tell new text from surviving text, which is what lets me say plainly that
  lines 79 and 80 are new and that the error there is fix-introduced rather than old.
- I read `eng/generate-readmes.mjs` at lines 215 to 262 to confirm that the contents-list check now
  runs over every `.md` a component links, not only over `shared/`. Line 7 of `lint.md` permits reading
  the script to establish coverage. This confirms `--explain` rather than substituting for it, and it
  grounds a finding in the `skill-rules.md` report rather than this one.
- I grepped the repository for inbound references to this file, excluding `tests/`. That is how I
  established that line 13's list of three appliers is complete, which turned a candidate finding into
  a near miss.
- I read `auditing-skills/SKILL.md` in full and `writing-skills/SKILL.md`, `writing-agents/SKILL.md`,
  `dispatch-protocol.md`, and the repository's `AGENTS.md` in part. Several retirements rest on what
  those files carry.
- I recorded the conditions determination as its own block in section 1, as all three prior reports
  did. The format did not ask for it. This round it is fully settled for the first time.
- I counted how many rows the new scoping removes, twenty-two of thirty-seven, and checked which
  sections empty out entirely. Nobody asked. It is the whole of both new findings.
- I marked four prior findings "retired, by scoping" rather than plain retired, because the target's
  text did not change and a later reader should know which mechanism did the work.
- I recorded four near misses rather than dropping them silently.
- I edited, staged, and committed nothing. The working tree is clean at `19459c8`. This report and its
  three siblings in `/tmp/ste-audit-4/` are the only files I wrote.
