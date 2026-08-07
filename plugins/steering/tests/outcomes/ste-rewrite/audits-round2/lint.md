# Re-audit: lint.md

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/lint.md`
Rules: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`
Prior report: `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits/lint.md`, which audited this target at commit `7deb2ae`.
Repository at commit `d015e2e`, working tree clean. Nothing was edited, staged, or committed.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`, exits clean:
`All generated files are up to date.`

`npm run lint -- --explain` reports that a top-level `.md` under a plugin's `shared/` is a
reference surface, and that reference surfaces get reference resolution only. This target is
`plugins/steering/shared/lint.md`, so it is a reference surface.

The lint did reach the target, with one check: reference resolution, which passed. These checks
did not run on it: frontmatter hazards, name format and length, description length, and body line
count. The explain output states that reference surfaces carry no frontmatter, so the frontmatter
and length checks do not apply to this kind of file. Coverage above is taken from the explain
command, not from prose. That is this file's own instruction at lines 65 to 67, followed.

I re-derived no mechanical limit by hand. One exception, disclosed: to judge the Context rules I
confirmed by hand that `AGENTS.md` exists at the repository root and holds a `repo-setup` block at
lines 55 to 70, naming `npm run lint` as the confirmed command, and that
`plugins/steering/skills/repo-setup/SKILL.md` exists. Reference resolution passing does not say
which references resolved, and `repo-setup` is named by bare skill name rather than by path, so the
lint would not have covered it in any case.

The two commands above also exercise this file's own procedure end to end. Step 1 at lines 22 to
23 finds the recorded command in `AGENTS.md`, and the last section at lines 65 to 70 supplies the
explain call. Both worked as written.

### Conditions applied, and why

Applied: **always**, **advisory**, **reused**, **changes something**. Not applied: **hand-off**,
**catalogue**.

- **changes something**, now settled by the file rather than inferred. The prior report applied it
  on the strength of one branch and flagged that a different reader might drop it. Line 9 now says
  outright, "Recording a confirmed command through `repo-setup` is the one change this file asks
  for." That removes the ambiguity the prior report disclosed. Three rows that were contingent on
  it, Finish 1, Failure 3, and Composition 3, are now firmly in scope.
- **catalogue**, newly available and deliberately not applied. This file describes work of its own:
  find the command, run it, establish its reach, report what it did not reach. `steering-rules.md`
  line 49 requires a document that "describes no work of its own". This one does. Sibling files
  `handoff-rules.md`, `skill-rules.md`, and `dispatch-protocol.md` all self-declare the condition
  and this one does not, correctly. Recorded because an auditor who applied it here would drop
  thirteen rows, including every Finish and Failure row this file passes on its merits.
- **advisory**: the work this file directs investigates and changes the target nothing.
- **reused**: a shared file consulted across many runs.
- **hand-off not applied**: the condition describes a prompt dispatched to an agent running
  detached from the author. A reference file consulted inside a live session is not a hand-off.
  `DECISIONS.md` line 303 records the same reading. Under the other reading this file would owe a
  named report format and a status set, which is the overreach `plugins/steering/tests/TEST_REPORT.md`
  already records.

This file declares no parent. Line 3 states its own purpose and it is read on its own terms.

## 2. Prior findings

Five fails in the prior report. Two retired, one changed, two confirmed.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| Context 1 (Blocking, always). The `## In this repository` heading names no repository, so in a foreign checkout an agent reads the section as facts about the repository it is working in. Was: Fail, defect. | **Retired** | The heading at line 59 is now `## In the repository this plugin is developed in`, and lines 61 to 63 add "This section describes `skyetrail-agents` and nothing else. It does not describe the repository you are working in, unless you are working in that one. Where they differ, use **Finding the command** above and ignore this section." Both halves the prior report asked for, the naming and the redirect. |
| Method 2 (Blocking, always). Line 14's "Look for it in this order" contradicted line 20's "Try it before anything else", so an agent in a repository whose recorded command is not `npm run lint` runs the wrong one. Was: Fail, defect. | **Retired** | Step 2 at lines 24 to 25 now reads "`npm run lint` is the default. Try it where step 1 finds no recorded command. A recorded command always wins, because a person confirmed it." The contradicting clause is gone and the tie-break is stated with its reason. |
| Scope 6 (Blocking, advisory). No statement that the agent must not modify anything. The second half, what to do where a fix looks obvious, was already met. Was: Fail, difference. | **Changed** | Lines 7 to 9 now carry a prohibition: "Do not edit the target, the lint script, or its configuration to make a check reach further." Still not the rule's letter, which asks for "must not modify anything". This one is scoped by purpose and by a list of three. The narrowing is the right call, not a shortfall: a blanket statement would contradict line 9's own permitted recording step and `writing-skills`, which edits targets under the same rules. It stays a difference. The list of three is separately a new finding, below. |
| Failure 4 (Blocking, advisory). The three cases each carry a stated action but none carries a named status value. Was: Fail, difference. | **Confirmed** | Unchanged. Lines 36 to 52 still give three cases with actions and no status names. Line 50's "report a coverage gap" is still the closest thing to a name. Still a difference: named statuses are a hand-off concept and this file's own use is not a hand-off, so the letter fails and no wrong action follows. |
| Voice 3 (Important, always). "A description written out in this file could disagree with the lint" and "the command cannot disagree with what the lint does". A description cannot disagree with anything. Was: Fail, difference. | **Confirmed** | Unchanged, now at lines 73 to 74. `steering-rules.md` line 214 names this exact case, "Bad, because a file cannot disagree with anything". Line 14, "Each repository decides which checks its own lint performs", is the same family and also unchanged. Still a difference: lines 65 to 67 already tell the agent what to do, so no wrong action follows. |

