# GrowthMood — by TechMood Technology

موقع عربي متجاوب ونسخة معاينة تفاعلية لنظام SaaS لإدارة مراكز التدريب.

## Live

https://growthmood.vercel.app/

## Current delivery

- Responsive Arabic RTL marketing site and administrative workspace.
- Two **fictional demo centers** selectable from the top bar.
- Browser-side workflows to add branches, trainers, trainees, courses, sessions, enrollments, attendance, and sample certificates.
- CSV export for enrollment reports.
- Reports and subscription previews.
- Data saved to the **current browser's localStorage only**.

**CRITICAL: This is a preview, not a live multi-tenant SaaS.** The demo's center selector is NOT authorization, and localStorage is NOT secure tenancy, authentication, or durable shared storage. Never enter real student/employee information, payments, or credentials in the demo. There is no payment processor or email delivery.

## Architecture / next milestone

A proposed PostgreSQL/Supabase baseline is located in the sibling directory:

../growthmood-backend/schema.sql

It has not been applied to any database. It lays out tenants, memberships, role checks, courses, branches, attendance, enrollments, certificates, subscriptions and RLS. It is not an audited production security implementation; integration, tests and tenant-aware server endpoints remain required.

### Backend commissioning checklist

1. Provision **a separate GrowthMood database/project** (not the existing MentorMood / TechMood database). Confirm expected costs first.
2. Review and run the SQL migration in the isolated project.
3. Build sign-up/sign-in with Supabase Auth and invite-based center membership.
4. Replace localStorage CRUD with authenticated server calls and server-side validation; remove demo center switching from the real system.
5. Test tenant boundaries for *every* operation, including nested relationships, CSV export and certificates.
6. Add role-specific views, subscription enforcement on the server, abuse limits, backups and audit logging.
7. Only then admit actual centers or payment data.

## GitHub placement

The connected GitHub connector can edit existing repositories but cannot create a new repository at present. The code was therefore added **without modifying existing product files** under apps/growthmood/ of the TechMood-Technology umbrella repo. To honor the long-term architecture, move this folder into an independent GrowthMood repository later and reconnect the Vercel project to it.

## Static deployment

Vercel: project growthmood, Root Directory apps/growthmood, framework "Other". Git integration is connected to IbrahemJBadawi/TechMood-Technology main.

Static files: index.html, styles.css, app.js, favicon.svg; no package installation or build process needed.

Copyright © 2026 TechMood Technology.
