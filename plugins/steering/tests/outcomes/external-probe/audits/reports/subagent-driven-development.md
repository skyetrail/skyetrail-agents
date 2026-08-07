Target: `plugins/steering/tests/outcomes/external-probe/skills/subagent-driven-development/SKILL.md`. Rule files: `skill-rules.md` + `steering-rules.md` (this is a SKILL.md). Reference files read in full: `implementer-prompt.md`, `task-reviewer-prompt.md`, `re-review-prompt.md`, `scripts/sdd-workspace`, `scripts/task-brief`, `scripts/review-package`.

**Conditions applied:** always (met), reused (met, per instruction), hand-off (not met, per instruction). `changes something`: met — the orchestrating agent itself writes the ledger, creates/deletes the workspace (`rm -rf <workspace>`), and runs `git rev-parse`, beyond dispatching subagents that implement, test, and commit. `advisory`: not met — the document's purpose is to drive an implementation to completion, not only to review or investigate.

**Lint.** `../../shared/lint.md` resolves to `npm run lint` (`node eng/generate-readmes.mjs --check`) — no `repo-setup` block in the repository's `AGENTS.md`, so the file's own fallback applies: "`npm run lint`... in this plugin's own repository it is the answer." Ran from `/Users/pete/workspace/skyetrail-agents`: passed, "All generated files are up to date." That result gives no coverage of this target: the script only walks each marketplace plugin's own `skills/` folder (`plugins/steering/skills/*`), never `plugins/steering/tests/**`, and its source carries an explicit comment that test material is "deliberately excluded, since they are historical records that may cite paths from earlier rounds." Per lint.md, this is a coverage gap, not a clean pass, for this file. I hand-replicated the script's exact mechanical checks (frontmatter hazards, name format/length/directory match, description length, body line count, reference resolution) against the target and flag that here rather than presenting it as a lint result: name and description are within limits, the directory matches, no YAML hazards; body is 498 of 500 lines; one reference does not resolve (detailed below).

### Blocking

| Rule | Result | Evidence |
| --- | --- | --- |
| The description states the capability, in the words someone looking for it would use. (skill-rules, Discovery) | Fail | Frontmatter line 3: `Use when executing implementation plans with independent tasks in the current session`. Entirely a trigger clause — never states what the skill does (dispatch a fresh implementer subagent per task, review each, whole-branch review at the end). None of "subagent," "dispatch," "delegate," or "review" appears, though that mechanism is the skill's whole differentiator from the sibling `executing-plans`, which its own decision tree names as the alternative. |
| The description states the conditions that should trigger it. (skill-rules, Discovery) | Pass | Same line names three real trigger signals: a plan exists, tasks are independent, staying in the current session. |
| The skill says what it does not cover. (skill-rules, Boundary) | Pass | Lines 19-37, "When to Use" decision tree, routes no-plan/tightly-coupled cases and parallel-session cases elsewhere. |
| Nothing in the skill explains something the model would already know. (skill-rules, Content) | Pass | Reviewed in full; no generic explanation found that isn't tied to this workflow's specific mechanics. |
| The SKILL.md body is 500 lines or fewer. (skill-rules, Loading) | Pass | 498 lines (hand-derived; see lint note). |
| Every reference is one hop from the SKILL.md that names it. (skill-rules, Loading) | Fail | Line 400: `[code-reviewer.md](../requesting-code-review/code-reviewer.md)`. No `requesting-code-review` directory exists anywhere in the collection — only an unrelated `receiving-code-review` skill. The Final Review step and the process diagram both point the agent here for the whole-branch review dispatch. |
| Nothing refers to something the agent cannot resolve... (steering, Context, always) | Fail | Same root cause as above (line 400). |
| Every fact the agent needs is either written out or pointed at by a path it can read. (steering, Context, always) | Pass | PLAN_FILE/BRIEF_FILE/REPORT_FILE/DIFF_FILE are all generated-and-printed paths; `superpowers:*` mentions are skill-name references, not paths. |
| What is in scope is named. (steering, Scope, always) | Pass | Lines 19-37. |
| What is out of scope is named explicitly... (steering, Scope, always) | Pass | Lines 19-37, explicit "no" edges. |
| Where a category of work is named, it is defined by what makes something a member, and any list of kinds is marked as examples... (steering, Scope, always) | Fail | Lines 245-248: BLOCKED is triaged into exactly four numbered cases (context problem / needs more reasoning / task too large / plan is wrong), with no "examples, not the whole list" qualifier. A broken or misconfigured environment (missing tooling, no test runner, dirty pre-existing repo state) fits none of the four, and the numbered form reads as exhaustive. |
| The instruction says to stop and report on reaching a scope limit, rather than work around it. (steering, Scope, always) | Pass | E.g. lines 151-155 (batched pre-flight question), 358-371 (breaker STOP). |
| The order is fixed where sequence affects correctness... (steering, Method, always) | Pass | Process diagram plus numbered Task Loop steps 1-5. |
| A check the agent can run itself is named, and its result settles whether the work is done. (steering, Finish, changes something) | Pass | Task reviewer / re-reviewer / final-reviewer verdicts gate task and branch completion throughout. |
| The skill has been through a baseline comparison... recorded in the plugin's `tests/baselines/` directory... (skill-rules, Evidence) | Fail | No `tests/baselines/subagent-driven-development.md` (or equivalent) is reachable anywhere under the given directories. The repository's only `tests/baselines/` directory (`plugins/steering/tests/baselines/`) belongs to a different plugin and holds files for `auditing-skills`, `repo-setup`, `writing-agents`, `writing-skills` only. |
| Conditions that should stop the work are stated. (steering, Failure, always) | Pass | Line 17; lines 244-254; lines 358-371. |
| Weakening the check or editing the test to make it pass is forbidden. (steering, Failure, changes something) | Fail | Absent — confirmed by search across all four files. This matters more than usual here: task-reviewer-prompt.md line 67 and re-review-prompt.md line 61 both instruct reviewers "Do not re-run the suite to confirm their report," so a weakened assertion or a quietly skipped test has no other check standing behind the implementer's own self-report. |

