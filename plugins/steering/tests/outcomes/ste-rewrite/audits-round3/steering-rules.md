# Re-audit: steering-rules.md against itself

**Target:** `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md` (241 lines)
**Rules applied:** the same file, read in full at commit d72544f. Auditing it against itself is intended.
**Prior report:** `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits-round2/steering-rules.md`, which audited this target at d015e2e.
**Repository state:** clean at d72544f. Nothing edited, staged, or committed.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
lint (advisory): plugins/steering/SUMMARY.md: is 193 lines and has no "## Contents" heading; a reference file over 100 lines opens with a contents list
All generated files are up to date.
```

The run exits clean. The one advisory names `plugins/steering/SUMMARY.md`, not the target.

**The lint reached the target, with two checks.** `npm run lint -- --explain` names a top-level `.md`
under a plugin's `shared/` as a **reference surface**, and says a reference surface gets reference
resolution plus an advisory contents-list check on any file over 100 lines.

- Reference resolution. The target names one path, `./handoff-rules.md` at L25. It resolves. Passes.
- Contents list. The target is 241 lines, over the threshold, and carries `## Contents` at L29.
  Passes. This check is new since the prior report and it now reaches the target.

**Checks that did not reach the target.** Frontmatter hazards, name format and length, description
length, and body line count. `--explain` says those run over components only, meaning
`skills/*/SKILL.md`, `commands/*.md`, and `agents/*.md`. A reference surface carries no frontmatter.
This is a stated exclusion, not a coverage gap. Same result as the prior report.

`--explain` also says nothing under a plugin's `tests/` is opened. The prior report lives there, so
the lint never checked its line citations. I re-derived them against the current file by hand.

I re-derived no mechanical limit by hand as a rule verdict.

### Conditions established for the target

| Condition | Met | Why |
| --- | --- | --- |
| always | yes | By definition. |
| hand-off | no | A standing reference loaded into whatever session is running. |
| reused | yes | A shared rule file read by three skills. Not a one-off. |
| **describes work** | **no** | The file supplies criteria. The tasks that apply them are defined in `auditing-skills`, `writing-skills`, and `writing-agents`. L18-19 hands marking and counting to "the skill running the audit". L60-63 says a rule catalogue's imperatives belong to a task defined elsewhere, which covers L13, L21-23, and L70. I settled this from the file rather than from any claim in it, per L52-54. |
| advisory | yes, but not settleable from the file | See new finding 3. I used the prior report's reading so the two rounds compare. |
| changes something | no, under the same reading | See new finding 3. Two of the three skills that read this file modify files while doing so. |

Because hand-off is not met, no rule in `handoff-rules.md` applies. I read that file anyway, because
the target references it. `skill-rules.md` does not apply: its L6 limits it to a SKILL.md.

Under **describes work** = no, the nine rules carrying that condition are not applicable: L131-134,
L141, L144, L150, L151, L154.

## 2. Prior findings

