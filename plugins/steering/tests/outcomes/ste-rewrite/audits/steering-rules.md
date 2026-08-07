# Audit: steering-rules.md against itself

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`
Rules: the same file. Read in full at commit 7deb2ae. Working tree clean, nothing edited or staged.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
All generated files are up to date.
```

The lint passed. It reached the target.

`npm run lint -- --explain` reports that a top-level `.md` under a plugin's `shared/` is a
reference surface. The target is `plugins/steering/shared/steering-rules.md`, so it is one.

What ran over the target: reference resolution only. The target names one path,
`./handoff-rules.md` at line 20. It resolves, and the lint exited clean.

What did not reach the target, per the same `--explain` output: the frontmatter hazard check, the
name format and length check, the description length check, and the body line count check. Those
run over components only, meaning `skills/*/SKILL.md`, `commands/*.md`, and `agents/*.md`. A
reference surface carries no frontmatter, so those checks do not apply to it. This is a stated
exclusion, not a coverage gap.

I did not re-derive any mechanical limit by hand. The target's length, its reference, and its
structure are settled by the lint above and are not re-argued anywhere below.

### Conditions established for the target

The result turns on this, so it is recorded rather than assumed. The target's own use, not mine.

| Condition | Met | Why |
| --- | --- | --- |
| always | yes | By definition. |
| reused | yes | A shared rule file named by four skills: `auditing-skills`, `writing-skills`, `writing-agents`, and indirectly `skill-rules.md`. Not a one-off. |
| advisory | yes | Every directive the file gives its reader is evaluative. It says to judge a document and report counts by severity. It never directs a modification. |
| changes something | no | The file directs no modification. Noted as contestable: `writing-skills` step 7 and `writing-agents` steps 2 and 5 consult it while they do modify files. I resolved this on the file's own text, which judges rather than changes. |
| hand-off | no | The file is a standing reference loaded into whatever session is running, not a brief passed to an agent that lacks the conversation. Its own lines 20 to 22 treat hand-off as a condition it routes on, not as its own state. |

Because hand-off is not met, no rule in `handoff-rules.md` applies. I read that file anyway,
because the target references it and an unread reference reads as a failure.

### The load-bearing check behind every "difference" below

Several rules ask for a property that sits in the consuming skill rather than in the target. To
tell a defect from a difference I established whether the target is ever an agent's only
instruction. It is not. Every path to it runs through a SKILL.md that carries the framing:

- `auditing-skills/SKILL.md` lines 21 to 25 and 29 to 30 carry the stop conditions, the
  out-of-scope status, and the "does not edit the target" rule.
- `auditing-skills/SKILL.md` lines 82 to 86 carry the default outcome and the warn vocabulary.
- `auditing-skills/SKILL.md` lines 115 to 116 carry the evidence requirement.
- `writing-skills/SKILL.md` lines 26 to 30 and 66 to 74 carry its own boundary and stop conditions.
- `shared/lint.md` lines 50 to 53 carry the retry rule.

So where a property is absent from the target and present one hop up, I could not name what an
agent would do wrong, and I marked it a difference.

