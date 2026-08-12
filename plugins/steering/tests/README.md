# Tests

Two kinds of record live here.

- `baselines/` — one file per skill this plugin maintains. A Blocking rule in `auditing-skills`
  requires them, so nothing in this directory may be removed.
- `TEST_REPORT.md` — the report `SUMMARY.md` links to.
- `outcomes/` — one directory per experiment. Each holds its pre-registration or design, its
  results page, its fixtures and prompts, and its raw runs.

## What survives

Everything that carries evidence. Specifically, and in every experiment directory:

- **Pre-registrations and designs.** `KEY.md`, `SCORING.md`, `DESIGN.md`, `PREREGISTRATION.md`,
  `chosen-design.md`. Each one proves a prediction was written before the result. That ordering is
  the discipline this project runs on, so none of these are ever removed.
- **Results pages.** `RESULTS.md`, `AUDIT-ROUND.md`, `EQUIVALENCE.md`, `RERUN.md`, `COMPARISON.md`.
- **Fixtures and prompts.** The seeded source both arms read, and the exact prompt text each arm
  ran. Several are consumed by later experiments: `handoff-bench` fixture 1 and
  `handoff-bench-2` fixture 2 are both reused by `ste-bench`, and `ste-bench` keeps no copy of its
  own Arm A prompt.
- **Raw runs.** The agent output beneath each results page. A results page reports counts; the runs
  are the only place a count can be re-checked, an absence claim settled, or a quoted line found.
  `ste-bench/RESULTS.md` records what happens when summaries stand in for raw output, and
  `METHOD.md` section 17 exists because run files were once written by hand and then analysed as
  measurements.
- **Unblinding keys.** `BLIND-MAP.txt`, `ARM-MAP.txt`, `PAIR-MAP.txt`, `SOURCE-SHA.txt`. Without
  these the blinded and neutrally-named files cannot be assigned to arms, and the result tables
  cannot be reproduced.
- **Corrections.** `audits/CORRECTIONS.md` and the retractions recorded in place. A result that was
  wrong once is kept with its correction attached rather than quietly restated.

## What was removed

Ten files, all of them raw records whose findings had already been extracted into a results page,
and none of them cited from outside this directory.

| File | Why |
| --- | --- |
| `outcomes/external-probe/audits/using-git-worktrees.md` | Hand-written condensation of `audits/reports/using-git-worktrees.md`. Its finding is `RESULTS.md` fix item 1. |
| `outcomes/external-probe/audits/writing-plans.md` | Hand-written condensation. Its finding, the invented `AGENTS.md` block, is `RESULTS.md` Measure 3 in full. |
| `outcomes/external-probe/audits/receiving-code-review-A.md` | Hand-written condensation. Both findings are `RESULTS.md` Measure 4. |
| `outcomes/external-probe/audits/finishing-a-development-branch-B.md` | Hand-written condensation. Its one unextracted item, the auditor declining to fire the retry-limit rule, was lifted into `RESULTS.md` Measure 1 before deletion. |
| `outcomes/external-probe/audits/finishing-a-development-branch-agreement.md` | Its coverage-versus-contradiction point is `RESULTS.md` Measure 2. Its per-audit counting correction was lifted into Measure 1 with the file above, and the two were cut together because that correction only answered a claim in it. |
| `outcomes/ste-bench/runs/PILOT-armB-v1-f1-r1.md` | Ran against the rewrite the equivalence gate rejected. Explicitly unscored, and a hand-written summary rather than raw output. |
| `outcomes/ste-bench/runs/PILOT-armB-v1-f1-r2.md` | Same. |
| `outcomes/ste-bench/runs/PILOT-armB-v1-f2-r1.md` | Same. |
| `outcomes/ste-bench/runs/PILOT-armB-v1-f2-r2.md` | Same. |
| `outcomes/handoff-bench-2/prompts/old-prompt.md` | Byte-identical to `outcomes/handoff-bench/prompts/old-prompt.md`, verified by diff. The text survives there. |

The four `PILOT` runs went rather than the prompt they ran. `ste-bench/prompts/ste-prompt.md` and
`ste-prompt-fixture2.md` stay, because diffing them against version 2 is what keeps
`EQUIVALENCE.md`'s three-row verdict checkable. The runs only showed that the rejected rewrite ran.

Nothing was removed from `outcomes/sonnet-exec/`, `outcomes/ste-rewrite/`, `outcomes/rules-ab/`,
`outcomes/skills-bench/`, `outcomes/handoff-bench/`, `outcomes/setup-bench/`, or
`outcomes/trigger-test/`.

## Where the removed files still live

Commit `b4bc3c5`, the commit before the deletion. Every file was
removed with `git rm`, so all 103 are in history and none of the reasoning above is lost. To read
one:

```
git show b4bc3c5:plugins/steering/tests/outcomes/external-probe/audits/CORRECTIONS.md
```

## Citations changed by the removal

- `outcomes/ste-bench/EQUIVALENCE.md` and `outcomes/ste-bench/RESULTS.md` both said the four pilot
  runs were kept. Both now say they were deleted and point at the version 1 prompts that remain.
- `outcomes/external-probe/RESULTS.md` gained the retry-limit observation and the per-audit
  counting rule, which were the last two things only the deleted files carried.
- `outcomes/handoff-bench-2/SCORING.md` gained a section naming where each arm's prompt lives,
  because the old-arm prompt is now only in `handoff-bench`.
