/* Diced Meal Prep. Shared chrome and page behaviour (no motion at Stage 2). */
(() => {
  const SHOP = "https://dicedmealprep.co.uk";
  const meals = window.DICED_MEALS || [];
  const page = document.body.dataset.page;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = (n) => "£" + n.toFixed(2);

  /* Icons: Lucide (ISC licence), one stroke weight */
  const ICONS = {
    "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    "arrow-left": '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    timer: '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>',
    "chef-hat": '<path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/>',
    "chart-column": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    "heart-pulse": '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>',
    "scan-barcode": '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 7v10"/><path d="M12 7v10"/><path d="M17 7v10"/>',
    "credit-card": '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
    snowflake: '<line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/>',
    "shopping-bag": '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
    "list-checks": '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
    sliders: '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'
  };
  const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  const svg = name => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ""}</svg>`;
  function paintIcons(root = document) {
    $$("[data-icon]", root).forEach(el => { if (!el.firstChild) el.innerHTML = svg(el.dataset.icon); });
    $$("[data-icon-inline]", root).forEach(el => { el.outerHTML = svg(el.dataset.iconInline); });
    $$(".arrow, .arrow-plain", root).forEach(el => { el.innerHTML = svg("arrow-right"); });
    $$("[data-stars]", root).forEach(el => { if (!el.firstChild) el.innerHTML = STAR.repeat(5); });
    $$(".code-chip[data-copy]", root).forEach(el => { if (!el.querySelector("svg")) el.insertAdjacentHTML("beforeend", svg("copy")); });
  }
  const WORDMARK = '<span class="wm">Diced</span><span class="wm-sub">Meal prep</span>';

  /* ---------- Header + footer (one source for all four pages) ---------- */
  const NAV = [
    { href: "menu.html", label: "Menu", id: "menu" },
    { href: "meal-packs.html", label: "Meal Packs", id: "packs" },
    { href: "subscriptions.html", label: "Subscriptions", id: "subs" },
    { href: "index.html#how", label: "How it works", id: "how" },
    { href: SHOP + "/contact-us/", label: "Help", id: "help" }
  ];
  const navLinks = NAV.map(n => `<li><a href="${n.href}"${n.id === page ? ' aria-current="page"' : ""}>${n.label}</a></li>`).join("");

  const headerEl = $("#site-header");
  if (headerEl) headerEl.outerHTML = `
    <div class="offer-bar" role="region" aria-label="Offer">
      <span><strong>20% OFF YOUR FIRST ORDER</strong> with code <button class="code-chip" type="button" data-copy="FIRSTORDER" aria-label="Copy code FIRSTORDER">FIRSTORDER</button></span>
      <span class="countdown" data-countdown>Order soon for the next delivery</span>
    </div>
    <header class="site-header">
      <div class="wrap">
        <a class="logo" href="index.html" aria-label="Diced Meal Prep home">${WORDMARK}</a>
        <nav class="primary-nav" aria-label="Main"><ul>${navLinks}</ul></nav>
        <div class="header-actions">
          <a class="login" href="${SHOP}/my-account/">Log in</a>
          <a class="cart-btn" href="${SHOP}/cart/" aria-label="Basket, 0 items"><span data-icon-inline="shopping-bag"></span><span class="count" aria-hidden="true">0</span></a>
          <a class="btn btn-primary btn-sm header-order" href="menu.html">Order now <span class="arrow" aria-hidden="true">&rarr;</span></a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu"><span></span></button>
        </div>
      </div>
      <div class="mobile-nav" id="mobile-nav" hidden>
        <ul>${navLinks}<li><a href="${SHOP}/my-account/">Log in</a></li></ul>
        <a class="btn btn-primary" href="menu.html">Order now <span class="arrow" aria-hidden="true">&rarr;</span></a>
      </div>
    </header>`;

  const footerEl = $("#site-footer");
  if (footerEl) footerEl.outerHTML = `
    <section class="register-strip" aria-label="Register offer">
      <div class="wrap">
        <p><strong>Get £5 off your first order.</strong> <span class="muted">Register and we will email you a unique code.</span></p>
        <a class="btn btn-ghost" href="${SHOP}/register/">Register and get £5 off</a>
      </div>
    </section>
    <footer class="site-footer">
      <div class="wrap">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="logo" href="index.html" aria-label="Diced Meal Prep home">${WORDMARK}</a>
            <p class="muted">Chef-prepared meals, cooked fresh to order in Edinburgh and delivered chilled across the UK every Wednesday and Sunday.</p>
            <div class="socials">
              <a class="btn btn-ghost btn-sm" href="https://www.instagram.com/dicedmealprep/">Instagram</a>
              <a class="btn btn-ghost btn-sm" href="https://www.facebook.com/dicedmealprep1/">Facebook</a>
            </div>
          </div>
          <div>
            <h2>Order</h2>
            <ul>
              <li><a href="menu.html">Full menu</a></li>
              <li><a href="meal-packs.html">Meal packs</a></li>
              <li><a href="subscriptions.html">Subscriptions</a></li>
              <li><a href="menu.html?cat=glp">GLP friendly meals</a></li>
              <li><a href="${SHOP}/view-menu/">Gift cards</a></li>
            </ul>
          </div>
          <div>
            <h2>Help</h2>
            <ul>
              <li><a href="${SHOP}/contact-us/">Contact us</a></li>
              <li><a href="${SHOP}/contact-us/">Ask Diced AI</a></li>
              <li><a href="${SHOP}/my-account/">My account</a></li>
              <li><a href="index.html#how">Delivery and collection</a></li>
            </ul>
          </div>
          <div>
            <h2>Visit the kitchen</h2>
            <address>
              <span>Diced Scotland Ltd</span>
              <span>16 Southfield Place</span>
              <span>Edinburgh EH15 1LZ</span>
              <span class="muted">7 days, 9am to 3pm</span>
              <a href="mailto:dicedmealprep@outlook.com">dicedmealprep@outlook.com</a>
            </address>
          </div>
        </div>
        <div class="footer-base">
          <span>&copy; 2026 Diced Scotland Ltd</span>
          <span>Pay in 4 interest-free with Clearpay</span>
          <span>Every meal is on MyFitnessPal</span>
        </div>
      </div>
    </footer>
    <a class="ai-fab" href="${SHOP}/contact-us/"><span class="icon" data-icon="sparkles" aria-hidden="true"></span><span class="label">Ask Diced AI</span></a>`;

  /* Mobile nav */
  const toggle = $(".menu-toggle");
  const mnav = $("#mobile-nav");
  if (toggle && mnav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      mnav.hidden = open;
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !mnav.hidden) { mnav.hidden = true; toggle.setAttribute("aria-expanded", "false"); toggle.focus(); }
    });
  }

  /* ---------- Delivery countdown ----------
     Wednesday delivery: order by Sunday 11:59pm. Sunday delivery: order by Thursday 11:59pm. */
  function nextCutoff(now = new Date()) {
    const cut = [{ dow: 0, deliver: "Wednesday" }, { dow: 4, deliver: "Sunday" }];
    let best = null;
    for (const c of cut) {
      const d = new Date(now);
      d.setHours(23, 59, 0, 0);
      d.setDate(d.getDate() + ((c.dow - d.getDay() + 7) % 7));
      if (d <= now) d.setDate(d.getDate() + 7);
      if (!best || d < best.at) best = { at: d, deliver: c.deliver };
    }
    return best;
  }
  function tick() {
    const { at, deliver } = nextCutoff();
    const ms = at - new Date();
    const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60;
    const left = d > 0 ? `${d}d ${h}h` : `${h}h ${m}m`;
    $$("[data-countdown]").forEach(el => { el.innerHTML = `Order in <b class="num">${left}</b> for ${deliver} delivery`; });
  }
  tick(); setInterval(tick, 30000);

  /* ---------- Meal card ---------- */
  const macroRow = m => `<div class="macros" aria-label="Per lean serving">
      <div><b>${m.p}g</b><span>Protein</span></div><div><b>${m.kcal}</b><span>Kcal</span></div>
      <div><b>${m.c}g</b><span>Carbs</span></div><div><b>${m.f}g</b><span>Fat</span></div></div>`;
  const badges = m => {
    const b = [];
    if (m.tags.includes("new")) b.push(["New", "new"]);
    if (m.tags.includes("popular")) b.push(["Popular", ""]);
    if (m.tags.includes("glp")) b.push(["GLP friendly", ""]);
    return `<div class="badges">${b.map(([x, c]) => `<span class="badge ${c}">${x}</span>`).join("")}</div>`;
  };
  const mealCard = m => `<article class="meal-card">
      <div class="media"><div class="slot" role="img" aria-label="${m.name}"><b>Meal photo</b><span>4:5</span></div></div>
      ${badges(m)}
      <h3><a href="${SHOP}/product/${m.slug}/">${m.name}</a></h3>
      ${macroRow(m)}
      <div class="meal-foot"><span class="price">${money(m.price)}</span>
        <a class="btn btn-ghost btn-sm" href="${SHOP}/product/${m.slug}/">Add <span aria-hidden="true">+</span><span class="visually-hidden"> ${m.name}</span></a></div>
    </article>`;

  function rendered(el) {
    paintIcons(el);
    document.dispatchEvent(new CustomEvent("diced:rendered", { detail: el }));
  }

  /* ---------- Sliders ---------- */
  function wireSlider(root) {
    const track = $(".slider-track", root);
    const prev = $("[data-prev]", root), next = $("[data-next]", root);
    if (!track || !prev || !next) return;
    const step = () => track.clientWidth * 0.8;
    prev.addEventListener("click", () => track.scrollBy({ left: -step() }));
    next.addEventListener("click", () => track.scrollBy({ left: step() }));
    // Arrow states from an observer on the first and last card, not a scroll listener.
    let io = null;
    const update = () => {
      if (io) io.disconnect();
      const first = track.firstElementChild, last = track.lastElementChild;
      if (!first || !("IntersectionObserver" in window)) { prev.disabled = next.disabled = !first; return; }
      io = new IntersectionObserver(entries => entries.forEach(en => {
        if (en.target === first) prev.disabled = en.intersectionRatio > 0.95;
        if (en.target === last) next.disabled = en.intersectionRatio > 0.95;
      }), { root: track, threshold: [0, 0.95, 1] });
      io.observe(first); if (last !== first) io.observe(last);
    };
    update();
    return update;
  }

  /* ---------- Home: tabbed meal slider ---------- */
  if (page === "home") {
    const track = $("#meal-track");
    const filters = {
      new: m => m.tags.includes("new"),
      popular: m => m.tags.includes("popular"),
      burgers: m => m.tags.includes("burgers"),
      pasta: m => m.tags.includes("pasta"),
      protein: m => m.p >= 50,
      glp: m => m.tags.includes("glp"),
      veg: m => m.tags.includes("veg")
    };
    const sliderRoot = $("#menu-slider");
    const update = wireSlider(sliderRoot);
    const show = key => {
      track.innerHTML = meals.filter(filters[key]).map(mealCard).join("");
      track.scrollLeft = 0;
      update && update();
      rendered(track);
    };
    $$("#meal-tabs [role=tab]").forEach(tab => tab.addEventListener("click", () => {
      $$("#meal-tabs [role=tab]").forEach(t => t.setAttribute("aria-selected", String(t === tab)));
      show(tab.dataset.filter);
    }));
    show("new");
    wireSlider($("#reviews-slider"));
  }

  /* ---------- Menu page ---------- */
  if (page === "menu") {
    const grid = $("#meal-grid");
    const count = $("#result-count");
    const cats = window.DICED_CATEGORIES;
    const params = new URLSearchParams(location.search);
    const state = { cat: params.get("cat") || "all", sort: "popular", kcal: "all", protein: 0, veg: false, gf: false, limit: 12 };

    $("#cat-tabs").innerHTML = cats.map(c => `<button class="tab" type="button" aria-pressed="${c.id === state.cat}" data-cat="${c.id}">${c.label}</button>`).join("");
    $$("#cat-tabs .tab").forEach(b => b.addEventListener("click", () => {
      state.cat = b.dataset.cat; state.limit = 12;
      $$("#cat-tabs .tab").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      render();
    }));

    const inCat = m => {
      if (state.cat === "all") return true;
      if (state.cat === "glp") return m.tags.includes("glp");
      if (state.cat === "veg") return m.tags.includes("veg");
      return m.cat === state.cat;
    };
    const sorters = {
      popular: (a, b) => (b.tags.includes("popular") - a.tags.includes("popular")),
      newest: (a, b) => (b.tags.includes("new") - a.tags.includes("new")),
      az: (a, b) => a.name.localeCompare(b.name),
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
      kcalAsc: (a, b) => a.kcal - b.kcal,
      proteinDesc: (a, b) => b.p - a.p
    };
    const kcalOk = m => state.kcal === "all" || (state.kcal === "lt400" && m.kcal < 400) || (state.kcal === "400" && m.kcal >= 400 && m.kcal < 500) || (state.kcal === "500" && m.kcal >= 500 && m.kcal < 600) || (state.kcal === "600" && m.kcal >= 600);

    function render() {
      const list = meals.filter(m => inCat(m) && kcalOk(m) && m.p >= state.protein && (!state.veg || m.tags.includes("veg"))).sort(sorters[state.sort]);
      count.textContent = `${list.length} meal${list.length === 1 ? "" : "s"}`;
      if (!list.length) {
        grid.innerHTML = `<div class="empty-state"><h3>No meals match those filters</h3><p class="muted">Try removing a filter, or see every meal in the full shop.</p><button class="btn btn-ghost" type="button" data-clear>Clear filters</button></div>`;
        $("[data-clear]", grid).addEventListener("click", clearFilters);
        $("#load-more").hidden = true;
        return;
      }
      const shown = list.slice(0, state.limit).map(mealCard);
      if (shown.length > 6) shown.splice(6, 0, $("#upsell-tpl").innerHTML);
      grid.innerHTML = shown.join("");
      rendered(grid);
      $("#load-more").hidden = list.length <= state.limit;
    }
    function clearFilters() {
      $("#filters").reset();
      Object.assign(state, { kcal: "all", protein: 0, veg: false, gf: false, cat: "all" });
      $$("#cat-tabs .tab").forEach(x => x.setAttribute("aria-pressed", String(x.dataset.cat === "all")));
      render();
    }
    $("#sort").addEventListener("change", e => { state.sort = e.target.value; render(); });
    $("#filters").addEventListener("change", () => {
      const f = new FormData($("#filters"));
      state.kcal = f.get("kcal") || "all";
      state.protein = Number(f.get("protein") || 0);
      state.veg = f.has("veg"); state.gf = f.has("gf");
      render();
    });
    const ft = $("#filters-toggle"), fp = $("#filters");
    ft.addEventListener("click", () => {
      const open = ft.getAttribute("aria-expanded") === "true";
      ft.setAttribute("aria-expanded", String(!open)); fp.hidden = open;
    });
    $("#load-more button").addEventListener("click", () => { state.limit += 12; render(); });
    render();
  }

  /* ---------- Builder: meal packs and subscriptions ---------- */
  const builder = $("[data-builder]");
  if (builder) {
    const mode = builder.dataset.builder; // "pack" | "sub"
    const picker = $("#picker");
    const qty = {};
    const sizeOf = () => Number(($("input[name=size]:checked") || {}).value || 0);
    const saveOf = () => {
      const el = $("input[name=size]:checked");
      return el ? Number(el.dataset.save || 0) : 0;
    };
    const fixedOf = () => {
      const el = $("input[name=size]:checked");
      return el && el.dataset.fixed ? Number(el.dataset.fixed) : null;
    };
    const total = () => Object.values(qty).reduce((a, b) => a + b, 0);

    picker.innerHTML = meals.map(m => `<div class="pick" data-slug="${m.slug}">
        <div class="slot" role="img" aria-label="${m.name}"><b>Meal photo</b><span>1:1</span></div>
        <h3>${m.name}</h3>
        <p class="meta">${m.p}g protein · ${m.kcal} kcal · ${money(m.price)}</p>
        <div class="stepper" role="group" aria-label="${m.name} quantity">
          <button type="button" data-dec aria-label="Remove one ${m.name}">&minus;</button>
          <output aria-live="polite">0</output>
          <button type="button" data-inc aria-label="Add one ${m.name}">+</button>
        </div></div>`).join("");

    function update() {
      const size = sizeOf(), n = total();
      $$(".pick", picker).forEach(p => {
        const q = qty[p.dataset.slug] || 0;
        $("output", p).textContent = q;
        $("[data-dec]", p).disabled = q === 0;
        $("[data-inc]", p).disabled = n >= size;
      });
      const raw = Object.entries(qty).reduce((s, [slug, q]) => s + q * meals.find(m => m.slug === slug).price, 0);
      const fixed = fixedOf();
      const price = fixed !== null && n === size ? fixed : raw * (1 - saveOf());
      const saved = Math.max(0, raw - price);
      $("#sum-count").textContent = `${n} / ${size} meals picked`;
      $("#sum-total").textContent = mode === "sub"
        ? `${money(price)} a week${saved > 0 ? ` · saving ${money(saved)}` : ""}`
        : `Estimated ${money(price)}${saved > 0 ? ` · you save ${money(saved)}` : ""}`;
      $(".progress i").style.transform = `scaleX(${size ? Math.min(1, n / size) : 0})`;
      const done = n === size && size > 0;
      const cta = $("#sum-cta");
      cta.setAttribute("aria-disabled", String(!done));
      cta.textContent = done ? (mode === "sub" ? "Subscribe now" : "Add pack to basket") : `Pick ${size - n} more`;
    }
    picker.addEventListener("click", e => {
      const btn = e.target.closest("button"); if (!btn) return;
      const slug = btn.closest(".pick").dataset.slug;
      if (btn.hasAttribute("data-inc") && total() < sizeOf()) qty[slug] = (qty[slug] || 0) + 1;
      if (btn.hasAttribute("data-dec") && qty[slug]) qty[slug] -= 1;
      update();
    });
    $$("input[name=size]").forEach(r => r.addEventListener("change", () => {
      // Trim picks if the pack got smaller
      let over = total() - sizeOf();
      for (const k of Object.keys(qty).reverse()) { while (over > 0 && qty[k] > 0) { qty[k]--; over--; } }
      update();
    }));
    $("#sum-cta").addEventListener("click", e => {
      if (e.currentTarget.getAttribute("aria-disabled") === "true") { e.preventDefault(); picker.scrollIntoView({ block: "start" }); }
    });
    document.body.classList.add("has-summary");
    update();
  }

  /* Delivery dates: the next 8 Wednesday and Sunday drops */
  const dateRow = $("#date-row");
  if (dateRow) {
    const out = []; const d = new Date(); d.setHours(12, 0, 0, 0);
    while (out.length < 8) { d.setDate(d.getDate() + 1); if (d.getDay() === 0 || d.getDay() === 3) out.push(new Date(d)); }
    dateRow.innerHTML = out.map((x, i) => `<label class="option"><input type="radio" name="date" value="${x.toISOString().slice(0, 10)}"${i === 0 ? " checked" : ""}>
      <span class="face"><span class="day">${x.toLocaleDateString("en-GB", { weekday: "short" })}</span><span class="date">${x.getDate()}</span><span class="sub">${x.toLocaleDateString("en-GB", { month: "short" })}</span></span></label>`).join("");
  }
  /* Copy a discount code */
  document.addEventListener("click", e => {
    const chip = e.target.closest(".code-chip[data-copy]"); if (!chip) return;
    const code = chip.dataset.copy;
    const done = () => {
      chip.setAttribute("data-copied", ""); chip.setAttribute("aria-label", `Code ${code} copied`);
      setTimeout(() => { chip.removeAttribute("data-copied"); chip.setAttribute("aria-label", `Copy code ${code}`); }, 1600);
    };
    try {
      const p = navigator.clipboard && navigator.clipboard.writeText(code);
      if (p) p.then(done, () => selectText(chip)); else selectText(chip);
    } catch (_) { selectText(chip); }
  });
  function selectText(el) { const r = document.createRange(); r.selectNodeContents(el); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); }

  paintIcons();
  window.DICED = { paintIcons };
})();
