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
[Agent Plugins specification](https://agent-plugins.org) and the
[Agent Skills](https://agentskills.io) format. They are not tied to one tool, so
any client that supports the spec can load them. Each plugin carries one
manifest, `plugin.json`, at its root.

The Agent Plugins specification leaves distribution out of scope, so the
catalog is Claude Code distribution config. It lives once, hand edited, at
`.claude-plugin/marketplace.json`, the location Claude Code's installer
requires. Nothing in the repository is a generated mirror.

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
| [`skyetrail`](plugins/skyetrail) | 2.0.0 | Skyetrail house tools for agents. Starts with the Skyetrail plain-English writing style and grows as we share more of our working setup. | 1 | 0 | 0 |
| [`steering`](plugins/steering) | 1.0.0 | Skills for steering agents. Write a skill with a measured baseline, audit a skill or an agent prompt against the house rules, and write the prompt and caller side for a dispatched agent. Shared rule files and a dispatch protocol back all three. | 3 | 0 | 0 |

<!-- END: plugins -->

## Skills

<!-- BEGIN: skills -->

| Skill | Plugin | Version | Description |
| --- | --- | --- | --- |
| [`skyetrail-writing`](plugins/skyetrail/skills/skyetrail-writing/SKILL.md) | [`skyetrail`](plugins/skyetrail) | 1.0.0 | Skyetrail's plain-English house writing style. Use whenever writing or editing prose, such as documents, emails, messages, marketing copy, or posts. Enforces no em dashes, plain everyday words, complete sentences, no jargon, and no imagery. |
| [`auditing-skills`](plugins/steering/skills/auditing-skills/SKILL.md) | [`steering`](plugins/steering) | 1.0.0 | Audits a skill or an agent prompt against the house rules and reports what to fix, marking each finding blocking, important, or advisory. Use this whenever someone asks to review, check, audit, lint, or sanity-check a skill, a SKILL.md, or a prompt written for a subagent, when they want to know why a skill is not triggering or not being followed, or when a skill is about to ship. |
| [`writing-agents`](plugins/steering/skills/writing-agents/SKILL.md) | [`steering`](plugins/steering) | 1.0.0 | Writes the prompt for an agent that will not see the current conversation, along with the caller side that dispatches it and handles what comes back. Use this whenever someone mentions handing work to a subagent, dispatching or spawning agents, writing a prompt or a template for an agent, running work in parallel across several agents, or turning a predefined named agent into something composed at the point of dispatch. Use it even when the word agent is not used, if work is being handed to something that starts with no context. |
| [`writing-skills`](plugins/steering/skills/writing-skills/SKILL.md) | [`steering`](plugins/steering) | 1.0.0 | Writes a new Agent Skill or fixes an existing one, producing a SKILL.md and its reference files. Use this whenever someone mentions writing, creating, drafting, or improving a skill or a SKILL.md, and also when they ask how to get an agent to do something the same way every time, say a skill is not triggering, or say a skill is being ignored. Use it even when the word skill is not used, if the request is about capturing a repeatable way of working. |

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
