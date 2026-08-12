# Does Simplified Technical English make better steering? Results

Read `DESIGN.md` for the predictions, `MEASUREMENT.md` for the leading indicator, and
`EQUIVALENCE.md` for the gate that rejected the first rewrite. Read the contamination section at the
bottom before believing any qualitative claim here.

## The scored result

Two arms, two fixtures, two runs each. Every run scored blind against a key written rounds ago, by
scorers who did not know which arm they held.

| Fixture | Report | Found | Missed | False alarms |
| --- | --- | --- | --- | --- |
| 1 | Arm A run 1 | 8 of 8 | 0 | 0 |
| 1 | Arm A run 2 | 8 of 8 | 0 | 0 |
| 1 | Arm B run 1 | 8 of 8 | 0 | 0 |
| 1 | Arm B run 2 | 8 of 8 | 0 | 0 |
| 2 | Arm A run 1 | 8 of 9 | J9 | 0 |
| 2 | Arm A run 2 | 8 of 9 | J9 | 0 |
| 2 | Arm B run 1 | 8 of 9 | J9 | 0 |
| 2 | Arm B run 2 | 8 of 9 | J9 | 0 |

An exact tie, twice. Every run on fixture 2 also found the unlisted tenth problem the key's errata
describes, and every run missed the same J9 for the reason the errata predicts.

**Simplified Technical English changed nothing an agent did.** That was the prediction and it held.

## The predictions, scored

| Prediction | Outcome |
| --- | --- |
| No meaningful change in problems found or false alarms | **Correct.** Exact tie on both fixtures. |
| STE adds 20 to 40 percent in length | **Wrong.** It added 9 words on 949, about one percent. It splits long sentences rather than adding material. |
| The 20-word cap breaks a membership test | **Wrong, before the runs.** Our strongest membership rule already complies at 19 plus 19 words. The one long rule splits at 13 and 17 without loss. |
| One instruction per sentence breaks a disjunction | **Untested.** Withdrawn as a blocker by Pete's call: relax the rule where it hurts rather than exempt the project. |
| The fixed verb list collapses lint and audit | **Untested.** This prompt does not use those words. |
| The imperative mood turns a property into an order | **Untested.** This prompt is already imperative; the risk is to rule tables, which this bench does not cover. |

Three of six predictions were mine and wrong. Two of the four exemptions I asked for cannot be
claimed from this bench at all.

## What the leading indicator settled

Eighty-six percent of the existing steering already sits inside the STE caps: 11 of 77 rule cells
over 20 words, 64 of 470 prose sentences over 25. Adopting the sentence rules touches about one line
in seven.

The first version of that measurement was wrong, and wrong in the direction that argued for change.
It counted a two-sentence rule cell as one sentence and joined bullet lists into single long
sentences. Recorded in `MEASUREMENT.md`.

## The equivalence gate did the work

The first STE rewrite was **not equivalent**. It changed a checklist item from attesting that the
target is readable to attesting that the reader read it, raised the bar on what belongs in the
out-of-scope section, and dropped a strictness marker. The first of those could have changed how
much of a fixture a run covers, and so could have moved the score.

Four runs against that version were labelled a pilot and never scored. They have since been deleted;
see `EQUIVALENCE.md` and `../../README.md`. The rejected prompt itself stays at
`prompts/ste-prompt.md` and `prompts/ste-prompt-fixture2.md`, which is what keeps the gate's verdict
checkable.

Without this gate the experiment would have compared a clearer prompt against a longer one and
reported the difference as a style effect. The rewrite was mine and I believed it was faithful.

## Contamination: the qualitative findings are not usable

Both scorers were asked to report differences the key does not measure. Both did, and much of what
they found was written by me rather than by the runs.

The run files in `runs/` are **summaries I wrote from each agent's report**, not the raw output. In
writing them I made choices the scorers then read as data:

- I wrote the line "Credential value withheld in every section" into three Arm B summaries. The
  blinding stripped the arm header above it and left that line in place. The fixture 2 scorer read
  it as a property of those reports and noted that only Arm B reports declared a withhold.
- I wrote a literal secret value into one Arm A summary and not into others. The same scorer read
  that asymmetry as a behavioural difference between reports.
- I wrote the phrase "Named a boundary" into one Arm B summary. The scorer credited that report with
  naming a boundary the others did not.

So the credential-handling comparison, the boundary-declaration comparison, and anything resting on
the opening lines of a report measure my summarising, not the arms. They are void.

Earlier in this session I reported a running tally showing Arm B leaking credential values more
often than Arm A, and called it worth watching. That tally was built on the same summaries. It is
withdrawn.

**What survives.** The scored counts. Those come from the findings lists, which I transcribed
faithfully, and both scorers quoted the words that decided every call. The severity observations
also survive on fixture 1, because the severities are in the transcribed lists: the `db.js` finding
came back MEDIUM in one run of each arm and CRITICAL in the other run of each arm. That is
within-arm variance, not a style effect.

**Why this happened.** Two hours before this bench, the external probe was found to exist in the
repository only as prose I had written, and `METHOD.md` gained a practice about keeping the raw runs
rather than the summary. I then built this bench out of summaries. Knowing a rule and applying it
are different acts, which is the fourth time today that gap has produced a defect.

The raw agent reports for these runs exist in the session's task files. They were not captured, and
by the time this was noticed the runs were already scored.

## What this bench supports

STE does not change what an agent finds, on two fixtures, with two runs per arm, against keys
written before STE was considered. It costs about one percent in length. Eighty-six percent of the
existing steering already complies.

On that evidence, adopting it for readability costs nothing measurable in agent behaviour. That is
the whole case, and it is enough, because readability was settled separately by the person who reads
these files.

## What it does not support

Any claim about the four exemptions. Two were never tested here and one was withdrawn.

Any qualitative comparison between the arms, for the reason above.

Any claim beyond two fixtures, two runs, one worker model, and one task type. A security review is
one kind of work. Nothing here says what STE does to a skill, a rules table, or a hand-off brief.
