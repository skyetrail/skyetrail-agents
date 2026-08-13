## Round is clean — verified before any number below

| Check | Result |
|---|---|
| Each directory holds only its own run | Pass. 28 files, zero cross-run path references, zero duplicate md5s. |
| Reproduction of `skyetrail/tests/` or `steering/tests/outcomes/` | Pass. 8-gram overlap 0.93–2.45%. Every overlapping span traces to legitimate shared source. |

The only exact line overlaps (≥60 chars) are the artifact-test template from `shared/authoring.md`, the fixture prompt itself (which lives in `skyetrail/tests/baselines/`), and the session scratchpad path. One phrase I chased specifically — b1's "config object is a finding, because the fields inside that object are not visible at the call site" — appears in `sonnet-exec/ground.md`, but both quote `shared/steering-rules.md:324`. Shared source, not contamination. **Numbers below are usable.**

---

## 1. Did anything ship? Yes — 6 of 6, reversing the previous round

| Run | Deliverable | Usable without further work? |
|---|---|---|
| a1 | `SKILL.md` 158 lines + 2 reference + evals | **Yes** |
| a2 | `SKILL.md` 119 lines + 2 references + evals | **Yes** |
| a3 | `SKILL.md` 148 lines + 1 reference | **Yes** |
| b1 | `security-review-prompt.md` 276 lines | **Yes**, after filling 7 holes |
| b2 | `pr-security-review-prompt.md` 254 lines | **Yes**, after filling 4 holes |
| b3 | `security-review-prompt.md` 200 lines | **Yes**, after filling 6 holes |

The previous round's headline — *all six produced a file their own text says is not the deliverable* — is **gone, 0 of 6**. I grepped every delivered artifact for `unverified|draft|STATUS:|do not use|not the deliverable|provisional|untested`: all six clean. (The two hits in b2/b3 are the `Status: DONE | BLOCKED…` field of the findings-file template — part of the prompt's payload, not a disclaimer.) Authoring history: all six clean.

This is the gate change working as designed. `steering-rules.md:210-216` now says the quiet part directly: *"One skill held its work back until the run dispatched a subagent… Six runs failed that gate, and six delivered a draft rather than the artifact."* Moving the gate off the un-recheckable "did you dispatch" and onto "does the artifact exist and pass a command the caller re-runs" is the fix, and it took.

## 2. Could a caller catch a false claim? Yes — and I caught one

I re-ran one claimed check per run against the delivered artifact.

| Run | Claim | My result | Match |
|---|---|---|---|
| a1 | audit `19 pass, 0 fail, 0 advisory, 5 n/a` | identical | ✅ |
| a2 | audit `19/0/0/5`; first run `17/1/1/5` failing `lint-yaml-colon-space` | both identical | ✅ |
| a3 | audit `18 pass, 0 fail, 0 advisory, 6 n/a` | identical | ✅ |
| b1 | sha1 `0f79e218…`; 7/7 holes in Composition; `257:## Return gate` | all three identical | ✅ |
| b2 | sha1 `f62b610b…`; 4/4 holes; `216:## Return gate` | all three identical | ✅ |
| b3 | sha1 `79b3e12f…`; `grep -n '{{'` → 27 lines; `168:## Return gate` | all three identical | ✅ |
| **a1** | **`[x] 14 measured.md written; every path in it opens`** | **3 of 5 paths do not exist** | ❌ |

**The one false tick — a1, step 14.** Its `measured.md` names `without-skill.md`, `with-skill.md`, and `audit-independent.md`; none were ever created. a1 ticked the line whose entire content is "every path in it opens." a2 and a3 avoided this by pointing their blocked rows at a record file that does exist.

The previous round's specific failure — *18 pass 0 fail claimed on a file returning 4 pass 2 fail* — did not recur. Every pass/fail count this round is exact. b3 slightly mislabels its supplementary sentence check ("0/157 rule cells" — there are 0 rule cells total; 157 is the prose count), but the operative number (1 prose sentence over cap) reproduces.

## 3. Did anyone fabricate a subject? No

Every check ran against the delivered artifact:
- All three A-run `audit.md` files print a `SKILL.md` path character-identical to the delivered path.
- All three B-run checksums match the delivered file bytes.
- No run invented a repository. All three B-runs hit the same real condition — the scratchpad is not a git repo (`fatal: not a git repository`, which I reproduced) with no `AGENTS.md` or `package.json` — and all three **reported the gap and left line 8 unticked** rather than inventing a target. That is the correct `lint.md` branch ("No lint command exists for this repository. Say so.").

I also independently confirmed the "no dispatch tool" claim all six runs made. `TaskCreate` creates pending to-do items with no model execution; `TaskGet` reads them back; `SendMessage` requires an already-named teammate. None dispatches a fresh-context agent and returns output. **The blocked steps were genuinely blocked, in six independent runs.**

## 4. Determinism — sharply improved on ticks, still zero on structure

**Ticks: B-fixture is now 3 of 3 identical** (1–7, 9, 10 ticked; 8, 11, 12 unticked, 8 for the lint gap, 11–12 reading `caller obligation`). Last clean figure was zero of three. A-fixture is 2 of 3 (a1 and a3 tick step 8; a2 leaves it unticked).

**Structure: still 0 of 3 identical on each fixture.**

