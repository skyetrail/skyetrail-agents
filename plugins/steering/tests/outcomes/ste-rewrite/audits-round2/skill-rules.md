# Re-audit: shared/skill-rules.md

**Target:** `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/skill-rules.md` (91 lines)
**Rules applied:** `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/steering-rules.md`
**Prior report:** `/Users/pete/workspace/skyetrail-agents/plugins/steering/tests/outcomes/ste-rewrite/audits/skill-rules.md`, which audited this target at 7deb2ae
**Repository state:** clean at d015e2e. Nothing was edited, staged, or committed.

## 1. Lint result, and whether the lint reached the target

`npm run lint`, run from `/Users/pete/workspace/skyetrail-agents`, exits clean:

```
> node eng/generate-readmes.mjs --check
All generated files are up to date.
```

`npm run lint -- --explain` reports coverage from the same data the lint run uses. The target is a
top-level `.md` under a plugin's `shared/`, which `--explain` names as a **reference surface**.

**The lint reached the target, with one check.** Reference surfaces get reference resolution only.
That check passed. Every path the target names resolves: `./steering-rules.md` (L3), `./lint.md`
(L13), and `tests/baselines/` (L86, four files present).

**Checks that did not reach the target.** Frontmatter hazards, name format and length, description
length (limit 1024), and body line count (limit 500) apply to components only
(`skills/*/SKILL.md`, `commands/*.md`, `agents/*.md`). The target carries no frontmatter, so
`--explain` states these do not apply to it. That is correct: the target is a rule file, not a
component.

**New since the prior report, and outside the lint's reach.** L8 now names two skills by bare name,
`writing-skills` and `auditing-skills`. Reference resolution reads paths, not skill names, so the
lint does not cover them. I confirmed by hand that both directories exist. `auditing-skills:79-80`
establishes that a skill name is a working reference in this plugin, so both resolve for an agent.

**No mechanical limit was re-derived by hand as a rule verdict.** I opened
`eng/generate-readmes.mjs` once, to establish what the script covers, which `lint.md:7` explicitly
permits. The only constant there is `MAX_BODY_LINES = 500` at line 105, applied to components at
lines 212-213. There is no 100-line check and no contents-list check. That fact grounds new finding
2 below; it is a coverage statement, not a hand count of any file.

## 2. Prior findings

