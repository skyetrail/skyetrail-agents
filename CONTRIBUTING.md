# Contributing

Thanks for your interest in Skyetrail Agents. This repository holds open source,
MIT licensed plugins that follow the
[Open Plugin Specification](https://github.com/vercel-labs/open-plugin-spec) and
the [Agent Skills](https://agentskills.io/specification) format, so any host that
supports them can load them. This guide explains how the repository is laid out
and how to add or change a plugin.

## Repository layout

```
skyetrail-agents/
├── marketplace.json          # the catalog of plugins (source of truth)
├── .claude-plugin/
│   └── marketplace.json      # generated mirror for Claude Code (do not edit)
├── plugins/
│   └── <plugin-name>/
│       ├── .plugin/
│       │   └── plugin.json   # the plugin manifest (source of truth)
│       ├── .claude-plugin/
│       │   └── plugin.json   # generated mirror for Claude Code (do not edit)
│       ├── README.md         # generated from the manifest and frontmatter
│       └── skills/
│           └── <skill-name>/
│               └── SKILL.md  # one skill
├── eng/
│   └── generate-readmes.mjs  # builds the generated READMEs and mirrors
├── .github/workflows/        # checks that the generated files are current
├── README.md                 # the repo catalog, partly generated
└── LICENSE
```

The manifest lives in `.plugin/plugin.json` and the catalog lives in
`marketplace.json` at the repository root. These are the vendor-neutral locations
from the Open Plugin Specification, so the plugins are not tied to one tool. The
generator also writes copies under `.claude-plugin/` for hosts that read only
that older location, such as Claude Code. Treat the `.claude-plugin/` files as
generated output and do not edit them by hand.

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

1. Create `plugins/<plugin-name>/.plugin/plugin.json`. The only required field is
   `name`. A fuller manifest looks like this:

   ```json
   {
     "name": "my-plugin",
     "description": "What the plugin is for.",
     "version": "0.1.0",
     "author": { "name": "Skyetrail", "email": "pete@skyetrail.com" },
     "license": "MIT"
   }
   ```

2. Add the plugin's skills under `plugins/<plugin-name>/skills/`.
3. Register the plugin in `marketplace.json` at the repository root by adding an
   entry to the `plugins` array with a `name` and a `source`. The `source` is a
   relative path from the repository root that must start with `./`, so a plugin
   in `plugins/my-plugin/` has `"source": "./plugins/my-plugin"`.
4. Run the generator and commit the changes.

## Generate the README files

The repository README and each plugin README are generated from the manifests
and the skill frontmatter. The generator also writes the `.claude-plugin/` mirror
manifests. Do not edit the generated files or sections by hand.

```sh
node eng/generate-readmes.mjs
# or
npm run build
```

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
