# Pair comparison: audits of `receiving-code-review`

Target: `/private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/ab-test/fixture/skills/receiving-code-review/SKILL.md` (205 lines, read in full).

- **Pair P1** = `reports/A7.md` and `reports/A3.md`
- **Pair P2** = `reports/A1.md` and `reports/A6.md`

I did not read `ARM-MAP-PRIVATE.txt` or `PAIR-MAP-PRIVATE.txt`. I do not know which rule set either pair used, and nothing below depends on that.

Headline: the four audits agree far more than they disagree. All four say the target needs work before use. All four name the same top problem area. The pairs separate on smaller things, and they separate in opposite directions on different measures.

---

## 1. Reproducibility

### Method

I built a union list of distinct problems per pair. A problem counts as **matched** when both auditors point at the same defect in the same part of the target, whatever words or rule names they used. Where one auditor folds a problem into another finding and the partner counts it separately, I count it matched and note the grouping difference, because both did report it.

Where two auditors fail the **same rule** on **different lines of the target**, I count it unmatched. Fixing one does not fix the other, so they are not the same finding. This choice matters; section 1.3 shows what happens without it.

### 1.1 Pair P1 (A7, A3)

**Agreement: 17 / 19 = 89%.**

A7 reported 17 findings. A3 reported 17 findings. 17 distinct problems appear in both. 2 appear in one only.

Matched by both (17): outcome not stated; no out-of-scope or boundary section; open lists with no membership test; finish check not defined; test weakening not forbidden; the line 30 `(explicit instruction-file violation)` reference; description missing casual phrasings; description not third person; no statement that the person overrides the skill; unmarked template holes; a constraint a regex could enforce; no retry limit; partial work on a stop not addressed; duplicated content; wording constrained past correctness; finish check placed too early; stop conditions placed before the finish check.

**Findings only one of the two reported (2):**

| Problem | A7 | A3 |
| --- | --- | --- |
| Voice — non-actors take action verbs (line 10 "Code review requires", line 146 "Actions speak") | F-16, Fail, Important, difference | **Pass** — "an idiom that changes no behaviour" |
| SKILL.md body is 500 lines or fewer | **Pass** — "hand-checked, no lint" | W3, warn, Blocking, difference |

**Opposite conclusions about the same text (4):**

1. **500-line body limit.** A7: "Pass — hand-checked, no lint … The body ends at line 205". A3: "warn, Blocking, difference (W3) … The mechanical gate did not run". Both read the same file to the same length and reached opposite verdicts on the same row. The split is over whether a hand-read may settle a mechanical rule.
2. **Voice / action verbs.** A7 fails it on line 10 and line 146. A3 passes it, and considers only line 146. A7 saw an instance A3 did not consider at all.
3. **Detail sits in reference files.** A7: "Fail — difference (F-14, same root cause)". A3: "pass — 205 lines with no reference file. The only detail worth moving is the duplication counted at F3, so splitting the file changes nothing on its own." Both fold it toward the duplication finding, so no finding count changes, but the row verdicts are opposite.
4. **Does line 30 resolve?** Both record a finding on that row, so it is matched, but the substance is opposite. A7: "No file is named and no path is given." A3: "The term names a category the agent can reach, its own harness instruction file, **so the reference resolves**." One auditor calls the reference unresolvable; the other calls it resolvable and then records a finding about the claim instead. A7 also cites a second instance (lines 82 and 121, "your human partner's prior decisions" and "architectural decisions") that A3 never raises.

**Severity: 0 disagreements.** Every one of the 17 matched findings carries the same severity in both reports.

**Defect-or-difference mark: 5 disagreements out of 17 matched (12/17 = 71% agreement).**

| Matched finding | A7 | A3 |
| --- | --- | --- |
| Finish check not defined | defect | difference |
| Line 30 reference | defect | difference |
| Description missing casual phrasings | defect | difference |
| Unmarked template holes | defect | difference |
| Duplicated content | difference | defect |

Four of the five run the same way (A7 stricter). The fifth runs the other way.

