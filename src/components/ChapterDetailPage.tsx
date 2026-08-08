import { Fragment, createElement, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Car,
  Sun,
  ExternalLink,
  Plus,
  X,
  Lightbulb,
  AlertTriangle,
  AlertOctagon,
  Info,
  Activity,
  Backpack,
  StickyNote,
  Map as MapIcon,
  PartyPopper,
  Utensils,
  Wine,
  Beer,
  Martini,
  Coffee,
  GlassWater,
  Clock,
  ArrowLeftRight
} from "lucide-react";
import { itinerary } from "../data/itinerary";
import { getAttraction } from "../data/attractions";
import { getService } from "../data/services";
import { getAreaForDay } from "../data/areas";
import { accentClasses } from "../lib/accent";
import WhereYouSleep from "./WhereYouSleep";
import type {
  Day,
  DayActivity,
  DayDrink,
  Difficulty,
  ImageCredit,
  POI,
  Service,
  Tip
} from "../data/types";
import NavigateLinks from "./NavigateLinks";
import Quiz from "./Quiz";
import { getTripState, isQuizUnlocked } from "../lib/tripState";
import { activityIcon } from "../lib/activityIcon";
import { tipsForDay } from "../lib/tipsForDay";
import { navigateChapter, navigateTab, rememberChapter } from "../lib/route";
import { useT, localizeShortDate, localizeWeekday, type DictKey } from "../lib/dict";
import { useLang } from "../lib/i18n";
import { useLocalizeDay, useLocalizePoi, useLocalizeService, useLocalizeTip } from "../data/i18n";
import PoiImage from "./PoiImage";
import PhotoCredit from "./PhotoCredit";
import MiniMap from "./MiniMap";
import ListenButton from "./ListenButton";
import GermanWordCarousel from "./GermanWordCarousel";
import { FunPackBody } from "./DayFunPack";
import { getKidsPack } from "../data/kids";
import CollapsibleSection from "./CollapsibleSection";
import { useCarouselSwipe } from "../lib/useCarouselSwipe";
import DayWeatherChip from "./DayWeatherChip";

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const TAG_KEY: Record<string, DictKey> = {
  water: "tag_water",
  extreme: "tag_extreme",
  nature: "tag_nature",
  culture: "tag_culture",
  family: "tag_family",
  food: "tag_food",
  view: "tag_view",
  cave: "tag_cave",
  village: "tag_village"
};

/** Badge label for an alternative activity, keyed by the slot it can
 *  swap into. "day" is the whole-day plan-B (the alternatives bank). */
const ALT_KEY: Record<NonNullable<DayActivity["alternativeFor"]>, DictKey> = {
  morning: "alt_for_morning",
  afternoon: "alt_for_afternoon",
  evening: "alt_for_evening",
  day: "alt_for_day"
};

/** Ribbon label for the distinct "swap-in" alternative panel — phrased as
 *  "Instead of the <slot>" so it reads as an OR against the plan, not a
 *  next step. "day" is the whole-day plan-B bank. */
const SWAP_KEY: Record<NonNullable<DayActivity["alternativeFor"]>, DictKey> = {
  morning: "alt_swap_morning",
  afternoon: "alt_swap_afternoon",
  evening: "alt_swap_evening",
  day: "alt_swap_day"
};

/** Derive the time slot a primary (non-alternative) activity occupies from
 *  its canonical English `time` string ("Morning" / "Afternoon" / "Evening").
 *  Used to pair a slot alternative with the primary it swaps in for. Numeric
 *  or unlabeled times return undefined (the alternative then falls back to
 *  the end-of-plan backup bank). */
function slotOfTime(time?: string): "morning" | "afternoon" | "evening" | undefined {
  if (!time) return undefined;
  const s = time.toLowerCase();
  if (s.includes("morning")) return "morning";
  if (s.includes("afternoon")) return "afternoon";
  if (s.includes("evening") || s.includes("night")) return "evening";
  return undefined;
}

/** A primary plan activity plus the alternatives (by array index) that swap
 *  in for its slot. `dayAlts` collects whole-day backups (and any slot
 *  alternative with no matching primary) for the end-of-plan bank. */
interface PlanModel {
  nodes: { primary: number; alts: number[] }[];
  dayAlts: number[];
}

/** Build the plan render-model from the *canonical* day (English `time`
 *  labels, so slot matching is stable across languages — index order is
 *  preserved by localization, so the same indices address `localDay`).
 *
 *  Alternatives are lifted out of the flat sequence and attached to the
 *  primary activity of the slot they replace, so a "morning" swap renders
 *  under the morning stop rather than wherever it happened to sit in the
 *  data. */
function buildPlan(day: Day): PlanModel {
  const acts = day.activities;
  const nodes: { primary: number; alts: number[] }[] = [];
  const nodeForSlot = new Map<string, number>();
  acts.forEach((act, i) => {
    if (act.alternativeFor) return;
    nodes.push({ primary: i, alts: [] });
    const slot = slotOfTime(act.time);
    if (slot && !nodeForSlot.has(slot)) nodeForSlot.set(slot, nodes.length - 1);
  });
  const dayAlts: number[] = [];
  acts.forEach((act, i) => {
    if (!act.alternativeFor) return;
    const target =
      act.alternativeFor !== "day" ? nodeForSlot.get(act.alternativeFor) : undefined;
    if (target !== undefined) nodes[target].alts.push(i);
    else dayAlts.push(i);
  });
  return { nodes, dayAlts };
}

/** Decide whether an activity should render with the "Optional" badge.
 *
 *  Source-of-truth waterfall:
 *   1. If the data sets `activity.optional` explicitly (true OR false), honor
 *      it — that's the curator's intent (e.g. a day's must-do headline stop
 *      sets optional:false to opt OUT of the auto-rule).
 *   2. Otherwise apply a rule of thumb: a day full of multi-hour stops can
 *      realistically only fit ~2 of them with drives in between. So once a
 *      day has more than 2 activities tied to a real attraction (anything
 *      with `attractionId`), the 3rd-and-later attractions are auto-marked
 *      optional. Activities without an attractionId (drives, picnics,
 *      check-ins) never count toward the threshold and never auto-go optional.
 *
 *  This lets the data stay terse — most days get the right behavior
 *  for free — while still allowing per-activity overrides where the
 *  heuristic doesn't match the curator's intent. */
