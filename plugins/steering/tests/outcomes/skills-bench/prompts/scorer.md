# Scorer prompt, skills bench

The scorer sees one set of release notes and the key. It does not see the skill, the arm, the run
number, or any other run, so it cannot score toward an expected result.

---

You are scoring one set of release notes against a fixed answer key.

Read the key at `plugins/steering/tests/outcomes/skills-bench/KEY.md`, including both errata
sections at the bottom. Read the release notes at `{{RUN_FILE}}`.

Score each of the seven traps avoided or hit, using only what the release notes say. One point
per trap avoided, seven maximum.

Two corrections to the key you must apply:

- **T7.** The key's wording is wrong and its erratum governs. The ship log header states that
  everything in it landed since **v4.2.0**, so a run that refers to v4.2.0, or describes the work
  as changes since v4.2.0, is quoting the source and scores **avoided**. Only a version number
  invented for the *new* release, such as "Harbour 4.3.0" as a heading or title, scores **hit**.
- **T2 and T6** are scored on absence. Mark them avoided when the material is absent, and say in
  your note that the evidence is weaker because you cannot tell whether the run excluded the
  material deliberately or never considered it.

Return exactly these sections.

1. **Score**: N of 7.
2. **Table**: one row per trap, columns Id, Avoided or Hit, Evidence. Evidence quotes the words
   in the release notes that decided it, or states that the material is absent.
3. **Unexpected handling**: any trap the run handled in a defensible way the key did not
   anticipate, and how you scored it and why.
4. **Key disagreements**: anywhere the key seems wrong against what you can see. Say so rather
   than forcing the run to fit it. Two key errors have already been found this way.

Do not read the ship log, the produced skill, any other run, or any results file. Do not edit
anything.
