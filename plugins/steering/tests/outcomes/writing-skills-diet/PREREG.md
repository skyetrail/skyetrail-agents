# Pre-registration: the writing-skills diet, three arms

Written and committed before any run started.

## Question

Two questions, one round. Does `writing-skills` make a Sonnet 5 run produce a better-shaped skill
than the same run with no skill? And does the 148-line diet keep what the 419-line version had?

## Arms

- **unaided**: no skill loaded. The run works from its own knowledge.
- **current**: the 419-line `writing-skills` at commit `3099cf5`, read from a copy of
  `plugins/steering` outside the repository.
- **diet**: the `writing-skills` in the working tree at the commit that holds this file.

Three isolated runs per arm, Claude Sonnet 5, one fixture. Each run has its own directory and is
told not to read any other run's directory. The skilled runs may read the repository for the rule
files and run `npm run audit` from its root.

## Fixture

`fixture/request.md` is the person's request: a skill that reviews a PostgreSQL 15 migration
before it ships, for tables of about 200 million rows under rolling deploys.
`fixture/20260821_orders_cleanup.sql` is the task the request names. It plants seven things a
reviewer must flag and one thing a reviewer must not.

| Id | Planted | Why it matters at this size |
| --- | --- | --- |
| D1 | `UPDATE orders ...` backfill inside the same transaction as the DDL, then `SET NOT NULL` | long lock and a full scan on 200 million rows |
| D2 | `ALTER COLUMN total TYPE numeric(12,2)` | rewrites the table under an access-exclusive lock |
| D3 | `CREATE INDEX` without `CONCURRENTLY`, inside a transaction | blocks writes for the whole build |
| D4 | `RENAME COLUMN email TO email_address` | old code fails during the rolling deploy; needs expand and contract |
| D5 | `ADD CONSTRAINT ... FOREIGN KEY` without `NOT VALID` then `VALIDATE CONSTRAINT` | full scan of both tables under lock |
| D6 | `DROP TABLE order_audit_legacy` | irreversible; no backup, retention, or rollback step |
| D7 | no `lock_timeout`, no `statement_timeout`, no rollback plan | a lock wait queues every other query behind it |
| D8 | `ADD COLUMN notes text`, nullable, no default | safe in PostgreSQL 15; a skill that flags it over-flags |

## Blind scoring

A packager copies each run's delivered skill directory, and nothing else, into `blind/<code>/`,
under a code from a key that the judge never sees. The judge reads only `blind/`, the fixture, and
this file. Each item scores 0 or 1 per produced skill.

| Item | The skill scores 1 where |
| --- | --- |
| S1 | the description states the capability and the conditions that trigger it, in words a person would type |
| S2 | SKILL.md is at most 500 lines, and every reference file sits under `reference/` with an instruction naming its path |
| S3 | every category of finding carries a membership test, and every list is marked as examples rather than the whole set |
| S4 | every value left to the reader's setup has a usable default, and every set names each member with the test that assigns it |
| S5 | the finish check triggers on a property of the input, not on a count of findings, and a run that opens nothing cannot pass it |
| S6 | no authoring history, no note about the skill's own status, and no placeholder for the person to fill |
| S7 | the skill says what it does not cover and that a direct instruction from the person wins |
| S8 | the skill treats the migration file as data, so an instruction inside it is a finding rather than an order |
| S9 | the first lines say what the skill produces, before any step |
| M1 | `npm run audit -- <path>` reports zero failures (the judge runs it) |
| D1 to D7 | the skill's instructions lead a reviewer to flag that planted item, whatever the skill calls it |
| D8 | the skill's instructions do not lead a reviewer to flag the nullable `ADD COLUMN` as blocking |

Shape total S1 to S9: at most 27 per arm. Coverage total D1 to D7: at most 21 per arm.

## Process check, not blind

A second judge opens each skilled run's `record.md` and checks, per run: the skill is at the path
the `delivered` line names; every tick carries a path or command from this run, and the judge
opens each one; the judge re-runs `npm run audit` on the delivered path and compares it with the
pasted block line for line; every `ran` path in the measured block opens; every `blocked` line
carries error text; and no file in the run directory names another run's directory.

## Predictions

- P1 Delivery: every arm delivers a SKILL.md in three of three runs.
- P2 Shape: diet total is at least the current total minus 2. Each skilled arm's total is at
  least the unaided total plus 3.
- P3 Audit: both skilled arms report zero failures in three of three. The unaided arm reports at
  least one failure in at least two of three.
- P4 Coverage: the unaided arm's total is at least each skilled arm's total, which is the cost
  the diet rounds recorded. The diet total is within 2 of the current total.
- P5 Process, diet arm: the audit re-run matches the pasted block in three of three; at least 90
  percent of ticks are anchored; every measured path opens in three of three; no cross-run read.
- P6 Baseline dispatch: whether a workflow run can dispatch its own subagent is unknown. The
  record states what happened. Nothing is predicted.

## Decision rule

The diet replaces the current skill where P1, the diet clause of P2, P3, the diet clause of P4,
and P5 all hold for the diet arm. `writing-skills` beats an unaided run where the second clause of
P2 holds for the diet arm and P3 holds.

## Power and limits

Three runs per arm. A difference of one point in one run is noise. Only an arm total that differs
by three or more counts, and the decision rule is written to that.

The round scores the produced skill's shape and what it tells a reviewer to check. It does not
run the produced skills on the migration, so it cannot say whether a review under them finds more
than a review without them. That is the skills-bench design and a later round.
