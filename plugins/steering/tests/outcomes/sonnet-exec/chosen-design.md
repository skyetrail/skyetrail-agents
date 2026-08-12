# Chosen design: **Design 3, with grafts from 1 and 2**

Design 3 wins on the deciding criterion and on the fourth. Its numbered-miss artifact (fix the misses as a numbered list at baseline, grade against those exact numbers after) closes six of the untested judgements with one artifact instead of six rules. It is the only design that refuses to name dispatch shapes the plugin has never performed, the only one that spots that routing costs no dispatch and so is not a shape, and the only one that moves an enforcement out of the executor and into the build.

Three grafts change it materially:

- **From Design 2:** raw run files on disk, with the byte-size check. This is METHOD.md §17 — the plugin's own "failure that matters most" — and Design 3 has no answer to fabrication at all.
- **From Design 1 and 2:** one shared file, not just a router. Design 3 rejects the shared procedure file on a condition argument that is wrong on the plugin's own terms (`steering-rules.md` L62–65: conditions are about the document in front of you, not what it describes). Its real cost argument is fine, but the duplicated material is precisely the audit-independence rule and the stop protocol — the two things that must never drift, in a plugin whose record shows copies drifting twice.
- **From Design 1:** `miss` as the term, the ordered router with a stated tie-break, and the no-re-rolling clause.

I verified the load-bearing environment claims before merging. `ste.md` has **zero** references anywhere in the plugin (orphan confirmed). `writing-agents` never names `lint.md` (confirmed). `REFERENCE_SURFACES` in `eng/generate-readmes.mjs` L125–145 picks up any top-level `.md` under a plugin's `shared/` automatically, so a new shared file gets reference resolution, sentence caps, and the contents-list check for free. `EXCLUDED` (L147) is a description string; nothing in `COMPONENT_KINDS` or `REFERENCE_SURFACES` points at `tests/`, so **Design 3's stated risk about narrowing the exclusion is smaller than it thought** — a check that stats one path and reads one regex needs no change to `EXCLUDED` beyond the `--explain` text.

---

# The merged design

## FILE 1 — NEW: `plugins/steering/shared/authoring.md`

```markdown
# Authoring procedure

The skills `writing-skills` and `writing-agents` apply this file. It holds the procedure both
share.

Every other shared file supplies criteria and defines no task. This one defines part of a task.
Both skills then run one procedure, and neither copy drifts from the other.

`auditing-skills` does not apply it. An audit reads the artifact, not the procedure that made it.

## Which artifact

Run these tests in order. The first test that holds decides.

1. **A script decides it.** You can name the command or the regex that returns the answer, and
   running it needs no assessment. Write the script. Write no document.
2. **The person asks once, in this conversation.** The request names one outcome here, and nothing
   about it returns. Do the work, or say the guidance in your reply. Write no file.
3. **The agent that needs the guidance will not see this conversation.** A prompt holds it. Use
   `writing-agents`.
4. **The agent that needs the guidance already holds this conversation, and nobody can say in
   advance when the need arises.** A skill holds it. Use `writing-skills`.

Order settles a request that meets two tests. A repeatable check a regex can decide is a script,
even where a skill could carry it too. `./skill-rules.md` already forbids a skill that documents
such a check.

Where one request holds script work and an assessment, split it. Route each part on its own. Say
in your report which part went where.

Where the deciding test names the other skill, say which test held. Hand the request over. Do not
write the artifact this skill produces.

Where no test holds, stop. Write out all four tests. Say for each one which word in it fails. Ask
the person. Write nothing.

Write the class and the deciding test into the first line of your report.

## The objective survives compaction

Write the request in the person's own words into the record, under a heading `## Objective`. Quote
them. Do not summarise. Do this before you write any of the artifact.

Read that heading again at every step that says to. Where the artifact no longer answers those
words, stop. Say which words it dropped.

A conversation loses its early turns to compaction. A file does not. Where the record and your
memory disagree, the record wins.

This makes a lost objective recoverable. It does not detect drift by itself.

