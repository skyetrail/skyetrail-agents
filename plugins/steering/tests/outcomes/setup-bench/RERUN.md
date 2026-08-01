# The re-run, repo-setup

The case none of the three baselines faced. Each of them invented a file it alone owned, so a
whole-file overwrite was safe by accident. The question here is what happens when the record has
to live inside a file that already holds someone else's writing.

## Setup

After the first skill-loaded run wrote its block into `AGENTS.md`, content was added on both sides
of it: a title, a house-rules section above, and release and ownership sections below. The file was
hashed. A second agent then ran over the same directory with the same instructions, again told that
no person was available.

## Result

| Check | Result |
| --- | --- |
| Marker pairs in the file afterwards | Exactly one opening, one closing |
| Hand-written content outside the block | Intact, character for character |
| Other fixture files | Byte-identical to the pristine fixture |
| Conclusion reached | `NEEDS_DECISION` again, consistent with the first run |

Verified by the bench owner rather than taken from the agent's report: marker counts by direct
count, surrounding content by extracting everything outside the markers and reading it, and the
rest of the repository by a recursive diff against the pristine fixture.

## The part that was not designed for

The skill's step 1 says to check whether a recorded fact still resolves rather than rediscovering
it. The agent did that, and caught its predecessor in an error. The first run had recorded that the
`make lint` candidate could not be run without an install step. On re-testing, that was false in
this environment: `npx` resolved a cached ESLint and ran, failing for a different reason, that
`src/` is empty and no ESLint config exists anywhere.

So the re-run corrected the record instead of carrying the mistake forward, and left the overall
conclusion unchanged because the conclusion did not depend on the mistake. That is the behaviour
the step was written for, though the case it was written for was a repository changing underneath
the record, not the record having been wrong when it was written.

It also shows why re-verifying beats trusting a record. A recorded fact is only as good as the run
that produced it, and the first run here was careful, thorough, and wrong about one thing.

## What this does not show

One re-run, one fixture, one worker model. It shows the marker approach survives a second pass over
a file with other content in it. It does not show what happens when two agents write the block at
the same time, when someone edits inside the markers by hand despite being told not to, or when the
file is large enough that the block is far from anything the agent is reading. None of those were
tested.
