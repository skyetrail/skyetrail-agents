# Results: four audit rounds did not measurably improve the rules

Pete asked whether the rounds were moving the needle. On work we did not write, they were not.

The design and the predictions are in `./PREREGISTRATION.md`, committed at `e4ca779` before any
audit ran. Nothing in that file was edited afterwards.

## What ran

Eight audits. Two arms, two targets, two independent auditors each. Every auditor received a rules
directory and no statement of which arm it was in. Reports went to identifiers that encode neither
the arm nor the pairing. Two scorers read the targets and the report pairs, never the rule files and
never the arm map. The map was opened after both scorers reported.

- **alpha**, commit `7deb2ae`, before round one.
- **beta**, commit `0fa59cb`, after round four.

Fixture: `superpowers` at `44c9b2d6e889982ac18c27d05a19fefe335194e1`, cloned whole. All fourteen
skills present, so cross-references resolve.

## The numbers

| Measure | Target | alpha | beta |
| --- | --- | --- | --- |
| Reproducibility | receiving-code-review | 89% | 78%, or 95% matching by rule |
| Reproducibility | using-git-worktrees | 78% | 78% |
| Misstatements | receiving-code-review | 1 | 4 |
| Misstatements | using-git-worktrees | 7, none substantive | 5, one substantive |
| Consequence naming | receiving-code-review | 54% | 73% |
| Consequence naming | using-git-worktrees | 92% | 75% |
| Findings | receiving-code-review | 34 | 36 |
| Findings | using-git-worktrees | 29 | 28 |

Every measure ties or reverses between the two targets. Reproducibility is identical on one target
and depends on the matching rule on the other, which the scorer raised itself. Consequence naming
favours beta on one target by 19 points and alpha on the other by 17. Volume differs by one finding
in each direction.

Both scorers reported ties on several measures without being pushed, and one wrote that neither pair
dominates. Their prompts told them a tie was a real result and told them not to manufacture a
difference.

## The predictions, scored

| Prediction | Confidence | Outcome |
| --- | --- | --- |
| Reproducibility better in beta | moderate | Not supported. Tied on one target, worse or better on the other by matching rule. |
| No difference in misstatements | high | Supported. No consistent direction. |
| Consequence naming better in beta | moderate | Not supported. Reverses between targets. |
| Volume lower in beta | low | Not supported. One finding apart, both ways. |

Three of four wrong. The one that held predicted no difference.

## What did hold

Both arms found the same substantive problems, which is worth as much as the null.

On `receiving-code-review`, all four auditors reported that nothing forbids weakening a check or
editing a test to make a reviewer's suggestion pass, in a skill whose whole job is changing code
under review pressure. All four reported no statement of what the skill does not cover. Three of
four reported closed lists carrying the skill's weight.

On `using-git-worktrees`, all four reported `$LOCATION` and `$BRANCH_NAME` used and never assigned,
in the skill's central command. Three of four reported the closed project-type list. Both beta
auditors and one alpha auditor reported the `.gitignore` commit writing to the branch that the
consent prompt promised to protect.

These are real defects in another author's work, found by both versions of the rules, several with
named consequences. The rules do something. The rounds did not make them do it better.

## What this does not say

Eight audits over two targets detects a large difference, not a small one. A real but modest
improvement would not show here.

It says nothing about the four rounds' effect on this plugin's own files, which is a different
question with a different answer. Those rounds closed two paths in `repo-setup` that deleted a
confirmed lint command, and a chain break where `writing-agents` sent agents to `dispatch-protocol`
for a status set and a retry limit that file did not carry. Those were real, and they are not
measured here.

It says nothing about whether skills written with these rules are better. That needs the baseline
loop, and no baseline has run against any skill since 2026-08-01.

## What it does say

Four rounds of auditing our files against our rules improved our files against our rules. That is
the claim the evidence supports, and it is narrower than it looked from inside the loop.

The retirement counts across those rounds, 144 findings closed, measured conformance and repair of
damage the rounds themselves caused. Rounds two, three and four created 67 new findings while
retiring 144, and most of the new ones came from the previous round's fixes.

The next lever is not another round. It is the baseline loop, which measures whether a skill changes
what an agent does, and which has not run against any skill since 2026-08-01. Four skills changed on
this branch and none of them was measured afterwards.

## A correction, recorded rather than quietly fixed

The first version of this page said twice that `repo-setup` had never had a baseline, and called
that a live failure of this plugin's own Blocking Evidence rule. Both statements were false.
`tests/baselines/repo-setup.md` records three no-skill runs, a skill-loaded run, and a re-run
written up in `tests/outcomes/setup-bench/RERUN.md`. It landed on 2026-08-01.

The claim came from grepping for the heading "Without the skill", which the other three baselines
use and this one does not. It uses "Step 1, no skill loaded". A string that did not match was read
as a fact that did not exist, and no one opened the file.

That claim reached this page, a pull request description, and a commit message on `main` before an
independent check caught it. The rule it broke is one this project already holds: check a claim
against the source, never against a pattern that resembles the source.
