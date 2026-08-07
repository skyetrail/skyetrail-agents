# Skill rules

Rules for a SKILL.md. The rules in `./steering-rules.md` also apply to a skill. These rules apply
when the condition **reused** is met and the condition **hand-off** is not met. Read that file too.

Every entry here applies when the audited thing is a SKILL.md, and not otherwise.

The skills `writing-skills` and `auditing-skills` apply these rules. This file states no workflow of
its own, so it meets the **catalogue** condition in `./steering-rules.md`. The stop conditions, the
default outcome, and the evidence each finding carries all live in those two skills.

Mechanical limits are the lint script's job, not judgment work. `./lint.md` says what the script
checks. Confirm the lint record rather than re-deriving those checks by hand. Do not restate them
here. A second copy of that list drifts from the first. An agent then loads two files that say
different things.

## Discovery

| Rule | Severity |
| --- | --- |
| The description states the capability, in the words someone looking for it would use. | Blocking |
| The description states the conditions that should trigger it. | Blocking |
| The description includes the file types, error text, and casual phrasings people actually type. | Important |
| The description does not summarise the workflow or the process. | Important |
| The description speaks in the third person. | Important |

Skills undertrigger more often than they overtrigger. So a description that reads as slightly
insistent is closer to right than one that reads as neutral.

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

These do not count, because each one changes what an agent does with the next paragraph. That test
decides a case the three examples below do not cover. They are examples, not the whole list. An
explanation of why a constraint exists, where the rule requiring it says to give the reason. A
worked example of a rule being met and broken. A line saying what the document does not cover.

Provenance, doubt, and history belong where the authors read them, not in a file loaded on every
run.

## Loading

| Rule | Severity |
| --- | --- |
| Every reference is one hop from the SKILL.md that names it. | Blocking |
| Detail sits in reference files rather than the front file. | Important |
| A reference file longer than 100 lines opens with a contents list. | Advisory |
| Material used to test the skill is not reachable from it. So it never loads with it. | Important |
| No reference file instructs the reader to ignore or skip part of itself. Content that one caller must skip is a separate file. | Important |

## Evidence

| Rule | Severity |
| --- | --- |
| The skill went through a baseline comparison, with and without it loaded. The plugin's `tests/baselines/` directory holds the observed failures it addresses, one file per skill, and no SKILL.md links to it. | Blocking |

This rule applies only to a skill this plugin maintains. A skill read from elsewhere has no
`tests/baselines/` here, and never will. So the rule cannot tell a good one from a bad one. If the
target is not ours, mark it not applicable. Say its own evidence is not available to check.
