#!/usr/bin/env python3
"""Mechanical checks for the skill-linting skill.

Checks the Agent Skills best-practice rules that can be measured exactly and
prints a pass or fail line for each. The judgment and testing rules are left to
the caller, who reads references/rules.md and decides those.

Usage:
    python lint_skill.py <path> [--json]

<path> may be a SKILL.md file, a skill directory, or a directory tree that
contains skills. Every directory that holds a SKILL.md is treated as a skill.
The script uses only the Python standard library, so it runs with no install.
Exit code is 0 when no rule fails, 2 when at least one does, 1 on a usage error.
"""

import json
import os
import re
import sys

# Limits below come straight from the Agent Skills best practices guide.
MAX_NAME = 64            # frontmatter name character limit
MAX_DESCRIPTION = 1024   # frontmatter description character limit
MAX_BODY_LINES = 500     # recommended SKILL.md body length
TOC_THRESHOLD = 100      # reference files longer than this should carry a contents list
TIME_WINDOW = 30         # characters allowed between a time word and a year, for the date heuristic

NAME_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
TAG_RE = re.compile(r"<[^>]+>")
LINK_RE = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
FIRST_SECOND_RE = re.compile(r"\b(i|i'm|we|we're|you|you're|your|my|our)\b", re.IGNORECASE)
WIN_PATH_RE = re.compile(r"\w[\w.-]*\\[\w.\\-]+")
TIME_RE = re.compile(r"\b(?:before|after|as of|until|by)\b.{0," + str(TIME_WINDOW) + r"}\b20\d\d\b",
                     re.IGNORECASE)
RESERVED = ("anthropic", "claude")
VAGUE = {"helper", "helpers", "util", "utils", "tool", "tools",
         "document", "documents", "data", "files", "file", "stuff", "misc"}
EXTERNAL = ("http://", "https://", "mailto:")


def read(path):
    with open(path, encoding="utf-8") as handle:
        return handle.read()


def split_frontmatter(text):
    """Return (frontmatter_dict, body). Handles top-level scalar fields only."""
    match = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n?(.*)$", text, re.S)
    if not match:
        return {}, text
    fields = {}
    for line in match.group(1).splitlines():
        if line.startswith((" ", "\t")):
            continue  # nested mapping value, not needed for these checks
        field = re.match(r"^([A-Za-z0-9_-]+):\s*(.*)$", line)
        if not field:
            continue
        value = field.group(2).strip()
        if len(value) >= 2 and value[0] in "\"'" and value[-1] == value[0]:
            value = value[1:-1]
        fields[field.group(1)] = value
    return fields, match.group(2)


def local_links(text):
    """Local file targets linked from text, with anchors and URLs removed."""
    out = []
    for target in LINK_RE.findall(text):
        cleaned = target.split("#")[0].strip()
        if cleaned and not cleaned.startswith(EXTERNAL):
            out.append(cleaned)
    return out


def find_skills(path):
    if os.path.isfile(path) and os.path.basename(path) == "SKILL.md":
        return [os.path.dirname(os.path.abspath(path)) or "."]
    found = []
    if os.path.isdir(path):
        for root, dirs, files in os.walk(path):
            dirs[:] = [d for d in dirs if d not in (".git", "node_modules")]
            if "SKILL.md" in files:
                found.append(root)
    return sorted(found)


