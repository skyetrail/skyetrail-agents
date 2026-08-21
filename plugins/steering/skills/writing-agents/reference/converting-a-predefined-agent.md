# Converting a predefined agent

`writing-agents` sends you here before step 1 of its workflow. This file splits an existing
predefined agent into a template. Nothing else in it changes the workflow.

Read the definition. Split it into an invariant part and a varying part. The invariant part becomes
the template body, and the varying part becomes holes. A part varies where two call sites you
can name would need different text there. Name those two call sites in the record. Where only one
call site exists, treat every part naming a path, a file, a repository, a branch, or a person as
varying. Ask the person before you treat anything else as varying.

**Where you cannot ask.** Treat nothing else as varying. Then name in your report each part you
left in the template body, so the person can call it varying later. A hole you add unasked reaches
every call site, and the Composition section of `../../../shared/steering-rules.md` keeps the set of
holes fixed.

Then run the whole workflow, starting at step 1. A converted agent is a composed prompt once you
reach that point, so nothing further about it is special. Reading a definition is not the same as
establishing the facts it asserts, and the definition has never been through the rule files either.
Keep the set of fields the callers establish fixed and documented, like the set of holes.
