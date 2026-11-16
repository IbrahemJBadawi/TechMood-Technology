# TechMood Technology

**One Ecosystem. Many Possibilities. — منظومة واحدة، إمكانيات بلا حدود.**

The corporate website for **TechMood Technology**, the parent company that develops an ecosystem of 12 independent digital products.

موقع الشركة الأم **TechMood Technology** الذي يعرض منظومة 12 منتجًا رقميًا مستقلًا، مع روابطها ومجالات عمل الشركة.

## Website / الموقع

Open `index.html` in a browser or serve the directory with any static web server. No build step, API keys, database, or environment variables are required. Deployable as a static site to Vercel.

يمكن تشغيل الموقع مباشرة بفتح `index.html` أو باستخدام خادم ملفات ثابت. لا يحتاج الموقع إلى قاعدة بيانات أو مفاتيح أو خطوات بناء.

**Features / المزايا**
- Responsive Arabic (RTL) and English (LTR) experience.
- Light and dark themes, with saved preferences.
- Twelve venture cards, search, sector filters, and accessible details.
- Verified public website links only; no invented destinations or launch statuses.
- Reused original brand mark from TechMood's public `techmood` repository.

## Product links / روابط المنتجات

| Product | Verified published URL |
| --- | --- |
| TechMood Platform (MentorMood) | https://techmoodtech.com |
| Capital Digital Market (Gaza Online Market) | https://capital-digital-market.vercel.app |
| AlJamal Store | https://aljamalstore.vercel.app |
| Halaqati | https://halaqati.vercel.app |
| Wahat Al Quran | https://quranoasis.vercel.app |

Other products are represented in the portfolio without unverified external links. A public link means a domain is configured; it does **not** guarantee the product is fully operational.

الروابط المنشورة لا تعني بالضرورة جاهزية جميع خدمات المنتجات للتشغيل.

## Architecture / الهيكل

- `TechMood Technology`: parent company, strategy, design, governance, partnerships.
- `TechMood Core`: proposed optional shared services (identity, notifications, AI, APIs, analytics). **These integrations are not presumed implemented.**
- Products keep their own source code, deployment, permissions, and domain-specific data.
- This repository is **not** the application repository `techmoodtech` and does not contain product backend code.

## Files
- `index.html` — semantic landing page and SEO metadata.
- `styles.css` — responsive design system, themes, mobile navigation.
- `app.js` — bilingual text, catalog, filters and product details.
- `assets/techmood-mark.svg` — self-contained original TechMood logo.
- `docs/PRODUCTS.md` — canonical portfolio listing.

## Review and safe deployment

All changes were made on the separate branch `feat/corporate-website-2026`. This website is not a replacement for the existing TechMood Platform and does not change Supabase or other product repositories.

## Maintenance

Update the `PRODUCTS` collection in `app.js` to change a product description, add a verified external link, or adjust a category. Keep portfolio totals aligned with the twelve-product plan. Avoid inserting secrets, personal user data, or unverified claims in this public repository.
