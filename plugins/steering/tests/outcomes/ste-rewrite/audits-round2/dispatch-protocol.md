# Re-audit: dispatch-protocol.md

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/dispatch-protocol.md`
Rules: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md` and
`/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/handoff-rules.md`
Prior report: `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits/dispatch-protocol.md`
Commit: d015e2e, working tree clean. Nothing was committed, staged, or edited. The only file
written is this report.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
All generated files are up to date.
```

The lint passed.

`npm run lint -- --explain` reports which kinds of file get which checks. The target is a
top-level `.md` under a plugin's `shared/`, which the explain output calls a reference surface.
Reference surfaces get reference resolution only. They carry no frontmatter, so the frontmatter
and length checks do not apply.

So the lint reached the target, for reference resolution only. The target holds two file
references, `./steering-rules.md` and `./handoff-rules.md`, both at lines 3 and 4, and the lint
resolved both.

Checks that did not reach the target: frontmatter hazards, name format and length, description
length, and body line count. Those apply to components, meaning `skills/*/SKILL.md`,
`commands/*.md`, and `agents/*.md`.

One coverage gap matters to a finding below. Line 7 names two skills, `writing-agents` and
`auditing-skills`, as bare names rather than as paths. The lint resolves paths. A bare name is not
a path, so nothing checked those two, and one of them is wrong. See new finding 2.

I did not re-derive any mechanical limit by hand. The lint settled them.

### The call on the hand-off rules

The prior report flagged that applying the hand-off rules to a reference document, rather than to
a dispatch prompt, was its own interpretation. I made the same call, for a reason I can state.

The hand-off condition is that the agent will not see the conversation the author had. An agent
that opens this file in a later session has not seen that conversation, so the condition is plainly
met, and `steering-rules.md` line 25 then requires `handoff-rules.md` to be read.

I applied each hand-off rule as a property of the target's content, meaning: does the target
require, of the prompts it governs, the thing the rule asks for. That mapping is natural here
because the target's own invariants take the form "The prompt states X". A rule such as "The
sections of the report are named" therefore tests whether the target requires a prompt to name
them, either in its own words or by pointing at a file that does.

I accept a pointer as satisfying a rule, because `steering-rules.md` line 75 says a fact may be
"written out or pointed at by a path it can read". That decision retires four prior findings on
its own, so it is stated here rather than buried in a table cell.

### The call on the catalogue condition

The target declares itself a catalogue at lines 7 and 8. I accept the declaration, with one
qualification that is itself a finding.

It is a catalogue in substance. It holds definitions, invariants, a status table, a set of shapes,
and a rule about which determinations belong to a script. It carries no numbered workflow, no
command to run, and no ordered steps to perform. The procedure that applies it lives in
`writing-agents/SKILL.md`, whose steps 3 and 7 and whose line 57 read this file for the status
set, the retry limit, and the shapes.

So I marked the Method, Finish, and Failure sections of `steering-rules.md` not applicable, per
its line 52. That retires four prior findings by rule change rather than by edit, and each of those
rows says so.

The qualification: the target is not as free of its own work as line 7 claims. That is new finding
1. And the carve-out does not say whether it reaches the identically named sections of
`handoff-rules.md`. That is new finding 3. I went with the broad reading, that it does reach them,
because the reason `steering-rules.md` line 53 gives is about the document rather than about which
file a rule sits in.

Conditions I applied: **always**, **hand-off**, **changes something**, **reused**, and
**catalogue**. **advisory** does not apply, so the Calibration section and the advisory-conditioned
rules elsewhere stay not applicable, as in the prior report.

## 2. Prior findings

The prior report listed fourteen fails and one warn. Each is below in the order it appeared there.
Source column convention is kept: S is `steering-rules.md`, H is `handoff-rules.md`.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| S Scope: invariant 5 named a closed list of three prohibitions (Blocking, defect) | **Retired** | Invariant 5, lines 51 to 56, now writes the membership test first, "any change that makes a check pass without doing the work the check tests", then six examples closed by "are examples, not the whole list". The prior row's secondary evidence, line 118, survives unchanged, but under the default outcome now stated at `steering-rules.md` line 17 I cannot name what an agent would do wrong there, because line 118's next sentence supplies the counter-test. So it no longer escalates. |
| S Finish: no runnable check, script, path, or command named (Blocking, defect) | **Retired by rule change, not by edit** | Still true of the file. No command appears anywhere, and `./lint.md` in the same directory is still never named. The catalogue condition at `steering-rules.md` line 52 marks the whole Finish section not applicable, so the rule no longer reaches the target. |
| S Failure: retry limit required but never named (Important, defect) | **Retired** | Invariant 4, lines 49 and 50: "The default is two attempts per agent." This matches the working limit at `writing-agents/SKILL.md` line 66, "at most twice per agent", so the consumer and the reference now agree. Retired on content, and moot in any case because Failure is not applicable to a catalogue. |
| S Failure: stop conditions sit in two places with no finish check to follow (Advisory, difference) | **Retired by rule change, not by edit** | Still true of the file. Stop conditions still sit at lines 80 and 81 and again at lines 113 and 114. The Failure section is not applicable to a catalogue. |
| S Voice: bare imperatives with no named actor (Important, difference) | **Retired by rule change, not by edit** | The file is unchanged in this respect. `steering-rules.md` lines 191 and 192 now state the case directly: "A bare imperative passes the first rule. It addresses the reader, so its actor is the reader, and it needs no other name." Every sentence the prior report cited is a bare imperative to the reader. |
| H Context: lines 3 and 4 pointed at the wrong file for what the agent returns, and `handoff-rules.md` was never named (Important, defect) | **Retired** | Lines 3 to 5 now split correctly: "`./steering-rules.md` covers what the prompt says. `./handoff-rules.md` covers what the agent returns, including the report's sections. This file covers what the caller does with both." That matches `steering-rules.md` lines 25 to 27. The description of `handoff-rules.md` is narrower than that file is, which is new finding 4, but the pointer is right. |
| H Finish: no exact command named (Important, defect) | **Retired by rule change, not by edit** | Still true of the file, on the same evidence as the S Finish row. Retired under the broad reading of the catalogue carve-out. Under the narrow reading it survives as an Important defect. That ambiguity is new finding 3. |
| H Failure: stopping not stated to carry no penalty (Important, defect) | **Retired** | Lines 90 to 92, new in this commit: "Returning BLOCKED or NEEDS_CONTEXT costs the agent nothing. Say so in the prompt. An agent that reads a stop as a mark against it will guess rather than stop, and a guess is harder to catch than a stop." Fixed on content, so it holds under either reading of the carve-out. |
| H Return: the sections of the report are not named (Blocking, defect) | **Retired** | Line 4 delegates by readable path: `handoff-rules.md` "covers what the agent returns, including the report's sections", and that file's line 60 carries the Blocking rule. `writing-agents/SKILL.md` step 2 already sends the prompt author to both files, so the chain resolves. |
| H Return: invariant 3 was weaker than the rule on detail and cap (Important, defect) | **Retired** | Invariant 3, lines 47 and 48, is now: "The detail goes to a named file. A capped summary returns to the caller. The prompt names both. A prompt saying only 'report your findings' fails this, because it names neither." That reproduces `handoff-rules.md` line 62 and its own bad example at line 20. |
| H Return: unclear whether failures must appear in the summary (Important, warn, difference) | **Retired** | Resolved by the same delegation at line 4. `handoff-rules.md` line 63 states the rule, and the target now points a reader there for everything about the return. Nothing in the target contradicts it. |
| H Return: no section asks the agent to list unrequested work (Important, difference) | **Retired** | Same delegation at line 4. `handoff-rules.md` line 64 carries the rule. |
| H Composition: model or effort level never named (Important, defect) | **Retired** | Invariant 8, lines 62 and 63, new in this commit: "The prompt names the model and the effort level. Left to inherit from the calling session, two runs of one prompt stop being comparable." The Contents entry was also changed from "Seven invariants" to "Invariants", so the count cannot go stale against an eighth item. The wording differs from `handoff-rules.md` line 74, which is new finding 5. |
| H Composition: the status table gave no caller obligation (Blocking, defect) | **Retired** | The table at lines 73 to 78 now carries a third column, "The caller must", filled for all four statuses. Each obligation agrees with the file's own text: the DONE row repeats invariant 5, and the BLOCKED row's "Do not re-send the same prompt" agrees with invariant 4. `writing-agents/SKILL.md` line 44 asks this file for exactly that, and it is now here. |
| H Composition: predefined named agents not covered (Advisory, difference) | **Confirmed** | The target still never mentions a predefined named agent, while `writing-agents/SKILL.md` lines 74 to 83 keep a "Converting a named agent" section that routes the reader back here through workflow steps 3 to 7. Composition is not in the catalogue carve-out, so the rule still applies. Advisory, so it blocks nothing. |

Totals for section 2: **retired 14, confirmed 1, changed 0.**

Of the fourteen retired, ten were retired by edits to the target and four by the rule changes with
the file unchanged. The four retired by rule change are the two Finish rows, the S Failure position
row, and the S Voice row. Their text is still in the file exactly as the prior report described it.

The single highest-value edit was the sentence added at line 4. It closed four rows on its own,
one Blocking and three Important, by naming a file that carries the rules instead of restating
them.

## 3. New findings

Only findings the prior report does not contain. Two of the three defects are consequences of the
catalogue condition, which did not exist when the prior report ran.

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| S Conditions: the **catalogue** condition, `steering-rules.md` lines 49 and 50 (severity assigned Blocking) | **Fail** | **Defect** | Line 7 claims "It states no workflow of its own". The condition requires that the document "describes no work of its own". Those are not the same claim, and the narrower one is substituted for the wider one. The target does describe work of its own in two places. Lines 113 and 114: "Stop and report what is missing where work fits none of them. Do the same where you cannot establish a fact a shape depends on. Do not force the work into the nearest shape." Lines 126 to 128: "Close that gap deliberately. Either assert that no worker can affect those facts, or have each worker recheck the facts it depends on before it starts." Those instruct someone performing a dispatch. An auditor that accepts line 8 marks the Method, Finish, and Failure sections not applicable, so no rule checks either passage, and a later edit that breaks the stop condition at line 113 passes an audit clean. The same sentence at `handoff-rules.md` line 11 is accurate about that file, which carries no method content, so the pattern was copied to a file it does not fit. |
| S Conditions: a catalogue names the documents that apply it, `steering-rules.md` line 57 (severity assigned Blocking) | **Fail** | **Defect** | Line 7 names two skills. Only one of them applies this file. `plugins/steering/skills/writing-agents/SKILL.md` reads it at lines 46, 57, and 90. `plugins/steering/skills/auditing-skills/SKILL.md` is 136 lines and contains no reference to `dispatch-protocol.md`, and no occurrence of dispatch, status, retry, or shape in the sense used here. A reader who follows line 7 for the delegated procedure, which is the purpose `steering-rules.md` line 58 gives for that sentence, reaches a skill that has none. The false half survived a clean lint because both skills are written as bare names rather than as paths, and reference resolution only checks paths. Note that the equivalent sentence at `handoff-rules.md` line 11 is true of both skills, so this is a copy of a correct sentence into a place where half of it does not hold. |
| S Conditions: reach of the catalogue carve-out, `steering-rules.md` line 52 (severity assigned Blocking) | **Fail** | **Defect** | Line 52 says "the Method, Finish, and Failure sections do not apply" without naming a file. `handoff-rules.md` has a section named Finish at line 39 and a section named Failure at line 46. Under the broad reading those drop out and the target's missing command is not applicable. Under the narrow reading "The exact commands are named" still fails, because the target names no command and never points at `./lint.md` in the same directory. Two auditors of this same file therefore return different Important counts and hand the author contradictory instructions on consecutive runs. I went broad, because the reason given at line 53, "A catalogue describes no work. So it has no method to constrain, no finish to check, and no failure to handle", is about the document rather than about which file a rule sits in. The root cause is in `steering-rules.md` line 52, not in the target. It surfaces here because the target is the first document to claim the condition. |
| H Context: local conventions the agent could not infer are stated (Important) | **Warn** | Difference | Line 4 describes `handoff-rules.md` as covering "what the agent returns, including the report's sections". That file covers more. Its Composition section, lines 67 to 78, holds eight rules that are caller-side work, including "The facts the prompt asserts are established before dispatch" at line 71 and "The model or effort level is named explicitly" at line 74. A caller reading this file for its own obligations is told the other file is about the return, so it has no reason to open it. The consequence is limited, because the target now duplicates the caller-side content in invariants 1 and 8, and because `writing-agents/SKILL.md` line 88 describes the same file correctly and more widely. We would write "covers the rules that apply because the agent will not see the conversation, including the report's sections". I cannot name a wrong action, so this is a difference. |
| H Composition: the model or effort level is named explicitly (Important) | **Fail** | Difference | Invariant 8, line 62, reads "The prompt names the model and the effort level". `handoff-rules.md` line 74 reads "The model or effort level is named explicitly". A prompt that names the model and no effort level satisfies one and fails the other. Both files are read together at `writing-agents/SKILL.md` steps 2 and 5, so the same author meets both wordings in one pass. The target is the stricter of the two, and a reasonable auditor reads the "or" in the rule as covering both, so the likely cost is a false finding rather than a missed one. We would use one wording in both places. I cannot confidently name a wrong action, so this is a difference. |

Nothing else escalated. The Outcome, Context, Scope, Calibration, Composition, and Voice rules
otherwise pass on the same evidence the prior report gave, or are not applicable on the same
grounds. The default outcome now stated at `steering-rules.md` line 17 was applied throughout.

## 4. Counts by severity

New findings:

| Severity | Fail | Warn | Defects | Differences | Total |
| --- | --- | --- | --- | --- | --- |
| Blocking | 3 | 0 | 3 | 0 | 3 |
| Important | 1 | 1 | 0 | 2 | 2 |
| Advisory | 0 | 0 | 0 | 0 | 0 |
| **Total** | **4** | **1** | **3** | **2** | **5** |

Surviving prior findings:

| Severity | Fail | Warn | Defects | Differences | Total |
| --- | --- | --- | --- | --- | --- |
| Blocking | 0 | 0 | 0 | 0 | 0 |
| Important | 0 | 0 | 0 | 0 | 0 |
| Advisory | 1 | 0 | 0 | 1 | 1 |
| **Total** | **1** | **0** | **0** | **1** | **1** |

Combined live findings: 6. Defects 3, differences 3.

Prior report, for comparison: 14 fails and 1 warn, of which 4 were Blocking, 10 defects and 5
differences.

Two things about these counts.

First, the three Blocking severities are assigned by me, not read off the rules. The Conditions
block of `steering-rules.md`, lines 42 to 58, is prose rather than a rule table, and
`steering-rules.md` line 13 says "Each entry carries a severity and a condition". The Conditions
block carries none. I assigned Blocking to all three because each one changes which Blocking rules
an auditor runs, or leaves unmet the requirement at line 57 that keeps a delegated procedure
findable. A different auditor could reasonably assign Important instead, and would then report zero
Blocking failures for this file. Giving the Conditions block stated severities would remove that
spread.

Second, on the four rule changes, judged as asked rather than reported as drift. The stated effect
for Important, the stated default outcome, and the bare imperative case in the Voice rule all work.
Each retired a finding cleanly and none introduced a new one. The catalogue condition also works in
its main purpose, which was to stop auditors filing findings that name no consequence, and it
retired four such rows here. But it introduced all three of this pass's defects. Two of them are in
the target, which claimed the condition on a slightly wrong test and named a skill that does not
apply it. The third is in the condition itself, which does not say how far its carve-out reaches.
That is worth saying plainly: the fix that removed the most noise is also the only change in this
commit that created new work.

## 5. Anything I did that nobody asked for

- I read `plugins/steering/skills/writing-agents/SKILL.md` in full, which the task did ask for. I
  also read `plugins/steering/skills/auditing-skills/SKILL.md` for its references, which the task
  did not ask for. Line 7 of the target names that skill as one of two that apply this file, and
  the only way to test the claim was to open it. That check produced new finding 2, which is the
  most serious finding in this pass.
- I ran a repository-wide search for inbound references to the target, excluding `tests/`. That is
  how I established that `writing-agents/SKILL.md` is the only consumer. It also turned up
  `plugins/steering/DECISIONS.md` line 151, which I read but did not audit against.
- I read `plugins/steering/shared/lint.md` in full. It is the file the target could point at for
  the gate it demands, and it also told me to establish the lint's reach with `--explain` rather
  than trust prose. I followed that.
- I read the diff of the target between 7deb2ae and d015e2e. Nobody asked me to. It let me
  separate findings retired by an edit from findings retired by a rule change, which is the split
  reported at the end of section 2, and I do not think the two should be counted together.
- I stated my own interpretation of the hand-off rules and of the catalogue condition in section 1.
  Nobody asked for the method, only for the call. Four retirements and three of the five new
  findings turn on those two decisions, so stating them made the tables readable.
- Two observations outside the audit, offered and counted nowhere. The prior report noted three
  places where two ideas ran together on one line, at what were then lines 76, 99, and 112. The
  worst of the three, the added-statuses sentence, was fixed with a paragraph break. The other two
  are still there, now at lines 113 and 126. Both sit in the two passages that new finding 1 says
  no rule now checks, so the two issues touch the same text. This is formatting, which this audit
  does not judge, so it appears here rather than in a table.
- I did not commit, stage, or edit anything. The only file I wrote is this report. I did not
  re-derive any mechanical limit by hand.