The prior report carried seven fails and recorded two near misses it chose not to escalate. All
nine are listed. Severity and classification in brackets are the prior report's own.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| **Context r2.** The 500-line row restated a lint check the file's own L12-15 forbids restating. [Blocking, defect] | **Retired** | The row is gone. `git diff 7deb2ae d015e2e` shows `-\| The SKILL.md body is 500 lines or fewer. \| Blocking \|`. The Loading table at L76-80 now carries no body-length row. This was the prior report's only defect. |
| **Scope r6.** The instruction states the agent must not modify anything, and what to do where a fix looks obvious. Absent. [Blocking, difference] | **Retired** | L8 now names `auditing-skills`, which carries it in full at its L29-30 ("This audit does not edit the target. Where a fix is obvious, name it in the report. Do not make the fix."). `steering-rules.md:57-58` makes naming the applying document the sanctioned form. Scope is not scoped out by catalogue, so this row is still live, and it now passes. |
| **Finish r4.** The instruction says what evidence each finding must carry. Absent. [Important, difference] | **Retired** | Retired twice over. L10 names the evidence requirement as living in the two skills, and `auditing-skills:114-115` supplies it ("Evidence is the line or section it came from"). Separately, the Finish section is now scoped out by the catalogue condition. |
| **Failure r1.** Conditions that should stop the work are stated. Absent. [Blocking, difference] | **Retired** | Retired twice over. L10 names the stop conditions as living in the two skills, and `auditing-skills:21-25` carries them. Separately, Failure is scoped out by catalogue. |
| **Failure r3.** Weakening the check or editing the test to make it pass is forbidden. Absent. [Blocking, difference] | **Retired, by scoping only** | The text is still absent, and L10's list of three does not name it. It is retired solely because `steering-rules.md:52-53` scopes the Failure section out of a catalogue. Were the catalogue claim at L8-9 not accepted, this row would read **confirmed**. Stated so a reader can see which mechanism did the work. `writing-skills:74-75` still holds the rule. |
| **Calibration r3.** The default outcome is stated. Absent. [Blocking, difference] | **Retired** | `steering-rules.md:17-19` now states it for every rule and for any audit that reads the file, and L3-4 of the target makes that file mandatory reading by path. L10 also names it as living in the two skills. Calibration is not scoped out by catalogue, so this row was tested live and passes. The cleanest of the four fixes. |
| **Composition r3.** What happens to partial work when a run stops is stated. Absent. [Important, difference] | **Retired** | L8 names `writing-skills`, which carries it at its L77 ("Keep the draft when you stop. Say in the report that the draft is unverified"). Composition is not scoped out by catalogue, so this row was tested live. It passes on the naming line at L8, not on L10, which does not list it. See new finding 1. |
| **Near miss (prior fix 3).** The exclusion list at old L60-62 carried no examples marker. | **Retired** | L64-66 now reads "They are examples, not the whole list", and states the membership test in the same breath ("each one changes what an agent does with the next paragraph"). `steering-rules.md:85` is satisfied. The rewrite that added the marker introduced a separate problem; see new finding 4. |
| **Near miss.** Mild personifications at L21 and L82 (now L21 and L86), not escalated. | **Confirmed** | Both sentences are unchanged: "The description speaks in the third person" (L25 in the current file) and "The skill went through a baseline comparison" (L86). A third of the same shape was added at L8. Still not escalated, for the same reason the prior report gave: no agent does anything wrong. |

**Surviving prior findings: none.** Seven of seven retired. One of those, Failure r3, is retired by
a rule change rather than by a change to the target, and the table says so.

## 3. New findings

