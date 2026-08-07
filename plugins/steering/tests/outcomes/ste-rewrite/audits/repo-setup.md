# Audit: repo-setup

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/repo-setup/SKILL.md`
Rules: `plugins/steering/shared/skill-rules.md`, `plugins/steering/shared/steering-rules.md`
Repository at commit `7deb2ae`, working tree clean. No file was changed except this report.

## 1. Lint result, and whether the lint reached the target

`npm run lint` from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
All generated files are up to date.
```

Clean.

`npm run lint -- --explain` reports that components get every check: frontmatter hazards, name
format and length, description length (limit 1024), body line count (limit 500), and reference
resolution. It names `skills/*/SKILL.md` as a component, and says the name must match its
directory.

The target is `plugins/steering/skills/repo-setup/SKILL.md`, so it is a component and the lint
reached it. All five component checks ran against it and passed. There is no coverage gap for this
target.

That settles the mechanical limits. The body-length rule (skill-rules Loading) is recorded as a
lint pass below and was not re-derived by judgment. I did run `wc -l` on the SKILL.md files while
sweeping for reference targets, which touches the same ground; it returned 109 lines and agrees
with the lint. Disclosed here because the brief asked me to say so if I re-derived a mechanical
limit.

### Conditions applied

- **always** — met.
- **reused** — met. The target is a SKILL.md.
- **changes something** — met. Settled by the brief: the skill writes to `AGENTS.md`.
- **hand-off** — **not met.** The SKILL.md is loaded into the current conversation.
  `handoff-rules.md` was therefore not applied, per steering-rules lines 20-22. The skill does
  anticipate being run by a dispatched agent (lines 81-82), but that is its runtime situation, not
  the document's own kind. This matters for one finding: the rules that would require a full status
  enumeration and a caller obligation per status live in `handoff-rules.md` Composition and do not
  apply here, which is why the status gap below lands on Context 2 as a warn rather than on a
  blocking hand-off rule.
- **advisory** — **not met.** The condition is "reviews or investigates and changes nothing".
  This skill investigates but then writes the block, so it changes something. The two conditions
  are written as alternatives and cannot both hold. All four Calibration rules and the
  advisory-conditioned rules in Scope, Finish and Failure are therefore not applicable. Not
  applicable is not a pass, and this is the largest untested area of the document: nothing here
  checks that the candidate-gathering in step 2 is calibrated.

## 2. Findings

