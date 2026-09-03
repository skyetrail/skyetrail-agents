# The writing-agents diet

`writing-agents` was 505 lines. It was 72 lines when it was born and stayed under 100 through
every round that measured it as useful. The growth came in two pull requests, the classify-and-act
rewrite and the gate rounds, and most of it was author history and countermeasures to defects earlier
versions of the same skill introduced. The rest restated rules the shared files already state. A
run that followed it loaded about 1,330 lines across six files.

One agent rewrote it to 97 lines under a list of eleven measured wins that had to survive and three
measured losses that must not return. The security-prompt fixture then ran in isolated Sonnet runs
against the bar the long version had passed, in a round of three. A second round of three measured
the fixes to what had not held.

## Round one, the 97-line version

Delivery of a dispatchable prompt held at three of three. So did the injection defence that treats
the diff as data, the statuses with caller obligations fetched through the pointer to
`dispatch-protocol.md`, caller-re-runnable gates, and the absence of any finish check that counts
produced parts. That is five of the eight bar items. The judge re-ran a claimed vale check itself
and it reproduced.

Defaults and tick anchors held only in part. One run left five of nine field rows without a default,
and another left five of ten, while the third run defaulted every row that could take one and
explained the one exception. One run anchored six checklist ticks in the skill's own template text instead of in
anything the run produced.

The judge called the third item a fail. Two of three prompts listed fewer vulnerability classes than
the unaided baseline, which sits in git at `c7b9d5c`. One prompt dropped four whole categories and
another dropped five, while the third was near parity. The step the skill owes, write a subject list
before applying any rule and check the artifact against it afterward, fired in all three runs. The
lists it produced varied in size at identical skill length.

The owner had already ruled on that scope: the skill's job is shape, and subject content belongs to
the author. Under that ruling the diet's obligation held and the coverage numbers stand in this
record as a cost to watch.

## Round two, after two fixes

Both fixes copied the behaviour of the run that passed. Every field row must state a default or the
reason none can exist, in the same column. A tick must carry the path or command from this
run, and the skill's own text settles nothing.

Defaults are fixed. Of 26 field rows across the three prompts, zero were bare, against ten bare rows
in the round before.

Tick anchors narrowed without closing. Of 27 ticks, two were unanchored, down from six in one run.
Both survivors are on the same step, the one about writing the prompt against two rule files, and
both anchored in those rule files plus a claim. The run that passed anchored that same tick in the
delivered prompt's own sections with line numbers. The preamble now says a rule file settles
nothing either, and that a tick for a rule-file step names the sections of the delivered artifact
where those rules land. That third fix is unmeasured.

The subject step fired in all three runs, with lists of 13, 7, and 8 top-level entries. Unbundled,
the second and third lists hold 15 and 20 vulnerability classes. The sweep found nothing else had
slipped: delivery, injection defence, statuses, and the count-proxy ban all held at three of three.

## What landed

The skill is 101 lines. A run that follows it loads about 900 lines across five files. The term
"named agent" became "predefined agent" throughout, and its reference file was renamed to match,
which removed the last findings the style check reported outside the test records.

Cut entirely, with the surviving substance of each folded into the wins list:

- the "What has already failed" section
- the harness-shapes table
- the compose-at-dispatch argument
- the run-twice machinery
- the record's checks block
- the independent-audit dispatch step
- the gate and stop sections

 `METHOD.md` records the
lessons and git records the text.

## What stays open

Subject-list size varies across runs of one skill, and no rule names a floor without naming a count.
The step-3 anchor fix has not been measured. Neither is a reason to restore any of the 404 lines
that came out.