## Audit, and not by yourself

Do not audit your own draft. You know what you meant each line to say. So you read the intent, not
the text. You will pass wording that a reader with no context would not pass.

Dispatch a fresh agent. Use `auditing-skills`. Name the model and the effort level in the dispatch.

Settle whether a subagent is available by dispatching one. Read what comes back.

- **A report comes back.** The audit is independent. Write the auditor's model and effort level in
  the record.
- **An error comes back.** Copy the error text into the record. Then audit the draft yourself,
  against `./steering-rules.md` and the other rule files your skill names. Write
  `Audit not independent.` in the record. Say the same thing in your report to the person.

An audit you call not independent, with no error text beside it, is a skipped step.

## Stop and keep

Stop wherever the artifact would assert something you cannot supply. An unestablished fact, a
required hole with no value, and a rule file you cannot read are examples, not the whole list.

Keep the draft when you stop. Say where it sits. Say in your report that the draft is unverified.
Leave the keep-or-discard call to the person.

Fix a failing gate by changing the artifact. Do not fix it by easing the task or loosening the
rules. A pass earned that way measures nothing.

Retry a dispatch only after something has changed, and at most twice per agent. An unchanged retry
repeats the failure. Report after the limit.

Stopping carries no penalty. A stop is a correct outcome.
```

Eighty-one lines. Under the 100-line contents-list threshold, so no `## Contents` is needed.

---

## FILE 2 — REWRITE: `plugins/steering/skills/writing-skills/SKILL.md`

Frontmatter unchanged, to the character.

```markdown
# Writing skills

This skill produces a SKILL.md, its reference files, and a record showing the skill changes
behaviour.

## First check the artifact

Read `../../shared/authoring.md`. It returns one of four artifacts.

- A skill. Continue with this skill.
- A prompt. Stop. Name `writing-agents` and hand the request over.
- A script. Stop. Name the check a script or a regex can decide.
- Nothing. Stop. Answer the person in this conversation.

Where that file returns no class, stop and ask the person. Do not write a SKILL.md anyway.

## Where this stops

This skill does not audit a skill without changing it. That is the job of `auditing-skills`. This
skill does not write prompts for subagents. That is the job of `writing-agents`. This skill does
not judge writing style. A direct instruction from the person overrides this skill.

## Workflow

Run these steps in order. Steps 3 and 4 decide what the skill has to say, so run them before you
write any of it.

1. **Anchor the objective.** Write the request into `tests/baselines/<skill-name>.md`, under
   `## Objective`, in the person's own words. `../../shared/authoring.md` says what to do with it
   later. Read it again at steps 7 and 10.
2. **Size the change.** A change is small where the description and the stated output both stay
   word for word the same. Any other change is large. A small change to a skill that already holds
   a record runs step 10 alone. Everything else runs every step. Raise the record's small-change
   count by one for a small change. Set it to 0 when a full loop finishes. The lint holds the cap,
   so do not count by hand.
3. **Baseline.** Take the task from what the person asked for. Where they named no task, ask for
   one. Do not invent one, because a task you chose measures the skill against your own reading of
   the request. Dispatch two subagents on that task, each in a fresh context with no skill loaded.
   Tell each one to work from its own knowledge, and to invoke no installed skill. A skill that
   covers the task would stand in for the model and spoil the measurement. Name the model and the
   effort level in both dispatches. Write each run's whole output to its own file under
   `tests/baselines/<skill-name>-runs/`, named `<round>-<n>.md`. Then run these two commands and
   put both results in the record.

   ```
   ls tests/baselines/<skill-name>-runs/<round>-*.md | wc -l
   wc -c tests/baselines/<skill-name>-runs/<round>-*.md
   ```

   The first must equal the number of runs you claim. Two runs of one task that match to the byte
   are not two runs. Evidence you did not collect is not evidence.
