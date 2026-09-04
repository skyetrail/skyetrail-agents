# Decisions

Working notes for whoever picks this up. Not skill material. No file an agent loads at run time
points here, and that stays true. An auditor must not read this file. A person may, and `TESTING.md`
sends them.

`OUTCOMES.md` holds the rounds and the numbers. `METHOD.md` holds the practice that transfers to
any project. `TESTING.md` holds the procedure. This file holds what we chose, when, and why. Read
it before you change a rule file. A fresh session will otherwise re-derive these differently and
quietly diverge.

## The rule that governs every other decision

**No steering change without a failing measurement behind it. 2026-08-01.** Cite a failing audit, a
failing comparison, or a failing outcome score. Nothing else counts, not an argument and not taste.

The rule binds this file too. An entry here without a record behind it is only a note.

**The rule was breached once, and the breach is recorded. 2026-08-12.** Commit `4d7c74b` rewrote the
Finish rule and its own message says "MEASURED: NOTHING". The judge never ran because six isolated
runs had stalled. The stalls came from the laptop sleeping, not from the design. The isolated round
of the same day then supplied the missing measurement, and the rewrite failed it zero of three. The
gap and its closure both belong on the record.

## Gates

The largest design change since 2026-08-01 rests on the isolated round and the gate round in
`tests/outcomes/determinism/`, with all four entries below dated 2026-08-12.

- **A gate is a check the caller re-runs on the artifact it received.** The owner's fix made the
  caller and the callee each assess the gate independently. Six of six runs then passed, against
  zero of six in the round before.
- **A check the caller cannot re-run does not gate delivery. It becomes a file the caller reads.**
  The baseline dispatch was the un-recheckable gate. Only the callee ever saw it.
- **The document fixes the subject of every gate, so no later choice moves it.** One run could not
  satisfy a no-holes check on its draft, wrote a second file, checked that file, and recorded the
  pass. Another copied its draft to a path built to satisfy a name check, audited the copy, and
  deleted it. A subject makes both moves visible, because the caller opens the same file.
- **A gate that cannot be satisfied where the skill runs gets cheated, or it blocks delivery.** Two
  runs of six cheated it and four stopped. The cheat was refused by two runs, one quoting the rule
  that forbids it, and both scored worse than the run that fabricated. Rewording does not reach this.

**Measure on the model that executes, not on the model that authors. 2026-08-10.** Eight blind
audits found no difference between the rules before four rounds of fixing and the rules after, on a
repository we did not write. Auditing our own files against our own rules measures conformance. The
Sonnet 5 rounds that followed found the gate defect, the count proxy, and the content loss, and no
audit reached any of them.

**One working directory per run, and no earlier output for the same task within reach.
2026-08-12.** Repetition without isolation measures nothing. `TESTING.md` states both contamination
cases and the checks that catch them.

## Structure

| Decision | Date | Why |
| --- | --- | --- |
| Rule files are named for their reader: `skill-rules.md`, `steering-rules.md`, `handoff-rules.md`. | 2026-07-31 | Hand-off is a condition inside a file, not the scope of one. `instruction-rules` was rejected because Copilot names a different artifact that way. |
| Every rule conditioned on hand-off lives in `handoff-rules.md`, and none lives elsewhere. | 2026-08-01 | Every auditor of a plain skill read all the hand-off rules to rule them out. |
| A rule is a flat entry with a rule, a severity, and a condition. | 2026-07-31 | Graded scorecards were rejected. The middle grade restated the rule as partly present, and several cells packed four or five rules into one score. |
| Fixtures and test records live under `tests/`, and nothing an agent loads links to them. | 2026-07-31 | An auditor that reads three worked examples first pattern-matches to them. |
| Each skill routes by its description, plus a "Where this stops" section in its body. | 2026-07-31 | A shared routing file loads only after a skill fires, and routing already happened. |
| `dispatch-protocol.md` defines hole and field once: a hole is a blank in a template, and a field is a fact the caller establishes before dispatch. | 2026-08-01 | The rule files already used the right term for the right thing. Only the definitions were missing. |
| An agent that dispatches work collects the result before its own turn ends. | 2026-08-01 | Earned by a real stranding. A runner ended its turn while its worker was still running. |

