# Dispatch protocol

The caller's side of dispatching an agent. `steering-rules.md` covers the agent's side, meaning
what the prompt says and what the agent returns. This covers what the caller does with it.

## One principle

Any determination that can be made deterministically is made by a script, and an agent is
dispatched only for what needs an assessment. A script returns the same shape every run, can be
versioned and reviewed, emits provenance without being asked, and gives the caller an exit code
to gate on.

That covers at least: which facts hold before dispatch, whether the established facts have a
value in every required field, whether every hole in a prompt was filled, and whether a returned
report contains each command it was told to run along with that command's result.

One caution. An agent that cannot find something says so, while a script often returns an empty
result, which reads as nothing to do. State what an empty result means and whether it is
expected.

## Six invariants

1. The facts the prompt asserts are established before dispatch, and each carries its origin.
   Neither a script nor an agent is needed for what the caller already knows.
2. The status values the agent may return are enumerated, and the caller's obligation for each
   one is stated. A status with no defined caller action is decoration.
3. Where the detail goes and what returns to the caller are both named.
4. The retry limit is stated, along with what must change before a retry. Re-dispatching the same
   prompt to the same model is not a retry.
5. Who proves what is stated. The agent proves its own work in its report, with the commands and
   their output. The caller checks the report is complete and does not re-run the checks.
6. What happens to partial work when a run stops is stated. The default is to keep it, name its
   location in the report, and leave the decision to a person. Do not revert automatically, since
   partial work that passes its own gates is often worth keeping.

## Statuses

The sequence of a run needs almost no writing. The obligations per status need all of it, because
they do not exist unless someone writes them down.

Standardise this core. These four describe the agent's relationship to its instruction rather
than anything about the domain, so every template uses them with the same meaning.

| Status | Means |
| --- | --- |
| DONE | The work is finished and its gates pass. |
| DONE_WITH_CONCERNS | The work is finished and the agent has doubts worth reading. |
| BLOCKED | The agent cannot finish. |
| NEEDS_CONTEXT | The instruction was insufficient. This is the caller's failure, not the agent's. |

A check that did not run is not a concern. If a required step was skipped or deferred, the status
is BLOCKED, or NEEDS_CONTEXT when the cause is something the caller failed to supply.

Every status declares whether it affects only the agent reporting it or stops the whole run. The
four above affect one agent. A status added for a particular run may not. An agent that finds a
fact whose origin no longer matches has proved every prompt in the run wrong, not just its own,
and the default reading of a single failure is that it affects one task, so the wider reach has
to be stated.

Additions are allowed and are declared in the template rather than invented per call. A
template's status set is fixed and documented, so two dispatch types can share a caller and their
reports can be merged.

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

## Establishing facts

Anything that can be counted, parsed, matched, or read from a file is script work. An assessment,
such as which of a set of files is in the worst state, is not. The common case is a hybrid, where
a script emits the measurable fields and an agent fills the rest into the same structure.

Where a fact matters enough to be worth the cost, have the script determine it and check the
agent's claim against it. This is for the few facts that would invalidate the run, not for all of
them.

Facts established before the first worker are still being used by the last one. Close that gap
deliberately, either by asserting that the facts are ones no worker can affect, or by having each
worker recheck the facts it depends on before starting. A script makes that recheck cheap enough
to be the default.
