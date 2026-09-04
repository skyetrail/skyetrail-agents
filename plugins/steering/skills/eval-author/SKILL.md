---
name: eval-author
description: Writes the runnable eval for a skill, evals/eval.yaml beside its SKILL.md with fixtures beside it, in the one template the eval protocol fixes, from the misses a measurement found or from the skill's own scope. Use whenever someone asks to write, create or add an eval, evals, test cases or scenarios for a skill, when writing-skills has numbered the misses for a skill it is writing, or when a skill has no evals directory and someone wants it tested. Use it too when an existing eval is refused by npm run eval.
---

# Eval author

Produces `evals/eval.yaml` and `evals/fixtures/` beside one skill's `SKILL.md`, in the template
`../../shared/eval-protocol.md` fixes, and writes nothing else.

## Scope

In scope: a new eval for one skill, or a change to an existing one.

Out of scope: running the eval, because `eval-runner` owns that. Changing the skill is out of
scope too, because `writing-skills` owns it, and so is an eval for a skill this repository cannot
change.

A direct instruction from the person wins over anything in this skill.

## Workflow

Copy this checklist into `record.md` beside the skill's directory and into your reply. Tick each
line as you finish it. A tick carries the path, the command, or the section of a file from this
run that settles the line. The skill's own text settles nothing, and neither does a rule file. A
line you cannot tick stays unticked and carries one line saying why.

```text
eval-author
skill: <absolute path of the SKILL.md>
[ ] 1 source decided: a record with numbered misses at <path>, or the skill's own sections
[ ] 2 one case per numbered miss, with a sibling fixture and the miss absent as expected_behavior
[ ] 3 a case the skill must catch, a case it must leave alone, and a case marked trigger: none
[ ] 4 a question case and an answered case for each branch of the skill that asks a person
[ ] 5 a check wherever a command decides; expected_behavior only where a reading is needed
[ ] 6 no fixture is the file the skill was measured against; every fixture under evals/fixtures/
[ ] 7 npm run eval -- plan <SKILL.md> --dry run; output pasted; no refusal
[ ] 8 npm run audit -- <SKILL.md> run; output pasted; eval-template passes
[ ] 9 nothing outside evals/ changed; git status on the skill directory pasted
```

1. **Decide the source.** Where a record with numbered misses exists for this skill, such as the
   `record.md` `writing-skills` writes, it is the source. Where none exists, the source is the
   skill's own Scope, Failure and Calibration sections, and your report says that no run informed
   the cases.
2. **One case per numbered miss.** The query is the task the baseline ran, in the person's words.
   The files are a sibling of that task's fixture: the same shape, different names and values.
   `expected_behavior` says the miss is absent, in the shape the miss took in the output.
3. **The required kinds.** One case the skill must catch. One it must leave alone, whose
   `expected_behavior` says the skill invents nothing. One marked `trigger: none`, a request the
   skill must decline, with no check and no judgement.
4. **Where the skill asks.** Read the skill for every branch that asks a person or returns
   `NEEDS_CONTEXT`. For each, write a question case, `expect_status: NEEDS_CONTEXT` with a check
   that finds the question in the output, and an answered case with the answer under `facts` and
   `expect_status: DONE`.
5. **Prefer a command.** Where a shape decides the case, a verdict line, a count, a file that must
   or must not exist, write it as `check`, one shell command that reads only `in/` and `out/`.
   Write `expected_behavior` only for what needs a reading, in one paragraph a judge decides from
   the output alone, and never as a restatement of the check.
6. **Fixtures.** Write every fixture under `evals/fixtures/`. Never copy the file the skill was measured against when it was written. Write a sibling.
7. **Run the dry plan.** Run `npm run eval -- plan <path to SKILL.md> --dry` from the directory that holds
   this plugin's `package.json` and paste its output. Fix every refusal and every warning it
   prints, then run it again.
8. **Audit.** Run `npm run audit -- <path to SKILL.md>` and paste its output. The `eval-template`
   check passes.
9. **Prove you changed nothing else.** Run `git status --porcelain <skill directory>` and paste
   it. Every line it prints is under `evals/`.

## Delivery

Report the path of the eval, the number of cases by kind, and the source you used. The eval is
run by `eval-runner`; say so, and do not run it yourself.

Stop, and report what you have, where the skill does not exist, where the repository cannot change
the skill, or where two dry runs still print a refusal.