## 2. Findings

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| **Outcome.** The finished outcome is stated, not just a topic or an area of work. | pass | | Line 13 to 14 states what the agent produces: counts by severity, and a blocking failure means the document needs work before use. |
| **Outcome.** The outcome statement sits at the top, before context and method. | pass | | Line 13 to 14, above the Context section at 55 and the Method section at 102. |
| **Context.** Nothing refers to something the agent cannot resolve. | fail | difference | Line 88 to 90, "One reviewer read the first wording. It had already found a reflected injection." Line 199 to 201, "Three rewrites in this project moved the subject to the wrong actor: from the review to the agent, from all readers to people, and from the document's own use to the auditor's use." Neither prior run nor rewrite is readable from the document. Both are anecdotes supporting a point already made in the preceding sentence, so no wrong action follows. |
| **Context.** Every fact the agent needs is either written out or pointed at by a path it can read. | fail | **defect** | Line 13 to 14 defines the effect of Blocking ("the document needs work before use") and of Advisory ("Mention an Advisory item once. It never blocks"). It never defines Important. An agent that finds only Important failures cannot tell whether the document is fit to use. `handoff-rules.md` line 6 defers back here, and `auditing-skills/SKILL.md` lines 128 to 137 are also silent, so the fact is nowhere. The agent guesses. |
| **Context.** Approaches already tried and found not to work are stated. | pass | | Lines 78 to 90, the closed injection list and what it cost. Lines 143 to 153, the label wording and why it misses. Lines 189 to 201, the voice rewrites that moved the subject. |
| **Context.** Context sits above the method, so it is read before a plan is formed. | pass | | Context section at line 55, Method section at line 102. The framing at lines 3 to 46 also precedes both. |
| **Scope.** What is in scope is named. | pass | | Lines 3 to 6, with a membership test and a marked example list. |
| **Scope.** What is out of scope is named explicitly. | pass | | Lines 8 to 11, a separate statement with its own test, "The test is who the text addresses." |
| **Scope.** Where a category of work is named, a membership test defines it. Any list of kinds carries a marker saying they are examples. | pass | | Every list of kinds carries both. Lines 4 to 6, lines 8 to 11, line 59, line 174. The condition list at lines 39 to 43 is closed on purpose and says so, "Use these and nothing else," so a reader can still decide. |
| **Scope.** The instruction says to stop and report on reaching a scope limit, rather than work around it. | fail | difference | The file names its limits at lines 8 to 11 and 10 to 11 but never says to stop and report on meeting one. The gate sits in `auditing-skills/SKILL.md` lines 21 to 25, which states it belongs there as a pre-work gate. Same root cause as the two Failure rows below. |
| **Scope.** The scope statement sits above the method. | pass | | Lines 3 to 11 and the Scope section at 64, both above Method at 102. |
| **Scope.** The instruction states that the agent must not modify anything. It also says what to do where a fix looks obvious. | fail | difference | Absent from the file. `auditing-skills/SKILL.md` lines 29 to 30 carry it. Adding it here would be wrong: `writing-skills` and `writing-agents` read this same file while they modify files. The absence is correct for a dual-use rule table, so the rule reaches past what it can judge here. |
| **Method.** One default approach is given rather than a menu of options. | pass | | One severity scheme, one condition vocabulary at line 37, one section order at line 45. Where a second form is allowed, line 92, the file ranks it and says when to prefer the stronger one, lines 99 to 100. |
| **Method.** The order is fixed where sequence affects correctness, and left open where it does not. | pass | | Line 45 to 46 fixes the section order for the written document. Line 76 fixes test-before-examples. Nothing else is ordered. |
| **Method.** The instruction constrains how the work is done only where correctness or safety needs a specific way. Each such constraint says why. | pass | | Reasons given at lines 20 to 22, 62, 75 to 76, 119, 152 to 153, 186 to 187. One constraint carries no reason, line 37 "Use these and nothing else," but it is self-enforcing so no wrong action follows. |
| **Method.** Any check that must run before work starts is named as the first step. | pass | | The two pre-work determinations, the hand-off routing at line 20 and the conditions at 37, both precede every rule table. Minor wrinkle: line 20 invokes the hand-off condition twenty lines before line 40 defines it. An agent reading top-down finds the definition and proceeds. |
| **Finish.** A check the agent can run itself is named, and its result settles whether the work is done. | not applicable | | Condition "changes something" not met. |
| **Finish.** The instruction says the agent runs the check itself before reporting. | fail | difference | No check appears anywhere in the file. It never names `lint.md`. This is deliberate: `skill-rules.md` lines 8 to 11 say the mechanical limits are the script's job and must not be restated, because a second copy drifts. `auditing-skills/SKILL.md` step 1 carries it. |
| **Finish.** The finish criteria are specific enough that two runs would return the same result. | fail | **defect** | Same root cause as the undefined Important severity above. Two runs over a target whose only failures are Important can reach opposite verdicts on fitness, because line 13 to 14 settles Blocking and Advisory and leaves Important open. |
| **Finish.** The instruction says what evidence each finding must carry. | fail | difference | Absent from the file. `auditing-skills/SKILL.md` lines 115 to 116 carry it, "Evidence is the line or section it came from." |
| **Finish.** The finish check sits late in the document, near where the agent will decide whether to stop. | not applicable | | No finish check exists. Per the file's own lines 16 to 18, the missing item is the finding and the rules depending on it are not applicable. The missing check is the row two above. |
| **Failure.** Conditions that should stop the work are stated. | fail | difference | The file states none. `auditing-skills/SKILL.md` lines 21 to 25 state them and say they sit there on purpose, "These stop conditions sit here, ahead of the workflow, not beside the report." Same root cause as the Scope stop row. |
| **Failure.** A retry limit is named, and something must change before a retry rather than only the attempt count. | fail | difference | Absent. The file directs a single-pass judgment with no retryable operation, so nothing follows from the absence. `lint.md` lines 50 to 53 carry the retry rule for the one operation that can be retried. |
| **Failure.** Weakening the check or editing the test to make it pass is forbidden. | not applicable | | Condition "changes something" not met. |
| **Failure.** The instruction says what to do where the input is missing, is not what it expected, or cannot be assessed. It gives a status for each case. | fail | difference | The file enumerates no statuses and handles none of the three cases. Note the routing consequence: the "cannot be assessed, mark it warn" instruction lives only in `handoff-rules.md` lines 7 to 8, and line 20 to 22 of the target tells a non-hand-off reader not to open that file. `auditing-skills/SKILL.md` lines 21 to 23 and 85 close the gap for every real path. Same root cause as the two rows above. |
| **Failure.** The stop conditions sit directly after the finish check. | not applicable | | Neither section exists. Per lines 16 to 18, not applicable. |
| **Calibration.** Examples of what counts are given. | pass | | Lines 78 to 97, bad and good scope wording plus closed and not-closed lists. Lines 143 to 151, label against shape. Lines 189 to 196, the voice pair. |
| **Calibration.** Examples of what does not count are given. | pass | | Line 92 to 97 marks a form that satisfies the rule rather than breaking it. Lines 16 to 18 name a case that is not applicable rather than a finding. Lines 8 to 11 name material that is not judged at all. |
| **Calibration.** The default outcome is stated, so the agent must justify escalating rather than justify approving. | fail | difference | The Calibration section exists, at line 131, and states no default. `auditing-skills/SKILL.md` line 82 states it, "The default outcome is pass." Every path to this file runs through that skill. |
| **Calibration.** Where a run showed a miss, the instruction describes the shape that miss takes in the code. It does not describe the label. | pass | | Lines 88 to 90 give the shape, a list that stops rather than generalises. Lines 147 to 151 demonstrate the rule on itself. Line 198 gives the shape for the voice miss, "how a writer promotes the nearest noun," before the three-rewrite anecdote. |
| **Composition.** Every named hole in a template is marked required, or carries a default. | pass | | Vacuous. The condition "reused" holds, and the file contains no placeholder or named hole to leave unfilled. |
| **Composition.** The set of fields established for a template is fixed. It does not gather a payload most callers never use. | pass | | Fixed at line 37, "Use these and nothing else." Five conditions, three severities, nine sections. The hand-off routing at lines 20 to 22 is three lines and is routing, not payload. |
| **Composition.** What happens to partial work when a run stops is stated. | not applicable | | Condition "changes something" not met. |
| **Voice.** A sentence that instructs names its actor, and that actor can choose to act. | warn | **defect** | I cannot tell from the file whether a bare imperative satisfies this. The file's own instructing sentences are bare imperatives with no named actor: line 13 "Report counts by severity," line 37 "Use these and nothing else," line 76 "Write the test for membership first," line 152 "Reach for this after a run shows a miss," line 165 "Check them wherever you check the rest." Its only worked example of the instructing form, line 180, names a subject: "The caller checks that the report is complete." Line 186 warns against turning a property into an imperative, which implies imperatives are the instructing form, but never says an unnamed actor is acceptable. |
| **Voice.** A sentence that states a property keeps the property's owner as its subject, and gains no actor. | pass | | Checked every rule row in all nine tables. No property statement swaps in an actor. The "the instruction says" and "the description states" family is the form the file endorses at line 183. |
| **Voice.** Nothing that cannot choose to act takes an action verb. | fail | difference | The file breaks this against its own list at line 174, which names a rule, a review, a file, and a document as unable to choose. Line 22, "So a document that is not a hand-off never reads them." Line 10 to 11, "These rules judge what tells an agent how to work. They never judge what an agent works on." Line 165, "These rules govern every sentence rather than one section." Line 199 to 201, "Three rewrites in this project moved the subject" and "Each one changed what the sentence demanded." Intent is recoverable in each case, so no wrong action follows. |