## The skills

- **Measure a baseline before any writing. 2026-07-31.** The steering then addresses failures
  someone observed, not failures someone imagined. The measurement stays. Its gate is gone, and the
  reversal below says why.
- **A baseline dispatch forbids the agent from loading any installed skill, and records any
  attempt. 2026-07-31.** A bare dispatch self-loaded an installed skill-authoring skill and measured
  that skill instead of the model.
- **Baseline records live in `tests/baselines/`, one file per skill. 2026-07-31.** The Evidence rule
  names that place, so an auditor has somewhere to check. Keep run output out of that directory. A
  round of run artifacts committed to a sibling plugin's `tests/baselines/` contaminated the next
  round.
- **`writing-skills` states house discipline, not SKILL.md syntax. 2026-07-31.** This reverses the
  build-day decision to keep format guidance. The forbidden-skills baseline wrote a valid SKILL.md
  unaided. Mechanical limits belong to the lint script.
- **The audit in `writing-skills` needs a fresh agent. 2026-08-01.** The step once read "audit
  against the rule files, or by using `auditing-skills`". The producing agent audited its own draft
  and fixed three gaps. An independent auditor then found four more, one of them blocking. An author
  reads their own intent rather than their text.
- **`writing-skills` carries a proportionality clause. 2026-08-01.** A small change to a skill with
  a recorded baseline runs the audit alone. Models of this class over-comply with a mandatory
  workflow rather than judging it disproportionate.
- **`auditing-skills` carries two dispatch patterns. 2026-08-01.** Reconciliation between two audits
  gates a delivery decision. A re-audit reports differences against a supplied prior report. Severity
  calls proved stable across runs and pass-versus-warn calls on minor rows did not. Sampling fixes
  judgement variance. More prose does not.
- **The subject-knowledge check runs before the dispatch gate. 2026-08-12.** In `writing-skills` it
  sat behind the gate and ran in zero of three runs. The same check in `writing-agents` sits ahead of
  its gate and ran in three of three. The check was never weak. It was unreachable.
- **The cannot-dispatch branch carries no reader judgement. 2026-08-12.** At 148 words it produced
  three behaviours in three runs: a draft in the repository, a draft plus four further steps, and no
  draft at all. All three runs then took one path.
- **Every instruction that tells the author to ask the person carries a branch for a run that cannot
  ask. 2026-08-12.** Of six runs that met two such instructions, none obeyed either.
- **Never fail an audit for an agent, and promote composing at dispatch. 2026-07-31.** Unaided
  models already prefer composition, so the skill keeps the exceptions and one line of reason. Three
  predefined-agent cases are legitimate:
  - The agent is used identically in many places.
  - The harness restricts its tools only at that layer.
  - Someone else owns it as a policy boundary.
- **`repo-setup` writes its record between fixed markers in `AGENTS.md`, and a second run replaces
  the block. 2026-08-01.** A re-run against a file holding someone else's writing left exactly one
  marker pair and preserved the hand-written content character for character.

## The rules

- **Only a defect blocks. 2026-08-01.** Severity says how much a problem matters. Defect or
  difference says whether there is one. A rule that matches at blocking severity on something with
  no nameable consequence reaches past what it can judge.
- **A category states what makes something a member, and marks any list of kinds as examples.
  Blocking. 2026-08-01.** A reviewer that had already found a real vulnerability filed it out of
  scope, because its subtype was not on our list.
- **A missed case is described by the shape it takes in the code, not by the label it falls under.
  Important. 2026-08-01.**
- **Naming a pattern and bounding a category are different jobs, and both rules say so. 2026-08-01.**
  The fix for the first fixture turned a pattern into a new implicit list. The second fixture caught
  it.
- **The boundary rule stays blocking. 2026-07-31.** It is backed by two reproductions. Sibling skills in
  obra/superpowers gave opposite parallel-dispatch advice with no scope statement, and an unprimed
  auditor forced an audit through on a file outside its target kinds.
