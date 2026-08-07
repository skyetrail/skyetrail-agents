Lint: `npm run lint` (`node eng/generate-readmes.mjs --check`, the command recorded in this repository's `AGENTS.md`) ran clean — "All generated files are up to date," zero problems reported. This is not a clean pass on this target, though. Reading `eng/generate-readmes.mjs`, `readComponents()` only walks `<plugin-source>/skills/*/SKILL.md` for plugins registered in `marketplace.json`. The steering plugin's registered source is `./plugins/steering`, so the lint walks `plugins/steering/skills/*`. The target sits at `plugins/steering/tests/outcomes/external-probe/skills/brainstorming/SKILL.md`, under the plugin's `tests/` tree, which that function never visits. The run above never opened this file. That is a coverage gap, not a clean pass, so the mechanical limits below are hand-derived (by applying the same checks the script runs, by hand, to this one file) and reported as such rather than read off the lint output.

Hand-derived mechanical facts: frontmatter parses, no unquoted `": "` or `" #"` hazard. `name: brainstorming` — 13 chars, lowercase-hyphen pattern, matches its directory. `description` — 198 chars (limit 1024). Body — 146 lines (limit 500). The one in-body reference (`skills/brainstorming/visual-companion.md`) isn't in the `./`- or `../`-prefixed form the script's reference regex looks for, so even a lint run that reached this directory would not have checked it mechanically; it's evaluated by hand under Loading below.

Conditions applied: **always** (met, throughout). **reused** (met, per instruction). **hand-off** (not met, per instruction). **changes something** (met — the skill's own checklist has the agent write a spec file to disk and commit it to git). **advisory** (not met, as a consequence: the work ends in a committed artifact, not just review).

## skill-rules.md

### Discovery

| Rule | Result | Evidence |
| --- | --- | --- |
| Blocking — states the capability | Pass | "Explores user intent, requirements and design before implementation" (frontmatter). |
| Blocking — states trigger conditions | Pass | "before any creative work - creating features, building components, adding functionality, or modifying behavior" (frontmatter). |
| Important — includes casual phrasings people type | Fail | Frontmatter is entirely category language (creative work / features / components / functionality / behavior). No example user phrasing, and the word "brainstorm" never appears in the description itself (only in the H1). |
| Important — does not summarise the workflow | Pass | Description states scope and timing, not the 9-step process. |
| Important — third person | Fail | Frontmatter: "You MUST use this before any creative work..." — second person throughout. |

### Boundary

| Rule | Result | Evidence |
| --- | --- | --- |
| Blocking — says what it does not cover | Pass | Line 13 HARD-GATE and line 61 both bar implementation/code/scaffolding until design approval. |
| Important — names the successor skill | Pass | Line 131: "Invoke the writing-plans skill..."; line 61: "The ONLY skill you invoke after brainstorming is writing-plans." |
| Important — a direct instruction from the person wins | Fail | Not stated anywhere. The text pushes the opposite: line 13 "This applies to EVERY project regardless of perceived simplicity"; lines 16-18 anti-pattern section insists "Every project goes through this process... you MUST present it and get approval," with no carve-out for an explicit user request to skip. |

### Content

| Rule | Result | Evidence |
| --- | --- | --- |
| Important — first lines say what it produces | Pass | Line 8, before the Checklist: "Help turn ideas into fully formed designs and specs through natural collaborative dialogue." |
| Blocking — nothing explains what the model already knows | Fail | Lines 92-94: "Break the system into smaller units that each have one clear purpose, communicate through well-defined interfaces... For each unit, you should be able to answer: what does it do, how do you use it, and what does it depend on? Can someone understand what a unit does without reading its internals?" — restates single-responsibility/encapsulation as if novel. |
| Important — no filler that doesn't change behaviour | Pass | The Process Flow digraph (lines 34-59) duplicates the Checklist/prose, but this collection has a stated, tooled purpose for these diagrams (`writing-skills/SKILL.md`: "Use render-graphs.js ... to render a skill's flowcharts to SVG"), so it's not unaccounted-for filler. |
| Important — one term for one thing | Pass | The artifact is called "design doc," "spec," "written spec," "design document," and "spec document" interchangeably (lines 29-127), but only one artifact ever exists and its path is always given explicitly when it matters — no case where this would cause the agent to act on the wrong thing. |
| Important — time-sensitive material absent | Pass | Nothing found. |
| Important — no documenting a check a script could run | Pass | The self-review's placeholder scan ("TBD"/"TODO", line 115) is grep-able in principle, but it's bundled into a single "read it with fresh eyes" pass alongside judgment calls (consistency, ambiguity) that a script cannot make; not a clean instance of a script-replaceable constraint. |

### Loading

| Rule | Result | Evidence |
| --- | --- | --- |
| Blocking — body ≤500 lines | Pass | 146 lines. |
| Blocking — every reference is one hop | Fail | Line 151: `` `skills/brainstorming/visual-companion.md` ``. Resolved against the file's own directory (`.../skills/brainstorming/`) this doubles to a nonexistent path. Sibling skill `subagent-driven-development/SKILL.md` references its own same-directory files correctly (`` `./implementer-prompt.md` ``, `[implementer-prompt.md](implementer-prompt.md)`), so this is an authoring error, not a collection-wide convention. |
| Important — detail sits in reference files | Pass | The one long topic (browser-companion protocol) is pushed to `visual-companion.md`; front file stays at 146 lines. |
| Important — reference file >100 lines opens with a contents list | Fail | `visual-companion.md` is ~298 lines across 11 `##` sections and opens directly with prose ("Browser-based visual brainstorming companion..."), no contents list. |
| Important — test material not reachable from the skill | Pass | Nothing in `SKILL.md` or `visual-companion.md` points at the probe's `PREREGISTRATION.md`/`README.md`/fixture metadata. |
| Important — no reference file tells the reader to skip part of itself | Pass | The platform-specific launch blocks in `visual-companion.md` (Claude Code/Codex/Gemini CLI/Copilot CLI) are labelled, not flagged "ignore this section." |

### Evidence

| Rule | Result | Evidence |
| --- | --- | --- |
| Blocking — baseline comparison recorded in the plugin's `tests/baselines/` | Fail | `plugins/steering/tests/baselines/` contains only `auditing-skills.md`, `repo-setup.md`, `writing-agents.md`, `writing-skills.md`. Nothing for `brainstorming`, and no baseline for it exists anywhere in the repository. |

## steering-rules.md

### Outcome

| Rule | Result | Evidence |
| --- | --- | --- |
| Blocking, always — finished outcome stated, not just a topic | Pass | Checklist items 6-9 (lines 29-32) name the concrete end state: doc written, committed, reviewed, handed to writing-plans. |
| Advisory, always — outcome sits above context/method | Pass | Checklist (20-32) precedes the Process Flow diagram (34) and "The Process" (63). |
| Important, hand-off — outcome checkable without the author | N/A | hand-off not met. |

### Context

| Rule | Result | Evidence |
| --- | --- | --- |
| Blocking, always — nothing unresolvable (nickname/prior conversation) | Pass | No such reference found. |
| Blocking, always — every needed fact written out or pointed at by a readable path | Fail | Dependent on the Loading finding above: the visual-companion protocol is a fact the agent needs if the user accepts the offer, and its only pointer (line 151) doesn't resolve as written. Same root cause, not a separate defect. |
| Important, always — approaches already tried and found not to work are stated | Pass | Lines 16-18, "Anti-Pattern: 'This Is Too Simple To Need A Design'" — names the failure mode directly. |
| Important, hand-off — local conventions the agent could not infer | N/A | hand-off not met. |
| Advisory, always — context sits above method | Pass | HARD-GATE/anti-pattern precede Process Flow and The Process. |

### Scope

| Rule | Result | Evidence |
| --- | --- | --- |
| Blocking, always — in scope named | Pass | Title, line 8, Checklist. |
| Blocking, always — out of scope named explicitly | Pass | Line 13 HARD-GATE; line 61. |
| Blocking, always — category of work defined by membership test, not just a list of kinds | Fail | Line 13, "any implementation skill"; line 61, "Do NOT invoke frontend-design, mcp-builder, or any other implementation skill." Two examples plus "or any other X," never a test for what makes something one — the exact pattern steering-rules.md itself gives as measured to cause misses. |
| Blocking, always — stop-and-report on a scope limit, not work around it | Pass | Lines 68-69: oversized projects are surfaced to the user for decomposition, not silently built. |
| Advisory, always — scope statement above method | Pass | Same ordering as Outcome/Context. |
| Blocking, advisory — must-not-modify + what to do instead | N/A | advisory not met. |

### Method

| Rule | Result | Evidence |
| --- | --- | --- |
| Important, always — one default approach, not a menu | Pass | Checklist is a single fixed sequence. |
| Blocking, always — order fixed where correctness needs it, open elsewhere | Pass | "You MUST create a task for each of these items and complete them in order" (line 22), matches the real dependency (can't approve before presenting, can't write before approval). |
| Important, always — constrained only where required, and each constraint says why | Fail | Line 141: "This offer MUST be its own message. Only the offer — no clarifying question, summary, or other content" — no stated reason. Line 72's "one question per message" likewise. Contrast with the same file doing it correctly elsewhere (visual-companion.md line 111, "never use cat/heredoc (dumps noise into terminal)"; the URL-key security note explains its own why). |
| Important, always — pre-work check named as the first step | Pass | Checklist item 1 / line 67: "Check out the current project state first (files, docs, recent commits)." |
| Advisory, reused — a checklist the agent can copy and tick off | Pass | Lines 20-32, "## Checklist," 9 numbered items. |

### Finish

| Rule | Result | Evidence |
| --- | --- | --- |
| Blocking, changes something — a self-runnable check settles doneness | Pass | Lines 112-120, Spec Self-Review (placeholder/consistency/scope/ambiguity), gates moving to the User Review Gate. |
| Important, hand-off — exact commands named | N/A | hand-off not met. |
| Important, always — agent runs the check itself before reporting | Pass | Self-review (112-120) runs before the User Review Gate (122-127). |
| Important, hand-off — evidence goes in the report | N/A | hand-off not met. |
| Blocking, advisory — finish criteria reproducible across runs | N/A | advisory not met. |
| Important, advisory — evidence each finding must carry | N/A | advisory not met. |
| Advisory, always — finish check sits late in the document | Pass | Lines 112-133, near the end, before the appendix-like Visual Companion section. |

### Failure

| Rule | Result | Evidence |
| --- | --- | --- |
| Blocking, always — conditions that should stop the work are stated | Fail | Lines 122-127: "Wait for the user's response. If they request changes, make them and re-run the spec review loop... Only proceed once the user approves." No condition under which the agent should pause or escalate instead of continuing to loop. |
| Important, always — retry limit named, something must change before retry | Fail | Same lines 122-127 — no cap on revision rounds. Same underlying gap as the row above. |
| Blocking, changes something — weakening the check is forbidden | Fail | Lines 112-120 (Spec Self-Review) — nothing forbids a shallow pass that declares the four checks clean without real scrutiny. |
| Important, hand-off — named status for an insufficient instruction | N/A | hand-off not met. |
| Important, hand-off — stopping carries no penalty | N/A | hand-off not met. |
| Blocking, advisory — status for missing/unexpected/unassessable input | N/A | advisory not met. |
| Advisory, always — stop conditions sit directly after the finish check | N/A | Dependent on the missing stop conditions above; no section to position. |

### Return

All six rules (sections named, wording fixed for comparison, detail-to-file, failures inlined, unasked-work section, format at end) — **N/A, hand-off not met.**

### Calibration (steering-rules.md)

All four rules (examples of what counts, examples of what doesn't, default-outcome stated, shape-not-label) — **N/A, advisory not met.**

### Composition

| Rule | Result | Evidence |
| --- | --- | --- |
| Important, hand-off — facts established before dispatch, with origin | N/A | hand-off not met. |
| Important, hand-off — deterministic work done by a script, not by hand | N/A | hand-off not met. |
| Important, hand-off — template facts as named fields, not prose | N/A | hand-off not met. |
| Important, reused — every named hole marked required or defaulted | N/A | No active dispatch-template construct in the content this SKILL.md actually uses. (`spec-document-reviewer-prompt.md`, which does have a `[SPEC_FILE_PATH]` hole, sits in the same directory but is never named or invoked by `SKILL.md`, so it's out of scope for what this instruction asserts.) |
| Advisory, reused — template's field set is fixed | N/A | Same reason. |
| Important, hand-off — model/effort named explicitly | N/A | hand-off not met. |
| Blocking, hand-off — status values enumerated with caller obligations | N/A | hand-off not met. |
| Important, hand-off — each status scoped to agent-only vs. whole-run | N/A | hand-off not met. |
| Important, hand-off — caller doesn't re-run proven checks | N/A | hand-off not met. |
| Important, changes something — what happens to partial work when a run stops | Fail | No statement anywhere for what should happen to a design doc that's already been committed to git if the session ends before the user approves it (closest text, line 127, gates moving *forward*, not the status of what's already committed). |
| Advisory, hand-off — dispatched agent call checked for unneeded context | N/A | hand-off not met. |

## Counts by severity

Distinct root-cause findings: **6 Blocking, 6 Important, 0 Advisory.**

- Blocking: undefined "implementation skill" category (Scope); broken one-hop reference to `visual-companion.md` (Loading, also trips Context); already-known content in "Design for isolation and clarity" (Content); no recorded baseline comparison (Evidence); unbounded design-approval revision loop (Failure — stop conditions + retry limit, one root cause); no anti-gaming statement for the self-review check (Failure).
- Important: description lacks casual trigger phrasings (Discovery); description written in second person (Discovery); no "direct instruction wins" statement, and the text actively resists one (Boundary); `visual-companion.md` exceeds 100 lines with no contents list (Loading); the standalone-offer-message constraint has no stated rationale (Method); no statement of what happens to a committed-but-unapproved doc if the run stops (Composition).

Any blocking failure means the file needs work before use. This file has six.

## Three fixes to make first

1. Define "implementation skill" by a membership test (e.g., "any skill that writes, edits, executes, or deploys code or infrastructure"), not just the two named examples plus "or any other." This category gates the skill's entire premise — the HARD-GATE that keeps implementation from starting before design approval only works if the agent can tell what counts.
2. Fix the reference at line 151 to `visual-companion.md` (drop the redundant `skills/brainstorming/` prefix, or make it `./visual-companion.md`) so the companion guide actually loads when a caller resolves it relative to `SKILL.md`, the way the collection's own `subagent-driven-development/SKILL.md` does it.
3. Put a bound on the design-approval revision loop (lines 122-127): a round cap, or a named condition for pausing/escalating instead of looping indefinitely when the user keeps requesting changes.