Rules the prior report does not contain. I worked the full rule set over the target again; only
these five moved off pass. Method, Finish, and Failure were marked not applicable under the
catalogue condition the target declares at L8-9, which is itself finding 3.

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| **Scope.** Where a category of work is named, a membership test defines it. Any list of kinds carries a marker saying they are examples, not the whole set. (Blocking, always) | **Fail** | **Defect** | L10 is a new closed list: "The stop conditions, the default outcome, and the evidence each finding carries all live in those two skills." Three items, no marker, no membership test. At least four more procedural properties also live in those two skills and are not named: the no-modify rule (`auditing-skills:29-30`), the no-weakening rule (`writing-skills:74-75`), the partial-work rule (`writing-skills:77`), and the retry rule (`lint.md:54-57`). Named wrong action: an agent looking for the no-weakening rule reads L10 as the complete account of what is delegated, finds it absent from both the target and the list, and files it as missing. `steering-rules.md:103-105` records that exact miss happening from that exact shape. Sharper still: this sentence is the fix that retired four prior findings, and its closing form partly undoes the fix for the three properties it leaves out. |
| **Context.** Every fact the agent needs is either written out or pointed at by a path it can read. (Blocking, always) | **Fail** | **Defect** | L12-13 states the rule without qualification: "Mechanical limits are the lint script's job, not judgment work." L78 is a counterexample sitting 65 lines below it: "A reference file longer than 100 lines opens with a contents list." The lint does not check it. `--explain` gives reference surfaces reference resolution only, and `eng/generate-readmes.mjs` holds no 100-line constant. So an agent must hand-count lines to judge the row, which L14 and `lint.md:33` tell it not to do. Named wrong action, observed nine times in this repository's own audit records: `.../external-probe/audits/reports/writing-skills.md:47` ("1150 lines", "384", "189", "187"), `.../brainstorming-B.md:48` ("298 lines"), `.../subagent-driven-development.md:44` ("142 lines", "185 lines", "106 lines"), `.../ste-rewrite/audits/writing-agents.md:107` ("201 lines", "114 lines", "73 lines"). **This is a fix that left the harder half.** Removing the 500-line row cleared the instance the lint did cover and left the one it does not, so L12-13 now has exactly one counterexample in its own file and no way for a reader to tell whether L78 is an exception or the next leftover. Mapping note: `steering-rules.md` has no internal-consistency rule; this is the nearest fit, and it is the same mapping the prior report used for the 500-line row. |
| **Scope.** What is in scope is named. (Blocking, always) | **Fail** | **Difference** | L8-9 has the target declare its own audit condition: "This file states no workflow of its own, so it meets the **catalogue** condition in `./steering-rules.md`." Two problems. First, the inference swaps tests. The condition at `steering-rules.md:49-50` reads "describes no work of its own", which is broader than "states no workflow", and the file does describe work: "Confirm the lint record rather than re-deriving those checks by hand" (L14), "Read each paragraph. Ask what an agent does differently after reading it" (L49-50), and "mark it not applicable. Say its own evidence is not available to check" (L90). Second, the auditor is told to accept it: `auditing-skills:35-36` says "This audit does not re-run checks that the target's own author already ran and recorded." So the declaration decides 14 of 36 rules, and those three procedural sentences never get audited. Marked a **difference** because in this file nothing follows from it. The prior report already passed all four Method rules, and the two Failure rows now scoped out were themselves differences. The cost is precedent: any document can scope three sections out of its own audit by asserting a condition about itself. Mapping note: no rule in `steering-rules.md` covers a document setting its own conditions, so this is filed on the nearest fit and named as such. |
| **Calibration.** Examples of what does not count are given. (Blocking, advisory) | **Warn** | **Defect** | The examples are given, so the rule is met on its face. What is not settled is which list they attach to. L64 opens "These do not count" directly beneath a four-item bulleted list of shapes that **are** findings. The referent is forward, not backward, and lands three sentences later. Misbinding it inverts the whole Content section: the four shapes the file exists to catch, including the count and the restatement at L59-62, would read as explicitly excused. The `because` clause does disambiguate for a careful reader, which is why this is a warn and not a fail. The old wording had the same forward reference, so this is not new damage, but the rewrite that added the examples marker touched this sentence and did not fix it. Not a style point: the two readings demand opposite behaviour. |
| **Context.** Every fact the agent needs is either written out or pointed at by a path it can read. (Blocking, always) | **Warn** | **Difference** | The Evidence rule at L86 was reworded this commit, from "linked from nothing" to "and no SKILL.md links to it". That is a Voice improvement and it names a real actor, but it narrows the guarantee. A reference file, a README, or a command could link to `tests/baselines/` and still satisfy L86, while the Loading rule at L79 ("Material used to test the skill is not reachable from it. So it never loads with it.") would be broken. L79 catches the case, so there is no gap in the rule set and nothing an agent does wrong; the two rows simply no longer say the same thing about the same directory. Recorded because the brief asks for new problems introduced by the fixes, and this change was not on the list of four. |

## 4. Counts by severity

### New findings

| Severity | Fails | Warns | Defects | Differences |
| --- | --- | --- | --- | --- |
| Blocking | 3 | 2 | 3 | 2 |
| Important | 0 | 0 | 0 | 0 |
| Advisory | 0 | 0 | 0 | 0 |
| **Total** | **3** | **2** | **3** | **2** |

Result spread over all 36 rules: 17 pass, 3 fail, 2 warn, 14 not applicable. The 14 are the Method
(4), Finish (5), and Failure (5) rows scoped out by the catalogue condition, plus Composition rows
1 and 2, which were already not applicable because the target is not a template. Two of those
overlap, so the honest count is 14 distinct rows marked not applicable across the three scoped-out
sections and the two template rows.

