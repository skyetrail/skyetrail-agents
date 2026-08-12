# Verdict on the four prior findings

## 1. The gate skipped — FIXED, with a residue

Both runs hit the dispatch block, stopped, and refused the install path. Task A: "Per the skill's own instruction at that gate, I stopped the loop (steps 3, 4, 7, 8, 10, 12 did not run) rather than continuing to a finished SKILL.md." Task B opened with the literal word `UNVERIFIED` and closed with "Do not dispatch the unverified file as-is." Neither file was named `SKILL.md`; neither landed in a skill directory. The location guard in `writing-skills` step 3 held.

The residue: the guard is about **location**, and Task A shipped the **content** anyway. `/private/tmp/.../bug-report-triage-unverified.md` carries a complete SKILL.md — frontmatter, `name:`, `description:`, full body — inside a fence, ten seconds of copy-paste from installed. The skill's own rationale is "A file sitting at the install path reads as finished, whatever the report says." A fenced, frontmattered, complete skill reads as finished too.

Second residue: neither run had error text. The failure was *no such tool*, not *tool failed*. Task A was honest — "Error text (in place of a tool error, since no tool exists to call)". Task B was not, listing under "The five things this deliverable carries": "**Exact error text** — 'No tool in this session's tool set dispatches a fresh agent...'". That sentence is the agent's own composition presented as a quoted error. The skill has no branch for a tool that does not exist, so it invites a fabricated quote at the exact gate where honesty matters most.

## 2. Forward reference — FIXED, replaced by a backward one

No step broke on a forward pointer. `writing-skills` step 1 now carries the record path in place, and Task A resolved it correctly, quoting step 1 back: "Where the skill sits in no plugin, put the record beside the skill's own directory and name that path inside the record."

Replaced by a **backward** dependency that killed the one check that mattered. Step 8 bundles two things: compare against the step 3 baseline, *and* run the `authoring.md` section "What the rule files carry and what they do not." The second needs no dispatch. Task A killed both:

> `[ ] 8  Nothing correct from step 3 dropped — blocked, step 3 produced no output to compare against`

The anti-displacement check — the countermeasure for finding 4 — is structurally welded to the dispatch gate. Dispatch dies, the check dies, and the exact failure the check exists to catch runs free. Same bundling error as before, pointing the other direction.

## 3. Conditions misclassified, blocking rule missing — FIXED, by memorization

The rule is back. Task B's prompt: "Report only, and never weaken a check to make one pass." Its conditions table sets both:

> `changes something | true | The work writes a findings file, which outlives the run.`
> `advisory | true | The work judges the PR and edits none of it.`

Task A independently reasoned `advisory=false` with a genuine test, and named the trap unprompted: "`advisory` and `changes something` are not opposites."

But look at *how* Task B settled it, from its own record: "Holds together with changes-something; **steering-rules.md gives this exact pairing as its worked example**." It matched the case to the example rather than applying the test. That generalizes to nothing. And on the adjacent condition it failed openly: `reused | assumed true, unconfirmed` — while ticking `[x] 4 Prompt written; every condition settled by its own test`. One condition is not settled by its own test, by the run's own admission, and the line is ticked.

## 4. Skill displaces domain content — STILL PRESENT, and now provably resistant

This is the finding. `authoring.md` was patched with a literal, task-matched warning naming the exact loss from last round:

> One run showed this loss. Two agents wrote for one task. The agent holding the rule files left out four things the agent without them wrote.
> - A pre-triage step for a security report.

Same task. Same model class. `grep -niE 'security|vulnerab|credential|data loss|outage|escalat|incident|critical'` over the skill-led Task A draft returns **nothing** but the phrase "a support escalation path." The baseline's entire Step 1 is gone:

> **No skill:** "If any signal is present, escalate now through the team's incident channel. Do this before you continue triage." — covering security vulnerabilities, exposed credentials, data loss, active outage.
> **Skill-led:** absent.

The warning names the item. The item was dropped again.

Worse, the drop happened *past* a rule that should have caught it. `steering-rules.md` Method: "Any check that must run before work starts is named as the first step." The skill-led Method step 1 is "Read the whole report."

Also dropped from Task A, each traceable:

- **The severity rubric.** Baseline gives a four-row table (Critical/High/Medium/Low with signals). Skill-led: "Where the team's tracker already defines a severity scale... use that scale. Do not invent a new one." Then step 5 says to file the defect "carrying severity" — with nothing to carry if the team has no scale. Step 8 of the skill bans this exact move: "Deferring content to another document counts as dropping it, unless you move it into a reference file and point at where it went." Step 9 was marked "not applicable." So the run performed the drop the skill names, having loaded the sentence naming it.
- **The follow-up window.** Baseline: 7 days, with a reminder, stated as a default the team may change. Skill-led: "the team's own stale-report window." Unresolvable if none exists.
- **The worked example.** Baseline has one end-to-end. Skill-led has none — because `advisory=false` was correct, and `advisory=false` switches off the whole Calibration block, which is the only place `steering-rules.md` requires examples. Any skill that *acts* rather than *judges* gets no example requirement at all. That is a hole in the rules file, not in the run.

Task B lost more than Task A. `grep -niE 'crypto|random|xss|csrf|cors|redirect|race|toctou|concurren|stack trace|header'` over the skill-led prompt returns **nothing**. The baseline's 11 categories became nine one-word examples in a sentence. Gone: cryptography (weak algorithms, insecure randomness, missing signature checks), XSS/CSRF/CORS/unsafe redirects/security headers, race conditions and TOCTOU on balance checks and one-time tokens, stack traces returned to clients. The membership test is real value. It is not a substitute for the enumeration that makes an agent go looking for a TOCTOU bug on a rate limiter.

