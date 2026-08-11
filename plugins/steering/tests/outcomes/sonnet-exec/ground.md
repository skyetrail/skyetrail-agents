Ground established. Report follows.

---

# 1. What each skill produces today, step by step

## `writing-skills` — `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/writing-skills/SKILL.md`

Declared output (L8–9):
> "This skill produces a SKILL.md, any reference files it needs, and evidence that it changes behaviour."

**Pre-step gate (L11–24), "First check a skill is the right artifact."** A four-way route:
> "- A one-off in this conversation. Say it directly. Do not write anything.
> - Guidance should apply whenever a condition arises. You cannot say in advance when the condition will happen. The agent doing the work already has the conversation. A skill.
> - A separable piece of work you want done in a fresh context. An agent prompt. Use `writing-agents`.
> - A constraint a script or a regex could enforce. Automate it. Do not document it."

with the discriminator stated after the list:
> "The question behind them is what has to hold the guidance. The answer is the conversation, a file the agent loads when a condition arises, a prompt sent to a fresh context, or a script. Where a request fits none of them, say which of the four it is closest to. Say why. Ask before you write anything. Do not force it into the nearest bullet."

**Workflow (L34–70), ordered, step 1 first:**

1. **Baseline** (L37–42): "Pick a realistic task that the skill should help with. Dispatch a subagent with no skill loaded. Tell the subagent to work from its own knowledge. Tell it not to invoke any installed skill... Record what it did. Record where it went wrong. Record the reasoning it gave, in its own words. Where the subagent reaches for an installed skill anyway, record that too."
2. **Write the description** (L43–46): "Write it against every rule in the Discovery table of `../../shared/skill-rules.md`. Open that file and work down the table. Summarising the workflow is the usual mistake."
3. **Write the body** (L47–51): "Order the sections the way `../../shared/steering-rules.md` orders its own... Write the body against every rule in that file, and against the Boundary and Content tables of `../../shared/skill-rules.md`. Open both and work down them. Do not add a section that restates the description."
4. **Address only the failures from step 1** (L52–54): "Do not address anything the model already gets right. For each failure, describe the shape it takes in the work. Do not describe the label it falls under."
5. **Move detail into reference files** (L55–56): "The body is an overview. `../../shared/skill-rules.md` sets how you must arrange references."
6. **Baseline again** (L57–63): "Use the same task and a fresh subagent. Load the skill this time. Compare the result against step 1. Record the comparison in `tests/baselines/<skill-name>.md`... Name that location inside the record itself, never in the SKILL.md, which must not link to it."
7. **Audit, and not by yourself** (L64–70): "Run the lint command named in `../../shared/lint.md`... Then dispatch a fresh agent to audit the draft. Use `auditing-skills` for this. Do not audit your own draft. You know what you meant each line to say. So you read the intent, not the text... Where no subagent is available, audit the draft yourself."

**Gate and stop rules (L72–91):** "Where behaviour is the same with and without the skill, the skill has no effect. Do not keep it." / "Fix a failing baseline or audit by changing the skill. Do not fix it by easing the task or loosening the rules. A pass earned that way measures nothing." / "Where the loop does not settle after two more full runs, stop." / "For a small change to a skill that already has a recorded baseline, run step 7 alone." / "Three consecutive small changes is the limit. The fourth runs the full loop whatever its size."

## `writing-agents` — `.../skills/writing-agents/SKILL.md`

Declared output (L8–10):
> "This skill produces two things. It produces the prompt that makes an agent for one call. It also produces the caller side, which dispatches that prompt and acts on what returns."

**Pre-step preference (L12–27), "Compose at dispatch":** "Compose the prompt at the moment of use instead. A checked-in template with named holes counts as composed, because the caller holds the filled text." / "Keep a named agent where something outside the call site depends on it staying one fixed thing." / "This is a preference, not a rule. Recommend it and say why. Do not refuse to work with a named agent."

**Workflow (L37–58):**

