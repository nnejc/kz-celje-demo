# KZ Celje: website demo

Static demo for Kmetijska zadruga Celje (https://www.kz-celje.si/). Plain HTML, CSS and vanilla JS, no build step, no trackers, no cookies.
Visible text is Slovenian. Anything marked `[VNESI: ...]` is a placeholder that must be replaced with real client data.

## Structure

```
index.html            single page with anchors, SEO tags, JSON-LD
css/style.css         all styles (mobile first, system fonts)
js/main.js            mobile menu, renders sections from /data, signup form validation
data/products.json    featured products of the week
data/leaflets.json    current flyer (pages + PDF) and archive
data/events.json      events (next 3 upcoming are shown)
data/tips.json        tips and news cards (first 3 are shown)
data/stores.json      stores, hours, phones, map links
img/                  hero, category visuals, tip covers, flyer pages (placeholders)
img/client/           logo and photos taken from the client's current site
research.md           what was found on the existing site
```

The JSON files are a stand-in for a CMS. Edit one entry, save, redeploy.

## Editing data

- **Product**: add an object to `data/products.json` with `name`, `category`, `description`, `image`, `price` (number, or `null` plus `priceNote`), `store`, `badge` (or `null`).
- **Flyer**: replace the entries in `current.pages` with the page images (`img/letak-1.webp`, ...), set `current.pdf` and `current.validity`. Move the old flyer into `archive`.
- **Event**: add `{ "date": "YYYY-MM-DD", "time", "title", "place", "description" }`. Past events are hidden automatically. Remove `"demo": true` for real events.
- **Tip/news**: add `title`, `date`, `excerpt`, `image`, `url`, `tag`.
- **Store**: edit `data/stores.json`. The "Zdaj odprto" badge is computed from `hours` (day labels: `Ponedeljek – petek`, `Sobota`, `Nedelja`).

## Images

Flyer pages are placeholders (`letak-1..3.webp`, 700x990): overwrite them with the real flyer. The design is deliberately plain; add real photos of the stores and products when available, and use AI images sparingly and never as the client's real products or people.

## Signup form

Front-end only. In `js/main.js` the submit handler has a `TODO` where the request to Brevo or Mailchimp goes (via their form endpoint or a small serverless function). Store the time of consent and the consent text for both channels (e-mail and SMS) separately.

## Run locally

```bash
python -m http.server 8099
```

Open http://localhost:8099/ (needed because the page fetches the JSON files).

## Deploy (GitHub Pages)

1. Push to a GitHub repository (branch `main`).
2. Settings, Pages, Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site is served at `https://<user>.github.io/<repo>/`. All paths are relative, so it also works on a custom domain.

## TODO before launch

Everything below is placeholder or demo content and must be replaced with real data. None of it is shown as bracket text on the page any more.

- AI images (hero, product cards, flyer photos): replace with real photos. Product cards carry the caption "Ilustrativna slika" (remove it in `js/main.js` once real photos are used).
- Sample flyer ("Primer letaka"): replace `img/letak-1..3.webp` and `letak/letak.pdf` with the real flyer, set `current.validity` and `demo: false` in `data/leaflets.json`, remove the `.sample-badge` elements in `index.html`. Old flyers go to `archive`.
- Events in `data/events.json` are examples (badge "Primer"): enter real events and remove `"demo": true`.
- Product prices: all cards say "Cena v trgovini". Add `price` when the client wants to publish prices.
- Newsletter: connect the form to Brevo or Mailchimp (see the TODO in `js/main.js`), plus an SMS provider and stored consent per channel.
- Meta Pixel: disabled placeholder in the `<head>` of `index.html`, enable together with a cookie consent banner.
- Remove the demo bar (`.demo-bar`) in `index.html`.
- Domain, DNS and hosting: find out who manages `kz-celje.si` today.
- Update canonical and Open Graph URLs to the final domain; check the EU co-financing notice and logos for the new site.
- Business identifiers for JSON-LD (VAT ID) if wanted.
- Tips/news: only the 3 newest real e-novice are linked; add an editor workflow (CMS) so the client can publish their own.

## Facts checked against kz-celje.si (2026-11-09)

See the table in the delivery message; sources are the pages `/storitve/*`, `/trgovine/*`, `/predstavitev/kz-celje` and `/novice`.

## Before production

Remove the `.demo-bar` element in `index.html`, fill all `[VNESI: ...]` values (also in the JSON-LD), update canonical and Open Graph URLs, keep the EU co-financing notice in the footer, and add the real privacy policy link.


