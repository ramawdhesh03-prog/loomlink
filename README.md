# LoomLink — Deployment Guide

## Local Setup

```bash
npm install
cp .env.example .env
# Fill in your Supabase + Sentry keys in .env
npm run dev
```

## Environment Variables (.env)

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SENTRY_DSN=your-sentry-dsn
```

**Vercel Environment Variables (separate, not VITE_ prefix):**
```
RESEND_API_KEY=re_xxxxx
```

## Supabase Setup

1. Go to https://supabase.com → New Project
2. SQL Editor → paste contents of `supabase-schema.sql` → Run
3. Storage → Create bucket named `catalogs` (set to Public)
4. Copy Project URL and anon key to `.env`

## Vercel Deploy

```bash
# 1. Push code to GitHub
git init
git add .
git commit -m "Initial LoomLink commit"
git remote add origin https://github.com/YOUR_USERNAME/loomlink.git
git push -u origin main

# 2. Go to vercel.com → Import GitHub repo
# 3. Add environment variables in Vercel dashboard
# 4. Deploy — auto builds on every push
```

## GoDaddy DNS (to point loomlink.in to Vercel)

In GoDaddy DNS settings:
- A Record: `@` → `76.76.21.21`
- CNAME: `www` → `cname.vercel-dns.com`

Then in Vercel: Settings → Domains → Add `loomlink.in`

## Resend Setup

1. Go to https://resend.com → Sign up
2. Verify your domain `loomlink.in`
3. Create API key → add to Vercel env as `RESEND_API_KEY`

## Umami Analytics (optional)

Add this to `index.html` `<head>` after getting your Umami script from umami.is:
```html
<script async src="https://analytics.umami.is/script.js" data-website-id="YOUR_ID"></script>
```

## File Structure

```
loomlink/
├── api/
│   └── send-email.js        ← Vercel serverless function (Resend)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ManufacturerRegister.jsx
│   │   └── WholesalerRegister.jsx
│   ├── locales/
│   │   ├── en.json
│   │   └── hi.json
│   ├── lib/supabase.js
│   ├── i18n.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── supabase-schema.sql
```
