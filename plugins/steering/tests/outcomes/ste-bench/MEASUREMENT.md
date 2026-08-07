# Leading indicator: how far is the steering from the STE caps?

Run before the experiment, to size the gap rather than guess it. Reproduce with:

```
node tests/outcomes/ste-bench/measure-sentences.mjs shared/*.md skills/*/SKILL.md
```

## Result

| | count | over cap | share | longest |
| --- | --- | --- | --- | --- |
| Rule cells, cap 20 | 77 | 11 | 14% | 34 |
| Prose sentences, cap 25 | 470 | 64 | 14% | 49 |

Eighty-six percent of the steering already sits inside the caps. Adopting the sentence rules touches
roughly one line in seven, not the wholesale rewrite the cost prediction assumed.

The worst files are `lint.md` at 23% of prose over cap, one skill at 28%, and `steering-rules.md` at
20% of its rules over cap.

## A correction to the first measurement

The first run of this reported 18% of rules and 17% of prose over cap, with a longest sentence of 64
words. Both numbers were wrong and both were wrong in the direction that argues for change.

Two faults in the script. A rule cell often holds two sentences and the script counted the cell as
one. A bullet list has no full stops, so joining the lines and splitting on full stops turned an
entire list into a single 64-word sentence.

Recorded rather than quietly fixed, because it is the same failure this project keeps finding: a
check that does not measure what it appears to measure, producing a number nobody questions. It was
caught by looking at the longest offenders rather than trusting the total.

## What this does to the pre-registered predictions

**It weakens the sentence-cap exemption, before any run.** The design predicted that the 20-word cap
would break a membership test, because a membership test is naturally long. That is not what the
data shows.

Our strongest rule already complies. It reads as two sentences of 19 words each: the membership test,
then the examples marker. The form we arrived at for other reasons is already the form STE asks for.

The one genuinely long rule is the category rule itself, at 34 words, and it splits without loss:

> Where a category of work is named, define what makes something a member. Mark any list of kinds as
> examples, rather than leaving it to read as the whole set.

Thirteen words and seventeen. Nothing is lost.

So the exemption stands only if a run shows the split causing the failure it predicts. On this
evidence I expect it will not, and the honest thing is to say so now rather than after.

**The one-instruction-per-sentence exemption is withdrawn as a blocker.** Pete's call: relax the rule
where it hurts rather than exempt the project from it. It stays on the list as something to watch,
not as a reason to refuse the standard.

**Two exemptions remain live.** The fixed verb list, which would collapse lint and audit into one
word, and the imperative mood, which would turn a property an auditor tests into an order it follows.
Neither is touched by this measurement.
