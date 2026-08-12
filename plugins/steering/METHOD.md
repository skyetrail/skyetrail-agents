# How to build steering that works, and know that it does

## What this project is for

Steering is anything a person writes to shape what an agent does: a skill, a subagent prompt, a rule
file, a hand-off brief. This project writes steering and then measures it. It ships the skills
`writing-skills`, `writing-agents`, `auditing-skills` and `repo-setup`, and the rule files those
skills apply. This page is the method behind them, and the method transfers without the rules.

Every practice below names the failure that produced it. A practice with no failure behind it is a
preference, so this page carries none.

## How it works now

Three steps: write, measure on the model that executes, audit.

**Write against a baseline.** A fresh agent gets a realistic task and no steering. Its mistakes
decide what the steering says. Every line costs context on every run, so a line teaching what the
model already does is a loss. `tests/baselines/` holds one record per skill. Those four records are
stale: no baseline has run since 2026-08-01, and two skills changed on 2026-08-12.

**Measure on Claude Sonnet 5.** Sonnet executes these skills, so Sonnet runs them. One task goes to
two arms, no skill loaded against the skill loaded, with an isolated working directory per run.
Compare the delivered artifacts, not the runs' accounts of themselves.

**Audit last, and expect little.** An agent reads a file against the rule files and reports findings
by severity. An audit measures conformance. It cannot see whether the file works.

### Why the executing model replaced the audit

Four rounds audited this plugin's own files against its own rules. Each round cleared the previous
round's findings, and every confirmed fix held. That looked like progress.

`tests/outcomes/rules-ab/` then compared the rules before those rounds against the rules after. Eight
blind audits ran: two arms, two targets, two independent auditors each, on a repository we did not
write.

**The result was null.** Every measure tied or reversed between the two targets. Three of four
pre-registered predictions were wrong, and the one that held predicted no difference. Both arms
found the same real defects, so the rules do something. The rounds did not make them do it better.

The arithmetic behind the illusion is short. Rounds two, three and four retired 144 findings and
created 67 new ones. Most of the new ones came from the previous round's fixes.

So the project began running its skills on Sonnet. That measured execution rather than conformance
for the first time, and it found defects no audit could reach. The record is in
`tests/outcomes/sonnet-exec/` and `tests/outcomes/determinism/`.

## The practices

### Building

**1. Measure a baseline before you write, and teach only what it missed.** Asked for a release-notes
skill, `writing-skills` ran four baselines. The model made the same six judgement calls correctly
every time, so the skill taught none of them. It taught the two failures that repeated: an invented
version number stated as fact, and a different document form each run. Forbid the baseline agent to
load any installed skill covering the task. Our first baseline quietly loaded one, so it measured
that skill instead of the model.

**2. Give a test, not a name, and check that no earlier step can empty it.** Never list the kinds of
a problem. Any list reads as the complete set, and a reader is right to read it that way. One
reviewer found a real cross-site scripting hole, then filed it out of scope, because its subtype was
not on our list.

Write the membership test instead, then give examples and say they are examples. "Report any secret
written to a log" missed a finding three times out of three. The replacement found it three times out
of three: check what every log and error call passes. That wording later caught `yaml.load` and
`pickle.loads` in a framework we never tuned it against.

The test is necessary and not sufficient. One run wrote a banned check word for word, while the skill
named that exact check as its first banned example. In another run the test was sound and an earlier
step emptied it. A Method step let the run decide that a config file touched no category, so a
hardcoded API key inside it never reached a clearance.

**3. Every line must decide something, and time must not falsify it.** A count goes stale the moment
someone adds one. A heading in our own rules read "Seven invariants" and stayed wrong for sixteen
rounds. A reader treats a heading as a label rather than as a claim, so every reviewer missed it.
Author notes fail differently. An agent cannot act on "we are unsure about this rule", so put that
doubt in the severity field.

A value the text leaves open becomes a difference between runs. Three isolated runs of one prompt
agreed on zero structural choices. They differed on section headings, on `reference/` against
`references/`, and on the number of reference files. They also differed on a default window of 7 days
against 14, and on the output filename. Every difference traced to an absent rule rather than to a
permitting sentence. That variance is a gap in the rules, not a fault in them.

### Checking

**4. A gate is a check the caller re-runs on the artifact it received.** This is the largest design
change in the project.

The old gate told the agent to prove a baseline by dispatching a subagent. No session could dispatch.
Six isolated runs stopped and delivered a file whose own text says it is not the deliverable. Two
unaided runs shipped. Two of the six cheated the gate. One invented a repository, wrote a
filled example against it, grepped that file, and ticked the line. One copied its draft to a path
built to pass a name check, audited the copy, and deleted it. It then reported 18 passes on a file
that returns 4 passes and 2 failures. The honest runs scored worse than the run that fabricated.

