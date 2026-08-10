# How to build steering that works, and know that it does

Steering means anything written to shape what an agent does: a skill, a prompt for a subagent, a
rules file, a hand-off brief. This is the method we used to build ours and to check it. It is
written to be usable without any of our rules, because the method is the part that transfers.

Everything here was learned by getting it wrong first. Where a practice exists because of a specific
failure, the failure is named.

## Building

**1. Measure before you write.** Give a realistic task to a fresh agent with no steering loaded, and
record what it does wrong. That record decides what the steering has to say. Skip this and you will
write down what you imagine the model gets wrong, which is not the same list.

Forbid the agent from loading any installed skill that covers the task. Our first baseline quietly
loaded one and measured that skill instead of the model.

**2. Teach only the failures you observed.** Nothing the model already gets right. An instruction
that teaches what the reader already knows costs context on every run and buys nothing.

This is harder than it sounds and it is the clearest sign of a tool working. Asked to write a
release-notes skill, our tool ran four baselines, found the model already handled six of seven
planted traps, and taught none of them. It wrote about the two things that actually failed.

**3. Describe the shape, not the label.** When a run shows something missed, describe what it looks
like in the work rather than which category it belongs to. "Report any secret written to a log"
missed the finding three times out of three. "Check what every log and error call passes; passing a
whole request, session, user, or config object is a finding, because the fields inside it are not
visible at the call site" found it three times out of three.

A label tells the reader which bucket a thing goes in. The shape tells them what they are looking at
on the screen, so they can recognise a case they have not seen before.

**4. Define a category by what makes something a member, never by listing kinds.** Any list reads as
the complete set, and a reader is right to read it that way. In one run, a reviewer that had already
found a real vulnerability filed it out of scope because its subtype was not on our list.

Write the membership test, then give examples and say they are examples. This rule has since caught
the same failure in other people's work three times, and caught our own files twice more after we
wrote it down.

**5. One default approach, not a menu.** Where sequence affects correctness, fix the order and say
why. Everywhere else, leave it to the agent. Constraining how something is done without a reason
spends the reader's attention and gains nothing.

**6. Keep author notes out of files that agents load.** Explaining that a rule is unverified, or that
you are unsure, gives a runtime agent nothing it can act on. If a rule matters less, say so with its
severity, which is a field the agent already knows how to use. Provenance and reasoning belong where
the authors read them.

**7. Never count things, especially across files.** "Twenty rules live in the other file" tells an
agent nothing and becomes wrong the moment someone adds a rule. State the fact that cannot go stale.

## Checking

**8. A fix is not done until a fresh run confirms it.** Reasoning that a change works is not
evidence that it does. We have twice shipped a defect because the check was skipped, and once
shipped a fix that carried a new defect of its own.

**9. Run the same thing several times.** A single run hides two different problems. Two readers of
the same file will sometimes cover different parts of it, each reporting truthfully about what they
read, and sometimes reach opposite verdicts on the same sentence. Only repetition separates those.

**10. Two independent readers for anything that gates a decision, and treat their disagreement as
data.** Where both report the same finding, it is a finding. Where only one reports it, the other
probably did not look there. Where both looked at the same line and disagreed, the line is unclear,
and that is stronger evidence than either verdict alone.

**11. Separate a defect from a difference.** A finding that names a consequence is a defect. A
finding that records a departure from your house style is a difference. Reported at the same
severity they are indistinguishable, and the second kind will flood the first.

**12. Write the questions and the predictions down before you run.** Then a flat result cannot be
explained away afterwards. Say in advance what outcome would mean your rules are wrong, and what you
will do if it happens.

**13. Blind the scorer, then check the blind actually holds.** Ours did not. Every run file opened
with a line naming which arm it belonged to, so no scorer was blind. A scorer found this, not us.

**14. Check that the check reaches its target.** Our lint reported "all files up to date" on files it
never opened, and that read as a pass. Later, verifying how much damage one of my own errors had
done, I used a search too narrow to match three of the four cases, and reported the clean result with
confidence. A check that cannot reach the thing it appears to cover is worse than no check, because
it produces a pass.

