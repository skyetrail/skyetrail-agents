# Skills lint

This file settles the mechanical limits for a target once. A report can then cite the lint
result. The report does not need to work out the limits by hand again. A finding does not need
to argue the limits again.

Reading a lint script or its configuration to establish what it covers changes nothing. Change
nothing at all to make a check reach further or to make it pass. The target, the lint script, its
configuration, an ignore file, a CI definition, and a fixture are examples, not the whole list.
Recording a confirmed command through `repo-setup` is the one change this file asks for.

A lint is a script. It checks things it can decide on its own. It can check
whether a file parses and whether a file stays within a stated limit. It can also check whether
the things a file points at exist. Judgement stays with the rule files. These limits belong to
the script. Each repository decides which checks its own lint performs. This is the repository's
business, not this file's business. Establish what those checks are. Do not assume them.

## Which command

The target decides which command settles the mechanical checks.

A SKILL.md goes to `npm run audit -- <path>`, run from the root of this plugin's repository. That
command takes the path, so the target need not sit in that repository. It reports every mechanical
check by name. Ask it what it checks with `npm run audit -- --explain`.

Anything else goes to the target repository's own lint. Find that command below. Use it for a
prompt, a hand-off brief, a command, a runbook, and an instruction file. These are examples, not
the whole list.

Everything below about a command that will not run applies to both.

## Finding the lint command

The lint command belongs to the current repository, not to this plugin, so look for it in this
order.

1. The `repo-setup` block in the repository's `AGENTS.md` file records the command a person
   confirmed. If it exists, use it.
2. `npm run lint` is the default. Try it where step 1 finds no recorded command. A recorded
   command always wins, because a person confirmed it.
3. This repository has no recorded command and no `npm run lint`. Use the `repo-setup` skill to
   establish the command. Then record it. Do not guess the command from what the repository
   seems to contain.

## When it does not settle the target

A lint fails to settle your target in more than one way, and these cases are not interchangeable.
Others exist, so read them as examples rather than as the whole list. In every case,
say what happened. Then continue with the judgement rules. Do not work out the mechanical limits by
hand again. Do not present that result as a lint result.

**No lint command exists for this repository.** Say so. If a person is present, tell them the
repository needs one. Until the repository has one, every skill that leans on this file works
without a mechanical gate.

**A command exists but you cannot run it from where you are.** This is the usual case for an
agent that works in one subdirectory of a repository. The repository's lint runs from the root.
Report the command you could not run. Say why. Do not run a command whose reach you cannot
bound. Do not run it to avoid reporting the gap.

**The command runs, exits clean, and never opens your target.** This case looks like a pass. It
is not a pass. Establish what the command reads. Do this before you record a clean result. Also
establish whether the command's reach covers your target. If the repository offers a way to ask
the command, use it. If not, read the script. Do not take a description of coverage from any
document, even this one. Prose about what a script does can go stale. Nothing fails when this
happens, so if the command does not cover the target, report a coverage gap. Say which check did
not run. A lint can report every file up to date. It can do this while it never opens the file
you audit. This kind of lint is worse than no lint. It makes a pass that nobody questions.

Sometimes a run fails without settling which case applies. A timeout is one example. An error
that does not name a cause is another example. Run the command one more time, but only after something
changes. If nothing changes, do not run it again. Instead, record that the command could not
run. Say what you saw.

Some lints describe themselves, often behind a flag such as `--explain`. A self-description built
from the same data as the run cannot disagree with the run. Prefer it over any prose, including
prose in this file. Where the repository has a `repo-setup` block in `AGENTS.md`, that block records
whether its lint offers one. Where it has no such block, try the flag and see.
