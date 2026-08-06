I've completed the audit. Here is the report.

## Lint

Command located per `lint.md` rule 2 (this plugin's own repository default): `npm run lint`, run from the repository root (`/Users/pete/workspace/skyetrail-agents`). Result: exit 0, "All generated files are up to date," zero problems.

That result does not cover the target. `eng/generate-readmes.mjs` only walks `<pluginDir>/skills/*/SKILL.md` for the plugin sources registered in `marketplace.json` (`plugins/steering`, `plugins/skyetrail`). The target lives at `plugins/steering/tests/outcomes/external-probe/skills/receiving-code-review/SKILL.md`, inside a `tests/outcomes` fixture tree the generator never traverses. So the clean run carries no information about this file — a coverage gap, not a clean pass for it.

To avoid leaving the mechanical limits unchecked, I hand-verified them against the same criteria the script applies, and I'm flagging that these are hand-derived, not script output: frontmatter parses, no unquoted `": "` or `" #"` hazards in the description; name `receiving-code-review` is lowercase-hyphenated, 21 characters, matches its directory; description is 234 characters; body is 200 lines (205 total); no markdown links or backticked relative paths exist, so there is nothing to resolve. All within the mechanical limits.

## Conditions applied

`reused`: met, per instruction. `hand-off`: not met, per instruction. `always`: met (applies to every document). `changes something`: met — the skill's own workflow ends in an IMPLEMENT step and a dedicated "Implementation Order" section for sequencing and testing fixes, so modifying files is a first-class, expected outcome, not a side effect. `advisory`: not met — the work is not confined to reviewing or investigating; because implementation is a designed endpoint of the normal path (not only the pushback branch), the document doesn't fit "reviews or investigates and changes nothing."

## Rule-by-rule results

**Discovery** (skill-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| States the capability (Blocking) | Pass | "requires technical rigor and verification, not performative agreement or blind implementation" names the capability. |
| States trigger conditions (Blocking) | Pass | "Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable." |
| Includes file types, error text, casual phrasings (Important) | Warn | No file types or error text apply here. Casual synonyms are thin: no "PR," "pull request," "reviewer," or "comments." Can't tell from the text alone whether semantic matching bridges this. |
| Does not summarise the workflow (Important) | Pass | Description states triggers and a stance, not the six-step Response Pattern. |
| Written in third person (Important) | Fail | Description opens "Use when receiving..." — imperative, not third person. Contrast this plugin's own skills, all of which open with a third-person verb ("Audits...", "Writes...", "Establishes..."). |

**Boundary** (skill-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Says what it does not cover (Blocking) | Fail | No sentence anywhere states an exclusion (e.g., automated/CI feedback vs. human reviewer, design-doc review, self-review). Same root cause as the Scope finding below. |
| Names which skill takes over where it stops (Important) | Fail | No successor named. Dependent on the same missing-section root cause as above. |
| Says a direct instruction from the person wins over the skill (Important) | Fail | "From your human partner" (lines 61-65) says the human's *feedback* is trusted, but nothing says a direct instruction to deviate from this skill's own process (e.g., "skip verification, just implement") overrides it. Dependent on the same root cause. |

**Content** (skill-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| First lines say what the skill produces (Important) | Pass | Overview + "Core principle" (lines 10-12) state the kind of response the skill produces before the Response Pattern. |
| Nothing explains what the model already knows (Blocking) | Pass | Content targets specific, non-obvious failure modes (sycophantic phrasing, GitHub reply-threading) rather than restating baseline knowledge. |
| Content that would not change agent behaviour is absent (Important) | Pass | Doc is dense; no section found that is pure filler once read closely. |
| One term for one thing throughout (Important) | Pass | "your human partner" and "reviewer"/"External Reviewers" are used consistently. |
| Time-sensitive material absent or confined (Important) | Pass | The only version numbers (macOS 10.15/13) appear inside a fictional worked example, not as a factual claim. |
| Doesn't document a constraint a script/regex could enforce (Important) | Fail | "Forbidden Responses" (lines 27-32) and the Acknowledging-Correct-Feedback ❌ list (lines 139-144) name literal forbidden strings ("You're absolutely right!", "Great point!", "Thanks for...") — greppable, and more reliably caught by a hook than by prose the model must remember. |

**Loading** (skill-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Body ≤500 lines (Blocking) | Pass | 200 lines (hand count; see Lint). |
| Every reference one hop away (Blocking) | N/A | No references exist. |
| Detail in reference files rather than front file (Important) | Pass | 200/500 lines; nothing crowds out the operative content. |
| Reference file >100 lines opens with contents list (Important) | N/A | No reference files exist. |
| Test material not reachable from the skill (Important) | N/A | No references exist. |
| No reference file instructs skipping part of itself (Important) | N/A | No reference files exist. |

**Evidence** (skill-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Baseline comparison recorded in `tests/baselines/` (Blocking) | Fail | `plugins/steering/tests/baselines/` contains only `auditing-skills.md`, `repo-setup.md`, `writing-agents.md`, `writing-skills.md`. No entry for `receiving-code-review`. The rule carries no carve-out for a file that sits in a probe/fixture path rather than among this plugin's own shipped skills, so it fails as written. |

**Outcome** (steering-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Finished outcome stated, not just a topic (Blocking, always) | Pass | Response Pattern plus the exact accepted/pushback templates make the target outcome concrete. |
| Outcome statement at top (Advisory, always) | Pass | Overview/Core principle precede the method. |
| Outcome checkable without asking the author (Important, hand-off) | N/A | hand-off not met. |

**Context** (steering-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Nothing refers to unresolvable prior context/nickname (Blocking, always) | Pass | "your human partner's rule" quotes are self-contained, not pointers offsite. |
| Every fact written out or reachable by path (Blocking, always) | Pass | Fully self-contained; nothing external is assumed. |
| Approaches already tried and failed are stated (Important, always) | Pass | "Common Mistakes" table and "Forbidden Responses" document known failure patterns and their fixes. |
| Local conventions stated (Important, hand-off) | N/A | hand-off not met. |
| Context above method (Advisory, always) | Pass | Same as Outcome row above. |

**Scope** (steering-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| What is in scope is named (Blocking, always) | Pass | Title, description, and Overview establish the topic clearly. |
| What is out of scope is named explicitly (Blocking, always) | Fail | Same root cause as the Boundary findings above: no exclusion is stated anywhere. |
| Category of work defined by membership test; lists marked as examples (Blocking, always) | Fail | "When To Push Back" (lines 115-121) gives six bulleted reasons with no "for example"/"such as" framing — reads as the exhaustive test for when pushback is warranted, the same shape the rule file's own SQL/command/template/path illustration warns against. (Contrast the "ANY gratitude expression" catch-all at line 143, which does generalise correctly.) |
| Stop and report at a scope limit, rather than work around it (Blocking, always) | Pass | "STOP - do not implement anything yet" (line 44); "Say so: 'I can't verify this without [X]...'" (line 80); "Stop and discuss with your human partner first" (line 83). |
| Scope statement above method (Advisory, always) | N/A | Depends on the missing scope/boundary section (see above); not applicable to a section that doesn't exist. |
| States agent must not modify anything, and what to do when a fix looks obvious (Blocking, advisory) | N/A | advisory not met. |

**Method** (steering-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| One default approach, not a menu (Important, always) | Pass | Single numbered Response Pattern (READ→UNDERSTAND→VERIFY→EVALUATE→RESPOND→IMPLEMENT). |
| Order fixed where sequence matters, open otherwise (Blocking, always) | Pass | Response Pattern and "Implementation Order" both fix sequence explicitly. |
| Work constrained only where required, each constraint says why (Important, always) | Pass | Most constraints carry a "WHY" or parenthetical reason (lines 30-32, 47, 146). The GitHub-reply constraint (203-205) lacks a stated why, but this is a single instance, not a pattern. |
| Required pre-work check named first (Important, always) | Pass | READ is step 1; nothing implements before verification. |
| Copyable checklist included (Advisory, reused) | Pass | The numbered Response Pattern and the five-item External-Reviewers check function as a checklist. |

**Finish** (steering-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| A check the agent can run itself, whose result settles completion (Blocking, changes something) | Fail | "Implementation Order" (lines 100-111) says "Test each fix individually" and "Verify no regressions" without naming any actual check, command, or acceptance criterion. Nothing settles "done." |
| Exact commands named (Important, hand-off) | N/A | hand-off not met. |
| Agent runs the check itself before reporting (Important, always) | Pass | "IMPLEMENT: One item at a time, test each" places this on the agent, before moving on. |
| Evidence goes in the report so nobody re-runs the check (Important, hand-off) | N/A | hand-off not met. |
| Finish criteria specific enough for two runs to match (Blocking, advisory) | N/A | advisory not met. |
| States what evidence each finding must carry (Important, advisory) | N/A | advisory not met. |
| Finish check sits late, near where the agent decides to stop (Advisory, always) | Pass | Testing/finish material is followed by "When To Push Back" and the acknowledgement sections, reasonably late in the document's flow. |

**Failure** (steering-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Conditions that should stop work are stated (Blocking, always) | Pass | Same STOP/say-so/discuss lines cited under Scope above. |
| Retry limit named, something must change before retrying (Important, always) | Fail | Nothing bounds repeated clarification-asking or repeated pushback. "Handling Unclear Feedback" (40-57) and "External Reviewers" (67-86) describe asking/pushing back but never address what happens if the loop repeats. |
| Weakening the check or editing the test to force a pass is forbidden (Blocking, changes something) | Fail | Same root cause as the Finish check finding above: "Implementation Order" discusses testing but never forbids loosening a test or check to make a fix appear to pass. |
| Named status for "instruction itself was insufficient" (Important, hand-off) | N/A | hand-off not met. |
| Stopping stated to carry no penalty (Important, hand-off) | N/A | hand-off not met. |
| States what to do when input is missing/unexpected/unassessable, with a status (Blocking, advisory) | N/A | advisory not met. |
| Stop conditions sit directly after the finish check (Advisory, always) | Warn | The explicit STOP instructions (lines 44, 83) sit well before the finish/testing step (100-111), not after it. Only "When To Push Back" follows directly, and pushback is a distinct concept from stopping mid-implementation. Low confidence either way; Advisory. |

**Return** (steering-rules.md) — all six rules are hand-off-conditioned. N/A across the board; hand-off not met.

**Calibration** (steering-rules.md) — all four rules are advisory-conditioned. N/A across the board; advisory not met.

**Composition** (steering-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Facts established before dispatch, each carries origin (Important, hand-off) | N/A | hand-off not met. |
| Script-determinable facts made by script, not by hand (Important, hand-off) | N/A | hand-off not met. |
| Template facts as named fields to a file, not prose (Important, hand-off) | N/A | hand-off not met. |
| Every named hole marked required or given a default (Important, reused) | N/A | No agent-dispatch template exists here; the bracketed text (`[Brief description of what changed]`, `{owner}/{repo}/{pr}/{id}`) is illustrative reply phrasing the agent itself fills in when speaking, not a named-field template of the kind this rule addresses. |
| Field set fixed, no payload accumulation (Advisory, reused) | N/A | Same reason as above. |
| Model/effort level named explicitly (Important, hand-off) | N/A | hand-off not met. |
| Status values enumerated, caller obligation stated (Blocking, hand-off) | N/A | hand-off not met. |
| Each status declares scope of effect (Important, hand-off) | N/A | hand-off not met. |
| Caller doesn't re-run proven checks (Important, hand-off) | N/A | hand-off not met. |
| What happens to partial work when a run stops (Important, changes something) | Warn | Addressed for one specific case only: "Handling Unclear Feedback" (50-57) says wait for full clarity before implementing any clear items. Nothing addresses the general case of a run stopping mid-"Implementation Order," e.g. after fixing 3 of 6 items. |
| Named-agent dispatch checked for unneeded context (Advisory, hand-off) | N/A | hand-off not met. |

## Counts by severity

13 individual rule-level fail/warn marks collapse to 10 root-cause findings once shared causes are bundled (per the calibration rule: one finding per root cause, dependent rules listed under it).

- **Blocking: 4** — no boundary/scope section (bundles 3 dependent Important-level citations); no baseline comparison recorded; "When To Push Back" list not marked as examples; finish/testing step names no runnable check and doesn't forbid weakening it (2 rule citations, same cause).
- **Important: 5** — description lacks casual-phrasing variety; description not in third person; forbidden-phrase constraints better suited to a script/regex; no retry limit for clarification/pushback loops; partial-work handling covers only one scenario.
- **Advisory: 1** — stop conditions sit before, not after, the finish check.

## Three fixes to make first

1. Add a boundary section: state what this skill does not cover, name what takes over once implementation is done (a natural candidate is a finishing/commit-stage skill), and state that a direct instruction from the person overrides the skill's default process.
2. In "Implementation Order," name an actual check the agent runs to settle "done" (e.g., the project's test command or the reviewer's original repro case), and forbid weakening or editing that check to force a pass.
3. Reframe "When To Push Back" so its six reasons read as examples of a test ("push back when a suggestion is technically unsound for this codebase — reasons like these are examples, not the whole list") rather than a closed set, so a valid objection outside the six doesn't get suppressed.

Four blocking failures were found, so by the rule stated in both source documents, this file needs work before use. The one advisory item is noted but does not block.