// Mechanical checks for the skill-linting skill.
//
// Checks the Agent Skills best-practice rules that can be measured exactly and
// prints a pass or fail line for each. The judgment and testing rules are left
// to the caller, who reads references/rules.md and decides those.
//
// Usage:
//     node --experimental-strip-types lint_skill.ts <path> [--json]
//
// <path> may be a SKILL.md file, a skill directory, or a directory tree that
// contains skills. Every directory that holds a SKILL.md is treated as a skill.
// It runs on Node's built-in TypeScript support (Node 22.6 or newer), so it
// needs no install. Exit code is 0 when no rule fails, 2 when at least one does,
// 1 on a usage error.

import * as fs from "node:fs";
import * as path from "node:path";

// Limits below come straight from the Agent Skills best practices guide.
const MAX_NAME = 64; // frontmatter name character limit
const MAX_DESCRIPTION = 1024; // frontmatter description character limit
const MAX_BODY_LINES = 500; // recommended SKILL.md body length
const TOC_THRESHOLD = 100; // reference files longer than this should carry a contents list
const TIME_WINDOW = 30; // characters allowed between a time word and a year, for the date heuristic

const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const TAG_RE = /<[^>]+>/;
const LINK_RE = /\[[^\]]*\]\(([^)]+)\)/g;
const FIRST_SECOND_RE = /\b(i|i'm|we|we're|you|you're|your|my|our)\b/i;
const WIN_PATH_RE = /\w[\w.-]*\\[\w.\\-]+/;
const TIME_RE = new RegExp(`\\b(?:before|after|as of|until|by)\\b.{0,${TIME_WINDOW}}\\b20\\d\\d\\b`, "i");
const EXTERNAL_RE = /^(?:https?:\/\/|mailto:)/;
const RESERVED = ["anthropic", "claude"];
const VAGUE = new Set([
  "helper", "helpers", "util", "utils", "tool", "tools",
  "document", "documents", "data", "files", "file", "stuff", "misc",
]);

interface Result {
  id: string;
  title: string;
  status: string;
  note: string;
}

interface SkillReport {
  skill: string;
  path: string;
  results: Result[];
}

function read(file: string): string {
  return fs.readFileSync(file, "utf8");
}

function splitFrontmatter(text: string): { fields: Record<string, string>; body: string } {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { fields: {}, body: text };
  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (/^[ \t]/.test(line)) continue; // nested mapping value, not needed for these checks
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!field) continue;
    let value = field[2].trim();
    if (value.length >= 2 && (value[0] === '"' || value[0] === "'") && value[value.length - 1] === value[0]) {
      value = value.slice(1, -1);
    }
    fields[field[1]] = value;
  }
  return { fields, body: match[2] };
}

function localLinks(text: string): string[] {
  const out: string[] = [];
  for (const match of text.matchAll(LINK_RE)) {
    const cleaned = match[1].split("#")[0].trim();
    if (cleaned && !EXTERNAL_RE.test(cleaned)) out.push(cleaned);
  }
  return out;
}

function findSkills(target: string): string[] {
  if (fs.statSync(target).isFile()) {
    return path.basename(target) === "SKILL.md" ? [path.dirname(path.resolve(target))] : [];
  }
  const found: string[] = [];
  const walk = (dir: string): void => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    if (entries.some((e) => e.isFile() && e.name === "SKILL.md")) found.push(dir);
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== ".git" && entry.name !== "node_modules") {
        walk(path.join(dir, entry.name));
      }
    }
  };
  walk(target);
  return found.sort();
}

