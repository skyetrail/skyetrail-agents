# Decisions

Working notes for whoever picks this up. Not skill material. Nothing links to this file and it
should stay that way.

These skills were designed in a long conversation. The files carry the result. This carries the
reasoning, because a fresh session will otherwise re-derive these differently and quietly diverge.

## Settled

| Decision | Chose | Rejected | Why |
| --- | --- | --- | --- |
| Rule file name | `steering-rules` | `handoff-rules`, `instruction-rules` | Hand-off is one of the conditions inside the file, not its scope, so anyone writing a skill never opens it. Instructions files are a named artifact in Copilot, so that name reads as rules for writing those. |
| Rule format | Flat entries with rule, severity, condition | Graded 0 to 2 scorecards with a pass mark | The middle grade was the rule restated as partly present, which a model works out for itself. Several cells had four or five separate rules packed into one score. |
| Rule file count | Two files | One combined file | `writing-agents` has no use for the skill rules. A single file would load them and then need an instruction to ignore them, and an instruction to skip part of a file means the boundary is wrong. |
| Routing between the three skills | Descriptions, plus the "Where this stops" section in each body | A shared routing-note file | A note in the shared directory is only read after a skill has loaded, by which point routing already happened. |
| Fixture location | `tests/`, linked from nothing | Alongside the rule files | Fixtures loaded on every audit, and an auditor that reads three worked examples first pattern matches to them. |
| Named agents | Promote composing at dispatch. Never fail an audit for a named agent. | Enforce it | Three cases are legitimate: used identically in many places, the harness enforces a tool restriction only at that layer, someone else owns it as a policy boundary. |
| Format guidance in `writing-skills` | Keep it | Drop it, since Anthropic's page says you do not need a writing skills skill | Local observation is that 4.x and 5 class models write skill syntax poorly in practice. This is a house fact contradicting general guidance, which is the content a skill should carry. Marked below as the first thing to measure. |
| Baseline position | Step 1, before any writing | A final verification step | Running it first means the skill addresses failures that were observed rather than guessed. |

## Open, with a position

**Redirect clauses in descriptions.** Each description currently ends by naming a sibling skill,
such as telling the reader to use `auditing-skills` instead when checking without changing.
Recommendation was to cut them, because descriptions are the trigger, skills undertrigger more
than they overtrigger, and the same information is already in each body. Anthropic's page never
mentions cross-referencing and all three of its example descriptions are purely positive, which is
weak evidence against rather than proof. Kept pending the A/B in `TESTING.md`.

**Boundary rules marked blocking.** `skill-rules.md` marks "the skill says what it does not cover"
as blocking. That rule is ours, not Anthropic's. It came from one observed failure, where two
sibling skills in obra/superpowers gave opposite advice on parallel dispatch and neither
description said which scope it was in. Blocking is a strong severity for one observation.

**What belongs in a description.** Anthropic's page says both what the skill does and when to use
it. The superpowers `writing-skills` skill says when only, never what, with a specific claim that
a workflow summary in the description makes the agent follow the summary instead of the body.
Current position splits these. Capability and triggers are in. A workflow summary is out. That
split is in `skill-rules.md` as three separate entries.

**Whether the format guidance earns its place.** Anthropic's page states plainly that models
generate properly structured SKILL.md content without a skill to help. Local experience says
otherwise. The baseline comparison settles it. If a subagent with no skill loaded writes correct
frontmatter and structure unaided, cut steps 2 and 3 of `writing-skills` to the house-specific
parts and the skill gets much shorter.

## What went wrong on the previous attempt

A run in Kiro produced most of this and had to be reverted. Worth knowing so it is not repeated.

- It wrote Kiro steering documents into `.kiro/steering/` instead of Agent Skills. Kiro does not
  read `.claude/` at all, so the two are not interchangeable. The target is the Agent Skills
  standard inside the existing plugin.
- It merged the two rule files into one, which forced an instruction to ignore half of it.
- It put the fixtures among the reference files, so they loaded on every audit.
- It named the steering rules file after one of its conditions.
- It skipped the baseline comparison and deferred the fixture audit, reporting both as concerns
  rather than as blocks, and returned DONE_WITH_CONCERNS. A check that did not run is not a
  concern.
