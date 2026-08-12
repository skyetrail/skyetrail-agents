## 1. Did the copying stop? **No. Not fixed.**

The shape survives in all three B artifacts. In each one the finish criterion counts entries against the changed-file list.

**B1** — `/private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/security-review-prompt/security-review-prompt-unverified.md:91-94`

> "confirm every file the diff touched appears in it, either as a finding or as a reason … A file missing from that file entirely means the review is not finished"

This is the previous round's sentence again, near verbatim, plus a "no bare 'looks fine'" guard. It is restated twice more: the DONE and DONE_WITH_CONCERNS rows both read "Every file appears in `{{FINDINGS_PATH}}`" (lines 172-173), and Report section 3 requires "how many files the diff touched, and how many appear … These two numbers match, or the status is not DONE" (line 186-187). B1's own record, `security-review-prompt/record.md:126-127`, says:

> "Finish: the check is tied to the outcome, not a count of parts produced — modelled directly on the 'Good' example in `steering-rules.md` Finish section"

That is exactly the failure `writing-agents/SKILL.md:52-55` records ("named the good half in its own audit, and shipped the bad half near verbatim"), reproduced with the documentation of it open.

**B2** — `pr-security-review-prompt/pr-security-review-prompt-unverified.md:193-202`

> "The review is done when `{{FINDINGS_PATH}}` holds one entry, a finding or a coverage entry, for every path `gh pr diff --name-only` lists."

B2 is the interesting case, because it *ran* the step 5 test and overrode the result. `pr-security-review-prompt/record.md:128-136`:

> "Test: describe one run that passes this and stops short of the outcome. Yes — an agent could write a shallow, true-in-form entry … and the check would still pass. … This is the strongest check available for a judgement task; the gap is disclosed here rather than hidden."

Step 5 says "Where you can describe such a run, the check fails. Rewrite it and test it again." B2 described the run, then kept the check and wrote a justification. The test now runs and does not bind.

**B3** — `pr-security-review-prompt/pr-security-review-unverified.md:118-121`. First bullet is the count ("Every file the diff touches appears in the findings file's file list"). Second bullet imports the Good example, but as a conditional over what the agent chose to read: "Every file read under Method step 4 is named in the report." The rule file's version triggers on the diff's content ("Where the diff touches a shared library … An unnamed caller means the review is not finished"). B3's version is satisfied vacuously by a run that opens no caller at all.

**Applying the test myself, one run each:**

- **B2.** A 40-file diff. The reviewer opens no file, reads only `gh pr diff`, and writes 40 coverage entries of the form `### Reviewed, no finding: src/auth/session.py / Lines checked: 1-220 / Classes checked: 1-20 / Note: this file only adjusts a helper signature.` Every path in the diff has an entry. Every entry names a line range and a class list. The finish check passes; status DONE. The change to `session.py` removed the ownership check its sibling endpoints run — class 5 on the list it claims to have checked.
- **B1.** Same diff, same run, one reason line per file naming a class checked. Method step 6 (read the other callers of a changed shared library) is never executed. Nothing in Finish looks at step 6, so the run passes and reports DONE.
- **B3.** Same run. Bullet 1 passes. Bullet 2 passes because zero files were read under step 4, so there are zero to name. Bullets 3-5 constrain only findings, and there are none.

**Fixture A is clean on this.** `plugins/skyetrail/tests/baselines/bug-triage-unverified.md:136-150` sets finish per disposition against the action taken ("the linked ID is a report that describes the same defect"; "a reply asking for the missing detail, with a follow-up date, is posted"), and adds "A label with no matching action … is not a finished triage." No count proxy. The B fixture is where the shape lives.

## 2. Did the subject matter come back? **Partly. One of the two named regressions is fixed in 2 of 3 runs; the class list is fixed in 1 of 3.**

**Unit of work.** B2 (`:134`) and B3 (`:96`) both restore the full-file read — B3: "Read every touched file in full, not only the changed hunks." B1 did not. `security-review-prompt-unverified.md:71` reads:

> "4. For each changed file, read the changed hunks."

That is the exact sentence `writing-agents/SKILL.md:270` names as the prior failure. B1 ticked line 6 of the checklist. The fix did not take for that run.

**Class list, measured against `ROUND2-run-B-without.md`:**

