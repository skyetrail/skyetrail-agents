# Re-audit (round 3): repo-setup

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/repo-setup/SKILL.md`
Rules: `plugins/steering/shared/skill-rules.md`, `plugins/steering/shared/steering-rules.md`
Prior report: `plugins/steering/tests/outcomes/ste-rewrite/audits-round2/repo-setup.md`, at commit `d015e2e`.
Now at commit `d72544f`, working tree clean. No file was changed except this report.

## 1. Lint result, and whether the lint reached the target

`npm run lint` from `/Users/pete/workspace/skyetrail-agents`:

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

The body grew by nine lines at this commit and the workflow gained a step. Body line count is a
lint check, it reached this component, and it passed. I did not re-derive it.

One thing the lint does not reach, and it still matters here. Step 7 names four shell commands and
step 5 and step 8 name two file operations. No check in this repository runs any of them, and the
lint does not claim to. Every new finding below is about whether those commands and operations do
what the steps say they do, which is judgment work that no lint record settles. I walked all three
paths in a scratch fixture instead. Section 5 says where.

### Conditions applied

- **always** — met.
- **reused** — met. The target is a SKILL.md.
- **changes something** — met, per the brief. The skill writes to `AGENTS.md`, and now also writes
  and removes `AGENTS.md.repo-setup-backup`.
- **hand-off** — not met. The SKILL.md loads into the current conversation. `handoff-rules.md` was
  not applied to it.
- **advisory** — not met. The skill investigates and then writes the block. All four Calibration
  rules and the advisory-conditioned rules in Scope, Finish and Failure stay not applicable.
- **describes work** — **met.** This condition replaced the **catalogue** condition the prior round
  worked with, and the prior round found **catalogue** not met. Its test is whether the document has
  a finished outcome of its own. Lines 8-10 name one: a verified record of the repository's basic
  facts, written between fixed markers in `AGENTS.md`. A reader finishes that. Method, Finish and
  Failure all apply, which is where three of the four new findings land. The outcome is the same as
  the prior round reached, so no rule changed hands.

### The three paths, walked

The brief asks for this explicitly. I built three fixture repositories and ran each path command by
command. Findings that come out of it are in section 3.

**Path A, a repository with no `AGENTS.md`. Correct on the write, wrong on the cleanup.**
Step 5's copy is conditioned, "Where `AGENTS.md` exists", so no backup is made. Step 6 creates the
file. Step 7's three `grep` checks all behave as their comments claim. The fourth command is
correctly skipped by line 70, "Skip the last command where you created `AGENTS.md` in step 6", and
that skip is load-bearing: run anyway, `diff` exits 2 with `No such file or directory`. This closes
the prior round's silent-empty-diff hole, where an untracked file made `git diff` print nothing and
read as a pass. What is wrong is the last line of step 7. "Delete `AGENTS.md.repo-setup-backup` once
every check holds" carries no condition, and on this path there is nothing to delete. That is
finding 2 below.

**Path B, a repository whose `AGENTS.md` has uncommitted edits. Correct.**
I put a committed file in place, made an uncommitted edit to it, then ran the workflow. `git diff`
showed the person's uncommitted edit interleaved with the agent's block and nothing marking which
was which, which is exactly the prior round's blocking defect. The new
`diff AGENTS.md.repo-setup-backup AGENTS.md` showed only the agent's own block, because step 5's
copy captures the working-tree state including the uncommitted edit, so that edit sits on both sides
and cancels. The defect is genuinely retired, and step 5's own prose states the reason.

**Path C, a re-run over a block a previous run confirmed. Correct on the restore, wrong on the
cleanup.** I committed an `AGENTS.md` carrying a confirmed block with a preamble and a trailer
around it, copied it to the backup, wrote a bad block over it, and failed step 7's placeholder grep.
Step 8's `cp AGENTS.md.repo-setup-backup AGENTS.md` put the previously confirmed block back
verbatim, along with the preamble and the trailer. The prior round's destructive undo, which removed
the block instead of restoring it and left the repository with no lint command, is retired. What is
wrong is that step 8 never removes the backup, so it survives the failed run. That is finding 3
below.

**Step numbering.** Consistent everywhere it is cited. The workflow runs 1 to 8 with no gap and no
repeat. Line 54 says step 7 compares and step 8 restores, and they do. Line 70 and line 78 both
point at step 6 for the create branch, and step 6 is where it is. Line 103 points at step 7 for the
checks, and step 7 holds them. Line 132 points at step 5 for the copy, and step 5 makes it. No file
outside this one cites a step number of this skill: `lint.md` names the skill three times without a
step number, and `README.md` carries only the description.

**Can the backup survive a successful run, or be mistaken for the real file?** It cannot survive a
successful run: step 7 deletes it before the report. It does survive a failed run, which is finding
3. It cannot be mistaken for the real file. `AGENTS.md.repo-setup-backup` does not end in `.md`, so
it is outside every `*.md` glob, outside the lint's five component and reference patterns, and
outside any exact-path lookup for `AGENTS.md`. I also checked the compounding case: where a failed
run leaves a stale backup, the next run's step 5 overwrites it with a fresh copy before step 6
writes anything, so a stale backup cannot be restored over a good file.

## 2. Prior findings

Ten findings in the prior report: six in its section 2, four in its section 3. Four retired, five
confirmed, one changed.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| SR Context 2 (Blocking, warn, defect) — the status set is closed at three, drops `NEEDS_CONTEXT` and `DONE_WITH_CONCERNS`, states no caller obligation, and names no file that defines a status set | **Confirmed** | "## Statuses" at lines 101-104 is unchanged this round apart from "step 6" becoming "step 7". It still reads "These three are the whole set. Do not invent a fourth", still names no file, and still states no caller obligation. Lines 108-109 still anticipate this skill running "from a dispatched prompt with no conversation", so an agent whose instruction was insufficient still has no status for that and must report `BLOCKED`, which per `dispatch-protocol.md` tells the caller not to re-send rather than to supply what was missing |
| SR Scope 5 (Advisory, fail, difference) — "Where this stops" sits after the method | **Confirmed** | Now at line 126, after a Workflow that ends at line 83. It moved nine lines down because the workflow grew. Nothing about its position changed |
| SR Failure 5 (Advisory, fail, difference) — sections sit between the finish check and the stop conditions | **Confirmed**, and partly improved | Two sections still intervene: "## The block" at 85-99 and "## Statuses" at 101-104 sit between step 7's checks and "## When to stop" at line 106. The improvement is that step 8, which now holds the restore-and-`BLOCKED` instruction, sits directly after step 7 rather than being buried inside it |
| SR Composition 3 (Important, fail, defect) — no stated fate for a block already written when verification fails (marked retired at round 2) | **Retired** | Step 8 states it, and this round's rewrite states it correctly rather than destructively. See the SR Composition 3 row in the section-3 group below |
| SK Content 3 (Important, fail, difference) — the third `grep` hardcodes three placeholder strings, an enumeration of the block template 25 lines below it | **Confirmed** | Line 66 is byte-identical to the prior round: `grep -n '<command>\|<what it covers\|<anything a person' AGENTS.md`. The template at lines 89-99 still carries exactly those three. Add a fourth and the check silently stops covering it. Still a difference: all three patterns match all three placeholders today, verified in the fixture, so no agent does anything wrong yet |
| SK Content 6 (Important, fail, defect) — step 6 asks the agent to confirm by hand what a script settles; the fourth item needs judgment and is empty in two cases | **Changed** | Two thirds fixed. The two empty cases are gone: the untracked case is now an explicit skip at line 70, and the uncommitted-edit case is settled by comparing against a copy taken this run, both verified in the fixture. What remains is the judgment. `diff AGENTS.md.repo-setup-backup AGENTS.md` prints a diff the agent must read and weigh against "every changed line sits between the markers". No exit code settles it: the fixture's passing append case exits 1, the same as a failure would |
| SR Method 2 (Blocking, fail, defect) — the instruction to take a pre-image lived inside step 6, after the step it had to precede | **Retired** | The copy is now step 5, "Copy the file before you write to it", ahead of step 6's write, and the git-versus-non-git branch that caused the misordering is gone entirely. The pre-image is taken on every path where one can exist |
| SR Finish 1 (Blocking, fail, defect) — `git diff -- AGENTS.md` cannot separate the agent's change from an uncommitted edit, and prints nothing for an untracked or staged file | **Retired** | Verified in the fixture on both halves. `diff` against a copy taken in step 5 showed only the agent's block where an uncommitted edit was present, while `git diff` on the same tree showed both with nothing marking which was which. The untracked case is handled by the skip at line 70, and the staged case cannot arise because `diff` reads the file, not the index. Step 5 states the reason for both in its own text |
| SR Composition 3 (Important, fail, defect) — "Remove only your own block where the file already existed" deletes a previously confirmed answer on a re-run | **Retired** | Line 76-77 now reads "Copy `AGENTS.md.repo-setup-backup` over `AGENTS.md`", and lines 78-80 name the reason: "Never delete a block you did not write in this run. On a re-run the block already there is an answer somebody confirmed." Path C in the fixture restored the confirmed block and its surrounding preamble and trailer intact |
| SR Method 3 (Important, fail, defect) — "Write it exactly like this" against a live block carrying a second bullet the template has no slot for | **Confirmed** | Line 87 still reads "Write it exactly like this, markers included", and the template at lines 89-99 still carries one bullet and one Unresolved line. This repository's own `AGENTS.md` block at lines 60-67 still carries two bullets, the second being "**What the lint covers:** ask it, with `npm run lint -- --explain`", with four lines of instruction under it. Step 1 still says "Do not rediscover what the block already records and what is still true", so the two instructions still conflict and the document still names no winner. Nothing this round touched either side. A re-run here still drops the second bullet, and every check in step 7 still passes while it happens |

## 3. New findings

Only findings the prior report does not contain. Three of the four come out of the step 5 to step 8
rewrite. Two of those three are cases where the fix introduced a new problem, and I say so plainly
below.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| SR Failure 1 — conditions that should stop the work are stated | Blocking | **Fail** | **Defect** | **The rewrite deleted the instruction to fix and kept the reference to it.** The prior text opened the failure branch with "Fix anything that does not hold before you report. Where you cannot fix it, undo your write." `git diff d015e2e d72544f` shows that first sentence removed and not replaced. Step 8's title is now "Put the file back where a check fails and you cannot fix it", so the stop condition still has two halves and the second half now has no antecedent. Nothing in the document tells the agent to attempt a fix, and nothing says what counts as one. The wrong action: an agent whose placeholder `grep` prints one line, a one-edit fault it could correct and re-check in seconds, has no instruction to correct it, so it takes step 8, restores the backup and reports `BLOCKED`. Per `dispatch-protocol.md` the caller's obligation on `BLOCKED` is "Fix the named cause, or report the block upward. Do not re-send the same prompt", so a trivially recoverable run is thrown away and the caller is told not to retry it. The prior version recovered from exactly this case |
| SR Finish 1 — a check the agent can run itself is named, and its result settles whether the work is done | Blocking | **Fail** | **Defect** | **The create path is told to delete a file the create path never makes.** Step 5 conditions the copy, "Where `AGENTS.md` exists, copy it to `AGENTS.md.repo-setup-backup`". Step 7 conditions the fourth command, "Skip the last command where you created `AGENTS.md` in step 6". Line 74 conditions nothing: "Delete `AGENTS.md.repo-setup-backup` once every check holds, and before you report." In the path A fixture this returns `rm: AGENTS.md.repo-setup-backup: No such file or directory`, exit 1. The document never says whether that result bears on whether the work is done, while giving an explicit branch for the same path two lines above. The wrong action, worst case: the agent treats the failed delete as a failing check, enters step 8, and takes its create-path branch, "Delete `AGENTS.md` instead where you created it in step 6", destroying the correct block it just wrote and verified. That is the same destructive shape the rewrite set out to remove, relocated from the re-run path to the create path. Stated honestly, the likely case is milder: the step-7 block already contains one command that exits non-zero on success, the placeholder `grep`, whose pass condition is "must print nothing", so an agent reading this block is primed to judge by output rather than exit code and would probably shrug the error off. The instruction is still unexecutable on a path the document branches for everywhere else |
| SR Composition 3 — what happens to partial work when a run stops is stated | Important | **Fail** | **Defect** | **The backup survives a failed run, and the document states that it cannot.** Step 7 conditions the delete on "once every check holds". Step 8 is the path taken when they do not hold, and it never mentions the backup. Confirmed in the path C fixture: after step 8 restored `AGENTS.md`, `AGENTS.md.repo-setup-backup` was still on disk. Lines 131-132 assert the opposite as a property of the skill: it "writes and then removes `AGENTS.md.repo-setup-backup`, which exists only between step 5 and the end of the run." Step 7 also states what a leftover means: "A leftover backup file reads as an unfinished run." The wrong action: the agent reports `BLOCKED` and leaves behind an untracked file whose documented meaning is a run still in flight, when no run is in flight, and a person or a later agent reading the repository has no way to tell those apart. The harm is bounded, and I checked the bound: the next run's step 5 overwrites the stale backup before step 6 writes anything, so a stale copy cannot be restored over a good file |
| SR Finish 1 — a check the agent can run itself is named, and its result settles whether the work is done | Blocking | Warn | **Difference** | The pass condition on the fourth command, "every changed line sits between the markers", is false as written on the append path. Step 6 covers three cases, and one is "Where it exists without the block, append the block and change nothing else". On that path the marker lines are themselves added lines, so two changed lines are the markers rather than lines between them. Confirmed in the path B fixture: the diff output opens `2a3,12` and includes `> <!-- BEGIN: repo-setup -->` and `> <!-- END: repo-setup -->`. An agent reading the condition literally on a correct append would call the check failed, and would then take step 8 and report `BLOCKED`. This is a warn and a difference rather than a fail and a defect because a sensible reading gets it right, the wording predates this round, and I can only say we would write "every changed line is the block you wrote, markers included" |

I considered and did not raise three others.

- **Step 8 numbered inside an ordered sequence when it is a conditional branch.** Steps 1 to 7 run
  in order and step 8 runs only on failure. Its own title carries the condition, "where a check
  fails and you cannot fix it", so it self-guards. SR Method 2 passes.
- **SR Context 3, approaches already tried and found not to work.** This improved rather than
  regressed. Step 5 now states the rejected approach and why: "Do not use `git diff` for either job.
  It cannot separate your change from one somebody made and did not commit, and it prints nothing at
  all for a file git does not track yet." Pass.
- **SR Composition 1, every named hole marked required or carrying a default.** The template's three
  placeholders carry no explicit required marker, but step 7's placeholder `grep` makes an unfilled
  one fail loudly, which is what the rule asks for. Pass. The prior report did not raise it either.

SK Evidence 1 applies and passes: `plugins/steering/tests/baselines/repo-setup.md` exists, and
nothing reachable from the SKILL.md links to that directory.

## 4. Counts by severity

New findings:

| Severity | Fail | Warn |
| --- | --- | --- |
| Blocking | 2 | 1 |
| Important | 1 | 0 |
| Advisory | 0 | 0 |

New defects: 3. New differences: 1.

Surviving prior findings, meaning the five confirmed and the one changed:

| Severity | Fail | Warn |
| --- | --- | --- |
| Blocking | 0 | 1 |
| Important | 3 | 0 |
| Advisory | 2 | 0 |

Surviving defects: 3, being SR Context 2, SK Content 6 as changed, and SR Method 3. Surviving
differences: 3, being SR Scope 5, SR Failure 5 and SK Content 3.

Two blocking failures. Under `steering-rules.md`, the document needs work before use. That is the
same verdict as the prior round, though not for the same reasons: the prior round's two blocking
failures are both retired and two different ones have taken their place.

Stated plainly, because the brief asked for it and asked that it not be softened. This round fixed
more than it broke, which the two rounds before it did not. The backup mechanism is the right
mechanism: it retires all three of the prior round's blocking and destructive defects, and I
verified each retirement by running the path rather than reading the text. But it broke two things
on the way. The rewrite deleted "Fix anything that does not hold before you report" while keeping
step 8's dependence on it, so a recoverable failure now becomes a `BLOCKED` the caller is told not
to retry. And it gave the backup a conditional birth and an unconditional death, so the create path
is ordered to delete a file that was never made, and the failure path leaves one behind that the
document says cannot exist. Both are small edits to fix. Neither is a design problem with the
backup. Two rounds running, the pattern has been that the failure branch is where the new defect
lands, and that is where it landed again.

## 5. Anything I did that nobody asked for

- I built three fixture git repositories in the session scratchpad and ran every command in steps 5
  to 8 against each, for the three paths the brief named. This is where the retirement of the prior
  SR Finish 1 and SR Composition 3 findings is verified, and where new findings 2, 3 and 4 come
  from. The brief asked me to walk the paths. Building throwaway repositories to run them, rather
  than reasoning about the text, went past what it asked. Nothing outside the scratchpad was
  touched.
- Inside path B I also ran `git diff -- AGENTS.md` on the same tree, purely to see the prior round's
  defect reproduce next to the new command's clean output. Nobody asked for the side-by-side.
- I read `/Users/pete/workspace/skyetrail-agents/AGENTS.md`, the file this skill writes. The
  confirmed SR Method 3 finding rests on what its block contains today.
- I grepped the whole repository for references to `repo-setup` outside `tests/` and its own
  directory, to check that no other file cites a step number that this round's renumbering would
  have made stale. None does. `lint.md` names the skill three times, `README.md` carries the
  description, and `AGENTS.md` carries the markers.
- I checked `plugins/steering/tests/baselines/` for a file for this skill, to settle SK Evidence 1.
  Neither prior report mentions that rule, and it is Blocking, so I did not want to leave it
  unstated. It passes.
- I ran `git diff d015e2e d72544f` on the target rather than comparing the current file against the
  prior report's line numbers by hand.
- I ran `mkdir -p /tmp/ste-audit-3`. The directory did not exist. I wrote only this file and
  `writing-agents.md` there.
