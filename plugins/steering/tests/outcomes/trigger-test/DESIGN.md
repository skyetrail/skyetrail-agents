# Trigger test: do our description rules do anything?

Written before the runs.

## The question

Two of our description rules fired on almost every file in the external probe:

- The description states the capability, in the words someone looking for it would use. **Blocking.**
- The description is written in the third person. **Important.**

Neither ever named a consequence, and the two audits of `receiving-code-review` returned opposite
verdicts on both, reading the same sentence. So we have a blocking rule and an important rule that
we cannot show change anything, and that two careful readers cannot apply consistently.

Triggering is measurable. If a description that breaks both rules is chosen as reliably as one that
follows them, the rules are decoration and should go. If the rewritten one wins, they are earning
their place and the probe's finding counts were right to include them.

## Design

Twelve requests, six that should select the skill and six that should not. An agent sees seven skill
descriptions and picks the one that applies, or none. Three runs per arm.

The only thing that differs between arms is the wording of one description. Every other
description, the request set, and the instructions are identical.

**Arm A**, the description as written, which our rules fail:

> Use when receiving code review feedback, before implementing suggestions, especially if feedback
> seems unclear or technically questionable - requires technical rigor and verification, not
> performative agreement or blind implementation

**Arm B**, rewritten to satisfy both rules: a third-person capability clause first, then the same
trigger conditions, then the same stance.

> Evaluates code review feedback and decides what to implement, what to question, and what to push
> back on. Use when receiving code review feedback, before implementing suggestions, especially if
> the feedback seems unclear or technically questionable. Requires technical rigor and
> verification, not performative agreement or blind implementation.

The two rules are tested together rather than separately. Four arms would separate them and this is
not worth four arms; the practical question is whether a description rewritten to satisfy our rules
is chosen more often than one that ignores them.

## Scoring

Per run: correct selections out of twelve. A hit on a should-not-trigger request counts against.
Maximum 12.

## What each outcome means

**B beats A.** The rules earn their place. Their findings in the probe were real, and the counts
were not inflated by them.

**No difference.** Neither rule changes what gets selected. A blocking rule that changes nothing is
the clearest case for cutting there is, and it takes the important one with it.

**A beats B.** Our rules are actively harmful and the file we audited was better than our advice.

## Recorded before the runs

I expect a small gain for B, mostly on the vaguer requests, and no difference on the obvious ones.
If the result is no difference I will cut both rules rather than look for a reason the test was
unfair.