4. **Number the misses.** A miss is something a run did that a person must correct before using
   the result. Anything you would only phrase differently is not a miss. Number each miss and hold
   those numbers to the end of the loop. Mark a miss both runs show as taught. Mark a miss one run
   shows as a candidate. Do not teach a candidate. Where a run invoked an installed skill, read
   that skill.

   - **Its description names the condition the person described.** Extend that skill. Write no new
     one. Say which skill.
   - **Its description does not name that condition.** Carry on. Record which skill the run reached
     for, and which word of its description fails to cover the request.

   Either way that run is void. Dispatch a replacement with that skill forbidden by name.
5. **Write the description.** This is the trigger and the most common point of failure. Write it
   against every rule in the Discovery table of `../../shared/skill-rules.md`. Open that file and
   work down the table. Summarising the workflow is the usual mistake, because a summary gives the
   agent something to follow instead of the body.
6. **Write the body.** Order the sections the way `../../shared/steering-rules.md` orders its own.
   That file lists them in order, and a second copy of the list here would drift from it. Write the
   body against every rule in that file, and against the Boundary and Content tables of
   `../../shared/skill-rules.md`. Open both and work down them. Write every sentence against
   `../../shared/ste.md`.

   A section restates the description where every sentence in it states a capability or a trigger
   the description already states. Compare the two sentence by sentence. Cut a section that
   restates it. The description loads before the body, so a repeat spends context twice.
7. **Address the numbered misses, and nothing else.** Read `## Objective` again first. Take each
   miss marked taught. For each one, describe the shape it takes in the work. Do not describe the
   label it falls under. The Calibration section of `../../shared/steering-rules.md` carries that
   rule with a worked pair. Leave every candidate out.
8. **Move detail into reference files.** Move a passage where one step needs it and the other steps
   do not. Keep a passage where every step needs it. A rule table, a worked example, and a set of
   cases are examples of the first kind, not the whole list.
   `../../shared/skill-rules.md` sets how you arrange a reference file.
9. **Baseline again, and grade it.** Run the same task twice more, each in a fresh context with the
   skill loaded, at the same model and effort level as step 3. Write these runs to their own files
   under the same directory, and run the same two commands over them. Fill one row per numbered
   miss: the number, whether run one still shows it, whether run two still shows it, and the quoted
   text settling each call. Record that table in `tests/baselines/<skill-name>.md`, under the plugin
   directory that holds the skill you write. The Evidence rule in `../../shared/skill-rules.md`
   names that directory. Where the skill sits in no plugin, put the record under the skill's own
   directory, and name that location inside the record.
10. **Lint, then audit, and not by yourself.** Run the lint command named in
    `../../shared/lint.md`. This settles the mechanical limits. Then follow the audit rule in
    `../../shared/authoring.md`. Read `## Objective` again first. Where the skill no longer answers
    those words, stop and say which words it dropped.

## The baseline is the gate

Read the table from step 9, one row at a time.

- Both runs still show the miss. The skill does not address it.
- One run of two still shows it. Run the task once more with the skill. Take the majority of three.
- Neither run shows it. The skill addresses it.

Where the skill addresses no taught miss, it changes nothing. Do not keep it.

A run that leaves a taught miss showing has failed. Do not run it again for a better result.

Where a run with the skill shows a miss carrying no number, give it the next number, mark it
taught, and put it and that run's own reasoning into the skill. Then run steps 7 to 9 again.

The loop settles when one pass of steps 7 to 9 adds no new number and leaves no taught miss showing
in both runs. Where two further passes do not settle it, stop. Report which numbered misses still
show. `../../shared/authoring.md` says what happens to the draft when you stop.

## Rules

- `../../shared/authoring.md` for the artifact test, the objective record, the audit rule, and the
  stop conditions.
- `../../shared/skill-rules.md` for a SKILL.md. It states which other rule files apply to a skill
  and under which conditions.
- `../../shared/steering-rules.md` for the section order, the scope rules, and the shape rule.
- `../../shared/lint.md` for the lint command.
- `../../shared/ste.md` for every sentence you write.
```

---

## FILE 3 — REWRITE: `plugins/steering/skills/writing-agents/SKILL.md`

Frontmatter unchanged, to the character.

```markdown
# Writing agents

