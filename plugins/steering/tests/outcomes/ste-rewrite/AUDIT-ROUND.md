# Audit round after the STE rewrite

Nine files, audited against the rules as they stood at commit `7deb2ae`. Seven agents ran in
parallel. Nothing in the repository changed while they ran, because an earlier round produced
verdicts that were stale before they could be reported.

The raw reports are in `./audits/`, one per target. They are the record. This page is a summary of
them and does not replace them.

## Result

| Target | Defects | Differences | Blocking defect |
| --- | --- | --- | --- |
| `dispatch-protocol.md` | 10 | 5 | yes |
| `writing-skills/SKILL.md` | 3 | 1 | yes |
| `steering-rules.md` | 2 | 7 | yes |
| `handoff-rules.md` | 2 | 3 | yes |
| `lint.md` | 2 | 3 | yes |
| `skill-rules.md` | 1 | 6 | yes |
| `auditing-skills/SKILL.md` | 2 | 4 | no |
| `writing-agents/SKILL.md` | 2 | 0 | no |
| `repo-setup/SKILL.md` | 2 | 4 | no |

Six of nine needed work before use. The three that did not are the three written most recently.

## What the pattern was

**The rule this project turns on is the rule it breaks most at home.** A closed list where a
membership test belongs, in five of nine files. `dispatch-protocol` invariant 5 sealed the ways to
fake a passing check at "three things", so deleting a failing test read as permitted. That is a
closed list handing out permissions, in the one paragraph standing between a dispatched agent and a
faked pass.

**A second copy had already drifted, rather than being at risk of drifting.** `writing-skills`
restated two tables from `skill-rules.md` and had lost "error text" and the third-person rule from
one of them. `skill-rules.md` restated the 500-line body limit that its own opening forbids
restating, and an auditor in an earlier round hand-derived that limit rather than citing the lint,
which is the exact consequence the opening exists to prevent.

## Four of the findings were about the rules, not the targets

Fixing the targets would have been wrong in these four cases.

**Important severity had no stated effect.** Blocking and Advisory were both settled. Important was
left open, so an agent holding a target whose only failures are Important had to guess whether it
could ship. Fixed in `steering-rules.md`.

**The evidence rule required baselines "linked from nothing".** The generated `README.md` and
`SUMMARY.md` both link `tests/baselines/`, so every skill in this plugin failed that clause. The
rule meant "not reachable from the SKILL.md" and overreached. Fixed.

**The Voice actor rule could not be applied to a bare imperative.** Most instructions here are bare
imperatives, and Simplified Technical English prefers that form. An auditor either failed every one
or passed every one. The rule now names the imperative case explicitly.

**Rule catalogues were judged as procedures.** Most of the 33 differences came from applying
Method, Finish, and Failure rules to files that are reference tables and describe no work. A
**catalogue** condition now scopes those sections out, and a catalogue names the documents that
apply it, so the procedure reads as delegated rather than missing.

## What has no surviving record

Four earlier convergence rounds reported zero defects. This round found 26. The earlier reports do
not exist. Those rounds survive as commit messages and nothing else, so the two results cannot be
reconciled: the rule set may have sharpened, these audits may have been run harder, or the earlier
zero may have been wrong. The question is open and will stay open.

The reports in `./audits/` exist so this round does not join them.