## 5. Checklist copied and ticked — YES, and optimistically

Both copied it. Both gave a reason per unticked line, as instructed. The countermeasure took, in form.

The ticks are not all earned. Task A: `[x] 11  Lint run; result in the record — ran, target outside lint's reach (coverage gap, not a pass)`. Ticked, then annotated as not a pass. Task B: `[x] 2  Objective and facts in the record, with the origin of each fact` — while its own report lists "confirmation of file locations for the record and prompt (step 2)" under checks nobody ran. Step 2 says "Where the person named no path for the prompt, ask for one before you go on." Task B did not ask; it chose the scratchpad and ticked the line. Two of Task B's ticks contradict text in its own reply.

The checklist reliably records *whether a step was reached*. It does not record *whether the step passed*. Both runs used `[x]` for the former.

## 6. Did it open the file the pointer named — YES, and that is the wrong question

Both opened `authoring.md`. Task A put the block in its reply under the heading `## Artifact test (`../../shared/authoring.md`)`, reproducing wording that exists nowhere else: "You can write down the command or the regex that returns the answer, and running it needs no judgement." Task B's record carries the same block at lines 10-24. One hop, valid pointer, Sonnet, resolved. That question is answered.

The real result is the split. Both runs fetched the thing they could **paste**. Neither ran the thing they had to **do**. Step 8 of `writing-skills` sends the agent back to the same file: "work the section headed 'What the rule files carry and what they do not'... It has you name every instruction in the draft that came from your own knowledge rather than from a rule file. It also lists what one run dropped this way." That check needs no dispatch. Task A never ran it. Task B's step 6 sends it to the identical section; its record shows it restoring only the two losses named in the `writing-agents` body itself ("which fields does a finding carry", "attacker-influenced content read as instruction") and shows no trace of the `authoring.md` check.

So: the pointer at the top of the file, whose payload is a block to copy, resolves every time. The pointer to a section further down, whose payload is a procedure to perform, resolves to nothing. Both runs read the page containing the sentence "A pre-triage step for a security report" and both dropped a pre-triage step for a security report.

Task B additionally read the file and then broke the surfacing rule. `writing-agents`: "Put the filled block in your reply." Its reply has `[x] 1` and no block.

## 7. What the skill-led runs do WORSE

**Task B's finish check makes the omission binding.** The baseline says: "If the change touches a shared library, auth path, or config, check for other callers/consumers in the repo that the PR might have broken from a security standpoint." Gone from the skill-led prompt. Not merely gone — contradicted:

> Before you write the report, list every file the diff touched. Confirm your findings file holds an entry for each one... A file missing from that list means the review is not finished.

Done is now defined as diff-file coverage. A fresh agent reading this learns that reading outside the diff is not part of finishing. A change that weakens a shared auth helper passes this review with an entry per changed file and no finding. The skill's own Finish rule ("A check the agent can run itself is named, and its result settles whether the work is done") demands a mechanically checkable criterion, and the only mechanically checkable thing about a diff is its file list. The rule pushed the prompt toward a criterion that is *checkable* and *wrong*.

**Task B's prompt leaks the author's changelog into the hand-off.** Second section, before scope:

> ## Known failure to avoid
> A prior version of a prompt like this one treated "write findings to a file" and "make no other change" as conflicting...

The receiving agent has never seen a prior version of this prompt. It cannot resolve "a prompt like this one." This trips the Blocking Context rule in the file it was written against: "Nothing refers to something the agent cannot resolve." It is there because the skill hardcodes its own failure history and the run mirrored that structure outward. The skill taught the prompt to be about the skill.

**Task A replaced concrete defaults with unresolvable pointers.** "the team's tracker already defines a severity scale," "the team's own stale-report window," "per team convention." The baseline gave a default *and* permission to override: "The 7-day follow-up window is a default. Set a different window in team convention, and use it consistently." The skill-led draft gives the deferral without the default. Where the team has neither, the agent has nothing and the instruction is dead. The skill's push toward "do not invent" reads, at Sonnet, as "do not supply" — and a default the reader may override is not an invention.

**Both runs spent their output on process.** Task A's reply is roughly 60% checklist, blockage forensics, and tool-availability reasoning. Task B's is more. The no-skill runs are 100% subject matter and both are directly usable. The skill-led runs are labeled unusable by their own first line. That trade is defensible when the gate genuinely protects something. Here the gate blocked on a missing tool, and what it protected the user from was a deliverable that was, on the evidence above, worse in content than the one the same model wrote with nothing loaded.

**The compounding failure.** The four countermeasures are not independent. Finding 4's countermeasure lives inside step 8. Step 8 is welded to step 3. Step 3 is the dispatch gate. So finding 1's fix — stop cleanly when dispatch fails — *guarantees* finding 4 goes unchecked. The two runs that stopped most correctly are the two runs that displaced the most domain content. Fixing the gate made the displacement invisible rather than absent, and the checklist reports it as `[ ] 8 ... blocked` rather than as a defect in the shipped draft.

**One rule-conformance audit would pass both drafts.** Both carry Outcome, Context, Scope with membership tests, Method, Finish, Failure, Composition. Both settle their conditions in a table. Neither contains the security escalation, the severity rubric, the caller check, or the crypto and concurrency categories. No audit against `steering-rules.md` asks about any of those, because that file "carries the order and the shape of an artifact. They carry none of its subject matter." The rules can only see the container. The thing that got worse is what was in it.