This skill produces two things. It produces the prompt that makes an agent for one call. It also
produces the caller side, which dispatches that prompt and acts on what returns.

## First check the artifact

Read `../../shared/authoring.md`. It returns one of four artifacts.

- A prompt. Continue with this skill.
- A skill. Stop. Name `writing-skills` and hand the request over.
- A script. Stop. Name the check a script or a regex can decide.
- Nothing. Stop. Answer the person in this conversation.

Where that file returns no class, stop and ask the person. Do not write a prompt anyway.

## Compose at dispatch

A named agent carries one fixed instruction set to every call site. So each call gets too much
context or too little. Callers then patch it until two instructions conflict.

Compose the prompt at the moment of use instead. A checked-in template with named holes counts as
composed, because the caller holds the filled text. The difference is control at dispatch, not the
amount you reuse.

Keep a named agent where something outside the call site depends on it staying one fixed thing.
Three examples, not the whole list. Many places use it identically. The harness enforces a tool
restriction at that layer and nowhere else. Someone else owns it as a policy boundary.

You can pass tool exclusions at dispatch. So composing does not give up enforcement.

Where none of those three holds and the person still asks for a named agent, write the named agent.
Say in one line which of the three the request fails. Then start at step 1.

## Reused, or one call

Count the call sites. One call site is one dispatch. Two or more is a template with holes. Where
the person names none, ask. Do not assume.

- **A template.** Run every step below. Then record a baseline the way `writing-skills` step 9
  records one, and put the record beside the template.
- **One dispatch.** Run every step below and skip the baseline. Say in your report that no baseline
  exists, and that step 5 is the whole evidence. Two measured arms cost more than the dispatch.

## Where this stops

This skill does not write skills. `writing-skills` does that. This skill does not audit an existing
prompt without changing it. `auditing-skills` does that. A direct instruction from the person
overrides this skill.

## Workflow

1. **Anchor the objective and establish the facts.** Write the request into the facts record, under
   `## Objective`, in the person's own words. Read it again at steps 5 and 7. Use a script for
   anything a script can determine. Use an agent only for what needs an assessment. Use neither for
   what you already know. Record where each fact came from.
   `../../shared/dispatch-protocol.md` holds the test that splits the three, and names the hybrid
   case.
2. **Write the prompt** against `../../shared/steering-rules.md` and
   `../../shared/handoff-rules.md`, with the condition **hand-off** met. Write every sentence
   against `../../shared/ste.md`.

   A prompt names a category wherever it tells the agent to find, report, fix, or handle things of
   a kind rather than a thing at a named path. Read every such noun.

   - **A noun with a list after it.** Write the membership test above the list. Then mark the list
     as examples.
   - **A noun with no list.** Write the membership test.
   - **A noun the prompt already defines by what makes something a member.** Leave it.

   A list ending with "or any other X" is closed and passes. A list that just stops is not. The
   Scope section of `../../shared/steering-rules.md` carries the rule, a worked pair, and what it
   cost to learn.
3. **Name the statuses** and the caller's obligation for each. Take the four core statuses from
   `../../shared/dispatch-protocol.md` unchanged. Add a status only where the caller must do
   something no core status already asks for, and write that action beside it. Two statuses taking
   the same caller action are one status. Name the retry limit. Say what happens to partial work
   when a run stops.
4. **Fill every hole.** Write each hole as `{{NAME}}`. Mark each hole required, or give it a
   default. Then run this over the filled prompt.

   ```
   grep -n '{{' <path to the filled prompt>
   ```

   It must print nothing. Where it prints a line, a required hole is still empty. Fix it before you
   go on. Where the prompt is a file checked into this repository, also run the lint command named
   in `../../shared/lint.md`. Keep the set of holes fixed. Do not grow it per caller, because every
   caller pays for the weight the template gathers.
