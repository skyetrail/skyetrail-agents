---
name: writing-skills
description: Writes a new Agent Skill or fixes an existing one, producing a SKILL.md and its reference files. Use this whenever someone mentions writing, creating, drafting, or improving a skill or a SKILL.md, and also when they ask how to get an agent to do something the same way every time, say a skill is not triggering, or say a skill is being ignored. Use it even when the word skill is not used, if the request is about capturing a repeatable way of working.
---

# Writing skills

This skill produces a SKILL.md, any reference files it needs, and evidence that it changes
behaviour.

## First check a skill is the right artifact

- A one-off in this conversation. Say it directly. Do not write anything.
- Guidance should apply whenever a condition arises. You cannot say in advance when the condition
  will happen. The agent doing the work already has the conversation. A skill.
- A separable piece of work you want done in a fresh context. An agent prompt. Use
  `writing-agents`.
- A constraint a script or a regex could enforce. Automate it. Do not document it.

These are the common cases, not the whole list. The question behind them is what has to hold the
guidance. The answer is the conversation, a file the agent loads when a condition arises, a
prompt sent to a fresh context, or a script. Where a request fits none of them, say which of the
four it is closest to. Say why. Ask before you write anything. Do not force it into the nearest
bullet.

## Where this stops

This skill does not audit a skill without changing it. That is the job of `auditing-skills`. This
skill does not write prompts for subagents. That is the job of `writing-agents`. This skill does
not judge writing style. A direct instruction from the person overrides this skill.

## Workflow

Run these steps in order. Do step 1 before you write anything else. Step 1 decides what the skill
has to say.

1. **Baseline.** Pick a realistic task that the skill should help with. Dispatch a subagent with
   no skill loaded. Tell the subagent to work from its own knowledge. Tell it not to invoke any
   installed skill. A skill that covers the task would stand in for the model and spoil the
   measurement. Record what it did. Record where it went wrong. Record the reasoning it gave, in
   its own words. Where the subagent reaches for an installed skill anyway, record that too. This
   means an existing skill already covers this ground.
2. **Write the description.** This is the trigger and the most common point of failure. Write it
   against every rule in the Discovery table of `../../shared/skill-rules.md`. Open that file and
   work down the table. Summarising the workflow is the usual mistake, because a summary gives the
   agent something to follow instead of the body.
3. **Write the body.** Order the sections the way `../../shared/steering-rules.md` orders its own.
   That file lists them in order, and a second copy of the list here would drift from it. Write the
   body against every rule in that file, and against the Boundary and Content tables of
   `../../shared/skill-rules.md`. Open both and work down them. Do not add a section that restates
   the description. The description loads before the body, so a repeat spends context twice.
4. **Address only the failures from step 1.** Do not address anything the model already gets
   right. For each failure, describe the shape it takes in the work. Do not describe the label it
   falls under. This lets the agent recognise the case without already knowing it is there.
5. **Move detail into reference files.** The body is an overview. `../../shared/skill-rules.md`
   sets how you must arrange references.
6. **Baseline again.** Run the baseline again. Use the same task and a fresh subagent. Load the
   skill this time. Compare the result against step 1. Record the comparison in
   `tests/baselines/<skill-name>.md`, under the plugin directory that holds the skill you are
   writing. The Evidence rule in `../../shared/skill-rules.md` names that directory. Where the skill
   sits in no plugin, put the record under the skill's own directory and say in it where it went.
   Record the failures the skill addresses there too.
7. **Audit, and not by yourself.** Run the lint command named in `../../shared/lint.md`. This
   settles the mechanical limits. Then dispatch a fresh agent to audit the draft. Use
   `auditing-skills` for this. Do not audit your own draft. You know what you meant each line to
   say. So you read the intent, not the text. You will pass wording that a reader with no context
   would not pass. Where no subagent is available, audit the draft yourself. Use
   `../../shared/skill-rules.md` and `../../shared/steering-rules.md`. Say in the record that the
   audit was not independent.

## The baseline is the gate

Where behaviour is the same with and without the skill, the skill has no effect. Do not keep it.
Where the second run fails in a new way, put that failure and the agent's own reasoning into the
skill. Then run the loop again. Fix a failing baseline or audit by changing the skill. Do not fix
it by easing the task or loosening the rules. A pass earned that way measures nothing. Where the
loop does not settle after two more full runs, stop. Report what still fails. Do not run the loop
again. Keep the draft when you stop. Say in the report that the draft is unverified. Leave the
keep-or-discard call to the person.

For a small change to a skill that already has a recorded baseline, run step 7 alone. Say in the
record that you did not repeat the baseline. A change to what the skill claims to do runs the
full loop.

Where subagents are not available, run the task yourself against the skill. Say plainly in the
skill's own record that this is weaker evidence. You wrote the skill, and you also use it.

## Rules

- Use `../../shared/skill-rules.md` for a SKILL.md. It states which other rule files apply to a
  skill and under which conditions.
