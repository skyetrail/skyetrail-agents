# Outcomes

Every experiment this project ran, and what each one settled.

## What was under test

This plugin holds four skills. A skill is a short instruction file an agent reads before it starts
a job.

- `writing-skills` writes a new skill.
- `writing-agents` writes a brief for a second agent that starts with no memory.
- `auditing-skills` checks a skill or a brief against the written rules.
- `repo-setup` works out the basic facts about a repository and records them.

Shared rule files carry the rules those skills apply. Ten experiments tested the skills, the rules,
or both. `METHOD.md` carries the practices these experiments produced. This page carries the
results.

Read the null results and the failures first. They changed the project more than the wins did.

## Every experiment

| Experiment | Question | Answer |
| --- | --- | --- |
| skills-bench | Does a skill written by `writing-skills` change what a later agent produces? | It fixed the shape of the output. The bench never scored the content it dropped. |
| handoff-bench | Does the produced hand-off brief beat the hand-written one it replaced? | Not at first. It lost round one, then reached 8 of 8 after two fixes. |
| handoff-bench-2 | Do those gains hold on code the brief was never tuned against? | Partly. The injection fix generalized. The secrets fix did not, and a third cycle recovered it. |
| setup-bench | Does `repo-setup` write its record safely into a file someone else owns? | Yes, on one re-run. One marker pair survived and the hand-written text was untouched. |
| external-probe | Do the audit rules find real defects in another author's skills? | Yes, but the finding counts are worthless. Every audit breached the calibration gate. |
| trigger-test | Do the two description rules change which skill an agent picks? | Unknown. Nobody ran it. An earlier results page for it was fabricated, then deleted. |
| ste-rewrite | Did moving nine files to a controlled English change only their style? | No. A checker caught three files whose demands changed, all from sentence splits. |
| ste-bench | Does that controlled English change what an agent finds, and what does it cost? | It changes nothing and costs nothing. Eight runs, an exact tie, one percent longer. |
| rules-ab | Did four rounds of audit and fix make the rules better? | No measurable difference on a repository we did not write. A null result. |
| sonnet-exec | Do the skills work when Claude Sonnet 5 executes them? | Partly. One skill still strips correct domain content the model produces unaided. |

## skills-bench

The question was whether a skill written by `writing-skills` changes what a later agent produces.
The produced skill scored 7.00 of 7 against a control mean of 6.33. Treat that gap as close to no
evidence, because one trap separated the arms and the fixture held one point of headroom. The real
finding was unscored: three control runs produced three document shapes, and three produced runs
produced one. Later work narrowed the claim, because this same skill then failed an independent
audit. The produced runs also dropped the security advice that all three control runs gave.

Detail: [skills-bench/RESULTS.md](./tests/outcomes/skills-bench/RESULTS.md)

## handoff-bench

The question was whether the brief produced by `writing-agents` finds more planted problems than
the brief it replaced, without raising more false alarms. Round one was a loss, 6.67 found against
7.67. A scope clause listed injection subtypes, and a reviewer filed a real vulnerability out of
scope because its subtype was missing. Two cycles turned it into a win at 8 of 8 with zero false
alarms, and the losing round is recorded as a loss. A later bench re-ran the current brief blind on
this fixture and got 8 of 8 twice. One caveat: three runs per arm, with no treatment of variance,
so a gap of one finding is thin.

Detail: [handoff-bench/RESULTS.md](./tests/outcomes/handoff-bench/RESULTS.md)

## handoff-bench-2

The question was whether those gains hold on code the brief was never tuned against. The widened
injection rule generalized, catching `yaml.load` and `pickle.loads`, which no subtype list names.
The cycle 2 secrets wording did not: both runs exiled a live token sent with TLS verification
disabled. That wording named three places, so it read as another closed list. Cycle 2 scored 7 of
9, and cycle 3 recovered the finding at 8 of 9. Two limits stand: the comparison arm is one run
where the design specifies three, and the key omits a tenth problem every arm found.

Detail: [handoff-bench-2/RESULTS.md](./tests/outcomes/handoff-bench-2/RESULTS.md)

## setup-bench

