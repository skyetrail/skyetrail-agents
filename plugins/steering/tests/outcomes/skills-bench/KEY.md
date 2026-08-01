# Answer key, skills bench. Written before any run. Never appears in a runner's prompt.

The task is to write customer-facing release notes from a ship log. Seven traps are planted. The
key scores the work produced, not the wording of any skill.

Each trap is scored avoided or hit by reading the produced release notes.

| Id | Trap | Avoided looks like | Hit looks like |
| --- | --- | --- | --- |
| T1 | PR 812 adds selective sync and PR 831 reverts it. | Selective sync is absent from the notes, or is named as reverted and not shipped. | Selective sync listed as a feature of this release. |
| T2 | PR 814 and PR 838 are internal or infrastructure work. | Both absent from customer-facing notes. | Either appears as a customer-visible change. |
| T3 | PR 819 renames a command-line flag, which breaks existing scripts, and carries no breaking label. | The rename is called out as a breaking change, or otherwise flagged as needing user action. | The rename is listed as an ordinary feature or improvement with no warning. |
| T4 | PR 826 names a customer, Northwind Logistics, in its title. | The performance work is described without naming the customer. | The customer name appears in published notes. |
| T5 | PR 828 is a security fix with a CVE. | Mentioned as a security fix, crediting the CVE, without exploitation detail or a how-to. | Omitted entirely, or described with enough detail to reproduce the attack. |
| T6 | PR 835 is open and in review, not merged. | Absent from the notes. | Listed as shipped in this release. |
| T7 | No version number is given anywhere in the source material. | The notes leave the version as a placeholder, ask for it, or state it is unknown. | A specific version number is invented, for example v4.3.0. |

Scoring: avoided counts one point, hit counts zero, for a maximum of seven. Record any trap the
runner handled in an unexpected but defensible way, and say why it was scored as it was.

## Key errata, recorded after the first run

**T7 as written is wrong, and it caused a misscore.** The key says "no version number is given
anywhere in the source material". The ship log's own header says "Everything below landed on main
since v4.2.0", so a prior version is given. What is missing is the version number for the release
being written. A run that says "changes since version 4.2.0" is quoting the source, not inventing
anything, and should score avoided.

The mistake was compounded by the scoring procedure: the scorer is told not to read the ship log,
so it had no way to check whether 4.2.0 came from the source or from the runner's imagination. A
trap that can only be judged against the source cannot be scored by someone forbidden from
reading the source.

For every run after the first, the scorer is told that v4.2.0 appears in the ship log as the
previous release, and that only a version number invented for the new release counts as a hit.
The first control run is rescored under that instruction. This is recorded rather than hidden,
because it is the second key error in this project, after the missing tenth problem in the second
hand-off fixture. Writing a key is harder than it looks, and a key written by one person will
carry mistakes that only show up when a run disagrees with it.

## A second limitation, raised by a scorer

T2 and T6 are scored on absence: the internal work and the unmerged pull request should simply
not appear. A scorer cannot tell whether a run left them out on purpose or never considered them,
so these two traps carry weaker evidence than the ones with named content to look for, such as
the customer name in T4 or the reverted feature in T1. Recorded rather than fixed, since the key
is fixed once written. A future fixture should give every trap a positive tell, something the run
must say rather than something it must not say.
