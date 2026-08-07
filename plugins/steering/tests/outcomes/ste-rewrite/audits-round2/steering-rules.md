# Re-audit: steering-rules.md against itself

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`
Rules: the same file, read in full at commit d015e2e.
Prior report: `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits/steering-rules.md`, which audited the same target at 7deb2ae.
Working tree clean at d015e2e. Nothing edited, staged, or committed.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
All generated files are up to date.
```

The lint passed. It reached the target.

`npm run lint -- --explain` states that a top-level `.md` under a plugin's `shared/` is a reference
surface, and that a reference surface gets reference resolution only. The target is
`plugins/steering/shared/steering-rules.md`, so it is one. It names one path, `./handoff-rules.md`
at line 25, which resolves. The change at d015e2e added no new path, so the reference surface is
unchanged since the prior report.

What did not reach the target, per the same `--explain` output: the frontmatter hazard check, the
name format and length check, the description length check, and the body line count check. Those
run over components only, meaning `skills/*/SKILL.md`, `commands/*.md`, and `agents/*.md`. A
reference surface carries no frontmatter, so those checks do not apply. This is a stated exclusion,
not a coverage gap. Same result as the prior report.

Also noted, because it bears on this pass: `--explain` states that nothing under a plugin's
`tests/` is opened at all. The prior report lives under `tests/`, so the lint never checked its
paths or its line citations. I re-derived the prior report's citations against the current file by
hand.

I re-derived no mechanical limit by hand.

### Conditions established for the target

| Condition | Met | Why |
| --- | --- | --- |
| always | yes | By definition. |
| reused | yes | A shared rule file read by `auditing-skills`, `writing-skills`, and `writing-agents`. Not a one-off. |
| advisory | yes | Every directive the file gives its reader is evaluative. It judges a document and reports counts by severity. It directs no modification. |
| changes something | no | The file directs no modification. Unchanged from the prior report. |
| hand-off | no | A standing reference loaded into whatever session is running, not a brief passed to an agent that lacks the conversation. |
| **catalogue** | **cannot be settled from the file** | This is new finding 1 below. It is the largest single result of this pass. |

Because hand-off is not met, no rule in `handoff-rules.md` applies. I read that file anyway, because
the target references it.

Everything in section 3 that turns on the catalogue call is marked as turning on it.

## 2. Prior findings

The prior report recorded twelve fails and one warn. Each is below.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| **Context 1.** Unresolvable references to prior runs and rewrites. | confirmed | Both cited passages survive and one grew. Lines 103 to 105 still read "One reviewer read the first wording. It had already found a reflected injection." Line 222 now reads "Five rewrites in this project moved the subject to the wrong actor," where the prior report cited three, and lines 224 to 228 list all five. No rewrite is readable from the document. |
| **Context 2.** Important severity has no stated effect. | **retired** | Lines 14 to 15 now state it: "An Important failure does not stop use. The author fixes it before the document changes again." No other file contradicts it. `auditing-skills/SKILL.md` lines 132 to 136 narrow the blocking sentence only, and say so. |
| **Scope 4.** Stop and report on reaching a scope limit. | confirmed | Absent from the file. Lines 8 to 11 still name the limits and still say nothing about stopping. Scope is not one of the three sections catalogue scopes out, so this row applies either way. |
| **Scope 6.** Must not modify anything, and what to do where a fix looks obvious. | confirmed | Absent from the file. `auditing-skills/SKILL.md` still carries it. Same reasoning as the prior report: adding it here would be wrong, because `writing-skills` and `writing-agents` read this file while they modify files. |
| **Finish 2.** The agent runs the check itself before reporting. | changed | The text is unchanged and the property is still absent. What changed is that the row's applicability now turns on the unsettled catalogue call at lines 49 to 55. Not applicable if catalogue is met, still a fail if not. |
| **Finish 3.** Two runs would return the same result. | changed | The prior cause is gone, and a different one replaces it. Important is now defined at line 14. But lines 17 to 19 introduce a fresh reproducibility break, and the catalogue call adds a second. See new findings 1 and 4. |
| **Finish 4.** What evidence each finding must carry. | changed | Still absent from the file, still carried by `auditing-skills/SKILL.md` lines 114 to 115. Applicability now turns on the catalogue call. |
| **Failure 1.** Conditions that should stop the work. | changed | Still absent. Applicability now turns on the catalogue call. |
| **Failure 2.** A retry limit. | changed | Still absent. Applicability now turns on the catalogue call. |
| **Failure 4.** What to do where input is missing, unexpected, or cannot be assessed, with a status for each. | changed | Still absent, and the routing consequence the prior report named still holds: the "cannot be assessed, mark it warn" instruction lives only in `handoff-rules.md` lines 7 to 9, which line 4 of that file tells a non-hand-off reader not to open. Applicability now turns on the catalogue call. |
| **Calibration 3.** No default outcome stated. | **retired** | Lines 17 to 19 now state it: "The default outcome for every rule here is pass." `auditing-skills/SKILL.md` line 82 was changed in the same commit to point here rather than restate it, so there is no second copy to drift. The wording of the second sentence is a separate problem, reported as new finding 4. |
| **Voice 1.** Whether a bare imperative satisfies the actor rule is undecidable. | **retired** | Line 184 now reads "An instructing sentence is an imperative to the reader, or it names an actor that can choose to act," and lines 191 to 197 work the case: "A bare imperative passes the first rule." The file's own bare imperatives at lines 13, 42, 91, 167, and 180 now pass under its own rule. |
| **Voice 3.** The file breaks its own rule that nothing which cannot choose takes an action verb. | confirmed | One of the four cited instances was fixed. Line 26 now reads "So an agent auditing a document that is not a hand-off never reads them." Three survive: line 10 to 11 "These rules judge ... They never judge," line 180 "These rules govern every sentence," and lines 222 and 230 "Five rewrites ... moved the subject" and "Each one changed what the sentence demanded." The new text adds more, reported as new finding 6. |

