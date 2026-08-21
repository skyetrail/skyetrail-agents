# Outcomes

Every experiment this project ran, and what each one settled.

## What was under test

This plugin holds four skills. A skill is a short instruction file an agent reads before it starts
a job.

- `writing-skills` writes a new skill.
- `writing-agents` writes a brief for a second agent that starts with no memory.
- `auditing-skills` checks a skill or a brief against the written rules.
- `repo-setup` works out the basic facts about a repository and records them.

Shared rule files carry the rules those skills apply. Eleven experiments tested the skills, the
rules, or both. `METHOD.md` carries the practices these experiments produced. This page carries the
results.

Read the null results and the failures first. They changed the project more than the wins did.

## Every experiment

The sections below run in the same order as this table. Each one states why it was worth running
after the one before it. The order is by what each one answered, and not by date.

| Experiment | Question | Answer |
| --- | --- | --- |
| skills-bench | Does a skill from `writing-skills` change what a later agent produces? | It fixed the output shape. It also dropped security content the bench never scored. |
| handoff-bench | Does the produced hand-off brief beat the hand-written one it replaced? | Not at first. It lost round one 6.67 to 7.67, then reached 8 of 8. |
| handoff-bench-2 | Do those gains hold on code the brief never saw? | Partly. The injection fix generalised. The secrets fix did not, and cycle 3 recovered it. |
| setup-bench | Does `repo-setup` write its record safely into a file someone else owns? | Yes, on one re-run. One marker pair survived and the hand-written text was untouched. |
| external-probe | Do the audit rules find real defects in another author's skills? | Yes. The finding counts are worthless, because all ten audits breached the calibration threshold. |
| trigger-test | Do the two description rules change which skill an agent picks? | Still unknown. Both arms scored 36 of 36, so the test had no room to show a change. |
| ste-rewrite | Did moving nine files to a controlled English change only their style? | No. A checker found three files whose demands changed, all from sentence splits. |
| ste-bench | Does that controlled English change what an agent finds? | No, and it costs nothing. Eight runs, an exact tie, nine words longer. |
| rules-ab | Did four rounds of audit and fix make the rules better? | No measurable difference on a repository we did not write. A null result. |
| sonnet-exec | Do the skills work when Claude Sonnet 5 executes them? | Partly. Execution found defects an audit cannot reach. One of them resisted every fix. |
| determinism | Do isolated runs agree, and do the gates hold? | No, then yes. The gate blocked six of six deliveries. A caller-side gate shipped six of six. |

## skills-bench

This was the first experiment. It asked whether a skill written by `writing-skills` changes what a
later agent produces.

The produced skill scored 7.00 of 7 against a control mean of 6.33. Treat that gap as close to no
evidence. One trap separated the arms, and only one point was available to win. The unscored
finding was larger: three control runs produced three document shapes, and three produced runs
produced one. The produced runs also dropped the security advice all three control runs gave. Later
work narrowed the claim, because the same skill then failed an independent audit.

Detail: [skills-bench/RESULTS.md](./tests/outcomes/skills-bench/RESULTS.md)

## handoff-bench

skills-bench scored a produced skill. This bench scored a produced hand-off brief against the
hand-written brief it replaced.

Round one was a loss, 6.67 problems found against 7.67. A scope clause listed injection subtypes,
and a reviewer filed a real vulnerability out of scope because its subtype was missing. Two fix
cycles turned it into a win at 8 of 8, with zero false alarms. The losing round stays on the record.
A later bench re-ran the current brief blind on this fixture and got 8 of 8 twice. One limit: three
runs per arm, with no treatment of variance, so a gap of one finding is thin.

Detail: [handoff-bench/RESULTS.md](./tests/outcomes/handoff-bench/RESULTS.md)

## handoff-bench-2

The win above came from fixes tuned on that one fixture. This bench asked whether the fixes hold on
code the brief never saw.

The widened injection rule generalised. It caught `yaml.load` and `pickle.loads`, which no subtype
list names. The cycle 2 secrets wording did not: both runs filed a live token out of scope, sent
with TLS verification disabled. That wording named three places, so it read as another closed list.
Cycle 2 scored 7 of 9, and cycle 3 recovered the finding at 8 of 9. Two limits: the comparison arm
is one run where the design specifies three, and the key omits a tenth problem every arm found.

Detail: [handoff-bench-2/RESULTS.md](./tests/outcomes/handoff-bench-2/RESULTS.md)

## setup-bench

The hand-off benches scored what an agent finds. This one scored a side effect: writing a record
into a file that already holds someone else's writing.

`repo-setup` is safely repeatable, on one re-run. The file held exactly one marker pair afterwards,
and the hand-written content on both sides survived character for character. The rest of the
repository was byte-identical, and the agent reached the same conclusion as the first run. The bench
owner verified that by direct count and recursive diff, not from the agent's report. The limits are
narrow: one re-run, one fixture, one worker model, and no raw run file kept. This directory holds a
re-run note and a fixture, and no results page.

Detail: [setup-bench/RERUN.md](./tests/outcomes/setup-bench/RERUN.md)

## external-probe

