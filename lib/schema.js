// JSON-LD builders (BRIEF §8). Values come from site.json; nothing hard-coded.
const DAY_URI = (day) => `https://schema.org/${day}`;

export function dentist(site) {
  const hours = (site.hours || []).filter((h) => h.opens && h.closes && !/closed/i.test(h.opens));
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${site.domain}/#practice`,
    name: site.name,
    url: `${site.domain}/`,
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    isAcceptingNewPatients: site.acceptingNewPatients,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.town,
      addressRegion: site.address.county,
      postalCode: site.address.postcode,
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_URI(h.day),
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: (site.areaServed || []).map((name) => ({ "@type": "Place", name })),
  };
}

export function person(site, clinician, url) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: clinician.name,
    jobTitle: clinician.role,
    url: `${site.domain}${url}`,
    worksFor: { "@id": `${site.domain}/#practice` },
    identifier: clinician.gdc ? { "@type": "PropertyValue", propertyID: "GDC", value: clinician.gdc } : undefined,
    hasCredential: (clinician.qualifications || []).map((q) => ({ "@type": "EducationalOccupationalCredential", name: q })),
  };
}

export function faqPage(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbs(site, crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      item: `${site.domain}${c.url}`,
    })),
  };
}
