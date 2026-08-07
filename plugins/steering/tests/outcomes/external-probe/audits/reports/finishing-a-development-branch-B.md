# Audit: `finishing-a-development-branch`

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/external-probe/skills/finishing-a-development-branch/SKILL.md`. First audit; no prior report exists for this target. Rules used: `shared/skill-rules.md` and `shared/steering-rules.md` (the target is a SKILL.md with a parsing `name`/`description` frontmatter block). The file names no reference files (no markdown links, no backticked relative paths), so nothing further was read.

**Lint.** `shared/lint.md` points to `npm run lint` for this repository, confirmed against `AGENTS.md`'s description of `eng/generate-readmes.mjs`. Ran it from the repository root: it passed ("All generated files are up to date"). But reading `eng/generate-readmes.mjs`'s `readComponents()`, the walk is `<pluginDir>/skills/*/SKILL.md`, `<pluginDir>/commands/*.md`, `<pluginDir>/agents/*.md` only — it does not recurse into `tests/`, so it never examines this file. This is a coverage gap, not a clean pass. Hand-checked in its place, disclosed as a hand check rather than a lint result: frontmatter parses with no YAML hazards; name `finishing-a-development-branch` matches the format and its directory; description is 101 characters; body is 196 lines; no reference links or backticked paths to resolve.

**Conditions applied.** `always` — all always-rows evaluated. `reused` — met, per instruction. `hand-off` — not met, per instruction; every hand-off-conditioned row below is N/A. `changes something` — met: Step 5 runs `git merge`, `git push`, `git branch -d/-D`, and Step 6 runs `git worktree remove`, all of which modify repository or filesystem state. `advisory` — not met: the skill does not stop at reviewing or investigating; the same steps above execute the change once a menu option is chosen, so it fails the "changes nothing" test that defines advisory.

## skill-rules.md

### Discovery

| Rule | Result | Evidence |
| --- | --- | --- |
| States the capability (Blocking) | Fail | The entire description is `"Use when implementation is complete, all tests pass, and you need to decide how to integrate the work"` — one trigger clause, never a clause naming what the skill does (merges, opens a PR, or keeps the branch, then cleans up). Same root cause as the third-person row below — one fix. |
| States trigger conditions (Blocking) | Pass | Same clause states the trigger plainly. |
| Includes casual phrasings/error text/file types (Important) | Fail | No variant of what a developer actually types appears — nothing like "merge this branch," "wrap up this feature," "ready to ship," "clean up my worktree." |
| Does not summarise the workflow (Important) | Pass | The description states a condition, not the six-step process. |
| Written in third person (Important) | Fail | The clause addresses "you" directly — `"...and you need to decide how to integrate the work"` — imperative/second person throughout, with no third-person capability sentence anywhere in the description. |

### Boundary

| Rule | Result | Evidence |
| --- | --- | --- |
| Says what it does not cover (Blocking) | Fail | No line anywhere states a boundary. Step 5 Option 1 runs `git merge <feature-branch>` and moves straight to `# Verify tests on merged result` with no stated behavior for a conflicted merge; rebase-based integration, squash merges, and non-golden-path failures are likewise never addressed as in or out of scope. Same root cause as the Scope row below — one fix. |
| Names the skill that takes over where it stops (Important) | Fail | No other skill is named anywhere in the file. The sibling `using-git-worktrees` skill in this same collection (confirmed at `.../external-probe/skills/using-git-worktrees/SKILL.md`) creates the exact kind of worktree this skill's Step 2 and Step 6 detect and tear down, yet is never referenced. |
| Says a direct instruction from the person wins over the skill (Important) | Fail | No escape hatch exists. Step 1's `"report the failures and stop — the menu comes after a green suite"` and Step 4's `"Present the menu exactly as written"` are stated as fixed rules with no clause letting an explicit human instruction override them. |

### Content

| Rule | Result | Evidence |
| --- | --- | --- |
| First lines say what the skill produces (Important) | Fail | The opening is `"Core principle: Verify tests → Detect environment → Present options → Execute choice → Clean up"` — a process chain, not a stated outcome. Same root cause as steering's Outcome row below — one fix. |
| Nothing explains what the model already knows (Blocking) | Pass | Content is specific to this workflow throughout (worktree detection via `git rev-parse`, the `.worktrees/`/`worktrees/` ownership convention, the exact menus) rather than generic exposition. |
| Content that would not change behavior is absent (Important) | Pass | The Quick Reference table recaps Step 5 but functions as a scan-before-acting cross-check on a safety-relevant procedure, not dead weight. |
| One term used for one thing throughout (Important) | Pass | "Human partner," "worktree," "base branch"/"feature branch," and the three option names are used consistently. |
| Time-sensitive material absent or confined (Important) | Pass | No dates, versions, or "currently" statements. |
| Does not document a script/regex-enforceable constraint (Important) | Pass | Mechanical checks (environment detection) are given as an actual bash script, not prose. |

### Loading

| Rule | Result | Evidence |
| --- | --- | --- |
| Body ≤ 500 lines (Blocking) | Pass | 196 lines (hand count; lint does not cover this path). |
| Every reference one hop (Blocking) | N/A | No references exist. |
| Detail sits in reference files (Important) | Pass | Nothing is deferred; total size (196 lines) doesn't warrant offloading. |
| Reference file >100 lines opens with contents list (Important) | N/A | No reference files exist. |
| Test material not reachable from the skill (Important) | N/A | No references exist. |
| No reference file tells the reader to skip part of itself (Important) | N/A | No reference files exist. |

### Evidence

| Rule | Result | Evidence |
| --- | --- | --- |
| Baseline comparison recorded in `tests/baselines/` (Blocking) | Fail | `plugins/steering/tests/baselines/` contains exactly four files — `auditing-skills.md`, `repo-setup.md`, `writing-agents.md`, `writing-skills.md` — the steering plugin's own four skills. None exists for `finishing-a-development-branch`. Flagged as written in the rule, with the caveat that this gate presumes the skill ships from a plugin in this repository; this file is an externally-authored fixture (Jesse Vincent's `superpowers`, per `tests/outcomes/external-probe/SOURCE-SHA.txt`) staged here to probe the rules, not a component this repository ships. |

## steering-rules.md

### Outcome

| Rule | Result | Evidence |
| --- | --- | --- |
| Finished outcome stated, not just a topic (Blocking, always) | Fail | Same root cause as Content row above: the Overview states a process chain, never what "done" looks like (branch merged / PR open / kept, workspace clean). |
| Outcome statement at the top (Advisory, always) | N/A | Depends on the missing outcome statement above; no section to place. |
| Outcome checkable without asking the author (Important, hand-off) | N/A | hand-off not met. |

### Context

| Rule | Result | Evidence |
| --- | --- | --- |
| Nothing refers to something unresolvable (Blocking, always) | Pass | All `<placeholder>` tokens are template slots the skill itself explains how to fill (Steps 2 and 3), not dangling references to something outside the document. |
| Every fact written out or pointed at by a readable path (Blocking, always) | Pass | Consistent with the above. |
| Approaches already tried and found not to work stated (Important, always) | Pass | The Common Rationalizations table records known failure patterns (e.g., "tests passed earlier this session," treating "yeah, get rid of it" as confirmation) and what to do instead, serving the same function. |
| Local conventions stated (Important, hand-off) | N/A | hand-off not met. |
| Context above method (Advisory, always) | Pass | Overview precedes the numbered steps. |

### Scope

| Rule | Result | Evidence |
| --- | --- | --- |
| In scope named (Blocking, always) | Pass | Step 4's exact menus function as the scope statement — these are the only integration actions handled. |
| Out of scope named explicitly (Blocking, always) | Fail | Same finding as Boundary row above. |
| Category-of-work lists marked as examples (Blocking, always) | Fail | Step 1: `"Run the project's full test suite (`npm test` / `cargo test` / `pytest` / `go test ./...`)."` No "or equivalent"/"examples" qualifier — reads as the exhaustive set of supported ecosystems, exactly the pattern this rule's own worked example warns against. |
| Stops and reports at a scope limit rather than working around it (Blocking, always) | Pass | Step 1 (tests fail → stop), Step 5 Option 1 (merged-result tests fail → stop and investigate), Step 3 (unknown base → ask) are all explicit stops. |
| Scope statement above the method (Advisory, always) | N/A | Depends on the missing out-of-scope statement above. |
| Must-not-modify + fallback stated (Blocking, advisory) | N/A | advisory not met. |

### Method

| Rule | Result | Evidence |
| --- | --- | --- |
| One default approach, not a menu (Important, always) | Pass | The six-step procedure is the one fixed method; Step 4's menu is a decision handed to the human ("the integration decision is theirs"), not the agent choosing among its own methods. |
| Order fixed where correctness-affecting (Blocking, always) | Pass | Step 2's comment — `"Capture now, while still inside the workspace — Step 5 changes directory before cleanup (Step 6) needs this value"` — shows deliberate sequencing with a stated reason. |
| Constrained only where required, each constraint says why (Important, always) | Pass | E.g., worktree cleanup is bounded to `.worktrees/`/`worktrees/` because "everything else belongs to the host"; discard requires the exact word because informal confirmation ("yeah, get rid of it") is explicitly rejected. |
| Pre-start check named as the first step (Important, always) | Pass | Step 1 is the test-suite verification. |
| Copy-and-tick checklist included (Advisory, reused) | Fail | Steps are numbered prose headers; no `- [ ]`-style checklist appears anywhere. |

### Finish

| Rule | Result | Evidence |
| --- | --- | --- |
| Self-runnable check settles completion (Blocking, changes something) | Pass | Merged-result tests (Option 1), push/PR confirmation (Option 2), and immediate report (Option 3) each settle their own path. |
| Exact commands named (Important, hand-off) | N/A | hand-off not met. |
| Agent runs the check itself before reporting (Important, always) | Pass | Step 1 and Step 5 Option 1 both have the agent run the suite directly, not ask the human to. |
| Evidence goes in the report so nobody re-runs the check (Important, hand-off) | N/A | hand-off not met. |
| Finish criteria specific enough for reproducibility (Blocking, advisory) | N/A | advisory not met. |
| States what evidence each finding must carry (Important, advisory) | N/A | advisory not met. |
| Finish check sits late in the document (Advisory, always) | Pass | Given the branching structure, each path's check sits immediately before that path's own completion point (e.g., Option 1's verify-then-cleanup). |

### Failure

| Rule | Result | Evidence |
| --- | --- | --- |
| Stop conditions stated (Blocking, always) | Pass | Tests failing (Step 1), tests failing post-merge (Step 5 Option 1), unknown base branch (Step 3). |
| Retry limit named, with something required to change (Important, always) | N/A | No retry loop is described anywhere; every failure path is an explicit hard stop ("report... and stop," "investigate"), so there is no retry behavior to bound. |
| Weakening or editing a test to force a pass is forbidden (Blocking, changes something) | Fail | Neither test gate (Step 1, Step 5 Option 1) says anything beyond "if tests fail, stop." Nothing forbids the agent from forcing green by softening the test itself, despite the skill's entire integration decision resting on that gate. |
| Named status for "instruction itself was insufficient" (Important, hand-off) | N/A | hand-off not met. |
| Stopping carries no penalty (Important, hand-off) | N/A | hand-off not met. |
| Missing/unexpected/unassessable input handling with a status (Blocking, advisory) | N/A | advisory not met. |
| Stop conditions sit directly after the finish check (Advisory, always) | Pass | Each step co-locates its check and its stop condition (e.g., Step 1 combines both in one passage). |

### Return

| Rule | Result | Evidence |
| --- | --- | --- |
| All six rows (sections named / wording fixed / detail-to-file / failures inlined / unrequested-work disclosure / format at end) | N/A | hand-off not met for all. |

### Calibration

| Rule | Result | Evidence |
| --- | --- | --- |
| All four rows (examples of what counts / what doesn't / default-outcome stated / shape-not-label) | N/A | advisory not met for all. |

### Composition

| Rule | Result | Evidence |
| --- | --- | --- |
| Facts established pre-dispatch with origin (Important, hand-off) | N/A | hand-off not met. |
| Deterministic determination by script, not agent (Important, hand-off) | N/A | hand-off not met. |
| Template facts as named fields to a file (Important, hand-off) | N/A | hand-off not met. |
| Every named hole required-or-defaulted (Important, reused) | Pass | The two load-bearing holes are explicitly resolved by the procedure itself — Step 3 for `<base-branch>` ("if it is not already known, ask"), Step 2 for `<WORKTREE_PATH>`; the rest (`<feature-branch>`, `<path>`, `<name>`) are trivially available from context. |
| Fixed field set, no payload bloat (Advisory, reused) | Pass | No accumulated unused fields. |
| Model/effort named explicitly (Important, hand-off) | N/A | hand-off not met. |
| Status values enumerated with caller obligation (Blocking, hand-off) | N/A | hand-off not met. |
| Each status: local vs. run-stopping (Important, hand-off) | N/A | hand-off not met. |
| Caller checks the report is usable, doesn't re-run (Important, hand-off) | N/A | hand-off not met. |
| What happens to partial work when a run stops is stated (Important, changes something) | Pass | Step 5 Option 1: `"If tests fail on the merged result: stop, leave the worktree and branch in place, and investigate — nothing has been pushed, so the merge is local and recoverable."` |
| Predefined-agent dispatch checked for excess context (Advisory, hand-off) | N/A | hand-off not met; also no sub-agent dispatch occurs in this skill. |

## Counts by severity

Findings are counted once per root cause per the calibration rule (rules sharing a cause are grouped below, at the higher severity of the group).

- Blocking: 6 — description states no capability / not third person; no stated out-of-scope boundary; no outcome stated up front; no baseline-comparison record; test-command list reads as exhaustive; no prohibition on weakening a test to force a pass.
- Important: 3 — description omits casual phrasings; no named hand-off skill; no "direct instruction wins" clause.
- Advisory: 1 — no copy-and-tick checklist.

## Three fixes to make first

1. State that weakening, skipping, or editing a test to force a pass is forbidden at both gates (Step 1 and Step 5 Option 1) — the whole integration decision rests on a green suite actually meaning the code works.
2. Name what this skill does not cover: at minimum, what happens when Step 5 Option 1's `git merge` produces a conflict, plus a general statement of what falls outside the golden path (rebase-based integration, squash merges).
3. Change Step 1's test-command list from a bare four-item parenthetical to explicit examples (e.g., add "...or the project's own test command") so it stops reading as the exhaustive set of supported ecosystems.

Blocking failures are present (6): this file needs work before use. Advisory items are listed once above and do not block.