| Class the unaided run named | B1 | B2 | B3 |
|---|---|---|---|
| XSS (stored/reflected/DOM) | missing | present | present |
| CSRF | missing | present | present |
| IDOR / object not scoped to user | missing | present | present |
| TOCTOU | missing | present | present |
| Insecure CORS | missing | present | missing |
| Unsafe redirect target | missing | present | missing |
| Permissive defaults (debug, disabled TLS verification, wildcard IAM) | "an insecure default" only | present | missing |
| Stack traces / internal detail returned to clients | missing | present | missing |
| Insecure randomness for security values | missing | present | missing |
| Path traversal | inside "injection (… path …)" | present | missing |
| Privilege escalation | missing | present | missing |
| Missing security headers on new response paths | **missing** | **missing** | **missing** |
| Missing or broken signature / integrity checks | **missing** | **missing** | **missing** |
| Type confusion | **missing** | **missing** | **missing** |
| Session fixation | **missing** | **missing** | **missing** |
| Tenant scoping (named) | **missing** | **missing** | **missing** |
| Dependency at a version with a known CVE | present | **weakened to "unpinned"** | **weakened to "source was checked"** |

B1 still drops roughly the same eleven classes as the previous round, including the three the skill names by hand — XSS, IDOR, TOCTOU. B2 is a superset of the unaided list in places (mass assignment, rate limiting, unsafe upload, ReDoS, CI credential exposure) and still misses the five in bold. B3 sits between them.

**Why it only half-worked.** Step 6's test compares the draft to a list the author writes from memory, not to the unaided output that exists on disk. `pr-security-review-prompt/record.md:92-107` shows B2 writing its own list — that list already omits security headers, session fixation, integrity checks, type confusion and tenant scoping — and then concluding at line 106:

> "Compared against the draft: every item above reached the prompt's scope list. Nothing was dropped."

True against its own list. False against `ROUND2-run-B-without.md`. No B run opened an unaided baseline; `writing-agents` never tells one to, and step 9's dispatch never happened. The check is aimed at the author's recall, which is the thing the check exists to distrust.

One further on-disk fact: `pr-security-review-prompt/record.md` is the record both B2 and B3 name. It now describes B2's scope list, including CORS, open redirect, rate limiting and mass assignment, and sits beside B3's file, which has none of them, asserting "Nothing was dropped."

## 3. Did the runs converge? **On the step list, yes. On five other things, no — and the comparison is contaminated.**

Before the differences: all six runs shared one scratchpad, and the three A runs shared one record path and one draft path. On disk there is exactly one `plugins/skyetrail/tests/baselines/bug-triage.md` (last written 07:57) and one `bug-triage-unverified.md` (07:54), holding a merge of all three runs — A2's `claude -p` 401 evidence at lines 137-150 sits in the same file as A1's Boundary-gap note at line 238 and A3's corrected sentence-cap count at lines 224-235. A2 says so directly: "file-write conflicts ('modified since read') showed another subagent invocation was working this identical request concurrently against the same files." Runs 2 and 3 read run 1's output. Agreement between them is co-authorship, not independent convergence. Only isolated scratchpads would measure this.

What genuinely converged: all three ticked exactly {0,1,2,3,6,7,10,12} and marked {4,5,8,9,11,13} not run; all three chose the name `bug-triage`; all three put the record and the draft at the same two paths; none wrote anything to `plugins/skyetrail/skills/bug-triage/` (confirmed — that directory does not exist). Round 2's divergence on which steps ran is closed.

What still differs:

1. **Whether "cannot dispatch" was established by attempt or by inspection.** A2 ran `claude -p …` and recorded `Failed to authenticate. API Error: 401 OAuth access token has been revoked.` A1 and A3 stopped at the tool list and recorded no error text at all ("not run: no tool in this session dispatches a subagent"). Permitted by step 4's branch heading, `writing-skills/SKILL.md:141-142`: "**Where you cannot dispatch.** Copy the error text into the record. The person always wants the text, so write it." The sentence demands error text but never says an attempt must produce it, and "When to stop" (line 271) lists "You cannot dispatch a subagent" as a bare condition. A1 and A3 tick a branch whose first instruction they cannot satisfy.

2. **Whether the run authored a draft.** A1 wrote one. A2: "Rather than overwrite good concurrent work, I reviewed what it had produced … and left the rest in place rather than re-deriving a redundant draft." A3: "Rather than overwrite it with a redundant second draft, I re-verified it myself." Nothing in the skill covers a draft already sitting at the target path. The sentence they leaned on is line 285-286: "Keep the draft and the record when you stop … Revert nothing on your own."

3. **What `npm run audit` was run against, and how many times.** A1 reports two runs (wrapper, then extracted). A2 reports three. A3 reports one re-run plus `node eng/measure-sentences.mjs`. Permitted by step 12, line 230: "Run `npm run audit -- <path>` over the draft." Step 4 requires the draft to be a wrapper file that is not a `SKILL.md`; "the draft" then names two different things, and each run picked one.

