# Re-audit, round 4: skill-rules.md

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/skill-rules.md`, 91 lines, up from 90.
Rules: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`.
Prior report: `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits-round3/skill-rules.md`, which audited this target at commit `d72544f`.
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

- Reference resolution. The target names `./steering-rules.md` at line 3 and `./lint.md` at line 13.
  Both resolve. It also names `tests/baselines/` at line 87, which is a directory rather than a `.md`
  link, so resolution does not cover it. I confirmed by hand that the directory exists and holds four
  files, one for each of the plugin's four skills, which is what the rule claims.
- Contents list. The target is 91 lines, under the 100-line threshold, so the check reached the file
  and had nothing to say. It gained a line this round when the exclusion paragraph was rewritten, so
  it now sits nine lines under the threshold rather than ten.

**Checks that did not reach the target.** Frontmatter hazards, name format and length, description
length, and body line count. `--explain` says those run over components only. A reference surface
carries no frontmatter. Stated exclusion, not a coverage gap. Same result as the prior report.

I re-derived no mechanical limit by hand as a rule verdict. I did read `eng/generate-readmes.mjs` at
lines 215 to 262 to establish which files the contents-list check now opens, which line 7 of `lint.md`
permits. That grounds the grading of round 3's new finding 2.

### Conditions established for the target

| Condition | Met | Why |
| --- | --- | --- |
| always | yes | By definition. |
| hand-off | no | Line 4 says so, and `steering-rules.md` line 61 now settles this class of file by name: a file of rules is not itself a hand-off. |
| reused | yes | A shared rule file, not a one-off. |
| describes work | no | Checked rather than accepted, per `steering-rules.md` lines 56 to 58. The file supplies criteria; `auditing-skills` and `writing-skills` define the tasks. The three imperative passages at lines 15, 50 to 52, and 89 to 91 are instructions about how to read the criteria, which `steering-rules.md` lines 69 to 72 rules out of the test by name. |
| advisory | not applicable | `steering-rules.md` lines 74 to 76, new this round. All three fail together. |
| changes something | not applicable | Same line. |

The prior report had to record a limitation here, because the rules file did not settle **advisory**
and **changes something** for a criteria file and it picked a reading so the two rounds would compare.
That limitation is gone. The rules file now states the answer. This is the single clearest improvement
of the round for this target.

Twenty-two of the thirty-seven rows are not applicable: eleven carrying **describes work**, eight
carrying **advisory**, three carrying **changes something**. Composition rows 1 and 2 are also not
applicable, because the target is not a template. Thirteen rows were live and I worked all of them.

## 2. Prior findings

