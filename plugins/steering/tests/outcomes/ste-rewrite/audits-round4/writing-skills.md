# Re-audit round 4: writing-skills

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/writing-skills/SKILL.md`,
91 lines.

Prior report compared against:
`/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits-round3/writing-skills.md`,
which audited this target at commit `d72544f`.

Rules applied: `plugins/steering/shared/skill-rules.md` and `plugins/steering/shared/steering-rules.md`.

Conditions met: **always**, **reused**, **changes something**, and **describes work**. Lines 8 to 9
name a finished outcome, a SKILL.md with its reference files and evidence that it changes
behaviour, so the test at `steering-rules.md` lines 65 to 67 is met. **advisory** is not met, so
every rule conditioned on it is not applicable, including the whole Calibration table. **hand-off**
is not met: under the settled sentence at `steering-rules.md` lines 60 to 63 the condition is about
the document in front of me, and an agent loading a SKILL.md sits in the conversation its author is
having. So `handoff-rules.md` supplies no rule here and was not applied.

Repository at commit `19459c8`, working tree clean. Nothing was created, edited, staged, or
committed. The only file I wrote is this report.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`, exits 0:

```
> node eng/generate-readmes.mjs --check
lint (advisory): plugins/steering/SUMMARY.md: is 193 lines and has no "## Contents" heading; a reference file over 100 lines opens with a contents list
All generated files are up to date.
```

The one advisory is against `plugins/steering/SUMMARY.md`, not against this target. Recorded once.
It does not block.

`npm run lint -- --explain` reports that components get every check: frontmatter hazards, name
format and length, description length with a limit of 1024, body line count with a limit of 500,
and reference resolution. `skills/*/SKILL.md` is a component and its name must match its directory.

**The target is `skills/writing-skills/SKILL.md`. The lint reached it, and every component check
ran over it.** No mechanical limit was re-derived by hand.

Three coverage notes.

- The explain output says nothing under a plugin's `tests/` is opened, so the lint says nothing
  about `plugins/steering/tests/baselines/writing-skills.md`, which the Evidence rule depends on. I
  checked that by reading.
- The three files the target names by path, `skill-rules.md`, `steering-rules.md`, and `lint.md`,
  all resolve, and reference resolution confirms it. `steering-rules.md` is 254 lines and carries
  its `## Contents` heading at line 33, so the contents-list check that runs over a component's
  referenced files passed on it.
- The contents-list check does not reach this target. I read `eng/generate-readmes.mjs` to settle
  which files it opens rather than trusting the explain wording, as `lint.md` line 51 requires:
  `lintContentsList` is called at line 229 over the files a component references, and at line 474
  over reference surfaces, and a component's own file goes to neither. It does not matter here,
  because the target is 91 lines and the threshold is 100.

## 2. Prior findings

