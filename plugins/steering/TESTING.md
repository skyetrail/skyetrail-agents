# Testing these skills

The main instrument is an execution round. Run the skill on the model that will execute it, in a
working directory that run alone uses, against a second run that loads nothing.

An audit is the weakest instrument. Eight blind audits found no difference between the rules before
four rounds of fixing and the rules after. Six execution runs then found a gate that stopped every
delivery. Measure execution.

`OUTCOMES.md` holds the results and the numbers. `METHOD.md` holds the practice that transfers to
any project. This file holds the procedure.

## Before you design a test

These tests need Claude Code. None of them runs on claude.ai.

**No session in the last three rounds could dispatch a subagent.** Six independent runs reported it
and a judge confirmed it. `TaskCreate` writes a pending to-do item and runs no model. `TaskGet`
reads it back. `SendMessage` needs a teammate someone already named. None of them starts a
fresh-context agent and returns its output.

So never write a step that dispatches a subagent from inside a run. Start each arm as its own
session instead. A gate that needed a dispatch blocked all six deliveries on 2026-08-12.

Two commands settle mechanical checks.

- `npm run audit -- <path>` reads one file. It runs from anywhere, and the target may sit outside
  this repository.
- `npm run lint` checks the whole repository from its root. An agent scoped to one directory cannot
  bound what it reads, so that agent reports the gap instead.

## The execution round

1. Pick a task the skill claims. Write the fixture before any run.
2. Give every run its own working directory. Never share one.
3. Move any earlier output for the same task out of reach.
4. Run the task at least three times with the skill loaded, on the executing model. Run it at least
   once with nothing loaded.
5. Check the round is clean, before you read any number.
6. Re-run every check a run claims, against the artifact that run delivered.
7. Compare what the runs produced, not how it is arranged.

Measure four things.

| Measure | How to take it |
| --- | --- |
| Did it ship? | Search each artifact for `unverified`, `draft`, `do not use`, `provisional`. A file whose own text says it is not the deliverable did not ship. |
| Is each claim true? | Re-run the command the run named, on the file the caller received. Compare the counts. |
| Do the runs agree? | Compare ticks, section names, file counts and defaults. Trace each difference to the sentence that permitted it, or record that no rule covers it. |
| What went missing? | List what the unaided run names and the skilled run does not. Read unwrapped text, so a line break hides nothing. |

The fourth measure is the one an audit cannot take. The rules judge the form of a file, not its
subject matter.

Four results show what this measures. On 2026-08-12, six of six skilled runs delivered a file its own
text calls not the deliverable, against two unaided runs that delivered. Later the same day, after
the gate changed, six of six shipped. One caller re-run caught a false tick: the run claimed every path
in a file opens, and three of its five paths do not exist. One skilled prompt dropped security
headers, session fixation, type confusion, privilege escalation and two trust-boundary cases that
the unaided prompt named.

## Check the round is clean before you score

Two rounds were contaminated. Both are recorded.

**A shared scratchpad.** Six runs used one directory. Three runs of one fixture shared a record path
and a draft path, and two of them read the first run's output before they wrote. One said so.
Agreement between those runs is co-authorship, not convergence.

**Prior output readable inside the repository.** The previous round's artifacts for the same task
sat at `plugins/skyetrail/tests/baselines/`. One run chose the same two filenames, carried nine
byte-identical lines, and said it read them. The other two runs left no trace of it. That fixture
fell from three usable runs to two, and it cannot run again until those files move.

Run four checks before you score.

1. Confirm each directory holds only its own run's files. Count the files, list cross-directory
   references, and compare checksums.
2. Compare every artifact against every earlier round's output. The gate round measured 8-gram
   overlap at 0.93 to 2.45 percent.
3. Trace each overlapping span to a source. Two runs quoting one rule file is shared source, not
   contamination.
4. Chase any coincidence of filename, section name, or opening sentence. Those caught the second
   case.

Do not read byte-identical files as proof of fabrication. This project once held six hand-written
run files, caught because they matched byte for byte across two arms carrying different inputs. The
trigger test then ran for real and produced files that also match. Keep the raw runs, and check
whether one run carries per-item reasoning the others lack.

## What the caller re-run catches

A gate is a check the caller re-runs on the artifact it received. Re-run at least one claimed check
per run.

The gate round re-ran seven claims. Six reproduced exactly: three audit counts, and three checksums
with their hole counts and line numbers. The seventh failed, and that is the false tick above.

A re-run does not catch a weakened check. Both parties then run the weak check and both get a pass.
The subject rows and the coverage row in `steering-rules.md` cover that case.

## Triggering

The trigger test ran on 2026-08-11. Both arms scored 36 of 36, on every run and every request.

