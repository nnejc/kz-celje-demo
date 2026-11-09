/* KZ Celje demo: renders sections from /data/*.json with vanilla JS. */
(function () {
  "use strict";

  var MONTHS = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(id) { return document.getElementById(id); }
  function telHref(p) { return "tel:+386" + p.replace(/\s|-/g, "").replace(/^0/, ""); }
  function load(file) {
    return fetch("data/" + file).then(function (r) {
      if (!r.ok) throw new Error(file + " " + r.status);
      return r.json();
    });
  }
  function fail(el, msg) { if (el) el.innerHTML = '<p class="loading">' + esc(msg) + "</p>"; }

  /* ---------- Mobile menu ---------- */
  var btn = $("menuBtn"), nav = $("nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
  }
  btn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Products ---------- */
  function renderProducts(items) {
    $("products").innerHTML = items.map(function (p) {
      var price = p.price != null ? Number(p.price).toFixed(2).replace(".", ",") + " €" : p.priceNote || "Cena v trgovini";
      return '<article class="card product">' +
        // Images are AI illustrations for now: caption them so nobody takes them for real product photos.
        (p.image ? '<figure class="shot"><img src="' + esc(p.image) + '" width="1000" height="700" loading="lazy" alt="' + esc(p.name) + '"><figcaption>Ilustrativna slika</figcaption></figure>' : "") +
        (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "") +

        '<div class="card-body"><p class="cat">' + esc(p.category) + "</p><h3>" + esc(p.name) + "</h3>" +
        "<p>" + esc(p.description) + "</p>" +
        '<div class="meta"><span class="price">' + esc(price) + "</span><span>" + esc(p.store) + "</span></div></div></article>";
    }).join("");
  }

  /* ---------- Flyer viewer ---------- */
  function renderLeaflets(data) {
    var cur = data.current, pages = cur.pages || [], i = 0;
    var img = $("flyerImg"), count = $("flyerCount"), prev = $("flyerPrev"), next = $("flyerNext"), thumbs = $("flyerThumbs");
    // Keep the default text from the HTML ("Veljavnost po objavi letaka.") unless a real validity is set.
    if (cur.validity) $("leafletValidity").textContent = "Velja: " + cur.validity;

    function show(n) {
      i = Math.max(0, Math.min(pages.length - 1, n));
      img.src = pages[i].src;
      img.alt = pages[i].alt || "Letak, stran " + (i + 1);
      count.textContent = "Stran " + (i + 1) + " od " + pages.length;
      prev.disabled = i === 0;
      next.disabled = i === pages.length - 1;
      Array.prototype.forEach.call(thumbs.children, function (b, k) {
        b.setAttribute("aria-current", k === i ? "true" : "false");
      });
    }
    thumbs.innerHTML = pages.map(function (p, k) {
      return '<button type="button" aria-label="Stran ' + (k + 1) + '"><img src="' + esc(p.src) + '" width="700" height="990" loading="lazy" alt=""></button>';
    }).join("");
    thumbs.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (b) show(Array.prototype.indexOf.call(thumbs.children, b));
    });
    prev.addEventListener("click", function () { show(i - 1); });
    next.addEventListener("click", function () { show(i + 1); });
    if (pages.length) show(0);

    var pdf = $("flyerPdf");
    if (cur.pdf) { pdf.href = cur.pdf; }
    else {
      pdf.setAttribute("aria-disabled", "true");
      pdf.title = "Na voljo ob objavi letaka";
      pdf.classList.add("is-disabled");
      pdf.removeAttribute("target");
      pdf.addEventListener("click", function (e) { e.preventDefault(); });
    }

    // Archive box is shown only when there are real entries.
    var archive = (data.archive || []).filter(function (a) { return a.title; });
    $("archiveBox").hidden = archive.length === 0;
    $("archive").innerHTML = archive.map(function (a) {
      var t = a.pdf ? '<a href="' + esc(a.pdf) + '" target="_blank" rel="noopener">' + esc(a.title) + "</a>" : "<span>" + esc(a.title) + "</span>";
      return "<li>" + t + '<span class="date">' + esc(a.date) + "</span></li>";
    }).join("");
  }

  /* ---------- Events: next 3 ---------- */
  function renderEvents(items) {
    var today = new Date().toISOString().slice(0, 10);
    var sorted = items.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var upcoming = sorted.filter(function (e) { return e.date >= today; });
    var list = (upcoming.length ? upcoming : sorted.slice(-3)).slice(0, 3);
    $("events").innerHTML = list.map(function (e) {
      var d = new Date(e.date + "T12:00:00");
      return '<article class="event"><div class="event-date"><span class="day">' + d.getDate() + '</span><span class="mon">' + MONTHS[d.getMonth()] + "</span></div><div>" +
        (e.demo ? '<span class="tag-demo">Primer</span>' : "") +
        "<h3>" + esc(e.title) + "</h3><p>" + esc(e.time) + " · " + esc(e.place) + "</p><p>" + esc(e.description) + "</p></div></article>";
    }).join("");
  }

  /* ---------- Tips ---------- */
  function renderTips(items) {
    $("tips").innerHTML = items.slice(0, 3).map(function (t) {
      // Date is optional on purpose: old dates make the site look abandoned, so the demo shows category only.
      var date = "";
      if (t.date) { var d = new Date(t.date + "T12:00:00"); date = '<time datetime="' + esc(t.date) + '">' + d.getDate() + ". " + (d.getMonth() + 1) + ". " + d.getFullYear() + "</time>"; }
      return '<article class="card tip">' +
        '<div class="card-body"><span class="tag">' + esc(t.tag) + "</span>" + date +
        '<h3>' + esc(t.title) + "</h3><p>" + esc(t.excerpt) + "</p>" +
        '<a class="link" href="' + esc(t.url) + '" target="_blank" rel="noopener">Preberi več</a></div></article>';
    }).join("");
  }

  /* ---------- Stores ---------- */
  var DAYSETS = { "Ponedeljek – petek": [1, 2, 3, 4, 5], "Sobota": [6], "Nedelja": [0] };
  function isOpen(hours) {
    var now = new Date(), day = now.getDay(), mins = now.getHours() * 60 + now.getMinutes();
    return hours.some(function (h) {
      var set = DAYSETS[h.days]; if (!set || set.indexOf(day) < 0) return false;
      var m = h.time.match(/(\d\d):(\d\d)\s*[–-]\s*(\d\d):(\d\d)/); if (!m) return false;
      return mins >= +m[1] * 60 + +m[2] && mins < +m[3] * 60 + +m[4];
    });
  }
  function renderStores(items) {
    $("stores").innerHTML = items.map(function (s) {
      var open = isOpen(s.hours);
      return '<article class="card store"><h3>' + esc(s.name) + '</h3><p class="note">' + esc(s.note) + "</p>" +
        '<span class="open-now ' + (open ? "yes" : "no") + '">' + (open ? "Zdaj odprto" : "Zdaj zaprto") + "</span>" +
        "<address>" + esc(s.address) + "</address>" +
        '<ul class="hours">' + s.hours.map(function (h) { return "<li><span>" + esc(h.days) + "</span><strong>" + esc(h.time) + "</strong></li>"; }).join("") + "</ul>" +
        (s.range && s.range.length ? '<ul class="chips">' + s.range.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("") + "</ul>" : "") +
        '<div class="store-actions">' +
        s.phones.map(function (p, k) { return '<a class="btn ' + (k ? "btn-outline" : "btn-green") + '" href="' + telHref(p) + '">' + esc(p) + "</a>"; }).join("") +
        '<a class="btn btn-outline" href="' + esc(s.map) + '" target="_blank" rel="noopener">Zemljevid</a></div></article>';
    }).join("");
  }

  /* ---------- Hero panel: stores open today ---------- */
  function renderToday(items) {
    var shops = items.filter(function (s) { return s.range && s.range.length; });
    $("today").innerHTML = "<h2>Prodajalne danes</h2>" + shops.map(function (s) {
      var d = new Date().getDay(), key = d === 0 ? "Nedelja" : d === 6 ? "Sobota" : "Ponedeljek – petek";
      var h = s.hours.filter(function (x) { return x.days === key; })[0];
      var open = isOpen(s.hours);
      return '<div class="today-row"><div><strong>' + esc(s.name) + "</strong><span>" + (h ? esc(h.time) : "danes zaprto") + '</span></div><span class="open-now ' + (open ? "yes" : "no") + '">' + (open ? "odprto" : "zaprto") + "</span></div>";
    }).join("") + '<a class="link" href="#prodajalne">Naslovi in telefoni</a>';
  }

  /* ---------- Load data ---------- */
  load("products.json").then(renderProducts).catch(function () { fail($("products"), "Ponudbe trenutno ni mogoče naložiti."); });
  load("leaflets.json").then(renderLeaflets).catch(function () { fail($("flyerThumbs"), "Letaka trenutno ni mogoče naložiti."); });
  load("events.json").then(renderEvents).catch(function () { fail($("events"), "Dogodkov trenutno ni mogoče naložiti."); });
  load("tips.json").then(renderTips).catch(function () { fail($("tips"), "Člankov trenutno ni mogoče naložiti."); });
  load("stores.json").then(function (s) { renderStores(s); renderToday(s); }).catch(function () { fail($("stores"), "Prodajaln trenutno ni mogoče naložiti."); });

  /* ---------- Signup form (front-end only) ---------- */
  var form = $("signupForm");

  // Carry UTM parameters (e.g. from Facebook ads) into hidden fields so signups can be attributed.
  (function () {
    var q = new URLSearchParams(location.search);
    ["source", "medium", "campaign"].forEach(function (k) {
      var el = $("utm" + k.charAt(0).toUpperCase() + k.slice(1));
      if (el) el.value = q.get("utm_" + k) || "";
    });
  })();

  // Clear an error as soon as the user edits the field.
  ["email", "phone"].forEach(function (id) {
    $(id).addEventListener("input", function () { setErr(id + "Err"); });
  });
  ["consentEmail", "consentSms"].forEach(function (id) {
    $(id).addEventListener("change", function () { setErr(id + "Err"); });
  });

  function setErr(id, msg) {
    var el = $(id);
    el.textContent = msg || "";
    // The error text belongs to the field with the matching id (emailErr -> email) or to the checkbox before it.
    var input = $(id.replace(/Err$/, ""));
    if (input) input.setAttribute("aria-invalid", msg ? "true" : "false");
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = form.email.value.trim();
    var phone = form.phone.value.replace(/[\s\-/]/g, "");
    var ok = true, first = null;
    function bad(id, msg, field) { setErr(id, msg); ok = false; if (!first) first = field; }

    setErr("emailErr"); setErr("phoneErr"); setErr("consentEmailErr"); setErr("consentSmsErr");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) bad("emailErr", "Vpišite veljaven e-poštni naslov.", form.email);
    if (phone && !/^(\+386|00386|0)[1-9]\d{7}$/.test(phone)) bad("phoneErr", "Vpišite veljavno številko, npr. 041 123 456.", form.phone);
    if (!form.consentEmail.checked) bad("consentEmailErr", "Za prijavo je potrebno soglasje za e-pošto.", form.consentEmail);
    if (phone && !form.consentSms.checked) bad("consentSmsErr", "Za SMS obveščanje potrdite soglasje ali izbrišite telefonsko številko.", form.consentSms);
    if (!ok) { first.focus(); return; }

    // TODO (production): send { email, name, phone, consentEmail, consentSms, utm_source, utm_medium, utm_campaign, timestamp }
    // to Brevo or Mailchimp here (form endpoint or API via a small serverless function).
    // Also fire the Meta Pixel "Lead" event here once the pixel is enabled in index.html.
    var utm = { s: form.utm_source.value, m: form.utm_medium.value, c: form.utm_campaign.value };
    form.reset();
    form.utm_source.value = utm.s; form.utm_medium.value = utm.m; form.utm_campaign.value = utm.c;
    $("formSuccess").hidden = false;
  });
})();


