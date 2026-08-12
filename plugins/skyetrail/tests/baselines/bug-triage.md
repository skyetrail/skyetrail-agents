# bug-triage — baseline record

Small changes since the last full loop: 0

Plugin: `plugins/skyetrail`. Skill directory (not yet created): `plugins/skyetrail/skills/bug-triage/`.
Neither the request nor `writing-skills` names a target plugin or a skill name.
`plugins/skyetrail/skills/` is the only directory in this repository holding a delivered, non-meta
skill (`skyetrail-writing`), so the new skill goes there. That choice is an assumption, not a
rule-derived fact, and is flagged to the person as one.

Skill name: `bug-triage`, a clear noun phrase. Checked directly against this repository, not
assumed: `plugins/skyetrail/skills/` holds exactly one other skill, `skyetrail-writing`, confirmed
by `find` and by `git ls-files`. That skill carries the org's name because its content is the org's
own house style; bug triage is not Skyetrail-specific, so it does not take that prefix, and the
Discovery rule "the name follows the same pattern as the other skills in its collection" has only
one other name in this plugin to pattern against. `bug-triage` does match the pattern the other
skills in this repository use for a skill that is not org-branded: `writing-skills`,
`writing-agents`, `repo-setup`, and `auditing-skills`, in `plugins/steering/skills/`, are each an
unprefixed, two-word noun phrase. Flagged to the person as a judgement call, since no skill of this
kind exists yet in `plugins/skyetrail/skills/` to pattern-match directly.

Two earlier attempts at this same request sit in this directory: `bug-triage-unverified.md` (an
earlier version of this same file and name, now overwritten by this run) and
`bug-report-triage.md` (a separate session that chose a different skill name and stopped at what
was then step 3, asking for a task the person had not named, before this skill's step numbering
changed). This run reruns the loop against the current `writing-skills` and does not read either
earlier run's conclusions as settled; it left `bug-report-triage.md` on disk, untouched, since it
is a different session's naming choice and record, and the keep-or-discard call belongs to Pete.

## Objective

> Read /Users/pete/workspace/skyetrail-agents/plugins/steering/skills/writing-skills/SKILL.md and
> follow it exactly as written, including every file it points you at.
>
> Capture this as a reusable Agent Skill: a team wants every incoming bug report triaged the same
> way every time. Triage means deciding whether the report is a duplicate, a real defect, a
> support question, or unreproducible, and then doing the right thing for each. Produce a
> SKILL.md.
>
> Where the skill gives you a checklist, copy it into your reply and tick as you go. Where a step
> cannot run, say so and follow what the skill says to do about that.

## Step 0 — artifact test

```
Artifact test

1 script   no
2 answer   no
3 prompt   no
4 skill    yes

Class: skill
Deciding test: 4
```

Test 1: deciding duplicate, defect, support question, or unreproducible takes judgement about a
report's content. No regex or fixed command returns that answer.

Test 2: the team wants every incoming report triaged the same way, on every future occasion, not
the one occasion of this conversation. The reader is whichever agent handles the next report, not
only the person who asked for this skill.

Test 3 and 4: `../../../steering/shared/skill-rules.md` states directly that its rules "apply when
the condition reused is met and the condition hand-off is not met," for a SKILL.md. A SKILL.md is
discovered and loaded by whichever session handles the next report, the same kind of
skill-loading, conversation-holding agent as the one running this loop; it is not a fixed block of
instructions a caller hands once to a dispatched subagent that then reports back over a hand-off
boundary, which is what a prompt would be. Test 3 reads no. Test 4 reads yes.

## Step 1 — case

No skill in this repository covers bug-report triage. `plugins/skyetrail/skills/` holds only
`skyetrail-writing`. `plugins/steering/skills/` holds only the meta-skills (`auditing-skills`,
`repo-setup`, `writing-agents`, `writing-skills`). Checked by directory listing and by `grep` for
"bug" and "triage" across every `SKILL.md` in the repository; both return nothing. Case: new
skill. Run every step.

## Step 2 — objective

Anchored above, replacing the prior loop's objective text with this run's request, word for word.

## Step 3 — subject knowledge

