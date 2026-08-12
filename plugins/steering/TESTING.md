# Testing these skills

How to test a skill in this plugin, and what has already been tested. `OUTCOMES.md` holds the
results and the numbers. `METHOD.md` holds the practice that applies to any project. This file
holds the tests themselves.

None of these run on claude.ai. All need Claude Code, because they need subagents.

## Four questions, in order

Run them in this order. A skill that never triggers cannot be baselined, and a skill that changes
nothing cannot be an improvement.

| Question | What it measures | State |
| --- | --- | --- |
| 1. Does the right skill fire on the right request? | Descriptions | Partly answered. See below. |
| 2. Does the skill body change what the agent does? | Baselines, with and without | Answered for each skill in `tests/baselines/` |
| 3. Is the change an improvement? | Outcome benches against an answer key | Answered for a produced hand-off. Weak for a produced skill. |
| 4. Does the skill work on the model that will run it? | Execution on the worker model | Answered once, on Sonnet 5, with one failure still open |

## Test 1: triggering

Build two variants of the plugin. The variants differ in one description and nothing else. Run the
query set below against each. Run each query at least three times, because triggering is not
deterministic. Record which skill fired, or none.

Measure three things. Trigger rate per skill on its own positives, higher being better. False
fires on the negatives, lower being better. And which skill fired on an ambiguous request, plus
whether the answer was still useful.

### What this test has settled

The redirect clauses are cut. Each description used to end by naming a sibling skill. The variant
without those clauses matched or beat the variant with them on every measure, so they were
removed. `OUTCOMES.md` carries the numbers.

### What this test has not settled

Two description rules are still unverified: stating the capability, marked Blocking, and writing
in the third person, marked Important. The design that would settle them sits at
`tests/outcomes/trigger-test/`, with its answer key. It is designed and not run.

Run it before you change either severity. An earlier attempt reported a result for this test
without running it, and the rule changes that result justified were reverted. `DECISIONS.md`
records that reversal.

### Query set

The set predates `repo-setup`, so it has no entries for that skill. Add some before the next run.
Phrase at least one positive per skill in words the description does not use. A query lifted from
a description tests nothing.

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

## Test 2: behaviour

Take one realistic task for the skill. Dispatch a subagent with no skill loaded. Record what it
did, and the reasoning it gave where it went wrong. Dispatch a fresh subagent on the same task
with the skill loaded. Compare.

Forbid the baseline agent from loading any installed skill, and record any attempt. A bare
dispatch once self-loaded an installed skill-authoring skill and measured that skill instead of
the model.

If behaviour is the same either way, the skill has no effect and should not be kept. If the second
run fails in a new way, put that failure and the agent's own words into the skill and run it
again.

Each skill has a baseline record in `tests/baselines/`, one file per skill. Nothing an agent loads
at run time links to that directory.

## Test 3: outcomes

Test 2 shows a tool changes what an agent does. Test 3 shows the change is an improvement.

Seed a fixture with a known set of problems. Write the answer key before any run. Dispatch the old
instruction and the tool-produced instruction against the same fixture, with the same worker
model, at least three runs each. Score every review against the key: problems found, problems
missed, false alarms. The produced instruction wins only if it finds more planted problems without
raising more false alarms.

For a skill rather than a hand-off, the shape is the same. One agent gets the produced skill,
another gets the plain request, on a fixture task with known traps. Score the completed work
against the key, not the wording of the output.

Four rules keep the scores honest.

1. The answer key never appears in any prompt.
2. Whoever scores a run is not the agent that ran it.
3. A run file carries an opaque identifier, and the mapping to its arm lives where the scorer
   cannot read it. Check that the blind holds before you score.
4. Keep the raw runs, not only the summary. Check that independent runs actually differ.

Stop when two consecutive cycles fail to move the scores. An agreed minimum number of cycles is a
floor, not a finish line.

Spend on a new fixture before another cycle on an old one. A saturated fixture cannot show
improvement again.

### Fixtures already built

| Fixture | What it is | Answer key |
| --- | --- | --- |
| `tests/outcomes/handoff-bench/fixture/` | A small Node and Express service with planted defects | `handoff-bench/KEY.md` |
| `tests/outcomes/handoff-bench-2/fixture/` | A Python and Flask app, another domain, never tuned against | `handoff-bench-2/KEY.md` |
| `tests/outcomes/skills-bench/fixture/` | A release-notes task with seeded traps | `skills-bench/KEY.md` |
| `tests/outcomes/setup-bench/fixture/` | A repository whose files already hold someone else's writing | none; the check is a re-run and a diff |

Read the errata in each key before you score against it. Both hand-off keys are known to be
incomplete, and they are left uncorrected on purpose. A key edited after seeing the answers stops
being a key.

## Test 4: execution

An audit against our own rules cannot tell whether a skill works. Eight blind audits found no
difference between the rules before and after four rounds of fixing. So run the skill on the model
that will actually execute it.

Give the same task to two agents on that model. One loads the skill, the other loads nothing.
Compare the finished work, not the shape of it. Check specifically whether the skill removed
correct content the unaided run produced. A rule-conformance audit cannot see that, because the
rules judge the container.

Round two of this test on Sonnet 5 closed three findings and left one open. `OUTCOMES.md` carries
it.
