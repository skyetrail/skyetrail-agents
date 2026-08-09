# Score: `using-git-worktrees` — pair P3 (A4, A8) against pair P4 (A2, A5)

Target audited by all four: `/private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/ab-test/fixture/skills/using-git-worktrees/SKILL.md` (167 lines, confirmed by `wc -l`).

Reports compared:

- P3: `.../reports/A4.md`, `.../reports/A8.md`
- P4: `.../reports/A2.md`, `.../reports/A5.md`

I changed one file: this report. I did not read the rule sets and I did not try to work out which pair used which.

Headline: the two pairs agree at the same rate, 14/18 each. They differ on how they mark findings and on which fixes they name first.

---

## 1. Reproducibility

Method. I listed the counted findings in each report, then paired them by problem and location, not by wording. Where one auditor folded a problem into another finding as a dependent row, I still treat the problem as reported. I then checked severity, the defect/difference mark, and every rule row where one auditor passed and the other failed or warned.

### P3 — A4 and A8

**Agreement: 14 of 18 distinct problems, reported by both. 0.78.**

A4 counted 15 findings. A8 counted 14. Of A4's 15, twelve match a counted A8 finding and two more match A8 rows that A8 folded into other findings. Of A8's 14, thirteen match A4.

Matched (14):

| # | Problem | A4 | A8 |
| --- | --- | --- | --- |
| 1 | No out-of-scope statement, no successor skill named | F1 | Boundary root cause |
| 2 | `$LOCATION` and `$BRANCH_NAME` used, never assigned | F2 | Context root cause |
| 3 | "instruction file" nickname, "your instructions" elsewhere | F3 | one-term + Context |
| 4 | Closed project-type lists, no membership test | F4 | Scope membership |
| 5 | Setup commands the model already knows | folded into F4 | separate finding |
| 6 | Stop-and-report gap at a scope limit | folded into F4 | Scope stop-and-report |
| 7 | Weakening the baseline check is not forbidden | F6 | Failure weakening |
| 8 | Report-template holes unmarked | F7 | Composition, dependent |
| 9 | Partial work on a stop is not stated | F8 | Composition partial work |
| 10 | Non-agents take action verbs | F9 | Voice |
| 11 | Description carries no error text, no casual phrasing | F10 | Discovery |
| 12 | Direct-instruction precedence stated only narrowly | F11 | Boundary |
| 13 | Description's trailing clause restates the mechanism | W1 | Discovery, warn |
| 14 | No retry limit | W4 | Failure retry |

One side only (4): items 15 to 18 below.

**Severity on matched findings: no disagreement.** Every problem both reported carries the same severity in both reports.

**Defect-or-difference mark on matched findings: 1 disagreement.**

- Item 5, the setup commands the model already knows (lines 106 to 119). A4 marks it a **defect**; A8 marks it a **difference** and says so deliberately: "No wrong action follows from the restatement itself, so this does not block."

**Opposite conclusions on the same text: 4.** Each is a rule row where one auditor passed and the other did not.

| # | Rule row | A4 | A8 | Target text at issue |
| --- | --- | --- | --- | --- |
| 15 | Conditions that should stop the work are stated | **Fail, Blocking, defect** (F5: outside a git repository both variables end up empty, the equality at line 39 holds, and the run continues) | **Pass** ("A failing baseline stops and asks (line 130). A declined consent stops worktree creation (line 45).") | Lines 20-24, 39 |
| 16 | Content that would not change what an agent does is absent | **Warn, Important, difference** (W2: the two tables restate the body) | **Pass** ("Both change what an agent does.") | Lines 142-157, 159-167 |
| 17 | Constraints only where correctness or safety needs them, each saying why | **Warn, Important, difference** (W3: the announcement gives no reason) | **Pass** ("Each hard constraint carries its reason.") | Line 14 |
| 18 | The description speaks in the third person | **Pass** | **Warn, Important, difference** ("Line 3 mixes moods.") | Line 3 |

