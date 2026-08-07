# Dispatch protocol

The caller's side of dispatching an agent. `./steering-rules.md` covers what the prompt says.
`./handoff-rules.md` covers what the agent returns, including the report's sections. This file
covers what the caller does with both.

The skill `writing-agents` applies this file. This file supplies criteria and defines no task of its
own.

## Contents

- One principle
- Two terms
- Invariants
- Statuses
- Three shapes
- Establishing facts

## One principle

A script makes any determination that runs deterministically. Dispatch an agent only for what
needs an assessment. A script returns the same shape every run. You can version it and review it.
It emits provenance without being asked. It gives the caller an exit code to gate on.

That covers at least four things, not the whole list. Which facts hold before dispatch. Whether
the established facts carry a value in every required field. Whether the caller filled every hole
in a prompt. Whether a returned report holds each command the prompt named, with that command's
result.

One caution. An agent that cannot find something says so. A script instead returns an empty
result, which reads as nothing to do. State what an empty result means. State whether you expect
it.

## Two terms

A hole is a named blank in a prompt template. A field is a named fact in the record the caller
establishes before dispatch. Filling a template writes field values into holes. The two
correspond, but they differ. Fields exist before any template. A template need not use every
field.

## Invariants

1. The caller establishes the facts the prompt asserts before dispatch. Each fact carries its
   origin. Neither a script nor an agent is needed for what the caller already knows.
2. The prompt enumerates the status values the agent may return. It states the caller's
   obligation for each one. A status with no defined caller action is decoration.
3. The detail goes to a named file. A capped summary returns to the caller. The prompt names both.
   A prompt saying only "report your findings" fails this, because it names neither.
4. The retry limit is stated, along with what must change before a retry. The default is two
   attempts per agent. Re-dispatching the same prompt to the same model is not a retry.
5. The prompt states who proves what. The agent proves its own work in its report, with the
   commands and their output. The caller checks that the report is complete. The caller does not
   re-run the checks. Because the caller does not re-run them, the prompt forbids any change that
   makes a check pass without doing the work the check tests. Weakening a check, editing a test,
   narrowing a command, deleting a failing test, stubbing the code under test, and adding a skip
   marker are examples, not the whole list. Nothing else stands behind that proof.
6. The prompt states what happens to partial work when a run stops. By default, keep it. Name its
   location in the report. Leave the decision to a person. Do not revert automatically, because
   partial work that passes its own gates is often worth keeping.
7. An agent that dispatches work collects the result before its own turn ends. A dispatched task
   with no collected result is unfinished work, not a hand-off.
8. The prompt names the model and the effort level. Left to inherit from the calling session, two
   runs of one prompt stop being comparable.

## Statuses

The sequence of a run needs almost no writing. The obligations per status need all of it, because
they do not exist unless someone writes them down.

Standardise this core. These four describe the agent's relationship to its instruction rather
than anything about the domain, so every template uses them with the same meaning.

| Status | Means | The caller must |
| --- | --- | --- |
| DONE | The work is finished and its gates pass. | Check the report is complete. Do not re-run the checks the agent proved. |
| DONE_WITH_CONCERNS | The work is finished and the agent has doubts worth reading. | Read every concern. Decide each one before using the result. |
| BLOCKED | The agent cannot finish. | Fix the named cause, or report the block upward. Do not re-send the same prompt. |
| NEEDS_CONTEXT | The instruction was insufficient. This is the caller's failure, not the agent's. | Supply what was missing. Then re-dispatch. Fix the template too, so the next call carries it. |

A check that did not run is not a concern. If a required step was skipped or deferred, the status
is BLOCKED, or NEEDS_CONTEXT when the cause is something the caller failed to supply.

Every status declares whether it affects only the agent reporting it or stops the whole run. The
four above affect one agent. A status added for a particular run may not.

Sometimes an agent finds a fact whose origin no longer matches. That agent has proved every prompt
in the run wrong, not only its own. A reader takes a single failure to affect one task. So state
the wider reach where it applies.

Returning BLOCKED or NEEDS_CONTEXT costs the agent nothing. Say so in the prompt. An agent that
reads a stop as a mark against it will guess rather than stop, and a guess is harder to catch than
a stop.

Additions are allowed and are declared in the template rather than invented per call. A
template's status set is fixed and documented, so two dispatch types can share a caller and their
reports can be merged. The same holds for the set of fields a template's callers establish:
fixed and documented, so it does not accumulate fields most callers never fill.

Write the caller's obligation for each status into the artifact that runs the work. Held as a
convention rather than written down, they are not a protocol.

## Three shapes

- **Fan out.** The default. Use it when the pieces of work do not read or write anything in
  common and none of them needs the result of another.
- **Chain.** Use it when one agent's output changes the next prompt. Each link is a separate
  dispatch, and the caller fills the next prompt from the previous report.
- **Establish then fan out.** Use it when the facts the workers need are not yet known. Nothing is
  dispatched until those facts are established and validated.

Agents that modify shared state are not a fan-out case even when the tasks look independent.

These three cover the dependency patterns seen so far, not every pattern there is. Stop and report what is missing where work fits none of them. Do the same where you cannot
establish a fact a shape depends on. Do not force the work into the nearest shape.

## Establishing facts

Anything that can be counted, parsed, matched, or read from a file is script work. An assessment,
such as which of a set of files is in the worst state, is not. The common case is a hybrid, where
a script emits the measurable fields and an agent fills the rest into the same structure.

Where a fact matters enough to be worth the cost, have the script determine it and check the
agent's claim against it. This is for the few facts that would invalidate the run, not for all of
them.

Facts established before the first worker are still being used by the last one. Close that gap deliberately. Either assert that no worker can affect those facts, or have each
worker recheck the facts it depends on before it starts. A script makes that recheck cheap enough
to be the default.