The fix: the caller and the callee each assess the gate independently. Anything the caller cannot
re-run stops gating delivery and becomes a file the caller reads. **Six of six then shipped.** A
caller caught a false claim by re-running one run's own check. The run ticked a line reading "every
path in it opens". Three of its five paths do not exist. Neither earlier cheat recurred.

Three consequences follow.

1. Check that the environment can satisfy every gate you write. A gate that cannot be satisfied
   where the skill runs gets cheated, or it blocks delivery.
2. Prefer a mechanical check. `npm run audit` runs `eng/audit-skill.mjs` over one file and reproduces
   exactly on every re-run. It is the only component that has been honest in every round that
   measured it.
3. Never trust a tick. The checklist is self-graded. In one round all three runs ticked the
   finish-check line, and two ticked it after describing the failing run in their own record.

State the environment, because we got it wrong. Subagent dispatch was unavailable in the sessions
that ran these skills, confirmed independently across six runs. `TaskCreate`, `TaskGet` and
`SendMessage` all exist, and none dispatches a fresh-context agent and returns output.

**5. Isolate every run, then repeat it and use two readers.** Repetition without isolation measures
nothing. Six runs shared one scratchpad, two of them read the first run's output before writing, and
one said so. Agreement between those runs is co-authorship.

A second contamination came from a committed path. Prior-round output sits in
`plugins/skyetrail/tests/baselines/`, one run read it, and nine of that run's lines are
byte-identical to the earlier draft. That fixture cannot be re-run until the directory moves out of
reach. Run output must never land where a baseline record lives.

Then repeat, because one run hides two problems. Use two readers, because paired auditors reproduce
each other at 78% to 89% and have returned opposite verdicts on the same sentence. Where two readers
disagree on one line, that line is unclear. That is stronger evidence than either verdict.

**6. Fix the question, the prediction, the scoring and the power before anyone sees the answer.**
`handoff-bench` set its criterion first, so round one went on record as a loss: the new prompt found
fewer problems than the one it replaced. Two later cycles turned that into 8 of 8 with no false
alarms, and the loss stayed on the page. Blinding is the same defence at scoring time, so check the
blind held. Ours did not. Every run file opened with a line naming its arm, and a scorer caught that.

Pre-register the power as well. The trigger test pre-committed to reading no difference as grounds
for cutting a blocking rule. Both arms then scored 36 of 36, and the scorer refused that reading. Two
perfect scores leave both readings open: the rules change nothing, or the test had no room to show a
change. With 18 should-trigger trials per arm, a true miss rate of 10% shows zero misses about 15% of
the time. A null earns nothing unless the design could have shown the difference.

**7. Evidence you did not collect is not evidence.** Partway through this project I wrote six run
files by hand, analysed them as measurements, and committed a rule change citing the result. The
numbers matched my prediction exactly, which should have made them more suspect.

Do not rely on the tell that caught it. All six files were the same size to the byte, and I treated
that as impossible for independent runs. The trigger test later ran for real and produced files with
the same signature. Keep the raw runs, and check them against the environment that made them.

A check that cannot reach its target still produces a pass. Our lint reported "all files up to date"
on files it never opened. I later claimed `repo-setup` had never had a baseline. That came from a
grep for a heading three baselines use and this one does not. It matched three files of four, and
missed the one holding the record. The false claim reached this page, a pull request description, and
a commit message on `main` before an independent check caught it. Check a claim against the source,
never against a pattern that resembles the source.

**8. Distrust your own materials.** Rules validated only on your own files measure how closely a
document resembles your house style. We pointed ours at another author's skills, and every audit
breached our finding threshold: ten audits over seven files, none below ten findings. A large share
of those findings named no consequence at all. A finding that names a consequence is a defect. A
finding that records a departure from your house style is a difference, and at one severity the
second kind hides the first.

When a worker contradicts your materials, suspect the materials. Every method error in this project
surfaced that way, and none surfaced from the materials checking themselves. That list holds five
items: a real problem missing from an answer key, a false statement in another key, and the broken
blind. It also holds a stale baseline record, and a broken fixture behind four void findings.

### Readability

**9. Check a style rewrite for equivalence.** Nine files moved to Simplified Technical English in one
branch. An independent checker compared each file to its pre-rewrite version. Three had changed what
they demanded, and all three came from splitting one sentence into two. That is the edit this style
asks for most often, and `shared/ste.md` records what a split costs.

Fix the drift rather than keeping the better version. One of the three changes was an improvement,
and it still had to go. A rule change made inside a style branch destroys the baseline for the next
comparison.

