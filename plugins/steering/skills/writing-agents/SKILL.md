---
name: writing-agents
description: Writes the prompt for an agent that will not see the current conversation, along with the caller side that dispatches it and handles what comes back. Use this whenever someone mentions handing work to a subagent, dispatching or spawning agents, writing a prompt or a template for an agent, running work in parallel across several agents, or turning a predefined named agent into something composed at the point of dispatch. Use it even when the word agent is not used, if work is being handed to something that starts with no context.
---

# Writing agents

Produces the prompt that constitutes an agent for one call, and the caller side that dispatches it
and acts on what returns.

## Compose at dispatch

A named agent carries one fixed instruction set to every call site, so each call gets too much
context or too little, and callers patch it until two instructions conflict. Compose the prompt
at the moment of use instead. A checked-in template with named holes counts as composed, because
the caller holds the filled text; the difference is control at dispatch, not the amount reused.

Keep a named agent when it is used identically in many places, when the harness enforces a tool
restriction at that layer and nowhere else, or when someone else owns it as a policy boundary.
Tool exclusions can be passed at dispatch, so composing does not mean giving up enforcement.

This is a preference, not a rule. Recommend it and say why. Do not refuse to work with a named
agent.

## Where this stops

Does not write skills, which is `writing-skills`. Does not audit an existing prompt without
changing it, which is `auditing-skills`. A direct instruction from the person wins over anything
here.

## Workflow

1. **Establish the facts.** A script for anything determinable, an agent only for what needs an
   assessment, neither for what you already know. Each fact carries where it came from.
2. **Write the prompt** against `../../shared/steering-rules.md` and
   `../../shared/handoff-rules.md`, with the condition **hand-off** met. Where the prompt names a
   category of work, define what makes something a member and mark any list of kinds as examples,
   or the agent will treat a kind you did not list as out of scope.
3. **Name the statuses** and the caller's obligation for each, along with the retry limit and
   what happens to partial work when a run stops. See `../../shared/dispatch-protocol.md`, starting
   from the four core statuses there and adding only what a run needs.
4. **Fill every hole.** Each hole is marked required or given a default, so an unfilled one fails
   loudly rather than reaching the agent as empty text. The set of holes is fixed; do not grow it
   per caller, or the template accumulates weight every caller pays for.
5. **Audit the filled prompt** against `../../shared/steering-rules.md` and
   `../../shared/handoff-rules.md` before anything is sent.
6. **Dispatch**, naming the model explicitly rather than letting it inherit from this session,
   so two runs of the same template stay comparable.
7. **Handle the return** per the status table, and check the report is complete rather than
   re-running what the agent already proved.

For work spread across several agents, pick the shape from `../../shared/dispatch-protocol.md`:
fan out, chain, or establish then fan out. Have each worker recheck the facts it depends on
before starting, and treat agents that modify shared state as not a fan-out case even when the
tasks look independent.

## When to stop

If a fact cannot be established, a required hole has no value, or a rule file cannot be read,
stop and say what is missing rather than dispatching anyway. Retry a dispatch only after
something has changed, and at most twice per agent, since an unchanged retry repeats the
failure; then report instead. Do not weaken a check, loosen a rule, or fill a hole with a
placeholder to force a pass; fix the input or stop. When you stop, keep the established facts
and any draft prompt, say where they sit, and leave the keep-or-discard call to the person.

## Converting a named agent

Read the definition and split it into what is invariant and what varies by call. The invariant
part becomes the template body. The varying part becomes named holes. From
`../../shared/dispatch-protocol.md`, add the status set with each status's scope of effect and the
caller's obligation for each, the retry limit, the partial-work handling, and where the detail
goes versus what returns to the caller. Then audit the filled result against
`../../shared/steering-rules.md` and `../../shared/handoff-rules.md`.

## References

- `../../shared/steering-rules.md` for the prompt.
- `../../shared/handoff-rules.md` for the rules that apply because the agent will not see this
  conversation. Everything this skill produces is a hand-off, so this file always applies.
- `../../shared/dispatch-protocol.md` for the caller, the statuses, and the shapes of a run.
