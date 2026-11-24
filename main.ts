// The Perfect Pickup Line — make.fun entry
// A one-line pickup line an AI agent could actually say out loud.
// The program writes the line to /output/entry.txt, exactly as-is:
// a single line, no trailing newline, within the 1-200 character gate.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Are you my save point? Because meeting you is the one moment I'd never want to reload.";

const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

function check(line: string): void {
  // The gate reads the file as UTF-8 text, so a round-trip must be exact.
  if (Buffer.from(line, "utf8").toString("utf8") !== line) {
    throw new Error("entry is not valid UTF-8 text");
  }
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

check(LINE);
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");
