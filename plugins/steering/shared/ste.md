# Writing style

Prose in this plugin follows Simplified Technical English, adapted from ASD-STE100. That standard
belongs to the AeroSpace and Defence Industries Association of Europe. This file states the rules
this plugin adopted and the ones it dropped. It does not reproduce the standard.

The skills `writing-skills` and `writing-agents` apply this file. It supplies criteria and defines
no task of its own.

`auditing-skills` does not apply it. An audit does not judge writing style, because style does not
change what an agent does. Only an author reads this file.

## What it covers

Every sentence a person writes for an agent to read: a skill body, a rule file, a prompt template,
a hand-off brief.

Out of scope: frontmatter, code, commands, file paths, error text, and anything quoted from another
source. Keep those verbatim.

## In force

| Rule | Why it survived |
| --- | --- |
| Active voice. | A passive sentence hides who acts, and an agent needs to know. |
| Simple tenses only. Present, past, future, infinitive, imperative. | A perfect tense buries when something happens under how it happened. |
| One word, one meaning, throughout a document. | Two words for one thing read as two things. |
| Noun clusters of three words or fewer. | A four-word cluster hides which noun governs. |
| One topic per paragraph, six sentences or fewer. | A reader loses a seventh sentence. |
| A sequence of three or more steps becomes a numbered list. | Prose hides a sequence. |
| Lead with the result. | The first sentence answers the question. |
| 20 words per sentence in a rule cell, 25 in prose. | See below. The caps hold, with a stated exception. |

`./steering-rules.md` carries the Voice rules, which say who may act and which sentences take an
actor. Those are audited. These are not. Do not restate one set in the other.

## Dropped, with the reason

**The fixed verb list.** ASD-STE100 gives one verb per action, and would collapse check, verify,
confirm, validate, and inspect into `check`. This plugin uses three of those words for three
different operations. A lint is a script. An audit is a judgement pass by an agent. A check is
either. Collapsing them makes "check the target" stop saying which one to run.

**One instruction per sentence.** Several rules here carry three conditions joined by "or". Split
them and a disjunction reads as a sequence. An agent then applies only the first condition, or
treats all three as needing to hold together.

**The imperative for every instruction.** A rule cell is a property an auditor tests, not an order
it follows. Rewriting "The description states the capability" as "State the capability" turns a
criterion into an order. The auditor then reports on its own writing instead of the target's. That
fault reached a commit in this plugin, in the same branch that added the rule forbidding it.

**The sentence cap, where a membership test needs the words.** A membership test is naturally long.
This one passes 20 words before its examples start:

> Injection is any place input that was not checked or escaped is built into something another
> system interprets.

Splitting it puts the test in one sentence and the boundary in another. The category then reads as
closed again. Keep the test whole and let the sentence run long. Record it when you do.

## What splitting a sentence costs

Simplified Technical English asks for a split more often than any other edit, and a split is where
meaning leaves. The second half needs a subject and a verb it did not have. Whatever fills those
slots is new content, written while the author counts words rather than reads meaning.

Three things move at that point.

- **Negation scope.** "X, not Y" becomes "X. It does not Y." The new verb decides how far the
  negation reaches.
- **Modal force.** A trailing clause that stated a property needs a main verb once it stands alone.
  The imperative is the shortest one available, so a property becomes an order.
- **Actor identity.** A clause with no actor needs a subject, and the nearest noun takes the slot.

A rewrite of nine files produced exactly three meaning changes, and every one came from a split.
Check a split at those three points before you accept it.

## What this style does not buy

A controlled comparison found no difference in what an agent does. Two arms, one written this way
and one not, returned the same findings on the same targets.

Adopt it for the reader. A person maintains these files, and a file nobody can read decays whatever
it does on the day it ships. Do not claim it changes agent behaviour. The measurement says it does
not.
