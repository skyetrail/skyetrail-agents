# Re-audit, round 3: dispatch-protocol.md

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/dispatch-protocol.md`
Rules: `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md` and
`/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/handoff-rules.md`
Prior report: `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits-round2/dispatch-protocol.md`, which audited this target at commit `d015e2e`.
Repository at commit `d72544f`, working tree clean. Nothing was edited, staged, or committed. The
only file written is this report.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
lint (advisory): plugins/steering/SUMMARY.md: is 193 lines and has no "## Contents" heading; a reference file over 100 lines opens with a contents list
All generated files are up to date.
```

The run exits clean. The one advisory is against `plugins/steering/SUMMARY.md`, not against this
target.

`npm run lint -- --explain` reports that a top-level `.md` under a plugin's `shared/` is a reference
surface, and that reference surfaces get reference resolution plus an advisory contents-list check on
any file over 100 lines. This target is `plugins/steering/shared/dispatch-protocol.md`, so it is a
reference surface.

**The lint reached the target with both of its checks, and both passed.** Reference resolution ran
and resolved the two paths at lines 3 and 4, `./steering-rules.md` and `./handoff-rules.md`. The
contents-list check ran too, because this file is 128 lines, and it passed: the Contents list sits at
lines 10 to 16. That is the one target of the three the new check reaches, and the evidence it ran is
that a sibling reference file of 193 lines with no such heading did trigger it in the same run.

These checks did not run on the target at all: frontmatter hazards, name format and length,
description length, and body line count. The explain output states those apply to components, meaning
`skills/*/SKILL.md`, `commands/*.md` and `agents/*.md`, and that reference surfaces carry no
frontmatter. Coverage above is taken from the explain command, not from prose.

**One coverage gap still matters to this target.** Line 7 names a skill by bare name rather than by
path. The lint resolves paths, so nothing mechanical checked it. That is the gap that let round 2's
false claim survive a clean lint. The claim has since been corrected and I verified the correction by
grep rather than by lint. The gap itself is unchanged.

I re-derived no mechanical limit by hand.

### The call on the hand-off condition

**I called it applies.** Round 2 went the same way and I am keeping the mapping so the two reports
compare, but the reasoning is mine.

- The condition at `steering-rules.md` line 45 is about the reader: the agent will not see the
  conversation the author has been having. An agent that opens this file in a later session has not
  seen it, so the condition is met, and `steering-rules.md` line 25 then requires
  `./handoff-rules.md` to be read as well.
- I applied each hand-off rule as a property of the target's content, asking whether the target
  requires, of the prompts it governs, the thing the rule asks for. That mapping is natural here
  because the target's own invariants already take the form "The prompt states X". A rule such as
  "The sections of the report are named" therefore tests whether the target requires a prompt to name
  them, in its own words or by pointing at a file that does.
- I accept a pointer as satisfying a rule, on `steering-rules.md` line 84, which allows a fact to be
  "written out or pointed at by a path it can read".

**The alternative, stated so it can be overturned without redoing the audit.** Read hand-off as
applying only to a document that itself dispatches and returns a result, which is how the round-2
report called it for the sibling `handoff-rules.md`, and all eighteen rows of `handoff-rules.md` drop
out. Three of the four open findings on this target go with them, leaving one Blocking defect whose
root cause is in `steering-rules.md` anyway. Worth noting that the two round-2 sibling reports called
this condition opposite ways on two shared reference files with the same relationship to their
readers. Only one of those calls can be right, and nothing in the rules settles which.

### The call on the describes work condition

**I called it does not hold**, so the nine rules conditioned on it do not apply.

Line 7 claims it ("This file supplies criteria and defines no task of its own") and
`steering-rules.md` line 52 tells me to treat that as a claim to check rather than accept. I checked
it.

- The test at lines 56 to 58 asks for the outcome. This file names nothing a reader finishes. It is a
  principle, two definitions, eight invariants, a status table, three shapes, and a rule about which
  determinations belong to a script.
- The task that applies them is defined elsewhere and I confirmed it. `writing-agents/SKILL.md` has
  the seven-step workflow at lines 35 to 58, and it reaches into this file at step 3 (line 46), at
  line 57 for the shapes, and at line 91 in its references.
