# Equivalence check on the plugin's own STE rewrite

Nine files moved to Simplified Technical English in one branch. The rewrite was meant to change
style and nothing else. This check tested that claim before the branch merged.

## How it ran

`pre-ste` is the tag on the commit before the rewrite. Each file's baseline came from
`git show pre-ste:<path>`. An independent agent received one pair of files and a list of what to
look for: a rule that changed severity or condition, a meaning that narrowed or widened, a
membership test turned into a closed list, an examples marker that vanished, a qualifier present in
one version only, an actor introduced that the original did not name, and a rule cell rewritten
from an assertion into an order.

Each checker was told to ignore which version reads better. No checker saw more than three pairs.

One checker returned CANNOT DETERMINE, because its baseline file was missing. The baselines had
been extracted before `dispatch-protocol.md` was rewritten, so that one was never in the set. The
checker named the missing path and listed what it would check once the file existed. It did not
write a verdict from the AFTER file alone. That refusal is the behaviour the gate depends on.

## Verdict: seven equivalent, two not. Three files changed.

The counts differ because one checker returned Equivalent and flagged an item for a person to look
at. It was right to pass it and right to flag it. The flag turned out to be worth acting on.

| File | Verdict |
| --- | --- |
| `handoff-rules.md` | Equivalent |
| `lint.md` | Equivalent |
| `skill-rules.md` | Equivalent |
| `writing-skills/SKILL.md` | Equivalent |
| `writing-agents/SKILL.md` | Equivalent |
| `repo-setup/SKILL.md` | Equivalent |
| `steering-rules.md` | Changed. Fixed. |
| `dispatch-protocol.md` | Changed. Fixed. |
| `auditing-skills/SKILL.md` | Ambiguous actor. Fixed. |

### steering-rules.md, the shape-not-label rule

Before: the instruction "describes the shape it takes in the code, not the label it falls under."

After: "describes the shape that miss takes in the code. It does not name only the label."

The first fails a rule cell that names the label at all. The second fails only a cell that gives the
label alone. A cell reading "flag secrets in logs, specifically a whole request or session object
passed to a log call" pairs a label with a shape. The first wording flags it. The second passes it.

The looser rule may be the better one. A label plus a shape helps an agent recognise a case faster
than a shape alone. It does not belong on this branch. This branch exists so the diff against
`pre-ste` is style and nothing else. A rule improvement riding inside it would make the baseline
useless for the next comparison.

### dispatch-protocol.md, invariant 1

Before: "Neither a script nor an agent is needed for what the caller already knows."

After: "Use neither a script nor an agent for what the caller already knows."

A property became a prohibition. A caller who runs a confirmatory check on a fact it already holds
is doing something unnecessary under the first wording and something forbidden under the second.
Two reviewers reading the same implementation reach opposite verdicts.

This is the exact fault the Voice section added in this same branch names: a sentence that states a
property must keep the property's owner as its subject and gain no actor. The branch added the rule
and broke it in the same set of edits.

### auditing-skills/SKILL.md, calibration list

Before: "A description so vague the skill will not be found."

After: "A description so vague that a reader cannot find the skill."

This file uses "reader" twice elsewhere for the person reading the audit report. The actor who fails
to find a skill is an agent selecting one. Naming the wrong actor in a file that already uses that
word for someone else is worse than naming none. Now: "an agent looking for the skill does not
find it."

## The common cause

All three came from splitting one sentence into two. That is the operation Simplified Technical
English asks for most often, and it is where meaning leaves.

A split forces the second half to carry a subject and a verb it did not have. Whatever fills those
slots is new content, written by the person doing the rewrite, at the moment they are thinking
about sentence length rather than about meaning. Three slots move:

- **Negation scope.** "X, not Y" becomes "X. It does not Y." The second sentence needs a verb, and
  the verb chosen decides how wide the negation reaches.
- **Modal force.** A trailing clause that stated a property needs a main verb once it stands alone.
  An imperative is the shortest one available, so it is the one that appears.
- **Actor identity.** A passive clause with no actor needs a subject. The nearest available noun
  takes the slot, whether or not it is the right one.

Check a split at those three points. The words on either side can be identical and the demand still
different.
