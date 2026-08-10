# Audit: shared/skill-rules.md

**Target:** `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/skill-rules.md` (87 lines)
**Rules applied:** `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`
**Repository state:** clean at 7deb2ae. Nothing was edited, staged, or committed.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`, exits clean:

```
> node eng/generate-readmes.mjs --check
All generated files are up to date.
```

`npm run lint -- --explain` reports coverage from the same data the lint run uses. The target is a
top-level `.md` under a plugin's `shared/`, which `--explain` names as a **reference surface**.

**The lint reached the target, with one check.** Reference surfaces get reference resolution only.
That check passed: every path the target names resolves (`./steering-rules.md`, `./lint.md`, and
the plugin's `tests/baselines/` directory all exist).

**Checks that did not reach the target.** Frontmatter hazards, name format and length, description
length (limit 1024), and body line count (limit 500) apply to components only
(`skills/*/SKILL.md`, `commands/*.md`, `agents/*.md`). The target carries no frontmatter, so
`--explain` states these do not apply to it. That is correct here: the target is a rule file, not a
component, so none of those limits is a property it should have.

**No mechanical limit was re-derived by hand.** The one place this report cites the 500-line limit,
it cites it as a lint check, established from `--explain` and confirmed against
`eng/generate-readmes.mjs:105` (`const MAX_BODY_LINES = 500`). It is not a hand count of anything.

### Conditions applied

The brief says to apply the conditions that match the target's own use. The target is loaded by two
skills, by path:

- `plugins/steering/skills/auditing-skills/SKILL.md:13` — audit work. That skill's line 9 says "This
  audit changes nothing."
- `plugins/steering/skills/writing-skills/SKILL.md:53, 63, 85` — authoring work, which writes a
  SKILL.md and its reference files.

| Condition | Met | Why |
| --- | --- | --- |
| always | Yes | — |
| reused | Yes | A shared rule file loaded on every skill audit and every skill write, not a one-off. |
| advisory | Yes | Via `auditing-skills`, which changes nothing. |
| changes something | Yes | Via `writing-skills`, which produces and edits files. |
| hand-off | **No** | See below. `handoff-rules.md` was read to settle this and none of its rules was applied. |

Hand-off is not met. The target's own lines 3 to 4 classify a SKILL.md as "reused met, hand-off not
met", and the target is the same class of artifact: a durable reference file a skill loads, not a
brief dispatched to a fresh agent. `auditing-skills:14` routes the hand-off rules only to "a prompt
written for a subagent". The target is not a prompt.

Both `advisory` and `changes something` are met because the file serves two consumers. A narrower
reading that applied only `advisory` would drop Finish row 1, Failure row 3, and Composition row 3
from the table below. A narrower reading that applied only `changes something` would drop six rows.
Applying both is the conservative choice and is stated here so a second run can reproduce it.

### One standing judgment, stated once

Several rules ask for something the target does not say, where the text that says it lives in one
of the two callers. The callers name the target by path; the target never names the callers. So a
delegation runs in only one direction:

- Delegation to a file the target itself names (`./steering-rules.md`, `./lint.md`) is airtight.
  Context row 2 explicitly blesses "pointed at by a path it can read". These are marked **pass**.
- Delegation to a caller the target does not name is not satisfied by the target's own text. These
  are marked **fail**, and classified **difference**, because in the real path the caller is always
  in context and no agent misbehaves.

## 2. Findings

Severity and condition are from `steering-rules.md`. Result is pass, fail, warn, or n/a. Not
applicable is not a pass.

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| **Outcome.** The finished outcome is stated, not just a topic or an area of work. (Blocking, always) | Pass | — | L1 to L6 name what the file is and what it governs. The report scheme and what a blocking failure means come from `steering-rules.md:13-14`, which L3-4 makes mandatory reading. |
| **Outcome.** The outcome statement sits at the top, before context and method. (Advisory, always) | Pass | — | L3 is the first body line. |
| **Context.** Nothing refers to something the agent cannot resolve. (Blocking, always) | Pass | — | Three references, all resolving: `./steering-rules.md` (L3), `./lint.md` (L8-9), `tests/baselines/` (L82). The lint's reference resolution check confirms this. |
| **Context.** Every fact the agent needs is either written out or pointed at by a path it can read. (Blocking, always) | **Fail** | **Defect** | L8-11 says mechanical limits are the lint script's job and "Do not restate them here." L71 then restates one: "The SKILL.md body is 500 lines or fewer", Blocking. `--explain` confirms the lint already checks body line count at limit 500 (`eng/generate-readmes.mjs:105`). An agent cannot resolve from the document alone whether to confirm the lint record or judge this itself. It has already gone wrong: `plugins/steering/tests/outcomes/external-probe/audits/reports/subagent-driven-development.md:15` records an auditor marking the row "Pass, 498 lines (hand-derived)", which is the exact action L8-11 and `lint.md:29-30` forbid. `DECISIONS.md:85` records the intent that "mechanical limits belong to the lint script", so L71 is a leftover. Mapping note: `steering-rules.md` has no dedicated internal-consistency rule, so this is filed on the nearest fit. |
| **Context.** Approaches already tried and found not to work are stated. (Important, always) | Pass | — | L10-11 states the failed approach the file's own design turns on: a second copy of a list drifts, and an agent then loads two files that say different things. |
| **Context.** Context sits above the method, so it is read before a plan is formed. (Advisory, always) | Pass | — | L3-11 sits above every rule table. |
| **Scope.** What is in scope is named. (Blocking, always) | Pass | — | L3 "Rules for a SKILL.md." L6 "Every entry here applies when the audited thing is a SKILL.md." |
| **Scope.** What is out of scope is named explicitly, rather than left implied. (Blocking, always) | Pass | — | L6 "and not otherwise" is an explicit exclusion, not an implication. L8 excludes mechanical limits from judgment work. L84-86 excludes a skill this plugin does not maintain from the Evidence rule. |
| **Scope.** Where a category of work is named, a membership test defines it. Any list of kinds carries a marker saying they are examples. (Blocking, always) | Pass | — | L46-47 gives both: the test ("Ask what an agent does differently after reading it") and the marker ("These shapes are the ones seen so far, not the whole list"). Near miss, not escalated: the exclusion list at L60-62 carries no examples marker. It is governed by the test restated at L62 ("Each of those changes what an agent does with the next paragraph"), which is the stronger form named at `steering-rules.md:99-100`, so an agent meeting a fourth case can still decide it. See fix 3. |
| **Scope.** The instruction says to stop and report on reaching a scope limit, rather than work around it. (Blocking, always) | Pass | — | L84-86 is the case in point: where the evidence cannot be checked, "mark it not applicable. Say its own evidence is not available to check." Report rather than work around, with a named status. |
| **Scope.** The scope statement sits above the method. (Advisory, always) | Pass | — | L3-6 precedes every table. |
| **Scope.** The instruction states that the agent must not modify anything. It also says what to do where a fix looks obvious. (Blocking, **advisory**) | **Fail** | **Difference** | Absent from the target. `auditing-skills:29-30` carries it in full. Putting it in the target would contradict `writing-skills`, its other consumer, whose whole job is to modify. Nothing an agent does wrong. |
| **Method.** One default approach is given rather than a menu of options. (Important, always) | Pass | — | One rule set, no alternatives. L84-86 gives one handling for the off-plugin case. |
| **Method.** The order is fixed where sequence affects correctness, and left open where it does not. (Blocking, always) | Pass | — | The one sequence that affects correctness is lint before judgment, fixed by L8-11's position and wording. Reading order between the target and `steering-rules.md` does not affect correctness and is left open at L3-4. |
| **Method.** Constraints only where correctness or safety needs a specific way. Each says why. (Important, always) | Pass | — | L9-11 constrains and gives the reason. L64-65 constrains and gives the reason ("a file loaded on every run"). L23-24 gives the reason for the insistent-description guidance. |
| **Method.** Any check that must run before work starts is named as the first step. (Important, always) | Pass | — | L8-9 names the lint in the third paragraph, ahead of every rule table, framed as a precondition. |
| **Finish.** A check the agent can run itself is named, and its result settles whether the work is done. (Blocking, **changes something**) | Pass | — | L82, the Evidence rule: a baseline comparison with and without the skill loaded, recorded one file per skill in `tests/baselines/`. Blocking, runnable, and its result settles the question. |
| **Finish.** The instruction says the agent runs the check itself before reporting. (Important, always) | Pass | — | L9 says confirm the lint record, and names `./lint.md` in the same breath, whose L13-24 tells the agent to run the command. Delegation to a file the target names. |
| **Finish.** The finish criteria are specific enough that two runs would return the same result. (Blocking, **advisory**) | Pass | — | Each entry carries a severity and a fixed wording. The hardest section to reproduce, Content, is backed by a test at L46-47, four concrete shapes at L49-58, and three exclusions at L60-62. |
| **Finish.** The instruction says what evidence each finding must carry. (Important, **advisory**) | **Fail** | **Difference** | Absent from the target. `auditing-skills:115` supplies it ("Evidence is the line or section it came from"), and the target does not name that file. |
| **Finish.** The finish check sits late in the document. (Advisory, always) | Pass | — | Evidence, the file's strongest gate, is the last section at L78-86. The lint pointer sits at the top, which is correct because it is a pre-work check. |
| **Failure.** Conditions that should stop the work are stated. (Blocking, always) | **Fail** | **Difference** | Absent from the target. `auditing-skills:21-25` carries them and says deliberately that they "sit here, ahead of the workflow, not beside the report". `writing-skills:72-73` carries the authoring-side stop. Nothing an agent does wrong. |
| **Failure.** A retry limit is named, and something must change before a retry. (Important, always) | Pass | — | The only retryable step the target references is the lint, whose retry rule sits at `lint.md:50-53` ("Run the command one more time, but only after something changes"). Delegation to a file the target names. |
| **Failure.** Weakening the check or editing the test to make it pass is forbidden. (Blocking, **changes something**) | **Fail** | **Difference** | Absent from the target. `writing-skills:70-72` carries it ("Do not fix it by easing the task or loosening the rules. A pass earned that way measures nothing"). |
| **Failure.** What to do where the input is missing, is not what it expected, or cannot be assessed, with a status for each. (Blocking, **advisory**) | Pass | — | L84-86 handles the cannot-be-assessed case with an explicit status: mark it not applicable, and say the evidence is not available to check. L6 handles the not-what-it-expected case. |
| **Failure.** The stop conditions sit directly after the finish check. (Advisory, always) | **n/a** | — | No stop-conditions section exists. Per `steering-rules.md:16-18`, the missing section is the finding, recorded on the Failure row above, and this positional rule is then not applicable. |
| **Calibration.** Examples of what counts are given. (Blocking, **advisory**) | Pass | — | L49-58, four shapes, each described concretely. |
| **Calibration.** Examples of what does not count are given. (Blocking, **advisory**) | Pass | — | L60-62, three exclusions with the reason each is excluded. |
| **Calibration.** The default outcome is stated, so the agent must justify escalating rather than justify approving. (Blocking, **advisory**) | **Fail** | **Difference** | Absent from the target. `auditing-skills:82` supplies it ("The default outcome is pass"), and the target does not name that file. Worth watching: L47 reads "If the answer is nothing, it is a finding", which is a criterion rather than a default, but it leans the other way and is the only default-shaped sentence in the file. |
| **Calibration.** Where a run showed a miss, the instruction describes the shape that miss takes, not the label. (Important, **advisory**) | Pass | — | L49-58 is shape throughout, for example "A count of anything, especially of things in another file" and "A paragraph about how this document changed: which wording replaced which". `DECISIONS.md:330` confirms these came from an observed miss in this very file. |
| **Composition.** Every named hole in a template is marked required, or carries a default. (Important, **reused**) | **n/a** | — | The target is a rule catalogue, not a template. It contains no named blank a caller fills. |
| **Composition.** The set of fields established for a template is fixed. (Advisory, **reused**) | **n/a** | — | Same reason. No template fields. |
| **Composition.** What happens to partial work when a run stops is stated. (Important, **changes something**) | **Fail** | **Difference** | Absent from the target. `writing-skills:73-74` carries it ("Keep the draft when you stop. Say in the report that the draft is unverified"). |
| **Voice.** A sentence that instructs names its actor, and that actor can choose to act. (Important, always) | Pass | — | The instructing sentences are imperatives addressed to the reader, who can choose: L9, L10, L46, L86. `steering-rules.md:186-187` shows the fault is turning a property into an order, which does not happen here. |
| **Voice.** A sentence that states a property keeps the property's owner as its subject, and gains no actor. (Blocking, always) | Pass | — | Every rule row keeps the owner as subject: "The description states the capability" (L17), "Content that would not change what an agent does is absent" (L40), "Detail sits in reference files" (L73). None gains an actor. |
| **Voice.** Nothing that cannot choose to act takes an action verb. (Important, always) | Pass | — | L10-11 reproduces the corrected form from `steering-rules.md:193-195` exactly, and L57-58 repeats it. Not escalated: "The description speaks in the third person" (L21) and "The skill went through a baseline comparison" (L82) are mild personifications, in the same register `steering-rules.md` uses of itself, and no agent does anything wrong. |

## 3. Counts by severity

Fails and warns only. Passes and not-applicables do not carry severity.

| Severity | Fails | Warns | Defects | Differences |
| --- | --- | --- | --- | --- |
| Blocking | 5 | 0 | 1 | 4 |
| Important | 2 | 0 | 0 | 2 |
| Advisory | 0 | 0 | 0 | 0 |
| **Total** | **7** | **0** | **1** | **6** |

Result spread over all 36 rules: 26 pass, 7 fail, 0 warn, 3 not applicable.

**Root cause count.** `auditing-skills:88` counts one finding per root cause. On that basis there
are two findings, not seven. One is the defect. The other six rows share a single cause: the target
is a rule catalogue, and every procedural guarantee sits in one of its two callers, which it never
names. The per-rule rows are kept above so a second run can be compared line by line.

**What blocks.** Per `auditing-skills:128-133`, only a defect blocks. The one blocking defect means
the target needs work before use. The four blocking differences do not hold it back. Read them as a
signal about the rules: `steering-rules.md` fires at blocking severity on a catalogue file for
procedural properties that a catalogue is not the right place to hold.

## 4. The three fixes to make first

1. **Remove the 500-line row at L71, or rewrite it to cite the lint.** This is the only defect, it
   is blocking, and the wrong action it causes is already on record. Either delete the row so
   `--explain` remains the single source, or replace it with a line that says the lint settles body
   length and the report confirms the lint record. Check L72 at the same time: "Every reference is
   one hop from the SKILL.md that names it" sits next to the lint's reference resolution check, and
   although hop depth and resolution are genuinely different, the neighbouring row invites the same
   hand-derivation.

2. **Close the gap between the catalogue and its callers, in one line.** Six rows fail for this one
   reason. Add a sentence near L6 naming `auditing-skills` and `writing-skills` as the files that
   hold the stop conditions, the no-modify rule, the default outcome, the evidence requirement, the
   no-weakening rule, and the partial-work rule. `auditing-skills:79-80` already establishes that a
   skill name is a working reference, so naming them costs nothing and resolves. That one line turns
   five blocking differences and one important difference into passes without moving any text.

3. **Mark the exclusion list at L60-62 as examples.** This one did not escalate, and it is the
   cheapest fix on the page. The list of three things that do not count reads closed. Adding
   "these are examples, not the whole list" costs six words. `steering-rules.md:88-90` records a
   real miss caused by exactly this shape, where a reviewer filed a genuine finding out of scope
   because a closed list did not name its case.

## 5. Anything I did that nobody asked for

- **Read four files the target does not reference**, to establish the target's own use, which the
  brief required me to determine: `auditing-skills/SKILL.md`, `writing-skills/SKILL.md`,
  `shared/dispatch-protocol.md`, and `shared/handoff-rules.md`. Finding the two callers changed the
  audit: it is why both `advisory` and `changes something` are applied. `handoff-rules.md` was read
  only to settle whether the hand-off condition holds. It does not, and none of its rules was
  applied.
- **Read the lint script** at `eng/generate-readmes.mjs` after running `--explain`. `lint.md:44-45`
  says to prefer the command's own answer, which I did first. The script was opened only to confirm
  that `MAX_BODY_LINES = 500` is a real check before I called L71 a restatement. Confirming, not
  substituting.
- **Searched `DECISIONS.md` and `tests/TEST_REPORT.md`** for the history of the mechanical limits.
  This produced the observed instance of the wrong action cited in the defect row. Without it the
  defect would have rested on reasoning alone.
- **Created `/tmp/ste-audit/`** to hold this report. No repository file was read-modified, staged,
  or committed. The working tree is still clean at 7deb2ae.
- **Recorded two near misses I chose not to escalate** rather than dropping them silently: the
  unmarked exclusion list at L60-62, and the two mild personifications at L21 and L82. Both are
  named in the evidence column and the first is fix 3.
