---
name: reviewing-index-health
description: Reviews a PostgreSQL table's index usage and reports which indexes are unused, duplicate, or bloated. Use before a migration adds or drops an index, or when someone asks why a query got slower after a schema change.
---

# Reviewing index health

## Outcome

A report naming every index on the table that is unused, duplicate, or bloated, with the statement
that would remove or rebuild it.

## Context

Read `reference/lock-modes.md` for which statements block reads and which block writes. PostgreSQL 14
or later is assumed unless the person names another version.

## Scope

In scope: reading `pg_stat_user_indexes` and `pg_indexes` for one named table and reporting on its
indexes. Out of scope: rewriting the migration file itself. No skill in this collection takes this
over yet.

## Method

1. List every index on the named table from `pg_indexes`.
2. Cross-reference each index against `pg_stat_user_indexes` for scan counts.
3. Flag an index with zero scans as unused, and two indexes on the same columns as duplicate.

## Finish

Before you report, count the indexes step 1 found and count the indexes addressed in the report.
Confirm the two counts match.

## Failure

Stop, and report what you have, where the table name given does not exist in the database.

Retry a step once, for two attempts in all, and only where something changed. Do not weaken a check
or edit a test to make it pass.