Do not run it again. Two perfect scores leave two readings open. Either the rules change nothing, or
the test had no room to show a change. Only the first would justify cutting a rule. With 18
should-trigger trials per arm, a true miss rate of 10 percent shows zero misses about 15 percent of
the time.

A test that settles the two description rules needs requests near a decision boundary, and enough
trials to see a five percent difference. Pre-register the power beside the prediction.

Method: build two variants that differ in one description and nothing else. Strip the answer key
from the runner prompt. Run each request at least three times, because triggering is not
deterministic. Record which skill fired, or none.
`tests/outcomes/trigger-test/ARMS.md` holds the executed arms and two declared deviations.

### A query set for this plugin's own skills

Nobody has run this set. The executed trigger test measured an external skill, not these four. The
set predates `repo-setup`, so add entries for that skill first. Phrase at least one positive per
skill in words the description does not use. A query lifted from a description tests nothing.

**Should trigger `writing-skills`**

- I want to capture how we do PR reviews so it happens the same way every time.
- Write a skill for generating our weekly ops report.
- Turn what we just did into something reusable.
- Draft a SKILL.md for the deployment checklist.
- My spreadsheet skill exists but nobody uses it, can you make it better.

**Should trigger `auditing-skills`**

- Review this SKILL.md before I ship it.
- Lint the skills in this plugin.
- Check this subagent prompt for problems.
- Sanity check these three skills against our rules.

**Should trigger `writing-agents`**

- I need to hand this refactor off to a subagent.
- Write me a prompt template for the workers.
- Fan this out across the eight transforms.
- We have a named reviewer agent, I want to compose it per call instead.

**Should trigger none of them**

- What is the difference between a skill and an MCP server?
- Fix the failing test in auth.py.
- Summarise this document.

**Genuinely ambiguous, watch what happens**

- Why is my skill not triggering?
- Improve this skill.
- Review my agent setup.

## Baselines

The baseline records are stale. No baseline has run against any skill since 2026-08-01, and
`writing-agents` and `writing-skills` both changed on 2026-08-12. The four records in
`tests/baselines/` describe earlier versions of those files. Do not cite one as current.

Method: dispatch a fresh agent with no skill loaded. Forbid it from loading any installed skill, and
record any attempt. One bare dispatch self-loaded an installed skill-authoring skill and measured
that skill instead of the model. Dispatch a second fresh agent on the same task with the skill
loaded, and compare. Where behaviour is the same either way, the skill earns nothing.

Nothing an agent loads at run time links to `tests/baselines/`. Keep it that way, and keep run
output out of it. Output written there contaminates the next round, which is the second
contamination case above.

## Outcome benches

Seed a fixture with known problems. Write the answer key before any run. Run both arms on the same
fixture with the same worker model, at least three runs each. Score problems found, problems missed,
and false alarms. The produced instruction wins only where it finds more planted problems without
raising more false alarms.

Four rules keep the scores honest.

1. The answer key never appears in any prompt.
2. Whoever scores a run is not the agent that ran it.
3. A run file carries an opaque identifier, and the mapping to its arm lives where the scorer cannot
   read it. Check the blind held before you score.
4. Keep the raw runs, not only the summary.

Stop when two consecutive cycles fail to move the scores. Spend on a new fixture before another
cycle on an old one.

| Fixture | What it is | Answer key |
| --- | --- | --- |
| `tests/outcomes/handoff-bench/fixture/` | A Node and Express service with planted defects | `handoff-bench/KEY.md` |
| `tests/outcomes/handoff-bench-2/fixture/` | A Python and Flask app, another domain, never tuned against | `handoff-bench-2/KEY.md` |
| `tests/outcomes/skills-bench/fixture/` | A release-notes task with seeded traps | `skills-bench/KEY.md` |
| `tests/outcomes/setup-bench/fixture/` | A repository whose files already hold someone else's writing | none; the check is a re-run and a diff |

Read the errata before you score against a key. `handoff-bench-2/KEY.md` and `skills-bench/KEY.md`
each carry one, and both stay uncorrected on purpose. A key edited after seeing the answers stops
being a key.

## The two audits

Two different things carry that name.

`npm run audit -- <path>` is mechanical. It reproduced exactly in every round that re-ran it, and it
is the most reliable component this project has measured. Run it and report its output.

A judgement audit reads a file against the rule files and reports findings by severity. It measures
conformance. Use it to check a file against the rules. Never use it to claim a skill got better,
because eight blind audits found no difference between two versions of those rules.

## What none of these tests covers

- Structure. Three runs of one prompt still produce three arrangements. No rule names a heading, a
  reference directory name, a file count, a default value, or a filename.
- Severity. Two of three skilled runs give no severity tiers, where the unaided run names the signal
  that assigns each tier.
- Any executor other than Claude Sonnet 5.
- Any tester outside this project.

`DECISIONS.md` records what each round changed, and what stays open.
