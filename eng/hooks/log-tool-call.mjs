#!/usr/bin/env node
// Appends one JSON line per tool call to a log the eval script reads.
// Claude Code calls it as a PostToolUse hook and Copilot CLI as a postToolUse
// hook; each passes its payload on stdin. The line carries a timestamp, the
// agent id where the payload has one, the session id, the tool name and the
// cwd. It never fails the tool call: any error is swallowed.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const copilot = process.argv.includes("--copilot");
let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  try {
    const j = JSON.parse(raw || "{}");
    const line = copilot
      ? { ts: Number(j.timestamp) || Date.now(), harness: "copilot", session_id: j.sessionId ?? null, agent_id: j.agentId ?? null, tool_name: j.toolName ?? null, cwd: j.cwd ?? null }
      : { ts: Date.now(), harness: "claude", session_id: j.session_id ?? null, agent_id: j.agent_id ?? null, tool_name: j.tool_name ?? null, cwd: j.cwd ?? null };
    const file = process.env.EVAL_TOOL_LOG || path.join(os.homedir(), copilot ? ".copilot" : ".claude", "eval-tools.log");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.appendFileSync(file, JSON.stringify(line) + "\n");
  } catch {
    // a logging hook must never block a tool call
  }
});
