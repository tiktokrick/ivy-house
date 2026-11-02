// Concatenates the hand-written stylesheets into one file, in cascade order,
// so the browser makes a single request without needing a CSS build tool.
import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";

const CSS_DIR = "src/css";
const ORDER = ["fonts.css", "tokens.css", "base.css", "layout.css"];

export function bundleCss() {
  const components = readdirSync(path.join(CSS_DIR, "components"))
    .filter((f) => f.endsWith(".css"))
    .sort()
    .map((f) => path.join("components", f));
  const css = [...ORDER, ...components, "utilities.css"]
    .map((f) => `/* ${f} */\n` + readFileSync(path.join(CSS_DIR, f), "utf8"))
    .join("\n");
  const hash = createHash("sha256").update(css).digest("hex").slice(0, 10);
  return { css, hash, href: `/css/main.${hash}.css` };
}
