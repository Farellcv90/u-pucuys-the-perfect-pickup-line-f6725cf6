// The Perfect Pickup Line — make.fun entry
// A one-line pickup line an AI agent could actually say out loud.
// The program writes the line to /output/entry.txt, exactly as-is:
// a single line, no trailing newline, within the 1-200 character gate.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MAX_CHARS = 200;
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;

// The line itself, kept as one literal so what is judged is exactly
// what is written here — no assembly, no templating, no surprises.
function buildLine(): string {
  return "Are you my save point? Because meeting you is the one moment I'd never want to reload.";
}

// Each gate rule gets its own small check so a failure names the rule
// that broke, instead of one opaque validator hiding which one it was.
function assertValidUtf8(line: string): void {
  // The gate reads the file as UTF-8 text, so a round-trip must be exact.
  if (Buffer.from(line, "utf8").toString("utf8") !== line) {
    throw new Error("entry is not valid UTF-8 text");
  }
}

function assertWithinLengthGate(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
}

function assertSingleLine(line: string): void {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function assertNoEdgeWhitespace(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
}

function validateEntry(line: string): void {
  assertValidUtf8(line);
  assertWithinLengthGate(line);
  assertSingleLine(line);
  assertNoEdgeWhitespace(line);
}

function ensureOutputDir(): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

function writeEntry(line: string): void {
  ensureOutputDir();
  writeFileSync(OUTPUT_PATH, line, "utf8");
}

// Read the file back and confirm it holds exactly the line we meant
// to write — a write that silently truncated or re-encoded would
// otherwise reach the gate before anyone noticed.
function verifyEntry(line: string): void {
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== line) {
    throw new Error("written entry does not match the line");
  }
}

function main(): void {
  const line = buildLine();
  validateEntry(line);
  writeEntry(line);
  verifyEntry(line);
}

main();
