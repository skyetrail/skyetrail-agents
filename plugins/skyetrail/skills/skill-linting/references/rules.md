# Skill lint rules

Full criteria for every rule the skill-linting workflow checks. Each rule has an
id, what it requires, how to decide pass or fail, and how to fix it.

These rules are derived from the Agent Skills authoring best practices published
by Anthropic at platform.claude.com.

## Contents
- Statuses
- Metadata rules (M1 to M8)
- Structure and content rules (S1 to S13)
- Code and script rules (C1 to C9)
- Testing rules (T1 to T4)

## Statuses
- pass: the skill meets the rule.
- fail: the skill breaks the rule and should be fixed.
- warn: a likely problem that needs a person to confirm.
- n/a: the rule does not apply, for example a code rule on a skill with no code.
- manual: the rule cannot be checked by reading files and needs the author to confirm.

## Metadata rules

### M1 name format
Requires: the `name` field uses lowercase letters, numbers, and hyphens only, is 64 characters or fewer, and has no leading, trailing, or repeated hyphens.
Check: read the frontmatter. Fail if the name is missing, too long, or has any other character or hyphen pattern.
Fix: rename to match the pattern, and rename the skill directory to match.

### M2 name safe and specific
Requires: the name has no reserved words ("anthropic" or "claude"), no tags, and is not a vague word such as "helper", "utils", "tools", "data", or "files".
Check: fail on a reserved word or a tag. Warn on a vague name.
Fix: choose a name that states the activity, such as "processing-pdfs".

### M3 name matches directory
Requires: the `name` field equals the skill directory name.
Check: compare the name to the directory basename. Fail if they differ.
Fix: make the two match.

### M4 name style
Requires: the name reads as a gerund, such as "processing-pdfs", or a clear noun phrase, such as "pdf-processing".
Check: warn if the name is neither, or is inconsistent with the other skills in the collection.
Fix: reword to a gerund or a clear noun phrase.

### M5 description present
Requires: the `description` field is non-empty, 1024 characters or fewer, and has no tags.
Check: read the frontmatter. Fail if missing, too long, or it contains a tag.
Fix: write a single clear description within the limit.

### M6 description says what and when
Requires: the description states both what the skill does and when to use it.
Check: read the description. Fail if it gives only one of the two.
Fix: add a "use when" clause with the situations and triggers.

### M7 description third person
Requires: the description is written in the third person.
Check: warn if it uses first or second person, such as "I can" or "you can".
Fix: reword to the third person, such as "Processes Excel files".

### M8 description specific
Requires: the description includes concrete terms and triggers, not vague phrasing such as "helps with documents".
Check: judge whether the description would let the model pick this skill from many. Fail if it is vague.
Fix: add the file types, actions, and user phrases that should trigger the skill.

## Structure and content rules

### S1 body length
Requires: the SKILL.md body is 500 lines or fewer.
Check: count the lines after the frontmatter. Fail if over 500.
Fix: move detail into reference files.

### S2 progressive disclosure
Requires: SKILL.md reads as an overview, with detail in reference files loaded as needed.
Check: judge whether long detail belongs in a reference file. Warn if SKILL.md carries detail it should hand off.
Fix: split detail into reference files and link them from SKILL.md.

### S3 references resolve
Requires: every file referenced from SKILL.md exists.
Check: resolve each local link relative to the skill directory. Fail on any missing file.
Fix: correct the path or add the file.

### S4 references one level deep
Requires: reference files link directly from SKILL.md, not from each other.
Check: warn if a referenced file links onward to more local files.
Fix: link all reference files directly from SKILL.md.

### S5 long references have a contents section
Requires: a reference file longer than 100 lines starts with a contents section.
Check: warn if a long reference file has no contents heading near the top.
Fix: add a short contents list at the top of the file.

### S6 concise
Requires: the content does not explain things the model already knows.
Check: judge whether each section earns its space. Warn on filler or basic background.
Fix: cut the explanation and keep only what is specific to the task.

