# Hand-off bench, round 1 results

Six runs, three per arm, same fixture and same worker model, fresh agent every run. Every report
was scored by a separate agent that saw the report and the key and never the fixture source.

| Run | Old prompt found | Old false alarms | New prompt found | New false alarms |
| --- | --- | --- | --- | --- |
| 1 | 7 of 8 | 2 | 7 of 8 | 1 |
| 2 | 8 of 8 | 3 | 7 of 8 | 1 |
| 3 | 8 of 8 | 4 | 6 of 8 | 1 |
| Mean | 7.67 | 3.0 | 6.67 | 1.0 |

## The verdict

The produced hand-off does not win. The bench's criterion is more planted problems found without
more false alarms. The produced prompt cuts false alarms to a third of the old prompt's, run
after run, but it finds one fewer problem per run. On the stated criterion that is a loss.

## Why the produced prompt missed

**The scope clause is narrower than the category it names.** It defines injection as "SQL,
command, template, or path", and run 3 filed the reflected HTML injection under "noticed but out
of scope" for not matching any listed subtype. The instruction talked a competent reviewer out of
reporting a real vulnerability it had already found. Runs 1 and 2 reported it, so the clause does
not always suppress the finding, which makes it worse: the same instruction gives different
answers on the same defect.

**The log finding is a shared blind spot, not a prompt defect.** Secrets written to a log were
missed by both arms in run 1 and by the produced prompt in all three. The old prompt caught it
twice. Nothing in either instruction points a reviewer at log statements as a place secrets
leak.

## Why the old prompt's noise is real

Its false alarms rose with its detection: 2, then 3, then 4. The extra claims drift from
plausible to speculative, ending in run 3 with a "dead secret" that is really dead-code
commentary and an ownership check invented for a route whose actual defect it had already
reported. An open-ended instruction to be thorough buys recall and noise together.

**Both arms attacked the same decoy in every run.** The differently styled authorization check is
named in the produced prompt's own calibration section as something that does not count, and it
was reported as a problem six times out of six. A calibration example alone does not stop a
reviewer that has already decided something looks wrong.

## What round 2 changes

One change per cycle, then re-run and re-score.

1. Widen the injection enumeration and make it explicitly non-exhaustive, so an obvious injection
   class that is not on the list is reported rather than exiled to a side note.
2. Name log statements as a place secrets appear, in the secrets clause.
3. Make the decoy rule an instruction rather than an example: an access check that is present but
   written differently from its siblings is not a finding, and a missing ownership check is only a
   finding where the codebase shows ownership checks elsewhere.

Item 1 is the one the evidence supports most strongly, since it is the only case where the
instruction demonstrably suppressed a correct finding.

---

# Cycle 1: one change, three runs

The round 1 evidence pointed at three edits: define injection by mechanism with subtypes as
examples rather than a closed list, name logs and error messages in the secrets clause, and turn
the decoy example into an instruction with a test. All three went in, then three fresh runs on
the same fixture with the same model, scored the same way.

| Run | Found | False alarms |
| --- | --- | --- |
| 1 | 7 of 8 | 0 |
| 2 | 7 of 8 | 0 |
| 3 | 7 of 8 | 0 |
| Mean | 7.0 | 0.0 |

| Arm | Found | False alarms |
| --- | --- | --- |
| Old prompt, round 1 | 7.67 | 3.0 |
| Produced prompt, round 1 | 6.67 | 1.0 |
| Produced prompt, cycle 1 | 7.0 | 0.0 |

Every arm returned the same numbers, which is itself worth noting: three independent runs of the
revised instruction agreed exactly, where round 1 varied by two findings across its runs.

## What moved

**The scope fix worked.** All three runs report the reflected injection as a finding. In round 3
of the previous round the same prompt had filed that same defect under "noticed but out of
scope" because its subtype was not on the list. Defining the category by mechanism removed the
suppression.

**The decoy fix worked.** No run flagged the differently styled authorization check. Every run in
both arms of round 1 flagged it, six times out of six. Turning the calibration example into an
instruction with a test changed the behaviour completely.

**The log fix did not work.** Secrets written to a log is still missed in all three runs, even
though the secrets clause now names logs and error messages explicitly. Naming the category was
not enough.

