Review the following pull request for security vulnerabilities. Work only from the code itself — the repository, the diff, and the files it touches. Do not assume prior conversation context.

## Setup

1. Identify the PR's base and head branches (or commit range) from the information given to you. If a PR number or URL was provided, fetch it with `gh pr view <n>` and `gh pr diff <n>`. If only a branch name was given, diff it against the repo's default branch.
2. Read the full diff first to see the shape of the change.
3. For every changed file, open the full file (not just the diff hunk) and read enough surrounding code to understand real data flow — where inputs come from, what validates them, where outputs go. Diff-only review misses vulnerabilities that depend on context outside the changed lines.
4. If the change touches a shared library, auth path, or config, check for other callers/consumers in the repo that the PR might have broken from a security standpoint.

## What to look for

Evaluate against these categories, and treat any as in scope if present in the diff:

- **Injection**: SQL/NoSQL, command, LDAP, XPath, template, log injection. Any place user-controlled data reaches an interpreter, shell, or query without parameterization/escaping.
- **Authentication & session handling**: weakened or bypassed auth checks, missing checks on new endpoints, session fixation, insecure token generation/storage, credential handling in code or logs.
- **Authorization**: missing or incorrect access control, IDOR (object references not scoped to the requesting user/tenant), privilege escalation paths, trust boundary violations between roles/services.
- **Input validation & deserialization**: unvalidated/unbounded input, unsafe deserialization of untrusted data, type confusion, path traversal, SSRF via user-supplied URLs.
- **Secrets & sensitive data**: hardcoded credentials, API keys, tokens; secrets committed to the diff; sensitive data (PII, credentials, tokens) logged, cached, or exposed in error messages or responses.
- **Cryptography**: weak or outdated algorithms, improper key/IV handling, insecure randomness for security-sensitive values, missing or broken signature/integrity checks.
- **Web-specific**: XSS (stored/reflected/DOM), CSRF on state-changing endpoints, insecure CORS configuration, unsafe redirect targets, missing security headers on new response paths.
- **Dependencies**: newly added or updated packages with known CVEs, or packages pulled from untrusted sources.
- **Error handling & logging**: stack traces or internal details returned to clients, verbose errors that leak system information.
- **Concurrency & business logic**: race conditions on security-relevant state (e.g., balance checks, rate limits, one-time tokens), TOCTOU bugs.
- **Insecure configuration**: permissive defaults introduced by the change (e.g., debug mode, disabled TLS verification, wildcard permissions, overly broad IAM/network rules).

Do not flag pure style, performance, or maintainability issues — stay scoped to security.

## Standard of evidence

For each candidate finding, before reporting it:

- Trace the actual exploit path: what input, through what code, causing what impact. If you cannot articulate a concrete scenario, do not report it as a confirmed issue — mark it lower-confidence or drop it.
- Check whether the surrounding code already mitigates it (e.g., a validation layer upstream, a framework-level protection, an internal-only trust boundary) before flagging.
- Prefer precision over volume. A handful of real, well-evidenced findings is more useful than a long list of speculative ones.

## Report format

Report back as a list, ordered most severe first. For each finding include:

- **File and line(s)**
- **Severity**: Critical / High / Medium / Low / Informational
- **Category** (from the list above)
- **Summary**: one sentence stating the defect
- **Exploit scenario**: concrete input/actor/state that triggers real impact
- **Recommendation**: the specific fix or mitigation

If you found no security issues, say so explicitly rather than omitting the report — state what you reviewed and that no security issues were identified. Do not modify any code; this is a read-only review.