# Outcomes

Every experiment this project ran, and what each one settled.

## What was under test

This plugin holds four skills. A skill is a short instruction file an agent reads before it starts
a job.

- `writing-skills` writes a new skill.
- `writing-agents` writes a brief for a second agent that starts with no memory.
- `auditing-skills` checks a skill or a brief against the written rules.
- `repo-setup` works out the basic facts about a repository and records them.

Shared rule files state the rules those skills apply. This project ran fourteen experiments, testing
the skills, the rules, or both. `METHOD.md` states the practices those experiments produced. This
page lists the results.

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
| trigger-test | Do the two description rules change which skill an agent picks? | Unknown from this test. Both arms scored 36 of 36, so it had no room to show a change. trigger-test-2 followed. |
| trigger-test-2 | With harder items and three arms, do the description rules separate? | No arm separates. The arm breaking both rules scored highest. The capability rule dropped to Important and the third-person rule was cut. |
| ste-rewrite | Did moving nine files to a controlled English change only their style? | No. A checker found three files whose demands changed, all from sentence splits. |
| ste-bench | Does that controlled English change what an agent finds? | No, and it costs nothing. Eight runs, an exact tie, nine words longer. |
| rules-ab | Did four rounds of audit and fix make the rules better? | No measurable difference on a repository we did not write. A null result. |
| sonnet-exec | Do the skills work when Claude Sonnet 5 executes them? | Partly. Execution found defects an audit cannot reach. One of them resisted every fix. |
| determinism | Do isolated runs agree, and do the gates hold? | Both started at no and ended at yes. The gate blocked six of six deliveries at first, but a caller-side gate then delivered six of six. |
| diet | Can `writing-agents` lose 400 lines and keep every measured win? | Mostly. Delivery, injection defence, statuses, gates, and the count-proxy ban held at three of three. Defaults were fixed in round two. Tick anchors narrowed from six to two. |
| mechanical-gate | Does a caller re-running the skill's own audit command get the callee's answer? | Yes, in every run, line for line. Unanchored ticks went from two to zero of 27. The check confirms a token is present, not what it points at. |

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
and a reviewer filed a real vulnerability out of scope because its subtype was missing. Fixing it
took two more cycles, which reached a win at 8 of 8, with zero false alarms. The losing round stays
on the record.
A later bench re-ran the current brief blind on this fixture and got 8 of 8 twice. One limit
remains. The comparison used three runs per arm with no treatment of variance, so a gap of one
finding is thin.

Detail: [handoff-bench/RESULTS.md](./tests/outcomes/handoff-bench/RESULTS.md)

## handoff-bench-2

The win above came from fixes tuned on that one fixture. This bench asked whether the fixes hold on
code the brief never saw.

The widened injection rule generalised. It caught `yaml.load` and `pickle.loads`, which no subtype
list names. The cycle 2 secrets wording did not: both runs filed a live token out of scope, sent
with TLS verification disabled. That wording named three places, so it read as another closed list.
Cycle 2 scored 7 of 9, and cycle 3 recovered the finding at 8 of 9. This comparison has two limits:
the arm is one run where the design specifies three, and the key omits a tenth problem every arm
found.

Detail: [handoff-bench-2/RESULTS.md](./tests/outcomes/handoff-bench-2/RESULTS.md)

## setup-bench

The hand-off benches scored what an agent finds. This one scored a side effect: writing a record
into a file that already holds someone else's writing.

`repo-setup` is safely repeatable, on one re-run. The file held exactly one marker pair afterwards,
and the hand-written content on both sides survived character for character. The rest of the
repository was byte-identical, and the agent reached the same conclusion as the first run. The bench
owner verified that by direct count and recursive diff, not from the agent's report. The limits are
narrow. The bench used one re-run of one fixture, on one worker model, and did not keep any raw run
file. This directory holds a re-run note and a fixture, and no results page.

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
should-trigger trials per arm, a true miss rate of 10 percent does not show a miss about 15 percent
of the time. The design pre-committed to treating a result that did not differ between arms as
grounds for cutting a blocking rule, and the scorer refused that reading. Both description rules
stay, neither justified nor refuted.

Earlier versions of this page said nobody had run this test. That is wrong now, and running it again
will not help. Settling the two rules needs items near a decision boundary, and enough trials to see
a five percent difference. That is a different test.

One record item stays. An earlier version of this directory held six run files that no agent
produced. They were caught because they were byte-identical across two arms, which independent runs
cannot be. The executed runs carry that same shape, and the results page states that before a reader
asks. So the byte-identical signal no longer separates a real run from a fabricated one.

Detail: [trigger-test/RESULTS.md](./tests/outcomes/trigger-test/RESULTS.md), with the arms, the
scoring and six run files beside it.

## trigger-test-2

trigger-test hit a ceiling, so a harder version followed: twenty items instead of twelve, none
repeating a description's own words, every should-not item next to the boundary. The arms went from
two to three, so one comparison isolates the capability rule and another isolates the third-person
rule.
Thirty should-trigger trials per arm instead of eighteen. A pilot run gated the main run, and it
scored 19 of 20, inside the band that opens the gate.