1. **Establish the facts:** "Use a script for anything a script can determine. Use an agent only for what needs an assessment. Use neither for what you already know. Record where each fact came from."
2. **Write the prompt** "against `../../shared/steering-rules.md` and `../../shared/handoff-rules.md`, with the condition **hand-off** met. Where the prompt names a category of work, define what makes something a member. Mark any list of kinds as examples."
3. **Name the statuses** "and the caller's obligation for each. Name the retry limit. Say what happens to partial work when a run stops. Take the status set from `../../shared/dispatch-protocol.md` and add only what this run needs."
4. **Fill every hole:** "Mark each hole required, or give it a default. Have a script check that every required hole holds a value before dispatch... Keep the set of holes fixed."
5. **Audit the filled prompt** "against `../../shared/steering-rules.md` and `../../shared/handoff-rules.md`. Do this before you send anything."
6. **Dispatch:** "Name the model explicitly. Do not let it inherit from this session, because two runs of the same template must stay comparable."
7. **Handle the return** "per the status table. Check that the report is complete. Do not re-run what the agent already proved."

Plus (L60–61): "For work spread across several agents, pick the shape from `../../shared/dispatch-protocol.md`."

**Stop rules (L63–76)** and **Converting a named agent (L78–89)**: "Read the definition. Split it into what stays the same and what varies by call. The invariant part becomes the template body. The varying part becomes named holes."

**Structural asymmetry to note now:** `writing-skills` produces *evidence* (baseline, lint, independent audit). `writing-agents` produces *no evidence at all* — no baseline step, no lint step, and a self-audit at step 5.

---

# 2. Judgement with no stated test — the list the rewrite must close

Each row quotes the text and names what a Sonnet executor has to decide unaided.

## In `writing-skills`

| # | Quote (file:line) | Untested decision |
|---|---|---|
| S1 | "Where a request fits none of them, say which of the four it is closest to." (L23) | "Closest to" has no metric. The four classes have descriptions but no membership tests, and no tie-break when two fit (a repeatable constraint that is *also* script-enforceable fits bullets 2 and 4). |
| S2 | "Pick a realistic task that the skill should help with." (L37) | "Realistic" untested. No count of tasks, no count of runs. METHOD.md §9 says "A single run hides two different problems" — the skill never states a run count. |
| S3 | "Record where it went wrong." (L40) | No test for "went wrong". `auditing-skills` L69–70 has exactly this test — "A finding is something that would change what an agent does" — and step 1 does not point at it. |
| S4 | "Where the subagent reaches for an installed skill anyway, record that too. This means an existing skill already covers this ground." (L41–42) | A classification is made and no action attaches to it. Record, then what? Stop? Extend the existing skill? Nothing routes. |
| S5 | "Do not address anything the model already gets right." (L52–53) | No test for "already gets right" from one run, and no run count that would make the judgement safe. |
| S6 | "For each failure, describe the shape it takes in the work. Do not describe the label it falls under." (L53–54) | The test *exists* — `steering-rules.md` L178–191, with a worked bad/good pair — and step 4 does not link to it. The executor must already know the distinction. |
| S7 | "Move detail into reference files. The body is an overview." (L55) | No boundary test between detail and overview. `skill-rules.md` L78 repeats the same untested split: "Detail sits in reference files rather than the front file." |
| S8 | "Compare the result against step 1." (L59) | No comparison criteria. What counts as improved is left open. |
| S9 | "Where behaviour is the same with and without the skill, the skill has no effect. Do not keep it." (L74) | "The same" has no test. Two free-text runs are never literally the same, so the discard rule can never fire as written. |
| S10 | "Where the second run fails in a new way, put that failure... into the skill." (L75–76) | "New way" untested against the step-1 record. |
| S11 | "Where the loop does not settle after two more full runs, stop." (L78–79) | "Settle" is undefined. No convergence criterion. |
| S12 | "Where no subagent is available, audit the draft yourself." (L67–68) | "Available" untested and self-asserted. This is the escape hatch on the plugin's only adversarial-verification step, and a weaker executor takes the cheaper branch. |
| S13 | "A change to what the skill claims to do runs the full loop." (L83–84) | This *is* a written test, and it is the one that has already failed in practice — see the failure evidence below. |
| S14 | "Three consecutive small changes is the limit." (L86) | The count has no keeper. Nothing in the skill or a script maintains it. |
| S15 | "Do not add a section that restates the description." (L51) | "Restates" untested. |

Failure evidence for S13/S14, from `tests/baselines/writing-skills.md` L87–96:
> "Five consecutive changes have now landed under the small-change clause, so no baseline has run against the current steps. An audit found this, not the person making the changes."
> "The clause had no limit until today. It now caps consecutive small changes at three, and the skill that carries the clause is the first thing to breach it."

