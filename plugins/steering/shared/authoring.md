# Authoring

Read this file to settle which artifact a request needs. You end with one class and the number of
the test that gave it. The classes are a script, an answer in this conversation, a prompt, and
a skill. These four are the whole set. Take a request you cannot place in one of them back to the
person.

The skills `writing-skills` and `writing-agents` apply this file. It supplies criteria and defines
no task of its own. `auditing-skills` does not apply it. An auditor reads a finished artifact and
chooses nothing.

Out of scope: how to write the artifact once the class is settled, and what the finished artifact
must hold. The writing style is out of scope too. The skill named beside each class covers the
first two. `./ste.md` covers the third.

## Contents

- The tests
- Where two tests hold
- Unsettled tests
- Requests with more than one kind of work
- Shape versus subject matter

## The tests

Copy this block into your reply and fill it. Do this before you write any of the artifact.

```
Artifact test

1 script   You can write down the command or the regex that
           returns the answer, and running it needs no judgement.  yes | no | cannot tell
2 answer   The guidance serves one occasion, and the only reader
           is the person in this conversation.                     yes | no | cannot tell
3 prompt   The agent that needs the guidance will not hold this
           conversation.                                           yes | no | cannot tell
4 skill    The agent that needs the guidance holds this
           conversation.                                           yes | no | cannot tell

Class:
Deciding test:
```

Fill the lines from the top. Stop at the first line that reads `yes`. Write `-` on every line below
it. Then write the class and the number of the deciding test.

The block is complete where the deciding line reads `yes`, every line above it reads `no`, and both
last lines hold a value. Check that yourself before you report anything. Keep the set of lines
fixed, and do not drop any of them.

Take the first test that reads `yes`, and act on it.

1. **A script.** Write the script. Do not write a document. No skill takes this over.
2. **An answer.** Say the guidance in your reply. Do not write a file.
3. **A prompt.** Use `writing-agents`.
4. **A skill.** Use `writing-skills`.

A subagent, a scheduled run, and a fresh session are examples of an agent that will not hold this
conversation. They are not the whole list.

Where the class names a skill other than the one you run, say which test held. Name that skill.
Hand the request over. Do not write the artifact your own skill produces.

## Where two tests hold

Take the earlier test. The earlier class costs less per use.

- A script costs no agent context.
- An answer costs one turn.
- A prompt costs one dispatch.
- A skill costs context in every agent that loads it, on every run.

So a repeatable check you can settle with a regex is a script, even where a skill could carry it
too.

Do not name the class the request comes closest to. Closeness carries no metric, so two readers
return two classes. The order above is the metric.

## Unsettled tests

A test does not settle where you cannot answer its question. This differs from a test whose answer
is no. The person did not name occasions, so you cannot count them. The person did not name a
reader, so you cannot say which context holds the guidance. This is a partial list.

Write `cannot tell` on that line and stop. Then return these three things.

1. The number of the test that did not settle.
2. The question in it you could not answer.
3. The one question the person must answer to settle it.

Ask the person that question. Do not take the next class down. Do not reword a test to make it
hold. Fill the block again only after the person answers, because you get the same `cannot tell`
from the same words.

Returning the unsettled test is a complete answer. Returning the artifact with the block unfilled
is not.

Where you already wrote part of the artifact, say where it sits and name the test that did not
settle. That text is a draft. A draft is not the deliverable. Naming a status beside it does not
make it one. Leave the keep-or-discard call to the person. The same holds for any other gate your
skill names and you could not run.

## Requests with more than one kind of work

Split the request. Fill one block per part. Say in your report which part took which class. A
request holding a repeatable check and a judgement is the common case, not the whole list.

## Shape versus subject matter

These rule files carry the order and the shape of an artifact. They carry none of its subject
matter.

Write down what you know about the subject that a reader must have. Do this before you apply any
section order. Keep that list. Check the finished artifact against it. Where you cannot find an
item in it, change the order. Do not drop the item.

Then read the finished artifact once more. Name every instruction in it that came from your
knowledge of the subject rather than from a rule file. Where you can name none, you dropped them
all. Put them back.

One run showed this loss. For one task, two agents wrote independently, and the agent holding the
rule files left out four things the agent without them wrote.

- A pre-triage step for a security report.
- A warning against discussing that report in a public tracker.
- A rule to judge a report by its facts alone, whoever sent it.
- An instruction to split a report that holds two problems.

Every one is subject matter and none is shape. These four are what one run dropped, not the whole
set a run can drop.
