# External probe: results

Ten audits, seven skills by another author, measured against the questions in
`PREREGISTRATION.md`. Read `audits/CORRECTIONS.md` first: four blocking findings are void because
my fixture broke them, and the counts below are corrected for that.

## Finding counts

| File | Audit | Blocking | Important | Advisory | Total |
| --- | --- | --- | --- | --- | --- |
| brainstorming | A | 6 | 6 | 0 | 12 |
| brainstorming | B | 4 | 8 | 0 | 12 |
| finishing-a-development-branch | A | 6 | 4 | 1 | 11 |
| finishing-a-development-branch | B | 6 | 3 | 1 | 10 |
| receiving-code-review | A | 4 | 5 | 1 | 10 |
| receiving-code-review | B | 5 | 5 | 2 | 12 |
| subagent-driven-development | — | 4 | 6 | 2 | 12 |
| using-git-worktrees | — | 4 | 6 | 1 | 11 |
| writing-plans | — | 5 | 5 | 1 | 11 |
| writing-skills | — | 9 | 12 | 1 | 22 |

## Measure 1: the calibration gate

Our gate says more than five findings on one file means the auditor is judging too harshly.

**Every audit breached it. Ten out of ten, seven files out of seven.** The lowest total was ten.

I predicted a breach on at least four of seven files. The real answer is all of them, by a wide
margin, and the prediction was not close.

Two readings, and only one survives inspection. Either every skill in a widely used collection is
badly written, or our gate is measuring how much a document resembles our own house style. The
second, because a large share of the findings are things a competent author would simply disagree
with: description not in the third person, no tick-box checklist, no named successor skill, no
sentence saying a direct instruction from the person wins. Those appear in nearly every audit and
none of them names a consequence.

The gate is unusable on work we did not write. It never fired during six internal rounds because our
own files were written to the rules that score them.

## Measure 2: agreement between independent audits

Three pairs.

**All three agreed on fitness for use.** Every pair concluded its file needs work before use. This
is the measure that decides anything and it held.

Below that, agreement is poor. Shared blocking findings ran four of six, four of five, and three of
five. Each run found real things the other missed.

The variance has two shapes and our reconciliation rule only handles one.

**Different coverage**, where one run examined text the other never reached. In
`finishing-a-development-branch`, A checked the environment table and B checked the test-runner
list, and each passed or failed the rule truthfully about its own target. The rule handles this: the
union beats either run.

**Direct contradiction**, where both examined the same line and returned opposite verdicts. Five
instances, one in `receiving-code-review` and four in `brainstorming`, including on blocking rules.
The rule handles this badly, turning two opposed readings into a warn that reports only that the
auditors could not agree. That is weaker than the truth, because two careful readers disagreeing
about one sentence is itself evidence about that sentence.

## Measure 3: factual accuracy

One clear confabulation in ten audits. The `writing-plans` auditor attributed the lint command to a
repo-setup block in our `AGENTS.md`. No such block exists. The command it named was correct; the
source it cited was invented, and `receiving-code-review` run B independently recorded the absence
correctly.

The likely cause is our own instruction. `shared/lint.md` now tells auditors to look for that block
first and fall back to `npm run lint`. The auditor took the fallback and reported it as though it
came from the first source. We created a plausible slot and the report filled it.

Everything else I spot-checked held: the generator's comment about excluding `tests/`, the
unreferenced `plan-document-reviewer-prompt.md`, the `brainstorming` path that does not resolve,
body line counts, and the size of `anthropic-best-practices.md`.

Four further findings were factually wrong about the skills, and all four are my fault rather than
the auditors'. See `audits/CORRECTIONS.md`.

## Measure 4: the style case

Resolved, and in our favour. `receiving-code-review` is almost entirely about tone and phrasing, and
neither audit reached for the rule that says we do not judge writing style. Both read that
exemption's actual scope, style that does not change what an agent does, rather than matching on
the topic.

One audit went further and produced the sharpest finding in the probe: the file bans literal strings
such as "You're absolutely right!" and any expression of thanks, and the auditor marked this against
our rule about not documenting what a script could enforce, noting that those strings are greppable
and a hook would catch them far more reliably than prose the model must recall on every reply.

## The ground truth I did not collect

The pre-registration named the trigger test as the one objective check available: if our auditor
calls a description weak and that description triggers reliably, the auditor is wrong with no
opinion of ours involved.

I did not run it. Both audits of `receiving-code-review` faulted its description, in opposite
directions, and the question of which is right remains open. This was the only falsification path in
the design that did not route through a judgment of ours, and skipping it leaves the description
findings unsettled.

## Scorecard against the predictions

| Prediction | Outcome |
| --- | --- |
| Counts breach the gate on at least four of seven files | Understated. Ten of ten audits, seven of seven files |
| Pairs agree on fitness, disagree on minor items | Half right. Fitness agreed three of three; the disagreements were not minor |
| The auditor will not dismiss the style skill as style | Correct |
| The auditor will flag that skill's description | Correct, but both runs flagged it for opposite reasons |

Of the five conditions I wrote down as our rules failing, two occurred: counts high enough that our
gate rejects every audit, and findings that misstate the target. Two did not: no pair disagreed on
fitness, and no skill was waved through on style. One was never tested.

## What to change, in order

1. **Condition the Evidence rule.** Requiring a baseline record in the plugin's `tests/baselines/`
   fired as an automatic blocking failure on all seven files. An external skill has no such
   directory and never will. Every auditor flagged the problem unprompted. The rule needs a
   condition restricting it to a skill this plugin maintains.
2. **Add a contradiction case to reconciliation.** Two runs returning opposite verdicts on the same
   text is a distinct outcome from one run finding what the other missed, and it says something the
   current rule throws away.
3. **Say whether a trailing catch-all satisfies the category rule.** Two audits of `brainstorming`
   split on whether "or any other implementation skill" counts as a membership test. Our rule does
   not answer it. This is a hole in the wording that our own files could never expose, because we
   write that form deliberately.
4. **Separate a defect from a difference in report output.** Findings that name a consequence, such
   as an unlisted ecosystem getting no setup at all, sit beside findings that only record a
   departure from our style. They are currently indistinguishable at the same severity.
5. **Revisit the calibration gate.** As written it cannot be applied to foreign material. Fixing
   items 1 and 4 will lower counts on their own; whether the threshold then means anything needs
   measuring again rather than assuming.

## What the probe supports

Our rules find real, transferable defects in work written to entirely different conventions. The
strongest are consequence-bearing and need no agreement with our taste: a bare list of ecosystems
that silently skips an unlisted one, a list of reasons to push back read as the complete set, a
reference that cannot resolve, a test gate with nothing forbidding the test being weakened to pass
it.

Our category rule, derived from our own security fixture, fired on unrelated skills by another
author in the same shape with the same consequence. That is the first external validation of a
specific rule in this project.

The rewritten `shared/lint.md` worked on every audit. Ten out of ten ran our lint, read the
generator source, established that it never opens the target, and reported a coverage gap rather
than a clean pass. Before that change the case reported identically to a pass.

## What it does not support

Any claim that our finding counts mean something about quality. They measure distance from our house
style at least as much as they measure defects, and we cannot presently tell the two apart in the
output.

Any claim about the reliability of a single audit. Every pair diverged substantially below the
fitness verdict, and in five cases returned opposite verdicts on the same sentence.

Seven files, one collection, one author, one worker model. And the fixture was built by the same
person whose rules were under test, which showed up as four spurious blocking findings that all
happened to favour our tool.
