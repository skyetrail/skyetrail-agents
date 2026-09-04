---
name: sample-skill
description: Counts the lines of a text file and reports the count. Use when someone asks how many lines a file has, or asks for a line count.
---

# Sample skill

Produces a file `out/count.md` holding one line: `lines: <n>` for the input file.

## Method

1. Read the input file under `in/`.
2. Where no input file exists, ask the person which file to count; where you cannot ask, return `NEEDS_CONTEXT` naming the file as the missing field.
3. Write `out/count.md` with the line count.