And L76–82, the sharpest one:
> "The first version of this paragraph said step 3 'now defers to that file's order rather than restating one'. That was untrue when written... A later audit found the fault and found this record certifying it fixed... A record that certifies an unmade fix is worse than a missing one. A missing record leaves a reader to check. This one told a reader not to."

## In `writing-agents`

| # | Quote (file:line) | Untested decision |
|---|---|---|
| A1 | "This is a preference, not a rule. Recommend it and say why. Do not refuse to work with a named agent." (L26–27) | No test for when the preference yields. The membership test above it is good; the override is unbounded. |
| A2 | "Where the prompt names a category of work, define what makes something a member." (L42–43) | The executor must first recognise that a category *has been named*. No test for that recognition — a meta-judgement gating the plugin's central rule. |
| A3 | "Take the status set from `../../shared/dispatch-protocol.md` and add only what this run needs." (L45–46) | "What this run needs" untested. `dispatch-protocol.md` L99–100 only adds "Additions are allowed and are declared in the template rather than invented per call" — still no test. |
| A4 | "**Audit the filled prompt**... Do this before you send anything." (L53–54) | Self-audit, with no independence requirement. Directly contradicts `writing-skills` L66–68: "Do not audit your own draft. You know what you meant each line to say. So you read the intent, not the text." One skill in the pair names self-preferential bias and defends against it; the sibling does not. |
| A5 | "Name the model explicitly." (L56) | Names the model only. `handoff-rules.md` L74 requires: "The model and the effort level are both named explicitly... Naming one and inheriting the other still leaves two runs incomparable." `dispatch-protocol.md` L67 repeats it. The skill under-implements the rule file it applies. |
| A6 | "Check that the report is complete." (L58) | No completeness test at the point of use. The test exists in `dispatch-protocol.md` L36–37 — "Whether a returned report holds each command the prompt named, with that command's result" — listed as script work, and never reaches step 7. |
| A7 | "Have a script check that every required hole holds a value before dispatch." (L47–48) | No command named. `handoff-rules.md` L43 requires "The exact commands are named." Contrast `writing-skills` step 7, which routes to `lint.md` for its command. |
| A8 | "Split it into what stays the same and what varies by call." (L80) | No test for invariance. Pure judgement on the conversion path. |
| A9 | "For work spread across several agents, pick the shape from `../../shared/dispatch-protocol.md`." (L60) | The referenced classifier is sound (see §3) but covers three shapes. Nothing tells the executor what to do when the work is adversarial verification, generate-and-filter, tournament, or loop-until-done. `dispatch-protocol.md` L118–119 does supply the escape: "Stop and report what is missing where work fits none of them." So a Sonnet executor asked for the shape `writing-skills` itself uses — baseline, write, independent audit, loop — must stop. |

## Structural defects that create judgement by omission

- **`ste.md` is orphaned.** `shared/ste.md` L7 states: "The skills `writing-skills` and `writing-agents` apply this file." Grep across `skills/`, `shared/`, `README.md`, `METHOD.md` returns **zero** references to `ste.md`. Neither skill names it, and neither `skill-rules.md` nor `steering-rules.md` routes to it. An executor of either skill never loads the style it is said to apply.
- **`writing-agents` never names `lint.md`.** Grep confirms `lint.md` is referenced only by `auditing-skills` (L51, L53), `writing-skills` (L64), and `skill-rules.md` (L13). A prompt template produced by `writing-agents` ships with no mechanical gate.
- **`writing-agents` has no baseline gate.** `skill-rules.md` L86 makes baseline evidence Blocking for a SKILL.md. `writing-agents` produces prompts, not skills, so the rule does not reach its output — and nothing replaces it. Its own baseline record (`tests/baselines/writing-agents.md`) exists; the artifacts it produces get none.
- **Term drift across the pair on the same rule.** `writing-skills` L30: "A direct instruction from the person overrides this skill." `writing-agents` L33: "A direct instruction from the person wins over anything here." `skill-rules.md` L47 requires "The skill uses one term for one thing throughout"; `ste.md` L27 requires "One word, one meaning, throughout a document."

---

# 3. Where the rule set already expresses classification

