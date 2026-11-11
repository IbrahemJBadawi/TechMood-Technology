# StoreMood — TechMood Technology

Independent Arabic-first, mobile-first prototype for digital subscription tracking and a small digital-services storefront.

IMPORTANT: This is a LOCAL-ONLY DEMO. Subscription records, order drafts, and read notifications are saved in this browser only. There is no real payment, approval, cloud account, customer order dispatch, email, or push notification.

## Implemented

- Responsive RTL dashboard styled after TechMood's royal blue #006BE0, cyan #38BDF8, IBM Plex Sans Arabic, soft cards and dark mode.
- Add, edit, delete, and manually renew subscriptions with monthly or annual cycles and ILS/USD/JOD prices.
- Dynamic upcoming renewal cards and on-site notifications, calculated when the page is opened.
- Approximate monthly spending shown separately for every currency, with no invented FX exchange rate.
- Illustrated catalog of six possible services; prices are explicitly not confirmed.
- Create, copy and delete local order drafts only, not real customer orders.
- Safe HTML text encoding, basic input validation, accessible controls, keyboard navigation, reduced motion.
- No JavaScript framework dependency.

## Files

- index.html: application layout and SVG icon sprite
- styles.css: design system and responsive layouts
- app.js: local-only application logic
- favicon.svg: custom mark

## Running

Serve this folder as static HTML with a local HTTP server or deploy it to Vercel, using apps/storemood as the Root Directory and static/other framework setting.

## Before real customer launch

1. Create a dedicated repository when GitHub repository creation is available.
2. Set up a dedicated backend database and secure authentication.
3. Enforce row-level access, server-side product pricing, customer ownership, and an immutable audit trail.
4. Add secure receipt upload, duplicate-payment detection, admin-only verification, and order fulfillment.
5. Add opt-in email/web push reminders, delivery monitoring and admin tools.
6. Verify the approved service catalog, pricing, support channels, legal policies, and real-device tests.
7. Integrate PayMood and TechMood Core via versioned APIs once those services are ready.

Do not interpret this demo as accepting actual orders, collecting payments, or renewing third-party subscriptions.
