# Baseline record: writing-agents

Round 2, 2026-07-31. Task: convert a drifted named reviewer agent, dispatched from three
pipelines, to composition at dispatch. Model sonnet, one run per arm, baseline dispatched with
installed skills forbidden.

## Without the skill

Strong on the prompt side: correct diagnosis of the shared-identity drift, three composed
prompts with per-pipeline scope, a caught wording bug (the shared prompt said "the provided
diff", which never matched the full-repository scan), and flagged judgment calls.

Absent, and this is what the skill exists to add: no status values or caller obligations, no
retry limit, no partial-work handling, no model named at dispatch, no named holes marked
required or defaulted, and no separation of established facts from guesses.

## With the skill

Everything the baseline produced, plus the caller protocol: the four core statuses with a
caller-obligation table and one declared addition (SECRET_FOUND) with its scope of effect
stated; a retry limit with the something-must-change rule and a lower limit argued for the
release gate; partial-work-on-stop policy; the model named explicitly as a per-call-site
obligation; holes in the template marked required or given defaults; facts split into known and
unknown with the unknowns listed as questions rather than guessed; deterministic work (severity
rollup, the gate decision) assigned to scripts; and the tool-restriction portability question
raised. The template follows the steering-rules section order and carries a calibration section.
Steps that could not run in the test environment were named rather than skipped.

## What the comparison settled

The model composes good prompts unaided. The caller side, which is the half the skill and
dispatch-protocol.md define, does not appear without the skill and appears nearly in full with
it. The skill changes behaviour and earns its place.

## Wording change, 2026-07-31

Workflow step 4 now says "hole" for the template's named blanks in both of its sentences, where
it used to switch to "field" in the second one. Reviewers were reading the two words as two
different things. This is wording only and does not change what the skill claims to do, so it
took the small-change path in `writing-skills`: step 7 alone, and the baseline was not repeated.

`npm run lint` from the repository root passed. One audit on model sonnet worked through
`shared/skill-rules.md` and `shared/steering-rules.md` and returned no failures. It raised one
advisory warning that predates this change, which is that the stop conditions do not sit directly
after the finish check, because the section on converting a named agent sits between them. It
confirmed that no coverage was lost and that nothing in the file still reads as if "field" and
"hole" are two things.