- Round 2 filed a Blocking defect here on the opposite finding, that lines 113 to 114 and 126 to 128
  instruct someone performing a dispatch and therefore describe work. The new test rules that
  reasoning out by name at lines 60 to 63: "An instruction about how to read the criteria does not
  make a task ... Test for the outcome, not for the presence of an imperative, because every
  catalogue here holds imperatives of that kind." I applied the new test and went the other way.

The residual round 2 named is real and unchanged: the stop condition at line 113 and the recheck
instruction at line 126 sit in text that no Method, Finish or Failure rule now examines, so an edit
that breaks either passes an audit clean. The rules now accept that cost deliberately and say why, so
it is recorded here rather than filed as a finding.

Conditions applied: **always**, **hand-off**, **changes something**, **reused**. Not applied:
**advisory**, **describes work**. So the Calibration section and the advisory-conditioned rules stay
not applicable, as in both prior reports.

## 2. Prior findings

The round-2 report left six findings open: one it confirmed from the round-1 report, and its own five
new ones. Three retired, three confirmed, none changed. Source column convention is kept: S is
`steering-rules.md`, H is `handoff-rules.md`.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| S Conditions: line 7 claimed the **catalogue** condition on a narrower test than the condition states, and lines 113 to 114 and 126 to 128 do describe work (Blocking, **defect**) | **Retired** | Both halves are gone. The self-declared condition name is gone: line 7 now reads "This file supplies criteria and defines no task of its own", which is the replacement condition's own wording at `steering-rules.md` lines 49 to 50, not a substituted narrower claim. And the test that produced the finding is gone: `steering-rules.md` lines 60 to 63 now say the presence of an imperative does not make a task, naming this exact sentence pattern. I checked the claim rather than accepting it, against `writing-agents/SKILL.md` steps 3 and 7. |
| S Conditions: line 7 named two skills as appliers and only one applies this file (Blocking, **defect**) | **Retired** | Line 7 now names one: "The skill `writing-agents` applies this file." Grep over the repository excluding `tests/` returns exactly three inbound references, all in `writing-agents/SKILL.md`, at lines 46, 57 and 91. `auditing-skills/SKILL.md` is 143 lines and contains no reference to this file. The list of one is accurate today, which is why it is not a fresh Scope 3 finding. |
| S Conditions: the carve-out at `steering-rules.md` line 52 did not say whether it reached the identically named Finish and Failure sections of `handoff-rules.md` (Blocking, **defect**) | **Retired** | `steering-rules.md` line 64 now reads "the Method, Finish, and Failure rules **below** do not apply". "Below" scopes the carve-out to that file, so `handoff-rules.md`'s Finish at line 39 and Failure at line 46 are untouched by it and apply in full to any hand-off document. The ambiguity round 2 named is settled, and settled the narrow way. A different ambiguity took its place inside `steering-rules.md`. That is new finding 1, and per the caller's instruction it is filed as a new finding rather than folded into this row. |
| H Context: line 4 describes `handoff-rules.md` as covering "what the agent returns", and that file covers more (Important, Warn, difference) | **Confirmed** | Line 4 is unchanged. `handoff-rules.md`'s Composition section at lines 67 to 78 still holds eight rules that are caller-side work, including "The facts the prompt asserts are established before dispatch" at line 71 and "The model or effort level is named explicitly" at line 74. A caller reading this file for its own obligations is told the other file is about the return, so it has no reason to open it. Still a warn and still a difference on round 2's grounds: this file duplicates the caller-side content in invariants 1 and 8, and `writing-agents/SKILL.md` line 89 describes the same file correctly and more widely. |
| H Composition: invariant 8's wording is stricter than the rule it implements (Important, difference) | **Confirmed** | Both texts unchanged. Invariant 8 at line 62 reads "The prompt names the model and the effort level". `handoff-rules.md` line 74 reads "The model or effort level is named explicitly". A prompt naming the model and no effort level satisfies one and fails the other, and `writing-agents/SKILL.md` steps 2 and 5 put the same author in front of both wordings in one pass. Still a difference: the target is the stricter of the two, so the likely cost is a false finding rather than a missed one. |
| H Composition: a predefined named agent is never covered (Advisory, difference) | **Confirmed** | The target still never mentions a predefined named agent, while `writing-agents/SKILL.md` lines 74 to 84 keeps its "Converting a named agent" section and routes the reader back here through workflow steps 2 to 7. Composition is not in the **describes work** carve-out under either reading, so the rule still applies. Advisory, so it blocks nothing. |

### The four rows round 2 retired by rule change, revisited

