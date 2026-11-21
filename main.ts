import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const text =
  "Light left a star before there were roads, before there were names for anything, and it is still travelling. Tonight a little of it reaches your window, tired and unhurried, and rests there a while.\n";

// The gate requires 1–280 Unicode code points, not only whitespace.
const length = [...text].length;
if (length < 1 || length > 280 || text.trim().length === 0) {
  throw new Error(`entry text must be 1-280 characters, got ${length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");

// Read back and verify the written file matches the text exactly.
if (readFileSync(outPath, "utf8") !== text) {
  throw new Error("written entry.txt does not match the entry text");
}
