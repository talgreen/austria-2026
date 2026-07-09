# Product

## Register

product

## Users

Our own family, on a road trip across Austria (8–26 August 2026: Vienna →
Salzburg → Tyrol → the Pinzgau lakes → Vienna). Not a general audience — a
known, small group of travelers, some reading English, some Hebrew.

Their context is the point: the app is opened **on a phone, one-handed**, in
the back of a moving car, in bright sun outside a restaurant, on patchy rental
wifi. Three modes of use:

- **Before the trip** — planning, packing, booking, counting down.
- **During the trip** — "what's today's plan?", "where do we eat?", "how do I
  drive there?", "you are here" on the map, emergency numbers.
- **After the trip** — photos and memories.

The job to be done shifts by mode, but the primary during-trip task is always:
*answer the next practical question in one glance, without typing.*

## Product Purpose

A static, offline-friendly, bilingual (Hebrew + English) trip companion that is
**beautiful before the trip, indispensable during it, and easy to update
between trips.** It replaces the scatter of screenshots, booking emails, and
group-chat messages with one warm, trustworthy source of truth for the whole
family.

Success = a family member reaches for *this*, not their camera roll or the
group chat, to answer any trip question — and it answers fast, correctly, and
without a login, a backend, or a network round-trip they can't afford.

Content is real and verified (addresses, hours, phone numbers) — never
placeholder. The bar is "usable on the ground," not "looks good in a demo."

## Brand Personality

**Warm · editorial · trustworthy.** A "magazine travel guide" made personal —
the tone of *Cereal* or *Condé Nast Traveler*, translated to a phone screen and
made yours. Earthy alpine palette (pine green, glacial-lake teal, Austrian
geranium red, warm cream), big serif display headings, generous white space,
photographs that earn their bytes.

Voice: a knowledgeable, calm local friend — confident but never loud, helpful
but never nagging. The in-app AI guide (**Felix**, a warm Austrian alpine
guide) is the human face of this voice.

The interface should feel like *theirs* — the bilingual overlay isn't a
localization checkbox, it's what makes the app feel like it belongs to this
family, not to a template.

## Anti-references

- **SaaS dashboard.** The explicit north-star anti-reference. No flat gray
  card grids, no dense data tables, no tool-like chrome, no hero-metric
  templates. If a screen reads as "admin panel," it has failed.
- **OTA / aggregator clutter** (Booking.com, TripAdvisor): ad-dense,
  badge-stacked, aggressive-CTA, review-spam energy. This app sells nothing.
- **Generic AI-travel template**: cream-and-terracotta stock look, stock hero
  over a card grid, tracked-uppercase eyebrows above every section. Warmth here
  is earned through real content and typography, not applied as a skin.
- **Cold utilitarian system UI** (raw Google-Maps chrome): function with no
  personality. The map is warm editorial (CartoDB Voyager), not system default.

## Design Principles

1. **One-glance answers.** Every during-trip view resolves the traveler's next
   question without typing, scrolling far, or waiting on the network. State
   (today / next / where-you-are) is surfaced, not searched for.
2. **Mobile is the design; desktop is a courtesy.** Decisions are made for a
   phone held one-handed in imperfect light. Desktop adapts up from that, never
   the reverse.
3. **Editorial warmth serves trust.** The magazine feel isn't decoration — a
   calm, confident, well-set page is what makes the family trust the data on
   it. Beauty and usefulness are the same goal, not a trade-off.
4. **Real data, no placeholders.** Verified addresses, hours, and numbers.
   Empty and pre-trip states are designed deliberately, never left as lorem.
5. **Bilingual by right, not by bolt-on.** Hebrew and English are equal
   citizens. RTL layout, mirrored icons, and script-appropriate fonts get the
   same polish as the LTR default.

## Accessibility & Inclusion

- **Baseline: WCAG AA.** Body text meets ≥4.5:1 contrast; large text ≥3:1.
  Touch targets sized for one-handed phone use. No special beyond-AA program is
  required, but AA is a floor, not an aspiration.
- **Full bilingual RTL parity** is a first-class requirement. The Hebrew
  experience must match the English one in polish: correct fonts (Assistant +
  Suez One), mirrored directional icons, correct `dir="rtl"` layout, no
  synthesized faux-bold/oblique on Hebrew serif faces, no clipped or
  overflowing translated strings.
- Honor `prefers-reduced-motion` for the Ken Burns hero, crossfades, and
  Framer transitions (crossfade or instant fallback) as good practice, even
  though it's not a hard requirement.
