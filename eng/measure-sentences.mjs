#!/usr/bin/env node
// Measures sentence length across the steering files against its built-in
// caps: 20 words for a rule cell, 25 for prose. The lint reports an over-cap
// sentence as an advisory.
//
// Rule cells in a table are counted separately from prose. A rule is the
// operative text an auditor applies, so its length matters more than a
// paragraph's, and a table row is not a sentence a splitter can find.
//
// Usage: node measure-sentences.mjs [file...]

import fs from "node:fs";
import path from "node:path";

const CAP_INSTRUCTION = 20;
const CAP_DESCRIPTION = 25;

const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

// Strip fenced code, inline code, links to their text, and markdown emphasis.
// Those are exempt from the count and would distort it.
function clean(text) {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "CODE")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_]{1,2}/g, "");
}

function splitSentences(block) {
  return block
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s && words(s) > 1);
}

function measure(file) {
  const raw = fs.readFileSync(file, "utf8");
  // Frontmatter is not prose. A description is capped at 1024 characters by the
  // Agent Skills spec, not at 25 words, so counting it against the prose
  // cap reports a long description as an over-cap sentence.
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  const lines = clean(body).split("\n");

  // A list item and a paragraph are separate units. Joining them and splitting
  // on full stops turns a bullet list, which has none, into one long sentence.
  // A rule cell often holds two sentences and must be split like any other.
  const proseBlocks = [];
  const rules = [];
  let para = [];

  const flush = () => {
    if (para.length) proseBlocks.push(para.join(" "));
    para = [];
  };

  for (const line of lines) {
    const t = line.trim();
    if (!t) { flush(); continue; }
    if (t.startsWith("#")) { flush(); continue; }
    if (/^\|[\s-]+\|/.test(t)) { flush(); continue; }

    if (t.startsWith("|")) {
      flush();
      const first = t.split("|").map((c) => c.trim()).filter(Boolean)[0];
      if (first && words(first) > 2) rules.push(first);
      continue;
    }
    if (/^([-*+]|\d+\.)\s/.test(t)) {
      flush();
      proseBlocks.push(t.replace(/^([-*+]|\d+\.)\s/, ""));
      continue;
    }
    para.push(t);
  }
  flush();

  return {
    file,
    prose: proseBlocks.flatMap(splitSentences).map(words),
    rules: rules.flatMap(splitSentences).map(words),
  };
}

function report(rows) {
  const over = (arr, cap) => arr.filter((n) => n > cap).length;
  const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);

  console.log("Sentence length against the caps.\n");
  console.log("Rule cells are the operative text an auditor applies. Cap 20.");
  console.log("Prose is everything else. Cap 25.\n");

  const head = ["file", "rules", ">20", "%", "max", "prose", ">25", "%", "max"];
  const table = [head];

  let allRules = [], allProse = [];
  for (const r of rows) {
    allRules = allRules.concat(r.rules);
    allProse = allProse.concat(r.prose);
    table.push([
      path.basename(r.file),
      String(r.rules.length),
      String(over(r.rules, CAP_INSTRUCTION)),
      `${pct(over(r.rules, CAP_INSTRUCTION), r.rules.length)}%`,
      String(Math.max(0, ...r.rules)),
      String(r.prose.length),
      String(over(r.prose, CAP_DESCRIPTION)),
      `${pct(over(r.prose, CAP_DESCRIPTION), r.prose.length)}%`,
      String(Math.max(0, ...r.prose)),
    ]);
  }
  table.push([
    "TOTAL",
    String(allRules.length),
    String(over(allRules, CAP_INSTRUCTION)),
    `${pct(over(allRules, CAP_INSTRUCTION), allRules.length)}%`,
    String(Math.max(0, ...allRules)),
    String(allProse.length),
    String(over(allProse, CAP_DESCRIPTION)),
    `${pct(over(allProse, CAP_DESCRIPTION), allProse.length)}%`,
    String(Math.max(0, ...allProse)),
  ]);

  const width = head.map((_, i) => Math.max(...table.map((r) => r[i].length)));
  for (const [n, row] of table.entries()) {
    console.log(row.map((c, i) => c.padEnd(width[i])).join("  "));
    if (n === 0) console.log(width.map((w) => "-".repeat(w)).join("  "));
  }
}

// The lint imports these to report an over-cap sentence as an advisory. The
// caps live here rather than in a rule file, because a rule file stating a
// limit a script already checks is a second copy, and a second copy drifts.
export { measure, CAP_INSTRUCTION, CAP_DESCRIPTION };

// Run it directly for the full table. The lint calls measure() instead.
if (import.meta.url === `file://${process.argv[1]}`) {
  const files = process.argv.slice(2);
  if (!files.length) {
    console.error("give it some files");
    process.exit(1);
  }
  report(files.map(measure));
}
