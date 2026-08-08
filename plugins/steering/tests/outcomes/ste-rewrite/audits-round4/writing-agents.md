# Re-audit (round 4): writing-agents

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/writing-agents/SKILL.md`
Rules: `plugins/steering/shared/skill-rules.md`, `plugins/steering/shared/steering-rules.md`
Prior report: `plugins/steering/tests/outcomes/ste-rewrite/audits-round3/writing-agents.md`, at commit `d72544f`.
Now at commit `19459c8`, working tree clean. No file was changed except this report.

## 1. Lint result, and whether the lint reached the target

`npm run lint` from `/Users/pete/workspace/skyetrail-agents`, exit code 0:

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

`--explain` also states that nothing under a plugin's `tests/` is opened. The prior report lives
there and is not linted. That is by design and is not a finding.

**The target itself did not change at this commit.** `git diff d72544f 19459c8` against the SKILL.md
is empty. Two things around it did change, and both matter to this re-audit:

- `steering-rules.md` moved both Outcome rows from **always** to **describes work**, added a
  paragraph settling how conditions are decided, and replaced the paragraph about what drops out
  when **describes work** fails.
- `skill-rules.md` reworded two paragraphs without moving a rule.

So this round re-runs a fixed target against moved rules, rather than the other way round. Body line
count and reference resolution are lint checks, they reached this component, and they passed. I did
not re-derive them.

### Conditions applied

- **always** — met.
- **reused** — met. The target is a SKILL.md.
- **changes something** — met, per the brief.
- **hand-off** — **not met**, and this commit settles the question rather than leaving it to a
  reading. `steering-rules.md` now says: "Every condition is about the document in front of you, not
  about anything that document describes. A file of rules for writing hand-off prompts is not itself
  a hand-off, because the agent reading it sits in the conversation its author is having. Two audits
  of one such file called this opposite ways and returned different counts, so settle it this way
  and record which way you went." This target writes hand-off prompts; it is not one. The SKILL.md
  loads into the current conversation. `handoff-rules.md` was not applied to it. Recording which way
  I went, as that paragraph asks. This matches the prior round, so no rule changed hands.
- **advisory** — not met. All Calibration rules and the advisory-conditioned rows in Scope, Finish
  and Failure stay not applicable.
- **describes work** — met. Lines 8-9 name a finished outcome: "It produces the prompt that makes an
  agent for one call. It also produces the caller side." Method, Finish and Failure apply. The two
  Outcome rows moved onto this condition at this commit, and the condition is met, so both still
  apply and both still pass.

## 2. Prior findings

Four findings in the prior report: three in its section 2, all of which it had already retired, and
one in its section 3.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| SK Discovery 3 (Important, defect) — the description names no file type and no symptom (retired at round 2) | **Retired, and stays retired** | The frontmatter at line 3 is byte-identical. It still carries the artefact, "producing an agents/\*.md definition or a prompt template", and four symptoms including "came back with nothing useful" and "ran out of context" |
| SK Content 3 (Important, defect) — "Converting a named agent" restated four of `dispatch-protocol.md`'s invariants and counted them (retired at round 2) | **Retired, and stays retired** | No restated list has come back. The section at lines 76-84 holds a pointer and two sentences of rationale, restating no list and counting nothing |
| SR Method 2 (Blocking, warn, difference) — the conversion pointer said "steps 3 to 7", excluding step 2 (retired at round 3) | **Retired, and stays retired** | Line 79 still reads "Then run workflow steps 2 to 7 above without changes", and lines 80-81 still give the reason |
| SR Method 2 (Blocking, warn, difference) — the pointer now says "steps 2 to 7", so step 1 is the only excluded step, while the rationale given for pulling in step 2 applies to step 1 equally | **Confirmed** | Line 79 is byte-identical: "Then run workflow steps 2 to 7 above without changes." Step 1 is still outside the range. Judged independently below rather than carried over |

### Judging the surviving finding on its own, as the brief asks

The brief asks whether the step 1 exclusion still stands. It does, and the argument for it is
stronger than the prior report made it, for a reason the prior report did not use.

Round 2 raised the same observation and dismissed it, on the grounds that step 1 is covered by the
section's own first line, "Read the definition", and by `handoff-rules.md` line 71, which step 5
audits against. Round 3 re-raised it as a warn, on the grounds that this round's added rationale
makes the asymmetry visible. Two rounds, two answers, so I worked it from the text rather than from
either.

There is a real defence available, and the file supplies it. The conversion section ends: "Keep the
set of fields the callers establish fixed and documented, the same way you keep the set of holes."
That hands fact-establishing to the callers at each dispatch, which reads as a reason step 1 sits
outside a section about producing a template.

The defence does not survive the range it is defending. The range "steps 2 to 7" already includes
step 6, "Dispatch. Name the model explicitly", and step 7, "Handle the return per the status table".
Those are per-dispatch steps, not template-building steps. A range that reaches dispatch and return
cannot be explained as covering only the template. Step 1 is excluded on no principle the section
states, and the rationale the file does state for step 2, "a converted body has never been through
it", is true word for word of step 1: a converted agent's facts have never been through it either.

The consequence is unchanged from round 3, and it is why this stays a warn and a difference. The
conversion path can reach step 4 and fill holes with values nobody established and whose origin
nobody recorded. `handoff-rules.md` line 71 requires both, and step 5 audits the filled prompt
against that file before dispatch, so the miss surfaces as a rework loop rather than a wrong
dispatch. I can say we would write "steps 1 to 7". I cannot name a run that goes wrong.

## 3. New findings

Only findings the prior report does not contain. I worked every rule in both files over the target
again rather than trusting the prior round's sweep, because the rules moved even though the target
did not. Everything passes except the two below.

| Rule | Severity | Result | Defect or difference | Evidence |
| --- | --- | --- | --- | --- |
| SR Scope 3 — where a category of work is named, a membership test defines it, and any list of kinds carries a marker saying they are examples | Blocking | Warn | **Difference** | Lines 62-63, in "When to stop": "Stop and say what is missing where you cannot establish a fact, where a required hole has no value, or where you cannot read a rule file. Do not dispatch anyway." Three kinds, no example marker, no membership test. `steering-rules.md` lines 111-113 say a reader is right to read such a list as closed, so an agent meeting a fourth stop-worthy case, such as a named model being unavailable or two rule files contradicting each other, has no instruction and the next sentence forbids only what it names. The internal asymmetry is the sharp part: step 2 of this same file tells the reader "Mark any list of kinds as examples. Otherwise the agent treats a kind you did not list as out of scope", and the file's own stop list is not marked. I mark it warn and a difference because the opening clause "Stop and say what is missing" states a general test that all three items are instances of, so a sensible reader can decide a fourth case. That is the rule's shape written in reverse order. We would add "or any other input you cannot establish", which `steering-rules.md` line 130 states is enough on its own |
| SK Content 6 — the skill does not document a constraint that a script or a regex could enforce instead | Important | Warn | **Difference** | Step 4, lines 47-49: "Fill every hole. Mark each hole required, or give it a default. An unfilled hole then fails loudly instead of reaching the agent as empty text." The step describes the constraint in prose and names no mechanism, while two documents this skill points at say a script settles it. Its own step 1 says "Use a script for anything a script can determine", and `dispatch-protocol.md` line 27-28 names "Whether the caller filled every hole in a prompt" as one of four things a script determines. So "fails loudly" has no stated loud thing. Warn, because step 1 is a general instruction that plausibly carries into step 4 and the reader reaches `dispatch-protocol.md` at step 3. A difference, because no script in this plugin checks a filled prompt today, so nothing exists for the prose to defer to, and I can only say we would name the check in step 4 rather than leave it to be inferred across two files |

I considered and did not raise five others.

- **SR Finish 1, a check whose result settles whether the work is done.** Step 5 names one, "Audit
  the filled prompt against `../../shared/steering-rules.md` and `../../shared/handoff-rules.md`",
  and no threshold sits in this file. The threshold sits one hop away, in the file step 5 names:
  `steering-rules.md` line 22 states "Any blocking failure means the document needs work before
  use." Reachable, so pass.
- **Step 5 instructing an audit while "Where this stops" gives auditing to `auditing-skills`.** Line
  31-32 reads "This skill does not audit an existing prompt **without changing it**." The qualifier
  is explicit and the distinction holds. Pass.
- **SR Voice 1 to 3.** I scanned every sentence, because I raised a Voice finding against the
  sibling target this round and wanted to know whether I was reading the rule loosely. I was not.
  The two sentences here that come closest, "An unfilled hole then fails loudly instead of reaching
  the agent as empty text" and "every caller pays for the weight the template gathers", are lifted
  from `steering-rules.md`'s own Composition rows, so the rule file writes them that way itself. "An
  unchanged retry repeats the failure" gives a mechanical verb, which the rule file's own blessed
  example ("A second copy of that list drifts from the first") permits. Pass on all three rows.
- **SR Failure 2, a retry limit.** "Retry a dispatch only after something has changed, and at most
  twice per agent. An unchanged retry repeats the failure. After the limit, report instead." Both
  halves of the rule, in one place. Pass, and worth naming because the sibling target fails this row.
- **SK Loading 4, no reference file instructs the reader to skip part of itself.** `handoff-rules.md`
  line 4 says "Do not read it otherwise", which withholds the whole file under a condition rather
  than part of it. `steering-rules.md`'s Applies-when column governs which rows apply. Neither is a
  reader told to skip part of a file it is reading. Pass.

SK Evidence 1 applies and passes: `plugins/steering/tests/baselines/writing-agents.md` exists, and
nothing reachable from the SKILL.md links to that directory. SK Loading 1 passes: all three
references sit in `../../shared/` and all three are named directly, so nothing is reachable only at
two hops.

## 4. Counts by severity

New findings:

| Severity | Fail | Warn |
| --- | --- | --- |
| Blocking | 0 | 1 |
| Important | 0 | 1 |
| Advisory | 0 | 0 |

New defects: 0. New differences: 2.

Surviving prior findings, meaning the one confirmed:

| Severity | Fail | Warn |
| --- | --- | --- |
| Blocking | 0 | 1 |
| Important | 0 | 0 |
| Advisory | 0 | 0 |

Surviving defects: 0. Surviving differences: 1.

No defect, new or surviving, at any severity. Every item on this target is a difference. Two are
blocking differences, and `auditing-skills` states that a blocking difference does not hold the
target back and should be read as a signal about the rule rather than about the target. On that
reading the document does not need work before use.

The pattern across three items is one thing said twice. This skill tells its reader to close a
category list and to prefer a script over prose, then leaves its own stop list open and its own hole
check in prose. The step 1 exclusion is the same shape a third time: a rule the file states and does
not apply to itself. None of the three costs a run. All three would be one-line edits.

## 5. Anything I did that nobody asked for

- I diffed the target between `d72544f` and `19459c8` and found it unchanged, then diffed both rule
  files instead, because a fixed target against moved rules is a different re-audit from the one the
  brief describes. The Outcome rows moving onto **describes work** and the new paragraph settling
  the hand-off condition are both from that diff.
- I read the round-two report as well as the round-three one, because the two rounds reached
  opposite answers on the step 1 exclusion and I wanted to see round 2's reasoning rather than round
  3's summary of it. That is where the "steps 2 to 7 already includes dispatch and return" argument
  came from, which neither prior report used.
- I scanned every sentence in this file against the Voice rows specifically, to check that a Voice
  finding I raised against `repo-setup` this round was not me reading the rule loosely. It passes
  here, which is what made me keep the other one.
- I read `dispatch-protocol.md` and `handoff-rules.md` in full. Both are reachable from this target.
  `dispatch-protocol.md` line 27-28 is where the SK Content 6 finding comes from.
- I grepped the whole repository for files citing a step number of this skill, since the surviving
  finding is about a step range. None does. `TESTING.md`, `README.md`, `SUMMARY.md`, `DECISIONS.md`,
  `handoff-rules.md`, `dispatch-protocol.md`, `steering-rules.md` and `writing-skills/SKILL.md` all
  name the skill without citing a step number.
- I checked `plugins/steering/tests/baselines/` for a file for this skill, to settle SK Evidence 1.
- I ran `mkdir -p /tmp/ste-audit-4`. The directory did not exist. I wrote only this file and
  `repo-setup.md` there.
