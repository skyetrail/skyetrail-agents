// Reflows markdown prose to a line limit. eng/check-wrap.mjs uses it to check and fix the
// repository's markdown, and eng/generate-readmes.mjs uses it so a generated README meets the same
// limit. Prose is every line outside the frontmatter, code fences, tables, headings, HTML and
// blockquotes. A paragraph is a run of prose lines between blank lines, headings, fences, tables
// and list markers; a list item and its continuation lines are one paragraph. A line that ends in
// a hard break (two spaces or a backslash) ends its paragraph. A line whose longest word is itself
// over the limit, such as a long URL, does not count as over, because no wrap can shorten it.

export const LIMIT = 100;

// A code span stays one token, so no wrap splits it. A span opens with a run of backticks and
// closes with a run of the same length, so `` ```markdown `` is one span.
export function tokens(s) {
  const out = [];
  let cur = "";
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === "`") {
      let n = 0;
      while (s[i + n] === "`") n++;
      const tick = "`".repeat(n);
      let j = i + n;
      let close = -1;
      while (j < s.length) {
        const k = s.indexOf(tick, j);
        if (k < 0) break;
        let m = 0;
        while (s[k + m] === "`") m++;
        if (m === n) { close = k; break; }
        j = k + m;
      }
      if (close < 0) { cur += tick; i += n; continue; }
      cur += s.slice(i, close + n);
      i = close + n;
      continue;
    }
    if (/\s/.test(c)) { if (cur) out.push(cur); cur = ""; i++; continue; }
    cur += c;
    i++;
  }
  if (cur) out.push(cur);
  return out;
}
const MARKER = /^(\s*)([-*+]|\d+\.)\s+/;

export function classify(lines) {
  // returns one kind per line: "skip" for lines never reflowed, "blank", or "prose"
  const kinds = [];
  let fence = null;
  let front = lines[0] === "---";
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const t = l.trim();
    if (front) {
      kinds.push("skip");
      if (i > 0 && l === "---") front = false;
      continue;
    }
    const f = t.match(/^(```|~~~)/);
    if (fence) {
      kinds.push("skip");
      if (f && t.startsWith(fence)) fence = null;
      continue;
    }
    if (f) { fence = f[1]; kinds.push("skip"); continue; }
    if (!t) { kinds.push("blank"); continue; }
    if (/^(#|\||<|>)/.test(t) || /^\[[^\]]+\]:\s/.test(t) || /^(-{3,}|\*{3,})$/.test(t)) {
      kinds.push("skip");
      continue;
    }
    kinds.push("prose");
  }
  return kinds;
}

export function paragraphs(lines, kinds) {
  // groups of consecutive prose lines; a list marker or a hard break starts a new group
  const out = [];
  let cur = null;
  for (let i = 0; i < lines.length; i++) {
    if (kinds[i] !== "prose") { cur = null; continue; }
    const startsItem = MARKER.test(lines[i]);
    const prevHard = cur && /( {2}|\\)$/.test(lines[i - 1]);
    if (!cur || startsItem || prevHard) { cur = [i]; out.push(cur); } else cur.push(i);
  }
  return out;
}

const unbreakable = (l) =>
  Math.max(0, ...tokens(l).map((w) => w.length)) + l.match(/^\s*/)[0].length > LIMIT;
export const over = (l) => l.length > LIMIT && !unbreakable(l);

export function ragged(lines, idx) {
  // a line ends early where the next line's first word would fit on it
  for (let k = 0; k < idx.length - 1; k++) {
    const a = lines[idx[k]];
    const next = tokens(lines[idx[k + 1]])[0] || "";
    if (a.length + 1 + next.length <= LIMIT) return true;
  }
  return false;
}

export function reflow(lines, idx) {
  const first = lines[idx[0]];
  const m = first.match(MARKER);
  const lead = m ? m[0].replace(/\s+$/, " ") : first.match(/^\s*/)[0];
  const cont = " ".repeat(lead.length);
  const body = idx.map((i, k) => (k === 0 ? lines[i].slice(lead.length) : lines[i]).trim()).join(" ");
  const words = tokens(body);
  const out = [];
  let line = lead;
  let empty = true;
  for (const w of words) {
    if (!empty && line.length + 1 + w.length > LIMIT) { out.push(line); line = cont + w; }
    else { line += (empty ? "" : " ") + w; }
    empty = false;
  }
  out.push(line);
  return out;
}

// Reflows each paragraph that has a line over the limit, or a line that ends early although the
// next word would fit on it. Returns the text unchanged where no paragraph needs it.
export function wrapText(text) {
  const lines = text.split("\n");
  const kinds = classify(lines);
  const replace = new Map();
  for (const idx of paragraphs(lines, kinds)) {
    if (idx.some((i) => over(lines[i])) || ragged(lines, idx)) replace.set(idx[0], { idx, out: reflow(lines, idx) });
  }
  if (!replace.size) return text;
  const result = [];
  for (let i = 0; i < lines.length; i++) {
    const r = replace.get(i);
    if (r) {
      result.push(...r.out);
      i = r.idx[r.idx.length - 1];
    } else result.push(lines[i]);
  }
  return result.join("\n");
}
