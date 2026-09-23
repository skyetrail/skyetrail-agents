# Converting a predefined agent

`writing-agents` sends you here before step 1 of its workflow. This file splits an existing
predefined agent, one defined in a static file such as `agents/*.md` whose text is fixed before any
call, into a template. Nothing else in it changes the workflow.

The house words in this file, such as caller, hole, and field, keep the one meaning
`../../../shared/terms.md` gives them.

Read the definition. Split it into an invariant part and a varying part. The invariant part becomes
the template body, and the varying part becomes holes, the labeled blanks the prompt's caller fills
at each call. A part varies where two call sites you can name would need different text there. Name
those two call sites in `record.md`, which the workflow creates. Where only one call site exists,
treat every part naming a path, a file, a repository, a branch, or a person as varying. Ask the
person before you treat anything else as varying.

**Where you cannot ask.** Treat nothing else as varying. Then name in your report each part you left
in the template body, so the person can call it varying later. A hole you add unasked changes every
call site, and `../../../shared/dispatch-protocol.md` keeps fixed the set of fields, the labeled
facts a template's callers establish before dispatch, so a new hole needs a new field.

Then run the whole workflow from step 1, as for any other composed prompt. Composed means built at
the point of dispatch from a template and the fields the prompt's caller establishes. Run every step
on the text from the definition, because nobody has checked that text against the rule files, and
reading a fact in it does not establish the fact. Keep the set of fields the prompt's callers
establish fixed and documented, like the set of holes.
