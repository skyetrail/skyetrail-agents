## Lint

`npm run lint` (`node eng/generate-readmes.mjs --check`, the command recorded in `AGENTS.md`'s repo-setup block) ran clean from the repository root. It does not cover this target, though: `readComponents()` in `eng/generate-readmes.mjs` only walks `plugins/<plugin>/skills/*/SKILL.md`, and the script's own comment says content under `tests/` is "deliberately excluded, since they are historical records that may cite paths from earlier rounds." This file lives at `plugins/steering/tests/outcomes/external-probe/skills/writing-plans/SKILL.md`, so the mechanical gate never examined it. That is a coverage gap, not a clean pass, for this file specifically.

I manually checked the same mechanical limits and disclose that here rather than presenting it as a lint result: frontmatter parses with no YAML hazards, name `writing-plans` (13 chars) is lowercase-hyphenated and matches its directory, description is 84 characters (under the 1024 limit), body is 163 lines (under the 500-line cap), and a regex check for both reference forms (`[text](target)` and backticked `./`/`../` `.md` paths) found zero matches, so there is nothing to check for resolution.

## Conditions applied

`reused`: met (given). `hand-off`: not met (given) - the Execution Handoff section does propose dispatching a fresh subagent, but that dispatch belongs to the next skill (`subagent-driven-development`), not to writing-plans' own scope, which ends once the plan file is written and saved. `changes something`: met - the skill's product is a written file (`docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`), which modifies state. `advisory`: not met - the skill does not only review or investigate; producing that file is itself the change advisory would require to be absent.

Directory sweep: the target directory also contains `plan-document-reviewer-prompt.md`. SKILL.md never names or links it (checked by grep for the filename, "reviewer-prompt," and every `.md` mention in the file), so per the audit's own scope it is not a "reference file it names," but its presence is evidence in one finding below.

## Findings: skill-rules.md

| Rule | Result | Evidence |
| --- | --- | --- |
| Discovery: description states the capability (Blocking) | Fail | Description (line 3) is "Use when you have a spec or requirements for a multi-step task, before touching code." It never says "plan," "implementation plan," or any synonym for what the skill produces. |
| Discovery: description states trigger conditions (Blocking) | Pass | Same line states a trigger: having a spec/requirements for a multi-step task, before code. |
| Discovery: casual phrasings people type (Important) | Fail | Same root cause as above: no phrasing like "write a plan," "break this into tasks," "plan this out." |
| Discovery: description doesn't summarise the workflow (Important) | Pass | The description states only a trigger, not the steps. |
| Discovery: description in third person (Important) | Fail | "Use when **you** have a spec..." (line 3) addresses the reader in second person. |
| Boundary: says what it does not cover (Blocking) | Fail | No exclusion statement anywhere in the body. |
| Boundary: names which skill takes over (Important) | Pass | "Execution Handoff" (lines 150-168) names `superpowers:subagent-driven-development` and `superpowers:executing-plans`. |
| Boundary: a direct instruction from the person wins (Important) | Fail | Only one narrow instance: "(User preferences for plan location override this default)" (line 19). No general statement. |
| Content: first lines say what it produces (Important) | Pass | Line 10 opens with "Write comprehensive implementation plans...," before any steps. |
| Content: nothing explains what the model already knows (Blocking) | Pass | "DRY. YAGNI. TDD. Frequent commits." (line 10) is terse shorthand, not exposition. |
| Content: content that wouldn't change agent behavior is absent (Important) | Fail | `plan-document-reviewer-prompt.md` sits beside SKILL.md, unreferenced, so it can never load or affect behavior. It describes dispatching a "plan document reviewer" subagent, which sits at odds with Self-Review's explicit "not a subagent dispatch" (line 140). |
| Content: one term for one thing (Important) | Pass | "spec," "plan"/"implementation plan," "task," "step" are each used consistently. |
| Content: time-sensitive material absent/confined (Important) | Pass | No dated or version-pinned claims. |
| Content: no constraint a script/regex could enforce instead (Important) | Fail | "No Placeholders" (lines 128-136) is a fixed list of literal strings ("TBD," "TODO," "implement later," "fill in details," etc.); Self-Review's "Placeholder scan" (line 144) re-enacts this by prose rather than a grep. |
| Loading: body <= 500 lines (Blocking) | Pass | 163 body lines (manually counted; see Lint). |
| Loading: every reference one hop from SKILL.md (Blocking) | Pass | Zero markdown links or backticked relative `.md` paths exist (regex-checked), so none can be more than one hop away. |
| Loading: detail sits in reference files (Important) | Pass | 163 of 500 lines used; no pressure to offload detail. |
| Loading: reference file >100 lines opens with contents list (Important) | N/A | The only other file, `plan-document-reviewer-prompt.md`, is 49 lines and is not referenced by SKILL.md. |
| Loading: test material unreachable from the skill (Important) | Pass | No test or eval material is linked from or near this file. |
| Loading: no reference file instructs skipping part of itself (Important) | Pass | No reference files are loaded by SKILL.md at all. |
| Evidence: baseline comparison recorded in tests/baselines/ (Blocking) | Fail | `plugins/steering/tests/baselines/` contains only `auditing-skills.md`, `repo-setup.md`, `writing-agents.md`, `writing-skills.md`. No `writing-plans.md` exists anywhere in the repository (checked with `find . -iname "*writing-plans*"`), and SKILL.md cites no baseline evidence of its own. |

## Findings: steering-rules.md

| Rule | Result | Evidence |
| --- | --- | --- |
| Outcome: finished outcome stated (Blocking, always) | Pass | Line 10: "Write comprehensive implementation plans... Give them the whole plan as bite-sized tasks." |
| Outcome: sits at top (Advisory, always) | Pass | First line of the body. |
| Outcome: checkable without asking the author (Important, hand-off) | N/A | hand-off not met. |
| Context: nothing refers to something unresolvable (Blocking, always) | Pass | `superpowers:*` cross-references use the plugin:skill-name resolution convention, not a bare nickname; no reference to an unlogged conversation or decision. |
| Context: every fact written out or pointed at (Blocking, always) | Pass | The skill assumes the spec is already in hand, consistent with its own trigger condition. |
| Context: approaches tried and failed stated (Important, always) | Pass | "No Placeholders" (lines 128-136) names concrete plan-writing failure modes to avoid. |
| Context: local conventions stated (Important, hand-off) | N/A | hand-off not met. |
| Context: sits above method (Advisory, always) | Pass | Overview/Context/Save-location precede File Structure and later sections. |
| Scope: in scope named (Blocking, always) | Pass | Turning a spec into a detailed, bite-sized implementation plan. |
| Scope: out of scope named explicitly (Blocking, always) | Fail | Same root cause as Boundary above; no exclusion anywhere in the body. |
| Scope: list of kinds marked as examples (Blocking, always) | Fail | Self-Review's placeholder check: "Search your plan for red flags, any of the patterns from the 'No Placeholders' section above" (line 144) treats that list as closed, not illustrative. The "Global Constraints" bracket (lines 71-74: "version floors, dependency limits, naming and copy rules, platform requirements") has the same unmarked-list shape. |
| Scope: stop and report on a scope limit, not work around it (Blocking, always) | Fail | Self-Review says "fix them inline... just fix and move on" and "add the task" for an uncovered spec requirement (lines 146-148) instead of surfacing the gap. The only report-worthy trigger is Scope Check's narrow multi-subsystem case (lines 21-23). |
| Scope: scope statement above method (Advisory, always) | N/A | No out-of-scope statement exists to position; folds under the Scope finding above. |
| Scope: must-not-modify, says what to do instead (Blocking, advisory) | N/A | advisory not met. |
| Method: one default approach, not a menu (Important, always) | Pass | Single plan-writing sequence; Execution Handoff's two options mark one "(recommended)" (line 156). |
| Method: order fixed where correctness matters (Blocking, always) | Pass | TDD step order (write test, verify fail, implement, verify pass, commit) is correctly fixed. |
| Method: constrained only where required, each constraint says why (Important, always) | Fail | "Every plan MUST start with this header" (line 56) and "Each step is one action (2-5 minutes)" (line 47) are rigid, specific mandates with no stated reason either needs that exact form. |
| Method: check before work starts named first (Important, always) | Pass | Scope Check (lines 21-23) is the first substantive step after the Overview. |
| Method: checklist the agent can copy and tick off (Advisory, reused) | Warn | Self-Review's three numbered checks (lines 142-146) come closest, but cover only the review phase, aren't `- [ ]` items, and no checklist exists for the skill's full workflow. |
| Finish: a self-run check settles whether work is done (Blocking, changes something) | Pass | Self-Review (lines 138-148) is run by the agent itself; its outcome (fix inline / add missing tasks) settles readiness for Execution Handoff. |
| Finish: exact commands named (Important, hand-off) | N/A | hand-off not met. |
| Finish: agent runs the check before reporting (Important, always) | Pass | Self-Review, explicitly "not a subagent dispatch" (line 140), precedes Execution Handoff (lines 150-160). |
| Finish: evidence goes in the report (Important, hand-off) | N/A | hand-off not met. |
| Finish: criteria reproducible across runs (Blocking, advisory) | N/A | advisory not met. |
| Finish: evidence per finding stated (Important, advisory) | N/A | advisory not met. |
| Finish: check sits late in the document (Advisory, always) | Pass | Self-Review is the second-to-last section. |
| Failure: conditions that should stop work are stated (Blocking, always) | Fail | Same root cause as the Scope stop-and-report finding; no general stop condition beyond the narrow multi-subsystem case. |
| Failure: retry limit named, something changes before retry (Important, always) | Pass | No retry/attempt-loop construct exists in the skill's own process for a limit to bound. |
| Failure: weakening the check forbidden (Blocking, changes something) | Pass | Self-Review calls for genuine remediation ("fix them inline," "add the task"), with no language inviting the check to be loosened. |
| Failure: named status for insufficient instruction (Important, hand-off) | N/A | hand-off not met. |
| Failure: stopping carries no penalty (Important, hand-off) | N/A | hand-off not met. |
| Failure: status for missing/unexpected/unassessable input (Blocking, advisory) | N/A | advisory not met. |
| Failure: stop conditions sit directly after finish check (Advisory, always) | N/A | No dedicated stop-conditions section exists to position; folds under the Failure finding above. |
| Return: all six rules (hand-off) | N/A | hand-off not met. |
| Calibration: all four rules (advisory) | N/A | advisory not met. |
| Composition: facts established before dispatch (Important, hand-off) | N/A | hand-off not met. |
| Composition: script vs. dispatched-agent determination (Important, hand-off) | N/A | hand-off not met. |
| Composition: template facts as fixed fields to a file (Important, hand-off) | N/A | hand-off not met. |
| Composition: every named hole marked required or defaulted (Important, reused) | Fail | Plan Document Header/Global Constraints brackets (lines 58-77, e.g. `[Feature Name]`, `[One sentence describing what this builds]`) have no required-fill check tied to them. Self-Review's placeholder scan is scoped to "the patterns from the 'No Placeholders' section above" (line 144), which does not list generic unfilled brackets. |
| Composition: template field set fixed, no accumulating payload (Advisory, reused) | Pass | Header's four fields (Goal, Architecture, Tech Stack, Global Constraints) are fixed and lean. |
| Composition: model/effort named explicitly (Important, hand-off) | N/A | hand-off not met. |
| Composition: status values enumerated (Blocking, hand-off) | N/A | hand-off not met. |
| Composition: status scope declared (Important, hand-off) | N/A | hand-off not met. |
| Composition: caller checks report usable (Important, hand-off) | N/A | hand-off not met. |
| Composition: what happens to partial work when a run stops (Important, changes something) | Fail | Nothing states what to do with a partially written plan document if the run is interrupted before Self-Review/Execution Handoff. |
| Composition: predefined-agent context check (Advisory, hand-off) | N/A | hand-off not met. |

## Counts by severity

Consolidated by root cause (dependent rules folded into the finding they depend on): 11 findings total.

- Blocking: 5 (description omits the capability/casual phrasing; no stated non-coverage; the "fix and move on" default with no general stop-and-report condition; the closed placeholder-scan list; no recorded baseline evidence)
- Important: 5 (second-person description; only a narrow person-overrides-skill instance; rigid form constraints with no stated why; unfilled template holes not covered by a required-fill check; no statement of what happens to partial work on a stopped run)
- Advisory: 1 (warn: no full-workflow checklist for the agent to tick off)

Any blocking failure means the file needs work before use. There are 5.

## Three fixes to make first

1. Rewrite the description to name the deliverable and add real trigger phrasing, in third person: it currently never says "plan," so requests like "write a plan" or "break this into tasks" may not surface the skill at all.
2. Add an explicit statement of what this skill does not cover (for example: it plans from an existing spec, it does not write the spec, and it stops before any code or tests are touched).
3. Replace the "fix them inline... just fix and move on" / add-the-task-silently default with a stated condition for stopping and reporting to the person when the spec is ambiguous, contradictory, or too thin to plan against confidently, rather than only handling the narrow multi-subsystem case in Scope Check.