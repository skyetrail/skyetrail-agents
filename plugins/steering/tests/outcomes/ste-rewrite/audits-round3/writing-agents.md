# Re-audit (round 3): writing-agents

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/writing-agents/SKILL.md`
Rules: `plugins/steering/shared/skill-rules.md`, `plugins/steering/shared/steering-rules.md`
Prior report: `plugins/steering/tests/outcomes/ste-rewrite/audits-round2/writing-agents.md`, at commit `d015e2e`.
Now at commit `d72544f`, working tree clean. No file was changed except this report.

## 1. Lint result, and whether the lint reached the target

`npm run lint` from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check

lint (advisory): plugins/steering/SUMMARY.md: is 193 lines and has no "## Contents" heading; a reference file over 100 lines opens with a contents list
All generated files are up to date.
```

One advisory finding, against `plugins/steering/SUMMARY.md`, which is not this target. An advisory
finding prints and never stops the run. Nothing failed.

`npm run lint -- --explain` names three kinds of component that get every check: frontmatter
hazards, name format and length, description length (limit 1024), body line count (limit 500), and
reference resolution. `skills/*/SKILL.md` is one of them, and its name must match its directory.

The target is `plugins/steering/skills/writing-agents/SKILL.md`, so it is a component and the lint
reached it. All five component checks ran against it and passed. There is no coverage gap.

The only change at this commit is three lines of prose in one section. Body line count and reference
resolution are lint checks, they reached this component, and they passed. I did not re-derive them.

`--explain` also states that nothing under a plugin's `tests/` is opened. The prior report lives
there and is not linted. That is by design and is not a finding.

### Conditions applied

- **always** — met.
- **reused** — met. The target is a SKILL.md.
- **changes something** — met, per the brief.
- **hand-off** — not met. The SKILL.md loads into the current conversation. `handoff-rules.md` was
  not applied to it. The skill correctly tells its reader to apply that file to the prompt it
  writes.
- **advisory** — not met. All Calibration rules and the advisory-conditioned rules in Scope, Finish
  and Failure stay not applicable.
- **describes work** — **met.** This condition replaced the **catalogue** condition the prior round
  worked with. Its test is whether the document has a finished outcome of its own. Lines 8-9 name
  one: "It produces the prompt that makes an agent for one call. It also produces the caller side."
  A reader finishes that. Method, Finish and Failure all apply. The outcome is the same as the prior
  round reached under **catalogue**, so no rule changed hands.

## 2. Prior findings

Three findings in the prior report: two in its section 2, one in its section 3. All three retired.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| SK Discovery 3 (Important, defect) — the description names no file type and no symptom (marked retired at round 2) | **Retired** | The description at line 3 is unchanged this round and still carries the artefact, "producing an agents/\*.md definition or a prompt template", and the four symptoms. `git diff d015e2e d72544f` touches the frontmatter not at all |
| SK Content 3 (Important, defect) — "Converting a named agent" restated four of `dispatch-protocol.md`'s invariants and counted them (marked retired at round 2) | **Retired** | No restated list has come back. The section at lines 74-84 holds a pointer and two sentences of rationale. The only addition this round is "Step 2 is where the body meets the rule files, and a converted body has never been through it", which restates no list and counts nothing |
| SR Method 2 (Blocking, warn, difference) — the conversion pointer said "steps 3 to 7", excluding step 2, so a converted body reached step 4 having never been written against `steering-rules.md` or `handoff-rules.md` | **Retired** | Line 79 now reads "Then run workflow steps 2 to 7 above without changes." Step 2 at lines 40-43 is the only instruction that writes the prompt against both rule files and requires a membership test for any named category of work. It is now inside the range, and lines 80-81 say why it is there |

### The fix introduced no new problem

The brief asks this to be checked hardest, because two prior rounds each introduced a defect while
fixing one. This one did not. Three things I checked and each holds.

- The range starts at step 2 rather than replacing it. Step 2's verb is "Write the prompt", and on
  a conversion the body already exists, so "run step 2 without changes" could have been read as
  discard the converted body and start again. The added sentence at lines 80-81 blocks that
  reading: it names step 2 as the place "the body meets the rule files", which makes the converted
  body step 2's input rather than its casualty.
- Nothing in step 2 conflicts with the two sentences above it. The section produces a template body
  and named holes; step 2 works on a prompt. Those are the same object at that point in the
  sequence, which is what "A converted agent is a composed prompt once you reach that point" says.
- The added sentence is not a paragraph about how this document changed, which SK Content 3 forbids.
  "A converted body has never been through it" is about the work product, not about this file's
  revision history. It also supplies the reason SR Method 3 asks for.

