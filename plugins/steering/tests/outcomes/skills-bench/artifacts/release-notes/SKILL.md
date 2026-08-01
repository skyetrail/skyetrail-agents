---
name: release-notes
description: Writes Harbour's customer-facing release notes for a release from its ship log, such as merged-prs.md, a table of merged pull requests with titles, labels, and status. Use whenever someone asks to write, draft, put together, generate, or update Harbour's release notes or public changelog, to turn a ship log, a merged-PR list, or "what shipped this release" into the text that publishes to customers, or says the release notes or changelog need to go out for a release.
---

# Release notes

Produces the customer-facing release notes for one Harbour release, in the fixed shape in
`template.md`, built from the merged, customer-visible rows of that release's ship log.

## What goes wrong without a fixed shape

Left to its own judgment, a run invents its own shape rather than reusing the last one: some add a
summary paragraph above the sections and some do not, the section headings and their casing change
release to release, and a change gets its own heading in one run and a bullet under a general one
in the next. None of these choices is wrong by itself, but a customer reading two releases in a row
sees two differently-shaped documents, and whoever reviews the note before it ships has to re-learn
its shape every time.

Left to its own judgment, a run also states a version number and a release date as settled fact
when the ship log gives neither: a guessed next version, and for the date, today's date, both
written in with nothing marking either as a guess. A reader who takes the title block as given and
publishes it ships a fabricated version and date.

`template.md` fixes the shape once, and gives a placeholder for what the log doesn't state, so
neither has to be reinvented or guessed release to release.

## Workflow

1. Read the ship log for the release. Keep only rows that are merged and customer-visible; a row
   still open, in review, or otherwise not merged has not shipped, and a row whose only audience is
   internal (engineering process, internal tooling, contributor docs) has nothing in it for a
   customer to read. If nothing in the log qualifies, or the input given is not a ship log at all,
   say so instead of writing notes anyway.
2. Sort what is left into the categories in `template.md`, in the order given there, using the
   heading text and casing given there exactly. Leave out a category with nothing in it; do not
   invent content to fill it.
3. Fill in the version and date in the title block only from what the ship log states. Where it
   states neither, or only one, copy the bracketed placeholder text from `template.md` for the
   missing piece exactly as written, brackets included, rather than a guess. The same goes for any
   other release fact the log does not state.
4. Before treating the notes as done, check them against `template.md`: every heading present
   matches its text, casing, and relative order exactly, no heading is empty, and the title block
   carries either a real value from the log or the untouched placeholder, never a guess. Fix
   anything that does not hold, then output the filled template. Nothing precedes the title block
   and nothing follows the last section.

## Where this stops

Produces the release-notes text only. Does not set the version number, choose the release date, or
decide when to ship; those belong to the release process, and where the ship log is silent on them
this leaves the placeholder for a person to resolve.

Does not cover Harbour's internal engineering changelog, the CONTRIBUTING doc, or anything written
for contributors rather than customers. No skill in this plugin takes over there at present.

Does not post or publish the notes anywhere; handing off the finished text is as far as this goes.

A direct instruction from the person wins over anything here.
