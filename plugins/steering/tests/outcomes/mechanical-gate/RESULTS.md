# The mechanical gate

The audit command gained a prompt scope on 2026-08-21, so a produced prompt can be checked by a
script. `writing-agents` then began telling a run to write its checklist to `record.md` beside the
artifact and to run that command on what it delivered. This round asks whether a caller who re-runs
the same command gets the same answer.

## What ran

The security-prompt fixture ran in isolated Sonnet runs, three of them, each in its own directory.
A judge then acted as the caller. It ran `npm run audit` on each delivered prompt itself and
compared every line with what the run had pasted into its record.

## Caller and callee agreed

In every run the caller's output matched the callee's final pasted block line for line. Each
delivered prompt returned five passes and no failures on the prompt scope. One run had pasted two
blocks, the first showing the tick check as not applicable before `record.md` existed and the
second showing it pass. Another had pasted three, the middle one carrying an advisory about a tick
the run then fixed. The final block matched in each case.

## The tick residual closed

Unanchored ticks went from six in the first diet round to two in the second and to zero of 27 here.
The two that had survived both anchored in the rule files. All three runs now anchor that step in
the delivered prompt's own sections, which is what the tightened preamble asks for.

## What held

A dispatchable prompt was delivered in every run. Every prompt treats its input as data and makes
a steering attempt a finding. Every prompt states the four statuses with a column for what the
caller must do, and a retry limit of two attempts. No prompt ends on a count of produced parts.

## What did not

One run triggers its finish gate on the agent's own pre-triage list of relevant hunks rather than
on a property of the raw input. That list is a product of the run, so a run that classifies a file
as irrelevant never has to clear it. This is the shape the determinism rounds named as the weakest
of the three, and no script can tell a self-built set from an input property. It stays with the
reader.

One run left a literal placeholder in the part of its template that the caller sends, so a caller
who checks that nothing unfilled remains would reject it after filling. A check for that belongs
on the filled prompt, which this scope does not see.

## What the anchor check measures

The judge named the limit. The check accepts any backtick span, filename, section word, heading
mark, or line number on a ticked line. It confirms that a token a caller can open is present. It
does not confirm that the token points at the delivered artifact. Two ticks in one run anchor to
`record.md` itself, which the skill allows for those steps.

It also folded one continuation line only, and one run anchored a tick on the second line. The
fold now takes every indented continuation line. All three prompts return the same counts after
the change.

## A file of unknown provenance

One run's directory held a fourth prompt draft, written 46 seconds after the first run finished
and 25 minutes before the second run's own deliverable. The second run reported it as already
present. It shares no line with any delivered prompt and holds no ticked line, so it changes no
number here. The filesystem cannot say who wrote it. The judge reported that rather than guessing.
