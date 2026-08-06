# Audit: `brainstorming` SKILL.md

**Target:** `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/external-probe/skills/brainstorming/SKILL.md` (151 lines; body 146 lines excluding frontmatter). Reference file named and read in full: `visual-companion.md` (298 lines, same directory).

**Rules applied:** `shared/skill-rules.md` (unconditional for a SKILL.md) and `shared/steering-rules.md`.

**Conditions applied:** `reused` — met (given). `hand-off` — not met (given). `changes something` — met: the skill's own workflow writes a file and commits it ("Write the validated design (spec) to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`" / "Commit the design document to git", lines 107–110) and the Visual Companion writes HTML files to `screen_dir`/`state_dir` and starts a background server. `advisory` — not met: the skill does not stop at review; it is generative and its terminal state is invoking `writing-plans` (lines 131–132).

**Lint:** `npm run lint` (repo root) passes — "All generated files are up to date." It does not check this target. `eng/generate-readmes.mjs` only scans `<plugin>/skills/*/SKILL.md` for plugins listed in `marketplace.json` (`skyetrail`, `steering`), and its own comment says content under a plugin's `tests/` is "deliberately excluded, since they are historical records that may cite paths from earlier rounds." This file sits under `plugins/steering/tests/outcomes/external-probe/...`, so it is out of scope by the script's own design, not by an accident of where this audit runs from. No `repo-setup` block exists in this repository's `AGENTS.md` (verified: the string does not appear there), so the fallback rule in `shared/lint.md` applies and `npm run lint` is the correct command to have tried — it just doesn't reach this file. Separately: the lint's own reference-checking regex only recognizes backticked paths beginning with `./` or `../`; the one reference this file makes (`skills/brainstorming/visual-companion.md`) has no such prefix and would not have been checked even if the directory were in scope. The mechanical items below are therefore hand-checked, not lint output, and are marked as such: frontmatter parses, `name: brainstorming` (13 chars, matches the directory), `description` is 198 characters, body is 146 lines — all clear. Reference resolution fails; see Loading, row 16.

## Skill rules (`shared/skill-rules.md`)

### Discovery

| Rule | Severity | Result | Evidence |
| --- | --- | --- | --- |
| Description states the capability in the words a searcher would use | Blocking | Pass | "Explores user intent, requirements and design before implementation." |
| Description states the conditions that trigger it | Blocking | Pass | "before any creative work - creating features, building components, adding functionality, or modifying behavior" |
| Description includes file types, error text, casual phrasings people type | Important | Fail | No example phrasing ("let's brainstorm," "I have an idea for") anywhere in the description; it is instructional, not trigger-phrase-based |
| Description does not summarise the workflow | Important | Pass | Description states purpose only; no steps enumerated |
| Description is written in third person | Important | Fail | Opens "You MUST use this before any creative work" — second person, line 3 |

### Boundary

| Rule | Severity | Result | Evidence |
| --- | --- | --- | --- |
| Skill says what it does not cover | Blocking | Pass | HARD-GATE, lines 12–14: no implementation skill, code, scaffolding, "or take any implementation action" before design approval; repeated lines 61, 131–132 |
| Skill names which skill takes over | Important | Pass | "The ONLY skill you invoke after brainstorming is writing-plans" (61, 131–132) |
| Skill says a direct instruction from the person wins | Important | Fail | No such statement anywhere in the 146-line body; the HARD-GATE instead reads as unconditional — "This applies to EVERY project regardless of perceived simplicity" (line 18) |

### Content

| Rule | Severity | Result | Evidence |
| --- | --- | --- | --- |
| First lines say what the skill produces, before steps | Important | Pass | Lines 8–10 state the produced artifact before the Checklist (line 20) |
| Nothing explains what the model already knows | Blocking | Pass | No instance found; general-sounding advice (e.g. lines 90–95) is tied to a specific, non-obvious rationale each time |
| Content that would not change agent behaviour is absent | Important | Pass | The Process Flow digraph (36–59) restates the Checklist but also encodes loop/branch edges the flat list doesn't, and matches this collection's own documented DOT convention (`writing-skills/graphviz-conventions.dot`, sibling directory) — not inert filler |
| One term used for one thing throughout | Important | Fail | Same artifact is "design doc" (line 29), then "Spec" (30), then "written spec" (31); also "the spec document" (113), "the written spec" (123), "Spec written" (125), against "the validated design (spec)" (107) and "## After the Design" (103) |
| Time-sensitive material absent or confined | Important | Pass | No dated/versioned claims; `YYYY-MM-DD` (29, 107) is a format placeholder |
| Does not document a constraint a script/regex could enforce | Important | Pass | No clear instance found |

### Loading