### S7 concrete examples
Requires: examples are concrete, with real input and output, not abstract.
Check: warn if examples are vague placeholders.
Fix: replace them with real input and output pairs.

### S8 consistent terminology
Requires: one term per concept throughout the skill.
Check: warn if the skill mixes terms, such as "field" and "box" for the same thing.
Fix: pick one term and use it everywhere.

### S9 clear workflows
Requires: workflows have clear, ordered steps, and long ones include a checklist.
Check: warn if steps are unclear or a long workflow has no checklist.
Fix: number the steps and add a checklist for long workflows.

### S10 no time-sensitive information
Requires: no content that will go out of date, unless it sits in an "old patterns" section.
Check: warn on dated phrasing such as "before August 2025".
Fix: state the current method, and move history into an "old patterns" section.

### S11 appropriate degrees of freedom
Requires: the level of detail matches the task, with tight steps for fragile tasks and general direction for flexible ones.
Check: judge whether the skill over-constrains a flexible task or under-specifies a fragile one. Warn either way.
Fix: loosen or tighten the instructions to match the task.

### S12 forward-slash paths
Requires: file paths use forward slashes.
Check: warn on a backslash path such as "scripts\\helper.py".
Fix: change backslashes to forward slashes.

### S13 one default approach
Requires: the skill gives one default approach, with an escape hatch only when needed.
Check: warn if the skill lists many options for the same task.
Fix: pick a default and mention alternatives only as exceptions.

## Code and script rules
Mark every rule in this section n/a if the skill bundles no code.

### C1 scripts handle errors
Requires: bundled scripts handle error conditions rather than leaving them to the model.
Check: read the scripts. Warn if they let calls fail without handling.
Fix: catch the likely errors and recover or report clearly.

### C2 justified constants
Requires: constants are explained, with no unexplained magic numbers.
Check: warn on a bare number with no comment explaining it.
Fix: name the constant and add a short comment for the value.

### C3 packages listed
Requires: required packages are listed in the skill.
Check: warn if a script imports a package the skill never names.
Fix: list the packages the skill needs.

### C4 scripts documented
Requires: each script documents how to run it and what it returns.
Check: warn on a script with no usage or output description in the skill.
Fix: add the command and the expected output.

### C5 forward-slash paths in code
Requires: paths in scripts use forward slashes.
Check: warn on a backslash path in a script.
Fix: change backslashes to forward slashes.

### C6 verification for critical operations
Requires: critical or destructive operations have a validation or verification step.
Check: warn if a high-stakes operation runs with no check.
Fix: add a validate step before the operation and a verify step after.

### C7 feedback loops
Requires: quality-critical tasks include a run, check, fix loop.
Check: warn if the skill produces critical output with no review step.
Fix: add a check step and a return path when it fails.

### C8 fully qualified MCP tools
Requires: MCP tools use the "Server:tool" form.
Check: warn on a bare tool name where a server prefix is expected.
Fix: add the server prefix, such as "GitHub:create_issue".

### C9 dependencies stated
Requires: the skill states its dependencies rather than assuming they are installed.
Check: warn if the skill uses a tool or package it never says to install.
Fix: add an install step or name the requirement.

## Testing rules
These cannot be checked by reading files. Mark each manual unless the author confirms it.

### T1 evaluations exist
Requires: at least three evaluations for the skill.
Fix: write three scenarios that test the gaps the skill fills.

### T2 tested across models
Requires: the skill was tested with Haiku, Sonnet, and Opus.
Fix: run the skill on each model you plan to use and adjust the detail.

### T3 tested with real usage
Requires: the skill was tested on real tasks, not only sample inputs.
Fix: use the skill on real work and refine it from what you see.

### T4 team feedback
Requires: team feedback was gathered, where a team uses the skill.
Fix: share the skill, watch others use it, and fold in what you learn.
