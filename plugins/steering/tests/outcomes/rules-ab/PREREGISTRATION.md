# Did four audit rounds make the rules better?

Written and committed before any audit ran. Results go in `RESULTS.md`. Nothing here gets edited
afterwards.

## The question Pete asked

Four rounds of audit and fix ran against this plugin's own nine files. They retired 144 findings and
created 67. Every one of those numbers came from auditing our files against our rules. That measures
whether our files satisfy our rules. It cannot separate "conforms to our house style" from "is
better".

The external probe already showed this is not a theoretical worry. Its calibration gate fired on ten
audits out of ten, seven files out of seven, and its own conclusion reads: the gate "never fired
during six internal rounds because our own files match our own style".

So: do the rules as they stand now produce better audits than the rules before those four rounds, on
work we did not write?

## Arms

Two complete snapshots of `plugins/steering/`, both `shared/` and `skills/`, because the rounds
changed both and an auditor uses both.

- **alpha**, commit `7deb2ae`, before round one's fixes. 540 lines of shared rules.
- **beta**, commit `0fa59cb`, after round four's fixes. 619 lines of shared rules.

All nine files differ between the two. Which letter is which stays out of every prompt and out of
the scorer's input.

## Fixture

Jesse Vincent's `superpowers`, pinned at `44c9b2d6e889982ac18c27d05a19fefe335194e1`, the same commit
the external probe used. The whole repository, all fourteen skills, cloned rather than sampled.

The earlier probe sampled seven of fourteen and severed four cross-references that resolve upstream.
Three blocking findings against another author's work were void as a result. The full clone exists
to stop that repeating. It is not vendored into this repository.

## Targets

- `receiving-code-review`. Pete named it, and the earlier probe recorded two audits of it faulting
  its description in opposite directions. That makes it the case where alpha has a known weakness.
- `using-git-worktrees`. From the earlier probe's blind sample, with no recorded problem. It is here
  so the result does not rest on a target chosen because alpha failed it.

Two targets, two arms, two independent auditors each. Eight audits.

## Measures

No answer key. Writing one puts the author of the rules back in charge of deciding what counts,
which is the bias this test exists to escape. Every measure below reads the audits themselves or
checks them against the target text.

1. **Reproducibility.** Within a pair, do the two auditors fail the same rules, at the same
   severity, on the same text? Disagreement is the measure, and it needs no ground truth. This is
   the primary measure.
2. **Void findings.** A finding that misstates the target: calls something absent that is present,
   or cites a line that says something else. Checkable against the target by reading it.
3. **Consequence naming.** Of the findings marked blocking, what share name a consequence a reader
   can restate without the rule in front of them? Beta added the defect and difference distinction
   for this. Alpha has it too, in an earlier form.
4. **Volume.** Findings per audit. `TEST_REPORT.md` records alpha-era audits returning 9, 9 and 16
   findings against a threshold of 5, so over-escalation is a live failure mode.

## Predictions

Written now so they can be wrong.

- Reproducibility: **beta better.** The conditions are decidable in beta and were not in alpha. Two
  round-two audits split on hand-off for the same kind of file, and beta settles it. Confidence:
  moderate.
- Void findings: **no difference.** The void findings in the earlier probe came from a broken
  fixture, not from the rules. The fixture is whole this time. Confidence: high.
- Consequence naming: **beta better.** Confidence: moderate.
- Volume: **beta lower.** Beta states a default outcome and requires pointing at the text.
  Confidence: low, because beta also has more rules to fail.

**A null result is a real outcome.** Four rounds may have improved only the internal consistency of
files we read to each other, and changed nothing about an audit of somebody else's work. If the
pairs score alike, that is the finding, and it goes in `RESULTS.md` in those words.

## What this cannot show

Eight audits over two targets detects a large difference, not a small one. No result here says
anything about whether skills written with these rules are better, which needs the baseline loop and
is a separate piece of work.

Neither arm's audits get to judge the other. The scorer never sees the rule files.

## Procedure

1. Each auditor receives one rules directory, one target, and no statement of which arm it is in.
2. Reports are written to neutral identifiers that do not encode the arm.
3. A scorer that never sees the rule files or the arm map receives the target and the reports,
   grouped into pairs, and reports agreement within each pair plus any finding it can show misstates
   the target.
4. The arm map is opened after scoring.