5. **Audit the filled prompt, and not by yourself.** Follow the audit rule in
   `../../shared/authoring.md`. The auditor works against `../../shared/steering-rules.md` and
   `../../shared/handoff-rules.md`. Audit the filled prompt, not the template. Read `## Objective`
   again first. Do this before you send anything.
6. **Dispatch.** Name the model and the effort level. Do not let either inherit from this session,
   because two runs of one template must stay comparable. For work spread across several agents,
   pick the shape from `../../shared/dispatch-protocol.md`. That file also holds the test that says
   when a second agent earns its cost.
7. **Classify the return before you act on it.** A report is complete where it holds every command
   the prompt named, with that command's result, and every section the prompt named.

   - **Complete, and the status is one the prompt enumerated.** Act per the status table in
     `../../shared/dispatch-protocol.md`. Do not re-run what the agent already proved.
   - **A named command or section is missing.** The run is incomplete whatever status it returned.
     Treat it as BLOCKED. Name what is missing. Do not run it yourself.
   - **The status is not one the prompt enumerated.** Treat it as NEEDS_CONTEXT. Fix the template
     so the next call carries the set.

   Then read `## Objective`. Where the report does not answer those words, say which words it
   dropped.

## The gate

Three results settle whether the work is done. Step 4 prints nothing. Step 5 returns no blocking
defect. Step 7 finds the report complete.

## When to stop

`../../shared/authoring.md` holds the stop conditions, the retry limit, and what happens to partial
work.

Do not weaken a check. Do not loosen a rule. Do not fill a hole with a placeholder to force a pass.
Fix the input, or stop.

## Converting a named agent

Read the definition. Split it into an invariant part and a varying part.

A part varies where two call sites you can name would need different text there. Name those two
call sites in the record. Where only one call site exists, treat every part naming a path, a file,
a repository, a branch, or a person as varying, and ask the person before you treat anything else
as varying.

The invariant part becomes the template body. The varying part becomes named holes.

Then run the whole workflow above, starting at step 1. A converted agent is a composed prompt once
you reach that point, so nothing further about it is special. Reading a definition is not the same
as establishing the facts it asserts, and the definition has never been through the rule files
either.

Keep the set of fields the callers establish fixed and documented, the same way you keep the set of
holes.

## References

- `../../shared/authoring.md` for the artifact test, the objective record, the audit rule, and the
  stop conditions.
- `../../shared/steering-rules.md` for the prompt.
- `../../shared/handoff-rules.md` for the rules that apply because the agent will not see this
  conversation. Everything this skill produces is a hand-off, so this file always applies.
- `../../shared/dispatch-protocol.md` for the caller, the statuses, and the shapes of a run.
- `../../shared/lint.md` for the lint command.
- `../../shared/ste.md` for every sentence you write.
```

---

## FILE 4 — EDIT: `plugins/steering/shared/dispatch-protocol.md`

Two edits. L21 in the Contents list, `- Three shapes` becomes `- Shapes`. Then the section:

```markdown
## Shapes

Each shape costs a dispatch, a prompt, and a report. Use one agent where one agent can do the work
and the result needs no second reader. A second agent earns its cost where one of these holds. The
work reads more than one context holds. The judgement must not come from the agent that did the
work. Two runs of one task must be compared. These are examples, not the whole list. Three agents
on work one agent finishes is slower and no more correct.

- **Fan out.** The default. Use it when the pieces of work do not read or write anything in
  common and none of them needs the result of another.
- **Chain.** Use it when one agent's output changes the next prompt. Each link is a separate
  dispatch, and the caller fills the next prompt from the previous report.
- **Establish then fan out.** Use it when the facts the workers need are not yet known. Nothing is
  dispatched until those facts are established and validated.
- **Produce then check.** Use it when one agent would otherwise judge its own output. One agent
  produces. A second agent judges it in a fresh context, holding the same rules and not the first
  agent's reasoning.
- **Measure, change, measure.** Use it when you cannot say in advance whether a change helps. One
  run records the starting point. A later run repeats that run against the changed input.