Item 15 is the heaviest. Two careful readers reached opposite verdicts on a Blocking rule, and A4's reading rests on a real behaviour of the target that A8 never addresses.

**Other divergences, not findings on either side:**

- The 500-line body limit. A4 marks the row **Unverified** and excludes it from its counts, because no lint ran. A8 measures the file by hand, records 167 lines, and marks the row **Pass**. Same rule, same file, two different ways to handle a missing gate.
- Rule coverage. A4 judges 53 rows. A8 judges 57. A4 omits the whole Calibration block, which A8 lists as four not-applicable rows. Nothing turns on it here, because the advisory condition does not hold.
- Label only: the retry-limit row is a Warn in A4 and a Fail in A8, at the same severity and the same mark.

**Fixes named first: 3 of 3 overlap.** A4 names variables, scope limit, project types. A8 names project types, scope limit, variables. Same set, different order.

### P4 — A2 and A5

**Agreement: 14 of 18 distinct problems, reported by both. 0.78.**

A2 counted 13 findings. A5 counted 15. Of A2's 13, twelve match a counted A5 finding. Three more A2 rows are dependents that A5 counts as findings, and all three match.

Matched (14):

| # | Problem | A2 | A5 |
| --- | --- | --- | --- |
| 1 | `$LOCATION` and `$BRANCH_NAME` used, never assigned | Context, every fact | F1 |
| 2 | No out-of-scope statement, no successor skill named | Scope out-of-scope | F2 |
| 3 | Closed project-type lists, no membership test | Scope membership | F3 |
| 4 | Line 86 commits to the branch Step 0 promised to protect | Scope stop-and-report | F4 |
| 5 | Weakening the baseline check is not forbidden | Failure weakening | F6 |
| 6 | Description carries no error text, no casual phrasing | Discovery | F10 |
| 7 | Direct-instruction precedence stated only narrowly | Boundary | folded into F2 |
| 8 | Partial work on a stop is not stated | Composition | F8 |
| 9 | The announcement sentence gives no reason | Method constraints | F5 |
| 10 | One term for one thing | Content one-term | F13 |
| 11 | Non-agents take action verbs | Voice | F9 |
| 12 | The Quick Reference restates the body | dependent row | F12 |
| 13 | Setup commands the model already knows | dependent row | F11 |
| 14 | Report-template holes unmarked | dependent row | F7 |

One side only (4): items 15 to 18 below.

**Severity on matched findings: no disagreement.**

**Defect-or-difference mark on matched findings: 3 disagreements.**

| Problem | A2 | A5 |
| --- | --- | --- |
| Setup commands the model already knows (Blocking both) | **defect** | **difference** |
| The Quick Reference restates the body (Important both) | **defect** | **difference** |
| One term for one thing (Important both) | **difference** | **defect** |

The last one reverses direction. On the same rule and the same text, A2 calls it a difference and A5 calls it a defect.

**Opposite conclusions on the same text: 4.**

| # | Rule row | A2 | A5 | Target text at issue |
| --- | --- | --- | --- | --- |
| 15 | The order is fixed where sequence affects correctness | **Fail, Blocking, defect** (Step 1b puts explicit preference first; the Quick Reference puts the existing directory first) | **Pass** | Lines 65-67 against lines 150-153 |
| 16 | A retry limit is named | **Fail, Important, difference** ("No retry limit appears anywhere.") | **Pass** ("Nothing in the skill retries. No text breaks the rule.") | Whole file |
| 17 | The skill does not document a constraint a script or regex could enforce | **Pass** | **Warn, Important, difference** (W1) | Lines 106-119, 125-128 |
| 18 | Detail sits in reference files rather than the front file | **Pass** | **Warn, Important, difference** (W2) | Whole file |

Item 15 is the heaviest, and it mirrors P3's item 15: one Blocking rule where the two auditors landed on opposite verdicts. A2's reading is correct about the target. Step 1b line 65 says "Explicit user preference always beats observed filesystem state", and the Quick Reference row at line 153 makes the instruction check reachable only when neither directory exists.

**Other divergences, not findings on either side:**

