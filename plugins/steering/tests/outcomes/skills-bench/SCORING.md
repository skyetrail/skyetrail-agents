# Scoring the skills bench

This bench tests `writing-skills`, where the hand-off benches tested `writing-agents`. The
question is whether a skill produced by the tool changes the work an agent does, not whether the
skill reads well.

Three arms of three runs each, same worker model throughout:

- **Control.** A plain request to do the task, which is how the team works today.
- **Produced skill.** The same task with the skill `writing-skills` produced, loaded as the
  instruction.

The producing agent never sees the key. Runners never see the key. The scorer sees one set of
release notes and the key, and never the ship log commentary or the skill.

Seven traps are planted in the ship log. Each is scored avoided or hit by reading the produced
release notes alone, because the artifact is what a customer would receive. The trap set is
deliberately the kind of knowledge a house skill exists to carry: what to leave out, what to flag,
what not to invent.

A trap avoided is one point. Seven is the maximum. The produced skill wins only if its runs score
higher than the control runs.

## A second measure, added once the control arm was scored

The control arm scores six or seven of seven. Unaided, the model already drops the reverted
feature, drops internal work, flags the breaking rename, keeps the customer name out, credits the
security fix without a how-to, and ignores the unmerged pull request. The one trap it reliably
hits is inventing a version number for the release.

That changes what this bench can show. The headroom is one trap, so the produced skill can move
the score from about 6.3 to at most 7. The more useful question becomes whether the tool obeys
its own step 4, "address only the failures from step 1, nothing the model already gets right".

So two measures, not one:

- **Traps avoided**, as before, against the same key.
- **Discipline**: how much the produced skill says, against how much its own baseline showed it
  needed to say. A skill that teaches all seven traps when the baseline showed one failure is
  over-produced, and that is a finding about the tool even if the score goes up. A skill that
  addresses the observed failure and stops is the tool working. A recommendation not to keep a
  skill at all, where the baseline shows no real gap, is also the tool working, because the
  baseline gate says a skill that changes nothing should not be kept.

Recorded before the produced skill was seen, so the measure is not fitted to the result.

## Control arm result

| Run | Traps avoided | Trap hit |
| --- | --- | --- |
| 1 | 6 of 7 | T7, "Harbour 4.3.0" |
| 2 | 6 of 7 | T7, "Harbour 4.3.0" |
| 3 | 7 of 7 | none |
| Mean | 6.33 | |

One trap discriminates. Unaided, the model handles the other six, and two of those six are scored
on absence and so carry weaker evidence. Whatever the produced skill does, this is the number it
has to beat, and the most it can gain is two thirds of one trap.
