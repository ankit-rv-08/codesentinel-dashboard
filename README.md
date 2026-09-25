# CodeSentinel Dashboard

Live telemetry dashboard for [CodeSentinel](https://github.com/ankit-rv-08/codesentinel) — the AI code review GitHub App.

**Live:** https://codesentinel-dashboard.vercel.app

![Dashboard](docs/dashboard.png)

## Stack

Next.js 16 • TypeScript • Tailwind CSS • Recharts

## What it shows

- Total reviews, comments posted, average latency, files reviewed
- Recent reviews table (repo, PR #, comment count, severity, latency, timestamp)
- Severity breakdown donut chart

## Data source

Fetches from `https://codesentinel-u6se.onrender.com/api/stats`.

## Local setup

```bash
npm install
npm run dev
Open http://localhost:3000.

Deploy

Deployed on Vercel. Auto-deploys on push to main.

License

MIT.