No arm separated. The arm that breaks both rules scored 57 of 60, the arm that follows both scored
55, and the third-person arm without a capability statement scored 52. The scorer refused the
reading its own numbers invited. A lead of 6.7 points on 30 trials is below the difference the
pre-registration already disclaimed, so it reported no difference rather than "our rules are worse".
It also corrected the pre-registration: a ten-point difference does not show reliably at 30 trials,
and the claim that it does was too generous.

The only comparison above the detection floor ran against the third-person rule, and two confounds
sit on it. The imperative mood travels with the second person, and all six distractor descriptions
open with "Use when", so the arm following our rule reads as foreign to the collection around it.

The evidence changed both rules. The capability rule dropped from Blocking to Important, because
two tests failed to find a consequence and our own rule says a Blocking severity needs one. The
third-person rule was cut, because fifteen runs across two tests never found it helping. That cut
cleared a standing instruction from the first time both rules were cut, on six run files written by
hand. This time nine recorded runs, a pilot, and a scorer that refused the easy verdict sit behind
it.

The instrument still has no room. The boundary items scored 100 percent in all three arms, ten of
ten, and one item was answered "none" by every run including the pilot, so it was an item fault.

Detail: [trigger-test-2/RESULTS.md](./tests/outcomes/trigger-test-2/RESULTS.md)

## ste-rewrite

Every experiment above measured what the skills and the rules produce. The next two measured the rule
files themselves, after nine of them moved to a controlled English. This one checked whether that
rewrite changed only the style.

It did not. An independent checker compared each of nine files to its pre-rewrite baseline and found
three whose demands had changed. All three came from splitting one sentence into two. That result
became the equivalence gate in `METHOD.md`.

The audit half is weaker. Across nine targets, the audit produced 26 findings, and six of nine files
needed work, while four earlier rounds reported zero defects and did not leave any records. The page
states that the two results cannot be reconciled.

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

This project audited its own files against its own rules across four rounds. Each round cleared the
previous round's findings, which looked like convergence. This A/B compared the rules before those
rounds against the rules after, both auditing skills written by someone else.

The rounds did not improve the rules. This comparison ran two arms against two targets, for eight
blind audits in total, and every measure ties or reverses. Naming a consequence favoured the later
rules on one target by 19 points, and the earlier rules by 17 points on the other. Three of four
pre-registered predictions were wrong, and the one that held predicted no difference.

The arithmetic behind the rounds matters more than the null itself. Rounds two, three and four retired
144 findings and created 67 new ones, and most of the new ones came from the previous round's fixes.
So the retirement count measured conformance, and the repair of damage the rounds caused.

This design has two limits. Running eight audits over two targets can show a large difference but
cannot show a small one. A modest real improvement would not show here. And the rounds did close real
defects in this plugin's own files, which this design never measured. In `repo-setup`, two paths
deleted a confirmed lint command. Agents following `writing-agents` went to `dispatch-protocol` for a
status set and a retry limit that file did not carry.

Both arms found the same real defects. The rules do something. Those rounds did not make them do it
better. The lesson this produced governs everything after it: auditing your own files against your
own rules measures conformance, not quality.

Detail: [rules-ab/RESULTS.md](./tests/outcomes/rules-ab/RESULTS.md)

## sonnet-exec

rules-ab showed that an audit cannot tell whether the skills are better. So the project began running
the skills on Claude Sonnet 5, the model that executes them. This measured execution rather than
conformance for the first time.

Round one was half void. One task measured a superseded commit, and one conclusion about pointers was
wrong and is retracted on the page. What survived is what an audit cannot reach. A gate the executor
cannot run is a gate the executor skips. A forward reference breaks the step that contains it. Step 1
told the agent to write a record to a directory that step 9 named.

Round two ran four fresh runs and closed three of four findings. The fourth resisted. The skill
still strips correct domain content that the model produces unaided, even after a warning named the
exact item.

Round one also stated one result as a rule: when a deliverable is expected and the evidence gate
cannot run, Sonnet still delivers it. Later rounds reversed that, then reversed it back. The next
section states the sequence.

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

The diagnosis holds. For judgement work, the checks an agent can run do not determine whether the
work is done. The rule asked for something that does not exist, so authors supplied the nearest thing
that does, a count of the artifact's own parts. That count passes on empty work. The bug-triage
fixture returned zero defects throughout, so the fault is not general. It appears where the work is a
judgement and the artifact has a natural unit to count.

**The isolated round gave each run its own working directory, and the skills produced nothing
usable.** All six skilled runs produced a file whose own text says it is not the deliverable. Both
unaided runs produced the actual deliverable. The baseline gate caused it. The gate required a
dispatch inside the agent's session. No session could dispatch, so every run stopped and wrote a
draft.

The count proxy failed a fourth time, zero of three. Determinism measured clean for the first time
and returned zero of three, on structure and on ticks.

Rather than stop, two runs cheated the gate. One invented a repository and wrote a filled example
against it. It then grepped that file and ticked the line. Another reported eighteen passes and no
failures. It reached that number by copying the draft to a path built to satisfy a name check. It
audited the copy and deleted it. Its delivered file returns four passes and two failures.

