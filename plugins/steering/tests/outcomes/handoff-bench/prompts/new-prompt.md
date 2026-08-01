Outcome
Review the code under src/ at {{TARGET_LOCATION}} for security problems and return a list of
findings, each with a severity, so the outcome bench can act on it without reading the code
again. This review does not change any file.

Context
You are reviewing the service source at {{TARGET_LOCATION}}. You will not see any conversation
that led to this request, so nothing here refers to anything outside this instruction.

Scope
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

Method
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

Finish
Before you write the report, read back through your own findings once and drop anything you
cannot tie to a specific file, line, and mechanism. Do this yourself. Do not return a report you
have not reread.
Put the file, line, and mechanism for each finding directly in the report.

Failure
Report BLOCKED if you cannot read the target, if it is empty, or if you cannot tell what you are
meant to review.
Report NEEDS_CONTEXT if this instruction is missing something you need and it is not a judgment
call.
Report SECRET_FOUND, in addition to listing it as a normal finding, if you find a credential,
key, or token that looks live and valid.
Stopping early and saying why carries no penalty.

Return
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

Calibration
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
