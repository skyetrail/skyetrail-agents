# Dispatch protocol

The caller's side of dispatching an agent. `./steering-rules.md` covers what the prompt says.
`./handoff-rules.md` covers everything that applies because the dispatched agent will not see this
conversation. That includes the report's sections and the caller's side of composing the prompt.
This file covers what the caller does with both.

Read `./handoff-rules.md` when you compose a prompt. Do not read it when you audit this file. The
prompts this file governs are hand-offs. This file is not one, because you are reading it inside
the conversation its author is having.

The skill `writing-agents` applies this file. This file supplies criteria and defines no task of its
own.

## Contents

- One principle
- Two terms
- Invariants
- Evidence
- Re-running checks
- Checks the caller cannot re-run
- Statuses
- Three shapes
- Establishing facts

## One principle

A script makes any determination that runs deterministically. Dispatch an agent only for what
needs an assessment. A script returns the same shape every run. You can version it and review it.
It emits provenance without being asked. It gives the caller an exit code to gate on.

That covers at least five things, not the whole list.

- Which facts hold before dispatch.
- Whether the established facts carry a value in every required field.
- Whether the caller filled every hole in a prompt.
- Whether a returned report holds each command the prompt named, with that command's result.
- Whether re-running those commands on the delivered artifact prints what the report shows.

One caution. An agent that cannot find something says so. A script instead returns an empty
result, which reads as nothing to do. State what an empty result means. State whether you expect
it.

## Two terms

A hole is a labeled blank in a prompt template, while a field is a labeled fact in the record the
caller establishes before dispatch. Filling a template writes field values into holes. The two
correspond, but they differ. Fields exist before any template. A template need not use every
field.

## Invariants

1. The caller establishes the facts the prompt asserts before dispatch. Each fact records its
   origin. Neither a script nor an agent is needed for what the caller already knows.
2. The prompt enumerates the status values the agent may return. It states the caller's
   obligation for each one. A status with no defined caller action is decoration.
3. The detail goes to a file. A capped summary returns to the caller. The prompt names both.
   A prompt saying only "report your findings" fails this, because it names neither.
4. The retry limit is stated, along with what must change before a retry. The default is two
   attempts per agent. Re-dispatching the same prompt to the same model is not a retry.
5. The prompt states who proves what, and both sides assess it. The agent returns evidence rather
   than a verdict. The caller checks the report is complete, then re-runs what it can re-run
   against the artifact it received. A pass from one side alone settles nothing. The prompt still
   forbids any change that makes a check pass without satisfying what the check tests. Weakening a
   check, editing a test, narrowing a command, deleting a failing test, stubbing the code under
   test, and adding a skip marker are examples, not the whole list.
6. The prompt states what happens to partial work when a run stops. By default, keep it. Name its
   location in the report. Leave the decision to a person. Do not revert automatically, because
   partial work that passes its own checks is often worth keeping.
7. An agent that dispatches work collects the result before its own turn ends. A dispatched task
   with no collected result is unfinished work, not a hand-off.
8. The prompt names the model and the effort level. Left to inherit from the calling session, two
   runs of one prompt stop being comparable.
9. A check the caller cannot re-run does not gate delivery. Turn it into an artifact instead. The
   run writes what it saw to a file, and the caller checks that file's existence and content.

## Evidence

A complete report is not a true one. In two recorded runs, the report was complete and carried
false claims anyway. Completeness stays worth checking, and it settles nothing on its own.

Evidence is a command, its exact output, and the path it ran against. The agent returns evidence.
A verdict is not evidence. "The check passes", "18 pass and 0 fail", and a ticked line are
verdicts. Each one asks the caller to trust a judgement it cannot see.

Invariant 3 caps what crosses back, and evidence obeys it. The whole output goes to the file. The
report includes the command, the path, and the lines that decide the result.

The path matters most. In two recorded runs, a check passed by running it somewhere else. One
invented a repository, wrote an example against that invention, grepped the invention, and ticked
the line. One copied its draft to a path built to satisfy a name check, audited the copy, deleted
it, and reported the copy's numbers. Both claims were true of a file, and neither was true of the
delivered artifact.

So the evidence names the path it ran against, and the caller re-runs against the delivered path.
Where the two paths differ, the evidence describes a different file.

## Re-running checks

