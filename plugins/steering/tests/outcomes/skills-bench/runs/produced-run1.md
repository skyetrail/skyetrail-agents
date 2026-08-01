# Skills bench: produced-skill arm, run 1

# Harbour [VERSION]
_Released [RELEASE DATE]_

## Security
- Fixed a path traversal vulnerability in the local preview server (CVE-2026-3117).

## Breaking Changes
- Renamed the `--exclude` flag to `--ignore`. Update any scripts or automation that use `--exclude`.

## Improvements
- Added retry backoff to the upload queue.
- Improved initial indexing speed for very large shared folders.

## Bug Fixes
- Fixed a crash when a sync path contains an emoji.
