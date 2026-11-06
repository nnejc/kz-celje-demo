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

Placeholders use the final file names, so you can overwrite them without touching code:
`hero.webp` (1600x900), `cat-vrt.webp`, `cat-krma.webp`, `cat-orodje.webp`, `cat-domace.webp` (800x600), `tip-1..3.webp` (800x500), `letak-1..3.webp` (700x990).
Only AI images for atmosphere; never present them as the client's real products or people.

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

## Before production

Remove the `.demo-bar` element in `index.html`, fill all `[VNESI: ...]` values (also in the JSON-LD), update canonical and Open Graph URLs, keep the EU co-financing notice in the footer, and add the real privacy policy link.
