# Skill rules

Rules for a SKILL.md. The rules in `steering-rules.md` also apply to a skill, with the condition
**reused** met and **hand-off** not met, so read that file too.

Every entry here applies whenever the thing being audited is a SKILL.md, and not otherwise.

Mechanical limits are the lint script's job, not judgment work. `lint.md` says what the script
checks. Confirm the lint record rather than re-deriving those checks by hand, and do not restate
them here: a second copy of that list drifts from the first and then two files disagree.

## Discovery

| Rule | Severity |
| --- | --- |
| The description states the capability, in the words someone looking for it would use. | Blocking |
| The description states the conditions that should trigger it. | Blocking |
| The description includes the file types, error text, and casual phrasings people actually type. | Important |
| The description does not summarise the workflow or the process. | Important |
| The description is written in the third person. | Important |

Skills undertrigger more often than they overtrigger, so a description that reads as slightly
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
| One term is used for one thing throughout. | Important |
| Time-sensitive material is absent, or confined to a section for old patterns. | Important |
| The skill does not document a constraint that a script or a regex could enforce instead. | Important |

Read each paragraph and ask what an agent does differently for having read it. Where the answer is
nothing, it is a finding. These shapes are the ones seen so far, not the whole list; the test above
decides a shape they do not cover.

- A paragraph about how this document came to be edited: which wording replaced which, what an
  earlier round of review showed, why a section was moved. An approach to the work itself that was
  tried and failed is a different thing and belongs, because stating it stops an agent repeating it.
- A statement of how sure the authors are, such as a rule being unverified or a test not yet run.
  Severity already carries how much a rule matters, and a paragraph nudging a severity is a worse
  instrument than the severity field.
- A count of anything, especially of things in another file. The number gives an agent nothing and
  goes wrong the moment someone adds one.
- A restatement of a list that lives in another file. The copy drifts, and then two files an agent
  loads together disagree.

These do not count. An explanation of why a constraint exists, where the rule requiring it says the
reason must be given. A worked example of a rule being met and broken. A line saying what the
document does not cover. Each of those changes what an agent does with the next paragraph.

Provenance, doubt, and history belong where the authors read them, not in a file loaded on every
run.

## Loading

| Rule | Severity |
| --- | --- |
| The SKILL.md body is 500 lines or fewer. | Blocking |
| Every reference is one hop from the SKILL.md that names it. | Blocking |
| Detail sits in reference files rather than the front file. | Important |
| A reference file longer than 100 lines opens with a contents list. | Advisory |
| Material used to test the skill is not reachable from it, so it never loads with it. | Important |
| No reference file instructs the reader to ignore or skip part of itself. Content that one caller must skip is a separate file. | Important |

## Evidence

| Rule | Severity |
| --- | --- |
| The skill has been through a baseline comparison, with and without it loaded, and the observed failures it addresses are recorded in the plugin's `tests/baselines/` directory, one file per skill, linked from nothing. | Blocking |

Applies only to a skill this plugin maintains. A skill read from elsewhere has no
`tests/baselines/` here and never will, so the rule cannot tell a good one from a bad one. Where the
target is not ours, mark it not applicable and say its own evidence was not available to check.