The prior report carried thirteen rows in its section 2, six new findings in its section 3, and one
observation outside the target. All twenty are below.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| **Context 1.** Unresolvable references to prior runs and rewrites. | confirmed | Unchanged. L112-115 still reads "One reviewer read the first wording. It had already found a reflected injection." L232 still reads "Five rewrites in this project moved the subject to the wrong actor," with the five listed at L234-238. L177 adds "Reach for this after a run shows a miss." No run and no rewrite is readable from the document. |
| **Context 2 (prior).** Important severity has no stated effect. | retired, stays retired | L14-15 still states it: "An Important failure does not stop use. The author fixes it before the document changes again." |
| **Scope 4.** Stop and report on reaching a scope limit. | confirmed | Still absent. L3-11 name the limits and say nothing about stopping. L96 is conditioned "always", so **describes work** does not scope it out. `auditing-skills` L28-32 carries it, but this file names no applier, so a reader cannot get there from here. |
| **Scope 6.** Must not modify anything, and what to do where a fix looks obvious. | confirmed | Still absent. L98 is conditioned "advisory". `auditing-skills` L36-37 still carries it. Adding it here would still be wrong, because `writing-skills` and `writing-agents` read this file while they modify files. |
| **Finish 2.** The agent runs the check itself before reporting. | **retired, by scoping only** | The text is still absent. L141 now carries the condition **describes work**, which this target does not meet, so the row is not applicable. Stated so a reader can see which mechanism did the work: the target did not change, the condition did. |
| **Finish 3.** Two runs would return the same result. | changed | The prior cause is gone. L17-19 no longer says "Escalate only where you can name what an agent would do wrong", so the difference-suppression the prior report found is retired. A different cause replaces it: L65-67 contradicts the Applies-when column, so two auditors get different rule sets. Counted once, as new finding 1. |
| **Finish 4.** What evidence each finding must carry. | changed | Still absent from the file, still carried by `auditing-skills` L121-122. L143 is conditioned "advisory", not **describes work**, so the column keeps it live. The L65-67 prose says the whole Finish section drops out. The applicability moved from one unsettled call to another. |
| **Failure 1.** Conditions that should stop the work. | **retired, by scoping only** | Still absent. L150 now carries **describes work**, so the row is not applicable. The target did not change. |
| **Failure 2.** A retry limit. | **retired, by scoping only** | Still absent. L151 now carries **describes work**, so the row is not applicable. The target did not change. |
| **Failure 4.** What to do where input is missing, unexpected, or cannot be assessed, with a status for each. | changed | Still absent. L153 is conditioned "advisory", so the column keeps it live while the L65-67 prose drops it. The routing consequence the prior report named is softer now: `auditing-skills` L89-92 carries "Where unsure, mark it warn", so the instruction no longer lives only in `handoff-rules.md` L7-9, which a non-hand-off reader is told not to open. |
| **Calibration 3.** No default outcome stated. | retired, stays retired | L17 still reads "The default outcome for every rule here is pass." |
| **Voice 1.** Whether a bare imperative satisfies the actor rule is undecidable. | retired, stays retired | L194 and L201-204 still settle it: "A bare imperative passes the first rule." |
| **Voice 3.** The file breaks its own rule that nothing which cannot choose takes an action verb. | confirmed | Unchanged instances survive at L10-11 ("These rules judge... They never judge"), L190 ("These rules govern every sentence"), L232 and L240. The replacement text adds more, so the two prior rows merge here. |
| **Prior new 1.** The **catalogue** condition cannot be settled for this file, and the guess moves fourteen rows. | changed | Half retired, half survives in a new form. Retired half: **catalogue** is gone, and L52-54 now forbids accepting a document's claim about its own conditions, so the self-declaration route the prior report named is closed. Surviving half: L65-67 and the Applies-when column disagree about how many rows drop out, so rows still swing on an unsettled reading. Counted once, as new finding 1. |
| **Prior new 2.** A catalogue names the documents that apply it. The target names none. | confirmed | Still true, and now it fails a rule of its own. L86 is a new Context row: "A document that only states criteria names at least one document that applies them. Important, always." The target names `auditing-skills` nowhere, `writing-skills` nowhere, and `writing-agents` nowhere. Its three siblings all do it in the sanctioned form: `handoff-rules.md` L11-12, `skill-rules.md` L8, `dispatch-protocol.md` L7. |
| **Prior new 3.** That requirement sat in prose with no severity, so a finding could not be placed. | **retired** | It is now a table row at L86 with severity Important and condition always. This report placed the finding above without inventing a severity. Clean fix. |
| **Prior new 4.** The escalate sentence suppressed every difference and claimed precedence over the skill. | **retired** | L17-19 now reads "Record a fail only where you can point at the text that breaks the rule. This default holds for any audit... The skill running the audit says how to mark and count what you record." Recording and marking are now separate, and marking is handed to the skill. `auditing-skills` L127-132 keeps the defect and difference marking with nothing to contradict it. Clean fix. |
| **Prior new 5.** **catalogue** appeared in no Applies-when column. | **retired** | **describes work** appears in the column of exactly nine rows: L131-134, L141, L144, L150, L151, L154. Clean fix. |
| **Prior new 6.** New text added fresh Voice 3 breaks. | confirmed | The specific lines are gone with **catalogue**, and the replacement text repeats the shape: L49-50 "a task defined in another document applies", L57 "the document names something", L60 "A rule catalogue often says", L63 "every catalogue here holds imperatives", L66-67 "Those three sections cover" and "a document defines no task", L86 "A document that... names" and "applies them". Merged into the Voice 3 row above. |
| **Observation outside the target.** `skill-rules.md` still claimed the default outcome lives in the two skills. | **retired** | `skill-rules.md` L9-11 no longer names the default outcome. It now reads "every procedural property an audit needs lives in those two skills rather than here. The stop conditions and the evidence each finding carries are two examples". |

