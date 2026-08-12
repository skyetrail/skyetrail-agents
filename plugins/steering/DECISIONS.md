# Decisions

Working notes for whoever picks this up. Not skill material. Nothing links to this file and it
should stay that way.

`OUTCOMES.md` holds the rounds and the numbers. `METHOD.md` holds the practice that transfers to
any project. This file holds what we chose, when, and why. Read it before you change a rule file.
A fresh session will otherwise re-derive these differently and quietly diverge.

## The rule that governs every other decision

**No steering change without a failing measurement behind it. 2026-08-01.** Cite a failing audit,
a failing comparison, or a failing outcome score. Nothing else counts. An argument does not count,
and neither does taste.

The rule binds this file too. An entry here without a record behind it is a note, not a decision.
One change that moved no score was recorded as a failure rather than kept for looking sensible.

## Structure

| Decision | Date | Why |
| --- | --- | --- |
| Rule files are named for their reader: `skill-rules.md`, `steering-rules.md`, `handoff-rules.md`. | 2026-07-31 | Hand-off is a condition inside a file, not the scope of one. `instruction-rules` was rejected because Copilot names a different artifact that way. |
| Every rule conditioned on hand-off lives in `handoff-rules.md`, and none lives elsewhere. | 2026-08-01 | Every auditor of a plain skill read all the hand-off rules to rule them out. |
| A rule is a flat entry with a rule, a severity, and a condition. | 2026-07-31 | Graded scorecards were rejected. The middle grade restated the rule as partly present, and several cells packed four or five rules into one score. |
| Fixtures and test records live under `tests/`, and nothing an agent loads links to them. | 2026-07-31 | An auditor that reads three worked examples first pattern-matches to them. |
| Each skill routes by its description, plus a "Where this stops" section in its body. | 2026-07-31 | A shared routing file loads only after a skill fires, and routing already happened. |
| `dispatch-protocol.md` defines hole and field once. A hole is a named blank in a template. A field is a named fact the caller establishes before dispatch. | 2026-08-01 | The rule files already used the right term for the right thing. Only the definitions were missing. |
| An agent that dispatches work collects the result before its own turn ends. | 2026-08-01 | Earned by a real stranding. A runner ended its turn while its worker was still running. |

## The skills

- **Baseline first, before any writing. 2026-07-31.** Running it first means the skill addresses
  failures someone observed, not failures someone imagined.
- **A baseline dispatch forbids the agent from loading any installed skill, and records any
  attempt. 2026-07-31.** A bare dispatch self-loaded an installed skill-authoring skill and
  measured that skill instead of the model.
- **Baseline records live in `tests/baselines/`, one file per skill. 2026-07-31.** The Evidence
  rule names that place, so an auditor has somewhere to check.
- **`writing-skills` teaches house discipline, not SKILL.md syntax. 2026-07-31.** This reverses
  the build-day decision to keep format guidance. The forbidden-skills baseline wrote a valid
  SKILL.md unaided. Mechanical limits belong to the lint script.
- **The audit in `writing-skills` needs a fresh agent. 2026-08-01.** The step once read "audit
  against the rule files, or by using `auditing-skills`". The producing agent audited its own
  draft and fixed three gaps. An independent auditor then found four more, one of them blocking.
  An author reads their own intent rather than their text.
- **`writing-skills` carries a proportionality clause. 2026-08-01.** A small change to a skill
  with a recorded baseline runs the audit alone. Models of this class over-comply with a mandatory
  workflow rather than judging it disproportionate.
- **`auditing-skills` carries two dispatch patterns. 2026-08-01.** Two audits with reconciliation
  gate a ship decision. A re-audit reports differences against a supplied prior report. Severity
  calls proved stable across runs and pass-versus-warn calls on minor rows did not. Sampling fixes
  judgement variance. More prose does not.
- **Never fail an audit for a named agent, and promote composing at dispatch. 2026-07-31.** The
  skill keeps the exceptions and one line of reason, because unaided models already prefer
  composition. Three named-agent cases are legitimate:
  - The agent is used identically in many places.
  - The harness restricts its tools only at that layer.
  - Someone else owns it as a policy boundary.
- **`repo-setup` writes its record between fixed markers in `AGENTS.md`, and a second run replaces
  the block. 2026-08-01.** A re-run against a file holding someone else's writing left exactly one
  marker pair and preserved the hand-written content character for character.

## The rules

- **Only a defect blocks. 2026-08-01.** Severity says how much a problem matters. Defect or
  difference says whether there is one. A rule firing at blocking severity on something with no
  nameable consequence reaches past what it can judge.