- The stated cause for the deferral was that it could not read the fixture URLs. The URLs read
  fine. Treat stated causes for skipped steps with suspicion.
- It never wrote a build report.

It did one thing right that should be preserved. It extended the existing lint script rather than
writing a second one.

## Environment

Claude Code, so subagents are available and the baseline comparison can actually run. `claude -p`
is available, which the skill-creator description optimiser needs. An existing agent plugin is the
target. An existing lint script exists and was extended once already. The lint script is built
into this repository's README generator and runs as `npm run lint` from the repository root;
`shared/lint.md` names it, and the skills fall back to saying so when the repository is absent.

## Resolved in the 2026-07-31 test round

Evidence for each is in the repository's TEST_REPORT.md and in `tests/baselines/`.

- **Redirect clauses: cut.** The A/B ran, three runs per variant. Variant B matched or beat A on
  every measure: 39/39 versus 38/39 on positives, zero false fires both, and the same picks on 17
  of 18 ambiguous classifications. The clauses were removed from all three descriptions.
- **Format guidance: the model has the format.** The forbidden-skills baseline wrote a valid
  SKILL.md unaided. Steps 2 and 3 keep only the house discipline; no syntax teaching was added,
  and mechanical limits belong to the lint script.
- **Boundary rules marked blocking: kept blocking.** An unprimed auditor, pointed at a file
  outside its two target kinds, forced the audit through. That is a second reproduction of the
  failure the rule exists to prevent.
- **Return rules rescoped to hand-off.** The `always` condition made the Return cluster demand a
  report format from in-conversation skills whose return is the artifact, which generated
  blocking noise on every audited file. This is a condition change inside the settled flat
  format, not a format change.
- **Calibration.** All three audits exceeded the five-finding gate (9, 9, 16). The counting rule
  (one finding per root cause, dependent rules not applicable) went into auditing-skills, and the
  dependent-rule line into steering-rules.
- **Baselines are contaminated by installed skills.** A bare baseline dispatch self-loaded an
  installed skill-authoring skill. Baseline dispatches now forbid skill use and record the
  attempt if the agent reaches for one anyway.
- **Baseline records live in `tests/baselines/`, one file per skill,** named by the Evidence rule
  so an auditor has a place to check, and linked from nothing so they never load with a skill.

## Changed in review, 2026-07-31

- **The Method rule "The technique is left to the agent" was reworded.** As written it
  contradicted "The exact commands are named" for hand-off documents, banned justified
  low-freedom instructions such as a fragile runbook's exact command, and gave the auditor no
  criterion. It now reads: constrain how only where a specific way is required for correctness
  or safety, with the reason stated; everything else stays with the agent. No audit had misread
  the old wording, so this fixes a latent defect, not an observed one.
- **The lint gained two checks from review feedback:** the plugin's `shared/` files are linted
  for reference resolution (they load with the skills that name them; `tests/` and working notes
  stay excluded as historical), and a markdown link whose text reads as a filename must link to
  that filename.

## Class 5 fit, 2026-07-31

An assessment of the skills against current Anthropic models, drawing on the recorded rounds,
produced four changes and a caveat.

- **auditing-skills gained two dispatch patterns.** Two audits with reconciliation for a ship
  decision, since severity-level calls proved stable across runs while pass-versus-warn calls on
  minor rows did not, and sampling is the fix for judgment variance that more prose is not. And
  a re-audit mode that reports differences against a supplied prior report instead of
  re-deriving every row.
- **writing-skills gained a proportionality clause.** A small change to a skill with a recorded
  baseline runs the audit alone; models of this class over-comply with mandatory workflows
  rather than judging them disproportionate, so the cheap path has to be written down.
- **The compose-at-dispatch argument was cut to its conclusion.** Unaided models of this class
  already prefer composition; the skill keeps the exceptions and the one-line reason, which are
  the house-specific parts.
- **The "because" clauses the Method rule flagged were added** in writing-skills and
  auditing-skills.
- **Caveat, recorded rather than fixed:** every measurement so far is sonnet. No cross-model
  evidence exists, and none is claimed. Amended later the same day: an opus round put opus in
  the main-agent role with sonnet workers, exercised all three new patterns untelegraphed, and
  matched the sonnet record with no divergence. Haiku and version-pinned opus remain
  unmeasured, and no claim is made about them.

