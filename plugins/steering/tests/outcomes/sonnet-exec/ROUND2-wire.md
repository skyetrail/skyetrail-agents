# Commands

**`npm run lint`** — before fixes: 6 advisory lines, then `2 file(s) out of date. Run: npm run build` (exit 1). The stale files were `README.md` and `plugins/steering/README.md`: `writing-skills` got a new description and the generated skill tables still carried the old one. After `npm run build` and my fixes: same 6 advisories, `All generated files are up to date.`, exit 0.

The 6 advisories all sit outside the four files under review and all predate this work: `dispatch-protocol.md` (2 sentences >25 words, longest 29), `steering-rules.md` (3, longest 29), `SUMMARY.md` (no `## Contents` at 193 lines; 24 sentences >25, longest 55), `auditing-skills/SKILL.md` (2, longest 26), `repo-setup/SKILL.md` (5, longest 31). `steering-rules.md` carried 3 long sentences before the edit as well — the edit added none.

**`npm run build && git status --porcelain`** — build rewrote the two READMEs, then reported up to date on the second run. Final tree:

```
 M README.md
 M plugins/steering/README.md
 M plugins/steering/shared/steering-rules.md
 M plugins/steering/skills/writing-agents/SKILL.md
 M plugins/steering/skills/writing-skills/SKILL.md
?? plugins/steering/shared/authoring.md
```

The two READMEs are generated output, not hand edits. `authoring.md` is untracked because it is new.

**`node eng/measure-sentences.mjs ...`** — the four files under review are all inside the caps. `authoring.md`: 102 prose sentences, 0 over 25, longest 23. `writing-agents/SKILL.md`: 314 prose, 0 over, longest 25; 4 rule cells, longest 4. `writing-skills/SKILL.md`: 225 prose, 0 over, longest 25. `steering-rules.md`: 47 rule cells, 0 over 20, longest 20; 148 prose, 3 over 25, longest 29 (pre-existing). The two SKILL.md rows that breach are `auditing-skills` (26) and `repo-setup` (31), neither in scope. Repo total: 12 prose sentences over cap out of 1394, 1%.

One fix of my own tripped this: my first wording of `writing-agents` step 9 was 26 words. Lint caught it, I split it, the file is back to 0 over cap.

# The eight checks

**1. Every relative reference resolves — PASS (after one deletion).** I resolved every backtick path from the file that names it. `authoring.md`: `./ste.md` ✓ (and `./skill-rules.md`, now removed, see check 2). `writing-skills`: `../../shared/authoring.md`, `lint.md`, `skill-rules.md`, `ste.md`, `steering-rules.md` — all ✓. `writing-agents`: `../../shared/authoring.md`, `dispatch-protocol.md`, `handoff-rules.md`, `lint.md`, `ste.md`, `steering-rules.md` — all ✓. Named sections resolve too: Discovery / Boundary / Content tables in `skill-rules.md`, the Conditions block and Scope and Calibration sections in `steering-rules.md`, the four-row status table and Three shapes in `dispatch-protocol.md`, and the heading `## What the rule files carry and what they do not` in `authoring.md` (both skills quote it exactly). `tests/baselines/<skill-name>.md` is not a path relative to the SKILL.md, and the step qualifies it ("inside the plugin directory holding the skill you write. List that plugin directory to find it"), so it is resolvable prose, not a broken link.

**2. No reference more than one hop from a SKILL.md — FAIL, fixed.** `authoring.md` line 74 read: `` `./skill-rules.md` holds the same rule for a SKILL.md. `` `writing-agents` names `authoring.md` but never names `skill-rules.md`, so that put `skill-rules.md` two hops out for a prompt-writing run — and `skill-rules.md` says its rules apply only when the target is a SKILL.md and hand-off is not met, so a `writing-agents` run must not read it at all. Adding it to that skill's Rules list would have been the wrong fix. I deleted the sentence. The paragraph's point stands without it, and `writing-skills` names `skill-rules.md` directly, so it loses nothing.