## 3. Counts by severity

Two bases are given, because they answer different questions. Rule rows show coverage. Root
causes show how many things there are to fix. The file says to count one finding per root cause,
so the second is the one to act on.

**By rule row, 36 rules total**

| | Blocking | Important | Advisory | Total |
| --- | --- | --- | --- | --- |
| pass | 7 | 6 | 5 | 18 |
| fail | 8 | 4 | 0 | 12 |
| warn | 0 | 1 | 0 | 1 |
| not applicable | 3 | 2 | 0 | 5 |

Fails and warns: 8 Blocking, 5 Important, 0 Advisory. Thirteen in total.

**Defect and difference, by rule row**

Defects 3. Differences 10.

**Defect and difference, by root cause, 9 root causes**

Defects 2. Differences 7.

| Root cause | Rules | Severity | Kind |
| --- | --- | --- | --- |
| Important severity has no stated effect | Context 2, Finish 3 | Blocking | defect |
| Bare imperative against named actor is undecidable | Voice 1 | Important | defect |
| No stop conditions, statuses, or unreadable-input handling | Scope 4, Failure 1, Failure 4 | Blocking | difference |
| No "must not modify" or obvious-fix handling | Scope 6 | Blocking | difference |
| No default outcome stated | Calibration 3 | Blocking | difference |
| No self-run check, no evidence requirement | Finish 2, Finish 4 | Important | difference |
| No retry limit | Failure 2 | Important | difference |
| Unresolvable references to prior runs and rewrites | Context 1 | Blocking | difference |
| The file breaks its own Voice rule | Voice 3 | Important | difference |