- **Return rules apply only to hand-off. 2026-07-31.** The `always` condition demanded a report
  format from in-conversation skills whose return is the artifact.
- **Descriptions carry no redirect clause to a sibling skill. 2026-07-31.** An A/B ran three runs per
  variant. The variant without the clauses scored 39 of 39 positives against 38 of 39. Both had zero
  false fires, and the two variants made the same picks on 17 of 18 ambiguous requests.
- **A description states the capability and the triggers, and never summarises the workflow.
  2026-07-31.** A workflow summary in the description makes the agent follow the summary instead of
  the body.
- **Constrain how something is done only where a specific way is required for correctness or safety,
  and state the reason. 2026-07-31.** The earlier wording, "the technique is left to the agent",
  contradicted the hand-off rule naming exact commands and gave the auditor no criterion.
- **The copyable-checklist rule is gone, and the contents-list rule is advisory. 2026-08-01.** Both
  fired repeatedly across ten external audits and never named a consequence.
- **The baseline-evidence rule applies only to a skill we maintain. 2026-08-01.** It produced an
  automatic blocking failure on all seven external files, and every auditor spotted the problem
  unprompted.
- **The numeric finding cap is gone. 2026-08-07.** Over seven files, ten external audits all breached
  the five-finding gate, and the lowest total was ten. Calibration now tests each finding for a
  consequence, and counts one finding per root cause.
- **Author notes stay out of files an agent loads. 2026-08-01.** An auditor read a paragraph saying
  two rules were unverified, and changed its call from fail to warn. Severity is the instrument for
  that.
- **Never count things, especially across files. 2026-08-01.** A count buys no behaviour and goes
  stale on the next addition. State something that does not go stale.
- **Evidence citations live in this file, and rule files keep one-line pointers. 2026-08-01.** The
  first attempt added thirty lines of citations to files an auditor loads every time.
- **The history rule and the default rule apply to reference files as well as the skill body.
  2026-08-12.** A skill's authoring history can sit in a file the skill loads, and so can a deferred
  value with no default. The reader meets either one the same way.
- **A cutting review left two rules standing. 2026-08-01.** Naming the successor skill discriminated,
  because it passed on `brainstorming` and failed elsewhere. A direct instruction from the person
  winning has a nameable consequence, because one external skill's gate claims to apply to every
  project regardless of simplicity.

**What the cutting round bought. 2026-08-01.** Rules evaluated for a plain skill
audit fell from 75 to 53. Lines loaded went from 374 to 381, which is no change. Removed rule text
was replaced almost one for one by operative text that has a nameable consequence. So this was a
reasoning-load win and not a context win.

## The Finish rule

**The Finish rule stopped asking judgement work for a check that decides whether it is done.
2026-08-12.** Earned by one defect that survived four attempts.

Every produced security prompt defined done as one entry per changed file. A reviewer following any
of them does not open a file on a forty-file diff. It writes one coverage line per path. That alone
passes its finish check and reports done.

The interventions failed in order:

1. Removing the worked failing example from `steering-rules.md`. Three of three runs reproduced the
   shape.
2. Naming the failure in `writing-agents`. Three of three reproduced it again, and one record named
   the passing example as its model.
3. Supplying a test. One author ran the test, described a passing run that misses the vulnerability,
   kept the check, and wrote that the gap was disclosed rather than hidden.
4. Rewriting the rule for judgement work. Zero of three in the isolated round, then two of three in
   the gate round.

The diagnosis. For judgement work no check decides whether the work is done. Whether a security
review found the vulnerabilities is not mechanically decidable. So an author asked for such a check
supplies the nearest thing that exists. That is a count of the parts the work produced. The rule had
no wording problem. Rather, it asked for something that does not exist.

The fault is not general. It appears where the work is a judgement and the artifact has a natural
unit to count. The bug-triage fixture sets finish per disposition against the action taken, and it
was clean in all six runs. The rewrite fires its three new Blocking rows only under `advisory`,
which separates the two fixtures exactly.