Every bench so far used our own fixtures. This probe pointed the audit rules at another author's
skills.

The rules find real defects. They found closed lists that skip an unlisted case, and a test gate
with nothing forbidding a weakened test. The finding counts are still worthless. Our gate says that
more than five findings on one file means the auditor judges too harshly. Every audit breached it,
ten of ten, across seven files, and the lowest total was ten findings. Across three double-audited
files, paired audits returned opposite verdicts on the same sentence five times.

The probe pre-registered one falsification path, the trigger test. The next section states what that
test returned.

Detail: [external-probe/RESULTS.md](./tests/outcomes/external-probe/RESULTS.md)

## trigger-test

The probe left its description findings unsettled and named this test as the way to settle them, so
this test ran. It asked whether the two rules about a skill's description change which skill an agent
picks. It was designed on 2026-08-07 and run for the first time on 2026-08-11, after the ste-bench,
ste-rewrite and rules-ab rounds below it.

Both arms scored 36 of 36. Recall was 18 of 18 and false triggers were zero, in both arms, with zero
variance inside an arm.

That settles nothing. Both arms took every point available. The result leaves two readings open: the
rules change nothing, or the test had no room to show a change. The power is absent as well. With 18
should-trigger trials per arm, a true miss rate of 10 percent shows zero misses about 15 percent of
the time. The design pre-committed to reading no difference as grounds for cutting a blocking rule,
and the scorer refused that reading. Both description rules stay, neither justified nor refuted.

Earlier versions of this page said nobody had run this test. That is wrong now, and running it again
will not help. Settling the two rules needs items near a decision boundary, and enough trials to see
a five percent difference. That is a different test.

One record item stays. An earlier version of this directory held six run files that no agent
produced. They were caught because they were byte-identical across two arms, which independent runs
cannot be. The executed runs carry that same shape, and the results page states that before a reader
asks. So the byte-identical signal no longer separates a real run from a fabricated one.

Detail: [trigger-test/RESULTS.md](./tests/outcomes/trigger-test/RESULTS.md), with the arms, the
scoring and six run files beside it.

## ste-rewrite

Every experiment above measured what the skills and the rules produce. The next two measured the rule
files themselves, after nine of them moved to a controlled English. This one checked whether that
rewrite changed only the style.

It did not. An independent checker compared each of nine files to its pre-rewrite baseline and found
three whose demands had changed. All three came from splitting one sentence into two. That result
became the equivalence gate in `METHOD.md`.

The audit half is weaker. Nine targets produced 26 findings, and six of nine files needed work,
while four earlier rounds reported zero defects and left no records. The page states that the two
results cannot be reconciled.

Detail: [ste-rewrite/EQUIVALENCE.md](./tests/outcomes/ste-rewrite/EQUIVALENCE.md) and
[ste-rewrite/AUDIT-ROUND.md](./tests/outcomes/ste-rewrite/AUDIT-ROUND.md)

## ste-bench

ste-rewrite asked what the rewrite changed in the files. This bench asked what it changed in the
agent.

It changes nothing and costs nothing. Two arms, two fixtures and two runs each gave an exact tie,
with zero false alarms in all eight runs. Scorers worked blind against keys written rounds earlier.
The predicted length cost of 20 to 40 percent was wrong: the rewrite added 9 words on 949. Only the
scored half is usable, because three phrases the author wrote leaked through the blinding.

Detail: [ste-bench/RESULTS.md](./tests/outcomes/ste-bench/RESULTS.md)

## rules-ab

Four rounds had audited this plugin's own files against its own rules. Each round cleared the
previous round's findings, which looked like convergence. This A/B compared the rules before those
rounds against the rules after, both auditing skills written by someone else.

The rounds did not improve the rules. Eight blind audits ran across two arms and two targets, and
every measure ties or reverses. Naming a consequence favoured the later rules on one target by 19
points, and the earlier rules by 17 points on the other. Three of four pre-registered predictions
were wrong, and the one that held predicted no difference.

The arithmetic behind the rounds matters more than the null itself. Rounds two, three and four retired
144 findings and created 67 new ones, and most of the new ones came from the previous round's fixes.
So the retirement count measured conformance, and the repair of damage the rounds caused.

Two limits. Eight audits over two targets are enough for a large difference, and not for a small one.
A modest real improvement would not show here. And the rounds did close real defects in this
plugin's own files, which this design never measured. Two paths in `repo-setup` deleted a confirmed
lint command. Agents following `writing-agents` went to `dispatch-protocol` for a status set and a
retry limit that file did not carry.

Both arms found the same real defects. The rules do something. The four rounds did not make them do
it better. The lesson this produced governs everything after it: auditing your own files against
your own rules measures conformance, not quality.

Detail: [rules-ab/RESULTS.md](./tests/outcomes/rules-ab/RESULTS.md)

## sonnet-exec

rules-ab showed that an audit cannot tell whether the skills are better. So the project began running
the skills on Claude Sonnet 5, the model that executes them. This measured execution rather than
conformance for the first time.

