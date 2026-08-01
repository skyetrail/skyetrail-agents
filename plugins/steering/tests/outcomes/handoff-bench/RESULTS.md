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