The prior report carried fourteen rows in its section 2 and three new findings in its section 3. All
seventeen are below.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| **Context r2.** The 500-line row restated a lint check. | retired, stays retired | The Loading table at lines 76 to 81 still carries no body-length row. |
| **Scope r6.** No must-not-modify statement. | retired, stays retired | Line 8 still names `auditing-skills`, which carries it at its lines 36 to 37. The row is also not applicable now, since it carries **advisory**. |
| **Finish r4.** No statement of what evidence each finding must carry. | retired, stays retired | Lines 8 to 11 still name the delegation and `auditing-skills` line 127 still supplies it. Also not applicable now, since the row carries **advisory**. |
| **Failure r1.** No stop conditions. | retired, stays retired | Retired three ways. Lines 8 to 11 delegate, `auditing-skills` lines 28 to 32 carries the conditions, and the row carries **describes work**. |
| **Failure r3.** Weakening the check is not forbidden. | **retired** | The prior round marked this changed, because the row was kept off the list by a reading the auditor had to choose rather than by anything the rules file said. `steering-rules.md` lines 74 to 76 now states it: **changes something** is not applicable because **describes work** fails. The mechanism is no longer a judgment call. `writing-skills` still holds the rule in any case. |
| **Calibration r3.** No default outcome stated. | retired, stays retired | `steering-rules.md` line 21 states it and line 3 of this file makes that file mandatory reading by path. |
| **Composition r3.** What happens to partial work is not stated. | retired, stays retired | Line 8 names `writing-skills`, which carries it. The row is also not applicable, since it carries **changes something**. |
| **Near miss (prior fix 3).** The exclusion list carried no examples marker. | retired, stays retired | Lines 66 to 68 still read "They are examples, not the whole list", with the membership test in the same breath. |
| **Near miss.** Mild personifications at lines 8, 25, and 87. | confirmed | All three unchanged: "The skills ... apply these rules", "The description speaks in the third person", "The skill went through a baseline comparison". Still not escalated, for the same reason: these are the property form `steering-rules.md` lines 228 to 233 explicitly blesses, and no agent does anything wrong. |
| **Prior new 1.** Line 10 was a closed three-item list of what is delegated. | retired, stays retired | Lines 8 to 11 still carry a membership test and a marker, though the wording of the test changed this round. It now reads "Where a procedural property an audit needs is missing here", and the marker is unchanged at "are two examples, not the whole list". |
| **Prior new 2.** The 100-line contents-list row was an orphan. | retired, stays retired | The row is still gone from the Loading table, and the lint still carries the check. |
| **Prior new 3.** The target declared its own condition. | confirmed | Lines 8 to 9 still read "This file supplies criteria and defines no task of its own." Unchanged text, so confirmed as the prior report described it. It is not a fail. `steering-rules.md` lines 56 to 58 tells the auditor to treat it as a claim to check, and I checked it and it holds. |
| **Prior new 4.** "These do not count" had a forward referent sitting directly beneath a list of things that do count. | **retired** | Line 65 now reads "Three kinds of content do not count as findings, because each one changes what an agent does with the next paragraph." The referent is named and bound forward, so the four shapes above it can no longer read as excused. This was the round-3 report's only surviving fail or warn, and the fix removed it. The new sentence carries a different problem, reported as new finding 1. |
| **Prior new 5.** The Evidence rule was narrowed to "no SKILL.md links to it". | retired, stays retired | Line 87 still reads "Nothing an agent loads at run time links to that directory." |
| **Round 3 new 1.** The universal at lines 9 to 10, "every procedural property an audit needs lives in those two skills rather than here", was contradicted by three procedural properties living here. | **retired** | Lines 8 to 10 now read "Where a procedural property an audit needs is missing here, look in those two skills." That contemplates procedural content living here rather than denying it. Lines 15, 50 to 52, and 89 to 91 still carry the three properties, and they no longer contradict the sentence above them. Clean fix, and it is the fix the prior report recommended. |
| **Round 3 new 2.** The contents-list rule left this file for the lint, and the lint took over a different population, so no check reached a skill's own reference files. | **changed** | Half retired. `--explain` now says the check runs over any `.md` over 100 lines, "whether it is a reference surface or a file some component links to". I confirmed it in the script: `lintContentsList` is now called from the component path at `eng/generate-readmes.mjs` lines 228 to 230, over `referencedMarkdown`, and the comment at lines 234 to 237 says why in as many words. So for this repository the population is now the right one. Half survives, in two narrower forms. First, `referencedMarkdown` matches only a markdown link or a backticked path beginning `./` or `../`, so a reference named any other way is still never opened. Second, a skill from another repository is still uncovered: `lint.md` lines 15 to 16 says each repository decides its own checks, and this file still states no rule. What an agent does wrong is unchanged in shape but much rarer: auditing an external skill with a long reference file and no contents list, it files nothing, because no rule asks and no lint opens the file. |
| **Round 3 new 3.** Outcome 1 fired against this criteria file at Blocking. | **retired** | `steering-rules.md` line 89 now carries **describes work**, which this file does not meet, so the row is not applicable. The fix landed where the prior report said it belonged. It carries a cost in the rules file, which is reported there and not here. |

**Prior finding counts.** Retired 14. Confirmed 2. Changed 1.

Neither confirmed row is a fail. One is a near miss no round has escalated, the other is a checkable
claim that checks out. The one surviving fail is the changed row.

## 3. New findings

Only findings the prior report does not contain. I worked all thirteen live rows again.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| **1. Scope 3.** Where a category of work is named, a membership test defines it. Any list of kinds carries a marker saying they are examples, not the whole set. | Blocking | fail | difference | **This is a fix that introduced a new problem.** The fix to the forward referent put a count into the sentence that defines the category. Line 65 now opens "Three kinds of content do not count as findings", and line 66 follows with "That test decides a case the three below do not cover. They are examples, not the whole list." The same paragraph now says the set has three members and says the set is open. The prior report recorded the old wording's "the three examples below" as a near miss, on the ground that it was a count in a subordinate clause. It has moved into the head sentence, so the closed reading is now the first thing a reader meets. Lines 60 to 61 of this same file name that exact shape as a finding when it appears in a SKILL.md: "A count of anything ... goes wrong the moment someone adds one." Marked a difference rather than a defect, and deliberately: the membership test is present in the same sentence and the marker is present in the next, so a reader who finishes the paragraph gets the right answer, and I cannot name what an agent would do wrong. The fix is to drop the number and open with "Some kinds of content do not count as findings". |

### Near misses I did not escalate

- Line 14 says "`./lint.md` says what the script checks." That file no longer says what any script
  checks, and this round it stopped naming a command for this repository at all. It gives a procedure
  for finding out instead. The claim was already loose before this round, so it is not fix-introduced
  here, and the reader who follows the pointer gets something better than the sentence promised. Line
  15 immediately says "Confirm the lint record", which is that procedure. No wrong action follows.
