# Build Brief: Ivy House Dental Practice website (thanetdentist.com)

*Version 1.0, 2 Nov 2026. Author: Rick Sokl. For use by Claude Code.*
*Read the whole brief before writing code. Anything marked `[TBC]` is a placeholder: never invent a real-world fact to fill it.*

---

## 1. Context

Ivy House is an independent, family-owned **private** dental practice in Ramsgate, Kent. It has been run by the same family for 60 years and is now led by the principal dentist, Dr Yusef Ali. It currently has no website.

The business aims to grow its patient list by about 1,000 patients (+50%) and to bring in additional dentists. The website is the main marketing and lead-generation asset. Outbound campaigns (Google Ads, leaflets, video) will drive traffic to it after launch.

**Positioning:** boutique, personal, long-established, independent (not a chain or investor-owned). Ivy House carries out advanced restorative and implant work as well as routine care. It attracts loyal patients who value continuity and quality, not price shoppers.

**What visitors should think:** *"They've been here for decades, they're good, they'll look after me personally, and they're taking new patients."*

**What visitors should do:** request a callback, or call. There is no online booking.

## 2. Goals and success criteria

| Goal | Measure |
|---|---|
| Be found for local searches | Page 1 on Google for "dentist Ramsgate", "private dentist Thanet", "dental implants Ramsgate" within 6 months; cited by AI search |
| Generate enquiries | Callback form submissions and phone-number taps, tracked as conversions |
| Build trust | Heritage, real clinicians, before/after cases and testimonials visible on the homepage |
| Low running cost | ≤ £15/month hosting and analytics; content editable without a developer |
| Quality | Lighthouse ≥ 95 in all four categories on mobile; WCAG 2.2 AA |

## 3. Technical specification

| Item | Requirement |
|---|---|
| Generator | **Eleventy (11ty)**, static HTML output. No client-side framework |
| Styling | Hand-written CSS with custom properties (design tokens); no Tailwind or UI kits |
| JavaScript | Minimal, progressive enhancement only (mobile nav, gallery lightbox). The site must work fully with JS disabled |
| Content | Markdown/front matter in `/content`; site-wide facts in `/src/_data/site.json` (see §9) |
| CMS | **Decap CMS** at `/admin`, GitHub backend, for editing page copy, team members, testimonials, gallery cases, fees and opening hours. **Verify the current Netlify/Decap authentication method before implementing**; don't rely on deprecated Netlify Identity |
| Repo | GitHub, private, in the practice's (or Rick's agency) organisation |
| Hosting | Netlify, deploying from `main`; deploy previews on PRs |
| Forms | Netlify Forms with a honeypot field (no reCAPTCHA). Notifications to `[TBC practice email]` |
| Analytics | Cookie-free analytics (Plausible or Netlify Analytics), so no cookie banner is needed. Track events: `callback_submit`, `phone_click`, `email_click`, `directions_click` |
| Fonts | Google Fonts, **self-hosted** (woff2, subset, `font-display: swap`). No third-party font requests |
| Images | Responsive `<picture>` with AVIF/WebP, explicit width/height, lazy-loaded below the fold. Use the Eleventy Image plugin |
| Domains | Primary `thanetdentist.com` (apex, www → apex). 301 redirects from `thanetdentist.co.uk` and the other domains `[TBC list]` |
| Security headers | CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy via `netlify.toml` |

**Hard rules:**
- All page text must be in the server-rendered HTML. Nothing that matters may load only on scroll or after JavaScript runs, because search engines and AI crawlers must be able to read it.
- No pop-ups, interstitials, auto-playing media or chat widgets.
- No stock "smiling model" photography presented as patients.

## 4. Sitemap

```
/                               Home
/new-patients/                  Joining the practice (private, what to expect, first visit)
/maintenance/                   Keeping teeth healthy: check-ups, hygiene, children
/repair/                        Broken teeth, lost fillings, crowns, same-day repairs, urgent appointments
/missing-teeth/                 Overview: implants, bridges, dentures
/missing-teeth/dental-implants/ Dedicated implants page (priority SEO page)
/smile-gallery/                 Before/after cases (filterable by category)
/about/                         60-year family history, independence, the house
/team/                          Clinicians and team (scales to multiple dentists)
/team/[slug]/                   Individual clinician profile
/fees/                          Fee guide (indicative "from" prices)
/contact/                       Callback form, phone, map, hours, parking/access
/patient-information/           Compliance hub, linking to:
  /patient-information/complaints/
  /patient-information/privacy/
  /patient-information/accessibility/
  /patient-information/infection-control/   (sterilisation: photo, process)
  /patient-information/cqc-and-gdc/
/thank-you/                     Form confirmation (noindex)
/404.html
```

Set up a `/blog/` collection but leave it unpublished and unlinked for v1.

**Main navigation:** Maintenance · Repair · Missing teeth · Smile gallery · About · Team · Contact. Phone number and a **Request a callback** button always visible in the header. On mobile, a sticky bottom bar with **Call** and **Callback**.