function isActivityOptional(activity: DayActivity, index: number, day: Day): boolean {
  if (activity.optional !== undefined) return activity.optional;
  if (!activity.attractionId) return false;
  const attractionCount = day.activities.filter(a => a.attractionId).length;
  if (attractionCount <= 2) return false;
  // Position of THIS activity among attractionId-bearing siblings (1-indexed).
  const attractionPosition = day.activities
    .slice(0, index + 1)
    .filter(a => a.attractionId).length;
  return attractionPosition > 2;
}

interface ResolvedLead {
  src?: string;
  alt: string;
  credit?: ImageCredit;
  category?: POI["category"];
  tags?: POI["tags"];
}

interface ChapterSlide {
  src: string;
  alt: string;
  /** Place name shown over the photo in italics (the attraction's name) */
  place?: string;
  credit?: ImageCredit;
  category?: POI["category"];
  tags?: POI["tags"];
}

/** Single fallback (used when no slides exist) — keeps the placeholder
 *  gradient looking like the original day. */
function resolveLead(day: Day, getPoi: (p: POI) => POI): ResolvedLead {
  const fromActivity = day.activities
    .map(a => (a.attractionId ? getAttraction(a.attractionId) : undefined))
    .find(a => !!a?.image);
  if (fromActivity?.image) {
    const local = getPoi(fromActivity);
    return {
      src: fromActivity.image,
      alt: local.name,
      credit: fromActivity.imageCredit,
      category: fromActivity.category,
      tags: fromActivity.tags
    };
  }
  if (day.leadImage) {
    return {
      src: day.leadImage,
      alt: day.title,
      credit: day.leadImageCredit
    };
  }
  const anyAtt = day.activities
    .map(a => (a.attractionId ? getAttraction(a.attractionId) : undefined))
    .find(a => !!a);
  return {
    src: undefined,
    alt: day.title,
    category: anyAtt?.category,
    tags: anyAtt?.tags
  };
}

/** Build the ordered list of carousel slides for this day:
 *  every attraction with a photo (in itinerary order), plus the day's
 *  explicit leadImage if it isn't already in the set. Deduplicated by src. */
function resolveSlides(day: Day, getPoi: (p: POI) => POI): ChapterSlide[] {
  const slides: ChapterSlide[] = [];
  const seen = new Set<string>();
  for (const a of day.activities) {
    if (!a.attractionId) continue;
    const att = getAttraction(a.attractionId);
    if (!att?.image || seen.has(att.image)) continue;
    const local = getPoi(att);
    seen.add(att.image);
    slides.push({
      src: att.image,
      alt: local.name,
      place: local.name,
      credit: att.imageCredit,
      category: att.category,
      tags: att.tags
    });
  }
  if (day.leadImage && !seen.has(day.leadImage)) {
    slides.push({
      src: day.leadImage,
      alt: day.title,
      credit: day.leadImageCredit
    });
  }
  return slides;
}

const SLIDE_DURATION_MS = 6500;

const DIFFICULTY_DETAIL_STYLE: Record<
  Difficulty,
  { dot: string; text: string; bg: string; key: DictKey }
> = {
  easy: {
    dot: "bg-olive-500",
    text: "text-olive-700",
    bg: "bg-olive-500/12",
    key: "difficulty_easy"
  },
  moderate: {
    dot: "bg-gold-500",
    text: "text-sienna-600",
    bg: "bg-gold-400/15",
    key: "difficulty_moderate"
  },
  challenging: {
    dot: "bg-terracotta-500",
    text: "text-terracotta-700",
    bg: "bg-terracotta-500/12",
    key: "difficulty_challenging"
  }
};

/* Per-drink-type accent: chip color, gradient, and icon. Picked so each
 * type reads as its own little universe — wine is wine-red, beer warms
 * to amber, the digestif slides into sienna, the espresso into ink. */
const DRINK_STYLES: Record<
  DayDrink["type"],
  {
    Icon: typeof Wine;
    chipBg: string;
    chipText: string;
    gradient: string;
    accentDot: string;
    labelKey: DictKey;
  }
> = {
  wine: {
    Icon: Wine,
    chipBg: "bg-terracotta-500/12",
    chipText: "text-terracotta-700",
    gradient: "from-cream-50 via-cream-100 to-terracotta-500/12",
    accentDot: "bg-terracotta-500",
    labelKey: "drink_type_wine"
  },
  cocktail: {
    Icon: Martini,
    chipBg: "bg-gold-400/18",
    chipText: "text-sienna-600",
    gradient: "from-cream-50 via-cream-100 to-gold-400/15",
    accentDot: "bg-gold-500",
    labelKey: "drink_type_cocktail"
  },
  beer: {
    Icon: Beer,
    chipBg: "bg-gold-400/18",
    chipText: "text-sienna-600",
    gradient: "from-cream-50 via-cream-100 to-gold-400/12",
    accentDot: "bg-gold-500",
    labelKey: "drink_type_beer"
  },
  aperitif: {
    Icon: GlassWater,
    chipBg: "bg-terracotta-500/12",
    chipText: "text-terracotta-700",
    gradient: "from-cream-50 via-cream-100 to-terracotta-400/15",
    accentDot: "bg-terracotta-400",
    labelKey: "drink_type_aperitif"
  },
  digestif: {
    Icon: Wine,
    chipBg: "bg-sienna-500/12",
    chipText: "text-sienna-600",
    gradient: "from-cream-50 via-cream-100 to-sienna-500/12",
    accentDot: "bg-sienna-500",
    labelKey: "drink_type_digestif"
  },
  coffee: {
    Icon: Coffee,
    chipBg: "bg-ink-800/12",
    chipText: "text-ink-800",
    gradient: "from-cream-50 via-cream-100 to-ink-800/10",
    accentDot: "bg-ink-800",
    labelKey: "drink_type_coffee"
  },
  other: {
    Icon: GlassWater,
    chipBg: "bg-olive-500/12",
    chipText: "text-olive-700",
    gradient: "from-cream-50 via-cream-100 to-olive-500/12",
    accentDot: "bg-olive-500",
    labelKey: "drink_type_other"
  }
};

const SEVERITY_STYLES: Record<
  Tip["severity"],
  { Icon: typeof Info; ring: string; bg: string; text: string; labelKey: DictKey }
