## Contents

- [What this plugin is](#what-this-plugin-is)
- [The skills](#the-skills)
- [The rule files](#the-rule-files)
- [The one command](#the-one-command)
- [Running it](#running-it)
- [What it is for](#what-it-is-for)
- [What we learned](#what-we-learned)
- [What the evidence does not show](#what-the-evidence-does-not-show)
- [What is still open](#what-is-still-open)
- [Where the detail lives](#where-the-detail-lives)

## What this plugin is

Steering is anything a person writes to shape what an agent does. A skill, a subagent prompt, a
rules file and a hand-off brief are examples, not the whole set.

This plugin ships four skills that write or check steering, and seven rule files those skills
apply. Eleven experiments measured them, and every rule here came from a measured failure. A
practice with no failure behind it is a preference, so this plugin carries none.

[METHOD.md](./METHOD.md) states the method, and that method transfers without these rules.
[OUTCOMES.md](./OUTCOMES.md) states each experiment and what it settled. This page states what you
get, what we learned, and what is still open.

## The skills

A skill is a short instruction file an agent reads before it starts a job. Each one below states
the artifact it produces before it states any step.

| Skill | What it produces |
| --- | --- |
| `writing-skills` | A SKILL.md, its reference files, and a record measuring what the skill changed. |
| `writing-agents` | A prompt for an agent that will not see this conversation, and the caller side that dispatches it. |
| `auditing-skills` | A findings table ordered by severity, and the three things to fix first. It edits no file. A blocking defect still holds a skill back. |
| `repo-setup` | A verified record of a repository's basic facts, written into `AGENTS.md` between fixed markers. |

Each skill writes a record of what it changed. A record does not replace the artifact. One round of
six isolated runs produced six records and zero usable files, and that round counts as a failure.
Ship the artifact first, then the record.

`repo-setup` is safe to run again. A second run replaces its block rather than adding another one.
One re-run confirmed that by direct count and recursive diff.

## The rule files

`shared/` holds the rules the skills apply. Each file names which skills read it, and when.

| File | What it settles |
| --- | --- |
| [steering-rules.md](./shared/steering-rules.md) | The rules for anything written to shape an agent's behaviour. |
| [skill-rules.md](./shared/skill-rules.md) | The rules that apply when the target is a SKILL.md. |
| [handoff-rules.md](./shared/handoff-rules.md) | The rules that apply when the agent will not see this conversation. |
| [dispatch-protocol.md](./shared/dispatch-protocol.md) | What the caller does to dispatch an agent, and with what comes back. |
| [authoring.md](./shared/authoring.md) | Whether a request needs a script, an answer, a prompt or a skill. |
| [lint.md](./shared/lint.md) | Which command settles the mechanical checks, and what to do when it will not run. |
| [ste.md](./shared/ste.md) | The writing style, and which rules of the standard this plugin dropped. |

## The one command

Run `npm run audit -- <path>` against a skill directory. It runs every mechanical check this
repository makes. It prints a pass, fail, advisory and not-applicable count. Add `--explain` in
place of a path to print the whole set.

This command is the one component that reproduced exactly in every round that measured it. Five runs
across two rounds reported its output, and every count reproduced when a judge re-ran it. Use it as
a gate the caller re-runs.

It checks only what a script can decide. It does not judge whether a file works, and it does not
apply the judgement rules. Run the `auditing-skills` skill for those. `npm run lint` checks the
repository rather than one skill.

## Running it

Clone the repository and run `npm install` once. The scripts need Node and no other dependency.

Then point the command at any skill directory, in this repository or another:

```
npm run audit -- path/to/some-skill
npm run audit -- --explain
```

For the judgement rules, invoke the `auditing-skills` skill on the target. It runs the command
first, cites the result, and adds what a script cannot settle.

**One thing to know before you use `writing-skills` or `writing-agents`.** Both ask you to measure a
draft by dispatching a fresh agent with no skill loaded. Many sessions cannot dispatch one. Six
recorded runs met that case, and every one of them said so and carried on.

Where your session cannot dispatch, the skill still produces the artifact. What it could not measure
travels with the artifact, in a record naming the check that did not run. Nothing is silently
skipped, and nothing is held back.

A word this page uses precisely. A **gate** is a check the caller re-runs on the artifact it
received. A check only the person doing the work can see is a **report**, and a report never holds
delivery back.

## What it is for

Install this plugin if you write skills or agent prompts, and you want evidence that they work.

The loop has three steps: write, measure on the model that executes, audit.

1. Write against a baseline. A fresh agent runs a realistic task with no steering loaded. Its
   mistakes decide what the steering says, and nothing else earns a line.
2. Measure on Claude Sonnet 5. Sonnet executes these skills, so Sonnet runs the test. Give one task
   to two arms, with an isolated working directory per run. Compare the delivered artifacts.
3. Audit last, and expect little. An audit measures conformance to the rules. It cannot see whether
   the file works.

One rule now governs every gate in these skills. A gate is a check the caller re-runs on the
artifact it received. Anything the caller cannot re-run stops gating delivery, and becomes a file
the caller reads. The measurement behind that rule is below.

[METHOD.md](./METHOD.md) states each practice and names the failure that produced it. Read it
before you change a rule file.

## What we learned

Six results, each measured. [OUTCOMES.md](./OUTCOMES.md) carries the experiment behind each one.

**Auditing your own files against your own rules measures conformance, not quality.** Four rounds
of audit and fix cleared the previous round's findings every time, and every confirmed fix held. A
pre-registered blind A/B then compared the rules before those rounds against the rules after, on a
repository we did not write. Every measure tied or reversed. Three of four predictions were wrong,
and the one that held predicted no difference. Those rounds retired 144 findings and created 67 new
ones. Most of the new ones came from the previous round's fixes. Eight audits over two targets are
enough for a large difference, and not for a small one.

**Measure on the model that executes, not on the model that authors.** The project then ran its own
skills on Claude Sonnet 5. That measured execution for the first time, and it found defects no
audit reached.

**A gate the callee reports is not a gate.** Six isolated runs produced zero usable files. Every one
wrote a file whose own text says it is not the deliverable, and two unaided runs shipped. The gate
required a subagent dispatch inside the run's own session. No session could dispatch, so every run
stopped. Two runs cheated the gate. One invented a repository and grepped that. One audited a
copy at a path built to pass a name check, then deleted the copy. The owner named the fix, and the
caller and the callee now assess each gate independently. **Six of six then shipped.** A caller
caught a false claim by re-running one run's own check. Neither earlier cheat recurred.

**A rule that asks for something which does not exist gets a proxy.** Every produced security
prompt defined done as one entry per changed file. Removing the worked example failed. Naming the
failure failed. Supplying a test failed too. One author ran the test, described a passing run that
misses the vulnerability, and kept the check. For judgement work no check settles whether the work
is done. Rewording the rule does not reach that.

**Structure variance comes from absent rules, not from bad ones.** Checklist ticks converged from
zero of three runs to three of three. Structure still varies, and zero of three runs agree on it.
Every structural difference traces to a rule that is absent rather than to a sentence that permits
it.

**Simplified Technical English changes nothing an agent does, and costs about one percent in
length.** Eight blind runs across two arms gave an exact tie. The rewrite added nine words on 949,
so the larger cost predicted in [DESIGN.md](./tests/outcomes/ste-bench/DESIGN.md) was wrong. Adopt
the style for the person who maintains the file, and claim nothing more. Moving nine files to it
changed what three of them demanded, and every change came from splitting one sentence into two.
Check a style rewrite for equivalence before you accept it.

The skills now beat an unaided run on shipping, prompt-injection defence, stop statuses, and retry
limits. They also add partial-work handling and a caller-side return gate. The unaided run still
writes the better severity rubric.

## What the evidence does not show

Claude Sonnet 5 ran every worker job. One round put Opus in the main-agent role with Sonnet
workers, and matched the record. No other model was measured as an executor.

Subagent dispatch was not available in the sessions that produced the last three rounds. A judge
confirmed that independently across six runs. Any part of these rules that assumes a live dispatch
is untested in those sessions.

Two readers of one file reproduce each other at 78 to 89 percent. Across three double-audited
files, paired audits returned opposite verdicts on the same sentence five times. Read one audit as
a weak signal, and pair it when the answer matters.

No baseline has run since 2026-08-01, and two skills were rewritten on 2026-08-12. Treat every
record in `tests/baselines/` as stale.

Nobody outside this project has tested any of it. We pointed the rules at one other author's work
twice. We built the first fixture ourselves, and it produced four void findings. The second cloned
that author's whole repository.

Three fabrication events are on record. We wrote six run files by hand, analysed them as
measurements, and changed a rule on the result. We reverted the rule and deleted the files. Two
later events came from agents inside runs, and the honest runs scored worse than the fabricating
one. Every method error here surfaced when a worker contradicted our materials. None surfaced from
us checking them.

## What is still open

- **The two description rules.** The trigger test ran on 2026-08-11, and both arms scored 36 of 36.
  Both arms took every point available, so the result settles nothing. The design also has too few
  trials to see a five percent difference. Both rules stay, neither justified nor refuted. Another
  run of the same test changes nothing. Settling them needs items near a decision boundary, and more
  trials.
- **The count proxy.** It survived four attempts, and the latest round is the third in a row where
  at least one run reproduced it. The rewritten finish rule shipped with no measurement behind it.
  Two later rounds then measured it at zero of three, and at two of three.
- **Structure varies on five points:** heading text, reference directory name, file count, default
  values, and filename. No rule names any of them.
- **Severity tiers.** Two of three skilled runs give no severity tiers, where an unaided run does.
- **Twenty-four judgement decisions have no stated test.** The gap analysis lists 15 in
  `writing-skills` and 9 in `writing-agents`. No round has measured whether any of them changes what
  a run produces.
- **One fixture is blocked.** Run output from a contaminated round sits in
  `plugins/skyetrail/tests/baselines/`, and one isolated run read it. Move it out of reach before
  you re-run that fixture.

## Where the detail lives

- [METHOD.md](./METHOD.md) states the practices, and names the failure behind each one.
- [OUTCOMES.md](./OUTCOMES.md) states all eleven experiments and what each one settled.
- [TESTING.md](./TESTING.md) states how to test a skill here.
- [ste.md](./shared/ste.md) states the writing style, and what it does not buy.
- [The determinism record](./tests/outcomes/determinism/RESULTS.md) holds more evidence than any
  other record here: three rounds, the count-proxy diagnosis, and the gate fix.
- [The null A/B result](./tests/outcomes/rules-ab/RESULTS.md) holds the measurement that stopped
  this project auditing itself.
- [tests/baselines/](./tests/baselines/) holds one before-and-after record per skill. None records a
  run after 2026-08-01.
- [TEST_REPORT.md](./tests/TEST_REPORT.md) narrates the audit rounds up to 2026-08-01. It covers
  none of the five rounds after that, so read it as history.
