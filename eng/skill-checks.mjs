// Every mechanical check this repository makes against a skill, held as data.
//
// One copy, two callers. `eng/generate-readmes.mjs` runs the subset that guards
// this repository's build. `eng/audit-skill.mjs` runs the whole set against any
// skill directory on disk. Both take the message text from here, so a check
// cannot say one thing in the build and another in an audit.
//
// A check is mechanical when a script settles it. Anything that needs a reader
// to weigh a sentence stays in the rule files under plugins/steering/shared/,
// and nothing here restates one of those.
//
// Each check carries:
//   id         stable name, printed in every report
//   scope      what it opens: frontmatter, body, markdown, or bundle
//   severity   fail stops a run; advisory prints and does not
//   source     where the check comes from, so a reader can trace it
//   requires   the property, in one line
//   run(ctx)   returns one message per violation; an empty array is a pass
//   applies    optional; returns a reason string when the check is n/a
//
// Scopes:
//   frontmatter  the component file's YAML block
//   body         the component file's body
//   markdown     SKILL.md and every markdown file it references
//   bundle       the skill directory: scripts, bundled files, eval records

import fs from "node:fs";
import path from "node:path";
import { builtinModules } from "node:module";
import { measure, CAP_INSTRUCTION, CAP_DESCRIPTION } from "./measure-sentences.mjs";

export const MAX_NAME = 64; // Agent Skills frontmatter name limit
export const MAX_DESCRIPTION = 1024; // Agent Skills frontmatter description limit
export const MAX_BODY_LINES = 500; // recommended SKILL.md body length
// A reference file past this length opens with a contents list. Counting lines
// by hand is what skill-rules.md forbids, so the count belongs here.
export const CONTENTS_REQUIRED_LINES = 100;
export const CONTENTS_RE = /^#{2,3}\s+Contents\s*$/m;
export const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const MIN_EVALUATIONS = 3; // Anthropic: at least three evaluation scenarios
export const EVAL_FIELDS = ["skills", "query", "files", "expected_behavior"];
export const MODELS = ["haiku", "sonnet", "opus"];

// A name that names no activity. Anthropic separates "vague" from "overly
// generic"; one list settles both, because the fix is the same either way.
const VAGUE_NAMES = new Set([
  "helper", "helpers", "util", "utils", "utility", "utilities",
  "tool", "tools", "toolkit", "data", "file", "files", "misc",
  "stuff", "common", "general", "shared", "core", "lib", "main",
]);

const RESERVED_WORDS = ["anthropic", "claude"];

const TAG_RE = /<\/?[A-Za-z][A-Za-z0-9-]*(?:\s[^>]*)?\/?>/;

const SCRIPT_EXTENSIONS = new Set([".py", ".js", ".mjs", ".cjs", ".ts", ".tsx", ".rb", ".sh", ".bash", ".ps1"]);

const PACKAGING_FILES = new Set(["README.md", "LICENSE", "LICENSE.md", "LICENSE.txt", "NOTICE"]);

// Python's standard library, so an import of one is not a package the skill has
// to name. The list is long rather than clever; a name missing from it is
// reported as a package, which is the safe direction for a mechanical check.
const PY_STDLIB = new Set(`abc argparse array ast asyncio atexit base64 binascii bisect builtins bz2
calendar cmath cmd code codecs collections colorsys compileall concurrent configparser contextlib
contextvars copy copyreg csv ctypes curses dataclasses datetime dbm decimal difflib dis doctest
email encodings enum errno faulthandler filecmp fileinput fnmatch fractions ftplib functools gc
getopt getpass gettext glob graphlib grp gzip hashlib heapq hmac html http imaplib importlib
inspect io ipaddress itertools json keyword linecache locale logging lzma mailbox marshal math
mimetypes mmap modulefinder multiprocessing netrc numbers operator os pathlib pdb pickle pickletools
pkgutil platform plistlib poplib posix posixpath pprint profile pstats pty pwd py_compile queue
quopri random re readline reprlib resource runpy sched secrets select selectors shelve shlex shutil
signal site smtplib socket socketserver sqlite3 ssl stat statistics string stringprep struct
subprocess symtable sys sysconfig syslog tarfile tempfile termios textwrap threading time timeit
tkinter token tokenize tomllib trace traceback tracemalloc tty types typing unicodedata unittest
urllib uuid venv warnings wave weakref webbrowser wsgiref xml xmlrpc zipapp zipfile zipimport
zlib zoneinfo`.split(/\s+/).filter(Boolean));

const NODE_BUILTINS = new Set(builtinModules);

// A Windows-style path written where a forward-slash path belongs. The token
// must end in an extension. One or two backslashes both count, because source
// code writes the separator escaped: "reports\\summary.csv" is the same path.
//
// This is advisory, so it favours catching the real case over silence. A string
// escape that happens to look like a path, such as "foo\nbar.txt", is reported
// and a reader dismisses it on sight. A markdown escape is not: a segment
// opening with _, - or . is escaped punctuation, not a directory.
const BACKSLASH_PATH_RE =
  /(?:[A-Za-z]:)?[A-Za-z0-9_.-]+(?:\\{1,2}[A-Za-z0-9_.-]+)+\.[A-Za-z0-9]{1,6}/g;

function looksLikeWindowsPath(token) {
  const parts = token.split(/\\{1,2}/);
  return parts.slice(1).every((p) => !/^[_.-]/.test(p));
}

export function read(file) {
  return fs.readFileSync(file, "utf8");
}

export function exists(file) {
  return fs.existsSync(file);
}

