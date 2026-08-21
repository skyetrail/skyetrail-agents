# Hand-off rules

These rules apply only when the agent will not see the conversation the author had.
Read this file with `./steering-rules.md` when the **hand-off** condition is met. Do not read it otherwise.

Severity, the default outcome, and reporting work exactly as in `./steering-rules.md`. Any blocking
failure means the document needs work before use. Sometimes you cannot tell from the document
whether a rule here is met. If so, mark the rule warn. State what you could not determine. Do not
guess either way.

The skills `auditing-skills` and `writing-agents` apply these rules. This file supplies criteria and
defines no task of its own. Where a procedural property an audit needs is missing here, look in the
skill that runs the audit. The stop conditions are one example, not the whole list.

Readers misread the rule about detail and summary most often. It is about what crosses back to
the caller, not about how much the agent may write.

The failing shape is a report instruction naming neither a file nor a cap. A prompt asking only for
the agent's findings is that shape. The caller then holds everything the agent read.

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
| The instruction says the evidence goes in the report, with each command and the path it ran against. | Important |

## Failure

| Rule | Severity |
| --- | --- |
| A dedicated status exists for reporting that the instruction itself was insufficient. | Important |
| Stopping is stated to carry no penalty. | Important |

## Return

A report matters where results cross a context boundary. Inside a conversation, the artifact is the
return. So every rule here applies only at hand-off.

| Rule | Severity |
| --- | --- |
| The sections of the report are named. | Blocking |
| The wording is fixed enough that results from two runs can be compared without editing. | Important |
| The detail goes to a file the prompt names, and only a capped summary returns to the caller. | Important |
| Failures are included in the summary rather than only written to the file. | Important |
| A section asks the agent to list anything it did that nobody asked for. | Important |
| The report format sits at the end of the document. | Advisory |

## Composition

| Rule | Severity |
| --- | --- |
| The facts the prompt asserts are established before dispatch, and each carries its origin. | Important |
| A script makes every determination that does not need judgement. Nothing else settles one. | Important |
| Facts that fill a template are written as a fixed set of fields to a file. They are not prose the caller has to parse. | Important |
| The model and the effort level are both named explicitly, rather than left to inherit from the calling session. Naming one and inheriting the other still leaves two runs incomparable. | Important |
| The status values the agent may return are enumerated. The caller's obligation for each one is stated. | Blocking |
| Each status declares whether it affects only the agent reporting it or stops the whole run. | Important |
| The caller checks the report is complete, then re-runs every check it can run on the delivered artifact. | Important |
| A check the caller cannot re-run is named as a claim, and no status rests on it. | Important |
| Where a predefined agent is dispatched, the instruction includes no context that call does not need. | Advisory |
