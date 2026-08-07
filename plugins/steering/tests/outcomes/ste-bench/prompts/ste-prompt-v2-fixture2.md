Outcome
Review the code under app/ at {{TARGET_LOCATION}}. Find security problems. Return a list of
findings. Give each finding a severity. The bench then acts on your list and does not read the
code again. This review changes no file.

Context
You review the service source at {{TARGET_LOCATION}}. You do not see the conversation that led to
this request. Nothing here points to anything outside this instruction.

Scope
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

Method
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

Finish
Read your own findings again before you write the report. Drop each finding that names no
specific file, line, and mechanism. Do this yourself. Do not return a report that you did not read
again.
Put the file, the line, and the mechanism for each finding in the report.

Failure
Report BLOCKED when you cannot read the target, when it is empty, or when you cannot tell what to
review.
Report NEEDS_CONTEXT when this instruction omits something you need, and the gap is not a judgment
call.
Report SECRET_FOUND when you find a credential, key, or token that looks live and valid. Also list
it as a normal finding.
You stop early and say why. This carries no penalty.

Return
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

Calibration
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
