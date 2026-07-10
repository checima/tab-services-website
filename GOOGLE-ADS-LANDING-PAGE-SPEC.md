# Build Brief: Two Google Ads Landing Pages

**For:** TAB Services Company (`tabservicescolorado.com`)
**Pages:** Fume Hood Testing · Hospital Room Pressure Testing
**Goal:** Maximum lead volume in these two service lines. Take every job, one hood or four hundred.

---

## Constraints (read first)

This is a small company. Simplicity is the governing principle.

1. **Reuse the existing design system.** Do not invent new components. Do not add a CSS framework, a build step, or any JS dependency. The site is static HTML with `css/style.css`, `css/pages.css`, and `js/main.js`. Keep it that way.
2. **Zero new JavaScript.** Everything these pages need already exists in `main.js`: the FAQ accordion, the `.reveal` scroll animation, the stat counter, and the Web3Forms handler.
3. **Minimal new CSS.** If a section needs a style that does not exist, add it to `pages.css` in the existing style. Prefer composing existing classes.
4. **Copy the exact header, mobile menu, and footer markup** from `pressuretesting.html`. Update `aria-current="page"` and the nav links to match the new URLs.
5. **Match the existing voice:** plain, technical, confident, no marketing fluff. Look at `hvactabservices.html` and `firelifesafetyinspections.html` for tone.
6. **No em dashes in copy.** Use commas, periods, colons, semicolons.

### Existing components available

| Class | Use |
|---|---|
| `.page-hero` + `--pressure` / `--bsc` modifiers | Page hero with background image, scrim, grain, eyebrow, title, ruler |
| `.page-hero__subtitle` | Exists but is unused. Use it for the hero subhead. |
| `.split-text-media` | Two-column text + image |
| `.prose` / `.lead` | Body copy blocks |
| `.block-head` + `.section-index` + `.block-title` | Numbered section headers |
| `.checklist` | Bulleted list with `<b>Term</b> – description` pattern |
| `.mini-grid` + `.mini-card` (`__num`, `__title`, `__desc`) | 4-up numbered feature cards |
| `.stats` + `.stat` (`__num[data-count]`, `__label`) | Animated stats band (see `index.html` L126-143) |
| `.faq` + `.faq__item` / `__q` / `__icon` / `__a` / `__a-inner` | Accordion. JS already wired. See `faqs.html`. |
| `.cert-list`, `.cap-chips`, `.chips` | Credential lists and chip rows. See `about-us.html`. |
| `.cta-band` + `.cta-band__inner` + `.cta-band__title` | Full-width closing CTA |
| `.btn` + `--gold` / `--dark` / `--lg` / `--sm` | Buttons |
| `.section` + `--dark` | Section wrappers, alternate light/dark |
| `.container` + `--narrow` / `--mid` | Width constraints |
| `.reveal` | Add to any element for the scroll-in animation |

### One new component to build

**Sticky mobile click-to-call bar.** Fixed to the bottom of the viewport on screens under 768px, hidden on desktop. Full-width, gold background, phone icon plus `Call (303) 649-1213`, links to `tel:+13036491213`. Roughly 20 lines of CSS, no JS. This is the highest-impact addition on the page and the only new component needed.

---

## Page 1: `/fume-hood-testing`

Replaces the fume hood half of `bscfhtesting.html`.

### Head

```html
<title>Fume Hood Testing & Certification in Colorado | ASHRAE 110 | TAB Services</title>
<meta name="description" content="NEBB-certified fume hood testing and certification to ASHRAE 110 across Colorado. Any lab, any size, from one hood to a full campus. Fast scheduling, audit-ready reports. Call (303) 649-1213." />
<link rel="canonical" href="https://tabservicescolorado.com/fume-hood-testing" />
```

Add `og:title`, `og:description`, `og:image`. Add a `FAQPage` JSON-LD block matching the FAQ section verbatim.

### H1

> **Fume Hood Testing & Certification in Colorado**

