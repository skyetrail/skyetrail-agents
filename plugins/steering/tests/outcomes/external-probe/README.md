# External probe

`auditing-skills` run against real skills written by someone else, to test whether our rules mean
anything on work we did not write.

- `PREREGISTRATION.md` — the questions and predictions, committed before any run.
- `SOURCE-SHA.txt` — the superpowers commit the snapshot came from.
- `skills/` — the seven skills as they stood at that commit, unmodified.
- `audits/` — what each run returned.
- `RESULTS.md` — the four measures, written after.

Not a scored bench. There is no answer key, on purpose: writing one would put us back in charge of
deciding what counts as a defect, which is the bias this exists to escape.