The caller re-runs every check it can run against the artifact it received. One question sorts a
check. Can the caller run this on what it received, and get the same answer the agent got?

A mechanical audit command answers yes. One such command reproduced exactly across six recorded
runs, and it was the only honest, repeatable part of that round. Both parties run it, on the
delivered artifact, for the cost of one command.

Re-running a check is not re-doing the agent's work. The caller runs the commands the prompt named
against the delivered path and compares each output to the report, without repeating the reading,
the searching, the judgement, or the writing. That prohibition stands unchanged.

Where an output differs from the report, do not accept the result. Fix the cause, or report it
upward. Treat the difference as a failure of the run, not as two readings of one result.

A re-run does not catch a weakened check. Both parties then run the weakened check, and both get a
pass. Invariant 5 forbids the weakening for that reason. Where the artifact includes the check
text, the caller compares that text to the text the prompt sent.

## Checks the caller cannot re-run

Some checks leave the caller nothing to run. Name them in the prompt, and state what the caller
does instead, best first.

1. Turn the check into an artifact. The run writes what it saw to a file. The caller reads
   the file and checks it holds what the check needs. A re-read is not a re-run, and it beats a
   claim.
2. Have a script determine the fact, and check the agent's claim against it. `Establishing facts`
   below covers this.
3. Believe the claim. The caller records which claims it believed, and why no cheaper answer
   applied.

Believing a claim is a legitimate answer. Presenting it as an independent check is not.

Invariant 9 exists because one recorded gate required a dispatch inside the agent's session, which
the caller never sees. In six runs under that gate, every one delivered a file whose own text says
it is not the deliverable. Without that gate, two runs each delivered something usable. The gate
blocked every delivery, and the caller could check none of it.

Keep the dispatch, and have it write its result to a file, gating on that file's existence and
content. The caller reads that file and gets the same answer every time.

## Statuses

The sequence of a run needs almost no writing. The obligations per status need all of it, because
they do not exist unless someone writes them down.

Standardise this core. These four describe the agent's relationship to its instruction rather
than anything about the domain, so every template uses them with the same meaning.

| Status | Means | The agent returns | The caller must |
| --- | --- | --- | --- |
| DONE | The work is finished and its checks pass. | Every check the prompt named, each with its command, its path, and the lines that decide it. | Check the report is complete. Re-run each reproducible check against the delivered path. |
| DONE_WITH_CONCERNS | The work is finished and the agent has doubts worth reading. | The DONE evidence, and each concern stated apart from it. A concern does not include a command. | Do the DONE re-runs. Read every concern. Decide each one before using the result. |
| BLOCKED | The agent cannot finish. | The last command run, its output, its path, and where the partial work sits. | Re-run that command against the delivered path. Fix the cause, or report the block upward. Do not re-send the same prompt. |
| NEEDS_CONTEXT | The instruction was insufficient. This is the caller's failure, not the agent's. | The missing field or hole, named, and where the agent looked for it. No command output, because the run did not start. | Supply what was missing. Then re-dispatch. Fix the template too, so the next call includes it. |

A check that did not run is not a concern. If a required step was skipped or deferred, the status
is BLOCKED, or NEEDS_CONTEXT when the cause is something the caller failed to supply.

Every status declares whether it affects only the agent reporting it or stops the whole run. The
four above affect one agent. A status added for a run may not.

Sometimes an agent finds a fact whose origin no longer matches. That agent has proved every prompt
in the run wrong, not only its own. A reader takes a failure to affect one task. So state
the wider reach where it applies.

Returning BLOCKED or NEEDS_CONTEXT costs the agent nothing. Say so in the prompt. An agent that
reads a stop as a mark against it will guess rather than stop, and a guess is harder to catch than
a stop.

Additions are allowed and are declared in the template rather than invented per call. A
template's status set is fixed and documented, so two dispatch types can share a caller and their
reports can be merged. The same holds for the set of fields a template's callers establish:
fixed and documented, so it does not accumulate fields most callers never fill.

Write both columns for each status into the artifact that runs the work: the evidence the agent
returns, and the caller's obligation. Held as a convention rather than written down, they are not
a protocol.

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

Facts established before the first worker are still being used by the last one. Address that
deliberately: either assert that no worker can affect those facts, or have each worker recheck the
facts it depends on before it starts. A script makes that recheck cheap enough to be the default.
