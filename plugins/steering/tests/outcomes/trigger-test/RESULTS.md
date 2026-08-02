# Trigger test results

| Arm | Run 1 | Run 2 | Run 3 |
| --- | --- | --- | --- |
| A, description as written, fails both rules | 12 of 12 | 12 of 12 | 12 of 12 |
| B, rewritten to satisfy both rules | 12 of 12 | 12 of 12 | 12 of 12 |

Six runs, identical answers, line for line, including the near miss at request 7 where a
description keying on the words "code review" would have taken a request about performing a review
rather than receiving one. No run took it, in either arm.

## What this settles

A description that our auditor marked a **blocking** failure routes perfectly. Whatever "states the
capability" is worth, it is not worth blocking on, because a document failing it did the job without
a single error in three runs.

The same goes for third person, which our rule marks Important and which two auditors could not
apply consistently to the same sentence.

## What it does not settle

Both arms hit the ceiling, so the test cannot show a difference smaller than its resolution. Twelve
requests against seven skills is an easy routing problem. A larger library, closer descriptions, or
vaguer requests might separate the arms.

That is a real limit and it should temper the conclusion, not erase it. The finding does not depend
on B failing to beat A. It depends on A scoring perfectly while breaking a blocking rule, and no
ceiling effect changes that.

I wrote before the runs that I would cut rather than argue the test was unfair if the result came
back flat. It came back flat.

## What changed as a result

- "The description states the capability" drops from Blocking to Important. It cannot block when a
  description that fails it routes twelve out of twelve.
- "The description is written in the third person" is cut. No measured effect, no consequence ever
  named across ten external audits, and two auditors reached opposite verdicts on one sentence.

Both rules fired in nearly every audit of the external probe, so removing one and demoting the
other also lowers the finding counts that broke our calibration gate, without losing anything we can
show matters.
