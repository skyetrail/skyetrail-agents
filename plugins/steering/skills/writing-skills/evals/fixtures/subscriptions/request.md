Write a skill for our team that reviews a database migration before it ships. We run PostgreSQL 15.
The subscriptions and accounts tables each hold about 90 million rows and take writes around the
clock. Deploys are rolling, so old and new code run side by side for a few minutes. The skill should
tell an agent how to read a migration file and report what must change before it can ship. Use
`migration.sql` in this directory as the task to measure the skill against.