Each of these is already a classifier. The rewrite should extend them, not replace their vocabulary.

## The membership-test rule — `steering-rules.md` L108, L112–138

> "Where a category of work is named, a membership test defines it. Any list of kinds carries a marker saying they are examples, not the whole set." — Blocking / always

> "A list of kinds tells the reader that a kind not on the list is out of scope. The reader is right to read it that way. Write the test for membership first. Then give examples."

> Bad: "Review for injection: SQL, command, template, or path."
> Good: "Injection is any place input that was not checked or escaped is built into something another system interprets. SQL, shell commands, file paths, and markup returned to a browser are examples, not the whole list."

> "One reviewer read the first wording. It had already found a reflected injection. It filed that finding out of scope, because the wording did not name markup. Nothing about the list was wrong. The list was closed."

> "**A trailing 'or any other X' satisfies this rule.** A list that ends by generalising to the category is closed. A list that just stops is not."

**Maps to a classifier as:** the *decision function for one class*. It gives the input (a candidate), a test (the predicate), examples (calibration), and an explicit open-world escape (the "not the whole list" marker) that stops the classifier from silently returning "out of scope" on an unseen case. It supplies membership; it does not supply routing, a default class, or what to do per class.

## The shape-not-label rule — `steering-rules.md` L176, L179–191

> "Where a run showed a miss, the instruction describes the shape that miss takes in the code. It does not describe the label." — Important / advisory

> "A label says which bucket a finding belongs in. The shape says what the agent is looking at on the screen, so it can recognise the case without already knowing it is there."

> Bad: "Report any secret written to a log."
> Good: "Check what every log and error call passes. Passing a whole request, session, user, or config object is a finding, because the fields inside it are not visible at the call site."

> "Reach for this after a run shows a miss, not before. A shape written from imagination is a guess, and it costs the same context as one taken from an observed failure."

**Maps to a classifier as:** the *feature specification*. A label names the output class; a shape names the observable input features the executor matches on. This is precisely the weaker-executor problem — a strong author knows which bucket a thing goes in, a weak executor needs the features. The final clause also constrains where classifier features may come from: observed runs, not imagination.

## The conditions system — `steering-rules.md` L46–83

> "**Conditions.** Use these and nothing else." Then six named conditions: **always**, **hand-off**, **changes something**, **advisory**, **reused**, **describes work**, each with its own definition.

> "You decide every condition from what the document holds. Treat the document's own claim about which conditions it meets as a claim to check, not as a fact to accept. Otherwise an author switches off a rule by writing one sentence about the document."

> "Every condition is about the document in front of you, not about anything that document describes... Two audits of one such file called this opposite ways and returned different counts, so settle it this way and record which way you went."

> "To decide **describes work**, ask what a reader does with the document. Where a reader carries it out, the condition holds. Where a reader holds it against another document and judges that one, it does not. Decide this from the document's part in the work, and never from whether it states an outcome, because one of the rules below tests exactly that. A test that reads the same property as the rule it gates leaves the rule unable to fail."

> "Read the Applies-when column, one row at a time."

**Maps to a classifier as:** a *multi-label classifier with routing*. Six non-exclusive labels, a closed label set, a stated decision procedure per label, an anti-self-report rule (the target cannot declare its own class), an anti-circularity rule (the gate must not read the same property as the gated rule), and routing — the Applies-when column switches each rule on or off per label. This is the most complete classifier the plugin has. It classifies *documents*; the rewrite needs the same machinery over *tasks*.

## Other classifiers already present

