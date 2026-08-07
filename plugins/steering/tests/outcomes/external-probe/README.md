# External probe

`auditing-skills` run against real skills written by someone else, to test whether our rules mean
anything on work we did not write.

## The material is not vendored here

The skills audited belong to Jesse Vincent's `superpowers` collection, MIT licensed. They are cited,
not copied. To reproduce, fetch the exact commit the audits ran against:

```
git clone https://github.com/obra/superpowers /tmp/superpowers
git -C /tmp/superpowers checkout $(cat SOURCE-SHA.txt)
```

Seven skills were audited: `brainstorming`, `finishing-a-development-branch`,
`receiving-code-review`, `subagent-driven-development`, `using-git-worktrees`, `writing-plans`,
`writing-skills`. The first five were chosen mechanically, every third of the fourteen sorted
alphabetically. `receiving-code-review` and `writing-skills` were added deliberately and are marked
as such in the pre-registration.

Paths inside `audits/` refer to where the snapshot sat while the audits ran, under
`external-probe/skills/`. Restore it to that path if you want those line references to resolve.

## Contents

- `PREREGISTRATION.md` — questions, selection rule, and predictions, committed before any run.
- `RESULTS.md` — the four measures.
- `audits/CORRECTIONS.md` — read alongside the results. Four blocking findings are void because
  sampling seven of fourteen skills severed references to the seven not copied.
- `SOURCE-SHA.txt` — the commit audited.

Not a scored bench, and there is no answer key. Writing one would put the author of the rules back
in charge of deciding what counts as a defect, which is the bias the probe exists to escape.
