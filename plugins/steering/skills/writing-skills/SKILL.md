---
name: writing-skills
description: Writes a new Agent Skill or fixes an existing one, producing a SKILL.md and its reference files. Use this whenever someone mentions writing, creating, drafting, or improving a skill or a SKILL.md, and also when they ask how to get an agent to do something the same way every time, say a skill is not triggering, or say a skill is being ignored. Use it even when the word skill is not used, if the request is about capturing a repeatable way of working.
---

# Writing skills

Produces a SKILL.md, any reference files it needs, and evidence that it changes behaviour.

## First check a skill is the right artifact

- A one-off in this conversation. Say it directly. Do not write anything.
- Guidance that should apply whenever some condition arises, where you cannot say in advance
  when that will be, and the agent doing the work will already have the conversation. A skill.
- A separable piece of work you want done in a fresh context. An agent prompt. Use
  `writing-agents`.
- A constraint a script or a regex could enforce. Automate it. Do not document it.

## Where this stops

Does not audit a skill without changing it, which is `auditing-skills`. Does not write prompts
for subagents, which is `writing-agents`. Does not judge writing style. A direct instruction from
the person wins over anything here.

## Workflow

Run these in order. Step 1 before any writing, because it decides what the skill has to say.

1. **Baseline.** Pick a realistic task the skill is meant to help with. Dispatch a subagent with
   no skill loaded, and tell it to work from its own knowledge without invoking any installed
   skill, since one that covers the task would stand in for the model and spoil the measurement.
   Record what it did, and where it went wrong, record the reasoning it gave in its own words. If
   it reaches for an installed skill anyway, record that too: it means an existing skill already
   covers this ground.
2. **Write the description.** This is the trigger and the most common point of failure. State the
   capability in the words someone looking for it would use, then the conditions that should
   trigger it, then the file types and casual phrasings people actually type. Do not summarise
   the workflow, because a summary gives the agent something to follow instead of the body.
3. **Write the body.** Open with what the skill produces. Then the workflow. Then what it does
   not cover and which skill takes over. Do not add a section that restates the description; the
   description is already loaded before the body, so a repeat spends context twice.
4. **Address only the failures from step 1.** Nothing the model already gets right. For each
   failure, describe the shape it takes in the work, not the label it falls under, so the agent
   can recognise the case without already knowing it is there.
5. **Move detail into reference files.** The body is an overview. Every reference is one hop from
   the SKILL.md and named from it.
6. **Baseline again.** Same task, fresh subagent, skill loaded. Compare against step 1, and
   record the comparison and the failures the skill addresses in the plugin's
   `tests/baselines/<skill-name>.md`.
7. **Audit, and not by yourself.** Run the lint command named in `../../shared/lint.md` for the
   mechanical limits, then dispatch a fresh agent to audit the draft using `auditing-skills`. Do
   not audit your own draft. You know what every line was meant to say, so you read the intent
   rather than the text, and you will pass wording a reader coming to it cold would not. Where no
   subagent is available, audit it yourself against `../../shared/skill-rules.md` and
   `../../shared/steering-rules.md`, and say in the record that the audit was not independent.

## The baseline is the gate

If behaviour is the same with and without the skill, the skill has no effect and should not be
kept. If the second run fails in a new way, put that failure and the agent's own reasoning into
the skill and run the loop again. Fix a failing baseline or audit by changing the skill, never by
easing the task or loosening the rules, since a pass bought that way measures nothing. If the
loop has not converged after two more full runs, stop and report what still fails rather than
iterating further. Keep the draft when you stop, say in the report that it is unverified, and
leave the keep-or-discard call to the person.

For a small change to a skill that already has a recorded baseline, run step 7 alone and say in
the record that the baseline was not repeated. A change to what the skill claims to do runs the
full loop.

Where subagents are not available, run the task yourself against the skill and say plainly in the
skill's own record that this is weaker evidence, because you wrote the skill and are also using
it.

## Rules

- `../../shared/skill-rules.md` for a SKILL.md.
- `../../shared/steering-rules.md` for anything written to steer an agent. These apply to a skill
  body too, with the condition **reused** met.
