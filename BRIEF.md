# Build Brief: Ivy House Dental Practice website (thanetdentist.com)

*Version 1.3, 3 Nov 2026. Author: Rick Sokl. For use by Claude Code.*
*Read the whole brief before writing code. Anything marked `[TBC]` is a placeholder: never invent a real-world fact to fill it.*

**Change log**
- v1.3 (3 Nov 2026): The practice has seen middle-aged patients bring in elderly parents and manage payment, transport and treatment-plan discussions. The adult child is treated as the buyer: older-patients page restructured around their tasks; callback form adds "booking for someone else"; site data and open questions extended. Changes affect §1, §6, §7, §9, §11.
- v1.2 (3 Nov 2026): Yusef's feedback. "Maintenance" renamed **Family dentistry** (check-ups for you, your children and your parents) with a three-generation image; new **care for older patients** section (including dementia, with the adult child as decision-maker); homepage card 03 broadened to **Replace or improve your teeth** with a new **/cosmetic-dentistry/** page; implants voiced in the first person by Yusef as the dentist who places them. Navigation regrouped under a Treatments dropdown. Changes affect §1, §4, §5, §6, §6A.2, §7, §8, §9, §11.
- v1.1 (3 Nov 2026): Dental implants promoted from a sub-page to a top-level hub with its own cluster of pages, a homepage band, a navigation slot, a dedicated AEO/SEO plan and extra compliance rules. Structural reference added: Dawood & Tanner (dawoodandtanner.co.uk). Changes affect §2, §4, §5, §6, §6A (new), §7, §8, §9, §10, §11.
- v1.0 (2 Nov 2026): First issue.

---

## 1. Context

Ivy House is an independent, family-owned **private** dental practice in Ramsgate, Kent. It has been run by the same family for 60 years and is now led by the principal dentist, Dr Yusef Ali. It currently has no website.

The business aims to grow its patient list by about 1,000 patients (+50%) and to bring in additional dentists. The website is the main marketing and lead-generation asset. Outbound campaigns (Google Ads, leaflets, video) will drive traffic to it after launch.

**Positioning:** boutique, personal, long-established, independent (not a chain or investor-owned). Ivy House carries out advanced restorative and implant work as well as routine care. It attracts loyal patients who value continuity and quality, not price shoppers.

**The personal, three-generation angle:** many visitors are choosing a dentist for more than one person: themselves, their children and an ageing parent, sometimes one living with dementia. The adult child is often the decision-maker for all three. The site must show that Ivy House understands this: patience, longer appointments, carers welcome, the same faces each visit. One decision-maker can bring three patients, which matters for the 1,000-patient target.

**Observed at the practice:** middle-aged patients bring elderly parents in for treatment and manage payment, transport and treatment-plan discussions. So the adult child (roughly 45–65) is the buyer and the parent is the patient. Copy on the older-patients content speaks to the adult child first. Older parents are also the group most likely to need dentures, failing bridges or implant-retained dentures, so this route feeds the implant pipeline.

**Commercial priority:** implant surgery is the highest-value treatment and the main reason to invest in search. The site should make Ivy House *the* answer for implants in Thanet, while routine care remains the route for most new patients.

**What visitors should think:** *"They've been here for decades, they're good, they'll look after me personally, and they're taking new patients."* For implant visitors: *"They do this properly, they're open about cost and risk, and I'd be in the hands of the same dentist throughout."*

**What visitors should do:** request a callback, or call. There is no online booking. Implant visitors request an **implant consultation callback**.

## 2. Goals and success criteria

| Goal | Measure |
|---|---|
| Be found for local searches | Page 1 on Google for "dentist Ramsgate", "private dentist Thanet", "dental implants Ramsgate" within 6 months; cited by AI search |
| Own implant search in Thanet | Top 3 on Google for "dental implants Ramsgate" and "dental implants Thanet"; page 1 for "dental implants Margate/Broadstairs" and "dental implant cost Kent" within 6–9 months; Ivy House named in AI answers to "where can I get dental implants in Thanet?" and "how much do dental implants cost in Ramsgate?" |
| Generate enquiries | Callback form submissions and phone-number taps, tracked as conversions; **implant enquiries tracked separately** |
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
| CMS | **Decap CMS** at `/admin`, GitHub backend, for editing page copy, team members, testimonials, gallery cases, fees, implant FAQs and opening hours. **Verify the current Netlify/Decap authentication method before implementing**; don't rely on deprecated Netlify Identity |
| Repo | GitHub, private, in the practice's (or Rick's agency) organisation |
| Hosting | Netlify, deploying from `main`; deploy previews on PRs |
| Forms | Netlify Forms with a honeypot field (no reCAPTCHA). Notifications to `[TBC practice email]` |
| Analytics | Cookie-free analytics (Plausible or Netlify Analytics), so no cookie banner is needed. Track events: `callback_submit`, `implant_callback_submit`, `family_callback_submit`, `phone_click`, `email_click`, `directions_click`, `fees_view_implants` |
| Fonts | Google Fonts, **self-hosted** (woff2, subset, `font-display: swap`). No third-party font requests |
| Images | Responsive `<picture>` with AVIF/WebP, explicit width/height, lazy-loaded below the fold. Use the Eleventy Image plugin |
| Domains | Primary `thanetdentist.com` (apex, www → apex). 301 redirects from `thanetdentist.co.uk` and the other domains `[TBC list]` |
| Security headers | CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy via `netlify.toml` |

