**Lint.** Per `../../shared/lint.md`: no `repo-setup` block recorded in this repository's `AGENTS.md`, so the default applies — `npm run lint`, fixed for this repository, run from the repository root. It passed repo-wide ("All generated files are up to date"), but it does not cover this target: `eng/generate-readmes.mjs`'s component discovery (`readComponents`, lines 190–231) only walks each plugin's own `<plugin>/skills/` directory, never `plugins/steering/tests/outcomes/...`, so `receiving-code-review/SKILL.md` was never opened by that run. That is a coverage gap, not a clean pass for this file. I hand-checked the mechanical items the script would enforce, using its own parsing logic, and disclose that here rather than presenting it as a lint result: frontmatter parses with no YAML hazards; name `receiving-code-review` (21 characters, matches its directory, valid format); description 234 characters; body 200 lines by the script's counting formula; no markdown links or backticked relative-path references appear anywhere in the file, so there is nothing for a reference check to resolve. The directory contains only this one `SKILL.md` — no reference files are named or present.

**Conditions applied.** Target is a SKILL.md, so both `skill-rules.md` and `steering-rules.md` apply; `skill-rules.md`'s own header fixes `reused` met and `hand-off` not met for any skill audit, matching what was specified. `changes something` is met and `advisory` is not met: the document's own content ends in modification, not review only — "6. IMPLEMENT: One item at a time, test each" (line 24) and "Fixed. [Brief description of what changed]" (line 135) — so it is not advisory work.

## Discovery (skill-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Description states the capability | Fail | Line 3, in full: "Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - requires technical rigor and verification, not performative agreement or blind implementation." Every clause is a trigger condition ("Use when...", "especially if...") or a requirement ("requires... not..."); none states what the skill does or produces. |
| Description states trigger conditions | Pass | Same line: "Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable." |
| Description includes file types, error text, casual phrasings | Fail | No casual variants appear ("PR comments," "reviewer said," "review says," etc.); file types and error text do not apply to this skill's conversational nature, but casual phrasing does apply and is absent. |
| Description does not summarize the workflow | Pass | The description states conditions and a requirement, not the six-step Response Pattern. |
| Description written in third person | Pass | No first- or second-person pronouns; "Use when..." matches the field's established idiom. |

## Boundary (skill-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Says what it does not cover | Fail | No boundary or exclusion statement anywhere in the 205-line file (confirmed by full read). |
| Names successor skill | N/A | Depends on the boundary statement above, which does not exist. |
| Direct instruction from the person wins over the skill | Fail | "From your human partner" (lines 61–65) sets a trust level and an ask-if-unclear policy but never states that a direct instruction from the person takes precedence over the skill's own defaults. |

## Content (skill-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| First lines say what the skill produces | Warn | Overview (lines 10–12) states principles ("Verify before implementing," "Technical correctness over social comfort"), not a concrete produced outcome; folded into the Outcome finding below since it is the same gap. |
| Nothing explains what the model already knows | Pass | No generic explanation of known concepts found; content is all behavior-shaping. |
| No content that would not change agent behavior | Warn | The forbidden-phrase list appears near-verbatim three times (lines 27–33, 139–144, 178–182). Repetition may be intentional reinforcement rather than inert padding, so this is not confident enough to fail. |
| One term for one thing | Pass | "your human partner" and "External Reviewers"/"Reviewer" are used consistently throughout. |
| Time-sensitive material absent or confined | Pass | No dated or version-pinned claims asserted as current fact; the OS-version numbers at lines 187 are inside a worked example, not a live claim. |
| No constraint a script/regex could enforce instead | Fail | The exact-string "Forbidden Responses" list (lines 27–33, restated 139–144 and 178–182) is mechanically checkable (grep the drafted reply before sending) but is documented as a rule for the model to remember instead; the repeated restatement plus the "If you catch yourself... DELETE IT" instruction (line 148) is internal evidence the memory-based approach is not fully trusted by the author. |

