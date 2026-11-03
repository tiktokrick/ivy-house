# Build status

*Updated at the end of every Claude Code session. Last updated: 3 Nov 2026.*

## Where things are

| | |
|---|---|
| Repo | `tiktokrick/ivy-house` |
| Working branch | `brief-v1.3-sync` (branched from `phase-1-scaffold`; neither merged; `main` holds only the brief) |
| Preview | https://ivy-house-dental.netlify.app (anyone with the link can open it; hidden from search engines) |
| Netlify project | `ivy-house-dental` (team `tiktokrick`) |
| Brief | **v1.3** (3 Nov 2026) |
| Current phase | Phase 1 done and synced to brief v1.3; Phase 2 (v1 build with draft copy) next, due 9 Nov |

## Phase 1: scaffold (done, ahead of the 6 Nov target)

- Eleventy 3.1.7, hand-written CSS, light JavaScript that only adds to pages that already work without it.
- All pages in the sitemap build. **Home** is complete, in the order set in BRIEF §6. **Other pages** are stubs saying "draft copy to follow".
- Design follows BRIEF §5:
  - **Fonts:** Cormorant Garamond and Jost, self-hosted.
  - **Colour:** dark/ivory/pink placeholder colours.
  - **Contrast:** the pink is too faint for small text, so links use a darker pink on light backgrounds and a lighter pink on black.
- **Team:** Yusef, a hygienist, two nurses and a practice manager.
  - **Names:** everyone's except Yusef's are `[TBC]`.
  - **Profiles:** Yusef and the hygienist have profile pages; the nurses and practice manager appear as cards only.
  - **GDC:** the practice manager has no GDC number line.
- **Compliance checks built into the build** (see README):
  - The build fails if "specialist" appears while `principal.specialistList` isn't "true".
  - It fails on the banned claims (best, painless, guaranteed, leading, No.1).
  - Before/after cases and testimonials appear only with `consent: true`.
  - A live build fails if any `[TBC]` is left. "Live" means production on thanetdentist.com; the netlify.app address behaves like a preview.
- **SEO:** search-engine data (practice, clinicians, FAQs, breadcrumbs), `sitemap.xml`, `robots.txt` and `llms.txt`.
- **Forms:** Netlify Forms is on and the callback form is detected. No notification email is set yet.
- **CMS:** Decap CMS 3.17.3 at `/admin`, using GitHub sign-in through Netlify, with each edit going through review before it publishes. It isn't usable until the OAuth app is set up.
- **Review screenshots:** 12, made for Yusef (9 phone, 3 desktop), in the OneDrive Ivy House folder.

## Sync to brief v1.3 (3 Nov, branch `brief-v1.3-sync`)

