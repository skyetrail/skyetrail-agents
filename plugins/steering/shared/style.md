# Writing style

Check every document with the vale npm script. From the repository root:

```sh
npm run vale
```

A clean run prints nothing and exits 0. `.vale.ini` holds the
configuration. Read the rules there, not a list here. A restated list
drifts from its source.

## Who applies it

The vale npm script checks the whole repository, so no skill needs to
name this file for its prose to be checked. `writing-skills` points here
when an author writes sentences. This file states where the
configuration is defined. It does not define a task of its own.

An audit does not grade a target on style, because style does not change
what an agent does. Only an author runs the vale check.

## What it covers

This file covers the sentences a person writes for an agent or a reader.
That includes a skill body, a rule file, a prompt template, a hand-off
brief, and a frontmatter description. A frontmatter description is in
scope because the generated README files republish it word for word, and
the check reads the whole file, frontmatter included. The manifest
descriptions in `plugin.json` and `marketplace.json` reach the same
README files, so the vale npm script extracts and checks those too.

Out of scope: code, commands, file paths, error text, and anything
quoted from another source. Keep those verbatim. To quote a word as a
word, put it in a code span, which the check skips.

`./steering-rules.md` contains the Voice rules. Those rules state who may
act and which sentences take an actor. An audit checks those rules. This
file does not restate them.
