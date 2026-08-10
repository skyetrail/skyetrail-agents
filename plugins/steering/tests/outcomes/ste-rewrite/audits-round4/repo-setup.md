# Re-audit (round 4): repo-setup

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/repo-setup/SKILL.md`
Rules: `plugins/steering/shared/skill-rules.md`, `plugins/steering/shared/steering-rules.md`
Prior report: `plugins/steering/tests/outcomes/ste-rewrite/audits-round3/repo-setup.md`, at commit `d72544f`.
Now at commit `19459c8`, working tree clean. No file was changed except this report and throwaway
fixtures in the session scratchpad.

## 1. Lint result, and whether the lint reached the target

`npm run lint` from `/Users/pete/workspace/skyetrail-agents`, exit code 0:

```
> node eng/generate-readmes.mjs --check

lint (advisory): plugins/steering/SUMMARY.md: is 193 lines and has no "## Contents" heading; a reference file over 100 lines opens with a contents list
All generated files are up to date.
```

One advisory finding, against `plugins/steering/SUMMARY.md`, which is not this target. An advisory
finding prints and never stops the run. Nothing failed.

`npm run lint -- --explain` names three kinds of component that get every check: frontmatter
hazards, name format and length, description length (limit 1024), body line count (limit 500), and
reference resolution. `skills/*/SKILL.md` is one of them, and its name must match its directory.

The target is `plugins/steering/skills/repo-setup/SKILL.md`, so it is a component and the lint
reached it. All five component checks ran against it and passed. There is no coverage gap.

`--explain` gained wording at this commit about a target the command does not open. It does not
change this target's status: a `skills/*/SKILL.md` is still a component and still gets every check.

What the lint does not reach, and it still matters here. Step 7 names four shell commands, and
steps 5, 7 and 8 name four file operations between them. No check in this repository runs any of
them. Every finding below about whether those commands and operations do what the steps say is
judgment work that no lint record settles. I walked the paths in scratch fixtures instead. Section 5
says where.

### Conditions applied

- **always** — met.
- **reused** — met. The target is a SKILL.md.
- **changes something** — met, per the brief. The skill writes `AGENTS.md`, and writes and removes
  `AGENTS.md.repo-setup-backup`.
- **hand-off** — not met. `steering-rules.md` gained a paragraph at this commit settling exactly
  this question: "Every condition is about the document in front of you, not about anything that
  document describes." The SKILL.md loads into the current conversation, so `handoff-rules.md` was
  not applied to it. Recording which way I went, as that paragraph asks.
- **advisory** — not met. The skill investigates and then writes the block. All four Calibration
  rules and the advisory-conditioned rules in Scope, Finish and Failure stay not applicable.
- **describes work** — met. Lines 8-10 name a finished outcome: a verified record of the
  repository's basic facts, written between fixed markers in `AGENTS.md`. Method, Finish and Failure
  all apply. Same as the prior round, so no rule changed hands. `steering-rules.md` moved the two
  Outcome rules from **always** to **describes work** at this commit; the condition is met either
  way, so nothing moved.

### The three paths, walked

The brief asks for this by running rather than reading. I built four fixture repositories and ran
every command in steps 5 to 8 against each.

**Path A, a repository with no `AGENTS.md`. Now correct end to end.**
Step 5's copy is conditioned on `AGENTS.md` existing, so no backup is made. Step 6 creates the file.
The three `grep` checks behave as their comments claim. The fourth command is correctly skipped by
line 70. The new line 77 conditions the delete, "where step 5 made one", and line 79 states the
consequence outright: "Where step 5 made no backup, there is nothing to delete, and a failed delete
is not a failed check." Nothing on this path is asked to delete a file that was never made. The
cascade the prior round named, where a failed `rm` reads as a failing check and step 8 then deletes
the correct `AGENTS.md`, cannot fire, because line 79 blocks the first link of it by name.

**Path A2, the same repository where a check fails and cannot be fixed.** I created `AGENTS.md`
carrying an unfilled `<command>` placeholder, so the third `grep` printed a line. Step 8 clause one,
"Where step 5 made a backup", is false and is correctly skipped. Clause two deletes `AGENTS.md`. End
state: `git status` clean, repository exactly as found, no orphan backup. Correct.

**Path B, a repository whose `AGENTS.md` has uncommitted edits. Correct on the mechanism, one
wording problem survives.** I committed a two-line `AGENTS.md`, made an uncommitted edit, then ran
the workflow. `diff AGENTS.md.repo-setup-backup AGENTS.md` showed only the agent's own block,
because step 5's copy captures the working tree including the person's edit, so that edit sits on
both sides and cancels. Run on the same tree for contrast, `git diff -- AGENTS.md` showed the
person's edit and the block interleaved with nothing marking which was which. The prior round's
blocking defect stays retired, and step 5's own prose states the reason.

The surviving problem is the pass condition at line 67, unchanged this round. `diff` printed
`3a4,13` and the added lines include `> <!-- BEGIN: repo-setup -->` and `> <!-- END: repo-setup -->`
and a blank separator line. On the append path the markers are themselves changed lines, so "every
changed line sits between the markers" is false on a correct run. That is prior finding 14, confirmed.

**Path C1, a re-run over a confirmed block where the check fails and the agent can fix it. This is
the path the round-three break closed off, and it is open again.** I committed an `AGENTS.md`
carrying a confirmed block with a preamble above it and a trailer below it, copied it to the backup,
wrote a botched block leaving two placeholders, and failed the third `grep`. Line 74 now reads "Fix
anything that does not hold, then run these checks again." I fixed the one line, re-ran all four
checks, and all four held. `diff` against the step 5 backup then exited 0, because the backup still
holds the pre-run state and is not refreshed by the fix. Backup deleted, `DONE`. Preamble and
trailer intact. A one-edit fault no longer reaches `BLOCKED`.

**Path C2, the same re-run where the failure cannot be fixed.** I destroyed the file entirely so the
`BEGIN` count printed 0. Step 8 copied the backup over `AGENTS.md` and then deleted the backup. End
state: `git status` empty, meaning a byte-identical restore, confirmed block and preamble and
trailer all back. Clause two correctly skipped. No orphan backup. Both halves of the prior round's
complaint about step 8 are answered.

**Can any path now delete or corrupt a file it should not?** On the three paths the brief named, no.
I checked the one shape that could still do it, and it cannot fire: step 8's two clauses would be
destructive if both ran on one run, because the second deletes the file the first just restored.
They cannot both run. Step 5 makes a backup exactly when `AGENTS.md` existed, and step 6 creates
exactly when it did not, so "step 5 made a backup" and "you created `AGENTS.md` in step 6" are
complements. The round-three wording carried the exclusion in the word "instead"; this round carries
it in two guards that are mutually exclusive by construction. That is the stronger form, not the
weaker one.

**Can the backup survive a run of either kind?** Not on any path the workflow covers. A successful
run deletes it at the end of step 7. A failed run that reaches step 8 with a backup deletes it
there. A failed run on the create path never made one. It survives on one exit the workflow does not
cover, which is finding 13 below, walked as path D.

**Path D, a stop between step 5 and step 7.** I made `AGENTS.md` read-only after step 5 took its
copy. Step 6's write failed. Line 117, in "When to stop", says "Where you cannot write `AGENTS.md`,
stop and report `BLOCKED` with the reason." That exit is outside the workflow, so it reaches neither
step 7's delete nor step 8's. End state: `AGENTS.md.repo-setup-backup` still on disk. Lines 134-136
still assert it "exists only between step 5 and the end of the run."

**Step numbering.** Every citation checked case-insensitively against the numbered headers. Ten
citations: line 54 "Step 7" and "step 8", line 70 "step 6", line 75 "step 8", lines 77, 78 and 80
"step 5", line 81 "step 6", line 107 "step 7", line 136 "step 5". The headers sit at lines 26, 30,
39, 45, 53, 57, 60 and 80 for steps 1 to 8, with no gap and no repeat. Every citation points at the
step it means. Line 54's claim that step 7 compares and step 8 restores is true of both. No file
outside this one cites a step number of this skill: `AGENTS.md` carries the markers, `lint.md` names
the skill three times without a number, and `README.md` carries only the description.

## 2. Prior findings

Fourteen findings in the prior report: ten in its section 2, four in its section 3. I mark all
fourteen, including the four it had already retired.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| SR Context 2 (Blocking, warn, defect) — the status set is closed at three, drops `NEEDS_CONTEXT` and `DONE_WITH_CONCERNS`, states no caller obligation, names no file that defines a status set | **Confirmed** | "## Statuses" at lines 105-108 is byte-identical this round. Still "These three are the whole set. Do not invent a fourth", still no file named, still no caller obligation. `dispatch-protocol.md` lines 74-79 still define four, and an agent whose instruction was insufficient still has to report `BLOCKED`, which per that table tells the caller "Do not re-send the same prompt" |
| SR Scope 5 (Advisory, fail, difference) — "Where this stops" sits after the method | **Confirmed** | Now at line 130, after a Workflow ending at line 87. Position unchanged, only pushed down by the four lines the step 7 and 8 rewrite added |
| SR Failure 5 (Advisory, fail, difference) — sections sit between the finish check and the stop conditions | **Confirmed** | "## The block" at 89-103 and "## Statuses" at 105-108 still sit between step 7's checks and "## When to stop" at 110 |
| SR Composition 3 (Important, fail, defect) — no stated fate for a block already written when verification fails (retired at round 3) | **Retired, and stays retired** | Step 8 states it and restores rather than deletes. Verified byte-identical in path C2 |
| SK Content 3 (Important, fail, difference) — the third `grep` hardcodes three placeholder strings, an enumeration of the block template below it | **Confirmed** | Line 66 is byte-identical: `grep -n '<command>\|<what it covers\|<anything a person' AGENTS.md`. The template at 93-103 still carries exactly those three. Add a fourth and the check silently stops covering it. All three still match today, verified in paths A2 and C1 |
| SK Content 6 (Important, fail, defect) — step 7 asks the agent to confirm by hand what a script settles; the fourth item needs judgment | **Confirmed**, in the changed form round 3 recorded | Nothing this round touched it. `diff AGENTS.md.repo-setup-backup AGENTS.md` still prints a diff the agent must read and weigh against a prose condition. No exit code settles it: path C1's passing case exited 0 and path B's passing case exited 1, so exit code carries no signal |
| SR Method 2 (Blocking, fail, defect) — the pre-image instruction lived inside step 6, after the step it had to precede (retired at round 3) | **Retired, and stays retired** | The copy is step 5, ahead of step 6's write, on every path where a pre-image can exist |
| SR Finish 1 (Blocking, fail, defect) — `git diff -- AGENTS.md` cannot separate the agent's change from an uncommitted edit (retired at round 3) | **Retired, and stays retired** | Re-verified in path B against the same tree. The backup diff showed the block alone; `git diff` showed the person's edit and the block interleaved |
| SR Composition 3 (Important, fail, defect) — "Remove only your own block where the file already existed" deletes a previously confirmed answer on a re-run (retired at round 3) | **Retired, and stays retired** | Path C2 restored the confirmed block, its preamble and its trailer to a byte-identical state, `git status` empty |
| SR Method 3 (Important, fail, defect) — "Write it exactly like this" against a live block carrying a second bullet the template has no slot for | **Confirmed** | Line 91 still reads "Write it exactly like this, markers included", and the template at 93-103 still carries one bullet and one Unresolved line. This repository's own `AGENTS.md` block still carries two bullets, the second being "**What the lint covers:** ask it, with `npm run lint -- --explain`", with five lines under it. Step 1 still says "Do not rediscover what the block already records and what is still true". Neither side moved. A re-run here still drops the second bullet, and every check in step 7 still passes while it happens |
| SR Failure 1 (Blocking, fail, defect) — the round-three rewrite deleted "Fix anything that does not hold" and kept step 8's dependence on it, so a one-edit fault went straight to `BLOCKED` | **Retired** | Lines 74-75 restore it and go further than the deleted sentence did: "Fix anything that does not hold, then run these checks again. Most failures here are one edit away. Go to step 8 only where you cannot fix it." Walked in path C1: a botched block failed the placeholder `grep`, one edit fixed it, all four checks then held, and the run reported `DONE` instead of `BLOCKED` |
| SR Finish 1 (Blocking, fail, defect) — the create path was told to delete a backup it never made, and a failed delete could cascade into deleting the correct `AGENTS.md` | **Retired** | Line 77 conditions the delete, "where step 5 made one", and line 79 kills the cascade by name: "a failed delete is not a failed check." Walked in path A: no backup, nothing deleted, no error, `DONE`. The step 8 create-path branch cannot be reached by this route |
| SR Composition 3 (Important, fail, defect) — the backup survives a failed run, and the document states that it cannot | **Changed** | The named path is fixed and verified: step 8 line 80 now reads "copy it over `AGENTS.md`, then delete the backup", and path C2 left no backup behind. The finding's headline claim survives through a different exit the prior report did not name. Line 117, in "When to stop", sends an agent that cannot write `AGENTS.md` straight to `BLOCKED` without passing step 7 or step 8, so a backup taken in step 5 is orphaned. Walked as path D. Lines 134-136 still say it "exists only between step 5 and the end of the run". The fix did not create this path; it was always there and the prior report did not reach it. In this narrower form I read it as Important, warn, difference rather than the prior round's fail and defect, because reaching it needs `AGENTS.md` to become unwritable after step 5 copied it |
| SR Finish 1 (Blocking, warn, difference) — "every changed line sits between the markers" is false as written on the append path | **Confirmed** | Line 67 is byte-identical. Walked again in path B: `diff` printed `3a4,13` including `> <!-- BEGIN: repo-setup -->`, `> <!-- END: repo-setup -->` and a blank separator, so three changed lines are not between the markers on a correct append |

## 3. New findings

Only findings the prior report does not contain.

**The headline first, because the brief asks for it.** The round-three fix introduced no new defect.
This is the first round of the three where that is true. I checked it by running the paths, not by
reading them, and I checked the specific shape that would have done it: step 8's two clauses are
complements by construction, so no run takes both, and no path can delete or corrupt a file it
should not. The three items below are all differences, all Important, and none of them comes from
this round's edit except in the sense that finding 1 applies again because the sentence it judges
came back.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| SR Failure 2 — a retry limit is named, and something must change before a retry rather than only the attempt count | Important | Warn | **Difference** | Lines 74-75 open a loop with no named limit: "Fix anything that does not hold, then run these checks again... Go to step 8 only where you cannot fix it." The second half of the rule is met, because a fix is required before each re-run. The first half is not: the exit is a judgment, "where you cannot fix it", and no count bounds it. The file names a retry limit for its other retry, at lines 126-128, "Run that one once more, and only after something has changed", so the shape is available and is not applied here. `writing-agents` names one for its own loop, "at most twice per agent". I mark this warn and a difference because each iteration requires an edit and the diff check catches drift, so I cannot name a run that goes wrong, only one that goes long. The rule newly applies because the round-three edit restored the sentence it judges; the sentence itself predates round three and neither prior report raised it |
| SR Composition 3 — what happens to partial work when a run stops is stated | Important | Warn | **Difference** | Line 80 reads "Where step 5 made a backup, copy it over `AGENTS.md`, then delete the backup." The delete is sequenced after the copy but not conditioned on it. An agent issuing the two as separate calls without checking the first result deletes the only pre-image while `AGENTS.md` holds an unverified block. This sentence is new at this commit, so the shape is new. I could not construct a realistic run that reaches it: step 8 is entered after step 6 already wrote the file, so the copy back will normally succeed, and in path C2 it did. I can only say we would write "delete the backup once that copy succeeded". Separate root cause from the changed finding above, which is about an exit that never reaches step 8 at all |
| SR Voice 3 — nothing that cannot choose to act takes an action verb | Important | Fail | **Difference** | Three sentences give an action verb to a thing that cannot choose. Line 115: "A guessed lint command is worse than none, because every later skill trusts it." Lines 51-52: "Tell them that skills relying on one cannot run their mechanical checks until it has one." Line 87: "An unverified block is worse than no block, because everything downstream trusts it." `steering-rules.md` lines 211-212 put a document in the list of things that cannot choose, and a skill is a document an agent loads. The file's own worked example condemns exactly this shape, "the two files disagree", and prescribes naming what a reader meets instead, which here would be the later agent rather than the later skill. One finding, one root cause, three sites. A difference: nothing an agent does changes. Neither prior report raised it, and I checked the sibling target for the same shape and did not find it, so this is not a rule I am reading loosely |

I considered and did not raise four others.

- **Line 79 carving an exception into a check.** "A failed delete is not a failed check" is exactly
  the flavour of sentence that broke this file twice. It is scoped to one command, that command is
  cleanup rather than verification, and line 86 still forbids weakening the checks. Pass. I raise it
  here only because the brief asks for the fix that introduces a problem, and this was the sentence
  most likely to be one.
- **"Do not weaken these checks to finish" sitting inside step 8.** Lines 86-87 are indented under
  step 8, which is the branch an agent takes only when it cannot fix, while the new fix-and-retry
  loop lives in step 7. SR Failure 3 asks that the prohibition exist, not where it sits, and the
  agent reads the whole file. This placement predates this round. Pass.
- **Step 8 numbered inside an ordered sequence when it is a conditional branch.** Its title carries
  its own guard, so it self-guards. SR Method 2 passes. The prior report reached the same place.
- **SR Method 1, one default rather than a menu.** "Try `npm run lint` first. That is this project's
  default." Pass.

SK Evidence 1 applies and passes: `plugins/steering/tests/baselines/repo-setup.md` exists, and
nothing reachable from the SKILL.md links to that directory. The SKILL.md names no reference file at
all, so SK Loading 1 is satisfied vacuously and SK Loading 2 passes at 142 lines against a 500-line
limit the lint already cleared.

## 4. Counts by severity

New findings:

| Severity | Fail | Warn |
| --- | --- | --- |
| Blocking | 0 | 0 |
| Important | 1 | 2 |
| Advisory | 0 | 0 |

New defects: 0. New differences: 3.

Surviving prior findings, meaning the seven confirmed and the one changed:

| Severity | Fail | Warn |
| --- | --- | --- |
| Blocking | 0 | 2 |
| Important | 3 | 1 |
| Advisory | 2 | 0 |

Surviving defects: 3, being SR Context 2, SK Content 6, and SR Method 3. Surviving differences: 5,
being SR Scope 5, SR Failure 5, SK Content 3, SR Composition 3 as changed, and SR Finish 1 on the
append path.

No blocking defect, new or surviving. Both blocking items are warns and both are differences.
`auditing-skills` states that only a defect blocks, and reads a blocking difference as a signal
about the rule rather than about the target. So on that reading the document does not need work
before use, which is a different verdict from each of the last two rounds.

Stated plainly, because the brief asked for it and asked that it not be softened. Two rounds running,
the fix for one destructive fault introduced the next one, and both times it landed in the failure
branch. This round it did not. Step 7 restores the fix-and-retry sentence and conditions the delete
on step 5 having made a copy. Step 8 removes the backup on the failure path and guards both of its
clauses so they cannot both fire. I ran all three paths the brief named plus a create-path failure
and an early-stop path, and no path deletes or corrupts a file it should not. The backup cannot
survive a successful run or a failed run that reaches step 8. It survives one exit the workflow does
not cover, which is a hole the fix neither made nor closed. The three new items are wording
differences at Important severity, and the three surviving defects are all older than this round's
edit: the closed status set, the hand-judged diff, and the one-bullet template against this
repository's own two-bullet block. That last one is the only one I would fix next, because it fires
on this repository today and every check passes while it does.

## 5. Anything I did that nobody asked for

- I built four fixture git repositories in the session scratchpad and ran every command in steps 5
  to 8 against each. The brief asked me to walk three paths. I ran five: A, A2 (the create path
  where a check fails and cannot be fixed), B, C1 (the re-run where the fault is fixable, which is
  the case the round-three break destroyed), C2, and D. Building throwaway repositories rather than
  reasoning about the text went past what the brief asked. Nothing outside the scratchpad was
  touched.
- Path D is entirely mine. Nobody asked about a stop between step 5 and step 7. It is where the
  changed SR Composition 3 finding comes from.
- Inside path B I ran `git diff -- AGENTS.md` on the same tree purely to see the round-two defect
  reproduce beside the new command's clean output. Nobody asked for the side-by-side.
- I checked the step-number citations case-insensitively after a case-sensitive grep missed line
  54's capitalised "Step 7". The first grep would have left one citation unchecked.
- I read `/Users/pete/workspace/skyetrail-agents/AGENTS.md`, the file this skill writes. The
  confirmed SR Method 3 finding rests on what its block holds today.
- I read the round-two report as well as the round-three one, to check whether SR Failure 2 had been
  raised and dropped rather than never raised. It had never been raised.
- I read `dispatch-protocol.md` and `handoff-rules.md` in full, neither of which this target names,
  to check the confirmed SR Context 2 finding against the actual status table rather than against
  the prior report's summary of it.
- I diffed both rule files between `d72544f` and `19459c8`, because the rules moved at this commit
  even where the target did not. The Outcome rows moved from **always** to **describes work**, and
  a paragraph settling the hand-off condition was added. Neither changes a verdict here.
- I grepped the whole repository for files citing a step number of this skill. None does.
- I checked `plugins/steering/tests/baselines/` for a file for this skill, to settle SK Evidence 1.
- I ran `mkdir -p /tmp/ste-audit-4`. The directory did not exist. I wrote only this file and
  `writing-agents.md` there.
