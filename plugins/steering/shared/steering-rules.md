# Steering rules

These rules cover anything written to shape an agent's behaviour. A document is in scope where a
person wrote it so that an agent would act a particular way. A skill body, a prompt template, a
command, a hand-off brief, and a one-off request are examples, not the whole list. Hand-off is one
of the conditions below. It is not the subject of this file.

Out of scope: anything an agent reads as material rather than as instruction. Five examples, not
the whole list. Source code under review. A document an agent summarises. A transcript. A dataset.
A report an agent produced. The test is who the text addresses. These rules judge what tells an
agent how to work. They never judge what an agent works on.

The skills `writing-skills`, `auditing-skills`, and `writing-agents` apply this file. It supplies
criteria and defines no task of its own. Where a procedural property an audit needs is missing
here, look in the skill that runs the audit.

Each entry carries a severity and a condition. Report counts by severity. Any blocking failure means
the document needs work before use. An Important failure does not stop use. The author fixes it
before the document changes again. Mention an Advisory item once. It never blocks.

The default outcome for every rule here is pass. Record a fail only where you can point at the text
that breaks the rule. This default holds for any audit that reads this file, whichever skill runs
it. The skill running the audit says how to mark and count what you record.

A rule about the position or wording of a section applies only where that section exists. Where the
section is missing, the missing section is the finding. The rules that depend on it are then not
applicable.

Where the **hand-off** condition is met, read `./handoff-rules.md` as well. Every rule conditioned
on hand-off lives there, and none of them lives here. So an agent auditing a document that is not a
hand-off never reads them.

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
- Voice

**Conditions.** Use these and nothing else.

- **always**
- **hand-off**, the agent will not see the conversation the author has been having
- **changes something**, the work this document steers writes a file or any other state that
  outlives the run, whether the document carries out that work itself or a caller applies it. A
  file the work writes to hold its own findings counts.
- **advisory**, the work this document steers examines material, judges it, and edits none of it
- **reused**, the instruction is a skill or template rather than a one-off
- **describes work**, a reader carries this document out, rather than holding it against another
  document to judge that one

You decide every condition from what the document holds. Treat the document's own claim about which
conditions it meets as a claim to check, not as a fact to accept. Otherwise an author switches off
a rule by writing one sentence about the document.

Every condition is about the document in front of you, not about anything that document describes.
A file of rules for writing hand-off prompts is not itself a hand-off, because the agent reading it
sits in the conversation its author is having. Two audits of one such file called this opposite ways
and returned different counts, so settle it this way and record which way you went.

To decide **describes work**, ask what a reader does with the document. Where a reader carries it
out, the condition holds. Where a reader holds it against another document and judges that one, it
does not. Decide this from the document's part in the work, and never from whether it states an
outcome, because one of the rules below tests exactly that. A test that reads the same property as
the rule it gates leaves the rule unable to fail.

An instruction about how to read the criteria does not make a document into work a reader carries
out. A rule catalogue often says "read this file first" or "mark the rule warn where you cannot
tell". Those sentences belong to a task defined elsewhere.

**advisory** and **changes something** are about the work the document steers, so they can hold for
a criteria file. A file of audit rules steers an audit. Where that audit reads its target and
answers in the conversation, **advisory** holds and **changes something** does not. Where the same
audit writes its findings to a file, both hold.

The two are not opposites. Both hold together for any work that judges material and writes its
findings down. Decide each one by its own test below. Record both answers. A false answer for one
is never a true answer for the other.

To decide **changes something**, list what the work writes: a file, a record, a setting, or anything
else still there after the run ends. These are examples, not the whole list. Where that list is
empty, the condition does not hold. Where the list holds anything at all, the condition holds. A
findings file, a report, and a log the work writes each go on that list, the same as a source file
the work edits.

To decide **advisory**, name the material the work examines, then name what the work produces. Where
the product is a judgement about that material, and the work edits none of that material, the
condition holds. Where the work edits that material, the condition does not hold. Where the work
examines no material and instead produces something new, the condition does not hold either.

A prompt that tells an agent to review a pull request and write its findings to a file meets both
conditions. The findings file is a write, so **changes something** holds. The agent edits none of
the code it reads, so **advisory** holds. One agent read the two as exclusive, marked **changes
something** false, and skipped the Blocking rule against weakening a check. The security review
prompt it produced carries no such sentence.