**Verdict.** One blocking defect, so the file needs work before use. Six of the eight blocking
fails are differences and do not hold it back. Read those instead as a signal about the rules: five
of them ask a shared rule table for framing that correctly lives in the SKILL.md one hop above it,
and firing at Blocking severity on an absence nobody can name a consequence for is the rule
reaching past what it can judge.

## 4. The three fixes to make first

**1. Say what an Important failure means for fitness.** Line 14 settles Blocking and Advisory and
leaves Important open. Nothing else in the system closes it: `handoff-rules.md` line 6 defers back
here, and `auditing-skills/SKILL.md` is silent. An agent holding a target whose only failures are
Important has to guess whether it may ship, and two runs can guess differently. This is the one
blocking defect, and it also causes the reproducibility fail. One sentence at line 14 fixes both.

**2. Say whether a bare imperative satisfies the actor rule.** Line 169 asks that an instructing
sentence name its actor. The file's own instructions are bare imperatives, so an auditor applying
line 169 to a target cannot tell whether to fail them. One auditor floods a report with Important
findings against ordinary instruction writing; another passes every one. Either add the addressee
to the rule, as in "an imperative addressed to the reading agent satisfies this," or state that it
does not and rewrite lines 13, 37, 76, 152, and 165 to match.

**3. Fix the file's own Voice breaks.** Line 22 is the sharpest, "So a document that is not a
hand-off never reads them," when line 174 names a document among things that cannot choose. Also
lines 10 to 11, 165, and 199 to 201. Nothing goes wrong for an agent that reads them, so this is a
difference. It is third because the file is the model every agent reads before writing one, and a
rules file that breaks its own newest rule teaches the break. It is also the cheapest of the three.

The remaining six root causes need no change to the file. Five are properties that sit correctly in
the SKILL.md above it, and one is a retry limit for an operation this file does not perform. If
anything changes, change the condition on those rows so they stop firing on a shared rule table.

## 5. Anything I did that nobody asked for

- I read four files beyond the target and its one reference: `auditing-skills/SKILL.md`,
  `writing-skills/SKILL.md`, `shared/skill-rules.md`, and `shared/lint.md`. Nobody asked for
  these. I read them to settle one question: whether the target is ever an agent's only
  instruction. It is not. Every defect-or-difference call on an absent property rests on that
  check, so I would not have trusted the report without it.
- I recorded the conditions determination as its own section in part 1. The report format did not
  ask for it. Every result turns on it, and the "changes something" call is contestable, so hiding
  it would have made the report unreviewable.
- I marked one rule pass as vacuous rather than not applicable, the template-hole rule under
  Composition. The condition "reused" genuinely holds and the file has no holes to leave unfilled,
  so calling it not applicable would have overstated the gap.
- I did not apply `skill-rules.md`. Its line 6 limits it to a SKILL.md and the target is not one.
- I did not apply `handoff-rules.md`. The hand-off condition is not met. I read it because the
  target references it.
- I did not re-derive any mechanical limit by hand.
- I edited, staged, and committed nothing. The working tree is clean at 7deb2ae, as it was at the
  start.