**Structural agreement.** Both auditors evaluated **57 rule rows** — the same 57. Section by section, both counted Outcome 2, Context 4, Scope 6, Method 4, Finish 5, Failure 5, Calibration 4, Composition 3, Voice 3, Discovery 5, Boundary 3, Content 6, Loading 6, Evidence 1. Neither left a rule out. A3 lists Calibration in prose rather than as table rows, and reaches the same result (all four not applicable).

**Top-three fix lists.** A7: test weakening, finish check, boundary. A3: test weakening, boundary, close the lists. Two of three shared, and both put test weakening first.

### 1.2 Pair P2 (A1, A6)

**Agreement: 18 / 23 = 78%.**

A1 reported 19 findings. A6 reported 17 findings. 18 distinct problems appear in both. 5 appear in one only.

Matched by both (18): outcome not stated; no out-of-scope or boundary section; open lists; test weakening not forbidden; the line 30 reference; finish check not defined; no person-override statement; description missing casual phrasings; no successor skill named; a constraint a regex could enforce; partial work not addressed; no retry limit; unmarked template holes; duplicated content; detail not split into reference files; voice / action verbs; finish check placed too early; stop conditions misplaced.

**Findings only one of the two reported (5):**

| Problem | A1 | A6 |
| --- | --- | --- |
| Constraint with no reason — **line 205**, the GitHub thread-reply rule | F12, Important, difference | not raised |
| Constraint with no reason — **lines 157-159**, "Long apology" / "Defending" / "Over-explaining" | not raised | Important, Difference |
| One term for one thing — **"item" (43, 103) vs "suggestion" (76) vs "feedback" (17)** | F16, warn, Important, difference | not raised |
| One term for one thing — **"your human partner" vs "your partner" (line 129)** | not raised | Important, Difference |
| One default approach rather than a menu (lines 34-38, 65, 135-137) | **Pass** | Important, Difference |

Rows 1-4 are the sharper result. Both auditors failed the same two rules, at the same severity, with the same mark — and cited **no overlapping target text at all**. Neither auditor's evidence would lead a maintainer to the other's line. On "one term for one thing" they are near-mirror images: A6 cites the human-partner slip that A1 ignores, and A1 cites the item/suggestion/feedback drift that A6 ignores. Both P1 auditors passed that rule, and A3's pass cites exactly A6's instance and dismisses it.

**Opposite conclusions about the same text (3):**

1. **"Every fact the agent needs is either written out or pointed at by a path it can read."** A1: **pass** — "The partner rules quoted at 86 and 98 carry their substance inline." A6: **Fail, Defect** — same line 30 root cause. One auditor treats line 30 as reaching this rule; the other does not.
2. **"The instruction says the agent runs the check itself before reporting."** A1: **pass** — "Lines 109–111 precede the acknowledgment forms at 134–138." A6: **Fail** — "Lines 16-25. Step 5 RESPOND comes before step 6 IMPLEMENT, so the reply leaves before any check runs." Directly contradictory readings. A1 reads page order; A6 reads the numbered procedure. The target supports both readings, and neither auditor mentions the other's evidence.
3. **"One default approach is given rather than a menu of options."** A1: **pass** — "Lines 17–25. The branch at 61–84 turns on the source, not on preference." A6: **Fail, Difference** — "Lines 34-38 offer four 'INSTEAD:' responses with no rule for picking one. Line 65 offers 'Skip to action or technical acknowledgment'." A6 cites three passages A1 does not address.

**Severity: 0 disagreements at rule level.** Every matched finding carries the same rule severity in both reports.

At **finding** level the pair diverges through grouping. A6 absorbs person-override and successor-skill into the Blocking boundary finding and states the rule: "Severity of the grouped finding is the higher of the two, so Blocking." A1 keeps both as separate Important findings. Same rows, same rule severities, different reported severity for the resulting finding. This is why A1 reports 5 Blocking findings and A6 reports 6.

**Defect-or-difference mark: 5 disagreements out of 18 matched (13/18 = 72% agreement).**

| Matched finding | A1 | A6 |
| --- | --- | --- |
| Line 30 reference | difference | defect |
| No retry limit | difference | defect |
| Unmarked template holes | difference | defect |
| Duplicated content | difference | defect |
| Detail not split into reference files | difference | defect |

