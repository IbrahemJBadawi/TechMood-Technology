# ImpactMood — Together. Greater Impact.

Arabic-first mobile-first community volunteering and impact gamification platform under TechMood Technology.

Current version 0.2 is a demo based on localStorage only: initiatives, volunteer applications, teams, tasks, volunteer hours, achievements, XP, level progression, metrics and organization demo. Admin role is a simulated switcher, NOT real authentication or authorization.

The original logo is included. Visual styles follow the TechMood family: Cairo/Inter, blue-green brand, vector icons, responsive cards and bottom navigation.

## Preview
Run `python3 -m http.server 8080` in this folder and open http://localhost:8080.

## Production checklist
Create a separate ImpactMood repository and Supabase project, implement Supabase Auth with tenant-scoped RLS and backend XP approvals, verify security with two real organizations, then connect Vercel. Do not store actual volunteers' private data in this demo.

This branch stages ImpactMood in an isolated folder temporarily; it does not alter other apps or main.
