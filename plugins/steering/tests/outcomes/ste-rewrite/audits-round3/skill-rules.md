# Re-audit: shared/skill-rules.md

**Target:** `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/skill-rules.md` (90 lines, down from 91)
**Rules applied:** `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`
**Prior report:** `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits-round2/skill-rules.md`, which audited this target at d015e2e.
**Repository state:** clean at d72544f. Nothing edited, staged, or committed.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
lint (advisory): plugins/steering/SUMMARY.md: is 193 lines and has no "## Contents" heading; a reference file over 100 lines opens with a contents list
All generated files are up to date.
```

The run exits clean. The one advisory names `plugins/steering/SUMMARY.md`, not the target.

**The lint reached the target, with two checks, one of which did not fire.** `npm run lint -- --explain`
names a top-level `.md` under a plugin's `shared/` as a **reference surface**, and says a reference
surface gets reference resolution plus an advisory contents-list check on any file over 100 lines.

- Reference resolution. The target names `./steering-rules.md` (L3), `./lint.md` (L13), and
  `tests/baselines/` (L86, four files present). All resolve. Passes.
- Contents list. The target is 90 lines, under the 100-line threshold, so the check does not fire.
  It reached the file and had nothing to say. The file lost a line this round when the 500-line
  Loading row's replacement was removed, so it sits ten lines under the threshold.

**Checks that did not reach the target.** Frontmatter hazards, name format and length, description
length, and body line count. `--explain` says those run over components only. A reference surface
carries no frontmatter. Stated exclusion, not a coverage gap. Same result as the prior report.

I re-derived no mechanical limit by hand as a rule verdict. I did read `eng/generate-readmes.mjs` to
establish which files the new contents-list check opens, which `lint.md` L7 permits. That grounds new
finding 2.

### Conditions established for the target

| Condition | Met | Why |
| --- | --- | --- |
| always | yes | By definition. |
| hand-off | no | A standing reference, not a brief passed to an agent that lacks the conversation. L4 says so too. |
| reused | yes | A shared rule file, not a one-off. |
| **describes work** | **no** | Checked rather than accepted, per `steering-rules.md` L52-54. The file supplies criteria; `auditing-skills` and `writing-skills` define the tasks. The three imperative passages, L15, L50-51, and L89-90, are instructions about how to read the criteria, which `steering-rules.md` L60-63 explicitly says do not make a task. L9 asserts the same conclusion; I did not rely on the assertion. |
| advisory | yes, reading used | Not settleable from the rules file. See the limitation below. |
| changes something | no, reading used | Same limitation. |

**One limitation on this audit.** `steering-rules.md` defines "advisory" and "changes something"
against "the work" (its L46-47), while its L66-67 says a document failing **describes work** "defines
no task". For a criteria file there is no work to classify, and this target is read by one skill that
reviews and one that writes. I used the prior report's reading, advisory yes and changes something no,
so the two rounds compare. Under the other reading, `steering-rules.md` L140, L152, and L186 become
applicable and this target fails all three. That is a defect in the rules file, not in this target,
and it is filed in `/tmp/ste-audit-3/steering-rules.md` as new finding 3.

Under **describes work** = no, the nine rules carrying that condition are not applicable:
`steering-rules.md` L131-134, L141, L144, L150, L151, L154.

## 2. Prior findings

The prior report carried nine rows in its section 2, seven of them already retired, and five new
findings in its section 3. All fourteen are below.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| **Context r2.** The 500-line row restated a lint check. | retired, stays retired | The Loading table at L77-80 still carries no body-length row. |
| **Scope r6.** No must-not-modify statement. | retired, stays retired | L8 still names `auditing-skills`, which carries it at its L36-37: "This audit does not edit the target. Where a fix is obvious, name it in the report." |
| **Finish r4.** No statement of what evidence each finding must carry. | retired, stays retired | L10-11 names it as delegated and `auditing-skills` L121-122 supplies it. Its retirement no longer rests on scoping: `steering-rules.md` L143 is conditioned "advisory", not **describes work**, so the column keeps the row live and the delegation is what passes it. |
| **Failure r1.** No stop conditions. | retired, stays retired | Retired twice. L10-11 names the delegation, `auditing-skills` L28-32 carries the conditions, and `steering-rules.md` L150 now carries **describes work**, which this target does not meet. |
| **Failure r3.** Weakening the check is not forbidden. | **changed** | Still absent, still not a fail, but a different mechanism does the work. It was retired by the **catalogue** scoping. **catalogue** is gone, and `steering-rules.md` L152 carries "changes something", not **describes work**, so the new condition does not reach it. It is not applicable because "changes something" is not met under the reading used above. Under the other reading it would read confirmed. `writing-skills` still holds the rule at "Do not fix it by easing the task or loosening the rules." |
| **Calibration r3.** No default outcome stated. | retired, stays retired | `steering-rules.md` L17 states it and the target's L3 makes that file mandatory reading by path. The wording changed this round and the fix survives the change. |
| **Composition r3.** What happens to partial work is not stated. | retired, stays retired | L8 names `writing-skills`, which carries it: "Keep the draft when you stop. Say in the report that the draft is unverified." The row is also not applicable under the reading used, since it is conditioned "changes something". |
| **Near miss (prior fix 3).** The exclusion list carried no examples marker. | retired, stays retired | L66-67 still reads "They are examples, not the whole list", with the membership test in the same breath. |
| **Near miss.** Mild personifications at L25 and L86, and a third at L8. | confirmed | All three unchanged: L8 "The skills... apply these rules", L25 "The description speaks in the third person", L86 "The skill went through a baseline comparison". Still not escalated, for the same reason: no agent does anything wrong. |
| **Prior new 1.** L10 was a closed three-item list of what is delegated, with no marker and no membership test. | **retired** | L9-11 now carries both: a membership test, "every procedural property an audit needs lives in those two skills rather than here", and a marker, "The stop conditions and the evidence each finding carries are two examples, not the whole list." `steering-rules.md` L95 is satisfied. The membership test it chose is not true of this file, which is new finding 1. |
| **Prior new 2.** The 100-line contents-list row was an orphan: the rule sat here and no lint checked it. | **retired** | The row is gone from the Loading table at L77-80, and the lint gained the check at `eng/generate-readmes.mjs` L229-236, called at L449 over the reference surfaces. The orphan is closed for the files the lint opens. It is not closed for the files this file governs, which is new finding 2. |
| **Prior new 3.** The target declared its own **catalogue** condition, and the auditor was told to accept it. | **changed** | The condition name is gone from L8-9, and `steering-rules.md` L52-54 now says the opposite of what the prior report complained about: "Treat the document's own claim about which conditions it meets as a claim to check, not as a fact to accept." The precedent the prior report warned about is closed. What survives: L9 still asserts "defines no task of its own", which is the fact the condition turns on, so the shape of a document settling its own condition is still on the page. I checked the claim rather than accepting it, and it holds. |
| **Prior new 4.** "These do not count" at L64 has a forward referent, three sentences away, sitting directly beneath a list of things that do count. | **confirmed** | Unchanged. L65 still reads "These do not count, because each one changes what an agent does with the next paragraph", and it still sits immediately below the four-item bulleted list at L54-63 of shapes that are findings. The `because` clause still does the disambiguating work, so it stays a warn. |
| **Prior new 5.** The Evidence rule at L86 was narrowed to "no SKILL.md links to it", weaker than the Loading rule at L79. | **retired** | L86 now reads "Nothing an agent loads at run time links to that directory." That is broader than the prior wording and no longer weaker than L79. Clean fix, and it was not on the list of changes I was told about. |

**Prior finding counts.** Retired 10. Confirmed 2. Changed 2.

Only one of the two confirmed rows is a fail; the other is a near miss the prior report chose not to
escalate, and I have not escalated it either.

## 3. New findings

Only findings the prior report does not contain. I worked the full rule set over the target again.
Nine rows are not applicable under **describes work**, three more under "changes something", and
Composition rows 1 and 2 because the target is not a template.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| **1. Context 2.** Every fact the agent needs is either written out or pointed at by a path it can read. | Blocking | fail | difference | **This is a fix that introduced a new problem.** The closed list at old L10 was replaced by a universal at L9-10: "every procedural property an audit needs lives in those two skills rather than here." Three procedural properties live here, in this file, below that sentence. L15 "Confirm the lint record rather than re-deriving those checks by hand." L50-51 "Read each paragraph. Ask what an agent does differently after reading it. If the answer is nothing, it is a finding." L89-90 "If the target is not ours, mark it not applicable. Say its own evidence is not available to check." The last of those also crosses `steering-rules.md` L19, which assigns marking to the skill running the audit. The fix traded a list that was too short for a claim that is not true. Marked a **difference** because the three properties sit in plain sight of the reader who needs them and `auditing-skills` L58-60 carries a compatible general version, so I cannot name what an agent does wrong. Mapping note: no rule in `steering-rules.md` covers a document contradicting itself; this is the nearest fit, and it is the mapping both prior reports used for the same shape. |
| **2. Context 2.** Every fact the agent needs is either written out or pointed at by a path it can read. | Blocking | fail | **defect** | **This is a fix that introduced a new problem.** The contents-list rule left this file because the lint took it over, but the lint took over a different population. This file's Loading section governs a SKILL.md's reference files. `--explain` says the contents-list check runs over reference surfaces, which it defines as a top-level `.md` under a plugin's `shared/` plus a plugin's `SUMMARY.md`, and that "A target that is none of the above was not checked by this command." I confirmed it in the script: `lintContentsList` is called only from the reference-surface loop at `eng/generate-readmes.mjs` L446-450, never from the component path at L220-224. So no check now reaches a skill's own reference files. It is worse for a skill from outside this repository: `lint.md` L15-16 says "Each repository decides which checks its own lint performs", so that repository's lint will not have this check at all, and this file no longer states the rule. What an agent does wrong: auditing a SKILL.md with a 400-line reference file and no contents list, it files nothing, because no rule asks and no lint opens the file. `writing-skills` step 5 tells authors to move detail into reference files, so this is the expected shape of a skill, not a hypothetical one. The lost rule was Advisory, so the cost is small, but the coverage is gone rather than moved. |
| **3. Outcome 1.** The finished outcome is stated, not just a topic or an area of work. | Blocking | fail | difference | L1-3 gives "Skill rules" and "Rules for a SKILL.md", which is a topic. Nothing in L1-17 names something a reader finishes. The rule is conditioned "always" in `steering-rules.md` L76 and is not among the sections L65-67 scopes out, so it fires. Marked a **difference**, not a defect, and deliberately: the target is a criteria file, **describes work** is not met, and `steering-rules.md` L49-50 defines that condition as the document having no finished outcome of its own. A rule cannot fairly demand at Blocking the property another rule defines as absent. `auditing-skills` L134-137 covers exactly this case: "A blocking difference does not hold the target back. Read it instead as a signal about the rule, not the target." The fix belongs in `steering-rules.md`, where it is filed as new finding 2 of the other report. Recorded here because the row fires against this target and the prior report does not contain it. |

### Near misses I did not escalate

- L66 "the three examples below" is a count of items in the same paragraph. It goes stale the moment
  someone adds a fourth. It is the exact shape L59-60 of this file names as a finding, but that rule
  governs a SKILL.md, not this file. The prior report recorded it too and I agree with leaving it.
- L14-15 "Do not restate them here" addresses whoever next edits this file, not the agent that loads
  it. No rule in `steering-rules.md` covers dead content, so there is still nowhere to file it.
- L9 "This file supplies criteria and defines no task of its own" is the same shape the prior report
  escalated, softened. It is now a checkable claim rather than a condition declaration, and
  `steering-rules.md` L52-54 tells the auditor to check it. Recorded in section 2, not here.

## 4. Counts by severity

### New findings

| | Blocking | Important | Advisory | Total |
| --- | --- | --- | --- | --- |
| defect | 1 | 0 | 0 | 1 |
| difference | 2 | 0 | 0 | 2 |
| **Total** | **3** | **0** | **0** | **3** |

All three are fails. No warns. Every one lands at Blocking, which is an artefact of which rules they
map to rather than a judgment that all three matter equally: Outcome 1 and Context 2 are both
Blocking rows and there is no gentler row to map an internal contradiction to.

### Surviving prior findings

| Finding | Severity | Result | Defect or difference |
| --- | --- | --- | --- |
| Prior new 4, "These do not count" forward referent | Blocking | warn | **defect** |

| | Blocking | Important | Advisory | Total |
| --- | --- | --- | --- | --- |
| defect | 1 | 0 | 0 | 1 |
| difference | 0 | 0 | 0 | 0 |
| **Total** | **1** | **0** | **0** | **1** |

Nine of the ten prior fails and warns are retired. The one survivor is a warn, not a fail, and its
severity comes from the Calibration row it maps to.

### Do the two changes work

- **describes work** replaces **catalogue**. Works for this target, and better than **catalogue** did.
  The condition is settleable from the file rather than from the file's claim about itself, the
  outcome test at `steering-rules.md` L56-63 explicitly covers this file's three imperative passages,
  and the auditor is now told to check the claim rather than accept it. The prior report's headline
  complaint, that a document could exempt itself from fourteen rules by asserting one sentence, is
  closed here. Two holes remain and both are in the rules file: the section-versus-row overreach at
  L65-67 and the unscoped Outcome row.
- The advisory lint channel, and the rule leaving this file. Half. The check is the right kind of
  check to move into a script, it now runs, and it caught a real case on the first run
  (`plugins/steering/SUMMARY.md`). But it covers this repository's `shared/` files and `SUMMARY.md`,
  and the rule it replaced covered a SKILL.md's reference files anywhere. See new finding 2.

### The three to fix first

1. New finding 2. Either put the contents-list rule back in the Loading table, or extend the lint's
   reference surfaces to a skill's own reference files and say in this file that a skill outside this
   repository is not covered.
2. New finding 1. Narrow the universal at L9-10 so it does not claim what L15, L50-51, and L89-90
   contradict, or move those three sentences to the skills.
3. Prior new 4, still confirmed. Give "These do not count" at L65 a backward-safe referent, so the
   four shapes at L54-63 cannot read as excused.

## 5. Anything I did that nobody asked for

- I read the diff of this target and of `steering-rules.md` between d015e2e and d72544f, plus the two
  commits in between. Nobody asked. It is what let me retire prior new 5, which nobody listed as a
  change, and confirm that finding 1's universal is new text rather than a survival.
- I read `eng/generate-readmes.mjs` at lines 100-115, 220-245, and 430-470 after running `--explain`,
  to confirm which files the new contents-list check opens before calling it a coverage gap.
  `lint.md` L7 permits reading the script to establish coverage. Confirming, not substituting.
- I checked whether any skill in this repository currently has reference files. None do; every skill
  is a lone SKILL.md. New finding 2 stands on `writing-skills` step 5 telling authors to create them,
  not on files that exist today, and I say so in the finding.
- I read `auditing-skills/SKILL.md` and `writing-skills/SKILL.md` in full, and `handoff-rules.md` and
  `dispatch-protocol.md` in part, to check that the delegation claims at L8-11 still resolve and to
  see the sanctioned form of naming an applier.
- I recorded the audit limitation about "advisory" and "changes something" in section 1 rather than
  quietly picking a reading, and filed the underlying finding against `steering-rules.md` rather than
  against this target, so the two reports do not double count it.
- I recorded three near misses rather than dropping them silently.
- I marked prior Failure r3 "changed" rather than "retired", because the mechanism that keeps it off
  the list moved and a later reader should know which one is doing the work.
- I edited, staged, and committed nothing. The working tree is clean at d72544f. This report and
  `/tmp/ste-audit-3/steering-rules.md` are the only files I wrote.