Every remaining second-hop target is named directly by the SKILL.md that reaches it: `authoring.md`→`ste.md` (both skills name `ste.md`), `dispatch-protocol.md`→`steering-rules.md`/`handoff-rules.md` (both named by `writing-agents`), `skill-rules.md`→`steering-rules.md`/`lint.md` (both named by `writing-skills`), `ste.md`→`steering-rules.md` (named by both). The one link left over is `steering-rules.md`→`handoff-rules.md`, which is guarded — "Where the **hand-off** condition is met, read `./handoff-rules.md` as well" — and a SKILL.md never meets hand-off, so a `writing-skills` run never follows it.

**3. Neither skill restates content that lives in `authoring.md` — PASS.** Neither copies the artifact-test block, the four classes, the cost ordering, or the `cannot tell` procedure. Both point instead: `writing-skills` step 8 and `writing-agents` step 6 both send the reader to the named section rather than reproducing it; `writing-skills` step 3 and `writing-agents`' "When the gate cannot run" both cite `authoring.md` for the unrun-gate rule in one clause each.

One overlap to disclose rather than remove: each skill states its own route-on-class bullets, and `authoring.md` also states the hand-over rule ("Where the class names a skill other than the one you run... Hand the request over"). That is the skill's entry gate, it names no criteria from `authoring.md`, and the recorded failure "A gate that only says stop" argues for stating it locally. I left it.

**4. The two skills do not contradict each other where they overlap — FAIL, fixed.** They disagreed on `authoring.md`'s unsettled outcome. `writing-skills` used the real mechanism ("A line in the block reads `cannot tell`"); `writing-agents` invented a different one ("No test in it holds") and its "When to stop" list omitted the case entirely. `authoring.md` has no "no test holds" outcome — it has `cannot tell` on a line, with three things to return. A `writing-agents` run hitting an unsettled test had no matching branch.

I rewrote the `writing-agents` routing section to `authoring.md`'s own terms (class, deciding test, `cannot tell`), matching `writing-skills` clause for clause, and extended its stop condition to "The artifact test returns a class other than a prompt, or a line reading `cannot tell`."

Everything else in the overlap already agreed: the unverified-file convention (`<skill-name>-unverified.md` / `<prompt-name>-unverified.md`, both beside the record, never at the install path), the "do not audit your own draft" reasoning, "What survives a stop", the mutual scope hand-offs, and the person-overrides-the-skill line.

**5. No step depends on a later step — FAIL in `writing-skills`, fixed; PASS in `writing-agents` after one tightening.**

`writing-skills`, walked in order: step 1 told you to read and raise `Small changes since the last full loop: <count>` in the record, but the record's location was only given in step 2. That is the exact failure the skill's own "What has already failed" section warns about. I moved the record-location paragraph up into step 1 and step 2 now reads "the record you located in step 1". Steps 2→12 then point only backwards: 4 uses step 3's output, 8 reads it again, 10 reuses step 3's model and effort level and its cannot-dispatch branch, 12 the same, and the gate reads step 10's table. Step 8 also carried "unless step 9 moves it", which both pointed forward and gave a step an action verb it cannot take (a Voice rule in `steering-rules.md`); it now reads "unless you move it into a reference file and point at where it went".

`writing-agents`, walked in order: step 2 defined the record as "one file beside the prompt" when no prompt exists until step 4. I made it self-contained — "one file beside the path the prompt takes. Where the person named no path for the prompt, ask for one before you go on." Steps 3→10 are all backward-looking: 3 uses the tables above, 7's grep runs over the filled prompt, the gate cites steps 7 and 8, and step 10 reads the objective written in step 2. The forward mentions that remain in both files ("step 3 below names...", "Step 6 below exists for that") sit in the pre-workflow context sections and are signposts, not dependencies.

**6. Copy-and-tick checklist covering its own steps, nothing missing — FAIL in both, fixed.**

