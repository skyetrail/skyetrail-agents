# Skills lint

The mechanical gate for skills in this plugin. The linter checks that the frontmatter carries no
YAML hazards, the name format and length and that the name matches its directory, the
description length, the body line count, and that every reference resolves, in markdown links
and in backticked relative paths alike. Judgment stays with the rules files; these limits belong
to the script.

The linter is built into the repository's README generator and runs from the repository root:

- Command: `npm run lint`

The same checks run in the pre-commit hook and in CI, so a violation cannot merge. A lint
failure writes nothing and lists every problem with its file.

If this file is read where the repository is not present, such as the plugin installed on its
own, treat the linter as unavailable: say so in the report and continue with the judgment rules.
Do not re-derive the mechanical limits by hand and present them as a lint result.