SR = `steering-rules.md`, SK = `skill-rules.md`. N/A rows are marked so and are not passes.

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| SR Outcome 1 — finished outcome stated, not a topic (Blocking) | Pass | — | Lines 8-10: "produces a verified record of this repository's basic facts. It writes that record between fixed markers in `AGENTS.md`..." |
| SR Outcome 2 — outcome sits at the top (Advisory) | Pass | — | Lines 8-10, first prose after the H1 |
| SR Context 1 — nothing unresolvable (Blocking) | Pass | — | Every path named is a real path (`AGENTS.md`, `package.json`, `Makefile`, `.pre-commit-config.yaml`, `pyproject.toml`, `tox.ini`). No nickname, no prior decision, no earlier conversation |
| SR Context 2 — every needed fact written or pointed at (Blocking) | **Warn** | **Difference** | Lines 82 and 86 name two stop statuses, `NEEDS_DECISION` and `BLOCKED`, but the document never names the status for a successful run and never points at a file that defines a status set. `dispatch-protocol.md` defines DONE and the other three core statuses and says additions are declared in the template, which is exactly what `NEEDS_DECISION` is, but repo-setup references no file at all. I cannot tell from the document alone what an agent should stamp on a clean run, so this is a warn rather than a fail. The cost is one unstamped success report, not a wrong action, so it is a difference |
| SR Context 3 — approaches tried and failed are stated (Important) | Pass | — | Step 3 states the exact failures the plugin's baseline record observed: "Do not install packages. Do not run a package manager's install step. Do not create a file to see what a tool says about it." Line 84 states the other: "A guessed lint command is worse than none". Written as prohibitions rather than history, which is the more actionable form |
| SR Context 4 — context above the method (Advisory) | Pass | — | "What counts as a repo fact" line 14, "Workflow" line 24 |
| SR Scope 1 — what is in scope is named (Blocking) | Pass | — | Lines 8-10 and lines 14-19 |
| SR Scope 2 — out of scope named explicitly (Blocking) | Pass | — | Lines 21-22 ("A fact about one task, one branch, or one person's preference is not a repo fact") and lines 101-104 ("It does not fix what it finds... It edits no file other than `AGENTS.md`") |
| SR Scope 3 — membership test plus examples marker (Blocking) | Pass | — | Both load-bearing categories carry a test and a marker. "A repo fact is anything true of the repository rather than of the task in hand" plus "examples of the same kind of thing, not the whole list" (15-19). "A candidate is anywhere this repository records a command that checks the code without changing it" plus "are examples, not the whole list" (33-37). The four prohibitions in step 3 carry no marker but sit inside a bracketing test, "Establishing a fact is a read" and "You may run a command that only reports", so no unlisted mutation reads as permitted |
| SR Scope 4 — stop and report at a scope limit (Blocking) | Pass | — | Lines 37-38, 43-44, 50-52, 79-89. "Do not pick one to keep moving" |
| SR Scope 5 — scope statement above the method (Advisory) | **Fail** | **Difference** | The positive scope sits above the Workflow (line 14), but "Where this stops", which carries the out-of-scope statement, sits at line 99, after the method. `writing-agents` puts the same section at line 29, above its Workflow. No wrong action follows, because steps 3 and 5 repeat the constraints in place |
| SR Scope 6 — must not modify anything (Blocking, advisory) | N/A | — | Advisory condition not met |
| SR Method 1 — one default, not a menu (Important) | Pass | — | "Try `npm run lint` first. That is this project's default, and a repository that has it needs no further discussion" (30-31). Single numbered workflow |
| SR Method 2 — order fixed where sequence matters (Blocking) | Pass | — | Steps 1-6, with sequence load-bearing at 1 (read before writing), 5 and 6 (write then verify) |
| SR Method 3 — constrains only where needed, and says why (Important) | Pass | — | Reasons given at 39 ("Establishing a fact is a read"), 61 ("an unverified block is worse than no block, because everything downstream trusts it"), 84, 96-97. Two constraints carry no inline reason: "Never rewrite the whole file" (55) and step 1's "Do not rediscover what the block already records" (28-29). Both are covered by line 12. No wrong action follows, so not escalated |
| SR Method 4 — pre-work check named as the first step (Important) | Pass | — | Step 1: "Read the existing block first." Explicitly first, and the re-run case turns on it |
| SR Finish 1 — a self-runnable check settles doneness (Blocking, changes something) | Pass | — | Step 6 names four confirmable conditions and binds the outcome: "Fix anything that does not hold before you report" |
| SR Finish 2 — the agent runs the check before reporting (Important) | Pass | — | Step 6: "Check your own work before you report... Do not report a check you did not run" |
| SR Finish 3 — finish criteria repeatable (Blocking, advisory) | N/A | — | Advisory condition not met |
| SR Finish 4 — evidence each finding must carry (Important, advisory) | N/A | — | Advisory condition not met |
| SR Finish 5 — finish check sits late (Advisory) | Pass | — | Step 6 is the last workflow step, lines 56-61. Its distance from the stop conditions is reported once, under Failure 5 |
| SR Failure 1 — stop conditions stated (Blocking) | Pass | — | Lines 79-89 state two: no person available to decide, and `AGENTS.md` not writable. The third gap, a written block that fails verification, is reported once, under Composition 3 |
| SR Failure 2 — retry limit, and something must change (Important) | Pass | — | Lines 91-97. Names which failures settle the question with no retry, sets the limit at one more try, requires a change first, and gives an example of a qualifying change |
| SR Failure 3 — weakening the check is forbidden (Blocking, changes something) | Pass | — | Lines 60-61: "Do not weaken this check to finish. Do not skip it. Do not report a check you did not run" |
| SR Failure 4 — handling for missing or unassessable input (Blocking, advisory) | N/A | — | Advisory condition not met |
| SR Failure 5 — stop conditions directly after the finish check (Advisory) | **Fail** | **Difference** | Step 6 ends at line 61, then "## The block" runs 63-77, then "## When to stop" starts at 79. One section sits between them. `writing-agents` had the same advisory and the plugin's baseline record shows it was fixed there by moving the section; repo-setup still carries it |
| SR Calibration 1 — examples of what counts (Blocking, advisory) | N/A | — | Advisory condition not met |
| SR Calibration 2 — examples of what does not count (Blocking, advisory) | N/A | — | Advisory condition not met |
| SR Calibration 3 — default outcome stated (Blocking, advisory) | N/A | — | Advisory condition not met |
| SR Calibration 4 — describe the shape of an observed miss (Important, advisory) | N/A | — | Advisory condition not met |
| SR Composition 1 — every hole marked required or defaulted (Important, reused) | Pass | — | The block at lines 67-77 has three holes. `<anything a person still has to decide, or "none">` carries a default. `<command>` and `<what it covers, and how it was confirmed>` carry no marker and no default, but step 6's fourth check ("No placeholder text from the template survives") makes them required and gates on it. The weakness is that the gate is a by-hand read rather than a loud failure; that is reported once, under Content 6 |
| SR Composition 2 — the field set is fixed (Advisory, reused) | Pass | — | Three fields, fixed by the literal block at 67-77, and nothing invites a caller to add more |
| SR Composition 3 — partial work on stop is stated (Important, changes something) | **Fail** | **Defect** | Two stop paths state what happens to partial work: `NEEDS_DECISION` carries the candidates into the report (82-83), `BLOCKED` carries the unwritten block into the report (86-87). A third path is unstated. Step 6 says "Fix anything that does not hold before you report" and gives no instruction for the case where the agent cannot fix it. The wrong action: an agent has already written the block at step 5, finds at step 6 that it does not hold, cannot fix it, and has no instruction to remove it or to say the file is in a bad state. The likely outcome is a bad block left in `AGENTS.md` with a hedged report, which is the exact outcome line 61 calls worse than no block, because everything downstream trusts it |
| SR Voice 1 — an instructing sentence names a choosing actor (Important) | Pass | — | Workflow imperatives address the reading agent throughout |
| SR Voice 2 — a property statement keeps its owner as subject (Blocking) | Pass | — | Lines 8, 12, 15, 46, 101-104 all keep the owner as subject and gain no actor |
| SR Voice 3 — nothing that cannot choose takes an action verb (Important) | Pass | — | "This skill establishes and records facts" (101) and "Both stop conditions hand back to a person" (106) attach verbs to non-choosers, but as scope statements of the same shape the rules file itself uses ("The description states the capability"). No wrong action follows |
| SK Discovery 1 — description states the capability in searchable words (Blocking) | Pass | — | Frontmatter line 3, first sentence, in the words a person would use: lint command, repository, `AGENTS.md` |
| SK Discovery 2 — description states trigger conditions (Blocking) | Pass | — | Frontmatter line 3: "Use whenever someone asks to set up, configure, or onboard a repository for agent work..." |
| SK Discovery 3 — description carries file types, error text, casual phrasings (Important) | Pass | — | Names the file type `AGENTS.md`; carries a symptom close to error text, "says an agent could not find the lint command"; carries casual phrasings, "asks what the lint or test or build command here is", and "Safe to run again at any time" |
| SK Discovery 4 — description does not summarise the workflow (Important) | Pass | — | States capability and destination, no steps |
| SK Discovery 5 — description speaks in the third person (Important) | Pass | — | Capability sentence is third person. The trigger clauses use "Use whenever", which is the plugin-wide form and the form both siblings use |
| SK Boundary 1 — says what it does not cover (Blocking) | Pass | — | Lines 99-104, plus lines 21-22 |
| SK Boundary 2 — names which skill takes over (Important) | Pass | — | Line 106 answers it directly: "No skill takes over where this one stops. Both stop conditions hand back to a person" |
| SK Boundary 3 — a direct instruction from the person wins (Important) | Pass | — | Line 109 |
| SK Content 1 — first lines say what it produces (Important) | Pass | — | Lines 8-10 |
| SK Content 2 — nothing the model already knows (Blocking) | Pass | — | The file list in step 2 directs a search rather than explaining what those files are. "Establishing a fact is a read" and "A command that fails because no such script exists has settled the question" are judgments the model does not reliably make unaided |
| SK Content 3 — content that changes nothing is absent (Important) | **Fail** | **Difference** | Line 56: "Read `AGENTS.md` again and confirm four things." Skill-rules names "A count of anything" as a finding. The four are listed in the same breath, in this file, so no agent misses one today, and I can name no wrong action. It goes stale the moment a fifth check is added. We would write it without the number |
| SK Content 4 — one term for one thing (Important) | Pass | — | "candidate", "block", "marker" and "lint command" are each used one way throughout. "repo fact" / "repository fact" / "Repository facts" vary in surface form only, and the third is the block's own heading |
| SK Content 5 — no time-sensitive material (Important) | Pass | — | Line 15 "today it is the only one this skill establishes" and line 48 "does not work today" both read as "at present" rather than as a date. The first is a load-bearing scope statement that stops an agent hunting for the test and build commands; it goes stale only when the author edits this file anyway |
| SK Content 6 — no constraint a script could enforce (Important) | **Fail** | **Defect** | Step 6 (56-61) asks the agent to confirm by hand four things a script settles: exactly one opening and one closing marker (a grep count), content outside the markers unchanged (a diff), and no surviving placeholder text (a regex over `<...>`). The wrong action: an agent eyeballs a re-read of `AGENTS.md`, misses a stale marker pair left by an older run or a surviving `<command>`, and reports the check as run, which the same step forbids. Verifying "the content outside the markers is unchanged" without a diff is not reliably possible, and the skill states that everything downstream trusts the result |
| SK Loading 1 — body 500 lines or fewer (Blocking) | Pass | — | Settled by the lint's body line count check, which reached this component and passed |
| SK Loading 2 — every reference one hop (Blocking) | Pass | — | Satisfied with nothing to check: the skill names no reference file. Every path it names is a repository file it inspects, not material it loads |
| SK Loading 3 — detail in reference files, not the front file (Important) | Pass | — | 109-line body carrying its whole workflow. At this size, splitting it would add hops without removing load |
| SK Loading 4 — reference over 100 lines opens with a contents list (Advisory) | N/A | — | No reference files |
| SK Loading 5 — test material not reachable (Important) | Pass | — | Nothing in the SKILL.md points at `tests/`. Its baseline record and the `setup-bench` fixture are unreachable from it. Confirmed by grep across the plugin outside `tests/` |
| SK Loading 6 — no reference tells the reader to skip part of itself (Important) | N/A | — | No reference files |
| SK Evidence 1 — baseline comparison recorded (Blocking) | Pass | — | `plugins/steering/tests/baselines/repo-setup.md` records three no-skill runs and one with-skill run against a deliberately ambiguous fixture, with four observed failures tabulated per run and a re-run case. Linked from nothing reachable by the skill |