| Rule | Severity | Result | Evidence |
| --- | --- | --- | --- |
| SKILL.md body ≤ 500 lines | Blocking | Pass | 146 body lines |
| Every reference is one hop from the SKILL.md that names it | Blocking | Fail | Line 151 names `` `skills/brainstorming/visual-companion.md` ``; joined with the SKILL.md's own directory this path does not exist — the file is at `visual-companion.md`, directly alongside it. visual-companion.md's own footer (297–298) references `` `scripts/frame-template.html` `` and `` `scripts/helper.js` `` as plain same-directory paths, so the collection's own convention (evidenced inside this very skill) is same-directory-relative; line 151 is an isolated break, not a different rooting convention applied consistently |
| Reference file > 100 lines opens with a contents list | Important | Fail | visual-companion.md is 298 lines; opens with a title, one-line description, then straight into "## When to Use" (1–5) — no contents list |
| Test material not reachable from the skill | Important | Pass | No test/eval material linked from SKILL.md or visual-companion.md |
| No reference file instructs skipping part of itself | Important | Pass | visual-companion.md addresses its reader uniformly |

### Evidence

| Rule | Severity | Result | Evidence |
| --- | --- | --- | --- |
| Baseline comparison recorded in the plugin's `tests/baselines/` | Blocking | Fail | No file for this skill exists in any plugin's `tests/baselines/`; the four present (`auditing-skills.md`, `repo-setup.md`, `writing-agents.md`, `writing-skills.md`) cover only this plugin's own shipped skills. Structural: the rule ties evidence to this repository's own recorded process, which a file captured from an outside collection was never run through |

## Steering rules (`shared/steering-rules.md`)

### Outcome

| Rule | Severity | Applies | Result | Evidence |
| --- | --- | --- | --- | --- |
| Finished outcome stated, not just a topic | Blocking | always | Pass | Lines 8–10 name the produced artifact (an approved, written spec) and the terminal hand-off, not just an area of work |
| Outcome sits at the top | Advisory | always | Pass | Lines 8–10 precede Checklist (20) and Process (34) |
| Outcome checkable without asking the author | Important | hand-off | N/A | hand-off not met |

### Context

| Rule | Severity | Applies | Result | Evidence |
| --- | --- | --- | --- | --- |
| Nothing refers to something unresolvable | Blocking | always | Fail | Same defect as Loading row above: line 151's path does not resolve |
| Every fact written out or pointed at by a readable path | Blocking | always | Fail | Operational facts for the companion (server, screen_dir/state_dir, event format) are neither in SKILL.md nor reachable via the broken line-151 pointer |
| Approaches already tried and found not to work are stated | Important | always | Pass | "Anti-Pattern: 'This Is Too Simple To Need A Design'" (16–18) states the failure mode the HARD-GATE exists to prevent |
| Local conventions stated | Important | hand-off | N/A | hand-off not met |
| Context sits above method | Advisory | always | Pass | Lines 6–18 precede Checklist (20) |

### Scope

| Rule | Severity | Applies | Result | Evidence |
| --- | --- | --- | --- | --- |
| What is in scope is named | Blocking | always | Pass | Lines 8–10 plus Checklist |
| What is out of scope is named explicitly | Blocking | always | Pass | HARD-GATE (12–14), repeated 61, 131–132 |
| Category of work defined by membership test; lists marked as examples | Blocking | always | Fail | Description (line 3): "any creative work - creating features, building components, adding functionality, or modifying behavior" — four items, no generalising phrase, the same shape as the rule file's own bad example ("Review for injection: SQL, command, template, or path."). Contrast line 13, which closes its own list with a catch-all ("or take any implementation action") and is fine |
| Stop-and-report at a scope limit rather than work around it | Blocking | always | Pass | Lines 68–69: an oversized request must be "flag[ged]... immediately" and decomposed |
| Scope statement above method | Advisory | always | Pass | HARD-GATE/Anti-Pattern (12–18) precede Checklist (20) |
| Must-not-modify + fallback for an obvious fix | Blocking | advisory | N/A | advisory not met |

### Method

| Rule | Severity | Applies | Result | Evidence |
| --- | --- | --- | --- | --- |
| One default approach, not a menu | Important | always | Pass | Single linear Checklist + matching digraph |
| Order fixed where correctness requires | Blocking | always | Pass | Line 22, "complete them in order," plus digraph loop-backs |
| Constrained only where required, each constraint says why | Important | always | Warn | The HARD-GATE's rationale sits nearby (16–18), but smaller hard constraints don't state one: "Only one question per message" (72), "This offer MUST be its own message" (141) |
| Pre-work check named as first step | Important | always | Pass | Checklist item 1, "Explore project context" (24) |
| Checklist the agent can copy and tick off | Advisory | reused | Pass | "## Checklist" (20–32) |

### Finish

| Rule | Severity | Applies | Result | Evidence |
| --- | --- | --- | --- | --- |
| Self-runnable check settles done-ness | Blocking | changes something | Pass | Self-Review's four checks (115–118) plus "Only proceed once the user approves" (127) |
| Exact commands named | Important | hand-off | N/A | hand-off not met |
| Agent runs the check itself before reporting | Important | always | Pass | Self-Review (112–121) precedes the User Review Gate (122–127) |
| Evidence goes in the report so nobody re-runs it | Important | hand-off | N/A | hand-off not met |
| Finish criteria specific enough for reproducibility | Blocking | advisory | N/A | advisory not met |
| Evidence-per-finding stated | Important | advisory | N/A | advisory not met |
| Finish check sits late in the document | Advisory | always | Pass | 112–127 is the second-to-last section |

