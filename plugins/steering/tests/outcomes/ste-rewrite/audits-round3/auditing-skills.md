# Re-audit round 3: auditing-skills

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/auditing-skills/SKILL.md`

Prior report compared against:
`/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits-round2/auditing-skills.md`

Rules applied: `plugins/steering/shared/skill-rules.md` and `plugins/steering/shared/steering-rules.md`.

Conditions met for the target's own use: **always**, **advisory**, **reused**, **describes work**.
The **hand-off** condition is not met, so `handoff-rules.md` supplies no rules here. The **changes
something** condition is not met, because line 9 states that the audit changes nothing. The
**describes work** condition replaces the **catalogue** condition the prior round criticised, and it
is met: lines 8 to 9 name a finished outcome the reader produces, a findings table and the three
things to fix first. So the Method, Finish, and Failure sections of `steering-rules.md` all apply.

Working tree clean at d72544f. Nothing in the repository was created, edited, staged, or committed.

## 1. Lint result and coverage

`npm run lint` from `/Users/pete/workspace/skyetrail-agents` exits 0 and prints `All generated files
are up to date.` It prints one advisory line, and that line is about a different file:

```
lint (advisory): plugins/steering/SUMMARY.md: is 193 lines and has no "## Contents" heading;
a reference file over 100 lines opens with a contents list
```

That advisory does not concern the target. Recorded once, as an advisory item should be, and it does
not block.

`npm run lint -- --explain` reports that components get every check: frontmatter hazards, name format
and length, description length limit 1024, body line count limit 500, and reference resolution.
`skills/*/SKILL.md` is named as a component, and its name must match its directory.

The target is `skills/auditing-skills/SKILL.md`. **The lint reached it and every mechanical check ran
over it.** No coverage gap. The mechanical limits are settled by the lint and are not re-derived
below. No limit was counted by hand.

One coverage note. The explain output says nothing under a plugin's `tests/` is opened, so the lint
says nothing about `plugins/steering/tests/baselines/auditing-skills.md`, which the Evidence rule
depends on. That was checked by reading.

A second coverage note, new this round. The 100-line contents-list rule left `skill-rules.md` and now
lives only in the lint, which is why the advisory above appears in the lint output rather than in a
finding here.

## 2. Prior findings

The prior report carried seven rows in its findings table and three rows in its new-findings table.
All ten are tracked here.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| **Context.** Every fact the agent needs is written out or pointed at. (Blocking, warn, difference) | confirmed | Lines 42 to 43 are unchanged. "This audit does not re-run checks that the target's own author already ran and recorded. Confirm the record is complete instead." Which checks, and where such a record lives, are still neither written out nor pointed at |
| **Failure.** A status for missing, unexpected, or unassessable input. (Blocking, fail, difference) | confirmed | Lines 28 to 29 are unchanged. The unreadable-target case at line 29 still gets an action and no status name, "Report that instead of auditing from memory", while line 28 names "out of scope" for the not-in-scope case and line 91 names "warn" for the cannot-tell case |
| **Failure.** The stop conditions sit directly after the finish check. (Advisory, fail, difference) | confirmed | The stop conditions still sit at lines 28 to 32, ahead of the workflow, and the Report section is still last, at line 116. Lines 30 to 32 still give the reason |
| **Composition.** Every named hole in a template is marked required or carries a default. (Important, fail, defect) | retired | Line 118 now reads `Rule \| Severity \| Result \| Defect or difference \| Evidence`. Severity has a column, so the counts required at line 123 and the ordering promised at line 8 have a home in the fixed table. The half the prior round called surviving is closed |
| **Discovery.** The description includes the file types and casual phrasings people type. (Important, fail, defect) | retired | Retired in the prior round and still retired. Line 3 is unchanged and still names a SKILL.md, a slash command, a hand-off brief, a runbook, and an AGENTS.md or CLAUDE.md instruction file |
| **Content.** The skill uses one term for one thing throughout. (Important, fail, defect) | retired | Line 8 now reads "This audit produces a findings table, ordered by severity". The word "list" is gone. Lines 124 to 125 still forbid prose ranked by severity, and the opening and the Report section now use the same term for the same thing |
| **Voice.** Nothing that cannot choose to act takes an action verb. (Important, fail, difference) | confirmed | Lines 136 to 137 are unchanged. "A rule that fires at blocking severity on something nobody can name a consequence for reaches past what it can judge." Lines 50 to 51 are also unchanged, "The findings never re-argue them". This round's edits added two more constructions of the same family, line 9 "The Report section below fixes that table's columns" and lines 25 to 26 "the same document answers to more than one name", both introduced by the routing and outcome fixes. Same root cause, so not counted again, and the rule's verdict does not move |
| **Finish.** The finish criteria are specific enough that two runs would return the same result, on the hand-off routing. (Blocking, fail, defect) | changed | The named case is fixed. Line 13 now applies `steering-rules.md` to every target, and lines 17 to 19 name the hand-off condition itself and give "a prompt written for a subagent and a hand-off brief" as two examples of it, so both now reach `handoff-rules.md`. The mechanism survives in a narrower form: line 22 still carries an exclusivity claim, "and `../../shared/steering-rules.md` alone covers it", inside a bullet whose examples are "A command, a runbook, and a one-off request". A runbook handed to a subagent meets both bullet 2 and bullet 3, and bullet 3 says steering rules alone cover it. Lines 13 to 14 and lines 24 to 26 both push the other way, so the reading is recoverable, which is why this is reduced rather than confirmed |
| **Loading.** No reference file instructs the reader to ignore or skip part of itself, on the catalogue block. (Important, fail, defect) | retired | The catalogue condition is gone. `steering-rules.md` lines 66 to 68 now gate on **describes work**, and the Applies when column of all three tables carries that same condition at lines 131 to 134, 141, 144, 150 to 151, and 154. The prose no longer contradicts the tables, so an agent working the tables alone reaches the same answer. The residual is that the prose switches off all three sections while five rows in them are conditioned on **advisory** or **changes something** instead. Both of those conditions imply a task, so the combination is unreachable, and no consequence follows. Not filed |
| **Context.** Every fact the agent needs is written out or pointed at, on the default outcome. (Blocking, warn, difference) | retired | `skill-rules.md` lines 8 to 11 no longer claim the default outcome lives in the two skills. The list now reads "The stop conditions and the evidence each finding carries are two examples, not the whole list". `steering-rules.md` lines 17 to 19 state the default and say it holds for any audit that reads the file, and the target points at it at line 89. The loose end is closed |

Retired 5. Confirmed 4. Changed 1.

On the deliberate changes, judged rather than reported as drift.

- **The condition-based routing.** Works for the case the prior round named. Every kind of target now
  reaches every file that should apply to it, with one wrinkle checked below.
- **The `describes work` condition.** Works. It is decidable from the document, the test is stated at
  `steering-rules.md` lines 56 to 63, and the Applies when columns now carry it, which is what retired
  the prior Loading finding.
- **The Severity column.** Works. It retires the Composition finding outright.
- **The findings table wording at line 8.** Works. It retires the one-term finding.

The routing check the brief asked for, kind by kind. A SKILL.md that is not a hand-off gets
`steering-rules.md` and `skill-rules.md`, correct. A subagent prompt and a hand-off brief both get
`steering-rules.md` and `handoff-rules.md`, correct, and this is the fix. A command, a runbook, or a
one-off request that is not a hand-off gets `steering-rules.md` alone, correct, because
`skill-rules.md` line 6 says its entries apply to a SKILL.md "and not otherwise". A reused template
that is not a SKILL.md gets `steering-rules.md` alone, correct, because the two Composition rules
conditioned on **reused** live in that file. `dispatch-protocol.md` is never routed to, and that is
correct too: its line 8 says `writing-agents` applies it, and it covers the caller's side rather than
a document's properties. The one wrinkle is the runbook-at-hand-off overlap recorded in the changed
row above.

## 3. New findings

Only rows the prior report does not contain.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| **steering / Finish.** The finish criteria are specific enough that two runs would return the same result. | Blocking | **fail** | **defect** | Line 112 gives exactly two marks for a prior finding, "Confirm or retire each prior finding", and the fixed table at line 118 has no column for a prior-finding status. A prior finding that is partly fixed fits neither mark. The prior report over this same target had to invent a third mark, "changed", and used it on its Composition row; this re-audit had to use it again, on the routing row. The skill names it nowhere. Two runs facing the same half-fixed row can legitimately mark it confirmed or retired and disagree. What an agent does wrong: a half-fixed row marked retired tells the reader the work is done when part of it is not, which is what the round-2 Composition row would have said had the auditor followed line 112 literally. The Report section also fixes the columns of one table only, so the prior-findings table a re-audit must produce has no fixed wording, and line 124 asks the reader to compare two runs without editing either |
| **skill / Loading.** No reference file instructs the reader to ignore or skip part of itself. Content that one caller must skip is a separate file. | Important | **fail** | **difference** | `../../shared/lint.md`, named by the target at line 49, ends with a section headed "In the repository this plugin is developed in", and its lines 63 to 64 read "Where they differ, use **Finding the command** above and ignore this section." That is content one caller must skip, sitting in the same file rather than a separate one, which is the shape the rule names. Present at d015e2e and not raised by the prior report, which records reading `lint.md` but filed nothing against it. Marked a difference because the gate is the first sentence of the same section, lines 61 to 63, so an agent reaches the skip instruction already knowing the section is not for it, and I cannot name a wrong action |
| **steering / Finish.** The finish criteria are specific enough that two runs would return the same result. | Blocking | warn | difference | Second root cause, on the rule set the target sends every SKILL.md through at line 16. The round-2 fix reworded the Evidence rule at `skill-rules.md` line 86 from "and no SKILL.md links to it" to "Nothing an agent loads at run time links to that directory". The first form was decidable by grep. The second turns a Blocking verdict on a judgment about the harness that the repository does not settle. `plugins/steering/SUMMARY.md:192` and `plugins/steering/README.md:220` both link `tests/baselines/`, and the lint's own explain output groups a plugin's SUMMARY.md with the files under `shared/` as "reference surfaces", which is the class skills do load. An auditor reading SUMMARY.md as loaded at run time fails every skill in this plugin on a Blocking rule. Marked a difference because nothing points an agent at SUMMARY.md at run time, only `CONTRIBUTING.md` and the generator name it, so both readings land on pass today. Recorded because a prior fix traded a checkable clause for one that is not |

Two notes the brief asked for explicitly, on fixes that introduce new problems.

- The routing fix did not introduce a new problem. It reduced the old one and left an exclusivity
  word behind, recorded as the changed row above rather than as a new finding.
- The outcome and routing edits added two more instances of the already-failing Voice rule, at line 9
  and at lines 25 to 26. Said plainly here, folded into the confirmed Voice row rather than counted
  again, because the rule was already failing and the root cause has not changed.

## 4. Counts by severity

New findings.

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 1 | 1 | 2 |
| Important | 1 | 0 | 1 |
| Advisory | 0 | 0 | 0 |

New findings: 3. Defects 1. Differences 2.

Surviving prior findings, meaning confirmed plus changed.

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 1 | 2 | 3 |
| Important | 1 | 0 | 1 |
| Advisory | 1 | 0 | 1 |

Surviving: 5. Defects 1. Differences 4.

Combined open: 8 findings. Defects 2, differences 6. Blocking 5, Important 2, Advisory 1.

Movement since the prior round: 5 retired, 4 confirmed, 1 changed and reduced, 3 new. The prior round
had 5 surviving plus 3 new, so 8 open, with 3 defects. This round has 8 open with 2 defects. The one
blocking defect the prior round named as the only thing holding the target back is now reduced to a
warn. One new blocking defect replaces it, on the re-audit marks.

By the target's own rule at lines 134 to 137, only a defect blocks. Two defects stand: the two-marks
gap in the Re-auditing section, and the confirmed status-for-unassessable-input row, which the prior
round already marked a difference and which I leave marked as it was.

### The three fixes to make first

1. **Name the third mark in the Re-auditing section, and fix the columns of the prior-findings
   table.** Lines 110 to 114. This is the one new blocking defect. A skill whose whole point is a
   report two runs can compare has an unfixed table in the one report shape it produces most often.
2. **Drop "alone" from line 22, or gate bullet 3 on the hand-off condition not being met.** The
   routing fix works everywhere else. One word carries the residual.
3. **Give the unreadable-target case a status name at line 29.** The other two stop cases have one.
   This is the oldest surviving row and the cheapest to close.

## 5. Anything I did that nobody asked for

- I read `plugins/steering/shared/lint.md` and `plugins/steering/shared/handoff-rules.md`. Both are
  named by the target, so step 2 of its own workflow covers them. No hand-off rule was applied to the
  target, because the hand-off condition is not met for its own use. `lint.md` produced the second new
  finding.
- I read `plugins/steering/shared/dispatch-protocol.md` and grepped for what names it, to test the
  routing claim in the brief. The target never routes to it, and that is correct. Not a finding, and
  recorded here rather than in the table.
- I read `plugins/steering/tests/baselines/auditing-skills.md`, which the Evidence rule requires
  checking. That rule passes. Its line describing "the fixed Rule, Result, Evidence table" is now
  three columns out of five rather than three out of four. I am not reporting that as a finding, for
  the same reason the prior round gave: it is a dated test record, and the lint's explain output says
  files under `tests/` are records that may cite paths from earlier rounds.
- I grepped the repository for `tests/baselines` and read `plugins/steering/SUMMARY.md` around line
  192, to test the reworded Evidence clause rather than take the prior round's verdict on the old
  wording. That is the evidence for the third new finding.
- I ran `git diff d015e2e d72544f` over the target and all five shared files, and `git log -S` over
  `lint.md`. This was to tell a fix apart from a pre-existing line when marking prior findings, and to
  establish that the `lint.md` skip instruction predates this round. It changed nothing.
- I noticed that `steering-rules.md` uses the word "closed" for a list that fails the rule at its line
  114 and for a list that satisfies it at its line 118. No rule in the two files I applied covers term
  consistency inside a reference file, so I filed nothing. Recorded here because it would confuse an
  auditor working that section.
- I created `/tmp/ste-audit-3/` to hold this file. No file inside the repository was created, edited,
  staged, or committed. The working tree is still clean at d72544f.
- I did not re-derive any mechanical limit by hand. The description length and body length results
  above are the lint's.
