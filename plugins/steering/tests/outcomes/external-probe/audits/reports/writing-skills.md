# Audit: `writing-skills` (external-probe)

**Target:** `plugins/steering/tests/outcomes/external-probe/skills/writing-skills/SKILL.md` and every file it names (`anthropic-best-practices.md`, `persuasion-principles.md`, `testing-skills-with-subagents.md`, `graphviz-conventions.dot`, `render-graphs.js`, `examples/CLAUDE_MD_TESTING.md`).

**Conditions applied** (steering-rules.md): `always` — applies. `reused` — met (given). `hand-off` — not met (given). `changes something` — met: the skill's own workflow (RED-GREEN-REFACTOR) produces and edits a SKILL.md and its supporting files, and its checklist ends in "commit skill to git." `advisory` — not met, as the complement of the above: this document's output is a changed file, not a review that changes nothing.

**Lint result:** Ran `npm run lint` (per `AGENTS.md`'s repo-setup block) from `/Users/pete/workspace/skyetrail-agents`. It passed ("All generated files are up to date"), but `eng/generate-readmes.mjs` only walks `plugins/<plugin>/skills/*/SKILL.md`, one directory level under each plugin's own `skills/` folder, and never descends into `tests/outcomes/`. **This run did not examine the target — a gap in coverage, not a clean pass for this file.** Because no valid lint record exists for this path, I applied the script's own published logic by hand (`MAX_NAME=64`, `MAX_DESCRIPTION=1024`, `MAX_BODY_LINES=500`, name regex `^[a-z0-9]+(-[a-z0-9]+)*$`, link-resolution check) so the mechanical rows below aren't re-argued as judgment calls: name and description are well-formed and within limits, no YAML hazards; **body is 674 lines against a 500-line limit**, and **two markdown links do not resolve**. Treat those two facts as settled, not as my opinion.

## Findings

### skill-rules.md — Discovery

| Rule | Result | Evidence |
| --- | --- | --- |
| States the capability, in a searcher's words | PASS | "Use when creating new skills, editing existing skills, or verifying skills work before deployment" (SKILL.md:3) names the capability domain. |
| States triggering conditions | PASS | Same line, "Use when…" construction. |
| Includes file types, error text, casual phrasings | FAIL (Important) | Description contains no concrete keyword ("SKILL.md," "won't trigger," "skill not loading") or casual phrasing — just three formal trigger clauses. |
| Does not summarise workflow/process | PASS | Description names no steps, no RED-GREEN-REFACTOR, no TDD. |
| Written in third person | PASS | No first/second-person pronoun. |

### skill-rules.md — Boundary

| Rule | Result | Evidence |
| --- | --- | --- |
| Says what it does not cover | FAIL (Blocking) | No section states exclusions. Closest content ("Don't create for," SKILL.md:55-59; "Don't test," testing-skills-with-subagents.md:25-28) governs *when to act*, not what this document itself covers. Same root cause as steering-rules Scope row below. |
| Names which skill takes over where it stops | FAIL (Important) | No hand-off language anywhere (checked via grep for "hand-off/instead/successor"). Deployment ends at "commit… push… consider a PR" (SKILL.md:664-666), naming no next skill. |
| Says a direct instruction from the person wins over the skill | FAIL (Important) | No such statement anywhere in SKILL.md or its references. |

### skill-rules.md — Content

| Rule | Result | Evidence |
| --- | --- | --- |
| First lines say what the skill produces, before steps | WARN (Important) | Opens with an identity claim ("Writing skills IS TDD…") and a hard prerequisite (SKILL.md:10-18) before any statement of the deliverable; the TDD-mapping table implies but never states "you will produce a tested SKILL.md." Can't tell from the text alone whether this counts. |
| Nothing explains what the model already knows | FAIL (Blocking) | `anthropic-best-practices.md` (1150 of the package's ~2928 lines, 39%) reproduces Anthropic's own published Skill-authoring guide near-verbatim, down to its `mintcdn.com`/`platform.claude.com` image URLs (lines 249, 253, 919) — public material a Claude model already has. |
| Content that would not change agent behaviour is absent | FAIL (Important) | `persuasion-principles.md`'s citation/ethics apparatus (lines 153-187, "Research Citations," "Ethical Use") and `testing-skills-with-subagents.md`'s dated "Real-World Impact" anecdote (lines 377-384, "2025-10-03… 6 iterations…") don't change what an agent does. The latter is also a direct instance of the skill's own forbidden "Narrative Example" anti-pattern (SKILL.md:595-597) — a rule contradicting the document's own practice. Same root cause covers the "time-sensitive material" row below. |
| Time-sensitive material absent or confined to an old-patterns section | FAIL (Important) | Same evidence: the dated 2025-10-03 anecdote (testing-skills-with-subagents.md:377-384) sits in live content, not a legacy-patterns section. (Counted once, under the row above.) |
| One term used for one thing throughout | FAIL (Important) | SKILL.md and testing-skills-with-subagents.md use lowercase "skill" throughout (e.g., SKILL.md:24, "A **skill** is a reference guide…"); `anthropic-best-practices.md` capitalizes "Skill/Skills" as a proper noun throughout (lines 1, 5, 13…) — the same package uses two casings for the same term. |
| Does not document a constraint a script/regex could enforce | FAIL (Important) | SKILL.md:96-103 spells out in prose the name-character rule, the 1024-char frontmatter cap, and the 500-character description guidance — all mechanically checkable (and mechanically checked by this very repo's lint). Repeated again in the checklist (SKILL.md:637-638) and at length in `anthropic-best-practices.md`. This also contradicts the skill's own stated principle two screens earlier: "Mechanical constraints (if it's enforceable with regex/validation, automate it…)" (SKILL.md:59). |

### skill-rules.md — Loading

| Rule | Result | Evidence |
| --- | --- | --- |
| Body is 500 lines or fewer | FAIL (Blocking) | 674 body lines (script algorithm), 679 total — 35% over. |
| Every reference is one hop from the SKILL.md that names it | FAIL (Blocking) — **two separate root causes** | (a) `[codex-tools.md](../using-superpowers/references/codex-tools.md)` and `[gemini-tools.md](../using-superpowers/references/gemini-tools.md)` (SKILL.md:12) point at a `using-superpowers` directory that does not exist anywhere in this repository — unresolvable at any hop. (b) `examples/CLAUDE_MD_TESTING.md` is reachable only via `testing-skills-with-subagents.md:15`; SKILL.md itself never names it — a second hop. |
| Detail sits in reference files rather than the front file | FAIL (Important) | SKILL.md:476-591 ("Bulletproofing Skills Against Rationalization," "RED-GREEN-REFACTOR for Skills") substantially duplicates what `testing-skills-with-subagents.md:163-238` already covers in more depth, inflating the front file instead of living once in the reference it links to. |
| Reference file over 100 lines opens with a contents list | FAIL (Important) | None of the four qualifying files do: `anthropic-best-practices.md` (1150 lines), `testing-skills-with-subagents.md` (384), `examples/CLAUDE_MD_TESTING.md` (189), `persuasion-principles.md` (187) all open straight into content. |
| Material used to test the skill is not reachable from it | PASS | `examples/CLAUDE_MD_TESTING.md` and the "Real-World Impact" anecdote read as worked examples/case studies of the technique, not raw baseline-test evidence bundled for this skill's own qualification. |
| No reference file instructs the reader to skip part of itself | FAIL (Important) | `anthropic-best-practices.md:853`: "The sections below focus on Skills that include executable scripts. If your Skill uses only markdown instructions, skip to [Checklist for effective Skills]." The excluded content should be its own file, not a skip-instruction. |

### skill-rules.md — Evidence

| Rule | Result | Evidence |
| --- | --- | --- |
| Baseline comparison recorded in the plugin's `tests/baselines/`, one file per skill | FAIL (Blocking) | `plugins/steering/tests/baselines/` holds exactly four files: `auditing-skills.md`, `repo-setup.md`, `writing-agents.md`, `writing-skills.md` — the last being this plugin's *own* writing-skills skill, a different document. No baseline record exists anywhere for this external skill. Nothing in the target claims otherwise; it documents a testing method for others without evidencing its own compliance with it. |

### steering-rules.md — applicable rows only (`always` / `changes something` / `reused`)

| Rule | Result | Evidence |
| --- | --- | --- |
| Outcome: finished outcome stated, not just a topic | PASS | The TDD-mapping table (SKILL.md:32-44) plus "watch tests pass… refactor" functionally states the end state, even if indirectly. |
| Outcome: sits at top | PASS | Overview is the first section. |
| Context: nothing refers to something unresolvable | FAIL (Blocking) | "**REQUIRED BACKGROUND:** You MUST understand `superpowers:test-driven-development` before using this skill" (SKILL.md:18, repeated at 393; testing-skills-with-subagents.md:13) — this skill name does not exist anywhere in the repository (verified by search). A mandatory, unresolvable prerequisite. |
| Context: every fact pointed at a readable path | FAIL (Blocking) | Same root cause as the Loading "one hop" dead links above (SKILL.md:12) — not counted twice. |
| Context: approaches tried and found not to work stated | PASS | "Common Rationalizations for Skipping Testing" and "Anti-Patterns" sections serve this function. |
| Context: sits above method | PASS | Overview precedes all structural/process sections. |
| Scope: what is in scope named | PASS | "Skill Types," "When to Create a Skill" name the covered territory. |
| Scope: out of scope named explicitly | FAIL (Blocking) | Same root cause as Boundary row above — not counted twice. |
| Scope: category defined by membership test, lists marked as examples | FAIL (Blocking) | "## Skill Types" (SKILL.md:61-70) presents Technique/Pattern/Reference as a closed set with no "examples, not the whole list" framing — the exact pattern steering-rules.md's own worked example (lines 70-82) warns measurably causes a reader to treat an uncovered case as excluded. |
| Scope: instruction says stop-and-report at a scope limit | FAIL (Blocking) | No such instruction anywhere; the document always resolves forward (create/don't-create, test/don't-test) rather than routing an unclear case to a stop-and-report branch. |
| Scope: sits above method | PASS | "When to Create a Skill" precedes "SKILL.md Structure" and later process sections. |
| Method: one default approach given | PASS | RED-GREEN-REFACTOR is presented as the approach, not a menu. |
| Method: order fixed where sequence matters | PASS | Iron Law enforces test-before-code ordering explicitly. |
| Method: constrained only where required, each constraint says why | PASS | The "no exceptions" list is paired with a stated rationale via the rationalization table (SKILL.md:516-526). |
| Method: pre-work check named as first step | PASS | RED phase (baseline-without-skill) is explicitly step one. |
| Method: copyable checklist included (reused) | PASS | "Skill Creation Checklist" (SKILL.md:627-666), with explicit "create a todo for EACH item" instruction. |
| Finish: a self-runnable check settles completion (changes something) | FAIL (Blocking) | The only crisp, runnable check is `wc -w` for word count (SKILL.md:262-266), which settles one sub-dimension. Overall "is the skill done" rests on subjective pressure-test compliance judgment ("verify agents now comply"), not one check whose result settles it. |
| Finish: instruction says agent runs the check itself before reporting | PASS | Checklist explicitly instructs running scenarios and the `wc -w` verification. |
| Finish: sits late in the document | PASS | Checklist sits near the end (line 627 of 679). |
| Failure: conditions that should stop work are stated | PASS | "Red Flags – STOP and Start Over" (SKILL.md:533) and "STOP: Before Moving to Next Skill" (SKILL.md:614-625). |
| Failure: retry limit named, something must change before retry | FAIL (Important) | REFACTOR loop is explicitly unbounded: "Re-test until bulletproof" (SKILL.md:571); "Continue REFACTOR cycle" (testing-skills-with-subagents.md:236) — no cap, no pivot after N attempts. |
| Failure: weakening the check/test forbidden (changes something) | FAIL (Blocking) | Nowhere does the document forbid loosening the pressure scenario itself to force a pass; REFACTOR guidance only discusses strengthening the skill, never guards against weakening the test. |
| Failure: stop conditions sit directly after the finish check | FAIL (Advisory) | Red Flags (line 533) sit *before* the Skill Creation Checklist (line 627) — the reverse of the specified order. Advisory: listed once, does not block. |
| Composition: every template hole marked required/default (reused) | PASS | Holes carry inline conditions ("optional," "IF non-obvious") rather than being left bare. |
| Composition: template's field set is fixed (reused) | PASS | Frontmatter is explicitly scoped to two required fields, pointing to an external spec for the rest rather than accumulating its own list. |
| Composition: what happens to partial work when a run stops (changes something) | FAIL (Important) | "STOP: Before Moving to Next Skill" says don't advance to the next skill, but never states what to do with the current, partially-tested draft (ship flagged, delete, mark WIP). |

**N/A (condition not met, per this document's own rule: not the same as a pass):**

| Rule | Result | Evidence |
| --- | --- | --- |
| All `hand-off`-gated rows (20 rows: Outcome ×1, Context ×1, Finish ×2, Failure ×2, Return ×6, Composition ×8) | N/A | `hand-off` not met for this target (given). |
| All `advisory`-gated rows (8 rows: Scope ×1, Finish ×2, Failure ×1, Calibration ×4) | N/A | `advisory` not met for this target (derived above). |

## Counts by severity

- **Blocking: 11** (all fail) — body length; dead `using-superpowers` links; two-hop `CLAUDE_MD_TESTING.md`; no baseline evidence; no "does not cover" statement; content the model already knows; unresolvable `superpowers:test-driven-development` dependency; Skill Types closed-list framing; no stop-and-report-at-scope-limit instruction; no prohibition on weakening the check; no single check settles completion.
- **Important: 12** (11 fail, 1 warn) — description lacks keywords/casual phrasing; no successor skill named; no direct-instruction-wins statement; non-behavior-changing/time-sensitive content (one root cause, two rule rows); terminology inconsistency (skill/Skill); mechanical constraints documented in prose; detail duplicated in front file; no contents list in long references; instructs reader to skip part of itself; no retry limit; no partial-work disposition; (warn) first lines don't clearly state the deliverable.
- **Advisory: 1** (fail, never blocks) — stop conditions positioned before, not after, the finish check.

## Three fixes to make first

1. **Cut the body under 500 lines.** Move "Bulletproofing Skills Against Rationalization" and "RED-GREEN-REFACTOR for Skills" (SKILL.md:476-591) out in favor of the fuller versions already in `testing-skills-with-subagents.md`, and drop the material duplicating Anthropic's own public docs — `anthropic-best-practices.md` alone is 1150 of the package's 2928 lines.
2. **Resolve or remove every reference that doesn't work inside this repository:** the two dead links into a nonexistent `using-superpowers` directory (SKILL.md:12), and the "you MUST understand `superpowers:test-driven-development`" prerequisite (SKILL.md:18,393) that names a skill this package does not include and this repository does not have.
3. **Add the missing boundary and evidence statements:** what the skill does not cover, which skill takes over from here, that a direct instruction from the person wins over the skill — and either produce a baseline comparison for this skill in `tests/baselines/` or flag plainly that none exists, since the document's own thesis is that a skill should not ship without exactly this evidence.

Eleven blocking failures are present: this file needs work before use.