## The goal, restated, 2026-08-01

The mission is not the three skill files. They are tools, and the goal is that what they produce,
new skills and agent hand-offs, is the best it can be on current Anthropic models. The rounds so
far made the tools sound and proved their outputs differ from unaided work. What remains is
proving the outputs are better in use: Test 3 in TESTING.md defines that measurement, and no
output has run it yet. Future changes to the steering content should cite a failing audit, a
failing comparison, or a failing outcome score, and nothing else.

## Stage 0 before the outcome round, 2026-08-01

- **Hole and field are two things, now defined once.** A hole is a named blank in a template; a
  field is a named fact the caller establishes before dispatch. dispatch-protocol.md carries the
  definitions. The rule files already used the right term for the right thing, so no rule
  changed; the missing piece was the definitions.
- **Invariant 7 added to the protocol:** an agent that dispatches work collects the result
  before its own turn ends. Earned by a real stranding, where a runner ended its turn while its
  worker was still running.
- **The stop-conditions placement churn is closed, and the reasoning is visible to auditors.**
  The first attempt recorded the decision here, which auditors are told not to read, so the
  finding would have recurred forever. Fixed properly instead: writing-agents moves "When to
  stop" directly after the workflow, which satisfies the rule, and auditing-skills states in its
  own body why its stop conditions sit early, since they are pre-work gates that decide whether
  the audit starts at all. A decision an auditor cannot see is not a decision; it is a repeat
  finding.
- **The last bare directives got their reasons**, and auditing-skills now states in its body the
  approach that was tried and dropped, prose severity tiers, and why.

## Outcome testing, 2026-08-01

The bench ran to the agreed two-cycle minimum and the produced hand-off finished ahead on both
measures: 8 of 8 planted problems found with no false alarms, against the instruction it replaced
at 7.67 and 3.0. Nine scored reviews across three rounds, every scorer blind to the fixture.

- **Round 1 was a loss and is recorded as one.** The produced instruction found fewer problems
  than the one it replaced. Its scope clause listed injection subtypes, and a reviewer that had
  already found a reflected injection filed it under "noticed but out of scope" because the
  subtype was not on the list. Every audit round had passed that instruction, because it was
  consistent with the rules and wrong about the world.
- **Both lessons are now rules in `steering-rules.md`, not slogans here.** The first draft of
  this entry recorded them only in these notes and the test results, which no agent reads. That
  is the same mistake as recording an accepted audit finding where auditors cannot see it. Scope
  gained a blocking rule that a named category must define membership and mark any list of kinds
  as examples. Calibration gained an important rule that a missed case is described by the shape
  it takes in the code rather than the label it falls under. Each carries the bad wording, the
  good wording, and the measured result, and the two skills point at them where an author writes
  scope and addresses failures.
- **The rule that produced all of this stands unchanged:** no steering change without a failing
  measurement behind it. Both cycles obeyed it, and the one change that did not move a score was
  recorded as a failure rather than kept for looking sensible.
- **What is still unmeasured:** the produced skills, as opposed to this one produced hand-off,
  and any fixture other than this one. One fixture is not proof that the gains generalize.

## What the second fixture changed, 2026-08-01

- **Stopping at the agreed minimum was wrong.** The stop rule says to stop when two consecutive
  cycles fail to move the scores. Cycle 2 moved them by a full finding, so the rule called for
  another cycle and the round stopped anyway because the agreed minimum had been met. A floor was
  reported as a finish line.
- **The cycle 2 fix carried the defect it was fixing.** Naming the log pattern tightly enough to
  recover that finding turned the pattern into a new implicit list, so a credential sent over an
  unverified connection read as out of scope on the second fixture. Two independent runs made the
  same call. Cycle 3 defined secrets by mechanism, in the shape that had already worked for
  injection, and the finding came back with no cost on the first fixture.
- **Naming a pattern and bounding a category are different jobs.** A pattern is for recognising a
  case that keeps being missed. A boundary is for deciding what is in scope. Written in one
  sentence, the pattern silently becomes the boundary. Both rules in `steering-rules.md` now say
  this explicitly.
