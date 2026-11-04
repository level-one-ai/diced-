# Diced Meal Prep website redesign

Clickable design for dicedmealprep.co.uk: homepage, Menu, Meal Packs and Subscriptions.
Layout inspired by Frive; colours from the Diced logo (bright green #2CAC28), on a light page.

**Current stage: 4, colour and motion.** Light page, logo green panels and bands, gold outlines on deals and codes. Photos are still labelled placeholders.

Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 4173

Order buttons link to the live shop at dicedmealprep.co.uk for now.

- `assets/js/meals.js`: menu data taken from the live shop (meals, macros, prices, packs, bundles)
- `assets/js/site.js`: shared header and footer, delivery countdown, sliders, menu filters, pack and subscription builder
- `assets/css/site.css`: tokens and layout (palette tokens are swapped at stage 4)
- `assets/js/motion.js`: scroll motion (GSAP + ScrollTrigger, Lenis smooth scroll on desktop only). Every effect respects reduced motion and the CSS default is fully visible.
