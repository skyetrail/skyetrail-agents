# Re-audit: auditing-skills

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/auditing-skills/SKILL.md`

Prior report compared against:
`/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits/auditing-skills.md`

Rules applied: `plugins/steering/shared/skill-rules.md` and `plugins/steering/shared/steering-rules.md`.

Conditions met for the target's own use: **always**, **advisory**, **reused**. The **hand-off**
condition is not met, so `handoff-rules.md` supplies no rules here. The **changes something**
condition is not met, because line 9 states that the audit changes nothing. The **catalogue**
condition is not met either, because the target states a workflow of its own at lines 40 to 56.

Working tree clean at d015e2e. Nothing in the repository was created, edited, staged, or committed.

## 1. Lint result and coverage

`npm run lint` from `/Users/pete/workspace/skyetrail-agents` exits 0 and prints
`All generated files are up to date.` No lint problems reported.

`npm run lint -- --explain` reports that components get every check: frontmatter hazards, name
format and length, description length (limit 1024), body line count (limit 500), and reference
resolution. `skills/*/SKILL.md` is named as a component, and its name must match its directory.

The target is `skills/auditing-skills/SKILL.md`, so the lint reached it and every mechanical check
ran over it. No coverage gap. The mechanical limits are settled by the lint and are not re-derived
below. The widened description at line 3 is longer than the one the prior report saw and is still
inside the 1024 limit on the lint's authority, not on a count of mine. The 500-line body rule left
`skill-rules.md` at this commit and now lives only in the lint, which removes the second copy the
prior report had to reconcile.

## 2. Prior findings

The prior report carried seven escalated rows, which it counted as six findings. Each row is
tracked here.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| **Context.** Every fact the agent needs is written out or pointed at. (Blocking, warn, difference) | confirmed | Lines 35 to 36 are unchanged. "This audit does not re-run checks that the target's own author already ran and recorded. Confirm the record is complete instead." Which checks, and where such a record lives, are still neither written out nor pointed at |
| **Failure.** A status for missing, unexpected, or unassessable input. (Blocking, fail, difference) | confirmed | Lines 22 to 23 are unchanged. The unreadable-target case still gets an action and no status name, while line 22 names "out of scope" and line 84 names "warn" for the other two cases |
| **Failure.** The stop conditions sit directly after the finish check. (Advisory, fail, difference) | confirmed | The stop conditions still sit at lines 21 to 25, ahead of the workflow, and the Report section is still last, at line 109. Lines 23 to 25 still give the reason |
| **Composition.** Every named hole in a template is marked required or carries a default. (Important, fail, defect) | changed | Half fixed. Line 111 now reads `Rule \| Result \| Defect or difference \| Evidence`, and line 120 requires the mark on every fail and warn, so the table and the prose around it agree on that mark. Severity survives in the same shape: line 115 requires counts by severity and line 8 promises findings "in order of severity", the table carries no severity column, and line 116 says keep the table's wording fixed |
| **Discovery.** The description includes the file types and casual phrasings people type. (Important, fail, defect) | retired | Line 3 now opens with "any document written to steer an agent" and names a slash command, a hand-off brief, a runbook, and an AGENTS.md or CLAUDE.md instruction file, which is the third class the body puts in scope at lines 16 to 19 |
| **Content.** The skill uses one term for one thing throughout. (Important, fail, defect) | confirmed | Line 8 is unchanged and still calls the output "a findings list, in order of severity". Lines 116 to 118 still require the fixed table and still forbid "findings as prose ranked by severity". The prior report's first fix asked for both the table and line 8. The table changed and line 8 did not, so this row no longer shares a root cause with the Composition row above in the way the prior report recorded, though both now turn on severity having no home in the table |
| **Voice.** Nothing that cannot choose to act takes an action verb. (Important, fail, difference) | confirmed | Lines 129 to 130 are unchanged. "A rule that fires at blocking severity on something nobody can name a consequence for reaches past what it can judge." A second instance sits at lines 42 to 44, "The findings never re-argue them", which reads as a property statement and is folded in here rather than counted again |

Retired 1. Confirmed 5. Changed 1.

## 3. New findings

Only rows the prior report does not contain.

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| **steering / Finish.** The finish criteria are specific enough that two runs would return the same result. (Blocking) | **fail** | **defect** | Lines 14 to 19 route the same kind of document two ways. A prompt written for a subagent gets `steering-rules.md` and `handoff-rules.md`. A hand-off brief is listed in the next bullet, which ends "Use `../../shared/steering-rules.md` only." Both meet the hand-off condition, which `handoff-rules.md` line 3 defines as the agent not seeing the conversation the author had. Line 18 then says to apply the conditions that match the document's own use, and `steering-rules.md` line 25 sends any hand-off to `handoff-rules.md`. So one run reads "only" as final and audits a hand-off brief against steering rules alone, missing every hand-off rule including two blocking ones at `handoff-rules.md` lines 60 and 75. Another run applies the condition and reads both files. Different rule sets, different findings. The widened description makes this fire more often, because line 3 now advertises "a hand-off brief" as a trigger phrase |
| **skill / Loading.** No reference file instructs the reader to ignore or skip part of itself. (Important) | **fail** | **defect** | `steering-rules.md` lines 52 to 55 tell a reader auditing a catalogue to skip the Method, Finish, and Failure sections of that same file. Every row in those three tables still carries "always" in its Applies when column, at lines 121 to 124, 130 to 134, and 140 to 144. The target's step 3 at lines 51 to 53 decides applicability from the rule's condition, so an agent working the tables applies rules that line 52 says are not applicable, and produces the consequence-free findings lines 54 to 55 name. This is not hypothetical for this plugin: `skill-rules.md` line 9, `handoff-rules.md` line 12, and `dispatch-protocol.md` line 8 all now declare the catalogue condition. The prior report marked this rule pass, citing the whole-file gates at `handoff-rules.md` line 4 and `steering-rules.md` line 25, which are still the right form. The new condition is the part that gates sections rather than a file |
| **steering / Context.** Every fact the agent needs is either written out or pointed at by a path it can read. (Blocking) | warn | difference | Line 82 now delegates the default outcome to `steering-rules.md`, which states it at lines 17 to 19 and says plainly that it holds for any audit that reads the file, whichever skill runs it. Every routing bullet at lines 13 to 18 includes that file, so the fact always lands. What the fix left behind is in the linked file: `skill-rules.md` line 10, added in the same commit, still says the default outcome lives in the two applying skills. It no longer lives in this one, and `writing-skills/SKILL.md` states none either. `handoff-rules.md` took the other arrangement in the same commit, delegating the default at line 6 and omitting it from the list at lines 12 to 13. From the target alone the fact is one hop away and nothing goes wrong, which is why this is a warn and a difference, not a fail |

On the four deliberate rule changes, judged rather than reported as drift:

- **Important severity now has a stated effect.** Works. `steering-rules.md` lines 14 to 15 cover
  the gap, and the target's closing paragraph narrows only the blocking sentence, so the two files
  do not collide on Important.
- **The catalogue condition.** The condition itself works and the target reaches it through line 18.
  The way it is written into `steering-rules.md` is the first new finding above.
- **Voice, naming the bare imperative case.** Works, and it removes an argument the prior report had
  to make by hand. `steering-rules.md` lines 191 to 192 now bless the form the target's workflow uses.
- **The default outcome moving to `steering-rules.md`.** Works for the target. The loose end is in
  `skill-rules.md`, third row above.

## 4. Counts by severity

New findings.

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 1 | 1 | 2 |
| Important | 1 | 0 | 1 |
| Advisory | 0 | 0 | 0 |

New findings: 3. Defects 2. Differences 1.

Surviving prior findings, meaning confirmed plus changed.

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 1 | 1 | 2 |
| Important | 3 | 0 | 3 |
| Advisory | 1 | 0 | 1 |

Surviving rows: 6. Defects 2. Differences 4. Counted one per root cause, the two Important rows
named Composition and one term for one thing both turn on severity having no home in the fixed
table, so surviving findings: 5. By severity, Blocking 2, Important 2, Advisory 1.

Combined, one blocking defect stands: the hand-off routing at lines 14 to 19. By the target's own
rule at lines 127 to 130 that is the only kind of finding that holds it back. The other blocking
rows are differences and read as signals about the rules rather than about the target.

## 5. Anything I did that nobody asked for

- I read `plugins/steering/shared/lint.md` and `plugins/steering/shared/handoff-rules.md`. Both are
  named by the target, so step 2 of its own workflow covers them. No hand-off rule was applied to
  the target, because the hand-off condition is not met for its own use.
- I read `plugins/steering/tests/baselines/auditing-skills.md`, which the Evidence rule in
  `skill-rules.md` requires checking. That rule passes. Line 26 of that record still describes "the
  fixed Rule, Result, Evidence table", which is now three columns out of four. I am not reporting
  that as a finding. It is a dated test record, and the lint's own explain output says files under
  `tests/` are records that may cite earlier rounds.
- I read `plugins/steering/skills/writing-skills/SKILL.md` far enough to check whether it states a
  default outcome, because `skill-rules.md` line 10 claims it does. It does not. That is evidence
  for the third new finding, not a separate audit of that skill.
- I ran `git diff HEAD~1 HEAD` over the target and the two rule files, and `git log`. This was to
  tell a fix apart from a pre-existing line when marking prior findings, and to see whether a fix
  left anything behind. It changed nothing.
- I created `/tmp/ste-audit-2/` to hold this file. No file inside the repository was created,
  edited, staged, or committed. The working tree is still clean at d015e2e.
- I did not re-derive any mechanical limit by hand. The body length and description length results
  above are the lint's, not counts of mine.
