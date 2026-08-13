# The twenty requests, and the answer key

The key never appears in a runner's prompt.

Skill under test: `receiving-code-review`. Distractors: `brainstorming`,
`finishing-a-development-branch`, `subagent-driven-development`, `using-git-worktrees`,
`writing-plans`, `writing-skills`. `requesting-code-review` stays excluded, for the reason test 1
gave: its name carries "code review", so it would give the direction-flip items a legitimate home
and absorb the near miss. On the should-not items the specific distractor chosen is not scored, and
`none` is correct wherever no distractor fits.

| # | Request | Should select |
| --- | --- | --- |
| 1 | My colleague thinks my null check is wrong and I am not sure they read the branch above it. | yes |
| 2 | Someone on my team wants me to swap my retry loop for their helper. I think theirs drops the backoff, but I do not want to be the difficult one. | yes |
| 3 | My tech lead sent back eight things to change on the payments branch. Two of them break the build and the rest are small. Where do I start? | yes |
| 4 | The staff engineer who looked at my branch says the caching layer should be done properly, with invalidation and metrics. Nothing calls it yet. Do I have to do it? | yes |
| 5 | I argued against a change someone asked for, then went and checked, and they were right. How do I say so without grovelling? | yes |
| 6 | Three people marked up my branch and two of them contradict each other on how errors should propagate. What do I do? | yes |
| 7 | My manager left notes on specific lines of my diff on GitHub. I want my answers to land where she wrote them, not at the bottom of the page. | yes |
| 8 | Somebody went over my authentication changes and asked why I did not use the framework's built-in guard. I had a reason, but I am not certain it still holds. | yes |
| 9 | My boss listed six changes to my branch. I understand four of them. Should I start those and ask about the other two after? | yes |
| 10 | A senior dev on another team says my migration script will lock the table for too long. He has never touched this service. Do I just do what he says? | yes |
| 11 | Nobody else has looked at this branch yet. Can you go over my diff and tell me what is weak in it? | no |
| 12 | I am about to ask a colleague to go through this branch. What should I check myself first so I do not waste her time? | no |
| 13 | A teammate's branch is in front of me and I am supposed to say whether it is safe to ship. | no |
| 14 | Someone spotted that my cache returns stale rows under concurrent writes. I have reproduced it and now I cannot work out where the state goes wrong. | no |
| 15 | The rework from last week's pass over my branch has turned into a fortnight of restructuring. I need it written down as steps before I start. | no |
| 16 | Everything raised on my branch is now settled. What is the cleanest way to get this into main? | no |
| 17 | The changes agreed after last week's pass over my branch do not depend on each other. Can you farm them out and run them at the same time? | no |
| 18 | I want to keep this rework off my current checkout so the branch I am part way through stays untouched. | no |
| 19 | I keep answering badly when people critique my work, too eager and too agreeable. I want that written up as a reusable skill for my team's setup. | no |
| 20 | Two of us disagree about whether this service should own its own queue. Nothing is written yet and I want to work out what we actually need. | no |

## The four items that carry rule 3

These are the items a vague description gets wrong. Each turns on a distinction the description
alone settles.

**Item 5 — the outgoing half of the exchange.** The user has already evaluated the point and lost
the argument. Nothing incoming is left to judge. A description that promises to decide whether a
comment is technically correct reads as spent here and misses it. Only a description that covers
the whole exchange, including what the user says back, takes it. The skill covers this outright.

**Item 11 — direction.** The subject is a code review of the user's own branch, so the topic and
the possessive both point the wrong way. No feedback exists yet. A description that keys on "code
review" and on whose code it is takes the item; only a description that names the feedback as
already received leaves it alone. This is test 1's request 7, rebuilt on the user's own diff so the
surface cues now point at the skill.

**Item 14 — downstream scope.** A point was raised, the user accepted it, and the remaining work is
finding a defect. A description that fires on "someone raised something about my code" takes it.
Only a description that limits the skill to deciding what to do about the points raised stops at
the boundary.

**Item 19 — topic against task.** The subject matter is this exact skill, described in the skill's
own terms of eagerness and agreement. The task is authoring a skill. A description that states what
the skill is about takes it; a description that states what the skill does does not.