| Where | Quote | What it classifies |
|---|---|---|
| `dispatch-protocol.md` L78–83 | Four statuses with a "The caller must" column: "DONE... Check the report is complete. Do not re-run the checks the agent proved." / "BLOCKED... Fix the named cause, or report the block upward. Do not re-send the same prompt." | Run outcome → caller action. The only place in the plugin where classes carry routing. Plus a disambiguation rule (L85–86): "A check that did not run is not a concern. If a required step was skipped or deferred, the status is BLOCKED, or NEEDS_CONTEXT when the cause is something the caller failed to supply." |
| `dispatch-protocol.md` L109–119 | "**Fan out.** The default. Use it when the pieces of work do not read or write anything in common and none of them needs the result of another." / "**Chain.** Use it when one agent's output changes the next prompt." / "**Establish then fan out.** Use it when the facts the workers need are not yet known." / "Agents that modify shared state are not a fan-out case even when the tasks look independent." / "Stop and report what is missing where work fits none of them." | Work shape. **Complete classifier**: test per class, stated default, negative case, escape hatch. This is the template to copy. |
| `dispatch-protocol.md` L123–125 | "Anything that can be counted, parsed, matched, or read from a file is script work. An assessment, such as which of a set of files is in the worst state, is not. The common case is a hybrid." | Script vs agent vs known. Three classes, one test, a named hybrid. |
| `auditing-skills` L13–25 | "Use `../../shared/steering-rules.md` for every target. Then add a file for what the target is, and another for each condition the target meets." + "Decide the conditions from what the target holds, not from how you are using it. Route by condition rather than by what you would call the document, because more than one name fits the same document." | Target type → rule-file set. An explicit router, with an explicit reason for routing on condition rather than name. |
| `auditing-skills` L69–90 | "A finding is something that would change what an agent does. That test decides any case the two lists below do not name. Both lists are examples, not the whole set." + six positive and six negative examples. | Finding vs non-finding. Test first, then positive *and* negative calibration. |
| `auditing-skills` L140–150 | "A defect is one where you can name what an agent would do wrong... A difference is where the target works another way. You cannot say what goes wrong." / "Only a defect blocks." | Finding kind → blocking or not. Two orthogonal axes (severity × defect/difference), explicitly separated. |
| `auditing-skills` L112–127 | "Mark each prior finding confirmed, retired, or changed. Changed means it is still there in a different form, which is what a fix that moved a fault rather than removing it produces." / "Without the third mark, a half-fixed finding fits neither confirmed nor retired, and two rounds of this audit invented the word rather than reporting the gap." | Fix outcome. A worked case of a two-class scheme failing and a third class being added from an observed failure. |
| `steering-rules.md` L22–23 / `auditing-skills` L60–62, L91–94 | "The default outcome for every rule here is pass. Record a fail only where you can point at the text that breaks the rule." / "Mark it pass, fail, warn, or not applicable... A rule whose condition does not hold is not applicable. Not applicable is not the same as a pass." / "Where unsure, mark it warn." | Per-rule verdict. Four classes, a stated prior, a stated abstain class. |
| `skill-rules.md` L52–63 | "Read each paragraph. Ask what an agent does differently after reading it. If the answer is nothing, it is a finding. These shapes are the ones seen so far, not the whole list. The test above decides a shape they do not cover." | Dead content. Test, four example shapes, and an explicit counter-test at L65–68. |
| `lint.md` L36–59 | "A lint fails to settle your target in more than one way. Three come up most, and they are not the same. Others exist, so read these three as examples rather than as the whole list." Then per case: "**No lint command exists...**", "**A command exists but you cannot run it from where you are.**", "**The command runs, exits clean, and never opens your target.** This case looks like a pass. It is not a pass." | Lint outcome. Three classes with per-class action, plus the false-pass case named explicitly. |

---

# 4. What the two skills share, and whether it is a third thing

## The shared surface, quoted side by side

| Shared element | `writing-skills` | `writing-agents` |
|---|---|---|
| Produces-first opener | L8–9: "This skill produces a SKILL.md, any reference files it needs, and evidence that it changes behaviour." | L8–10: "This skill produces two things. It produces the prompt that makes an agent for one call. It also produces the caller side..." |
| Artifact routing | L11–24, four-way, names `writing-agents` | L31–33: "This skill does not write skills. `writing-skills` does that." — a boundary statement only, **no incoming route** |
| Boundary + handoff to sibling | L28–30: "This skill does not audit a skill without changing it. That is the job of `auditing-skills`." | L31–33: "This skill does not audit an existing prompt without changing it. `auditing-skills` does that." |
| Person-overrides clause | L30: "A direct instruction from the person overrides this skill." | L33: "A direct instruction from the person wins over anything here." |
| Numbered workflow | L34–70, 7 steps | L37–58, 7 steps |
| Audit step | L64–70, **independent**, via `auditing-skills` | L53–54, **self**, no sibling named |
| No-weakening clause | L76–77: "Fix a failing baseline or audit by changing the skill. Do not fix it by easing the task or loosening the rules. A pass earned that way measures nothing." | L72–73: "Do not weaken a check. Do not loosen a rule. Do not fill a hole with a placeholder to force a pass. Fix the input, or stop." |
| Keep-partial-work clause | L79–80: "Keep the draft when you stop. Say in the report that the draft is unverified. Leave the keep-or-discard call to the person." | L75–76: "When you stop, keep the established facts and any draft prompt. Say where they sit. Leave the keep-or-discard call to the person." |
| Retry limit | L78–79: "Where the loop does not settle after two more full runs, stop." | L69–71: "Retry a dispatch only after something has changed, and at most twice per agent." |
| Closing pointer section | L93–96 "## Rules" | L91–96 "## References" |

