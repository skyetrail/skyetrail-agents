# Contributing

Thanks for your interest in Skyetrail Agents. This repository holds open source,
MIT licensed plugins that follow the
[Agent Plugins specification](https://agent-plugins.org) and the
[Agent Skills](https://agentskills.io/specification) format, so any client that
supports them can load them. This guide explains how the repository is laid out
and how to add or change a plugin.

## Repository layout

```
skyetrail-agents/
├── marketplace.json          # the catalog of plugins (edit this one)
├── .claude-plugin/
│   └── marketplace.json      # generated shim for Claude Code (do not edit)
├── plugins/
│   └── <plugin-name>/
│       ├── plugin.json       # the plugin manifest
│       ├── SUMMARY.md        # optional hand-written summary, included in the README
│       ├── README.md         # generated from the manifest and frontmatter
│       └── skills/
│           └── <skill-name>/
│               └── SKILL.md  # one skill
├── eng/
│   ├── skill-checks.mjs      # every mechanical check, held as data
│   ├── generate-readmes.mjs  # builds the generated files and lints the skills
│   ├── audit-skill.mjs       # runs every check against one skill, at any path
│   └── measure-sentences.mjs # sentence length against the writing-style caps
├── .github/workflows/        # checks that the generated files are current
├── README.md                 # the repo catalog, partly generated
└── LICENSE
```

Each plugin carries one manifest, `plugin.json`, at its root, per the Agent
Plugins specification. The catalog's source of truth is `marketplace.json` at
the repository root. Claude Code's installer reads the catalog only from
`.claude-plugin/marketplace.json`, so the generator writes that copy as a shim;
never edit the shim by hand.

A plugin can also hold `commands/` and `agents/` folders. The generator picks up
those too.

## Add a skill to an existing plugin

1. Create `plugins/<plugin-name>/skills/<skill-name>/SKILL.md`.
2. Give it frontmatter with at least a `name` and a `description`.

   ```markdown
   ---
   name: my-skill
   description: One clear sentence on what the skill does and when to use it.
   ---

   # My skill

   The instructions the agent follows go here.
   ```

3. Run the generator (see below) and commit the changes.

Write the skill body in plain English. The
[skyetrail-writing](plugins/skyetrail/skills/skyetrail-writing/SKILL.md) skill in
this repository is the house style we follow.

## Add a new plugin

1. Create `plugins/<plugin-name>/plugin.json`. The spec requires `$schema` and
   `name`; the lint enforces both. A fuller manifest looks like this:

   ```json
   {
     "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
     "name": "my-plugin",
     "description": "What the plugin is for.",
     "version": "0.1.0",
     "author": { "name": "Skyetrail", "email": "info@skyetrail.com" },
     "license": "MIT"
   }
   ```

2. Add the plugin's skills under `plugins/<plugin-name>/skills/`.
3. Register the plugin in `marketplace.json` at the repository root by adding
   an entry to the `plugins` array with a `name` and a `source`. The `source` is
   a relative path from the repository root that must start with `./`, so a
   plugin in `plugins/my-plugin/` has `"source": "./plugins/my-plugin"`.
4. Run the generator and commit the changes.

## Generate the README files

The repository README and each plugin README are generated from the manifests
and the skill frontmatter, and the generator writes the
`.claude-plugin/marketplace.json` shim from the root catalog. Do not edit the
generated files or sections by hand.

```sh
npm run build
```

The build also lints every skill. A lint problem stops the build and fails the
pull request, with each problem listed by file. `npm run lint` runs the same
checks on their own, and `npm run lint -- --explain` prints which checks each
kind of file gets.

## Check one skill

To run every mechanical check against a single skill, including the ones on
bundled scripts and evaluation records:

```sh
npm run audit -- plugins/steering/skills/writing-skills
```

The path may be anywhere on disk, so the skill need not sit in this repository.
`npm run audit -- --explain` prints the whole set of checks.

Both commands read the same list, in `eng/skill-checks.mjs`. Add a check there,
not in a caller, and do not describe a check in prose that a command can print
itself.

The scripts in this repository are plain Node-executable JavaScript (`.mjs`), so
they need only Node and no install. See [AGENTS.md](AGENTS.md) for the
convention.

To install the pre-commit hook that runs this for you:

```sh
pip install pre-commit   # or: brew install pre-commit
pre-commit install
```

A GitHub Actions workflow runs the generator on every pull request and fails if
the committed files are out of date, so the hook is a convenience, not a
requirement.

## License

By contributing, you agree that your work is licensed under the
[MIT License](LICENSE).
