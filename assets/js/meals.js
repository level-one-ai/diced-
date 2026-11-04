/* Diced menu data, taken from dicedmealprep.co.uk/view-menu (Nov 2026).
   Macros are per lean serving. Images hotlink the live shop until the real
   build pulls from WooCommerce. `tags` drive the homepage tabs and menu filters. */

const IMG = "https://dicedmealprep.co.uk/wp-content/uploads/";

window.DICED_MEALS = [
  { slug: "sunday-roast", name: "Sunday Roast", desc: "Roast tatties, Yorkshire pudding, honey glazed carrots and greens, with red wine jus.", p: 52, kcal: 685, c: 62, f: 26, price: 14.99, allergens: 5, cat: "standard", tags: ["new"], img: IMG + "2026/09/sunday-roast-sirloin-600x800.jpg" },
  { slug: "wagyu-melter", name: "Wagyu Melter", desc: "Wagyu beef burger over linguine in sugo, with melted protein cheese and parmesan.", p: 62, kcal: 708, c: 49, f: 30, price: 12.75, allergens: 3, cat: "standard", tags: ["new", "burgers"], img: IMG + "2026/09/wagyu-melter-600x600.jpg" },
  { slug: "sirloin-steak-stew", name: "Sirloin Steak Stew", desc: "Slow-cooked sirloin with baby potatoes, carrots and a rich onion gravy.", p: 48, kcal: 448, c: 38, f: 12, price: 12.75, allergens: 4, cat: "standard", tags: ["new"], img: IMG + "2026/03/E0C12857-FBB5-4D05-8833-C0E0D7F20C15-600x898.jpg" },
  { slug: "sausage-and-mash", name: "Sausage & Mash", desc: "Pork sausages, baby crushed potatoes, honey glazed carrots and greens, red wine jus.", p: 30, kcal: 458, c: 48, f: 16, price: 8.75, allergens: 2, cat: "standard", tags: ["new", "veg"], img: IMG + "2026/03/7C6899ED-D88E-46CD-BD9F-091BB20742B5-600x898.jpg" },
  { slug: "chicken-scotch-broth", name: "Chicken Scotch Broth", desc: "A proper Scottish broth, packed with chicken, barley and root veg.", p: 52, kcal: 372, c: 23, f: 6, price: 6.49, allergens: 1, cat: "standard", tags: ["new", "glp"], img: IMG + "2026/09/scotch-broth-600x750.jpg" },
  { slug: "sirloin-steak-sunday-roast-wrap", name: "Sirloin Steak Sunday Roast Wrap", desc: "The whole Sunday roast, wrapped up and ready to go.", p: 31, kcal: 525, c: 62, f: 17, price: 9.99, allergens: 7, cat: "standard", tags: ["burgers"], img: IMG + "2026/10/sirloin-steak-sunday-roast-wrap-1-600x800.jpg" },
  { slug: "chicken-and-rice", name: "Chicken & Rice", desc: "The classic. Seasoned chicken breast with fluffy rice.", p: 41, kcal: 491, c: 41, f: 17, price: 7.75, allergens: 0, cat: "standard", tags: ["popular", "protein"], img: IMG + "2026/03/5203c677-1045-4b9e-8119-c0c67fa042fd-600x900.png" },
  { slug: "chicken-pesto-pasta", name: "Chicken Pesto Pasta", desc: "Chicken breast in a creamy basil pesto with pasta.", p: 60, kcal: 612, c: 47, f: 18, price: 7.75, allergens: 0, cat: "standard", tags: ["popular", "pasta"], img: IMG + "2026/03/52150620-1FEE-4889-BD98-97313D42F16B-600x898.jpg" },
  { slug: "chicken-protein-pizza", name: "Chicken Protein Pizza", desc: "A high-protein base loaded with chicken and melted cheese.", p: 42, kcal: 352, c: 28, f: 8, price: 7.75, allergens: 0, cat: "standard", tags: ["popular", "glp"], img: IMG + "2026/03/CHICKEN-PIZZA-600x898.webp" },
  { slug: "chinese-chicken-curry", name: "Chinese Chicken Curry", desc: "Takeaway-style curry sauce with chicken and rice.", p: 51, kcal: 468, c: 45, f: 7, price: 7.75, allergens: 0, cat: "standard", tags: ["popular", "protein"], img: IMG + "2026/03/1BE3DBDF-1309-49B4-8B17-09EF1D63ADA9-600x898.jpg" },
  { slug: "creamy-chicken-fajita-pasta", name: "Creamy Chicken Fajita Pasta", desc: "Smoky fajita chicken in a creamy sauce with pasta.", p: 56, kcal: 497, c: 47, f: 8, price: 7.75, allergens: 0, cat: "standard", tags: ["popular", "pasta"], img: IMG + "2026/03/A8CE2E4E-70C8-4DF2-84B3-243214EA8743-600x898.jpg" },
  { slug: "angus-beef-keema", name: "Angus Beef Keema with Rice", desc: "Spiced Angus beef mince with peas and rice.", p: 44, kcal: 448, c: 44, f: 11, price: 7.75, allergens: 1, cat: "standard", tags: ["protein"], img: IMG + "2026/08/angus-beef-keema.jpg" },
  { slug: "bbq-pulled-pork", name: "BBQ Pulled Pork", desc: "Slow-cooked pulled pork in a sticky BBQ sauce.", p: 45, kcal: 437, c: 24, f: 18, price: 7.75, allergens: 4, cat: "standard", tags: ["protein"], img: IMG + "2026/03/043f3610-843d-47f1-b13d-e751df771686-600x900.png" },
  { slug: "cheeky-chicken-wrap", name: "Cheeky Chicken Wrap", desc: "Peri-style chicken, crunchy salad and sauce in a toasted wrap.", p: 63, kcal: 516, c: 33, f: 13, price: 7.75, allergens: 6, cat: "standard", tags: ["burgers", "veg"], img: IMG + "2026/03/93d48980-bdac-4b54-b463-de6ff0e5bd57-600x600.png" },
  { slug: "chicken-bacon-penne-alfredo", name: "Chicken & Bacon Penne Alfredo", desc: "Chicken and smoky bacon in a rich alfredo sauce.", p: 74, kcal: 591, c: 45, f: 11, price: 8.75, allergens: 4, cat: "standard", tags: ["pasta", "veg", "protein"], img: IMG + "2026/03/1c47d410-fa23-47d8-b686-81842324dc21-600x400.png" },
  { slug: "chicken-chorizo-linguine", name: "Chicken & Chorizo Linguine", desc: "Chicken and chorizo tossed through linguine in a tomato sauce.", p: 57, kcal: 518, c: 45, f: 10, price: 7.75, allergens: 3, cat: "standard", tags: ["pasta", "veg"], img: IMG + "2026/03/F3E123FC-180E-4D68-83B3-3C7F17ADF758-600x898.jpg" },
  { slug: "chicken-mushroom-protein-pizza", name: "Chicken & Mushroom Protein Pizza", desc: "Chicken, mushrooms and cheese on a high-protein base.", p: 42, kcal: 352, c: 28, f: 8, price: 7.75, allergens: 2, cat: "standard", tags: ["glp"], img: IMG + "2026/06/a39652a1-d45f-4ab1-9990-3f35b9321fdd-600x900.png" },
  { slug: "chicken-fajita-power-bowl", name: "Chicken Fajita Power Bowl", desc: "Fajita chicken, peppers and onions. Big protein, low carb.", p: 60, kcal: 368, c: 8, f: 9, price: 7.75, allergens: 0, cat: "standard", tags: ["glp", "protein"], img: IMG + "2026/05/PHOTO-2026-05-07-18-09-40-2-600x800.jpg" },
  { slug: "chicken-fajita-wrap", name: "Chicken Fajita Wrap", desc: "Fajita chicken, peppers and sauce in a soft wrap.", p: 64, kcal: 534, c: 35, f: 13, price: 7.75, allergens: 0, cat: "standard", tags: ["burgers", "protein"], img: IMG + "2026/05/PHOTO-2026-05-07-18-09-40-600x565.jpg" },
  { slug: "chicken-tikka-masala", name: "Chicken Tikka Masala", desc: "Tender chicken tikka in a creamy masala sauce with rice.", p: 51, kcal: 473, c: 45, f: 8, price: 7.75, allergens: 0, cat: "standard", tags: ["protein"], img: IMG + "2026/03/CFC6E288-2273-4ECE-A1FE-5CB769DBE0FF-600x401.jpg" },
  { slug: "creamy-chicken-fajita-rice-box", name: "Creamy Chicken Fajita Rice Box", desc: "Creamy fajita chicken over seasoned rice.", p: 51, kcal: 446, c: 43, f: 6, price: 7.75, allergens: 0, cat: "standard", tags: ["protein"], img: IMG + "2026/03/E3A000BB-DBBD-4D9B-BD13-1904454430A1-600x898.jpg" },
  { slug: "dirty-doner-kebab-wedges", name: "Dirty Doner Kebab Wedges", desc: "Doner meat over seasoned wedges with garlic and chilli sauce.", p: 43, kcal: 609, c: 56, f: 24, price: 7.75, allergens: 0, cat: "standard", tags: ["burgers"], img: IMG + "2026/07/PHOTO-2026-07-09-19-04-23-600x599.jpg" },
  { slug: "dirty-mac-and-cheese", name: "Dirty Mac & Cheese", desc: "Loaded protein mac and cheese.", p: 59, kcal: 557, c: 60, f: 8, price: 7.75, allergens: 0, cat: "standard", tags: ["pasta"], img: IMG + "2026/05/PHOTO-2026-05-05-16-51-47-600x600.jpg" },
  { slug: "dirty-salt-pepper-chicken-wedges", name: "Dirty Salt & Pepper Chicken Wedges", desc: "Salt and pepper chicken with onions, peppers and wedges.", p: 27, kcal: 532, c: 61, f: 20, price: 7.75, allergens: 0, cat: "standard", tags: ["burgers"], img: IMG + "2026/03/178-2-600x800.jpg" }
];