## 3. Counts by severity

Failures and warnings only.

| Severity | Fail | Warn |
| --- | --- | --- |
| Blocking | 0 | 1 |
| Important | 3 | 0 |
| Advisory | 2 | 0 |

Defects: 2 (Composition 3, Content 6). Differences: 4 (Context 2, Scope 5, Failure 5, Content 3).

Rules considered: 57. Pass 41, fail 5, warn 1, not applicable 10.

No blocking failure. The one blocking-severity item is a warn, so under steering-rules line 14 the
document does not need work before use.

## 4. The three fixes to make first

1. **SR Composition 3.** Add the third stop path. Say what an agent does when it has written the
   block, step 6's verification does not hold, and it cannot fix it. This is the fix that most
   directly serves the skill's own stated principle at line 61, and today an agent hitting that case
   has no instruction at all.
2. **SK Content 6.** Turn step 6's four checks into commands. A grep for each marker, a diff of the
   content outside them, and a regex for surviving `<...>` placeholders. Then the step names what to
   run rather than what to look at, and its result stops depending on how carefully an agent read.
3. **SR Context 2.** Name the success status, or point at `dispatch-protocol.md` for the core set
   and declare `NEEDS_DECISION` as this skill's addition to it. One line. It also removes the only
   blocking-severity item in this report.

