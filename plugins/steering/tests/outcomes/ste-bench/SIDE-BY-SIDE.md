# The two prompts in full, section by section

Current wording first, then the same section in Simplified Technical English.
The equivalence check confirmed these demand the same thing, after rejecting a first attempt.

Counts under each heading are: total words, longest sentence, sentences over 25 words.


---

## Outcome

**Current** — 40 words, longest 33, 1 over cap

```
Review the code under src/ at {{TARGET_LOCATION}} for security problems and return a list of
findings, each with a severity, so the outcome bench can act on it without reading the code
again. This review does not change any file.
```

**STE** — 40 words, longest 14, 0 over cap

```
Review the code under src/ at {{TARGET_LOCATION}}. Find security problems. Return a list of
findings. Give each finding a severity. The bench then acts on your list and does not read the
code again. You do not change any file.
```

---

## Context

**Current** — 28 words, longest 20, 0 over cap

```
You are reviewing the service source at {{TARGET_LOCATION}}. You will not see any conversation
that led to this request, so nothing here refers to anything outside this instruction.
```

**STE** — 26 words, longest 11, 0 over cap

```
You review the service source at {{TARGET_LOCATION}}. You do not see the conversation that led to
this request. Nothing here points to anything outside this instruction.
```

---

## Scope

**Current** — 286 words, longest 45, 3 over cap

```
Review for three things only: injection, authorization gaps, and secrets handling.

Injection is any place input that was not checked or escaped is built into something another
system interprets. SQL, shell commands, file paths, HTML or other markup returned to a browser,
and templates are examples, not the whole list. If unescaped input reaches an interpreter of any
kind, it is in scope; do not exile it to a side note because its subtype is not named here.
Authorization gaps are a missing or wrong access check, or a way to reach a higher privilege
than intended.
Secrets handling is any place a credential is fixed in the source or leaves the process. Written
into code or config, written to a log or an error message, sent to another system, or left
guessable so that whatever it protects can be forged, are examples, not the whole list. If a
credential is knowable by someone who should not know it, it is in scope, whatever the route.
Two patterns that are missed most often: a log or error call handed a whole request, session,
user, or config object, because the fields inside it are not visible at the call site; and a
credential sent over a connection whose authenticity is not checked.
Do not review code style, formatting, naming, general performance, or test coverage. Do not
comment on these.
Do not change any file. If a fix is obvious, describe it in words in the finding. Do not apply
it.
If the target cannot be read in full, review what you can and say in the report what you did not
cover. Do not guess at the rest, and do not leave it out without saying so.
```

**STE** — 292 words, longest 27, 1 over cap

```
Review for three things only: injection, authorization gaps, and secrets handling.

Injection is any place where the code builds unchecked or unescaped input into something that
another system interprets. SQL, shell commands, file paths, markup that goes back to a browser,
and templates are examples, not the whole list. Unescaped input that reaches any interpreter is in
scope. Do not move such a finding to a side note because this instruction does not name its
subtype.

An authorization gap is a missing access check, a wrong access check, or a route to a higher
privilege than intended.

Secrets handling is any place where the source fixes a credential, or where a credential leaves
the process. The code holds it as a literal value. A log call or an error message writes it. The
service sends it to another system. Someone can guess it and forge what it protects. These are
examples, not the whole list. A credential that someone can know who must not know it is in scope,
whatever the route.

Two patterns escape reviewers most often. A log call or an error call takes a whole request,
session, user, or config object, because the call site does not show the fields inside it. A
service sends a credential over a connection, and nothing checks that connection's authenticity.

Do not review code style, formatting, naming, general performance, or test coverage. Do not
comment on them.

Do not change any file. Where a fix is obvious, describe the fix in words inside the finding. Do
not apply it.

Where you cannot read all of the target, review what you can. Say in the report what you did not
cover. Do not guess at the rest. Do not leave it out in silence.
```

---

## Method

**Current** — 131 words, longest 52, 1 over cap

```
First, check that you can read all of the target. If you cannot, follow the scope limit rule
above before doing anything else.
Then look for all three focus areas in a single pass. The order between them does not matter.
Treat no finding as the default. Report something only when you can point to a file, a line, and
the actual way it could go wrong. A resemblance to a past problem is not enough on its own.

Checklist:
- Confirmed the full target is readable
- Checked for injection
- Checked for authorization gaps
- Checked for secrets handling
- Reread the findings and removed anything not tied to a file, a line, and a mechanism
- Filled in every section below, writing "none" where a section is empty
```

**STE** — 134 words, longest 18, 0 over cap

```
1. Check that you can read all of the target. Where you cannot, apply the scope limit rule above
   before you do anything else.
2. Look for all three focus areas in one pass. The order between them does not matter.
3. Treat no finding as the default. Report a finding only when you can name a file, a line, and
   the way it goes wrong. A resemblance to a past problem is not enough.

Checklist:
- I confirmed that I can read the full target.
- I looked for injection.
- I looked for authorization gaps.
- I looked for secrets handling.
- I read my findings again. I removed each one that names no file, line, and mechanism.
- I filled in every section below. I wrote "none" in each empty section.
```

---

## Finish

**Current** — 50 words, longest 25, 0 over cap

