/* Diced Meal Prep. Shared chrome and page behaviour (no motion at Stage 2). */
(() => {
  const SHOP = "https://dicedmealprep.co.uk";
  const meals = window.DICED_MEALS || [];
  const page = document.body.dataset.page;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = (n) => "£" + n.toFixed(2);

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
      <span><strong>20% OFF YOUR FIRST ORDER</strong> with code <strong>FIRSTORDER</strong></span>
      <span class="countdown" data-countdown>Order soon for the next delivery</span>
    </div>
    <header class="site-header">
      <div class="wrap">
        <a class="logo" href="index.html" aria-label="Diced Meal Prep home"><div class="slot"><b>Logo</b></div></a>
        <nav class="primary-nav" aria-label="Main"><ul>${navLinks}</ul></nav>
        <div class="header-actions">
          <a class="login" href="${SHOP}/my-account/">Log in</a>
          <a class="cart-btn" href="${SHOP}/cart/" aria-label="Basket, 0 items"><span aria-hidden="true" class="icon-slot" style="width:18px;height:18px"></span><span class="count" aria-hidden="true">0</span></a>
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
            <a class="logo" href="index.html" aria-label="Diced Meal Prep home"><div class="slot"><b>Logo</b></div></a>
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
    <a class="ai-fab" href="${SHOP}/contact-us/"><span class="icon-slot" aria-hidden="true"></span><span class="label">Ask Diced AI</span></a>`;

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
    if (m.tags.includes("new")) b.push("New");
    if (m.tags.includes("popular")) b.push("Popular");
    if (m.tags.includes("glp")) b.push("GLP friendly");
    return b.length ? `<div class="badges">${b.map(x => `<span class="badge">${x}</span>`).join("")}</div>` : "";
  };
  const mealCard = m => `<article class="meal-card">
      <div class="slot" role="img" aria-label="${m.name}"><b>Meal photo</b><span>4:5</span></div>
      ${badges(m)}
      <h3><a href="${SHOP}/product/${m.slug}/">${m.name}</a></h3>
      ${macroRow(m)}
      <div class="meal-foot"><span class="price">${money(m.price)}</span>
        <a class="btn btn-ghost btn-sm" href="${SHOP}/product/${m.slug}/">Add <span aria-hidden="true">+</span><span class="visually-hidden"> ${m.name}</span></a></div>
    </article>`;

  /* ---------- Sliders ---------- */
  function wireSlider(root) {
    const track = $(".slider-track", root);
    const prev = $("[data-prev]", root), next = $("[data-next]", root);
    if (!track || !prev || !next) return;
    const step = () => track.clientWidth * 0.8;
    const update = () => {
      prev.disabled = track.scrollLeft < 8;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    };
    prev.addEventListener("click", () => track.scrollBy({ left: -step() }));
    next.addEventListener("click", () => track.scrollBy({ left: step() }));
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
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
      $(".progress i").style.width = size ? `${Math.min(100, (n / size) * 100)}%` : "0";
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
})();
