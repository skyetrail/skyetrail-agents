#!/usr/bin/env node
// Runs every mechanical check this repository holds against one skill, and
// reports each check by name with pass, fail, warn or n/a.
//
//   npm run audit -- <path to a skill directory or a SKILL.md>
//   npm run audit -- --explain          print every check it makes
//   npm run audit -- --strict <path>    treat an advisory as a failure too
//
// The path may be anywhere on disk. Nothing here assumes the skill sits in
// this repository.
//
// Exit codes: 0 clean, 1 a check failed, 2 the target could not be read.
//
// The checks live in eng/skill-checks.mjs, one copy shared with the repository
// build. `--explain` prints them from that same list, so what this command
// says it checks and what it checks cannot drift apart.
//
// Judgement rules are not here. A rule that needs a reader to weigh a sentence
// stays in plugins/steering/shared/, and this command names them as unchecked
// rather than pretending to settle them.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  CHECKS,
  CONTENTS_REQUIRED_LINES,
  EVAL_FIELDS,
  MAX_BODY_LINES,
  MAX_DESCRIPTION,
  MAX_NAME,
  MIN_EVALUATIONS,
  MODELS,
  fileContext,
  referencedMarkdown,
  runCheck,
} from "./skill-checks.mjs";

// This repository's root. A skill under it is ours, so its evidence records
// exist and a check may read them. A skill outside it carries none of ours.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SCOPES = [
  { key: "frontmatter", title: "Frontmatter", opens: "the SKILL.md YAML block" },
  { key: "body", title: "Body", opens: "the SKILL.md body, below the frontmatter" },
  {
    key: "markdown",
    title: "Markdown",
    opens: "SKILL.md and every markdown file it references",
  },
  {
    key: "bundle",
    title: "Bundle",
    opens: "the skill directory: bundled scripts, bundled files, evaluation and test records",
  },
  {
    key: "prompt",
    title: "Prompt",
    opens: "one produced prompt or template: a markdown file that is not a SKILL.md",
  },
];

// A SKILL.md target runs every scope but prompt. Any other markdown file is a
// produced prompt and runs the prompt scope alone, because it carries no
// frontmatter, no bundle, and no skill body to hold to the skill rules.
function scopesFor(kind) {
  return SCOPES.filter((s) => (kind === "prompt" ? s.key === "prompt" : s.key !== "prompt"));
}

// Checks this command does not make, named so a reader is never left to assume
// a clean run means everything was checked.
const NOT_CHECKED = [
  "Judgement rules. Everything in plugins/steering/shared/*.md that needs a reader to weigh a sentence: whether a description says what and when, whether examples are concrete, whether a workflow's steps are clear, whether a script handles its errors. Run the auditing-skills skill for those.",
  "Packaging. plugin.json, marketplace entries and generated-file drift belong to a marketplace, not to one skill. `npm run lint` checks those.",
  "Meaning, in a prompt. The prompt scope confirms a statuses table, a retry limit, a findings path, defaults and tick anchors exist. Whether a finish check can pass on incomplete work, or a default is usable rather than only named, needs a reader.",
];

function fail(msg) {
  console.error(msg);
  process.exit(2);
}

function parseArgs(argv) {
  const flags = new Set(argv.filter((a) => a.startsWith("--")));
  const rest = argv.filter((a) => !a.startsWith("--"));
  return {
    explain: flags.has("--explain"),
    strict: flags.has("--strict"),
    target: rest[0] ?? null,
  };
}

// Accepts a skill directory or a SKILL.md anywhere on disk.
function resolveTarget(target) {
  const abs = path.resolve(process.cwd(), target);
  if (!fs.existsSync(abs)) fail(`No such path: ${abs}`);
  const stat = fs.statSync(abs);
  const file = stat.isDirectory() ? path.join(abs, "SKILL.md") : abs;
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    fail(`No SKILL.md at ${abs}. Give a skill directory or a SKILL.md.`);
  }
  const skillDir = path.dirname(file);
  const parent = path.dirname(skillDir);
  // A skill under skills/ belongs to a plugin, whose test record sits at the
  // plugin root. Nothing else is read from outside the skill directory.
  const pluginRoot = path.basename(parent) === "skills" ? path.dirname(parent) : null;
  const kind = path.basename(file) === "SKILL.md" ? "skill" : "prompt";
  return { kind, file, skillDir, dirName: path.basename(skillDir), pluginRoot };
}

function explain() {
  const out = [];
  out.push("What `npm run audit` checks, and what it does not.");
  out.push("");
  out.push("Every check below is mechanical: a script settles it, so it returns the same");
  out.push("answer every run. A fail stops the command with a non-zero exit. An advisory");
  out.push("prints and does not, unless you pass --strict.");
  out.push("");
  out.push("Limits it holds: " + [
    `name ${MAX_NAME} characters`,
    `description ${MAX_DESCRIPTION} characters`,
    `body ${MAX_BODY_LINES} lines`,
    `contents list over ${CONTENTS_REQUIRED_LINES} lines`,
    `at least ${MIN_EVALUATIONS} evaluation scenarios`,
  ].join(", ") + ".");
  out.push("");

  for (const scope of SCOPES) {
    const checks = CHECKS.filter((c) => c.scope === scope.key && !c.houseStyle);
    if (!checks.length) continue;
    out.push(`${scope.title.toUpperCase()} — opens ${scope.opens}`);
    const width = Math.max(...checks.map((c) => c.id.length));
    for (const c of checks) {
      out.push(`  ${c.id.padEnd(width)}  ${c.severity === "advisory" ? "advisory" : "fail    "}  ${c.requires}`);
      out.push(`  ${" ".repeat(width)}  source    ${c.source}`);
    }
    out.push("");
  }

  out.push("The evaluation record shape it looks for:");
  out.push("  a .json, .yaml, .yml or .md file whose name starts with \"eval\", or any file");
  out.push("  under an evals/ or evaluations/ directory in the skill.");
  out.push(`  Each scenario carries ${EVAL_FIELDS.join(", ")}.`);
  out.push("The test record it reads for model coverage:");
  out.push(`  the evaluation records and anything under tests/, in the skill and at its plugin root. Models: ${MODELS.join(", ")}.`);
  out.push("");
  out.push("Not checked here:");
  for (const item of NOT_CHECKED) out.push(`  - ${item}`);
  return out.join("\n");
}