**Hard rules:**
- All page text must be in the server-rendered HTML. Nothing that matters may load only on scroll or after JavaScript runs, because search engines and AI crawlers must be able to read it.
- No pop-ups, interstitials, auto-playing media or chat widgets.
- No stock "smiling model" photography presented as patients.
- No third-party review widgets that inject content with JavaScript. Testimonials and review excerpts are stored as content and rendered statically.

## 4. Sitemap

```
/                                   Home
/new-patients/                      Joining the practice (private, what to expect, first visit)
/dental-implants/                   IMPLANT HUB (priority SEO/AEO page)
  /dental-implants/process/         Step-by-step: consultation → planning → surgery → healing → final tooth → aftercare
  /dental-implants/cost/            Implant fees explained, what's included, payment options
  /dental-implants/single-tooth/    Replacing one tooth (and 2–3 teeth)
  /dental-implants/multiple-teeth/  Implant bridges and implant-retained dentures   [only if offered — TBC]
  /dental-implants/full-arch/       Full-arch fixed teeth                            [only if offered — TBC]
  /dental-implants/am-i-suitable/   Suitability: bone, gum health, smoking, medical history; what if you've been told "no"
  /dental-implants/patient-stories/ Implant cases and stories (built, unpublished until consented cases exist)
/family-dentistry/                  Check-ups and hygiene for you, your children and your parents (was /maintenance/)
  /family-dentistry/older-patients/ Care for older patients, including dementia; advice for adult children and carers
/repair/                            Broken teeth, lost fillings, crowns, same-day repairs, urgent appointments
/missing-teeth/                     Options compared: implants vs bridges vs dentures (implants first; links into the implant hub)
/cosmetic-dentistry/                Improving your smile: [TBC: whitening, bonding, veneers, crowns, straightening — only what's offered]
/smile-gallery/                     Before/after cases (filterable by category; implants first)
/about/                             60-year family history, independence, the house
/team/                              Clinicians and team (scales to multiple dentists)
/team/[slug]/                       Individual clinician profile
/fees/                              Fee guide (indicative "from" prices; implants section links to /dental-implants/cost/)
/contact/                           Callback form, phone, map, hours, parking/access
/patient-information/               Compliance hub, linking to:
  /patient-information/complaints/
  /patient-information/privacy/
  /patient-information/accessibility/
  /patient-information/infection-control/   (sterilisation: photo, process)
  /patient-information/cqc-and-gdc/
/thank-you/                         Form confirmation (noindex)
/404.html
```

Set up a `/blog/` collection but leave it unpublished and unlinked for v1. Set up a `/for-dentists/` referral page template but leave it unpublished (Phase 2, see §6A.7).

**Rule for the implant cluster:** only publish a sub-page for a treatment Ivy House actually provides. Pages marked "only if offered" are generated from `site.json → implants.services` and are excluded from the build, sitemap and navigation when their flag is `false`.

**Main navigation:** **Dental implants** (dropdown: Overview · Process · Cost · Single tooth · [Multiple teeth] · [Full arch] · Am I suitable? · Patient stories) · **Treatments** (dropdown: Family dentistry · Older patients · Repairs · Missing teeth · Cosmetic dentistry) · Smile gallery · About · Team · Fees · Contact. Phone number and a **Request a callback** button always visible in the header. On mobile, a sticky bottom bar with **Call** and **Callback**; on implant pages the callback button reads **Implant consultation**.

The dropdown must be built as a plain list of links that works without JS (`<details>` or CSS `:focus-within`), so crawlers and keyboard users reach every implant page.

## 5. Design system

**Structural references (structure only, not look or claims):**
- **vineyarddentalsc.com:** clinician-led hero, results straight after the hero, category cards, clinician profiles.
- **dawoodandtanner.co.uk:** the implant section. Adopt and avoid as set out in §6A.1.

Do **not** copy either site's palette, fonts, pattern background, pop-ups, wording or claims.

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
Header, mobile nav (with implant dropdown), hero (image + overlay), CTA button (solid pink / outline), problem card, before/after card (side-by-side with labels and a consent disclaimer), clinician card, testimonial card, heritage band (timeline style), fee table, FAQ accordion (`<details>`), callback form, map embed (click-to-load, to avoid third-party cookies), footer.

