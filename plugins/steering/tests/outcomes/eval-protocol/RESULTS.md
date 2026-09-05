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
`writing-skills` run that starts three children of its own. The results:

The runner ran as a dispatched agent with one trial per case, seven executors on Sonnet. Five
returned. Two never returned: each stalled where the skill's own audit step dispatched a helper
three levels down, and that helper hung on a shell command until the session's usage limit ended
the wait. I filled the two missing status rows from the status blocks the executors had relayed,
dispatched the judge from the session, and re-scored after the script fixes below. The page is at
`tests/evals/writing-skills/2026-09-04-15-07-55/RESULTS.md`.

| Condition | Result |
| --- | --- |
| trigger | 7 of 7 cases at 3 of 3, the decline case included after fix 1 |
| completion | 5 of 7 returned, all `DONE_WITH_CONCERNS` against an expected `DONE`; 1 to 8 unticked lines per record |
| check | 6 of 6 cases with output exited 0; the question case exited 1, see fix 4 |
| judge | 6 of 7 passed; the fail was the question case, which had no output to judge |
| economy | not measured; the hook writes only when the session runs inside this repository, and this one ran from the vault |
| static load | 253 lines across 2 files |
| status | `BLOCKED`, because two trials have no status |

The run found four defects, all in the protocol or the eval, none in the skill:

1. The trigger score for a `trigger: none` case demanded the answer "none", while the classifier
   named `auditing-skills`, which is the right answer for an audit request. The case scored 0 of 3.
   A `trigger: none` case now passes when the classifier names another skill or none.
2. Completion failed on any unticked line, while the skills say to leave a line unticked with a
   reason. Completion now reports the count beside the status and does not fail on it.
3. The executor prompt forbade reading anything outside the run directory except the skill. Steps
   10 and 11 of `writing-skills`, the audit and the lint commands, were blocked in every returned
   run, which is the `DONE_WITH_CONCERNS` on all five. The prompt now names the repository that
   holds the skill and lets the executor run the commands the skill names there.
4. The question case's check searched `out/` for the question, and a run that stops at the
   artifact test writes nothing there. The check now reads `executor.json`, where the runner stores
   the returned status block, and the case carries no judgement.

`eval-runner` now says to run in the session, not as a dispatched agent, when the skill under test
dispatches children of its own. The next step is a three-trial run from a session inside this
repository, so the hook logs economy.


## What the round did not measure

Economy, on either skill: the hook is configured in this repository and this session ran from
another. Copilot: the adapter is written to the documented event shapes and has not run.
