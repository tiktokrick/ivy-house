// Build-time guard rails for GDC/CAP advertising rules (BRIEF §7) and for
// unresolved placeholders (BRIEF §9). Runs against the rendered HTML.
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

// Unverifiable claims the GDC and CAP Code don't allow.
const BANNED = [/\bbest\b/i, /\bpainless\b/i, /\bguarantee(d|s)?\b/i, /\bleading\b/i, /\bno\.?\s?1\b/i, /\bnumber one\b/i];

// Phrases that contain a banned word but make no claim.
const ALLOWED_PHRASES = [/best time to call/gi];

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return name === "admin" ? [] : htmlFiles(full);
    return full.endsWith(".html") ? [full] : [];
  });
}

// Visible text plus JSON-LD; comments and executable scripts are skipped.
function readableText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script(?![^>]*application\/ld\+json)[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ");
}

export function checkOutput(outputDir, { site, isProduction }) {
  const problems = [];
  // The CMS stores this as a string; hand edits may use a boolean.
  const specialistAllowed = String(site.principal?.specialistList) === "true";

  for (const file of htmlFiles(outputDir)) {
    const html = readFileSync(file, "utf8");
    let text = readableText(html);
    for (const ok of ALLOWED_PHRASES) text = text.replace(ok, " ");
    const where = path.relative(outputDir, file);

    if (!specialistAllowed && /specialist/i.test(text)) {
      problems.push(`${where}: uses "specialist" but site.principal.specialistList is not true`);
    }
    for (const re of BANNED) {
      const m = text.match(re);
      if (m) problems.push(`${where}: unverifiable claim "${m[0]}"`);
    }
    if (isProduction && html.includes("[TBC")) {
      problems.push(`${where}: unresolved [TBC] placeholder in a production build`);
    }
  }
  return problems;
}
