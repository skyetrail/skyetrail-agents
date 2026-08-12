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
