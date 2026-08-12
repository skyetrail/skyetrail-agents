**DECISION.** The two conditions are not exclusive. A prompt that reviews a pull request and writes its findings to a file meets both: it writes a file (`changes something`), and it edits none of the code it reads (`advisory`).

**FILE EDITED (only file touched):** `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`

## The edit

Four changes, all in the Conditions block except the last.

1. **`changes something` bullet** (line 50) — now reads "writes a file or any other state that outlives the run … A file the work writes to hold its own findings counts." The old wording "modifies files or state" left a report file arguable.
2. **`advisory` bullet** (line 53) — "examines material, judges it, and edits none of it", replacing "reviews or investigates and changes nothing". The phrase "changes nothing" was the direct cause of the exclusive reading.
3. **New block after the criteria-file gloss** (lines 77–104) — states non-exclusivity, gives one mechanical test per condition, works the pull-request case, and cites the observed cost.
4. **Scope row** (line 135) — reworded so the row is satisfiable by a review prompt that writes a findings file.

## The tests written

`changes something`: list what the work writes — a file, a record, a setting, or anything else still there after the run ends. Empty list, condition false; anything at all in it, condition true. A findings file, a report, and a log go on that list, the same as a source file.

`advisory`: name the material the work examines, then name what the work produces. Judgement about that material and no edit to it, condition true. Edits that material, false. Examines no material and produces something new, false. (That last clause stops a drafting prompt passing vacuously and switching on the Calibration rules.)

Neither test asks the reader to infer intent. One asks what got written; the other asks what happened to the material. Plus, at the point of use: "A row applies where its own condition holds. What the other conditions say does not change that."

## Rows whose applicability changes

Affected class: a document steering work that judges material and writes any file — the security-review prompt from Task B.

**Gained, previously skipped under the exclusive reading — all intended:**

| Section | Rule | Severity |
| --- | --- | --- |
| Failure | Weakening the check or editing the test to make it pass is forbidden. | Blocking |
| Finish | A check the agent can run itself is named, and its result settles whether the work is done. | Blocking |
| Composition | What happens to partial work when a run stops is stated. | Important |

Row 1 is finding 3's target — it is now unskippable for a report-writing reviewer. Rows 2 and 3 come with it and are apt: a reviewer can check its own findings file is complete, and a half-written findings file needs a stated fate.

**Reworded — intended:**

- Scope, Blocking, `advisory`: was "The instruction states that the agent must not modify anything." Now "…must not modify anything. Any file it is told to write its findings to is the one exception." Without this, the settled decision makes the row demand a sentence that contradicts the prompt's own instruction to write findings. Breadth is unchanged: an advisory agent still must not touch anything else.

**Disambiguated in favour of applying, no change of intent:** under the old wording a reader could equally have set `advisory` false for a report-writing review (it "changes" something), dropping the two Finish rows, one Failure row, one Scope row, and all four Calibration rows. Those now definitely apply. This is the same ambiguity read the other way; the run happened to read it the first way.

**No row loses applicability.** For pure-write work `advisory` stays false; for a review that writes nothing `changes something` stays false — which keeps `auditing-skills` (it answers in the conversation, writes no file) classified exactly as before.

## Notes for the caller

- Baseline lint restored: `npm run lint` reports the same advisory line for this file as it did before the edit (3 prose sentences over 25 words, longest 29 — all pre-existing). No new over-length rule cell.
- No other file defines or restates these conditions. I grepped all four SKILL.md files and the other four shared files: `skill-rules.md` references `reused` and `hand-off` only, `writing-agents/SKILL.md` references `hand-off` only. Nothing needs a matching edit.
- Findings 1, 2 and 4 are untouched and still open.