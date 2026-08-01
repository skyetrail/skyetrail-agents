# Release notes template

Fixed shape for a Harbour release-notes entry. Reuse this structure for every release; only the
bullet content changes.

```
# Harbour [VERSION]
_Released [RELEASE DATE]_

## Security
- ...

## Breaking Changes
- ...

## New Features
- ...

## Improvements
- ...

## Bug Fixes
- ...
```

Rules for filling it in:

- Fixed section order: Security, Breaking Changes, New Features, Improvements, Bug Fixes. Keep
  this order regardless of which sections end up with content.
- Use this exact heading text and casing. Do not rename, merge, split, or reorder a heading, and do
  not add a heading that is not on this list.
- Leave out a heading entirely when nothing belongs under it. Never publish an empty heading.
- No text of any kind above the title block, and no summary paragraph between the date line and
  the first heading.
- `[VERSION]` and `[RELEASE DATE]` are placeholders. Replace one only when the ship log states that
  exact value. Where the log does not state it, leave the placeholder exactly as written, brackets
  included, rather than filling in a guess, today's date, or the next likely version number.