*A-fixture section sets* — a1: `Before you start | Scope | Decide the disposition | When this is finished | Stop and report | Defaults you can replace`; a2: `Context | Scope | Method | Finish | Failure | Defaults | References`; a3: `Outcome | Context | Scope | Method | Finish | Failure | Composition`.

| Difference | What permitted it |
|---|---|
| Heading names diverge entirely (a1 renames all six) | **Nothing permits it — nothing forbids it.** `steering-rules.md:108` fixes the *order* ("the order these sections should appear"); no rule fixes the heading text. This is an absent rule, not a permitting sentence. |
| `reference/` (a1, a3) vs `references/` (a2) | Step 10 says only "Detail moved into reference files". |
| 2 vs 2 vs 1 reference files; evals present in a1/a2, absent in a3 | Same sentence; no count. Audit's `three-evaluations` is `n/a: the skill is not ours`. |
| Step 8 tick split | Step 8's own branch is ambiguous when step 5 numbered nothing: a1/a3 read "write the line and move on" (tick), a2 read "not in this case" (untick). |
| needs-info window 14 (a1) vs 7 (a2, a3) | Step 7's "a default for every deferred value" names no value. |
| Label sets differ three ways (`question` vs `support`; `needs-info` vs `unreproducible`) | Same. |
| Audit totals differ (19/5 vs 18/6) | Downstream of the evals difference, not a judgement call. |

*B-fixture* — b1 and b2 carry the **identical 10-section set**; b3 carries 12.

| Difference | What permitted it |
|---|---|
| b1 `…Report \| Return gate`; b2 `…Return gate \| Report` | Only positional rule is "The finish check sits late" (Advisory). Placement of Report/Return gate is unstated. |
| b3 adds `Inputs` **before** `Outcome`, and splits `Statuses` out | Breaks "The outcome statement sits at the top, before context and method" — but that row is **Advisory**, so it is permitted to break. |
| Holes 7 (b1) vs 4 (b2) vs 6 (b3); b1 alone makes `MODEL`/`EFFORT` holes | Step 11 says name model and effort *at dispatch*; nothing forbids promoting them to holes. |
| Filename `security-review-prompt.md` vs `pr-security-review-prompt.md` | No rule names the file. |

## 5. Still worse than unaided? Mixed — no longer on shipping, still on content

Against `ROUND2-run-A-without.md` and `ROUND2-run-B-without.md`:

**Skilled now wins on:** shipping at all (6/6 vs the prior 0/6); prompt-injection defence (all three B-runs treat diff content as data and make steering attempts a finding — the unaided B prompt has nothing); explicit stop/BLOCKED statuses; retry limits; partial-work handling; a caller-side return gate. The unaided B prompt has none of these — it ends at a report format.

**Unaided still wins on one concrete thing.** The unaided A baseline carries a four-tier severity rubric *with the signal that assigns each tier* ("Critical | Data loss, security exposure, or the product is unusable for most users"). Of the skilled runs: **a2 matches it** (full rubric with tests in `references/category-actions.md`); **a1 and a3 have no severity tiers at all** — a1 says only "Set severity and priority from the impact… and the frequency", a3 "Set severity from the impact, how many are affected, and whether a workaround exists". An agent reading a1 or a3 has no scale to pick from. The unaided baseline also ships a full worked example inline; a1/a2/a3 push it to reference files (correct per step 10, but the unaided one is usable in one read).

---

## Where a fix did not take

**1. Defect 1 (the finish check a passing run can stop short of) — fixed in 2 of 3, not fixed in b2.** b1 and b3 both close it: b1's Finish requires caller enumeration and states "An unlisted caller of a shared library, an authentication path, or a configuration file means the review is not finished"; b3's Finish adds a bidirectional caller check. **b2's Finish is the prior round's Bad example, near-verbatim** — file list only, no caller clause. b2's Method step 4 does have the caller branch, but Finish never collects it, so the identical stop-short path survives: read every changed file in full, write a row for each, pass Finish, never run step 4's caller search, return DONE. **b2 ticked line 5 ("no passing run stops short"). That tick is false against the rule's own Blocking row.** This is the third consecutive round this defect has survived in at least one run.

**2. The same shape is unfixed in all three A-runs.** Every A Finish check is *label + action + reply* — a1, a2, a3 alike. A run that skips the duplicate search and files a `defect` passes all three checks. `GATE.md` flagged exactly this ("a run that skips step 4 and files a defect duplicating an open report passes that check"). Nothing in this round closed it. a1 gets closest, but its guard ("A `duplicate` label needs an actual matching report, linked") sits in *Stop and report*, not in Finish, so it is not what ends the work.

**3. Defect 3 (deferral with no default) — regressed in a1 and a3.** The prior round's complaint was "restores the labels without the test that assigns them." a2 fixed it properly. a1 and a3 went further backwards: no labels *and* no test.

**4. Structural determinism was never actually addressed.** The tick improvement is real and large (B-fixture 0→3 of 3). But 0 of 3 structural agreement on both fixtures is unchanged, and the dominant cause is an absent rule, not a loose one: nothing anywhere fixes section heading names. Until a rule names the headings, the A-fixture will keep producing three differently-shaped skills, and every round will keep re-reporting it.

**5. One false tick still shipped (a1, step 14).** The gate change made claims *checkable* — I caught this in one command. But it did not make them *checked*: a1 ticked a line stating "every path in it opens" without opening them. The gate now catches this at the caller. It does not prevent it at the author.