// Parse a small YAML frontmatter block. It handles single-line scalar values
// and one level of nested mapping, which is enough for the skill metadata block
// (for example metadata.version). Values may be wrapped in straight quotes.
export function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const stripQuotes = (v) =>
    (v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))
      ? v.slice(1, -1)
      : v;
  const out = {};
  let parent = null;
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const indented = /^\s/.test(line);
    const key = line.slice(0, idx).trim();
    if (!key) continue;
    const value = stripQuotes(line.slice(idx + 1).trim());
    if (indented && parent) {
      if (typeof out[parent] !== "object") out[parent] = {};
      out[parent][key] = value;
    } else if (value === "") {
      out[key] = "";
      parent = key;
    } else {
      out[key] = value;
      parent = null;
    }
  }
  return out;
}

// Every .md a file points at, resolved and existing. The contents-list check
// runs over these as well as over shared/, because skill-rules.md governs a
// SKILL.md's reference files, and in another repository those need not sit in
// shared/ at all.
export function referencedMarkdown(file, content) {
  const out = new Set();
  const add = (target) => {
    const clean = target.split("#")[0].trim();
    if (!clean || !clean.endsWith(".md")) return;
    if (/^(https?:\/\/|mailto:)/.test(clean)) return;
    const resolved = path.normalize(path.join(path.dirname(file), clean));
    if (exists(resolved)) out.add(resolved);
  };
  for (const link of content.matchAll(/\[([^\]]*)\]\(([^)]+)\)/g)) add(link[2]);
  for (const tick of content.matchAll(/`(\.{1,2}\/[^`\n]+\.md)`/g)) add(tick[1]);
  return [...out];
}


// Parse every pipe table in a markdown string into {header, rows}. Cells are
// trimmed and the separator row is dropped. A table is a run of consecutive
// lines that begin with a pipe.
export function markdownTables(content) {
  const tables = [];
  let block = [];
  const flush = () => {
    if (block.length >= 2) {
      const split = (l) => l.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map((c) => c.trim());
      const header = split(block[0]);
      const rows = block.slice(1).filter((l) => !/^\s*\|[\s:|-]+\|?\s*$/.test(l)).map(split);
      tables.push({ header, rows });
    }
    block = [];
  };
  for (const line of content.split("\n")) {
    if (/^\s*\|/.test(line)) block.push(line);
    else flush();
  }
  flush();
  return tables;
}

// Markdown files a SKILL.md references that live inside its own directory.
// A pointer at ../../shared/ is a rule file, not a bundled reference.
function bundledReferences(ctx) {
  const dir = path.dirname(ctx.file) + path.sep;
  return referencedMarkdown(ctx.file, ctx.content).filter((f) => f.startsWith(dir));
}

// Ticked checklist lines in the artifact, or in markdown files beside it,
// each with one continuation line folded in. A skill returns its checklist
// with the work, so the record beside the artifact is where it usually sits.
function tickedLines(ctx) {
  const out = [];
  const scan = (file, text) => {
    const lines = text.split("\n");
    lines.forEach((l, i) => {
      if (/^\s*\[x\]/i.test(l)) {
        // Fold every indented continuation line, because one run anchored a
        // tick on its second continuation line and a one-line fold missed it.
        let text = l;
        for (let j = i + 1; j < lines.length && /^\s{2,}\S/.test(lines[j]); j++) text += " " + lines[j];
        out.push({ file, line: i + 1, text });
      }
    });
  };
  const scanDir = (dir) => {
    let names = [];
    try { names = fs.readdirSync(dir); } catch { return; }
    for (const name of names) {
      const f = path.join(dir, name);
      if (f !== ctx.file && name.endsWith(".md") && fs.statSync(f).isFile()) scan(f, fs.readFileSync(f, "utf8"));
    }
  };
  scan(ctx.file, ctx.content);
  if (out.length) return out;
  const dir = path.dirname(ctx.file);
  scanDir(dir);
  // A skill's record sits beside the skill directory rather than inside it, so
  // that it never loads with the skill. Look one level up for a SKILL.md target.
  if (!out.length && path.basename(ctx.file) === "SKILL.md") scanDir(path.dirname(dir));
  return out;
}

// A tick is anchored where something on the line resolves: a command that
// names its target, a path that exists, a heading that exists in a file from
// this run, or a line number. A token alone is not an anchor. The checklist
// template's own wording carries rule-file names and the word section, and
// three rounds of verbatim copies passed the earlier token test.
function headingsUnder(dir, out = new Set(), depth = 0) {
  let names = [];
  try { names = fs.readdirSync(dir); } catch { return out; }
  for (const name of names) {
    const f = path.join(dir, name);
    let st;
    try { st = fs.statSync(f); } catch { continue; }
    if (st.isDirectory()) { if (depth < 3) headingsUnder(f, out, depth + 1); continue; }
    if (!name.endsWith(".md")) continue;
    for (const m of fs.readFileSync(f, "utf8").matchAll(/^#{1,6}\s+(.+?)\s*$/gm)) out.add(m[1].trim().toLowerCase());
  }
  return out;
}
function tickAnchored(text, recordFile, ctx) {
  if (/\bnpm run \S+ -- \S+|\bcd \S+ &&|\bnode \S+\.mjs\b/.test(text)) return true;
  if (/\blines? \d+/.test(text) || /\{\{/.test(text)) return true;
  const bases = [path.dirname(recordFile), path.dirname(ctx.file), path.dirname(path.dirname(ctx.file))];
  for (const m of text.matchAll(/`([^`]+)`|(\/[\w./-]+)|\b((?:[\w-]+\/)*[\w-]+\.(?:md|json|txt|mjs|sql|py|ya?ml))\b/g)) {
    const tok = (m[1] || m[2] || m[3] || "").trim().split(/\s+/)[0];
    if (!tok) continue;
    if (path.isAbsolute(tok)) { if (exists(tok)) return true; continue; }
    if (bases.some((b) => exists(path.normalize(path.join(b, tok))))) return true;
  }
  const heads = headingsUnder(path.dirname(recordFile));
  for (const m of text.matchAll(/##\s*([A-Za-z][\w -]*?)(?=\s*(?:[;,.():]|\bbelow\b|\bline\b|\band\b|$))/g)) {
    if (heads.has(m[1].trim().toLowerCase())) return true;
  }
  return false;
}
function unanchoredTicks(ctx) {
  const out = [];
  for (const { file, line, text } of tickedLines(ctx)) {
    if (!tickAnchored(text, file, ctx)) out.push(`${path.basename(file)}:${line}: ticked with nothing a caller can open or run`);
  }
  return out;
}

