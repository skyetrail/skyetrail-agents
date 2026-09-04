# The eval protocol, first use

The protocol landed in two parts on 2026-09-04: `shared/eval-protocol.md` with `npm run eval` and
the hooks (#24), then the `eval-runner` and `eval-author` skills. This page records the first use
of each on this plugin's own skills.

## repo-setup

`eval-author`, sourced from the skill's own sections because no misses record exists, wrote six
cases: two question-and-answer pairs, one catch, one leave-alone, one trigger-none. The dry plan and
the audit passed.

Writing it exposed two gaps in the template, both fixed before the first run: a skill may declare
a status of its own, `NEEDS_DECISION` here, so `expect_status` now accepts one; and a fixture may be
a repository, so a case marked `repo: true` has its `in/` initialised as a git repository.

**First run**, `DONE_WITH_CONCERNS`. The runner completed every step: plan, seven executors, the
trigger classifier, checks run twice, the judge, the page, and an empty `git status` on the skill.
Both concerns were the eval's. Its checks named `memory/` relative to the trial directory while the
executor may write only under `out/`, so six checks failed on a path. And the no-candidate case
expected `DONE` where both trials returned `NEEDS_DECISION` with a record the judge called correct.
The eval was fixed, and the skill's status row now says `NEEDS_DECISION` covers no candidate as
well as several. The page from this run was overwritten by the second run's, because the results
directory carried the date only; it now carries the time too.

**Second run**, `DONE`. Every case passed on every trial.

| Condition | Result |
| --- | --- |
| trigger | the classifier named `repo-setup` for every real request, three of three, and no skill for the unrelated one, three of three |
| completion | every returned status matched: `NEEDS_CONTEXT`, `DONE`, `NEEDS_DECISION` twice, `DONE`, `NEEDS_DECISION` twice |
| economy | not measured: this session runs from another repository, so the tool-call hook wrote no log |
| result | every check exited zero; the judge passed all four judged outputs |

The record at the run root has all seven of the runner's checklist lines ticked with evidence.

## writing-skills

`eval-author`, sourced from the round-eight records, wrote eight cases: four recurring misses, a
small-change case, a trigger-none case, and a question-and-answer pair for the artifact test's
`cannot tell` branch. Static load 253 lines across two files. Audit 27 pass, 0 fail. Its fixtures
are siblings of the migration, with other tables and values.

The first run is at one trial per case, an override the page reports, because each executor is a
`writing-skills` run that starts three children of its own. Results follow.

## What the round did not measure

Economy, on either skill: the hook is configured in this repository and this session ran from
another. Copilot: the adapter is written to the documented event shapes and has not run.
