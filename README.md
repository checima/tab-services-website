# TAB Services Company — Website

A standalone, hand-coded static website (HTML/CSS/JS) — no Wix, no build step, no dependencies.
Host it anywhere (Netlify, Vercel, Cloudflare Pages, S3, or any web host).

## Pages

| Page | File | Original URL to preserve |
|------|------|--------------------------|
| Home | `index.html` | `/` |
| About Us | `about-us.html` | `/about-us` |
| FAQs | `faqs.html` | `/faqs` |
| Services | `services.html` | `/services` |
| Testing, Adjusting & Balancing | `hvactabservices.html` | `/hvactabservices` |
| Room Pressure Testing & Emergency Response | `pressuretesting.html` | `/pressuretesting` |
| BSC & Fume Hood Testing | `bscfhtesting.html` | `/bscfhtesting` |
| Fire & Life Safety Inspections | `firelifesafetyinspections.html` | `/firelifesafetyinspections` |
| Specialized Consulting Services | `specializedconsulting.html` | `/specializedconsulting` |
| Facilities We Serve (hub) | `facilities-served.html` | `/facilities-served` |
| → 9 facility detail pages | `facilities-served/<slug>.html` | `/facilities-served/<slug>` |
| Past Projects | `past-projects.html` | `/past-projects` |
| Request a Quote | `requestquote.html` | `/requestquote` |
| Contact | `contact.html` | `/contact` |

> **Clean URLs are configured.** The file names match the original URL slugs, and the included
> `vercel.json` (`cleanUrls`) and `netlify.toml` make hosts serve `/about-us` instead of
> `/about-us.html` (and redirect the `.html` form to the clean one). Netlify, Vercel, and
> Cloudflare Pages all do this automatically; on GitHub Pages the `.html` URLs work as-is.
> Internal links keep the `.html` suffix so the site also works when opened directly from disk —
> hosts transparently redirect those to the clean URL in the address bar.

## View it locally

Just open `index.html` in a browser. For the contact/quote forms and video to behave exactly
as in production, serve it over HTTP instead:

```
npx http-server -p 4321
# then open http://localhost:4321
```

## ⚙️ Forms — secure setup (Web3Forms via a Netlify function)

The **Request a Quote** and **Contact** forms submit to a Netlify serverless function
(`netlify/functions/contact.js`) that attaches the Web3Forms access key **server-side**.
The key is **never in the page source or the repo** — it lives only in a Netlify
environment variable. The function also enforces free spam protection (origin
allow-list + honeypot + email validation) and forwards the quote form's file upload.

**Required one-time setup (in Netlify):**

1. **Get a Web3Forms key** at https://web3forms.com — enter the destination inbox
   (e.g. **tab@tabservicescolorado.com**); the key routes to whatever email you register it with.
   To also copy **clau@tabservicescolorado.com**, add it as a CC in the Web3Forms dashboard.
2. In Netlify → **Site configuration → Environment variables**, add
   `WEB3FORMS_ACCESS_KEY` = your key value.
3. **Trigger a redeploy** (Netlify → Deploys → Trigger deploy) so the function picks up the variable.
4. Test the live forms and confirm the email arrives.

Until the env var is set, the forms show *"Form is not configured yet. Please email us directly."*

**Allowed origins:** `netlify/functions/contact.js` has an `ALLOWED_ORIGINS` list
(`tabservicesco.netlify.app` + the `.com` domains). Add any new domain there.

**Security:** never commit the key. If a key is ever exposed, generate a new one and
revoke the old in the Web3Forms dashboard. The function needs Node 18+ (Netlify default)
for global `fetch`.

## Assets

All media in `assets/` was pulled from the current live site:

- `assets/img/logo-white.png` — white logo (used on dark header/footer)
- `assets/video/hero.mp4` — Denver-skyline hero video (used on Home + About), **compressed for web**
  (re-encoded H.264, audio removed, faststart enabled). A poster image (`hero-poster.jpg`) shows while it loads.
- `assets/img/img1.jpg` — HVAC ductwork photo (default faint header background on inner pages).
- `assets/img/svc-*.jpg`, `hero-services.jpg`, `hero-facilities.jpg` — per-page header photos
  (HVAC, pressure, BSC, fire, consulting, services, facilities), wired via the
  `.page-hero--*` modifier classes in `css/pages.css`.
- `assets/docs/TAB-Services-Capability-Statement-2026.pdf` — linked from the About Us page.

**To swap in your own photos** per page, replace these files or point the relevant `.page-hero--*`
background in `css/pages.css` to a new file.

## Brand & design

- Colors (preserved from the existing site): gold `#ffc000`, charcoal `#2f2e2e`, near-black,
  grays, white — defined as CSS variables at the top of `css/style.css`.
- Typeface: **Barlow** (loaded from Google Fonts), matching the current site.
- `css/style.css` = global design system + home page. `css/pages.css` = inner-page components.
  `js/main.js` = sticky header, mobile menu, scroll reveals, stat counters, FAQ accordion, form handler.

## Editing copy

All text is plain HTML — edit it directly in each page. Header and footer markup is repeated in
every file; if you change a nav link or footer detail, update it across all pages (search & replace).