## Is it a third thing?

Yes, and the plugin already has an empty slot shaped exactly for it.

Every shared file states the same split, in near-identical words:

- `steering-rules.md` L13–15: "The skills `writing-skills`, `auditing-skills`, and `writing-agents` apply this file. **It supplies criteria and defines no task of its own.** Where a procedural property an audit needs is missing here, look in the skill that runs the audit."
- `skill-rules.md` L8–11: "This file supplies criteria and defines no task of its own. Where a procedural property an audit needs is missing here, look in those two skills. The stop conditions and the evidence each finding carries are two examples, not the whole list."
- `handoff-rules.md` L11–13, `dispatch-protocol.md` L12–13, `ste.md` L7–8: same sentence.

So: **criteria are factored out and procedure is not.** There is no procedure file, and every criteria file says so by pointing back at the skills for procedural properties. The shared material in §4's table is procedure. It belongs in one file, and the plugin's own architecture already names the gap.

Three separable things sit in that shared material:

**(a) A routing front door.** `writing-skills` L11–24 decides between four artifacts, only two of which it owns. `writing-agents` has no such check — it opens at "Establish the facts". A request that lands on `writing-agents` but should be a skill is never caught, and a request that lands on `writing-skills` and should be a script is caught only by the skill that would otherwise write the wrong thing. Making this a named classifier both skills call closes the asymmetry. It is also the plugin's own "classify and act".

**(b) A produce-then-verify loop.** Both skills run write → audit → gate → stop → keep partial work. They diverge on every verification detail: baseline (skills only), lint (skills only), independent audit (skills only). Naming the loop once forces one answer to "who audits", and the answer is already recorded in `tests/baselines/writing-skills.md` L35–44 — self-audit lost.

**(c) A stop-and-keep protocol.** Near-verbatim in both. One file.

**Coordination cost caveat.** Splitting this into three files costs three loads on every run. `skill-rules.md` L77 is Blocking: "Every reference is one hop from the SKILL.md that names it." Three new shared files are three hops from each skill, which is legal but pays. One procedure file with three sections costs one hop and satisfies the same rule. Test that split against the constraint before making it — the shared material is roughly forty lines, and forty lines does not obviously earn three files.

**What must not be merged.** The two skills' *outputs* differ in kind: a SKILL.md is `reused` and not `hand-off`; a dispatched prompt is `hand-off`. `steering-rules.md` L29–31 and L62–65 turn on exactly that distinction, and `handoff-rules.md` L3–4 says "Do not read it otherwise." Merging the two skills would force one document to meet both condition sets.

---

# 5. What to keep unchanged, and why

**The criteria/procedure split, stated in every shared file.** It is the precondition for this rewrite. Procedure can move without touching a single criterion, and every criteria file already declares itself procedure-free.

**The membership-test rule with its worked example and the "or any other X" clause** (`steering-rules.md` L108, L116–137). This is the classifier primitive. The rewrite builds on it by definition. The reflected-injection story is the strongest failure evidence in the plugin.

**The shape-not-label rule with its log-call example** (`steering-rules.md` L176, L179–191), and METHOD.md L26–30, which carries the measurement: "'Report any secret written to a log' missed the finding three times out of three. 'Check what every log and error call passes...' found it three times out of three." Under the weak-executor constraint this is the single most valuable rule in the plugin — it is the rule that converts author knowledge into executor-observable features.

**The conditions system and the Applies-when column** (`steering-rules.md` L46–83, L80). Six labels, closed set, per-label procedure, anti-self-report, anti-circularity. A Sonnet executor can run it mechanically. Do not invent a parallel task-type vocabulary alongside it.

