# Skills bench: control arm (plain request), run 1

# Harbour 4.3.0

Released August 1, 2026

## Security

We fixed a path traversal vulnerability in the local preview server (CVE-2026-3117). Someone could use a crafted file path to access files outside the folder you intended to preview. We recommend updating to this version as soon as you can.

## Changes

We renamed the `--exclude` option to `--ignore`. If you use `--exclude` in scripts or other automation, update them to use `--ignore` instead.

## Improvements

Indexing a large shared folder for the first time now finishes much faster. The improvement is largest for shares with millions of files or many terabytes of data.

## Fixes

- We fixed a crash that happened when a synced file or folder had an emoji in its name or path.
- We fixed an issue where one failed upload could stop every other file in the queue from uploading. When an upload fails, Harbour now waits a moment and tries again automatically.
