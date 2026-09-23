# Steering rules

These rules cover anything written to steer an agent's behaviour. A document is in scope where a
person wrote it to direct how an agent acts. A skill body, a prompt template, a slash command, a
hand-off brief, and a one-off request are examples, not the whole list. Hand-off is one of the
conditions below. It is not the subject of this file.

Out of scope: anything an agent reads as material rather than as instruction. `./terms.md` says what
material means. Five examples, not the whole list. Source code under review. A document an agent
summarises. A transcript. A dataset. A report an agent produced. The test is who the text addresses.
These rules judge what tells an agent how to work. They never judge what an agent works on.

The skills `writing-skills`, `auditing-skills`, and `writing-agents` apply this file. It supplies
criteria and defines no task of its own. Where a procedural property an audit needs is missing here,
look in the skill that runs the audit.

## Terms

The words that `./terms.md` defines, such as caller, gate, claim, and material, keep the one meaning
it gives them in every file of this plugin. Open `./terms.md` before this file.

Each entry states a severity and a condition. Report counts by severity. A Blocking failure means
the document needs work before use, but an Important failure does not stop use. The author fixes it
before the document changes again. Mention an Advisory item once. It never blocks.

The default outcome for every rule here is pass. Record a fail only where you can point at the text
that breaks the rule. Another auditor then checks the same text against the same rule, and reaches
the same answer. A count with nothing quoted behind it states one reading, and no other auditor
repeats it. This default holds for any audit that reads this file, whichever skill runs it. The
skill running the audit says how to mark and count what you record.

A rule about the position or wording of a section applies only where that section exists. Where the
section is missing, the missing section is the finding. The rules that depend on it are then not
applicable.

Where the **hand-off** condition is met, read `./handoff-rules.md` as well. Every rule conditioned
on hand-off lives there, and none of them lives here. So an agent auditing a document that is not a
hand-off never reads them.

## Contents

- Terms
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

- always, the row applies to every document these rules cover
- **hand-off**, an agent starts from the document as its instruction, and returns its results to a
  caller that did not watch it work, such as a dispatching agent or the owner of a scheduled run.
  Where the document does not say who reads its results, a prompt for a subagent or a scheduled run
  meets it, and a slash command or instruction file a person runs in their own session does not
- **changes something**, the work this document steers writes a file or any other state that
  outlives the run, whether the document carries out that work itself or a caller applies it. A file
  the work writes to store its own findings counts.
- **judges only**, the work this document steers examines material and judges it, but edits none of
  it
- **reused**, the document is used on more than one occasion rather than once, such as a skill, a
  template, a slash command, or an instruction file
- **describes work**, a reader follows this document, rather than holding it against another
  document to judge that one

You decide every condition from what the document contains. Treat the document's own statement about
which conditions it meets as a statement to check, not as a fact to accept. Otherwise an author
switches off a rule by writing one sentence about the document.

Every condition is about the document in front of you, not about anything that document describes. A
rule file for writing hand-off prompts is not itself a hand-off, because no agent starts from it as
its instruction, and a skill applies it as criteria.

To decide **describes work**, ask what a reader does with the document. Where a reader follows it,
the condition holds. Where a reader holds it against another document and judges that one, it does
not. Decide this from the document's part in the work, and never from whether it states an outcome,
because one of the rules below tests exactly that. A test that reads the same property as the rule
it switches on leaves the rule unable to fail.

An instruction about how to read the criteria does not make a document into work a reader carries
out. A rule file often says "read this file first" or "mark the rule warn where you cannot tell".
Those sentences belong to a task defined elsewhere.

**judges only** and **changes something** are about the work the document steers, so they can hold
for a rule file. A rule file steers an audit. Where that audit reads its target and answers in the
conversation, **judges only** holds and **changes something** does not. Where the same audit writes
its findings to a file, both hold.

**Judges only** and **changes something** are not opposites. Both hold together for any work that
judges material and writes its findings down. Decide each one by its own test below. Record both
answers. A false answer for one is never a true answer for the other.

To decide **changes something**, list what the work writes. A file counts, and so does a database
entry. A setting counts too, and so does anything else still there after the run ends. This is a
partial list. Where that list is empty, the condition does not hold. Where the list contains
anything at all, the condition holds. A findings file, a report, and a log the work writes each go
on that list, the same as a source file the work edits.

To decide **judges only**, name the material the work examines, then name what the work produces.
Where the product is a judgement about that material, and the work edits none of that material, the
condition holds. Where the work edits that material, the condition does not hold. Where the work
examines no material and instead produces something new, the condition does not hold either.

