# Research: kz-celje.si (collected 2026-11-06)

Source: https://www.kz-celje.si/ (read directly with the browser). Nothing below is invented; unknowns are marked `[VNESI: ...]`.

## Company
- Kmetijska zadruga Celje, z.o.o. (agricultural cooperative)
- HQ / uprava: Kocbekova ulica 5, 3000 Celje, tel. 03 425 38 00, e-mail tajnistvo@kz-celje.si
- Hours (uprava): Mon-Fri 08:00-15:00
- Facebook: https://www.facebook.com/KZ-Celje-102216865359597 (new profile "KZ-Celje", announced on the home page)
- Website co-financed by Republic of Slovenia and EU (ERDF), via "Vavcer za digitalni marketing". Footer carries this notice plus "Program razvoja podezelja" link. **Keep this notice on the production site.**
- Direktor: Peter Vrisk. Komerciala in marketing: Maja Vrisk (03 425 38 19, mobi 041 427 820). Names appear on the public contact page, so they are real.
- Other contacts (public): Tajnistvo 03 425 38 00; Racunovodstvo 03 425 38 13; Odkup 03 425 38 16; Odkup zivine (Marijan Jezernik) 03 425 38 14 / 041 626 472; Vodja odkupa (Janez Brecl) 041 785 412.

## Stores (real data from /trgovine)
| Store | Address | Phone | Hours |
|---|---|---|---|
| Kmetijska preskrba Vojnik (largest) | Celjska cesta 24, 3212 Vojnik | GSM 041 427 537, TEL 03 780 48 50 | Mon-Fri 07:00-19:00, Sat 07:00-13:00 |
| Agrocenter Skofja vas | Skofja vas 46b, 3211 Skofja vas | GSM 041 427 551, TEL 03 541 57 11 | Mon-Fri 07:30-16:00, Sat 07:30-12:00 |
| KZ Celje uprava (office, not a store) | Kocbekova ulica 5, 3000 Celje | 03 425 38 00 | Mon-Fri 08:00-15:00 |

Vojnik range: poljscine, krmila in mineralno vitaminski dodatki, semena in sadike, nega/oskrba/varstvo rastlin, agrotehnika, mesarstvo, kletarstvo, oprema za dom in vrt, dobrote z domacih kmetij, drugo.
Skofja vas range: poljscine, semena in sadike, krmila in dodatki, nega/oskrba/varstvo rastlin, agrotehnika, drugo.

## Services (real text)
- **Odkup zivine**: young fattened cattle, cows, calves, pigs; over 5000 head per year from cooperating farmers; supply of fattening calves and inputs; mediation in livestock sales. Contact Marijan Jezernik 041 626 472.
- **Odkup mleka**: cow's milk from 32 producers around Celje, approx. 3 million litres per year. Contact: 041 785 412 (Janez Brecl).
- **Pridelava in prodaja hmelja**: hop growing and sale (page text describes hops generally; Spodnja Savinjska dolina, around Celje). Contact 041 785 412.
- **Trgovsko-poslovni center Vojnik**: opened 2006; post office, bank, shoes/textile shops, optician, kindergarten, doctor, physio, law office, insurance agency, and the KZ's largest store Kmetijska preskrba Vojnik.

## Product categories (/prodajni-program, "sprotno dopolnjuje, spletna stran v izdelavi")
Semena in sadike; Dobrote z domacih kmetij; Kletarstvo; Igrace; Oprema za koline; Tekstil; Izdelki za dom in gospodinjstvo; Drugo; Nega, oskrba in varstvo rastlin; Gradnja; Agrotehnika; Prehrana in oprema za zivali. No prices anywhere on the site.

## "Aktualno" content (real, from Vojnik/Skofja vas pages, dated 14.10.2024)
- Na zalogi: mineralna gnojila UREA, KAN, NPK ("Ne odlasajte z nakupom!")
- Gozdarska oprema: cepilni bati, drsniki, kavlji, verige, zagozde, skripec, kljuci, svecke, mazalice, rokavice, sekire, lupilniki, gozdarski srp...

## e-Novice (/novice), real recent titles
- 21.11.2025 Sadike sadnega drevja in jagodicevja (Kmetijska preskrba Vojnik)
- 29.07.2025 Krmne trave in trave za zelenico
- 15.07.2025 Katero seme sejati julija?
- 16.09.2024 Bukova drva
- 14.08.2024 Domace korenje, cebula, cesen, krompir in strocji fizol
- 12.04.2024 Sadike zelenjave
- 04.05.2023 Eksoticne sadike
Latest news is from 2025-11, so the news feed is rather stale.

## Flyers
- One PDF found: https://www.kz-celje.si/h/novice/pdf/jesenska_ponudba_V3.pdf (jesenska ponudba, last modified 2021-11-15, about 660 KB). It is old, so it is only usable as an archive example. No current flyer exists. Current flyer = `[VNESI: aktualni letak]`.

## Events
None found on the site. Demo events are clearly labelled as examples.

## Newsletter form (existing)
Hidden behind a tile / modal "Narocilo na email obvescanje": ime, priimek, e-posta, GDPR checkbox, captcha. No SMS option.

## Technical / UX problems seen
- Home page = 8 "klikni in poglej" tiles, 4 of them images of stock/map shots, no phone, no hours, no products, no flyer.
- Broken links on the home page (HTTP 404): `/aktualno/kemtijska-zadruga-celje` (typo "kemtijska") and `/storitve/udkup-zivine` (typo "udkup"); `/storitve/predelava-prodaja-hmelja` (typo "predelava", not tested but the correct URL is `pridelava-prodaja-hmelja`).
- Tile "Trgovini in Uprava" is the only place with opening hours.
- Footer has an unresolved template placeholder in the captcha image URL (`<php print(Config::get('IT_DOMAIN)); ?>`).
- Mixed http/https images, stats tracker `statistika.slovenka.net`.

## Brand
- Logo: `https://www.kz-celje.si/h/logo.png` (270x112, black cow head + "KMETIJSKA ZADRUGA CELJE z.o.o." with a green parallelogram; black/white/green). Saved to `img/client/logo.png`.
- Site UI colour: green `#64bb91`, text `#2e2e2e`/`#373737`.
- Demo palette: deep green `#1f5a3a`, cream `#faf5e9`, amber `#e0a02b` accent.

## Photos taken from the client's site (their own, used for services cards)
`/public/h/naslovnica/{krave,mleko,hmelj,vojnik}.jpg` (400x400 / 300x300, low-res). The `trgovine_02.jpg` and `prodajni_program.jpg` tiles are a Google Maps screenshot and a collage; not used on the page.

## Placeholders to fill (marked `[VNESI: ...]` in data/)
Current flyer images/PDF, product prices and photos, real events, store photos, Brevo/Mailchimp form action, SMS provider, privacy policy URL, business registration / VAT number, social links beyond Facebook.