**The status table with caller obligations** (`dispatch-protocol.md` L78–86), and its justification at L72–74: "The sequence of a run needs almost no writing. The obligations per status need all of it, because they do not exist unless someone writes them down."

**The Three shapes block** (`dispatch-protocol.md` L109–119). Structurally the best classifier in the repo: test per class, stated default, negative case, escape hatch. Keep it verbatim and extend the class set inside its existing form.

**The baseline gate** (`writing-skills` L72–80). The only thing in the plugin that measures anything. In particular: "Fix a failing baseline or audit by changing the skill. Do not fix it by easing the task or loosening the rules. A pass earned that way measures nothing."

**Step 7's independence requirement with its recorded reason** (`writing-skills` L64–70 + `tests/baselines/writing-skills.md` L35–44). This is adversarial verification, and it was paid for: "The skill this plugin's own tooling produced took it, self-audited, fixed three gaps and missed four that an independent auditor later found, one of them blocking." The rewrite should extend it to `writing-agents`, not relax it.

**The small-change clause and its counter** (`writing-skills` L82–88), including "This skill reached five before an audit noticed." The rule is right and its enforcement is missing. Keep the rule; give the count to a script, per `dispatch-protocol.md` L26–27: "A script makes any determination that runs deterministically."

**The no-weakening clauses in both skills** and `dispatch-protocol.md` L57–61: "the prompt forbids any change that makes a check pass without doing the work the check tests. Weakening a check, editing a test, narrowing a command, deleting a failing test, stubbing the code under test, and adding a skip marker are examples, not the whole list."

**`ste.md`'s dropped-rules table, especially the membership-test exemption** (L54–60): "**The sentence cap, where a membership test needs the words.** A membership test is naturally long... Splitting it puts the test in one sentence and the boundary in another. The category then reads as closed again. Keep the test whole and let the sentence run long." A rewrite that adds many membership tests will collide with the style rules; this exemption already exists and protects it.

**`ste.md`'s honest negative result** (L81–86): "A controlled comparison found no difference in what an agent does... Do not claim it changes agent behaviour. The measurement says it does not." Keep it. It stops the rewrite from spending effort on style as if it were a behaviour lever.

**The Voice rules and the five wrong-actor rewrites** (`steering-rules.md` L201–255), especially "Do not rewrite the second as 'State the capability.' That turns a property into an order, and the auditor then reports on its own writing instead of the target's."

**`lint.md`'s false-pass case** (L47–54): "The command runs, exits clean, and never opens your target. This case looks like a pass. It is not a pass... A lint can report every file up to date. It can do this while it never opens the file you audit. This kind of lint is worse than no lint. It makes a pass that nobody questions."

**The baseline records themselves, including the self-incriminating entries.** `tests/baselines/writing-skills.md` L76–82 records a fix certified as made and not made. That is the input METHOD.md L18–19 demands: "Teach only the failures you observed." A rewrite that cleans these up loses the evidence base for every rule in the plugin.

---

# Three things the rewrite must add that are nowhere in the current material

1. **A shape set larger than three.** `dispatch-protocol.md` names fan out, chain, and establish-then-fan-out. It has no name for adversarial verification, generate-and-filter, tournament, loop-until-done, or classify-and-act — yet `writing-skills` step 7 *is* adversarial verification, its step 1/6 pair *is* generate-and-filter against a baseline, and its gate section *is* loop-until-done. The plugin performs shapes it cannot name, so `writing-agents` cannot produce them.
2. **A cost test for reaching for a harness.** Nothing in `steering-rules.md`, `dispatch-protocol.md`, or either skill states when *not* to fan out, beyond "Agents that modify shared state are not a fan-out case even when the tasks look independent" (`dispatch-protocol.md` L116). There is no rule that parallelism must earn its coordination cost.
3. **A named defence against goal drift.** Self-preferential bias is named and defended in `writing-skills` L66–68. Agentic laziness is partly covered by the baseline gate and by `dispatch-protocol.md` L65–66: "A dispatched task with no collected result is unfinished work, not a hand-off." Goal drift across turns and compaction has no rule anywhere. The nearest thing is `auditing-skills`' `changed` mark (L114–116), which catches a fix that moved a fault but says nothing about an objective that moved.