The H1 must contain the exact head keyword. Do not get clever. The current hero eyebrow, "Balancing critical facility systems for peak performance," is a brand slogan; replace it on this page.

### Sections

**1. Hero** — `.page-hero`

- Eyebrow: `NEBB & ICB/TABB Certified · Serving Colorado Since 1981`
- H1 as above
- Subhead (use the unused `.page-hero__subtitle`): *"ASHRAE 110 certification for any laboratory in Colorado, from a single hood to a full research campus. Fast scheduling, repeatable results, audit-ready documentation."*
- **Two CTAs side by side, in the hero:** `.btn--gold` → `Get a Quote`, and `.btn--dark` → `Call (303) 649-1213` (a real `tel:` link)
- Background image: a real photo of a TAB technician testing a hood

**2. Trust strip** — `.chips` or `.cap-chips`, directly under the hero

`NEBB` · `ICB/TABB` · `40+ Years` · `7,000+ Projects` · `ASHRAE 110` · `NSF/ANSI 49`

**3. What we test** — `.section` + `.container--narrow` + `.block-head` + `.checklist`

Specificity is the whole game here. Competitors say "we test fume hoods." Listing the protocol signals competence and converts better than any adjective.

- **Face Velocity Testing** – Average, uniformity, and full grid traverse
- **Tracer Gas Containment Testing** – Per ASHRAE 110, with AM / AI / AU ratings
- **Smoke Visualization** – Airflow pattern verification and leak identification
- **Sash & Alarm Verification** – Sash movement and low-flow alarm function
- **Exhaust System Verification** – Fan performance and duct static pressure
- **Repairs & Calibration** – Fan speed, motor, and HEPA issues corrected on site

**4. Every lab, every size** — `.section--dark` + `.split-text-media`

The anti-filter section. Explicitly invite the small job; it is where the long tail lives, and a small lab assumes a firm this size will not call back.

> We test one hood and we test four hundred. Research universities, hospital labs, biotech and pharmaceutical manufacturers, environmental and cannabis testing labs, high school and community college science departments. If it has a hood, we will certify it, and we will get there quickly.

**5. What happens on the visit** — `.mini-grid` with four `.mini-card`s

Volume buyers convert on clarity, not prestige. Remove the unknown.

1. **Tell us what you have** – Call or submit the form. We scope by hood count and location.
2. **Quote in 24 hours** – Clear, fixed pricing. No surprises.
3. **On site, on your schedule** – Typically within two weeks, worked around your lab's hours.
4. **Certified and documented** – Tagged units and digital records within five business days.

> ⚠️ Confirm these timelines are real before publishing. Only promise what the crew can hit.

**6. Annual recertification** — `.section` + `.container--narrow` + `.checklist`

Placed mid-page as an *upgrade*, never in the hero as a *requirement*. Hard-selling recurring above the fold suppresses one-off conversions, and one-off jobs are how recurring relationships start.

> **The TAB Annual Lab Certification Program**
> - We track your recertification dates and call you before they lapse
> - One visit covers fume hoods, biosafety cabinets, and lab room pressurization
> - Priority scheduling during audit season
> - Fixed multi-year pricing

**7. Standards & compliance** — `.cert-list`

ASHRAE 110-2016 · NSF/ANSI 49 · ANSI/AIHA Z9.5 · OSHA 29 CFR 1910.1450 (Lab Standard) · Local AHJ requirements

Link the existing capability statement: `assets/docs/TAB-Services-Capability-Statement-2026.pdf`

**8. Proof** — `.stats` band, reused from `index.html` L126-143

`1981` Established · `150+` Years combined experience · `7,000+` Projects completed · `NEBB` & ICB/TABB certified

If you have permission to name a client, add one short quote or an anonymized snippet ("A 40-hood research campus in Boulder…"). This is the strongest conversion lever available and it beats any copy change.

**9. Service area** — plain text list

Denver, Aurora, Lakewood, Boulder, Fort Collins, Colorado Springs, Greeley, Pueblo, Grand Junction. Also serving Wyoming, Utah, and New Mexico.