- **Brief:** `BRIEF.md` replaced with v1.3 (implant hub, family dentistry, older patients, cosmetic, adult child as buyer).
- **Pages:** `/maintenance/` is now `/family-dentistry/` (+ `/family-dentistry/older-patients/`); implants moved to a top-level hub `/dental-implants/` with process, cost, single-tooth, multiple-teeth, full-arch, am-i-suitable and patient-stories pages; new `/cosmetic-dentistry/`. Old URLs 301 in `netlify.toml`. All new pages are structured stubs: headings in brief order, `[TBC]` facts pulled from `site.json`.
- **Services switched from data:** pages and nav links with `when:` (e.g. full arch, multiple teeth, patient stories) drop out of the build, sitemap, nav and `llms.txt` when their `site.json` value is `false` (`lib/offered.js`). Patient stories stays hidden until `implants.storiesPublished` is true.
- **Navigation:** Dental implants and Treatments dropdowns on `<details>`, working without JS; one open at a time with JS. Fees added to the top level.
- **Home:** cards 01–03 rewritten (family / repair / replace or improve with two links); new implant band in Yusef's voice and older-patients band; then heritage, team, testimonials, form.
- **Implant layout:** every implant page has an answer box, reviewed-by line, risks section (draft copy), FAQ section, MedicalWebPage data and an inline form pre-set to implants. Header and phone bar read "Implant consultation".
- **Callback form:** adds "Who is the appointment for?" and "What can we help with?", plus a hidden `source-page`. Fires `implant_callback_submit` and `family_callback_submit`; the implant cost page fires `fees_view_implants`. The older-patients page has its own form, pre-set to "My parent or someone I care for".
- **Data:** `site.json` gains `implants`, `cosmetic`, `olderPatients`, `children`; `areaServed` adds Sandwich. `fees.json` regrouped (implants first, family, repair, missing teeth, cosmetic). Yusef's profile gains implant fields (training, years, numbers, system, memberships).
- **Schema:** practice `makesOffer` for implants with the from-price; `MedicalWebPage` → `MedicalProcedure` on implant pages.
- **Compliance checks added:** pain-free, premier, world-class, most trusted, permanent, for life, lifetime; same-day teeth unless offered; credit wording unless FCA status is confirmed; "implant surgeon" outside a clinician profile; missing implant-page parts.
- **CMS:** new pages, a "Dental implant pages" collection (short answer, review date, FAQs), implant/cosmetic/older-patient settings, clinician implant fields, cosmetic gallery category.
- **Checks run:** build passes; production-mode build fails only on `[TBC]` (as designed); no broken internal links; JSON-LD parses on all pages; axe (WCAG 2.2 AA) shows no violations on Home, implant hub and cost, family, older patients, cosmetic, missing teeth, contact and Yusef's profile.
- `npm run build` now clears `_site` first, so renamed pages don't linger locally.

## Changes from the brief

- `site.json` holds opening hours as one entry per day, and gains `priceRange` (`[TBC]`), `areaServed` and an analytics setting.
- The content security policy is set inside each page, because `/admin` needs a looser one.
- HSTS is set without "preload", which is hard to undo.
- No gallery lightbox in v1, because there are no photos yet.

## Blocked on Rick

- [ ] Link the GitHub repo to the Netlify project, for automatic deploys and pull-request previews.
- [ ] Run `gh auth login` once, so Claude Code can open pull requests.
- [ ] Create the GitHub OAuth app and install it in Netlify, for the CMS (steps in README).
- [ ] Set up the Plausible site and its goals: `callback_submit`, `implant_callback_submit`, `family_callback_submit`, `phone_click`, `email_click`, `directions_click`, `fees_view_implants`.
- [ ] Review and merge `phase-1-scaffold`, then `brief-v1.3-sync`.
- [ ] Decide repo ownership before launch (transfer from `tiktokrick` to the practice's or agency's organisation).

## Blocked on the practice

- [ ] BRIEF §11 facts: founding year, address, hours, phone, fee guide, CQC rating, parking.
- [ ] GDC specialist-list status for Yusef.
- [ ] Team names, and GDC numbers for all four clinical staff.
- [ ] Practice email address, and the notification address for callback requests.
- [ ] Brand files: logo (SVG), exact pink, preferred font.
- [ ] BRIEF §11 Q7–Q17: implant facts and prices, finance/FCA status, referrals, consented implant cases, cosmetic treatments offered, older-patient processes, "implant surgeon" wording, sizing the family trend, family photo shoot.

## Next: Phase 2 (due 9 Nov)

- Draft copy for every page (UK English, marked DRAFT for Yusef's review), per brief v1.3.
- Implant hub 1,500–2,000 words; process, cost, single-tooth and am-i-suitable per BRIEF §6A.3; answer box and FAQ bank (§6A.4) on each.
- Older-patients page written for the adult child (BRIEF §6, sections 1–11).
- 4–6 FAQs per category page.
- "From" prices on the category pages (`[TBC]` until the fee guide arrives).

**Useful input for Phase 2** (put it in `docs/briefs/`): tone and wording examples Yusef likes, the FAQ topics patients actually ask about, Yusef's implant experience, and anything about the family history to use on the About page.