/* Menu categories as listed on the live shop. Counts are the live totals. */
window.DICED_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "standard", label: "Standard Meals" },
  { id: "premium", label: "Premium Meals" },
  { id: "spud", label: "Protein Spud Tubs" },
  { id: "glp", label: "GLP Friendly" },
  { id: "salads", label: "Salads" },
  { id: "veg", label: "Vegetarian" },
  { id: "gf", label: "Gluten Free" },
  { id: "pancakes", label: "Protein Pancakes" },
  { id: "cheesecakes", label: "Protein Cheesecakes" },
  { id: "granola", label: "Protein Granola" },
  { id: "oats", label: "Protein Oats" }
];

/* Meal pack sizes and subscription plans from the live site. */
window.DICED_PACKS = [
  { size: 5, save: 0.05, clearpay: 8.89 },
  { size: 10, save: 0.10, clearpay: 16.85 },
  { size: 15, save: 0.15, clearpay: 23.87 },
  { size: 20, save: 0.20, clearpay: 29.96, popular: true },
  { size: 50, save: null, fixed: 274.99, clearpay: 68.75 }
];

window.DICED_BUNDLES = [
  { name: "Protein Pancake Bundle", meals: 3, price: 9.99 },
  { name: "Protein Cheesecake Bundle", meals: 4, price: 9.99 },
  { name: "Protein Granola Bundle", meals: 4, price: 9.99 },
  { name: "Protein Oats Bundle", meals: 3, price: 9.99 },
  { name: "Wrap Bundle", meals: 3, price: 14.99 }
];