- **A named category states what makes something a member, and marks any list of kinds as
  examples. Blocking. 2026-08-01.** A reviewer that had already found a real vulnerability filed
  it out of scope, because its subtype was not on our list.
- **A missed case is described by the shape it takes in the code, not by the label it falls under.
  Important. 2026-08-01.**
- **Naming a pattern and bounding a category are different jobs, and both rules say so.
  2026-08-01.** The fix for the first fixture turned a pattern into a new implicit list. The
  second fixture caught it.
- **The boundary rule stays blocking. 2026-07-31.** Two reproductions back it. Sibling skills in
  obra/superpowers gave opposite parallel-dispatch advice with no scope statement, and an unprimed
  auditor forced an audit through on a file outside its target kinds.
- **Return rules apply only to hand-off. 2026-07-31.** The `always` condition demanded a report
  format from in-conversation skills whose return is the artifact.
- **Descriptions carry no redirect clause to a sibling skill. 2026-07-31.** An A/B ran three runs
  per variant. The variant without the clauses scored 39 of 39 positives against 38 of 39. Both
  had zero false fires. The two variants made the same picks on 17 of 18 ambiguous requests.
- **A description states the capability and the triggers, and never summarises the workflow.
  2026-07-31.** A workflow summary in the description makes the agent follow the summary instead
  of the body.
- **Constrain how something is done only where a specific way is required for correctness or
  safety, and state the reason. 2026-07-31.** The earlier wording, "the technique is left to the
  agent", contradicted the hand-off rule naming exact commands and gave the auditor no criterion.
- **The copyable-checklist rule is gone, and the contents-list rule is advisory. 2026-08-01.**
  Both fired repeatedly across ten external audits and never named a consequence.
- **The baseline-evidence rule applies only to a skill we maintain. 2026-08-01.** It produced an
  automatic blocking failure on all seven external files, and every auditor spotted the problem
  unprompted.
- **The numeric finding cap is gone. 2026-08-07.** Ten external audits over seven files all
  breached the five-finding gate, and the lowest total was ten. Calibration now tests each finding
  for a consequence, and counts one finding per root cause.
- **Author notes stay out of files an agent loads. 2026-08-01.** A paragraph saying two rules were
  unverified changed an auditor's call from fail to warn. Severity is the instrument for that, and
  the agent already knows how to use it.
- **Never count things, especially across files. 2026-08-01.** A count buys no behaviour and goes
  stale on the next addition. State the fact that cannot go stale.
- **Evidence citations live in this file, and rule files keep one-line pointers. 2026-08-01.** The
  first attempt added thirty lines of citations to files an auditor loads every time.

Two rules survived review that looked like candidates for cutting. Naming the successor skill
discriminated, because it passed on `brainstorming` and failed elsewhere. A direct instruction
from the person winning has a nameable consequence, because one external skill's gate claims to
apply to every project regardless of simplicity.

**What the cutting round bought, stated honestly. 2026-08-01.** Rules evaluated for a plain skill
audit fell from 75 to 53. Lines loaded went from 374 to 381, which is no change. Removed rule text
was replaced almost one for one by operative text that earns its place. So this was a
reasoning-load win and not a context win.

## Reversed, and what the reversal taught

**The third-person rule and the capability rule were cut on 2026-08-01 and restored the same day.**
The test behind the cut was fabricated. Six run files were written by hand, byte-identical across
two arms carrying different descriptions, then analysed as measurements. Commit 2484bc0 restored
both severities and deleted the fabricated runs. Stating the capability is Blocking. The third
person is Important. Both rules remain unverified, and the design that would settle them sits at
`tests/outcomes/trigger-test/`, not run.

Do not change a severity on an argument. That is what the fabrication already got wrong once.

**Simplified Technical English was adopted for the reader, not for the agent. 2026-08-10.** A
blind two-arm comparison found no difference in what an agent produced, across two fixtures, with
no false alarms in any run. The style cost about one percent in length. It stays because a person
maintains these files. Do not claim it changes agent behaviour.

**A conclusion about pointers was retracted. 2026-08-11.** The first Sonnet 5 round concluded that
a pointer costs a weak executor more than a copy does. The pointer in that run aimed at a file no
commit had ever held, so the run measured a broken reference. Round two disproved the conclusion.
What survives is narrower. A pointer whose payload is a block to copy behaves differently from one
whose payload is a procedure to perform.

## Checking our own work

