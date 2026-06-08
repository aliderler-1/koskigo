# KOSKİGO - Field Management & Fault Reporting System

KOSKİGO is a specialized Progressive Web App (PWA) built for KOSKİ to manage 598 water wells and infrastructure assets.

## Project Structure
- **/client**: Next.js (App Router), TypeScript, Tailwind CSS, Leaflet, Serwist (PWA).
- **/server**: Node.js, Express, Prisma ORM.
- **/db**: PostgreSQL schema and migration scripts.

## Tech Stack
- **Frontend**: Next.js 14, Leaflet.js, Tailwind CSS, Dexie.js (IndexedDB).
- **Backend**: Node.js, Express, PostgreSQL, Prisma.
- **Offline**: Service Workers with background sync for fault reports.

## Setup Instructions
1. **Database**: Run `psql -f db/schema.sql` to initialize your local PostgreSQL.
2. **Server**: Navigate to `/server`, run `npm install` and `npx prisma generate`.
3. **Client**: Navigate to `/client`, run `npm install` and `npm run dev`.