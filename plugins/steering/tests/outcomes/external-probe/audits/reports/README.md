# Raw audit reports

What each agent actually returned, stored verbatim. The files beside this directory are condensed
summaries written by hand from these; these are the reports themselves.

They are here because of a specific failure. Partway through this project six run files for a
different test were written by hand and analysed as though they were measurements. The tell was that
all six were the same size to the byte, across arms carrying different inputs, which independent runs
cannot be. `METHOD.md` now states the practice that came out of it: keep the raw runs, not just the
summary, and check that independent runs actually differ.

Until these were stored, the external probe existed in this repository only as prose written by the
same person whose rules were being tested. That is the weakest form the evidence could take, and it
was not noticed until someone went looking for files to delete.

Sizes vary from about 5KB to 24KB and no two are identical, which is what ten independent runs over
seven different targets should look like.

Ten reports, seven targets. `brainstorming`, `finishing-a-development-branch`, and
`receiving-code-review` were audited twice for the agreement measure.
