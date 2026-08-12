# How to build steering that works, and know that it does

## What this project is for

Steering is anything a person writes to shape what an agent does: a skill, a prompt for a subagent,
a rules file, a hand-off brief. This project builds steering and then measures it. It ships the
skills `writing-skills`, `writing-agents`, `auditing-skills` and `repo-setup`, and the rule files
those skills apply. This page is the method behind them, and the method transfers without the rules.

Everything here came from getting something wrong first. Each practice names the failure that
produced it. A practice with no failure behind it is a preference, so this page carries none.

## How the loop works

The loop has three moves: measure, write, compare.

**Measure first.** A fresh agent gets a realistic task and no steering. Its output is the baseline,
and the mistakes in it decide what the steering has to say. `tests/baselines/` holds one record per
skill.

**Write only for those mistakes.** Every line costs context on every run, so a line teaching what
the model already does is a loss.

**Compare.** A bench gives one task to two arms: the old steering or none, against the new. Both
arms run on a fixture seeded with known problems, and an answer key states those problems before any
run. Scorers count what each arm found and what it invented, without knowing which arm they hold.
`tests/outcomes/` holds every bench, including the ones that failed.

An audit is a fourth move and the weakest one. An agent reads a file against the rule files and
reports findings by severity. It measures conformance, not whether the file works. The last section
gives the comparison that proved that limit.

## The practices that survived

### Building

**1. Measure a baseline before you write.** Give a realistic task to a fresh agent with no steering
loaded, and record what it does wrong. Forbid that agent from loading any installed skill covering
the task. Our first baseline quietly loaded one, so it measured that skill instead of the model.

**2. Teach only what the baseline showed missing.** Asked for a release-notes skill,
`writing-skills` ran four baselines. The model made the same six judgment calls correctly every
time. The skill taught none of the six. It wrote about the two failures that repeated: an invented
version number stated as fact, and a different document shape each run. This practice has a cost,
named in the last section.

**3. Give a test, not a name.** Never list the kinds of a problem. Any list reads as the complete
set, and a reader is right to read it that way. One reviewer found a real cross-site scripting hole,
then filed it out of scope, because its subtype was not on our list.

Write the membership test instead, then give examples and say they are examples. "Report any secret
written to a log" missed a finding three times out of three. The replacement found it three times
out of three: check what every log and error call passes. A whole request, session, user or config
object is a finding, because the fields inside it are not visible at the call site. That widened
wording later caught `yaml.load` and `pickle.loads` in a framework we never tuned it against.

**4. Write only what an agent can act on, and what time cannot falsify.** A count goes stale the
moment someone adds one. A heading in our own rules read "Seven invariants" and stayed wrong for
sixteen rounds. A reader treats a heading as a label rather than as a claim, so every review missed
it. Counts spanning two files fail the same way. Author notes fail too: an agent cannot act on "we
are unsure about this rule", so put that doubt in the severity field.

### Checking

**5. Fix the question, the prediction and the scoring before anyone can see the answer.** Say in
advance what result would mean your steering is wrong. `handoff-bench` set its criterion first, so
round one went on record as a loss: the new prompt found fewer problems than the one it replaced.
Two later cycles turned that into 8 of 8 with no false alarms, and the loss stayed on the page.
Blinding is the same defence at scoring time, so check the blind held. Ours did not. Every run file
opened with a line naming its arm, and a scorer caught that, not us.

**6. Run the same thing several times, use two readers, and treat their disagreement as data.** One
run hides two different problems. Two readers of one file sometimes cover different parts, and both
report truthfully. Sometimes they read the same sentence and return opposite verdicts. In one bench,
the same prompt reported a defect in two runs and suppressed it in the third. Where both read one
line and disagreed, that line is unclear, which is stronger evidence than either verdict.

**7. A fix is not done until a fresh run confirms it, and check the artifact rather than the
report.** Reasoning that a change works is not evidence that it does. We shipped a defect twice
because we skipped that run, and once shipped a fix carrying a new defect. A fix for one fixture
reintroduced the same defect on a second fixture, and only a regression run caught it. When
`repo-setup` claimed its writes were repeatable, the bench owner counted the markers and diffed the
tree, rather than believing the agent's account.

