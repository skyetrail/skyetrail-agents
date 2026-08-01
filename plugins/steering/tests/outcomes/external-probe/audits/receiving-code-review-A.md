# Audit: receiving-code-review, run A

Conditions applied: reused met, hand-off not met, changes something met, advisory not met. The
auditor derived the last two itself, reasoning that the workflow ends in an implement step and has
a section for sequencing and testing fixes, so modifying files is a designed outcome rather than a
side effect.

Counts: **Blocking 4, Important 5, Advisory 1.** Thirteen rule-level marks collapsed to ten
findings under the one-finding-per-root-cause rule.

## The style question, answered

Pre-registered as the thing I could not call. The auditor did not dismiss the file as style. It
audited the content as behaviour throughout and never invoked the style exemption, even though the
file's subject is almost entirely tone and phrasing.

Our rule survives the case it was never designed for. The exemption is scoped to style that does
not change what an agent does, and the auditor read that scope correctly rather than by keyword.

## The finding I would not have written

The file bans literal strings: "You're absolutely right!", "Great point!", "Thanks for" anything.
The auditor marked this a failure of the rule against documenting a constraint a script could
enforce, on the grounds that those are greppable and a hook would catch them more reliably than
prose the model has to remember on every reply.

That is a real observation about that skill and it transfers to ours. We have the same rule and had
never seen it fire on a case this clean.

## The category rule fires again, on someone else's file

"When To Push Back" gives six reasons with nothing marking them as examples, so it reads as the
complete test for when pushing back is warranted. The auditor called it the same shape as the bad
illustration in our own rule file.

This is the failure mode our security bench found, where a reviewer that had already found a real
injection filed it out of scope because its kind was not on the list. We derived that rule from our
own fixture. It has now fired on an unrelated skill by another author, in the same shape, with the
same consequence: a valid objection outside the six could be suppressed.

Convergent evidence for that rule specifically, from material we did not write.

The auditor also noted, fairly, that the same file's "ANY gratitude expression" catch-all does
generalise correctly, so the author clearly knows how to write the open form and did it elsewhere.

## Repeats from the first audit

The lint coverage gap was again identified by reading the generator source rather than trusting the
clean result, and again reported as a gap rather than a pass.

The baseline-comparison rule again produced an automatic blocking failure, with the auditor again
noting the rule carries no carve-out for a file that is not one of this plugin's own shipped skills.
Second file, same defect in our rules.
