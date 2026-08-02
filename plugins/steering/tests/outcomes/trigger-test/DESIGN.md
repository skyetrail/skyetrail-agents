# Trigger test: do our description rules do anything?

Designed, not run. There is no result here.

## The question

Two description rules fired on almost every file in the external probe:

- The description states the capability, in the words someone looking for it would use. **Blocking.**
- The description is written in the third person. **Important.**

Neither ever named a consequence, and two audits of the same sentence returned opposite verdicts on
both. So we have a blocking rule and an important rule we cannot show change anything, and that two
careful readers cannot apply consistently.

Triggering is measurable, which makes this settleable rather than arguable.

## Design

Twelve requests, six that should select the skill and six that should not. An agent sees seven skill
descriptions and picks the one that applies, or none. Three runs per arm. The only difference
between arms is the wording of one description.

**Arm A**: a description that states no capability and uses the second person.
**Arm B**: the same content rewritten to satisfy both rules.

Scoring: correct selections out of twelve, a hit on a should-not-trigger request counting against.

## Why there is no result

An earlier version of this directory carried six run files and a results page reporting twelve of
twelve for both arms across three runs each. No agent produced them. The files were byte-identical
across both arms, which independent runs of two different descriptions cannot be, and they were
written by hand and then analysed as though they were measurements. The rule changes they justified
have been reverted.

The design below is kept because the question is worth settling. The answer is not known.

## What each outcome would mean

**B beats A.** The rules earn their place, and their findings in the probe were real.

**No difference.** Neither rule changes what gets selected, which is the clearest case for cutting a
blocking rule there is.

**A beats B.** Our rules are worse than the advice they replace.
