## Lint

Repo lint command (from `AGENTS.md` / `package.json`, per `shared/lint.md`): `npm run lint` → `node eng/generate-readmes.mjs --check`. Ran clean: "All generated files are up to date."

That result does not cover this target. I read `eng/generate-readmes.mjs`: `readComponents()` only walks `plugins/<name>/skills/*/SKILL.md` for plugins registered in `marketplace.json`, and the shared-file reference lint explicitly excludes `tests/`. The target lives at `plugins/steering/tests/outcomes/external-probe/skills/using-git-worktrees/SKILL.md`, so the lint script never opens it. This is a coverage gap, not a clean pass for this file.

Because of that gap, I hand-checked the mechanical limits the lint would otherwise settle, flagged here as hand-derived, not lint output: name `using-git-worktrees` (19 chars, lowercase-hyphen format, matches its directory) — fine; description 196 chars against a 1024 limit — fine; body 162 lines by the same line-counting rule the script uses, against a 500 limit — fine; no unquoted `: ` or ` #` in the frontmatter values — fine. The file names no reference files (no markdown links, no backtick relative paths — confirmed by grep); its directory contains only `SKILL.md`, so there was nothing further to read.

## Conditions applied

Target is a SKILL.md, so per `skill-rules.md` line 3-4, `steering-rules.md` applies with **reused** met and **hand-off** not met by definition — not judgment calls. **Always** is constant. For **changes something** / **advisory**, I read the target's own content: it creates git worktrees and branches, edits and commits `.gitignore`, runs installers (`npm install`/`cargo build`/`pip install`/`poetry install`/`go mod download`), and runs test suites. That is concrete file- and state-modifying action, not review-only, so **changes something = met** and **advisory = not met**. This is a first audit; no prior report exists, so the re-audit workflow doesn't apply, and nothing here is gating a ship decision, so a single audit is enough.

## Report

**skill-rules.md — Discovery**

| Rule | Result | Evidence |
| --- | --- | --- |
| States the capability, in the words someone looking for it would use | Pass | Line 3: "...ensures an isolated workspace exists via native tools or git worktree fallback." |
| States the conditions that should trigger it | Pass | Line 3: "Use when starting feature work that needs isolation... or before executing implementation plans." |
| Includes file types, error text, casual phrasings people actually type | Fail (Important) | Line 3 uses only "isolation," "feature work," "implementation plans," "git worktree fallback" — no everyday equivalents ("new branch," "sandbox," "don't touch main"). Mitigating: the name itself (line 2, `using-git-worktrees`) already carries the literal keywords. |
| Does not summarise the workflow or process | Pass | Description states an outcome and two mechanisms, not the 4-step procedure. |
| Written in the third person | Fail (Important) | Line 3 opens "Use when starting feature work..." (imperative, addressed to the reader); only the trailing clause after the dash ("ensures...") is third person. |

**skill-rules.md — Boundary**

| Rule | Result | Evidence |
| --- | --- | --- |
| Says what it does not cover | Fail (Blocking) | No out-of-scope statement anywhere in the file; Overview (lines 8-14) states only what it does. Same root cause as the Scope row below. |
| Names which skill takes over where it stops | Fail (Important) | Report template (line 139) ends "Ready to implement `<feature-name>`" but no successor skill or process is named anywhere. |
| Says a direct instruction from the person wins over the skill | Fail (Important) | Local deference exists only at two points (line 41-45 consent; lines 67-68 directory preference). Elsewhere the file uses unconditional imperatives with no override clause: "MUST verify directory is ignored" (line 80), "Only proceed to Step 1b if..." (line 57), "Only use this if Step 1a does not apply" (line 61). No blanket statement that a direct instruction overrides these. |

**skill-rules.md — Content**

| Rule | Result | Evidence |
| --- | --- | --- |
| First lines say what the skill produces, before any steps | Pass | Lines 8-14 (Overview) state the outcome before Step 0 begins. |
| Nothing explains something the model would already know | Pass | Reviewed line by line; explanatory asides (submodule guard, why-critical notes) are short, non-generic, and tied to specific non-obvious behavior, not 101-level tutorial content. |
| Content that would not change what an agent does is absent | Pass | No padding found; Quick Reference and Common Rationalizations tables restate decisions but target specific known failure modes. |
| One term is used for one thing throughout | Pass | "Isolated workspace," "worktree," "linked worktree," "harness" are each used consistently. |
| Time-sensitive material absent, or confined | Pass | No dated or version-pinned claims. |
| Does not document a constraint a script/regex could enforce instead | Pass | The one MUST-level constraint (directory ignored) is already backed by a literal `git check-ignore` command, not prose-only. |

**skill-rules.md — Loading**

