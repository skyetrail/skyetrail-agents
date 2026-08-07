# Corrections

Errors of mine, and one finding they nearly disguised. Recorded rather than quietly fixed, because
they produced false blocking findings against another author's work.

This file has itself been corrected once. The first version understated the damage because the
command I used to verify it was wrong. That is recorded at the bottom.

## My fixture manufactured four dead references

I sampled seven of the fourteen skills in the collection. The seven link to skills I did not copy.
Every such link dangles inside my snapshot and resolves perfectly upstream.

| Reference | Exists upstream | In my sample | Finding |
| --- | --- | --- | --- |
| `../requesting-code-review/code-reviewer.md` | yes | no | void |
| `../using-superpowers/references/codex-tools.md` | yes | no | void |
| `../using-superpowers/references/gemini-tools.md` | yes | no | void |
| `superpowers:test-driven-development` | yes | no | void |

All four verified present in the upstream repository at the pinned commit.

Three blocking findings are void as a result.

- `subagent-driven-development`: the dead `code-reviewer.md` link, which the audit ranked as its
  first fix.
- `writing-skills`: the two dead `using-superpowers` links, and separately the unresolvable
  `superpowers:test-driven-development` prerequisite, which the audit also ranked as its second fix.

Corrected counts: `subagent-driven-development` drops from 5 blocking to 4. `writing-skills` drops
from 11 blocking to 9.

The auditors were right about what they could see. From inside the snapshot those directories are
genuinely absent, and nothing in their reach could have told them otherwise. The fault is mine.

The lesson is worth more than the arithmetic. Sampling a subset of a linked collection severs
cross-references, and every severed one becomes a blocking finding against work that does not
deserve it. A fixture drawn from a connected set has to keep the set whole, or record every link it
cuts and discount findings that land on them. I did neither, and the failure fell entirely on the
side that flatters our tool, since a spurious dead link makes our auditor look productive.

## My line-count claim was wrong

Before the runs I recorded that both `writing-skills` and `subagent-driven-development` exceed our
500-line body limit. Only one does. Our limit is on the body and I quoted totals including
frontmatter.

- `subagent-driven-development`: 499 body lines. Passes with one line to spare.
- `writing-skills`: 674 body lines. Exceeds, and the audit's count is the right one.

## The correction that was itself wrong

The first version of this file said the `code-reviewer.md` link "was the only cross-skill reference
among the seven, so this is the only finding affected."

That was false. I verified it with a pattern matching one path segment after `../`, which cannot
match `../using-superpowers/references/codex-tools.md`. Three more broken references were sitting
in plain sight, including two in the file with the highest finding count in the whole probe.

So the check I ran to bound my own error was narrower than the error, and it returned a clean result
that I reported with confidence. The same shape as the lint gap this probe keeps finding: a check
that does not reach the thing it appears to cover, reported as though it did.

I only caught it because the last audit cited a path my grep had never matched.

## The finding this nearly disguised

`brainstorming` carries a genuinely broken reference and it is not my doing. Line 151 names
`skills/brainstorming/visual-companion.md`, which from the skill's own directory resolves to
`brainstorming/skills/brainstorming/visual-companion.md`. The file it wants sits directly beside
`SKILL.md`. The whole directory was copied intact, so sampling has nothing to do with it.

Both audits of that file found it independently. One checked whether it was a house convention
before calling it an error, noting the sibling skill references its own directory correctly, and
concluded it was an authoring slip. That is the right way to settle the question and it did it
unprompted.

Of the five dead-reference findings in this probe, four are mine and one is real.