### Important

| Rule | Result | Evidence |
| --- | --- | --- |
| The description includes the file types, error text, and casual phrasings people actually type. (skill-rules, Discovery) | Fail | Same root cause as the capability finding above — the description has no room for alternate phrasing since it is one trigger clause. |
| The description does not summarise the workflow or the process. (skill-rules, Discovery) | Pass | No workflow steps appear in the description. |
| The description is written in the third person. (skill-rules, Discovery) | Fail | Same root cause — "Use when..." is imperative, not a third-person capability statement, and there is no capability clause to be third-person about. |
| The skill names which skill takes over where it stops. (skill-rules, Boundary) | Fail | Lines 28, 31, 33: the "no implementation plan" and "tightly coupled tasks" edges both land on the generic box "Manual execution or brainstorm first" — never naming `writing-plans` or `brainstorming`, both of which exist as sibling skills in this same collection. Contrast line 35, which does name `executing-plans` explicitly for the parallel-session case. |
| The skill says a direct instruction from the person wins over the skill. (skill-rules, Boundary) | Fail | Absent — searched in full. The nearest passages run the other way: line 17 ("Continuous execution") lists only BLOCKED / genuine ambiguity / all-complete as reasons to stop, omitting "the human said so," and lines 114-115 cover only branch-start consent. |
| The first lines say what the skill produces, before any steps. (skill-rules, Content) | Pass | Lines 8-12. |
| Content that would not change what an agent does is absent. (skill-rules, Content) | Pass | No filler content identified. |
| One term is used for one thing throughout. (skill-rules, Content) | Pass | "Controller"/"you" and "review package"/"diff file" are each used consistently once their correspondence is defined; no confusion found that would change behavior. |
| Time-sensitive material is absent... (skill-rules, Content) | Pass | No dates, versions, or tool-specific claims found. |
| The skill does not document a constraint that a script or a regex could enforce instead. (skill-rules, Content) | Pass | No purely mechanical constraint found stated in prose. |
| Detail sits in reference files rather than the front file. (skill-rules, Loading) | Fail | Lines 438-503, "Example Workflow" — a ~66-line worked transcript inlined in the main file, the largest single removable block, while the body already sits at 498 of 500 lines and the skill already externalizes comparable material into three reference files. |
| A reference file longer than 100 lines opens with a contents list. (skill-rules, Loading) | Fail | `implementer-prompt.md` (142 lines), `task-reviewer-prompt.md` (185 lines), `re-review-prompt.md` (106 lines) — all three open directly with a title and a one-line purpose statement, none with a contents list. |
| Material used to test the skill is not reachable from it... (skill-rules, Loading) | Pass | No test-fixture material referenced from within the skill's own content. |
| No reference file instructs the reader to ignore or skip part of itself. (skill-rules, Loading) | Pass | None of the three templates contains a conditional skip instruction. |
| Approaches already tried and found not to work are stated. (steering, Context, always) | Pass | Lines 117-120 (lost-context re-dispatch failure), 221-225 (42k-char pasted-history dispatch), 405-407 (per-finding fixer cost). |
| One default approach is given rather than a menu of options. (steering, Method, always) | Pass | Single linear process throughout; Model Selection is calibration within one method, not competing methods. |
| How the work is done is constrained only where required, and each constraint says why. (steering, Method, always) | Pass | E.g. line 230 (never `HEAD~1`, states why), lines 177-179 (always specify model, states why), lines 355-356 (never fix yourself, states why). |
| Any check that must run before work starts is named as the first step. (steering, Method, always) | Pass | Lines 110-155, "Setup," first box in the process diagram. |
| The instruction says the agent runs the check itself before reporting. (steering, Finish, always) | Pass | Task Loop step 3 (review) gates step 5 (complete) throughout. |
| A retry limit is named, and something must change before a retry... (steering, Failure, always) | Pass | Lines 302-336: five-round cap; rounds 1-3 get new findings, rounds 4-5 get a fresh implementer on a more capable model. |
| Every named hole in a template is marked required or given a default... (steering, Composition, reused) | Fail | `task-reviewer-prompt.md` lines 168-182 mark `[MODEL]`, `[BRIEF_FILE]`, `[REPORT_FILE]`, `[DIFF_FILE]` REQUIRED but not `[GLOBAL_CONSTRAINTS]`, `[BASE_SHA]`, `[HEAD_SHA]`. `re-review-prompt.md` lines 94-103 mark only `[MODEL]` REQUIRED, leaving `[BRIEF_FILE]`, `[FINDINGS]`, `[REPORT_FILE]`, `[FIX_BASE_SHA]`, `[HEAD_SHA]`, `[DIFF_FILE]` unmarked despite being load-bearing. `implementer-prompt.md` shows the same pattern inline (only `[MODEL — REQUIRED...]` is flagged). |
| What happens to partial work when a run stops is stated. (steering, Composition, changes something) | Warn | Lines 117-120 and 139-140 (ledger/git-log recovery framing) imply partial work persists as commits and is recoverable, but no passage directly states what happens to partial progress — e.g. failed fix-round commits — when a run stops at BLOCKED or at the breaker. Could not settle from what's readable whether this is deliberate or an omission. |
| The set of fields established for a template is fixed... (steering, Composition, reused) | Pass | Placeholder lists in the three templates are lean; no unused/vestigial field found. |

