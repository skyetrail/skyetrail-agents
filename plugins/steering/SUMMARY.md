## Contents

- [Scope](#scope)
- [The skills](#the-skills)
- [The rule files](#the-rule-files)
- [The one command](#the-one-command)
- [Running it](#running-it)
- [What it is for](#what-it-is-for)
- [What we learned](#what-we-learned)
- [Evidence gaps](#evidence-gaps)
- [What is still open](#what-is-still-open)
- [Further reading](#further-reading)

## Scope

Steering is anything a person writes to direct what an agent does. A skill, a subagent prompt, a
rules file and a hand-off brief are examples, not the whole set.

This plugin includes skills that write or check steering, and the rule files those skills apply.
Twenty experiments measured them, and every rule here came from a measured failure. The plugin
leaves out any practice with no failure behind it, because such a practice is a preference.

[METHOD.md](./METHOD.md) states the method, and you can use that method without these rules.
[OUTCOMES.md](./OUTCOMES.md) states each experiment and what it showed. This page states what you
get, what we learned, and what is still open.

## The skills

A skill is a short file of instructions an agent loads partway through a job, when the job needs it.
Each one below states the artifact it produces before it states any step.

| Skill | What it produces |
| --- | --- |
| `writing-skills` | A SKILL.md, its reference files, and a record measuring what the skill changed. |
| `writing-agents` | A prompt that an agent starts from as its instruction, and the caller side that dispatches it. |
| `auditing-skills` | A findings table ordered by severity, and the three things to fix first. It edits no file. A blocking defect means the skill needs work before use. |
| `repo-setup` | A checked record of a repository's basic facts, written to the project's memory as `repo-setup.md`. |
| `eval-author` | The runnable eval for a skill, `evals/eval.yaml` beside its `SKILL.md`, in one template. |
| `eval-runner` | A results page from running a skill's eval with no person in the loop, one fresh executor per case. |

Each skill writes a record of what it changed. A record does not replace the artifact. One round of
six isolated runs produced six records and zero usable files, and that round counts as a failure.
Produce the artifact first, then write the record.

`repo-setup` is safe to run again. A second run replaces what it confirms and keeps the rest. One
re-run confirmed that by direct count and recursive diff.

## The rule files

`shared/` contains the rules the skills apply. Each file names which skills read it, and when.

| File | What it covers |
| --- | --- |
| [steering-rules.md](./shared/steering-rules.md) | The rules for anything written to direct an agent's behaviour. |
| [skill-rules.md](./shared/skill-rules.md) | The rules that apply when the target is a SKILL.md. |
| [handoff-rules.md](./shared/handoff-rules.md) | The rules that apply when an agent starts from the prompt and returns its results to a caller that did not watch it work. |
| [dispatch-protocol.md](./shared/dispatch-protocol.md) | What the caller does to dispatch an agent, and with what comes back. |
| [authoring.md](./shared/authoring.md) | Whether a request needs a script, an answer, a prompt, a skill or an instruction file. |
| [lint.md](./shared/lint.md) | Which command runs the mechanical checks, and what to do when it will not run. |
| [style.md](./shared/style.md) | The Vale prose-lint check and its scope. |
| [eval-protocol.md](./shared/eval-protocol.md) | The one template for a skill's runnable eval, and how a run is scored. |
| [terms.md](./shared/terms.md) | The one meaning each house word has in every file of this plugin. |

## The one command

Run `npm run audit -- <path>` against a skill directory. It runs every mechanical check this
repository makes. It prints a pass, fail, advisory and not-applicable count. Add `--explain` in
place of a path to print the whole set.

This command is the one component that reproduced exactly in every round that measured it. Five runs
across two rounds reported its output, and every count reproduced when a judge, a separate agent
that checks the runs, re-ran it. Use it as a gate the caller re-runs.

It checks only what a script can decide. It does not judge whether a file works, and it does not
apply the judgement rules. Run the `auditing-skills` skill for those. `npm run lint` checks the
repository rather than one skill.

A second command, `npm run eval -- plan <path>`, reads a skill's `evals/eval.yaml`, refuses one that
breaks a rule of `shared/eval-protocol.md` and names the rule, and lays out one directory per case
and trial, where a trial is one run of a case. `check` and `results` follow once `eval-runner` has
dispatched the executors, the fresh agents that run the skill, one per case and trial. The
mechanical half of an eval is this script. `eval-runner` and `eval-author` do only the dispatching
and the judging.

## Running it

Clone the repository and run `npm install` once. The scripts need Node and no other dependency.

Then point the command at any skill directory, in this repository or another:

```
npm run audit -- path/to/some-skill
npm run audit -- --explain
```

For the judgement rules, invoke the `auditing-skills` skill on the target. It runs the command first
and cites the result. It then adds what a script cannot decide.

**One thing to know before you use `writing-skills` or `writing-agents`.** Both ask you to measure a
draft by dispatching a fresh agent with no skill loaded. Many sessions cannot dispatch one. Six
recorded runs met that case, and every one of them said so and carried on.

Where your session cannot dispatch, the skill still produces the artifact. It also writes a record,
delivered with the artifact, that names each check that did not run.

A word this page uses precisely. A **gate** is a check the caller re-runs on the artifact it
received, and its result sets the status the run reports. A check the caller cannot re-run is a
**claim**. In `writing-skills` and `writing-agents`, neither one holds delivery back.

## What it is for

Install this plugin if you write skills or agent prompts, and you want evidence that they work.

1. Write against a baseline. A fresh agent runs a realistic task with no steering loaded. Add
   steering only for that agent's mistakes, because the model already gets the rest right.
2. Measure on Claude Sonnet 5, because Sonnet executes these skills. Give one task to two arms, one
   set of runs with no skill loaded and one with the skill loaded, with an isolated working
   directory per run. Compare the delivered artifacts.
3. Audit last. An audit measures conformance to the rules. It cannot see whether the file works.

One rule now governs every gate in `writing-skills` and `writing-agents`. A gate is a check the
caller re-runs on the artifact it received. Its result sets the status the run reports, and the
artifact is delivered whatever that result is. Anything the caller cannot re-run is a claim, and
goes in a file the caller reads. The measurement behind that rule is below.

[METHOD.md](./METHOD.md) states each practice and names the failure that produced it. Read it before
you change a rule file.

## What we learned

Six results, each measured. [OUTCOMES.md](./OUTCOMES.md) describes the experiment behind each one.

**Auditing your own files against your own rules measures conformance, not quality.** Audit and fix,
run four rounds in a row, cleared the previous round's findings every time, and every confirmed fix
held. A pre-registered blind A/B then compared the rules before those rounds against the rules
after, on a repository we did not write. Every measure tied or reversed. Three of four predictions
were wrong, and the one that held predicted no difference. Those rounds retired 144 findings and
created 67 new ones. Most of the new ones came from the previous round's fixes. Enough statistical
power exists to show a large difference across eight audits over two targets. Seeing a small
difference would need more than that number of audits.

**Measure steering on the model that executes it, even when another model wrote it.** The project
then ran its own skills on Claude Sonnet 5. That measured execution for the first time, and it found
defects no audit reached.

**Have the caller re-run each check that sets the status, instead of relying on the dispatched
agent's report.** Isolated runs, six of them, did not produce a usable file. Every one wrote a file
whose own text says it is not the deliverable, and two unaided runs, which had no skill loaded,
delivered one. The gate required a subagent dispatch inside the run's own session. No session could
dispatch, so every run stopped. The gate was cheated twice. One invented a repository and grepped
that. One audited a copy at a path built to pass a name check, then deleted the copy. The project
owner named the fix, and the caller and the dispatched agent now assess each gate independently.
**All six then delivered a usable file.** A caller caught a false result by re-running one run's own
check. Neither earlier cheat recurred.

**When a rule asks for a check that cannot exist, the author writes the nearest check that can, such
as a count.** Every produced security prompt defined done as one entry per changed file. Removing
the worked example failed. Naming the failure failed. Supplying a test failed too. One author ran
the test, described a passing run that misses the vulnerability, and kept the check. For judgement
work, no mechanical check can decide whether the work is done, so rewording the rule does not remove
the count.

**Structure varies across runs only where no rule covers it.** Checklist ticks, the `[x]` a run
writes to mark a line done, became identical across runs, from zero of three runs to three of three.
Structure still varies, and zero of three runs agree on it. Every structural difference traces to a
rule that is absent rather than to a sentence that permits it.

**Simplified Technical English changes nothing an agent does, and costs about one percent in
length.** The result was an exact tie, across eight blind runs over two arms. The rewrite added nine
words on 949, so the larger cost predicted in [DESIGN.md](./tests/outcomes/ste-bench/DESIGN.md) was
wrong. Adopt the style only to help the person who maintains the file. Moving nine files to it
changed what three of them demanded, and every change came from splitting one sentence into two.
Check a style rewrite for equivalence before you accept it.

The skills now beat an unaided run on delivery, prompt-injection defence, statuses at stopping
points, and retry limits. They also add partial-work handling and the checks the caller re-runs. The
unaided run still writes the better severity rubric.

## Evidence gaps

Claude Sonnet 5 ran every worker job. One round put Opus in the main-agent role with Sonnet workers,
and matched the earlier results. No other model was measured as an executor.

Subagent dispatch was not available in the sessions that produced the last three rounds. A judge
confirmed that independently across six runs. Any part of these rules that assumes a live dispatch
is untested in those sessions.

Reproduction between two auditors of one file runs at 78 to 89 percent. Across three double-audited
files, paired audits returned opposite verdicts on the same sentence five times. Read one audit as a
weak signal, and pair it when the answer matters.

No baseline has run since 2026-08-01, and two skills were rewritten on 2026-08-12. Treat every file
in `tests/baselines/` as stale.

Nobody outside this project has tested any of it. We pointed the rules at one other author's work
twice. We built the first fixture ourselves, and it produced four void findings that came from the
fixture and not from that author's files. The second cloned that author's whole repository.

This project has three fabrication events. We wrote six run files by hand and analysed them as
measurements, then changed a rule on the result. We reverted the rule and deleted the files. Two
later events came from agents inside runs, and the honest runs scored worse than the fabricating
one. A worker's contradiction of our materials reported every method error here. None came from us
checking them.

## What is still open

The open items are listed once, in [OUTCOMES.md](./OUTCOMES.md) under "What is still open".

## Further reading

- [METHOD.md](./METHOD.md) states the practices, and names the failure behind each one.
- [OUTCOMES.md](./OUTCOMES.md) states all twenty experiments and what each one showed.
- [TESTING.md](./TESTING.md) states how to test a skill here.
- [style.md](./shared/style.md) names the Vale check and its scope.
- [The determinism results](./tests/outcomes/determinism/RESULTS.md) contain more evidence than any
  other results file here, spanning three rounds that produced the count-proxy diagnosis, where done
  meant one entry per changed file, and the gate fix.
- [The null A/B result](./tests/outcomes/rules-ab/RESULTS.md) contains the measurement that stopped
  this project auditing itself.
- [tests/baselines/](./tests/baselines/) contains one before-and-after file per skill. None records
  a run after 2026-08-01.
- The tests directory's [README.md](./tests/README.md) says what it keeps and where removed files
  are. It covers none of the five rounds after that, so read it as history.