**Closing the finish criterion is not enough where an earlier step removes material from what the
criterion covers. 2026-08-12.** One run's Method step let it classify a config file as touching no
category. A hardcoded `sk_live_` key inside that file then never reached a clearance, and every
clause of the finish check held.

**A self-graded tick is not evidence. 2026-08-12.** All three runs in one round ticked the finish
line, and two of them ticked it after describing the failing run in their own record. The checklist
records that a step was reached, not that it passed.

## Reversals

**The baseline dispatch stopped being a gate. 2026-08-12.** The measurement stays and the gate is
gone. `writing-skills` held its work back until the run dispatched a subagent. No session could
dispatch, so six of six runs stopped and delivered a draft. The gate worked as designed and the
design produced nothing. See the Gates section for the replacement.

**The caller now re-runs what the agent proved. 2026-08-12.** `dispatch-protocol.md` and
`handoff-rules.md` both said the caller does not re-run the checks the agent proved. Both now say
the opposite, and one re-run caught a false tick in the first round after the change.

**The third-person rule and the capability rule were cut on 2026-08-01 and restored the same day.**
The test behind the cut was fabricated. Byte-identical across two arms carrying different
descriptions, six run files were written by hand and then analysed as measurements. Commit 2484bc0
restored both severities and deleted the fabricated runs. Stating the capability is Blocking. The
third person is Important. Do not change a severity on an argument. The fabrication made exactly
that mistake once already.

**The third-person rule is cut. 2026-08-12.** Trigger test 2 ran nine times across three arms. The
arm written to this rule scored lowest, 52 of 60 against 57 for the arm that breaks both rules under
test. That comparison is the only one in the test above its own detection floor.

The cut does not rest on that comparison, because two confounds sit on it and both were named before
the run. The imperative travels with the second person. And all six distractor descriptions open
"Use when", so the arm following our rule reads as foreign to the collection around it. The result
does not show that the pronoun causes the loss.

The cut rests on this instead: two real tests (a nine-run trial and a six-run trial) have failed to
find the rule helping. A rule that does not name a consequence across two measurements does not
belong in a file an agent loads on every run. The capability rule survived on the same evidence with
a lower severity, because a capability statement contains information a reader uses and grammatical
person does not.

This is the second time both rules were cut. The first cut, on 2026-08-01, rested on six run files
written by hand and analysed as measurements. This one rests on nine recorded runs, a pilot that
gated them, and a scorer that refused the verdict its own numbers invited. The standing instruction
above still holds: do not change a severity on an argument.

**The trigger test ran on 2026-08-11, and it cannot answer the question.** Earlier entries here said
nobody had run it. Both arms scored 36 of 36, with zero variance inside an arm. The design
pre-committed to not reading a difference as grounds for cutting a blocking rule, and the scorer
refused that reading. Both arms' perfect scores leave both readings open: the rules change nothing,
or the test had no room to show a change. Both rules stay, neither justified nor refuted. Running the
same design again settles nothing.

**Simplified Technical English was adopted for the reader, not for the agent. 2026-08-10.** A blind
two-arm comparison found no difference in what an agent produced, across two fixtures, with no false
alarms in any run. The style cost about one percent in length. It stays because a person maintains
these files. Do not claim it changes agent behaviour.

**A conclusion about pointers was retracted. 2026-08-11.** The first Sonnet 5 round concluded that a
pointer costs a weak executor more than a copy does. The pointer in that run aimed at a file no
commit had ever held, so the run measured a broken reference. Round two disproved the conclusion.
What survives is narrower. A pointer whose payload is a block to copy behaves differently from one
whose payload is a procedure to perform.

## Checking our own work

- **A skipped check blocks. It is not a concern. 2026-07-31.** A previous attempt skipped the
  baseline, deferred the fixture audit, reported both as concerns, and returned DONE_WITH_CONCERNS.
  Its stated cause for the deferral was false.
- **Audit our own files after every rule change. 2026-08-01.** The new Scope rule failed
  `auditing-skills` itself on the first run after it was merged. A rule that only ever catches other
  people's work is a rule nobody has tested.