```
Before you write the report, read back through your own findings once and drop anything you
cannot tie to a specific file, line, and mechanism. Do this yourself. Do not return a report you
have not reread.
Put the file, line, and mechanism for each finding directly in the report.
```

**STE** — 49 words, longest 14, 0 over cap

```
Read your own findings again before you write the report. Drop each finding that names no
specific file, line, and mechanism. Do this yourself. Do not return a report that you did not read
again.
Put the file, the line, and the mechanism for each finding in the report.
```

---

## Failure

**Current** — 72 words, longest 24, 0 over cap

```
Report BLOCKED if you cannot read the target, if it is empty, or if you cannot tell what you are
meant to review.
Report NEEDS_CONTEXT if this instruction is missing something you need and it is not a judgment
call.
Report SECRET_FOUND, in addition to listing it as a normal finding, if you find a credential,
key, or token that looks live and valid.
Stopping early and saying why carries no penalty.
```

**STE** — 69 words, longest 20, 0 over cap

```
Report BLOCKED when you cannot read the target, when it is empty, or when you cannot tell what to
review.
Report NEEDS_CONTEXT when this instruction omits something you need, and the gap is not a judgment
call.
Report SECRET_FOUND when you find a credential, key, or token that looks live and valid. Also list
it as a normal finding.
You stop early and say why. This carries no penalty.
```

---

## Return

**Current** — 134 words, longest 17, 0 over cap

```
Return exactly these sections, in this order. Write "none" for any section with nothing to
report.
1. Status: one of DONE, DONE_WITH_CONCERNS, BLOCKED, NEEDS_CONTEXT, SECRET_FOUND.
2. Scope covered: what you reviewed, and anything in scope you did not reach.
3. Findings: one markdown bullet per finding, each written as [SEVERITY][CATEGORY] file:line,
   description, suggested fix. Severity is one of critical, high, medium, low.
4. Secrets escalation: only if status is SECRET_FOUND. Say what you found and where. Do not
   print the secret value itself.
5. Noticed but out of scope: anything outside the three focus areas that seems worth a person's
   attention. Optional. Not a finding.
6. Beyond what was asked: anything you did that this instruction did not ask for. Usually
   "none."
Repeat any critical or high finding at the top of the report.
```

**STE** — 137 words, longest 17, 0 over cap

```
Return exactly these sections, in this order. Write "none" in any section with nothing to report.
1. Status: one of DONE, DONE_WITH_CONCERNS, BLOCKED, NEEDS_CONTEXT, SECRET_FOUND.
2. Scope covered: what you reviewed, and anything in scope you did not reach.
3. Findings: one markdown bullet for each finding. Write each as [SEVERITY][CATEGORY] file:line,
   description, suggested fix. Severity is one of critical, high, medium, low.
4. Secrets escalation: only when the status is SECRET_FOUND. Say what you found and where. Do not
   print the secret value.
5. Noticed but out of scope: anything outside the three focus areas that seems worth a person's
   attention.
   Optional. Not a finding.
6. Beyond what was asked: anything you did that this instruction did not ask for. Usually "none".
Repeat each critical finding and each high finding at the top of the report.
```

---

## Calibration

**Current** — 200 words, longest 86, 3 over cap

```
Counts as a finding: a SQL, shell, or template call built by joining strings that include
request or user input, without a parameter or escape; a handler missing the access check that a
similar handler in the same codebase has; a credential, private key, or token written into the
code or config as a literal value; a log or error call handed an entire request, session, user,
or config object rather than named safe fields; a credential sent over a connection whose
certificate is not verified.
Does not count: a parameterized query or prepared statement; a reference to an environment
variable, such as process.env.DB_PASSWORD, where the finding would be that value hardcoded
instead of read from the environment, not the reference itself.
An access check that is present but written differently from its siblings is not a finding, even
when you would have written it another way. Report a missing ownership or role check only where
the codebase shows such a check somewhere else; where no handler checks ownership, its absence is
the design, not a gap in that one handler.
Start from no finding. To report one, you must be able to name the actual file, line, and
mechanism.
```

**STE** — 208 words, longest 22, 0 over cap

```
These count as a finding. A SQL, shell, or template call that joins strings which include request
or user input, with no parameter and no escape. A handler that omits the access check which a
similar handler in the same codebase has. A credential, private key, or token that the code or
config holds as a literal value. A log call or an error call that takes a whole request, session,
user, or config object instead of named safe fields. A credential that the service sends over a
connection whose certificate nothing verifies.

These do not count. A parameterized query. A prepared statement. A reference to an environment
variable, such as process.env.DB_PASSWORD. For that last one, the finding is a hardcoded value, not
the reference that reads it from the environment.

An access check that is present, but written differently from its siblings, is not a finding. This
holds even when you would write it another way. Report a missing ownership check or role check only
where the codebase shows such a check somewhere else. Where no handler checks ownership, that
absence is the design. It is not a gap in one handler.

Start from no finding. To report one, name the file, the line, and the mechanism.
```

---

## Totals

| | words | longest sentence | sentences over 25 |
| --- | --- | --- | --- |
| Current | 941 | 86 | 8 |
| STE | 955 | 27 | 1 |
