#!/usr/bin/env node
// The mechanical half of the eval protocol, plugins/steering/shared/eval-protocol.md.
//
//   npm run eval -- plan <SKILL.md | eval.yaml> [--run-root DIR] [--dry] [--harness claude|copilot] [--trials N]
//   npm run eval -- check <run root>
//   npm run eval -- results <run root> [--out DIR]
//
// plan parses the eval, refuses one that breaks a rule and names it, creates one
// directory per case and trial, copies the fixtures in, and writes each executor
// prompt. check runs every case's check command twice, holds each trial against
// its budget from the harness's logs, and writes the judge prompt. results
// renders the page. An agent does the dispatching between plan and check, and
// between check and results; nothing here talks to a model.
//
// No dependencies. The YAML reader below handles the subset the template uses:
// maps, lists of maps, inline lists, quoted scalars, and > or | block scalars.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// ---------------------------------------------------------------------------
// A YAML subset
// ---------------------------------------------------------------------------
function stripComment(line) {
  let inS = false, inD = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === "'" && !inD) inS = !inS;
    else if (c === '"' && !inS) inD = !inD;
    else if (c === "#" && !inS && !inD && (i === 0 || /\s/.test(line[i - 1]))) return line.slice(0, i).replace(/\s+$/, "");
  }
  return line.replace(/\s+$/, "");
}
function scalar(s) {
  s = s.trim();
  if (s === "") return null;
  if (/^\[.*\]$/.test(s)) return s.slice(1, -1).split(",").map((x) => scalar(x)).filter((x) => x !== null);
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) return s.slice(1, -1);
  if (s === "true") return true;
  if (s === "false") return false;
  if (s === "none" || s === "null" || s === "~") return "none" === s ? "none" : null;
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  return s;
}
export function parseYaml(text) {
  const raw = text.split(/\r?\n/);
  const lines = [];
  for (const l of raw) {
    const t = stripComment(l);
    lines.push({ indent: t.match(/^\s*/)[0].length, text: t.trim(), blank: t.trim() === "" });
  }
  let i = 0;
  const peek = () => { while (i < lines.length && lines[i].blank) i++; return lines[i]; };
  function block(indent) {
    const l = peek();
    if (!l) return null;
    return l.text.startsWith("- ") || l.text === "-" ? list(l.indent) : map(l.indent);
  }
  function blockScalar(kind, parentIndent) {
    const out = [];
    while (i < lines.length) {
      const l = lines[i];
      if (l.blank) { out.push(""); i++; continue; }
      if (l.indent <= parentIndent) break;
      out.push(raw[i].slice(Math.min(l.indent, raw[i].match(/^\s*/)[0].length)).replace(/\s+$/, ""));
      i++;
    }
    while (out.length && out[out.length - 1] === "") out.pop();
    if (kind === "|") return out.join("\n");
    return out.join(" ").replace(/ {2,}/g, " ").replace(/ \n/g, "\n").trim();
  }
  function value(rest, indent) {
    if (rest === ">" || rest === "|") { i++; return blockScalar(rest, indent); }
    if (rest === "") { i++; const n = peek(); return n && n.indent > indent ? block(n.indent) : null; }
    i++; return scalar(rest);
  }
  function map(indent) {
    const out = {};
    for (;;) {
      const l = peek();
      if (!l || l.indent !== indent || l.text.startsWith("- ")) break;
      const m = l.text.match(/^([^:]+):(?:\s+(.*))?$/);
      if (!m) throw new Error(`cannot read line ${i + 1}: ${l.text}`);
      out[m[1].trim()] = value((m[2] ?? "").trim(), indent);
    }
    return out;
  }
  function list(indent) {
    const out = [];
    for (;;) {
      const l = peek();
      if (!l || l.indent !== indent || !(l.text.startsWith("- ") || l.text === "-")) break;
      const rest = l.text === "-" ? "" : l.text.slice(2);
      if (/^[^:\[\]"']+:(\s|$)/.test(rest)) {
        // a map whose first key sits on the dash line: rewrite the line and parse a map two deeper
        lines[i] = { indent: indent + 2, text: rest, blank: false };
        raw[i] = " ".repeat(indent + 2) + rest;
        out.push(map(indent + 2));
      } else {
        out.push(value(rest, indent));
      }
    }
    return out;
  }
  const result = block(0);
  const left = peek();
  if (left) throw new Error(`cannot read line ${i + 1}: ${left.text}`);
  return result;
}

// ---------------------------------------------------------------------------
// Loading and validating an eval
// ---------------------------------------------------------------------------
export const DEFAULTS = { model: "sonnet", judge: "opus", trials: 3, budget: { tool_calls: 40, seconds: 600, tokens: 120000 } };
const STATUSES = ["DONE", "DONE_WITH_CONCERNS", "BLOCKED", "NEEDS_CONTEXT"];

export function findEval(target) {
  const abs = path.resolve(target);
  const st = fs.existsSync(abs) ? fs.statSync(abs) : null;
  if (!st) throw new Error(`no such path: ${abs}`);
  let skillDir;
  if (st.isDirectory()) skillDir = abs;
  else if (path.basename(abs) === "SKILL.md") skillDir = path.dirname(abs);
  else if (/^eval\.(ya?ml|json)$/.test(path.basename(abs))) skillDir = path.dirname(path.dirname(abs));
  else throw new Error(`give a SKILL.md, a skill directory, or evals/eval.yaml: ${abs}`);
  for (const name of ["eval.yaml", "eval.yml", "eval.json"]) {
    const f = path.join(skillDir, "evals", name);
    if (fs.existsSync(f)) return { skillDir, evalFile: f, skillFile: path.join(skillDir, "SKILL.md") };
  }
  return { skillDir, evalFile: null, skillFile: path.join(skillDir, "SKILL.md") };
}

export function loadEval(evalFile) {
  const text = fs.readFileSync(evalFile, "utf8");
  return evalFile.endsWith(".json") ? JSON.parse(text) : parseYaml(text);
}

// Returns { refusals, warnings }. A refusal is a Blocking rule broken; the
// runner returns NEEDS_CONTEXT on any refusal. A warning is Important or
// Advisory and goes to the results page.
export function validateEval(ev, { evalDir } = {}) {
  const refusals = [], warnings = [];
  if (!ev || typeof ev !== "object") return { refusals: ["the eval is not a map"], warnings };
  const skill = ev.skill;
  if (typeof skill !== "string" || !skill) refusals.push("the eval names no skill (rule: the eval names its skill)");
  const cases = Array.isArray(ev.cases) ? ev.cases : [];
  if (cases.length < 3) refusals.push(`${cases.length} case(s); the floor is three (rule: at least three cases)`);
  const names = new Set();
  let triggerNone = 0;
  cases.forEach((c, k) => {
    const id = c && c.name ? `case "${c.name}"` : `case ${k + 1}`;
    if (!c || typeof c !== "object") { refusals.push(`${id} is not a map`); return; }
    for (const f of ["name", "skills", "query", "files"]) if (!(f in c)) refusals.push(`${id} lacks ${f} (rule: each case has name, skills, query and files)`);
    if (c.name) { if (names.has(c.name)) refusals.push(`${id} repeats a name`); names.add(c.name); }
    if (skill && Array.isArray(c.skills) && !c.skills.includes(skill)) refusals.push(`${id} does not list ${skill} under skills`);
    const none = c.trigger === "none";
    if (none) triggerNone++;
    if (!none && !c.check && !c.expected_behavior) refusals.push(`${id} has neither check nor expected_behavior`);
    if (c.check !== undefined && (typeof c.check !== "string" || /\n/.test(c.check))) refusals.push(`${id}: check is not one shell command`);
    if (c.expect_status !== undefined && !(STATUSES.includes(c.expect_status) || /^[A-Z][A-Z_]+$/.test(String(c.expect_status)))) refusals.push(`${id}: expect_status "${c.expect_status}" is not one of ${STATUSES.join(", ")} or a status the skill declares, in capitals`);
    if (c.facts !== undefined && (typeof c.facts !== "object" || Array.isArray(c.facts))) refusals.push(`${id}: facts is not a map`);
    if (c.repo !== undefined && typeof c.repo !== "boolean") refusals.push(`${id}: repo is not true or false`);
    if (evalDir && Array.isArray(c.files)) for (const f of c.files) if (!fs.existsSync(path.join(evalDir, f))) refusals.push(`${id}: file ${f} is not under evals/`);
    if (typeof c.query === "string" && /\b(follow|use) the skill\b/i.test(c.query)) warnings.push(`${id}: the query names the skill; a person's request would not (Important)`);
  });
  if (cases.length >= 3 && triggerNone === 0) warnings.push("no case is marked trigger: none (Important: one query the skill must decline)");
  if (cases.length > 8 && !ev.reason) warnings.push(`${cases.length} cases and no reason line (Advisory: more than eight cases carries a sentence saying why)`);
  return { refusals, warnings };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function arg(name, def) { const i = process.argv.indexOf(name); return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : def; }
const flag = (name) => process.argv.includes(name);
function harnessDefault() {
  if (flag("--harness")) return arg("--harness");
  if (process.env.CLAUDECODE || process.env.CLAUDE_CODE) return "claude";
  if (process.env.COPILOT_CLI || fs.existsSync(path.join(os.homedir(), ".copilot"))) return "copilot";
  return "claude";
}
function stamp() { const d = new Date(); const p = (n) => String(n).padStart(2, "0"); return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`; }
function pluginRootOf(dir) { let d = dir; for (let k = 0; k < 8; k++) { if (fs.existsSync(path.join(d, "plugin.json"))) return d; const up = path.dirname(d); if (up === d) break; d = up; } return null; }
function gitRoot(dir) { const r = spawnSync("git", ["-C", dir, "rev-parse", "--show-toplevel"], { encoding: "utf8" }); return r.status === 0 ? r.stdout.trim() : null; }
function gitCommit(dir) { const r = spawnSync("git", ["-C", dir, "rev-parse", "--short", "HEAD"], { encoding: "utf8" }); return r.status === 0 ? r.stdout.trim() : null; }
function frontmatter(file) {
  const t = fs.readFileSync(file, "utf8"); const m = t.match(/^---\r?\n([\s\S]*?)\r?\n---/); if (!m) return {};
  const out = {}; for (const l of m[1].split("\n")) { const k = l.match(/^([\w-]+):\s*(.*)$/); if (k) out[k[1]] = k[2].replace(/^["']|["']$/g, ""); } return out;
}
function staticLoad(skillDir) {
  const skill = path.join(skillDir, "SKILL.md");
  const seen = new Set([skill]); let lines = fs.readFileSync(skill, "utf8").split("\n").length;
  const text = fs.readFileSync(skill, "utf8");
  for (const m of text.matchAll(/`((?:\.{1,2}\/|reference\/)[^`\n]+\.md)`|\]\(([^)]+\.md)\)/g)) {
    const rel = m[1] || m[2]; const f = path.normalize(path.join(skillDir, rel));
    if (!seen.has(f) && fs.existsSync(f) && f.startsWith(skillDir + path.sep)) { seen.add(f); lines += fs.readFileSync(f, "utf8").split("\n").length; }
  }
  return { files: seen.size, lines };
}
function shuffle(a, seed) { const x = [...a]; let s = seed; for (let k = x.length - 1; k > 0; k--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (k + 1)); [x[k], x[j]] = [x[j], x[k]]; } return x; }
const readJson = (f, def) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : def);
const writeJson = (f, o) => fs.writeFileSync(f, JSON.stringify(o, null, 2) + "\n");

