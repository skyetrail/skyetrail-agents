# skill-linting

This skill codifies the Agent Skills authoring best practices into a lint
workflow. It checks a single skill or a whole repository of skills and reports
which rules pass or fail.

## Keeping the rules current

The rules in `SKILL.md`, `references/rules.md`, and `scripts/lint_skill.py` are
derived from the official best practices guide:

<https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices>

That page is maintained by Anthropic and changes over time. Resync this skill to
it periodically so the rules stay accurate:

1. Read the current best practices page, including its "Checklist for effective
   Skills" near the end.
2. Compare each item and limit on the page against the rules in
   `references/rules.md` and the checks in `scripts/lint_skill.py`.
3. Add, remove, or reword rules so they match the page. Keep the rule ids stable
   where you can, and update the short list in `SKILL.md` to match.
4. Bump `metadata.version` in the `SKILL.md` frontmatter.

A good cadence is every few months, or whenever you learn the guide has changed.

## Files

- `SKILL.md` — the lint workflow, the rule list, and the report format.
- `references/rules.md` — the full criteria and fixes for every rule.
- `scripts/lint_skill.py` — the mechanical checks, written with the Python
  standard library so it runs anywhere with no install.