**New for implants:**
- **Implant band** (homepage feature band on `--ink`).
- **Answer box**: a short, boxed direct answer at the top of each implant page and under each question heading (see §6A.4).
- **Process stepper**: numbered steps with duration and number of visits per step; plain HTML ordered list, styled.
- **Options comparison table**: implants vs bridge vs denture (cost range, lifespan, visits, pros, cons).
- **Implant cost table**: what's included, from-price, notes.
- **Self-check list**: static suitability checklist (no form, no data captured; see §6A.6).
- **Reviewed-by line**: "Clinically reviewed by Dr Yusef Ali, GDC [number], [date]" on every implant page.
- **Story card**: patient first name or initials, treatment type, short quote, before/after pair, optional video (click-to-load).

### Imagery
Real people and the real building only. Until the photo shoot, use neutral placeholders: solid tone with a label such as `PHOTO: Yusef in surgery`. Don't use stock images. A full-bleed photo of the house exterior (the pink front door) should feature somewhere. **Family imagery (priority for the photo shoot):** (1) three generations together (grandparent, parent, child) for the Family dentistry card and page; (2) an older parent with an adult son or daughter, warm and unhurried, for the older-patients section. Use consenting real people (a patient family, or staff and their relatives), not stock. Don't caption or imply that anyone pictured has dementia (see §7). For implants, plan for: Yusef planning a case on screen, the surgery set-up, any in-house scanner or imaging equipment `[TBC]`, and consented before/after pairs. Do not use 3D "implant cross-section" stock renders; a simple self-drawn SVG diagram of implant, abutment and crown is acceptable.

## 6. Page content requirements

Write first-draft copy in **UK English**: plain, warm and confident, in the second person ("you"), with short sentences. Describe the patient's problem and the outcome, not just the procedure. Avoid jargon; where a clinical term is needed, explain it once. Mark all draft copy with `<!-- DRAFT: for Yusef review -->`.

### Home (in this order)
1. **Hero:** photo of Yusef. H1 along the lines of "Private dentistry in Ramsgate. Family-run for 60 years." Sub-line: "Welcoming new patients." CTAs: Request a callback / phone number.
2. **Results strip:** 3 before/after cases (implant / repair / restoration) → Smile gallery.
3. **How can we help?** Three numbered problem cards:
   - *01 Check-ups for the whole family*: "Regular check-ups for you, your children and your parents." Three-generation image. → /family-dentistry/
   - *02 Fix a broken tooth or lost filling* → /repair/ (mention that many repairs are done the same day)
   - *03 Replace or improve your teeth*: "Replace missing teeth, update old work or improve your smile." Two links inside the card: Dental implants → /dental-implants/ · Improve your smile → /cosmetic-dentistry/
4. **Implant band:** dark feature band, in Yusef's voice, with his photo. Heading along the lines of "I'm Yusef, and I place every implant myself." `[TBC: confirm]` Three short points (the same dentist from consultation to final tooth; clear, written costs before you start; an indicative "from" price). Links: How it works → /process/ · Costs → /cost/ · Am I suitable? → /am-i-suitable/. CTA: Book an implant consultation.
5. **Older patients band (new):** short band on ivory with the older-parent-and-adult-child photo. Heading along the lines of "Looking after a parent's teeth?" Two or three sentences on patience, longer appointments, carers welcome in the surgery and the same dentist each visit. → /family-dentistry/older-patients/
6. **Heritage band:** a 60-year family story; founder photo placeholder; independent and not part of a chain; "the same faces, year after year".
7. **Clinicians:** Yusef profile card; grid ready for more dentists.
8. **Testimonials:** 3 placeholders (long-standing patient who travels from abroad; local urgent repair; implant patient). Add a fourth slot for a family or adult-child testimonial when available.
9. **Callback form + practical info:** hours, address, parking/access (including step-free access `[TBC]`).

### Family dentistry (was Maintenance)
Header: "Check-ups for you, your children and your parents." Three-generation hero image. Sections: check-ups and hygiene; children (first visit, age to start `[TBC]`); older patients (summary → sub-page); booking family members together `[TBC: if offered]`; from-prices; 4–6 FAQs; CTA.

