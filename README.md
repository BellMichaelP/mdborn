# mdborn.com

Michael Bell's flag art site. Shotgun shell flags and tile flag tables are given, never sold, in thanks for a donation to one of four veterans groups.

Next.js on Vercel, with Supabase for the admin login, the list of pieces, and photo storage.

## Pages

- `/` home, `/gallery`, `/gallery/[slug]`, `/how-it-works`, `/nonprofits`, `/about`, `/contact`
- `/admin` add, edit, and delete pieces and upload photos (sign-in required)

Site-wide text, the veterans groups, categories, and statuses live in `src/lib/site.ts`.

## Setup

1. Create a Supabase project and run `supabase/schema.sql` in its SQL editor.
2. In Supabase, turn off public sign-ups, then add the admin user by hand under Authentication > Users.
3. In Vercel, set the variables listed in `.env.example`. Keep keys out of the repo and out of chat.

Until Supabase is connected, the site shows three sample pieces so the layout can be previewed.

## Local development

```sh
npm install
cp .env.example .env.local   # fill in values
npm run dev
```