- **Repeat until settled.** Use it when a change can carry a fault of its own. Name the gate that
  settles it, and cap the repeats. Do both before the first run.

Agents that modify shared state are not a fan-out case even when the tasks look independent.

Routing a request to one of several classes is not a shape here. The status table above routes, and
it costs no dispatch. Read the table yourself.

These shapes cover the dependency patterns seen so far, not every pattern there is. Stop and report
what is missing where work fits none of them. Do the same where you cannot establish a fact a shape
depends on. Do not force the work into the nearest shape.
```

The three new entries each name a shape the plugin already performs: `writing-skills` step 10 is produce then check, its step 3 and step 9 pair is measure, change, measure, and its gate is repeat until settled.

---

## FILE 5 — EDIT: `eng/generate-readmes.mjs`

One new check. Place `MAX_SMALL_CHANGES` and `SMALL_CHANGE_RE` beside the other limits at L104–110, `lintBaselineRecords` beside `lintComponent`, and call it once per plugin in the loop at L493 where `pluginDir` is in scope.

```js
// Every skill this repository maintains carries a baseline record, and the record
// carries the count of small changes since the last full loop. The count exists
// because five landed unnoticed once, and a limit nobody keeps is not a limit.
// This opens the record for two facts and resolves no reference, so tests/ stays
// out of REFERENCE_SURFACES for the reason EXCLUDED already gives.
const MAX_SMALL_CHANGES = 3;
const SMALL_CHANGE_RE = /^Small changes since the last full loop: (\d+)$/m;

function lintBaselineRecords(pluginDir) {
  const skillsDir = path.join(pluginDir, "skills");
  if (!exists(skillsDir)) return;
  for (const name of fs.readdirSync(skillsDir).sort()) {
    const skill = path.join(skillsDir, name, "SKILL.md");
    if (!exists(skill)) continue;
    const record = path.join(pluginDir, "tests", "baselines", `${name}.md`);
    if (!exists(record)) {
      lintProblem(skill, `no baseline record at ${path.relative(ROOT, record)}`);
      continue;
    }
    const m = read(record).match(SMALL_CHANGE_RE);
    if (!m) {
      lintProblem(record, 'no line reading "Small changes since the last full loop: <integer>"');
    } else if (Number(m[1]) > MAX_SMALL_CHANGES) {
      lintProblem(record, `${m[1]} small changes since the last full loop; the limit is ${MAX_SMALL_CHANGES}`);
    }
  }
}
```

Add one line to `explainCoverage()` after the `EXCLUDED` line, so the self-description cannot drift from the run:

```js
lines.push(
  "",
  `Each skill's tests/baselines/<name>.md is opened for two facts only: that it exists, and`,
  `that its small-change count is ${MAX_SMALL_CHANGES} or below. No reference in it is resolved.`,
);
```

This is the only guard in the whole design that does not depend on the executor's honesty. It fires at build time, on `npm run check`, whether or not the skill ran.

---

## FILE 6 — EDIT: the four baseline records

Each gains one line, exactly `Small changes since the last full loop: 0`, or the build breaks. For `writing-skills.md`, append under the existing "Baseline owed" entry:

```markdown
The debt above is paid by the full loop that landed the classify-and-act rewrite. The count starts
here, and the lint holds it from now on.

Small changes since the last full loop: 0
```

`auditing-skills.md`, `writing-agents.md`, and `repo-setup.md` each get the bare line plus one
sentence saying the count starts at this commit and was never kept before it.

The sentence "This skill reached five before an audit noticed" **leaves the SKILL.md** and lands
here. Once the lint carries the cap, that sentence changes nothing an agent does, which
`skill-rules.md` L45 forbids, and it is a count, which L61 forbids.

---

## FILE 7 — EDIT: `plugins/steering/DECISIONS.md`

Add under Settled, so the next session does not re-litigate the L16 row:

```markdown
## The shared file at L16 is not the shared file added here, 2026-08-10

