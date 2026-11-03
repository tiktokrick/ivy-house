# Ivy House Dental Practice: website

Source for **thanetdentist.com**, the website of Ivy House Dental Practice, Ramsgate.

- Build brief: [`BRIEF.md`](BRIEF.md)
- Design reference: [`docs/design-reference.md`](docs/design-reference.md)

Stack: Eleventy 3 (static HTML) · hand-written CSS · Decap CMS · Netlify (hosting, forms) · Plausible (cookie-free analytics).

## Local setup

Requires Node 24 (see `.nvmrc`).

```bash
npm install
npm start                  # dev server at http://localhost:8080
npm run build              # build to _site/
npm run build:production   # build as Netlify production does (fails on any [TBC])
```

Keep the working copy outside OneDrive or other synced folders; syncing `node_modules` causes problems.

## Where things live

| Path | What |
|---|---|
| `content/` | Pages (Markdown + front matter). Folder = URL. Edited by the CMS |
| `content/team/` | One file per clinician → `/team/<file-name>/`. `order` sets the sort |
| `content/gallery/`, `content/testimonials/` | Before/after cases and testimonials. Not pages; shown only when `consent: true` |
| `content/admin/` | Decap CMS (`/admin`) |
| `src/_data/site.json` | Practice facts: address, phone, hours, CQC, GDC, implant facts and prices, cosmetic and older-patient services. Every template reads from here |
| `src/_data/nav.json` | Main navigation, including the Dental implants and Treatments dropdowns |
| `src/_data/fees.json` | Fee table |
| `src/_includes/layouts/` | Page layouts |
| `src/_includes/components/` | One Nunjucks macro per component |
| `src/css/` | `tokens.css` (colours, fonts, spacing) + one file per component. Bundled into a single hashed file at build |
| `src/js/` | Small progressive enhancements only; the site works without JS |
| `lib/` | Build helpers: CSS bundle, JSON-LD, compliance checks |
| `netlify.toml` | Build, security headers, domain redirects |

## Build-time checks

The build fails if:

- any page uses "specialist" while `site.json → principal.specialistList` isn't `"true"` (GDC rule)
- any page uses an unverifiable claim: best, painless, pain-free, guaranteed, leading, No.1, premier, world-class, most trusted, permanent, for life, lifetime (GDC/CAP). Legitimate phrases (e.g. "best time to call", "permanent teeth") are allow-listed in `lib/compliance.js`
- any page mentions same-day teeth while `site.json → implants.services.sameDayTeeth` isn't true
- any page promotes credit (interest-free, monthly payments, APR…) while `implants.finance.fcaAuthorised` isn't true (FCA rules)
- "implant surgeon" appears anywhere except a clinician's own profile
- an implant page (`/dental-implants/…`) is missing its answer box, reviewed-by line, risks section, FAQ section, MedicalWebPage data or implant-consultation form
- a **live** build still contains `[TBC]`

"Live" means Netlify's production context **and** the project's primary URL is `site.json → domain` (`https://thanetdentist.com`). Until the domain is switched over, production deploys on `ivy-house-dental.netlify.app` behave like previews: `[TBC]` values are highlighted in yellow, pages are `noindex`, `robots.txt` blocks crawlers and analytics is off.

Before/after cases and testimonials appear only when their file has `consent: true`.

### Services that may not be offered

Pages, navigation links and `llms.txt` entries for optional services are controlled from `site.json` (see `lib/offered.js`). A page's front matter names the setting with `when`, e.g. `when: "implants.services.fullArch"`. Only an explicit `false` removes it; `[TBC]` keeps it visible (and highlighted) so the decision can't be missed. The implant patient-stories page appears only when `implants.storiesPublished` is true.

## Deployment (Netlify)

- Production deploys from `main`; every pull request gets a deploy preview to share with the practice.
- Build command and Node version are set in `netlify.toml`.
- **Forms:** the callback form is a Netlify Form (`name="callback"`, honeypot field `company`). Set the notification email under *Project configuration → Notifications → Form submission notifications*.
- **Domains:** set `thanetdentist.com` as the primary domain (Netlify redirects `www` to it). Add `thanetdentist.co.uk` and every other purchased domain as domain aliases; the 301s are in `netlify.toml`.
- **Analytics:** create the `thanetdentist.com` site in Plausible and add the custom-event goals `callback_submit`, `implant_callback_submit`, `family_callback_submit`, `phone_click`, `email_click`, `directions_click` and `fees_view_implants`. The script loads in production only.

## CMS (`/admin`)

Decap CMS with the GitHub backend. Editors sign in with GitHub through Netlify's OAuth provider; Netlify Identity/Git Gateway are deprecated and not used.

One-off setup:

1. On GitHub, create an OAuth App: homepage `https://thanetdentist.com`, callback URL `https://api.netlify.com/auth/done`.
2. In Netlify: *Project configuration → Security → OAuth → Install provider → GitHub*, then paste the client ID and secret.
3. Give each editor a GitHub account with write access to this repository.

Editing works through the *editorial workflow*: saving creates a pull request with its own deploy preview, and **Publish** merges it to `main`.

What editors can change: page text and FAQs, implant pages (short answer, FAQs, review date), implant and cosmetic service settings, team members, gallery cases, testimonials, practice details (address, phone, hours, CQC, GDC) and fees.