## 5. Design system

Reference: vineyarddentalsc.com, for structure only (clinician-led hero, results straight after the hero, category cards, clinician profiles). Do **not** copy its palette, fonts, pattern background or pop-ups.

**Feel:** "a leather Chesterfield and the *Financial Times*", meaning old-school confidence, not clinical. The look should be **dark, warm and editorial**, not mint-green or white-and-teal. It must not look like a generic, AI-generated dental template.

### Colour tokens (placeholders until brand files arrive)
```css
--ink:        #0E0E0E;  /* primary background for hero/feature bands, body text on light */
--ivory:      #F6F2EC;  /* main content background */
--paper:      #FFFFFF;  /* cards */
--pink:       #E0186C;  /* [TBC from brand files] accent: buttons, rules, links, focus */
--pink-dark:  #B01255;  /* hover/active */
--stone:      #6B6B6B;  /* secondary text */
--line:       #D9D2C7;  /* hairlines */
```
- Pink is an accent, used on ≤ 10% of any screen. Never use pink for body text.
- All text/background pairs must meet WCAG AA contrast. Check pink on ink and on ivory, and adjust the shade if needed.

### Typography
- Headings: **Cormorant Garamond** (500/600), high contrast, generous size (H1 clamp 2.5–4rem).
- Body/UI: **Jost** (300/400/500), 17–18px base, line-height 1.6.
- Buttons and labels: Jost 500, uppercase, letter-spacing 0.06em.
- Keep fonts swappable through tokens, because the client may supply a preferred font.

### Components
Header, mobile nav, hero (image + overlay), CTA button (solid pink / outline), problem card, before/after card (side-by-side with labels and a consent disclaimer), clinician card, testimonial card, heritage band (timeline style), fee table, FAQ accordion (`<details>`), callback form, map embed (click-to-load, to avoid third-party cookies), footer.

### Imagery
Real people and the real building only. Until the photo shoot, use neutral placeholders: solid tone with a label such as `PHOTO: Yusef in surgery`. Don't use stock images. A full-bleed photo of the house exterior (the pink front door) should feature somewhere.

## 6. Page content requirements

Write first-draft copy in **UK English**: plain, warm and confident, in the second person ("you"), with short sentences. Describe the patient's problem and the outcome, not just the procedure. Avoid jargon; where a clinical term is needed, explain it once. Mark all draft copy with `<!-- DRAFT: for Yusef review -->`.

### Home (in this order)
1. **Hero:** photo of Yusef. H1 along the lines of "Private dentistry in Ramsgate. Family-run for 60 years." Sub-line: "Welcoming new patients." CTAs: Request a callback / phone number.
2. **Results strip:** 3 before/after cases (implant / repair / restoration) → Smile gallery.
3. **How can we help?** Three problem cards:
   - *Keep your teeth healthy* → /maintenance/
   - *Fix a broken tooth or lost filling* → /repair/ (mention that many repairs are done the same day)
   - *Replace missing teeth* → /missing-teeth/
4. **Heritage band:** a 60-year family story; founder photo placeholder; independent and not part of a chain; "the same faces, year after year".
5. **Clinicians:** Yusef profile card; grid ready for more dentists.
6. **Testimonials:** 3 placeholders (long-standing patient who travels from abroad; local urgent repair; family).
7. **Callback form + practical info:** hours, address, parking/access.

### Maintenance / Repair / Missing teeth (category pages)
Each page: a problem-led intro; what we do (sub-sections per treatment); what to expect; indicative "from" price with a link to /fees/; 4–6 FAQs (marked up with FAQPage schema); relevant before/afters; CTA.

### Dental implants (priority page)
What implants are; who they suit; step-by-step process; timeline; alternatives (bridges, dentures); indicative cost; aftercare; FAQs; before/after cases; Yusef's implant experience `[TBC]`; strong CTA. Target 1,200–1,800 words.

### Team / clinician profile
Name, role, GDC number, qualifications, approach and interests, photo. The data model must support several clinicians and a sort order.

### Fees
A table of "from" prices by category `[TBC figures]`, a note on payment options `[TBC]`, and a statement that a written treatment plan and estimate are given before treatment.

### Contact
Callback form, `tel:` link, address, opening hours, click-to-load map, parking and access information `[TBC]`.

### Callback form
Fields: Name*, Phone*, Best time to call (morning / afternoon / any), New or existing patient, Message (optional) with the hint "Please don't include medical details." Add a consent checkbox linking to the privacy notice. On success, go to `/thank-you/`, which repeats the phone number for urgent issues.

## 7. Compliance (UK): build these in, don't bolt them on