> = {
  critical: {
    Icon: AlertOctagon,
    ring: "ring-terracotta-500/40",
    bg: "bg-terracotta-500/10",
    text: "text-terracotta-700",
    labelKey: "severity_critical"
  },
  warning: {
    Icon: AlertTriangle,
    ring: "ring-gold-500/45",
    bg: "bg-gold-500/10",
    text: "text-gold-700",
    labelKey: "severity_warning"
  },
  info: {
    Icon: Lightbulb,
    ring: "ring-olive-500/40",
    bg: "bg-olive-500/10",
    text: "text-olive-700",
    labelKey: "severity_info"
  }
};

export default function ChapterDetailPage({ dayNumber }: { dayNumber: number }) {
  const t = useT();
  const { lang } = useLang();
  const isRTL = lang === "he";

  const day = useMemo(
    () => itinerary.find(d => d.dayNumber === dayNumber),
    [dayNumber]
  );

  // Scroll to top + remember this chapter so going Back to the plan re-opens it
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    rememberChapter(dayNumber);
  }, [dayNumber]);

  if (!day) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="font-serif text-2xl text-ink-900">{lang === "he" ? "פרק לא נמצא" : "Chapter not found"}</div>
          <button
            type="button"
            onClick={() => navigateTab("plan")}
            className="mt-4 inline-flex items-center gap-2 text-terracotta-600 hover:text-terracotta-700"
          >
            {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />} {t("back_to_plan")}
          </button>
        </div>
      </div>
    );
  }

  return <ChapterDetailContent day={day} />;
}