The rejected file routed between the three skills, and that routing must happen before any skill
loads, which is why it lives in the descriptions. `shared/authoring.md` routes between four
artifacts, and that decision happens after a skill has loaded, which is exactly when a shared file
is available. The L16 decision stands and this file does not reverse it.

What it holds is the material both authoring skills must state identically: the artifact test, the
objective record, the audit-independence rule, and the stop protocol. Held twice, those drift.
This plugin has caught a drifted copy twice already.
```

---

# What I took from each

**From Design 3 (the base).**
The numbered-miss artifact spanning step 4 to step 9, which is the single best move in any of the three: one artifact retires "realistic", "went wrong", "already gets right", "compare", "the same", and "new way". The taught-versus-candidate split over two runs. The grading table with a third-run tiebreak. The lint check on the small-change count. The three grounded dispatch shapes. The rejection of tournament and of classify-then-route as a shape. Spotting the `Contents` entry above the shapes heading, which the other two both missed. The bounded named-agent override that still writes the named agent. The "a thing at a named path" negative case in the category test. The reused-or-one-call section, and its refusal to demand a baseline for a single dispatch. The invariance test naming two call sites.

**From Design 2.**
Raw run files on disk with `ls | wc -l` and `wc -c`. This is the largest single graft and it is not optional: METHOD.md §17 is the plugin's own worst failure, and six byte-identical files were the only tell. The `## Objective` anchor written in the person's own words and re-read at named points. The two-class handling of a contaminated baseline run, with the run voided and re-dispatched, which is the only version that respects the recorded contamination finding. The step-level test for body versus reference file (one step needs it, or every step does). The sentence-by-sentence test for a section restating the description. The correct rebuttal of the `DECISIONS.md` L16 objection.

**From Design 1.**
`miss` as the term for what a run shows, aligning with `steering-rules.md` L176 and METHOD.md §3, and retiring a word that currently names three different things. The ordered router with an explicit tie-break sentence and a stop class that names the failing word. The three-class return classification, which is the version that also catches an unenumerated status. "A run that leaves a taught miss showing has failed. Do not run it again for a better result." The framing paragraph for `authoring.md` that explains why it breaks the shared-file convention. "An audit you call not independent, with no error text beside it, is a skipped step."

---

# What I rejected, and why

| Rejected | From | Why |
|---|---|---|
| Three runs per arm | D2 | Six dispatches per full loop before tiebreaks. Two runs plus a third only where they split gets the same variance handling at half the cost, and satisfies METHOD.md §10. |
| Tournament as a shape | D1, D2 | The plugin has never run one. METHOD.md §3 and `steering-rules.md` L190 both forbid a shape written from imagination. |
| Classify-then-route as a dispatch shape | D1, D2 | D3 is right. Routing costs no dispatch. Naming it a shape invites a Sonnet executor to spend one. |
| Generate-and-filter as a shape | D1, D2 | D2 calls the baseline pair generate-and-filter. It is measure, change, measure. Naming both is one shape under two names. |
| Independent equivalence confirmation for a small change | D1 | It costs a dispatch per small change, which destroys the cheap path. `DECISIONS.md` L127 says the cheap path had to be written down because models of this class over-comply. D1 names this as its own biggest risk. |
| The `awk` counter in the skill body | D1, D2 | A command a lazy executor can decline to run. The lint carries it instead, where declining is not available. |
| Merging the whole evidence loop into the shared file | D2 | `writing-agents` runs it only for a template, and its record lives elsewhere. A condition-neutral loop is the abstraction most likely to drift. The shared file holds only what must be word-identical. |
| Keeping the audit rule and stop protocol duplicated in both skills | D3 | Its stated reason, that a SKILL.md is **reused** and a prompt is **hand-off**, is wrong on the plugin's own terms: `steering-rules.md` L62–65 says conditions describe the document in front of you, not what it describes. The duplicated text is exactly what drifts. |
| Eleven numbered steps in `writing-skills` | D1 | One classification per numbered step inflates the executor's per-run cost without adding a test. Ten steps carry every classification D1 names. |
| `artifact-routing.md` as the file name | D3 | The file grew past routing. `authoring.md` says who applies it and distinguishes it from `auditing-skills`. |
| The `procedure.md` name | D2 | Too broad. Three files in `shared/` already govern procedure-adjacent material. |
| "This skill reached five before an audit noticed" in the SKILL.md | D1, D3 | Once the lint holds the cap, the sentence changes nothing an agent does, and it is a count. D2 is right to move it. |
| Design 3's fear about narrowing `EXCLUDED` | D3 | Verified. The check stats one path and matches one regex. It touches neither `REFERENCE_SURFACES` nor reference resolution. Only the `--explain` text changes. |