- **GDC:** show every clinician's GDC number on their profile and in the footer. **Do not use the word "specialist"** anywhere until confirmed (`site.json → principal.specialistList`). If it's false, use "advanced restorative and implant dentistry" or "special interest in…".
- **No unverifiable claims:** no "best", "painless", "guaranteed", "leading" or "No.1".
- **CQC:** show the current rating with a link to the CQC report in the footer and on /patient-information/cqc-and-gdc/. Use the official CQC widget if available.
- **Before/after and testimonials:** each case and testimonial has a `consent: true` field; the build **excludes** any item without it. Add a footer disclaimer: "Treatment results vary. All before-and-after images and testimonials are of real patients and are used with their written consent."
- **Fees:** clear, indicative and not misleading.
- **Complaints, privacy notice (UK GDPR), accessibility statement:** template pages `[TBC content from practice]`.
- **Forms:** collect the minimum data; send by HTTPS only; don't send health data by email.

## 8. SEO and AI search

- Unique `<title>` (≤ 60 chars) and meta description (≤ 155) per page, with a locality term on core pages.
- JSON-LD: `Dentist` (LocalBusiness) with name, address, geo, phone, opening hours, `priceRange`, `areaServed` (Ramsgate, Broadstairs, Margate, Thanet); `Person` for clinicians; `FAQPage` on category pages; `BreadcrumbList`.
- One H1 per page; logical heading hierarchy; descriptive alt text.
- `sitemap.xml`, `robots.txt`, canonical URLs, Open Graph tags and image.
- Add `/llms.txt` summarising the practice, services and contact details.
- Make the answers AI search will look for quotable in short, clear sentences: who we are, where we are, whether we take new patients, what implants cost, what to do if you break a tooth.
- Keyword targets: dentist Ramsgate · private dentist Ramsgate · dentist Thanet · dental implants Ramsgate / Thanet · emergency dentist Ramsgate · broken tooth repair Ramsgate · dentures Ramsgate · new patients dentist Ramsgate.

## 9. Site data (`src/_data/site.json`)

```json
{
  "name": "Ivy House Dental Practice",
  "domain": "https://thanetdentist.com",
  "tagline": "Private dentistry in Ramsgate. Family-run for 60 years.",
  "foundedYear": "[TBC]",
  "yearsLabel": "60 years",
  "acceptingNewPatients": true,
  "nhs": false,
  "address": { "street": "[TBC]", "town": "Ramsgate", "county": "Kent", "postcode": "[TBC]" },
  "geo": { "lat": "[TBC]", "lng": "[TBC]" },
  "phone": "[TBC]",
  "email": "[TBC]@thanetdentist.com",
  "hours": "[TBC]",
  "cqc": { "rating": "[TBC]", "url": "[TBC]", "locationId": "[TBC]" },
  "principal": { "name": "Dr Yusef Ali", "gdc": "[TBC]", "specialistList": "[TBC]" },
  "parking": "[TBC]",
  "social": {}
}
```
All templates read from this file, and nothing is hard-coded. During the build, any value still `[TBC]` should render visibly (highlighted) so gaps are obvious in review.

## 10. Delivery phases

| Phase | Output | Target |
|---|---|---|
| 1. Scaffold | Repo, Eleventy, tokens, layouts, components, `site.json`, Netlify deploy preview | 6 Nov |
| 2. v1 build | All pages with draft copy and placeholders; form; schema; CMS | 9 Nov (review meeting w/c 9 Nov) |
| 3. Content | Yusef's copy edits; real facts; brand colours and logo | 20 Nov |
| 4. Compliance & QA | Compliance review; Lighthouse; axe accessibility audit; cross-browser and mobile; form delivery test; redirect test | 27 Nov |
| 5. Launch | DNS cut-over; analytics live; submit sitemap to Google Search Console and Bing; update the Google Business Profile URL | 30 Nov |
| 6. v1.1 | Real photography, before/after gallery, testimonials | Jan 2027 |

**Definition of done for v1:**
- [ ] All pages build with no errors or broken links
- [ ] Lighthouse mobile ≥ 95 in all four categories on Home, Implants and Contact
- [ ] No axe violations at WCAG 2.2 AA
- [ ] Form submits, notifies by email and fires the analytics event
- [ ] Every `[TBC]` resolved or knowingly accepted
- [ ] No "specialist", superlatives or unconsented images or testimonials
- [ ] All domains redirect to `https://thanetdentist.com` with 301s
- [ ] A non-technical user can edit a page, add a team member and add a gallery case through `/admin`

## 11. Open questions (owner: Rick, to resolve with the practice)

1. Is Yusef on a GDC specialist list? This decides the wording across the site.
2. Who owns ongoing edits, and do they need CMS training?
3. Practice email address on the domain, and where callback notifications go.
4. Brand files: logo (SVG), exact pink, Yusef's preferred font.
5. Facts: founding year, address, hours, phone, fee guide, CQC rating, GDC numbers, parking.
6. Which redirect domains have been purchased.

## 12. Working instructions for Claude Code

- Start by proposing the file structure and component list. Wait for approval before building pages.
- Commit in small, descriptive steps. Open PRs for review so Netlify deploy previews can be shared with the practice.
- Ask, don't assume, on any fact about the practice.
- Keep dependencies minimal and pinned. Document setup, CMS use and deployment in `README.md`.