**Prior finding counts.** Retired 3. Confirmed 4. Changed 6.

## 3. New findings

Only findings the prior report does not contain.

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| **1. Context 2.** Every fact the agent needs is either written out or pointed at by a path it can read. | fail (Blocking) | **defect** | The catalogue condition does not settle whether the target is a catalogue. Line 49 requires that the document "describes no work of its own." The target describes work: line 13 "Report counts by severity," line 25 "read `./handoff-rules.md` as well," line 52 "Mark those rules not applicable," line 61 "check where a section appears," line 180 "Check them wherever you check the rest." On a plain reading catalogue is not met. But the three sibling files settle it for themselves by self-declaring, and they contain comparable instructions: `handoff-rules.md` line 12, `skill-rules.md` line 9, `dispatch-protocol.md` line 8, each reading "states no workflow of its own, so it meets the **catalogue** condition." The target is the only file under `shared/` that does not declare, and it is the file that defines the condition. What an agent does wrong: it guesses, and the guess moves fourteen rule rows (Method 4, Finish 5, Failure 5) between applicable and not applicable. One run re-files the eight Method, Finish, and Failure fails this change was written to stop. Another marks them all not applicable. Two runs, opposite reports, on the same text. |
| **2. Catalogue requirement, line 57.** A catalogue names the documents that apply it. | fail (severity unstated, see finding 3) | **defect** | The target names none of its appliers. `auditing-skills/SKILL.md` lines 13, 14, and 18 read it; `writing-agents/SKILL.md` lines 40, 50, and 87 read it; `writing-skills/SKILL.md` line 67 reads it. All three siblings do name theirs. Line 58 states the exact consequence of the omission: "Without that line, the procedure looks missing rather than delegated." That is what the prior report did, spending six of its nine root causes reporting delegated procedure as absent, and it will happen again on the next run. The file that states this requirement is the one file that breaks it. |
| **3. Context 2.** Every fact the agent needs is either written out or pointed at by a path it can read. | fail (Blocking) | **defect** | Line 57 states a requirement in prose, in no table, with no severity and no condition. Line 13 says "Each entry carries a severity and a condition." An auditor that finds a catalogue naming no applier cannot place the finding in the counts by severity that line 13 requires. It either drops the finding or invents a severity. This report hit that case at finding 2 and had to report it with no severity. |
| **4. Finish 3.** The finish criteria are specific enough that two runs would return the same result. | fail (Blocking) | **defect** | Line 18 reads "Escalate only where you can name what an agent would do wrong because of the failure." Read against the default of pass on line 17, that suppresses every difference, because a difference is by definition one where you cannot name what an agent would do wrong. `auditing-skills/SKILL.md` lines 120 to 125 require the opposite: "Mark every fail and warn a defect or a difference. Count the defects and the differences separately." Differences must be recorded to be marked. Line 19 makes this unresolvable rather than merely inconsistent, by claiming precedence: "This is the default for any audit that reads this file, whichever skill runs it." What an agent does wrong: one run reports only defects and returns a near-clean report; another reports differences as fails and returns nine. The prior report recorded ten differences, so it followed the skill, not the file. This report was told to follow the skill too. Note on origin: the sentence is not new, it was moved out of `auditing-skills/SKILL.md` by this same commit. What is new is line 19 giving it precedence over the skill that contradicts it, which removes the reader's way out. |
| **5. Conditions, line 42, against the Method, Finish, and Failure condition columns.** | fail (Blocking, highest affected row) | difference | **catalogue** is listed as a condition at line 49 but appears in no "Applies when" column anywhere in the file. The rows it overrides still read "always", "changes something", and "advisory". Line 13 presents the condition column as how a rule is scoped. An agent working the tables row by row applies rows marked "always". The same gap reaches line 60, which still says the section order is "the order these sections should appear in the document being written", with no catalogue exception, so a writer producing a catalogue can read it as still owing Method, Finish, and Failure sections that line 52 has just excused. Marked a difference because the prose at lines 52 to 55 is explicit and sits in the same short file, so a full read recovers the intent. |
| **6. Voice 3.** Nothing that cannot choose to act takes an action verb. | fail (Important) | difference | The text added by this change adds new breaks against line 189, which names "a document" among the things that cannot choose. Line 49, "the document states rules or facts for another document to apply." Line 57, "A catalogue names the documents that apply it." Applying a rule is a choice, and a document cannot make it. Stated plainly because this is a fix that introduced a new problem: line 26 was repaired in the same commit that added these. Marked a difference because intent is recoverable in each case. |

