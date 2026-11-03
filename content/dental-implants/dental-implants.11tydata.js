// Implant cluster (BRIEF §6A). Pages with `when` (a path into site.json, e.g.
// "implants.services.fullArch") are left out of the build, sitemap and
// navigation when that value is false. See lib/offered.js.
import { isOffered } from "../../lib/offered.js";

export default {
  layout: "layouts/implant.njk",
  eyebrow: "Dental implants",
  callbackTopic: "implants",
  inlineCallback: true,
  medicalPage: true,
  eleventyComputed: {
    permalink: (data) =>
      isOffered(data.site, data.when) ? `${data.page.filePathStem.replace(/\/index$/, "")}/` : false,
  },
};
