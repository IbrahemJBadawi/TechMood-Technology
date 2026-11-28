# TechMood AutoPublisher
Personal, non-commercial educational publishing dashboard. One draft each day during 08:00–08:59 Asia/Hebron using Vercel Hobby Cron (delivery is approximate). Human approval is mandatory; clicking approval sends the exact draft to @IbrahemJBadawiTech immediately, even after 08:00. Images disabled. Rejecting a draft does not regenerate it that day.

## Configuration
Create a Telegram bot via https://t.me/BotFather and grant it only Post Messages in the channel. Create a Gemini API key using an eligible free-tier project (no billing). Choose a supported free model; default gemini-2.5-flash-lite, override GEMINI_MODEL if retired or unavailable. No paid fallback.
In Vercel project Production environment variables add:
- ADMIN_PASSWORD: long random password, used for dashboard login.
- STATE_KEY: separate high-entropy secret (at least 32 random bytes); retain securely, losing it makes archive unreadable.
- GH_STATE_TOKEN: fine-grained GitHub PAT scoped to this repo, Contents read/write only. Encrypted state is stored on autopublisher-state branch of public repository. Do not store credentials in source.
- GEMINI_API_KEY
- TELEGRAM_BOT_TOKEN
- SCHEDULE_SECRET: separate long random secret.
- GEMINI_MODEL (optional)
Redeploy after setting env vars. Automatic scheduling uses two Vercel Cron Jobs at 05:00 and 06:00 UTC, with an Asia/Hebron local-hour guard and daily idempotency. Set a separate sensitive CRON_SECRET in Vercel Production. GitHub Actions is now optional and manual only: set AUTOPUBLISHER_SCHEDULE_SECRET equal to SCHEDULE_SECRET if you want to dispatch it. The public endpoint is configured in the workflow. Review Vercel cron logs and manually test the dashboard generation; no publish without approval. Review the draft against the source abstract and actual paper before approving. The DOI resolution check verifies an available DOI redirect, not accuracy of every claim. Crossref availability, model free quota, and GitHub scheduling are not guaranteed. No automatic retry of uncertain Telegram sends; inspect channel manually to avoid duplicates. The source branch contains encrypted data, not private access controls. GitHub writes use SHA-based optimistic concurrency. Vercel Hobby permits personal non-commercial use only. No automatic billing enabled by this code.