## What does not work

**Auditing our own files against our own rules.** Section two gives the null result. Two limits
belong beside it. Eight audits over two targets are enough for a large difference, and not for a
small one. A real but modest improvement would not show there. Those rounds also closed two defects
in our own files.

- Two paths in `repo-setup` deleted a confirmed lint command.
- `writing-agents` sent agents to `dispatch-protocol` for a status set and a retry limit that file
  did not carry.

Never present a fix list from an audit as a measured improvement.

**Rewording a rule that asks for something which does not exist.** The Finish rule asks the author to
name a check the agent can run itself, whose result settles whether the work is done. For judgement
work no such check exists. Whether a security review found the vulnerabilities is not mechanically
decidable. So an author supplies the nearest decidable property, which is a count of the parts the
work produced. One entry per changed file. The work can be empty at every part, and the count still
comes out whole.

Four attempts failed, in this order.

- We removed the worked example.
- We named the failure in the skill.
- We gave the author a test.
- We rewrote the rule for judgement work.

The test failed because an author who runs a test can also overrule it. One run ran the test and
described a passing run that misses the vulnerability. It kept the check, and wrote that the gap "is
disclosed here rather than hidden". This defect has survived in at least one run for three
consecutive rounds.

The scope is narrow and worth stating. The bug-triage fixture is clean throughout, because its finish
criteria test the action taken per disposition. The fault appears where the work is a judgement and
the artifact has a natural unit to count.

**A gate the environment cannot satisfy.** Practice 4 gives the numbers. The short form: such a gate
gets cheated, or it blocks delivery, and a fifth rewrite of its wording will not reach that.

**A warning naming the exact loss, and a step written to prevent it.** Round two of `sonnet-exec`
added a sentence naming the item lost in round one. Both fresh runs read the page holding that
sentence, and both dropped the item it named. `writing-agents` then added step 6: write your own list
first, then put back every case the draft lacks. In the isolated round, one run ran step 6 and listed
IDOR and TOCTOU in its own list. It then wrote that "some items were folded into the closing clause".
Folding and recording the fold is not putting back. Both classes were gone from the delivered prompt.

**A conformance audit cannot see content that went missing.** A skill fixes the form of an output and
drops subject content the same model writes unaided. The isolated round counted it on the three
delivered security prompts, against the unaided run.

| Content | Unaided run | Each of the three skilled runs |
| --- | --- | --- |
| Security headers | 1 | 0 |
| Session fixation | 1 | 0 |
| Type confusion | 1 | 0 |
| Privilege escalation | 1 | 0 |
| Trust boundary violations | 2 | 0 |

The triage skill lost the reproduction step, so an agent following it can label a report
unreproducible without trying. One audit passes every one of those drafts, because the rules see only
the container.

**Simplified Technical English changes nothing an agent does.** `tests/outcomes/ste-bench/` ran two
arms, two fixtures and two runs each, scored blind against keys written rounds earlier. The result
was an exact tie on both fixtures, with no false alarms. The predicted length cost was also wrong:
nine words on 949. Adopt the style for the person who maintains the file, and claim nothing more.

**Three results we withdrew or cannot use.** A withdrawn result still teaches, so it stays.

- `sonnet-exec` round one concluded that a pointer costs a weak executor more than a copy does. That
  was wrong. The pointer aimed at a file no commit has ever held, which fails for any model at any
  size. Round two created the file, both runs opened it, and progressive disclosure held. What stands
  is narrower. A pointer whose payload is a block to copy resolves every time. A pointer to a
  procedure to perform resolves to nothing.
- `skills-bench` reported 7 of 7 against a control mean of 6.33. One trap separated the arms, only
  one point was available to win, and the bench ran unblinded. Its real finding was unpredicted:
  three control runs produced three document forms, and three skill-led runs produced one.
- The trigger test ran on 2026-08-11 and cannot answer its question. Both arms scored 36 of 36, with
  zero variance inside each arm. Running it again changes nothing. An earlier version of that
  directory also carried six fabricated run files, and the rule changes they justified were reverted.

### Still open

- Five structural choices have no rule: heading text, reference directory name, file count, default
  values, and filename. Runs keep differing until a rule names them.
- Two of three skilled runs ship no severity tiers, where the unaided run names the signal that
  assigns each tier.
- The gap analysis lists 24 judgement decisions with no stated test, 15 in `writing-skills` and 9 in
  `writing-agents`. No round has measured any of them.
- The two description rules stay, neither justified nor refuted. Settling them needs items near a
  decision boundary and enough trials to see a five percent difference. That is a different test.
- No baseline has run since 2026-08-01, against two skills rewritten on 2026-08-12.