- **New fixtures teach, repeat rounds on a saturated fixture do not.** Fixture one reached eight
  of eight after cycle 2 and could not show improvement again. Every defect found since came from
  new code. Future rounds should spend on a new fixture before another cycle on an old one.
- **The key was wrong and stayed wrong on purpose.** It omits a real privilege bypass that every
  arm found and that is therefore counted against every arm. Recorded as errata rather than
  corrected, because a key edited after seeing the answers stops being a key.

## The new Scope rule caught our own file, 2026-08-01

The re-audit after the rule change found a blocking failure in `auditing-skills` itself. Its
"Which rules apply" section listed "a command, a hand-off brief, or a one-off request", a bare
list of kinds with no membership test, which is the exact shape the new Scope rule prohibits and
the exact shape of the bad example written beside that rule. A runbook or a style guide would have
fallen through to the out-of-scope branch and been refused.

Two things worth keeping from that.

- **The rule is real, not a slogan.** It was written from bench evidence about prompts, added to
  the shared rules, and the first audit run after it immediately failed the file of the skill that
  applies it. A rule that only ever catches other people's work is a rule nobody has tested.
- **The verification debt was worth clearing.** This finding existed the moment the rule landed
  and would have shipped unnoticed if the audit had been skipped, exactly as the cycle 2 defect
  shipped when the regression check was skipped. That is twice in one project that the skipped
  check was the one that mattered.

Also fixed: the calibration section now says a sibling skill named by its name is a working
reference, closing a miss the baseline record had carried since the first round.

The placement advisory stands and is accepted. The auditor is right that stating a reason for a
position does not change the position, so the finding will recur. It never blocks, the reasoning
is in the body where an auditor can read it, and moving pre-work gates away from the top would
make the skill worse to follow.

**Confirmed.** The re-audit after the fix retired both findings and raised nothing new: blocking 0,
important 0, advisory 1, that being the accepted placement item. All three skills are now verified
against the rules as they currently stand, which was not true at any earlier point this session,
because every rule change since the first audit had gone unchecked against the files that carry it.

## The lint step degrades quietly for a scoped agent, 2026-08-01

The agent producing the bench skill declined to run the lint command and said why: it was scoped
to one directory, and `shared/lint.md` names a command that runs from the repository root. From
inside that scope it could not bound what a repository-wide command would read, including files
the bench forbids it to read, or what the generator side of it would write. It followed the
fallback in `lint.md`, declared the linter unavailable, and did not re-derive the mechanical checks
by hand as a substitute. That is exactly the instructed behaviour and the fallback earned its keep.

The finding is about our steering, not about that agent. Any agent working under a directory scope,
which is the normal shape of a dispatched worker, will land in this branch every time. So the
mechanical checks that `writing-skills` step 7 and `auditing-skills` step 1 both lean on are, for
dispatched work, usually not run at all. Both skills then proceed on the honest but weaker footing
of a hand audit that has been told not to re-derive what the linter would have settled.

Not fixed here. Pete has said he will supply the real lint command later, and the right shape of
the fix depends on what that command turns out to be: a check that reads only the target file can
be named as such and run from anywhere, whereas a whole-repository build-and-compare cannot. Worth
raising with him when the command lands, rather than guessing now and having the guess baked in.

## The skills bench blind was broken, 2026-08-01

Every run file in the skills bench opens with a line naming its arm, so all six scorers knew whether
they held a control run or a produced-skill run. Caught by the third scorer, which was not asked to
look for it and flagged the header as harness labelling it had treated as non-content.

Left as recorded rather than rescored. The traps are mechanically checkable, every scorer quoted the
words that decided each call, and the deciding trap can be confirmed by eye: the control runs say
"Harbour 4.3.0" and the produced runs say "[VERSION]". Rescoring with the same key and the same
model would reproduce the same mechanical calls and buy confidence the design does not deserve.

For any later bench, a run file carries an opaque identifier and the mapping from identifier to arm
lives where the scorer cannot read it.

Third method error in this project, after the missing tenth problem in the second hand-off fixture
and the wrong T7 wording in this key. Every one was found by a worker disagreeing with the harness,
never by the harness checking itself. Whatever else the benches have shown, they have shown that
consistently.
