# Audit: `plugins/steering/skills/writing-skills/SKILL.md`

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/writing-skills/SKILL.md`
Rules applied: `plugins/steering/shared/skill-rules.md`, `plugins/steering/shared/steering-rules.md`
Repository state: clean at 7deb2ae. Nothing was committed, staged, or edited.

## Conditions applied

Taken from the target document's own use, not from this audit's use of it.

- **always** — met.
- **reused** — met. It is a skill.
- **changes something** — met. It writes a SKILL.md, reference files, and a baseline record.
- **advisory** — not met. It changes files, so it is not review-only work. Every rule conditioned
  on **advisory** is marked not applicable below.
- **hand-off** — not met. `skill-rules.md` states its rules apply when **reused** is met and
  **hand-off** is not, and `steering-rules.md` states a document that is not a hand-off never
  reads `handoff-rules.md`. That file was therefore out of scope and not opened.

## 1. Lint result, and whether the lint reached the target

Command: `npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`.

```
> node eng/generate-readmes.mjs --check
All generated files are up to date.
```

Clean exit, no findings.

Coverage was established from `npm run lint -- --explain`, not from prose. The explain output
says components get every check: frontmatter hazards, name format and length, description length
(limit 1024), body line count (limit 500), and reference resolution. Components are
`skills/*/SKILL.md` (with the name required to match its directory), `commands/*.md`, and
`agents/*.md`.

The target is `skills/writing-skills/SKILL.md`. **The lint reached it and every check ran.** The
mechanical limits are therefore settled: frontmatter parses, `name` matches the directory,
description is within 1024, body is within 500 lines, and every reference the file names
resolves. No mechanical limit was re-derived by hand.

Two coverage notes:

- The explain output says `tests/` is not opened at all. So the lint says nothing about
  `plugins/steering/tests/baselines/writing-skills.md`, which the Evidence rule depends on. That
  was checked by reading.
- The shared rule files are reference surfaces and get reference resolution only, with no length
  check. Loading rule L4 uses a 100-line threshold, so that one length was determined by reading
  rather than by the lint. It is the only measurement in this report the lint did not settle.

## 2. Findings

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| **Discovery** — description states the capability, in the words someone looking for it would use (Blocking) | Pass | — | Frontmatter line 3: "Writes a new Agent Skill or fixes an existing one, producing a SKILL.md and its reference files." |
| Discovery — description states the conditions that should trigger it (Blocking) | Pass | — | Line 3: "Use this whenever someone mentions writing, creating, drafting, or improving a skill or a SKILL.md…" |
| Discovery — description includes file types, error text, and casual phrasings people actually type (Important) | Pass | — | Line 3 carries the file type (`SKILL.md`) and the casual phrasings ("a skill is not triggering", "a skill is being ignored", "get an agent to do something the same way every time"). Skill authoring produces no error text, so that element has nothing to carry. |
| Discovery — description does not summarise the workflow or the process (Important) | Pass | — | Line 3 names output and triggers only. No mention of the baseline, the audit, or the step sequence. |
| Discovery — description speaks in the third person (Important) | Pass | — | Line 3 is written about the skill and about "someone". No first person, no "you". |
| **Boundary** — the skill says what it does not cover (Blocking) | Pass | — | "Where this stops", lines 28-30. Three explicit exclusions. |
| Boundary — names which skill takes over where it stops (Important) | Pass | — | Lines 28-30 name `auditing-skills` and `writing-agents`. Both were opened and both claim the matching ground (`auditing-skills` line 9 "This audit changes nothing"; `writing-agents` line 3). The third exclusion, "does not judge writing style", names no successor, which is correct: it is dropped, not delegated. |
| Boundary — a direct instruction from the person wins over the skill (Important) | Pass | — | Line 30: "A direct instruction from the person overrides this skill." |
| **Content** — first lines say what the skill produces, before any steps (Important) | Pass | — | Lines 8-9, immediately under the H1. |
| Content — nothing explains something the model would already know (Blocking) | Pass | — | No format teaching, no YAML or markdown explanation. Every rationale present is a reason for a constraint, which the Content section exempts. The baseline record at `tests/baselines/writing-skills.md` lines 31-33 shows this was a deliberate call. |
| Content — content that would not change what an agent does is absent (Important) | **Fail** | **Defect** | Steps 2 and 3, lines 43-49. Both restate a list that lives in `skill-rules.md`, the exact shape that file names as a finding ("A restatement of a list that lives in another file. The copy drifts."). Both copies have already drifted. Step 2 reproduces the Discovery table but drops "error text" and drops the third-person rule entirely. Step 3 reproduces Content rule 1 and Boundary rules 1-2 but drops Boundary rule 3. An agent writing to step 2 produces a description missing two of the five Discovery requirements and has no way to know. |
| Content — one term for one thing throughout (Important) | Pass | — | "subagent" (steps 1, 6, 7) and "fresh agent" (step 7 line 60) alternate for the same thing, and "the record" (lines 63, 77, 81) and "the report" (line 73) sit close together for the baseline file and the message to the person. Each use is locally unambiguous from its sentence, so no wrong action follows. |
| Content — time-sensitive material absent, or only in a section for old patterns (Important) | Pass | — | No dates, versions, or "as of" anywhere in the body. |
| Content — does not document a constraint a script or a regex could enforce (Important) | Pass | — | Step 7 line 58 defers the mechanical limits to the lint rather than restating them: "Run the lint command named in `../../shared/lint.md`. This settles the mechanical limits." Line 18 also tells the author to automate such constraints rather than write them down. |
| **Loading** — body is 500 lines or fewer (Blocking) | Pass | — | Settled by the lint's body line count check, which reached this file. Not re-derived. |
| Loading — every reference is one hop from the SKILL.md that names it (Blocking) | Pass | — | Settled by the lint's reference resolution, which reached this file. Confirmed by reading: `skill-rules.md` (lines 54, 63, 85), `steering-rules.md` (line 63), and `lint.md` (line 58) are each named directly, so `steering-rules.md` is not reached only through `skill-rules.md`. `auditing-skills` and `writing-agents` are sibling skill names, which this plugin resolves. |
| Loading — detail sits in reference files rather than the front file (Important) | Pass | — | 86-line body, mostly workflow; the rule detail sits in the shared files. The one leak is steps 2-3, counted once above under Content. |
| Loading — a reference file longer than 100 lines opens with a contents list (Advisory) | Pass | — | Of the three named reference files, only `steering-rules.md` exceeds 100 lines, and it opens with a "## Contents" list at lines 24-35. `skill-rules.md` and `lint.md` are both under the threshold. |
| Loading — material used to test the skill is not reachable from it (Important) | Pass | — | Step 6 line 57 names `tests/baselines/<skill-name>.md` as a write destination with a placeholder. In ordinary use `<skill-name>` is the skill being authored, not `writing-skills`, so this skill's own test record does not become reachable from it. |
| Loading — no reference file tells the reader to ignore or skip part of itself (Important) | Pass | — | Checked all three. `steering-rules.md` lines 20-22 move the hand-off rules into a separate file rather than asking the reader to skip a section, which satisfies the rule rather than breaking it. `skill-rules.md` lines 3-4 and 84-87 state conditions on when rules apply, which is not a skip instruction. |
| **Evidence** — baseline comparison, recorded in the plugin's `tests/baselines/`, one file per skill, linked from nothing (Blocking) | **Fail** | **Difference** | The comparison half passes: `plugins/steering/tests/baselines/writing-skills.md` records a with-and-without run (sections "Without the skill", "With the skill", "What the comparison settled") and lists the observed failures the skill addresses at lines 12-20. The "linked from nothing" half does not hold: `plugins/steering/README.md:220` and `plugins/steering/SUMMARY.md:192` both link `[tests/baselines/](tests/baselines/)`, emitted by `eng/generate-readmes.mjs:347`. Nothing an agent does goes wrong because of it, since neither generated file loads with the skill. Read as a signal about the rule's wording, not about the target. |
| **Outcome** — the finished outcome is stated, not just a topic (Blocking) | Pass | — | Lines 8-9: "This skill produces a SKILL.md, any reference files it needs, and evidence that it changes behaviour." |
| Outcome — the outcome statement sits at the top, before context and method (Advisory) | Pass | — | Lines 8-9 are the first prose in the file. |
| **Context** — nothing refers to something the agent cannot resolve (Blocking) | Pass | — | Every referent resolves: three shared files by path, two sibling skills by name, and `tests/baselines/`. Confirmed by the lint's reference resolution and by opening each. |
| Context — every fact the agent needs is written out or pointed at by a path it can read (Blocking) | **Warn** | **Defect** | Step 6 line 57 sends the baseline record to "the plugin's `tests/baselines/<skill-name>.md`". Which plugin is not written out. `skill-rules.md` line 85 uses the same phrase to mean this plugin ("A skill read from elsewhere has no `tests/baselines/` here"), while step 6 reads naturally as the plugin owning the skill being written. When an agent authors a skill for another plugin, the two readings send the record to different directories, and the Evidence rule then looks in the one the record is not in. Marked warn because the text supports both readings and I cannot tell which was meant. |
| Context — approaches already tried and found not to work are stated (Important) | Pass | — | Step 1 line 41 ("A skill that covers the task would stand in for the model and spoil the measurement"), step 7 lines 61-63 (why self-audit fails), and lines 70-72 ("Do not fix it by easing the task or loosening the rules. A pass earned that way measures nothing"). All three trace to recorded runs in `tests/baselines/writing-skills.md` lines 19-20 and 35-41. |
| Context — context sits above the method (Advisory) | Pass | — | "First check a skill is the right artifact" (line 11) and "Where this stops" (line 26) both precede "## Workflow" (line 32). |
| **Scope** — what is in scope is named (Blocking) | Pass | — | Lines 8-9 plus the artifact-choice section at lines 13-24. |
| Scope — what is out of scope is named explicitly (Blocking) | Pass | — | "Where this stops", lines 28-30. Stated as exclusions, not left implied. |
| Scope — a category of work carries a membership test; any list of kinds carries an examples marker (Blocking) | **Fail** | **Defect** | The artifact-choice list at lines 15-18 is correctly closed: lines 20-24 give both an examples marker ("These are the common cases, not the whole list") and a membership test ("The question behind them is what has to hold the guidance"), plus a fallback. Step 3 (lines 47-49) is not. Its four-item list of what the body must contain — produces, workflow, does-not-cover, successor — is closed, carries no marker, and names no rules file. An agent writing to it produces a body with no stop conditions, no failure handling, no partial-work statement, and no "a direct instruction from the person wins" line, since none of those appear on the list. The unaided baseline produced a failure section without the skill (`tests/baselines/writing-skills.md` line 9), so this list can make the output worse than no skill. Same root cause as the Content finding above; one fix closes both. |
| Scope — stop and report on reaching a scope limit, rather than work around it (Blocking) | Pass | — | Lines 22-24: "Where a request fits none of them, say which of the four it is closest to. Say why. Ask before you write anything. Do not force it into the nearest bullet." Also lines 72-74. |
| Scope — the scope statement sits above the method (Advisory) | Pass | — | Lines 11-30 precede the Workflow at line 32. |
| Scope — states the agent must not modify anything, and what to do where a fix looks obvious (Blocking, **advisory**) | **N/A** | — | The **advisory** condition is not met. This skill writes files. |
| **Method** — one default approach rather than a menu (Important) | Pass | — | A single numbered sequence, lines 37-64. The branches present (no subagent available, small change, loop does not settle) each name a default and a fallback rather than offering a choice. |
| Method — order fixed where sequence affects correctness (Blocking) | Pass | — | Lines 34-35: "Run these steps in order. Do step 1 before you write anything else. Step 1 decides what the skill has to say." |
| Method — constrains how the work is done only where needed, each constraint says why (Important) | Pass | — | Every constraint that could be second-guessed carries its reason: line 41, line 46, line 49, line 52, lines 61-63, line 71. |
| Method — any check that must run before work starts is named as the first step (Important) | Pass | — | The artifact check sits ahead of the workflow at lines 11-24, and step 1 is the baseline with "Do step 1 before you write anything else" at line 34. |
| **Finish** — a check the agent can run itself is named, and its result settles whether the work is done (Blocking, **changes something**) | Pass | — | Step 7 line 58 (lint) and step 6 lines 55-57 (baseline comparison). Line 71: "Fix a failing baseline or audit by changing the skill." |
| Finish — the instruction says the agent runs the check itself before reporting (Important) | Pass | — | Steps 6 and 7 are the last steps of the sequence, and line 34 fixes the order, so the checks precede anything reported. |
| Finish — finish criteria specific enough that two runs return the same result (Blocking, **advisory**) | **N/A** | — | The **advisory** condition is not met. |
| Finish — says what evidence each finding must carry (Important, **advisory**) | **N/A** | — | The **advisory** condition is not met. |
| Finish — the finish check sits late in the document (Advisory) | Pass | — | Step 7 is the last workflow step, at lines 58-64. |
| **Failure** — conditions that should stop the work are stated (Blocking) | Pass | — | Lines 67-68 ("Where behaviour is the same with and without the skill, the skill has no effect. Do not keep it"), lines 72-73 ("stop. Report what still fails. Do not run the loop again"), line 23 ("Ask before you write anything"). |
| Failure — a retry limit is named, and something must change before a retry (Important) | Pass | — | Line 72 sets the limit at two more full runs. Lines 69-70 require the skill to change first: "put that failure and the agent's own reasoning into the skill. Then run the loop again." |
| Failure — weakening the check or editing the test to make it pass is forbidden (Blocking, **changes something**) | Pass | — | Lines 70-72: "Do not fix it by easing the task or loosening the rules. A pass earned that way measures nothing." |
| Failure — what to do where the input is missing or cannot be assessed, with a status for each (Blocking, **advisory**) | **N/A** | — | The **advisory** condition is not met. |
| Failure — stop conditions sit directly after the finish check (Advisory) | Pass | — | "The baseline is the gate" (line 66) follows the Workflow section immediately. |
| **Calibration** — examples of what counts (Blocking, **advisory**) | **N/A** | — | The **advisory** condition is not met. |
| Calibration — examples of what does not count (Blocking, **advisory**) | **N/A** | — | The **advisory** condition is not met. |
| Calibration — the default outcome is stated (Blocking, **advisory**) | **N/A** | — | The **advisory** condition is not met. |
| Calibration — where a run showed a miss, describe the shape, not the label (Important, **advisory**) | **N/A** | — | The **advisory** condition is not met. Worth noting that step 4 (lines 50-52) instructs the shape-not-label discipline anyway, for the skills this one writes. |
| **Composition** — every named hole is marked required or carries a default (Important, **reused**) | Pass | — | The one placeholder is `<skill-name>` at line 57, which resolves without ambiguity from the skill being written. The under-specified part of that path is the plugin, counted once above under Context. |
| Composition — the set of fields established for a template is fixed (Advisory, **reused**) | **N/A** | — | The target establishes no template with a field set. The rule has nothing to test here. |
| Composition — what happens to partial work when a run stops is stated (Important, **changes something**) | Pass | — | Lines 73-74: "Keep the draft when you stop. Say in the report that the draft is unverified. Leave the keep-or-discard call to the person." The discard case is stated separately at line 68. |
| **Voice** — a sentence that instructs names its actor, and that actor can choose to act (Important) | Pass | — | The body instructs in the imperative throughout ("Pick a realistic task", "Dispatch a subagent"). The implied actor is the agent running the skill, which can choose. The shared rule files use the same form. |
| Voice — a sentence that states a property keeps the property's owner as its subject (Blocking) | Pass | — | Property statements keep their owners: "The body is an overview" (line 54), "The description loads before the body" (line 49), "A pass earned that way measures nothing" (line 72). None is rewritten as an order. |
| Voice — nothing that cannot choose to act takes an action verb (Important) | Pass | — | Several sentences give a non-actor an action verb: "Step 1 decides what the skill has to say" (line 35), "A summary gives the agent something to follow" (line 47), "A skill that covers the task would stand in for the model and spoil the measurement" (line 41). Each states an effect rather than a chosen act, and no agent does anything differently because of them. Recorded rather than escalated, per the calibration. |

## 3. Counts by severity

Rules evaluated: 57. Pass 52, fail 3, warn 1, not applicable 9. Not applicable is not a pass.

Fails and warns, by the severity the rule files assign:

| Severity | Fail | Warn | Total |
| --- | --- | --- | --- |
| Blocking | 2 | 1 | 3 |
| Important | 1 | 0 | 1 |
| Advisory | 0 | 0 | 0 |

**Defects: 3. Differences: 1.**

- Blocking defects: 2 — Scope membership test (fail) and Context resolvable facts (warn).
- Blocking differences: 1 — Evidence "linked from nothing". A blocking difference does not hold
  the target back. It reads as a signal about the rule's wording.
- Important defects: 1 — Content restatement.

Two of the three defects share one root cause: steps 2 and 3 inline lists that belong to
`skill-rules.md`. They are counted as two rules because the rules are distinct and carry
different severities, but one edit closes both.

## 4. The three fixes to make first

1. **Replace the inline lists in steps 2 and 3 with pointers to `../../shared/skill-rules.md`.**
   This is the only finding with a named wrong outcome at the point where the work is done. Step 3
   is where the body gets written, and it names no rules file; the pointer at line 85 sits after
   the whole workflow, and step 7 reaches the rules only at audit time, after the body exists. An
   agent following step 3 literally ships a body with no stop conditions, no failure handling, no
   partial-work statement, and no "a direct instruction from the person wins" line. The baseline
   record at lines 50-52 says two restating passages were already replaced with pointers in an
   earlier round; these two were not.

2. **Write out which plugin owns `tests/baselines/` in step 6.** Give a path the agent can
   resolve from where it is working, and say what to do when the skill being written does not sit
   in a plugin. As written, the record can land where the Evidence rule does not look, and the
   skill's own gate then reads as unmet.

3. **Reconcile "linked from nothing" in the Evidence rule with the generated docs.** Either drop
   that clause from `skill-rules.md` line 82, or stop `eng/generate-readmes.mjs:347` emitting the
   `tests/baselines/` link into `README.md` and `SUMMARY.md`. As it stands, every skill this
   plugin ships fails the clause on every audit, for a reason that has nothing to do with the
   skill. This fixes the rule, not the target.

## 5. Anything I did that nobody asked for

- I opened `auditing-skills/SKILL.md` and `writing-agents/SKILL.md`, the two sibling skills the
  target names, to confirm the boundary claims hold rather than taking them on trust. Both cover
  the ground the target hands them.
- I ran a repository-wide grep for links to `tests/baselines/` to test the Evidence rule's
  "linked from nothing" clause, which no lint check covers. That grep produced finding 3.
- I noticed, while reading the baseline record for the Evidence rule, that
  `plugins/steering/tests/baselines/writing-skills.md` line 3 points at "the repository's
  TEST_REPORT.md". No `TEST_REPORT.md` exists at the repository root; the file is at
  `plugins/steering/tests/TEST_REPORT.md`. That is a defect in the record, not in the target, so
  it is not scored above.
- I checked whether `plugins/steering/tests/outcomes/external-probe/audits/reports/writing-skills.md`
  was a prior report of this target. It is not. It audits an externally-captured fixture skill
  that happens to share the name. I did not treat it as a prior report and did not read it as
  input to any finding.
- I did not open `shared/handoff-rules.md`. Both rule files state a non-hand-off document never
  reads it, and a SKILL.md is read by an agent that is in the conversation.
- I re-derived one measurement the lint does not cover: reference-file line lengths, for the
  100-line threshold in Loading rule L4. Every mechanical limit the lint does cover was taken
  from the lint.
- I changed no file except this report.
