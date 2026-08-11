# Running the skills on the model that will run them

Four runs on Claude Sonnet 5, the model these skills are meant to execute on. Two tasks, each once
with no skill loaded and once following a drafted rewrite.

This is the first time this project measured execution rather than conformance. The A/B in
`../rules-ab/` had just shown that auditing our files against our rules cannot tell whether the
skills are better. This can.

The full comparison is in `./COMPARISON.md`. The drafts, the design they came from, and the audits
are beside it. The draft is not installed and should not be.

## What the runs invalidated first

**Task B tested the wrong file.** The drafted `writing-agents` never got written, because its
authoring agent died mid-stream. The Sonnet run pointed at the missing path, searched, and found a
copy of the pre-rewrite skill at commit `04d7932`, two commits behind. It classified against a rule
file with five conditions where the current one has six. Task B measures `writing-agents@04d7932`.
Rerun it before using it to decide anything.

The run reported the file as missing rather than inventing a result. That is the right behaviour and
it is why the invalidation is visible instead of silent.

**The Task A draft cannot run as written.** It cites `../../shared/authoring.md` five times. That
file has never existed in any commit. The draft's own notes say so: "This file must not land before
`shared/authoring.md`."

## The findings that matter

### A gate the executor cannot run is a gate the executor skips

The draft tells the agent to settle whether a subagent is available by dispatching one, and to stop
where an error comes back. The run recorded "Baseline dispatch (twice) — could not run", then wrote
the description, the body, the calibration and the reference split, and delivered a finished
SKILL.md. It admitted at the end that the file was unverified.

The skill's own gate says a skill addressing no taught miss changes nothing and must not be kept.
The run kept it.

> When a deliverable is expected and the evidence gate cannot run, Sonnet ships the deliverable.

Design for that, or the gate is decoration. A stop condition that competes with a deliverable loses.

### A pointer costs a weak executor more than a copy does

The rewrite's central change moved the artifact test out of the skill body and into a reference
file. The classification still worked in the run, but only because a second copy of the skill was on
disk with the four bullets still inline. Reading the pointer dead-ended.

> The inline version executed. The pointer version did not.

This is direct evidence against a rule this project enforced all week: replace a restatement with a
pointer. That rule was written against drift, which is real. It was never tested against a weaker
executor, and the executor is where it fails. A restatement drifts. A pointer that a weak executor
does not follow never arrives at all.

### A forward reference breaks the step that carries it

Step 1 told the agent to write a record to a directory, then said step 9 names which directory. The
agent has to read step 9 to perform step 1. The run concluded no such convention existed. Four files
sat in that directory, inside the run's own working directory.

### The conditions system does not decide its own hardest case

Task B classified a prompt as `advisory` and `changes something: no`. That prompt instructs an agent
to write findings to a file. Because the condition read false, the run skipped the Blocking rule
forbidding an agent from weakening a check to make it pass, and that sentence is absent from the
prompt it produced. The prompt is a security review.

The rules never say whether writing a report file counts as changing something. The gloss added in
round four, that the conditions are about the work a document steers, does not settle it either. The
model resolved the ambiguity by treating the two conditions as mutually exclusive.

### The skill made the output better shaped and less useful

Real gains on Task A: the section order, an explicit out-of-scope statement, stop conditions where
the unaided run had none, a failure section, calibration pairs, and a trigger description carrying
casual phrasings.

Real losses, all of them substance:

- The unaided run gave a security or privacy report its own pre-triage step and said not to discuss
  it in a public tracker. The skill-led run buried it and dropped the warning.
- The unaided run said to classify by facts alone where the reporter is high priority. The skill-led
  run dropped it, and its new rule that a direct instruction wins opens the door the dropped rule
  closed.
- The unaided run said to split a report bundling several problems. Gone.
- The label table, the severity labels, and a nine-field fact checklist went to "the team's rubric".

The skill teaches shape. It does not teach the domain, and it displaced domain content the model
produced on its own. A rule set tuned on structure will do this every time, and no audit against
that rule set can see it.

## What this costs the current design

The three changes this project was most confident about all have evidence against them here: the
pointer over the restatement, the gate that stops rather than ships, and the conditions system as a
classifier a weaker model can apply.

None of that says the rules are wrong for a strong executor. It says they were never tested on the
executor they are now aimed at.

## Status

The draft is not installed. It cites a file that does not exist, it lost domain content the model
supplies unaided, and half the experiment measured a superseded commit.
