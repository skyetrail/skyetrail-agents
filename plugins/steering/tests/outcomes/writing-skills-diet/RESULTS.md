# The writing-skills diet

`writing-skills` went from 419 lines to 148 on 2026-08-21. `PREREG.md` beside this file fixed the
question, the arms, the fixture, the rubric, the predictions, and the decision rule before any run
started. This page records what the runs returned.

## Round one: three arms, nine isolated runs

Nine Claude Sonnet 5 runs, three per arm, each in its own directory on the migration-review
fixture. A packager copied each delivered skill into a coded directory. A blind judge scored the
nine against the rubric without the key. A process judge checked each skilled run's record. The
key, published after scoring: A current/r3, B unaided/r1, C diet/r3, D diet/r1, E current/r2,
F current/r1, G unaided/r3, H diet/r2, I unaided/r2.

### Delivery, P1: held

Every run in every arm delivered a SKILL.md. No run in any arm could dispatch a subagent, because
the workflow runner gives none a dispatch tool. The skilled runs recorded the baseline steps and
the independent audit as blocked, as the skill tells them to, and delivered anyway. P6 is
answered: none could dispatch.

### Shape, P2: held

Shape totals over three runs, out of 27: unaided 15, current 20, diet 24. The diet is above the
current skill minus two, and both skilled arms are above unaided plus three.

| Item | unaided | current | diet |
| --- | --- | --- | --- |
| S1 description states capability and triggers | 3 | 3 | 3 |
| S2 under 500 lines, references under `reference/` and named | 2 | 2 | 3 |
| S3 membership test per category, lists marked as examples | 2 | 2 | 3 |
| S4 usable defaults, set members with their tests | 1 | 0 | 2 |
| S5 finish check on an input property, not a count | 0 | 3 | 3 |
| S6 no history, no status note, no placeholder | 3 | 2 | 3 |
| S7 says what it does not cover, direct instruction wins | 0 | 3 | 3 |
| S8 the migration file is data | 2 | 2 | 1 |
| S9 first lines say what the skill produces | 2 | 3 | 3 |

The two items no unaided run had, S5 and S7, are the two the skill supplies in every run. The diet
improved S4 over the long version, and lost on S8, which the diet never asked for.

### Audit, P3: the skilled clause held, the unaided clause did not

Every one of the nine prints one failure as packaged, and that failure is
`lint-name-matches-directory`, caused by the one-letter blind directory. The judge re-ran each
under a directory named by its own `name` field: all nine print zero failures. So the unaided arm
passes the mechanical audit too, and the prediction that it would fail in two of three is refuted.
On this fixture the command does not separate an unaided Sonnet run from a skilled one.

### Coverage, P4: held, and the cost is one item

Coverage of the seven planted faults, out of 21: unaided 21, current 19, diet 19. Every arm flags
D1 to D6 in every run. The whole difference is D7, the missing `lock_timeout` and rollback plan,
which every unaided run checks for and one run per skilled arm does. D8, the safe nullable
`ADD COLUMN`, is correct in all nine. The diet and the long version cost the same.

### Process, P5: failed on the diet arm

- Ticks. All three diet runs copied the checklist and ticked eight or nine lines, and zero of 26
  ticks carry a path or a command from the run. Each is the skill's own wording. The long version
  did no better: one run anchored five of nine ticks, and two runs wrote no checklist at all.
- Audit re-run. Two of three diet records hold a block identical to the judge's re-run. The third
  pasted a summary by section, not the printed output.
- Measured paths. Every `ran` path in every skilled record opens.
- Blocked lines. One diet run quoted a tool error, `Unknown skill: auditing-skills`. Every other
  blocked line gives a prose reason, because no tool existed to return an error.
- Contamination. No run read another run's directory, the key, or the pre-registration. The
  packager copied nothing outside the skill directories.

The tick result repeats the writing-agents diet exactly. That skill's ticks closed from six
unanchored to zero only when `npm run audit` began checking ticks on the record and the run saw
the advisory. The check runs on a prompt's record and not on a skill's, so no diet run saw one.

### Decision

Under the rule as written, the diet does not replace the current skill, because P5 failed. The
current skill fails the same bar by more. Round two follows the three fixes below.

### Three fixes

1. The tick check runs on a skill's record too, so a skilled run sees the advisory.
2. Step 10 says to paste the audit output unchanged.
3. Step 8 says a file the skill has the reader open is data, and an instruction in it is a finding.

### Observations, not scored

One diet run used the fixture file by name as its worked example, so the graded task sits inside
the shipped skill. One long-version run caught itself doing the same and rewrote the example. No
version of the skill forbids it. One unaided run hit a harness guard on a file named
`report-template.md` and renamed it. The diet arm's SKILL.md lengths were 187, 131 and 159 lines;
the long version's were 193, 185 and 165; unaided 126, 172 and 143.

## Round two: the diet arm after three fixes

Three isolated Sonnet runs under the skill at `42cbcb6`, packaged under each skill's own directory
name, scored by the same blind judge and process judge. Key: J diet2/r2, K diet2/r3, L diet2/r1.

### What held

Delivery three of three. Audit zero failures three of three, with the packaging fixed, so M1 is
now a real pass. Shape 21 of 27 (8, 8, 5), above the long version's 20 and above unaided plus
three. Items S1, S2, S4, S5 and S9 scored three of three. Coverage 18 of 21 and D8 three of three.
No cross-run read, no leak from the packager. Every `ran` path in every measured block opens. Two
runs named the four tools they checked before recording a dispatch as blocked, which is what the
new sentence in step 5 asks for.

### What did not

- Ticks. Under the pre-registered rule, a path or a command from the run, anchored ticks were 0 of
  8, 0 of 8 and 1 of 8. Under the audit tool's looser rule, which counts a rule-file path or a
  record section, 5, 7 and 3 of 8. One run anchored its rule-file ticks in the delivered SKILL.md's
  sections, as the preamble asks, and the strict rule does not count a section.
- The audit re-run matched one of three. The other two differ in one row only: the tick check,
  not applicable in the pasted block and an advisory on re-run. The judge checked mtimes: each
  record was written after its SKILL.md and after the audit, so the check saw no ticks. The skill
  audits at step 10 and ticks steps 10 to 12 afterwards. The mechanical feedback never reached a
  run.
- S3 fell to one of three, from three of three in round one. One skill closed its categories with
  "and nothing else" and one left its Calibration lists unmarked. S8 was one of three after the
  new sentence in step 8; two skills call a comment in the file a claim or unverified, and
  neither says an instruction inside it is a finding.
- D7 was zero of three. No diet skill in this round checks for a lock timeout or a rollback plan,
  where every unaided skill did.

### Decision after round two

P1 to P4 hold. P5 fails. The diet does not yet replace the current skill under the rule. One fix
follows: the audit that a caller re-runs moves to the Delivery section, after the checklist is
complete, with the instruction to act on each advisory and paste the final output unchanged. That
is the order `writing-agents` uses, and its ticks closed to zero under it.