Read the Applies-when column, one row at a time. A row applies where its own condition holds. What
the other conditions say does not change that.

The section order below is the order these sections should appear in the document being written.
Some entries are about position, so check where a section appears, not only whether it appears.

**This file and `./handoff-rules.md` describe a failing example and never write one out.** Each
section in both shows the wording that passes. A failing example written as an instruction is a
template, and a run that needs that section copies it. One run lifted a failing Finish example near
verbatim, and its own record named the passing one as its model. Where an example must show the
fault, the label sits inside the quoted line, so no copy leaves it behind.

## Outcome

| Rule | Severity | Applies when |
| --- | --- | --- |
| The finished outcome is stated, not just a topic or an area of work. | Blocking | describes work |
| The outcome statement sits at the top, before context and method. | Advisory | describes work |

## Context

| Rule | Severity | Applies when |
| --- | --- | --- |
| Nothing refers to something the agent cannot resolve, meaning anything it cannot read or reach from the document alone. A prior conversation, an earlier decision, and a file named only by nickname are examples, not the whole list. | Blocking | always |
| Every fact the agent needs is either written out or pointed at by a path it can read. | Blocking | always |
| Approaches already tried and found not to work are stated. | Important | always |
| A document that only states criteria names at least one document that applies them. | Important | always |
| Context sits above the method, so it is read before a plan is formed. | Advisory | always |

The lint script resolves whether a path exists. Read that half from the lint record. Judge the other
half: whether the fact the agent needs is there at all.

## Scope

| Rule | Severity | Applies when |
| --- | --- | --- |
| What is in scope is named. | Blocking | always |
| What is out of scope is named explicitly, rather than left implied by what is in scope. | Blocking | always |
| Where a category of work is named, a membership test defines it. Any list of kinds carries a marker saying they are examples, not the whole set. | Blocking | always |
| The instruction says to stop and report on reaching a scope limit, rather than work around it. | Blocking | always |
| The scope statement sits above the method. | Advisory | always |
| The instruction states that the agent must not modify anything. Any file it is told to write its findings to is the one exception. It also says what to do where a fix looks obvious. | Blocking | advisory |

A list of kinds tells the reader that a kind not on the list is out of scope. The reader is right
to read it that way. Write the test for membership first. Then give examples.

The failing shape is a category name and then a bare list of kinds, with no membership test and no
closing clause. A scope line that names injection and then lists four kinds of it is that shape.

Good, because a reader can decide a case the list does not cover:

> Injection is any place input that was not checked or escaped is built into something another
> system interprets. SQL, shell commands, file paths, and markup returned to a browser are
> examples, not the whole list.

One reviewer read a scope line of that shape. It had already found a reflected injection. It filed
that finding out of scope, because the line did not name markup. Nothing about the list was wrong.
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
| One default approach is given rather than a menu of options. | Important | describes work |
| The order is fixed where sequence affects correctness, and left open where it does not. | Blocking | describes work |
| The instruction constrains how the work is done only where correctness or safety needs a specific way. Each such constraint says why. The instruction leaves everything else to the agent. | Important | describes work |
| Any check that must run before work starts is named as the first step. | Important | describes work |
| Where the work branches, the instruction names the decision point and the branch each answer leads to. | Important | describes work |
| Where an input renders as an image, the instruction tells the agent to view the rendered image. | Important | describes work |
| Batch or destructive work produces a plan file the agent checks before it executes anything. | Important | changes something |

## Finish

| Rule | Severity | Applies when |
| --- | --- | --- |
| A check the agent can run itself is named, and its result settles whether the work is done. | Blocking | changes something |
| No run that passes the named check leaves the outcome unreached. | Blocking | changes something |
| The instruction says the agent runs the check itself before reporting. | Important | describes work |
| The finish criteria are specific enough that two runs would return the same result. | Blocking | advisory |
| The instruction says what evidence each finding must carry. | Important | advisory |
| The finish check sits late in the document, near where the agent will decide whether to stop. | Advisory | describes work |