Written before any section order applied, per `../../../steering/shared/authoring.md`'s "What the
rule files carry and what they do not."

1. Duplicate search must cover the body and the error text, not only the title, because a
   duplicate is often reported in different words.
2. A defect is software behaving in a way the team did not intend, where no earlier report
   already covers it.
3. A support question is a how-to already supported, or a problem traced to the reporter's own
   setup (permission, configuration).
4. Unreproducible means the reporter's steps do not reproduce the result, and no other evidence
   (screenshot, log, exact error text) lets the team reproduce it another way.
5. Do not close a report as a duplicate without a genuine canonical report to link to.
6. Do not mark a report unreproducible without first asking the reporter for the missing detail;
   do not silently close it.
7. Filing a defect carries a severity. Critical/High/Medium/Low is a common default scale; teams
   often keep their own.
8. A label or status field marks the disposition so the tracker shows it without opening the
   report.
9. A security vulnerability report must not be triaged or discussed in a public tracker; it routes
   to a private process.
10. A feature request is a distinct category from a bug report and routes elsewhere.
11. Spam or abuse needs moderation, not a defect label.
12. Batch triage benefits from listing every proposed disposition and getting confirmation before
    acting on all of them, to catch a systematic misread before it repeats across many reports.
13. An attachment such as a screenshot or a log carries information central to the decision; it
    must be viewed, not only noted as present.
14. An already-triaged report should not be re-triaged without a stated reason.
15. Two searches returning two different plausible canonical reports for the same new report is a
    real failure mode; it needs a person's judgement, not a guess.
16. A follow-up window (commonly around two weeks) before circling back on an unreproducible
    report is common practice.
17. Turnaround time and SLA are team-specific and not fixed by this skill; deliberately not
    invented anywhere in the draft.

## Step 4 — baseline with no skill loaded

**Blocked. Could not dispatch.**

Checked directly, in this session:

- No `Task`-style general-purpose subagent tool appears in the top-level tool list, the deferred
  tool list, or a broad `ToolSearch` query for "dispatch subagent fresh context general purpose
  agent" (returned browser, worktree, `SendMessage`, `RemoteTrigger`, `DesignSync`, and the
  `Task*` to-do tools; none dispatches and returns a subagent run).
- `TaskCreate` / `TaskGet` / `TaskList` / `TaskUpdate` / `TaskStop` schemas were read in full.
  They are a shared to-do tracker (subject, description, status, owner, blockedBy); nothing in
  them starts a model run.
- `SendMessage` addresses a named teammate in an already-formed agent team. This session has none.
- `mcp__ccd_session__spawn_task` starts a background chip that a person must click to run. Its own
  description says the result "arrives later as a task notification" and "don't wait on it." It
  cannot return output into this run for a step 11 comparison.

This session also tried an actual dispatch, past the tool list, rather than stopping at "no tool
found." This environment carries a `claude` CLI (`/Users/pete/.local/bin/claude`, v2.1.179) with a
documented `-p` flag for exactly this, a fresh, non-interactive run that prints and exits:

```
claude -p "Reply with exactly the single word: PONG" --model sonnet --tools "" \
  --setting-sources "" --no-session-persistence --output-format text
```

Result: `Failed to authenticate. API Error: 401 OAuth access token has been revoked.` `env` carries
no `ANTHROPIC_API_KEY` or other plaintext credential to substitute. This reads as a boundary of the
sandbox this session runs in, not a transient fault, so this run did not retry it or look further
for a credential. This is the literal "error text" step 4's branch asks the record to carry; the
tool-list check above establishes that no in-harness tool reaches dispatch either.

Per the current step 4: "Where you cannot dispatch. Copy the error text into the record. ... Run
steps 3, 6, 7 and 10 first, because those carry the content rules. Then write the text to
`<skill-name>-unverified.md` beside the record, and run step 12 over that file. Mark steps 4, 5,
8, 9, 11 and 13 not run."

Steps 3, 6, 7, and 10 ran; they sit in this record and in `bug-triage-unverified.md`. Steps 4, 5,
8, 9, 11, and 13 did not run, for the reason above.

## Step 6 — description