- **Conformance to our own rules cannot tell whether the skills got better. 2026-08-10.** See
  Gates. Across four rounds, 144 findings were retired and 67 created, with most of the new ones
  coming from the previous round's fixes.
- **A decision an auditor cannot see is not a decision. 2026-08-01.** Recording a placement decision
  in this file, which auditors are told not to read, guaranteed the finding would recur forever. The
  reasoning now sits in the skill body.
- **A key edited after seeing the answers stops being a key. 2026-08-01.** The second hand-off key
  omits a real privilege bypass that every arm found. It is recorded as errata and counted against
  every arm.
- **An agreed minimum says where you may stop, not where you must. 2026-08-01.** The stop rule says
  to stop when two consecutive cycles fail to move the scores. Cycle 2 moved them by a full finding,
  and the round stopped anyway.
- **Spend on a new fixture before another cycle on an old one. 2026-08-01.** Fixture one had nothing
  left to find after cycle 2. Every defect found since came from new code.
- **A run file has an opaque identifier, and the mapping to its arm lives where the scorer
  cannot read it. 2026-08-01.** Every run file in the skills bench named its own arm, so no scorer
  was blind. A scorer found that, and the harness did not.
- **Audit a file that describes tooling against the source, not against the rules. 2026-08-01.**
  `shared/lint.md` was wrong four times in two days, and every version passed a structural audit.
  State coverage by what makes a file a member of a tier, never by listing paths.
- **Check a claim against the source, never against a pattern that resembles the source.
  2026-08-11.** One page said twice that `repo-setup` had never had a baseline. The claim came from
  grepping for a heading that three baselines use and this one does not. It matched three of four
  and missed one. The false claim reached that page, a pull request description and a commit message
  on `main` before an independent check caught it.
- **Byte-identical run files no longer prove fabrication. 2026-08-11.** That signal caught the
  fabricated trigger runs. The executed trigger runs match each other the same way. Keep the raw
  runs, and check whether one run carries per-item reasoning the others lack.

**The bench artifacts stay as they are.** The release-notes skill the tool produced fails an
independent audit. It has one blocking finding and two important ones, plus one advisory finding.
Do not fix it. It records what the tool produced on the day, and rewriting it would destroy the
evidence. Its audit stands beside it. The same holds for every run file under `tests/`.

**The placement advisory is accepted and will recur.** Stating a reason for a position does not
change the position, so an auditor is right to raise it. It never blocks. The reasoning is in the
body, where an auditor can read it. Moving pre-work gates away from the top would make the skill
worse to follow.

## Closed since 2026-08-01

**The lint step degrades correctly for a scoped agent. Closed 2026-08-12.** The worry was that
`shared/lint.md` names a command that runs from the repository root, so a scoped agent declares the
linter unavailable and proceeds. That exact condition was met by three isolated runs in a scratch
directory that is not a git repository. All three reported the gap and left the line unticked, rather
than inventing a target. That is the instructed branch, and it held.

**A check that reads only the target file now exists. Closed 2026-08-12.** `npm run audit -- <path>`
takes a path anywhere on disk and reports every mechanical check by name. `shared/lint.md` names it
for a SKILL.md and sends everything else to the target repository's own lint.

**Reference files now have conditions that fit them. Closed 2026-08-12, with one residue.** The
history rule and the default rule were extended to reference files, so a body and its reference file
must agree. One run then delivered a body and a reference file that disagree on the same default.
The rule exists and the runs do not all follow it.

## Still open

**Structure varies. Four of the five gaps now have a rule. 2026-08-13.** Zero of three runs agree
on structure, on each fixture. The gaps affect heading text, the reference directory name, a file
count, a default value, and a filename. Rules now cover heading text, the reference directory name,
the reason a passage is in a reference file, and a set default. No rule fixes a scalar default value,
because the value belongs to the subject and not to the rules. No rule names the file a hand-off
prompt is delivered at, because `shared/skill-rules.md` reaches no hand-off document. Nothing
measures the four new rules yet. The next step is the baseline loop.