def check_skill(skill_dir):
    results = []

    def add(rule_id, title, status, note=""):
        results.append((rule_id, title, status, note))

    text = read(os.path.join(skill_dir, "SKILL.md"))
    frontmatter, body = split_frontmatter(text)
    name = frontmatter.get("name", "")
    description = frontmatter.get("description", "")
    body_lines = body.strip("\n").count("\n") + 1 if body.strip() else 0

    # M1 name format
    if not name:
        add("M1", "name format", "fail", "no name field")
    elif len(name) > MAX_NAME:
        add("M1", "name format", "fail", f"{len(name)} characters, limit is {MAX_NAME}")
    elif not NAME_RE.match(name):
        add("M1", "name format", "fail", "use lowercase letters, numbers, and single hyphens")
    else:
        add("M1", "name format", "pass", name)

    # M2 name safe and specific
    if not name:
        add("M2", "name safe and specific", "fail", "no name field")
    elif any(word in name.lower() for word in RESERVED):
        add("M2", "name safe and specific", "fail", "contains a reserved word")
    elif TAG_RE.search(name):
        add("M2", "name safe and specific", "fail", "contains a tag")
    elif name.lower() in VAGUE:
        add("M2", "name safe and specific", "warn", "name is vague")
    else:
        add("M2", "name safe and specific", "pass", "")

    # M3 name matches directory
    directory = os.path.basename(os.path.abspath(skill_dir))
    if name:
        add("M3", "name matches directory", "pass" if name == directory else "fail",
            "" if name == directory else f'name "{name}" vs directory "{directory}"')
    else:
        add("M3", "name matches directory", "fail", "no name field")

    # M5 description present, within limit, no tags
    if not description:
        add("M5", "description present", "fail", "no description field")
    elif len(description) > MAX_DESCRIPTION:
        add("M5", "description present", "fail", f"{len(description)} characters, limit is {MAX_DESCRIPTION}")
    elif TAG_RE.search(description):
        add("M5", "description present", "fail", "contains a tag")
    else:
        add("M5", "description present", "pass", f"{len(description)} characters")

    # M7 description third person (heuristic)
    if not description:
        add("M7", "description third person", "n/a", "no description")
    elif FIRST_SECOND_RE.search(description):
        add("M7", "description third person", "warn", "found first or second person wording")
    else:
        add("M7", "description third person", "pass", "")

    # S1 body length
    add("S1", "body under 500 lines",
        "pass" if body_lines <= MAX_BODY_LINES else "fail", f"{body_lines} lines")

    # Gather references once for S3, S4, S5.
    refs = local_links(text)
    missing = [r for r in refs if not os.path.exists(os.path.normpath(os.path.join(skill_dir, r)))]
    ref_md = [os.path.normpath(os.path.join(skill_dir, r))
              for r in refs if r.endswith(".md")
              and os.path.exists(os.path.normpath(os.path.join(skill_dir, r)))]

    # S3 references resolve
    if not refs:
        add("S3", "references resolve", "n/a", "no file references")
    else:
        add("S3", "references resolve", "pass" if not missing else "fail",
            "" if not missing else "missing: " + ", ".join(missing))

    # S4 references one level deep
    nested = []
    for path in ref_md:
        try:
            if local_links(read(path)):
                nested.append(os.path.basename(path))
        except OSError:
            continue
    if not ref_md:
        add("S4", "references one level deep", "n/a", "no reference files")
    else:
        add("S4", "references one level deep", "pass" if not nested else "warn",
            "" if not nested else "more links inside: " + ", ".join(sorted(set(nested))))

    # S5 long reference files have a contents section
    no_toc = []
    for path in ref_md:
        try:
            lines = read(path).splitlines()
        except OSError:
            continue
        if len(lines) > TOC_THRESHOLD:
            head = "\n".join(lines[:30]).lower()
            if "contents" not in head:
                no_toc.append(os.path.basename(path))
    if not ref_md:
        add("S5", "long references have contents", "n/a", "no reference files")
    else:
        add("S5", "long references have contents", "pass" if not no_toc else "warn",
            "" if not no_toc else "no contents section: " + ", ".join(no_toc))

    # S10 time-sensitive information (heuristic)
    time_hit = TIME_RE.search(body)
    add("S10", "no time-sensitive info", "pass" if not time_hit else "warn",
        "" if not time_hit else f'check: "{time_hit.group(0).strip()}"')

    # S12 forward-slash paths (heuristic on the body)
    win_hit = WIN_PATH_RE.search(body)
    add("S12", "forward-slash paths", "pass" if not win_hit else "warn",
        "" if not win_hit else f'possible backslash path: "{win_hit.group(0)}"')

    return results


def main():
    argv = sys.argv[1:]
    if "-h" in argv or "--help" in argv:
        print(__doc__)
        return 0
    as_json = "--json" in argv
    positional = [a for a in argv if not a.startswith("-")]
    target = positional[0] if positional else "."

    if not os.path.exists(target):
        print(f"Path not found: {target}", file=sys.stderr)
        return 1

    skills = find_skills(target)
    if not skills:
        print(f"No SKILL.md found under: {target}", file=sys.stderr)
        return 1

    report = []
    for skill_dir in skills:
        try:
            results = check_skill(skill_dir)
        except Exception as error:  # stay resilient and keep going
            results = [("ERR", "could not read skill", "fail", str(error))]
        report.append({
            "skill": os.path.basename(os.path.abspath(skill_dir)),
            "path": os.path.relpath(skill_dir),
            "results": results,
        })

    if as_json:
        print(json.dumps([
            {"skill": item["skill"], "path": item["path"],
             "results": [{"id": rid, "title": title, "status": status, "note": note}
                         for (rid, title, status, note) in item["results"]]}
            for item in report], indent=2))
        return 0

    totals = {"pass": 0, "fail": 0, "warn": 0}
    for item in report:
        print(f"\n## {item['skill']} — {item['path']}\n")
        print("| Rule | Status | Notes |")
        print("| --- | --- | --- |")
        for (rid, title, status, note) in item["results"]:
            print(f"| {rid} {title} | {status} | {note} |")
            if status in totals:
                totals[status] += 1
    print(f"\nMechanical checks across {len(report)} skill(s): "
          f"{totals['pass']} pass, {totals['fail']} fail, {totals['warn']} warn.")
    print("The judgment and testing rules in references/rules.md still need review.")
    return 0 if totals["fail"] == 0 else 2


if __name__ == "__main__":
    sys.exit(main())
