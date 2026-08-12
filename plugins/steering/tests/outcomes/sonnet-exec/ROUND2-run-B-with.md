UNVERIFIED

I read the skill and every file it names: `authoring.md`, `steering-rules.md`, `handoff-rules.md`, `dispatch-protocol.md`, `lint.md`, `ste.md`. I followed the workflow. Two required gates could not close in this session. The output is a draft, not a prompt ready to dispatch.

## Checklist (from the skill's Workflow section)

```text
writing-agents
[x] 1  ../../shared/authoring.md artifact-test block filled; the class is a prompt
[x] 2  Objective and facts in the record, with the origin of each fact
[ ] 3  Call sites counted; harness shape and dependency pattern named
[x] 4  Prompt written; every condition settled by its own test
[x] 5  Statuses, caller obligations, retry limit, partial-work rule
[x] 6  Nothing correct about the subject dropped from the prompt
[ ] 7  Holes marked; grep printed nothing; lint result recorded
[ ] 8  Independent audit dispatched; findings in the record
[ ] 9  Dispatched, with the model and the effort level named; a template run twice on one input
[ ] 10 Return classified complete, incomplete, or unenumerated
```

Reasons for each unticked line:

- **Line 3.** The task named no repo and no PR, so I could not count call sites. The skill says "ask. Do not assume." I could not pause this turn for a reply, so I inferred `reused = true` from the absence of a specific PR, and flagged it in the record as unconfirmed rather than presenting it as counted. The harness shape (one agent; fan-out, the single-dispatch default) is named regardless.
- **Line 7.** `grep -n '{{'` must print nothing over a *filled* prompt. No repo or PR was supplied, so there is no filled prompt to grep — only the template, which is expected to show its holes. It printed the four required holes (`REPO_PATH`, `BASE_REF`, `HEAD_REF`, `FINDINGS_FILE`). Filling them for a real PR and re-running the grep is a caller step. Lint from `lint.md` does not apply: the file sits in the scratchpad, not in a repository.
- **Line 8.** I could not dispatch a fresh, independent agent. This session has no tool that starts a second agent and returns its result within this turn. I checked: `TaskCreate`/`TaskGet`/`TaskList`/`TaskStop` are a session todo-list tracker, not an agent dispatcher. `spawn_task` starts a background chip for the user and explicitly does not return a result to this turn. The `auditing-skills` skill the workflow names is not in this session's skill list. I ran a self-audit instead, against `steering-rules.md` and `handoff-rules.md`, and found no blocking defect — but the skill is explicit that a self-audit clears no gate and is never reported as independent.
- **Lines 9–10.** Nobody dispatches this prompt against a real PR in this session. Per the skill, these stay unticked and read `caller obligation`.

## What I produced

- Record: `/private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/pr-security-review-record.md` — objective, artifact test, facts with origins, open questions, conditions, gate results, self-audit notes.
- Draft prompt (template, unverified): `/private/tmp/claude-501/-Users-pete-Documents-vault/e4aee147-a50d-416a-a868-0345d8e11bca/scratchpad/pr-security-review-prompt-unverified.md`

The draft holds a security-problem membership test with an open-ended example list; a rule against modifying the reviewed PR, with the findings file as the one exception; a rule forbidding weakened checks (the exact gap the skill's own history calls out for this kind of prompt); default-to-no-finding with counts/does-not-count examples; a named field set per finding; the four core statuses with caller obligations; a retry limit; a partial-work rule; a capped report format; and a line marking the PR diff and comments as data, not instruction.

## The five things this deliverable carries, per "When the gate cannot run"

1. **UNVERIFIED** — stated above, first line.
2. **Path to the unverified file** — `pr-security-review-prompt-unverified.md`, listed above.
3. **Exact error text** — "No tool in this session's tool set dispatches a fresh agent and returns its result within the current turn." Confirmed by reading the schemas of `TaskCreate`/`TaskGet`/`TaskList`/`TaskStop` (session task tracker) and the description of `spawn_task` (fire-and-forget, no collected result).
4. **Checks nobody ran** — independent audit (step 8); grep and lint on a filled instance (step 7, no concrete PR supplied); dispatch and run-twice comparison (step 9); return classification (step 10); confirmation of call-site count (step 3); confirmation of file locations for the record and prompt (step 2).
5. **The one action that finishes it** — dispatch a fresh agent with no memory of this session to audit `pr-security-review-prompt-unverified.md` against `steering-rules.md` and `handoff-rules.md`. That closes the one gate this session could not close on its own; filling the holes for a real PR follows once that audit passes.

Do not dispatch the unverified file as-is; the skill is explicit that it is a proposal to run this loop against, not a prompt to send.