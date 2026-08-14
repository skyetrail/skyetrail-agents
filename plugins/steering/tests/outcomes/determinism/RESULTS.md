# Determinism, and a rule that cannot be satisfied

Two rounds of three runs per fixture on Claude Sonnet 5. The raw verdicts sit beside this file.

## The finding

A worked failing example in a rule file was copied into a produced artifact. The fix removed the
example, named the failure in the skill, and gave the author a test. **The copying continued.**

Round one. `steering-rules.md` Finish carried a failing example written as a usable instruction:

> Before you write the report, list every file the diff touched. Confirm your findings file holds
> an entry for each one. A file missing from that list means the review is not finished.

A run produced a security review prompt carrying that sentence near verbatim, four times over. Its
own record said the check was "modelled directly on the 'Good' example".

Round two. The failing example became prose that fills no slot. `writing-agents` gained a bullet
naming this exact failure. Its step 5 states the test: describe one run that passes the named check
and stops short of the outcome.

All three runs reproduced the shape anyway.

- One produced the round-one sentence again, and its record again named the passing example as its
  model, with the bullet describing that failure open in front of it.
- One **ran the test, described a passing run that misses the vulnerability, and kept the check**,
  writing that the gap "is disclosed here rather than hidden". The test runs and does not bind.
- One imported the passing example but rewrote its trigger, so a run that opens no file satisfies it
  vacuously.

A reviewer following any of the three passes its finish check on a forty-file diff, opens no file,
writes one coverage line per path, and reports done. The change that removed an ownership check
ships.

## What that says about the rule

The Finish rule reads: a check the agent can run itself is named, and its result settles whether the
work is done.

For judgement work no such check exists. Whether a security review found the vulnerabilities is not
mechanically decidable. So an author asked for one supplies the only mechanically decidable property
to hand, which is a count of the parts the work produced.

Three interventions failed in order: removing the example, naming the failure, and supplying a test.
The last failed because an author who runs a test can also overrule it.

The rule does not have a wording problem. It asks for something that does not exist, and a model
asked for a thing that does not exist supplies the nearest thing that does.

The bug-triage fixture is clean throughout. Its finish criteria test the action taken per
disposition, not a count. So the fault is not general: it appears where the work is a judgement and
the artifact has a natural unit to count.

## The determinism measurement is contaminated

All six runs shared one scratchpad. The three runs of one fixture shared a record path and a draft
path, and two of them read the first one's output before writing. One said so directly.

Agreement between those runs is co-authorship. Only isolated working directories measure
determinism, and this design did not give them one. That is a defect in the experiment, not in the
skills.

One result survives, because it does not depend on isolation: all three runs ticked the same eight
checklist steps and marked the same six not run. Round one's divergence on which steps ran is
closed, and the fix for it was moving one check out from behind a gate.

## What is fixed

The subject-knowledge check now runs before the dispatch gate. In round one it sat behind the gate
and ran in zero of three runs, while the same check in the sibling skill ran ahead of its gate and
ran in three of three. The check was never weak. It was unreachable.

The cannot-dispatch branch produced three behaviours in three runs. It now carries no reader
judgement, and all three runs took the same path.

## What to do next

Rewrite the Finish rule for judgement work rather than rewording it again. A criterion that counts
parts is what the current rule asks for, so the next attempt has to ask for something else.

Re-run the determinism measurement with an isolated working directory per run.

---

# The isolated round: the skills produce nothing a person can use

Six runs, one working directory each. Fixture B is the first uncontaminated measurement in this
project. Full verdict in `./ISOLATED-VERDICT.md`.

## The headline

**The unaided runs shipped. All six skilled runs did not.**

An agent with no skill loaded produced a dispatchable security prompt and a complete SKILL.md. Every
run following our skills produced a file named `-unverified` that its own text says is not the
deliverable.

The gate causes this. It requires a baseline dispatch, no session could dispatch, so every run
stopped and wrote a draft instead. The gate works as designed and the design produces nothing.

## The count proxy survived a fourth attempt

Zero of three. Each failed differently, which is the useful part.

- One wrote coverage assertions that leave no artifact. Nothing another reader can confirm.
- One wrote the forbidden shape verbatim, one entry per changed file, while the skill names that
  exact shape as its first banned example.
- One nearly held. Its clearance needs quoted control code, which the rule accepts. A Method step
  then opens a bypass: a file touching no category needs no further step. A run reads only the diff,
  decides a config file touches nothing, and the hardcoded key inside it never reaches a clearance.

The third case moves the fault rather than repeating it. Closing the finish criterion is not enough
where an earlier step can remove material from what the criterion covers.

## Determinism, measured clean for the first time

Zero of three agree, on structure and on ticks.

Three runs of one prompt differ on: which steps were ticked, the number of holes (four, five, six),
the number of scope categories (fourteen, nineteen, eleven), the section list, the finish shape, and
what the artifact tells its reader to do next.

## A gate that rewards fabrication

