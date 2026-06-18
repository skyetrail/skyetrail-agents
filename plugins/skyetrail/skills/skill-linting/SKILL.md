---
name: skill-linting
description: Audits Agent Skills against the official Skill authoring best practices and reports which rules pass or fail. Use when asked to lint, audit, or review a skill or a SKILL.md, to check a skill against best practices, or to scan a repository or plugin for skills that need fixing. Works on a single skill directory or any repository that contains skills.
license: MIT
metadata:
  version: "1.0.0"
---

# Skill linting

Check one skill or a whole repository of skills against the Agent Skills authoring best practices, and return a report that marks each rule pass or fail.

## When to use
Use this when someone asks to lint, audit, or review a skill, to check a `SKILL.md` against best practices, or to scan a repository or plugin for skills that need work.

## Inputs
The target is one of:
- a single `SKILL.md` file
- a skill directory that contains `SKILL.md`
- a repository or directory that contains one or more skills

If no target is given, ask for one, or default to the current directory.

## Workflow
Copy this checklist and track progress:

```
Lint progress:
- [ ] Step 1: Find every skill under the target
- [ ] Step 2: Check each skill against the rules
- [ ] Step 3: Write the report
```

**Step 1: Find every skill**
Find each directory that contains a `SKILL.md` under the target. Each one is a skill. List them before you start so the report covers all of them.

**Step 2: Check each skill against the rules**
For each skill, read its `SKILL.md` and any files it bundles, then work through every rule. Some rules are exact, such as the character and line limits, so measure them against the file. Others need judgment, such as whether the description says both what the skill does and when to use it, or whether examples are concrete. The list below is the short form. Full pass or fail criteria for every rule are in [references/rules.md](references/rules.md).

**Step 3: Write the report**
Produce the report in the format below. Cover every rule for every skill. Do not skip a rule. If a rule does not apply, mark it n/a.

## Rules
Each rule has an id. Full criteria and fixes are in [references/rules.md](references/rules.md).

**Metadata**
- M1 name format: lowercase letters, numbers, and hyphens, 64 characters or fewer, no leading, trailing, or repeated hyphens.
- M2 name safe and specific: no reserved words, no tags, and not a vague word such as "helper" or "utils".
- M3 name matches the skill directory name.
- M4 name style: gerund form, such as "processing-pdfs", or a clear noun phrase.
- M5 description present and within 1024 characters, with no tags.
- M6 description says both what the skill does and when to use it.
- M7 description is in the third person.
- M8 description is specific and includes the terms that should trigger it.

**Structure and content**
- S1 SKILL.md body is 500 lines or fewer.
- S2 detail is split into reference files, and SKILL.md reads as an overview.
- S3 every referenced file exists.
- S4 references are one level deep from SKILL.md.
- S5 reference files longer than 100 lines start with a contents section.
- S6 content is concise and does not explain what the model already knows.
- S7 examples are concrete, not abstract.
- S8 terminology stays consistent throughout.
- S9 workflows have clear steps, and long ones include a checklist.
- S10 no time-sensitive information, unless it sits in an "old patterns" section.
- S11 the level of detail matches the task, neither over nor under specified.
- S12 file paths use forward slashes.
- S13 the skill gives one default approach rather than many options.

**Code and scripts** (mark every rule n/a if the skill bundles no code)
- C1 scripts handle errors rather than leaving them to the model.
- C2 constants are justified, with no unexplained magic numbers.
- C3 required packages are listed.
- C4 scripts document how to run them and what they return.
- C5 paths in scripts use forward slashes.
- C6 critical operations have a validation or verification step.
- C7 quality-critical tasks include a feedback loop.
- C8 MCP tools use fully qualified names, such as "GitHub:create_issue".
- C9 the skill states its dependencies rather than assuming they are installed.

## Report format
For each skill, write a heading and a table:

```
### <skill name> — <path>

| Rule | Status | Notes |
| --- | --- | --- |
| M1 name format | pass | ... |
| M2 name safe and specific | pass | ... |

Result: <p> pass, <f> fail, <w> warn, <n> n/a.
```

Use pass, fail, warn, or n/a for each status. After the per-skill tables, add a short summary: how many skills you checked, how many are clean, and the first fixes to make.
