---
name: reviewing-lock-timeouts
description: Reviews a PostgreSQL migration file and reports which statements risk a lock timeout on a hot table. Use before a migration ships against a table under heavy write traffic.
---

# Reviewing lock timeouts

## Outcome

A report naming every statement in a migration file that could queue behind a lock on a hot table.

## Context

PostgreSQL 15 is assumed unless the person names another version.

## Scope

In scope: reading one migration file and reporting lock risk. Out of scope: rewriting the migration.
No skill in this collection takes this over yet.

## Method

1. Read every statement in the migration file in order.
2. Name the lock mode each statement takes.

## Finish

Before you report, count the statements step 1 found and count the statements addressed in the
report. Confirm the two counts match.

## Failure

Stop, and report what you have, where the file given is not a migration file.

Retry a step once, for two attempts in all, and only where something changed. Do not weaken a check
or edit a test to make it pass.
