# Diced Meal Prep website redesign

Clickable design for dicedmealprep.co.uk: homepage, Menu, Meal Packs and Subscriptions.
Layout inspired by Frive; colours from the Diced logo (bright green #2CAC28), on a light page.

**Current stage: 2, skeleton.** Black and white with grey boxes on purpose, so the structure can be
checked before colour, photos and movement go on.

Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 4173

Order buttons link to the live shop at dicedmealprep.co.uk for now.

- `assets/js/meals.js`: menu data taken from the live shop (meals, macros, prices, packs, bundles)
- `assets/js/site.js`: shared header and footer, delivery countdown, sliders, menu filters, pack and subscription builder
- `assets/css/site.css`: tokens and layout (palette tokens are swapped at stage 4)
