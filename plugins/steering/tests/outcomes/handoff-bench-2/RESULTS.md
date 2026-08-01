# Bench two: does it generalize?

Bench one saturated at eight of eight, so it could no longer show improvement. This fixture is
another language, framework, and domain, with nine planted problems and four decoys, and the
cycle 2 wording was never tuned against it.

| Arm | Found, per key | False alarms | Real problems found |
| --- | --- | --- | --- |
| Old prompt | 8 of 9 | 5 | 9 |
| Produced prompt, cycle 2 wording | 7 of 9 | 1 | 8 |

The last column matters because the key is wrong: it omits a tenth real problem, the
`bulk_import` route performing a manager-gated mutation behind only a login check. Every arm
found it, and every arm is penalised for it. See the errata in KEY.md.

## What generalized

**Defining injection by mechanism.** Both produced-prompt runs reported `yaml.load` with an
unsafe loader and `pickle.loads` on a client cookie. Neither is SQL, shell, path, or markup, so
the original enumerated wording would have exiled both, and the cycle 1 wording caught both in a
language it was never tuned against. This is the clearest evidence in the project that a fix
generalized rather than fitting one fixture.

## What did not generalize

**The cycle 2 secrets wording.** Both runs filed J6, a live token sent to an external host with
TLS verification disabled, under "noticed but out of scope", each reasoning that it was not
logging or hardcoding. Cycle 2 fixed a missed log finding by naming the log pattern precisely,
and in doing so wrote a new implicit list: secrets in code, secrets in config, secrets in logs.
A secret leaving the process by any other route now reads as out of scope.

This is the fixture one failure returning in a new place, introduced by the fix for the fixture
one failure. The lesson the project had already recorded, define a category by its mechanism
rather than by its members, was applied to injection and not to secrets. One category was fixed
and the other was left enumerated.

**J9 is unproven either way.** No run reported the unrestricted read on `item_detail`, but every
run reported the stronger authorization problem beside it, which the key omits. The rule J9 was
meant to test, report a gap where a comparator exists, was satisfied by a finding the key cannot
credit.

## What the numbers say

The produced prompt does not beat the old prompt on this fixture by the stated criterion: 7
against 8 by the key, 8 against 9 in reality. It holds its false alarm advantage, 1 against 5,
and the single false alarm is a real vulnerability rather than an invention.

Both arms found every injection problem. The gap between them is entirely in the secrets
category, where the produced prompt's own scope clause talked it out of a finding it had already
written down.

## Cycle 3

Apply to secrets the fix that worked for injection. Secrets handling is any place a credential
leaves the process or is fixed in the source: written into code or config, written to a log or
an error, sent to another system, or left able to be forged because the value is known. The
patterns that keep being missed are named as examples, not as the boundary of the category.

---

# Cycle 3: the mechanism rule applied to secrets

One change, the same shape as the injection fix: secrets handling defined as any place a
credential is fixed in source or leaves the process, with code, config, logs, network calls, and
guessable values named as examples rather than as the boundary.

| Arm | Found, per key | False alarms | Real problems found |
| --- | --- | --- | --- |
| Old prompt | 8 of 9 | 5 | 9 of 10 |
| Produced, cycle 2 wording | 7 of 9 | 1 | 8 of 10 |
| Produced, cycle 3 wording, run 1 | 8 of 9 | 1 | 9 of 10 |
| Produced, cycle 3 wording, run 2 | 8 of 9 | 1 | 9 of 10 |

J6 moved from "noticed but out of scope" into the findings, reported as a high severity secrets
problem. The one false alarm in each produced-prompt row is the unlisted tenth problem described
in the key errata, which is a real vulnerability the key does not carry.

On this fixture the produced prompt now matches the old prompt's recall while raising a fifth of
its false alarms, and its single false alarm is a real finding rather than an invention.

## What this settles

The lesson holds on a second category and a second fixture. Defining a category by its mechanism
and marking any list of kinds as examples fixed injection in cycle 1 and fixed secrets in cycle
3. The failure in between was mine: cycle 2 fixed a specific missed case by naming its pattern so
tightly that the pattern became a new list, and the next fixture found it. Naming a pattern is
for recognising a case, not for bounding a category, and the two have to be written separately.
