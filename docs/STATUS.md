# Build status

*Updated at the end of every Claude Code session. Last updated: 3 Nov 2026.*

## Where things are

| | |
|---|---|
| Repo | `tiktokrick/ivy-house` |
| Working branch | `phase-1-scaffold` (pushed, not merged; `main` holds only the brief) |
| Preview | https://ivy-house-dental.netlify.app (anyone with the link can open it; hidden from search engines) |
| Netlify project | `ivy-house-dental` (team `tiktokrick`) |
| Current phase | Phase 1 done; Phase 2 (v1 build with draft copy) next, due 9 Nov |

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

## Changes from the brief

- `site.json` holds opening hours as one entry per day, and gains `priceRange` (`[TBC]`), `areaServed` and an analytics setting.
- The content security policy is set inside each page, because `/admin` needs a looser one.
- HSTS is set without "preload", which is hard to undo.
- No gallery lightbox in v1, because there are no photos yet.

## Blocked on Rick

- [ ] Link the GitHub repo to the Netlify project, for automatic deploys and pull-request previews.
- [ ] Run `gh auth login` once, so Claude Code can open pull requests.
- [ ] Create the GitHub OAuth app and install it in Netlify, for the CMS (steps in README).
- [ ] Set up the Plausible site and its goals: `callback_submit`, `phone_click`, `email_click`, `directions_click`.

## Blocked on the practice

- [ ] BRIEF §11 facts: founding year, address, hours, phone, fee guide, CQC rating, parking.
- [ ] GDC specialist-list status for Yusef.
- [ ] Team names, and GDC numbers for all four clinical staff.
- [ ] Practice email address, and the notification address for callback requests.
- [ ] Brand files: logo (SVG), exact pink, preferred font.

## Next: Phase 2 (due 9 Nov)

- Draft copy for every page (UK English, marked DRAFT for Yusef's review).
- 4–6 FAQs per category page.
- The implants page at 1,200–1,800 words.
- "From" prices on the category pages.

**Useful input for Phase 2** (put it in `docs/briefs/`): tone and wording examples Yusef likes, the FAQ topics patients actually ask about, Yusef's implant experience, and anything about the family history to use on the About page.
