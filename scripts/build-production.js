// Runs a build exactly as the live site's Netlify production build does, so the
// live-only checks (no [TBC] left in the output) can be run locally.
import { readFileSync } from "node:fs";
import Eleventy from "@11ty/eleventy";

const site = JSON.parse(readFileSync(new URL("../src/_data/site.json", import.meta.url), "utf8"));
process.env.CONTEXT = "production";
process.env.URL = site.domain;
const elev = new Eleventy();
await elev.write();
