#!/usr/bin/env node
// Prose line length for the markdown this repository lints. The rules are in eng/wrap.mjs.
//
//   node eng/check-wrap.mjs          report every prose line over the limit, exit 1 if any
//   node eng/check-wrap.mjs --fix    reflow each paragraph that has such a line, or a line that
//                                    ends early although the next word would fit on it
//
// The scope is the one .vale.ini checks: every tracked .md file except tests, evals and .vale/.
// A hard line break inside a phrase hides it from Vale, so a reflow can bring a Vale finding
// to light. Run npm run vale after --fix.
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { LIMIT, classify, over, wrapText } from "./wrap.mjs";

const FIX = process.argv.includes("--fix");
const files = execFileSync("git", ["ls-files", "*.md"], { encoding: "utf8" })
  .split("\n")
  .filter((f) => f && !/(^|\/)(tests|evals|node_modules)\/|^\.vale\//.test(f));

let problems = 0;
let changed = 0;
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  if (FIX) {
    const next = wrapText(text);
    if (next !== text) {
      fs.writeFileSync(file, next);
      changed++;
      console.log(`reflowed ${file}`);
    }
    continue;
  }
  const lines = text.split("\n");
  const kinds = classify(lines);
  lines.forEach((l, i) => {
    if (kinds[i] === "prose" && over(l)) {
      problems++;
      console.log(`${file}:${i + 1}: ${l.length} columns, over ${LIMIT}`);
    }
  });
}
if (FIX) console.log(`${changed} file(s) changed`);
else if (problems) {
  console.log(`${problems} prose line(s) over ${LIMIT} columns. Run: node eng/check-wrap.mjs --fix`);
  process.exit(1);
} else console.log(`every prose line is ${LIMIT} columns or fewer`);
