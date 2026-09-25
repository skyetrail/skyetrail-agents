# Authoring

Read this file to run the artifact test, five questions that decide which kind of artifact a request
needs. You end with one class and the number of the deciding test. The classes are a script, an
answer in this conversation, a prompt, a skill, and an instruction file. These five are the whole
set. Take a request you cannot place in one of them back to the person.

The skills `writing-skills` and `writing-agents` apply this file. It supplies criteria and defines
no task of its own. `auditing-skills` does not apply it, because an auditor reads a finished
artifact and has no class to choose.

Out of scope: how to write the artifact once the class is decided, and what the finished artifact
must contain. The skill named beside each class covers both.

## Contents

- The artifact test
- Where two tests hold
- Tests that read `cannot tell`
- Requests with more than one kind of work
- Structure versus subject matter

## The artifact test

Copy this block into your report and fill it. Do this before you write any of the artifact.

```
Artifact test

1 script           You can write down the command or the regex that returns what
                   the request asks for, and running it needs no judgement.       yes | no | cannot tell
2 answer           The guidance serves one occasion, and the only reader
                   is the person in this conversation.                            yes | no | cannot tell
3 prompt           The guidance is the whole instruction an agent starts
                   from, for one task or one dispatch.                            yes | no | cannot tell
4 skill            An agent loads the guidance partway through its work,
                   on more than one occasion.                                     yes | no | cannot tell
5 instruction file The guidance applies to every session in a repository, a
                   project, or all of a person's sessions, whatever the request.  yes | no | cannot tell

Class:
Deciding test:
```

Fill the lines from the top. Stop at the first line that reads `yes`. Write `-` on every line below
it. Then write the class and the number of the deciding test.

The block is complete where the deciding line reads `yes`, every line above it reads `no`, and both
last lines have a value. Check that yourself before you report anything. Keep the set of lines
fixed, and do not drop any of them.

Take the first test that reads `yes`, and act on it.

1. **A script.** Write the script. Do not write a document. No skill takes this over.
2. **An answer.** Say the guidance in your report. Do not write a file. No skill takes this over.
3. **A prompt.** Use `writing-agents`.
4. **A skill.** Use `writing-skills`.
5. **An instruction file.** Give the person the lines, and name the file they belong in, such as
   `CLAUDE.md` or `AGENTS.md`. Write that file only where the person asks, because such a file is
   often shared, and another tool may replace it. No skill takes this over.

The prompt for a subagent and the prompt of a scheduled run are examples of guidance an agent starts
from. So is a transcript or a summary of a conversation given to a fresh agent. A skill differs,
because an agent loads it partway through its work, whether a person or a caller's prompt started
that work. A skill that a subagent or a scheduled run loads is still a skill. So is guidance a
person starts by a slash command on more than one occasion, and test 3 does not hold for it. A file
every session loads at its start, such as `CLAUDE.md`, is not the whole instruction for one task,
because each session's request is that. It is not loaded partway through the work either, so neither
test 3 nor test 4 holds for it, and test 5 decides it. A skill whose description makes it load in
every session, whatever the request, counts as loaded at the start, so test 5 decides it too.

Where the class names a skill other than the one you run, give the number of the deciding test. Name
that skill. Hand the request over. Do not write the artifact your own skill produces.

## Where two tests hold

Fill from the top and stop at the first yes. This section is for a reader who feels a later class
fits better. Take the earlier class anyway, because it costs less per use.

- A script costs no agent context.
- An answer costs one turn.
- A prompt costs one dispatch.
- A skill costs context in every agent that loads it, on every run.
- An instruction file costs context in every session it covers, whatever the task.

So a repeatable check you can decide with a regex is a script, even where a skill could carry it
too.

Do not name the class the request comes closest to, because two readers judge closeness differently
and return two classes. Use the order above instead.

## Tests that read `cannot tell`

A test reads `cannot tell` where you cannot answer its question. This differs from a test whose
answer is no. The person did not name occasions, so you cannot count them. The person did not name a
reader, so you cannot say which context will have the guidance. This is a partial list.

Write `cannot tell` on that line and stop. Then return these three things.

1. The number of the test that reads `cannot tell`.
2. The question in it you could not answer.
3. The one question the person must answer so that the test no longer reads `cannot tell`.

Ask the person that question. Do not take the next class down. Do not reword a test to make it hold.
Fill the block again only after the person answers, because you get the same `cannot tell` from the
same words.

Do not return the artifact with the block unfilled. Those three things are a complete answer on
their own.

Where you already wrote part of the artifact, say where it sits and name the test that reads
`cannot tell`. That text is a draft, not the deliverable, even with a status written beside it.
Leave the keep-or-discard call to the person. This applies only where the artifact test reads
`cannot tell`. Where a later check could not run, your skill still delivers the artifact. Name that
check in your report.

## Requests with more than one kind of work

Split the request. Fill one block per part. Say in your report which part took which class. A
request that contains a repeatable check and a judgement is the common case, not the whole list.

## Structure versus subject matter

The rule files under `shared/` carry the order and the structure of an artifact. They carry none of
its subject matter.

Write down what you know about the subject that a reader must have. Do this before you apply any
section order. Keep that list. Check the finished artifact against it. Where you cannot find an item
in it, change the order. Do not drop the item, unless your skill measured that the model gets it
right without help.

Then read the finished artifact once more. Name every instruction in it that came from your
knowledge of the subject rather than from a rule file. Where you can name none, you left out every
item on your subject list. Put each one back, except an item your skill measured the model gets
right without help.

One run showed this loss. For one task, two agents wrote independently, and the agent with the rule
files left out four things the agent without them wrote.

- A pre-triage step for a security report.
- A warning against discussing that report in a public tracker.
- A rule to judge a report by its facts alone, whoever sent it.
- An instruction to split a report that contains two problems.

All four are subject matter, which the rule files do not carry. These four are what one run dropped,
not the whole set a run can drop.
