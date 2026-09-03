Write a skill for our team that reviews a database migration before it ships. We run PostgreSQL 15.
The orders and customers tables each hold about 200 million rows and take writes around the clock.
Deploys are rolling, so old and new code run side by side for a few minutes. The skill should tell
an agent how to read a migration file and report what must change before it can ship. Use
`20260821_orders_cleanup.sql` in this directory as the task to measure the skill against.