- **A skipped check blocks. It is not a concern. 2026-07-31.** A previous attempt skipped the
  baseline, deferred the fixture audit, reported both as concerns, and returned
  DONE_WITH_CONCERNS. Its stated cause for the deferral was false.
- **Audit our own files after every rule change. 2026-08-01.** The new Scope rule failed
  `auditing-skills` itself on the first run after it landed. A rule that only ever catches other
  people's work is a rule nobody has tested.
- **A decision an auditor cannot see is not a decision. 2026-08-01.** Recording a placement
  decision in this file, which auditors are told not to read, guaranteed the finding would recur
  forever. The reasoning now sits in the skill body.
- **A key edited after seeing the answers stops being a key. 2026-08-01.** The second hand-off key
  omits a real privilege bypass that every arm found. It is recorded as errata and counted against
  every arm.
- **An agreed minimum is a floor, not a finish line. 2026-08-01.** The stop rule says to stop when
  two consecutive cycles fail to move the scores. Cycle 2 moved them by a full finding, and the
  round stopped anyway.
- **Spend on a new fixture before another cycle on an old one. 2026-08-01.** Fixture one reached
  its ceiling after cycle 2. Every defect found since came from new code.
- **A run file carries an opaque identifier, and the mapping to its arm lives where the scorer
  cannot read it. 2026-08-01.** Every run file in the skills bench named its own arm, so no scorer
  was blind. A scorer found that, and the harness did not.
- **Audit a file that describes tooling against the source, not against the rules. 2026-08-01.**
  `shared/lint.md` was wrong four times in two days, and every version passed a structural audit.
  State coverage by what makes a file a member of a tier, never by listing paths.
- **Conformance to our own rules cannot tell whether the skills got better. 2026-08-10.** Eight
  blind audits found no difference between the rules before and after four rounds of fixing, on a
  repository we did not write. Measure execution instead.

**The bench artifacts stay as they are.** The release-notes skill the tool produced fails an
independent audit: one blocking finding, two important, one advisory. Do not fix it. It records
what the tool produced on the day, and rewriting it would destroy the evidence. Its audit stands
beside it. The same holds for every run file under `tests/`.

**The placement advisory is accepted and will recur.** Stating a reason for a position does not
change the position, so an auditor is right to raise it. It never blocks. The reasoning sits in
the body, where an auditor can read it. Moving pre-work gates away from the top would make the
skill worse to follow.

## Still open

**Reference files have no condition that fits them. 2026-08-01.** Auditing the four rule files
produced one finding in all four at once. None of them states that the agent must not modify
anything, what the default outcome is, or what evidence a finding carries. Those come from the
skill that loads the file. The conditions assume the document instructs someone to do work, and
there is no condition for a document consulted while doing work. Adding one changes every rule's
applicability, so it needs its own round. A finding that appears in every target at once is
usually about the harness.

**The lint step degrades quietly for a scoped agent. 2026-08-01.** `shared/lint.md` names a
command that runs from the repository root. An agent scoped to one directory cannot bound what
that command reads or writes, so it declares the linter unavailable and proceeds. That is the
instructed behaviour and the fallback earned its keep. It also means the mechanical checks that
`writing-skills` and `auditing-skills` both lean on usually do not run for dispatched work. The
fix depends on the command Pete supplies. A check that reads only the target file can be named and
run from anywhere. A whole-repository build-and-compare cannot.

**The two description rules are unverified.** See the reversal above. The design sits at
`tests/outcomes/trigger-test/`.

**The skills strip domain content. 2026-08-11.** A Sonnet 5 round found `writing-skills` removing
correct, customer-facing content that the same model produced with nothing loaded. A warning
naming the exact lost item did not stop the same loss in the next round. No rule-conformance audit
can see this, because the rules judge the container.

**Model coverage.** Every measurement to 2026-08-01 used Sonnet. An Opus round then put Opus in
the main-agent role with Sonnet workers and matched the record. Sonnet 5 execution rounds ran on
2026-08-11 and found real failures. Haiku and version-pinned Opus stay unmeasured, and no claim is
made about them.

## Environment

Claude Code, so subagents exist and a baseline comparison can actually run. `claude -p` is
available, which the skill-creator description optimiser needs. The lint runs as `npm run lint`
from the repository root and is built into this repository's README generator. `shared/lint.md`
names it, and the skills fall back to saying so when the repository is absent.

The lint gained two checks on 2026-07-31. The plugin's `shared/` files are checked for reference
resolution, because they load with the skills that name them. And a markdown link whose text reads
as a filename must link to that filename.