Below those, in order: Content 3 (drop "four" at line 56), Scope 5 (move "Where this stops" above
the Workflow), Failure 5 (move "The block" so the stop conditions follow the finish check).

## 5. Anything I did that nobody asked for

- I read `plugins/steering/tests/baselines/repo-setup.md`. The Evidence rule required confirming
  the baseline holds observed failures, so opening it was in scope, but the file is deliberately
  unreachable from the skill and I want the read on the record. I also used it to check Context 3,
  by comparing the failures it observed against what the skill states.
- I determined that the **advisory** condition is not met, and recorded in section 1 what that
  leaves untested. Nobody asked for that reasoning to be written down.
- I ran `wc -l` across the skills and shared files while sweeping references, which re-derives the
  body line count the lint already settled. Disclosed in section 1. It agrees with the lint.
- I ran a grep across the plugin for links to `tests/` to check Loading 5 and the "linked from
  nothing" clause of the Evidence rule.
- I checked that `AGENTS.md` exists at the repository root. It does. The skill handles both cases,
  so this changed no finding.
- I read the frontmatter of `auditing-skills/SKILL.md` and `writing-skills/SKILL.md` to calibrate
  Discovery 3 and Discovery 5 against the house pattern rather than against my own taste.
- I created `/tmp/ste-audit/`.
