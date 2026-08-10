# Re-audit: repo-setup

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/repo-setup/SKILL.md`
Rules: `plugins/steering/shared/skill-rules.md`, `plugins/steering/shared/steering-rules.md`
Prior report: `plugins/steering/tests/outcomes/ste-rewrite/audits/repo-setup.md`, at commit `7deb2ae`.
Now at commit `d015e2e`, working tree clean. No file was changed except this report.

## 1. Lint result, and whether the lint reached the target

`npm run lint` from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
All generated files are up to date.
```

Clean.

`npm run lint -- --explain` names three kinds of component that get every check: frontmatter
hazards, name format and length, description length (limit 1024), body line count (limit 500), and
reference resolution. `skills/*/SKILL.md` is one of them, and the name must match its directory.

The target is `plugins/steering/skills/repo-setup/SKILL.md`, so it is a component and the lint
reached it. All five component checks ran against it and passed. There is no coverage gap.

The body grew by 18 lines at this commit. Body line count is a lint check, it reached this
component, and it passed. I did not re-derive it.

One thing the lint does not reach, and it matters here. `--explain` states that components get
reference resolution. Step 6 now names four shell commands. No check in this repository runs them,
and the lint does not claim to. Three of the four new findings below are about whether those
commands do what the step says they do, which is judgment work that no lint record settles.

### Conditions applied

Unchanged from the prior report, except that the rule files now carry a **catalogue** condition.

- **always** — met.
- **reused** — met. The target is a SKILL.md.
- **changes something** — met, per the brief. The skill writes to `AGENTS.md`.
- **hand-off** — not met. The SKILL.md loads into the current conversation. `handoff-rules.md` was
  not applied to it.
- **advisory** — not met. The skill investigates and then writes the block. All four Calibration
  rules and the advisory-conditioned rules in Scope, Finish and Failure stay not applicable.
- **catalogue** — **not met.** This is a new condition since the prior report. The document states a
  six-step workflow of its own, so it is not a catalogue. Method, Finish and Failure all still
  apply, which is where three of the four new findings land.

## 2. Prior findings

Six findings in the prior report. One retired, two confirmed, three changed.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| SR Context 2 (Blocking, warn, difference) — no status named for a successful run, and no file pointed at that defines a status set | **Changed** | Half fixed and half worse. A new "## Statuses" section at lines 92-95 names `DONE`, which settles the prior gap. The same section then closes the set, "These three are the whole set. Do not invent a fourth", and still names no file. `dispatch-protocol.md` defines four core statuses; the three here drop `NEEDS_CONTEXT` and `DONE_WITH_CONCERNS`, and the section states no caller obligation for any of the three. Lines 99-100 anticipate this skill running "from a dispatched prompt with no conversation", so the exclusion bites: an agent whose dispatched instruction was insufficient has no status for that and must report `BLOCKED`, which per `dispatch-protocol.md` tells the caller "Do not re-send the same prompt" rather than "Supply what was missing. Then re-dispatch." Escalated from difference to **defect** |
| SR Scope 5 (Advisory, fail, difference) — "Where this stops" sits after the method | **Confirmed** | Still at line 117, after the Workflow, which ends at line 74. Nothing moved |
| SR Failure 5 (Advisory, fail, difference) — one section sits between the finish check and the stop conditions | **Confirmed**, and worse | Step 6 now ends at line 74. "## The block" runs 76-90, and the new "## Statuses" runs 92-95, before "## When to stop" at line 97. Two sections now intervene where one did before |
| SR Composition 3 (Important, fail, defect) — no stated fate for a block already written when verification fails | **Retired** | Lines 70-72 now state it: "Where you cannot fix it, undo your write. Delete `AGENTS.md` where you created it. Remove only your own block where the file already existed. Then report `BLOCKED` with what failed." The gap the prior report named is closed. What the closure does on a re-run is a new finding below |
| SK Content 3 (Important, fail, difference) — "confirm four things" is a count that goes stale | **Changed** | The word "four" is gone from step 6. The same shape returns one line down: the third command hardcodes the three placeholder strings, `'<command>\|<what it covers\|<anything a person'`, which is an enumeration of the block template 25 lines below it. Add a fourth placeholder to the block at lines 80-90 and the check silently stops covering it, exactly the drift the prior finding named. Still a **difference**: all three patterns match all three placeholders today, verified, so no agent does anything wrong yet. Separately, "These three are the whole set" at line 95 is also a count, but there the number is the constraint itself rather than a description of one, so it is not a finding |
| SK Content 6 (Important, fail, defect) — step 6 asks the agent to confirm by hand four things a script settles | **Changed** | Three of the four are now commands and are genuinely settled: two `grep -c` marker counts and one `grep -n` placeholder scan. I ran all three against a fixture block and they behave as the comments claim, under both `/usr/bin/grep` and the `ugrep` on this machine. The fourth is not settled. `git diff -- AGENTS.md` prints a diff that the agent must still read and judge against "every changed line sits between the markers", and it is empty in two cases. The remaining judgment work, and what the emptiness causes, are new findings below. The prior finding's fourth item, "you saw every command recorded inside the markers work", is now correctly declared as the one thing no command settles, at lines 67-68 |