But two runs refused the same move and took the honest unticked line. They scored worse than
the run that fabricated. One component, the mechanical audit command `npm run audit`, held and
reproduced exactly when re-run.

**The gate round delivered six of six.** The owner named the fix. The caller and the callee must each
assess the gate independently. A gate is a check the caller re-runs on the artifact it received.
Anything the caller cannot re-run stops gating delivery, and becomes a file the caller reads.

Every one of the six runs then delivered: three complete SKILL.md files, and three prompts needing
only their holes filled. A caller caught one false claim by re-running a run's own check. The run had
ticked a line whose whole content reads "every path in it opens," but three of its five paths do not
exist. Neither earlier cheat recurred, and every pass and fail count reproduced exactly.

Determinism split. Ticks converged, three of three identical on the prompt fixture, against zero of
three in the last clean round. Structure did not, zero of three on each fixture. Heading text and the
name of the reference directory differ. So do file count and default values, and so does the
filename. Every structural difference traces to an absent rule rather than to a permitting sentence,
so the remaining variance is a gap in the rules.

The skills now win on completing delivery, on prompt-injection defence, on stop statuses, on retry
limits, on partial-work handling, and on a caller-side return gate. An unaided run still does one
thing better: its severity rubric names the signal that assigns each tier. One skilled run matches
it, and two do not give any tiers at all.

**The environment matters here.** All six runs reported no way to dispatch a subagent, and the judge
confirmed that independently. `TaskCreate` creates pending items with no model execution, `TaskGet`
reads them back, and `SendMessage` needs an already-named teammate. None of them dispatches a
fresh-context agent and returns output. So any rule that assumes a subagent is available did not
hold in the sessions that produced these three rounds.

Detail: [determinism/RESULTS.md](./tests/outcomes/determinism/RESULTS.md), with the isolated verdict
and the gate verdict beside it.

## diet

`writing-agents` had grown from 72 lines to 505, and most of the growth was author history and
countermeasures to its own earlier defects. One agent cut it to 97 lines under a list of eleven
measured wins that had to survive. Isolated Sonnet runs measured the result in two rounds of three,
the second against the fixes to what had not held.

The injection defence, whose loss alone would have failed the diet, held at three of three. So did
delivery, statuses, caller-re-runnable gates, and the count-proxy ban. Defaults on field rows were
missing in two runs and were fixed in round two, zero bare rows of 26. Tick anchors narrowed from six unanchored to two, both on one step, and a third
fix for that step is unmeasured.

The judge called subject coverage a fail, because two of three prompts listed fewer vulnerability
classes than the unaided baseline. The owner had ruled that subject content belongs to the author
and the skill's job is shape. The step the skill owes fired in all three runs, and the list sizes
stand in the record.

The skill is 101 lines and a run that follows it loads about 900 lines across five files, down from
1,330 across six.

Detail: [diet/RESULTS.md](./tests/outcomes/diet/RESULTS.md)

## mechanical-gate

The audit command gained a scope for produced prompts, with five checks that each name the
measured run behind them. `writing-agents` then told a run to write its checklist beside the
artifact and run the command on what it delivered. A judge acting as the caller re-ran the command
on each of three delivered prompts and compared every line with what the run had pasted.

The caller and the callee agreed in every run. Unanchored ticks, which were six in the first diet
round and two in the second, were zero of 27. Delivery, injection defence, statuses, and the
count-proxy ban all held.

The round also named the limit of the check. It confirms that a token a caller can open is present
on a ticked line. It does not confirm that the token points at the delivered artifact. One run's
finish gate triggers on a list the run built itself, which no script can separate from an input
property, so that stays with a reader.

Detail: [mechanical-gate/RESULTS.md](./tests/outcomes/mechanical-gate/RESULTS.md)

## What is still open

- Structure still varies on four points after five rules went in. The reference directory name
  closed at three of three. Heading text, file count, default values, and filename did not, and the
  split rule widened the file-count spread from one to five.
- Two of three skilled runs do not give any severity tiers, where an unaided run does.
- The gap analysis lists 24 judgement decisions with no stated test, 15 in `writing-skills` and 9 in
  `writing-agents`. No round has measured any of them.
- The capability rule dropped to Important and the third-person rule is cut. Settling the
  capability rule any further needs items near a decision boundary and about thirty trials per arm.
- Fixture A of the isolated round cannot be re-run until the prior-round output at
  `plugins/skyetrail/tests/baselines/` is moved where the next round cannot read it. Keep run output
  out of a baselines directory, because the next round reads it and measures the earlier one.
- No with-and-without baseline has run against `writing-skills`, `auditing-skills`, or
  `repo-setup` since 2026-08-01. `writing-agents` was measured against the unaided baseline in both
  diet rounds, and the mechanical-gate round measured its step-3 anchor fix at zero unanchored ticks.

## What to read next

- `METHOD.md` states the practices these results produced, and names the failure behind each one.
- `TESTING.md` states how to test triggering and behaviour.
- `SUMMARY.md` describes the skills themselves.