The round-3 report carried eight rows in its findings table and three in its new-findings table.
All eleven are tracked here. Round 3's line numbers are one to two lower than the current ones.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| **skill / Content 3.** Steps 2 and 3 restated tables from `skill-rules.md`, and both copies had drifted. (Important, fail, **defect**) | **retired** | Retired in round 3 and still retired, and now more firmly. Step 2 at lines 44 to 45 and step 3 at lines 49 to 51 still point at named tables rather than copying rule text, and the one restatement that was left, of the section order in step 3, is gone this round |
| **skill / Evidence.** Baseline records linked from nothing. (Blocking, fail, **difference**) | **retired** | Retired in round 3 and still retired under the wording at `skill-rules.md` line 87, "Nothing an agent loads at run time links to that directory". A repository grep for `tests/baselines` finds `plugins/steering/README.md:220`, `plugins/steering/SUMMARY.md:192`, `DECISIONS.md:78` and `:99`, `TEST_REPORT.md`, and the generator. No SKILL.md, agent, or command file names them. The target's own line 59 is a write destination carrying the placeholder `<skill-name>`, not a link |
| **steering / Context 2.** Step 6 said "the plugin's `tests/baselines/`" and supported two readings. (Blocking, warn, **defect**) | **retired** | Retired in round 3 and still retired. Step 6 line 59 still reads "under the plugin directory that holds the skill you are writing" |
| **steering / Scope 3.** Step 3's list of what the body must contain was closed and named no rules file. (Blocking, fail, **defect**, reduced to changed in round 3) | **confirmed** | The residual round 3 recorded is unchanged. Line 50 still fixes the `skill-rules.md` set at "the Boundary and Content tables", so a table added to that file to govern the body would not be reached. Harm stays small, because all five of its current tables are reached across the workflow: Discovery by step 2, Boundary and Content by step 3, Loading by step 5, Evidence by step 6. Stays a warn and a difference |
| **New 1. steering / Method 3.** The instruction constrains how the work is done only where correctness needs it, and each constraint says why. Step 3's restated section order had dropped Context, Calibration, and Composition. (Important, fail, **defect**, marked changed in round 3) | **changed** | The half with the nameable consequence is fixed. Step 3 lines 47 to 48 now read "Order the sections the way `../../shared/steering-rules.md` orders its own. That file lists them in order, and a second copy of the list here would drift from it." The five-item copy is gone, so an agent writing an advisory skill is no longer sent to ship it without a calibration section. The other half survives unchanged: the order constraint still carries no reason for the order itself. Line 48's reason explains why there is no copy, not why the order is what it is. Reduced from fail and defect to warn and difference, because with the copy gone I can no longer name what an agent does wrong |
| **New 2. steering / Context 2.** Step 6 gives no fallback for a skill that sits in no plugin. (Blocking, warn, **defect**) | **retired** | Fixed. Step 6 lines 60 to 61 now read "Where the skill sits in no plugin, put the record under the skill's own directory and say in it where it went." The rule's letter is met: the case now has a destination. The wording of that fallback is new finding 2 below |
| **New 3. skill / Evidence.** The baseline record stopped before the current steps 2, 3, and 6 existed. (Blocking, warn, **defect**) | **retired** | Retired in round 3 and still retired. `plugins/steering/tests/baselines/writing-skills.md` still carries the 2026-08-07 entry at lines 54 to 85, and this round extended it rather than replacing it |
| **New 4. steering / Voice 3.** Nothing that cannot choose to act takes an action verb. (Important, warn, **difference**) | **changed** | The instance round 3 cited is fixed, and a different one remains. Line 60 read "That is the directory the Evidence rule in `../../shared/skill-rules.md` reads", where a rule cannot read; it now reads "The Evidence rule in `../../shared/skill-rules.md` names that directory", which is the property form `steering-rules.md` lines 228 to 233 bless. But line 47's "the way `../../shared/steering-rules.md` orders its own" is unchanged, and a file cannot choose to order anything. The fault moved rather than went. Stays a warn and a difference |
| **New A. skill / Evidence.** The baseline record's new entry misdescribed step 3, certifying as fixed a fault that was still there. (Blocking, warn, **defect**) | **retired** | Fixed, and fixed in the open. `tests/baselines/writing-skills.md` lines 75 to 82 now read "The first version of this paragraph said step 3 'now defers to that file's order rather than restating one'. That was untrue when written ... Step 3 now carries a pointer and no copy", followed by "Recorded rather than quietly corrected. A record that certifies an unmade fix is worse than a missing one." I checked the corrected claim against the file: step 3 line 47 is a pointer and there is no copy, so the record is now true |
| **New B. skill / Loading 4.** `lint.md` holds a section instructing the reader to skip part of itself. (Important, fail, **difference**) | **retired** | The section is gone. `lint.md` is now 63 lines and the heading "In the repository this plugin is developed in" and the sentence "Where they differ, use **Finding the command** above and ignore this section" are both deleted. I checked the replacement resolves: it points at the repository's `AGENTS.md` block, and `AGENTS.md` lines 55 to 70 carry it, recording both `npm run lint` and `npm run lint -- --explain`. I checked the target's other two referenced files for the same shape and found none |
| **New C. steering / Finish 1.** The small-change clause lets the baseline be skipped with no cumulative bound. (Blocking, warn, **difference**) | **confirmed** | Lines 81 to 83 are unchanged, "For a small change to a skill that already has a recorded baseline, run step 7 alone." And the count grew again: `tests/baselines/writing-skills.md` now records a fifth use, since this round's step 3 and step 6 edits were folded into the same 2026-08-07 entry, which still closes "Handled under the small-change clause each time ... The baseline was not repeated." So no with-and-without run has been made against the current text of steps 2, 3, 6, or 7, while line 72 makes the baseline "the gate". Stays a warn and a difference, because every individual use is within what the text allows and I still cannot name a wrong action |

Retired 7. Confirmed 2. Changed 2.

### On the deliberate changes, judged rather than reported as drift

**Deleting the restated section order works, and it was the right fix.** Step 3 line 47 now points
at `steering-rules.md` and nothing else, and line 48 gives the reason for pointing rather than
copying. I checked that the pointer lands somewhere usable: `steering-rules.md` line 82 says "The
section order below is the order these sections should appear in the document being written", so a
writer who opens that file finds the order stated as an instruction, not merely implied by the
headings. This was round 3's first recommended fix and it closes the finding with the only
nameable consequence in that report. It does leave a smaller thing behind, which is new finding 1.