- Row assignment, not substance. A2 marks "nothing refers to something the agent cannot resolve" **Pass** and files the unset variables under "every fact the agent needs". A5 does the reverse. Both report the same problem at Blocking, as a defect. This looks like an opposite conclusion in the tables but is not one.
- A2 marks "the scope statement sits above the method" **Pass**. A5 marks it **not applicable** because the section is missing. Both counted the missing section once elsewhere.
- Rule coverage. Both judge 56 rows. Both omit the 500-line row and both say in the lint section that no row rests on a mechanical limit.

**Fixes named first: 1 of 3 overlap.** A2 names variables, the unasked commit, the directory order. A5 names the unasked commit, project types, weakening the baseline. Only the unasked commit appears in both.

### Which pair agreed more

On the agreement fraction, neither. Both pairs matched 14 of 18 problems, both had exactly 4 rule rows with opposite verdicts, one of them Blocking, and neither pair disagreed about severity on any matched finding. That is a real tie and I am not going to manufacture a gap in it.

P3 agreed more on two secondary points: it has 1 mark disagreement against P4's 3, and its two auditors named the same three fixes first, where P4's two auditors overlapped on one.

---

## 2. Findings that misstate the target

None of the four states that something is absent when it is present, and none calls a reference unresolvable when it resolves. I checked every cross-repository claim as well, and they all hold: `AGENTS.md` is a symlink to `CLAUDE.md`, `package.json` has no `scripts` key, the three pre-commit hooks are all scoped `^evals/.*\.py$`, `evals/` is absent, there is no CI workflow and no `Makefile`, `skills/finishing-a-development-branch/SKILL.md` exists, `tests/claude-code/test-worktree-native-preference.sh` carries the "50/50 runs" line and the `evals/scenarios/...` comment, `test-worktree-path-policy.sh` reads two docs files that both exist, `skills/using-superpowers/references/codex-tools.md:26` names both skills, and `skills/subagent-driven-development/scripts/sdd-workspace` exists.

What is left is one wrong count and a set of wrong line numbers.

### P3: 7 (0 substantive, 7 citation)