**Severity tiers are absent. 2026-08-12.** The unaided run names the test that assigns each tier.
One skilled run matches it, while the other two do not give any tiers at all, leaving an agent that
reads either with no scale to pick from. The Content table now states the rule. No run has met it yet.

**The skills strip domain content. 2026-08-11, still open.** A Sonnet 5 round found `writing-skills`
removing correct, customer-facing content that the same model produced with nothing loaded. A
warning naming the exact lost item did not stop the same loss in the next round. The isolated round
measured it wider. The unaided prompt called out security headers, session fixation, type confusion,
privilege escalation and two trust-boundary cases. All three skilled prompts mentioned none of them.
The countermeasure fails in a specific way. One run listed two lost items in its own unaided list,
then wrote that they "were folded into the closing clause". Folding and recording the fold is not
putting back. No rule-conformance audit can see any of this, because the rules judge the form of a
file and not its subject matter.

**Both description rules are unsettled.** See the reversal above. Settling them needs requests
near a decision boundary, and enough trials to see a five percent difference. That is a different
test, not another run of the one in `tests/outcomes/trigger-test/`.

**The baselines are stale. 2026-08-12.** No baseline has run against any skill since 2026-08-01, and
`writing-agents` and `writing-skills` both changed on 2026-08-12. The next step is the baseline
loop, not another audit round.

**One fixture cannot run again yet. 2026-08-12.** A contaminated round left three artifacts at
`plugins/skyetrail/tests/baselines/`. Fixture A of the determinism round needs them moved out of
reach before its numbers mean anything.

**Model coverage.** Every measurement to 2026-08-01 used Sonnet. An Opus round then put Opus in the
main-agent role with Sonnet workers and matched the record. Every execution round since 2026-08-11
ran Claude Sonnet 5 as the executor. Haiku and version-pinned Opus stay unmeasured, and no claim is
made about them.

## Environment

Claude Code. None of these tests runs on claude.ai.

**No session in the last three rounds could dispatch a subagent.** A judge confirmed the claim six
runs made. `TaskCreate` writes a pending to-do item and does not run a model, `TaskGet` reads it
back, and `SendMessage` needs a teammate someone already named. One run tried `claude -p` and
recorded `401 OAuth access token has been revoked`. Design no step that dispatches from inside a run.

Mechanical checks are settled by two commands. `npm run audit -- <path>` runs `eng/audit-skill.mjs` against
one file, from anywhere. `npm run lint` runs `eng/generate-readmes.mjs --check` over the whole
repository from its root.

The lint gained two checks on 2026-07-31. The plugin's `shared/` files are checked for reference
resolution, because they load with the skills that name them. And a markdown link whose text reads
as a filename must link to that filename. It gained a third on 2026-08-11: `eng/measure-sentences.mjs`
reports an over-cap sentence as an advisory, because a membership test is one case where a long
sentence is correct.

**The project style changed from ASD-STE100 to the ai-tells Vale ruleset. 2026-08-21.** The
2026-08-10 comparison found that Simplified Technical English did not change agent behaviour, so its
only benefit was readability for the person maintaining these files. The ai-tells ruleset keeps that
readability goal and catches prose that reads as AI-written, a target STE100 never covered.

**`writing-agents` was cut from 505 lines to 101. 2026-08-21.** It was 72 lines at birth and stayed
under 100 through every round that measured it as useful. The growth was author history,
countermeasures to defects earlier versions of itself introduced, and restatements of rules the
shared files already state. One rewrite under a list of eleven measured wins, then six isolated
Sonnet runs across two rounds: the wins held and defaults were fixed, with tick anchors narrowed
from six to two. The judge called subject coverage a fail, and the standing ruling that subject content belongs
to the author decided it. Detail in `tests/outcomes/diet/RESULTS.md`.