All five run the same way: A6 stricter on every one.

**Structural divergence.** A1 evaluated **56 rule rows**; A6 evaluated **52**. The gap is exactly the four Calibration rules. A1 lists all four and marks them not applicable. A6's table has no Calibration section, and the report never mentions Calibration. The two auditors did not work from the same rule inventory, or one dropped a section. No finding changes as a result, since A1's four are all not applicable, but a maintainer cannot tell from A6's report that those rules were considered.

**Top-three fix lists.** A1: test weakening, close the lists, boundary. A6: finish check, test weakening, boundary. Two of three shared, but different first place.

### 1.3 The fraction is sensitive to one choice

If two auditors failing the same rule on different lines counted as a match, P2 would score **20 / 21 = 95%** and P1 would stay at **17 / 19 = 89%**, reversing the order. I did not use that count. Two auditors who fail "each constraint says why" — one at line 205, one at lines 157-159 — have not found the same problem, and fixing either leaves the other standing. Both numbers are stated here so the choice is visible.

### 1.4 Which pair agreed more

**P1 agreed more, 89% against 78%**, on the count that requires the same problem in the same place. The two pairs are level on severity (zero disagreements each) and level on defect-or-difference marks (5 splits each, 71% and 72%). They are close on opposite conclusions (P1: 3 clean row reversals plus 1 substantive reversal inside a shared row; P2: 3 clean row reversals).

P1's advantage is concentrated in two places: an identical rule inventory (57 rows each, section counts matching exactly), and the fact that when both P1 auditors failed a rule, they cited the same target text. P2's two auditors twice failed the same rule with entirely disjoint evidence, and worked from rule inventories four rows apart.

---

## 2. Findings that misstate the target

I checked every finding in all four reports against the file, and verified every filesystem claim. Counted below are claims the target or the repository contradicts: a wrong line, wrong text, or a wrong count. Interpretive disagreements are not counted; they are in section 1.

**P1: 1 misstatement. P2: 4 misstatements.**

### P1 — A7: 1

**A7, F-10 (Composition, template holes):**

> "Line 136, `[Brief description of what changed]`. Line 137, `[specific issue]` and `[location]`."

Target:

```
135	✅ "Fixed. [Brief description of what changed]"
136	✅ "Good catch - [specific issue]. Fixed in [location]."
137	✅ [Just fix it and show in the code]
```

Both citations are one line late. Line 137 holds neither string. The finding itself is sound; the pointers are wrong.

### P1 — A3: 0

No finding in A3 misstates the target. Its line citations are exact where it gives single lines (109, 110, 129, 143, 148, 187, 44, 79, 83) and containing where it gives ranges. Its template-hole citation is correct: "`[Brief description of what changed]` at line 135, `[specific issue]` and `[location]` at line 136."

### P2 — A1: 3

**1. A1, F3 (membership test):**

> "Line 107 reads `Blocking issues (breaks, security)`."

Target:

```
106	     - Blocking issues (breaks, security)
107	     - Simple fixes (typos, imports)
```

Line 107 reads something else. One line late.

**2. A1, F13 (template holes):**

> "Lines 80, **137–138**, 154–155, 205 use `[X]`, `[specific issue]`, `[location]`, `[reason]`, `{owner}`, `{pr}`."

Target:

```
136	✅ "Good catch - [specific issue]. Fixed in [location]."
137	✅ [Just fix it and show in the code]
138	
```

`[specific issue]` and `[location]` are at line 136. Line 137 holds a different placeholder and line 138 is blank.

**3. A1, F18 (finish check placement):**

> "Lines 100–111 sit at the middle of a 205-line file, with **four sections** after them."

Target headings after line 111:

```
113	## When To Push Back
131	## Acknowledging Correct Feedback
150	## Gracefully Correcting Your Pushback
164	## Common Mistakes
176	## Real Examples
203	## GitHub Thread Replies
```

Six sections, not four. The finding is right in direction and understates its own evidence.

### P2 — A6: 1

**A6, "Detail sits in reference files rather than the front file":**

> "**206 lines** in one file, with no reference file beside it."

Target: `wc -l` returns 205, and the last line is 205. A6's own finish-placement row gets it right ("95 lines after it", which is 205 − 110). One line over.