function checkSkill(skillDir: string): Result[] {
  const results: Result[] = [];
  const add = (id: string, title: string, status: string, note = ""): void => {
    results.push({ id, title, status, note });
  };

  const text = read(path.join(skillDir, "SKILL.md"));
  const { fields, body } = splitFrontmatter(text);
  const name = fields.name || "";
  const description = fields.description || "";
  const stripped = body.replace(/^\n+/, "").replace(/\n+$/, "");
  const bodyLines = body.trim() ? stripped.split("\n").length : 0;

  // M1 name format
  if (!name) add("M1", "name format", "fail", "no name field");
  else if (name.length > MAX_NAME) add("M1", "name format", "fail", `${name.length} characters, limit is ${MAX_NAME}`);
  else if (!NAME_RE.test(name)) add("M1", "name format", "fail", "use lowercase letters, numbers, and single hyphens");
  else add("M1", "name format", "pass", name);

  // M2 name safe and specific
  if (!name) add("M2", "name safe and specific", "fail", "no name field");
  else if (RESERVED.some((w) => name.toLowerCase().includes(w))) add("M2", "name safe and specific", "fail", "contains a reserved word");
  else if (TAG_RE.test(name)) add("M2", "name safe and specific", "fail", "contains a tag");
  else if (VAGUE.has(name.toLowerCase())) add("M2", "name safe and specific", "warn", "name is vague");
  else add("M2", "name safe and specific", "pass", "");

  // M3 name matches directory
  const directory = path.basename(path.resolve(skillDir));
  if (name) add("M3", "name matches directory", name === directory ? "pass" : "fail", name === directory ? "" : `name "${name}" vs directory "${directory}"`);
  else add("M3", "name matches directory", "fail", "no name field");

  // M5 description present, within limit, no tags
  if (!description) add("M5", "description present", "fail", "no description field");
  else if (description.length > MAX_DESCRIPTION) add("M5", "description present", "fail", `${description.length} characters, limit is ${MAX_DESCRIPTION}`);
  else if (TAG_RE.test(description)) add("M5", "description present", "fail", "contains a tag");
  else add("M5", "description present", "pass", `${description.length} characters`);

  // M7 description third person (heuristic)
  if (!description) add("M7", "description third person", "n/a", "no description");
  else if (FIRST_SECOND_RE.test(description)) add("M7", "description third person", "warn", "found first or second person wording");
  else add("M7", "description third person", "pass", "");

  // S1 body length
  add("S1", "body under 500 lines", bodyLines <= MAX_BODY_LINES ? "pass" : "fail", `${bodyLines} lines`);

  // Gather references once for S3, S4, S5.
  const refs = localLinks(text);
  const resolve = (r: string): string => path.normalize(path.join(skillDir, r));
  const missing = refs.filter((r) => !fs.existsSync(resolve(r)));
  const refMd = refs.filter((r) => r.endsWith(".md") && fs.existsSync(resolve(r))).map(resolve);

  // S3 references resolve
  if (!refs.length) add("S3", "references resolve", "n/a", "no file references");
  else add("S3", "references resolve", missing.length ? "fail" : "pass", missing.length ? "missing: " + missing.join(", ") : "");

  // S4 references one level deep
  const nested: string[] = [];
  for (const file of refMd) {
    try {
      if (localLinks(read(file)).length) nested.push(path.basename(file));
    } catch {
      continue;
    }
  }
  if (!refMd.length) add("S4", "references one level deep", "n/a", "no reference files");
  else add("S4", "references one level deep", nested.length ? "warn" : "pass", nested.length ? "more links inside: " + [...new Set(nested)].sort().join(", ") : "");

  // S5 long reference files have a contents section
  const noToc: string[] = [];
  for (const file of refMd) {
    let lines: string[];
    try {
      lines = read(file).split(/\r?\n/);
    } catch {
      continue;
    }
    if (lines.length > TOC_THRESHOLD && !lines.slice(0, 30).join("\n").toLowerCase().includes("contents")) {
      noToc.push(path.basename(file));
    }
  }
  if (!refMd.length) add("S5", "long references have contents", "n/a", "no reference files");
  else add("S5", "long references have contents", noToc.length ? "warn" : "pass", noToc.length ? "no contents section: " + noToc.join(", ") : "");

  // S10 time-sensitive information (heuristic)
  const timeHit = body.match(TIME_RE);
  add("S10", "no time-sensitive info", timeHit ? "warn" : "pass", timeHit ? `check: "${timeHit[0].trim()}"` : "");

  // S12 forward-slash paths (heuristic on the body)
  const winHit = body.match(WIN_PATH_RE);
  add("S12", "forward-slash paths", winHit ? "warn" : "pass", winHit ? `possible backslash path: "${winHit[0]}"` : "");

  return results;
}

function main(): number {
  const argv = process.argv.slice(2);
  if (argv.includes("-h") || argv.includes("--help")) {
    console.log("Usage: node --experimental-strip-types lint_skill.ts <path> [--json]");
    return 0;
  }
  const asJson = argv.includes("--json");
  const positional = argv.filter((a) => !a.startsWith("-"));
  const target = positional[0] ?? ".";

  if (!fs.existsSync(target)) {
    console.error(`Path not found: ${target}`);
    return 1;
  }

  const skills = findSkills(target);
  if (!skills.length) {
    console.error(`No SKILL.md found under: ${target}`);
    return 1;
  }

  const report: SkillReport[] = skills.map((skillDir) => {
    let results: Result[];
    try {
      results = checkSkill(skillDir);
    } catch (error) {
      results = [{ id: "ERR", title: "could not read skill", status: "fail", note: String(error) }];
    }
    return { skill: path.basename(path.resolve(skillDir)), path: path.relative(".", skillDir) || ".", results };
  });

  if (asJson) {
    console.log(JSON.stringify(report, null, 2));
    return 0;
  }

  const totals: Record<string, number> = { pass: 0, fail: 0, warn: 0 };
  for (const item of report) {
    console.log(`\n## ${item.skill} — ${item.path}\n`);
    console.log("| Rule | Status | Notes |");
    console.log("| --- | --- | --- |");
    for (const r of item.results) {
      console.log(`| ${r.id} ${r.title} | ${r.status} | ${r.note} |`);
      if (r.status in totals) totals[r.status] += 1;
    }
  }
  console.log(`\nMechanical checks across ${report.length} skill(s): ${totals.pass} pass, ${totals.fail} fail, ${totals.warn} warn.`);
  console.log("The judgment and testing rules in references/rules.md still need review.");
  return totals.fail === 0 ? 0 : 2;
}

process.exit(main());