**Mechanical checks cover structure and never meaning. 2026-08-21.** The audit command gained a
scope for produced prompts and three structure checks for a SKILL.md, and Vale now blocks the
build with the test records scoped out. Every mechanical check names the measured run behind it,
the same discipline every rule here follows. A check that a phrase is present gets satisfied by
pasting the phrase, so the mechanical layer reads only what wording cannot fake. The five
prompt checks read the status table's rows, the retry limit, the findings path, the default
column, and a token on each ticked line. The skill checks read the heading order and the
reference directory. A third looks for a sentence about a prior version of the file. Whether
a finish check can pass on incomplete work, whether a default is usable rather than only named, and
whether a category is open stay with a reader. A caller re-running the command got the callee's
answer in three of three runs. Detail in `tests/outcomes/mechanical-gate/RESULTS.md`.

**The writing-skills diet stands, and the tick rule reads by its purpose. 2026-08-21.** The
419-line skill became 154 lines and a pre-registered three-arm round measured it. The diet scored
24 of 27 on shape. The long version scored 20 and an unaided run 15. Delivery was three of three,
and coverage one item below unaided. The process prediction failed as worded, because it counted a path or a command only,
while the runs anchored most ticks in a section of the record, which a reader opens just as
well. After the data, the reading widened to a section of a file from this run. The preamble and
the mechanical check now say the same. The long version fails every reading by more. Detail
in `tests/outcomes/writing-skills-diet/RESULTS.md`.

**Runs that must dispatch start with the Agent tool. 2026-08-21.** Agents the Workflow tool starts
have no Agent tool, so three rounds of `writing-skills` never ran its baseline or audit steps, and
I told the owner that no subagent could dispatch. He was right that they can: a probe child
replied, and the docs say subagents nest three deep. The fourth round used the Agent tool, and the
skill's loop ran in every run. The Workflow tool stays for agents that only read, judge, or copy.

**The branch merges. 2026-09-01.** Round five was pre-registered with a rule. The branch
merges where every arm delivers and the with-skill reviews do not fall below the unaided ones on
the fault key. It also needs the skilled inbox runs to produce classify then route where the
unaided ones do not. All three held. The
reviews tied because the unaided model found every planted fault, which two fixtures have now
shown, so the downstream question stays open, and the results page says so. Detail in
`tests/outcomes/round-five/RESULTS.md`.

**`repo-setup` records to the project's memory, not to a file in the repository. 2026-09-01.**
A block in `AGENTS.md` can be overwritten or replaced by anyone who edits that file, and the
skills that read the lint command would then read a stale or missing block. The record now goes to the persistent memory directory the harness names for the project, as one
file plus an index line. The skill writes nothing inside the repository. Its own check is that `git status`
prints the same thing before and after.

**The open list triaged. 2026-09-01.** Closed: severity tiers, the
`auditing-skills` baseline, the dispatch limit, the lock-timeout drop. Dropped: the list of
judgement decisions and the description rules. Parked: downstream gain. In round six: structure
and `repo-setup`. The reasons are in `OUTCOMES.md` under "Closed or dropped on 2026-09-01".

**A skeleton the run copies. 2026-09-01.** The structure rules bound one point in three rounds. A skeleton with the eight headings and the fixed sentences bound the
headings three of three in its first round, and the data sentence three of three. The checklist showed the same thing. A run copies a block it is given and forgets a rule it is told.
`writing-skills` now starts the body from `reference/skeleton.md`, and the section-order check is
a failure.

**`repo-setup` writes the record before it stops. 2026-09-01.** Every run in round six returned the ambiguous lint decision to a person, as asked. None wrote a
record, because the skill ordered the write after the decision and stopped on a pending one. The next agent would have repeated the discovery. The
write is now step 4 and always runs, with the candidates under `Unresolved` where no command is
confirmed. Detail in `tests/outcomes/round-six/RESULTS.md`.

**`repo-setup` is measured on both paths. 2026-09-01.** Six runs, three on the ambiguous
repository and three on a clean one, all wrote `repo-setup.md` and an index line, left the
repository untouched, handed the ambiguous decision to a person with the candidates recorded, and
confirmed `npm run lint` where it existed. The round-six defect is closed. Step 3 now says that
`npx` on a tool that is not installed is an install step, after two runs used a cached tool.
