// Clinician profiles: one Markdown file each, published at /team/<slug>/.
// The principal's name and GDC number come from site.json so there is one source of truth.
export default {
  layout: "layouts/clinician.njk",
  permalink: "/team/{{ page.fileSlug }}/",
  eleventyComputed: {
    name: (data) => (data.principal ? data.site.principal.name : data.name),
    gdc: (data) => (data.principal ? data.site.principal.gdc : data.gdc),
    title: (data) => (data.principal ? data.site.principal.name : data.name),
    description: (data) =>
      data.description || `${data.principal ? data.site.principal.name : data.name}, ${data.role} at Ivy House Dental Practice, Ramsgate.`,
  },
};
