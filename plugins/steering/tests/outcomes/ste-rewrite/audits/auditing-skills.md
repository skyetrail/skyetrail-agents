# Audit: auditing-skills

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/auditing-skills/SKILL.md`

Rules applied: `plugins/steering/shared/skill-rules.md` and `plugins/steering/shared/steering-rules.md`.

Conditions met for the target's own use: **always**, **advisory**, **reused**. The **hand-off**
condition is not met, so `handoff-rules.md` supplies no rules here. The **changes something**
condition is not met, because the target states at line 9 that the audit changes nothing.

## 1. Lint result and coverage

`npm run lint` from `/Users/pete/workspace/skyetrail-agents` exits 0 and prints
`All generated files are up to date.` No lint problems reported.

`npm run lint -- --explain` reports that components get every check: frontmatter hazards, name
format and length, description length (limit 1024), body line count (limit 500), and reference
resolution. `skills/*/SKILL.md` is named as a component, and the name must match its directory.

The target is `skills/auditing-skills/SKILL.md`, so the lint reached it and every mechanical
check ran over it. No coverage gap. The mechanical limits are settled by the lint and are not
re-derived below. The one place a limit is cited is the 500-line body rule, which is recorded as
a pass on the lint's authority, not on a hand count.

## 2. Findings

Severity is the rule's severity from the rules file. Result is pass, fail, warn, or not
applicable. Every fail and warn carries evidence and a defect or difference mark.

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| **steering / Outcome** | | | |
| The finished outcome is stated, not just a topic or an area of work. (Blocking) | pass | | Line 8, "produces a findings list, in order of severity, and the three things to fix first" |
| The outcome statement sits at the top, before context and method. (Advisory) | pass | | Lines 8 to 9, directly under the H1 and above every other section |
| **steering / Context** | | | |
| Nothing refers to something the agent cannot resolve. (Blocking) | pass | | Lines 13 to 18 name four shared files by relative path, all resolved by the lint's reference check. `writing-skills` at line 30 is a sibling skill name, which this plugin resolves |
| Every fact the agent needs is either written out or pointed at by a path it can read. (Blocking) | warn | difference | Lines 34 to 35, "does not re-run checks that the target's own author already ran and recorded. Confirm the record is complete instead." Which checks, and where such a record lives, are neither written out nor pointed at. I cannot tell from the file whether this ever collides with step 1, which orders the lint run unconditionally |
| Approaches already tried and found not to work are stated. (Important) | pass | | Lines 118 to 119, "That was the earlier form. You could not compare two runs of it without rewriting one of them." This is a failed approach to the work, which `skill-rules.md` line 50 keeps in scope |
| Context sits above the method, so it is read before a plan is formed. (Advisory) | pass | | "Which rules apply" (line 11) and "Where this stops" (line 27) both precede "Workflow" (line 40) |
| **steering / Scope** | | | |
| What is in scope is named. (Blocking) | pass | | Lines 12 to 19, three target kinds each mapped to its rule files |
| What is out of scope is named explicitly. (Blocking) | pass | | Lines 21 to 22 and the whole "Where this stops" section, lines 29 to 38 |
| Membership test defines a named category, and any list of kinds carries an examples marker. (Blocking) | pass | | Lines 16 to 18 give the test ("Where a person wrote it to steer an agent, it belongs here") and the marker ("examples, not the whole list"). Line 61 marks both calibration lists. The three defect consequences at lines 122 to 124 carry no marker, but the membership test precedes them at line 122, which the rules file calls the stronger form |
| The instruction says to stop and report on reaching a scope limit. (Blocking) | pass | | Lines 21 to 24, stop and report for an out-of-scope target and for an unreadable file |
| The scope statement sits above the method. (Advisory) | pass | | Lines 11 and 27, both above line 40 |
| The instruction states the agent must not modify anything, and says what to do where a fix looks obvious. (Blocking, advisory) | pass | | Line 9 and lines 29 to 30, "Where a fix is obvious, name it in the report. Do not make the fix. Use `writing-skills` to apply it." |
| **steering / Method** | | | |
| One default approach is given rather than a menu of options. (Important) | pass | | Lines 42 to 56 give one numbered sequence. The two-audit variation at line 94 is conditional on a release gate and names the default at line 97 |
| The order is fixed where sequence affects correctness, and left open where it does not. (Blocking) | pass | | Steps 1 to 5, with step 4 stating the calibration runs before anything is written down |
| Constraints only where correctness or safety needs them, each saying why. (Important) | pass | | Each workflow step carries its reason, for example lines 49 to 50 and lines 54 to 55. Line 88 gives the one-finding-per-root-cause rule without a reason, which costs an agent nothing |
| Any check that must run before work starts is named as the first step. (Important) | pass | | Step 1 is the lint. The pre-work gates sit at lines 21 to 25, ahead of the workflow, and lines 23 to 25 say plainly that they decide whether the audit starts at all |
| **steering / Finish** | | | |
| A check the agent can run itself is named, and its result settles whether the work is done. (Blocking, changes something) | not applicable | | The target changes nothing, line 9 |
| The instruction says the agent runs the check itself before reporting. (Important) | pass | | Step 1, "Run the lint command named in `../../shared/lint.md` over the target. Record its result." |
| The finish criteria are specific enough that two runs would return the same result. (Blocking, advisory) | pass | | Step 3 fixes the four marks, the calibration fixes the default, and the Report section fixes the deliverable |
| The instruction says what evidence each finding must carry. (Important, advisory) | pass | | Lines 115 to 116, "Evidence is the line or section it came from" |
| The finish check sits late in the document. (Advisory) | pass | | The Report section is last, lines 110 to 138 |
| **steering / Failure** | | | |
| Conditions that should stop the work are stated. (Blocking) | pass | | Lines 21 to 24 |
| A retry limit is named, and something must change before a retry. (Important) | pass | | Lines 44 to 46 hand the lint retry case to `lint.md`, which at lines 50 to 53 says run it once more only after something changes, and otherwise record that it could not run |
| Weakening the check or editing the test to make it pass is forbidden. (Blocking, changes something) | not applicable | | The target changes nothing and runs no test it could edit |
| The instruction says what to do where the input is missing, is not what it expected, or cannot be assessed, giving a status for each case. (Blocking, advisory) | fail | difference | Unexpected input gets a status at line 22, "Report it as out of scope". Unassessable input gets one at line 84, "warn". Missing input gets an action but no status: lines 22 to 23, "Where you cannot read the target or a rule file, stop. Report that instead of auditing from memory." Two runs then word that stop differently. For a skill that runs inside a conversation there is no return-status vocabulary to draw on, so I cannot name a wrong action, only a less comparable report |
| The stop conditions sit directly after the finish check. (Advisory) | fail | difference | The stop conditions sit at lines 21 to 25, ahead of the workflow, and the Report section is at line 110. Lines 23 to 25 state the reason: they are pre-work gates that decide whether the audit starts at all. Sound, and nothing an agent does changes |
| **steering / Calibration** | | | |
| Examples of what counts are given. (Blocking, advisory) | pass | | Lines 63 to 70 |
| Examples of what does not count are given. (Blocking, advisory) | pass | | Lines 72 to 80 |
| The default outcome is stated. (Blocking, advisory) | pass | | Line 82, "The default outcome is pass" |
| Where a run showed a miss, the instruction describes the shape, not the label. (Important, advisory) | pass | | The three misses in `tests/baselines/auditing-skills.md` each appear as a shape: prose tiers at line 118, taste findings at lines 73 to 78, sibling skill names at lines 79 to 80 |
| **steering / Composition** | | | |
| Every named hole in a template is marked required, or carries a default. (Important, reused) | **fail** | **defect** | The fixed table at lines 112 to 113 has three columns, Rule, Result, Evidence. The same section then requires counts by severity (line 116) and a defect or difference mark on every fail and warn (line 121). Neither has a column, and line 117 says keep the table's wording fixed. An agent either drops the marks or invents a column, and the comparability the section exists to protect is lost either way |
| The set of fields established for a template is fixed, and gathers no unused payload. (Advisory, reused) | pass | | Three columns, all three used |
| What happens to partial work when a run stops is stated. (Important, changes something) | not applicable | | The target changes nothing |
| **steering / Voice** | | | |
| A sentence that instructs names its actor, and that actor can choose to act. (Important) | pass | | The workflow uses bare imperatives addressed to the reading agent, the same form the rules files use |
| A sentence that states a property keeps the property's owner as its subject, and gains no actor. (Blocking) | pass | | Lines 8, 9, 29, 32, and 130 all keep the audit or the report as the subject |
| Nothing that cannot choose to act takes an action verb. (Important) | fail | difference | Lines 132 to 133, "A rule that fires at blocking severity on something nobody can name a consequence for reaches past what it can judge." `steering-rules.md` line 173 names a rule among things that cannot choose. The preceding sentence already names the reader as the actor, so no behaviour turns on it |
| **skill / Discovery** | | | |
| The description states the capability, in the words someone looking for it would use. (Blocking) | pass | | Frontmatter line 3, "Audits a skill or an agent prompt against the house rules and reports what to fix" |
| The description states the conditions that should trigger it. (Blocking) | pass | | Frontmatter line 3, "Use this whenever someone asks to review, check, audit, lint, or sanity-check..." |
| The description includes the file types, error text, and casual phrasings people actually type. (Important) | **fail** | **defect** | The description names only a skill, a SKILL.md, and a subagent prompt. Body lines 16 to 19 put a third class in scope: a command, a hand-off brief, a runbook, a one-off request, and anything else written to steer an agent. Someone who says "audit this runbook" or "check my slash command" does not match the description, so the skill does not load and the audit runs without the house rules |
| The description does not summarise the workflow or the process. (Important) | pass | | It names the output and the severity marks, not the steps |
| The description speaks in the third person. (Important) | pass | | "Audits a skill or an agent prompt..." |
| **skill / Boundary** | | | |
| The skill says what it does not cover. (Blocking) | pass | | "Where this stops", lines 27 to 38 |
| The skill names which skill takes over where it stops. (Important) | pass | | Line 30, "Use `writing-skills` to apply it" |
| The skill says a direct instruction from the person wins over the skill. (Important) | pass | | Line 38 |
| **skill / Content** | | | |
| The first lines say what the skill produces, before any steps. (Important) | pass | | Lines 8 to 9 |
| Nothing explains something the model would already know. (Blocking) | pass | | Every paragraph is local to this plugin's scheme |
| Content that would not change what an agent does is absent. (Important) | pass | | The closest candidates all earn their place: lines 23 to 25 tell the agent the gates run before the workflow, and lines 134 to 138 resolve a conflict between this file and `steering-rules.md` |
| The skill uses one term for one thing throughout. (Important) | **fail** | **defect** | Line 8 calls the output "a findings list, in order of severity". Lines 112 to 119 call it a fixed table and forbid "findings as prose ranked by severity". An agent that reads the outcome line and starts writing produces the form the Report section rejects, which is the first failure recorded in `tests/baselines/auditing-skills.md`. Same root cause as the Composition fail: the table specification and the rest of the document describe different artifacts |
| Time-sensitive material is absent. (Important) | pass | | No dates, versions, or dated claims in the body |
| The skill does not document a constraint a script or a regex could enforce. (Important) | pass | | Step 1 hands every mechanical limit to the lint and the findings never re-argue them, lines 42 to 48 |
| **skill / Loading** | | | |
| The SKILL.md body is 500 lines or fewer. (Blocking) | pass | | Settled by the lint, which checks body line count against a 500 limit on `skills/*/SKILL.md` and exits clean |
| Every reference is one hop from the SKILL.md that names it. (Blocking) | pass | | Lines 13 to 18, 30, and 42 name four shared files and one sibling skill, all one hop. `lint.md` names `AGENTS.md` and `repo-setup` further out, but the SKILL.md does not |
| Detail sits in reference files rather than the front file. (Important) | pass | | The rules live in the shared files, the lint mechanics in `lint.md`. The front file keeps only what every run needs |
| A reference file longer than 100 lines opens with a contents list. (Advisory) | pass | | `steering-rules.md` runs past 100 lines and opens with a Contents list at line 24. The other three references are shorter |
| Material used to test the skill is not reachable from it, so it never loads with it. (Important) | pass | | The SKILL.md names no test path. `tests/baselines/` is named only inside the Evidence rule in `skill-rules.md`, where an auditor is required to check it against the audited skill. The lint confirms it never opens anything under `tests/` |
| No reference file instructs the reader to ignore or skip part of itself. (Important) | pass | | `handoff-rules.md` line 4 and `steering-rules.md` line 20 gate a whole separate file, which is the form this rule asks for |
| **skill / Evidence** | | | |
| The skill went through a baseline comparison, with and without it loaded. (Blocking) | pass | | `plugins/steering/tests/baselines/auditing-skills.md` records rounds 1 to 3, names the model and the comparison target, and states what each side produced. Nothing links to it |

## 3. Counts

Rules checked: 57. Pass 47, fail 6, warn 1, not applicable 3.

Escalated rows by rule severity:

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 1 | 1 | 2 |
| Important | 4 | 0 | 4 |
| Advisory | 1 | 0 | 1 |

Counted one per root cause, the seven rows are six findings. The Composition fail and the
one-term-one-thing fail share a root cause: the report template and the surrounding requirements
describe different artifacts. Findings by severity: Blocking 2, Important 3, Advisory 1.

Defects 2. Differences 4.

Only a defect blocks. Both defects sit at Important severity, so nothing here is a blocking
defect. The two blocking rows are both differences, which by the target's own rule at lines 129
to 133 do not hold it back and read instead as a signal about the rule.

## 4. The three fixes to make first

1. **Give the report table a Severity column and a Defect or difference column.** Lines 112 to
   113 versus lines 116 and 121. The report cannot be produced as written today, because two
   required marks have nowhere to go while line 117 forbids changing the table. Fixing this also
   settles the second fail: line 8 can then say the audit produces the table, in place of "a
   findings list, in order of severity", which is the form line 118 rejects.
2. **Widen the description to name the third target class.** Frontmatter line 3 versus body lines
   16 to 19. Add commands, runbooks, hand-off briefs, and one-off prompts written for an agent.
   The skill audits them and nobody asking about them reaches the skill.
3. **Name a status for the case where the target or a rule file cannot be read.** Lines 22 to 23.
   The action is right and the stop is right. Give the stop a name, the way line 22 names "out of
   scope" and line 84 names "warn", so two runs report the same stop the same way.

## 5. Anything I did that nobody asked for

- I read `plugins/steering/tests/baselines/auditing-skills.md`. The Evidence rule in
  `skill-rules.md` requires checking it, so the audit could not settle that rule without it.
- I read `plugins/steering/shared/handoff-rules.md` and `plugins/steering/shared/lint.md`. Both
  are named by the target, so step 2 of its own workflow covers them. No hand-off rule was
  applied to the target, because the hand-off condition is not met for its own use.
- I ran `grep` over `eng/generate-readmes.mjs` to see what the lint's "reference resolution"
  check does. `lint.md` line 47 permits reading the script to establish coverage. It confirmed
  the check tests that a referenced path exists, and that it does not measure hop depth, so the
  one-hop rule stayed a judgment call and is marked as such above.
- I created `/tmp/ste-audit/` to hold this file. No file inside the repository was created,
  edited, staged, or committed. The working tree is still clean at 7deb2ae.
- I did not re-derive any mechanical limit by hand. The 500-line body result above is the lint's,
  not a count of mine.
