import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import path from "node:path";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { bundleCss } from "./lib/css.js";
import { checkOutput } from "./lib/compliance.js";
import * as schema from "./lib/schema.js";
import { isLive } from "./src/_data/build.js";

const isTbc = (v) => typeof v === "string" && v.includes("[TBC");
const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export default function (eleventyConfig) {
  // ---- Static assets -------------------------------------------------------
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts", "src/js": "js", "src/img/static": "img" });
  eleventyConfig.addPassthroughCopy({ "content/admin": "admin" });
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("lib/");

  // One hashed stylesheet, written after each build (see lib/css.js).
  eleventyConfig.addGlobalData("css", () => bundleCss().href);
  eleventyConfig.on("eleventy.after", ({ dir }) => {
    const { css, href } = bundleCss();
    const out = path.join(dir.output, href);
    mkdirSync(path.dirname(out), { recursive: true });
    writeFileSync(out, css);
  });

  // ---- Collections ---------------------------------------------------------
  // Anything showing a patient is published only with recorded consent (BRIEF §7).
  const consented = (items) => items.filter((item) => item.data.consent === true);
  const byOrder = (a, b) => (a.data.order ?? 999) - (b.data.order ?? 999);

  eleventyConfig.addCollection("clinicians", (api) =>
    api.getFilteredByGlob("content/team/*.md").filter((c) => c.data.published !== false).sort(byOrder),
  );
  eleventyConfig.addCollection("gallery", (api) =>
    consented(api.getFilteredByGlob("content/gallery/*.md")).sort(byOrder),
  );
  eleventyConfig.addCollection("testimonials", (api) =>
    consented(api.getFilteredByGlob("content/testimonials/*.md")).sort(byOrder),
  );

  // ---- Filters -------------------------------------------------------------
  // Unconfirmed facts render highlighted so gaps are obvious in review (BRIEF §9).
  eleventyConfig.addFilter("tbc", (value) =>
    isTbc(value) ? `<mark class="tbc">${escapeHtml(value)}</mark>` : escapeHtml(value ?? ""),
  );
  eleventyConfig.addFilter("isTbc", isTbc);
  eleventyConfig.addFilter("telHref", (phone) => (isTbc(phone) || !phone ? "#tbc-phone" : `tel:${phone.replace(/[^\d+]/g, "")}`));
  eleventyConfig.addFilter("absoluteUrl", (url, base) => new URL(url, base).href);
  eleventyConfig.addFilter("jsonLd", (obj) => JSON.stringify(obj).replace(/</g, "\u003c"));
  eleventyConfig.addFilter("byCategory", (items, category) =>
    category ? items.filter((i) => i.data.category === category) : items,
  );
  eleventyConfig.addFilter("head", (items, n) => items.slice(0, n));
  eleventyConfig.addFilter("gdcRegistered", (items) => items.filter((i) => i.data.gdc));
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  // Breadcrumb trail built from URL segments and each page's own title.
  eleventyConfig.addFilter("crumbs", (url, all) => {
    if (typeof url !== "string") return []; // permalink: false entries
    const titleFor = (u) => all.find((p) => p.url === u)?.data.title;
    const parts = url.split("/").filter(Boolean);
    const trail = [{ title: "Home", url: "/" }];
    parts.forEach((_, i) => {
      const u = `/${parts.slice(0, i + 1).join("/")}/`;
      const title = titleFor(u);
      if (title) trail.push({ title, url: u });
    });
    return trail;
  });

  // JSON-LD builders.
  eleventyConfig.addFilter("schemaDentist", (site) => schema.dentist(site));
  eleventyConfig.addFilter("schemaPerson", (clinician, site, url) => schema.person(site, clinician, url));
  eleventyConfig.addFilter("schemaFaq", (faqs) => schema.faqPage(faqs));
  eleventyConfig.addFilter("schemaBreadcrumbs", (crumbs, site) => schema.breadcrumbs(site, crumbs));

  // ---- Images --------------------------------------------------------------
  // Every <img> in the output becomes a responsive <picture> with AVIF/WebP
  // and intrinsic width/height (BRIEF §3). Templates write a plain <img> with
  // alt and sizes; add loading="eager" for above-the-fold images.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp", "jpeg"],
    widths: [480, 800, 1200, 1800],
    failOnError: true,
    htmlOptions: { imgAttributes: { loading: "lazy", decoding: "async" } },
  });

  // ---- Guard rails ---------------------------------------------------------
  eleventyConfig.on("eleventy.after", ({ dir }) => {
    const site = JSON.parse(readFileSync("src/_data/site.json", "utf8"));
    const problems = checkOutput(dir.output, { site, isProduction: isLive() });
    if (problems.length) {
      throw new Error(`Compliance check failed:\n  - ${problems.join("\n  - ")}`);
    }
  });

  eleventyConfig.setServerOptions({ port: 8080 });
}

export const config = {
  templateFormats: ["md", "njk", "11ty.js"],
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  dir: {
    input: "content",
    includes: "../src/_includes",
    data: "../src/_data",
    output: "_site",
  },
};
