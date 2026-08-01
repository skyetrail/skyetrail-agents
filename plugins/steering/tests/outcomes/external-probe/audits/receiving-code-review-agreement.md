# Agreement: receiving-code-review, runs A and B

Counts: A returned Blocking 4, Important 5, Advisory 1. B returned Blocking 5 with 2 warns,
Important 3 with 2 warns, Advisory 0 with 2 warns.

## Fitness for use: agreed

Both concluded the file needs work before use. Two for two across the probe on the measure that
matters most.

## Four blocking findings shared

Both found: no out-of-scope statement; no baseline-comparison record; the six reasons to push back
read as the whole set; nothing names a check that settles whether a fix is done, and nothing forbids
weakening it.

## A direct contradiction on the same sentence

This is not two readers covering different ground, which is what the other pair showed. On one
frontmatter line, the two audits reached opposite verdicts on two rules.

The line: `Use when receiving code review feedback, before implementing suggestions, especially if
feedback seems unclear or technically questionable - requires technical rigor and verification, not
performative agreement or blind implementation.`

| Rule | Run A | Run B |
| --- | --- | --- |
| Description states the capability (Blocking) | **Pass**, reading the clause after the dash as the capability | **Fail**, reading every clause as a trigger or a requirement, none stating what the skill does |
| Description written in third person (Important) | **Fail**, "Use when" is imperative | **Pass**, "Use when" matches the field's established idiom |

Each audit passed exactly one of the two and failed the other, in opposite directions.

On the merits, B is more defensible on capability: "requires technical rigor and verification"
describes what the skill demands of the reader, not what it does or produces. A is more defensible
on third person: our own skills open "Audits", "Writes", "Establishes", and B's appeal to an
established idiom is a different standard from the one our rule states.

So each run got one right and one wrong, and a single audit would have shipped one wrong verdict on
a blocking rule either way.

## What this costs the reconciliation rule

Our rule says a finding both report is a finding, a finding only one reports becomes a warn carrying
both readings, and severity is the higher of the two. That handles the case where one reader sees
something the other missed.

It does not handle this case. Here both readers examined the same sentence and returned opposite
verdicts, so reconciliation produces a warn on capability and a warn on third person, which is
weaker than the truth. Something is wrong with that line and the reconciled report would say only
that the auditors could not agree.

The rule needs a case for direct contradiction on the same text, distinct from one-reporter
findings. Two readers disagreeing about what a sentence says is stronger evidence that the sentence
is unclear than either verdict is on its own.

## An independent check on the earlier factual error

Run B recorded that there is no repo-setup block in our `AGENTS.md` and that the fallback therefore
applies. That is correct, and it independently confirms that the `writing-plans` auditor's claim to
have read the command from such a block was false.
