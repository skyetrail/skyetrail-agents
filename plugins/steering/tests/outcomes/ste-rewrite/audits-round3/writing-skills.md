# Re-audit round 3: writing-skills

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/writing-skills/SKILL.md`

Prior report compared against:
`/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits-round2/writing-skills.md`,
which audited this target at commit d015e2e.

Rules applied: `plugins/steering/shared/skill-rules.md` and `plugins/steering/shared/steering-rules.md`.

Conditions met for the target's own use: **always**, **reused**, **changes something**, **describes
work**. The **advisory** condition is not met, so every rule conditioned on advisory is not
applicable, including the whole Calibration table. The **hand-off** condition is not met, so
`handoff-rules.md` supplies no rules here and was not applied. The **describes work** condition
replaces the **catalogue** condition the prior round used, and it is met: lines 8 to 9 name a finished
outcome, a SKILL.md and its reference files and evidence that it changes behaviour. So Method, Finish,
and Failure all apply, as they did under the prior condition.

Working tree clean at d72544f. Nothing in the repository was created, edited, staged, or committed.

## 1. Lint result and coverage

`npm run lint` from `/Users/pete/workspace/skyetrail-agents` exits 0 and prints `All generated files
are up to date.` It prints one advisory line, about a different file:

```
lint (advisory): plugins/steering/SUMMARY.md: is 193 lines and has no "## Contents" heading;
a reference file over 100 lines opens with a contents list
```

That advisory does not concern the target. Recorded once and it does not block.

`npm run lint -- --explain` reports that components get every check: frontmatter hazards, name format
and length, description length limit 1024, body line count limit 500, and reference resolution.
`skills/*/SKILL.md` is a component and its name must match its directory.

The target is `skills/writing-skills/SKILL.md`. **The lint reached it and every mechanical check ran
over it.** No coverage gap. Nothing mechanical was re-derived by hand.

Two coverage notes.

- The explain output says nothing under a plugin's `tests/` is opened. So the lint says nothing about
  `plugins/steering/tests/baselines/writing-skills.md`, which the Evidence rule depends on and which
  the brief asked me to check. That was checked by reading, and it produced the first new finding
  below.
- The 100-line contents-list rule has left `skill-rules.md` since the prior report and now lives only
  in the lint, which is why the SUMMARY.md advisory appears in the lint output rather than as a
  judgment finding here.

## 2. Prior findings

The prior report carried four rows in its findings table and four in its new-findings table. All eight
are tracked here.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| **Content.** Content that would not change what an agent does is absent. Steps 2 and 3 restated tables from `skill-rules.md`, and both copies had drifted. (Important, fail, defect) | retired | Retired in the prior round and still retired for the rule tables. Step 2 at lines 44 to 45 and step 3 at lines 49 to 51 still point at named tables rather than copying rule text. A different restatement now sits in step 3, of the section order rather than of the rules, and that is tracked under the Method row below rather than reopening this one |
| **Evidence.** Baseline records linked from nothing. (Blocking, fail, difference) | retired | Retired in the prior round on the wording "and no SKILL.md links to it", and it stays retired under the wording that replaced it at `skill-rules.md` line 86, "Nothing an agent loads at run time links to that directory". A repository grep for `tests/baselines` finds links in `plugins/steering/README.md:220`, `plugins/steering/SUMMARY.md:192`, `DECISIONS.md`, and the generator. Nothing points an agent at any of those at run time: no SKILL.md, agent, or command file names them, and only `CONTRIBUTING.md` and `eng/generate-readmes.mjs` do. The target's own line 59 is a write destination carrying the placeholder `<skill-name>`, not a link |
| **Context.** Step 6 said "the plugin's `tests/baselines/`" and supported two readings. (Blocking, warn, defect) | retired | Retired in the prior round and unchanged since. Step 6 lines 58 to 60 still read "under the plugin directory that holds the skill you are writing" |
| **Scope.** Step 3's list of what the body must contain was closed and named no rules file. (Blocking, fail, defect) | changed | The main half is fixed. Step 3 line 49 now reads "Write it against every rule in that file", where that file is `../../shared/steering-rules.md`, so the rules requiring a failure section, a finish check, and a partial-work statement are reached. The residual the prior round folded in survives: line 50 still fixes the `skill-rules.md` set at "the Boundary and Content tables", so a table added to that file to govern the body would not be reached. Harm is now small, because all five of its current tables are reached across the workflow, Discovery by step 2, Boundary and Content by step 3, Loading by step 5, and Evidence by step 6. Reduced from fail and defect to warn and difference |
| **N1. Method.** The instruction constrains how the work is done only where correctness needs a specific way, and each constraint says why. Step 3's order contradicted `steering-rules.md`. (Important, fail, defect) | changed | The contradiction is gone and a different one replaces it. Step 3 line 47 now says "Order the sections the way `../../shared/steering-rules.md` orders its own", and scope now precedes method, which the prior round asked for. But line 48 then restates that order as a five-item list, "what the skill produces, then its scope, then the method, then the finish, then the failures", and the copy has already dropped Context, Calibration, and Composition from the order in that file's own contents list at its lines 31 to 40. The consequence is nameable and worse than the one it replaced: an agent writing an advisory skill follows step 3's order and ships a body with no calibration section, and the Calibration table holds three Blocking rules. Context also carries an Important rule, approaches already tried and found not to work. The constraint still carries no reason, which the rule requires, so that half is unchanged |
| **N2. Context.** Step 6 gives no fallback for a skill that sits in no plugin. (Blocking, warn, defect) | confirmed | Step 6 lines 57 to 61 are unchanged. A skill written into a repository's own `.claude/skills/` has no plugin directory, and step 6 still gives no fallback, while line 70 makes that record the gate |
| **N3. Evidence.** The baseline record stopped before the current steps 2, 3, and 6 existed. (Blocking, warn, defect) | retired | `plugins/steering/tests/baselines/writing-skills.md` now carries an entry at lines 54 to 77, "Steps 2, 3, and 6 changed, 2026-08-07, baseline not repeated". The gap the finding named is closed: an agent making the next change can now tell that the current text was not exercised. What the entry says about step 3 is wrong, and that is filed as a new finding below rather than as a survival of this one, because it is a different fault from the record being absent |
| **N4. Voice.** Nothing that cannot choose to act takes an action verb. (Important, warn, difference) | confirmed | Line 60 is unchanged, "That is the directory the Evidence rule in `../../shared/skill-rules.md` reads". This round's step 3 fix added another of the same family at line 47, "the way `../../shared/steering-rules.md` orders its own". Same root cause, so not counted again, and the rule's verdict does not move |

Retired 4. Confirmed 2. Changed 2.

On the deliberate changes, judged rather than reported as drift.

- **Step 3 naming `steering-rules.md`.** Works, and it is the single most valuable change of the
  round. It closes the prior blocking defect outright.
- **Step 3 deferring to that file's section order.** Half works. Deferring was right. Restating the
  order in the same sentence undid it, and the restatement drifted on the first writing. See the
  changed N1 row.
- **The baseline record entry.** The entry exists and covers the right three steps. Two of its three
  paragraphs are accurate. The third misdescribes step 3. See the first new finding.

## 3. New findings

Only rows the prior report does not contain.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| **skill / Evidence.** The plugin's `tests/baselines/` directory holds the observed failures the skill addresses. | Blocking | warn | **defect** | The new entry misdescribes what changed. `tests/baselines/writing-skills.md` lines 70 to 72 say step 3's ordering line "now defers to that file's order rather than restating one". Step 3 does restate one, at SKILL.md line 48, and the restatement has already dropped Context, Calibration, and Composition. The record therefore certifies as fixed the exact fault that is still there in a new form. What an agent does wrong: an agent making the next change reads the record, believes no copy of the order exists in step 3, and does not check that copy against `steering-rules.md` when that file's section list changes. The record's other two paragraphs check out against the diffs, the audit-fix paragraph at lines 64 to 68 and the pointer-fix account both match `d015e2e..d72544f`. Marked warn because the Evidence rule's letter is met, the directory holds a with-and-without comparison and the failures the skill addresses at lines 12 to 20, and only the currency entry's accuracy is wrong |
| **skill / Loading.** No reference file instructs the reader to ignore or skip part of itself. Content that one caller must skip is a separate file. | Important | **fail** | **difference** | `../../shared/lint.md`, named by the target at step 7 line 62, ends with a section headed "In the repository this plugin is developed in", and its lines 63 to 64 read "Where they differ, use **Finding the command** above and ignore this section." That is content one caller must skip, sitting in the same file rather than a separate one, which is the shape the rule names. Present at d015e2e and not raised by the prior report, whose section 5 records the files it opened and does not include `lint.md`. Marked a difference because the gate is the first sentence of the same section, lines 61 to 63, so an agent reaches the skip instruction already knowing the section is not for it, and I cannot name a wrong action |
| **steering / Finish.** A check the agent can run itself is named, and its result settles whether the work is done. | Blocking | warn | difference | The small-change clause at lines 80 to 82 lets an agent skip the baseline and run step 7 alone, on a per-change test with no cumulative bound. `tests/baselines/writing-skills.md` records four consecutive uses of it across three rounds, at its lines 43 to 44, line 50, and lines 76 to 77, "Handled under the small-change clause each time". So no with-and-without run has ever been made against the current steps 2, 3, and 6, and step 3 is the step this audit finds two faults in. Line 70 makes the baseline "the gate", and the gate has not closed on the text now in the file. Marked a difference because every individual use of the clause is within what the text allows and I cannot name a wrong action, only that the evidence is now three rounds older than the text it certifies |

The brief asked me to say plainly where a fix introduced a new problem. Two did.

- **Step 3.** The fix removed the order that contradicted `steering-rules.md` and introduced a
  restatement of that file's order which dropped three sections. Recorded as the changed N1 row rather
  than as a new finding, because the rule, the text, and the root cause are the same as the prior
  round's.
- **The baseline record entry.** The fix closed the missing-record finding and asserted something
  about step 3 that is not true. Recorded as the first new finding above, because it is a different
  fault from the one it fixed.

## 4. Counts by severity

New findings.

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 0 | 2 | 2 |
| Important | 1 | 0 | 1 |
| Advisory | 0 | 0 | 0 |

New findings: 3. Defects 1. Differences 2.

Surviving prior findings, meaning confirmed plus changed.

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 0 | 2 | 2 |
| Important | 1 | 1 | 2 |
| Advisory | 0 | 0 | 0 |

Surviving: 4. Defects 2. Differences 2.

Combined open: 7 findings. Defects 3, differences 4. Blocking 4, Important 3, Advisory 0.

Movement since the prior round: 4 retired, 2 confirmed, 2 changed, 3 new. The prior round had 1
surviving plus 4 new, so 5 open, with 4 defects. This round has 7 open with 3 defects. The count rose
because the prior round's own fixes are what the two changed rows and one of the new rows are about.
No fail sits at Blocking severity this round, which is the first time across the three rounds.

### The three fixes to make first

1. **Delete the restated order from step 3 line 48, keeping only the pointer at line 47, and say why
   the order is what it is.** This is the highest-value fix. It closes the changed N1 row, stops the
   copy drifting again, and removes the sentence the baseline record already describes incorrectly.
2. **Correct the step 3 paragraph in `tests/baselines/writing-skills.md` lines 70 to 72.** It
   currently certifies the restatement as gone. If fix 1 lands first, this becomes true and the entry
   only needs the date and the wording adjusted.
3. **Add a fallback to step 6 for a skill that sits in no plugin.** Unchanged from the prior round's
   list, still open, still the only rule the target reaches with no destination at all.

## 5. Anything I did that nobody asked for

- I read `plugins/steering/shared/lint.md`, which step 7 names, and it produced the second new
  finding. I did not open `plugins/steering/shared/handoff-rules.md`: both rule files state that a
  non-hand-off document never reads it, and the target does not name it.
- I re-tested the retired Evidence finding against the clause that replaced the one the prior round
  retired it on. The wording changed in the same commit range, so taking the prior verdict forward
  would have been unsound. I grepped the repository for `tests/baselines` and checked what names
  `SUMMARY.md` and `README.md`, which is what settles that neither loads at run time.
- I read `plugins/steering/tests/baselines/writing-skills.md` in full and checked its new entry
  paragraph by paragraph against `git diff d015e2e d72544f`. The brief asked for this. Two of three
  paragraphs check out; the third is the first new finding.
- I read `plugins/steering/shared/dispatch-protocol.md` and grepped for what names it, to confirm it
  is not a rules file this target should be routed to. It is not: its line 8 says `writing-agents`
  applies it.
- I read `plugins/steering/skills/auditing-skills/SKILL.md` in full, because step 7 hands the draft to
  it and I was auditing both targets. Its boundary claim still holds, line 9 still says the audit
  changes nothing, so the target's line 27 to 28 handoff of the audit job is still accurate.
- I ran `git diff d015e2e d72544f` over the target and all five shared files, and `git log -S` over
  `lint.md`, to tell a fix apart from a pre-existing line and to establish that the `lint.md` skip
  instruction predates this round. It changed nothing.
- I created `/tmp/ste-audit-3/` to hold this file. No file inside the repository was created, edited,
  staged, or committed. The working tree is still clean at d72544f.
- I did not re-derive any mechanical limit by hand. The description length and body length results
  above are the lint's.
