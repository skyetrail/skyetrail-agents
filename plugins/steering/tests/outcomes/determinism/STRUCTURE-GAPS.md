## Contamination check — this round is clean. Numbers below are usable.

Paths below are relative to `GAPS = /private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/gaps`.

| Check | Result |
|---|---|
| Each directory holds only its own run | **Pass.** 25 files (r1 9, r2 6, r3 10). Zero cross-run path references in either direction (grep for `/r1/`,`/r2/`,`/r3/` across the other two). Zero duplicate md5s across runs. |
| Reproduction from `skyetrail/tests/` or `steering/tests/` | **Pass.** 8-gram overlap 1.44% (r1), 2.71% (r2), 2.60% (r3) against a 101-file, 95,901-gram test corpus. Exact line matches ≥40 chars: r1 **0**, r3 **0**, r2 **9** — one is the fixture prompt quoted verbatim (step 2 requires it; the prompt happens to live at `plugins/skyetrail/tests/baselines/bug-report-triage.md`), the other eight are the artifact-test template, which is at `plugins/steering/shared/authoring.md:31-37`. Legitimate shared source. |
| One span I chased specifically | r1's `severity-tiers.md:11` "Data loss, a security exposure, or the product is unusable **for everyone, with no workaround**" vs `ROUND2-run-A-without.md:90` "…unusable **for most users**". Different tails, and r1's High/Medium/Low rows share no ≥8-gram with the baseline's. Convergent industry phrasing, not a lift. |
| Audit counts re-run by me | r1 19/0/0/5, r2 19/0/0/5, r3 18/0/0/6 — **all three reproduce exactly**. No fabricated numbers this round. |

---

## 1. Did the five differences close? **One of five.**

| # | Difference | r1 | r2 | r3 | Verdict |
|---|---|---|---|---|---|
| 1 | Section headings | `Scope · Workflow · The four outcomes · Log line · Labels · Escalate on signal… · Judge the report… · Stop conditions · Done` | `Outcome · Context · Scope · Method · Finish · Failure · Composition` | `Outcome · Context · Scope · Method · Finish · Failure · Composition` | **Not closed. 2 of 3.** r2 and r3 are character-identical; r1 renamed every one. |
| 2 | Reference directory name | `reference/` | `reference/` | `reference/` | **Closed. 3 of 3.** The only one that closed. |
| 3 | Number of reference files | **4** (`security-screen`, `duplicate-matching`, `severity-tiers`, `classify-examples`) | **1** (`actions-by-category`, 113 lines) | **6** (`pre-checks`, `duplicate-detection`, `dispositions`, `severity-and-labels`, `needs-info-policy`, `worked-example`) | **Not closed, and wider than before.** Prior round was 2/2/1 (spread 1); this round is 4/1/6 (spread 5). |
| 4 | Deferred default value (needs-info window) | **7 days**, then a second 7-day window (`SKILL.md:119-124`) | **14 days**, single window (`SKILL.md:131`) | **7 days**, then a second 7 days (`SKILL.md:107-108`) | **Not closed. Identical split to the prior round** (14/7/7 then, 14/7/7 now). The new "value the reader acts on alone" sentence changed nothing here — every run already gave a literal number. |
| 5 | Output filename | Skill produces **no file** — the log line is a tracker comment (`SKILL.md:131-137`) | Skill produces **no file** — Context names "a comment on the report or a triage log", unnamed (`SKILL.md:18-19`) | **`triage-plan.md`** in the working directory, batch case only (`SKILL.md:77-78`) | **Not closed, and not testable as posed.** The prior-round filename difference was B-fixture only (`security-review-prompt.md` vs `pr-security-review-prompt.md`); no B fixture ran here. On the A fixture the three runs do not even agree that the skill produces a file. |

## 2. Did the severity rubric come back? **Yes, 3 of 3, with the test on every tier.**

Against `ROUND2-run-A-without.md:88-93` (four tiers, one signal each):

| Run | Tiers | Test on each tier? | Where |
|---|---|---|---|
| r1 | 4 | **Yes** — e.g. Medium: "A feature is broken or gives a wrong result for some users, and a workaround exists." | `reference/severity-tiers.md:9-14`, one hop from `SKILL.md:92` |
| r2 | 4 | **Yes** — e.g. Medium: "a feature is impaired, but a workaround exists." | Inline, `SKILL.md:126-129` |
| r3 | 4 | **Yes** — e.g. Medium: "A feature is broken but a workaround exists, or few users hit it." Plus a tie-break: apply the tests in order, stop at the first pass. | `reference/severity-and-labels.md:9-14` |

Prior round: 1 of 3 (a2 only); a1 and a3 had no scale at all. This is the clearest gain in the round. **One caveat on r3:** `SKILL.md` never names `severity-and-labels.md`. It is reached only through `dispositions.md` — two hops. That breaks `skill-rules.md`'s **Blocking** row "Every reference is one hop from the SKILL.md that names it," and the mechanical audit passes it anyway (`no-orphan-bundled-files` only asks that something signposts it).

## 3. What still differs

