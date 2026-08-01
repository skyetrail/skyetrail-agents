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