The rule changed again, so these needed rechecking rather than assuming.

- **S Finish, no runnable check or command named (was Blocking, defect).** Stays not applicable, but
  only under my reading of the new carve-out. That rule is Finish 1 at `steering-rules.md` line 140,
  conditioned on **changes something**, which this target meets. Under the competing reading it
  revives as a Blocking failure. That swing is new finding 1.
- **S Failure, stop conditions in two places (was Advisory, difference).** Stays not applicable. That
  rule is conditioned on **describes work**, which fails under either reading.
- **S Voice, bare imperatives (was Important, difference).** Stays retired on content.
  `steering-rules.md` lines 201 to 205 still state that a bare imperative passes.
- **H Finish, the exact commands are named (was Important, defect).** Round 2 retired this under the
  broad reading of the old carve-out, and that ground is gone: `handoff-rules.md`'s Finish section is
  now plainly outside the carve-out. It stays retired on the file's own content instead. Invariant 5
  at lines 54 to 55 requires the agent to prove its work "with the commands and their output", line
  30 presupposes "each command the prompt named", and line 4 points at `handoff-rules.md` line 43.
  The ground moved, the outcome did not.

## 3. New findings

Only findings the round-2 report does not contain. One.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| `steering-rules.md` lines 64 to 67 conflict with the Applies-when column of the same file's Finish and Failure tables. Severity assigned Blocking, because it decides whether a Blocking rule runs against this target. | Blocking | **Fail** | **Defect** | Lines 64 to 65 say "Where **describes work** fails, the Method, Finish, and Failure rules **below** do not apply", and the reason at lines 66 to 67 speaks of whole sections: "Where a document defines no task, none of the three has anything to test." But the Applies-when column conditions only nine of those fourteen rows on **describes work**. The other five carry **changes something** or **advisory**. This target meets **changes something**, so the two readings disagree about Finish 1 at line 140, "A check the agent can run itself is named, and its result settles whether the work is done", and about Failure 3 at line 152. Prose reading: both not applicable. Column reading: Finish 1 applies and fails, because the target names no command anywhere and never points at `./lint.md` in the same directory, and Failure 3 applies and passes on invariant 5. What an agent does wrong: two auditors of this file return Blocking counts of 1 and 2 on consecutive runs and hand the author contradictory instructions, which is the same shape round 2 filed against the old carve-out's reach. The root cause is in `steering-rules.md`, not in this target, and it surfaces here because this target is the one whose condition set makes the readings diverge on a Blocking row. I took the prose reading, because lines 66 to 67 give a reason and the word "below" is deliberate. |

Nothing else escalated. The Outcome, Context, Scope, Composition and Voice rules of
`steering-rules.md`, and the Outcome, Context, Finish, Failure, Return and Composition rules of
`handoff-rules.md`, otherwise pass on the same evidence the prior reports gave or are not applicable
on the same grounds. The default outcome at `steering-rules.md` line 17 was applied throughout.

Four things I checked and did not escalate, recorded so a later pass does not spend the time again.

- **Line 7 is now a list of one with no examples marker.** Scope 3 asks any list of kinds to carry a
  marker. This is a claim of fact rather than a category, it is true today by grep, and a reader who
  needs the applier can find it. It will go stale silently if a second skill starts reading this
  file, which is the same failure mode that produced round 2's finding, only now pointing forward
  rather than at existing text. Worth one clause if anyone touches the line again.
- **The new Context rule at `steering-rules.md` line 86 passes.** "A document that only states
  criteria names at least one document that applies them." Line 7 names `writing-agents`. That rule
  is the half of the old **catalogue** exemption worth keeping, and it works: it is the reason the
  false claim in the old line 7 got caught in round 2 and the reason the corrected line still has to
  say something.
- **Line 116, "Anything that can be counted, parsed, matched, or read from a file is script work",
  is a closed list of four verbs.** It opens with a test form, and line 21 supplies the real
  membership test ("A script makes any determination that runs deterministically") with line 117
  supplying the counter-test. Round 2 considered the same family of text at line 118 and did not
  escalate. Neither do I.
- **Invariants 2, 5 and 8 give action verbs to a prompt, which cannot choose.** `steering-rules.md`
  lines 216 to 220 bless exactly this form as a property sentence an auditor tests, and warn against
  rewriting it into an order. Passes.

### On the deliberate changes, judged rather than reported as drift

Three changes reach this target, and two of them work.

