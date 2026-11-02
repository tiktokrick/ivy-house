// Runs a build exactly as Netlify's production context does, so the
// production-only checks (no [TBC] left in the output) can be run locally.
import Eleventy from "@11ty/eleventy";

process.env.CONTEXT = "production";
const elev = new Eleventy();
await elev.write();
