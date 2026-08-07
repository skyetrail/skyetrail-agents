---
name: writing-agents
description: Writes the prompt for an agent that will not see the current conversation, along with the caller side that dispatches it and handles what comes back, producing an agents/*.md definition or a prompt template. Use this whenever someone mentions handing work to a subagent, dispatching or spawning agents, writing a prompt or a template for an agent, running work in parallel across several agents, or turning a predefined named agent into something composed at the point of dispatch. Use it also when a subagent came back with nothing useful, returned a summary instead of the work, ignored half its instruction, or ran out of context. Use it even when the word agent is not used, if work is being handed to something that starts with no context.
---

# Writing agents

This skill produces two things. It produces the prompt that makes an agent for one call. It also
produces the caller side, which dispatches that prompt and acts on what returns.

## Compose at dispatch

A named agent carries one fixed instruction set to every call site. So each call gets too much
context or too little. Callers then patch it until two instructions conflict.

Compose the prompt at the moment of use instead. A checked-in template with named holes counts as
composed, because the caller holds the filled text. The difference is control at dispatch, not the
amount you reuse.

Keep a named agent where something outside the call site depends on it staying one fixed thing.
Three examples, not the whole list. Many places use it identically. The harness enforces a tool
restriction at that layer and nowhere else. Someone else owns it as a policy boundary.

You can pass tool exclusions at dispatch. So composing does not give up enforcement.

This is a preference, not a rule. Recommend it and say why. Do not refuse to work with a named
agent.

## Where this stops

This skill does not write skills. `writing-skills` does that. This skill does not audit an existing
prompt without changing it. `auditing-skills` does that. A direct instruction from the person wins
over anything here.

## Workflow

1. **Establish the facts.** Use a script for anything a script can determine. Use an agent only for
   what needs an assessment. Use neither for what you already know. Record where each fact came
   from.
2. **Write the prompt** against `../../shared/steering-rules.md` and
   `../../shared/handoff-rules.md`, with the condition **hand-off** met. Where the prompt names a
   category of work, define what makes something a member. Mark any list of kinds as examples.
   Otherwise the agent treats a kind you did not list as out of scope.
3. **Name the statuses** and the caller's obligation for each. Name the retry limit. Say what
   happens to partial work when a run stops. Take the status set from
   `../../shared/dispatch-protocol.md` and add only what this run needs.
4. **Fill every hole.** Mark each hole required, or give it a default. An unfilled hole then fails
   loudly instead of reaching the agent as empty text. Keep the set of holes fixed. Do not grow it
   per caller, because every caller pays for the weight the template gathers.
5. **Audit the filled prompt** against `../../shared/steering-rules.md` and
   `../../shared/handoff-rules.md`. Do this before you send anything.
6. **Dispatch.** Name the model explicitly. Do not let it inherit from this session, because two
   runs of the same template must stay comparable.
7. **Handle the return** per the status table. Check that the report is complete. Do not re-run
   what the agent already proved.

For work spread across several agents, pick the shape from `../../shared/dispatch-protocol.md`.
Follow what that file says about establishing facts before the workers start.

## When to stop

Stop and say what is missing where you cannot establish a fact, where a required hole has no
value, or where you cannot read a rule file. Do not dispatch anyway.

Retry a dispatch only after something has changed, and at most twice per agent. An unchanged retry
repeats the failure. After the limit, report instead.

Do not weaken a check. Do not loosen a rule. Do not fill a hole with a placeholder to force a pass.
Fix the input, or stop.

When you stop, keep the established facts and any draft prompt. Say where they sit. Leave the
keep-or-discard call to the person.

## Converting a named agent

Read the definition. Split it into what stays the same and what varies by call. The invariant part
becomes the template body. The varying part becomes named holes.

Then run workflow steps 3 to 7 above without changes. A converted agent is a composed prompt once
you reach that point, so nothing further about it is special.

Keep the set of fields the callers establish fixed and documented, the same way you keep the set of
holes.

## References

- `../../shared/steering-rules.md` for the prompt.
- `../../shared/handoff-rules.md` for the rules that apply because the agent will not see this
  conversation. Everything this skill produces is a hand-off, so this file always applies.
- `../../shared/dispatch-protocol.md` for the caller, the statuses, and the shapes of a run.
