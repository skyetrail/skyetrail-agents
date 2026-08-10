# Re-audit: writing-agents

Target: `/Users/pete/workspace/skyetrail-agents/plugins/steering/skills/writing-agents/SKILL.md`
Rules: `plugins/steering/shared/skill-rules.md`, `plugins/steering/shared/steering-rules.md`
Prior report: `plugins/steering/tests/outcomes/ste-rewrite/audits/writing-agents.md`, at commit `7deb2ae`.
Now at commit `d015e2e`, working tree clean. No file was changed except this report.

## 1. Lint result, and whether the lint reached the target

`npm run lint` from `/Users/pete/workspace/skyetrail-agents`:

```
> node eng/generate-readmes.mjs --check
All generated files are up to date.
```

Clean.

`npm run lint -- --explain` names three kinds of component that get every check: frontmatter
hazards, name format and length, description length (limit 1024), body line count (limit 500), and
reference resolution. `skills/*/SKILL.md` is one of them, and the name must match its directory.

The target is `plugins/steering/skills/writing-agents/SKILL.md`, so it is a component and the lint
reached it. All five component checks ran against it and passed. There is no coverage gap.

The description grew at this commit. Description length is a lint check, it reached this component,
and it passed, so the new description is inside the 1024 limit. I did not re-derive it.

`--explain` also states that nothing under a plugin's `tests/` is opened. The prior report lives
there and is not linted. That is by design and is not a finding.

### Conditions applied

Unchanged from the prior report, except that the rule files now carry a **catalogue** condition.

- **always** — met.
- **reused** — met. The target is a SKILL.md.
- **hand-off** — not met. The SKILL.md loads into the current conversation. `handoff-rules.md` was
  not applied to it. The skill correctly tells its reader to apply that file to the prompt it
  writes.
- **changes something** — met, per the brief.
- **advisory** — not met. All Calibration rules and the advisory-conditioned rules in Scope, Finish
  and Failure stay not applicable.
- **catalogue** — **not met.** This is a new condition since the prior report. The document states a
  seven-step workflow of its own, so it is not a catalogue. Method, Finish and Failure all still
  apply. The two rule files themselves now declare the condition met for their own kind, which does
  not reach this target.

## 2. Prior findings

Two findings in the prior report. Both retired.

| Finding | Confirmed, retired, or changed | Evidence |
| --- | --- | --- |
| SK Discovery 3 (Important, defect) — the description names no file type and no symptom, so the skill does not load when a person names the artefact or reports the symptom | **Retired** | The description now carries the artefact, "producing an agents/\*.md definition or a prompt template", and four symptoms, "came back with nothing useful, returned a summary instead of the work, ignored half its instruction, or ran out of context". Both gaps the prior report named are closed, and the shape now matches the two sibling descriptions |
| SK Content 3 (Important, defect) — "Converting a named agent" says "add four things" and restates four of `dispatch-protocol.md`'s seven invariants, three of which are already in workflow step 3 | **Retired** | Lines 79-80 now read "Then run workflow steps 3 to 7 above without changes." The cross-file count and the restated list are both gone, and no new copy of that list appears anywhere in the file |

### Nothing an agent needs was lost with the restatement

The brief asked for this check. The removed paragraph carried four requirements. Two were already
in workflow step 3 verbatim, one in a fuller form there, and one was dropped entirely. Both of the
two that were not fully covered by step 3 are still reachable, and still required, by a file the
conversion path opens:

- **Each status's scope of effect.** Not in step 3. Still required by `dispatch-protocol.md` lines
  83-84, "Every status declares whether it affects only the agent reporting it or stops the whole
  run", and step 3 sends the reader to that file for the status set. Also required by
  `handoff-rules.md` line 76, which step 5 audits against.
- **Where the detail goes, against what returns to the caller.** Dropped entirely from this file.
  Still required by `handoff-rules.md` line 62, "The detail goes to a named file, and only a capped
  summary returns to the caller", and by `dispatch-protocol.md` invariant 3. Step 5 is inside the
  named range and audits the filled prompt against `handoff-rules.md`.