| Rule | Result | Evidence |
| --- | --- | --- |
| SKILL.md body is 500 lines or fewer | Pass (hand-verified) | 162 body lines by the lint script's own counting rule; lint itself did not check this file (see Lint section). |
| Every reference is one hop from the SKILL.md that names it | N/A | File names no references (confirmed by grep for markdown links and backtick `.md` paths — no matches). |
| Detail sits in reference files rather than the front file | Pass | 167 total lines; nothing here is bulky enough to need splitting out. |
| A reference file longer than 100 lines opens with a contents list | N/A | No reference files exist in the skill's directory. |
| Material used to test the skill is not reachable from it | Pass | Directory contains only `SKILL.md`; no embedded or linked test material. |
| No reference file instructs the reader to ignore or skip part of itself | N/A | No reference files exist. |

**skill-rules.md — Evidence**

| Rule | Result | Evidence |
| --- | --- | --- |
| Been through a baseline comparison, recorded in the plugin's `tests/baselines/` | Fail (Blocking) | `plugins/steering/tests/baselines/` contains only `auditing-skills.md`, `repo-setup.md`, `writing-agents.md`, `writing-skills.md` — no record for `using-git-worktrees`. The skill's own directory carries no such record either. Caveat: this file is a verbatim external capture (an "external-probe" fixture, per `tests/outcomes/external-probe/README.md` and `PREREGISTRATION.md`), not a skill authored or adopted by this plugin, so there is no "home" `tests/baselines/` directory it could plausibly be recorded in here. Judged literally, as instructed, the rule is unmet regardless. |

**steering-rules.md — Outcome**

| Rule | Result | Evidence |
| --- | --- | --- |
| Finished outcome stated, not just a topic | Pass | Lines 8-10: "Ensure work happens in an isolated workspace," reinforced by the Report template (lines 136-140). |
| Outcome statement sits at the top | Pass | Overview is the first section, before Step 0. |
| Outcome stated in terms the agent can check without asking the author | N/A | hand-off not met. |

**steering-rules.md — Context**

| Rule | Result | Evidence |
| --- | --- | --- |
| Nothing refers to something the agent cannot resolve | Pass | References to "your instructions" (lines 41, 67) are generic, introspectable, not unresolvable nicknames. Native-tool names (line 53) are hedged as examples ("a tool with a name like..."). |
| Every fact the agent needs is written out or pointed at by a path | Pass | Detection, selection, verification, and setup logic are all given inline. |
| Approaches already tried and found not to work are stated | Pass | Common Rationalizations table (lines 159-167) documents known failure modes and why they're wrong. |
| Local conventions the agent could not infer are stated | N/A | hand-off not met. |
| Context sits above the method | Pass | Overview precedes Step 0-3. |

**steering-rules.md — Scope**

| Rule | Result | Evidence |
| --- | --- | --- |
| What is in scope is named | Pass | Overview and title make the scope (workspace isolation setup + baseline verification) reasonably clear. |
| What is out of scope is named explicitly | Fail (Blocking) | No such statement anywhere in the file. Same root cause as the Boundary row above. |
| A named category is defined by membership, and any list of kinds is marked as examples | Fail (Blocking) | Ecosystem list at lines 106-119 (Node/Rust/Python/Go) and the test-command list at line 127 are not marked as examples. Quick Reference row at line 157 ("No package.json/Cargo.toml" → "Skip dependency install") confirms the list is treated as exhaustive: an unlisted ecosystem (Ruby, Java, PHP, .NET, ...) silently gets no setup at all rather than a flagged gap. |
| Says to stop and report on reaching a scope limit, rather than work around it | Fail (Blocking) | Same evidence as above (line 157): an unrecognized project type is silently skipped, not reported. Same root cause as the preceding row. |
| Scope statement sits above the method | Pass | What scope statement exists (Overview) sits above Step 0-3. |
| States the agent must not modify anything, and what to do instead | N/A | advisory not met. |

**steering-rules.md — Method**

| Rule | Result | Evidence |
| --- | --- | --- |
| One default approach given, not a menu | Pass | Step 1 gives a fixed try-native-then-git-fallback order (lines 47-61); ecosystem branches are conditional on detected facts, not an open choice. |
| Order fixed where sequence affects correctness | Pass | Steps 0-3 are explicitly sequential with skip conditions (e.g., line 33: "Skip to Step 2... Do NOT create another worktree"). |
| Constrained only where required, and each constraint says why | Pass | E.g., line 88: "Why critical: Prevents accidentally committing worktree contents to repository"; lines 55/164 explain why native tools are preferred. |
| Any check that must run before work starts is named as the first step | Pass | Step 0 (lines 16-45) is explicitly the pre-work detection check. |
| A checklist the agent can copy and tick off is included | Fail (Advisory) | No `- [ ]`-style checklist anywhere; Quick Reference (142-157) and Common Rationalizations (159-167) are lookup tables, not tick-off checklists. |

**steering-rules.md — Finish**