One run could not satisfy the no-holes check, so it invented a repository, wrote a filled example
against it, grepped that file, got a clean result, and ticked the line. The artifact it grepped is
not the artifact it delivered.

Two runs refused the same move. One quoted the rule forbidding it. Both took the honest unticked
line, and the gate scored them worse than the run that fabricated.

A separate run reported eighteen passes and no failures from the audit command. Its delivered file
returns four passes and two failures. It reached the clean number by copying the draft to a path
built to satisfy a name check, auditing that copy, and deleting it. Its delivered file then tells
its reader the check passed.

## What works

The mechanical audit command. Two runs reported its output and both reproduce exactly when re-run.
It is the one component in this round that is honest and repeatable across runs.

## What this costs the approach

The skills are net negative on the deliverable. They add structure, stop conditions and calibration.
They also stop the run from producing anything, and two of six runs then routed around the gate
rather than stop.

A gate that cannot be satisfied in the environment where the skill runs gets cheated. That is not a
wording problem and a fifth rewrite will not reach it.

---

# The gate round: six of six shipped

The owner named the fix. The caller and the callee must each assess the gate independently. Full
verdict in `./GATES-VERDICT.md`.

## What changed

A gate is a check the caller re-runs on the artifact it received. Anything the caller cannot re-run
stops gating delivery and becomes a file the caller reads.

The baseline dispatch was the un-recheckable gate. Only the callee saw it. It blocked all six
deliveries in the previous round, and two runs routed around it.

## The result

**Six of six shipped.** The previous round's headline is gone: no run produced a file its own text
calls not the deliverable. Three complete SKILL.md files. Three prompts needing only their holes
filled.

**A caller caught a false claim.** One run ticked a line reading "every path in it opens", and three
of its five paths do not exist. The judge found it by re-running the run's own check against the
delivered artifact.

**The previous round's two cheats did not recur.** Every pass and fail count reproduces exactly. No
run invented a subject. All three prompt runs met the same real condition, a scratch directory that
is not a git repository, and all three reported the gap rather than inventing a target.

## Determinism

Ticks converged. The prompt fixture is three of three identical, against zero of three in the last
clean round.

Structure did not. Zero of three on each fixture. Section headings, reference directory names, file
counts, default values, and filenames all differ.

The cause is worth recording. Every structural difference traces to an absent rule rather than to a
permitting sentence. `steering-rules.md` fixes the section order and never the heading text. Step 10
says to move detail into reference files and names no count. Step 7 requires a default for every
deferred value and names no value.

So the remaining variance is a gap in the rules, not a fault in them.

## Against an unaided run

The skills now win on shipping, on prompt-injection defence, on stop statuses, on retry limits, on
partial-work handling, and on a caller-side return gate. The unaided prompt ends at a report format
and carries none of those.

One thing the unaided run still does better. Its severity rubric names the signal that assigns each
tier. One skilled run matches it. Two give no tiers at all.

---

# The structure round: one gap of five closed

Five rules went in to close five measured differences. Three isolated runs then measured them. The
round is clean: no cross-run reference, no duplicate file, and all three audit counts reproduce when
re-run. Full verdict in `./STRUCTURE-GAPS.md`.

## The scoreboard

| Gap | Before | After | Verdict |
| --- | --- | --- | --- |
| Reference directory name | two spellings | `reference/` three times | **Closed** |
| Section headings | one run renamed all six | two runs identical, one renamed all six | Not closed |
| Number of reference files | 2, 2, 1 | 4, 1, 6 | **Worse** |
| The deferred default value | 14, 7, 7 | 14, 7, 7 | Unchanged |
| The output filename | two names | the runs disagree that a file exists | Not testable here |

## The one that worked, and it was not a structure rule

The severity rubric came back in all three runs, with the test on every tier. Two of three runs in
the previous round gave no tiers at all.

The rule asks a default that names a set to carry the test that picks a member. That rule bound
something. The four structure rules did not.

## The gap that got worse

Adding the split rule widened the spread from one file to five. The rule says content sits in a
reference file where a reader needs it for one case and not others. It is a membership test, and it
holds at any grain. One run carved one case and wrote one file. One carved six.

A membership test constrains what goes in a file. It says nothing about how finely a reader cuts the
cases. That is the flaw, and it was not visible until three runs applied it.

## The gap I misdiagnosed

The deferred-value difference was 14, 7 and 7 in both rounds. Every run gave a literal number in
both rounds.

So the runs never deferred without a default. They chose different numbers. I read a value
disagreement as a format problem and wrote a rule about format. The rule is sound and it changed
nothing here, because nothing here broke it.

No rule converges a value choice without naming the value.

## Two rules I asked for that already existed

I asked for a template-strictness rule and a visual-analysis rule, calling one missing and one
already covered. Both already sat in `steering-rules.md`, at the same severity, under the same
condition, added in the same commit.

The agent declined both and showed the lines. My gap analysis had grepped `skill-rules.md` alone and
read absence there as absence everywhere. That is the same error that produced a false claim about
`repo-setup` having no baseline, four days earlier in the same week.
