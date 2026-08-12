# Baseline record: bug-report-triage

Plugin: `plugins/skyetrail`. Skill directory (not yet created): `plugins/skyetrail/skills/bug-report-triage/`.

Small changes since the last full loop: 0

## Case

New skill. No skill in this repository covers bug-report triage. Every step of the
`writing-skills` workflow applies.

## Artifact test

Run against `../../../steering/shared/authoring.md`.

```
Artifact test

1 script   You can write down the command or the regex that
           returns the answer, and running it needs no judgement.  no
2 answer   The guidance serves one occasion, and the only reader
           is the person in this conversation.                     no
3 prompt   The agent that needs the guidance will not hold this
           conversation.                                           no
4 skill    The agent that needs the guidance holds this
           conversation.                                           yes

Class: skill
Deciding test: 4
```

Test 1 is no: deciding duplicate against real defect against support question against
unreproducible takes judgement about the report's content; no regex or fixed command returns
that answer.

Test 2 is no: the team wants every incoming report triaged the same way every time. That is
indefinite future occasions, not the one occasion of this conversation, and the reader is
whichever team member's agent handles the next report, not the person who asked for this.

Test 3 is no, test 4 is yes: the guidance is meant to be discovered and loaded, by description
match, by whichever Claude Code session handles the next incoming report — the same kind of
skill-loading conversational agent holding this one. It is not a fixed block of instructions
handed once to a single dispatched subagent with no discovery step, which is what a prompt would
be.

## Objective

Word for word, from the person:

> Read /Users/pete/workspace/skyetrail-agents/plugins/steering/skills/writing-skills/SKILL.md and
> follow it exactly as written, including every file it points you at.
>
> Capture this as a reusable Agent Skill: a team wants every incoming bug report triaged the same
> way every time. Triage means deciding whether the report is a duplicate, a real defect, a
> support question, or unreproducible, and then doing the right thing for each. Produce a
> SKILL.md.
>
> Where the skill gives you a checklist, copy it into your reply and tick as you go. Where a step
> cannot run, say so and follow what the skill says to do about that. Do not silently continue.

## Where the run stopped

Step 3 (baseline with no skill loaded) needs a task: a concrete incoming bug report, or the
team's tracker fields and duplicate-search tooling, to hand to an unaided subagent. The person
named none. `writing-skills` step 3 says: "Where they named no task, ask for one. Do not invent
one, because a task you chose measures the skill against your own reading of the request." No
bug report, ticket, or tracker description exists anywhere in this vault or in the
`skyetrail-agents` workspace to draw a real task from instead.

The run stops here and asks. Steps 4 and 8 read the step-3 output; step 7 addresses step 4's
numbered misses; step 10 re-runs the same task with the skill loaded and grades it against step
4's misses; the Evidence rule in `shared/skill-rules.md` makes that comparison a blocking
requirement for any finished skill. None of the six can run without step 3.

No SKILL.md was written. Writing one now, on a body drafted from general knowledge with no
measured baseline, is the exact failure `writing-skills` names first under "What has already
failed": a run that hits a blocked evidence step and delivers a finished file anyway, whose own
gate then forbids keeping it.