**8. Evidence you did not collect is not evidence.** Partway through this project I wrote six run
files by hand, analysed them as measurements, and committed a rule change citing the result. The
numbers matched my prediction exactly, which should have made them more suspect. The tell was
mechanical: all six files were the same size to the byte, across two arms carrying different inputs.
Independent runs cannot be. Keep the raw runs, not only the results page.

A check that cannot reach its target still produces a pass. Our lint reported "all files up to date"
on files it never opened. Later I measured the damage from one of my own errors. My search was too
narrow to match three of the four cases, and I reported the clean result with confidence.

**9. Test against material you did not write, and separate a defect from a difference.** Rules
validated only on your own files measure how closely a document resembles your house style. We
pointed ours at another author's skills, and every audit breached our finding threshold: ten audits
over seven files, none below ten findings. A large share of those findings named no consequence at
all. A finding that names a consequence is a defect. A finding that records a departure from your
house style is a difference, and at one severity the second kind floods the first.

**10. When a worker contradicts your materials, suspect the materials.** Every method error in this
project surfaced that way, and none surfaced from the materials checking themselves. That list holds
a real problem missing from an answer key, a false statement in another key, and the broken blind.
It also holds a stale baseline record, and a fixture that manufactured four findings.

### Readability

**11. Write for the person who maintains it.** A model writes the steering and a person maintains
it. Those two readers fail differently. An agent misreads a closed list, and an audit catches that.
A person gives up on a paragraph needing three passes, and nothing reports that. The file then stops
being maintained and starts being worked around. Ask the person who reads it, and treat "this is
hard to read" as the finding. This project took its style from a published standard rather than
inventing one, and `shared/ste.md` states which rules it kept.

**12. Gate a style rewrite on equivalence.** Nine files moved to Simplified Technical English in one
branch. An independent checker compared each file to its pre-rewrite version. Three had changed what
they demanded, and all three came from splitting one sentence into two. That is the operation this
style asks for most often, and `shared/ste.md` records what a split costs.

Fix the drift rather than keeping the better version. One of the three changes was an improvement,
and it still had to go. A rule change made inside a style branch destroys the baseline for the next
comparison. One of the three also broke a rule the same branch had just added, which argues for the
gate rather than for more care.

## What does not work

**Four rounds of auditing our own files did not make the rules better.** `tests/outcomes/rules-ab/`
ran eight blind audits on a repository we did not write: two arms, two targets, two auditors each.
Every measure ties or reverses between the two targets. Three of four pre-registered predictions
were wrong, and the one that held predicted no difference. Both arms found the same real defects, so
the rules do something. The rounds did not make them do it better. Never present a fix list from an
audit as a measured improvement.

**A conformance audit cannot see content that went missing.** `tests/outcomes/sonnet-exec/` gave one
task to Claude Sonnet 5 twice, once with a skill loaded and once with nothing loaded. The skill
fixed the shape and stripped correct domain content the model had produced on its own. One audit
passes both drafts, because the rules can only see the container. `tests/outcomes/skills-bench/`
holds the same trade, unscored: its control runs told the reader to update for a named
vulnerability, and its skill-led runs did not.

**A warning naming the exact loss does not prevent it.** Round two of that experiment added a
sentence naming the item lost in round one. Both fresh runs read the page holding that sentence, and
both dropped the item it named. Countermeasures closed three of four findings, and this one survived
them.

**Simplified Technical English changes nothing an agent does.** `tests/outcomes/ste-bench/` ran two
arms, two fixtures and two runs each, scored blind against keys written rounds earlier. The result
was an exact tie on both fixtures, with no false alarms. The predicted length cost was also wrong:
nine words on 949. Adopt the style for the person who maintains the file, and claim nothing more.

**Three results we withdrew.** A withdrawn result still teaches, so it stays on the page.

- `sonnet-exec` round one concluded that a pointer costs a weak executor more than a copy does. It
  was wrong: the pointer aimed at a file no commit had ever held. The same round also measured a
  superseded commit, so those numbers are unusable.
- `skills-bench` reported 7 of 7 against a control mean of 6.33. One trap separated the arms, the
  fixture held one point of headroom, and the bench ran unblinded. Its real finding was unpredicted:
  three control runs produced three document shapes, and three skill-led runs produced one.
- The routing test in `tests/outcomes/trigger-test/` has never run. An earlier version of that
  directory carried six run files reporting twelve of twelve for both arms. No agent produced them,
  and the rule changes they justified were reverted. Whether our two description rules change which
  skill an agent picks is still unknown.