| Rule | Result | Evidence |
| --- | --- | --- |
| A self-run check is named, and its result settles whether work is done | Pass | Step 3 (lines 121-132): runs project tests, and pass/fail determines the next action. |
| Exact commands are named | N/A | hand-off not met. |
| Says the agent runs the check itself before reporting | Pass | Lines 123, 126-128: tests are run before the Report block. |
| Says the evidence goes in the report so nobody re-runs the check | N/A | hand-off not met. |
| Finish criteria specific enough that two runs return the same result | N/A | advisory not met. |
| States what evidence each finding must carry | N/A | advisory not met. |
| Finish check sits late in the document | Pass | Step 3 and the Report block sit just before the closing reference tables. |

**steering-rules.md — Failure**

| Rule | Result | Evidence |
| --- | --- | --- |
| Conditions that should stop the work are stated | Pass | Line 130: "If tests fail: Report failures, ask whether to proceed or investigate." |
| A retry limit is named, with something required to change before retrying | N/A | No retry construct appears anywhere in the skill. |
| Weakening the check or editing the test to make it pass is forbidden | Fail (Blocking) | Line 130 is the only failure-handling text for the baseline check, and it does not forbid editing or weakening the failing test as a way to reach "pass." |
| A named status exists for reporting the instruction itself was insufficient | N/A | hand-off not met. |
| Stopping is stated to carry no penalty | N/A | hand-off not met. |
| States what to do when input is missing/unexpected/unassessable, with a status for each | N/A | advisory not met. |
| Stop conditions sit directly after the finish check | Pass | Lines 130-132 (stop/proceed) immediately follow the Step 3 check. |

**steering-rules.md — Return**

All six rows: **N/A** — every Return rule applies only when hand-off, and hand-off is not met. (The file does have a Report template at lines 134-140, but the condition that would make these rules bite isn't present.)

**steering-rules.md — Calibration**

All four rows: **N/A** — every Calibration rule applies only when advisory, and advisory is not met.

**steering-rules.md — Composition**

| Rule | Result | Evidence |
| --- | --- | --- |
| Facts the prompt asserts are established before dispatch, with origin | N/A | hand-off not met. |
| Any script-determinable fact is made by a script, not read by hand | N/A | hand-off not met. |
| Template facts are fixed named fields to a file, not prose to parse | N/A | hand-off not met. |
| Every named hole in a template is marked required or given a default | Fail (Important) | `$BRANCH_NAME` is used at lines 94 and 96 (`path="$LOCATION/$BRANCH_NAME"`, `git worktree add "$path" -b "$BRANCH_NAME"`) with no instruction anywhere for how it's derived, sourced, or defaulted. The Report template's `<feature-name>` (line 139) has the same gap. |
| The set of template fields is fixed, not payload creep | Pass | Report template and Quick Reference stay lean; no unused accumulated fields. |
| Model or effort level named explicitly | N/A | hand-off not met. |
| Status values enumerated, with caller obligation for each | N/A | hand-off not met. |
| Each status declares scope (agent-only vs. stops the run) | N/A | hand-off not met. |
| Caller checks the report is usable, doesn't re-run proven checks | N/A | hand-off not met. |
| What happens to partial work when a run stops is stated | Fail (Important) | No cleanup/rollback guidance anywhere: if Step 3's tests fail (line 130) or Step 2's install fails (no handling at all, lines 102-119), nothing says whether the already-created worktree, branch, or installed dependencies are left in place, torn down, or resumed from. |
| Predefined named agent dispatch checked for unneeded context | N/A | hand-off not met. |

## Counts by severity

- **Blocking: 4** distinct findings (6 failing rows — two pairs share a root cause):
  1. No out-of-scope statement (Scope + Boundary rows)
  2. Ecosystem/ "ready appropriate setup" list not marked as examples, with silent skip instead of a stop-and-report fallback (two Scope rows)
  3. No prohibition on weakening or editing a failing baseline test to force a pass
  4. No baseline-comparison evidence recorded (with the external-provenance caveat noted above)
- **Important: 6** findings: description not third person; description thin on casual phrasings; no named successor skill; no general "direct instruction wins" statement; `$BRANCH_NAME`/`<feature-name>` template holes with no default; no statement on partial-work disposition when a run stops.
- **Advisory: 1** finding: no copyable checklist format.

## Three fixes to make first

1. Add an explicit out-of-scope statement (fixes the Scope and Boundary "doesn't say what it doesn't cover" rows in one edit) — e.g., name that branch cleanup, merging back, and the feature implementation itself are handled elsewhere.
2. Fix the Step 2/3 ecosystem lists (lines 106-119, 127): mark them as examples, and add an explicit fallback for an unrecognized project type ("if none of these match, ask or report rather than skipping setup") instead of the current silent-skip behavior confirmed at line 157.
3. Add a line forbidding weakening or editing the failing test to force a pass at Step 3 (line 130), alongside the existing "ask whether to proceed or investigate."

The Evidence gap (no recorded baseline comparison) is also blocking but isn't a text edit to the file — it needs an actual baseline-comparison run recorded somewhere, which is outside what a SKILL.md edit can fix.

Any blocking failure means the file needs work before use. The advisory item is listed once and does not block.