**Correcting the baseline record in the open works, and it is the better of the two ways to do
it.** The record could have been quietly rewritten. Instead lines 75 to 82 keep the false sentence,
say it was untrue when written, say what the real state was, and give the reason: "A missing record
leaves a reader to check. This one told a reader not to." A reader who trusted the old paragraph
can now find out that they were misled, which a silent correction would have hidden.

**The step 6 fallback closes the case it was written for and introduces a wording problem.** Said
plainly: this is a fix that introduced a new problem. It is new finding 2.

## 3. New findings

Only findings the round-3 report does not contain. Two.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| **steering / Method 2.** The order is fixed where sequence affects correctness, and left open where it does not. | Blocking | **warn** | **difference** | Step 3 line 47 fixes the section order by pointing at "the way `../../shared/steering-rules.md` orders its own", and that file's own sections are Contents at line 33, then Outcome, Context, Scope, Method, Finish, Failure, Calibration, Composition, and Voice. Two of those are not sections a skill writes. Contents is excluded only if the writer notices the word "below" at line 82. Voice is excluded only if the writer notices line 203, "These rules govern every sentence rather than one section", which sits inside the last section of the list. So the pointer resolves to a list that needs two exclusions the writer has to spot on their own, where the deleted copy needed none. Warn, because I cannot tell from the text whether a writer would add a Voice section, and difference, because line 203 sits in the same file the writer has just been told to open and I cannot name a wrong action with confidence. Say plainly: this arrived with the fix for round 3's new finding 1, and it is much the smaller of the two faults. One clause on line 47, naming Outcome through Composition as the range, would close it without reintroducing a copy that drifts |
| **skill / Evidence,** read with **skill / Loading 3,** "Material used to test the skill is not reachable from it. So it never loads with it." | Blocking | **warn** | **defect** | Step 6 lines 60 to 61 read "Where the skill sits in no plugin, put the record under the skill's own directory and say in it where it went." The pronoun carries two readings and the sentence supports both. Read as the record, it is circular: the record says where the record went, which the reader who found it already knows. Read as the skill, it instructs the author to write the record's location into the SKILL.md, which is what `skill-rules.md` line 87 forbids at Blocking severity, "Nothing an agent loads at run time links to that directory", and what Loading rule 3 forbids at Important. What an agent does wrong under the second reading: it adds a line to the SKILL.md pointing at the baseline record, and the next audit fails that skill on the Blocking half of the Evidence rule. Warn because I cannot tell which reading is meant. Defect because one of the two readings has a named consequence and the text does not exclude it. Say plainly: this arrived with the fix for round 3's new finding 2, which asked for exactly this fallback |

### Things I checked and did not escalate

- **steering / Failure 2, a retry limit with something changing before a retry.** Lines 77 to 78
  give the limit, "Where the loop does not settle after two more full runs, stop", and lines 74 to
  76 say what must change first, "put that failure and the agent's own reasoning into the skill.
  Then run the loop again." Passes.
- **steering / Failure 3, weakening the check is forbidden.** Lines 75 to 77, "Fix a failing
  baseline or audit by changing the skill. Do not fix it by easing the task or loosening the rules.
  A pass earned that way measures nothing." Passes, and it is one of the clearer statements of that
  rule anywhere in the plugin.
- **steering / Composition 3, what happens to partial work when a run stops.** Lines 78 to 79,
  "Keep the draft when you stop. Say in the report that the draft is unverified. Leave the
  keep-or-discard call to the person." Passes.
- **steering / Composition 1, a named hole marked required or carrying a default.** The placeholder
  `<skill-name>` at line 59 is the only named hole, in a path rather than a template, and its value
  is self-evident. Round 2 and round 3 did not file it. Not filed.
- **skill / Content 3, content that would not change what an agent does.** Line 48's explanation of
  why there is no copy is a reason for a constraint, which `skill-rules.md` lines 65 to 69 exempt,
  and it stops an agent re-adding the copy. Passes.
- **skill / Loading 4, across the three referenced files.** `lint.md`'s skip section is gone.
  `skill-rules.md` lines 3 to 6 and `steering-rules.md` lines 29 to 31 and 78 to 80 state
  conditions on which rows apply, which is not the same as telling a reader to skip part of the
  file they are in. Passes.