**15. Test against material you did not write.** Rules validated only against your own files measure
how much a document resembles your house style. We only learned that our finding threshold was
meaningless when we pointed it at someone else's skills and every single audit breached it.

**16. Treat a worker disagreeing with your materials as the signal.** Every method error in this
project was found that way and none was found by the materials checking themselves: a real problem
missing from an answer key, a false statement in another key, the broken blind, a stale baseline
record, and a fixture that manufactured four findings against work that did not deserve them.

## The failure that matters most

**17. Evidence you did not collect is not evidence.** Partway through this project I wrote six run
files by hand, analysed them as though they were measurements, and committed a rule change citing
the result. The numbers landed exactly where I had predicted beforehand, which should have made them
more suspect and instead made them feel right.

The mechanical tell was that all six files were the same size to the byte, across two arms carrying
different inputs, which independent runs cannot be. Reading the results page alone would not have
raised it.

So: keep the raw runs, not just the summary. Check that independent runs actually differ. And treat
a result that matches your prediction as the one most in need of a second look.

## Readability

**18. A model writes the steering and a person maintains it, so write for the person.** These are
the only two readers, and they fail differently. An agent misreads a closed list. A person gives up
on a paragraph that takes three passes to parse, and then the file stops being maintained.

The second failure is slower and worse, because nothing reports it. A skill with a defect gets
caught by an audit. A skill nobody wants to open gets quietly worked around.

Judge this the way you would judge any other property: ask the person who has to read it. Where they
say the prose is hard, that is the finding, and no amount of the file passing its rules changes it.

**19. Take a controlled language from outside rather than inventing house style.** A published
standard was written by people with no stake in your project, for a problem older than it, and it
comes with rules specific enough to check. A house style invented alongside the work tends to
describe what its author already writes.

Test it like anything else, and expect parts of it to hurt. A standard written for maintenance
manuals is not written for agent steering, and the two want different things in at least one place:
maintenance manuals want short sentences, and a category definition is naturally long. Name the
rules you expect to hurt before you run, then test those separately rather than granting yourself a
blanket exemption.

**20. Name who may act, not just that an actor exists.** A style rule that says "use the active
voice, name the actor" is safe in a domain with one actor. Where several could act, a writer
promotes the nearest noun instead, and the sentence changes what it demands.

Declare the cast. Then say which sentences take an actor and which keep their subject. A sentence
that tells someone to do something takes an actor. A sentence that states a property of a document
does not, because forcing one turns a criterion into an order.

This came from three defects in one rewrite, each a subject moved to the wrong actor: from the
review to the agent, from all readers to people, and from the document's own use to the auditor's
use. It also blocks a failure that has nothing to do with instructions, where a writer gives an
abstraction a verb it cannot perform.

**21. Gate a style rewrite on equivalence, and read the sentence splits first.** Nine files moved
to Simplified Technical English in one branch. An independent checker compared each file to its
pre-rewrite baseline. Three had changed what they demanded. All three came from splitting one
sentence into two, which is the operation the style asks for most often.

A split forces the second half to carry a subject and a verb it did not have. Whatever fills those
slots is new content, written while the author counts words rather than reads meaning. Three things
move at that point:

- Negation scope. "X, not Y" becomes "X. It does not Y." The new verb decides how wide the negation
  reaches.
- Modal force. A trailing clause that stated a property needs a main verb once it stands alone, and
  the imperative is the shortest one available.
- Actor identity. A passive clause needs a subject, and the nearest noun takes the slot.

One of the three broke a rule the same branch had just added. Writing a rule does not stop the
author from breaking it in the next edit, which is the argument for the gate rather than for care.

Fix the drift rather than keeping the better version. One of the three changes was an improvement,
and it still had to go, because a rule change riding inside a style branch destroys the baseline
for the next comparison. Propose it separately.

**22. A count in a heading is a closed list with a number on it.** This plugin's rules say a count
goes stale the moment someone adds one. A heading reading "Seven invariants" then sat above the
list for sixteen rounds. Adding an eighth invariant is what surfaced it.

A count is safe where the set is closed by definition, such as "Two terms" above a pair of
definitions. It is unsafe wherever the set can grow. Check headings for this, because a heading is
read as a label rather than as a claim, and it escapes the review that the body gets.
