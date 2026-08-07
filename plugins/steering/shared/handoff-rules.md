# Hand-off rules

Rules that apply only when the agent will not see the conversation the author has been having.
Read this file with `./steering-rules.md` when the **hand-off** condition is met, and not otherwise.

Severity and reporting work exactly as in `./steering-rules.md`. Any blocking failure means the
document needs work before use. Where you cannot tell from the document whether a rule here is met,
mark it warn and say what you could not determine, rather than guessing either way.

The rule most often misread is the one about detail and summary. It is about what crosses back to
the caller, not about how much the agent may write.

Bad, because the caller now holds everything the agent read:

> Report your findings.

Good, because the detail stays where it was produced and the caller gets what it needs to act:

> Write every finding to `findings.md`. Return the count by severity, the three most serious with
> one line each, and the path to that file. Do not paste the file into your reply.

## Outcome

| Rule | Severity |
| --- | --- |
| The outcome is stated in terms the agent can check without asking the author. | Important |

## Context

| Rule | Severity |
| --- | --- |
| Local conventions the agent could not infer are stated. | Important |

## Finish

| Rule | Severity |
| --- | --- |
| The exact commands are named. | Important |
| The instruction says the evidence goes in the report, so nobody re-runs the check. | Important |

## Failure

| Rule | Severity |
| --- | --- |
| A named status exists for reporting that the instruction itself was insufficient. | Important |
| Stopping is stated to carry no penalty. | Important |

## Return

A report matters where results cross a context boundary. Inside a conversation the artifact is the
return, which is why every rule here is hand-off only.

| Rule | Severity |
| --- | --- |
| The sections of the report are named. | Blocking |
| The wording is fixed enough that results from two runs can be compared without editing. | Important |
| The detail goes to a named file, and only a capped summary returns to the caller. | Important |
| Failures are inlined in the summary rather than only written to the file. | Important |
| A section asks the agent to list anything it did that was not asked for. | Important |
| The report format sits at the end of the document. | Advisory |

## Composition

| Rule | Severity |
| --- | --- |
| The facts the prompt asserts are established before dispatch, and each carries its origin. | Important |
| Any determination a script could make deterministically is made by a script, not by a dispatched agent or read by hand. | Important |
| Facts that fill a template are written as a fixed set of named fields to a file, rather than as prose the caller has to parse. | Important |
| The model or effort level is named explicitly, rather than left to inherit from the calling session, so two runs of the same prompt stay comparable. | Important |
| The status values the agent may return are enumerated, and the caller's obligation for each one is stated. | Blocking |
| Each status declares whether it affects only the agent reporting it or stops the whole run. | Important |
| The caller checks that the report is usable, and does not re-run the checks the agent already proved. | Important |
| Where a predefined named agent is dispatched, the instruction has been checked for context the call does not need. | Advisory |