### Older patients (/family-dentistry/older-patients/)
Written **for the adult child arranging care for a parent**. H1 along the lines of "Bringing your mum or dad to the dentist". Order the page by the jobs they're doing:
1. **Answer box:** yes, you can book for a parent, come into the appointment, take part in treatment discussions (with your parent's agreement) and pay on their behalf.
2. **Booking for a parent:** how to arrange it by callback or phone; booking both of you on the same visit `[TBC]`; quieter appointment times `[TBC]`.
3. **Getting here:** parking and drop-off right outside or nearby `[TBC]`, step-free access `[TBC]`, waiting area for you, how long to allow.
4. **During the appointment:** you're welcome in the surgery; longer appointments `[TBC]`; the same dentist each time; how the team adapts for dementia `[TBC]`.
5. **Treatment plans and decisions:** written plan and costs you can talk through together; you can join the discussion if your parent agrees; if your parent can't make the decision themselves, how a **health and welfare** lasting power of attorney works, and that a property and financial affairs LPA alone doesn't cover treatment decisions. Factual, no legal advice.
6. **Paying on a parent's behalf:** you can settle bills for a parent; written estimates before treatment; payment options `[TBC]`.
7. **Keeping you in the loop:** with your parent's permission, reminders and plan updates can go to you as well `[TBC: confirm the practice can do this]`.
8. **Common treatments for older patients:** dentures and relines, replacing old bridges, implant-retained dentures `[if offered]` → /dental-implants/; dry mouth; gum health.
9. **And for you:** a short line inviting the adult child to register too ("While you're here, when did you last have a check-up?") → callback.
10. **FAQs** ("Can I come into the appointment with my mum?", "Can I pay for my dad's treatment?", "My mother has dementia. Can she still be treated?", "Do you do home visits?" `[TBC]`, "Will you talk to me about my dad's treatment?").
11. **CTA:** "Request a callback to talk it through", with "Booking for someone else" pre-selected.

Tone: practical and kind, never pitying; respects the parent as the patient. Mirror a short version of sections 2–6 in the homepage band.

### Repair (category page)
A problem-led intro; what we do (sub-sections per treatment); what to expect; indicative "from" price with a link to /fees/; 4–6 FAQs (marked up with FAQPage schema); relevant before/afters; CTA.

### Missing teeth (category page)
Rewritten as a decision page: "You have options." Implants come first and get the most detail, introduced in Yusef's voice ("As an implant dentist, I'll tell you honestly whether implants are right for you"). Then an options comparison table (implants, bridges, dentures), who each suits, honest pros and cons, cost ranges. Links prominently to /dental-implants/. 4–6 FAQs. CTA.

### Cosmetic dentistry (new)
Header along the lines of "Improve your smile." Problem-led sections ("Stained or discoloured teeth", "Chipped or uneven teeth", "Old fillings or crowns you don't like", "Gaps or crooked teeth"), each mapped only to treatments Ivy House offers `[TBC]`. Indicative from-prices; before/after cases; 4–6 FAQs; CTA. Keep the tone restrained and in line with the brand: natural-looking results, not "Hollywood smiles". Link to /dental-implants/ where a missing tooth is part of the problem.

### Dental implants
See §6A.

### Team / clinician profile
Name, role, GDC number, qualifications, approach and interests, photo. The data model must support several clinicians and a sort order. **Add implant fields:** implant training and postgraduate qualifications `[TBC]`, years placing implants `[TBC]`, approximate number placed `[TBC, only if verifiable]`, implant system used `[TBC]`, professional memberships (e.g. ADI) `[TBC]`. Each renders only if filled in.

### Fees
A table of "from" prices by category `[TBC figures]`, a note on payment options `[TBC]`, and a statement that a written treatment plan and estimate are given before treatment. The implants row links to /dental-implants/cost/.

### Contact
Callback form, `tel:` link, address, opening hours, click-to-load map, parking and access information `[TBC]`.

### Callback form
Fields: Name*, Phone*, Best time to call (morning / afternoon / any), New or existing patient, **Who is the appointment for? (Me / My child / My parent or someone I care for / More than one of us)**, **What can we help with? (Check-up / Repair / Dental implants / Cosmetic / Other)**, Message (optional) with the hint "Please don't include medical details." Add a consent checkbox linking to the privacy notice. On implant pages, pre-select "Dental implants" and add a hidden `source_page` field so implant leads can be separated. Fire `implant_callback_submit` when the implant option is chosen, and `family_callback_submit` when the appointment is for a parent, child or more than one person. Don't collect the other person's name or health details on the form; the practice takes those on the call. On success, go to `/thank-you/`, which repeats the phone number for urgent issues.

## 6A. Dental implants: feature section (new in v1.1)

Implants are the commercial priority, so they get a hub-and-spoke cluster rather than one long page. The hub targets the head terms; each spoke answers one high-intent question in depth. Every page links back to the hub and sideways to the cost and suitability pages.

### 6A.1 Reference: Dawood & Tanner (reviewed 3 Nov 2026)

Dawood & Tanner is a London referral practice with a multi-specialist team, in-house CBCT, guided/navigated surgery and zygomatic work. Ivy House should borrow its **structure**, not its **scale claims**.

| Adopt | Why |
|---|---|
| Implants as a top-level menu with 5–6 sub-pages (overview, process, single/multiple, full arch, stories) | Clear topical cluster; each page targets its own query; signals depth to search engines |
| A dedicated, numbered **process page** (consultation and 3D planning → placement → 2-week review → healing 2–6 months → final restoration → lifelong maintenance) with a 10–12 question FAQ | The most useful page on their site; answers the "what happens?" and "how long?" questions patients actually ask |
| Implant-specific CTA ("Book an implant consultation"), distinct from general booking | Separates high-value leads |
| Patient stories grouped by treatment type | Lets visitors find someone like them |
| Explaining the technology used in planning and surgery, with photos | Builds confidence, *if* Ivy House has equivalent kit `[TBC]` |
| A referral route for other dentists | Local general dentists who don't place implants are a lead source (Phase 2) |

| Avoid | Why |
|---|---|
| Superlatives and unverifiable claims ("most trusted", "world-class", "premier", "thousands of implants" without evidence) | Breaches GDC advertising guidance and the CAP Code; see §7 |
| "Specialist-led" wording | Only permissible if the clinician is on a GDC specialist list |
| No prices on the implant pages | A missed opportunity. "How much do dental implants cost?" is the most-asked implant question; answering it with a clear from-price is Ivy House's main AEO advantage |
| No FAQs on the hub page | Weakens AI-search extraction; put FAQs on every implant page |
| A suitability questionnaire that collects answers by email | Collects health data (special category under UK GDPR); see §6A.6 |
| Stories as video only, with no transcript or written summary | Invisible to crawlers and AI search; inaccessible without captions |
| Reviews loaded by a third-party JS widget | Not in the static HTML; adds third-party requests |
| Copy errors and links to staging domains | Their site has both; run spell-check and a link checker in CI |
| Treatment pages Ivy House can't deliver (e.g. zygomatic) | Misleading and attracts the wrong enquiries |

### 6A.2 Hub page: /dental-implants/

Target 1,500–2,000 words. Order:
1. **H1:** "Dental implants in Ramsgate and Thanet". Answer box beneath (40–60 words): what an implant is, that Ivy House provides them, the from-price `[TBC]`, and the next step.
2. **Hero CTA:** Book an implant consultation / phone.
3. **Before/after strip** (implant cases only).
4. **"What is a dental implant?"** with simple SVG diagram (implant, abutment, crown).
5. **"Which implant treatment do I need?"** cards to Single tooth / [Multiple teeth] / [Full arch].
6. **"How does implant treatment work?"** 5-step summary stepper → /process/.
7. **"How much do dental implants cost?"** from-price and what's included → /cost/.
8. **"Who places your implants?"** Written in Yusef's first person, with his photo: who he is, that he places the implants himself, his training, experience and the system he uses, and that you see him from consultation to final tooth `[all TBC]`. Use "I'm an implant dentist" or "I place implants myself", not "implant specialist" (see §7 on the "implant surgeon" title).
9. **"Are dental implants right for me?"** short version → /am-i-suitable/.
10. **"Implants, bridges or dentures?"** options comparison table → /missing-teeth/.
11. **"Risks and what can go wrong"** (see §7; required).
12. **Patient stories** (2–3, once consented).
13. **FAQs** (8–10).
14. **"Patients from across Thanet"**: one paragraph naming Ramsgate, Broadstairs, Margate, Sandwich and Canterbury, with travel and parking notes. This replaces thin town landing pages (see §8).
15. **CTA band + callback form** (pre-selected to implants).

### 6A.3 Spoke pages

| Page | Primary question | Must include | Words |
|---|---|---|---|
| /process/ | "What happens during dental implant treatment?" | 6 numbered steps, each with what happens, how long, how many visits, and whether it hurts; anaesthetic/sedation options `[TBC]`; bone grafting explained `[TBC if offered]`; temporary teeth during healing; 10–12 FAQs | 1,500–2,000 |
| /cost/ | "How much do dental implants cost in Ramsgate?" | Answer box with from-price; cost table (single implant + crown, bridge, denture, grafting, CT scan) `[TBC]`; what's included and excluded; why prices vary; payment options `[TBC]`; written estimate before treatment; cost vs alternatives over 10 years (factual, not promotional); FAQs | 800–1,200 |
| /single-tooth/ | "Can one missing tooth be replaced with an implant?" | Who it suits; immediate vs delayed placement `[TBC]`; front-tooth considerations; timeline; cost; before/after; FAQs | 900–1,200 |
| /multiple-teeth/ `[if offered]` | "How do you replace several missing teeth?" | Implant bridges; implant-retained dentures; how many implants needed; cost; FAQs | 900–1,200 |
| /full-arch/ `[if offered]` | "Can I get fixed teeth instead of dentures?" | Who it suits; same-day teeth only if offered, with caveats; cost; FAQs | 1,000–1,400 |
| /am-i-suitable/ | "Am I suitable for dental implants?" | Bone, gum health, smoking, diabetes and medication explained in general terms; "told you're not suitable?" section; static self-check list; what the consultation involves; FAQs | 900–1,200 |
| /patient-stories/ | "What is it like to have implants?" | Story cards by treatment type; each with a written summary, consented before/after and an optional video with captions and transcript | n/a |

### 6A.4 Answer-engine optimisation (AEO) pattern

Apply on every implant page:
- **Question-led H2s** that match how people ask: "How long do dental implants last?", "Do dental implants hurt?", "How much does a single implant cost in Ramsgate?".
- **Answer first.** The first 40–60 words under each H2 must answer the question on their own, with a specific figure where possible (price, months, visits). Detail follows.
- **Entities and specifics:** name the practice, the town, the clinician and GDC number, the implant system `[TBC]`, the price and the timeline. AI answers cite specifics; they ignore vague copy.
- **One fact, one place:** prices, timelines and the number of visits come from `site.json → implants` so every page says the same thing.
- **Reviewed-by line and date** on each page (E-E-A-T for health content), linked to the clinician profile.
- **Tables for comparisons** (cost, options), written as real HTML tables.
- **Transcripts and written summaries** for any video.
- **`/llms.txt`:** add an implants section covering what Ivy House offers, from-price, process summary, who places implants and how to book.

Starter FAQ bank (draft answers; Yusef to approve each):
How much do dental implants cost? · How long do dental implants last? · Does implant surgery hurt? · How long does the whole treatment take? · How many appointments will I need? · Can I have an implant if I've lost bone? · Can I have implants if I smoke or have diabetes? · What happens if an implant fails? · Will I have a gap while it heals? · Implants vs bridge vs denture: which is better? · Can I pay in instalments? · Do you take patients who aren't registered with you for implants? · How do I look after an implant? · Is there an age limit?

### 6A.5 Implant SEO

- **Primary keywords:** dental implants Ramsgate · dental implants Thanet · dental implants Margate · dental implants Broadstairs · dental implants Kent.
- **Secondary:** dental implant cost Ramsgate / Kent · single tooth implant cost · full arch implants Kent `[if offered]` · implant dentist near me · replace missing tooth Ramsgate · dentures vs implants · dental implants after tooth extraction · bone graft dental implant `[if offered]`.
- **Keyword-to-URL map:** one primary keyword per page (hub: "dental implants Ramsgate/Thanet"; /cost/: "dental implant cost"; /single-tooth/: "single tooth implant"; /am-i-suitable/: "am I suitable for dental implants"; /process/: "dental implant procedure").
- **Internal linking:** every non-implant page links once to the hub with descriptive anchor text; every spoke links to hub, /cost/ and /am-i-suitable/; the gallery and stories link to the matching spoke.
- **Titles:** e.g. "Dental Implants Ramsgate & Thanet | Ivy House Dental" (≤ 60 chars); "Dental Implant Costs in Ramsgate | Ivy House Dental".
- **No town doorway pages in v1.** Cover Margate, Broadstairs and others through the hub's "Patients from across Thanet" section, `areaServed` and the Google Business Profile. Revisit with genuine local content in Phase 2.
- **Google Business Profile (off-site, Rick):** add "Dental implants" as a service with description and from-price; post implant before/afters (consented); ask implant patients for reviews that mention the treatment.

### 6A.6 Suitability self-check

A static checklist on /am-i-suitable/ ("You may be suitable if…" / "We'll need to talk about…"). **It must not submit or store answers.** Health information is special category data under UK GDPR, and the callback form must stay free of it. The checklist ends with the implant consultation CTA.

### 6A.7 Referral page for dentists (Phase 2)

Template `/for-dentists/`: what Ivy House accepts on referral, how to refer (phone/secure email `[TBC]`), what the referring dentist gets back (report, patient returns to them for routine care). Leave unpublished until Yusef confirms he wants referrals.

## 7. Compliance (UK): build these in, don't bolt them on

- **GDC:** show every clinician's GDC number on their profile and in the footer. **Do not use the word "specialist"** anywhere (including "specialist-led" and "implant specialist") until confirmed (`site.json → principal.specialistList`). If it's false, use "advanced restorative and implant dentistry" or "special interest in…".
- **"Implant surgeon":** Yusef wants to say "I'm an implant surgeon". Any registered dentist placing implants is performing surgery, so the statement isn't false. But next to "advanced" claims it can read as a specialist title, which the GDC may treat as misleading. Use "I place every implant myself" and "implant dentist" in headings. Use "implant surgeon" only in his first-person profile text, alongside his verifiable implant training, and never with "specialist" or "consultant". Yusef to confirm he's comfortable defending the wording.
- **Older patients and dementia:** photos of people who lack capacity to consent must not be used. Don't caption or imply that anyone pictured has dementia. Testimonials about a parent with dementia need written consent from the parent (if they have capacity) or their attorney, and should avoid identifying details. Explain lasting power of attorney factually and without legal advice.
- **Family involvement and confidentiality:** copy must not promise that the practice will share a patient's information with family by default. Sharing needs the patient's consent; where the patient lacks capacity, decisions follow the Mental Capacity Act (a health and welfare attorney or best interests). Paying for someone's treatment doesn't give access to their records.
- **No unverifiable claims:** no "best", "painless", "guaranteed", "leading", "No.1", "premier", "world-class" or "most trusted". Experience figures (years, number of implants) only if Yusef can evidence them.
- **Implant-specific:**
  - Every implant page carries a **"Risks and what can go wrong"** section or link: infection, nerve injury, implant failure, the need for grafting, and the importance of maintenance. Balanced information is required for surgical procedures.
  - Don't describe implants as "permanent", "for life" or "pain-free". Use "designed to last many years with good care".
  - "Same-day teeth" or "teeth in a day" only if offered, and always with who it suits and its limits.
  - Success rates only with a cited source and context.
  - **Finance:** if any page promotes paying by instalments or credit, the practice must be FCA-authorised or an appointed representative of a lender, and the wording must follow FCA financial promotion rules. Until confirmed, say only "Ask us about ways to spread the cost" `[TBC]`.
- **CQC:** show the current rating with a link to the CQC report in the footer and on /patient-information/cqc-and-gdc/. Use the official CQC widget if available.
- **Before/after and testimonials:** each case and testimonial has a `consent: true` field; the build **excludes** any item without it. Add a footer disclaimer: "Treatment results vary. All before-and-after images and testimonials are of real patients and are used with their written consent." Videos need the same consent, plus captions.
- **Fees:** clear, indicative and not misleading; state what a from-price includes.
- **Complaints, privacy notice (UK GDPR), accessibility statement:** template pages `[TBC content from practice]`.
- **Forms:** collect the minimum data; send by HTTPS only; don't send health data by email. The suitability self-check collects nothing.

## 8. SEO and AI search

- Unique `<title>` (≤ 60 chars) and meta description (≤ 155) per page, with a locality term on core pages.
- JSON-LD: `Dentist` (LocalBusiness) with name, address, geo, phone, opening hours, `priceRange`, `areaServed` (Ramsgate, Broadstairs, Margate, Sandwich, Thanet) and `makesOffer` for dental implants with a from-price; `Person` for clinicians (with `hasCredential`, `memberOf` where verified); `FAQPage` on category and implant pages; `BreadcrumbList`.
- **Implant pages:** `MedicalWebPage` with `about` → `MedicalProcedure` (name "Dental implant placement", `procedureType` Surgical, `bodyLocation`, `preparation`, `followup`, `howPerformed`), `reviewedBy` → Yusef's `Person`, and `lastReviewed`. Note: Google now shows FAQ rich results only for a small set of authoritative sites; implement FAQPage anyway because it helps AI systems parse the content, but don't expect SERP rich results.
- One H1 per page; logical heading hierarchy; descriptive alt text.
- `sitemap.xml`, `robots.txt`, canonical URLs, Open Graph tags and image. Don't block AI crawlers in `robots.txt`.
- Add `/llms.txt` summarising the practice, services (with an implants section, §6A.4) and contact details.
- Make the answers AI search will look for quotable in short, clear sentences: who we are, where we are, whether we take new patients, what implants cost, what to do if you break a tooth.
- Keyword targets (general): dentist Ramsgate · private dentist Ramsgate · dentist Thanet · family dentist Ramsgate · children's dentist Ramsgate · dentist for elderly parents · dementia-friendly dentist Thanet `[only if the practice can substantiate it]` · cosmetic dentist Ramsgate · teeth whitening Ramsgate `[if offered]` · composite bonding Thanet `[if offered]` · emergency dentist Ramsgate · broken tooth repair Ramsgate · dentures Ramsgate · new patients dentist Ramsgate. Implant keywords: see §6A.5.

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
  "implants": {
    "placedBy": "[TBC: Yusef / visiting surgeon]",
    "system": "[TBC]",
    "yearsPlacing": "[TBC]",
    "fromPriceSingle": "[TBC]",
    "priceIncludes": "[TBC]",
    "consultationFee": "[TBC]",
    "timelineMonths": "[TBC]",
    "typicalVisits": "[TBC]",
    "imaging": "[TBC: in-house CBCT / referred]",
    "sedation": "[TBC]",
    "finance": { "offered": "[TBC]", "fcaAuthorised": "[TBC]" },
    "services": {
      "singleTooth": true,
      "multipleTeeth": "[TBC]",
      "fullArch": "[TBC]",
      "boneGrafting": "[TBC]",
      "sameDayTeeth": "[TBC]",
      "acceptsReferrals": "[TBC]"
    }
  },
  "cosmetic": {
    "whitening": "[TBC]",
    "bonding": "[TBC]",
    "veneers": "[TBC]",
    "cosmeticCrowns": "[TBC]",
    "straightening": "[TBC]"
  },
  "olderPatients": {
    "longerAppointments": "[TBC]",
    "carersWelcome": "[TBC]",
    "stepFreeAccess": "[TBC]",
    "homeVisits": "[TBC]",
    "dementiaTraining": "[TBC]",
    "dropOff": "[TBC]",
    "jointBookings": "[TBC]",
    "familyReminders": "[TBC]",
    "thirdPartyPayment": "[TBC]"
  },
  "children": { "fromAge": "[TBC]", "familyBookings": "[TBC]" },
  "parking": "[TBC]",
  "social": {}
}
```
All templates read from this file, and nothing is hard-coded. During the build, any value still `[TBC]` should render visibly (highlighted) so gaps are obvious in review.

## 10. Delivery phases

| Phase | Output | Target |
|---|---|---|
| 1. Scaffold | Repo, Eleventy, tokens, layouts, components, `site.json`, Netlify deploy preview | 6 Nov |
| 2. v1 build | All pages with draft copy and placeholders, **including the implant hub, /process/, /cost/, /single-tooth/ and /am-i-suitable/**; form; schema; CMS | 9 Nov (review meeting w/c 9 Nov) |
| 3. Content | Yusef's copy edits; real facts (incl. implant facts in `site.json → implants`); brand colours and logo | 20 Nov |
| 4. Compliance & QA | Compliance review (incl. implant rules in §7); Lighthouse; axe accessibility audit; spell-check and link check; cross-browser and mobile; form delivery test; redirect test | 27 Nov |
| 5. Launch | DNS cut-over; analytics live; submit sitemap to Google Search Console and Bing; update the Google Business Profile URL and add implant service | 30 Nov |
| 6. v1.1 | Real photography, before/after gallery, testimonials, implant patient stories | Jan 2027 |
| 7. Phase 2 | Implant video stories (captioned, transcribed), /for-dentists/ referral page, implant Google Ads landing variants, blog | Q1 2027 |

**Definition of done for v1:**
- [ ] All pages build with no errors or broken links
- [ ] Lighthouse mobile ≥ 95 in all four categories on Home, Implant hub, Implant cost and Contact
- [ ] No axe violations at WCAG 2.2 AA
- [ ] Form submits, notifies by email and fires the analytics event; implant leads fire `implant_callback_submit` and carry `source_page`
- [ ] Every `[TBC]` resolved or knowingly accepted
- [ ] No "specialist", superlatives or unconsented images or testimonials
- [ ] Every implant page has an answer box, FAQs, a risks section, a reviewed-by line and valid schema (Rich Results Test passes)
- [ ] Implant sub-pages for services not offered are excluded from the build
- [ ] All domains redirect to `https://thanetdentist.com` with 301s
- [ ] A non-technical user can edit a page, add a team member, add a gallery case and edit implant FAQs and prices through `/admin`

