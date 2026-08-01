# Skills bench: control arm (plain request), run 2

# Harbour 4.3.0

In this release, we fixed a security vulnerability, renamed a command line flag, fixed two bugs, and made syncing faster for large shared folders.

## Security

We fixed a security vulnerability in the local preview server. Someone could have used it to reach files outside the folder you were previewing, including other files on your computer. This is CVE-2026-3117. We recommend updating to this version.

## Changes

We renamed the `--exclude` command line flag to `--ignore`. If you use `--exclude` in a script or other automation, update it to `--ignore`.

## Fixes

We fixed a crash that happened when a sync path contained an emoji.

We added automatic retry for uploads that fail, with a longer wait before each attempt. If your connection drops briefly, you will not lose the rest of the upload queue.

## Performance

We made the first scan faster for large shared folders. You will notice this most when a shared folder holds a large number of files or several terabytes of data.