Nothing the grounding pass listed under "what to keep unchanged" is discarded. `steering-rules.md`, `skill-rules.md`, `handoff-rules.md`, `lint.md`, `ste.md`, `auditing-skills`, and every baseline record survive untouched except for the one counter line. Both frontmatter descriptions are unchanged to the character.

---

# The assumption all three share, and why I think it is wrong

**All three treat the weak-executor constraint as an observed failure, and it is a reading.**

`DECISIONS.md` L133 says it plainly: every measurement in this project is Sonnet. Sonnet is already the measured executor. The current skills, run by Sonnet, produced 8 of 8 on the hand-off bench with no false alarms, and produced a release-notes skill that passed more than thirty rules and failed on one step — the one step where the instruction let the writer mark their own work. Not one recorded run shows Sonnet stalling on "pick a realistic task", or guessing at "already gets right", or diverging on "closest to". The grounding pass found where judgement is *open*. It did not observe divergence there.

So all three designs add roughly twenty membership tests written from imagination, into a plugin whose own most-cited rule is that a shape written from imagination is a guess costing the same context as an observed one, and whose stated change rule is `DECISIONS.md` L146: cite a failing audit, a failing comparison, or a failing outcome score, and nothing else. Design 3 says this honestly in its own risk field and then proceeds anyway. Designs 1 and 2 gesture at it.

The second half is a cost nobody priced. `DECISIONS.md` "Cutting by evidence" records that the last big win was a 29 percent cut in reasoning load with lines loaded unchanged, and that the author's first attempt made it worse by adding text to files loaded on every run. Twenty new tests are twenty new things to evaluate on every run. None of the three costed that against the win.

**What follows for the plan.** Split the landing in two, and do not run them as one change.

**Stage A — everything that cites a record already in the repository. Land it now.**
The independent audit in `writing-agents`, which cites "The loop did not close" in `DECISIONS.md`. The small-change lint check, which cites the recorded five-breach. Naming `ste.md` in both skills, which closes a verified orphan. Naming `lint.md` in `writing-agents`. Model *and* effort level at dispatch, which closes an under-implementation of `handoff-rules.md` L74. The shapes heading and its Contents entry, which cite METHOD.md §22. The run files on disk, which cite METHOD.md §17. The term fix from "failure" to "miss", which cites `skill-rules.md` L46. Every one of these has a failing record behind it.

**Stage B — the router, the numbered-miss table, and the membership tests. Gate them.**
Run the current `writing-skills` end to end with Sonnet as executor and Opus only as observer, on a task neither has seen. Count every point where the executor asks a clarifying question, guesses, or picks a branch you did not intend. That list is the observed-divergence record these tests are supposed to address. Write the tests against it. Where a judgement point produces no divergence, do not write a test for it, and say so in the record.

Stage B's gate is the plugin's own loop, and it must be the *old* loop that measures it — otherwise the new procedure grades itself. None of the three designs says which loop measures the rewrite. That is the gap I would close first.

**Rough effort, flagged as rough.** Stage A is a half-day of editing plus one full loop on `writing-skills`: four baseline dispatches, up to two tiebreaks, one independent audit, one lint. Call it a day of wall-clock, and two if the gate does not settle on the first round. Stage B's Sonnet probe is a further half-day before any Stage B text gets written. My estimates run short, so treat these as floors.