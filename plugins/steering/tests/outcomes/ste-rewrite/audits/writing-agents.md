# Audit: writing-agents

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/writing-agents/SKILL.md`
Rules: `plugins/steering/shared/skill-rules.md`, `plugins/steering/shared/steering-rules.md`
Repository at commit `7deb2ae`, working tree clean. No file was changed except this report.

## 1. Lint result, and whether the lint reached the target

`npm run lint` from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
All generated files are up to date.
```

Clean.

`npm run lint -- --explain` reports that components get every check: frontmatter hazards, name
format and length, description length (limit 1024), body line count (limit 500), and reference
resolution. It names `skills/*/SKILL.md` as a component, and says the name must match its
directory.

The target is `plugins/steering/skills/writing-agents/SKILL.md`, so it is a component and the lint
reached it. All five component checks ran against it and passed. There is no coverage gap for this
target.

That settles the mechanical limits. The body-length rule (skill-rules Loading) is recorded as a
lint pass below and was not re-derived by judgment. I did run `wc -l` on the SKILL.md files while
sweeping for reference targets, which touches the same ground; it returned 92 lines and agrees with
the lint. Disclosed here because the brief asked me to say so if I re-derived a mechanical limit.

### Conditions applied

- **always** — met.
- **reused** — met. The target is a SKILL.md.
- **hand-off** — **not met.** The SKILL.md is loaded into the current conversation. `handoff-rules.md`
  was therefore not applied, per steering-rules lines 20-22. Note that the skill *produces*
  hand-offs, and correctly tells its reader to apply `handoff-rules.md` to the prompt it writes
  (steps 2 and 5). That is the document's output, not the document's own use.
- **changes something** — **met, my determination.** The brief settled this condition for
  repo-setup only. The work this skill governs dispatches agents and produces checked-in templates,
  which modifies state. It does not change any outcome below: F1, FA3 and CO3 all pass either way,
  so treating the condition as unmet would only move those three from pass to not applicable.
- **advisory** — not met. The condition is "reviews or investigates and changes nothing", and this
  skill dispatches work. All Calibration rules and the advisory-conditioned rules in Scope, Finish
  and Failure are therefore not applicable.

## 2. Findings