A prompt that tells an agent to review a pull request and write its findings to a file meets both
conditions. The findings file is a write, so **changes something** holds. The agent edits none of
the code it reads, so **judges only** holds. One agent read the two as exclusive, marked **changes
something** false, and skipped the Blocking rule against weakening a check. The security review
prompt it produced carries no such sentence.

Read the Applies-when column, one row at a time. A row applies where its own condition holds. What
the other conditions say does not change that.

A written document has these sections, in this order: outcome, context, scope, method, finish,
failure, calibration, composition. Conditions and Voice are sections of this file and not of the
document. Some entries are about position, so check where a section appears, not only whether it
appears.

**This file and `./handoff-rules.md` write out no failing example a reader could use as an
instruction.** Each section in both shows the wording that passes. A failing example written as an
instruction is a template, and a run that needs that section copies it. One run lifted a failing
Finish example near verbatim, and its own record named the passing one as its model. Where a short
phrase must show the fault, put the label inside the quoted line. Then no copy leaves it behind.

## Outcome

| Rule | Severity | Applies when |
| --- | --- | --- |
| The finished outcome is stated, not just a topic or an area of work. | Blocking | describes work |
| The outcome statement sits at the top, before context and method. | Advisory | describes work |
| Where the document describes work, its outcome is stated in terms the agent can check without asking the author. | Important | reused |

## Context

| Rule | Severity | Applies when |
| --- | --- | --- |
| Nothing refers to something the agent cannot resolve, meaning anything it cannot read or reach from the document alone. A prior conversation, an earlier decision, and a file named only by nickname are examples, not the whole list. | Blocking | always |
| Every fact the agent needs is either written out or pointed at by a path it can read. | Blocking | always |
| Approaches already tried and found not to work are stated. | Important | always |
| A document that only states criteria names at least one document that applies them. | Important | always |
| Context sits above the method, so it is read before a plan is formed. | Advisory | always |

The lint script resolves whether a path exists. Read that half from the lint output. That output
names the command and the file that command read, so another auditor runs the same command. Judge
the other half: whether the fact the agent needs is there at all.

## Scope

| Rule | Severity | Applies when |
| --- | --- | --- |
| What is in scope is named. | Blocking | always |
| What is out of scope is named explicitly, rather than left implied by what is in scope. | Blocking | always |
| Where a category of work is named, a membership test defines it. Any list of kinds includes a marker saying they are examples, not the whole set. | Blocking | always |
| The document says to stop and report on reaching a scope limit, rather than work around it. | Blocking | always |
| The scope statement sits above the method. | Advisory | always |
| The document states that the agent must not modify anything. Any file it is told to write its findings to is the one exception. It also says what to do where a fix looks obvious. | Blocking | **judges only** |

A list of kinds tells the reader that a kind not on the list is out of scope. The reader is right to
read it that way. Write the test for membership first. Then give examples.

The failing pattern is a category name and then a bare list of kinds, with no membership test and no
closing clause. A scope line that names injection and then lists four kinds of it follows that
pattern.

Good, because a reader can decide a case the list does not cover:

> Injection is any place input that was not checked or escaped is built into something another
> system interprets. SQL, shell commands, file paths, and markup returned to a browser are
> examples, not the whole list.

One reviewer read a scope line that followed that pattern. It had already found a reflected
injection. It filed that finding out of scope, because the line did not name markup. Nothing about
the list was wrong. The list was an unmarked list.

**A trailing "or any other X" satisfies this rule.** A list that ends by generalising to the
category is a marked list, but a list that just stops is an unmarked list.

> Marked list: shell commands, or any other place unchecked input reaches an interpreter.
>
> Unmarked list: shell commands, or templates.

Naming what makes something a member is still the stronger form, and the one to write where the
category is hard to recognise.

## Method

| Rule | Severity | Applies when |
| --- | --- | --- |
| One default approach is given rather than a menu of options. | Important | describes work |
| The order is fixed where sequence affects correctness, and left open where it does not. | Blocking | describes work |
| The document constrains how the work is done only where correctness or safety needs a specific way. Each such constraint says why. The document leaves everything else to the agent. | Important | describes work |
| Any check that must run before work starts is named as the first step. | Important | describes work |
| Where the work branches, the document names the decision point and the branch each answer leads to. | Important | describes work |
| Where an input renders as an image, the document tells the agent to view the rendered image. | Important | describes work |
| Batch or destructive work produces a plan file the agent checks before it executes anything. | Important | changes something |

## Finish