// The context every check reads. Build it once per file.
export function fileContext(file, content, { dirName = null, skillDir = null, pluginRoot = null, ours = true } = {}) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const body = match ? content.slice(match[0].length) : content;
  const bodyLines = body.trim()
    ? body.replace(/^\n+/, "").replace(/\n+$/, "").split("\n").length
    : 0;
  return {
    file,
    content,
    dirName,
    skillDir: skillDir ?? path.dirname(file),
    pluginRoot,
    ours,
    frontmatter: match ? match[1] : null,
    fm: parseFrontmatter(content),
    body,
    bodyLines,
  };
}

// --- bundle helpers ---------------------------------------------------------

export function walkFiles(dir, { skipHidden = true } = {}) {
  const out = [];
  const walk = (current) => {
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (skipHidden && entry.name.startsWith(".")) continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile()) out.push(full);
    }
  };
  walk(dir);
  return out;
}

export function bundledScripts(skillDir) {
  return walkFiles(skillDir).filter((f) => SCRIPT_EXTENSIONS.has(path.extname(f)));
}

// Third-party packages a bundled script imports. Relative imports, Node
// builtins and the Python standard library are not packages a skill declares.
export function importedPackages(file) {
  const ext = path.extname(file);
  const text = read(file);
  const found = new Set();
  if (ext === ".py") {
    for (const m of text.matchAll(/^[ \t]*from[ \t]+([A-Za-z_][\w.]*)[ \t]+import\b/gm)) {
      found.add(m[1].split(".")[0]);
    }
    for (const m of text.matchAll(/^[ \t]*import[ \t]+([A-Za-z_][\w.]*(?:[ \t]*,[ \t]*[A-Za-z_][\w.]*)*)/gm)) {
      for (const part of m[1].split(",")) found.add(part.trim().split(".")[0]);
    }
    return [...found].filter((p) => p && !PY_STDLIB.has(p));
  }
  if ([".js", ".mjs", ".cjs", ".ts", ".tsx"].includes(ext)) {
    const add = (spec) => {
      if (!spec || spec.startsWith(".") || spec.startsWith("/")) return;
      if (spec.startsWith("node:")) return;
      const name = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0];
      if (NODE_BUILTINS.has(name)) return;
      found.add(name);
    };
    for (const m of text.matchAll(/\bfrom\s+["']([^"']+)["']/g)) add(m[1]);
    for (const m of text.matchAll(/\bimport\s+["']([^"']+)["']/g)) add(m[1]);
    for (const m of text.matchAll(/\brequire\(\s*["']([^"']+)["']\s*\)/g)) add(m[1]);
    return [...found];
  }
  return [];
}

