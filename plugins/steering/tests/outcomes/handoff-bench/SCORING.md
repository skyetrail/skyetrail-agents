# Scoring the hand-off bench

Two instructions compete: prompts/old-prompt.md, the drifted named-agent definition the round 2
comparison started from, and prompts/new-prompt.md, the instruction the writing-agents skill
produced from it, with its one hole filled at dispatch. Both review the same fixture with the
same worker model, at least three runs each, fresh agent every run.

Rules that keep the scores honest:

- The answer key never appears in a runner's prompt, and runners never see each other.
- The scorer is never the runner. The scorer receives one report and the key, maps every
  reported finding to a key id, a decoy id, or neither, and applies the mapping rule from the
  key: same file and same mechanism, or it does not map.
- Counting is arithmetic and belongs to the tally, not to judgment: found is the count of
  distinct key ids mapped, missed is eight minus found, and false alarms is the count of
  findings that map to a decoy or to nothing.
- The winner must find more planted problems without raising more false alarms. Style and
  performance remarks from the old prompt count as false alarms only if presented as findings;
  side notes marked as such are ignored.

Record every run's report and every scoring table under runs/, named by arm and run number.
