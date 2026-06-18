# Skyetrail Agents

Open source, MIT licensed agent plugins from Skyetrail.

[Skyetrail](https://skyetrail.com) is an AI engineering and due diligence
consultancy for utilities and cleantech companies. We build small plugins to make
our own agent work faster and more consistent, and we share them here so anyone
can use them. Everything in this repository is free to use under the
[MIT License](LICENSE).

## What is in here

Each plugin is a self contained folder with a manifest and one or more skills. A
skill is a folder with a `SKILL.md` file that tells an agent how to do a specific
task. The agent reads the name and description of every skill at startup and
loads the full instructions only when a task matches, so you can keep many skills
on hand at a low cost.

These plugins follow the
[Open Plugin Specification](https://github.com/vercel-labs/open-plugin-spec) and
the [Agent Skills](https://agentskills.io) format. They are not tied to one tool,
so any host that supports the spec can load them. Each plugin keeps its manifest
in `.plugin/plugin.json`, and the catalog of plugins lives in `marketplace.json`
at the repository root.

Some hosts, including Claude Code today, read the manifest only from the older
`.claude-plugin/` location. The generator writes matching `.claude-plugin/`
copies so the same plugins install in those hosts too. The open spec files stay
the source of truth, and the copies are generated, so you never edit them by
hand.

## Install

You can use these plugins in two ways:

- Copy a plugin folder, or a single skill folder, into your own project. A skill
  is just a folder with a `SKILL.md` file, so it works on its own.
- Add this repository as a marketplace in a host that supports the Open Plugin
  Specification, then install the plugin you want.

For example, in a host that uses slash commands:

```
/plugin marketplace add skyetrail/skyetrail-agents
/plugin install skyetrail@skyetrail-agents
```

## Plugins

<!-- BEGIN: plugins -->

| Plugin | Version | Description | Skills | Commands | Agents |
| --- | --- | --- | --- | --- | --- |
| [`skyetrail`](plugins/skyetrail) | 1.0.0 | Skyetrail house tools for agents. Starts with the Skyetrail plain-English writing style and grows as we share more of our working setup. | 2 | 0 | 0 |

<!-- END: plugins -->

## Skills

<!-- BEGIN: skills -->

| Skill | Plugin | Version | Description |
| --- | --- | --- | --- |
| [`skill-linting`](plugins/skyetrail/skills/skill-linting/SKILL.md) | [`skyetrail`](plugins/skyetrail) | 1.0.0 | Audits Agent Skills against the official Skill authoring best practices and reports which rules pass or fail. Use when asked to lint, audit, or review a skill or a SKILL.md, to check a skill against best practices, or to scan a repository or plugin for skills that need fixing. Works on a single skill directory or any repository that contains skills. |
| [`skyetrail-writing`](plugins/skyetrail/skills/skyetrail-writing/SKILL.md) | [`skyetrail`](plugins/skyetrail) | 1.0.0 | Skyetrail's plain-English house writing style. Use whenever writing or editing prose, such as documents, emails, messages, marketing copy, or posts. Enforces no em dashes, plain everyday words, complete sentences, no jargon, and no imagery. |

<!-- END: skills -->

> The two tables above are generated from the plugin manifests and the skill
> frontmatter by `eng/generate-readmes.mjs`. Do not edit them by hand.

## Contributing

We welcome new plugins and skills. See [CONTRIBUTING.md](CONTRIBUTING.md) for the
repository layout, how to add a plugin or a skill, and how to run the generator.

## Acknowledgements

The README generation tooling and the validation workflow are adapted from
[github/awesome-copilot](https://github.com/github/awesome-copilot) (MIT). See
[ATTRIBUTIONS.md](ATTRIBUTIONS.md) for the full notice.

## License

[MIT](LICENSE). Copyright Skyetrail.