- Line 91 says "mark it not applicable", which is a marking instruction, and `steering-rules.md` line
  22 assigns marking to the skill running the audit. `auditing-skills` lines 58 to 60 sanctions
  exactly that mark, so the two agree in practice. The prior report raised this inside its new finding
  1, which is now retired, and the residue is too small to carry on its own.
- Line 52 says "These shapes are the ones seen so far", which points at runs the reader cannot read.
  The marker and the test in the same sentence make the pointer unnecessary, so nothing depends on it.
- Line 66 still carries "the three below", now alongside the marker. Counted once, inside new finding
  1, rather than twice.

## 4. Counts by severity

### New findings

| | Blocking | Important | Advisory | Total |
| --- | --- | --- | --- | --- |
| defect | 0 | 0 | 0 | 0 |
| difference | 1 | 0 | 0 | 1 |
| **Total** | **1** | **0** | **0** | **1** |

One fail. No warns. It lands at Blocking because Scope 3 is a Blocking row, not because it matters as
much as the other Blocking rows in this project.

### Surviving prior findings

| Finding | Severity | Result | Defect or difference |
| --- | --- | --- | --- |
| Round 3 new 2, changed: contents-list coverage, now narrowed to references the regex misses and to skills from other repositories | Blocking | fail | **defect** |

| | Blocking | Important | Advisory | Total |
| --- | --- | --- | --- | --- |
| defect | 1 | 0 | 0 | 1 |
| difference | 0 | 0 | 0 | 0 |
| **Total** | **1** | **0** | **0** | **1** |

Combined: 2 open findings, 1 defect and 1 difference. The prior round had 4 open, 2 defects and 2
differences. This is the cleanest state this target has been in across four rounds.

### Do the changes work

- **The universal at lines 9 to 10 was narrowed.** Clean fix. It was the prior round's second-ranked
  recommendation and it was taken as written. Nothing new came in with it.
- **The forward referent at line 65 was bound.** The fix works for what it aimed at and the prior
  round's only surviving warn is retired. It brought a closed count into the category sentence. New
  finding 1.
- **The contents-list rule stayed out of this file and the lint took over the right population.** This
  was the prior round's first-ranked recommendation, and the second of the two options it offered was
  taken: the lint's reach was extended rather than the rule being put back. The script comment at
  `eng/generate-readmes.mjs` lines 234 to 237 names this file's Loading section as the reason. Two
  narrower gaps remain and both are in the script or in another repository, not in this file.
- **advisory and changes something now fail with describes work.** For this target it is a clean win.
  It removes the limitation the prior report had to declare in its section 1, and it retires the last
  finding that was surviving on a chosen reading rather than on the text. The cost falls on the rules
  file, where it is reported.

### The three to fix first

1. New finding 1. Open line 65 with "Some kinds of content" rather than "Three kinds of content".
2. Round 3 new 2, still open in narrowed form. Say in the Loading table that a skill outside this
   repository is not covered by this repository's lint, so an auditor knows to check by hand.
3. Nothing else on this target is a fail. The remaining items are near misses and are recorded above
   so a later round does not spend the time again.

## 5. Anything I did that nobody asked for

- I ran `git diff d72544f..HEAD` over all five files in `shared/`. Nobody asked. It is what lets me
  say that line 65's count is fix-introduced rather than surviving text, and that lines 8 to 10 were
  reworded rather than merely reflowed.
- I read `eng/generate-readmes.mjs` at lines 215 to 262 to confirm which files the contents-list check
  now opens before deciding whether round 3's new finding 2 was retired or changed. Line 7 of
  `lint.md` permits it. Confirming, not substituting. It is also how I found the second surviving gap,
  the shape of the `referencedMarkdown` regex, which nobody had raised before.
- I checked by hand that `tests/baselines/` holds one file per skill, since reference resolution does
  not cover a directory. Four skills, four files. The Evidence rule's claim holds.
- I read `auditing-skills/SKILL.md` in full and `writing-skills/SKILL.md` in part, to check that the
  delegation claims at lines 8 to 11 still resolve.
- I counted how many rows the new scoping removes and named the three that fell out on this target,
  so a later reader can see that the drop in open findings is partly a scope change rather than only
  a set of fixes.
- I recorded four near misses rather than dropping them silently.
- I marked round 3's new finding 2 changed rather than retired, even though the main gap is closed,
  because two narrower forms of it survive and a later reader should know where.
- I edited, staged, and committed nothing. The working tree is clean at `19459c8`. This report and its
  three siblings in `/tmp/ste-audit-4/` are the only files I wrote.
