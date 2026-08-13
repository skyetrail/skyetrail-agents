# Skill rules

Rules for a SKILL.md. The rules in `./steering-rules.md` also apply to a skill. These rules apply
when the condition **reused** is met and the condition **hand-off** is not met. Read that file too.

Every entry here applies when the audited thing is a SKILL.md, and not otherwise.

The skills `writing-skills` and `auditing-skills` apply these rules. This file supplies criteria and
defines no task of its own. Where a procedural property an audit needs is missing here, look in
those two skills. The stop conditions and the evidence each finding carries are two examples, not
the whole list.

A mechanical check is a script's job, not judgment work. `./lint.md` names the command that settles
those checks, and says what to do where the command does not run. Ask the command itself what it
checks. Confirm its record rather than re-deriving a check by hand. Do not restate the checks here.
A second copy of that list drifts from the first. An agent then loads two files that say different
things.

## Contents

- Discovery
- Boundary
- Content
- Loading
- Code
- Evidence

## Discovery

| Rule | Severity |
| --- | --- |
| The name reads as a gerund or a clear noun phrase. | Important |
| The name follows the same pattern as the other skills in its collection. | Important |
| The description states the capability, in the words someone looking for it would use. | Important |
| The description states the conditions that should trigger it. | Blocking |
| The description includes the file types, error text, and casual phrasings people actually type. | Important |
| The description does not summarise the workflow or the process. | Important |
| The description speaks in the third person. | Important |

Skills undertrigger more often than they overtrigger. So a description that reads as slightly
insistent is closer to right than one that reads as neutral.

The command settles one narrow case of the first rule: a name built only from generic words. It
cannot tell whether a name reads as a clear noun phrase. So read the rule as well as its record.

## Boundary

| Rule | Severity |
| --- | --- |
| The skill says what it does not cover. | Blocking |
| The skill names which skill takes over where it stops. | Important |
| The skill says a direct instruction from the person wins over the skill. | Important |

## Content

| Rule | Severity |
| --- | --- |
| The first lines say what the skill produces, before any steps. | Important |
| Nothing in the skill explains something the model would already know. | Blocking |
| Content that would not change what an agent does is absent. | Important |
| The skill uses one term for one thing throughout. | Important |
| Time-sensitive material is absent, or it appears only in a section for old patterns. | Important |
| The skill does not document a constraint that a script or a regex could enforce instead. | Important |
| Every example carries real input and real output, rather than a placeholder. | Important |
| Each step in a workflow names one action the reader can carry out without guessing. | Important |
| A workflow whose steps a reader could lose track of carries a checklist. | Advisory |

Read each paragraph. Ask what an agent does differently after reading it. If the answer is
nothing, it is a finding. These shapes are the ones seen so far, not the whole list. The test above
decides a shape they do not cover.

- A paragraph about how this document changed: which wording replaced which, what an earlier
  round of review showed, why a section moved. A previously tried approach to the work itself that
  failed is different. It belongs. Stating it stops an agent from repeating it.
- A statement of how sure the authors are, such as a rule being unverified or a test not yet run.
  Severity already carries how much a rule matters, and a paragraph nudging a severity is a worse
  instrument than the severity field.
- A count of anything, especially of things in another file. The number gives an agent nothing and
  goes wrong the moment someone adds one.
- A restatement of a list that lives in another file. The copy drifts. An agent then loads two
  files that say different things.

Content does not count as a finding where it changes what an agent does with the next paragraph.
That test decides a case the examples below do not cover. They are examples, not the whole list. An
explanation of why a constraint exists, where the rule requiring it says to give the reason. A
worked example of a rule being met and broken. A line saying what the document does not cover.

Provenance, doubt, and history belong where the authors read them, not in a file loaded on every
run.

## Loading

| Rule | Severity |
| --- | --- |
| Every reference is one hop from the SKILL.md that names it. | Blocking |
| Detail sits in reference files rather than the front file. | Important |
| Material used to test the skill is not reachable from it. So it never loads with it. | Important |
| No reference file instructs the reader to ignore or skip part of itself. Content that one caller must skip is a separate file. | Important |
| Every bundled file's name says what the file holds. | Important |
| Directories group files by domain, so a run loads only the domain it needs. | Important |

A line cap on the front file is the command's proxy for the detail rule. A front file under the cap
can still carry the detail, so read the rule as well as its record.

## Code

These rules apply only where the skill bundles a script. Where the skill bundles none, mark every
rule in this section not applicable.

| Rule | Severity |
| --- | --- |
| A bundled script handles the errors it can meet, rather than leaving them to the agent. | Important |
| The skill states how to run each bundled script and what the script returns. | Important |
| The skill says, for each bundled script, whether to run it or read it as reference. | Important |
| A validation script's error names the problem and the values that would pass. | Important |
| Every constant in a bundled script carries the reason for its value. | Advisory |
| The skill names every dependency that no bundled script imports. | Important |
| Every package the skill lists is available on the runtime the skill targets. | Important |
| Every MCP tool the skill names carries its server prefix, in the form `Server:tool`. | Important |

The command reads what a bundled script imports and checks each import against the SKILL.md. The
dependency rule covers what that check cannot see. A command line tool, a service, and a font are
examples, not the whole list.

The Claude API runtime has no network access and installs nothing at run time. A package named but
absent there fails when the script runs, not when the skill loads.

## Evidence

| Rule | Severity |
| --- | --- |
| The skill went through a baseline comparison, with and without it loaded. The plugin's `tests/baselines/` directory holds the observed failures it addresses, one file per skill. Nothing an agent loads at run time links to that directory. | Blocking |
| The recorded runs of the skill include real tasks, not only synthetic scenarios. | Important |
| The skill's evaluation scenarios came before its long-form content. | Advisory |
| The skill's evidence names feedback from a second person, and the change that feedback caused. | Advisory |

These rules apply only to a skill this plugin maintains. A skill read from elsewhere has no
`tests/baselines/` here, and never will. So these rules cannot tell a good one from a bad one. If
the target is not ours, mark them not applicable. Say its own evidence is not available to check.