| Difference | The sentence that permitted it |
|---|---|
| Heading text: r1 renames all nine | The new rule is circular — "Where the skill carries a section that `./steering-rules.md` **names**, its heading is that file's heading text." A run that renames `Method` to `Workflow` can read itself as carrying no section that file names. Step 7's "Take the section order and **each heading's text**" is direct, but nothing checks it: r1 scores 19 pass / 0 fail. |
| 4 vs 1 vs 6 reference files | Step 10 "Move a passage one step needs and the other steps do not" + the new "Content sits in a reference file where a reader needs it for one case and not others." Both are split tests with no count and no floor. r2 read a single file with four labelled sections as satisfying it. |
| Reference filenames share not one name across the three | Nothing names them. Only "Every bundled file's name says what the file holds." |
| evals: `.md` and **linked** from SKILL.md (r1) / `.json` and unlinked (r2) / absent (r3) | Two rules collide with no tiebreak: `no-orphan-bundled-files` rewards linking, and the Boundary row "Material used to test the skill is not reachable from it" forbids it. r1 links, r2 explicitly does not, r3 sidesteps by shipping none. |
| 7+7 days vs a single 14 | Step 7 fixes that a default must be a literal, not what the literal is. |
| Labels: `triage:*`+`severity:*` (r1) / **none at all** (r2) / `status:*`+`type:*`+`severity:*` (r3) | "A default that names a set of values also carries the test that assigns each member" only bites once a set is named. r2 names none — zero literal label strings in its whole bundle — and so passes vacuously. |
| Scope: one report (r1, r2) vs one-or-batch with a plan file (r3) | Nothing sets the unit of work. The steering-rules Method row "Batch or destructive work produces a plan file" then fires for r3 alone, which is why only r3 names an output file. |
| Record directory: r1 built `r1/tests/baselines/…`; r2 and r3 put the record at the run root | Step 1: "Where the skill sits in no plugin, put the record beside the skill's own directory." r1 read the `tests/baselines/` template as still applying. |
| Front-file length 198 / 139 / 128 | Only the 500-line cap. "Detail sits in reference files rather than the front file" is Important with no measure. |
| Checklist inside the delivered skill: r1 has one, r2 and r3 do not | "A workflow whose steps a reader could lose track of carries a checklist" — **Advisory**, and the judgement is the author's. |
| Step 9 checklist mark: `[x]` (r1) / `[~]` (r2) / `[ ]` (r3) | **No sentence permits `[~]`.** The skill says "A line you cannot tick stays unticked and carries one line saying why." r2 invented a third state. |

**Traces to no sentence — model sampling, not an underspecified skill:** the reference filenames themselves, the wording of each severity test, the choice of out-of-scope items (r3 adds spam/abuse and feature requests; r1 and r2 do not), and r2's `[~]`.

## 4. Did anything get worse? **Yes, in three places.**

Against `GATES-VERDICT.md`:

1. **Reference-file spread widened, and it produced a Blocking violation.** 2/2/1 → 4/1/6. The new splitting rule pushed r3 to six files, and its severity table fell out of one-hop reach of SKILL.md — an Important rule was added, and a Blocking rule broke as a result. Nothing in the prior round had a two-hop reference.
2. **The front file got longer, not shorter.** a1/a2/a3 were 158/119/148; r1/r2/r3 are 198/139/128. r1 is the longest A-fixture front file across both rounds, and it split into four reference files at the same time.
3. **The unaided baseline still beats 2 of 3 on subject content, and on a second axis this time.** GATES-VERDICT §5 named one loss (the severity rubric) — that one is now fixed 3/3. But `ROUND2-run-A-without.md:61-67` also carries a reproduction step with a named retry ("Try one adjacent variation — different data, different account, different build"). **r2 has it; r1 and r3 have none** — r1 decides defect-vs-unreproducible from document completeness alone, r3 from "a pattern you recognize." An agent under r1 or r3 can label a report unreproducible without trying it. `GATE.md:78` flagged this exact defect in an earlier draft; it is unfixed. Separately, `ROUND2-VERDICT.md:105` flagged "a reporter whose bug is real hears nothing" — **r1's Real defect branch still has no reply to the reporter**, and its `## Done` gate asks for a reply only on the support branch.

**Where this round is better, plainly:** 3 of 3 shipped complete files, no disclaimers, no holes, no authoring history. **Zero false ticks** — I opened every path in all three `measured.md` files and all open, which is the a1 step-14 failure not recurring. Checklist ticks agree 14 of 15 lines across the three runs (the prior round's step-8 split closed; step 9 opened a new one). All three audit counts reproduce exactly.

**The one defect nobody has touched, three rounds running:** every Finish check is still label + action + reply. A run that skips the duplicate search and files a defect passes all three gates — r1 `SKILL.md:190-194`, r2 `SKILL.md:94-101`, r3 `SKILL.md:86-90`. `GATE.md:38` named it, GATES-VERDICT §2 named it, and this round did not close it in any run.

**Verdict: did not close.** One of five differences closed (`reference/`). The severity rubric, which was not on the five-rule list, closed 3 of 3 and is the round's real gain. Section headings improved to 2 of 3 but 2 does not close. Reference-file count and the needs-info window are unchanged or worse, and the output-filename rule was never exercised on this fixture.