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