// ---------------------------------------------------------------------------
// plan
// ---------------------------------------------------------------------------
function executorPrompt({ dir, skillFile, query, files, facts, model, repo, repoRoot }) {
  const lines = [
    `You are one executor in an eval. Your working directory is ${dir}. Create files only under ${dir}/out/.`,
    `Do not read any directory outside ${dir} except the skill named below, the files it points to${repoRoot ? `, and the repository that holds it, ${repoRoot}, where you may run the commands the skill names` : ""}.`,
    "There is no person to ask. Where the skill you follow tells you to ask a person, return the status it names for that case, with the question you would have asked, and stop.",
  ];
  if (facts && Object.keys(facts).length) { lines.push("Facts established before this run:"); for (const [k, v] of Object.entries(facts)) lines.push(`- ${k}: ${v}`); }
  lines.push(`Read the skill at ${skillFile} and follow it exactly as written. Its relative paths resolve from the directory that holds it.`);
  if (files.length) lines.push(`The files for this task are under ${dir}/in/: ${files.map((f) => path.basename(f)).join(", ")}.${repo ? ` ${dir}/in is a git repository with one commit; it is the repository this task is about.` : ""}`);
  lines.push(`The request: ${query}`);
  lines.push("When you finish, return exactly this block and nothing after it:", "", "Status: <DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT>", "Question: <the question you would have asked a person, or none>", "Output: <every path under out/ you wrote, one per line>");
  return lines.join("\n") + "\n";
}
function plan() {
  const target = process.argv[3]; if (!target) { console.error("plan needs a SKILL.md, a skill directory, or evals/eval.yaml"); process.exit(2); }
  const { skillDir, evalFile, skillFile } = findEval(target);
  if (!evalFile) { console.error(`refused: no evals/eval.yaml under ${skillDir}`); process.exit(2); }
  const ev = loadEval(evalFile); const evalDir = path.dirname(evalFile);
  const { refusals, warnings } = validateEval(ev, { evalDir });
  for (const w of warnings) console.log(`warning: ${w}`);
  if (refusals.length) { for (const r of refusals) console.log(`refused: ${r}`); process.exit(2); }
  const model = ev.model || DEFAULTS.model, judge = ev.judge || DEFAULTS.judge;
  const trialsOverride = flag("--trials") ? Number(arg("--trials")) : null;
  const trials = trialsOverride || ev.trials || DEFAULTS.trials;
  const budget = { ...DEFAULTS.budget, ...(ev.budget || {}) };
  const harness = harnessDefault();
  const load = staticLoad(skillDir);
  const pluginRoot = pluginRootOf(skillDir);
  const repoRoot = (() => { const r = spawnSync("git", ["-C", skillDir, "rev-parse", "--show-toplevel"], { encoding: "utf8" }); return r.status === 0 ? r.stdout.trim() : pluginRoot; })();
  const runRoot = path.resolve(arg("--run-root", path.join(os.homedir(), "skyetrail-agents-runs", "eval", ev.skill, stamp())));
  const cases = ev.cases.map((c) => ({
    name: c.name, trigger: c.trigger === "none" ? "none" : "expected", expect_status: c.expect_status || "DONE",
    check: c.check || null, expected_behavior: c.expected_behavior || null, files: c.files || [], facts: c.facts || {},
    budget: { ...budget, ...(c.budget || {}) }, baseline: c.baseline === true, repo: c.repo === true, query: c.query,
    trials: c.trigger === "none" ? 0 : c.expected_behavior ? trials : 1,
  }));
  console.log(`eval ${evalFile}\nskill ${ev.skill} at ${skillFile}\nharness ${harness}, model ${model}, judge ${judge}, trials ${trials}`);
  console.log(`static load ${load.lines} lines across ${load.files} file(s)`);
  for (const c of cases) console.log(`  ${c.name}: ${c.trials} executor run(s), trigger ${c.trigger}, expect ${c.expect_status}${c.check ? ", check" : ""}${c.expected_behavior ? ", judged" : ""}`);
  if (flag("--dry")) { console.log("dry run: nothing written"); return; }
  fs.mkdirSync(runRoot, { recursive: true });
  const planObj = { skill: ev.skill, skill_file: skillFile, skill_dir: skillDir, eval_file: evalFile, plugin_root: pluginRoot, commit: gitCommit(skillDir), harness, model, judge, trials, trials_override: trialsOverride, budget, static_load: load, warnings, created: new Date().toISOString(), cases: [] };
  for (const c of cases) {
    const dirs = [];
    for (let t = 1; t <= c.trials; t++) {
      const dir = path.join(runRoot, c.name, `t${t}`);
      fs.mkdirSync(path.join(dir, "in"), { recursive: true }); fs.mkdirSync(path.join(dir, "out"), { recursive: true });
      for (const f of c.files) fs.copyFileSync(path.join(evalDir, f), path.join(dir, "in", path.basename(f)));
      if (c.repo) {
        // the fixture is a repository: one commit, so a skill's git checks have something to read
        const inDir = path.join(dir, "in");
        for (const a of [["init", "-q"], ["add", "-A"], ["-c", "user.name=fixture", "-c", "user.email=fixture@example", "commit", "-q", "-m", "fixture"]]) spawnSync("git", ["-C", inDir, ...a], { encoding: "utf8" });
      }
      fs.writeFileSync(path.join(dir, "prompt.md"), executorPrompt({ dir, skillFile, query: c.query, files: c.files, facts: c.facts, model, repo: c.repo, repoRoot }));
      writeJson(path.join(dir, "executor.json"), { status: null, agent_id: null, question: null, returned: null, model });
      dirs.push(dir);
    }
    planObj.cases.push({ ...c, dirs });
  }
  // the trigger prompt: every skill description in the plugin, and every query, shuffled
  const descriptions = [];
  if (pluginRoot && fs.existsSync(path.join(pluginRoot, "skills"))) for (const d of fs.readdirSync(path.join(pluginRoot, "skills"))) { const f = path.join(pluginRoot, "skills", d, "SKILL.md"); if (fs.existsSync(f)) { const fm = frontmatter(f); descriptions.push({ name: fm.name || d, description: fm.description || "" }); } }
  if (!descriptions.some((d) => d.name === ev.skill)) { const fm = frontmatter(skillFile); descriptions.push({ name: fm.name || ev.skill, description: fm.description || "" }); }
  const queries = shuffle(cases.map((c, k) => ({ id: `q${k + 1}`, name: c.name, query: c.query })), 20260902);
  const tp = ["You classify requests against skill descriptions. You see only the descriptions below and the requests. Do not open any file.", "", "Skills:"];
  for (const d of descriptions) tp.push(`- ${d.name}: ${d.description}`);
  tp.push("", "Requests:"); for (const q of queries) tp.push(`- ${q.id}: ${q.query}`);
  tp.push("", "For each request, name the one skill whose description says it applies, or none. Do this three times, independently, and return exactly this JSON and nothing else:", '{"trials": [[{"id": "q1", "skill": "<name or none>"}, ...], [...], [...]]}');
  fs.writeFileSync(path.join(runRoot, "trigger-prompt.md"), tp.join("\n") + "\n");
  planObj.trigger_queries = queries.map((q) => ({ id: q.id, name: q.name }));
  writeJson(path.join(runRoot, "plan.json"), planObj);
  console.log(`run root ${runRoot}\nnext: dispatch one executor per prompt.md, fill each executor.json, dispatch trigger-prompt.md and save trigger.json, then run check`);
}