## Where it stands against the old prompt

The produced prompt now finds within one of the old prompt's average while raising zero false
alarms against its three. It still does not beat it on the stated criterion, which is more found
without more false alarms, because 7.0 is below 7.67. One planted problem separates them, and it
is the same one in every run.

---

# Cycle 2: name the pattern, not the category

Cycle 1 left one miss: secrets written to a log, missed in all three runs even after the secrets
clause named logs and error messages. The category was named and the finding still did not
appear, so cycle 2 named the pattern instead. The clause now says to check what every log and
error call passes, and states that passing a whole request, session, user, or config object is a
finding because the fields inside it are not visible at the call site. The calibration lists that
pattern as counting.

| Run | Found | False alarms |
| --- | --- | --- |
| 1 | 8 of 8 | 0 |
| 2 | 8 of 8 | 0 |
| 3 | 8 of 8 | 0 |
| Mean | 8.0 | 0.0 |

All three runs found every planted problem, avoided every decoy, and invented nothing.

Every run reports the log finding, and each gives the reason the instruction supplies: the fields
inside a passed object are not visible where the call is written.

# The whole bench, in order

| Arm | Found | False alarms |
| --- | --- | --- |
| Old prompt | 7.67 | 3.0 |
| Produced prompt, round 1 | 6.67 | 1.0 |
| Produced prompt, cycle 1 | 7.0 | 0.0 |
| Produced prompt, cycle 2 | 8.0 | 0.0 |

The produced hand-off now beats the old prompt on the stated criterion: more planted problems
found, and fewer false alarms. It took two cycles, and each change was tied to a scored failure
rather than to an opinion.

## What the bench proved that the audits could not

The audits passed the round 1 prompt every time, because it was consistent with the rules. The
bench found it telling a competent reviewer not to report a real vulnerability. A scope clause
that listed injection subtypes made a reviewer file a reflected injection under "noticed but out
of scope", which is a defect no amount of rule checking can see, because the instruction was
wrong about the world rather than wrong about the rules.

Two lessons transfer beyond this fixture.

**Define a category by its mechanism, not by a list of its members.** A list invites a reviewer
to treat anything absent from it as out of scope, and the reviewer will be right to, because that
is what a list means.

**Name the pattern, not the category, when a finding keeps being missed.** "A secret written to a
log" did not work. "A whole session object passed to a log call, because the fields inside it are
not visible at the call site" worked on the first try, three times out of three.

## Cost

Each bench round is six agent runs plus six scoring runs. The runs came in around 50 to 70
thousand tokens each and the scoring runs around 49 thousand, so a full round of three arms with
scoring is roughly 350 thousand tokens.

---

# Cycle 3 regression check

Cycle 3 changed the secrets clause to fix a failure found on the second fixture. This run checks
that the change cost nothing here.

| Arm | Found | False alarms |
| --- | --- | --- |
| Produced, cycle 2 wording | 8 of 8 | 0 |
| Produced, cycle 3 wording | 8 of 8 | 0 |

No regression. The log secrets finding that cycle 2 recovered is still reported under the cycle 3
wording, which matters because cycle 3 replaced the tightly named log pattern with a broader
definition and kept the pattern only as an example. Both decoys the report touched were cited as
evidence of safety rather than flagged as problems.

Running this check is the step that was skipped after cycle 2. Skipping it is why a defect
introduced by the cycle 2 fix survived until a second fixture found it.

---

# Where the whole bench ended

| Arm | Fixture one | Fixture two |
| --- | --- | --- |
| Old prompt | 7.67 found, 3.0 false alarms | 8 of 9, 5 false alarms |
| Produced, round 1 | 6.67, 1.0 | not run |
| Produced, cycle 1 | 7.0, 0.0 | not run |
| Produced, cycle 2 | 8 of 8, 0 | 7 of 9, 1 |
| Produced, cycle 3 | 8 of 8, 0 | 8 of 9, 1 |

Both fixture two false alarms in the produced rows are the same real vulnerability, which the key
does not list. On the code as it stands, cycle 3 finds nine of ten real problems on fixture two
and eight of eight on fixture one, and invents nothing on either.

Three rounds of runs, twenty-one scored reviews, one loss, two fixtures, and one error found in
the key itself.
