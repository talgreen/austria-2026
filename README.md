# Austria 2026 — Family Trip App

A static, mobile-first trip companion for our family road trip across Austria, **8 – 26 August 2026** (Vienna → Salzburg → Tyrol → the Pinzgau lakes → Vienna). Itinerary, interactive map, attractions, stays, restaurants/supermarkets, weather, food & drink, packing/booking checklists, and an in-app AI tour-guide chat (**Felix**, a warm Austrian alpine guide). Bilingual Hebrew + English. Built to be opened on the phone during the trip.

Deployed on **Vercel** (framework preset: Vite). Pushes to `main` deploy to
production; every branch/PR gets a preview URL. Set `VITE_GEMINI_API_KEY` in the
Vercel project's Environment Variables for the in-app Felix chat.

Built on a reusable trip-companion pattern. For the full design rationale and the playbook, see [`docs/HOW_TO_BUILD_A_VACATION_WEBSITE.md`](docs/HOW_TO_BUILD_A_VACATION_WEBSITE.md).

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (alpine palette: pine green, lake teal, alpine red, warm cream)
- Cormorant Garamond + Inter (LTR), Suez One + Assistant (RTL) — Google Fonts
- React Leaflet + CartoDB Voyager tiles (no API key)
- Open-Meteo for live weather (no API key)
- Lucide icons + Framer Motion for subtle animation
- Gemini Live API for the in-app chat assistant (Felix)
- Optional pre-generated TTS (German word-of-the-day) via Gemini — scripts run locally only, need `GEMINI_API_KEY`

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build locally
npm run lint     # ESLint flat config
```

The app uses a root base path (`/`) for both local development and Vercel production.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the keys you need. None of these are required to boot the site, but the AI chat and TTS scripts need them.

| Variable | Used by | Notes |
| --- | --- | --- |
| `VITE_GEMINI_API_KEY` | In-app Gemininio chat | Baked into the bundle at build time. Restrict by HTTP referrer in AI Studio. Leave blank to fall back to per-user pasted keys. |
| `GEMINI_API_KEY` | `npm run tts:*` scripts (local only) | **No `VITE_` prefix.** Defaults to Gemini Flash TTS for narration audio. Same key family as the one above; safe to reuse. |
| `ELEVEN_API_KEY` | `npm run tts:*:eleven` scripts | Optional — only needed when passing `--elevenlabs`. |
| `GOOGLE_APPLICATION_CREDENTIALS` | `npm run tts:* -- --google-chirp3` | Optional — Google Cloud service account for the Chirp 3 HD TTS fallback. |

## Updating content

All content lives in plain TypeScript files under `src/data/` — no CMS, no database. Edit the file, push to `main`, and GitHub Actions rebuilds and redeploys automatically.

| File | What's in it |
| --- | --- |
| `src/data/itinerary.ts` | The 19-day plan (`dayTips`, gear, drink/word of the day, etc.) |
| `src/data/attractions.ts` | All sights with description, coords, official link, image path |
| `src/data/stays.ts` | The six stays across Vienna, Salzburg, the Zillertal, Pinzgau & Werfenweng |
| `src/data/services.ts` | Restaurants, supermarkets, gas stations near each base |
| `src/data/dishes.ts` / `wineries.ts` | Food & wine catalog (own section + map layer) |
| `src/data/tips.ts` | Local know-how and warnings (the motorway Vignette, alpine passes, etc.) |
| `src/data/emergency.ts` | Emergency numbers, hospitals, embassy |
| `src/data/checklist.ts` | Pre-trip booking + packing checklists |
| `src/data/i18n/*.he.ts` | Partial Hebrew overlays for every English data module |
| `src/lib/dict.ts` | UI strings (brand, nav, sections, install, Gemininio) per language |
| `src/lib/tipsForDay.ts` | Maps which global `tips.ts` entries appear on which chapter detail page |
| `src/lib/gemininio/persona.ts` | AI guide persona, traveling party, trip facts, digests |

### Adding photos

Image fields point to `./images/<slug>.jpg`. Drop your own `.jpg` files into `public/images/` with matching names and they will appear automatically. Until then, each card shows a colour-coded fallback with the place name. Always use **relative** paths (`./images/...`, not `/images/...`) so they resolve correctly.

## Helper scripts

`scripts/` holds local-only scripts for generating audio. Run from your machine, never from CI.

| Command | What it does |
| --- | --- |
| `npm run tts:german-words` | Word-of-the-day MP3s in DE/EN/HE (Gemini Flash by default). |
| `npm run tts:german-words:eleven` | Same, via ElevenLabs. Add `--examples-only` to rebuild just the example clips. |
| `npm run tts:attractions-he` | Hebrew narration for attractions (Gemini Flash by default; `:eleven` variant available). |
| `npm run repair:german-words-audio` | Re-encodes any partially-truncated MP3 returned by a TTS provider. |
| `node scripts/smoke-test-gemini-live.mjs` | Opens a one-shot Live WebSocket to verify your Gemini key works. |

## Deploy

Connect the GitHub repo to Vercel via **vercel.com → Add New → Project → Import Git Repository** (or use `npx vercel link` from the CLI). Vercel auto-detects the Vite framework from `vercel.json`. Set `VITE_GEMINI_API_KEY` in the project's **Environment Variables** for the in-app chat. Every push to `main` triggers a production deployment; pull requests and other branches get preview URLs.

## Project layout

```
src/
  components/      UI sections (Hero, Map, Itinerary, Stays, Gemininio, ...)
  data/            All trip content as typed TS data
    i18n/          Partial Hebrew overlays for every data module
  lib/             Helpers (i18n, dict, hash routing, install, swipe, audio bus)
    gemininio/     AI assistant — persona, Live WS, REST search, history, audio
  index.css        Tailwind + Austrian design tokens
public/
  images/          Drop-in attraction & stay photos
  audio/           Pre-generated narration MP3s
  manifest.webmanifest, favicon.svg, og-cover.jpg
scripts/           Local-only image and audio generation scripts
docs/
  HOW_TO_BUILD_A_VACATION_WEBSITE.md   Full design playbook + new-trip guide
.github/workflows/
  deploy.yml       GitHub Pages CI
```

Gute Reise.