function ChapterDetailContent({ day }: { day: Day }) {
  const t = useT();
  const { lang } = useLang();
  const isRTL = lang === "he";
  const localizeDay = useLocalizeDay();
  const localizePoi = useLocalizePoi();
  const localizeService = useLocalizeService();
  const localizeTip = useLocalizeTip();

  const localDay = localizeDay(day);
  // Render-model for the plan: alternatives lifted out of the flat activity
  // list and attached to the slot they swap in for (built from the canonical
  // day so slot matching is language-stable; indices address `localDay`).
  const plan = useMemo(() => buildPlan(day), [day]);
  const tripState = getTripState();
  const isToday =
    tripState.phase === "during" && tripState.today.dayNumber === day.dayNumber;
  const lead = resolveLead(localDay, localizePoi);
  const slides = useMemo(
    () => resolveSlides(day, localizePoi),
    [day, localizePoi]
  );
  const [slideIdx, setSlideIdx] = useState(0);
  const [prevDayNumber, setPrevDayNumber] = useState(day.dayNumber);
  if (day.dayNumber !== prevDayNumber) {
    setPrevDayNumber(day.dayNumber);
    setSlideIdx(0);
  }

  // Auto-advance the hero carousel (only if we have more than one slide)
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setSlideIdx(i => (i + 1) % slides.length);
    }, SLIDE_DURATION_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  // Lazy-preload the upcoming slide so the crossfade is seamless
  useEffect(() => {
    if (slides.length <= 1) return;
    const next = slides[(slideIdx + 1) % slides.length];
    if (next?.src) {
      const img = new Image();
      img.src = next.src;
    }
  }, [slideIdx, slides]);

  const currentSlide = slides[slideIdx];
  /** Photo place line + credit — kept below the chapter title so CC never overlaps Hebrew headlines. */
  const heroSlideMeta =
    currentSlide ??
    ({ place: undefined, credit: lead.credit } as Pick<ChapterSlide, "place" | "credit">);
  const germanWords = localDay.germanWords ?? [];
  const tips = tipsForDay(day.dayNumber).map(localizeTip);

  // POIs visited this day, in order, localized
  const dayPois: POI[] = day.activities
    .map(a => (a.attractionId ? getAttraction(a.attractionId) : undefined))
    .filter((p): p is POI => !!p)
    .map(localizePoi);

  /* Restaurants curated for this day. We resolve EN by id from the full
     services list (skip silently if a stale id slips through), then run
     each through the same localizer the homepage Services section uses
     so Hebrew names + descriptions render the same everywhere. */
  const dayRestaurants: Service[] = (day.restaurants ?? [])
    .map(id => getService(id))
    .filter((s): s is Service => !!s && s.category === "restaurant")
    .map(localizeService);

  /* Lookup table for the per-day pack list: when a gear item references a
     specific attraction (`for: "canyon-park"`) we need its localized name
     for the small chip and a way to scroll to that activity row. */
  const attractionNameById = new Map<string, string>(
    dayPois.map(p => [p.id, p.name])
  );
  const scrollToActivity = (attractionId: string) => {
    const el = document.getElementById(`activity-${attractionId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const area = getAreaForDay(day.dayNumber);
  const a = accentClasses(area.accent);

  const prevDay = day.dayNumber > 1 ? itinerary[day.dayNumber - 2] : null;
  const nextDay =
    day.dayNumber < itinerary.length ? itinerary[day.dayNumber] : null;
  const localPrevDay = prevDay ? localizeDay(prevDay) : null;
  const localNextDay = nextDay ? localizeDay(nextDay) : null;

  const { swipeHandlers: heroSwipeHandlers, swipeTouchAction: heroSwipeTouchAction } =
    useCarouselSwipe({
      onPrev: () => {
        if (slides.length <= 1) return;
        setSlideIdx(i => (i - 1 + slides.length) % slides.length);
      },
      onNext: () => {
        if (slides.length <= 1) return;
        setSlideIdx(i => (i + 1) % slides.length);
      },
      disabled: slides.length <= 1
    });

  const heroCarousel =
    slides.length === 0 ? (
      // No photos for this day — show the styled placeholder
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <PoiImage
          src={lead.src}
          alt={lead.alt}
          region={localDay.region === "transit" ? "north" : localDay.region}
          category={lead.category}
          tags={lead.tags}
        />
      </motion.div>
    ) : (
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide.src}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 1.4, ease: "easeInOut" },
            scale: { duration: SLIDE_DURATION_MS / 1000 + 1.4, ease: "linear" }
          }}
          className="absolute inset-0 will-change-transform"
        >
          <PoiImage
            src={currentSlide.src}
            alt={currentSlide.alt}
            region={localDay.region === "transit" ? "north" : localDay.region}
            category={currentSlide.category}
            tags={currentSlide.tags}
          />
        </motion.div>
      </AnimatePresence>
    );

  const heroDashes = slides.length > 1 && (
    <div
      className="absolute end-4 sm:end-8 top-3 sm:top-5 z-10 flex gap-1 pointer-events-none"
      aria-hidden
    >
      {slides.map((_, i) => (
        <span
          key={i}
          className={`block h-px transition-all duration-500 ${
            i === slideIdx ? "w-5 bg-cream-50/90" : "w-2 bg-cream-50/30"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Sticky back bar — back arrow + centered bold title */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <button
            type="button"
            onClick={() => navigateTab("plan")}
            aria-label={t("back_to_plan")}
            className="justify-self-start inline-flex items-center justify-center w-10 h-10 rounded-full bg-cream-100 text-ink-900 hover:bg-cream-200 transition-colors -ms-1"
          >
            {isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          </button>
          <div className="text-[15px] font-bold text-ink-900 truncate">
            {localizeWeekday(day.weekday, lang)} · {localizeShortDate(day.date, lang)}
          </div>
          <span aria-hidden />
        </div>
      </div>

      <article>
        {/* Hero — the day's photos crossfade behind a header that leads
            with what the family needs at a glance: the day and date, the
            home base, and the weather. The photo dissolves into the page
            with no hard edge; the day's theme closes the block quietly. */}
        <header
          className="relative w-full overflow-hidden"
          style={heroSwipeTouchAction ? { touchAction: heroSwipeTouchAction } : undefined}
          {...heroSwipeHandlers}
        >
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] max-h-[62vh] overflow-hidden bg-ink-900">
            {heroCarousel}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-900/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-900/60 to-transparent" />
            {heroDashes}
            {/* CC-licensed photos must stay attributed — a minimal © glyph
                in the corner, out of the content's way. */}
            {heroSlideMeta.credit && (
              <div
                className="absolute top-3 start-4 z-10 px-1.5 py-[3px] rounded-full bg-ink-900/45 backdrop-blur-sm"
                dir="ltr"
              >
                <PhotoCredit credit={heroSlideMeta.credit} variant="light" />
              </div>
            )}
            {/* Bold title + accent pill overlaid on the photo */}
            <div className="absolute inset-x-0 bottom-0 z-10 pb-9 sm:pb-12">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                {isToday && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-500 text-cream-50 text-[11px] font-bold mb-2">
                    <Sun size={11} /> {t("today")}
                  </span>
                )}
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
                  {localizeWeekday(day.weekday, lang)} · {localizeShortDate(day.date, lang)}
                </h1>
              </div>
            </div>
          </div>
          {/* Status card overlapping the hero bottom */}
          <div className="relative z-10 -mt-5 sm:-mt-7 max-w-4xl mx-auto px-4 sm:px-6 w-full">
            <div className="rounded-[var(--radius-card)] bg-white ring-1 ring-cream-300 overflow-hidden">
              <div className="status-bar-dark justify-between">
                <span>
                  {t("plan_chapter_x_of_y", { x: String(day.dayNumber).padStart(2, "0"), y: String(itinerary.length).padStart(2, "0") })}
                </span>
                <DayWeatherChip day={day} />
              </div>
              <div className="px-4 py-4">
                {localDay.base && (
                  <div className="flex items-center gap-1.5 text-[14px] sm:text-base font-bold text-ink-900">
                    <MapPin size={16} className="text-terracotta-500 shrink-0" />
                    {localDay.base}
                  </div>
                )}
                <div className="mt-1.5 text-[15px] sm:text-lg text-ink-700/85 leading-snug">
                  {localDay.title}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Where you sleep — compact area lodging pill */}
          <WhereYouSleep area={area} variant="band" />

          {/* The day plan — the page's spine, always expanded. Everything
              else on the page folds into collapsed sections below it. */}
          <section className="mt-6 sm:mt-8">
            <SectionLabel eyebrow={t("todays_plan")} title={t("hour_by_hour")} accentClass={a.text} />
            <ol className="mt-5 sm:mt-6 space-y-3">
              {plan.nodes.map((node, ni) => {
                const act = localDay.activities[node.primary];
                return (
                  <Fragment key={node.primary}>
                    {ni === 0 && localDay.rideToFirst && localDay.departureTime && (
                      <RideConnector
                        departAt={localDay.departureTime}
                        duration={localDay.rideToFirst.duration}
                        note={localDay.rideToFirst.note}
                      />
                    )}
                    <ActivityRow
                      activity={act}
                      isToday={isToday}
                      optional={isActivityOptional(act, node.primary, localDay)}
                      accentText={a.text}
                      alternatives={node.alts.map(idx => localDay.activities[idx])}
                    />
                    {/* Inline ride connector — rendered only when this stop
                        has a meaningful drive to the next one. Sits after the
                        whole card (incl. any nested swap-in) so the drive
                        connects to the next real stop, not the alternative. */}
                    {act.rideToNext && ni < plan.nodes.length - 1 && (
                      <RideConnector
                        duration={act.rideToNext.duration ?? ""}
                        note={act.rideToNext.note}
                        departAt={act.rideToNext.departAt}
                      />
                    )}
                  </Fragment>
                );
              })}
            </ol>

            {/* Whole-day backups (and any slot alternative with no matching
                stop) collect into one clearly-labeled bank below the plan —
                never mistaken for a scheduled step. */}
            {plan.dayAlts.length > 0 && (
              <div className="mt-6 sm:mt-8">
                <div className="flex items-center gap-2.5">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-terracotta-500/12 text-terracotta-700 flex items-center justify-center ring-1 ring-terracotta-500/25">
                    <ArrowLeftRight size={16} strokeWidth={2} />
                  </span>
                  <div>
                    <div className="font-serif text-[17px] sm:text-[19px] text-ink-900 leading-tight">
                      {t("alt_bank_title")}
                    </div>
                    <div className="text-[12px] text-ink-700/65 leading-snug">
                      {t("alt_bank_subtitle")}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-3">
                  {plan.dayAlts.map(idx => (
                    <AlternativeSwap
                      key={idx}
                      activity={localDay.activities[idx]}
                      isToday={isToday}
                      accentText={a.text}
                    />
                  ))}
                </div>
              </div>
            )}

            {localDay.driveNotes && (
              <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-cream-300/60 flex items-start gap-3">
                <span className="shrink-0 w-10 h-10 rounded-full bg-cream-100 text-ink-900 flex items-center justify-center">
                  <Car size={16} />
                </span>
                <div>
                  <div className="text-[12px] font-semibold text-ink-700/70">
                    {t("on_the_road")}
                  </div>
                  <p className="mt-0.5 text-ink-700/85 text-[14px] sm:text-[15px] leading-relaxed">
                    {localDay.driveNotes}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Everything else folds — collapsed by default so the chapter
              reads: hero → plan → tap only what you need. The map, gear,
              restaurants, tips, kids corner and nightcap each open with
              one tap instead of stacking into an endless scroll. */}
          <div className="mt-8 sm:mt-10 space-y-3">
          {dayPois.length > 0 && (
            <CollapsibleSection
              id="day-stops"
              icon={MapIcon}
              eyebrow={t("on_the_map")}
              title={t("the_days_stops")}
              subtitle={t("ordered_visit")}
              accentClass={a.text}
            >
              <MiniMap pois={dayPois} />
              <ol className="mt-4 grid sm:grid-cols-2 gap-2.5">
                {dayPois.map((p, i) => (
                  <li
                    key={p.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-cream-50"
                  >
                    <span className={`shrink-0 w-7 h-7 rounded-full ${a.dot} text-cream-50 flex items-center justify-center text-xs font-semibold`}>
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="font-serif text-[15px] text-ink-900 leading-tight">
                        {p.name}
                      </div>
                      {p.address && (
                        <div className="text-[12px] text-ink-700/60 mt-0.5 leading-snug">
                          {p.address}
                        </div>
                      )}
                      <div className="mt-1.5">
                        <NavigateLinks name={p.name} coords={p.coords} address={p.address} size={11} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </CollapsibleSection>
          )}

          {/* Day pack — what to bring. Items can reference a specific stop
              with a small chip the reader can tap to scroll back up to
              that activity. */}
          {localDay.gear && localDay.gear.length > 0 && (
            <CollapsibleSection
              icon={Backpack}
              eyebrow={t("gear_eyebrow")}
              title={t("gear_title")}
              subtitle={t("gear_kicker")}
              accentClass={a.text}
            >
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {localDay.gear.map((g, i) => {
                  const forName = g.for ? attractionNameById.get(g.for) : undefined;
                  return (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-cream-50"
                    >
                      <span
                        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                          g.for
                            ? "bg-terracotta-500/12 text-terracotta-600"
                            : "bg-olive-500/12 text-olive-700"
                        }`}
                      >
                        <Backpack size={14} strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0 pt-0.5 flex-1">
                        <div className="text-[13.5px] sm:text-[14.5px] text-ink-700/90 leading-snug">
                          {g.item}
                        </div>
                        {g.for && forName && (
                          <button
                            type="button"
                            onClick={() => scrollToActivity(g.for!)}
                            className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cream-100 text-ink-800 text-[11px] font-semibold hover:bg-cream-200 transition-colors"
                            title={forName}
                          >
                            <Activity size={9} strokeWidth={2.2} />
                            <span>
                              {t("gear_for_label")} {forName}
                            </span>
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CollapsibleSection>
          )}

          {/* Where to eat — curated restaurants for today's plan. */}
          {dayRestaurants.length > 0 && (
            <RestaurantsForDay restaurants={dayRestaurants} />
          )}

          {/* Good-to-know notes: day-specific reminders plus broader trip tips
              relevant to this chapter, merged into one section to avoid two
              near-identical "tips" blocks on the detail page. */}
          {((localDay.dayTips && localDay.dayTips.length > 0) || tips.length > 0) && (
            <CollapsibleSection
              icon={Lightbulb}
              eyebrow={t("daytips_eyebrow")}
              title={t("daytips_title")}
              subtitle={t("daytips_kicker")}
              accentClass={a.text}
            >
              <ul className="space-y-2.5">
                {(localDay.dayTips ?? []).map((line, i) => (
                  <li
                    key={`day-tip-${i}`}
                    className="relative ps-12 sm:ps-14 pe-4 sm:pe-5 py-4 sm:py-5 rounded-2xl bg-cream-50"
                  >
                    <span className="absolute start-3 sm:start-4 top-4 sm:top-5 w-7 h-7 rounded-full bg-cream-100 text-ink-700 flex items-center justify-center">
                      <StickyNote size={14} strokeWidth={1.8} />
                    </span>
                    <div className="text-[11px] font-semibold text-ink-700/60">
                      {t("severity_info")}
                    </div>
                    <p className="mt-1.5 text-[13.5px] sm:text-[14.5px] text-ink-700/85 leading-relaxed">
                      {line}
                    </p>
                  </li>
                ))}
                {tips.map(tip => {
                  const s = SEVERITY_STYLES[tip.severity];
                  const Icon = s.Icon;
                  return (
                    <li
                      key={tip.id}
                      className="relative ps-12 sm:ps-14 pe-4 sm:pe-5 py-4 sm:py-5 rounded-2xl bg-cream-50"
                    >
                      <span
                        className={`absolute start-3 sm:start-4 top-4 sm:top-5 w-7 h-7 rounded-full ${s.bg} ${s.text} flex items-center justify-center`}
                      >
                        <Icon size={14} />
                      </span>
                      <div
                        className={`text-[11px] font-semibold ${s.text}`}
                      >
                        {t(s.labelKey)}
                      </div>
                      <h4 className="mt-0.5 font-serif text-[16px] sm:text-lg text-ink-900 leading-snug">
                        {tip.title}
                      </h4>
                      <p className="mt-1.5 text-[13.5px] sm:text-[14.5px] text-ink-700/85 leading-relaxed">
                        {tip.body}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </CollapsibleSection>
          )}

          {/* Kids corner — one folded section for everything child-facing:
              the German word flashcards (moved here from the top of the
              chapter), the Hebrew fun pack (riddles, jokes, twisters,
              spotting challenge) and Quizzo. The fun pack is never
              date-locked — it's for the drive *to* the day's stops —
              while Quizzo keeps its unlock gate. Quiz is keyed on
              (day, lang) so flipping the language wipes the in-progress
              round + cached voice backend cleanly via a full remount. */}
          <CollapsibleSection
            icon={PartyPopper}
            eyebrow={t("kids_eyebrow")}
            title={t("funpack_title")}
            subtitle={t("kids_kicker")}
            accentClass="text-rust-600/85"
          >
            <div className="space-y-8">
              {germanWords.length > 0 && (
                <GermanWordCarousel dayNumber={day.dayNumber} words={germanWords} />
              )}
              {getKidsPack(day.dayNumber) && <FunPackBody dayNumber={day.dayNumber} />}
              <Quiz
                key={`${day.dayNumber}-${lang}`}
                day={day.dayNumber}
                locked={!isQuizUnlocked(day.dayNumber, day.date)}
                unlockDate={day.date}
              />
            </div>
          </CollapsibleSection>

          {/* Drink of the day — the closing flourish, folded like the rest.
              Adults-only nightcap suggestion. */}
          {localDay.drinkOfTheDay && (
            <CollapsibleSection
              icon={Wine}
              eyebrow={t("drink_eyebrow")}
              title={t("drink_title")}
              subtitle={t("drink_kicker")}
            >
              <DrinkOfTheDay drink={localDay.drinkOfTheDay} />
            </CollapsibleSection>
          )}
          </div>
        </div>

        {/* Prev / Next chapter nav */}
        <nav className="border-t border-cream-300/60 bg-cream-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-2 gap-3 sm:gap-6">
            {prevDay && localPrevDay ? (
              <button
                type="button"
                onClick={() => navigateChapter(prevDay.dayNumber)}
                className="group flex items-center gap-3 sm:gap-4 text-start p-3 sm:p-5 rounded-[var(--radius-card)] bg-cream-100 hover:bg-cream-200 transition-colors"
              >
                <span className="shrink-0 w-10 h-10 rounded-full bg-cream-50 text-ink-800 flex items-center justify-center group-hover:bg-ink-900 group-hover:text-cream-50 transition-colors">
                  {isRTL ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold text-ink-700/60">
                    {t("previous")} · {ROMAN[prevDay.dayNumber]}
                  </div>
                  <div className="mt-0.5 font-bold text-[14px] sm:text-base text-ink-900 leading-tight line-clamp-2">
                    {localPrevDay.title}
                  </div>
                </div>
              </button>
            ) : (
              <div />
            )}
            {nextDay && localNextDay ? (
              <button
                type="button"
                onClick={() => navigateChapter(nextDay.dayNumber)}
                className="group flex items-center gap-3 sm:gap-4 text-end p-3 sm:p-5 rounded-[var(--radius-card)] bg-cream-100 hover:bg-cream-200 transition-colors justify-end"
              >
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold text-ink-700/60">
                    {t("next")} · {ROMAN[nextDay.dayNumber]}
                  </div>
                  <div className="mt-0.5 font-bold text-[14px] sm:text-base text-ink-900 leading-tight line-clamp-2">
                    {localNextDay.title}
                  </div>
                </div>
                <span className="shrink-0 w-10 h-10 rounded-full bg-cream-50 text-ink-800 flex items-center justify-center group-hover:bg-ink-900 group-hover:text-cream-50 transition-colors">
                  {isRTL ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </span>
              </button>
            ) : (
              <div />
            )}
          </div>
        </nav>
      </article>
    </div>
  );
}

function SectionLabel({ eyebrow, title }: { eyebrow: string; title: string; accentClass?: string }) {
  return (
    <div>
      <div className="text-[12px] font-semibold text-ink-700/70">{eyebrow}</div>
      <h2 className="mt-0.5 section-title">{title}</h2>
    </div>
  );
}

function ActivityRow({
  activity,
  isToday,
  optional,
  accentText = "text-terracotta-600",
  alternatives
}: {
  activity: DayActivity;
  isToday: boolean;
  optional: boolean;
  accentText?: string;
  /** Slot alternatives that swap in for this activity, rendered as nested
   *  swap-in panels beneath the card. */
  alternatives?: DayActivity[];
}) {
  const t = useT();
  const localizePoi = useLocalizePoi();
  const rawAtt = activity.attractionId ? getAttraction(activity.attractionId) : undefined;
  const att = rawAtt ? localizePoi(rawAtt) : undefined;
  const [open, setOpen] = useState(false);
  const hasMoreInfo = !!att;

  /* Icon styling: optional always renders in the muted "not today" palette
     so the badge in the header doesn't have to fight a saturated terracotta
     circle. Today + optional is rare but handled cleanly this way. */
  const iconClasses = optional
    ? "bg-cream-50 text-ink-700/50"
    : isToday
      ? "bg-terracotta-500 text-cream-50"
      : "bg-cream-50 text-ink-900";

  return (
    <li
      id={activity.attractionId ? `activity-${activity.attractionId}` : undefined}
      className={`rounded-[var(--radius-card)] bg-cream-100 p-4 sm:p-5 scroll-mt-24 ${
        optional ? "opacity-80" : ""
      }`}
    >
      {/* Header row: icon + a bold time chip + tag/optional badges. One
          glance answers "when and what kind" before the title is read. */}
      <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1.5">
        <span
          className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${iconClasses}`}
        >
          {createElement(activityIcon(activity), {
            size: 16,
            strokeWidth: 1.7
          })}
        </span>
        {/* Alternative activities get a dedicated "swap-in" badge naming
            the slot they replace; everything else shows the time chip. */}
        {activity.alternativeFor ? (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-terracotta-500/12 text-terracotta-700 text-[12px] font-bold ring-1 ring-terracotta-500/25"
            title={t("alt_aria")}
            aria-label={t("alt_aria")}
          >
            <ArrowLeftRight size={11} strokeWidth={2} />
            {t(ALT_KEY[activity.alternativeFor])}
          </span>
        ) : activity.time ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cream-50 text-ink-900 text-[12px] font-bold tabular-nums">
            <Clock size={11} strokeWidth={2} />
            {activity.time}
          </span>
        ) : null}
        {activity.tag && (
          <span className="text-[11px] text-ink-700/60 font-semibold">
            {t(TAG_KEY[activity.tag] ?? "tag_view")}
          </span>
        )}
        {/* An alternative is already flagged by its own badge — don't also
            stack the generic "Optional" pill on it. */}
        {optional && !activity.alternativeFor && (
          <span
            className="inline-flex items-center px-2 py-[2px] rounded-full bg-cream-50 text-ink-700/70 text-[10px] font-semibold"
            title={t("optional_aria")}
            aria-label={t("optional_aria")}
          >
            {t("optional_label")}
          </span>
        )}
      </div>

      <div className="min-w-0 mt-2.5">
        <h4
          className={`font-serif text-[18px] sm:text-[22px] leading-snug ${
            optional ? "text-ink-800/90" : "text-ink-900"
          }`}
        >
          {activity.title}
        </h4>
        {activity.description && (
          <p className="mt-1.5 text-[14px] sm:text-[15px] text-ink-700/85 leading-relaxed">
            {activity.description}
          </p>
        )}

        {/* Official-site link: prefer attraction.website, fall back to
            activity.link when there's no full attraction entry. */}
        {(att?.website || (!att && activity.link)) && (
          <a
            href={att?.website ?? activity.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-2 inline-flex items-center gap-1 text-[12px] font-bold ${accentText} hover:underline transition-colors`}
          >
            <ExternalLink size={11} strokeWidth={1.9} />
            {t("official_site")} ↗
          </a>
        )}

        {hasMoreInfo && (
          <button
            onClick={() => setOpen(o => !o)}
            className={`mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold ${accentText} hover:underline transition-colors`}
            aria-expanded={open}
          >
            {open ? <X size={12} /> : <Plus size={12} />}
            {open ? t("hide_details") : t("more_about_place")}
          </button>
        )}

        <AnimatePresence initial={false}>
          {open && att && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-40 overflow-hidden"
            >
              <PlaceDetailCard att={att} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Swap-ins for this slot branch off the card as clearly-subordinate
          panels — a plan step and its alternatives never look alike. */}
      {alternatives && alternatives.length > 0 && (
        <div className="mt-4 space-y-3">
          {alternatives.map((alt, i) => (
            <AlternativeSwap
              key={i}
              activity={alt}
              isToday={isToday}
              accentText={accentText}
              connected
            />
          ))}
        </div>
      )}
    </li>
  );
}

/* ---------- Shared "about this place" detail card ---------- */

/* The expandable place panel used by both a plan card and an alternative
 * swap-in — photo + description + narration + tips + links. Extracted so the
 * two entry points stay visually and behaviorally identical. `att` must be
 * localized already. */
function PlaceDetailCard({ att }: { att: POI }) {
  const t = useT();
  return (
    <div className="mt-4 rounded-2xl bg-cream-50 overflow-hidden grid sm:grid-cols-[200px_1fr]">
      <div className="relative aspect-[4/3] sm:aspect-auto bg-cream-200 overflow-hidden">
        <PoiImage
          src={att.image}
          alt={att.name}
          region={att.region}
          category={att.category}
          tags={att.tags}
        />
        {/* Credit omitted on this small thumb — shown on the
            hero carousel above where the photo dominates. */}
      </div>
      <div className="p-4 sm:p-5 flex flex-col">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-[11px] font-semibold text-ink-700/60">
            {t("about_this_place")}
          </div>
          {att.difficulty && (
            <div
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${DIFFICULTY_DETAIL_STYLE[att.difficulty].bg} ${DIFFICULTY_DETAIL_STYLE[att.difficulty].text}`}
            >
              <Activity size={10} strokeWidth={2.2} />
              {t(DIFFICULTY_DETAIL_STYLE[att.difficulty].key)}
            </div>
          )}
        </div>
        <h5 className="mt-1 font-serif text-lg text-ink-900 leading-tight">
          {att.name}
        </h5>
        <p className="mt-2 text-[13.5px] sm:text-[14.5px] text-ink-700/85 leading-relaxed">
          {att.description}
        </p>
        {/* German-accented narration of the description.
            Audio is pre-generated as a static asset, so no
            runtime API key or call is needed. */}
        <div className="mt-3">
          <ListenButton attractionId={att.id} />
        </div>
        {(att.openingNote || att.bookingNote) && (
          <div className="mt-3 text-xs text-terracotta-700 bg-terracotta-500/10 border border-terracotta-500/25 rounded-lg px-3 py-2 leading-snug">
            {att.openingNote || att.bookingNote}
          </div>
        )}
        {att.tips && att.tips.length > 0 && (
          <div className="mt-4 pt-3 border-t border-cream-300/70">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-700/70">
              <Lightbulb size={11} strokeWidth={1.9} />
              {t("insider_tips_label")}
            </div>
            <ul className="mt-2 space-y-1">
              {att.tips.map((tip, i) => (
                <li
                  key={i}
                  className="text-[12.5px] leading-snug text-ink-700/85 flex gap-2"
                >
                  <span
                    className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-terracotta-500/70"
                    aria-hidden
                  />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-auto pt-4 flex flex-wrap gap-x-4 gap-y-2">
          {att.website && (
            <a
              href={att.website}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              <ExternalLink size={12} /> {t("website")}
            </a>
          )}
          <NavigateLinks name={att.name} coords={att.coords} address={att.address} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Alternative swap-in panel ---------- */

/* A deliberately different-looking card for an *alternative* activity: a
 * dashed terracotta outline over a warm tinted wash, led by a loud "⇄
 * Instead of the morning" ribbon. Nothing about it reads as a scheduled
 * step — it's visibly a branch off the plan. `connected` draws a short
 * dashed tether up to the plan card it swaps in for. */
function AlternativeSwap({
  activity,
  accentText = "text-terracotta-600",
  connected = false
}: {
  activity: DayActivity;
  isToday?: boolean;
  accentText?: string;
  connected?: boolean;
}) {
  const t = useT();
  const localizePoi = useLocalizePoi();
  const rawAtt = activity.attractionId ? getAttraction(activity.attractionId) : undefined;
  const att = rawAtt ? localizePoi(rawAtt) : undefined;
  const [open, setOpen] = useState(false);
  const slot = activity.alternativeFor ?? "day";

  return (
    <div className="relative ps-3 sm:ps-4">
      {/* "or" tether — a short dashed stub linking the panel up to the plan
          card it swaps in for, with a little pill sitting on it. */}
      {connected && (
        <>
          <span
            aria-hidden
            className="absolute -top-3 start-0 h-3 border-s-2 border-dashed border-terracotta-500/45"
          />
          <span className="absolute -top-[11px] start-2.5 px-1.5 rounded-full bg-cream-50 text-terracotta-700 text-[10px] font-bold ring-1 ring-terracotta-500/25">
            {t("alt_or")}
          </span>
        </>
      )}
      <div
        id={activity.attractionId ? `activity-${activity.attractionId}` : undefined}
        className="relative rounded-[var(--radius-card)] border-2 border-dashed border-cream-300 bg-cream-100/60 p-4 sm:p-5 scroll-mt-24"
      >
        {/* The loud swap ribbon — the "this is an OR, not a next step"
            signal, riding the top edge of the panel. */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-500 text-cream-50 text-[11px] font-bold">
            <ArrowLeftRight size={12} strokeWidth={2.4} />
            {t(SWAP_KEY[slot])}
          </span>
          {activity.tag && (
            <span className="text-[11px] text-ink-700/60 font-semibold">
              {t(TAG_KEY[activity.tag] ?? "tag_view")}
            </span>
          )}
        </div>

        <div className="min-w-0 mt-3">
          <h4 className="font-serif text-[17px] sm:text-[20px] leading-snug text-ink-900">
            {activity.title}
          </h4>
          {activity.description && (
            <p className="mt-1.5 text-[13.5px] sm:text-[14.5px] text-ink-700/85 leading-relaxed">
              {activity.description}
            </p>
          )}

          {(att?.website || (!att && activity.link)) && (
            <a
              href={att?.website ?? activity.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-2 inline-flex items-center gap-1 text-[12px] font-bold ${accentText} hover:underline transition-colors`}
            >
              <ExternalLink size={11} strokeWidth={1.9} />
              {t("official_site")} ↗
            </a>
          )}

          {att && (
            <button
              onClick={() => setOpen(o => !o)}
              className={`mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold ${accentText} hover:underline transition-colors`}
              aria-expanded={open}
            >
              {open ? <X size={12} /> : <Plus size={12} />}
              {open ? t("hide_details") : t("more_about_place")}
            </button>
          )}

          <AnimatePresence initial={false}>
            {open && att && (
              <motion.div
                key="details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-40 overflow-hidden"
              >
                <PlaceDetailCard att={att} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ---------- Inline ride connector ---------- */

/* A small "↓ 30 min · winding climb" pill that slips between two
 * activity rows. Visually it sits in the timeline column (left, where
 * the activity icons live) and threads a soft dashed line into the next
 * row, so the eye reads it as a connector rather than a separate item. */
function RideConnector({ 
  duration, 
  note, 
  departAt 
}: { 
  duration?: string; 
  note?: string; 
  departAt?: string;
}) {
  const t = useT();
  return (
    <li
      className="flex items-start gap-2.5 ps-4 sm:ps-5 py-0.5"
      aria-hidden={false}
    >
      {/* Small car marker threading the gap between two activity cards,
          so the drive reads as a connector rather than a stop. */}
      <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-cream-100 text-ink-700">
        <Car size={11} strokeWidth={1.9} />
      </span>
      <div className="min-w-0 pt-0.5">
        <div className="inline-flex items-baseline flex-wrap gap-x-2 gap-y-0.5">
          <span className="text-[11px] font-semibold text-ink-700/70">
            {departAt ? `${t("depart_at")} ${departAt} ${duration ? "· " + t("ride_to_next") : ""}` : t("ride_to_next")}
          </span>
          {duration && (
            <span className="font-bold text-[14px] sm:text-[15px] text-ink-900">
              {duration}
            </span>
          )}
          {note && (
            <span className="text-[12px] sm:text-[13px] text-ink-700/65">
              {duration ? "· " : ""}{note}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

/* ---------- Restaurants for the day ---------- */

function RestaurantsForDay({ restaurants }: { restaurants: Service[] }) {
  const t = useT();
  return (
    <CollapsibleSection
      icon={Utensils}
      eyebrow={t("restaurants_eyebrow")}
      title={t("restaurants_title")}
      subtitle={t("restaurants_kicker")}
    >
      <ul className="grid sm:grid-cols-2 gap-2.5">
        {restaurants.map(r => (
          <li
            key={r.id}
            className="flex items-start gap-3 p-3 rounded-xl bg-cream-50"
          >
            <span className="shrink-0 w-9 h-9 rounded-full bg-cream-100 text-ink-900 flex items-center justify-center">
              <Utensils size={15} strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-serif text-[15px] sm:text-[16px] text-ink-900 leading-tight">
                {r.name}
              </div>
              {r.shortDescription && (
                <div className="mt-0.5 text-[12.5px] sm:text-[13.5px] text-ink-700/85 leading-snug">
                  {r.shortDescription}
                </div>
              )}
              {r.address && (
                <div className="mt-1 text-[11.5px] sm:text-[12px] text-ink-700/55 leading-snug">
                  {r.address}
                </div>
              )}
              {r.hours && (
                <div className="mt-0.5 text-[11.5px] sm:text-[12px] text-ink-700/55 leading-snug">
                  {t("hours")} · {r.hours}
                </div>
              )}
              <div className="mt-2">
                <NavigateLinks name={r.name} coords={r.coords} address={r.address} size={11} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </CollapsibleSection>
  );
}

/* ---------- Drink of the day ---------- */

/* The closing flourish — visually echoes the German word card opener but
 * with a per-drink palette and a wine/cocktail/etc. icon. Keeps the
 * proper German name as a serif headline; the prose underneath gets
 * translated. Adults-only — that part is the kicker copy. */
function DrinkOfTheDay({ drink }: { drink: DayDrink }) {
  const t = useT();
  const style = DRINK_STYLES[drink.type] ?? DRINK_STYLES.other;
  const Icon = style.Icon;

  return (
    <article
      className="relative overflow-hidden rounded-[var(--radius-card)] bg-cream-50"
    >
        {/* Oversized decorative glass icon in the corner, mirroring the
            quote glyph on the German word card. RTL flips it so it
            still reads as a "watermark" on the trailing edge. */}
        <Icon
          size={140}
          strokeWidth={1}
          className={`absolute -top-6 end-0 ${style.chipText} opacity-[0.06] pointer-events-none rtl:scale-x-[-1]`}
          aria-hidden
        />

        <div className="relative px-5 sm:px-8 py-6 sm:py-8">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-ink-700/70">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${style.accentDot}`} />
            {t("drink_eyebrow")}
          </div>

          <div className="mt-4 sm:mt-5 flex items-baseline flex-wrap gap-x-4 gap-y-2">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink-900 leading-none">
              {drink.name}
            </h2>
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${style.chipBg} ${style.chipText} text-[11px] font-semibold`}
            >
              <Icon size={11} strokeWidth={1.9} />
              {t(style.labelKey)}
            </div>
          </div>

          <p className="mt-4 text-[14.5px] sm:text-[16px] text-ink-700/90 leading-relaxed">
            <span className="text-[12px] font-semibold text-ink-700/60 me-2">
              {t("drink_pairing_label")}
            </span>
            {drink.pairing}
          </p>

          {drink.servingNote && (
            <div className="mt-5 pt-5 border-t border-cream-300">
              <div className="text-[12px] font-semibold text-ink-700/60">
                {t("drink_serving_label")}
              </div>
              <p className="mt-1.5 text-[15px] sm:text-[16px] text-ink-900 leading-snug">
                {drink.servingNote}
              </p>
            </div>
          )}
      </div>
    </article>
  );
}
