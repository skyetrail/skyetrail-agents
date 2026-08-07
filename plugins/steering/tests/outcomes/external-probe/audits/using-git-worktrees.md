# Audit: using-git-worktrees (single audit)

Conditions applied: reused met, hand-off not met, changes something met, advisory not met. The
auditor derived the last two from the target's own content, noting it creates worktrees and
branches, edits and commits `.gitignore`, runs installers, and runs tests.

Counts: **Blocking 4, Important 6, Advisory 1.**

## Lint, handled correctly

The auditor ran `npm run lint`, got a clean result, then read `eng/generate-readmes.mjs` and
established that `readComponents()` only walks `plugins/<name>/skills/*/SKILL.md` for plugins in
`marketplace.json`, and that the reference lint excludes `tests/`. It concluded the lint never
opens this target and reported a coverage gap rather than a clean pass, then hand-checked the
mechanical limits and labelled them as hand-derived rather than lint output.

This is the behaviour the rewritten `shared/lint.md` asks for, on its first run against a case it
was written for, without being told the gap existed.

## Blocking findings

1. No out-of-scope statement anywhere in the file.
2. The ecosystem list, Node, Rust, Python and Go, is not marked as examples, and the Quick
   Reference confirms it is treated as the whole set: an unlisted ecosystem such as Ruby or Java
   gets no setup at all rather than a reported gap.
3. No prohibition on weakening or editing a failing baseline test to force a pass.
4. No recorded baseline comparison in the plugin's `tests/baselines/`.

## Finding 4 is a defect in our rules, not in the target

The auditor flagged the problem itself: this file is an external capture, not a skill authored or
adopted by this plugin, so there is no `tests/baselines/` directory it could ever be recorded in.
It applied the rule literally as instructed and marked it blocking anyway.

The rule as written assumes the skill lives inside our plugin. Applied to any skill that does not,
it is an automatic blocking failure that carries no information. Every external skill will fail it,
always, for a reason that has nothing to do with the skill.

## Findings that transfer, and findings that are house style

Transfers, because the consequence is checkable without agreeing with us: the ecosystem list, where
an unlisted project type is skipped in silence rather than reported. The missing prohibition on
weakening a failing test. The absent statement of what happens to a created worktree and installed
dependencies when a run stops partway.

House style, where a reasonable author would simply disagree: description not written in the third
person, no copyable tick-off checklist, no named successor skill.
