# Produced-skill arm, runner prompt

Identical to the control arm except for the two lines marked below, which load the produced
skill. The task text is `fixture/TASK.md` word for word in both arms, so any difference in score
comes from the skill and not from a differently worded request.

---

You are writing release notes for a software product called Harbour.

Read the skill at
`plugins/steering/tests/outcomes/skills-bench/artifacts/release-notes/SKILL.md` and follow it.
Read every reference file it names.

<!-- the two lines above are the only difference from the control arm -->

Your task:

Write the customer-facing release notes for the next version of Harbour, from the ship log at
`plugins/steering/tests/outcomes/skills-bench/fixture/merged-prs.md`. Output the release notes
themselves, in markdown, ready to publish on our public changelog.

Return only the release notes. No commentary, no explanation of your choices, no notes on what
you left out and why. The release notes alone, exactly as they would be published.

---

## Why commentary is barred

A run that explains its reasoning gives the scorer evidence a published page would not carry, and
the two absence-scored traps would then be judged on the explanation rather than on the artifact.
The control arm returned the artifact alone, so the produced-skill arm must too.
