# Hand-off rules

These rules apply only when an agent starts from the document as its instruction, and returns its
results to a caller that did not watch it work. Read this file with `./steering-rules.md` when the
**hand-off** condition is met. Do not read it otherwise.

Severity, the default outcome, warn, and reporting work exactly as in `./steering-rules.md`, and
`./terms.md` defines the words used here. Any blocking failure means the document needs work before
use.

The skills `auditing-skills` and `writing-agents` apply these rules. This file supplies criteria and
defines no task of its own. Where a procedural property an audit needs is missing here, look in the
skill that runs the audit. The stopping points are one example and not the whole list.

Auditors and authors misread the rule about detail and summary most often. That rule caps what the
agent returns to the caller and does not limit how much the agent writes.

The failing pattern is a report instruction naming neither a file nor a cap. A prompt asking only
for the agent's findings is that pattern. The caller then has everything the agent read.

Good, because the detail stays where it was produced and the caller gets what it needs to act:

> Write every finding to `findings.md`. Return the count by severity, the three most serious with
> one line each, and the path to that file. Do not paste the file into your reply.

## Outcome

| Rule | Severity |
| --- | --- |
| The outcome is stated in terms the agent can check without asking the author. Where **reused** holds, `./steering-rules.md` applies this row, so skip it here. | Important |

## Context

| Rule | Severity |
| --- | --- |
| Local conventions the agent could not infer are stated. | Important |

## Finish

| Rule | Severity |
| --- | --- |
| The exact commands are named. | Important |
| The document says the evidence goes in the report, with each command and the path it ran against. | Important |

## Failure

| Rule | Severity |
| --- | --- |
| A dedicated status exists for reporting that the document itself was insufficient. | Important |
| Stopping is stated to carry no penalty. | Important |

## Return

Every rule here applies only at hand-off, because a report matters only where results cross a
context boundary. Inside a conversation, the caller receives the artifact itself.

| Rule | Severity |
| --- | --- |
| The sections of the report are named. | Blocking |
| The wording is fixed enough that results from two runs can be compared without editing. | Important |
| The detail goes to a file the prompt names, and only a capped summary returns to the caller. The cap is 30 lines unless the prompt sets another. | Important |
| Failures are included in the summary rather than only written to the file. | Important |
| A section asks the agent to list anything it did that nobody asked for. | Important |
| The report format sits at the end of the document. | Advisory |

## Composition

| Rule | Severity |
| --- | --- |
| The facts the prompt asserts are established before dispatch, and each carries its origin. | Important |
| Only a script makes a determination that does not need judgement, because a script returns the same result on every run. | Important |
| Facts that fill a template are written to a file as a fixed set of fields, because the caller can then read each field without parsing prose. | Important |
| The model and the effort level are both named explicitly, because two runs that inherit the model or the effort level from their calling sessions cannot be compared. | Important |
| The status values the agent may return are enumerated. The caller's obligation for each one is stated. | Blocking |
| Each status declares whether it affects only the agent reporting it or stops the whole run. | Important |
| The caller checks the report is complete, then re-runs every check it can run on the delivered artifact. | Important |
| A check the caller cannot re-run is named as a claim, and no status rests on it. | Important |
| Where a predefined agent is dispatched, one defined in a static file such as `agents/*.md`, the document includes only the context that call needs. | Advisory |
