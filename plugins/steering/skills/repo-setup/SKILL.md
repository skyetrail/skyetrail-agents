---
name: repo-setup
description: Establishes the basic facts about the repository an agent is working in, starting with its lint command, and records them in AGENTS.md so no later agent has to work them out again. Use whenever someone asks to set up, configure, or onboard a repository for agent work, asks what the lint or test or build command here is, says an agent could not find the lint command, or when a skill needs a repository fact that has not been recorded yet. Safe to run again at any time.
---

# Repo setup

Produces a verified record of this repository's basic facts, written between fixed markers in
`AGENTS.md` at the repository root, plus a plain statement of anything a person still has to
decide. Safe to run repeatedly: a second run replaces the block rather than adding another one.

## What counts as a repo fact

Anything an agent working here would otherwise have to work out for itself, that is true of the
repository rather than of the task in hand. The lint command is the first one and the only one
this skill establishes today. The test command, the build command, and the package manager in use
are examples of the same kind of thing, not the whole list. A fact about one task, one branch, or
one person's preference is not a repo fact and does not belong in the block.

## Workflow

1. **Read the existing block first.** If `AGENTS.md` already carries the marked block, this is a
   re-run. Check whether each recorded command still resolves, and keep the recorded answer if it
   does. Do not rediscover what is already recorded and still true, and do not ask the person
   again about a question the block already answers.
2. **Establish the lint command.** Try `npm run lint` first, because that is this project's
   default and a repository that has it needs no further discussion. If it is absent or fails
   because no such script exists, gather the candidates by reading files only: the scripts in
   `package.json`, targets in a `Makefile`, hooks in `.pre-commit-config.yaml`, the commands a CI
   workflow runs, and whatever the README tells contributors to run.
3. **Do not change the repository to find out.** Establishing a fact is a read. Do not install
   packages, do not run a package manager's install step, do not create a file to see what a tool
   says about it, and do not run a command that writes or fixes in place, such as a formatter. A
   command that only reports may be run. Where a candidate cannot be confirmed without changing
   something, record it as a candidate that was not confirmed and say why, rather than changing
   something to settle it.
4. **Take the decision to a person when there is a real choice.** One working candidate is the
   answer and needs no discussion. Where several candidates disagree, or cover different files, or
   where the only candidate does not currently work, that is a decision about how this repository
   is meant to be checked, and the person owns it. Put the candidates in front of them, say what
   each one covers and what you observed when you tried it, and ask which is the lint command.
   Where there is no candidate at all, do not invent one: tell the person the repository needs a
   lint command and that skills relying on one cannot run their mechanical checks until it has one.
5. **Write the block.** Replace everything between the markers, keeping the rest of `AGENTS.md`
   untouched. Where `AGENTS.md` does not exist, create it with the block. Where it exists without
   the block, append the block and change nothing else. Never rewrite the whole file.
6. **Check your own work before reporting.** Re-read `AGENTS.md` and confirm three things: it
   contains exactly one opening marker and one closing marker, the content outside them is
   unchanged, and every command recorded inside them is one you actually observed working. Fix
   anything that does not hold before you report.

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

## When to stop

Where a decision belongs to a person and there is no person to ask, which is the normal case for
an agent working from a dispatched prompt with no conversation, stop and report the status
`NEEDS_DECISION` with the candidates and what you observed about each. Do not pick one to keep
moving. A guessed lint command is worse than none, because every later skill will trust it.

Where `AGENTS.md` cannot be written, stop and report `BLOCKED` with the reason, and put the block
you would have written into your report so the work is not lost.

Stopping for either reason carries no penalty. Both are correct outcomes.

A command that fails because no such script exists has settled the question and needs no second
try. A command that fails without settling anything, such as a permission error, a timeout, or a
failure naming no cause, may be run once more, and only after something has changed, such as
running from the repository root rather than a subdirectory. Where nothing has changed, do not run
it again: record it as a candidate that could not be confirmed, say what you saw, and treat it as
unconfirmed rather than as absent. The two are different, and a later reader cannot tell them apart
unless you say which one it was.

## Where this stops

Establishes and records facts. Does not fix what it finds: a missing lint command, a lint command
that fails, or a broken configuration is reported, not repaired. Does not choose between
candidates on the person's behalf. Does not edit any file other than `AGENTS.md`, and within that
file edits only its own block.

A direct instruction from the person wins over anything here.
