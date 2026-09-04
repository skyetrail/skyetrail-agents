---
name: repo-setup
description: Establishes the basic facts about the repository an agent is working in, starting with its lint command, and records them in the project's memory so no later agent has to work them out again. Use whenever someone asks to set up, configure, or onboard a repository for agent work, asks what the lint or test or build command here is, says an agent could not find the lint command, or when a skill needs a repository fact that has not been recorded yet. Safe to run again at any time.
---

# Repo setup

This skill produces a checked record of this repository's basic facts and writes it to one fixed
path: `repo-setup.md` in the project's memory, the persistent memory directory your system prompt
names for this project. Every run that reaches step 4 writes that file, whatever it found. The
skill changes nothing in the repository. It also states plainly anything a person still has to decide.

This skill is safe to run again. A second run replaces what it confirms and keeps the rest.

## What counts as a repo fact

A repo fact is anything true of the repository rather than of the task in hand, which an agent
working here would otherwise work out for itself. The lint command is the first, and today it is
the only one this skill establishes. The test command, the build command, and the package manager
in use are examples of the same kind of thing, not the whole list.

A fact about one task, one branch, or one person's preference is not a repo fact.

## Workflow

1. **Read the existing record first.** Where the memory directory already holds `repo-setup.md`,
   this run is a re-run. Check whether each recorded command still resolves. Keep the recorded
   answer where it does. Do not ask the person again about a question the record already answers.
   Then run `git status --porcelain` in the repository and keep its output, because step 6
   compares against it.
2. **Establish the lint command.** Try `npm run lint` first. That is this project's default, and
   a repository that has it needs no further discussion. Where it is absent, or fails because no
   such script exists, gather the candidates by reading files only. A candidate is anywhere this
   repository records a command that checks the code without changing it. The scripts in
   `package.json`, targets in a `Makefile`, hooks in `.pre-commit-config.yaml`, the commands a CI
   workflow runs, and whatever the README tells contributors to run are examples, not the whole
   list. Where you find no candidate, say you found none. Do not conclude that none exists.
3. **Do not change the repository to find out.** Establishing a fact is a read. Do not install
   packages, run an install step, create a file to see what a tool says, or run a command that
   writes or fixes in place. You may run a command that only reports. Where you cannot confirm a
   candidate without changing something, record it as unconfirmed and say why.
4. **Write the record, whatever you found.** Write `repo-setup.md` in the memory directory, in
   the shape below, and one line for it in that directory's `MEMORY.md`, replacing the line where
   one is there. One working candidate is the answer, and the record names it as confirmed. Where
   several candidates disagree, cover different files, or none works today, the record names no
   command as confirmed and lists every candidate with what it covers under `Unresolved`, so the
   next agent inherits the discovery rather than repeating it. Where the file already holds a fact
   this run did not establish, write that fact back unchanged. Where your system prompt does not
   name a memory directory, put the record in your report and return `NEEDS_CONTEXT`, naming the
   directory as the missing field.
5. **Take the decision to a person where more than one answer is possible.** Put the candidates
   in front of the person with what each covers and what you saw, and ask which one is the lint
   command. Where you find no candidate at all, tell the person the repository needs one, and
   that skills relying on one cannot run their mechanical checks until it has one.
6. **Check your own work before you report.** Run these commands. Do not judge by eye.

   ```
   test -f <memory dir>/repo-setup.md && echo present                                    # must print present
   grep -c '<command>\|<what it covers\|<anything a person' <memory dir>/repo-setup.md   # must print 0
   grep -c 'repo-setup.md' <memory dir>/MEMORY.md                                      # must print 1
   git status --porcelain      # must match what step 1 kept, or you changed the repository
   ```

   Then confirm the one thing no command settles: you saw every command in the record work, in
   this run. Fix anything that does not hold and run the checks again. Where you cannot fix it,
   delete the file and the index line where this run created them, and report `BLOCKED` with the
   check that failed. Never delete a record you did not write in this run.

## The record

```
---
name: repo-setup
description: "<the lint command, and what it covers, in one line>"
metadata:
  type: project
---

Established by the `repo-setup` skill on <date>. Re-run it rather than editing this by hand.

- **Lint command:** `<command>`, run from <where>. Confirmed by <how>.
- **What the lint covers:** <how to ask the command, or what reading the script showed>

Unresolved: <anything a person still has to decide, or "none">
```

The index line in `MEMORY.md`: `- [Repo setup](repo-setup.md) — lint: <command>`.

## Statuses

| Status | Means | The caller must |
| --- | --- | --- |
| `DONE` | `repo-setup.md` is written and every check in step 6 holds. | Use the recorded facts. Do not re-establish them. |
| `NEEDS_DECISION` | More than one candidate remains and no person was there to decide. `repo-setup.md` lists them under `Unresolved`. | Put the candidates to a person. Never pick one on their behalf. |
| `BLOCKED` | A check failed and no edit fixed it, or the memory directory could not be written. | Read the cause. Fix it, then run this skill again. |
| `NEEDS_CONTEXT` | The instruction that dispatched this run left out something it needed. | Supply what was missing. This is the caller's failure, not the agent's. |

Add a status only where a run needs one these four do not cover, and declare it here.

## When to stop

Where a decision belongs to a person and no person is there, write the record with the candidates
under `Unresolved` first, then stop and report `NEEDS_DECISION` with the candidates and what you
saw about each. Do not pick one to keep moving. A guessed lint
command is worse than none, because every later skill trusts it.

A command that fails because no such script exists has answered the question. A permission error,
a timeout, or a failure that does not name a cause has not. Run that one once more, only after something
has changed, such as running from the repository root. Where nothing changed, record it as
unconfirmed and say what you saw. Unconfirmed and absent differ, and a later reader cannot tell
them apart unless you say which.

Stopping for either reason carries no penalty. Both are correct outcomes.

## Where this stops

This skill establishes and records facts. It does not fix what it finds, and it does not choose
between candidates for the person. It writes nothing inside the repository. No skill takes over
where this one stops. Both stop conditions hand back to a person.

A direct instruction from the person wins over anything here.