## 11. Open questions (owner: Rick, to resolve with the practice)

1. Is Yusef on a GDC specialist list? This decides the wording across the site.
2. Who owns ongoing edits, and do they need CMS training?
3. Practice email address on the domain, and where callback notifications go.
4. Brand files: logo (SVG), exact pink, Yusef's preferred font.
5. Facts: founding year, address, hours, phone, fee guide, CQC rating, GDC numbers, parking.
6. Which redirect domains have been purchased.
7. **Implant facts:** does Yusef place implants himself (or a visiting surgeon)? Which implant system? Training, years and approximate numbers placed (only if evidenced)? In-house CBCT/3D imaging or referred? Sedation? Bone grafting? Multiple-teeth and full-arch work? Same-day teeth?
8. **Implant pricing:** single implant from-price and what it includes; consultation fee; CT scan fee; grafting fee.
9. **Finance:** is patient finance offered, and is the practice FCA-authorised or an appointed representative?
10. **Referrals:** does Yusef want implant referrals from other local dentists?
11. **Implant cases:** which 6–10 cases have written consent for web use (before/after and, where willing, a short filmed story)?
12. **Cosmetic treatments:** which are offered, with from-prices? The /cosmetic-dentistry/ page lists only these.
13. **Older patients:** what does the practice actually do differently (longer appointments, carers in the surgery, step-free access, home visits, dementia training)? Each claim on the page needs a yes.
14. **"Implant surgeon" wording:** is Yusef content with the approach in §7?
15. **Size the trend:** practice manager to count roughly how many current patients are brought in by a family member who pays or arranges care, and what treatments those patients have. This tells us whether older patients deserve a homepage band or just a page, and gives a figure for the Phase 2 campaign brief.
16. **Family processes:** can the practice book a parent and adult child together, send reminders to a family member with consent, and take payment from a third party? Is there drop-off parking?
17. **Family photo shoot:** which family (patients or staff relatives) will sit for the three-generation and parent-and-adult-child images, with signed releases?

## 12. Working instructions for Claude Code

- Start by proposing the file structure and component list. Wait for approval before building pages.
- Commit in small, descriptive steps. Open PRs for review so Netlify deploy previews can be shared with the practice.
- Ask, don't assume, on any fact about the practice.
- Keep dependencies minimal and pinned. Document setup, CMS use and deployment in `README.md`.
- Don't reuse wording from either reference site.