// ---------------------------------------------------------------------------
// check
// ---------------------------------------------------------------------------
function runCheck(cmd, cwd) {
  const r = spawnSync("sh", ["-c", cmd], { cwd, encoding: "utf8", timeout: 60000, env: { PATH: process.env.PATH, HOME: process.env.HOME } });
  return { exit: r.status === null ? -1 : r.status, output: ((r.stdout || "") + (r.stderr || "")).slice(0, 2000) };
}
function untickedLines(dir) {
  let n = 0; const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith(".md")) n += (fs.readFileSync(f, "utf8").match(/^\s*\[ \]/gm) || []).length; } };
  if (fs.existsSync(dir)) walk(dir); return n;
}
const ADAPTERS = {
  claude(agentId) {
    const file = process.env.EVAL_TOOL_LOG || path.join(os.homedir(), ".claude", "eval-tools.log");
    if (!agentId || !fs.existsSync(file)) return { source: agentId ? `no log at ${file}` : "no agent id recorded", tool_calls: null, seconds: null, tokens: null };
    const rows = fs.readFileSync(file, "utf8").split("\n").filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter((r) => r && r.agent_id === agentId);
    if (!rows.length) return { source: `${file}: no line for agent ${agentId}`, tool_calls: 0, seconds: null, tokens: null };
    const ts = rows.map((r) => r.ts); return { source: `${file}, agent_id ${agentId}`, tool_calls: rows.length, seconds: Math.round((Math.max(...ts) - Math.min(...ts)) / 1000), tokens: null, tools: rows.map((r) => r.tool_name) };
  },
  copilot(agentId) {
    const root = path.join(os.homedir(), ".copilot", "session-state");
    if (!agentId) return { source: "no agent id recorded", tool_calls: null, seconds: null, tokens: null };
    if (!fs.existsSync(root)) return { source: `no session state at ${root}`, tool_calls: null, seconds: null, tokens: null };
    let calls = 0, seconds = null, tokens = null, found = false, tools = [];
    for (const s of fs.readdirSync(root)) {
      const f = path.join(root, s, "events.jsonl"); if (!fs.existsSync(f)) continue;
      for (const l of fs.readFileSync(f, "utf8").split("\n")) {
        if (!l.includes(agentId)) continue; let e; try { e = JSON.parse(l); } catch { continue; }
        if (e.agentId !== agentId && !(e.data && e.data.agentId === agentId)) continue;
        found = true;
        if (e.type === "tool.execution_start") { calls++; tools.push(e.data && e.data.toolName); }
        if (e.type === "subagent.completed" && e.data) { if (e.data.durationMs != null) seconds = Math.round(e.data.durationMs / 1000); if (e.data.totalTokens != null) tokens = e.data.totalTokens; if (e.data.totalToolCalls != null) calls = e.data.totalToolCalls; }
      }
    }
    if (!found) return ADAPTERS.claudeLog(agentId, path.join(os.homedir(), ".copilot", "eval-tools.log"));
    return { source: `${root}/*/events.jsonl, agentId ${agentId} (untested adapter)`, tool_calls: calls, seconds, tokens, tools };
  },
  claudeLog(agentId, file) {
    if (!fs.existsSync(file)) return { source: `no log at ${file}`, tool_calls: null, seconds: null, tokens: null };
    const rows = fs.readFileSync(file, "utf8").split("\n").filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter((r) => r && r.agent_id === agentId);
    if (!rows.length) return { source: `${file}: no line for agent ${agentId}`, tool_calls: 0, seconds: null, tokens: null };
    const ts = rows.map((r) => r.ts); return { source: `${file}, agent_id ${agentId}`, tool_calls: rows.length, seconds: Math.round((Math.max(...ts) - Math.min(...ts)) / 1000), tokens: null };
  },
};
function check() {
  const root = path.resolve(process.argv[3] || ""); const p = readJson(path.join(root, "plan.json"), null);
  if (!p) { console.error(`no plan.json under ${root}`); process.exit(2); }
  const adapter = ADAPTERS[p.harness] || ADAPTERS.claude;
  const trigger = readJson(path.join(root, "trigger.json"), null);
  const judgePrompt = ["You judge eval outputs. For each item below, read the output files listed, then decide whether the sentence under expected_behavior is true of them. You see no skill and no trial numbers. Return exactly this JSON and nothing else:", '{"items": [{"id": "j1", "pass": true, "quote": "<at most 25 words from the output that decided it>"}, ...]}', ""];
  const judged = []; const out = { checked: new Date().toISOString(), cases: [] };
  for (const c of p.cases) {
    const trig = trigger ? p.trigger_queries.find((q) => q.name === c.name) : null;
    let trigCount = null;
    if (trig && Array.isArray(trigger.trials)) { trigCount = 0; for (const t of trigger.trials) { const a = (t || []).find((x) => x.id === trig.id); const sel = a ? String(a.skill || "none") : "none"; if ((c.trigger === "none" && sel !== p.skill) || (c.trigger !== "none" && sel === p.skill)) trigCount++; } }
    const row = { name: c.name, trigger: c.trigger, trigger_hits: trigCount, trigger_trials: trigger ? (trigger.trials || []).length : 0, trials: [] };
    for (const dir of c.dirs) {
      const ex = readJson(path.join(dir, "executor.json"), {});
      const t = { dir, status: ex.status ?? null, expect_status: c.expect_status, completion: ex.status === c.expect_status, unticked: untickedLines(path.join(dir, "out")), check: null, economy: null, judge: null };
            // unticked lines are reported, not failed: a skill may leave a line unticked with a reason
      if (c.check) { const a = runCheck(c.check, dir), b = runCheck(c.check, dir); t.check = { command: c.check, exit: a.exit, exit_again: b.exit, repeatable: a.exit === b.exit, output: a.output, pass: a.exit === 0 && b.exit === 0 }; }
      const eco = adapter(ex.agent_id); const bud = c.budget;
      t.economy = { ...eco, budget: bud, pass: (eco.tool_calls == null || eco.tool_calls <= bud.tool_calls) && (eco.seconds == null || eco.seconds <= bud.seconds) && (eco.tokens == null || eco.tokens <= bud.tokens) };
      if (Array.isArray(ex.tools_claimed) && Array.isArray(eco.tools)) t.economy.claim_difference = Math.abs(ex.tools_claimed.length - eco.tools.length);
      if (c.expected_behavior) { const id = `j${judged.length + 1}`; judged.push({ id, dir, expected_behavior: c.expected_behavior, files: fs.existsSync(path.join(dir, "out")) ? fs.readdirSync(path.join(dir, "out")) : [] }); t.judge = { id, pass: null, quote: null }; }
      row.trials.push(t);
    }
    out.cases.push(row);
  }
  const judgeJson = readJson(path.join(root, "judge.json"), null);
  if (judgeJson && Array.isArray(judgeJson.items)) for (const row of out.cases) for (const t of row.trials) if (t.judge) { const j = judgeJson.items.find((x) => x.id === t.judge.id); if (j) { t.judge.pass = j.pass === true; t.judge.quote = j.quote || null; } }
  for (const j of shuffle(judged, 20260902)) { judgePrompt.push(`## ${j.id}`, `Output files: ${j.files.length ? j.files.map((f) => path.join(j.dir, "out", f)).join(", ") : "(none written)"}`, `Input files: ${path.join(j.dir, "in")}`, `expected_behavior: ${j.expected_behavior}`, ""); }
  fs.writeFileSync(path.join(root, "judge-prompt.md"), judgePrompt.join("\n") + "\n");
  writeJson(path.join(root, "checks.json"), out);
  const need = judged.length && !judgeJson ? " Dispatch judge-prompt.md and save judge.json, then run check again." : "";
  console.log(`checks.json written for ${out.cases.length} case(s).${need}`);
}

