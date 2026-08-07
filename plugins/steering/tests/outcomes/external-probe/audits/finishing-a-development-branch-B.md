# Audit: finishing-a-development-branch, run B

Conditions applied: reused met, hand-off not met, changes something met, advisory not met. Derived
from the target's own content: it runs merge, push, branch delete, and worktree remove.

Counts: **Blocking 6, Important 3, Advisory 1.**

## The category rule has now fired on three files out of three

Step 1 tells the agent to run the project's full test suite, followed by a bare parenthetical
listing `npm test`, `cargo test`, `pytest`, and `go test ./...`, with nothing marking those as
examples. The auditor called it the same pattern our own rule file warns against.

That is three for three. In `using-git-worktrees` it was the ecosystem list, where an unlisted
project type is skipped in silence. In `receiving-code-review` it was the six reasons to push back,
read as the complete test. Here it is the test runners.

Two readings, and they need separating rather than assuming the flattering one.

The first is that this is a genuinely common way to write instructions, and our rule catches
something real. What supports it: in all three cases the consequence is concrete and checkable
without agreeing with our taste. A Ruby project gets no setup at all. A valid objection outside the
six is suppressed. A project using an unlisted test runner falls outside the only gate the skill has.

The second is that our rule is too aggressive, and any list at all trips it regardless of whether a
reader would really treat it as closed. Nothing here rules that out yet, because three files is not
enough and because we have never run this rule against a list we would consider acceptable.

Worth testing directly rather than settling from these runs.

## Repeats, now three for three

The lint coverage gap was again found by reading the generator rather than trusting the clean
result, and again reported as a gap.

The baseline-comparison rule again produced an automatic blocking failure, and the auditor again
recorded the caveat unprompted, noting the gate presumes the skill ships from a plugin in this
repository and this file does not.

## Second appearance: nothing forbids weakening the test

Neither test gate says anything beyond stopping when tests fail. Nothing forbids reaching green by
softening the test itself, which the auditor noted matters here because the entire integration
decision rests on that suite meaning what it says. The same finding appeared in
`receiving-code-review`.

## Where the auditor declined to find something

Worth recording, because it argues against the reading that the auditor simply finds whatever it
can. It marked the retry-limit rule not applicable rather than failing it, on the grounds that every
failure path in the file is a hard stop and there is no retry behaviour to bound. It also passed the
template-hole rule after checking that the procedure itself resolves both holes that matter.
