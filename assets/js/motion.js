/* Diced Meal Prep. Scroll motion: smooth and subtle.
   Frame owner: GSAP + ScrollTrigger (Lenis feeds it on desktop). No other
   animation library touches these elements.

   Beats, each with one reason:
   1. Hero builds in on load       -> hierarchy: headline, then proof, then the order button
   2. Header hides on scroll down  -> gives the food the screen; returns the moment you scroll up
   3. Photo parallax (desktop)     -> depth as you leave the hero and reach the final order panel
   4. Sections rise on entry       -> each section arrives as a group, in reading order
   5. Step photos wipe in, 1 to 4  -> the order of the steps is the story
   6. Stats count up               -> draws the eye to the proof once, then stays still
   7. Meal cards slide in on tab change -> feedback that the tab did something

   Device budget: transform/opacity/clip-path only. Lenis and parallax only on
   fine-pointer, non-low tier devices. Reduced motion: nothing moves, everything
   is already in its final state (CSS default is fully visible). */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* Header "scrolled" state: an observer on a 1px sentinel, so it works without GSAP and under reduced motion. */
  const header = $(".site-header");
  if (header && "IntersectionObserver" in window) {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:48px;pointer-events:none";
    document.body.prepend(sentinel);
    new IntersectionObserver(([e]) => header.classList.toggle("is-scrolled", !e.isIntersecting)).observe(sentinel);
    header.addEventListener("focusin", () => header.classList.remove("is-hidden"));
  }

  if (reduce || !gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  /* 2. Header tucks away on scroll down, returns on scroll up (not on the menu page, where the filter bar is pinned under it). */
  if (header && !$(".menu-bar")) {
    ScrollTrigger.create({
      start: 400, end: "max",
      onUpdate: self => {
        const navOpen = $(".menu-toggle") && $(".menu-toggle").getAttribute("aria-expanded") === "true";
        header.classList.toggle("is-hidden", self.direction === 1 && !navOpen);
      },
      onLeaveBack: () => header.classList.remove("is-hidden")
    });
  }

  function detectTier() {
    const mem = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const coarse = matchMedia("(pointer: coarse)").matches;
    if (navigator.connection && navigator.connection.saveData) return "low";
    if (mem <= 2 || cores <= 2) return "low";
    if (coarse && mem <= 4) return "mid";
    return mem >= 8 && cores >= 8 && !coarse ? "high" : "mid";
  }
  const tier = detectTier();
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const EASE = "expo.out";

  /* Smooth scroll: desktop mouse and trackpad only. Touch keeps native scrolling. */
  let lenis = null;
  if (window.Lenis && finePointer && tier !== "low") {
    lenis = new window.Lenis({ duration: 1.1, easing: t => 1 - Math.pow(1 - t, 3) });
    document.documentElement.classList.add("lenis");
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href*="#"]'); if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash); if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -88 });
      history.replaceState(null, "", url.hash);
    });
  }

  const below = el => el.getBoundingClientRect().top > innerHeight * 0.92;
  const parallaxOn = finePointer && tier !== "low" && matchMedia("(min-width: 900px)").matches;
  const BASE = parallaxOn ? 1.12 : 1;

  /* 1. Hero build on load */
  const heroPanel = $(".hero-panel");
  if (heroPanel) {
    const tl = gsap.timeline({ defaults: { ease: EASE } });
    tl.fromTo(".hero-media .slot", { scale: BASE + 0.06 }, { scale: BASE, duration: 1.4 }, 0)
      .from(heroPanel, { y: 32, opacity: 0, duration: 0.9 }, 0.1)
      .from(heroPanel.children, { y: 18, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.25);
  }
  const pageHead = $(".page-head");
  if (pageHead) gsap.from(pageHead.children, { y: 20, opacity: 0, duration: 0.8, stagger: 0.07, ease: EASE, delay: 0.05 });

  /* 4. Sections rise on entry (only what is still below the fold gets a from-state) */
  /* From-state uses opacity, never visibility, so controls stay keyboard-reachable;
     focus landing inside a waiting element reveals it at once. */
  const waiting = new Set();
  document.addEventListener("focusin", e => {
    waiting.forEach(el => {
      if (el.contains(e.target)) { waiting.delete(el); gsap.to(el, { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, overwrite: true }); }
    });
  });
  function rise(selector, opts = {}) {
    const els = $$(selector).filter(below);
    if (!els.length) return;
    els.forEach(el => waiting.add(el));
    gsap.set(els, { y: opts.y ?? 28, opacity: 0 });
    ScrollTrigger.batch(els, {
      start: "top 88%",
      once: true,
      onEnter: batch => {
        batch.forEach(el => waiting.delete(el));
        gsap.to(batch, { y: 0, opacity: 1, duration: opts.d ?? 0.9, ease: EASE, stagger: opts.stagger ?? 0.08, overwrite: true });
      }
    });
  }
  rise(".section-head");
  rise(".why-list li, .promise", { y: 20, stagger: 0.06 });
  rise(".meal-card", { y: 24, stagger: 0.06 });
  rise(".way", { y: 32, stagger: 0.1 });
  rise(".review", { y: 24, stagger: 0.08 });
  rise(".final-panel", { y: 40 });
  rise(".register-strip .wrap", { y: 16 });
  rise(".build-step, .how-subs li, .two-col", { y: 24 });
  rise(".menu-foot, .ways-note", { y: 12 });

  /* 5. How it works: photos wipe open in step order, text follows */
  const steps = $$(".step");
  if (steps.length && steps.some(below)) {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.set(steps.map(s => $(".slot", s)), { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(steps.map(s => [...s.children].slice(1)).flat(), { y: 14, opacity: 0 });
      ScrollTrigger.create({
        trigger: ".steps", start: "top 80%", once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: EASE } });
          steps.forEach((s, i) => {
            tl.to($(".slot", s), { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, i * 0.14)
              .to([...s.children].slice(1), { y: 0, opacity: 1, duration: 0.7, stagger: 0.05 }, i * 0.14 + 0.25);
          });
        }
      });
    });
    mm.add("(max-width: 767px)", () => { rise(".step", { y: 20 }); });
  }

  /* 6. Stats count up once */
  const counters = $$("[data-count]");
  if (counters.length) {
    ScrollTrigger.create({
      trigger: ".stats", start: "top 85%", once: true,
      onEnter: () => counters.forEach((el, i) => {
        const end = Number(el.dataset.count), obj = { v: 0 };
        el.style.minWidth = el.offsetWidth + "px";   // no width jitter while counting
        gsap.to(obj, {
          v: end, duration: end > 50 ? 1.6 : 1, delay: i * 0.08, ease: "power3.out",
          onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString("en-GB"); },
          onComplete: () => { el.textContent = end.toLocaleString("en-GB"); el.style.minWidth = ""; }
        });
      })
    });
    rise(".stat", { y: 16, stagger: 0.08 });
  }

  /* 3. Photo parallax: desktop, mid tier and up */
  if (parallaxOn) {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      $$("[data-parallax]").forEach(wrap => {
        const img = wrap.firstElementChild;
        if (!wrap.closest(".hero")) gsap.set(img, { scale: BASE });
        gsap.fromTo(img, { yPercent: -4 }, {
          yPercent: 4, ease: "none",
          scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: 1 }
        });
      });
    });
  }

  /* 7. Re-rendered meal lists (tab change, filters, load more) */
  document.addEventListener("diced:rendered", e => {
    const cards = $$(".meal-card, .upsell", e.detail);
    gsap.fromTo(cards, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: EASE, stagger: 0.04, overwrite: true });
  });

  /* Late fonts shift layout: re-measure trigger positions once they land */
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
  addEventListener("load", () => ScrollTrigger.refresh());
})();