### Advisory

| Rule | Result | Evidence |
| --- | --- | --- |
| The outcome statement sits at the top, before context and method. (steering, Outcome, always) | Fail | Lines 6-12 (opening) state method/approach ("Execute plan by dispatching..."), not the finished outcome. The actual completion statement lives only in "Finish," lines 416-424, near the end. |
| Context sits above the method... (steering, Context, always) | Pass | Rationale and applicability (lines 6-43) precede Setup/Process detail (110+). |
| The scope statement sits above the method. (steering, Scope, always) | Pass | Lines 19-43 precede lines 110+. |
| A checklist the agent can copy and tick off is included. (steering, Method, reused) | Fail | Absent — no `- [ ]`-style checklist anywhere; state is tracked via prose ledger lines and externally-implied todos. |
| The finish check sits late in the document... (steering, Finish, always) | Pass | Lines 391-424, near the document's end. |
| The stop conditions sit directly after the finish check. (steering, Failure, always) | Pass | "Final Review" (391-414) carries its own stop conditions immediately before "Finish" (416-424). |

### Not applicable (condition not met)

| Rule(s) | Result | Evidence |
| --- | --- | --- |
| Outcome: "stated in terms the agent can check without asking the author" | N/A | hand-off not met |
| Context: "Local conventions the agent could not infer are stated" | N/A | hand-off not met |
| Scope: "must not modify anything... what to do instead" | N/A | advisory not met |
| Finish: "exact commands named"; "evidence goes in the report" | N/A | hand-off not met |
| Finish: "finish criteria specific enough for two runs to match"; "evidence each finding must carry" | N/A | advisory not met |
| Failure: "named status for insufficient instruction"; "stopping carries no penalty" | N/A | hand-off not met |
| Failure: "what to do when input is missing/unexpected, with a status" | N/A | advisory not met |
| Return (all 6 rules: sections named, wording fixed, detail to named file, failures inlined, list unasked-for work, format at end) | N/A | hand-off not met |
| Calibration (all 4 rules: examples of what counts/doesn't, default-outcome stated, shape-not-label) | N/A | advisory not met |
| Composition: facts established pre-dispatch w/ origin; script-determinable facts made by script; template facts as named fields to file; model/effort named explicit; status values enumerated w/ obligations; status scope declared; caller checks report usable; predefined-agent context checked | N/A | hand-off not met (8 rules) |

### Counts by severity (root-cause findings; dependent rule rows folded into their root cause)

- Blocking: 5 fail — broken reference to `code-reviewer.md`; no baseline-comparison evidence; BLOCKED's four-case list reads as exhaustive; no prohibition on weakening a check/test; description states no capability.
- Important: 5 fail, 1 warn — successor skill not named at one boundary; no "direct instruction wins" statement; worked example left in the front file; three reference files over 100 lines lack a contents list; template holes inconsistently marked required; (warn) partial-work-on-stop not stated.
- Advisory: 2 fail — outcome statement not at the top; no copyable checklist.

### Three fixes to make first

1. Fix the dead link at line 400 (`../requesting-code-review/code-reviewer.md`) — as written, the Final Review step of every run dispatches against a file that does not exist in this collection.
2. State explicitly that weakening a check or editing a test to force a pass is forbidden, and say so before the fix loop — the reviewer templates already forbid re-running the suite to verify the implementer's claims, so nothing else stands behind test integrity.
3. Produce the baseline-comparison record the Evidence rule requires (or mark the skill unvalidated) before it is relied on — nothing currently shows this skill changes agent behavior for the better.