| # | Report and finding text | Target text at the cited place | Note |
| --- | --- | --- | --- |
| 1 | A4, F3: "Line 153 against lines 41 and 70." | Line 70: `   ```bash` | The phrase "your instructions" is at lines 41 and **67**. Substance holds. |
| 2 | A4, F1: "An agent that reaches \"Ready to implement\" at line 140" | Line 140: ` ``` ` | The text is at line **139**. Charitably read as the end of the report block. Weakest of the seven. |
| 3 | A8, one-term row: "Lines 41 and 70 say \"your instructions\"" | Line 70: `   ```bash` | Same slip as #1. Substance holds. |
| 4 | A8, Boundary row: "directory choice (line 66, \"Explicit user preference always beats observed filesystem state\")" | Line 66 is blank | The sentence is at line **65**. Substance holds. |
| 5 | A8, Scope row: "...a Python project that line 116 tells it to run `poetry install` for" | Line 116 is blank | The command is at line **115**. The contradiction A8 names is real. |
| 6 | A8, Voice row: "Line 54 keeps native tools as the subject of their own property." | Line 54 is blank | The sentence is at line **55**, which A8 also cites in the next clause. |
| 7 | A8, Context row: "Lines 163-167 state four, each with the consequence that was observed" | Lines 163-167 hold **five** table rows | A8 lists four and omits "Any directory name works" at line 166. Borderline: that row is about precedence, not a failed approach. |

### P4: 5 (1 substantive, 4 citation)

| # | Report and finding text | Target text at the cited place | Note |
| --- | --- | --- | --- |
| 1 | A2, one-term row: "\"your human partner\" **twice** in Common Rationalizations" | `grep -n "human partner"` returns one line, 167: "...proceeding past failures is your human partner's call." | **Substantive.** The count is wrong. The drift A2 names is real, but it happens once, not twice. |
| 2 | A5, F13: "The same thing is \"your instructions\" at lines 41, 53, and **68**." | Line 53: "The user has asked for an isolated workspace (Step 0 consent)..." Line 68 is blank | The phrase is at lines 41 and **67** only. Line 53 is about something else. Two of three cites are wrong. |
| 3 | A5, F3 and F4 and fix 2: "Line **158** states the consequence outright: \"No package.json/Cargo.toml \| Skip dependency install\"" | Line 158 is blank | The row is at line **157**. Repeated three times. Substance holds. |
| 4 | A5, F6 and fix 3: "line **139** demands a report reading \"Tests passing (<N> tests, 0 failures)\"" | Line 139: `Ready to implement <feature-name>` | The quoted line is **138**. Repeated twice. Substance holds. |
| 5 | A5, conditions paragraph, F4 and fix 1: "asks that person for consent (line **44**)" and "the branch that line 44 promised to protect" | Line 44 is blank | The promise is at line **43**. Repeated three times. Substance holds. |

**Caveat on comparing the raw counts.** A2 cites by section name and never by line number, so it cannot make a line-citation error at all. Its one error is a count. Of the eleven entries above, ten are line numbers off by one to three, and in every one of those ten the claim about the target is still correct. Only P4's entry 1 states something the target contradicts.

Counting only claims the target contradicts on substance: **P3 = 0, P4 = 1**. Counting every wrong cite as well: **P3 = 7, P4 = 5**.

---

## 3. Consequence naming

The highest severity in all four reports is Blocking, and each report carries exactly 6 Blocking findings.

Test applied: does the finding say what an agent or a person would then do, or get, wrongly? I read the finding row and the report's own fixes section. "An unlisted project gets no setup and no baseline" passes. "No boundary statement anywhere" does not.

### P3: 11 of 12 (92%)

**A4: 6 of 6.**

| Finding | Consequence named |
| --- | --- |
| F1 scope limit | Yes: "it carries on into implementation, branch finishing, or worktree removal" |
| F2 variables | Yes: "runs `git worktree add \"/\" -b \"\"`, or fails under `set -u`" |
| F3 instruction file | Yes: "hunts for a file on disk... instead of reading its own instructions" |
| F4 project types | Yes: "A Ruby, Java, PHP, .NET, pnpm, bun or uv project gets no setup" |
| F5 non-repository | Yes: "proceeds to create a worktree where there is no repository" |
| F6 weakening | Yes: "nothing forbids editing or skipping the failing test to reach the template's wording" |

**A8: 5 of 6.** The five name consequences, for example "An agent runs the create command with empty values and produces a worktree at a wrong path" and "it improvises against the user's repository". The one that does not is the common-knowledge finding, and A8 says so outright: "No wrong action follows from the restatement itself."

### P4: 9 of 12 (75%)

**A2: 6 of 6.**

| Finding | Consequence named |
| --- | --- |
| Variables | Yes: "runs `-b main` against a branch git already holds, and the command fails" |
| Out of scope | Yes: "improvises `git worktree remove` instead of handing over, and can drop uncommitted work" |
| Membership test | Yes: "An unlisted project type gets no setup and no baseline" |
| Stop and report | Yes: "The agent writes and commits to the repository it is standing in... without asking" |
| Order fixed | Yes: "puts the worktree in `.worktrees/` even when the person named another location" |
| Weakening | Yes: the template "pushes toward exactly that" |

**A5: 3 of 6.**

| Finding | Consequence named |
| --- | --- |
| F1 variables | **No.** "Nothing in the skill sets `BRANCH_NAME`... Line 23 captures `BRANCH` instead, and never uses it." States the gap, not the result. F1 is not in the three fixes either. |
| F2 out of scope | **No.** "No boundary statement anywhere... Nothing says where the skill stops." |
| F3 project types | Yes, in the fixes: "an unlisted project, such as Maven, .NET, or Ruby, gets no setup and no baseline check" |
| F4 unasked commit | Yes: "writes a commit to the branch that line 44 promised to protect, without asking" |
| F6 weakening | Yes: "nothing currently blocks the shortcut" to the "0 failures" line |
| F11 common knowledge | **No.** "A model knows how to install dependencies for these four ecosystems", and A5 adds that "nobody can name a wrong action". |