## Loading (skill-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Body ≤500 lines | Pass | 200 body lines by the script's own formula (hand-verified; see lint note). |
| Every reference one hop | N/A | No markdown links or backticked relative paths exist in the file. |
| Detail in reference files, not front file | Pass | File is self-contained and well within the line budget; no forced-load concern. |
| Reference file >100 lines opens with contents list | N/A | No reference files exist. |
| Test material not reachable from the skill | Pass | Nothing in the file links to test or baseline material. |
| No reference file tells reader to skip part of itself | N/A | No reference files exist. |

## Evidence (skill-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Baseline comparison recorded in `tests/baselines/` | Fail | `plugins/steering/tests/baselines/` contains only `auditing-skills.md`, `repo-setup.md`, `writing-agents.md`, `writing-skills.md`; no file for `receiving-code-review`. |

## Outcome (steering-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Finished outcome stated, not just a topic | Warn | The outcome is distributed across the Response Pattern (lines 16–25) and Implementation Order (lines 102–111) rather than stated once, up front, as a concrete deliverable ("every item implemented and tested, or explicitly declined with reasoning"). Not confident enough to call it clearly absent. |
| Outcome statement at top, before context/method | N/A | Depends on a consolidated outcome statement, which is not present. |
| Outcome stated in checkable terms | N/A | hand-off not met |

## Context (steering-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Nothing refers to something unresolvable | Pass | "your human partner" is a consistently used role term, not an unresolvable nickname; no dangling references to a prior conversation. |
| Every needed fact written out or pointed at | Pass | No unstated needed facts; where a fact is unknown the skill tells the agent to find it itself (e.g., "grep codebase for actual usage," line 92). |
| Tried-and-failed approaches stated | Pass | "Common Mistakes" table (lines 164–174) and "Forbidden Responses" (lines 27–33) both name known-bad patterns and their fixes. |
| Local conventions stated | N/A | hand-off not met |
| Context above method | Pass | Overview (lines 6–12) precedes the Response Pattern (lines 14–25). |

## Scope (steering-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| What is in scope is named | Pass | Title ("Code Review Reception"), Overview, and consistent section framing make the covered area clear. |
| What is out of scope is named explicitly | Fail | Same root cause as the Boundary finding above; no exclusion is stated anywhere. |
| Category of work defined by membership test; list of kinds marked as examples | Fail | "When To Push Back" (lines 115–121) gives six bulleted reasons with no "examples, not the whole list" framing. A reason outside the six (for example, a licensing or compliance objection) has no membership test to fall back on. |
| Stop-and-report at scope limit, rather than work around it | Pass | "STOP - do not implement anything yet" (line 44); "Say so" for unverifiable suggestions (line 80); "Stop and discuss with your human partner first" for conflicts (line 83). |
| Scope statement above the method | N/A | Depends on the missing out-of-scope statement. |
| Must-not-modify + fallback for obvious fixes | N/A | advisory not met |

## Method (steering-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| One default approach, not a menu | Pass | The Response Pattern (lines 16–25) is presented as the single procedure; no alternatives offered. |
| Order fixed where sequence affects correctness | Pass | Response Pattern is numbered 1–6; Implementation Order (lines 103–110) fixes clarify-first, then blocking/simple/complex. |
| Constrained only where required, each constraint says why | Warn | The forbidden-phrase constraint states its reason ("Why no thanks: Actions speak," line 146), but the Implementation Order's blocking-then-simple-then-complex sequencing (lines 106–108) carries no stated reason. |
| Required pre-work check named as the first step | Pass | VERIFY (step 3, line 21) precedes EVALUATE/RESPOND/IMPLEMENT (steps 4–6); the check precedes the work it gates. |
| Checklist the agent can copy and tick off | Pass | The six-item Response Pattern (lines 16–25) serves this purpose. |

