# Re-audit: handoff-rules.md

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/handoff-rules.md`
Rules: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`
Prior report: `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits/handoff-rules.md`, which audited this target at commit `7deb2ae`.
Repository at commit `d015e2e`, working tree clean. Nothing was edited, staged, or committed.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`, exits clean:
`All generated files are up to date.`

`npm run lint -- --explain` reports that a top-level `.md` under a plugin's `shared/` is a
reference surface, and that reference surfaces get reference resolution only. This target is
`plugins/steering/shared/handoff-rules.md`, so it is a reference surface.

The lint did reach the target, with one check: reference resolution, which passed. These checks
did not run on it: frontmatter hazards, name format and length, description length, and body line
count. The explain output states that reference surfaces carry no frontmatter, so the frontmatter
and length checks do not apply to this kind of file. Coverage above is taken from the explain
command, not from prose.

I re-derived no mechanical limit by hand. One partial exception, disclosed, and the same one the
prior report made: to judge the Context rules I confirmed by hand that `./steering-rules.md` sits
next to the target, and that `plugins/steering/skills/auditing-skills/SKILL.md` and
`plugins/steering/skills/writing-agents/SKILL.md` exist and hold what line 13 says they hold. A
reference-resolution pass does not say which references resolved, and lines 11 to 13 name two
skills by bare name rather than by path, so the lint would not have covered them in any case.

### Conditions applied, and why

Applied: **always**, **advisory**, **reused**, **catalogue**. Not applied: **hand-off**,
**changes something**.

- **catalogue**, newly applied. Line 12 declares it. I checked the declaration rather than taking
  it: the file is twenty rule rows plus the calibration for reading one of them, and it is applied
  by other documents. Under `steering-rules.md` lines 52 to 55, the Method, Finish, and Failure
  rules are therefore not applicable. That change alone retires two prior findings and moves nine
  rows from pass or fail to not applicable.
- **advisory**: unchanged from the prior report. The file's own voice is auditor-facing. Lines 6
  to 9 speak of severity, reporting, and marking a rule warn.
- **reused**: a shared rule file consulted across many runs.
- **changes something**: nothing here directs a file or state change.

**The hand-off call, made again and by me.** The prior report recorded that this was its own
judgment rather than something it was given. I made the call again and went the same way:
**hand-off does not apply to this file's own use.** My reasoning, which is not identical to the
prior report's:

- The condition asks whether the agent reading the document will not see the author's
  conversation. For a shared reference file the honest answer is "sometimes", so the condition has
  to be settled on the document's own use rather than on any one reader.
- The file now declares itself a catalogue and I confirmed that. A catalogue produces no result
  that crosses a context boundary. The Return cluster in this very file says so at lines 55 to 56:
  a report matters where results cross a boundary, and inside a conversation the artifact is the
  return. This file returns no artifact to any caller. So the cluster it owns does not turn on
  itself.
- Applying hand-off would turn this file's own twenty rules on itself and demand a named report
  format, an enumerated status set, and caller obligations from a file that dispatches nothing.
  `DECISIONS.md` line 303 records the author's own reading, that these rules never apply to a
  plain skill, and `plugins/steering/tests/TEST_REPORT.md` records the same overreach.

If that call is overturned, the twenty rows in this file's own tables turn on it and the result
changes substantially. It is stated here so it can be overturned without redoing the audit.

**One observation about the catalogue rule itself, not a finding against the target.** This file
has sections literally titled `## Finish` (line 39) and `## Failure` (line 46), which are rule
tables about the audited document. `steering-rules.md` line 52 says "the Method, Finish, and
Failure sections do not apply". Read as the target's sections rather than as the parent's rule
groups, an auditor would drop four of this file's twenty rows from scrutiny. I read it the
intended way. The wording is exposed on exactly the file where the collision is worst.

**One tension in the catalogue declaration, recorded here rather than as a finding.** Line 12
says "This file states no workflow of its own", but lines 7 to 9 do direct work: mark the rule
warn, state what you could not determine, do not guess. That is a small failure-handling
procedure. The exemption it buys costs nothing here, because the delegated skills carry the rest
and the file names them, so I did not escalate it.

## 2. Prior findings

Five fails and warns in the prior report. Four retired, one changed, none confirmed.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| Scope 6 (Blocking, advisory). No statement that the agent must not modify anything, and no statement of what to do where a fix looks obvious. Was: Fail, difference. | **Changed** | Still absent from the file itself. What changed is reach: line 11 now names `auditing-skills`, which carries it at `auditing-skills/SKILL.md` lines 29 to 30, "This audit does not edit the target. Where a fix is obvious, name it in the report." But line 13 lists only the stop conditions and the evidence rule as delegated, so a reader has no pointer telling it the no-edit rule is over there too. Still a difference: a blanket statement here would contradict `writing-agents`, which uses this same file to write files. |
| Finish 3 (Blocking, advisory). "Fixed enough" and "context the call does not need" carry no test. Was: Warn, difference. | **Retired** | Finish rules are not applicable under **catalogue**. Half the cited text was also rewritten: old line 73 is now line 78, "the instruction carries no context that call does not need". Residue, disclosed: "fixed enough" survives verbatim at line 62 and still carries no test. It no longer has a rule to fail. |
| Finish 4 (Important, advisory). No statement of what evidence each finding must carry. Was: Fail, difference. | **Retired** | Two ways over. Finish rules are not applicable under **catalogue**. Separately, line 13 now points at where it lives, and `auditing-skills/SKILL.md` line 114 supplies it, "Every fail and warn carries evidence." See new finding 1 for the half of that pointer that does not hold. |
| Calibration 3 (Blocking, advisory). The default outcome is not stated, so an auditor escalates by default. Was: Fail, defect. | **Retired** | Line 6 now reads "Severity, the default outcome, and reporting work exactly as in `./steering-rules.md`", and `steering-rules.md` lines 17 to 19 now state it: "The default outcome for every rule here is pass. Escalate only where you can name what an agent would do wrong because of the failure." The prior report's first recommended fix, made in the parent so both files inherit it. |
| Voice 1 (Important, always). Old line 73, "the instruction is checked for context the call does not need", neither instructs nor states a property. Was: Fail, defect. | **Retired** | Line 78 now reads "the instruction carries no context that call does not need". That is a property sentence with the property's owner as subject, matching every other row in the table. The prior report's second recommended fix, taken in the form it recommended. |

