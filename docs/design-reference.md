# Design Reference: Vineyard Dental (vineyarddentalsc.com)

*Analysed 2 Nov 2026 as inspiration for the Ivy House / thanetdentist.com build. This is an input to the Claude Code build brief.*

## 1. What the site does

**Homepage order:**
1. Header: logo, menu, phone number, Virtual Consult, Patient Portal
2. Full-width hero: photo of the two dentists, logo with "Dr Smith & Dr Rackley", H1 "Cosmetic & Family Dentists in Greenville", CTA "Request an appointment"
3. Quick-action bar: Contact · Request appointment · Smile gallery · Social links
4. Before/after gallery, 3 cases, placed straight after the hero
5. Services: 4 categories (Wellness/Family, Cosmetic, Restorative, Special Care), each linking to a category page with 7–8 sub-pages
6. Whole team photo, everyone in black scrubs
7. Clinician profiles: headshot, credentials, bio, "Learn more"
8. Testimonials (initials, labelled "Actual patient"), plus a 5.0★ / 994 reviews badge
9. Contact form (name, email, phone, new/existing patient, message) with a data-security notice
10. Footer: address, phone, navigation, review badge, a notice that stock images are illustrative and before/afters are used with permission, privacy/terms/accessibility links

**Design system:**
- Typography: Ivy Presto Display (light, high-contrast serif) for headings at about 55px; Ivy Epic (light sans) for body text at 16px/300; uppercase buttons with outline style. Both are paid Adobe Fonts.
- Colour: deep navy #081F2C, near-black, white, olive #686F12, muted gold #AFA96E, pale blue #C6DAE7
- Imagery: real clinicians and team (not stock) in uniform black scrubs; stone-wall backdrop; real patient before/afters
- Texture: light patterned background on the content sections

**Tone:** warm, reassuring, family dentistry; the doctors' personalities and credentials are front and centre.

## 2. Adopt

| Element | Why it fits Ivy House |
|---|---|
| Clinician-led hero, with the dentists' names under the logo | Matches the personal positioning and works as more dentists join ("Dr Yusef Ali & team") |
| Before/after proof immediately after the hero | Implants and restorative work are the main selling point; showing results comes before explaining them |
| Problem-based service categories with their own pages | Matches the agreed Maintenance / Repair / Missing teeth structure; each category page targets local searches |
| Individual clinician profiles with credentials | Scales to new associates; the natural place for GDC numbers |
| Whole team in black uniforms | Pulls the brand together. Ivy House staff wear blue; black scrubs with a pink accent would match the site and the stationery |
| Light, high-contrast serif + clean sans | Gives the premium, "Chesterfield / FT" feel Yusef asked for |
| Image and testimonial disclaimer in the footer | A useful model for GDC/CAP compliance |
| Phone number always visible in the header | Phone is the main contact route |

## 3. Avoid

| Element | Why |
|---|---|
| Video-consult pop-up on page load, stacked with the cookie banner and reCAPTCHA | Intrusive and cluttered; conflicts with a boutique positioning |
| Content that only loads on scroll (sections appear blank in a full-page capture) | Risks for search engines, AI crawlers and accessibility. All text must be in the static HTML |
| Heavy patterned background | Adds visual noise and page weight |
| Paid Typekit fonts | Brief requires free Google fonts |
| Navy, olive and gold palette | Ivy House's brand is black with a pink accent |
| 29 treatment sub-pages | Too much for v1. Start with 3 category pages plus a dedicated implants page and add treatment pages after launch |
| Contact form asking for both email and phone, plus a free-text message | Keep it to name, phone, preferred time and new/existing; an optional message with a "no clinical details" note |

## 4. What the site lacks that Ivy House should add

- **Heritage**: Vineyard has no history story. Ivy House's 60 years of family ownership sets it apart, so give it its own homepage band (founder photo, a "Since 19XX" mark once the year is confirmed).
- **"Private, welcoming new patients"** stated plainly at the top of the homepage.
- **Same-day repair message** ("Snapped a tooth? We can often fix it the same day"), which serves the emergency route.
- **CQC rating and GDC numbers** on the page (UK requirement).

## 5. Proposed homepage for Ivy House

1. Header: Ivy House logo · Maintenance · Repair · Missing teeth · About · Contact · phone number · "Request a callback"
2. Hero: photo of Yusef (team later); "Private dentistry in Ramsgate. Family-owned for 60 years." · "Welcoming new patients" · callback button + phone number
3. Before/after strip: 3 implant/restorative cases → gallery
4. "How can we help?": three problem cards (Keep your teeth healthy / Fix a broken tooth or filling / Replace missing teeth)
5. Heritage band: family story, founder photo, independent and not part of a chain
6. Clinicians: Yusef profile; layout ready for associates
7. Testimonials: 3 (long-standing patient, local emergency story, family)
8. Callback form + map, hours, parking/access
9. Footer: address, phone, hours, GDC numbers, CQC rating, complaints, privacy, image/testimonial disclaimer

## 6. Design direction

- **Colour (to confirm against brand files):** black #0E0E0E · ivory #F6F2EC (content backgrounds, warmer than white) · hot pink accent, used sparingly (buttons, rules, hover states) · mid-grey #6B6B6B for secondary text. Don't use a mint/clinical white.
- **Type (free Google fonts):** headings in Cormorant Garamond (light/medium, high contrast, the closest free match to Ivy Presto); body in Jost or Lato at 300–400. If the "angular" font Yusef likes turns out to be Ivy Presto, an Adobe Fonts licence is the alternative. It's apt for an Ivy House, but it adds a recurring cost.
- **Imagery:** real people only, consistent black uniforms, warm interior shots (the period house, the pink front door). Placeholders until the photo shoot.
- **Motion:** none beyond subtle fades; no pop-ups.

---

# Implant section reference: Dawood & Tanner (dawoodandtanner.co.uk)

*Added 3 Nov 2026 with brief v1.1.* Use for the **structure** of the implant cluster only: implants as a top-level menu with sub-pages, a numbered process page with a full FAQ, a distinct "Book an implant consultation" call to action, patient stories grouped by treatment, and (Phase 2) a referral page for dentists.

Don't borrow its claims ("most trusted", "world-class", "specialist-led", unquantified implant numbers), its review widget, video-only stories or its emailed suitability questionnaire. Ivy House goes further than it on prices and FAQs. The full adopt/avoid table is in BRIEF §6A.1.