### Failure

| Rule | Severity | Applies | Result | Evidence |
| --- | --- | --- | --- | --- |
| Stop conditions stated | Blocking | always | Pass | HARD-GATE (12–14); decompose trigger (68–69); "Wait for the user's response... Only proceed once the user approves" (127) |
| Retry limit named, something must change before retry | Important | always | Warn | The "no, revise" loop (digraph line 52) and "re-run the spec review loop" (127) name no cap; each cycle is user-gated rather than autonomous, which lessens but doesn't remove the gap |
| Weakening the check forbidden | Blocking | changes something | Fail | No line says a flagged Self-Review issue (115–118) must be genuinely resolved rather than deleted or watered down to clear the check |
| Named status for an insufficient instruction | Important | hand-off | N/A | hand-off not met |
| Stopping carries no penalty | Important | hand-off | N/A | hand-off not met |
| Missing/unexpected input handling, with a status | Blocking | advisory | N/A | advisory not met |
| Stop conditions sit directly after the finish check | Advisory | always | Pass | Line 127 sits immediately after the Self-Review/Review-Gate it belongs to |

### Return

All six rows (report sections named; wording fixed for comparison; detail-to-file with capped summary; failures inlined; list-what-wasn't-asked-for; report format at the end) — **N/A, hand-off not met.**

### Calibration

All four rows (examples of what counts; examples of what doesn't; default-outcome stated; shape-not-label for a missed case) — **N/A, advisory not met.**

### Composition

| Rule | Severity | Applies | Result | Evidence |
| --- | --- | --- | --- | --- |
| Facts established before dispatch, with origin | Important | hand-off | N/A | hand-off not met |
| Deterministic-by-script rather than dispatched/hand-read | Important | hand-off | N/A | hand-off not met |
| Template fields as fixed named fields to a file | Important | hand-off | N/A | hand-off not met |
| Named holes marked required or given a default | Important | reused | Pass | The one template, `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` (29/107), has two self-evident holes (date, topic slug); no real ambiguity risk |
| Template field set fixed | Advisory | reused | Pass | Same template, two fixed fields |
| Model/effort named explicitly | Important | hand-off | N/A | hand-off not met |
| Status values enumerated, caller obligation stated | Blocking | hand-off | N/A | hand-off not met |
| Status declares scope of effect | Important | hand-off | N/A | hand-off not met |
| Caller checks report usable, doesn't re-run | Important | hand-off | N/A | hand-off not met |
| What happens to partial work when a run stops | Important | changes something | Warn | No line addresses a written-but-uncommitted, or committed-but-unapproved, design doc if the conversation stops mid-flow; low consequence (an uncommitted file in a git tree) but genuinely unaddressed |
| Predefined agent dispatch checked for unneeded context | Advisory | hand-off | N/A | hand-off not met |

## Counts by severity

Distinct findings, one per root cause (rule-row tally in parentheses):

- **Blocking: 4** (6 rows) — broken `visual-companion.md` reference (3 rows: Context×2, Loading); exhaustive-reading trigger list in the description (Scope); no anti-check-gaming statement in Spec Self-Review (Failure); no baseline-comparison record (Evidence).
- **Important: 8** (8 rows) — second-person description (Discovery); no casual trigger phrasings (Discovery); no "direct instruction wins" statement (Boundary); "design doc" vs "spec" term drift (Content); no contents list in a 298-line reference file (Loading); hard constraints without stated rationale (Method, warn); no retry cap on the revision loops (Failure, warn); no partial-work-on-stop statement (Composition, warn).
- **Advisory: 0.**
- Pass: 33 rows. Not applicable: 28 rows (hand-off or advisory conditions not met).

Four blocking findings means the file needs work before use.

## Three fixes to make first

1. **Fix the visual-companion.md reference.** Change line 151 from `` `skills/brainstorming/visual-companion.md` `` to `` `visual-companion.md` `` — matching the same-directory-relative style the file's own footer already uses for `scripts/frame-template.html` and `scripts/helper.js`. As written, the one pointer to the companion's operating instructions doesn't resolve.
2. **Close the trigger-list reading in the description.** Add a generalising phrase to "creating features, building components, adding functionality, or modifying behavior" (line 3) — the same move line 13's own list makes by closing with "or take any implementation action" — so a request outside those four examples isn't read as out of scope.
3. **State that Self-Review issues must be fixed, not removed.** Add one line after 120 saying a flagged placeholder, contradiction, scope problem, or ambiguity (115–118) must be resolved on the merits, not cleared by deleting or narrowing the requirement it flags.

Separately, the missing baseline-comparison record (Evidence, Blocking) is not a text fix: it requires an actual comparison run to be recorded in `tests/baselines/`, and the rule as written has no carve-out for a skill this plugin did not author — flagged rather than added to the fix list above.