| Rule | Severity | Applies when |
| --- | --- | --- |
| The document names a check the agent runs itself, and the work ends where that check passes. | Blocking | describes work |
| A count of the parts the work produced does not decide that check. | Blocking | describes work |
| A check that ends the work names the artifact the caller received as its subject. | Blocking | describes work |
| The document names what the caller runs on the delivered artifact to reach the same result. | Blocking | describes work |
| The document fixes the subject of every gate, so no later choice moves it. | Blocking | describes work |
| Where the caller cannot reach the same result, the document calls it a claim, and not a gate. | Blocking | describes work |
| The document ends the work on a gate, and never on a claim. | Blocking | describes work |
| What the check covers comes from the material, and not from what the agent decides, writes, or opens. | Blocking | **judges only** |
| What decides the check is a value anyone else confirms against the material. An entry, a verdict, and a count decide nothing. | Blocking | **judges only** |
| The document states that a pass means the agent covered what the check names. No sentence in it says a pass makes the result correct, the finding set whole, or the material clean. | Blocking | **judges only** |
| The finish criteria are specific enough that two runs would return the same result. | Blocking | **judges only** |
| The document says what evidence each finding must carry. | Important | **judges only** |
| The document says the agent runs the check itself before reporting. | Important | describes work |
| The document names the state the work writes, and what anyone else opens to see that state. | Important | changes something |
| The finish check sits late in the document, near where the agent will decide whether to stop. | Advisory | describes work |

**A gate is a check the caller re-runs on the artifact it received, and a claim is a statement of
what one run observed.** One question separates them. Can the caller run this check on the artifact
it received, and get the answer the run recorded? Where the answer is yes, the document names it a
gate, and its result sets the status the run reports. Where the answer is no, the document names it
a claim, on which the work never ends. A failed gate changes the status and never whether the
artifact is delivered.

One skill held its work back until the run dispatched a subagent. Only that run saw the dispatch, so
the caller could believe the claim or not, and had nothing else. In one round, six runs failed that
check, and six delivered a draft rather than the artifact. The same round ran one lint command on
the delivered file, and that result came out the same every time. A command both parties run on one
file is the pattern that works.

**The subject of a gate is the artifact the caller receives, and the document names it.** One run
could not satisfy a no-holes check on its draft. It wrote a second file, ran the check on that file,
and recorded the pass. The check was real, and the answer was true of a file. It was not true of the
artifact the caller got. Another run copied its draft to a path built to satisfy a name check,
audited the copy, and deleted it.

The coverage row and the subject rows read two different things. Coverage says which items the check
reaches. The subject says which artifact the check opens. A check can have the right coverage and
still open the wrong file.

The Failure section forbids weakening a check. Naming the subject is what makes that move visible,
because the caller opens the same artifact and reads the same answer.

Good, because the caller opens the file and reaches the same answer:

> Write the dispatch prompt to `dispatch.md`. The gate is that this file exists and carries every
> field named in Composition. The caller opens `dispatch.md` and reads the same fields. Whether a
> dispatch ran is a claim, and the work does not end on it.

One row above tests whether two runs return the same result. No auditor watches two runs, so hold
that row to the text: the criteria name the artifact and the values read from it. Three isolated
runs wrote three different finish checks, and each recorded its own as reproducible.

Is the work finished? Is the work right? A finish check answers only one of them. A check the agent
runs answers the first. For work that meets **judges only**, the agent does not run a check that
answers the second. So the rows conditioned on **judges only** ask for a check on what the agent
covered, and for a sentence saying what a pass leaves open.

Do not ask for a check whose result shows whether work that meets **judges only** is done, because
no such check exists. An author asked for a thing that does not exist supplies the nearest thing
that does, a count of the parts the work produced. In three runs the count came out whole while the
review was empty.

**The count row is conditioned on describes work, so it holds for work that edits material too.** A
prompt to migrate every call site can measure itself by one report line per call site. Each line can
carry no edit, and the tally still comes out whole. The trap is the tally, and not the kind of work
under it.

**These rows are properties of the text, and not a test the author runs.** An author who describes a
run that passes the check and stops short can still keep the check, and one run did. That test helps
an author who writes a check, and it decides no row here. An auditor decides every row above without
the author's agreement.

**A property of the material holds before the agent acts, so no later choice moves it.** Where the
coverage comes from the agent's own findings, a run that finds nothing passes with an empty list.
One run took a passing example and moved its coverage onto the agent's findings that way. What the
agent opens and what the agent writes are two more choices of that kind, and not the whole set.

**Anyone who has the material looks at the value the check names and sees whether it is right.** A
call site's name, a file and a line, and a quoted line are such values. An entry does not count as
one of these values, and neither does a count of entries, because neither says anything about the
material. Nor does a verdict count, because confirming a verdict means doing the judgement again. A
conclusion beside the value is welcome, and the value is the part that bites.

**A stated gap is not a fix.** One row asks the document to say what a pass leaves open. That row is
not a place to record that the check misses the outcome. One run described a run that passes its own
check and misses the vulnerability. It kept the check, and wrote that the gap was disclosed rather
than hidden. Judge every row above on the text it names, because a sentence about a weakness leaves
the weakness where it is.