// Test and evaluation material is deliberately unreachable from SKILL.md, so
// it is not an orphan. skill-rules.md requires exactly that, and an orphan
// check without this exclusion would demand the opposite.
function isTestMaterial(rel) {
  const posix = rel.split(path.sep).join("/");
  if (/(^|\/)(tests?|evals|evaluations)\//.test(posix)) return true;
  return /^eval/.test(path.basename(posix).toLowerCase());
}

// Files a SKILL.md is expected to signpost: everything bundled except itself,
// the packaging files and the test material.
export function bundledCandidates(skillDir, skillFile) {
  return walkFiles(skillDir)
    .filter((f) => f !== skillFile)
    .map((f) => path.relative(skillDir, f))
    .filter((rel) => !PACKAGING_FILES.has(rel) && !isTestMaterial(rel));
}

// Files under the skill directory that SKILL.md, or a file it references, does
// not signpost. A directory mention signposts everything under it, because a
// reader told to open scripts/ can see what is in scripts/.
export function orphanBundledFiles(ctx) {
  const skillDir = ctx.skillDir;
  const signposts = [ctx.content, ...referencedMarkdown(ctx.file, ctx.content).map(read)].join("\n");
  const orphans = [];
  for (const rel of bundledCandidates(skillDir, ctx.file)) {
    const full = path.join(skillDir, rel);
    const base = path.basename(full);
    const ancestors = [];
    let dir = path.dirname(rel);
    while (dir && dir !== ".") {
      ancestors.push(dir);
      dir = path.dirname(dir);
    }
    const named = [rel, base, ...ancestors, ...ancestors.map((d) => `${d}/`)];
    if (!named.some((n) => signposts.includes(n))) orphans.push(rel);
  }
  return orphans;
}

// --- evaluation records -----------------------------------------------------
//
// The shape this repository looks for, stated once so it can be printed:
// an evaluation record is a .json, .yaml, .yml or .md file whose name starts
// with "eval", or any file under an evals/ or evaluations/ directory. A
// scenario is one entry in that record. Each scenario carries skills, query,
// files and expected_behavior.

export function evalRecords(skillDir) {
  return walkFiles(skillDir).filter((f) => {
    const rel = path.relative(skillDir, f);
    const base = path.basename(f).toLowerCase();
    if (/(^|\/)(evals|evaluations)\//.test(rel.split(path.sep).join("/"))) return true;
    return /^eval/.test(base) && /\.(json|ya?ml|md)$/.test(base);
  });
}

// Test records are wider than evaluation records: they include a tests/ tree
// and the usual report filenames, because "tested on every model" is a claim a
// test report carries, not an eval scenario.
//
// A plugin holds one test record for several skills, so the record has to name
// the skill before it counts as evidence about that skill. Without that filter
// any skill in a repository with a tests/ tree inherits another skill's run.
const RECORD_EXTENSIONS = new Set([".md", ".txt", ".json", ".yaml", ".yml", ".sh", ".mjs", ".js", ".py"]);

export function testRecords(skillDir, pluginRoot) {
  const roots = pluginRoot && pluginRoot !== skillDir ? [skillDir, pluginRoot] : [skillDir];
  const out = new Set();
  for (const root of roots) {
    for (const f of evalRecords(root)) out.add(f);
    for (const f of walkFiles(root)) {
      if (!RECORD_EXTENSIONS.has(path.extname(f))) continue;
      const rel = path.relative(root, f).split(path.sep).join("/");
      const base = path.basename(f).toLowerCase();
      if (/^tests?\//.test(rel)) out.add(f);
      else if (/^(testing|test_report|test-report)\.md$/.test(base)) out.add(f);
    }
  }
  return [...out];
}

// The test records that name this skill, with their text. Reading is done once
// and handed back, so the check does not open the same tree twice.
export function testRecordsNaming(ctx) {
  const skill = (typeof ctx.fm.name === "string" && ctx.fm.name) || ctx.dirName || "";
  const out = [];
  for (const file of testRecords(ctx.skillDir, ctx.pluginRoot)) {
    let text;
    try {
      text = read(file);
    } catch {
      continue;
    }
    if (skill && !text.includes(skill)) continue;
    out.push({ file, text });
  }
  return out;
}

function yamlChunks(text) {
  const lines = text.split(/\r?\n/);
  const starts = [];
  let indent = null;
  for (const [n, line] of lines.entries()) {
    const m = line.match(/^(\s*)-\s+\S/);
    if (!m) continue;
    if (indent === null || m[1].length < indent) indent = m[1].length;
    starts.push({ n, indent: m[1].length });
  }
  const outer = starts.filter((s) => s.indent === indent).map((s) => s.n);
  return outer.map((start, i) => lines.slice(start, outer[i + 1] ?? lines.length).join("\n"));
}

function headingChunks(text) {
  const lines = text.split(/\r?\n/);
  const starts = lines
    .map((line, n) => (/^#{2,4}\s+\S/.test(line) ? n : -1))
    .filter((n) => n !== -1);
  return starts.map((start, i) => lines.slice(start, starts[i + 1] ?? lines.length).join("\n"));
}

// Scenarios in one record, each as { label, fields: Set }.
export function evalScenarios(file) {
  const ext = path.extname(file).toLowerCase();
  const text = read(file);
  const fromObject = (obj, label) => ({
    label,
    fields: new Set(Object.keys(obj ?? {}).map((k) => k.toLowerCase())),
  });

  if (ext === ".json") {
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return [];
    }
    const list = Array.isArray(data)
      ? data
      : data.evaluations ?? data.evals ?? data.scenarios ?? [];
    return (Array.isArray(list) ? list : []).map((item, i) => fromObject(item, `#${i + 1}`));
  }

  const blocks = [];
  if (ext === ".md") {
    for (const fence of text.matchAll(/```(?:ya?ml|json)?\r?\n([\s\S]*?)```/g)) blocks.push(fence[1]);
  }
  const source = ext === ".md" && blocks.length ? blocks.join("\n") : text;

  let chunks = yamlChunks(source);
  if (!chunks.length && ext === ".md") chunks = headingChunks(source);
  if (!chunks.length && source.trim()) chunks = [source];

  return chunks.map((chunk, i) => {
    const fields = new Set();
    for (const m of chunk.matchAll(/^\s*(?:-\s*)?\**([A-Za-z_][\w-]*)\**\s*:/gm)) {
      fields.add(m[1].toLowerCase());
    }
    const first = chunk.split(/\r?\n/)[0].trim().replace(/^[-#\s]+/, "");
    return { label: first ? first.slice(0, 40) : `#${i + 1}`, fields };
  }).filter((s) => s.fields.size > 0);
}

// --- the registry -----------------------------------------------------------

export const CHECKS = [
  {
    id: "lint-frontmatter-present",
    scope: "frontmatter",
    severity: "fail",
    source: "current script; deleted linter M1",
    requires: "The file opens with a YAML frontmatter block.",
    run: (ctx) => (ctx.frontmatter === null ? ["no frontmatter block"] : []),
  },
  {
    id: "lint-yaml-colon-space",
    scope: "frontmatter",
    severity: "fail",
    source: "current script, original to this repository",
    requires: 'No unquoted ": " in a frontmatter value, which fails a real YAML parser.',
    applies: (ctx) => (ctx.frontmatter === null ? "the file has no frontmatter block" : null),
    run: (ctx) => {
      const out = [];
      for (const [key, value] of frontmatterScalars(ctx)) {
        if (value.includes(": ")) out.push(`unquoted ": " in ${key} breaks YAML; quote the value`);
      }
      return out;
    },
  },
  {
    id: "lint-yaml-hash",
    scope: "frontmatter",
    severity: "fail",
    source: "current script, original to this repository",
    requires: 'No unquoted " #" in a frontmatter value, which truncates it as a comment.',
    applies: (ctx) => (ctx.frontmatter === null ? "the file has no frontmatter block" : null),
    run: (ctx) => {
      const out = [];
      for (const [key, value] of frontmatterScalars(ctx)) {
        if (value.includes(" #")) out.push(`unquoted "#" in ${key} starts a YAML comment; quote the value`);
      }
      return out;
    },
  },
  {
    id: "lint-name-present",
    scope: "frontmatter",
    severity: "fail",
    source: "current script; deleted linter M1",
    requires: "The frontmatter carries a name.",
    applies: (ctx) => (ctx.frontmatter === null ? "the file has no frontmatter block" : null),
    run: (ctx) => (name(ctx) ? [] : ["frontmatter has no name"]),
  },
  {
    id: "lint-name-length",
    scope: "frontmatter",
    severity: "fail",
    source: "current script; deleted linter M1",
    requires: `The name is ${MAX_NAME} characters or fewer.`,
    applies: (ctx) => (name(ctx) ? null : "the frontmatter has no name"),
    run: (ctx) => {
      const n = name(ctx);
      return n.length > MAX_NAME ? [`name is ${n.length} characters; the limit is ${MAX_NAME}`] : [];
    },
  },
  {
    id: "lint-name-format",
    scope: "frontmatter",
    severity: "fail",
    source: "current script; deleted linter M1",
    requires: "The name is lowercase letters, numbers and single hyphens.",
    applies: (ctx) => (name(ctx) ? null : "the frontmatter has no name"),
    run: (ctx) =>
      NAME_RE.test(name(ctx)) ? [] : ["name must be lowercase letters, numbers, and single hyphens"],
  },
  {
    id: "lint-name-matches-directory",
    scope: "frontmatter",
    severity: "fail",
    source: "current script; deleted linter M3",
    requires: "The name equals the skill directory name.",
    applies: (ctx) => {
      if (!name(ctx)) return "the frontmatter has no name";
      if (!ctx.dirName) return "the file is not a directory-based skill";
      return null;
    },
    run: (ctx) =>
      name(ctx) === ctx.dirName
        ? []
        : [`name "${name(ctx)}" does not match directory "${ctx.dirName}"`],
  },
  {
    id: "m2-name-reserved-words",
    scope: "frontmatter",
    severity: "fail",
    source: "deleted linter M2; Anthropic platform constraint",
    requires: 'The name contains no reserved word ("anthropic", "claude").',
    applies: (ctx) => (name(ctx) ? null : "the frontmatter has no name"),
    run: (ctx) => {
      const n = name(ctx).toLowerCase();
      return RESERVED_WORDS.filter((w) => n.includes(w)).map(
        (w) => `name contains the reserved word "${w}"; the platform may refuse to load the skill`,
      );
    },
  },
  {
    id: "m2-name-not-vague",
    scope: "frontmatter",
    severity: "advisory",
    source: "deleted linter M2",
    requires: 'The name is not a vague or generic word such as "helper", "utils" or "data".',
    applies: (ctx) => (name(ctx) ? null : "the frontmatter has no name"),
    run: (ctx) => {
      const parts = name(ctx).toLowerCase().split("-");
      if (!parts.every((p) => VAGUE_NAMES.has(p))) return [];
      return [`name "${name(ctx)}" names no activity; use a gerund or a noun phrase that states the work`];
    },
  },
  {
    id: "lint-description-present",
    scope: "frontmatter",
    severity: "fail",
    source: "current script; deleted linter M5",
    requires: "The frontmatter carries a description.",
    applies: (ctx) => (ctx.frontmatter === null ? "the file has no frontmatter block" : null),
    run: (ctx) => (description(ctx) ? [] : ["frontmatter has no description"]),
  },
  {
    id: "lint-description-length",
    scope: "frontmatter",
    severity: "fail",
    source: "current script; deleted linter M5",
    requires: `The description is ${MAX_DESCRIPTION} characters or fewer.`,
    applies: (ctx) => (description(ctx) ? null : "the frontmatter has no description"),
    run: (ctx) => {
      const d = description(ctx);
      return d.length > MAX_DESCRIPTION
        ? [`description is ${d.length} characters; the limit is ${MAX_DESCRIPTION}`]
        : [];
    },
  },
  {
    id: "m5-description-no-tags",
    scope: "frontmatter",
    severity: "fail",
    source: "deleted linter M5",
    requires: "The description contains no XML tag.",
    applies: (ctx) => (description(ctx) ? null : "the frontmatter has no description"),
    run: (ctx) => {
      const m = description(ctx).match(TAG_RE);
      return m ? [`description contains the tag "${m[0]}"; write it as plain text`] : [];
    },
  },
  {
    id: "desc-single-field",
    scope: "frontmatter",
    severity: "fail",
    source: "Anthropic best practices",
    requires: "The frontmatter carries exactly one description field.",
    applies: (ctx) => (ctx.frontmatter === null ? "the file has no frontmatter block" : null),
    run: (ctx) => {
      const count = ctx.frontmatter
        .split(/\r?\n/)
        .filter((line) => /^description\s*:/.test(line)).length;
      if (count <= 1) return [];
      return [
        `frontmatter has ${count} description fields; a parser keeps one of them and the rest are lost`,
      ];
    },
  },
  {
    id: "lint-body-length",
    scope: "body",
    severity: "fail",
    source: "current script; deleted linter S1",
    requires: `The body is ${MAX_BODY_LINES} lines or fewer.`,
    run: (ctx) =>
      ctx.bodyLines > MAX_BODY_LINES
        ? [`body is ${ctx.bodyLines} lines; the limit is ${MAX_BODY_LINES}`]
        : [],
  },
  {
    id: "lint-reference-resolves",
    scope: "markdown",
    severity: "fail",
    source: "current script; deleted linter S3",
    requires: "Every local file the text points at exists.",
    run: (ctx) => {
      const out = [];
      for (const link of ctx.content.matchAll(/\[([^\]]*)\]\(([^)]+)\)/g)) {
        const target = link[2].split("#")[0].trim();
        if (!target || /^(https?:\/\/|mailto:)/.test(target)) continue;
        if (!exists(path.normalize(path.join(path.dirname(ctx.file), target)))) {
          out.push(`reference does not resolve: ${link[2]}`);
        }
      }
      // Relative paths in backticks are how these skills name their references.
      for (const tick of ctx.content.matchAll(/`(\.{1,2}\/[^`\n]+\.md)`/g)) {
        if (!exists(path.normalize(path.join(path.dirname(ctx.file), tick[1])))) {
          out.push(`reference does not resolve: ${tick[1]}`);
        }
      }
      return out;
    },
  },
  {
    id: "lint-link-text-matches-filename",
    scope: "markdown",
    severity: "fail",
    source: "current script, original to this repository",
    requires: "Link text that reads as a filename is the filename it links to.",
    run: (ctx) => {
      const out = [];
      for (const link of ctx.content.matchAll(/\[([^\]]*)\]\(([^)]+)\)/g)) {
        const target = link[2].split("#")[0].trim();
        if (!target || /^(https?:\/\/|mailto:)/.test(target)) continue;
        const text = link[1].replace(/`/g, "").trim();
        if (/\.md$/i.test(text) && text !== path.basename(target)) {
          out.push(`link text "${text}" does not match the target filename "${path.basename(target)}"`);
        }
      }
      return out;
    },
  },
  {
    id: "s12-forward-slash-paths",
    scope: "markdown",
    severity: "advisory",
    source: "deleted linter S12",
    requires: "File paths in prose use forward slashes, not backslashes.",
    run: (ctx) => backslashPaths(ctx.content),
  },
  {
    id: "lint-contents-list",
    scope: "markdown",
    severity: "advisory",
    source: "current script; deleted linter S5",
    requires: `A reference file over ${CONTENTS_REQUIRED_LINES} lines opens with a contents list.`,
    // Anthropic scopes this to reference files, which a reader may load
    // partially. A SKILL.md loads whole, so a contents list on it buys nothing.
    // Applied to every long markdown file, it told three single-file skills to
    // put a table of contents on their only page.
    applies: (ctx) => {
      if (path.basename(ctx.file) === "SKILL.md") {
        return "the file is a SKILL.md, which loads whole; this rule covers reference files";
      }
      return ctx.content.split("\n").length <= CONTENTS_REQUIRED_LINES
        ? `the file is ${ctx.content.split("\n").length} lines, at or under the ${CONTENTS_REQUIRED_LINES}-line threshold`
        : null;
    },
    run: (ctx) => {
      const lines = ctx.content.split("\n").length;
      if (CONTENTS_RE.test(ctx.content)) return [];
      return [
        `is ${lines} lines and has no "## Contents" heading; a reference file over ${CONTENTS_REQUIRED_LINES} lines opens with a contents list`,
      ];
    },
  },
  {
    id: "lint-sentence-caps",
    scope: "markdown",
    severity: "advisory",
    // House style, not a published best practice. `npm run lint` runs it over
    // this repository. `npm run audit` leaves it out, because auditing-skills
    // says an audit does not judge writing style, and a command whose findings
    // that skill must discard is worse than no command.
    houseStyle: true,
    source: "current script, original to this repository",
    requires: `A rule cell is ${CAP_INSTRUCTION} words or fewer; a prose sentence is ${CAP_DESCRIPTION} or fewer.`,
    run: (ctx) => {
      let m;
      try {
        m = measure(ctx.file);
      } catch {
        return []; // unreadable here is reported by whatever opened it
      }
      const over = (arr, cap) => arr.filter((n) => n > cap);
      const rules = over(m.rules, CAP_INSTRUCTION);
      const prose = over(m.prose, CAP_DESCRIPTION);
      if (!rules.length && !prose.length) return [];
      const parts = [];
      if (rules.length) parts.push(`${rules.length} rule cell(s) over ${CAP_INSTRUCTION} words, longest ${Math.max(...rules)}`);
      if (prose.length) parts.push(`${prose.length} prose sentence(s) over ${CAP_DESCRIPTION} words, longest ${Math.max(...prose)}`);
      return [parts.join("; ")];
    },
  },
  {
    id: "c5-forward-slash-paths-in-code",
    scope: "bundle",
    severity: "advisory",
    source: "deleted linter C5",
    requires: "Paths inside bundled scripts use forward slashes.",
    applies: (ctx) => (bundledScripts(ctx.skillDir).length ? null : "the skill bundles no scripts"),
    run: (ctx) => {
      const out = [];
      for (const script of bundledScripts(ctx.skillDir)) {
        const rel = path.relative(ctx.skillDir, script);
        for (const msg of backslashPaths(read(script))) out.push(`${rel}: ${msg}`);
      }
      return out;
    },
  },
  {
    id: "c3-packages-listed",
    scope: "bundle",
    severity: "advisory",
    source: "deleted linter C3",
    requires: "Every package a bundled script imports is named in SKILL.md.",
    applies: (ctx) => (bundledScripts(ctx.skillDir).length ? null : "the skill bundles no scripts"),
    run: (ctx) => {
      const out = [];
      const text = ctx.content.toLowerCase();
      for (const script of bundledScripts(ctx.skillDir)) {
        const rel = path.relative(ctx.skillDir, script);
        for (const pkg of importedPackages(script)) {
          if (!text.includes(pkg.toLowerCase())) {
            out.push(`${rel} imports "${pkg}", which SKILL.md never names`);
          }
        }
      }
      return out;
    },
  },
  {
    id: "no-orphan-bundled-files",
    scope: "bundle",
    severity: "advisory",
    source: "Anthropic best practices",
    requires: "Every bundled file is signposted from SKILL.md or from a file it references.",
    applies: (ctx) =>
      bundledCandidates(ctx.skillDir, ctx.file).length
        ? null
        : "the skill bundles no files beside SKILL.md, its packaging files and its test material",
    run: (ctx) =>
      orphanBundledFiles(ctx).map(
        (rel) => `${rel} is in the skill directory and nothing points at it`,
      ),
  },
  {
    id: "three-evaluations",
    scope: "bundle",
    severity: "advisory",
    source: "Anthropic best practices",
    requires: `The skill carries at least ${MIN_EVALUATIONS} evaluation scenarios.`,
    applies: (ctx) =>
      ctx.ours ? null : "the skill is not ours, so its evidence is not available to check here",
    run: (ctx) => {
      const records = evalRecords(ctx.skillDir);
      if (!records.length) {
        return [
          `no evaluation record found under the skill directory; looked for eval*.{json,yaml,yml,md} and anything under evals/ or evaluations/`,
        ];
      }
      const total = records.reduce((n, f) => n + evalScenarios(f).length, 0);
      return total >= MIN_EVALUATIONS
        ? []
        : [`${total} evaluation scenario(s) across ${records.length} record(s); the floor is ${MIN_EVALUATIONS}`];
    },
  },
  {
    id: "eval-structure-fields",
    scope: "bundle",
    severity: "advisory",
    source: "Anthropic best practices",
    requires: `Each evaluation scenario carries ${EVAL_FIELDS.join(", ")}.`,
    applies: (ctx) => (evalRecords(ctx.skillDir).length ? null : "the skill carries no evaluation record"),
    run: (ctx) => {
      const out = [];
      for (const file of evalRecords(ctx.skillDir)) {
        const rel = path.relative(ctx.skillDir, file);
        for (const scenario of evalScenarios(file)) {
          const missing = EVAL_FIELDS.filter((f) => !scenario.fields.has(f));
          if (missing.length) out.push(`${rel}: scenario "${scenario.label}" is missing ${missing.join(", ")}`);
        }
      }
      return out;
    },
  },
  {
    id: "tested-all-models",
    scope: "bundle",
    severity: "advisory",
    source: "Anthropic best practices",
    requires: `The test record names every model the skill runs on: ${MODELS.join(", ")}.`,
    applies: (ctx) => {
      if (!ctx.ours) return "the skill is not ours, so its evidence is not available to check here";
      return testRecordsNaming(ctx).length
        ? null
        : "no test record under the skill or its plugin names this skill";
    },
    run: (ctx) => {
      const records = testRecordsNaming(ctx);
      const text = records.map((r) => r.text).join("\n").toLowerCase();
      const missing = MODELS.filter((m) => !text.includes(m));
      return missing.length
        ? [
            `${records.length} test record(s) name this skill and none names ${missing.join(", ")}; ` +
              "a skill runs on every model unless it says otherwise",
          ]
        : [];
    },
  },

  // ---------------------------------------------------------------------------
  // Prompt scope. A produced prompt or template, the artifact writing-agents
  // delivers. Nothing mechanical read one before 2026-08-21. Each check below
  // names the measured run it answers.
  // ---------------------------------------------------------------------------
  {
    id: "prompt-statuses-table",
    scope: "prompt",
    severity: "fail",
    source: "dispatch-protocol.md Statuses; diet rounds, 2026-08-21",
    requires: "A table lists DONE, DONE_WITH_CONCERNS, BLOCKED and NEEDS_CONTEXT, with a column for what the caller must do.",
    run: (ctx) => {
      const tables = markdownTables(ctx.content);
      const wanted = ["DONE", "DONE_WITH_CONCERNS", "BLOCKED", "NEEDS_CONTEXT"];
      let best = null;
      for (const t of tables) {
        const firsts = t.rows.map((r) => r[0].replace(/`/g, "").trim().toUpperCase());
        const hits = wanted.filter((w) => firsts.includes(w));
        if (!best || hits.length > best.hits.length) best = { t, hits };
      }
      if (!best || best.hits.length === 0) return ["no table lists the four statuses"];
      const out = [];
      const missing = wanted.filter((w) => !best.hits.includes(w));
      if (missing.length) out.push(`status table lacks ${missing.join(", ")}`);
      if (!best.t.header.some((h) => /caller/i.test(h))) {
        out.push("status table has no column naming what the caller must do");
      }
      return out;
    },
  },
  {
    id: "prompt-retry-limit",
    scope: "prompt",
    severity: "fail",
    source: "dispatch-protocol.md invariant 4; diet rounds, 2026-08-21",
    requires: "A retry limit is stated as a number of attempts.",
    run: (ctx) => {
      const t = ctx.content;
      const named = /\b(retry|retries|re-?dispatch|re-?send)\b/i.test(t);
      const counted = /\b(one|two|three|1|2|3)\s+(attempts?|retries|tries)\b/i.test(t)
        || /\b(retry|retries)[^.\n]{0,80}\b(one|two|three|1|2|3)\b/i.test(t)
        || /\bat most (once|twice|one|two|three)\b/i.test(t);
      if (named && counted) return [];
      if (!named) return ["no retry or re-dispatch rule found"];
      return ["a retry rule is present but states no limit as a number of attempts"];
    },
  },
  {
    id: "prompt-findings-path",
    scope: "prompt",
    severity: "fail",
    source: "handoff-rules.md Return; diet rounds, 2026-08-21",
    requires: "The prompt names the file or path the agent writes its findings to.",
    run: (ctx) => {
      const t = ctx.content;
      const ok = /\bfindings?[_ -]?(path|file)\b/i.test(t)
        || /\bfindings?\b[^.\n]{0,60}(\{\{|`[^`]*\.(md|json|txt)`|\.md\b)/i.test(t)
        || /\bwrite\b[^.\n]{0,40}\bfindings?\b[^.\n]{0,40}\b(to|into)\b[^.\n]{0,40}(`|\{\{|\/)/i.test(t);
      return ok ? [] : ["no findings file or path is named"];
    },
  },
  {
    id: "prompt-field-defaults",
    scope: "prompt",
    severity: "fail",
    source: "steering-rules.md Context and diet round two, 2026-08-21: ten bare rows became zero once this was required",
    requires: "In a field table with a Default column, every row's Default cell is non-empty.",
    applies: (ctx) =>
      markdownTables(ctx.content).some((t) => t.header.some((h) => /default/i.test(h)))
        ? null
        : "the prompt has no field table with a Default column",
    run: (ctx) => {
      const out = [];
      for (const t of markdownTables(ctx.content)) {
        const col = t.header.findIndex((h) => /default/i.test(h));
        if (col < 0) continue;
        for (const r of t.rows) {
          const cell = (r[col] ?? "").trim();
          if (!cell) out.push(`row ${r[0].trim() || "(unnamed)"} has an empty Default cell`);
        }
      }
      return out;
    },
  },
  {
    id: "prompt-tick-anchors",
    scope: "prompt",
    severity: "advisory",
    source: "writing-agents checklist rule; diet rounds, 2026-08-21: six unanchored ticks, then two",
    requires: "Every ticked checklist line carries a path, a command, or a section of the delivered artifact.",
    applies: (ctx) => (tickedLines(ctx).length ? null : "no ticked checklist in the artifact or in a markdown file beside it"),
    run: unanchoredTicks,
  },
  {
    id: "skill-tick-anchors",
    scope: "bundle",
    severity: "advisory",
    source: "writing-skills checklist rule; diet round one, 2026-08-21: zero of 26 ticks anchored",
    requires: "Every ticked line in the record beside the skill carries a path, a command, or a section of the delivered SKILL.md.",
    applies: (ctx) => (tickedLines(ctx).length ? null : "no ticked checklist in the skill or in a markdown file beside its directory"),
    run: unanchoredTicks,
  },

  // ---------------------------------------------------------------------------
  // Structure of a produced SKILL.md. Three isolated runs of one task varied on
  // all three of these, and each traced to a rule nobody had made checkable.
  // Advisory, because each rule row is Important rather than Blocking.
  // ---------------------------------------------------------------------------
  {
    id: "skill-section-order",
    scope: "markdown",
    severity: "advisory",
    source: "steering-rules.md section order; determinism structure round, 2026-08-21",
    requires: "Sections that share a name with steering-rules.md appear in that file's order.",
    applies: (ctx) => (path.basename(ctx.file) === "SKILL.md" ? null : "not a SKILL.md"),
    run: (ctx) => {
      const order = ["outcome", "context", "scope", "method", "finish", "failure", "calibration", "composition"];
      const seen = [];
      for (const m of ctx.content.matchAll(/^##\s+(.+?)\s*$/gm)) {
        const i = order.indexOf(m[1].trim().toLowerCase());
        if (i >= 0) seen.push({ name: m[1].trim(), i });
      }
      const out = [];
      for (let k = 1; k < seen.length; k++) {
        if (seen[k].i < seen[k - 1].i) out.push(`"${seen[k].name}" comes after "${seen[k - 1].name}"; steering-rules.md orders it before`);
      }
      return out;
    },
  },
  {
    id: "skill-reference-dir",
    scope: "markdown",
    severity: "advisory",
    source: "skill-rules.md Loading; determinism structure round, 2026-08-21: reference/ and references/ across three runs",
    requires: "Every markdown file a SKILL.md references sits under a directory named reference/.",
    applies: (ctx) => {
      if (path.basename(ctx.file) !== "SKILL.md") return "not a SKILL.md";
      return bundledReferences(ctx).length ? null : "the SKILL.md bundles no reference file of its own";
    },
    run: (ctx) =>
      bundledReferences(ctx)
        .filter((f) => !f.startsWith(path.join(path.dirname(ctx.file), "reference") + path.sep))
        .map((f) => `${path.relative(path.dirname(ctx.file), f)} is not under reference/`),
  },
  {
    id: "skill-no-authoring-history",
    scope: "markdown",
    severity: "advisory",
    source: "skill-rules.md Content; sonnet-exec round two, 2026-08-21: a produced prompt opened with a prior version it could not resolve",
    requires: "The body carries no sentence about a prior version, an earlier round, or what has already failed.",
    run: (ctx) => {
      const out = [];
      // A rule telling an author not to write history mentions history, so
      // match only narrative forms: a heading for it, or a sentence about an
      // earlier version of this very document.
      const re = /(^#+\s+what has already failed)|\b(an? (earlier|prior|previous) (version|draft|round) of (this|the same) (skill|prompt|file|document))\b|\bthis (skill|prompt|file) (once|used to|was (cut|rewritten|reverted))\b/i;
      ctx.body.split("\n").forEach((line, i) => {
        const m = line.match(re);
        if (m) out.push(`line ${i + 1 + (ctx.content.length - ctx.body.length > 0 ? ctx.content.slice(0, ctx.content.length - ctx.body.length).split("\n").length - 1 : 0)}: "${m[0].trim()}"`);
      });
      return out;
    },
  },
];

const BY_ID = new Map(CHECKS.map((c) => [c.id, c]));

export function check(id) {
  const found = BY_ID.get(id);
  if (!found) throw new Error(`no such check: ${id}`);
  return found;
}

// Run one check. Returns { id, severity, status, messages, reason }.
export function runCheck(id, ctx) {
  const c = check(id);
  const reason = c.applies ? c.applies(ctx) : null;
  if (reason) return { id, severity: c.severity, status: "na", messages: [], reason };
  const messages = c.run(ctx);
  return {
    id,
    severity: c.severity,
    status: messages.length ? "fail" : "pass",
    messages,
    reason: null,
  };
}

// Run a named list of checks over one file context, in list order.
export function runChecks(ids, ctx) {
  return ids.map((id) => runCheck(id, ctx));
}

// --- small shared pieces ----------------------------------------------------

function name(ctx) {
  return typeof ctx.fm.name === "string" ? ctx.fm.name : "";
}

function description(ctx) {
  return typeof ctx.fm.description === "string" ? ctx.fm.description : "";
}

// Top-level scalar entries of the frontmatter, as written, before any parsing.
// Quoted values are skipped: quoting is the fix both YAML checks ask for.
function* frontmatterScalars(ctx) {
  for (const line of ctx.frontmatter.split(/\r?\n/)) {
    if (/^\s/.test(line)) continue;
    const m = line.match(/^([A-Za-z0-9_-]+):\s+(.*)$/);
    if (!m) continue;
    const [, key, value] = m;
    if (value.startsWith('"') || value.startsWith("'")) continue;
    yield [key, value];
  }
}

function backslashPaths(text) {
  const seen = new Set();
  for (const m of text.matchAll(BACKSLASH_PATH_RE)) {
    if (!looksLikeWindowsPath(m[0])) continue;
    seen.add(m[0]);
  }
  return [...seen].map((token) => `path "${token}" uses backslashes; write it with forward slashes`);
}
