# Re-audit: `plugins/steering/skills/writing-skills/SKILL.md`

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/writing-skills/SKILL.md`
Rules applied: `plugins/steering/shared/skill-rules.md`, `plugins/steering/shared/steering-rules.md`
Prior report compared against:
`plugins/steering/tests/outcomes/ste-rewrite/audits/writing-skills.md`, which audited this target at
commit `7deb2ae`.
Repository state: clean at `d015e2e`. Nothing was committed, staged, or edited.

## Conditions applied

Taken from the target's own use, not from this audit's use of it. Unchanged from the prior report,
with one addition.

- **always** met. **reused** met, it is a skill. **changes something** met, it writes files.
- **advisory** not met. Every rule conditioned on advisory is not applicable.
- **hand-off** not met. `handoff-rules.md` was out of scope and not opened.
- **catalogue** not met. This condition is new since the prior report. The target states a workflow
  of its own, so it is not a catalogue. Method, Finish, and Failure all still apply to it.
  `skill-rules.md` now declares itself a catalogue at its own lines 8 to 10, which changes how that
  file is audited but not how the target is.

## 1. Lint result, and whether the lint reached the target

Command: `npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`.

```
> node eng/generate-readmes.mjs --check
All generated files are up to date.
```

Clean exit, no findings.

Coverage came from `npm run lint -- --explain`, not from prose. Components get every check:
frontmatter hazards, name format and length, description length limit 1024, body line count limit
500, and reference resolution. Components are `skills/*/SKILL.md` with the name required to match its
directory, `commands/*.md`, and `agents/*.md`.

The target is `skills/writing-skills/SKILL.md`. **The lint reached it and every check ran.** The
mechanical limits are settled: frontmatter parses, `name` matches the directory, the description is
within 1024, the body is 90 lines, and every reference the file names resolves. Nothing mechanical
was re-derived by hand.

Three coverage notes.

- The explain output says nothing under a plugin's `tests/` is opened. So the lint says nothing about
  `plugins/steering/tests/baselines/writing-skills.md`, which the Evidence rule depends on. That was
  checked by reading. Finding N3 below comes from that reading.
- The shared rule files are reference surfaces and get reference resolution only. Loading rule L4
  uses a 100-line threshold, so that measurement was taken by reading. `skill-rules.md` is 90 lines,
  `lint.md` is 74, `steering-rules.md` is 231 and opens with a contents list at its lines 29 to 40.
- `skill-rules.md` has dropped its "The SKILL.md body is 500 lines or fewer" row since the prior
  report, which scored it as a Loading pass. That rule no longer exists as a judgment rule. The lint
  owns the limit now. This is consistent with the file's own opening about mechanical limits, so it
  is recorded here and not scored.

## 2. Prior findings

The prior report's findings table carried four fails and warns. All four are accounted for.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| Content, "content that would not change what an agent does is absent" (Important, fail, defect). Steps 2 and 3 restated tables from `skill-rules.md`, and both copies had drifted. | **Retired** | Step 2 now reads "Write it against every rule in the Discovery table of `../../shared/skill-rules.md`" (lines 44 to 45) and step 3 "the Boundary and Content tables" (lines 48 to 49). No rule text is restated. Both named tables exist: `## Discovery` at `skill-rules.md` line 17, `## Boundary` at line 30, `## Content` at line 38. The pointers name the right tables, and each step now reaches more rules than its old copy did. Step 2 regains "error text" and the third-person rule. Step 3 regains "a direct instruction from the person wins" and all six Content rules. Nothing an agent needs was lost with the restatement. |
| Evidence, baselines "linked from nothing" (Blocking, fail, difference). `README.md` and `SUMMARY.md` both link `tests/baselines/`, so every skill in the plugin failed the clause. | **Retired** | The clause now reads "and no SKILL.md links to it" (`skill-rules.md` line 86). A repository grep for `tests/baselines` finds markdown links only in `plugins/steering/README.md:220`, `plugins/steering/SUMMARY.md:192`, and the generator at `eng/generate-readmes.mjs:347`. None is a SKILL.md. The only mention inside a SKILL.md is the target's own line 59, and that is a write destination carrying the placeholder `<skill-name>`, not a link, and not a path the lint's reference check even reads (`generate-readmes.mjs:236` only matches backticked paths starting `./` or `../`). The reworded rule works. |
| Context, "every fact the agent needs is written out or pointed at by a path it can read" (Blocking, warn, defect). Step 6 said "the plugin's `tests/baselines/`" and supported two readings, this plugin or the plugin owning the skill being written. | **Retired** | Step 6 now reads "under the plugin directory that holds the skill you are writing. That is the directory the Evidence rule in `../../shared/skill-rules.md` reads" (lines 59 to 60). One reading only. The residual case, a skill that sits in no plugin, is filed below as N2 rather than counted here, because the prior report raised it in its fixes section and not in its findings table. |
| Scope, "a category of work carries a membership test; any list of kinds carries an examples marker" (Blocking, fail, defect). Step 3's four-item list of what the body must contain was closed and named no rules file. | **Changed** | Reduced, not gone. Step 3 now names a rules file, and the "direct instruction wins" gap it caused is closed by the Boundary table. But line 47 still gives a closed three-item structure list with no marker, "Order it: what the skill produces, then the workflow, then the boundary", and the two tables it points at are the only rules it names. Failure, Finish, Composition, and Scope for the produced body all live in `steering-rules.md`, which step 3 does not name. An agent following step 3 still ships a body with no stop conditions, no failure handling, and no partial-work statement. The unaided baseline produced a failure section without the skill (`tests/baselines/writing-skills.md` line 9), so the gap can still make the output worse than no skill. |

Confirmed: 0. Retired: 3. Changed: 1.

Nothing else in the prior report's table has moved. The 52 rows the prior report passed were rechecked
against the current text and all still pass, except where a new finding below says otherwise.

### Note on the surviving finding

`skill-rules.md` lines 3 to 4 do say "The rules in `./steering-rules.md` also apply to a skill. Read
that file too", and that sentence sits at the top of the file step 3 tells the agent to open. So the
chain closes in one hop for an agent that reads the header. The finding survives because step 3's own
wording narrows the job to "work down both tables", which a literal reader takes as the complete
checklist for the body. The sibling skill in the same plugin shows the stronger form:
`writing-agents` step 2 names `steering-rules.md` and `handoff-rules.md` directly at the moment the
prompt is written.

The narrowing is also brittle in a second way. "Boundary and Content" fixes the set at two tables, so
a table added to `skill-rules.md` that governs the body would not be reached. That is the same root
cause, so it is not counted separately.

## 3. New findings

Findings the prior report does not contain.

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| **N1. Method** — the instruction constrains how the work is done only where correctness needs a specific way, and each constraint says why (Important) | **Fail** | **Defect** | Step 3 line 47 fixes a section order for the produced skill: "Order it: what the skill produces, then the workflow, then the boundary." That order contradicts the file the skill's own Rules section reaches. `steering-rules.md` line 60 says "The section order below is the order these sections should appear in the document being written", and its contents list runs Outcome, Context, Scope, Method, so Scope sits above Method. Its Scope table also carries "The scope statement sits above the method" (Advisory). Step 3 puts the boundary after the workflow, the reverse. The target does not follow its own step 3 either: "Where this stops" sits at line 26, above "## Workflow" at line 32. An agent following step 3 places the boundary section below the workflow, and step 7 then dispatches an audit that reports it. Step 3 also drops Context from the order entirely. The constraint carries no reason, which the rule requires. Harm is bounded, because the two position rules it breaks are Advisory and never block. |
| **N2. Context** — every fact the agent needs is written out or pointed at by a path it can read (Blocking) | **Warn** | **Defect** | Step 6 lines 58 to 60 send the baseline record "under the plugin directory that holds the skill you are writing". A skill that sits in no plugin, for example one written into a repository's own `.claude/skills/`, has no such directory, and step 6 gives no fallback. The target's own description and its artifact check at lines 11 to 24 place no plugin requirement on what it writes. Line 70 makes that record the gate, so an agent with no destination either guesses one or skips the gate. A second, milder tension sits behind it: step 6 asserts "That is the directory the Evidence rule in `../../shared/skill-rules.md` reads", while `skill-rules.md` lines 88 to 90 say the Evidence rule "applies only to a skill this plugin maintains" and to mark it not applicable otherwise. For a skill written into another plugin the two sentences do not obviously agree. Marked warn because I cannot tell from the text whether the authors intend this skill for plugin skills only. |
| **N3. Evidence** — the plugin's `tests/baselines/` holds the observed failures the skill addresses (Blocking) | **Warn** | **Defect** | `plugins/steering/tests/baselines/writing-skills.md` is unchanged across `7deb2ae..d015e2e`, confirmed by `git diff --stat` over that path returning nothing, while steps 2, 3, and 6 all changed. The target's own line 81 requires the note: "Say in the record that you did not repeat the baseline." The record's last entry is dated 2026-08-01 and describes the previous round's pointer fixes at its lines 50 to 52. An agent making the next change reads a record that stops before the current steps 2, 3, and 6 exist, and cannot tell whether that text was ever exercised, so it either repeats a baseline it did not need or treats unverified text as verified. `tests/outcomes/ste-rewrite/AUDIT-ROUND.md` records the round and the fix decisions, but it sits outside `tests/baselines/` and never says the baseline was not repeated for this skill. Marked warn rather than fail because the Evidence rule's letter is satisfied, the directory does hold a with-and-without comparison and the failures the skill addresses, and only the target's own currency clause is unmet. This is the second time: the record's own lines 46 to 48 say the same note was forgotten once before, for the same reason. |
| **N4. Voice** — nothing that cannot choose to act takes an action verb (Important) | **Warn** | **Difference** | The step 6 fix introduced line 60: "That is the directory the Evidence rule in `../../shared/skill-rules.md` reads." `steering-rules.md` line 189 names a rule as a thing that cannot choose, and "reads" is an action verb. This is the shape the rule names. Recorded because a fix introduced it. Marked a difference because I cannot name anything an agent does wrong, the meaning lands as "the directory the Evidence rule refers to", and the prior report recorded three similar constructions at lines 35, 41, and 47 and passed the rule. The rule's overall verdict on the target is unchanged. |

## 4. Counts by severity

New findings, by the severity the rule files assign.

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 0 | 2 | 2 |
| Important | 1 | 1 | 2 |
| Advisory | 0 | 0 | 0 |

New findings: 4. **Defects 3, differences 1.**

Surviving prior findings.

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 1 | 0 | 1 |
| Important | 0 | 0 | 0 |
| Advisory | 0 | 0 | 0 |

Surviving: 1. **Defects 1, differences 0.**

Combined open: 5 findings, 4 defects and 1 difference. Blocking 3, Important 2, Advisory 0.

Movement since the prior report: 3 retired, 1 changed and reduced, 4 new. Defects went from 3 to 4,
differences from 1 to 1. One prior blocking difference retired, and both prior blocking defects
either retired or dropped to a warn. Two of the four new findings, N1 and N4, were introduced by the
d015e2e fixes themselves. N3 is a consequence of making the fixes without updating the record they
belong in.

### The three fixes to make first

1. **Name `../../shared/steering-rules.md` in step 3, alongside the two `skill-rules.md` tables.**
   This closes the surviving Blocking defect. Step 3 is where the body gets written, and the rules
   that put a failure section, a finish check, and a partial-work statement into that body live in a
   file step 3 does not name. `writing-agents` step 2 already does this and is the pattern to copy.
2. **Fix step 3's section order, or drop it and let the rules files carry it.** As written it tells
   the agent to do the opposite of what `steering-rules.md` line 60 and the target's own layout both
   show. Either way, say why the order is what it is, since the Method rule asks for the reason.
3. **Add a fallback to step 6 for a skill that sits in no plugin, and update
   `tests/baselines/writing-skills.md` for the d015e2e change.** The two go together, because the
   record is where the note about a small change belongs, and the same edit can carry both.

## 5. Anything I did that nobody asked for

- I read `eng/generate-readmes.mjs` lines 219 to 241 to establish what the lint counts as a
  reference, so I could test the reworded Evidence clause precisely rather than by eye. That is what
  settles that the target's line 59 is not a link.
- I ran a repository-wide grep for `tests/baselines` to test the reworded Evidence clause. That grep
  is the evidence for retiring the prior Evidence finding.
- I read `tests/outcomes/ste-rewrite/AUDIT-ROUND.md` before filing N3, to check whether the d015e2e
  change was recorded somewhere other than the baseline file. It is recorded there, but not as the
  note the target's line 81 asks for and not in the directory the Evidence rule names.
- I reopened `auditing-skills/SKILL.md` and `writing-agents/SKILL.md`, both of which changed in
  d015e2e, to confirm the target's boundary claims still hold. They do. `auditing-skills` line 9
  still says "This audit changes nothing", and `writing-agents` still claims subagent prompts.
- I checked the newly added catalogue block at `steering-rules.md` lines 52 to 55 against the Loading
  rule "No reference file instructs the reader to ignore or skip part of itself". It passes. It sets a
  condition on which rules apply and says to mark them not applicable, which is the same shape as
  lines 21 to 23 that the prior report also passed. It is not a skip instruction, so no separate file
  is needed. Not scored.
- I did not open `shared/handoff-rules.md`. Both rule files state a non-hand-off document never reads
  it.
- I changed no file except this report.