**A count of the writes answers the row about written state.** It answers no other row here. A write
that landed and a judgement that finished are two facts, and one never stands for the other.

A check the agent runs itself is not always a script, and neither is a question the agent answers by
reading the material.

Good, because the material fixes what it covers, and a run that does not open a file fails it:

> Where the diff touches a shared library, an auth path, or a config, read the other call sites.
> Name each one, and what you concluded about it. An unnamed call site means the review is not
> finished. A pass here means you read every call site. It says nothing about whether the change
> is safe.

One agent finished on a count instead. It filed an entry for every changed file, found nothing, and
missed a change that weakened a shared authentication helper. The check passed. A reader takes the
finish check as the definition of done. The next reader of that check takes reading outside the diff
as no part of finishing.

## Failure

| Rule | Severity | Applies when |
| --- | --- | --- |
| The stopping points of the work are stated. | Blocking | describes work |
| A retry limit is named, and something must change before a retry rather than only the attempt count. | Important | describes work |
| Weakening the check or editing the test to make it pass is forbidden. | Blocking | changes something |
| The document says what to do where the input is missing or is not what it expected. It also covers input that cannot be assessed, and gives a status for each case. | Blocking | **judges only** |
| The stopping points sit directly after the finish check. | Advisory | describes work |

## Calibration

| Rule | Severity | Applies when |
| --- | --- | --- |
| Examples of what counts are given. | Blocking | **judges only** |
| Examples of what does not count are given. | Blocking | **judges only** |
| The default outcome is stated, so the agent must justify escalating rather than justify approving. | Blocking | **judges only** |
| Where a run showed a miss, the document describes what the reader sees in the code where the miss occurs. It does not describe the label. | Important | **judges only** |

A label says which bucket a finding belongs in. A description of what the reader sees where the miss
occurs says what the agent is looking at on the screen, so it can recognise the case without already
knowing it is there.

The failing pattern is a bucket name and nothing else. "Secrets in logs" is a bucket name. An agent
that does not already know which call leaks one still cannot find it.

Good, because it says what the code looks like where the problem occurs:

> Check what every log and error call passes. Passing a whole request, session, user, or config
> object is a finding, because the fields inside it are not visible at the call site.

Reach for this after a run shows a miss, not before. A description written from imagination is a
guess, and it costs the same context as one taken from an observed failure.

## Composition

| Rule | Severity | Applies when |
| --- | --- | --- |
| Every hole in a template is marked required, or has a default. An unfilled hole then fails with a visible error instead of reaching the agent as empty text. | Important | reused |
| The set of fields established for a template is fixed. It does not gather a payload most callers never use. | Advisory | reused |
| What happens to partial work when a run stops is stated. | Important | changes something |
| Where the output format matters, the document supplies a template and says how strictly to follow it. | Important | describes work |

## Voice

These rules govern every sentence rather than one section. Check them wherever you check the rest.

| Rule | Severity | Applies when |
| --- | --- | --- |
| An instructing sentence is an imperative to the reader, or it names an actor that can choose to act. | Important | always |
| A sentence that states a property keeps the property's owner as its subject, and does not gain an actor. | Blocking | always |
| Nothing that cannot choose to act takes an action verb. | Important | always |

The test for an actor is whether the thing can choose. An agent, a caller, a person, and a script
can choose. A rule, a review, a file, and a document cannot. This is a partial list.

A bare imperative passes the first rule. It addresses the reader, so its actor is the reader, and it
does not need another name. Most instructions in this plugin take that form.

> Read that file too.

The first rule bites where a sentence instructs and its subject is neither the reader nor an actor
the sentence names who can choose.

A sentence either instructs and names its actor, or it states a property an auditor tests. Mixing
the two kinds is the common fault.

A sentence that instructs and names its actor:

> The caller checks that the report is complete.

A sentence that states a property, which an auditor tests:

> The description states the capability.

Do not rewrite the second as "State the capability." That turns a property into an order, and the
auditor then reports on its own writing instead of the target's.

A file cannot disagree with anything. These two versions differ only in the second sentence.

> Bad: a second copy of that list drifts from the first. Then the two files disagree.
>
> Good: a second copy of that list drifts from the first. An agent then loads two files that say
> different things.

Forcing the active voice without naming an actor that can choose is how a writer promotes the
nearest noun. This project moved the subject to the wrong actor in these rewrites.

- From the review to the agent.
- From all readers to people.
- From the document's own use to the auditor's use.
- From a skill nobody finds to a reader who cannot find it.
- From a property to an order.

Each one changed what the sentence demanded. A style pass is when they happen, because the writer
counts words then rather than reading meaning.