### One observation outside the target

Not counted above, because it is not in the target file, but it is caused by the target's change.
`skill-rules.md` line 10 still says the stop conditions, "the default outcome, and the evidence each
finding carries all live in those two skills," meaning `writing-skills` and `auditing-skills`. As of
this commit the default outcome no longer lives there. `auditing-skills/SKILL.md` line 82 was changed
to point back to the target. An agent following `skill-rules.md` for the default outcome takes two
hops and lands where it should, so nothing goes wrong. The claim is simply no longer true. Difference.

## 4. Counts by severity

### New findings, target only

| | Blocking | Important | Severity unstated | Total |
| --- | --- | --- | --- | --- |
| defect | 3 | 0 | 1 | 4 |
| difference | 1 | 1 | 0 | 2 |
| **Total** | **4** | **1** | **1** | **6** |

The one severity-unstated row is finding 2, and finding 3 is the reason it has no severity.

### Surviving prior findings

Six of the ten survivors turn on the catalogue call, so both readings are given. Neither is the
file's answer, which is finding 1.

**If catalogue is not met, ten survive**

| | Blocking | Important | Total |
| --- | --- | --- | --- |
| defect | 1 | 0 | 1 |
| difference | 5 | 4 | 9 |
| **Total** | **6** | **4** | **10** |

**If catalogue is met, four survive**

The six changed rows (Finish 2, Finish 3, Finish 4, Failure 1, Failure 2, Failure 4) all become not
applicable.

| | Blocking | Important | Total |
| --- | --- | --- | --- |
| defect | 0 | 0 | 0 |
| difference | 3 | 1 | 4 |
| **Total** | **3** | **1** | **4** |

Finish 3's new cause, new finding 4, does not go away under the second reading. The escalate
contradiction is real whichever rule row hosts it. It is counted once, as a new finding.

### The four changes, judged

| Change | Works? |
| --- | --- |
| Important severity now has a stated effect | Yes. Clean. Retires one Blocking defect and removes one of the two causes of the reproducibility fail. |
| The **catalogue** condition | Partly. It does the intended job for `handoff-rules.md`, `skill-rules.md`, and `dispatch-protocol.md`, all of which declare and are scoped correctly. It does not reach the file it is defined in, which declares nothing and names no applier. New findings 1, 2, 3, and 5. |
| Voice rule names the bare imperative case | Yes. Clean. Retires the one warn and settles the file's own instructing sentences. |
| The default outcome is stated in this file | Half. Presence is retired. The second sentence carries a pre-existing contradiction into the file and line 19 gives it precedence, which makes it harder to resolve than before. New finding 4. |

### Verdict

Three Blocking defects, so the file needs work before use. All three are about the same edit. The
catalogue condition was written to stop a class of finding, and it stops it everywhere except in the
file that defines it. Two of the three would be closed by one sentence in the target of the form the
siblings already use: name `auditing-skills`, `writing-skills`, and `writing-agents` as its appliers,
and say whether it is itself a catalogue. The third, new finding 4, needs the escalate sentence
narrowed so it governs severity rather than whether a difference is recorded at all.

## 5. Anything I did that nobody asked for

- I read `git show --stat d015e2e` and the diff of the target between 7deb2ae and d015e2e. Nobody
  asked for the diff. I used it only to confirm which text was added, so that finding 6 correctly
  names a regression and finding 4 correctly does not.
- I read four files beyond the target and its one reference: `skill-rules.md`,
  `dispatch-protocol.md`, `auditing-skills/SKILL.md`, and the diffs of `handoff-rules.md` and
  `auditing-skills/SKILL.md`. Nobody asked. Findings 1, 2, and 4 all rest on what those files do or
  say, and I would not have trusted any of them without checking.
- I recorded the conditions determination as its own block in section 1, as the prior report did.
  The format did not ask for it, and this time the catalogue row is the headline result.
- I gave two sets of surviving counts rather than one. Giving a single number would have hidden the
  fact that the number is not determined by the file.
- I read the commit message for d015e2e. It states the intent behind the catalogue change. I used it
  only to check my reading of "describes no work of its own"; every finding above stands on the file
  text alone.
- I did not apply `skill-rules.md`. Its line 6 limits it to a SKILL.md, and the target is not one.
- I did not apply `handoff-rules.md`. The hand-off condition is not met. I read it because the target
  references it.
- I edited, staged, and committed nothing. The working tree is clean at d015e2e, as it was at the
  start. This report is the only file I wrote.
