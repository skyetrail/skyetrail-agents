# Writing style

The project style is enforced by running the vale npm script against the
ai-tells style. From the repository root:

```sh
npm run vale
```

A clean run prints nothing and exits 0. `.vale.ini` holds the
configuration. Read the rules there, not a list here. A restated list
drifts from its source.

## Which skills apply it

The skills `writing-skills` and `writing-agents` apply this file. It
states where the configuration is defined. It does not define a task of
its own.

`auditing-skills` does not apply it. An audit does not grade a target on
style, because style does not change what an agent does. Only an author
runs the vale check.

## What it covers

This file covers the sentences a person writes for an agent to read.
That includes a skill body, a rule file, a prompt template, and a
hand-off brief.

Out of scope: frontmatter, code, commands, file paths, error text, and
anything quoted from another source. Keep those verbatim.

`./steering-rules.md` contains the Voice rules. Those rules state who may
act and which sentences take an actor. An audit checks those rules. This
file does not restate them.

## Historical note

Before 2026-08-21, this project style was Simplified Technical English,
adapted from ASD-STE100. A blind test, ste-bench, ran two arms against the
same targets: one written under that standard, one not. Both arms
returned the same findings. The standard did not change what an agent
does. It changed only how easily a person could maintain a file. That
finding still stands, and this file keeps it on record.