## 3. New findings

Only findings the prior report does not contain. Both come from the paragraph added at lines 11 to
13, which was written to close the parent-chain gap the prior report's third recommendation named.
It closed that gap and introduced these two. Stated plainly, because that is what this pass is
for.

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| Scope 3 (Blocking, always). Where a category of work is named, a membership test defines it. Any list of kinds carries a marker saying they are examples, not the whole set. | Fail | **Defect** | Line 11, "The skills `auditing-skills` and `writing-agents` apply these rules." Two named, no membership test, no examples marker. The list is not the whole set. `steering-rules.md` line 25 routes any reader meeting the **hand-off** condition here, whatever skill it is running, and `dispatch-protocol.md` line 4 leans on this file for the report's sections while naming a different pair of appliers. What an agent does wrong: arriving by the parent's documented route, it reads line 13, looks for the stop conditions and the evidence rule in two skills it is not running, and either loads a skill it has no other reason for or proceeds with no stop conditions. That happened on this run. I reached this file through `steering-rules.md` line 25 and had to open `auditing-skills/SKILL.md` to find machinery line 13 told me lived somewhere I was not. Note also that this is the project's signature defect, the one `AUDIT-ROUND.md` records in five of nine files, reintroduced by a fix. |
| Context 2 (Blocking, always). Every fact the agent needs is either written out or pointed at by a path it can read. | Fail | Difference | Line 13, "The stop conditions and the evidence each finding carries live in those two skills." Half of that is wrong about one of the two. `writing-agents/SKILL.md` has stop conditions, at lines 60 to 72. It has no evidence rule at all, because it produces no findings. Its step 5 at lines 50 to 51 audits the filled prompt and records nothing. So an agent sent there for the evidence rule finds nothing and is not told which of the two holds it. A difference rather than a defect: under `writing-agents` the audit is a self-check before dispatch with no report and no consumer for the evidence rule, so I cannot name a wrong action that follows. Compare `skill-rules.md` line 9, which makes the same three-part claim about its own pair. |

All other rules pass or are not applicable. Rule outcomes across all 36 rules: 18 pass, 16 not
applicable, 2 fail, 0 warn. Not applicable is not a pass. The count of not-applicable rows rose
from 11 to 16 because **catalogue** scopes out the nine Method, Finish, and Failure rows.

## 4. Counts by severity

New findings:

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 2 | 0 | 2 |
| Important | 0 | 0 | 0 |
| Advisory | 0 | 0 | 0 |
| All | 2 | 0 | 2 |

New defects: 1. New differences: 1.

Surviving prior findings:

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 1 | 0 | 1 |
| Important | 0 | 0 | 0 |
| Advisory | 0 | 0 | 0 |
| All | 1 | 0 | 1 |

Surviving defects: 0. Surviving differences: 1.

Combined: 3 open findings, all Blocking, 1 defect and 2 differences. Down from 5 open findings, 2
defects and 3 differences.

One blocking defect, new finding 1, means the target needs work before use. The two blocking
differences do not hold it back. Read those as signals about the rules rather than about the file.

Both new findings share one root cause, the paragraph at lines 11 to 13, so one edit closes both.
The smallest form: mark the applier list as examples or give the membership test, and name which
of the two skills holds the evidence rule. Something like "The skills `auditing-skills` and
`writing-agents` apply these rules, and so does any audit that meets the **hand-off** condition.
The stop conditions live in the skill you are running. `auditing-skills` states the evidence each
finding carries."

## 5. Anything I did that nobody asked for

- Made the hand-off call myself, as asked, and wrote the reasoning into section 1 rather than only
  reporting which way I went, so it can be overturned without redoing the audit.
- Confirmed the **catalogue** declaration at line 12 against `steering-rules.md` lines 49 to 58
  rather than accepting it. Recorded the one place the declaration overstates, at the end of
  section 1.
- Read `auditing-skills/SKILL.md` and `writing-agents/SKILL.md` in full. Neither is a target. Line
  13 makes a claim about both, and new finding 2 exists only because I checked it.
- Read `AGENTS.md`, `DECISIONS.md` around line 303, `dispatch-protocol.md` lines 1 to 14, and
  `skill-rules.md` lines 1 to 14. The last two are how I established that line 11's applier list is
  incomplete rather than merely short.
- Read `AUDIT-ROUND.md`, which was added in the audited commit. It is the record of why the four
  rule changes were made. I used it only to check that I was not reporting a deliberate change as
  drift, and once as corroboration in new finding 1.
- Ran `git diff 7deb2ae d015e2e` over both targets, to separate what the commit changed from what
  it left alone. This is why the Finish 3 residue at line 62 is disclosed rather than quietly
  retired.
- Ran `git log` and `git status` to confirm the stated commit and clean tree. Both matched.
- Changed no file except this report and `/tmp/ste-audit-2/lint.md`.