**10. FAQ** — `.faq` accordion, plus `FAQPage` JSON-LD

- How often must a fume hood be certified?
- What is ASHRAE 110, and what do AM, AI, and AU ratings mean?
- What happens if a hood fails testing?
- How long does testing take per hood? Will it disrupt lab operations?
- Do you test biosafety cabinets on the same visit?
- **Do you take small jobs?** *(Answer: yes, explicitly. One hood is a job.)*
- How quickly can you schedule?

**11. CTA band** — `.cta-band`

Title: `Need your hoods certified?` · Button: `Get a Quote` · Secondary text link: `Or call (303) 649-1213`

---

## Page 2: `/hospital-room-pressure-testing`

Replaces `pressuretesting.html`.

### Head

```html
<title>Hospital Room Pressure Testing in Colorado | ASHRAE 170 | TAB Services</title>
<meta name="description" content="Negative and positive pressure room testing for Colorado hospitals. Joint Commission and ASHRAE 170 compliance, isolation and OR verification, rapid response for out-of-spec rooms. NEBB certified since 1981. Call (303) 649-1213." />
<link rel="canonical" href="https://tabservicescolorado.com/hospital-room-pressure-testing" />
```

### H1

> **Hospital Room Pressure Testing in Colorado**

The current title tag, "Critical Area Pressure Services," is a phrase nobody searches. That mismatch between query and title depresses Google's Quality Score, which directly raises your cost per click.

### Sections

**1. Hero** — `.page-hero`

- Eyebrow: `NEBB & ICB/TABB Certified · Trusted by Rocky Mountain Hospitals Since 1981`
- H1 as above
- Subhead: *"Independent, third-party verification of isolation rooms, operating rooms, and compounding pharmacies. Accurate, repeatable, defensible documentation for The Joint Commission."*
- **Two CTAs:** `Get a Quote` + `Call (303) 649-1213`
- Directly below the hero, a visually distinct urgent band: **"Room out of spec right now? Call our rapid response line."** This is a different buyer at a different moment and converts far higher than the other two.

**2. Trust strip** — `.chips`

`NEBB` · `ICB/TABB` · `ASHRAE 170` · `Joint Commission` · `FGI Guidelines` · `40+ Years`

**3. Rooms we test** — `.checklist`

Listed by room type, because that is how facilities directors think and search.

- Airborne Infection Isolation Rooms (AII, negative pressure)
- Protective Environment Rooms (positive pressure)
- Operating rooms and procedure suites
- Sterile processing, decontamination and clean sides
- Compounding pharmacies, USP 797 and 800 anterooms and buffer rooms
- Soiled and clean utility, endoscopy, isolation anterooms

**4. What we measure** — `.section--dark` + `.checklist`

- Differential pressure across the door plane
- Air changes per hour, total and outdoor
- Directional airflow verification with visual smoke
- Supply and exhaust offset, terminal unit performance
- Door undercut and envelope leakage contribution
- Pressure monitor calibration verification

**5. Rapid response** — its own `.section`, visually prominent

The best asset on the current page and it is buried in paragraph three. Give it a section and a concrete promise: on site within X hours in the Denver metro. Publish only a number the crew can hit. This is also the highest-converting entry point in the funnel: hospitals that call you in a crisis retain you annually.

**6. Independent by design** — `.split-text-media`

Short and sharp. TAB does not install or service the equipment it tests, so the data is unbiased and defensible in a dispute with a mechanical contractor. This is a real competitive moat and the current site never says it.

**7. Every hospital, every size** — the anti-filter section

Name the small buyers alongside the large: outpatient surgery centers, dental surgery, dialysis clinics, veterinary hospitals, and compounding pharmacies, as well as major medical centers.

**8. Annual compliance program** — mid-page, `.checklist`

