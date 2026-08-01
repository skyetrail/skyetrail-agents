# Skills bench: produced-skill arm, run 3

# Harbour [VERSION]
_Released [RELEASE DATE]_

## Security
- We fixed a path traversal vulnerability in the local preview server (CVE-2026-3117).

## Breaking Changes
- We renamed the `--exclude` command-line flag to `--ignore`. If your scripts or automations use `--exclude`, update them to `--ignore`.

## Improvements
- We improved the speed of initial indexing for very large shared folders (2TB and up).

## Bug Fixes
- We fixed a crash that happened when a sync path contained an emoji.
- We added automatic retry with backoff to the upload queue, so uploads recover from temporary failures instead of failing outright.
