# Audit: `finishing-a-development-branch/SKILL.md`

**Target:** `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/external-probe/skills/finishing-a-development-branch/SKILL.md`
**Type:** SKILL.md (frontmatter with `name`/`description`, directory-named skill) → `skill-rules.md` and `steering-rules.md` both apply. The target names no reference files (no markdown links, no backticked relative paths), so nothing else was read in.

**Conditions applied** (steering-rules.md, incorporated via skill-rules.md with `reused` met / `hand-off` not met, as given): `always` — met. `reused` — met (given). `hand-off` — not met (given). `changes something` — met: the document's own Step 5 is titled "Execute Choice" and runs `git checkout`, `git merge`, `git push`, `git branch -d/-D`, `git worktree remove` — it mutates repo, branch, and remote state. `advisory` — not met: Steps 1–2 only gather information to feed the execution in Steps 4–6; investigation isn't the deliverable, integration is.

**Lint.** Ran `npm run lint` (`node eng/generate-readmes.mjs --check`) from the repository root: exit 0, "All generated files are up to date." That script only walks `plugins/<name>/skills/*/SKILL.md` (confirmed by reading `eng/generate-readmes.mjs`); this target sits under `plugins/steering/tests/outcomes/external-probe/skills/...`, a fixture tree the script never reads. So the mechanical gate (frontmatter/YAML validity, name format/length/directory match, description length, body-line ceiling, reference resolution) never actually ran against this file — a coverage gap, not a pass, for this specific target. Saying so rather than presenting a hand check as a lint result: by direct inspection, frontmatter parses with no unquoted `: ` or ` #` hazards, name `finishing-a-development-branch` matches its directory and the lowercase-hyphen pattern (31 chars), description is 101 characters, body is 196 lines (line 6 through line 201, by the script's own counting method), and the file contains zero markdown links and zero backticked relative-path references. None of that is close to any limit.

## skill-rules.md

| Rule | Result | Evidence |
| --- | --- | --- |
| Discovery: description states the capability, in searchable words | Fail | L3: "Use when implementation is complete, all tests pass, and you need to decide how to integrate the work" — states the trigger moment, never the capability. No occurrence anywhere in the description of "branch," "merge," "PR"/"pull request," "push," "git," or "worktree." |
| Discovery: description states the conditions that should trigger it | Pass | L3 — "implementation is complete," "all tests pass" are explicit trigger conditions. |
| Discovery: description includes file types, error text, casual phrasings people type | Fail | Same root cause as row above. Nothing like "merge my branch," "open a PR," "clean up this worktree" is represented. |
| Discovery: description does not summarise the workflow/process | Pass | L3 states a precondition and a goal, not the six-step process. |
| Discovery: description written in third person | Fail | L3 contains "you need to decide" — second person. |
| Boundary: skill says what it does not cover | Fail | Not found anywhere in lines 1–201. No mention of merge-strategy choice, conflict resolution, rebasing, or CI/review gating being out of scope. |
| Boundary: names which skill takes over where it stops | Fail | Dependent on the row above — with no stated boundary, nothing marks a hand-off point either. |
| Boundary: says a direct instruction from the person wins over the skill | Fail | L78–82: "Present the menu exactly as written... Wait for their answer"; L194 rationalization explicitly rejects inferring the human's wish ("They obviously want it merged" → "Present the menu and wait"). Nothing addresses a human's *explicit* prior instruction to skip the menu — only the literal word `discard` (L143) is ever treated as sufficient to bypass a default. |
| Content: first lines say what the skill produces, before steps | Fail | L10: "**Core principle:** Verify tests → Detect environment → Present options → Execute choice → Clean up." — this is the step pipeline, not the produced outcome. |
| Content: nothing explains what the model already knows | Pass | Git-internals detail (L31–35 `GIT_DIR`/`GIT_COMMON`) and the rationalizations table are specific/behavioral, not generic exposition. |
| Content: content that would not change agent behaviour is absent | Warn | L180–187 "Quick Reference" table restates Steps 4–6 with no new instruction. Plausibly a useful compact cross-check, plausibly inert restatement — can't settle which from the text alone. |
| Content: one term used for one thing throughout | Pass | "your human partner," "worktree," "base branch," "feature branch" are used consistently. |
| Content: time-sensitive material absent or confined | Pass | No dates, versions, or "currently" claims found. |
| Content: no documented constraint a script/regex could enforce instead | Pass | No such constraint found. |
| Loading: body 500 lines or fewer | Pass | 196 body lines by direct count; not lint-confirmed for this file (see lint note), but not a close call either way. |
| Loading: every reference is one hop | Pass | Zero markdown links and zero backticked relative-path references exist to resolve. |
| Loading: detail sits in reference files rather than front file | Pass | Whole file is 196 lines of core, always-relevant procedure; nothing reads as supplementary depth that belongs elsewhere. |
| Loading: reference file >100 lines opens with contents list | N/A | No reference files exist. |
| Loading: test material not reachable from the skill | Pass | No test material is linked from or embedded in this file. |
| Loading: no reference file instructs reader to skip part of itself | N/A | No reference files exist. |
| Evidence: baseline comparison recorded in the plugin's `tests/baselines/` | Fail | `plugins/steering/tests/baselines/` contains only `auditing-skills.md`, `repo-setup.md`, `writing-agents.md`, `writing-skills.md` — no file for this skill, and none could exist there under the current process since this skill is not part of this plugin. |

## steering-rules.md

| Rule | Result | Evidence |
| --- | --- | --- |
| Outcome: finished outcome stated, not just a topic | Pass | Each of the three options carries a terminal "Report:" line (e.g. L130) defining what "done" looks like for that branch. |
| Outcome: outcome statement sits at the top | Fail | Same root cause as the Content row above — L10 opens with steps; the per-option outcome statements sit at L106–130, not the top. |
| Outcome: checkable without asking the author | N/A | hand-off not met. |
| Context: nothing refers to something the agent cannot resolve | Fail | L169–170: "Superpowers created this worktree — we own cleanup." "Superpowers" is an unexplained proper noun with no definition anywhere in the file, and "we" has no stated antecedent. A reader of this file alone (which is how a skill loads) cannot resolve either. |
| Context: every fact is written out or pointed at by a readable path | Pass | Aside from the row above, gaps (e.g. base branch source) are resolved via an explicit fallback ("ask," L49–50). |
| Context: approaches already tried and found not to work are stated | Pass | L191–201 "Common Rationalizations" table documents known-bad shortcuts and why each fails. |
| Context: local conventions stated | N/A | hand-off not met. |
| Context: context sits above the method | Pass | Not a meaningful violation given the document's procedural nature; no separable context blob is misplaced (distinct from the Content/Outcome finding above, which is about produced-outcome framing, not context). |
| Scope: what is in scope is named | Pass | The six Step headings (L14, L28, L46, L53, L84, L159) collectively name the covered activity. |
| Scope: what is out of scope is named explicitly | Fail | Same finding as the Boundary row above. |
| Scope: category of work defined, lists marked as examples | Pass | The three-state environment table (L40–44) is an exhaustive binary/ternary split for a single git repo, not an ambiguous list; L48–50's "plan, conversation, upstream" is followed by an explicit non-exhaustive fallback ("ask"). |
| Scope: stop-and-report at a scope limit, rather than work around it | Pass | L18 and L102–104 both stop and report on test failure rather than proceeding. (A related, narrower gap — no stop condition for a `git merge` failure itself — is captured under Failure below.) |
| Scope: scope statement sits above the method | N/A | No scope/boundary statement exists at all (see Boundary finding above) — a rule about its position doesn't apply to a section that isn't there. |
| Scope: must-not-modify stated, with what to do instead | N/A | advisory not met. |
| Method: one default approach given, not a menu | Pass | Steps 1–3, 5–6 each give one procedure to the agent; the human-facing menu (Step 4) is the product, not the agent's own method. L121–123's CLI-vs-URL split is a conditioned default (CLI if available, else URL), not an open choice. |
| Method: order fixed where sequence affects correctness | Pass | Numbered Steps 1–6 in a dependency-respecting order. |
| Method: constrained only where necessary, and says why | Pass | E.g. "present the menu exactly as written" is justified elsewhere (L194, "Integration is your human partner's decision"); the discard phrase-match (L143, L196) is justified by the preceding itemized permanent-deletion warning (L138–141). |
| Method: any pre-work check is named as the first step | Pass | L14–26, Step 1 is the test-suite run before anything else happens. |
| Method: a checklist the agent can copy and tick off | Fail (Advisory) | No `- [ ]` checklist syntax anywhere in the file (confirmed by search); closest analogues (numbered Steps, Quick Reference table) aren't a tickable list. |
| Finish: a self-runnable check settles whether the work is done | Pass | L16 and L98–99 both name an agent-runnable test-suite check that gates progress. |
| Finish: exact commands named | N/A | hand-off not met. |
| Finish: agent runs the check itself before reporting | Pass | L16 ("Run the project's full test suite...") and L98–99 place the run before any report or further action. |
| Finish: evidence goes in the report | N/A | hand-off not met. |
| Finish: finish criteria reproducible across runs | N/A | advisory not met. |
| Finish: evidence-per-finding stated | N/A | advisory not met. |
| Finish: finish check sits late, near the stop decision | Pass | The post-merge check (L98–99) sits immediately before the branch is actually deleted (L106–111). |
| Failure: conditions that should stop the work are stated | Fail | L94–99: `git checkout` → `git pull` → `git merge <feature-branch>` runs directly into "# Verify tests on merged result" with no branch for a merge conflict or a failed pull. Push failure (Option 2, L115–119) is addressed only for the one rejected-push case (L201); no general "stop and report" for other push failures. |
| Failure: a retry limit is named, with something that must change | Pass | No retry logic is attempted anywhere (failures stop rather than loop), so there's nothing for this rule to catch. |
| Failure: weakening the check or editing the test to pass is forbidden | Fail | Nowhere in the file (L16–26 or L98–104, the two test-gate points) is it stated that editing or weakening a failing test to force a pass is forbidden, despite the entire completion gate resting on "tests pass." |
| Failure: named status for reporting the instruction itself was insufficient | N/A | hand-off not met. |
| Failure: stopping carries no penalty | N/A | hand-off not met. |
| Failure: missing/unexpected/unassessable input handling, with a status | N/A | advisory not met. |
| Failure: stop conditions sit directly after the finish check | Pass | L18 follows L16 immediately; L102 follows L98–99 immediately. |
| Return (6 rules: sections named, wording fixed, detail-to-file, failures inlined, unasked-for items listed, format at end) | N/A | hand-off not met for all six. |
| Calibration (4 rules: examples of what counts/doesn't, default stated, shape not label) | N/A | advisory not met for all four. |
| Composition: facts established pre-dispatch, with origin | N/A | hand-off not met. |
| Composition: deterministic determination made by script, not agent | N/A | hand-off not met. |
| Composition: template fields as fixed named fields, not prose | N/A | hand-off not met. |
| Composition: every named template hole marked required or defaulted | Pass | `<base-branch>` has an explicit resolution path (ask, L49–50); `<feature-branch>`, `<name>`, `<path>` are all derivable from current git state via the same angle-bracket convention used throughout. |
| Composition: template's field set is fixed, no accumulating payload | Pass | No evidence of unused accumulated fields. |
| Composition: model/effort level named explicitly | N/A | hand-off not met. |
| Composition: status values enumerated, caller obligation stated | N/A | hand-off not met. |
| Composition: each status scoped (agent-only vs whole-run) | N/A | hand-off not met. |
| Composition: caller checks the report is usable, doesn't re-run | N/A | hand-off not met. |
| Composition: what happens to partial work when a run stops is stated | Pass | L102–104 explicitly states the post-merge failure state: "nothing has been pushed, so the merge is local and recoverable." |
| Composition: named-agent dispatch checked for unneeded context | N/A | hand-off not met. |

## Counts by severity

- **Blocking: 6** — no stated boundary/out-of-scope (skill-rules Boundary-1, dependent Boundary-2, and steering Scope-2); description carries no capability keywords (skill-rules Discovery-1, dependent Discovery-3); no baseline-comparison record exists or could exist for this skill in this plugin (skill-rules Evidence-1); "Superpowers"/"we" is an unresolvable reference (steering Context-1); no handling for a merge/pull/push failure beyond one rationalization (steering Failure-1); no prohibition on weakening a failing test to force a pass (steering Failure-3).
- **Important: 3 fail, 1 warn** — description is second person (skill-rules Discovery-5); no statement that a direct human instruction overrides the default menu (skill-rules Boundary-3); opening lines state the step pipeline, not the produced outcome (skill-rules Content-1, dependent steering Outcome-2); the Quick Reference table's value is unclear (skill-rules Content-3, warn).
- **Advisory: 1** — no copy-and-tick checklist (steering Method-5). Listed once, does not block.

## Three fixes to make first

1. Rewrite the description to name the actual capability and its domain terms (branch, merge, pull request, push, worktree) instead of only the trigger condition — as written it has no lexical anchor for the phrasings people actually type ("merge my branch," "open a PR").
2. State what this skill does not cover (merge-strategy choice, conflict resolution, rebasing, CI/review gating) and what happens when a `git merge` or `git pull` in Step 5 fails or conflicts — right now the procedure silently assumes both succeed.
3. Add an explicit prohibition on weakening or editing a failing test to force a pass, next to the two test gates (Step 1 and the post-merge check in Option 1) — the whole completion gate rests on "tests pass" with no guard against faking it.

Six rules failed at Blocking severity, so the file needs work before use. The one Advisory item (no tickable checklist) is noted and does not block.