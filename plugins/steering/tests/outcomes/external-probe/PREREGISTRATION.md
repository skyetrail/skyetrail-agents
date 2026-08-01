# External probe: pre-registration

Written and committed before any audit was run. Nothing below was edited afterwards; results go in
`RESULTS.md`.

## Why

Every test in this project so far was built by the same model that wrote the rules being tested. We
chose the fixtures, wrote the answer keys, and scored the runs. That bounds what any of it can
claim to: these rules move this model in this direction on tasks we picked. It cannot show whether
the rules mean anything on work we did not write.

This probe points `auditing-skills` at real skills written by someone else, Jesse Vincent's
`superpowers` collection, pinned at commit `44c9b2d6e889982ac18c27d05a19fefe335194e1`.

## What this is not

Not a scored bench, and there is no answer key. Writing one would put the same author back in
charge of deciding what counts as a defect, which is the bias this probe exists to escape. In the
earlier fixtures a trap was objectively present: a reverted pull request really was reverted. Here,
"names nothing as out of scope" is a defect only against our own rules, and our own rules are the
thing under test. Scoring it would be circular.

So no scores, no pass or fail for any file. Every measure below is a property of the audit, not a
judgment of the target.

## Selection

Fixed before reading any file. The repository has 14 skill directories. Sorted alphabetically, take
every third starting at index 0: `brainstorming`, `finishing-a-development-branch`,
`subagent-driven-development`, `using-git-worktrees`, `writing-plans`.

Two additions, declared rather than sampled, so counts can be reported with and without them:

- `receiving-code-review`, because Pete named it.
- `writing-skills`, because it is the direct counterpart of our own and therefore the most
  interesting and the most likely to attract a biased reading from us.

Double audits, two independent runs each, go to the first three of the final list sorted
alphabetically: `brainstorming`, `finishing-a-development-branch`, `receiving-code-review`. The
other four get one audit each.

## Already known before the runs

Recorded so it is not presented later as a discovery. Body line counts: `writing-skills` 679 and
`subagent-driven-development` 503 both exceed our 500-line limit for a skill body. Our lint would
call both a failure. Whether that limit is right for a skill of that kind is a separate question
this probe may inform.

## The four measures

None needs a key.

1. **Finding count per file.** Our calibration gate says more than five findings on one file means
   the auditor is judging too harshly, and that gate has only ever seen text we wrote ourselves.
2. **Agreement between two independent audits** of the same file: how many findings both report,
   how many only one reports, and whether they agree on whether the file is fit for use.
3. **Factual accuracy of every finding.** Checkable without any key, because either the file says a
   thing or it does not. A finding that misquotes or misattributes is wrong regardless of anyone's
   opinion of the rules.
4. **Whether the auditor handles a skill whose subject is style.** `receiving-code-review` is
   largely about tone and phrasing. Our auditor is told it does not judge writing style, on the
   reasoning that style does not change what an agent does. Here style is what the agent does.

## Predictions

Written down so they can be wrong.

- **Finding counts will breach our own gate on most files.** I expect more than five findings on at
  least four of the seven. If that happens, either the gate is calibrated only to our house style,
  or our rules do not generalise. Both are findings about us.
- **Two audits will agree on fitness for use and disagree on minor items**, matching what we
  measured internally. If they disagree on fitness even once, our reconciliation rule is weaker than
  we have been claiming.
- **The auditor will not dismiss `receiving-code-review` as style.** Genuinely uncertain about this
  one. If it does dismiss it, that is a real defect in our rules that no fixture of ours could have
  found.
- **The auditor will flag `receiving-code-review`'s description**, which opens with "Use when"
  rather than naming the capability, contrary to what our own `writing-skills` teaches.

## The one piece of real ground truth

Our trigger test is objective: it measures whether the right skill is chosen from its description
alone. If the auditor calls a description weak and that description triggers reliably, the auditor
is wrong, and no opinion of ours enters the judgment. This is the first falsification path in the
project that does not run through an answer key we wrote.

## What would count as our rules failing

Any of these, and we say so plainly rather than explaining it away.

- Findings that misquote the target, which means the auditor is generating rather than reading.
- Counts so high that our own gate would reject every audit, which means the gate fits only us.
- Two audits disagreeing on whether a file is fit for use.
- A skill dismissed on grounds of style when style is its subject.
- The auditor faulting a description that the trigger test shows working.

## Framing

These are real files by a named author who did not ask for a review. The output is evidence about
our rules. It is not a review of anyone's work, and it should not be published or presented as one.
Where our auditor and this author disagree, the honest default is that we are looking at a
difference in approach, not at a mistake, unless the finding is a plain factual error about the
file.
