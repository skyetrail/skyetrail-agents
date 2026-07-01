---
name: timesheet-tracking
description: Creates and updates a project timesheet, one entry per work session with the date, time range, duration, and description. Use when the user asks to log time, add or edit a timesheet entry, update the timesheet, or set up a timesheet for a project. Stores the timesheet as a Markdown table in a file or an Obsidian wiki page.
license: MIT
metadata:
  version: "1.0.0"
---

# Timesheet tracking

Keep a project timesheet up to date. This skill finds or creates the timesheet, adds an entry from what the user gives, and can edit an entry.

## Timesheet location
Before you read or write, find where the timesheet lives:

1. Check the active steering and the chat history for a recorded location.
2. Check memory for a recorded location.
3. If none of those has it, ask the user. The timesheet can be a file, such as `timesheet.md`, or an Obsidian wiki page, such as a note in a vault. Accept a path or a page name.

Once you have the location and the user confirms it, offer to record it so you do not ask again. Save the path to the project's steering, preferring `AGENTS.md`, or to memory, whichever the user prefers.

## Timesheet format
The timesheet is a Markdown table. The standard columns are Date, Time, Duration, and Description:

| Date | Time | Duration | Description |
| --- | --- | --- | --- |
| 03/12/2026 | 9:00-10:00 AM | 1:00 | Kickoff call |

- Date is `MM/DD/YYYY`.
- Time is the start and end joined with a hyphen, such as `2:30-5:00 PM`. Show the meridiem once when both times share it, and on both when they differ, such as `11:30 AM-1:00 PM`.
- Duration is `H:MM`, computed from the start and end time.
- Description is a short phrase.
- Newest entry first: add new entries at the top, right below the header.

A timesheet can add custom columns. Custom columns go between Duration and Description, so Description stays last. For example, a timesheet with a Phase column:

| Date | Time | Duration | Phase | Description |
| --- | --- | --- | --- | --- |
| 03/12/2026 | 9:00-10:00 AM | 1:00 | 2 | Kickoff call |
| 03/11/2026 | 1:00-3:30 PM | 2:30 | 2 | Requirements review |
| 03/10/2026 | 10:00-11:30 AM | 1:30 | 1 | Project setup |

## Set up a new timesheet
If the timesheet does not exist yet:

1. Ask whether to add any custom columns, such as Phase or Task. If yes, take their names.
2. Create the timesheet with a header row: the standard columns, with any custom columns placed before Description.
3. If the location is an Obsidian wiki page, create the page with a title and any frontmatter the vault uses, then the table below it.

## Add an entry
The user triggers this by asking to update the timesheet or log time. The request may include the date, the start and end time, and a description.

Copy this checklist and track progress:

```
Entry progress:
- [ ] Step 1: Parse the date, start time, end time, and description
- [ ] Step 2: Fill any custom column values
- [ ] Step 3: Compute the duration
- [ ] Step 4: Confirm the entry with the user
- [ ] Step 5: Add the entry and show the summary
```

**Step 1: Parse the request**
Read the date, start time, end time, and description from the request. If the date is missing, use today's date and say so at confirmation. If the start time, end time, or description is missing or unclear, or the meridiem is ambiguous, ask the user before you continue.

**Step 2: Custom columns**
If the timesheet has custom columns, fill each one. If a value is missing, ask for it.

**Step 3: Compute the duration**
Work out the duration from the start and end time and write it as `H:MM`.

**Step 4: Confirm**
Show the entry as it will appear in the table and ask the user to confirm. State any assumption you made, such as using today's date.

**Step 5: Add the entry and summarize**
Add the entry at the top of the table, right below the header. Then show the summary described below.

## Edit an entry
1. Ask which entry, or find it from the date and description the user gives.
2. Show the current entry.
3. Make the change, and recompute the duration if the time changed.
4. Confirm with the user, then show the summary.

## Summary
After you add or edit an entry, show a short summary in the chat:
- The entry you added or changed.
- The total time in the timesheet, as `H:MM` or hours.
- If the timesheet has a Phase column, or a similar column, the total time for each value.
- The last few entries, newest first.
