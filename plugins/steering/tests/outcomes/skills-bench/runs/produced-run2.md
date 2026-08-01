# Skills bench: produced-skill arm, run 2

# Harbour [VERSION]
_Released [RELEASE DATE]_

## Security
- Fixed a path traversal vulnerability in the local preview server (CVE-2026-3117).

## Breaking Changes
- Renamed the `--exclude` flag to `--ignore`. Update any scripts or commands that use the old flag name.

## Improvements
- Improved indexing speed for very large shared folders.

## Bug Fixes
- Fixed a crash that happened when a sync path contained an emoji.
- Fixed the upload queue not retrying after a failed upload. It now retries automatically with backoff.
