# PublisherMood | TechMood Technology

Local-first MVP. Independent product folder; no existing AutoPublisher code, secrets, channel, or scheduled jobs are reused or modified.
## Current features
Arabic RTL responsive dashboard, dark mode, create/edit/delete/search/filter posts, live preview and copy, manual publication status, monthly content calendar, editorial identity, channel addresses, JSON backup/import, offline service worker.
## Boundaries
All content is stored in browser localStorage. Calendar dates are plans, not scheduled jobs. Channel addresses are not connected credentials. No Gemini or social API calls, no backend authentication, no cloud sync, no billing, no cross-device collaboration. The SVG is an implementation of the approved P/paper-plane brand concept. 
## Deployment
Static Vercel project with root directory publishermood. For personal testing only under Hobby terms; confirm commercial hosting eligibility before SaaS launch.
## Next stage
Provision dedicated Supabase project after confirming organization and cost; implement Auth and RLS-isolated workspaces, membership roles, posts and schedules. Keep OAuth/API credentials encrypted on the server, never in localStorage. Add server-side authenticated AI generation with quota and citation checks; transactional publish queue with unique daily idempotency key, retry policy and delivery audit. Begin Telegram then provider-approved social integrations. No migration or reuse of personal tokens.
