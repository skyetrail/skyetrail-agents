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
├── .claude-plugin/
│   └── marketplace.json      # the catalog of plugins
├── plugins/
│   └── <plugin-name>/
│       ├── plugin.json       # the plugin manifest
│       ├── README.md         # generated from the manifest and frontmatter
│       └── skills/
│           └── <skill-name>/
│               └── SKILL.md  # one skill
├── eng/
│   └── generate-readmes.mjs  # builds the generated files and lints the skills
├── .github/workflows/        # checks that the generated files are current
├── README.md                 # the repo catalog, partly generated
└── LICENSE
```

Each plugin carries one manifest, `plugin.json`, at its root, per the Agent
Plugins specification. The spec leaves distribution out of scope, so the catalog
lives once at `.claude-plugin/marketplace.json`, the location Claude Code's
installer requires. Edit it directly; nothing in the repository is a generated
mirror.

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
3. Register the plugin in `.claude-plugin/marketplace.json` by adding an entry
   to the `plugins` array with a `name` and a `source`. The `source` is a
   relative path from the repository root that must start with `./`, so a plugin
   in `plugins/my-plugin/` has `"source": "./plugins/my-plugin"`.
4. Run the generator and commit the changes.

## Generate the README files

The repository README and each plugin README are generated from the manifests
and the skill frontmatter. Do not edit the generated files or sections by hand.

```sh
npm run build
```

The build also lints every skill: YAML hazards in the frontmatter, name format
and directory match, description length, body line count, and reference
resolution. A lint problem stops the build and fails the pull request, with each
problem listed by file. `npm run lint` runs the same checks on their own.

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
