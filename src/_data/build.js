import { readFileSync } from "node:fs";

const site = JSON.parse(readFileSync(new URL("./site.json", import.meta.url), "utf8"));

// Netlify sets CONTEXT ("production", "deploy-preview", "branch-deploy") and
// URL (the project's primary address). "Live" means a production build served
// on the real domain: before DNS cut-over, production builds on *.netlify.app
// behave like previews (noindex, [TBC] highlighted, no analytics).
export const isLive = () => process.env.CONTEXT === "production" && process.env.URL === site.domain;

export default {
  context: process.env.CONTEXT || "development",
  isProduction: isLive(),
  year: new Date().getFullYear(),
};
