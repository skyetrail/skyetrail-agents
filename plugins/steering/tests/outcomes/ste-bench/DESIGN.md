# Does Simplified Technical English make better steering?

Designed, not run. There is no result here.

Written in the current house style, not in STE, on purpose. Changing the style of this document
before the test would prejudge the thing being tested.

## The refined goal

The goal was: produce skills and hand-off prompts that get the best behaviour out of current
Anthropic models. That is unchanged, and one thing has been added to it.

A skill is written by a model and maintained by a person. Pete's judgement, and the reason for this
test, is that Opus 5 prose is hard for a person to read, and that every skill this project produces
inherits that fault. So readability is not a nicety sitting beside the goal. It is half of it. A
skill nobody can maintain decays whatever it does on the day it ships.

ASD-STE100 is a controlled English standard from aerospace, built so that a reader cannot misread an
instruction. It is a candidate fix, and it is the first candidate we have that was written by people
outside this project for a problem older than this project.

## Three claims, and their status

1. **Opus 5 prose is hard for a person to read.** Settled by the person who reads it. No test.
2. **STE in a skill file changes what an agent does.** Unknown. Tested below.
3. **STE in a skill file makes maintenance easier.** Follows from 1, because people do the
   maintenance. No separate test.

Only claim 2 is open, and it is open in both directions: STE could help, and four of its rules could
hurt.

## The test for claim 2

The fixtures and answer keys already exist, from the hand-off benches. This needs no new key.

- **Arm A.** The security review prompt as it stands.
- **Arm B.** The same prompt rewritten in STE, content unchanged.

Three runs per arm against `handoff-bench` fixture 1 and `handoff-bench-2` fixture 2. Score against
the existing keys: problems found, false alarms. The numbers are directly comparable to every round
already recorded, which is the reason for reusing these fixtures rather than building a new one.

## Controlling the confound

An STE rewrite tends to clarify, and clarity is a content change. A content change would corrupt the
result, and it would corrupt it in the flattering direction.

Before any run, a separate agent reads both versions of each passage and answers one question: do
these demand the same thing of a reader? Any passage where the answer is no gets rewritten or
dropped. That agent never sees the fixtures or the keys.

## Four STE rules that may make steering worse

Each is a prediction about a specific failure, written before the run so it can be wrong.

**The fixed verb list.** STE says use one verb per action, and gives a list: check, not verify or
confirm or validate or inspect. This plugin uses three of those words for three different
operations. A lint is a script. An audit is a judgement pass by an agent. A check is either. Collapse
them and an instruction that says "check the target" no longer says which one to run.

Predicted failure: a run treats a hand-audit as satisfying a step that names the lint, or the
reverse.

**The sentence limit.** STE caps a sentence at 20 words in an instruction. Our strongest rule is a
membership test, and a membership test is naturally long: "Injection is any place input that was not
checked or escaped is built into something another system interprets" runs to 21 words before the
examples start. Splitting it puts the test in one sentence and the boundary in another.

Predicted failure: a category split across two sentences reads as closed again, and a run files a
real finding out of scope. This is the exact failure the membership rule exists to prevent, and it is
the most costly one to reintroduce.

**One instruction per sentence.** Several of our rules carry three conditions joined by "or". Split
them and the disjunction can become a sequence, which reads as three separate tests rather than one
test with three ways to pass.

Predicted failure: a run applies only the first condition, or treats the three as needing to hold
together.

**The imperative mood.** STE says write instructions as commands. Our rule tables are not
instructions. They are assertions about a document that an auditor checks: "The description states
the capability." Rewritten as "State the capability," a rule stops being a property to test and
becomes an order to follow, which is a different thing for an auditor to hold.

Predicted failure: an auditor reads the rules as its own to-do list and reports on its own writing
rather than the target's.

## Cost

Record for each arm: line count, and token count as measured by the same method for both. Our own
rules cap a skill body at 500 lines, and every line is paid on every run that loads the file.

Prediction: STE adds 20 to 40 percent. If it adds that and moves nothing, it fails on cost alone.

## Predictions for the main result

I expect no meaningful change in problems found or false alarms.

The reason is our own record. Every gain across sixteen rounds came from scope and category work:
membership tests, shape rather than label, an explicit out-of-scope statement. None came from
sentence length or word choice. A closed list breaks a run whether the sentence is 12 words or 30.

If that prediction holds, the honest conclusion is that STE earns its place on claim 1 alone, which
is enough, and that we adopt it with the four exemptions above rather than whole.

If STE improves the scores, that is a stronger result than expected and the exemptions need
retesting one at a time.

## What would falsify the exemptions

Each exemption is a claim that a specific STE rule hurts. Each is falsifiable. Write both versions of
the four passages above, run them, and check whether the predicted failure appears. Where it does not
appear in three runs, drop the exemption and apply the rule.

An exemption we assert but never test is a preference wearing the clothes of a finding.

## A fifth risk, found by the bench and not predicted

Pete read the STE prompt and found a scope change I missed.

The current prompt says "This review does not change any file." The subject is the review. The
claim is about the task.

My rewrite said "You do not change any file." The subject is the agent. A reader can take that as a
rule for the whole session, not for this task.

That matters in a real hand-off. An agent may run this review inside a larger job that does change
files. The rewrite tells it not to.

**The rule that caused it.** STE says use the active voice and name the actor. That pushed a
description with a non-human subject into a command with the agent as subject. The scope widened
from the task to the agent.

**Why the equivalence check missed it.** The checker compared what each version demands of a
reviewer inside this task. Inside the task, the two versions agree. The difference appears outside
the task, which is where the checker was not looking.

**The fix.** Keep the subject as the review: "This review changes no file." Active voice, simple
tense, scope unchanged.

**The general rule.** Where a sentence describes the task rather than instructing the agent, keep
the task as the subject. Do not let the active-voice rule move the subject to the agent, because
that changes what the sentence is about.

This is the only one of the five risks that the bench actually produced. The other four remain
untested or withdrawn.