// Merge one check across several markdown files into a single result.
function runMarkdownCheck(id, files, skillDir) {
  const label = (f) => path.relative(skillDir, f) || path.basename(f);
  const results = files.map((f) => ({
    file: f,
    result: runCheck(id, fileContext(f, fs.readFileSync(f, "utf8"))),
  }));
  const messages = [];
  for (const { file, result } of results) {
    for (const msg of result.messages) {
      messages.push(files.length > 1 ? `${label(file)}: ${msg}` : msg);
    }
  }
  const anyRan = results.some((r) => r.result.status !== "na");
  if (!anyRan) {
    // Every file gave its own reason. Show the first two and count the rest,
    // so a skill with many reference files does not print a paragraph.
    const reasons = [...new Set(results.map((r) => r.result.reason))];
    const shown = reasons.slice(0, 2).join("; ");
    const rest = reasons.length > 2 ? ` (+${reasons.length - 2} more)` : "";
    return { ...results[0].result, messages: [], status: "na", reason: shown + rest };
  }
  return {
    id,
    severity: results[0].result.severity,
    status: messages.length ? "fail" : "pass",
    messages,
    reason: null,
  };
}

function statusLabel(result) {
  if (result.status === "na") return "n/a ";
  if (result.status === "pass") return "pass";
  return result.severity === "advisory" ? "warn" : "FAIL";
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.explain) {
    console.log(explain());
    return;
  }
  if (!args.target) {
    console.error("Usage: npm run audit -- <path to a skill directory or a SKILL.md>");
    console.error("       npm run audit -- --explain");
    process.exit(2);
  }

  const { kind, file, skillDir, dirName, pluginRoot } = resolveTarget(args.target);
  const content = fs.readFileSync(file, "utf8");
  // A skill outside this repository carries none of our records, so a check
  // that reads our records cannot judge it. skill-rules.md already says to mark
  // those not applicable; the command now knows the same thing.
  const ours = path.resolve(skillDir).startsWith(path.resolve(ROOT) + path.sep);
  const ctx = fileContext(file, content, { dirName, skillDir, pluginRoot, ours });
  const markdownFiles = [file, ...referencedMarkdown(file, content)];

  const lines = [];
  lines.push(`Skill audit: ${dirName}`);
  lines.push(`  SKILL.md   ${file}`);
  lines.push(`  directory  ${skillDir}`);
  lines.push(
    `  reads      ${markdownFiles.length} markdown file(s)${
      markdownFiles.length > 1
        ? `: ${markdownFiles.map((f) => path.relative(skillDir, f)).join(", ")}`
        : ""
    }`,
  );
  if (pluginRoot) lines.push(`  plugin     ${pluginRoot}`);
  lines.push("");

  const all = [];
  for (const scope of scopesFor(kind)) {
    const checks = CHECKS.filter((c) => c.scope === scope.key && !c.houseStyle);
    if (!checks.length) continue;
    lines.push(scope.title.toUpperCase());
    const width = Math.max(...checks.map((c) => c.id.length));
    for (const c of checks) {
      const result =
        c.scope === "markdown"
          ? runMarkdownCheck(c.id, markdownFiles, skillDir)
          : runCheck(c.id, ctx);
      all.push(result);
      lines.push(`  ${statusLabel(result)}  ${c.id.padEnd(width)}  ${c.requires}`);
      if (result.status === "na") lines.push(`        ${" ".repeat(width)}  n/a: ${result.reason}`);
      for (const msg of result.messages) lines.push(`        ${" ".repeat(width)}  ${msg}`);
    }
    lines.push("");
  }

  const count = (test) => all.filter(test).length;
  const failed = all.filter((r) => r.status === "fail" && r.severity !== "advisory");
  const warned = all.filter((r) => r.status === "fail" && r.severity === "advisory");
  lines.push(
    `${all.length} checks: ${count((r) => r.status === "pass")} pass, ${failed.length} fail, ` +
      `${warned.length} advisory, ${count((r) => r.status === "na")} n/a`,
  );
  if (failed.length) lines.push(`Failed: ${failed.map((r) => r.id).join(", ")}`);
  if (warned.length) lines.push(`Advisory: ${warned.map((r) => r.id).join(", ")}`);
  lines.push("");
  lines.push("Not checked here:");
  for (const item of NOT_CHECKED) lines.push(`  - ${item}`);

  console.log(lines.join("\n"));
  if (failed.length || (args.strict && warned.length)) process.exit(1);
}

main();
