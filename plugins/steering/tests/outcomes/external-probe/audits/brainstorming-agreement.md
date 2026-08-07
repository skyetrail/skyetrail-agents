# Agreement: brainstorming, runs A and B

Counts: A returned Blocking 6, Important 6, Advisory 0. B returned Blocking 4, Important 8,
Advisory 0. Twelve findings each, and the totals hide how differently they got there.

## Fitness for use: agreed

Both concluded the file needs work before use. Three pairs, three agreements, on the only measure
that decides anything.

## Shared blocking findings: three

Both found the broken `visual-companion.md` reference, the missing baseline record, and that
nothing stops the Spec Self-Review from being cleared by deleting the thing it flagged rather than
fixing it.

## Four direct contradictions on the same text

Not different coverage. Opposite verdicts on the same lines.

| Rule | Run A | Run B |
| --- | --- | --- |
| Category defined by membership, at line 13 | **Fail** — "any implementation skill" is two examples plus "or any other", with no test | **Pass**, explicitly — closes with the catch-all "or take any implementation action" and "is fine" |
| Nothing explains what the model already knows, at lines 90-95 | **Fail** — restates single responsibility and encapsulation as if novel | **Pass** — tied to a specific, non-obvious rationale each time |
| One term used for one thing | **Pass** — one artifact, never acted on wrongly | **Fail** — "design doc", "spec", "written spec", "the spec document" drift across eight citations |
| Unbounded revision loop | **Blocking** | **Important**, and marked warn |

B also failed the category rule on the description's trigger list at line 3, which A did not examine
under that rule. So on one rule the two runs disagreed about line 13 and covered different text at
line 3, at the same time.

## What three pairs now show

Every pair agreed on fitness for use. No pair agreed closely on why.

The variance has two distinct shapes and our reconciliation rule only handles one.

Different coverage, where one run examined text the other never reached. Seen in
`finishing-a-development-branch`, where A checked the environment table and B checked the test
runners. The rule handles this correctly: the union is better than either, and a one-reporter
finding becoming a warn is a reasonable way to carry it.

Direct contradiction, where both examined the same line and returned opposite verdicts. Seen once in
`receiving-code-review` and four times here. The rule handles this badly. It turns two opposed
readings into a warn that says the auditors could not agree, which is weaker than what actually
happened. Two careful readers reaching opposite conclusions about one sentence is itself evidence
about that sentence, and stronger evidence than either verdict alone.

## The line-13 contradiction is worth keeping

A read "or any other implementation skill" as a bare list with no membership test. B read the same
construction as a working catch-all and passed it.

Both readings are defensible, which is the point. Our rule says a list of kinds must be marked as
examples or given a membership test. It does not say whether a trailing "or any other X" satisfies
that. Two auditors filled the gap in opposite directions.

That is a defect in the rule's wording, not in either auditor, and it would never have surfaced
against our own files, because we write the catch-all form deliberately and consistently.
