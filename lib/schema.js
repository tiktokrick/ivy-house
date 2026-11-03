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
    // Implants are the priority treatment (BRIEF §8): offered with a from-price.
    makesOffer: site.implants
      ? [
          {
            "@type": "Offer",
            itemOffered: { "@type": "MedicalProcedure", name: "Dental implant (single tooth, including crown)", url: `${site.domain}/dental-implants/` },
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "GBP",
              minPrice: site.implants.fromPriceSingle,
            },
          },
        ]
      : undefined,
  };
}

// Implant pages (BRIEF §8): a clinically reviewed page about the procedure.
export function medicalWebPage(site, data, url) {
  const procedure = data.procedure || {};
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    url: `${site.domain}${url}`,
    name: data.metaTitle || data.title,
    description: data.description,
    lastReviewed: data.lastReviewed,
    reviewedBy: {
      "@type": "Person",
      name: site.principal.name,
      identifier: { "@type": "PropertyValue", propertyID: "GDC", value: site.principal.gdc },
      url: `${site.domain}/team/yusef-ali/`,
    },
    publisher: { "@id": `${site.domain}/#practice` },
    about: {
      "@type": "MedicalProcedure",
      name: procedure.name || "Dental implant placement",
      procedureType: "https://schema.org/SurgicalProcedure",
      bodyLocation: procedure.bodyLocation || "Jaw bone",
      preparation: procedure.preparation,
      howPerformed: procedure.howPerformed,
      followup: procedure.followup,
    },
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