- **The target's own section order against step 3's instruction.** Outcome at lines 8 to 9, then
  the artifact check and "Where this stops" at lines 11 to 30, then the workflow at lines 32 to 69,
  then the gate at lines 71 to 86, then references. Scope sits above method, which is what
  `steering-rules.md` asks for. It has no Calibration section, and it does not need one, because
  **advisory** is not met. Passes.

## 4. Counts by severity

New findings.

| Severity | Fail | Warn | Defects | Differences | Total |
| --- | --- | --- | --- | --- | --- |
| Blocking | 0 | 2 | 1 | 1 | 2 |
| Important | 0 | 0 | 0 | 0 | 0 |
| Advisory | 0 | 0 | 0 | 0 | 0 |
| **Total** | **0** | **2** | **1** | **1** | **2** |

Surviving prior findings, meaning confirmed plus changed.

| Severity | Fail | Warn | Defects | Differences | Total |
| --- | --- | --- | --- | --- | --- |
| Blocking | 0 | 2 | 0 | 2 | 2 |
| Important | 0 | 2 | 0 | 2 | 2 |
| Advisory | 0 | 0 | 0 | 0 | 0 |
| **Total** | **0** | **4** | **0** | **4** | **4** |

Combined open: 6 findings. Defects 1, differences 5. Blocking 4, Important 2, Advisory 0.

Movement since round 3: 7 retired, 2 confirmed, 2 changed, 2 new. Round 3 had 4 surviving plus 3
new, so 7 open, with 3 defects. This round has 6 open with 1 defect. No fail sits at any severity,
for the second round running, and the defect count fell by two.

By `auditing-skills` lines 140 to 143, only a defect blocks. One defect stands, the step 6 pronoun,
and it is a warn. The five differences do not hold the target back.

### The three fixes to make first

1. **Settle the pronoun in step 6 line 61.** Say whose file gets the note. If it is the record, the
   sentence can go, because the reader already knows where they found it. If it is somewhere else,
   name it, and check it against the Blocking clause in `skill-rules.md` line 87. This is the one
   defect and the one place where a reading of the text leads an agent into a Blocking failure.
2. **Name the range on step 3 line 47.** Something like "in the order that file's own sections run,
   from Outcome to Composition". It keeps the pointer, adds no copy that can drift, and removes the
   two exclusions a writer currently has to spot.
3. **Say why the order is what it is, on step 3.** This is the surviving half of the changed
   Method row and the oldest open item on this target. `steering-rules.md` line 100 gives the
   reason for one part of it, "Context sits above the method, so it is read before a plan is
   formed", and one clause of that kind would close the row.

## 5. Anything I did that nobody asked for

- I read `eng/generate-readmes.mjs` to establish which files the contents-list check opens, rather
  than taking the explain wording at face value. It does not affect this 91-line target, but it did
  affect the sibling target I audited in the same session, and `lint.md` line 51 asks for it.
- I read `plugins/steering/shared/lint.md`, which step 7 names, and then read `AGENTS.md` to check
  that its new closing pointer resolves. It does, at lines 55 to 70. I did not want to retire round
  3's `lint.md` finding on the deletion alone without checking that what replaced it works. I did
  not open `handoff-rules.md`: both rule files state that a document that is not a hand-off never
  reads it, and the target does not name it.
- I read `plugins/steering/tests/baselines/writing-skills.md` in full and checked its new
  correction paragraph against the file it describes, rather than accepting that a record which
  admits a past error is now accurate. Step 3 does carry a pointer and no copy, so it is.
- I counted the uses of the small-change clause in that record to see whether round 3's confirmed
  finding had got better or worse. It got worse by one, and that is in the row rather than left
  implied.
- I read `plugins/steering/skills/auditing-skills/SKILL.md` in full, because step 7 hands the draft
  to it and I audited it in the same session. Its boundary claim still holds: its line 9 still says
  the audit changes nothing, so the target's lines 27 to 29 handing off the audit job is still
  accurate.
- I read `plugins/steering/shared/steering-rules.md` in full, including the sections below the
  tables, to work out what step 3's pointer actually resolves to. That is the evidence for new
  finding 1.
- I ran `git diff d72544f 19459c8` over the target, all five shared files, and the baseline record,
  to tell a fix apart from a pre-existing line. It changed nothing.
- I re-derived no mechanical limit by hand. The description length and body length results above
  are the lint's.
- The directory `/tmp/ste-audit-4/` already held reports from other runs. I wrote only this file
  and its two siblings and did not touch the others. No file inside the repository was created,
  edited, staged, or committed. The working tree is still clean at 19459c8.
