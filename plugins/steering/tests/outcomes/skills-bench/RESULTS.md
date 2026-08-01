# Skills bench results

The question: does a skill written by `writing-skills` change what a later agent produces, and does
the tool show restraint about what it teaches. The hand-off benches tested `writing-agents`. This
one tests `writing-skills`.

Worker model was the same throughout. Three runs per arm. Every run scored by a separate agent
that saw one set of release notes and the key, and nothing else.

## Traps avoided

| Run | Control, no skill | Produced skill |
| --- | --- | --- |
| 1 | 6 of 7 | 7 of 7 |
| 2 | 6 of 7 | 7 of 7 |
| 3 | 7 of 7 | 7 of 7 |
| Mean | 6.33 | 7.00 |

The produced skill takes the maximum available. One trap separated the arms, T7, where the control
arm twice invented a version number for a release the source never numbered. The produced skill
leaves a bracketed placeholder for a person to fill.

This is the whole headroom the fixture had, and that was known and written down before the produced
skill was seen. Do not read 6.33 to 7.00 as the measure of what the tool is worth. Read it as the
fixture being close to exhausted.

## Consistency, which no trap scores

Section headings across the six runs, in the order each run used them.

| Run | Headings |
| --- | --- |
| Control 1 | Security, Changes, Improvements, Fixes |
| Control 2 | Security, Changes, Fixes, Performance |
| Control 3 | Security, Improvements, Fixes, Changed |
| Produced 1 | Security, Breaking Changes, Improvements, Bug Fixes |
| Produced 2 | Security, Breaking Changes, Improvements, Bug Fixes |
| Produced 3 | Security, Breaking Changes, Improvements, Bug Fixes |

Three control runs, three different shapes, with only Security common to all three. Three produced
runs, one shape, three times.

There is a customer-visible point inside that, not only a tidiness one. The breaking flag rename
lands under a heading called "Changes" or "Changed" in the control arm and under "Breaking Changes"
in the produced arm. The key scores T3 as avoided in both, because in both arms the bullet text does
tell the reader to update their scripts. But someone skimming headings to find out whether this
release breaks their automation finds it at once in one arm and has to read every bullet in the
other. The key measures whether the warning exists. It does not measure whether anyone will find it.

So the strongest real difference between the arms is one the scoring could not see. The traps were
written to test judgment about what to leave out. The skill's main contribution turned out to be
something else.

## What the skill did not fix

All three produced runs used the same headings, but not the same heading for the same change. The
upload retry is filed under Improvements in run 1 and under Bug Fixes in runs 2 and 3. The shape of
the document is fixed; which bucket a given change falls into is not. A reader comparing two
releases still sees the same kind of change in two different places.

Only visible because the same task ran three times. One run would have looked like a clean result.

## Discipline

The measure, written before the produced skill was seen: does the tool teach only what its own
baseline showed was missing, per its step 4, "address only the failures from step 1, nothing the
model already gets right".

The producing agent ran four baselines rather than the one asked for, on the stated reasoning that
the complaint behind this skill is inconsistency between attempts and one sample cannot show
inconsistency. That was its own call and it was the right one.

Those baselines showed six of the seven traps handled correctly every time, and two real failures:
invented version and date written in as settled fact, and a differently shaped document every run.
The skill addresses both failures and teaches none of T1, T3, T4, or T5, which are the four most
lesson-shaped traps in the set. On the main measure, the tool showed restraint.

One judgment call against it. Step 1 of the produced skill tells the reader to keep only merged,
customer-visible rows, which covers T2 and T6, both of which the baseline showed the model already
handles. Read strictly that is teaching something already known. Read fairly, a workflow for turning
a ship log into release notes cannot have a first step that does not say which rows to use. Scored
as structural rather than redundant, and recorded here as a call someone else might make differently.

## A broken blind

Every run file opens with a line naming its arm, for example "Skills bench: produced-skill arm,
run 3". So every scorer knew which arm it was scoring. The blind was broken for all six runs,
including the control arm scored earlier.

Found by the third scorer, which flagged the header as harness labelling and said it had treated
that line as non-content. It was not asked to look for this.

How much it costs: less than it would in a bench scored on judgment, because the traps are
mechanically checkable and every scorer quoted the words that decided each call. The T7 calls can be
confirmed by eye. The control runs say "Harbour 4.3.0" and the produced runs say "[VERSION]". A
generous scorer cannot turn one into the other. But a scorer that knows which arm it is holding is
not blind, and any trap needing a judgment call is now weaker evidence than it looks.

Not repaired by rescoring, because rescoring with the same key and the same model would mostly
reproduce the same mechanical calls and would buy false confidence. Recorded instead, and the fix
for any later bench is that a run file carries an opaque identifier and the mapping from identifier
to arm lives somewhere the scorer cannot read.

This is the third method error in this project, after the missing tenth problem in the second
hand-off fixture and the wrong T7 wording in this key. All three were found by a worker disagreeing
with the harness rather than by the harness checking itself, which is worth noticing on its own.

## What this bench supports

The produced skill scores at the fixture's ceiling, removes the one failure the control arm
repeated, and makes three runs of the same task produce the same document instead of three
different ones. The tool that wrote it addressed the failures its baseline actually showed and
left alone the six things the model already did well.

## What it does not support

The trap margin is two thirds of a point on a fixture with one point of headroom, so it is close to
no evidence on its own. The consistency result is the stronger finding and it was measured after the
fact, not predicted. The blind was broken. One fixture, one task, one worker model, three runs an
arm. Nothing here says anything about tasks the model handles badly, which is where a skill should
help most and where this fixture, by scoring 6.33 unaided, shows it was never testing.
