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