> **The TAB Critical Environments Compliance Program**
> - Annual testing of every critical room, scheduled around your clinical calendar
> - Rolling quarterly spot checks on high-risk rooms
> - Standardized digital reports formatted for Joint Commission survey
> - On-call rapid response when a room drifts out of spec
> - Fixed multi-year pricing and priority scheduling

**9. Proof** — `.stats` band

**10. Service area** — plain text list

**11. FAQ** — `.faq` accordion + `FAQPage` JSON-LD

- How often does The Joint Commission require pressure testing?
- What is ASHRAE 170, and how does it relate to FGI Guidelines?
- What pressure differential is required for an AII room?
- What happens if a room fails during a survey?
- Can you test while a room is occupied or in use?
- How fast can you respond to an out-of-spec room?
- **Do you test small facilities and surgery centers?** *(Answer: yes.)*

**12. CTA band** — `.cta-band`

Title: `Ready to verify your critical rooms?` · Button: `Get a Quote` · Secondary: `Or call (303) 649-1213`

---

## The quote form

The biggest conversion leak on the site. `requestquote.html` is a **construction bid-solicitation form**: "Bid Requested By," "Bid Due Date," "Link to prints." A lab manager who needs three hoods certified will look at it and leave.

Build a short form and put it **directly on both landing pages**, not on a separate page. Every extra click loses leads.

**Required, four fields:**

- Name
- Email
- Phone
- Facility name and city

**Optional, clearly marked:**

- Service (pre-filled by the landing page, so the visitor never has to choose)
- Roughly how many hoods / rooms? *(Free text. Not a dropdown with a minimum.)*
- Is this urgent? Yes / No
- Anything else we should know? *(textarea)*

**Rules:**

- One screen, one submit button. No multi-step. Multi-step forms exist to qualify leads, and you are not qualifying.
- No minimum-size dropdowns. A `[1-4] [5-15] [16-40]` selector tells a small lab it is in the wrong place.
- Do not block free-mail domains. University lab managers use personal addresses.
- Reuse the existing Web3Forms setup: same `access_key`, same `data-web3form` attribute, same `.form` / `.field` classes. The handler in `main.js` already works.
- Change the `subject` hidden field per page so ad leads are identifiable in the inbox: `"Fume Hood Lead — Website"` and `"Pressure Testing Lead — Website"`.

**The operational point that matters more than any of the above:** call inbound leads back fast, ideally within minutes. Contact rates drop sharply the longer you wait. Under a volume mandate, speed to lead is worth more than another dollar of ad spend.

---

## SEO hygiene (one-time, cheap, do it while you're in there)

The site currently has **zero** canonical tags, Open Graph tags, or structured data across all 22 pages. Also no `robots.txt` and no `sitemap.xml`.