**Root cause count.** `auditing-skills:87-88` counts one finding per root cause. On that basis
there are five, because no two of these share a cause. Two are defects.

**Every new finding lands at Blocking.** That is an artefact of which rules they map to, not a
judgment that all five matter equally. Ten of the thirteen non-Voice rules that could have caught
these are Blocking. Per `auditing-skills:127-130`, only the two defects hold the target back.

### Surviving prior findings

| Severity | Fails | Warns | Defects | Differences |
| --- | --- | --- | --- | --- |
| Blocking | 0 | 0 | 0 | 0 |
| Important | 0 | 0 | 0 | 0 |
| Advisory | 0 | 0 | 0 | 0 |
| **Total** | **0** | **0** | **0** | **0** |

Seven prior fails, seven retired, none surviving. The prior report's one defect is retired outright.

### Do the four rule changes work

Asked directly by the brief, answered directly.

- **Important severity now has a stated effect** (`steering-rules.md:14-15`). Works. It produced no
  finding against this target and contradicts nothing in `auditing-skills`, which speaks only about
  what blocks.
- **The catalogue condition** (`steering-rules.md:49-58`). Works as a rule. It cleanly removes the
  three procedural sections from a file that holds no procedure, which was the prior report's
  headline complaint that six rows shared one cause. The rule gives no test for "describes no work",
  and the target's own application of it is a stretch. See new finding 3.
- **Voice, naming the bare imperative case** (`steering-rules.md:184`, `191-192`). Works. Every
  instructing sentence in the target is a bare imperative (L14, L49, L50, L90), and the old wording
  made each of them arguable. They now pass on a stated case rather than on an auditor's charity.
- **The default outcome now stated in `steering-rules.md`** (L17-19). Works, and is the strongest of
  the four. It retires a Blocking finding from this report and, by its own wording, from every other
  audit that reads the file.

## 5. Anything I did that nobody asked for

- **Diffed both files against 7deb2ae** rather than reading the current state alone, so I could tell
  the four deliberate changes from anything else. This found a fifth change to the target that the
  brief did not list, the Evidence rule rewording at L86, which is new finding 5.
- **Read `auditing-skills/SKILL.md`, `writing-skills/SKILL.md`, and `lint.md` in full**, to check
  that the delegation claims in the new L8-10 actually resolve. They do. This is what let me retire
  six prior findings rather than carry them forward on the prior report's standing judgment.
- **Read `eng/generate-readmes.mjs`** after running `--explain`, to confirm the lint holds no
  100-line or contents-list check before I called L78 an orphan. `lint.md:7` permits reading the
  script to establish coverage. Confirming, not substituting.
- **Grepped the whole `tests/` tree for the 100-line rule.** Nobody asked, and it is what turned new
  finding 2 from an argument into an observation: nine audit reports in this repository hand-counted
  reference-file lines for that row.
- **Checked that `plugins/steering/tests/baselines/` exists** and holds four files, rather than
  taking the prior report's word that the reference resolves.
- **Created `/tmp/ste-audit-2/`** to hold this report. No repository file was edited, staged, or
  committed. The working tree is still clean at d015e2e.
- **Recorded three near misses I chose not to escalate**, rather than dropping them silently.
  - L8 "The skills `writing-skills` and `auditing-skills` apply these rules" gives an action verb to
    a file, which `steering-rules.md:189` says cannot choose. Same register as L25 and L86, which the
    prior report also left. No agent does anything wrong.
  - L65 "the three examples below" is a count of items in the same paragraph. It is accurate today
    and goes stale the moment someone adds a fourth. It is the exact shape L59-60 of this file names
    as a finding, but that rule governs a SKILL.md, not this file.
  - L14-15 "Do not restate them here" addresses whoever next edits this file, not the agent that
    loads it. It costs context on every run and changes nothing an auditor does. No rule in
    `steering-rules.md` covers dead content, so there was nowhere to file it.
