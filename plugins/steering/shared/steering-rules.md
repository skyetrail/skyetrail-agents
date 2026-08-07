# Steering rules

These rules cover anything written to shape an agent's behaviour. A document is in scope where a
person wrote it so that an agent would act a particular way. A skill body, a prompt template, a
command, a hand-off brief, and a one-off request are examples, not the whole list. Hand-off is one
of the conditions below. It is not the subject of this file.

Out of scope: anything an agent reads as material rather than as instruction. Five examples, not
the whole list. Source code under review. A document an agent summarises. A transcript. A dataset.
A report an agent produced. The test is who the text addresses. These rules judge what tells an
agent how to work. They never judge what an agent works on.

Each entry carries a severity and a condition. Report counts by severity. Any blocking failure means
the document needs work before use. Mention an Advisory item once. It never blocks.

A rule about the position or wording of a section applies only where that section exists. Where the
section is missing, the missing section is the finding. The rules that depend on it are then not
applicable.

Where the **hand-off** condition is met, read `./handoff-rules.md` as well. Every rule conditioned
on hand-off lives there, and none of them lives here. So a document that is not a hand-off never
reads them.

## Contents

- Conditions
- Outcome
- Context
- Scope
- Method
- Finish
- Failure
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

## Context

| Rule | Severity | Applies when |
| --- | --- | --- |
| Nothing refers to something the agent cannot resolve, meaning anything it cannot read or reach from the document alone. A prior conversation, an earlier decision, and a file named only by nickname are examples, not the whole list. | Blocking | always |
| Every fact the agent needs is either written out or pointed at by a path it can read. | Blocking | always |
| Approaches already tried and found not to work are stated. | Important | always |
| Context sits above the method, so it is read before a plan is formed. | Advisory | always |

## Scope

| Rule | Severity | Applies when |
| --- | --- | --- |
| What is in scope is named. | Blocking | always |
| What is out of scope is named explicitly, rather than left implied by what is in scope. | Blocking | always |
| Where a category of work is named, a membership test defines it. Any list of kinds carries a marker saying they are examples, not the whole set. | Blocking | always |
| The instruction says to stop and report on reaching a scope limit, rather than work around it. | Blocking | always |
| The scope statement sits above the method. | Advisory | always |
| The instruction states that the agent must not modify anything. It also says what to do where a fix looks obvious. | Blocking | advisory |

A list of kinds tells the reader that a kind not on the list is out of scope. The reader is right
to read it that way. Write the test for membership first. Then give examples.

Bad, because it reads as the whole set:

> Review for injection: SQL, command, template, or path.

Good, because a reader can decide a case the list does not cover:

> Injection is any place input that was not checked or escaped is built into something another
> system interprets. SQL, shell commands, file paths, and markup returned to a browser are
> examples, not the whole list.

One reviewer read the first wording. It had already found a reflected injection. It filed that
finding out of scope, because the wording did not name markup. Nothing about the list was wrong.
The list was closed.

**A trailing "or any other X" satisfies this rule.** A list that ends by generalising to the
category is closed. A list that just stops is not.

> Closed: shell commands, file paths, or any other place unchecked input reaches an interpreter.
>
> Not closed: shell commands, file paths, or templates.

Naming what makes something a member is still the stronger form, and the one to write where the
category is hard to recognise.

## Method

| Rule | Severity | Applies when |
| --- | --- | --- |
| One default approach is given rather than a menu of options. | Important | always |
| The order is fixed where sequence affects correctness, and left open where it does not. | Blocking | always |
| The instruction constrains how the work is done only where correctness or safety needs a specific way. Each such constraint says why. The instruction leaves everything else to the agent. | Important | always |
| Any check that must run before work starts is named as the first step. | Important | always |

## Finish

| Rule | Severity | Applies when |
| --- | --- | --- |
| A check the agent can run itself is named, and its result settles whether the work is done. | Blocking | changes something |
| The instruction says the agent runs the check itself before reporting. | Important | always |
| The finish criteria are specific enough that two runs would return the same result. | Blocking | advisory |
| The instruction says what evidence each finding must carry. | Important | advisory |
| The finish check sits late in the document, near where the agent will decide whether to stop. | Advisory | always |

## Failure

| Rule | Severity | Applies when |
| --- | --- | --- |
| Conditions that should stop the work are stated. | Blocking | always |
| A retry limit is named, and something must change before a retry rather than only the attempt count. | Important | always |
| Weakening the check or editing the test to make it pass is forbidden. | Blocking | changes something |
| The instruction says what to do where the input is missing, is not what it expected, or cannot be assessed. It gives a status for each case. | Blocking | advisory |
| The stop conditions sit directly after the finish check. | Advisory | always |

## Calibration

| Rule | Severity | Applies when |
| --- | --- | --- |
| Examples of what counts are given. | Blocking | advisory |
| Examples of what does not count are given. | Blocking | advisory |
| The default outcome is stated, so the agent must justify escalating rather than justify approving. | Blocking | advisory |
| Where a run showed a miss, the instruction describes the shape that miss takes in the code. It does not name only the label. | Important | advisory |

A label says which bucket a finding belongs in. The shape says what the agent is looking at on
the screen, so it can recognise the case without already knowing it is there.

Bad, because it names the bucket and leaves the reader to spot the case:

> Report any secret written to a log.

Good, because it says what the code looks like where the problem lives:

> Check what every log and error call passes. Passing a whole request, session, user, or config
> object is a finding, because the fields inside it are not visible at the call site.

Reach for this after a run shows a miss, not before. A shape written from imagination is a guess,
and it costs the same context as one taken from an observed failure.

## Composition

| Rule | Severity | Applies when |
| --- | --- | --- |
| Every named hole in a template is marked required, or carries a default. An unfilled hole then fails loudly instead of reaching the agent as empty text. | Important | reused |
| The set of fields established for a template is fixed. It does not gather a payload most callers never use. | Advisory | reused |
| What happens to partial work when a run stops is stated. | Important | changes something |