### Borderline, listed but not counted

- **A7:** "at lines 90-96 directs deleting code a reviewer questioned." Line 94 reads `IF unused: "This endpoint isn't called. Remove it (YAGNI)?"` — the skill directs *proposing* removal as a question. Overstated, not false.
- **A7:** "Lines 139-141 repeat the forbidden phrases from lines 30-32." Lines 139 and 140 do. Line 141, "Thanks for catching that!", is not at lines 30-32.
- **A3, W4:** "The term names a category the agent can reach, its own harness instruction file, **so the reference resolves**." A repo-wide grep finds the cited rule in no instruction file. `AGENTS.md` is a symlink to `CLAUDE.md`, and `CLAUDE.md` carries no such ban; the phrase appears only in `docs/superpowers/specs/2026-05-05-platform-neutral-config-refs-design.md`. A3 hedges in the same cell ("the document does not establish it"), so this is a contested reading rather than a false statement about the target.
- **A1, F8:** "Line 111 ends the procedure at `Verify no regressions`." Line 111 is the closing fence; line 110 carries the text.
- **A6:** "all **fourteen** sibling skills exist at `../`." The directory holds 14 skills including the target, so 13 are siblings.
- **A6:** "line 30 records that the phrase kept appearing against an explicit instruction." Line 30 marks the phrase as a violation. It does not say the phrase recurred.

### Claims I verified as true