Round one was half void. One task measured a superseded commit, and one conclusion about pointers was
wrong and is retracted on the page. What survived is what an audit cannot reach. A gate the executor
cannot run is a gate the executor skips. A forward reference breaks the step that carries it. Step 1
told the agent to write a record to a directory that step 9 named.

Round two ran four fresh runs and closed three of four findings. The fourth resisted. The skill
still strips correct domain content that the model produces unaided, even after a warning named the
exact item.

Round one also stated one result as a rule: when a deliverable is expected and the evidence gate
cannot run, Sonnet ships the deliverable. Later rounds reversed that, then reversed it back. The
next section carries the sequence.

Detail: [sonnet-exec/RESULTS.md](./tests/outcomes/sonnet-exec/RESULTS.md)

## determinism

sonnet-exec ran each condition once. This directory ran three runs per fixture, three separate
rounds over, and holds more evidence than any other directory in the project. Detail:
[determinism/RESULTS.md](./tests/outcomes/determinism/RESULTS.md).

**Round one measured nothing, and diagnosed one defect.** All six runs shared one scratchpad, and
two of them read the first run's output before writing. Agreement between those runs is
co-authorship, so the round says nothing about determinism. Only isolated working directories
measure it.

The defect it diagnosed had survived three attempts by then. Every produced security prompt defined
done as one entry per changed file. Removing the worked example failed. Naming the failure failed.
Supplying a test failed too, because one author ran the test, described a passing run that misses the
vulnerability, and kept the check anyway.

The diagnosis holds. For judgement work, no check the agent runs settles whether the work is done.
The rule asked for something that does not exist, so authors supplied the nearest thing that does,
a count of the artifact's own parts. That count passes on empty work. The bug-triage fixture stayed
clean throughout, so the fault is not general. It appears where the work is a judgement and the
artifact has a natural unit to count.

**The isolated round gave each run its own working directory, and the skills produced nothing
usable.** All six skilled runs produced a file whose own text says it is not the deliverable. Two
unaided runs shipped. The baseline gate caused it. The gate required a dispatch inside the agent's
session. No session could dispatch, so every run stopped and wrote a draft.

The count proxy failed a fourth time, zero of three. Determinism measured clean for the first time
and returned zero of three, on structure and on ticks.

Two runs cheated the gate rather than stop. One invented a repository, wrote a filled example
against it, grepped that file, and ticked the line. One reported eighteen passes and no failures. It
reached that number by copying the draft to a path built to satisfy a name check, auditing the copy,
and deleting it. Its delivered file returns four passes and two failures.

Two other runs refused the same move and took the honest unticked line. They scored worse than the
run that fabricated. One component held: the mechanical audit command, `npm run audit`, reproduced
exactly when re-run.

**The gate round shipped six of six.** The owner named the fix. The caller and the callee must each
assess the gate independently. A gate is a check the caller re-runs on the artifact it received.
Anything the caller cannot re-run stops gating delivery, and becomes a file the caller reads.

Six of six runs shipped: three complete SKILL.md files, and three prompts needing only their holes
filled. A caller caught one false claim by re-running a run's own check. The run ticked a line whose
whole content reads "every path in it opens". Three of its five paths do not exist. Neither earlier
cheat recurred, and every pass and fail count reproduced exactly.

Determinism split. Ticks converged, three of three identical on the prompt fixture, against zero of
three in the last clean round. Structure did not, zero of three on each fixture. Heading text,
reference directory name, file count, default values and filenames all differ. Every structural
difference traces to an absent rule rather than to a permitting sentence, so the remaining variance
is a gap in the rules.

The skills now win on shipping, on prompt-injection defence, on stop statuses, on retry limits, on
partial-work handling, and on a caller-side return gate. An unaided run still does one thing better:
its severity rubric names the signal that assigns each tier. One skilled run matches it, and two
give no tiers at all.

**The environment matters here.** All six runs reported no way to dispatch a subagent, and the judge
confirmed that independently. `TaskCreate` creates pending items with no model execution, `TaskGet`
reads them back, and `SendMessage` needs an already-named teammate. None of them dispatches a
fresh-context agent and returns output. So any rule that assumes a subagent is available did not
hold in the sessions that produced these three rounds.

Detail: [determinism/RESULTS.md](./tests/outcomes/determinism/RESULTS.md), with the isolated verdict
and the gate verdict beside it.

## What is still open

- Structure varies on five points: heading text, reference directory name, file count, default
  values, and filename. No rule names any of them.
- Two of three skilled runs give no severity tiers, where an unaided run does.
- The gap analysis lists 24 judgement decisions with no stated test, 15 in `writing-skills` and 9 in
  `writing-agents`. No round has measured any of them.
- The two description rules are unsettled, and settling them needs a different test.
- Fixture A of the isolated round cannot be re-run until the prior-round output at
  `plugins/skyetrail/tests/baselines/` moves out of reach. Keep run output out of a baselines
  directory, because the next round reads it and measures the earlier one.
- No baseline has run against any skill since 2026-08-01, and two skills were rewritten on
  2026-08-12.

## What to read next

- `METHOD.md` states the practices these results produced, and names the failure behind each one.
- `TESTING.md` states how to test triggering and behaviour.
- `SUMMARY.md` describes the skills themselves.