## 3. New findings

Only findings the prior report does not contain. All four come from the step 6 rewrite. Three of the
four are cases where the fix introduced a new problem.

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| SR Method 2 — the order is fixed where sequence affects correctness (Blocking) | **Fail** | **Defect** | Lines 66-68: "Where the repository does not use git, copy `AGENTS.md` before step 5 and `diff` against the copy instead." The instruction to take the pre-image lives inside step 6, after the step it must precede. Step 5 says nothing about a copy. The wrong action: an agent working a numbered workflow reaches step 6 in a non-git repository with no pre-image, and either skips the fourth check or reports a check it did not run, which the same step forbids at line 73. This is the only path that produces a real before-and-after comparison, so the check is unavailable exactly where it carries the most weight. An agent that reads the whole file before starting can recover, which is why this is one finding and not two |
| SR Finish 1 — a check the agent can run itself is named, and its result settles whether the work is done (Blocking, changes something) | **Fail** | **Defect** | `git diff -- AGENTS.md` cannot separate the agent's own changes from changes that were already in the working tree. I verified this: with an uncommitted edit outside the markers present before the run, the diff shows that line alongside the agent's block change, with nothing marking which is which. The wrong action: the agent reads a changed line outside the markers, concludes the check does not hold, cannot fix what it did not write, and follows lines 70-72 to undo its own valid block and report `BLOCKED`. A person's unsaved edit to `AGENTS.md` destroys the block and produces a false `BLOCKED`. I also verified the two empty cases. On the create path that step 5 names, "Where `AGENTS.md` does not exist, create it with the block", the file is untracked and the command prints nothing, which reads as a pass; and if the change is staged before the check, it prints nothing too. The empty output is harmless on the create path, because the whole file is the block, but the command settles nothing there |
| SR Composition 3 — what happens to partial work when a run stops is stated (Important, changes something) | **Fail** | **Defect** | This is the fix for the prior report's finding of the same name, and the fix is wrong for the re-run case. Line 71: "Remove only your own block where the file already existed." Step 1 establishes that a file already carrying the marked block means this run is a re-run, so the block that "already existed" is a previously recorded and previously verified answer. Step 5 replaced it. Undoing by removing the block deletes that prior record instead of restoring it, so a re-run that fails verification leaves the repository with no recorded lint command at all, worse than before the run started. Every skill the document says trusts the block, at line 74, now finds nothing. The non-git branch does describe a copy that could restore it, but it is framed as a substitute for `diff`, not as a restore, and it does not exist on the git path. Compounds with the SR Finish 1 finding above: the false failure and the destructive undo are the same code path |
| SR Method 3 — the instruction constrains how the work is done only where correctness needs a specific way, and each constraint says why (Important) | **Fail** | **Defect** | Line 78: "Write it exactly like this, markers included." The template at lines 80-90 carries one bullet for the lint command and one Unresolved line. This repository's own `AGENTS.md` carries a block with two bullets: the lint command at lines 60-62, and a second, "**What the lint covers:** ask it, with `npm run lint -- --explain`", at lines 63-67, which the template has no slot for. Step 1 says "Do not rediscover what the block already records and what is still true", so the two instructions conflict and the document names no winner. The wrong action: a re-run here writes the one-bullet template and drops the recorded instruction to ask the lint what it covers, and every check in step 6 still passes, one marker pair, no placeholders, all changed lines between the markers, so nothing catches the loss and the run reports `DONE`. The constraint also carries no reason, which the rule requires |