SR = `steering-rules.md`, SK = `skill-rules.md`. N/A rows are marked so and are not passes.

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| SR Outcome 1 — finished outcome stated, not a topic (Blocking) | Pass | — | Lines 8-9: "This skill produces two things. It produces the prompt that makes an agent for one call. It also produces the caller side..." |
| SR Outcome 2 — outcome sits at the top (Advisory) | Pass | — | Lines 8-9, first prose after the H1 |
| SR Context 1 — nothing unresolvable (Blocking) | Pass | — | All three `../../shared/*.md` paths resolve; `writing-skills` and `auditing-skills` resolve by name; lint reference resolution passed |
| SR Context 2 — every needed fact written or pointed at (Blocking) | Pass | — | Step 3 points the status set at `dispatch-protocol.md`; step 7 uses that same table |
| SR Context 3 — approaches tried and failed are stated (Important) | Pass | — | Lines 13-15: the named-agent approach and its failure mode ("Callers then patch it until two instructions conflict") |
| SR Context 4 — context above the method (Advisory) | Pass | — | "Compose at dispatch" line 11, "Workflow" line 35 |
| SR Scope 1 — what is in scope is named (Blocking) | Pass | — | Lines 8-9 |
| SR Scope 2 — out of scope named explicitly (Blocking) | Pass | — | Lines 29-33 "Where this stops" |
| SR Scope 3 — membership test plus examples marker (Blocking) | Pass | — | Lines 20-22 give the test ("where something outside the call site depends on it staying one fixed thing") and the marker ("Three examples, not the whole list"); step 2 passes the same requirement to the produced prompt |
| SR Scope 4 — stop and report at a scope limit (Blocking) | Pass | — | Lines 61-63: "Stop and say what is missing... Do not dispatch anyway." |
| SR Scope 5 — scope statement above the method (Advisory) | Pass | — | "Where this stops" line 29, "Workflow" line 35 |
| SR Scope 6 — must not modify anything (Blocking, advisory) | N/A | — | Advisory condition not met |
| SR Method 1 — one default, not a menu (Important) | Pass | — | Single numbered workflow; "Compose the prompt at the moment of use instead" (line 16) is the default, with a bounded exception at lines 20-22 |
| SR Method 2 — order fixed where sequence matters (Blocking) | Pass | — | Steps 1-7; step 5 "Do this before you send anything" |
| SR Method 3 — constrains only where needed, and says why (Important) | Pass | — | Reasons given at lines 42-43, 48, 49, 52-53, 66. Three constraints carry no inline reason: "Do not re-run what the agent already proved" (55), "Do not weaken a check" (68), "Use a script for anything a script can determine" (37). Each is explained in `dispatch-protocol.md`, which the skill already tells the reader to open. No wrong action follows, so not escalated |
| SR Method 4 — pre-work check named as the first step (Important) | Pass | — | Step 1 "Establish the facts" |
| SR Finish 1 — a self-runnable check settles doneness (Blocking, changes something) | Pass | — | Step 5 names the check and its two rule files; line 68 makes its result binding ("Fix the input, or stop") |
| SR Finish 2 — the agent runs the check before reporting (Important) | Pass | — | Step 5 "Do this before you send anything"; step 7 "Check that the report is complete" |
| SR Finish 3 — finish criteria repeatable (Blocking, advisory) | N/A | — | Advisory condition not met |
| SR Finish 4 — evidence each finding must carry (Important, advisory) | N/A | — | Advisory condition not met |
| SR Finish 5 — finish check sits late (Advisory) | Pass | — | Steps 5 and 7 at lines 50-55, immediately before "When to stop" |
| SR Failure 1 — stop conditions stated (Blocking) | Pass | — | Lines 60-63 |
| SR Failure 2 — retry limit, and something must change (Important) | Pass | — | Lines 65-66: "only after something has changed, and at most twice per agent" |
| SR Failure 3 — weakening the check is forbidden (Blocking, changes something) | Pass | — | Line 68: "Do not weaken a check. Do not loosen a rule. Do not fill a hole with a placeholder to force a pass." |
| SR Failure 4 — handling for missing or unassessable input (Blocking, advisory) | N/A | — | Advisory condition not met |
| SR Failure 5 — stop conditions directly after the finish check (Advisory) | Pass | — | Workflow ends line 58, "When to stop" line 60. The plugin's own baseline record notes this was moved on purpose at commit `45351c7` |
| SR Calibration 1 — examples of what counts (Blocking, advisory) | N/A | — | Advisory condition not met |
| SR Calibration 2 — examples of what does not count (Blocking, advisory) | N/A | — | Advisory condition not met |
| SR Calibration 3 — default outcome stated (Blocking, advisory) | N/A | — | Advisory condition not met |
| SR Calibration 4 — describe the shape of an observed miss (Important, advisory) | N/A | — | Advisory condition not met |
| SR Composition 1 — every hole marked required or defaulted (Important, reused) | Pass | — | Satisfied with nothing to check: this document carries no template of its own. It requires the rule of what it produces, at step 4 |
| SR Composition 2 — the field set is fixed (Advisory, reused) | Pass | — | Line 49 "Keep the set of holes fixed"; lines 83-84 "Keep the set of fields the callers establish fixed and documented" |
| SR Composition 3 — partial work on stop is stated (Important, changes something) | Pass | — | Lines 71-72: "keep the established facts and any draft prompt. Say where they sit. Leave the keep-or-discard call to the person." |
| SR Voice 1 — an instructing sentence names a choosing actor (Important) | Pass | — | Workflow imperatives address the reading agent throughout |
| SR Voice 2 — a property statement keeps its owner as subject (Blocking) | Pass | — | Lines 8, 13, 16, 26 all keep the owner as subject and gain no actor |
| SR Voice 3 — nothing that cannot choose takes an action verb (Important) | Pass | — | "The harness enforces..." (21), "An unchanged retry repeats the failure" (66) and "the weight the template gathers" (49) sit inside consequence statements, and the rules file writes the same shape itself. No wrong action follows |
| SK Discovery 1 — description states the capability in searchable words (Blocking) | Pass | — | Frontmatter line 3, first sentence |
| SK Discovery 2 — description states trigger conditions (Blocking) | Pass | — | Frontmatter line 3: "Use this whenever someone mentions handing work to a subagent, dispatching or spawning agents..." plus a closing test, "even when the word agent is not used" |
| SK Discovery 3 — description carries file types, error text, casual phrasings (Important) | **Fail** | **Defect** | Frontmatter line 3 names no file type and no symptom. Both siblings do: `writing-skills` carries "a SKILL.md" plus "say a skill is not triggering, or say a skill is being ignored"; `auditing-skills` carries "a SKILL.md" plus "why a skill is not triggering". The wrong action: the skill does not load when a person names the artefact (`.claude/agents/reviewer.md`, `agents/*.md`) or reports the symptom that most often sends someone here ("my subagent came back with nothing useful", "the agent ignored the prompt"). Skill-rules line 24 records that skills undertrigger more often than they overtrigger |
| SK Discovery 4 — description does not summarise the workflow (Important) | Pass | — | Frontmatter line 3 states products and triggers, no steps |
| SK Discovery 5 — description speaks in the third person (Important) | Pass | — | Capability sentence is third person. The trigger clauses use "Use this whenever", which is the plugin-wide form and the form both siblings use |
| SK Boundary 1 — says what it does not cover (Blocking) | Pass | — | Lines 29-32 |
| SK Boundary 2 — names which skill takes over (Important) | Pass | — | Lines 30-32: "`writing-skills` does that", "`auditing-skills` does that" |
| SK Boundary 3 — a direct instruction from the person wins (Important) | Pass | — | Line 33 |
| SK Content 1 — first lines say what it produces (Important) | Pass | — | Lines 8-9 |
| SK Content 2 — nothing the model already knows (Blocking) | Pass | — | No filler found. "You can pass tool exclusions at dispatch" (24) is a harness fact that removes an objection |
| SK Content 3 — content that changes nothing is absent (Important) | **Fail** | **Defect** | Lines 79-82, "Converting a named agent": "From `../../shared/dispatch-protocol.md`, add four things" then restates four of that file's seven invariants (2, 4, 6, 3). Skill-rules names both shapes as findings: "A count of anything, especially of things in another file" and "A restatement of a list that lives in another file. The copy drifts." Three of the four are already stated in workflow step 3, so the requirement appears three times across two files. The wrong action: an agent that has read step 3 and `dispatch-protocol.md` now meets a third, shorter copy; add a fifth requirement to the protocol file and the count and the copy both go stale while still reading as authoritative, and the agent adds four and stops |
| SK Content 4 — one term for one thing (Important) | Pass | — | "hole" and "field" are used distinctly and reconciled at lines 83-84, matching `dispatch-protocol.md` "Two terms". The plugin's baseline record shows this was fixed on purpose |
| SK Content 5 — no time-sensitive material (Important) | Pass | — | No dates, versions or "currently" in the body |
| SK Content 6 — no constraint a script could enforce (Important) | Pass | — | Step 4's hole check is written to fail loudly, and step 1 sends deterministic work to a script |
| SK Loading 1 — body 500 lines or fewer (Blocking) | Pass | — | Settled by the lint's body line count check, which reached this component and passed |
| SK Loading 2 — every reference one hop (Blocking) | Pass | — | `steering-rules.md`, `handoff-rules.md` and `dispatch-protocol.md` are each named directly by the SKILL.md, so no chain has to be followed |
| SK Loading 3 — detail in reference files, not the front file (Important) | Pass | — | 92-line body; all rules live in the three shared files |
| SK Loading 4 — reference over 100 lines opens with a contents list (Advisory) | Pass | — | `steering-rules.md` (201 lines) and `dispatch-protocol.md` (114 lines) both open with "## Contents". `handoff-rules.md` is 73 lines |
| SK Loading 5 — test material not reachable (Important) | Pass | — | Nothing in the SKILL.md or in its three references points at `tests/`. Confirmed by grep across the plugin outside `tests/` |
| SK Loading 6 — no reference tells the reader to skip part of itself (Important) | Pass | — | `handoff-rules.md` line 4 gates the whole file, which is the separate-file pattern the rule asks for, not a skip inside a file |
| SK Evidence 1 — baseline comparison recorded (Blocking) | Pass | — | `plugins/steering/tests/baselines/writing-agents.md` records a with-and-without comparison on a real task and names the six behaviours absent without the skill. Linked from nothing reachable by the skill |

