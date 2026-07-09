import { motion } from "framer-motion";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import { itinerary } from "../data/itinerary";
import { areas, getStayForArea } from "../data/areas";
import { accentClasses } from "../lib/accent";
import { getTripState } from "../lib/tripState";
import { navigateChapter } from "../lib/route";
import { getAttraction } from "../data/attractions";
import { useT, localizeWeekday, localizeShortDate } from "../lib/dict";
import { useLang, useLoc } from "../lib/i18n";
import { useLocalizeDay, useLocalizeStay } from "../data/i18n";
import PoiImage from "./PoiImage";
import type { Day } from "../data/types";

/** Pick a representative photo for a day: the first activity whose
 *  attraction has an image, falling back to the day's explicit leadImage.
 *  (Same rule the old chapter strip used, kept for visual continuity.) */
function leadImageFor(day: Day) {
  const lead = day.activities
    .map(a => (a.attractionId ? getAttraction(a.attractionId) : undefined))
    .find(a => !!a?.image);
  return { src: lead?.image ?? day.leadImage, category: lead?.category, tags: lead?.tags };
}

/**
 * "The Route" — the itinerary rendered as a vertical journey spine.
 *
 * The 18 days are grouped into the trip's five bases (areas). A single
 * continuous line threads top-to-bottom through numbered stops (Arabic
 * day numbers — no Roman numerals, no horizontal scroll), coloured per
 * leg by the area accent. During the trip the current day pulses in
 * Austrian red; past days recede. Tapping a stop opens that chapter.
 */
export default function RouteTimeline() {
  const t = useT();
  const { lang, dir } = useLang();
  const loc = useLoc();
  const localizeDay = useLocalizeDay();
  const localizeStay = useLocalizeStay();
  const trip = getTripState();
  const todayNumber = trip.phase === "during" ? trip.today.dayNumber : null;
  const Arrow = dir === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <div className="mx-auto max-w-2xl px-4">
      {areas.map((area, ai) => {
        const a = accentClasses(area.accent);
        const stay = getStayForArea(area);
        const stayName = stay ? localizeStay(stay).name : undefined;
        const isFirstArea = ai === 0;

        return (
          <section key={area.id} aria-label={loc(area.name)}>
            {/* Leg header — a base marker on the spine */}
            <div className="flex items-stretch gap-3">
              <div className="relative w-10 shrink-0 flex justify-center">
                <span
                  className={`absolute ${isFirstArea ? "top-1/2" : "top-0"} bottom-0 w-[3px] rounded-full ${a.dot} opacity-25`}
                  aria-hidden
                />
                <span className={`relative z-10 mt-1 grid place-items-center w-9 h-9 rounded-full ${a.bgTint} ring-2 ${a.ring}`}>
                  <Home size={15} className={a.text} />
                </span>
              </div>
              <div className="pt-1 pb-3">
                <div className={`text-[11px] uppercase tracking-[0.2em] font-bold ${a.text}`}>
                  {loc(area.shortName)}
                </div>
                <div className="text-sm font-semibold text-ink-900 mt-0.5">
                  {area.nights === 1
                    ? t("stay_nights_one", { n: area.nights })
                    : t("stay_nights_many", { n: area.nights })}
                  {" · "}
                  {localizeShortDate(area.startDate, lang)}–{localizeShortDate(area.endDate, lang)}
                </div>
                {stayName && <div className="text-xs text-ink-700/65 mt-0.5">{stayName}</div>}
              </div>
            </div>

            {/* Days in this leg — numbered stops on the spine */}
            {area.dayNumbers.map((dn, di) => {
              const day = itinerary.find(d => d.dayNumber === dn);
              if (!day) return null;
              const ld = localizeDay(day);
              const isToday = dn === todayNumber;
              const isPast = todayNumber !== null && dn < todayNumber;
              const first = ld.activities[0];
              const img = leadImageFor(day);
              const isLastStop = ai === areas.length - 1 && di === area.dayNumbers.length - 1;

              return (
                <motion.div
                  key={dn}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3 }}
                  className="flex items-stretch gap-3"
                >
                  {/* Spine + numbered node */}
                  <div className="relative w-10 shrink-0 flex justify-center">
                    <span
                      className={`absolute top-0 ${isLastStop ? "h-6" : "bottom-0"} w-[3px] rounded-full ${a.dot} opacity-25`}
                      aria-hidden
                    />
                    <span
                      className={`relative z-10 mt-1.5 grid place-items-center w-8 h-8 rounded-full text-[13px] font-bold tabular-nums ring-4 ring-cream-50 ${
                        isToday
                          ? "bg-rust-500 text-cream-50"
                          : isPast
                          ? "bg-ink-700/20 text-ink-700/70"
                          : `${a.dot} text-cream-50`
                      }`}
                    >
                      {isToday && (
                        <span className="absolute inset-0 rounded-full bg-rust-500 animate-ping opacity-60" aria-hidden />
                      )}
                      <span className="relative">{dn}</span>
                    </span>
                  </div>

                  {/* Day card — tap to open the chapter */}
                  <button
                    onClick={() => navigateChapter(dn)}
                    className={`group mb-3 flex-1 min-w-0 text-start rounded-[var(--radius-card)] bg-surface hover:bg-cream-100 transition-colors overflow-hidden flex items-stretch active:scale-[0.99] ${
                      isPast ? "opacity-70" : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0 py-3 ps-4 pe-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-ink-700/60">
                          {localizeWeekday(day.weekday, lang, true)} · {localizeShortDate(day.date, lang)}
                        </span>
                        {isToday && (
                          <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-rust-600 bg-rust-500/10 rounded-full px-2 py-0.5">
                            {t("today")}
                          </span>
                        )}
                      </div>
                      <div className="font-serif text-lg leading-snug text-ink-900 mt-0.5 line-clamp-2">
                        {ld.title}
                      </div>
                      {first && (
                        <div className="text-xs text-ink-700/65 mt-1 line-clamp-1">
                          {first.time ? `${first.time} · ` : ""}
                          {first.title}
                        </div>
                      )}
                    </div>

                    <div className="relative w-20 shrink-0 self-stretch">
                      <PoiImage
                        src={img.src}
                        alt={ld.title}
                        region={day.region}
                        category={img.category}
                        tags={img.tags}
                      />
                    </div>

                    <div className="self-center px-2 text-ink-700/30 group-hover:text-ink-700/60 transition-colors">
                      <Arrow size={18} />
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