Test the named check like this. Describe one run that passes the check and stops short of the
outcome. Where you can describe such a run, record a fail. Where you cannot, the check holds. The
rule that two runs return the same result asks a different question. A check that passes on
incomplete work passes the same way in both runs.

A check the agent can run itself is not always a script. A question the agent answers by reading
what it produced is one too. Where the work is a judgement, no script settles it, and the
scriptable property left is a count of the parts the work produced. The work can be incomplete at
every part, so that count is a proxy. Write the check against the outcome the document states, and
not against a count of what the work produced.

The failing shape is a check written against that count. In a code review it reads as one entry
per changed file, with the file list as the measure of done. Every entry can be empty of the thing
the review was for, and the count still comes out complete.

Good, because the run that stops short is the run that fails it:

> Where the diff touches a shared library, an auth path, or a config, read the other callers.
> Name each one, and what you concluded about it. An unnamed caller means the review is not
> finished.

One agent finished on that count. It filed an entry for every changed file, found nothing, and
missed a change that weakened a shared authentication helper. The check passed. A reader takes the
finish check as the definition of done. The next reader of that check learns that reading outside
the diff is no part of finishing.

## Failure

| Rule | Severity | Applies when |
| --- | --- | --- |
| Conditions that should stop the work are stated. | Blocking | describes work |
| A retry limit is named, and something must change before a retry rather than only the attempt count. | Important | describes work |
| Weakening the check or editing the test to make it pass is forbidden. | Blocking | changes something |
| The instruction says what to do where the input is missing, is not what it expected, or cannot be assessed. It gives a status for each case. | Blocking | advisory |
| The stop conditions sit directly after the finish check. | Advisory | describes work |

## Calibration

| Rule | Severity | Applies when |
| --- | --- | --- |
| Examples of what counts are given. | Blocking | advisory |
| Examples of what does not count are given. | Blocking | advisory |
| The default outcome is stated, so the agent must justify escalating rather than justify approving. | Blocking | advisory |
| Where a run showed a miss, the instruction describes the shape that miss takes in the code. It does not describe the label. | Important | advisory |

A label says which bucket a finding belongs in. The shape says what the agent is looking at on
the screen, so it can recognise the case without already knowing it is there.

The failing shape is a bucket name and nothing else. "Secrets in logs" is a bucket name. An agent
that does not already know which call leaks one still cannot find it.

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
| Where the output format matters, the instruction supplies a template and says how strictly to follow it. | Important | describes work |

## Voice

These rules govern every sentence rather than one section. Check them wherever you check the rest.

| Rule | Severity | Applies when |
| --- | --- | --- |
| An instructing sentence is an imperative to the reader, or it names an actor that can choose to act. | Important | always |
| A sentence that states a property keeps the property's owner as its subject, and gains no actor. | Blocking | always |
| Nothing that cannot choose to act takes an action verb. | Important | always |

The test for an actor is whether the thing can choose. An agent, a caller, a person, and a script
can choose. A rule, a review, a file, and a document cannot. These are examples, not the whole list.

A bare imperative passes the first rule. It addresses the reader, so its actor is the reader, and it
needs no other name. Most instructions in this plugin take that form.

> Read that file too.

The first rule bites where a sentence instructs and its subject is neither the reader nor a named
actor who can choose.

Two kinds of sentence take two kinds of subject. Mixing them is the common fault.

A sentence that instructs and names its actor:

> The caller checks that the report is complete.

A sentence that states a property, which an auditor tests:

> The description states the capability.

Do not rewrite the second as "State the capability." That turns a property into an order, and the
auditor then reports on its own writing instead of the target's.

A file cannot disagree with anything. These two versions differ only in the second sentence.

> Bad: A second copy of that list drifts from the first. Then the two files disagree.
>
> Good: A second copy of that list drifts from the first. An agent then loads two files that say
> different things.

Forcing the active voice without naming a permitted actor is how a writer promotes the nearest
noun. Five rewrites in this project moved the subject to the wrong actor.

- From the review to the agent.
- From all readers to people.
- From the document's own use to the auditor's use.
- From a skill nobody finds to a reader who cannot find it.
- From a property to an order.

Each one changed what the sentence demanded. A style pass is when they happen, because the writer
counts words then rather than reading meaning.