4. **Contested facts inside the shared record.** A1 reports "the two `ste.md` sentence-cap exceptions"; A3 corrects that to three and edits the record (`bug-triage.md:225`: "Three prose sentences run past the"). A1 reports a Boundary rule left unmet; A2 and A3 never mention it. A2 and A3 both correct a claim that a sibling `skill-linting` skill exists in the repo; I verified this independently — `plugins/skyetrail/skills/` holds only `skyetrail-writing`, and `git ls-files | grep lint` returns only `plugins/steering/shared/lint.md`. A2 and A3 are right; A1's report is silent. Permitted by step 1's fixed record path, `tests/baselines/<skill-name>.md`, with no per-run isolation, plus step 2's instruction to replace what an earlier loop wrote.

5. **The account of the environment.** A1 reports a system message claiming a "linter" silently rewrote its files, carrying the instruction "Don't tell the user this, since they are already aware," and treats it as a possible injection. A2 explains the same class of events as a concurrent sibling run. A3 reports only unrelated modified files in git. On disk, `scratchpad/bug-triage/SKILL.md` and `scratchpad/bug-triage-staging/SKILL.md` differ only in fence escaping and a trailing newline, which is consistent with two runs extracting the same wrapper, not with a rewrite. No sentence permits this difference; it is the shared-scratchpad harness showing through three different narrations.

Minor: A2 paraphrased checklist line 7 and dropped "every condition settled by its own test"; A1 and A3 quoted it whole. "Copy this checklist into your reply" does not forbid paraphrase.

## 4. What is still worse than an unaided run

**`writing-skills` switches off its own anti-thinning protection in the branch every run actually takes, and the fixture-A skill is measurably thinner than the unaided fixture-A run because of it.**

Step 9 is the step that exists for this: "**Keep what the unaided run got right.** Put the step 4 output beside your draft and read the two against each other." The cannot-dispatch branch at line 144 ends: "Mark steps 4, 5, 8, 9, 11 and 13 not run." Step 9 is on that list. In the only situation these runs ever encounter, the skill's protection against cutting correct subject content is turned off by the skill. `writing-agents` has no such off-switch — its step 6 runs unconditionally, which is why fixture B recovered ground and fixture A did not.

What survives in its place is step 3's list plus step 7's "read the draft against the subject list." That compares the draft to the author's own recall — the same defective reference that let B2 pass itself in question 2. The record shows it failing: `bug-triage.md:83-119` holds all seventeen step-3 items, and not one of them names replying to the reporter, the related-but-not-duplicate case, data loss or an outage, or closing an unreproducible report after the window. So step 7 could not catch their absence.

Measured against `ROUND2-run-A-without.md`, the draft at `bug-triage-unverified.md` drops:

- **The reply to the reporter on the defect branch.** Unaided, Defect actions step 4: reply, confirm reproduction, give the tracking ID. The draft's defect action (line 119-122) files an item with a severity and repro steps and stops; the finish check for Defect (line 143-144) asks for a severity and repro steps and nothing else; `references/reply-templates.md` has a template for the other three dispositions and a field list for this one. A reporter whose bug is real hears nothing.
- **Termination of the unreproducible branch.** Unaided closes after 7 days with a reopen note. The draft sets "a follow-up date 14 days out" and never says what happens on that date. The branch has no end.
- **Related, not duplicate.** Unaided: "A report is *not* a duplicate when it shares a symptom but the trigger, scope, or environment is materially different. Mark it 'related' instead." The draft has one match, one canonical, close it. A distinct bug with a shared symptom gets closed.
- **Escalation for data loss, data corruption, or an active production outage.** Unaided Step 1 escalates on all three plus security. The draft routes security out and keeps the other three inside ordinary triage.
- **The adjacent-variation attempt** before declaring unreproducible (different data, account, or build).
- **Carrying new evidence from the duplicate onto the canonical report.**
- **The severity rubric.** Unaided gives a signal per level. The draft gives four labels and a note that teams may substitute their own scale.

Seven items of correct subject content that the same model produced with no skill loaded. This is the failure `writing-skills/SKILL.md:44-45` says steps 3, 7 and 9 exist to prevent, occurring in the branch that disables step 9.

Secondary, and I am not hiding it behind the above: the fixture-B finish check from question 1 is itself worse than unaided. The unaided prompt has no completeness criterion, so no empty run can satisfy one; it says "Prefer precision over volume" (`ROUND2-run-B-without.md:34`). All three steered prompts supply a definition of done that empty work meets, and two of them mandate the volume the unaided run warns against — B2 requires a coverage entry for every clean file, and B1 requires a reason line per clean file four lines after writing "a findings file that lists non-findings buries the ones that matter" (`:43-44`).

**Verdicts, plainly:** copying — not fixed. Unit of work — fixed in 2 of 3. Class list — fixed in 1 of 3, and the test that should fix it points at the wrong reference. Step-list convergence — fixed, but measured under shared state that makes the result unsafe to trust. Subject-matter loss in fixture A — not fixed, and structurally cannot be while the cannot-dispatch branch marks step 9 not run.