// ---------------------------------------------------------------------------
// results
// ---------------------------------------------------------------------------
function results() {
  const root = path.resolve(process.argv[3] || ""); const p = readJson(path.join(root, "plan.json"), null); const ch = readJson(path.join(root, "checks.json"), null);
  if (!p || !ch) { console.error("results needs plan.json and checks.json; run plan and check first"); process.exit(2); }
  // date and time, so two runs on one day keep both pages
  const when = p.created ? p.created.replace(/[:.]/g, "-").replace("T", "-").slice(0, 19) : stamp();
  const outDir = path.resolve(arg("--out", p.plugin_root ? path.join(p.plugin_root, "tests", "evals", p.skill, when) : path.join(root, "results")));
  fs.mkdirSync(outDir, { recursive: true });
  const L = [`# Eval: ${p.skill}`, "", `Skill at \`${p.skill_file}\`${p.commit ? `, commit \`${p.commit}\`` : ""}. Harness ${p.harness}, executor ${p.model}, judge ${p.judge}. Static load ${p.static_load.lines} lines across ${p.static_load.files} file(s). Run root \`${root}\`.`, ""];
  if (p.trials_override) L.push(`Trials overridden to ${p.trials_override} on the command line; the eval asks for more.`, "");
  if (p.warnings && p.warnings.length) { L.push("Warnings from plan:", ""); for (const w of p.warnings) L.push(`- ${w}`); L.push(""); }
  L.push("| Case | Trial | trigger | completion | economy | result |", "| --- | --- | --- | --- | --- | --- |");
  let allPass = true, anyPass = false, blocked = false;
  const trig = (row) => (row.trigger_trials ? `${row.trigger_hits} of ${row.trigger_trials}${row.trigger === "none" ? " declined" : ""}` : "not run");
  for (const row of ch.cases) {
    const tPass = row.trigger_trials ? row.trigger_hits === row.trigger_trials : null;
    if (!row.trials.length) { L.push(`| ${row.name} | - | ${trig(row)} | - | - | - |`); if (tPass === false) allPass = false; if (tPass) anyPass = true; continue; }
    row.trials.forEach((t, k) => {
      if (t.status === null) blocked = true;
      const e = t.economy || {}; const eco = `${e.tool_calls ?? "?"} calls, ${e.seconds ?? "?"} s, ${e.tokens ?? "tokens not measured"}${e.pass ? "" : " OVER BUDGET"}`;
      const res = [t.check ? `check exit ${t.check.exit}${t.check.repeatable ? "" : " (not repeatable)"}` : null, t.judge ? (t.judge.pass === null ? "judge pending" : `judge ${t.judge.pass ? "pass" : "fail"}${t.judge.quote ? `: "${t.judge.quote}"` : ""}`) : null].filter(Boolean).join("; ") || "-";
      const rPass = (!t.check || t.check.pass) && (!t.judge || t.judge.pass === true);
      const pass = (tPass !== false) && t.completion && e.pass && rPass;
      if (pass) anyPass = true; else allPass = false;
      L.push(`| ${row.name} | ${k + 1} | ${trig(row)} | ${t.status ?? "no status"}${t.completion ? "" : " (expected " + t.expect_status + ")"}${t.unticked ? `, ${t.unticked} unticked` : ""} | ${eco} | ${res} |`);
    });
  }
  const status = blocked ? "BLOCKED" : allPass ? "DONE" : anyPass ? "DONE_WITH_CONCERNS" : "DONE_WITH_CONCERNS";
  L.push("", `## Status: ${status}`, "", "Economy sources:", "");
  for (const row of ch.cases) for (const t of row.trials) L.push(`- ${row.name} t${row.trials.indexOf(t) + 1}: ${t.economy ? t.economy.source : "-"}`);
  L.push("", "| Status | Means | The caller must |", "| --- | --- | --- |",
    "| DONE | Each case passed on each trial. | Re-run `npm run eval -- check <run root>` and compare checks.json. |",
    "| DONE_WITH_CONCERNS | A case passed on some trials, or a condition failed. | Read each failed row before using the skill. |",
    "| BLOCKED | An executor did not return. | Open its directory. Re-dispatch, or report the block upward. |",
    "| NEEDS_CONTEXT | The eval was refused. | Fix the eval against the rule named. |", "");
  fs.writeFileSync(path.join(outDir, "RESULTS.md"), L.join("\n"));
  fs.copyFileSync(path.join(root, "checks.json"), path.join(outDir, "checks.json"));
  console.log(`${path.join(outDir, "RESULTS.md")}\nstatus ${status}`);
}

const cmd = process.argv[2];
if (import.meta.url === `file://${process.argv[1]}`) {
  if (cmd === "plan") plan(); else if (cmd === "check") check(); else if (cmd === "results") results();
  else { console.error("usage: run-eval.mjs plan <target> [--run-root DIR] [--dry] | check <run root> | results <run root> [--out DIR]"); process.exit(2); }
}