The corrected applier claim at line 7 works and is verifiable by the cheapest possible means. It also
exposes the standing gap that let the wrong version survive three clean lints: a skill named by bare
name is invisible to reference resolution, so a factual claim about which skills apply a file is
checked by nobody. The advisory channel and the contents-list check now give the lint somewhere to
put a finding it does not want to fail the run over, so that gap is closable if anyone wants it
closed.

The **describes work** condition works where **catalogue** failed. It cannot be switched on by
writing one sentence about the document, its test is the outcome rather than a word count of
imperatives, and putting it in the Applies-when column stopped it exempting fourteen rules at once.
On this target it retired two Blocking defects and it introduced none of its own. What did not get
carried across is the prose at lines 64 to 67, which still talks in whole sections and now disagrees
with the column beside it. That is the one new finding, and it is a smaller thing than what it
replaced: round 2's version of this ambiguity spanned two files, and this one is contained in four
lines of one.

The contents-list check reached this target, the only one of the three it does reach, and passed.

## 4. Counts by severity

New findings:

| Severity | Fail | Warn | Defects | Differences | Total |
| --- | --- | --- | --- | --- | --- |
| Blocking | 1 | 0 | 1 | 0 | 1 |
| Important | 0 | 0 | 0 | 0 | 0 |
| Advisory | 0 | 0 | 0 | 0 | 0 |
| **Total** | **1** | **0** | **1** | **0** | **1** |

Surviving prior findings:

| Severity | Fail | Warn | Defects | Differences | Total |
| --- | --- | --- | --- | --- | --- |
| Blocking | 0 | 0 | 0 | 0 | 0 |
| Important | 1 | 1 | 0 | 2 | 2 |
| Advisory | 1 | 0 | 0 | 1 | 1 |
| **Total** | **2** | **1** | **0** | **3** | **3** |

Combined: 4 open findings, 1 defect and 3 differences.

Round 2 for comparison: 6 open, 3 defects and 3 differences. Round 1: 15, of which 4 Blocking, 10
defects and 5 differences. All three of round 2's Blocking defects are gone, two by edits to the
target and one by the rule rewrite.

One blocking defect means the target needs work before use, but the work is in `steering-rules.md`
lines 64 to 67, not here. Nothing filed against the target's own text is a defect. The three
differences do not hold it back. Read them as signals about the rules rather than about the file, and
note that two of the three exist only because I called hand-off the way I did.

Two notes on the counts, kept from round 2 because they still apply. The Blocking severity on the new
finding is assigned by me, not read off the rules: the Conditions block at `steering-rules.md` lines
42 to 67 is prose and carries no severities, while line 13 says every entry carries one. I assigned
Blocking because the ambiguity decides whether a Blocking rule runs. A different auditor could
reasonably assign Important and would then report zero Blocking failures for this file. Giving the
Conditions block stated severities would remove that spread, and it is now the second round running
where the same gap has forced the same guess.

## 5. Anything I did that nobody asked for

- Stated my reasoning for both condition calls in section 1, and the effect of overturning each, so
  either can be reversed without redoing the audit. The caller asked only which way I went on
  hand-off.
- Flagged that the two round-2 sibling reports called the hand-off condition opposite ways on two
  shared reference files with the same relationship to their readers. Nobody asked. It is not a
  finding against this target, but it means the round-2 numbers for these two files were produced
  under inconsistent rules.
- Rechecked the four rows round 2 retired by rule change, rather than assuming a retirement survives
  a second rule rewrite. One of the four, H Finish, now rests on completely different evidence than
  the reason round 2 gave, and it is recorded in section 2 rather than left to look untouched.
- Verified the corrected applier claim at line 7 by grep across the repository excluding `tests/`,
  and read `auditing-skills/SKILL.md` in full to confirm it holds no reference to this file. The
  caller told me grep settles it, and it does. I checked anyway because round 2's most serious
  finding was a claim about that same skill that three clean lints had not caught.
- Read `writing-agents/SKILL.md` in full and `handoff-rules.md` in full. The second is a rule file
  here and a target of its own report, so it was read both ways.
- Ran `git diff d015e2e d72544f` over the target and over `steering-rules.md`, to separate what the
  commit changed from what it left alone. The target changed by two lines.
- Ran `git log` and `git status` to confirm the stated commit and clean tree. Both matched.
- Changed no file except this report and its two siblings in `/tmp/ste-audit-3/`.
