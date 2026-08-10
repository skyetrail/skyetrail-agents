# Re-audit, round 4: lint.md

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/lint.md`, 63 lines, down from 75.
Rules: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`.
Prior report: `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits-round3/lint.md`, which audited this target at commit `d72544f`.
Repository at commit `19459c8`, working tree clean. Nothing was edited, staged, or committed.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
lint (advisory): plugins/steering/SUMMARY.md: is 193 lines and has no "## Contents" heading; a reference file over 100 lines opens with a contents list
All generated files are up to date.
```

The run exits clean. The one advisory names `plugins/steering/SUMMARY.md`, not this target.

`npm run lint -- --explain` names a top-level `.md` under a plugin's `shared/` as a reference surface,
and says a reference surface gets reference resolution. It also says any `.md` over 100 lines gets an
advisory contents-list check, "whether it is a reference surface or a file some component links to".
This target is `plugins/steering/shared/lint.md`, so it is a reference surface.

**The lint reached the target. One check ran and found nothing to check, and one did not fire.**

- Reference resolution ran. It found nothing to resolve. The file names `AGENTS.md` at lines 23 and
  63 and `repo-setup` at lines 10 and 28, and none of those is written as a markdown link or as a
  backticked relative path ending `.md`, which are the two forms the script matches. So the check
  passed vacuously rather than confirming anything. This is a change from the prior report, which
  recorded reference resolution as running and passing. The file lost its only such reference when
  the repository-specific section was removed.
- Contents list did not fire. The file is 63 lines, under the 100-line threshold. It lost twelve
  lines this round, so it is further under than before.

**Checks that did not reach the target.** Frontmatter hazards, name format and length, description
length, and body line count. `--explain` says those run over components only, and that a reference
surface carries no frontmatter. Stated exclusion, not a coverage gap. Same result as the prior report.

The two commands also exercise the target's own procedure end to end. Step 1 at lines 23 to 24 finds
the recorded command in the repository's `AGENTS.md`, and lines 61 to 63 send the reader to a
self-description. Both worked, though the second now works by a different route, which is new finding
1 below.

I re-derived no mechanical limit by hand as a rule verdict. One exception, disclosed, and the same one
both prior reports made: to judge the Context rules I confirmed by hand that `AGENTS.md` exists at the
repository root and holds a `repo-setup` block naming `npm run lint`, and that
`plugins/steering/skills/repo-setup/SKILL.md` exists. Reference resolution covered neither, as noted
above.

### Conditions established for the target

| Condition | Met | Why |
| --- | --- | --- |
| always | yes | By definition. |
| hand-off | no | `steering-rules.md` line 61 settles this class of file. A reference file consulted inside a live session returns no artifact across a context boundary. |
| reused | yes | A shared file consulted across many runs. |
| describes work | **yes** | My call, and the same one the prior report made. The condition is decided on the outcome, per `steering-rules.md` lines 65 to 67, and this file has one: the mechanical limits for a target are settled, or the gap that stops them being settled is reported. Lines 3 to 6 state it. Lines 18 to 29 are an ordered lookup ending in a command. Lines 31 to 59 say what to do in each way it can fail. The file is right not to claim the condition, where its two siblings claim the opposite one. |
| advisory | yes, reading recorded | See below. |
| changes something | yes, reading recorded | See below. |

Because **describes work** holds, `steering-rules.md` lines 74 to 76 does not reach this file. The two
work conditions have to be settled on their own, and this is the one target of the four where that is
still necessary. I mark both met, as the prior report did, so the two rounds compare: the work this
file defines investigates a lint and reports the result, and line 10 says "Recording a confirmed
command through `repo-setup` is the one change this file asks for."

I record that this reading is not the only one available. Line 51 of `steering-rules.md` defines
**advisory** as work that "reviews or investigates and changes nothing", which reads as excluding
**changes something**, and line 60 of the same file says every condition is about the document in
front of you rather than about what the document describes. Under a strict reading of line 51 this
file meets **changes something** only, and eight rows drop out, five of them Blocking, including two
of the three findings still open below. That is a fault in the rules file, not in this target, and it
is filed in `/tmp/ste-audit-4/steering-rules.md` as a changed prior finding rather than counted twice
here.

All thirty-seven rows were live under the reading used, except Composition rows 1 and 2, which are not
applicable because the target is not a template.

## 2. Prior findings

The prior report left four findings open in its section 2 and one new finding in its section 3. It
also confirmed two rows it had retired by edit. All are below.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| **Scope 3 (round 2).** Line 8's prohibition named a closed list of three with no membership test. Was: retired. | retired, stays retired | Lines 7 to 9 unchanged: "Change nothing at all to make a check reach further or to make it pass. The target, the lint script, its configuration, an ignore file, a CI definition, and a fixture are examples, not the whole list." |
| **Context 1 (round 2).** The repository was unnamed in the heading of the repository-specific section. Was: retired. | retired, stays retired | Retired for a second reason now. The section is gone entirely, so there is no heading left to be wrong. |
| **Method 2 (round 2).** The lookup order contradicted itself. Was: retired. | retired, stays retired | Lines 25 to 26 unchanged: "A recorded command always wins, because a person confirmed it." |
| **Scope 6 (Blocking, advisory).** No blanket statement that the agent must not modify anything. Was: changed, difference. | **confirmed** | Lines 7 to 10 unchanged. "Change nothing at all" is still scoped by purpose, "to make a check reach further or to make it pass", so an agent modifying the target for an unrelated reason is not stopped by this sentence. Still a difference, and the narrowing is still right: a blanket statement would contradict line 10's own permitted recording step. `auditing-skills` line 36 carries the blanket form for anyone auditing. |
| **Failure 4 (Blocking, advisory).** The three cases each carry a stated action but none carries a named status value. Was: confirmed, difference. | **confirmed** | Lines 31 to 59 unchanged in this respect. Three cases, each with an action, none with a status name. Line 51's "report a coverage gap" is still the closest thing to a name. Still a difference: named statuses are a hand-off concept, this file's own use is not a hand-off, and no wrong action follows. |
| **Voice 3 (Important, always).** "A description written out in this file could disagree with the lint" and "the command cannot disagree with what the lint does". A description cannot disagree with anything. Was: confirmed, difference. | **changed** | Both sentences the prior report cited are gone, deleted with the repository-specific section. The shape survives in the text that replaced them. Line 61 to 62 now reads "A self-description built from the same data as the run cannot disagree with the run." A self-description is not a script and cannot disagree with anything, so this is the same construction in new words. Line 15, "Each repository decides which checks its own lint performs", is unchanged and in the same family. Still a difference: lines 61 to 63 already tell the agent what to do, so no wrong action follows. `steering-rules.md` line 237 still names this exact case as its own bad example. |
| **Round 3 new 1 (Blocking, difference).** Line 33 read "There are three cases. They are not the same", a closed enumeration with no membership test and no examples marker, and the file itself already met a fourth case. | **retired** | Lines 32 to 34 now read "A lint fails to settle your target in more than one way. Three come up most, and they are not the same. Others exist, so read these three as examples rather than as the whole list." The membership test comes first and the marker follows, which is the form `steering-rules.md` lines 113 to 114 asks for. This is exactly the fix the prior report recommended, in the form it recommended. Clean. |

**Prior finding counts.** Retired 4. Confirmed 2. Changed 1.

## 3. New findings

Only findings the prior report does not contain. I worked all thirty-five applicable rows again. The
file changed in two places this round: the enumeration at lines 32 to 34, and the removal of the
repository-specific section, replaced by lines 61 to 63.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| **1. Context 2.** Every fact the agent needs is either written out or pointed at by a path it can read. | Blocking | fail | difference | **This is a fix that introduced a smaller version of the problem it removed.** The removed section was repository-specific and said so in its first line: "This section describes `skyetrail-agents` and nothing else." Line 63 replaced it with an unlabelled repository-specific claim stated as general fact: "The repository's own `AGENTS.md` block records whether its lint offers one." No repository is obliged to have an `AGENTS.md`, and none is obliged to have a `repo-setup` block in it. This file's own step 3 at lines 27 to 29 contemplates a repository with no recorded command, so the file already knows the block may be absent, and line 63 does not. A reader in such a repository is pointed at a record that does not exist, with no fallback stated in the same paragraph. Marked a difference rather than a defect, and I considered both. Line 61 names the flag generically, "often behind a flag such as `--explain`", so the reader still knows what to try, and lines 51 to 52 give "If the repository offers a way to ask the command, use it. If not, read the script." I cannot name what an agent would do wrong with two working fallbacks in the same file. The fix is one clause: "where the repository keeps such a block". |

### Near misses I did not escalate

- **The removal is the right kind of removal.** The old section told the reader to ignore part of the
  file it was in: "Where they differ, use **Finding the command** above and ignore this section."
  `skill-rules.md` line 81 names that exact shape as a finding for a reference file, and this file is
  a reference file for `auditing-skills` and `writing-skills`. That cross-file finding is now closed,
  and it is closed by removal rather than by an exception. The content moved to the repository's own
  `AGENTS.md`, which I confirmed holds it: "**What the lint covers:** ask it, with
  `npm run lint -- --explain`."
- **Reference resolution now has nothing to check on this file.** The removal took out the only
  path-shaped reference. The check still runs and still passes, but it passes vacuously. This is a
  property of the script's matching rule rather than of the target, and nothing here asks the reader
  to rely on it. Recorded in section 1 rather than as a finding.
- **Line 63 tells the reader to prefer a self-description over "any prose, including prose in this
  file", and this file now carries no prose describing any lint's coverage.** The sentence is
  therefore true and unnecessary at the same time. Harmless, and it is a standing instruction for a
  future editor as much as for a reader.
- **Lines 61 to 63 are a method instruction sitting after the failure cases.** `steering-rules.md`
  lines 82 to 83 gives Method before Failure as the expected order. The prior version had the same
  trailing placement, so this is not new, and the position rules that carry a severity are about the
  outcome, context, scope, and finish sections rather than about method.
- **Failure 2 is worth naming as a pass again.** Lines 55 to 58 give a retry limit and require
  something to change before a retry, which is exactly what `steering-rules.md` line 164 asks and is
  rarer than it should be. Unchanged this round.

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
| Scope 6, no blanket must-not-modify | Blocking | fail | difference |
| Failure 4, three cases with actions and no named statuses | Blocking | fail | difference |
| Voice 3, changed: a self-description cannot disagree | Important | fail | difference |

| | Blocking | Important | Advisory | Total |
| --- | --- | --- | --- | --- |
| defect | 0 | 0 | 0 | 0 |
| difference | 2 | 1 | 0 | 3 |
| **Total** | **2** | **1** | **0** | **3** |

Combined: 4 open findings, 0 defects and 4 differences. The prior round had 4 open, 0 defects and 4
differences. The count is identical and the composition barely moved, because the two edits closed one
finding and opened one of the same weight.

**No open finding on this target is a defect, so nothing here holds the target back.** Read the four
differences as signals about the rules rather than about the file. Two of the four, Scope 6 and Failure
4, turn on the same thing: the rules ask a reference document consulted inside a live session for named
statuses and a blanket no-edit clause, and this file's use supplies neither a caller nor a report for
them to serve. Both would disappear under the strict reading of **advisory** recorded in section 1.

**This is the second round running where the fix did not introduce a defect.** Round 2 recorded that
each of the two rounds before it introduced a new defect while fixing an old one. Round 3 introduced
none, and round 4 introduces none. The one new finding is a difference, and it is a smaller instance
of the problem the same edit removed rather than a fresh one.

### Do the changes work

- **The three-case enumeration gained a membership test and a marker.** Clean fix, taken in the form
  the prior report recommended, and it is the prior round's only new finding retired.
- **The repository-specific section came out.** Works, and it closes a real cross-file finding: the
  section told the reader to ignore part of the file it was in, which `skill-rules.md` line 81 names
  as a finding for any reference file. The content is in the repository's `AGENTS.md`, where I
  confirmed it. The general principle survived the move, at lines 61 to 63, with the flag still named.
  What came out with it was the label that said which repository the claim was about. New finding 1.
- **advisory and changes something now fail with describes work.** This change does not reach this
  file, because **describes work** holds here. That is the right result and it is why this target keeps
  thirty-five live rows while its three siblings keep thirteen. It also means this is the one target
  where the two work conditions still have to be settled by hand, and section 1 records how I settled
  them and what a different reading would cost.

### The three to fix first

1. New finding 1. Add the conditional clause to line 63, so a reader in a repository without an
   `AGENTS.md` block is not pointed at a record that does not exist.
2. Failure 4, still confirmed. Give the three cases named statuses, or say in the file that this
   document names none because its own use is not a hand-off. Either closes it.
3. Voice 3, changed. Rewrite lines 61 to 62 so the subject is something that can act. The file's own
   rules file gives the pattern at its lines 239 to 242.

## 5. Anything I did that nobody asked for

- Ran the file's own procedure while auditing it, rather than only reading it. Step 1 finds the
  recorded command in `AGENTS.md`, and lines 61 to 63 now route to the self-description by a different
  path than before. Following it is how I found new finding 1, which reading alone would have missed.
- Read the repository's `AGENTS.md` in full to confirm that it carries the content the removed section
  used to hold. It does, including the `--explain` call and a note that the description that used to
  live in that block was wrong four times in two days.
- Ran `git diff d72544f..HEAD` over all five files in `shared/`, not only this target. This target lost
  twelve lines and gained three, and knowing which three let me judge the replacement rather than only
  note the removal.
- Checked whether the removal left reference resolution with nothing to check. It did. Recorded in
  section 1 rather than as a finding, because nothing in the file depends on it.
- Recorded the **advisory** and **changes something** reading in section 1, and what a strict reading
  of the definition would cost this target, rather than quietly picking one. Two of the three surviving
  findings turn on it. The underlying fault is filed against the rules file so the two reports do not
  double count it.
- Read `auditing-skills/SKILL.md` and `skill-rules.md` in full, and `writing-skills/SKILL.md` in part,
  to check that the consumers of this file are not broken by the removal. `skill-rules.md` line 14 now
  says "`./lint.md` says what the script checks", which is less true after the removal than before.
  That is filed as a near miss in the `skill-rules.md` report, not here.
- Recorded five near misses rather than dropping them silently, including one negative result: the
  round-4 edits introduce no defect.
- Ran `git log` and `git status` to confirm the stated commit and clean tree. Both matched.
- Edited, staged, and committed nothing. This report and its three siblings in `/tmp/ste-audit-4/`
  are the only files I wrote.
