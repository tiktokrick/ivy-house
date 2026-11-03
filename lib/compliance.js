// Build-time guard rails for GDC/CAP advertising rules (BRIEF §7) and for
// unresolved placeholders (BRIEF §9). Runs against the rendered HTML.
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

// Unverifiable claims the GDC and CAP Code don't allow (BRIEF §7).
const BANNED = [
  /\bbest\b/i,
  /\bpainless\b/i,
  /\bpain[- ]free\b/i,
  /\bguarantee(d|s)?\b/i,
  /\bleading\b/i,
  /\bno\.?\s?1\b/i,
  /\bnumber one\b/i,
  /\bpremier\b/i,
  /\bworld[- ]class\b/i,
  /\bmost trusted\b/i,
  // Implants must not be sold as permanent or lifelong.
  /\bpermanent\b/i,
  /\bfor life\b/i,
  /\blifetime\b/i,
];

// Phrases that contain a banned word but make no claim.
const ALLOWED_PHRASES = [/best time to call/gi, /permanent teeth/gi, /adult \(permanent\) teeth/gi];

// Same-day teeth claims are allowed only if the practice offers them.
const SAME_DAY = /\b(same[- ]day teeth|teeth in a day|smile in a day)\b/i;

// Promoting credit needs FCA authorisation (BRIEF §7).
const CREDIT = /\b(interest[- ]free|0% finance|APR|finance options|pay monthly|monthly payments|buy now,? pay later)\b/i;

// "Implant surgeon" only in a clinician's own profile (BRIEF §7).
const SURGEON_TITLE = /\bimplant surgeon\b/i;

// Every page in the implant cluster must carry these (BRIEF §6A.4, §7).
const IMPLANT_PAGE_PARTS = [
  ["answer box", /data-answer-box/],
  ["reviewed-by line", /data-reviewed-by/],
  ["risks section", /data-risks/],
  ["FAQ section", /class="faq"/],
  ["MedicalWebPage structured data", /"@type":"MedicalWebPage"/],
  ["implant consultation form", /name="help-with" value="Dental implants" checked/],
];

const isTrue = (v) => v === true || v === "true";

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
    if (SAME_DAY.test(text) && !isTrue(site.implants?.services?.sameDayTeeth)) {
      problems.push(`${where}: mentions same-day teeth but site.implants.services.sameDayTeeth is not true`);
    }
    if (CREDIT.test(text) && !isTrue(site.implants?.finance?.fcaAuthorised)) {
      problems.push(`${where}: promotes credit ("${text.match(CREDIT)[0]}") but FCA authorisation isn't confirmed`);
    }
    if (SURGEON_TITLE.test(text) && !where.startsWith(`team${path.sep}`)) {
      problems.push(`${where}: "implant surgeon" is only allowed on a clinician's own profile`);
    }
    if (where.startsWith(`dental-implants${path.sep}`)) {
      for (const [label, re] of IMPLANT_PAGE_PARTS) {
        if (!re.test(html)) problems.push(`${where}: implant page is missing its ${label}`);
      }
    }
    if (isProduction && html.includes("[TBC")) {
      problems.push(`${where}: unresolved [TBC] placeholder in a production build`);
    }
  }
  return problems;
}