Every substantive repository claim in all four reports checks out: `AGENTS.md` is a symlink to `CLAUDE.md`; `package.json` has no `scripts` key; `.pre-commit-config.yaml` has three hooks, all scoped to `^evals/.*\.py$`; `evals/` is absent; `scripts/lint-shell.sh` never opens a `.md` file; `tests/` exists and `tests/baselines/` does not; `hooks/hooks.json` carries only a SessionStart hook (A1's claim, exact); the skills collection holds 14 skills including `requesting-code-review`, `verification-before-completion`, `test-driven-development`, `writing-plans`, `brainstorming` and `systematic-debugging`; `systematic-debugging` and `requesting-code-review` do split into reference files (A1's claim, true); `CLAUDE.md` does require eval evidence and does place the harness in `evals/` (A1's claim, true). No auditor described a reference as unresolvable when it in fact resolves.

### Internal arithmetic, one slip per pair

Not misstatements about the target, but they bear on reproducibility.

- **A7 (P1):** "Rows marked not applicable: 13." Its table carries 14.
- **A6 (P2):** "Fail 27 … Pass 16." Its table carries 25 fail rows and 18 pass rows. The total of 52 and the 17-finding collapse are both correct.
- **A3 and A1** are internally consistent (57 = 17+21+14+5; 56 = 20+2+22+12, and 22 − 3 dependents = 19).

---

## 3. Consequence naming

Test applied: for each finding the report grades at its highest severity (Blocking in all four), does the report name a consequence I can restate in my own words without the rule in front of me? I looked at the finding's evidence cell and at any later passage in the same report about that finding.

**P1: 7 / 13 = 54%. P2: 8 / 11 = 73%.**

### P1 — A7: 2 / 6

| Blocking finding | Names a consequence | Text |
| --- | --- | --- |
| F-1 outcome | no | "Nothing states what the agent finishes with." Absence only. |
| F-2 boundary | no | "There is no boundary section." Absence only, in the table and in the fix list. |
| F-3 open lists | no | "six bullets, no membership test and no marker." Absence plus a contrast. |
| F-4 finish check | **yes** | "an agent reports the review addressed having run nothing." |
| F-5 test weakening | **yes** | "Nothing forbids weakening or deleting a failing test to clear a review item … the run then looks successful." |
| F-6 line 30 | no | "No file is named and no path is given." Absence only. |

### P1 — A3: 5 / 7

| Blocking finding | Names a consequence | Text |
| --- | --- | --- |
| F1 boundary | **yes** | "An agent carries the phrase bans and the pushback posture into work that is not code review." |
| F4 outcome | **yes** | "An agent can treat a well-reasoned reply as the finished work and never implement the item." |
| F6 open lists | **yes** | "An agent reads a seventh reason to push back as out of scope and implements a suggestion it should have challenged." |
| F8 test weakening | **yes** | "the pressure that produces a weakened test." |
| W5 finish check | **yes** | "Two agents can still settle done-ness differently." |
| W3 500-line limit | no | "The mechanical gate did not run." A3 says so itself: "no consequence can be named for the target from that alone." |
| W4 line 30 | no | "the document does not establish it." No consequence. |

### P2 — A1: 4 / 5

| Blocking finding | Names a consequence | Text |
| --- | --- | --- |
| F1 outcome + finish | **yes** | "A green suite does not settle items the agent pushed back on or asked about." |
| F2 scope | **yes** | "the prohibitions … read as governing every exchange rather than code review only." |
| F3 open lists | **yes** | "'Nice catch!' passes the check the skill exists to impose." |
| F4 test weakening | **yes** | "nothing in it stops an agent from loosening an assertion when a suggested change breaks a test." |
| F5 line 30 | no | Declared openly: "a parenthetical whose consequence nobody can name." |

### P2 — A6: 4 / 6

| Blocking finding | Names a consequence | Text |
| --- | --- | --- |
| outcome | no | "Nothing says what 'done' looks like." Absence only, here and in the fix list. |
| line 30 | **yes** (weak) | "The agent cannot reach the rule, and cannot check what else it forbids." |
| out of scope | no | "No section states what the skill does not cover." Absence only. |
| open lists | **yes** | "An agent meets 'Nice work!' or a pushback reason not listed and reads it as permitted." |
| finish check | **yes** | "An agent applies the fixes, runs nothing named, and reports finished." |
| test weakening | **yes** | "This is the skill an agent loads on hearing 'make the test pass', so the omission sits exactly where the gaming path opens." |

### Reading the numbers

Denominators differ because the pairs grade different numbers of findings Blocking. Per auditor: A7 33%, A3 71%, A1 80%, A6 67%.

Two things sit under the pair totals. First, P2 is higher, 73% against 54%. Second, and more telling for reproducibility, P2's two auditors are closer to each other: 80% and 67%, a 13-point spread, against P1's 33% and 71%, a 38-point spread. A7 is the outlier of all four. It states four of its six Blocking findings as bare absences, while its partner A3 states a consequence for five of seven. Both pairs also carry one honest "no consequence can be named" declaration at Blocking severity (A3's W3, A1's F5), each on a rule the auditor says has overreached.

---

## 4. Volume

| | A7 | A3 | P1 | A1 | A6 | P2 |
| --- | --- | --- | --- | --- | --- | --- |
| Findings | 17 | 17 | 34, mean 17.0 | 19 | 17 | 36, mean 18.0 |
| Within-pair spread | | | **0** | | | **2** |
| Blocking findings | 6 | 7 | | 5 | 6 | |
| Important | 10 | 8 | | 12 | 10 | |
| Advisory | 1 | 2 | | 2 | 1 | |
| Defects | 12 | 9 | | 9 | 12 | |
| Differences | 5 | 8 | | 10 | 5 | |
| Rule rows evaluated | 57 | 57 | **identical** | 56 | 52 | **4 apart** |

Observations, not grades.

- Volume is near-identical across all four audits, 17 to 19 findings. No pair produces a materially longer or shorter report. The union of distinct problems is 19 for P1 and 23 for P2, so P2's extra volume is spread across more distinct problems rather than concentrated.
- P1's two auditors landed on exactly the same finding count and the same rule-row count. P2's differ by 2 and 4.
- The defect-and-difference split is a near mirror across the pairs: A7 12/5 and A6 12/5; A3 9/8 and A1 9/10. Each pair contains one strict auditor and one lenient one, and the strict-lenient gap is about the same size in both.
- All four grade between 5 and 7 findings Blocking, and all four conclude the target needs work before use.
- All four converge on the same top problem area. Test weakening is in every top-three list, first for three of the four auditors. The boundary section is in all four top-three lists. Every auditor also names the open lists and the undefined finish check inside its top four.

---

## 5. Which pair is stronger, and where they are alike

| Measure | Result |
| --- | --- |
| **Reproducibility (agreement fraction)** | **P1 stronger.** 89% against 78%. P1's advantage rests on an identical rule inventory and on both auditors citing the same target text whenever they failed the same rule. P2 twice failed the same rule with disjoint evidence. Note the sensitivity: counting rule-level rather than location-level matches reverses this to 95% for P2 against 89% for P1. |
| **Reproducibility (severity)** | **Indistinguishable.** Zero severity disagreements in both pairs on every matched finding. This is a real result: whatever else varies, both rule sets pin severity firmly. |
| **Reproducibility (defect-or-difference mark)** | **Indistinguishable.** 5 splits in each pair, 71% for P1 and 72% for P2. In P2 all five run the same direction (A6 stricter). In P1 four of five do. |
| **Reproducibility (opposite conclusions)** | **Close, slight edge to P2.** P1: 3 clean row reversals plus 1 substantive reversal inside a shared row (does line 30 resolve). P2: 3 clean row reversals, one of them a direct contradiction on the same procedural ordering. Not a difference I would rely on at this sample size. |
| **Reproducibility (rule coverage)** | **P1 stronger.** Both P1 auditors worked 57 rows with matching section counts. P2's auditors worked 56 and 52; A6 omits the four Calibration rules entirely and never mentions them. |
| **Accuracy (misstatements)** | **P1 stronger.** 1 against 4. A3 has none. A1 has three, including a section count that is wrong by two. All four errors on both sides are line-pointer or count errors inside findings that are otherwise sound; none invents a problem the target does not have. |
| **Consequence naming** | **P2 stronger,** 73% against 54%, and P2's auditors are also closer to each other (13-point spread against 38). A7 alone drags P1 down at 33%. |
| **Volume** | **Indistinguishable.** 34 findings for P1, 36 for P2. Means 17.0 and 18.0. P1's two auditors match exactly; P2's differ by 2. Neither pair is notably verbose or notably thin. |
| **Verdict on the target** | **Indistinguishable.** All four say the target needs work before use. All four put test weakening and the missing boundary section in their top three. |

**Overall.** Neither pair dominates. P1 is more reproducible on the main measure and more accurate. P2 names consequences better and more evenly. On severity, on defect-or-difference marks, on volume and on the verdict about the target, the two pairs are alike — and those alike results cover four of the eight measures.

One caveat on strength of evidence: two audits per pair over one target. A single outlier auditor moves a pair total a long way. A7 alone accounts for most of P1's consequence-naming gap; A1 alone accounts for three of P2's four misstatements. The severity and volume ties are the most robust results here, because they do not depend on any single auditor.

---

## 6. Anything I did that nobody asked for

- **I verified the reports' filesystem claims, not only their claims about the target.** The brief said to read the target document. I also read `fixture/CLAUDE.md`, `fixture/package.json`, `fixture/.pre-commit-config.yaml`, `fixture/hooks/hooks.json`, the `fixture/skills/` and `fixture/tests/` listings, and grepped the repository for the phrase cited at target line 30. Several findings assert things about those files, and I could not judge accuracy otherwise. Results are in section 2. Every such claim held, with the small exceptions listed there.
- **I computed a second agreement fraction under a looser match rule** (section 1.3) and reported it, because it reverses the ordering. Nobody asked for a sensitivity check. I judged that hiding it would misrepresent the main number.
- **I checked each report's internal arithmetic** against its own tables and found one slip per pair. Reported at the end of section 2, marked as not being target misstatements.
- **I counted rule rows per report and per section** to compare rule inventories. This produced the Calibration finding in section 1.2, which nothing in the brief pointed at.
- **I listed borderline items separately rather than counting them.** Six claims overstate or misdescribe in ways I judged short of a misstatement. Counting them would have moved P1 from 1 to 3 and P2 from 4 to 7, leaving the ordering unchanged.
- **I read only the four named reports.** `A2.md`, `A4.md`, `A5.md` and `A8.md` sit in the same directory and I did not open them. I did not open `ARM-MAP-PRIVATE.txt` or `PAIR-MAP-PRIVATE.txt`, so I do not know which rule set either pair used.
- **I changed nothing except this file.** The target, the four reports and the fixture repository are untouched.
