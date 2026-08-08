# Re-audit round 4: auditing-skills

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/auditing-skills/SKILL.md`,
149 lines.

Prior report compared against:
`/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits-round3/auditing-skills.md`,
which audited this target at commit `d72544f`.

Rules applied: `plugins/steering/shared/skill-rules.md` and `plugins/steering/shared/steering-rules.md`.

Conditions met: **always**, **advisory** as the caller states and line 9 confirms, **reused**, and
**describes work**. Lines 8 to 9 name a finished outcome the reader produces, a findings table
ordered by severity and the three things to fix first, so the test at `steering-rules.md` lines 65
to 67 is met and Method, Finish, and Failure all apply. **changes something** is not met, because
line 9 says the audit changes nothing, and lines 74 to 76 of `steering-rules.md` do not force it to
fail here because **describes work** holds. **hand-off** is not met: under the settled sentence at
`steering-rules.md` lines 60 to 63 the condition is about the document in front of me, and an agent
loading a SKILL.md sits in the conversation its author is having. So `handoff-rules.md` supplies no
rule here.

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
and reference resolution. `skills/*/SKILL.md` is named as a component, and its name must match its
directory.

**The target is `skills/auditing-skills/SKILL.md`. The lint reached it, and every component check
ran over it.** The mechanical limits are settled and are not re-derived below. No limit was counted
by hand.

Three coverage notes.

- The explain output says nothing under a plugin's `tests/` is opened, so the lint says nothing
  about `plugins/steering/tests/baselines/auditing-skills.md`, which the Evidence rule depends on.
  I checked that by reading.
- The four files the target names, `steering-rules.md`, `skill-rules.md`, `handoff-rules.md`, and
  `lint.md`, all resolve, and reference resolution confirms it.
- **The contents-list check does not reach this target, and the explain wording could be read to
  say it does.** The explain output opens "Any .md over 100 lines gets an advisory contents-list
  check", then qualifies it with "whether it is a reference surface or a file some component links
  to". This file is 149 lines, has no `## Contents` heading, and is neither of those two classes: it
  is a component itself. I read `eng/generate-readmes.mjs` to settle it rather than trusting the
  prose, as `lint.md` line 51 requires. `lintContentsList` is called at line 229 over the files a
  component references by path, and at line 474 over reference surfaces. A component's own file is
  passed to neither. So no contents-list check ran here. This is a coverage note, not a finding: the
  100-line rule left `skill-rules.md` and now lives only in the lint, so no judgment rule requires a
  contents list on a SKILL.md.

## 2. Prior findings

The round-3 report carried ten rows in its findings table and three in its new-findings table. All
thirteen are tracked here. Round 3's line numbers are lower than the current ones, because the
Re-auditing section gained six lines.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| **steering / Context 2.** Every fact the agent needs is written out or pointed at. (Blocking, warn, **difference**) | **confirmed** | Lines 41 to 43 are unchanged. "This audit does not re-run checks that the target's own author already ran and recorded. Confirm the record is complete instead." Which checks, and where such a record lives, are still neither written out nor pointed at |
| **steering / Failure 4.** A status for input that is missing, unexpected, or unassessable. (Blocking, fail, **difference**) | **confirmed** | Lines 28 to 30 are unchanged in substance. Line 28 names "out of scope" for the not-in-scope case and line 92 names "warn" for the cannot-tell case, but the unreadable-target case at lines 29 to 30 still gets an action and no status name: "Report that instead of auditing from memory" |
| **steering / Failure 5.** The stop conditions sit directly after the finish check. (Advisory, fail, **difference**) | **confirmed** | The stop conditions still sit at lines 28 to 32, ahead of the workflow, and the Report section is still last, at lines 122 to 149. Lines 30 to 32 still give the reason, "They are pre-work gates. They decide whether the audit starts at all" |
| **steering / Composition 1.** Every named hole in a template is marked required or carries a default. (Important, fail, **defect**) | **retired** | Retired in round 3 and still retired for the first-audit table. Line 124 still reads `Rule \| Severity \| Result \| Defect or difference \| Evidence`, and lines 127 to 134 still say which columns a fail or a warn must carry. The second table this round introduced is a separate matter, tracked under the changed row below |
| **skill / Discovery 3.** The description includes the file types and casual phrasings people type. (Important, fail, **defect**) | **retired** | Retired in round 3 and still retired. Line 3 is unchanged and still names a SKILL.md, a slash command, a hand-off brief, a runbook, and an AGENTS.md or CLAUDE.md instruction file, alongside "why a skill is not triggering" |
| **skill / Content 4.** The skill uses one term for one thing throughout. (Important, fail, **defect**) | **retired** | Retired in round 3 and still retired for the term that produced it. Line 8 still reads "This audit produces a findings table, ordered by severity", the word "list" is still gone, and lines 130 to 131 still forbid prose ranked by severity |
| **steering / Voice 3.** Nothing that cannot choose to act takes an action verb. (Important, fail, **difference**) | **confirmed** | Lines 142 to 143 are unchanged, "A rule that fires at blocking severity on something nobody can name a consequence for reaches past what it can judge." Line 51 is unchanged, "The findings never re-argue them", as is line 9, "The Report section below fixes that table's columns". This round added one more of the same family at line 118, "A re-audit table carries one more column than a first audit." Line 25 to 26 was reworded to "more than one name fits the same document", which is still the same family. Same root cause, so not counted again, and the verdict does not move |
| **steering / Finish 3.** The finish criteria are specific enough that two runs would return the same result, on the hand-off routing exclusivity. (Blocking, fail, **defect**, reduced to changed in round 3) | **retired** | The word carrying the residual is gone. Bullet 3 at lines 20 to 22 now reads "Where a person wrote it to steer an agent, it belongs here, and it needs no extra file for what it is. It still takes a file for each condition it meets." The exclusivity claim "and `../../shared/steering-rules.md` alone covers it" is deleted, and the last sentence resolves the runbook-at-hand-off overlap that produced the finding, in the direction bullet 2 needs. This was round 3's second recommended fix and it landed |
| **skill / Loading 4.** No reference file instructs the reader to ignore or skip part of itself, on the catalogue block. (Important, fail, **defect**) | **retired** | Retired in round 3 and still retired. `steering-rules.md` now carries no carve-out prose at all: lines 78 to 80 read "Read the Applies-when column for what drops out, one row at a time. No section drops out whole." The prose and the tables no longer disagree, and the residual round 3 recorded, that the prose switched off sections holding rows conditioned on **advisory** or **changes something**, is gone with the prose |
| **steering / Context 2.** Every fact the agent needs is written out or pointed at, on the default outcome. (Blocking, warn, **difference**) | **retired** | Retired in round 3 and still retired. `skill-rules.md` lines 8 to 11 now read "Where a procedural property an audit needs is missing here, look in those two skills", and `steering-rules.md` lines 21 to 23 state the default and say it holds for any audit that reads the file. The target points at it at line 89 |
| **New 1. steering / Finish 3.** Two marks only for a prior finding, no third mark named, and the prior-findings table has no fixed columns. (Blocking, fail, **defect**) | **changed** | The blocking half is fixed. Lines 113 to 115 now name all three marks and define each: "Confirmed means it is still there as written. Retired means it is gone. Changed means it is still there in a different form, which is what a fix that moved a fault rather than removing it produces." The table half survives in a new form. Lines 118 to 119 now say "A re-audit table carries one more column than a first audit. Put the prior status before Result", and that column is named for something other than the values it holds, which is new finding 1. The section is also still silent on what the other five columns hold for a retired row: line 133 requires a defect or difference mark only on a fail or a warn, and line 127 requires evidence only on a fail or a warn, so a retired row has no stated content for Severity, Result, Defect or difference, or Evidence. Changed rather than retired because the fault moved rather than went |
| **New 2. skill / Loading 4.** `lint.md` holds a section instructing the reader to skip part of itself. (Important, fail, **difference**) | **retired** | The section is gone. `lint.md` is now 63 lines and ends at "Some lints describe themselves, often behind a flag such as `--explain` ... The repository's own `AGENTS.md` block records whether its lint offers one." The heading "In the repository this plugin is developed in" and the sentence "Where they differ, use **Finding the command** above and ignore this section" are both deleted. I checked the replacement resolves: `AGENTS.md` lines 55 to 70 carry the `repo-setup` block, and it records both `npm run lint` and `npm run lint -- --explain`. I also checked the other three referenced files for the same shape and found none |
| **New 3. skill / Evidence.** "Nothing an agent loads at run time links to that directory" turns a Blocking verdict into a judgment about the harness. (Blocking, warn, **difference**) | **confirmed** | `skill-rules.md` line 87 is unchanged. `plugins/steering/SUMMARY.md:192` and `plugins/steering/README.md:220` both still link `tests/baselines/`, and the explain output still groups a plugin's SUMMARY.md with the files under `shared/` as reference surfaces. Both readings still land on pass today, because only `CONTRIBUTING.md` and the generator point an agent at SUMMARY.md, so it stays a warn and a difference |

Retired 7. Confirmed 5. Changed 1.

### On the deliberate changes, judged rather than reported as drift

**Routing by condition rather than by name works, and the last residue is gone.** Bullet 3 no
longer claims exclusivity, and it now says plainly that a document still takes a file for each
condition it meets. I walked the routing kind by kind again. A SKILL.md gets `steering-rules.md`
and `skill-rules.md`. A subagent prompt or a hand-off brief gets `steering-rules.md` and
`handoff-rules.md`. A runbook handed to a subagent now gets all three by the plain reading, where
round 3 could reach two different answers. A command or a one-off request that is not a hand-off
gets `steering-rules.md` alone, which is right, because `skill-rules.md` line 6 says its entries
apply to a SKILL.md "and not otherwise". `dispatch-protocol.md` is still never routed to, which is
also right.

**Naming the third mark works, as far as the mark goes.** Lines 113 to 115 define confirmed,
retired, and changed, and the definition of changed is the useful one: a fix that moved a fault
rather than removing it. I used all three in this report and none of the thirteen rows was a
forced fit. That closes the exact gap round 3 named, and it is the single most valuable change of
the round.

**The column the fix added does not work.** See new finding 1. This is a fix that introduced a new
problem, and I say so plainly: the fault it removed was a missing mark, and the fault it added is a
column whose name does not match the values it holds. The two sit on the same three lines, so a
reader should count one problem carrying two rows, one in each table above.

**The `lint.md` rewrite works.** Removing the repository-specific section removed the skip
instruction that produced round 3's second new finding, and the replacement points at
`AGENTS.md`, which does hold the block it names. Nothing was lost: everything the deleted section
said is either in the `repo-setup` block or in the new self-description paragraph.

## 3. New findings

Only findings the round-3 report does not contain. Two. Both are on the same rule and have
different root causes, which `auditing-skills` line 94 allows: one finding per root cause, not one
per rule.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| **steering / Finish 3.** The finish criteria are specific enough that two runs would return the same result. Root cause: the re-audit table is under-specified. | Blocking | **fail** | **defect** | Line 119 says "Put the prior status before Result." The values that column must hold are named "confirmed, retired, or changed" at line 114 and "the third mark" at line 119, and nowhere in the skill are they called a status. Elsewhere in this plugin "status" means DONE, DONE_WITH_CONCERNS, BLOCKED, NEEDS_CONTEXT, which is what `dispatch-protocol.md` lines 66 to 101 fixes it to mean. So one auditor writes "confirmed" in that column and another writes the prior report's verdict, "Blocking, fail, defect", and both have followed the text. Line 118's spec is also silent about the new-findings table that line 116 requires in the same report: a new finding has no prior status, so it is unstated whether that table carries five columns or six. And line 9 still says "The Report section below fixes that table's columns", which is no longer true, because lines 118 to 119 now fix a second table's columns from a different section. What an agent does wrong: two re-audits of one target return prior-findings tables that cannot be laid side by side, which is the property lines 128 to 131 exist to produce, "Keep the table's wording fixed. Then you can compare two runs over the same target without editing either." Say plainly: this arrived with the fix for round 3's new finding 1 |
| **steering / Finish 3.** Same rule, different root cause: the hand-off gloss does not carry the test that now settles the condition. | Blocking | **fail** | **defect** | Lines 17 to 18 define the condition as "the agent reading it will not see the conversation its author had", and line 24 states the exclusion as "Decide the conditions from what the target holds, not from how you are using it." Neither carries the test at `steering-rules.md` lines 60 to 63, which is a different exclusion: "Every condition is about the document in front of you, not about anything that document describes. A file of rules for writing hand-off prompts is not itself a hand-off, because the agent reading it sits in the conversation its author is having." The skill's gloss is the wording two prior audits used to call `dispatch-protocol.md` and `handoff-rules.md` hand-offs, on the reading that an agent opening a file in a later session has not seen the author's conversation, and lines 62 to 63 of `steering-rules.md` record that those two audits "called this opposite ways and returned different counts". The gloss sits in "Which rules apply", which the agent reads before the workflow sends it to `steering-rules.md` at step 2. What an agent does wrong: it adds `handoff-rules.md` to a rules file and returns findings from eighteen rows that do not apply, or omits it and returns a smaller count. Round 3's report on `dispatch-protocol.md` carried three findings that hang entirely on that call. The caller's brief for this round still directs `handoff-rules.md` at `dispatch-protocol.md`, which is the reading `steering-rules.md` now rules out, so the two files are still being read opposite ways in practice. Say plainly: the settling sentence landed in one file and this file's gloss now disagrees with it |

### Things I checked and did not escalate

- **Line 120, "two rounds of this audit invented the word rather than reporting the gap".**
  `skill-rules.md` line 60 names "A count of anything" as content that would not change what an
  agent does, and the number does go stale the moment a third round does it. But the same file's
  lines 54 to 56 say a previously tried approach to the work that failed belongs, because stating
  it stops an agent repeating it, and `steering-rules.md` Context row 3 requires exactly that at
  Important severity. Filing the count would put the auditor on the wrong side of a rule that
  requires the sentence. Not filed.
- **Lines 130 to 131 and lines 144 to 149** are about how this document changed and how it differs
  from `steering-rules.md`. Both change what an agent does with the next paragraph: the first stops
  it reverting to prose tiers, the second tells it which of two conflicting sentences wins.
  `skill-rules.md` lines 65 to 69 exempt this shape. Passes.
- **steering / Failure 2, a retry limit.** The condition **describes work** holds, so the rule
  applies, and the skill names no retry limit of its own. But the only retryable step is the lint,
  and lines 49 to 52 point at `lint.md` for it, "This includes when you may run the lint again."
  `lint.md` lines 55 to 57 give the limit and the change requirement. Passes on the pointer.
- **steering / Method 1, one default rather than a menu.** Lines 98 to 108 add a second audit, but
  they condition it, "Where the audit gates a release or an adoption", and line 103 states the
  default, "One audit is enough for ordinary work." Passes.
- **skill / Loading 2 and the 149-line body.** Detail does sit in the four reference files. The
  body is within the lint's 500-line limit and no judgment rule sets a shorter one. Passes.
- **`skill-rules.md` bullet 1 is unconditional where `skill-rules.md` itself is not.** Line 16 says
  add that file for any SKILL.md, while its lines 3 to 4 gate on **reused** met and **hand-off** not
  met. Under the settled condition a SKILL.md is always reused and never a hand-off, so the two
  never diverge. Not filed.

## 4. Counts by severity

New findings.

| Severity | Fail | Warn | Defects | Differences | Total |
| --- | --- | --- | --- | --- | --- |
| Blocking | 2 | 0 | 2 | 0 | 2 |
| Important | 0 | 0 | 0 | 0 | 0 |
| Advisory | 0 | 0 | 0 | 0 | 0 |
| **Total** | **2** | **0** | **2** | **0** | **2** |

Surviving prior findings, meaning confirmed plus changed.

| Severity | Fail | Warn | Defects | Differences | Total |
| --- | --- | --- | --- | --- | --- |
| Blocking | 2 | 2 | 1 | 3 | 4 |
| Important | 1 | 0 | 0 | 1 | 1 |
| Advisory | 1 | 0 | 0 | 1 | 1 |
| **Total** | **4** | **2** | **1** | **5** | **6** |

Combined open: 8 findings. Defects 3, differences 5. Blocking 6, Important 1, Advisory 1.

Movement since round 3: 7 retired, 5 confirmed, 1 changed, 2 new. Round 3 had 5 surviving plus 3
new, so 8 open, with 2 defects. This round has 8 open with 3 defects. The total held while the
defect count rose by one, and the reason is that both new findings are defects introduced or left
exposed by this round's fixes.

By the target's own rule at lines 140 to 143, only a defect blocks. Three defects stand: the two
new ones and the changed row they share text with. The five differences do not hold the target
back.

### The three fixes to make first

1. **Name the third column for what it holds, and say what a retired row puts in the other five.**
   Lines 118 to 119. Call it the prior mark, or the confirmed, retired, or changed column, and say
   whether the new-findings table in a re-audit carries five columns or six. Then update line 9,
   which still says the Report section fixes the columns.
2. **Carry the settled hand-off test into lines 17 to 18 and line 24.** One sentence, taken from
   `steering-rules.md` lines 60 to 62. This is the routing decision every audit makes first, and it
   is currently made off a gloss that two rounds read opposite ways.
3. **Give the unreadable-target case a status name at lines 29 to 30.** The other two stop cases
   have one. This is the oldest surviving row and the cheapest to close. Unchanged from round 3's
   list.

## 5. Anything I did that nobody asked for

- I read `eng/generate-readmes.mjs` to establish which files the contents-list check actually
  opens, rather than taking the explain wording at face value. That is how I can say this
  149-line file with no Contents heading is not a lint gap being hidden. `lint.md` line 51 asks for
  this where the reach is in doubt, but nobody asked for it here.
- I read `plugins/steering/shared/lint.md`, `skill-rules.md`, `steering-rules.md`, and
  `handoff-rules.md` in full. The first three are named by the target, so step 2 of its own
  workflow covers them. I read `handoff-rules.md` because the target names it at line 18, not
  because any hand-off rule applies to the target itself.
- I read `AGENTS.md` to check that `lint.md`'s new pointer, "The repository's own `AGENTS.md` block
  records whether its lint offers one", resolves. It does, at lines 55 to 70. Round 3's second new
  finding was retired by that rewrite, and I did not want to retire it on the deletion alone
  without checking that the replacement works.
- I read `plugins/steering/tests/baselines/auditing-skills.md`, which the Evidence rule requires
  checking. It passes. Its line describing "the fixed Rule, Result, Evidence table" is now further
  out of date than round 3 found it, since a re-audit table has six columns. I am not filing that,
  for the reason round 3 gave: it is a dated test record, and the explain output says files under
  `tests/` are records that may cite paths from earlier rounds.
- I read `plugins/steering/shared/dispatch-protocol.md` in full, because I audited it in the same
  session and because "status" means something specific there. That is the evidence for half of new
  finding 1.
- I ran `git diff d72544f 19459c8` over the target and all five shared files, to tell a fix apart
  from a pre-existing line. It changed nothing.
- I re-derived no mechanical limit by hand. The description length and body length results above
  are the lint's.
- The directory `/tmp/ste-audit-4/` already held reports from other runs. I wrote only this file
  and its two siblings and did not touch the others. No file inside the repository was created,
  edited, staged, or committed. The working tree is still clean at 19459c8.