The deleted closing sentence, "Then audit the filled prompt against `steering-rules.md` and
`handoff-rules.md`", is workflow step 5, which the new pointer includes.

Nothing an agent needs was lost. One consequence of how the pointer is scoped is a new finding
below.

## 3. New findings

Only findings the prior report does not contain. Everything else the prior report marked pass or
not applicable still holds, and I re-checked the rules the edit could have touched: Outcome 1 and 2,
Context 1 and 2, Method 1 to 4, Composition 1 to 3, Voice 1 to 3, and SK Content 1 to 6.

| Rule | Result | Defect or difference | Evidence |
| --- | --- | --- | --- |
| SR Method 2 — the order is fixed where sequence affects correctness (Blocking) | Warn | **Difference** | Line 79: "Then run workflow steps 3 to 7 above without changes." The range excludes step 2, which holds the only instruction to write the prompt against `steering-rules.md` and `handoff-rules.md` and to give a membership test wherever the prompt names a category of work. In a conversion the invariant part of an existing definition becomes the template body verbatim, so that body reaches step 4 having never been written against either rule file. Step 5 is inside the range and audits the filled prompt against both, so the miss is caught before dispatch. The cost is a rework loop rather than a wrong dispatch, which is why this is a difference and a warn rather than a fail. The excluded step 1 is covered by the section's own first line, "Read the definition", and by `handoff-rules.md` line 71, which step 5 audits against |

I considered and did not raise two others:

- The description now names `agents/*.md` as a product while the body's opening names "the prompt"
  and "the caller side". These are two surface forms of one product, the same pattern the prior
  report passed for repo-setup's "repo fact" and "Repository facts". SK Content 4 passes.
- The new trigger clause lists four symptoms and stops. SR Scope 3 is about a category of work in
  scope, not about a trigger list, and the description closes with a general clause, "even when the
  word agent is not used, if work is being handed to something that starts with no context". Pass.

## 4. Counts by severity

New findings:

| Severity | Fail | Warn |
| --- | --- | --- |
| Blocking | 0 | 1 |
| Important | 0 | 0 |
| Advisory | 0 | 0 |

New defects: 0. New differences: 1.

Surviving prior findings: none. Both prior findings retired.

| Severity | Fail | Warn |
| --- | --- | --- |
| Blocking | 0 | 0 |
| Important | 0 | 0 |
| Advisory | 0 | 0 |

Surviving defects: 0. Surviving differences: 0.

No blocking failure. The document does not need work before use. Both prior findings were fixed and
neither fix introduced a new problem. The one new item is a warn about how the conversion pointer
is scoped, and the skill's own audit step catches its consequence.

## 5. Anything I did that nobody asked for

- I ran `git diff 7deb2ae d015e2e` on both targets to see exactly what changed, rather than
  comparing the current file against the prior report's line numbers by hand.
- I read `dispatch-protocol.md` and `handoff-rules.md` in full to work out whether the two
  requirements dropped from "Converting a named agent" survive elsewhere. That check was asked for.
  Reading both files end to end went past what it needed.
- I re-derived the **catalogue** condition for this target and wrote the reasoning into section 1.
  Nobody asked for that reasoning to be recorded.
- I ran a grep across `plugins/steering/skills/` and `plugins/steering/shared/` for links to
  `tests/`, to confirm SK Loading 5 still holds after the edit. It does. Only `writing-skills` and
  `skill-rules.md` mention `tests/`, and neither is reachable from this target.
- I read the first 40 lines of `writing-skills/SKILL.md` to check the house description pattern the
  retired Discovery 3 finding was calibrated against.
- I ran `mkdir -p /tmp/ste-audit-2/`. The directory already existed and held seven reports from
  other audits running alongside this one, so the command changed nothing. I wrote only
  `writing-agents.md` there, and neither it nor `repo-setup.md` existed before I wrote them.