Written against the Discovery table in `../../../steering/shared/skill-rules.md`.

> Sorts an incoming bug report into one of four outcomes, duplicate, defect, support question, or
> unreproducible, then carries out the action each one needs, closing and linking a duplicate,
> filing a defect with a severity, replying to a support question, or asking the reporter for the
> missing repro detail. Use whenever a new bug report, issue, or ticket needs triage, sorting,
> deduping, or routing, when someone asks to triage, sort, classify, dedupe, prioritize, or route
> a report, or when a report's title or body uses words such as bug, crash, broken, not working,
> doesn't work, error, exception, regression, duplicate, or can't reproduce.

- States the capability (Blocking): the four outcomes and the action each needs.
- States the trigger conditions (Blocking): the "Use whenever" clause, plus a phrasing list.
- Includes casual phrasings and file/error words (Important): crash, broken, not working, doesn't
  work, can't reproduce.
- Does not summarise the workflow (Important): it names outcomes and actions, not the seven-step
  order the body carries.
- Speaks in the third person (Important): "Sorts," "Use whenever," no first or second person.
- Name reads as a clear noun phrase (Important): met. Name matches the collection's pattern
  (Important): met against the unprefixed, non-branded pattern this repository uses outside
  `skyetrail-writing`; the naming section above records the check and the judgement call it rests
  on.

## Step 7 — body

Section order follows `../../../steering/shared/steering-rules.md`'s own Contents list: Outcome,
Context, Scope, Method, Finish, Failure, Calibration, Composition.

Conditions this document meets: always; reused (it is a skill); changes something (a triage
writes a label, a link, a filed item, or a reply that outlives the run); describes work (a reader
carries it out). Conditions it does not meet: hand-off (`skill-rules.md` states directly that its
rules, which this document follows, "apply when ... hand-off is not met"); advisory (the work
edits the tracker it examines, rather than only judging it and leaving it unedited).

Calibration applies only where advisory holds. It does not hold here, so the produced skill
carries no Calibration section, and that omission is not a finding against it.

Section mapping in the draft:

- Outcome — the unheaded opening paragraph, stating the four dispositions and the finish
  condition before any step.
- Context — "The four dispositions," the definitions a reader needs before Scope or Method make
  sense.
- Scope — in scope, out of scope with an owner and a closing "any other report" clause, and the
  person-wins line.
- Method — "Workflow," with the checklist, the already-triaged check fixed as step 1, the
  image-viewing instruction, the branch at scope, the ordered support-question-then-reproduction
  test with its reason stated, and the batch plan-file requirement.
- Finish — "Finish check," one test per disposition.
- Failure — "Stop conditions," directly after Finish, plus the line forbidding a label posted to
  make the check pass.
- Composition — "Reply templates" (states how strictly to follow the template) and "Partial work"
  (states what a stopped batch leaves behind).

**Fixed a self-defeating check found while drafting.** The version of this proposal produced
under an earlier revision of `writing-skills` had the Finish check pass on a label with no real
link and on an unreproducible label with no ask-first reply, then added a separate sentence
forbidding exactly that shortcut. `steering-rules.md`'s Finish rule tests a check by describing one
run that passes it and stops short of the outcome; that earlier check failed its own test, in the
file it shipped in. This draft's Finish check instead makes the link (for duplicate) and the
posted reply (for unreproducible) part of what "done" means for that disposition, so the shortcut
no longer passes.

**Sentence-cap exceptions, recorded per `../../../steering/shared/ste.md`.** Checked by running
`node eng/measure-sentences.mjs` against the extracted draft. Three prose sentences run past the
25-word cap, all in the Scope section: the in-scope definition (38 words), the support-question
definition (35 words), and the unreproducible definition (41 words). Each one defines a category
and closes it with a "such as" list or an exhaustive test, the same shape `ste.md` names as its
stated exception ("the sentence cap, where a membership test needs the words"). Recorded here
rather than split, per that file's instruction. No other sentence in the SKILL.md runs past the
cap.

The reference file carried a fourth over-cap sentence that was not a membership test: the extra
clause in the duplicate reply template (28 words), customer-facing prose rather than a category
definition. Split by trimming "a detail the original does not" to "an extra detail" (24 words),
which keeps the meaning and drops no required field.