**Prior finding counts.** Retired 10. Confirmed 6. Changed 4.

Of the ten retired, five are clean fixes to the file (prior Context 2, Calibration 3, Voice 1, prior
new 3, prior new 4, prior new 5 — six, in fact) and three are retired by scoping alone, meaning the
condition changed and the text did not (Finish 2, Failure 1, Failure 2). The table says which is
which.

## 3. New findings

Only findings the prior report does not contain. I worked the full rule set over the target again.
Nine rows are not applicable under **describes work**. Four Method rows, two Finish rows, three
Failure rows. Composition rows 1 and 2 are not applicable because the target is not a template.
Composition row 3, Finish row 1, and Failure row 3 are not applicable because "changes something" is
not met under the reading used, which is itself finding 3.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| **1. Context 2.** Every fact the agent needs is either written out or pointed at by a path it can read. | Blocking | fail | **defect** | **This is a fix that introduced a new problem.** L65-67 reads "Where **describes work** fails, the Method, Finish, and Failure rules below do not apply... Where a document defines no task, none of the three has anything to test." That is a statement about three whole sections. The Applies-when column says something else: of the fifteen rows in those three sections, only nine carry **describes work**. Finish L140 and Failure L152 carry "changes something". Finish L142, Finish L143, and Failure L153 carry "advisory". An auditor reading the prose drops all fifteen. An auditor reading the column keeps six. What an agent does wrong: on an advisory criteria file, the prose reading silently drops Finish L142 (Blocking, two runs return the same result), Finish L143 (Important, what evidence each finding carries), and Failure L153 (Blocking, what to do where the input is missing or cannot be assessed). Those are three rules the column says apply. Two runs, different rule sets, on the same text. This is the same class of swing the prior round found under **catalogue**, moved from a self-declaration to a prose overreach. The fix is one sentence: say the nine rules marked **describes work** rather than the three sections. |
| **2. Outcome 1.** The finished outcome is stated, not just a topic or an area of work. | Blocking | fail | **defect** | Nothing in L1-19 names something a reader finishes. L3 names what the rules cover, which is an area of work, and the rule says an area of work does not satisfy it. L13 "Report counts by severity" is a fragment of an output spec that L19 then hands to the skill. The deeper problem, and the reason this is a defect rather than a difference on a file audited against itself: L49-50 defines **describes work** as the document having "a finished outcome of its own", and L65-67 scopes out Method, Finish, and Failure when it fails. Outcome is not scoped out. L76 stays conditioned "always". So the rule set demands, at Blocking, exactly the property its own condition defines as absent, and every criteria file in `shared/` fails it by construction. What an agent does wrong: it files a Blocking fail against four correct files, or it invents a not-applicable that L65-67 does not sanction, because that line names three sections and Outcome is not one of them. Four prior audits over these two files passed this row without comment, which is evidence the gap is easy to miss rather than evidence it is absent. |
| **3. Context 2.** Every fact the agent needs is either written out or pointed at by a path it can read. | Blocking | fail | **defect** | The conditions "changes something" and "advisory" are defined against "the work": L46 "the work modifies files or state", L47 "the work reviews or investigates and changes nothing". L66-67 says a document that fails **describes work** "defines no task". A document with no task has no work to classify, and the file gives no other test. Eleven rows outside Method, Finish, and Failure turn on those two conditions: Scope L98, Finish L140, L142, L143, Failure L152, L153, all four Calibration rows at L160-163, and Composition L186. What an agent does wrong: an auditor that answers "neither, because the file defines no work" marks all four Calibration rows not applicable, and the default-outcome rule at L162 stops being checked. That is the rule round one found missing and round two retired. An auditor that answers "both, because `auditing-skills` reviews and `writing-skills` writes" marks Finish L140, Failure L152, and Composition L186 applicable, and all three fail against this target. Same file, two honest readings, six rows apart. Related to finding 1 but a different root cause and a different fix: finding 1 needs one sentence reworded, this needs the two condition definitions to say whose work they classify when the document defines none. |

### Near misses I did not escalate