## 3. New findings

Only findings the prior report does not contain. I re-checked every rule the edit could have
touched: SR Outcome 1 and 2, Context 1 to 5, Scope 1 to 5, Method 1 to 4, Finish 1, 2 and 5,
Failure 1, 2, 3 and 5, Composition 1 to 3, Voice 1 to 3, and SK Discovery 1 to 5, Boundary 1 to 3,
Content 1 to 6, Loading 1 to 4, Evidence 1. All pass except the one below.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| SR Method 2 — the order is fixed where sequence affects correctness | Blocking | Warn | **Difference** | Line 79 now reads "steps 2 to 7", so step 1 is the only step still outside the range. Step 1 is "Establish the facts... Use a script for anything a script can determine... Record where each fact came from." The reason this round gives for pulling step 2 in, "a converted body has never been through it", holds word for word of step 1: a converted agent's facts have never been through it either. The consequence is that the conversion path can reach step 4 and fill holes with values nobody established and whose origin nobody recorded. `handoff-rules.md` line 71 and line 72 still require both, and step 5 audits the filled prompt against that file, so the miss is caught before dispatch. The cost is a rework loop, not a wrong dispatch, which is why this is a warn and a difference. **The prior report contains this observation and dismissed it**, on the grounds that step 1 is covered by the section's own first line, "Read the definition". I weigh it differently only because this round's added rationale makes the asymmetry visible: the same argument now sits in the file, applied to one excluded step and not the other. I can say we would write "steps 1 to 7", not that an agent does anything wrong |

I considered and did not raise three others.

- **SK Content 3 on the added sentence.** "Step 2 is where the body meets the rule files, and a
  converted body has never been through it." An agent does act differently after reading it: it
  runs step 2 on the body it just derived rather than skipping to the holes. `skill-rules.md` names
  an explanation of why a constraint exists as content that counts, where the rule requiring the
  constraint asks for the reason. SR Method 3 does. Pass.
- **SR Method 1, one default approach rather than a menu.** "Compose at dispatch" recommends one
  approach, then names a test for the exception, "where something outside the call site depends on
  it staying one fixed thing", with three examples marked as examples. That is a default with a
  membership test, not a menu. Pass.
- **SK Loading 1, every reference one hop.** The file names `steering-rules.md`, `handoff-rules.md`
  and `dispatch-protocol.md`, all in `../../shared/`. Those three cross-reference each other, but
  every one of them is already named directly by this SKILL.md, so nothing is reachable only at two
  hops. Pass.

SK Evidence 1 applies and passes: `plugins/steering/tests/baselines/writing-agents.md` exists, and
nothing reachable from the SKILL.md links to that directory.

## 4. Counts by severity

New findings:

| Severity | Fail | Warn |
| --- | --- | --- |
| Blocking | 0 | 1 |
| Important | 0 | 0 |
| Advisory | 0 | 0 |

New defects: 0. New differences: 1.

Surviving prior findings: none. All three prior findings retired.

| Severity | Fail | Warn |
| --- | --- | --- |
| Blocking | 0 | 0 |
| Important | 0 | 0 |
| Advisory | 0 | 0 |

Surviving defects: 0. Surviving differences: 0.

No blocking failure. Under `steering-rules.md` the document does not need work before use. Every
prior finding is fixed, and this round's fix introduced no new problem. The single new item is a
warn about which step the conversion pointer starts at, and the skill's own audit step catches its
consequence before anything is dispatched.

## 5. Anything I did that nobody asked for

- I ran `git diff d015e2e d72544f` on the target rather than comparing the current file against the
  prior report's line numbers by hand.
- I read `dispatch-protocol.md`, `handoff-rules.md` and `lint.md` in full. Only the first two are
  reachable from this target. I read `lint.md` because `skill-rules.md` points at it for the
  mechanical limits, and I wanted to confirm the lint record was the right thing to cite rather
  than re-derive.
- I checked `plugins/steering/tests/baselines/` for a file for this skill, to settle SK Evidence 1.
  Neither prior report mentions that rule, and it is Blocking, so I did not want to leave it
  unstated. It passes.
- I grepped the whole repository for references to `writing-agents` outside `tests/` and its own
  directory, to check that no other file cites the workflow's step numbers and would now be stale.
  None does. `SUMMARY.md`, `TESTING.md`, `DECISIONS.md`, `README.md`, `dispatch-protocol.md`,
  `handoff-rules.md` and `writing-skills/SKILL.md` all name the skill without citing a step number.
- I ran `mkdir -p /tmp/ste-audit-3`. The directory did not exist. I wrote only this file and
  `repo-setup.md` there.
