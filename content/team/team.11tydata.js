// Team members: one Markdown file each. Clinicians get a profile page at
// /team/<slug>/; set `profile: false` for a card-only entry (e.g. nurses).
// The principal's name and GDC number come from site.json so there is one source of truth.
export default {
  layout: "layouts/clinician.njk",
  permalink: (data) => (data.profile === false ? false : `/team/${data.page.fileSlug}/`),
  eleventyComputed: {
    name: (data) => (data.principal ? data.site.principal.name : data.name),
    gdc: (data) => (data.principal ? data.site.principal.gdc : data.gdc),
    title: (data) => (data.principal ? data.site.principal.name : data.name),
    description: (data) =>
      data.description || `${data.principal ? data.site.principal.name : data.name}, ${data.role} at Ivy House Dental Practice, Ramsgate.`,
  },
};
