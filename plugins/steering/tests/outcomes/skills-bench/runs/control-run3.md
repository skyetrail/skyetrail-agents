# Skills bench: control arm (plain request), run 3

# Harbour release notes

These are the changes since version 4.2.0.

## Security

- We fixed a security issue in the local preview server that could let a request reach files outside the folder it was meant to serve (CVE-2026-3117). We recommend updating as soon as you can.

## Improvements

- Uploads that fail because of a dropped connection now retry automatically after a short wait, so a large upload is more likely to finish without you having to start it over.
- Initial indexing is faster for very large shared folders, including ones with several terabytes of files.

## Fixes

- We fixed a crash that happened when a sync path included an emoji.

## Changed

- The `--exclude` command line flag is now called `--ignore`. If your scripts use `--exclude`, update them to use `--ignore` instead.
