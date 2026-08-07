---
name: repo-setup
description: Establishes the basic facts about the repository an agent is working in, starting with its lint command, and records them in AGENTS.md so no later agent has to work them out again. Use whenever someone asks to set up, configure, or onboard a repository for agent work, asks what the lint or test or build command here is, says an agent could not find the lint command, or when a skill needs a repository fact that has not been recorded yet. Safe to run again at any time.
---

# Repo setup

This skill produces a verified record of this repository's basic facts. It writes that record
between fixed markers in `AGENTS.md` at the repository root. It also states plainly anything a
person still has to decide.

This skill is safe to run again. A second run replaces the block. It does not add another one.

## What counts as a repo fact

A repo fact is anything true of the repository rather than of the task in hand, which an agent
working here would otherwise work out for itself. The lint command is the first, and today it is
the only one this skill establishes. The test command, the build command, and the package manager
in use are examples of the same kind of thing, not the whole list.

A fact about one task, one branch, or one person's preference is not a repo fact. It does not
belong in the block.

## Workflow

1. **Read the existing block first.** Where `AGENTS.md` already carries the marked block, this run
   is a re-run. Check whether each recorded command still resolves. Keep the recorded answer where
   it does. Do not rediscover what the block already records and what is still true. Do not ask the
   person again about a question the block already answers.
2. **Establish the lint command.** Try `npm run lint` first. That is this project's default, and a
   repository that has it needs no further discussion. Where it is absent, or where it fails because
   no such script exists, gather the candidates by reading files only. A candidate is anywhere this
   repository records a command that checks the code without changing it. The scripts in
   `package.json`, targets in a `Makefile`, hooks in `.pre-commit-config.yaml`, the commands a CI
   workflow runs, and whatever the README tells contributors to run are examples, not the whole
   list. The same test covers a repository that keeps its configuration somewhere else, such as
   `pyproject.toml`, `tox.ini`, or a tool's own config file. Where you find no candidate, say you
   found none. Do not conclude that none exists.
3. **Do not change the repository to find out.** Establishing a fact is a read. Do not install
   packages. Do not run a package manager's install step. Do not create a file to see what a tool
   says about it. Do not run a command that writes or fixes in place, such as a formatter. You may
   run a command that only reports. Where you cannot confirm a candidate without changing
   something, record it as a candidate you did not confirm, and say why. Do not change something to
   settle it.
4. **Take the decision to a person where there is a real choice.** One working candidate is the
   answer. It needs no discussion. A real choice arises where several candidates disagree, where
   they cover different files, or where the only candidate does not work today. That is a decision
   about how this repository is meant to be checked, and the person owns it. Put the candidates in
   front of them. Say what each one covers, and what you saw when you tried it. Ask which one is
   the lint command. Where you find no candidate at all, do not invent one. Tell the person the
   repository needs a lint command. Tell them that skills relying on one cannot run their
   mechanical checks until it has one.
5. **Write the block.** Replace everything between the markers. Keep the rest of `AGENTS.md`
   untouched. Where `AGENTS.md` does not exist, create it with the block. Where it exists without
   the block, append the block and change nothing else. Never rewrite the whole file.
6. **Check your own work before you report.** Run these commands. Do not read the file and judge by
   eye, because a changed line outside the markers is exactly what an eye skips.

   ```
   grep -c 'BEGIN: repo-setup' AGENTS.md      # must print 1
   grep -c 'END: repo-setup' AGENTS.md        # must print 1
   grep -n '<command>\|<what it covers\|<anything a person' AGENTS.md   # must print nothing
   git diff -- AGENTS.md                      # every changed line sits between the markers
   ```

   Where the repository does not use git, copy `AGENTS.md` before step 5 and `diff` against the
   copy instead. Then confirm the one thing no command settles: you saw every command recorded
   inside the markers work, in this run.

   Fix anything that does not hold before you report. Where you cannot fix it, undo your write.
   Delete `AGENTS.md` where you created it. Remove only your own block where the file already
   existed. Then report `BLOCKED` with what failed. Do not weaken this check to finish. Do not skip
   it. Do not report a check you did not run. An unverified block is worse than no block, because
   everything downstream trusts it.

## The block

Write it exactly like this, markers included.

```
<!-- BEGIN: repo-setup -->
## Repository facts

Established by the `repo-setup` skill. Re-run it rather than editing this block by hand.

- **Lint command:** `<command>` — <what it covers, and how it was confirmed>

Unresolved: <anything a person still has to decide, or "none">
<!-- END: repo-setup -->
```

## Statuses

Report `DONE` where the block is written and every check in step 6 holds. Report `NEEDS_DECISION`
or `BLOCKED` as below. These three are the whole set. Do not invent a fourth.

## When to stop

Sometimes a decision belongs to a person and no person is there to ask. That is the normal case for
an agent working from a dispatched prompt with no conversation. Stop, and report the status
`NEEDS_DECISION`. Give the candidates and what you saw about each one. Do not pick one to keep
moving. A guessed lint command is worse than none, because every later skill trusts it.

Where you cannot write `AGENTS.md`, stop and report `BLOCKED` with the reason. Put the block you
would have written into your report, so the work is not lost.

Stopping for either reason carries no penalty. Both are correct outcomes.

A command that fails because no such script exists has settled the question. It needs no second
try. A command can also fail without settling anything, through a permission error, a timeout, or a
failure that names no cause. Run that one once more, and only after something has changed, such as
running from the repository root rather than a subdirectory. Where nothing has changed, do not run
it again. Record it as a candidate you could not confirm. Say what you saw. Treat it as unconfirmed
rather than as absent. The two differ, and a later reader cannot tell them apart unless you say
which one it was.

## Where this stops

This skill establishes and records facts. It does not fix what it finds. It reports a missing lint
command, a lint command that fails, or a broken configuration. It does not repair them. It does not
choose between candidates for the person. It edits no file other than `AGENTS.md`, and inside that
file it edits only its own block.

No skill takes over where this one stops. Both stop conditions hand back to a person, because both
are decisions about how this repository is meant to work, and nothing here can settle them.

A direct instruction from the person wins over anything here.