## 3. New findings

Only findings the prior report does not contain. One. It comes from the paragraph added at lines 7
to 9, which was written to answer the prior report's Scope 6 finding. Stated plainly, because that
is what this pass is for.

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| Scope 3 (Blocking, always). Where a category of work is named, a membership test defines it. Any list of kinds carries a marker saying they are examples, not the whole set. | Fail | **Defect** | Line 8, "Do not edit the target, the lint script, or its configuration to make a check reach further." Three things named, no membership test, no trailing generalisation of the kind `steering-rules.md` line 107 accepts. A closed prohibition list reads as permission for everything off it. What an agent does wrong: facing the coverage gap this file exists to surface, it edits something the list does not name, an ignore file, a CI workflow, a per-directory lint config it does not read as "its configuration", or a test fixture, and takes that as allowed because the prohibition enumerated three things and it touched a fourth. It then reports a clean pass where line 50 requires it to report the gap. This is the same shape `AUDIT-ROUND.md` records for `dispatch-protocol` invariant 5, a closed list handing out permissions, and it is what `steering-rules.md` lines 90 to 105 exist to prevent. The fix is one clause: "or anything else that widens what the check reaches". |

All other rules pass or are not applicable. Rule outcomes across all 36 rules: 30 pass, 2 not
applicable, 4 fail, 0 warn. Not applicable is not a pass. No rule was marked warn, because nothing
in this file was undecidable from what I could read.

Two things I checked and did not escalate, recorded so the next pass does not spend the time again:

- Step 3 at line 26 opens with a flat assertion, "This repository has no recorded command and no
  `npm run lint`", where steps 1 and 2 are phrased conditionally. In `skyetrail-agents` that
  sentence is false. It is only ever read when it is true, because the ordered lookup at lines 18
  to 19 stops at step 1 or step 2 whenever a command exists. No wrong action follows, so it passes.
- Lines 61 to 63 give no test for deciding whether you are working in `skyetrail-agents`. The
  repository is named, and a directory name, a package name, or a git remote settles it. Passes.

## 4. Counts by severity

New findings:

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 1 | 0 | 1 |
| Important | 0 | 0 | 0 |
| Advisory | 0 | 0 | 0 |
| All | 1 | 0 | 1 |

New defects: 1. New differences: 0.

Surviving prior findings:

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 2 | 0 | 2 |
| Important | 1 | 0 | 1 |
| Advisory | 0 | 0 | 0 |
| All | 3 | 0 | 3 |

Surviving defects: 0. Surviving differences: 3.

Combined: 4 open findings, 1 defect and 3 differences. Down from 5 open findings, 2 defects and 3
differences. Both prior defects were fixed. The one new defect was introduced by a fix.

One blocking defect, the new finding, means the target needs work before use. The three surviving
differences do not hold it back. Read those as signals about the rules rather than about the file.

## 5. Anything I did that nobody asked for

- Ran the file's own procedure while auditing it, rather than only reading it. Step 1 finds the
  recorded command in `AGENTS.md` and the last section supplies the explain call. Both worked, which
  is evidence for the Context 1 retirement that reading alone would not give.
- Checked the **catalogue** condition against this file and recorded why it does not apply, in
  section 1. Nobody asked, but three sibling shared files now self-declare it and this one does
  not, so the next auditor will wonder. An auditor who applied it here would wrongly drop thirteen
  rows.
- Read `auditing-skills/SKILL.md` and `writing-skills` references to check that the new prohibition
  at lines 7 to 9 does not contradict a skill that legitimately edits files. It does not, because it
  is scoped by purpose. That check is why the Scope 6 row is marked changed rather than retired,
  and why I say the narrowing was the right call.
- Read `AGENTS.md` lines 55 to 70, `DECISIONS.md` around line 303, and `AUDIT-ROUND.md`, which was
  added in the audited commit. I used the last only to check I was not reporting a deliberate rule
  change as drift, and once as corroboration in the new finding.
- Ran `git diff 7deb2ae d015e2e` over both targets, to separate what the commit changed from what
  it left alone.
- Ran `git log` and `git status` to confirm the stated commit and clean tree. Both matched.
- Changed no file except this report and `/tmp/ste-audit-2/handoff-rules.md`.
