# PublisherMood — TechMood Technology
A single-owner, deploy-per-workspace publishing assistant without Supabase or any database. Separate from personal AutoPublisher. No personal credentials, channel, or archive are reused.
## Setup
1. Deploy this folder as a separate Vercel project (root: publishermood).
2. Create a dedicated private GitHub storage repository, initialized with a README. Create a fine-grained token scoped to that repository, Contents read/write only.
3. Add Production environment variables in Vercel: GH_REPO (owner/repo), GH_STATE_TOKEN, STATE_KEY (at least 32 random characters), ADMIN_PASSWORD (strong independent password), GEMINI_API_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL (@publicchannel), CRON_SECRET (independent random secret).
4. Optional GH_BRANCH (main), GEMINI_MODEL (gemini-3.1-flash-lite), PUBLISH_TIMEZONE (Asia/Hebron).
5. Redeploy, then open /setup.html. Enter admin password; check connections, run encrypted storage write test, customize editorial profile, generate a real draft without sending, review and publish manually if desired. To enable automatic publishing explicitly check and save the option.
## Behavior
The authenticated cloud workspace is separate from the local editor. Cloud profile and posts are stored in publishermood-state.enc.json encrypted with AES-256-GCM. Repository writes use optimistic concurrency via blob SHA. Never change STATE_KEY without migration. GitHub file sizes and API quotas limit archive growth. Store secrets in Vercel only, not browser or source. API responses are not cached by the service worker.
Cron jobs at 05:00 and 06:00 UTC guard on local hour 08. This covers Palestine winter/summer offset; other timezones need matching UTC schedules. Hobby execution is approximate; one post daily, automatic publishing disabled until owner opts in. Generation uses Crossref abstracts and resolving DOI, then Gemini; auto publishing uses a second Gemini claim check, fails closed, and reserves sending state before Telegram call. An uncertain delivery is not retried automatically. AI verification is not a guarantee of accuracy.
## Limits
Free tiers are subject to quotas and eligibility; Vercel Hobby is for personal noncommercial testing. This is not a hosted multi-tenant SaaS. No Facebook/LinkedIn/Instagram/X/YouTube API, account sharing, billing, or team roles. The local calendar is planning-only, not a cloud scheduling queue. Connection checks repeat only while the setup page is open and authenticated. API/Telegram live tests require the new project's own credentials.