1. Add `<link rel="canonical">` to both new pages, then backfill the rest.
2. Add `FAQPage` JSON-LD to both pages, mirroring the accordion content exactly.
3. Add one `LocalBusiness` JSON-LD block (name, address, phone, geo, hours) to `index.html`.
4. Create `robots.txt` and `sitemap.xml`.
5. Add redirects to `vercel.json` (`cleanUrls: true` is already set):

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    { "source": "/bscfhtesting", "destination": "/fume-hood-testing", "permanent": true },
    { "source": "/pressuretesting", "destination": "/hospital-room-pressure-testing", "permanent": true }
  ]
}
```

6. Update the nav dropdown and footer links across all pages to the new URLs.

> `bscfhtesting.html` currently bundles fume hood and biosafety cabinet content into one URL. Two keyword sets competing for one page weakens both. Splitting off `/biosafety-cabinet-certification` later is worthwhile, but it is not needed for round one. Keep the BSC content on the fume hood page for now, below the fold.

---

## Optional: the minimum viable tracking

Skip Google Tag Manager. Skip CallRail. Both are real complexity for a small company.

But without *any* conversion signal, Google Ads is bidding blind: it will optimize for clicks it guesses are good and will never learn which ones became jobs. The minimal version is genuinely small:

1. **One `gtag` snippet** in the `<head>` sitewide. Three lines. No dashboard, no vendor, no fee.
2. **Two conversion events.** `main.js` already intercepts the form submit; fire a conversion there. Add a click listener on `a[href^="tel:"]`. Maybe ten lines total.
3. **Google's own free call forwarding number** in the Google Ads call extension. Zero code, built into Ads, no third party.

That is the whole thing. Recommended, but not a blocker for shipping the pages.

---

## Google Ads notes (for later, not needed to build the pages)

### The one thing that will waste your budget

**"Pressure testing" is a keyword trap.** In Google's index, that phrase overwhelmingly returns hydrostatic testing, pipeline testing, plumbing leak tests, sewer lines, and backflow preventers. Google will also close-variant you into **"pressure washing."** Someone searching "pressure testing near me" is looking for a plumber.

These are not low-value customers. They are **non-customers**, and they will consume the budget meant for isolation-room queries.

- Bid on `pressure testing [geo]` in **exact match only**, never phrase, never broad.
- Your actual demand lives in: `room pressure testing`, `hospital room pressure testing`, `negative pressure room testing`, `isolation room testing`, `operating room pressure testing`, `room pressurization testing`, `ASHRAE 170`, `Joint Commission pressure testing`, `USP 797 pressure testing`.
- Negative list: `pressure washing, washer, hydrostatic, pipeline, pipe, plumbing, plumber, sewer, drain, backflow, boiler, tank, cylinder, scuba, tire, hose, well, water heater, gas line, leak detection, sprinkler, DIY, how to, kit, pump, gauge, jobs, salary, course, training, what is`

The same applies to fume hoods. `hood testing Colorado` and `fume hoods Colorado` pull heavy kitchen-hood-cleaning and hood-purchase traffic. Exact match only.

- Fume hood negatives: `kitchen, range hood, vent hood, hood cleaning, exhaust cleaning, restaurant, grease, car, truck, engine, buy, for sale, used, install, build, DIY, how to, parts, Labconco, Thermo, Esco, jobs, salary, course, what is`

### Campaign basics

- **Search Network only. Turn off "Include Google Display Network."** It is on by default and will eat the budget.
- Location targeting: set to **"Presence: people in your targeted locations."** The default, "Presence or interest," shows your ads to out-of-state researchers.
- Start with **phrase and exact match only.** Review the search terms report twice a week for the first month and add negatives aggressively. Do not touch broad match until you have roughly 30 conversions.
- Two campaigns, one per service. Ad groups mirror the keyword clusters above. Both point to their matching landing page.
- Turn on all extensions: call, sitelinks, callouts (`NEBB Certified`, `Since 1981`, `7,000+ Projects`, `Independent Third Party`, `Any Size Job`), structured snippets, location.
- Ad copy: Headline 1 mirrors the search term exactly. Headline 2 carries the credential. Headline 3 carries the differentiator. Descriptions signal **capacity and speed**, not exclusivity: "Any lab, any size." "One hood or four hundred."
- **Claim and optimize the Google Business Profile.** Free, and it drives the map pack for "fume hood testing near me." As valuable as the paid campaign at this budget level.

### Budget

Set the ceiling by **how many of these jobs the crew can actually absorb per month**, not by CPA. Work backward: crew capacity → jobs per month → leads needed → budget.

---

## Open questions to resolve before publishing

1. **Crew capacity.** How many fume hood and pressure testing jobs per month can you actually deliver? Everything downstream depends on this number.
2. **Turnaround times.** Are "quote in 24 hours," "on site within two weeks," and "records in five business days" real? If they are, they are a volume weapon. If not, change them.
3. **Rapid response SLA.** What response time can you honestly guarantee in the Denver metro? A specific number beats a vague promise, and competitors cannot match it.
4. **Named clients.** Are you permitted to name any hospital or lab clients? Worth more than any copy change on this page.
5. **Photography.** `detail-bscfhtesting.jpg` and `detail-pressuretesting.jpg` exist. Are they real TAB technicians or stock? Real photos of your crew convert better.
