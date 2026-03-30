/**
 * Writes amplify_outputs.json for CI (e.g. Vercel) from AMPLIFY_OUTPUTS_JSON_B64.
 *
 * Generate (from frontend/, one line for Vercel):
 *   node -p "require('fs').readFileSync('amplify_outputs.json','base64')"
 */
import { existsSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = resolve(root, "amplify_outputs.json");

function parseDecodedJson(utf8) {
  const trimmed = utf8.trim();
  if (!trimmed) throw new Error("empty decoded payload");

  let parsed = JSON.parse(trimmed);
  if (typeof parsed === "string") {
    parsed = JSON.parse(parsed);
  }
  return parsed;
}

const b64 = process.env.AMPLIFY_OUTPUTS_JSON_B64?.trim();

if (!b64) {
  if (existsSync(outPath)) {
    process.exit(0);
  }
  console.error(
    "write-amplify-outputs: set AMPLIFY_OUTPUTS_JSON_B64 or add amplify_outputs.json (e.g. from ampx deploy).",
  );
  process.exit(1);
}

try {
  const utf8 = Buffer.from(b64, "base64").toString("utf8");
  const data = parseDecodedJson(utf8);
  writeFileSync(outPath, JSON.stringify(data, null, 2), "utf8");
} catch (e) {
  console.error("write-amplify-outputs: invalid base64 or JSON:", e.message);
  process.exit(1);
}
