## Contents

- [What this plugin is](#what-this-plugin-is)
- [The skills](#the-skills)
- [The rule files](#the-rule-files)
- [How it was built](#how-it-was-built)
- [What the evidence shows](#what-the-evidence-shows)
- [What the evidence does not show](#what-the-evidence-does-not-show)
- [Where the detail lives](#where-the-detail-lives)

## What this plugin is

Steering is anything a person writes to shape what an agent does. A skill, a subagent prompt, a
rules file and a hand-off brief are examples, not the whole set.

This plugin ships skills that write steering, a skill that checks it, and the rule files they
apply. Everything in it came from getting something wrong first. A practice with no recorded
failure behind it is a preference, so this plugin carries none.

[METHOD.md](./METHOD.md) holds the method, and that method transfers without these rules.
[OUTCOMES.md](./OUTCOMES.md) holds the results. This page describes the skills and points at both.

## The skills

A skill is a short instruction file an agent reads before it starts a job. Each one below states
the artifact it produces before it states any step.

| Skill | What it produces |
| --- | --- |
| `writing-skills` | A SKILL.md, its reference files, and a record measuring what the skill changed. |
| `writing-agents` | A prompt for an agent that will not see this conversation, and the caller side that dispatches it. |
| `auditing-skills` | A findings table ordered by severity, and the three things to fix first. It changes nothing. |
| `repo-setup` | A verified record of a repository's basic facts, written into `AGENTS.md` between fixed markers. |

The record is as much the product as the file is. A draft carrying no record is not a skill, and
nobody installs one.

`repo-setup` is safe to run again. A second run replaces its block rather than adding another one.

## The rule files

`shared/` holds the rules the skills apply. Each file names which skills read it, and when.

| File | What it settles |
| --- | --- |
| `steering-rules.md` | The rules for anything written to shape an agent's behaviour. |
| `skill-rules.md` | The rules that apply when the target is a SKILL.md. |
| `handoff-rules.md` | The rules that apply when the agent will not see this conversation. |
| `dispatch-protocol.md` | What the caller does to dispatch an agent, and with what comes back. |
| `authoring.md` | Whether a request needs a script, an answer, a prompt or a skill. |
| `lint.md` | Which command settles the mechanical checks, and what to do when it will not run. |
| `ste.md` | The writing style, and which rules of the standard this plugin dropped. |

## How it was built

The loop has three moves: measure, write, compare.

1. Measure. A fresh agent runs a realistic task with no steering loaded. Its mistakes are the
   baseline, and they decide what the steering has to say.
2. Write. Every line costs context on every run, so the file teaches only what the baseline
   showed missing.
3. Compare. Two arms run against a fixture seeded with known problems. Scorers work blind against
   a key written before either arm ran.

An audit is a fourth move and the weakest one. It measures conformance to the rules, not whether
the file works.

[METHOD.md](./METHOD.md) states each practice and names the failure that produced it. Read it
before you change a rule file.

## What the evidence shows

[OUTCOMES.md](./OUTCOMES.md) carries every experiment, its question and its answer. Read the null
results and the failures first. They changed this project more than the wins did.

- The produced hand-off brief beats the brief it replaced. Round one was a loss. Two fix cycles
  later it found 8 of 8 with no false alarms.
- Those gains only partly held on code the brief was never tuned against. A third cycle recovered
  the finding that did not carry.
- A produced skill fixed the shape of an output. The same skill stripped correct domain content
  the model had written unaided.
- The rules find real defects in another author's skills. The finding counts are worthless,
  because every audit breached our own calibration gate.
- Four rounds of auditing our own rules made no measurable difference. Both arms found the same
  real defects, so the rules do something. The rounds did not make them do it better.
- Simplified Technical English changes nothing an agent does, and costs nothing. The length cost
  predicted in [DESIGN.md](./tests/outcomes/ste-bench/DESIGN.md) was wrong.
- Whether the two description rules change which skill an agent picks is still unknown. Nobody
  has run that test.

This plugin still writes in that controlled English. Adopt it for the person who maintains the
file, and claim nothing more. Moving nine files to it changed what three of them demanded. Every
one of those changes came from splitting one sentence into two, so gate a style rewrite on
equivalence.

## What the evidence does not show

Claude Sonnet 5 ran the worker jobs. No other model was measured as an executor, and this plugin
claims nothing about one.

Two readers of one file agree on whether it is fit for use, every time we have measured that. They
differ by up to three rows on minor calls. Read a single audit as a strong signal about fitness,
and a weak one below that.

Nobody outside this project has tested any of it. We pointed the rules at one other author's work,
once, and we built that fixture ourselves.

The worst failure here was ours. We wrote six run files by hand, analysed them as measurements,
and changed a rule on the result. We reverted the rule change and deleted the files. The incident
stays on the page, because a project about evidence that hides a fabrication is worth nothing.

Every method error surfaced when a worker contradicted our own materials. None surfaced from us
checking them.

## Where the detail lives

- [METHOD.md](./METHOD.md) states the practices, and names the failure behind each one.
- [OUTCOMES.md](./OUTCOMES.md) states every experiment and what each one settled.
- [TESTING.md](./TESTING.md) states how to test a skill here, including the test nobody has run.
- [ste.md](./shared/ste.md) states the writing style, and what it does not buy.
- [TEST_REPORT.md](./tests/TEST_REPORT.md) holds the round-by-round narrative of the audit rounds.
- [tests/baselines/](./tests/baselines/) holds one before-and-after record per skill.