- L13 "Report counts by severity" and L19 "The skill running the audit says how to mark and count
  what you record" both claim authority over counting. `auditing-skills` L122 agrees with L13, so
  nothing goes wrong today. Recorded because L19 is new text and it creates a second owner for a
  rule L13 already owned.
- The `## Contents` list at L31-40 opens with "Conditions", which is bold prose at L42 rather than a
  heading. Presentation only. No agent does anything wrong.

## 4. Counts by severity

### New findings

| | Blocking | Important | Advisory | Total |
| --- | --- | --- | --- | --- |
| defect | 3 | 0 | 0 | 3 |
| difference | 0 | 0 | 0 | 0 |
| **Total** | **3** | **0** | **0** | **3** |

All three are fails. No warns.

### Surviving prior findings

Rows still failing. Finish 3 still fails, but its only surviving cause is new finding 1, so it is
counted there and not here.

| Finding | Severity | Defect or difference |
| --- | --- | --- |
| Context 1, unresolvable references | Blocking | difference |
| Scope 4, no stop-and-report on a scope limit | Blocking | difference |
| Scope 6, no must-not-modify statement | Blocking | difference |
| Context 4 (L86), names no document that applies it | Important | **defect** |
| Finish 4, no evidence requirement | Important | difference |
| Failure 4, no statuses for missing or unassessable input | Blocking | difference |
| Voice 3, action verbs on things that cannot choose | Important | difference |

| | Blocking | Important | Advisory | Total |
| --- | --- | --- | --- | --- |
| defect | 0 | 1 | 0 | 1 |
| difference | 4 | 2 | 0 | 6 |
| **Total** | **4** | **3** | **0** | **7** |

### Do the two changes work

| Change | Works? |
| --- | --- |
| **describes work** replaces **catalogue** | Mostly. The self-exemption route is closed by L52-54, the condition is settleable for all four `shared/` files, it sits in the Applies-when column of nine rules as intended, and the outcome test at L56-63 is the right test. It leaves two holes. L65-67 still speaks in whole sections and so contradicts the column (new finding 1). Outcome 1 was not scoped out, and it asks for the property the condition defines as absent (new finding 2). Neither hole is in the condition itself. Both are in the prose around it. |
| The advisory lint channel, and the rule leaving `skill-rules.md` | For this target, yes. The contents-list check now reaches it, it passes, and the check is the kind a script decides. The problem this created lives in `skill-rules.md`, and it is reported there, not here. |

### The three to fix first

1. New finding 1. Reword L65 to name the nine rules marked **describes work**, not the three sections.
2. New finding 2. Decide whether Outcome 1 is scoped out by **describes work** and say so in the
   Applies-when column, or reword the rule so a criteria file can satisfy it.
3. Prior new 2, still confirmed. Name `auditing-skills`, `writing-skills`, and `writing-agents` as
   the documents that apply this file, in the form the three siblings already use. This is now a
   self-fail against the file's own new L86, and it also closes the reader's route to the stop
   conditions and the evidence requirement (surviving Scope 4, Finish 4, Failure 4).

## 5. Anything I did that nobody asked for

- I read the diff of both targets between d015e2e and d72544f, and the two commits in between. Nobody
  asked for the diff. I used it only to tell the deliberate changes from anything else, and to check
  that finding 1's prose is new text rather than a survival.
- I read `eng/generate-readmes.mjs` at lines 100-115, 220-245, and 430-470, after running
  `--explain`, to confirm which files the new contents-list check opens. `lint.md` L7 permits reading
  the script to establish coverage. This grounds a finding in the other report, not this one.
- I read four files beyond the target and its one reference: `skill-rules.md`, `dispatch-protocol.md`,
  `auditing-skills/SKILL.md`, and `writing-skills/SKILL.md`. Findings 1, 2, and 3 and several
  retirements rest on what those files carry.
- I recorded the conditions determination as its own block in section 1, as both prior reports did.
  The format did not ask for it. This time **describes work** is settleable and the unsettled row is
  "advisory", which is new finding 3.
- I recorded two near misses rather than dropping them silently.
- I marked three prior findings "retired, by scoping only" rather than plain retired, because the
  target's text did not change and a later reader should know that.
- I edited, staged, and committed nothing. The working tree is clean at d72544f. This report and
  `/tmp/ste-audit-3/skill-rules.md` are the only files I wrote.