`writing-skills` line 6 covered only "Body written against the section order and the rule tables". Step 6 has a second obligation — settle each condition in the Conditions block by its own test and put every answer in the record — and that is the obligation with a recorded cost behind it (two conditions read as exclusive, a blocking rule dropped from a security review prompt). Line 6 now ends "; every condition settled by its own test", the same clause `writing-agents` line 4 already used.

`writing-agents` had two obligations no line ticked. Counting the call sites is a gate — its own stop list includes "The person will not name the call sites" — and running a template twice on one input is real dispatch work with its own re-run rule. I folded the count into step 3 and line 3 ("Call sites counted; harness shape and dependency pattern named"), and the two-run rule into step 9 and line 9 ("; a template run twice on one input"). Line 1 also now names the filled block rather than "read", so it can actually be verified.

Both checklists otherwise map one line per numbered step: `writing-skills` 0–12 against steps 0–12, `writing-agents` 1–10 against steps 1–10.

**7. Each skill says what it returns when the evidence step cannot run — PASS.** `writing-skills` step 3: "**Where you cannot dispatch.** Copy the error text into the record. Then stop. You hold no deliverable at that point" — then the unverified path, "Never write it into the skill's own directory. Never name it `SKILL.md`", and "Report the run blocked, quote the dispatch error, and give that path." Steps 10 and 12 both send you back to that branch, and step 11 defers to `lint.md` for the unrun-lint case. `writing-agents` has a whole section, "When the gate cannot run", returning five named things with `UNVERIFIED` as the first line of the report, plus "Do not report a self-audit as an independent one."

The two differ in form — `writing-agents` fixes a five-item return, `writing-skills` names three things in prose — but both answer the question, so I changed neither.

**8. Each skill says not to remove correct domain content the model produces unaided — PASS.** `writing-skills` step 8, "**Keep what the unaided run got right.**", has you put the step 3 output beside the draft and read the two against each other, with checklist line 8 "Nothing correct from the step 3 output dropped", and the failure note "A skill tuned on shape alone. An agent following it cut correct subject content that the same model wrote with no skill loaded." `writing-agents` step 6, "**Keep what you know about the subject.**", runs `authoring.md`'s check against the draft prompt, with checklist line 6 and the matching failure note "A prompt tuned on shape alone." `writing-agents` has no unaided baseline run, so its version works from the writer's own knowledge — the same rule applied to the material it has.

# Files changed

- `/Users/pete/workspace/skyetrail-agents/plugins/steering/shared/authoring.md` — deleted the `./skill-rules.md` cross-reference (check 2).
- `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/writing-skills/SKILL.md` — record location moved into step 1, step 2 now points back to it, checklist line 6 covers the conditions, step 8's forward reference removed (checks 5, 6).
- `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/writing-agents/SKILL.md` — routing section and stop condition aligned to `authoring.md`'s `cannot tell`, record location made independent of the prompt, call-site count added to step 3, template two-run added to step 9, checklist lines 1, 3 and 9 updated (checks 4, 5, 6).

I made no change to `steering-rules.md`. Its edit was consistent with everything above: the reworked **changes something** / **advisory** conditions are what `writing-skills` step 6 and `writing-agents` step 4 both send the reader to settle, and the new "A false answer for one is never a true answer for the other" line is quoted almost verbatim in both skills.

# Two things I noticed and did not change

`writing-skills` step 12 dispatches the audit without naming the model and the effort level, while its own steps 3 and 10 both require it and `writing-agents` step 8 requires it. That is an internal gap in `writing-skills`, not a disagreement between files, and it sits outside the eight checks.

`writing-agents` says "Retry a dispatch at most twice per agent" while `dispatch-protocol.md` invariant 4 says "The default is two attempts per agent". These read as a conflict but are about different subjects — the skill's own dispatches versus the retry limit the produced prompt states — and both skills say the same thing, so check 4 is unaffected. Worth a sentence of disambiguation in one of the two files if you want it closed.