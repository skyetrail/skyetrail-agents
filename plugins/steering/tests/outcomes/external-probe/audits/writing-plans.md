# Audit: writing-plans (single audit)

Conditions applied: reused met, hand-off not met, changes something met, advisory not met. The
auditor reasoned that hand-off is not met because the dispatch the skill proposes belongs to the
next skill rather than to this one, which is a finer reading than the instruction required.

Counts: **Blocking 5, Important 5, Advisory 1.**

## A factual error, measure three

The auditor wrote that `npm run lint` is "the command recorded in `AGENTS.md`'s repo-setup block".
There is no repo-setup block in our `AGENTS.md`. The string `repo-setup` does not appear in that
file at all.

The command it named is correct. The source it cited for the command is invented.

This is the first false statement found in the probe and it is the more dangerous shape of error,
because the conclusion is right. A reader checking whether the auditor got the lint command right
would find that it did, and would never look at where it said the command came from. Only a check
aimed at provenance rather than conclusions catches it.

Worth noting what likely produced it. `shared/lint.md` now tells auditors to look for a repo-setup
block first and fall back to `npm run lint`. The auditor took the fallback, then reported it as
though it had come from the first source. The instruction created a plausible place for the fact to
live, and the report filled it in.

Two other checkable claims in the same audit were verified and both hold: the generator's own
comment does say content under `tests/` is deliberately excluded, and
`plan-document-reviewer-prompt.md` does sit beside the target with zero references from it.

## What this says about our own repository

We shipped `repo-setup` and never ran it on ourselves, so the block an auditor now expects to find
is absent. That is a real gap, and the auditor tripped over it by inventing the thing that should
have been there.

## The strongest finding

`plan-document-reviewer-prompt.md` sits unreferenced in the skill's directory, so it can never
load, and its content describes dispatching a plan-document reviewer subagent, which contradicts the
skill's own Self-Review section stating explicitly that the review is not a subagent dispatch.

Verified by direct check. A dead file is one thing; a dead file that contradicts the live one is a
genuine trap for anyone who opens the directory.

## Repeats

Fourth audit running to a clean lint result and correctly reporting it as a coverage gap after
reading the generator source.

Fifth appearance of the baseline-comparison rule as an automatic blocking failure for an external
file.

The category rule fired again, on the placeholder-pattern list, which the skill's own self-review
step treats as closed by telling the agent to search for "the patterns from the section above".
