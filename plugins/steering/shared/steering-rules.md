# Steering rules

Rules for anything written to shape an agent's behaviour. That includes a skill body, a prompt
template, a command, a hand-off brief, and a one-off request. Hand-off is one of the conditions
below, not the subject of this file.

Each entry has a severity and a condition. Report counts by severity. Any blocking failure means
the document needs work before use. Advisory items are mentioned once and never block.

A rule about the position or wording of a section applies only when that section exists. When the
section is missing, the missing section is the finding, and the rules that depend on it are not
applicable.

## Contents

- Conditions
- Outcome
- Context
- Scope
- Method
- Finish
- Failure
- Return
- Calibration
- Composition

**Conditions.** Use these and nothing else.

- **always**
- **hand-off**, the agent will not see the conversation the author has been having
- **changes something**, the work modifies files or state
- **advisory**, the work reviews or investigates and changes nothing
- **reused**, the instruction is a skill or template rather than a one-off

The section order below is the order these sections should appear in the document being written.
Some entries are about position, so check where a section appears, not only whether it appears.

## Outcome

| Rule | Severity | Applies when |
| --- | --- | --- |
| The finished outcome is stated, not just a topic or an area of work. | Blocking | always |
| The outcome statement sits at the top, before context and method. | Advisory | always |
| The outcome is stated in terms the agent can check without asking the author. | Important | hand-off |

## Context

| Rule | Severity | Applies when |
| --- | --- | --- |
| Nothing refers to something the agent cannot resolve, such as a prior conversation, an earlier decision, or a file named only by nickname. | Blocking | always |
| Every fact the agent needs is either written out or pointed at by a path it can read. | Blocking | always |
| Approaches already tried and found not to work are stated. | Important | always |
| Local conventions the agent could not infer are stated. | Important | hand-off |
| Context sits above the method, so it is read before a plan is formed. | Advisory | always |

## Scope

| Rule | Severity | Applies when |
| --- | --- | --- |
| What is in scope is named. | Blocking | always |
| What is out of scope is named explicitly, rather than left implied by what is in scope. | Blocking | always |
| The instruction says to stop and report on reaching a scope limit, rather than work around it. | Blocking | always |
| The scope statement sits above the method. | Advisory | always |
| The instruction states that the agent must not modify anything, and says what to do instead when a fix looks obvious. | Blocking | advisory |

## Method

| Rule | Severity | Applies when |
| --- | --- | --- |
| One default approach is given rather than a menu of options. | Important | always |
| The order is fixed where sequence affects correctness, and left open where it does not. | Blocking | always |
| How the work is done is constrained only where a specific way is required for correctness or safety, and each such constraint says why. Everything else is left to the agent. | Important | always |
| Any check that must run before work starts is named as the first step. | Important | always |
| A checklist the agent can copy and tick off is included. | Advisory | reused |

## Finish

| Rule | Severity | Applies when |
| --- | --- | --- |
| A check the agent can run itself is named, and its result settles whether the work is done. | Blocking | changes something |
| The exact commands are named. | Important | hand-off |
| The instruction says the agent runs the check itself before reporting. | Important | always |
| The instruction says the evidence goes in the report, so nobody re-runs the check. | Important | hand-off |
| The finish criteria are specific enough that two runs would return the same result. | Blocking | advisory |
| The instruction says what evidence each finding must carry. | Important | advisory |
| The finish check sits late in the document, near where the agent will decide whether to stop. | Advisory | always |

## Failure

| Rule | Severity | Applies when |
| --- | --- | --- |
| Conditions that should stop the work are stated. | Blocking | always |
| A retry limit is named, and something must change before a retry rather than only the attempt count. | Important | always |
| Weakening the check or editing the test to make it pass is forbidden. | Blocking | changes something |
| A named status exists for reporting that the instruction itself was insufficient. | Important | hand-off |
| Stopping is stated to carry no penalty. | Important | hand-off |
| What to do when the input is missing, is not what was expected, or cannot be assessed is stated, with a status for each. | Blocking | advisory |
| The stop conditions sit directly after the finish check. | Advisory | always |

## Return

A report matters where results cross a context boundary. Inside a conversation, the artifact is
the return, so every rule here binds hand-off documents.

| Rule | Severity | Applies when |
| --- | --- | --- |
| The sections of the report are named. | Blocking | hand-off |
| The wording is fixed enough that results from two runs can be compared without editing. | Important | hand-off |
| The detail goes to a named file, and only a capped summary returns to the caller. | Important | hand-off |
| Failures are inlined in the summary rather than only written to the file. | Important | hand-off |
| A section asks the agent to list anything it did that was not asked for. | Important | hand-off |
| The report format sits at the end of the document. | Advisory | hand-off |

## Calibration

| Rule | Severity | Applies when |
| --- | --- | --- |
| Examples of what counts are given. | Blocking | advisory |
| Examples of what does not count are given. | Blocking | advisory |
| The default outcome is stated, so the agent must justify escalating rather than justify approving. | Blocking | advisory |

## Composition

| Rule | Severity | Applies when |
| --- | --- | --- |
| The facts the prompt asserts are established before dispatch, and each carries its origin. | Important | hand-off |
| Any determination a script could make deterministically is made by a script, not by a dispatched agent or read by hand. | Important | hand-off |
| Facts that fill a template are written as a fixed set of named fields to a file, rather than as prose the caller has to parse. | Important | hand-off |
| Every named hole in a template is marked required or given a default, so an unfilled hole fails loudly rather than reaching the agent as empty text. | Important | reused |
| The set of fields established for a template is fixed, so it does not accumulate a payload most callers do not use. | Advisory | reused |
| The model or effort level is named explicitly, rather than left to inherit from the calling session. | Important | hand-off |
| The status values the agent may return are enumerated, and the caller's obligation for each one is stated. | Blocking | hand-off |
| Each status declares whether it affects only the agent reporting it or stops the whole run. | Important | hand-off |
| The caller checks that the report is usable, and does not re-run the checks the agent already proved. | Important | hand-off |
| What happens to partial work when a run stops is stated. | Important | changes something |
| Where a predefined named agent is dispatched, the instruction has been checked for context the call does not need. | Advisory | hand-off |
