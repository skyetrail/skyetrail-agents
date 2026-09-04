# Outcomes

Every experiment this project ran, and what each one settled.

## What was under test

This plugin holds four skills. A skill is a short instruction file an agent reads before it starts
a job.

- `writing-skills` writes a new skill.
- `writing-agents` writes a brief for a second agent that starts with no memory.
- `auditing-skills` checks a skill or a brief against the written rules.
- `repo-setup` works out the basic facts about a repository and records them.

Shared rule files state the rules those skills apply. This project ran seventeen experiments, testing
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
| writing-skills-diet | Does `writing-skills` beat an unaided run, and does a 154-line diet keep what 419 lines had? | Yes on shape. Out of 27, an unaided run scored 15 and the long skill 20. The diet scored 24. Coverage cost one item. Ticks closed to 23 of 24 after the audit moved behind the checklist. |
| round-five | Does a produced skill improve a fresh review, and does `writing-agents` produce classify then route where the work needs it? | The reviews tied, because unaided Sonnet found every planted fault. Classify then route: skilled 30 of 30, unaided 15 of 30. The branch merges. |
| round-six | Does a skeleton the run copies fix structure, and does `repo-setup` on memory leave the repository alone and defer the decision? | Yes: identical headings three of three. Yes: untouched, decided, no record, because the skill wrote after deciding. Fixed after the round. |

Each row's detail is in `tests/outcomes/<name>/RESULTS.md`, beside the pre-registration or
design that fixed its question before the runs.

## What is still open

- Produced skills still vary in file count, 2 to 5, after the skeleton bound the headings three
  of three and the data sentence three of three. Default values with tests held in one of three.
- Ticks in `writing-skills` records anchored at 10 of 38 in round six under the strict rule,
  after 80 percent in round five. In r1 and r2 the record was at the run root, where the mechanical check did not look. It now looks
  there, unmeasured.
- `repo-setup` with the corrected step order, write the record then stop, is unmeasured. The
  measured version did the discovery and the restraint three of three and wrote nothing.
- Downstream gain on coverage is parked. Unaided Sonnet found every planted fault on both
  fixtures, so a with-and-without comparison on faults has no room. The skill changes the shape of a review. Measuring that needs a fixture with faults the model misses on its own,
  or a rubric for shape, and neither is planned.

## Closed or dropped on 2026-09-01

- Severity tiers: fixed by the default-with-test rule in the structure round, three of three.
- The `auditing-skills` baseline: it ran as the audit child in six real runs across rounds four
  and five, and its findings were real and were fixed. That is execution evidence.
- The Workflow-tool dispatch limit: a harness fact, recorded in METHOD and DECISIONS.
- The lock-timeout drop: by design. The domain author supplies what to look for and the skill
  supplies the shape. The subject list protects only what a run wrote down first.
- The 24 judgement decisions and the description rules: dropped. The terminology pass and the
  rounds since covered the first, and anything left shows as a failed rubric item. The second
  needs thirty trials per arm for a number nobody would act on.

## What to read next

- `METHOD.md` states the practices these results produced, and names the failure behind each one.
- `TESTING.md` states how to run a round, and `tests/README.md` says what a test directory keeps.
- `SUMMARY.md` describes the skills themselves.