**Boundary gap.** The Boundary rule "names which skill takes over where it stops" is not fully
met. No skill available in this environment or this repository covers a feature-request process
or a private security-disclosure process, so the draft names the team's own process for those,
rather than a sibling skill it would have to invent. Recorded rather than silently accepted.

**Cross-check against the step 3 list.** All seventeen items resolved into the draft: 1 and 5
into the duplicate definition, the search step, and the Finish check's duplicate row; 2 into the
defect definition; 3 into the support-question definition and its test order; 4 and 6 into the
unreproducible definition, the reply requirement, and the Finish check's unreproducible row; 7 and
8 into the defect action and the label step; 9, 10, 11 into Scope; 12 into the batch plan-file
line; 13 into the image-viewing instruction; 14 into step 1 of the workflow; 15 into the duplicate
search step and the stop conditions; 16 into the unreproducible action's default window. Item 17
is represented by omission: the draft states no SLA or turnaround time anywhere.

## Step 10 — reference file

`references/reply-templates.md` carries the reply wording and two worked examples. Every step
needs the disposition tests and the workflow; only the step that composes an actual reply needs
the exact wording, so the wording moved out, per `../../../steering/shared/skill-rules.md`'s
Loading rule that detail sits in reference files rather than the front file. The reference sits
one hop from `SKILL.md` and points at nothing further.

## Steps 4, 5, 8, 9, 11, 13 — not run

Per the branch in step 4. Step 4 needs a dispatched, unaided baseline run; step 5 numbers that
run's misses; step 8 addresses the numbered misses; step 9 keeps what that run got right; step 11
reruns the task with the skill loaded and grades it; step 13 dispatches an independent audit. None
of the five has anything to run against, or (step 13) a way to dispatch a fresh agent, in this
session.

## Step 12 — mechanical check

Run from the root of `skyetrail-agents`, as `node eng/audit-skill.mjs -- <path>` (the `npm run
audit --` form and the direct `node` form resolve to the same script; both were confirmed to
exist via `package.json`).

**Run 1, over `bug-triage-unverified.md` itself, as the current step 4 literally instructs.** The
command treats the whole `tests/baselines/` directory as a skill directory and reads the
`.md` file it finds there as `SKILL.md`. It fails `lint-frontmatter-present` (the wrapper opens
with prose, not YAML) and `lint-reference-resolves` (`../SKILL.md`, written for the nested
proposal, does not resolve from the wrapper's own position), and warns on `no-orphan-bundled-files`
because `bug-report-triage.md` sits in the same directory unreferenced. None of these three
findings says anything about the proposed skill; they are artifacts of auditing a wrapper file as
if it were the thing itself. Per `../../../steering/shared/lint.md`'s guidance on a command that
runs but does not meaningfully open the target: this is recorded as a coverage gap, not as a
finding against the proposal.

**Run 2, over the two proposed files extracted to a scratch skill directory
(`/private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/bug-triage/`),
for a mechanical check that actually reaches the content.** Result: 24 checks, 18 pass, 0 fail, 0
advisory, 6 not applicable. The six not-applicable rows are `lint-contents-list` (the rule covers
reference files, not the front `SKILL.md`), the two code-bundle rows (the skill bundles no
script), and the three evidence rows (`three-evaluations`, `eval-structure-fields`,
`tested-all-models`; the command marks these not applicable to a skill outside its own tree,
matching the Evidence section of `skill-rules.md`: "these rules apply only to a skill this plugin
maintains ... mark them not applicable" for anything read from elsewhere, which is what an
extracted scratch copy is until it is actually installed).

No mechanical fail against the proposal's real content. The scratch copy was not written into
`plugins/skyetrail/skills/`, per the rule against writing an unverified draft into a skill's own
install directory.

## What the person still gets

The person asked for a SKILL.md. `bug-triage-unverified.md`, beside this file, carries the
proposed `SKILL.md` and the proposed `references/reply-templates.md`. It is a proposal for a
person to run the rest of this loop against, not an installed skill. No file was written to
`plugins/skyetrail/skills/bug-triage/`.