---

## 4. Volume

| Pair | Auditor | Counted findings | Rule rows judged | Blocking | Important | Defect | Difference |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P3 | A4 | 15 | 53 | 6 | 9 | 11 | 4 |
| P3 | A8 | 14 | 57 | 6 | 8 | 9 | 5 |
| P4 | A2 | 13 | 56 | 6 | 7 | 9 | 4 |
| P4 | A5 | 15 | 56 | 6 | 9 | 9 | 6 |

Observations, not grades:

- P3 totals 29 findings across the two audits, P4 totals 28. The pair means are 14.5 and 14.
- Within-pair spread is 1 for P3 and 2 for P4.
- All four report exactly 6 Blocking findings and 0 Advisory findings.
- The union of distinct problems is 18 in each pair, by coincidence of the same size.
- Defect and difference split near 2:1 in three reports. A4 is the outlier at 11:4, driven by its choice to mark the common-knowledge finding a defect and by three findings the other three reports do not carry.
- A4 also has one row it declines to settle, marked Unverified. The other three settle every row they list.

---

## 5. Where each pair is stronger, and where they are alike

| Measure | Result |
| --- | --- |
| Agreement fraction | **Alike.** 14/18 each. |
| Opposite conclusions | **Alike.** 4 each, one of them Blocking in each pair. |
| Severity agreement on matched findings | **Alike.** Zero disagreements in each pair. |
| Defect-or-difference marking | **P3 stronger.** 1 disagreement against 3, and P4's includes one that reverses direction. |
| Findings the target contradicts on substance | **P3 stronger.** 0 against 1. |
| Wrong line citations | **P4 stronger** on the raw count, 4 against 7, but read the caveat: A2 cites no line numbers at all, so half of P4 could not produce this error. Of P3's 7, five come from one auditor. |
| Consequence naming at the highest severity | **P3 stronger.** 11/12 against 9/12. Both pairs contain one auditor at 6/6; they differ in the second auditor, 5/6 against 3/6. |
| Volume | **Alike.** 29 findings against 28. Same Blocking count in all four. |
| Same three fixes named first | **P3 stronger.** 3 of 3 overlap against 1 of 3. |

Summary. The two pairs are indistinguishable on the main measure and on every part of it that is about whether two readers reach the same conclusions: same agreement fraction, same number of opposite verdicts, same severity behaviour, same volume. P3 is ahead on the softer parts of reproducibility, the defect-or-difference mark and the ordering of fixes, and ahead on consequence naming. P4 has the only claim that the target contradicts, and P4 also has the pair's most useful single finding that nobody else made, the directory-order contradiction between Step 1b and the Quick Reference.

Neither pair's disagreements are noise. In each pair, one Blocking rule split the two auditors, and in each case the auditor who failed the rule was reading the target correctly. Both rule sets let a careful reader miss a real problem.

---

## 6. Anything I did that nobody asked for

- I verified the four reports' claims about the surrounding repository, not only about the target file: the lint setup, the sibling skills, the two worktree test scripts, the docs files, and `codex-tools.md:26`. Nobody asked, and every claim held. I did this because three of the four reports rest a finding on whether `finishing-a-development-branch` resolves.
- I counted rule-table rows per report and noted that A4 omits the Calibration block that the other three list. That is coverage, not findings, so it sits outside the four measures.
- I compared each report's "three fixes to make first" list. That is not one of the four measures, but it reads directly on reproducibility, so I folded it into section 1.
- I ran `wc -l` and several greps over the target to settle countable claims, including the "human partner" count that produced P4's one substantive misstatement.
- I recorded the 500-line-row divergence inside P3, which is not a finding on either side and so does not enter the agreement fraction.
- I did not read the rule sets, did not look at `PAIR-MAP-PRIVATE.txt` or `ARM-MAP-PRIVATE.txt`, and did not try to identify which rule set either pair used.
- I changed no file except this one.