## Finish (steering-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Self-runnable check named, its result settles done-ness | Warn | "Test each fix individually" / "Verify no regressions" (lines 109–110) name testing generically but do not name a specific check or state that passing it is what makes an item done. |
| Exact commands named | N/A | hand-off not met |
| Agent runs the check itself before reporting | Pass | "IMPLEMENT: One item at a time, test each" (line 24) places testing before the "Fixed" acknowledgment (line 135). |
| Evidence goes in the report, so nobody re-runs the check | N/A | hand-off not met |
| Finish criteria specific enough for two runs to agree | N/A | advisory not met |
| Evidence each finding must carry | N/A | advisory not met |
| Finish check sits late in the document | Warn | The testing content sits in "Implementation Order," roughly the middle third of a 205-line file; five more sections follow it before the file ends on an unrelated GitHub-reply-formatting note (lines 203–205). |

## Failure (steering-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Conditions that should stop the work are stated | Pass | "STOP" for unclear items (line 44); "Stop and discuss" for conflicts (line 83). |
| Retry limit named, something must change before retry | Fail | Same root cause as the row below: nothing in the file addresses what happens when a fix fails its test — no retry count, nothing that must change before retrying. |
| Weakening the check to make it pass is forbidden | Fail | No statement anywhere prohibits loosening a test or check to force a pass; "Implementation Order" assumes tests pass after implementation and never addresses the failure branch. |
| Named status for reporting the instruction was insufficient | N/A | hand-off not met |
| Stopping carries no penalty | N/A | hand-off not met |
| Missing/unexpected/unassessable input stated, with a status | N/A | advisory not met |
| Stop conditions sit directly after the finish check | Warn | The unclear-feedback and conflicts-with-prior-decisions stop conditions (lines 44, 83) both precede the Implementation Order's test/verify content (lines 109–110) rather than following it. |

## Return (steering-rules.md)

All 6 rules (sections named, wording fixed for comparison, detail to a named file with a capped summary, failures inlined, an unasked-for-work section, format at the end) — **N/A**, hand-off not met.

## Calibration (steering-rules.md)

All 4 rules (examples of what counts, examples of what doesn't, default outcome stated, shape-not-label description) — **N/A**, advisory not met.

## Composition (steering-rules.md)

| Rule | Result | Evidence |
| --- | --- | --- |
| Facts established before dispatch / deterministic work by script / template facts as fixed fields / model or effort named / status values enumerated / status scope declared / caller checks the report | N/A (7 rules) | hand-off not met |
| Named holes marked required or given a default | N/A | No dispatch-style template with named holes exists; the bracketed placeholders in example replies (e.g., "[Brief description of what changed]," line 135) are prose for the acting agent's own output, not fields in a hand-off template. |
| Fixed field set for a template | N/A | Same reasoning as above. |
| What happens to partial work when a run stops | Fail | "Stop and discuss with your human partner first" (line 83) can trigger mid-batch under the multi-item Implementation Order, but nothing states whether fixes already applied from earlier items are kept, reverted, or left uncommitted. |
| Predefined agent dispatch checked for unneeded context | N/A | hand-off not met |

## Counts by severity

- **Blocking:** 5 fail, 2 warn — description capability (Discovery), no stated boundary (Boundary/Scope, one finding), push-back list not marked as examples (Scope), no baseline comparison (Evidence), no guidance for a failing check (Failure, two dependent rows). Warns: outcome not consolidated (Outcome/Content), check-settles-done-ness (Finish).
- **Important:** 3 fail, 2 warn — no "direct instruction wins" statement (Boundary), regex-enforceable constraint documented as prose (Content), no partial-work disposition on stop (Composition). Warns: forbidden-phrase repetition (Content), unstated rationale for fix ordering (Method).
- **Advisory:** 0 fail, 2 warn — finish check position (Finish), stop-conditions position (Failure). Advisory items are listed once and never block.

Any blocking failure means the file needs work before use; this file has five.

## Three fixes to make first

1. Rewrite the frontmatter description (line 3) to open with what the skill does — a capability clause — then keep the trigger conditions, and add a couple of casual phrasings a person would actually type (e.g., "reviewer left comments," "PR feedback").
2. Add an explicit boundary: state what "receiving code review" does not cover, and rewrite "When To Push Back" (lines 115–121) so its six reasons are marked as examples rather than the whole set.
3. Add guidance for a fix that fails its own test: a retry limit with something that must change before retrying, and an explicit prohibition on weakening the check itself to force a pass.