## 3. Counts by severity

Failures and warnings only.

| Severity | Fail | Warn |
| --- | --- | --- |
| Blocking | 0 | 0 |
| Important | 2 | 0 |
| Advisory | 0 | 0 |

Defects: 2. Differences: 0.

Rules considered: 57. Pass 47, fail 2, warn 0, not applicable 8.

No blocking failure. The document does not need work before use.

## 4. The three fixes to make first

1. **SK Content 3.** Cut "add four things" and the four restated requirements from "Converting a
   named agent" (lines 79-82). Point at `dispatch-protocol.md` and at workflow step 3 instead. This
   removes both the cross-file count and the drifting copy in one edit.
2. **SK Discovery 3.** Add the artefact and the symptoms to the description: an agent definition
   file path, and phrasings such as a subagent returning nothing useful or ignoring its prompt.
   Match the shape the two sibling descriptions already use.
3. Not a finding, listed because there were only two. **SR Method 3.** Give an inline reason to the
   three bare constraints at lines 37, 55 and 68. Each reason exists in `dispatch-protocol.md`; a
   half-line each would stop a reader having to open that file to know why the constraint is there.

## 5. Anything I did that nobody asked for

- I determined the **changes something** condition for this target myself. The brief settled it for
  `repo-setup` only. My reasoning and its effect on the outcome are in section 1.
- I read `plugins/steering/tests/baselines/writing-agents.md`. The Evidence rule required
  confirming the baseline holds observed failures, so opening it was in scope, but the file is
  deliberately unreachable from the skill and I want the read on the record.
- I read the frontmatter of `auditing-skills/SKILL.md` and `writing-skills/SKILL.md` to calibrate
  the Discovery 3 finding against the house pattern rather than against my own taste.
- I ran `wc -l` across the skills and shared files while sweeping references, which re-derives the
  body line count the lint already settled. Disclosed in section 1. It agrees with the lint.
- I ran a grep across the plugin for links to `tests/` to check Loading 5 and the "linked from
  nothing" clause of the Evidence rule.
- I created `/tmp/ste-audit/`.