The question was whether `repo-setup` is safely repeatable when its record goes into a file that
already holds someone else's writing. It is, on one re-run. The file held exactly one marker pair
afterwards, and the hand-written content on both sides survived character for character. The rest
of the repository was byte-identical, and the agent reached the same conclusion as the first run.
The bench owner verified that by direct count and recursive diff, not from the agent's report. The
limits are narrow: one re-run, one fixture, one worker model, and no raw run file kept.

Detail: [setup-bench/RERUN.md](./tests/outcomes/setup-bench/RERUN.md)

## external-probe

The question was whether the audit rules find real defects in skills by another author, and they
do. The rules found closed lists that skip an unlisted case, and a test gate with nothing
forbidding a weakened test. The finding counts are still worthless. Our gate says that more than
five findings on one file means the auditor judges too harshly. Every audit breached it, ten out of
ten, across seven files, and the lowest total was ten findings. Across three double-audited files,
paired audits returned opposite verdicts on the same sentence five times.

The one falsification path this probe pre-registered was the trigger test, and nobody ran it.

Detail: [external-probe/RESULTS.md](./tests/outcomes/external-probe/RESULTS.md)

## trigger-test

The question was whether the two rules about a skill's description change which skill an agent
picks. The answer is unknown, because nobody ran the test. An earlier version of this directory
held six run files and a results page reporting twelve of twelve for both arms. No agent produced
them. All six files were byte-identical across two arms carrying different descriptions, which
independent runs cannot be. The fabricated files were deleted with the rule changes they had
justified, and the design and the answer key survive.

Detail: [trigger-test/DESIGN.md](./tests/outcomes/trigger-test/DESIGN.md)

## ste-rewrite

The question was whether moving nine files to Simplified Technical English changed only their
style, and it did not. An independent checker compared each file to its pre-rewrite baseline and
found three whose demands had changed. All three came from splitting one sentence into two, and
that result became the equivalence gate in `METHOD.md`. The audit half is weaker: nine targets
produced 26 findings, and six of nine files needed work. Four earlier rounds reported zero defects
and left no records at all. The page states that the two results cannot be reconciled.

Detail: [ste-rewrite/EQUIVALENCE.md](./tests/outcomes/ste-rewrite/EQUIVALENCE.md) and
[ste-rewrite/AUDIT-ROUND.md](./tests/outcomes/ste-rewrite/AUDIT-ROUND.md)

## ste-bench

The question was whether rewriting a hand-off brief in Simplified Technical English changes what an
agent finds. It changes nothing and costs nothing. Two arms, two fixtures and two runs each gave an
exact tie, with zero false alarms in all eight runs. Scorers worked blind against keys written
rounds earlier. The predicted length cost of 20 to 40 percent was wrong: the rewrite added 9 words
on 949. Only the scored half is usable, because three phrases the author wrote leaked through the
blinding.

Detail: [ste-bench/RESULTS.md](./tests/outcomes/ste-bench/RESULTS.md)

## rules-ab

The question was whether the rules after four rounds of audit and fix produce better audits than
the rules before. They do not, on a repository we did not write. Eight blind audits ran across two
arms and two targets, and every measure ties or reverses. Naming a consequence favoured the later
rules on one target by 19 points and the earlier rules by 17 on the other. Three of four
pre-registered predictions were wrong, and the one that held predicted no difference. Both arms
found the same real defects, so the rules do something; the four rounds did not improve them.

Detail: [rules-ab/RESULTS.md](./tests/outcomes/rules-ab/RESULTS.md)

## sonnet-exec

The question was whether these skills work when Claude Sonnet 5 executes them, rather than when an
audit checks them. Partly, and the failures matter more than the successes. Round one was half
void: one task measured a superseded commit, and one conclusion about pointers was wrong and is
retracted on the page. Round two ran four fresh runs and closed three of four findings. The fourth
resisted: the skill still strips correct domain content the model produces unaided, even after a
warning named the exact item. None of the round-two findings has reached `METHOD.md`,
`DECISIONS.md` or `TESTING.md` yet.

Detail: [sonnet-exec/RESULTS.md](./tests/outcomes/sonnet-exec/RESULTS.md)

## What to read next

- `METHOD.md` states the practices these results produced, and names the failure behind each one.
- `TESTING.md` states how to test triggering and behaviour, including the test nobody has run.
- `DECISIONS.md` records what changed after each round, and why.
- `SUMMARY.md` describes the skills themselves.