## 4. Counts by severity

New findings:

| Severity | Fail | Warn |
| --- | --- | --- |
| Blocking | 2 | 0 |
| Important | 2 | 0 |
| Advisory | 0 | 0 |

New defects: 4. New differences: 0.

Surviving prior findings, meaning the two confirmed and the three changed:

| Severity | Fail | Warn |
| --- | --- | --- |
| Blocking | 0 | 1 |
| Important | 0 | 2 |
| Advisory | 2 | 0 |

Surviving defects: 2, being SR Context 2 as changed and SK Content 6 as changed. Surviving
differences: 3, being SR Scope 5, SR Failure 5 and SK Content 3.

Two blocking failures. Under `steering-rules.md`, the document needs work before use. That is a
change from the prior report, which found none. Both blocking failures are in the step 6 rewrite
that fixed the prior report's two most serious findings.

Stated plainly, because the brief asked for it and asked that it not be softened: the fix for the
prior SR Composition 3 finding introduced the destructive-undo defect, and the fix for the prior SK
Content 6 finding introduced both the non-git ordering defect and the `git diff` discrimination
defect. Three of the four new findings would not exist without the two fixes. The old problems were
real and the fixes address them; the new problems are more serious than the old ones, because two of
them destroy a recorded answer rather than fail to verify it.

## 5. Anything I did that nobody asked for

- I built a fixture in a scratch directory and ran all three `grep` commands from step 6 against a
  block containing all three placeholders, under both `/usr/bin/grep` and the `ugrep` installed on
  this machine, to confirm the `\|` alternation works and that the marker counts do not match each
  other. They do work. Nobody asked for the portability check.
- I built a throwaway git repository in the scratch directory and ran `git diff -- AGENTS.md` in
  four states: newly created and untracked, staged, committed, and modified on top of a pre-existing
  uncommitted edit. This is where the SR Finish 1 finding comes from. Both scratch directories are
  under the session scratchpad and touch nothing in the repository.
- I read `/Users/pete/workspace/skyetrail-agents/AGENTS.md`, which is the file this skill writes.
  The SR Method 3 finding rests on what its block actually contains today.
- I checked whether this repository has a hook that would stage or commit `AGENTS.md` behind the
  agent's back, which would make the `git diff` check silently empty. It has no `.claude` directory,
  no active git hooks and no `core.hooksPath`. So that failure mode is not live here, and I did not
  report it. The untracked and staged cases are, and I did.
- I ran `git diff 7deb2ae d015e2e` on both targets rather than comparing against the prior report's
  line numbers by hand.
- I re-derived the **catalogue** condition for this target and wrote the reasoning into section 1.
- I ran a grep across `plugins/steering/skills/` and `plugins/steering/shared/` for links to
  `tests/`, to confirm SK Loading 5 still holds after the edit. It does.
- I ran `mkdir -p /tmp/ste-audit-2/`. The directory already existed and held seven reports from
  other audits running alongside this one, so the command changed nothing. I wrote only
  `repo-setup.md` there, and neither it nor `writing-agents.md` existed before I wrote them.
