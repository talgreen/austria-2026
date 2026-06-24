import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, MapPin } from "lucide-react";
import type { Day, POI } from "../data/types";
import { getAttraction } from "../data/attractions";
import { getTripState } from "../lib/tripState";
import { navigateChapter } from "../lib/route";
import { useT, localizeShortDate, localizeWeekday, type DictKey } from "../lib/dict";
import { useLang } from "../lib/i18n";
import { useLocalizeDay, useLocalizePoi } from "../data/i18n";
import PoiImage from "./PoiImage";
import { getAreaForDay } from "../data/areas";
import { accentClasses } from "../lib/accent";
import { LeaveByBadge, DriveConnector, TimelineStop } from "./Timeline";

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const REGION_KEY: Record<string, DictKey> = {
  north: "region_north_short",
  south: "region_south_short",
  transit: "region_transit_short"
};

interface ResolvedLead {
  src?: string;
  alt: string;
  category?: POI["category"];
  tags?: POI["tags"];
}

/**
 * Pick the best lead image for the chapter card. Photo credit is intentionally
 * NOT surfaced here — too small to read and overlaps the title/date on mobile.
 * Full attribution is shown on the dedicated chapter detail page instead.
 */
function resolveLead(day: Day, getPoi: (p: POI) => POI): ResolvedLead {
  const fromActivity = day.activities
    .map(a => (a.attractionId ? getAttraction(a.attractionId) : undefined))
    .find(a => !!a?.image);
  if (fromActivity?.image) {
    const local = getPoi(fromActivity);
    return {
      src: fromActivity.image,
      alt: local.name,
      category: fromActivity.category,
      tags: fromActivity.tags
    };
  }
  if (day.leadImage) {
    return {
      src: day.leadImage,
      alt: day.title
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

export default function ChapterCard({ day }: { day: Day }) {
  const t = useT();
  const { lang } = useLang();
  const localizeDay = useLocalizeDay();
  const localizePoi = useLocalizePoi();
  const localDay = localizeDay(day);

  const area = getAreaForDay(day.dayNumber);
  const a = accentClasses(area.accent);

  const tripState = getTripState();
  const isToday =
    tripState.phase === "during" && tripState.today.dayNumber === day.dayNumber;

  const lead = resolveLead(localDay, localizePoi);

  return (
    <article
      className={`group h-full flex flex-col rounded-3xl overflow-hidden bg-cream-50 ${
        isToday
          ? `ring-2 ${a.ring} shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]`
          : "ring-1 ring-cream-300/70 shadow-[0_18px_40px_-22px_rgba(58,28,15,0.18)]"
      }`}
    >
      {/* Hero photo */}
      <div className="relative aspect-[16/8] sm:aspect-[16/7] overflow-hidden bg-ink-900 shrink-0">
        <PoiImage
          src={lead.src}
          alt={lead.alt}
          region={localDay.region === "transit" ? "north" : localDay.region}
          category={lead.category}
          tags={lead.tags}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/55 to-ink-900/15" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink-900/40 to-transparent" />

        <div className="absolute top-3 sm:top-4 left-4 sm:left-5 right-4 sm:right-5 flex items-start justify-between gap-2 text-cream-50">
          <div className="flex items-baseline gap-2 sm:gap-3">
            <div className="font-serif text-2xl sm:text-3xl leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
              {ROMAN[day.dayNumber]}
            </div>
            <div className="hidden sm:block h-px w-10 bg-cream-50/40 mb-1.5" />
            <div className={`text-[9px] uppercase tracking-[0.24em] font-medium ${a.text}`}>
              {t("plan_chapter_x_of_y", { x: String(day.dayNumber).padStart(2, "0"), y: "10" })}
            </div>
          </div>
          {isToday && (
            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${a.dot} text-cream-50 text-[9px] uppercase tracking-[0.22em] font-bold`}>
              {t("today")}
            </div>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5 text-cream-50">
          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-cream-50/85 font-medium">
            <span>{localizeWeekday(day.weekday, lang)}</span>
            <span aria-hidden>·</span>
            <span>{localizeShortDate(day.date, lang)}</span>
            <span aria-hidden>·</span>
            <span>{t(REGION_KEY[day.region])}</span>
          </div>
          <h3 className="mt-1 font-serif text-xl sm:text-3xl leading-[1.05] tracking-tight max-w-md drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            {localDay.title}
          </h3>
        </div>
      </div>

      {/* Activity preview */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 flex-1 flex flex-col">
        {localDay.base && (
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-700/55 font-medium flex items-center gap-1.5 mb-3">
            <MapPin size={10} className="opacity-70" />
            <span className="normal-case tracking-normal">{localDay.base}</span>
          </div>
        )}

        {/* Condensed timeline spine */}
        <div className="flex-1">
          {localDay.departureTime && (
            <div className="mb-2">
              <LeaveByBadge time={localDay.departureTime} accent={area.accent} />
            </div>
          )}
          <div className="mt-1">
            {localDay.rideToFirst && (
              <DriveConnector
                duration={localDay.rideToFirst.duration}
                note={localDay.rideToFirst.note}
                accent={area.accent}
              />
            )}
            {localDay.activities.map((act, i) => (
              <div key={i}>
                <TimelineStop activity={act} accent={area.accent} variant="card" />
                {act.rideToNext && (
                  <DriveConnector
                    duration={act.rideToNext.duration}
                    note={act.rideToNext.note}
                    departAt={act.rideToNext.departAt}
                    accent={area.accent}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Read more CTA */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => navigateChapter(day.dayNumber)}
          className={`mt-5 sm:mt-6 group/cta inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:self-stretch px-5 py-3 rounded-xl bg-ink-900 text-cream-50 ${a.hoverDot} transition-colors`}
        >
          <span className="font-serif italic text-[15px]">{t("read_more")}</span>
          {lang === "he" ? (
            <ArrowLeft size={15} className="transition-transform group-hover/cta:-translate-x-1" />
          ) : (
            <ArrowRight size={15} className="transition-transform group-hover/cta:translate-x-1" />
          )}
        </motion.button>
      </div>
    </article>
  );
}
