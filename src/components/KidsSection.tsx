import { useState } from "react";
import { Gamepad2 } from "lucide-react";
import { kidsPacks, roadGames } from "../data/kids";
import { useT } from "../lib/dict";
import { getCurrentOrUpcomingDayNumber, getTripState } from "../lib/tripState";
import Section from "./Section";
import { FunPackBody } from "./DayFunPack";
import { RoadGameCard } from "./FunPackCards";

/**
 * The Kids tab: today's fun pack front and center, a day picker to
 * browse every chapter's pack, and the full road-games library below.
 * Only mounts while the tab is active (TabShell), and everything here
 * is plain strings — no gating, no network, works offline in the car.
 */
export default function KidsSection() {
  const t = useT();
  // "Today" = the featured chapter during the trip, Day 1 before/after.
  const todayDay = getCurrentOrUpcomingDayNumber();
  const isDuringTrip = getTripState().phase === "during";
  const [selectedDay, setSelectedDay] = useState(todayDay);

  return (
    <>
      <Section
        id="kids"
        eyebrow={t("kids_eyebrow")}
        title={t("kids_title")}
        kicker={t("kids_kicker")}
      >
        {/* Day picker — 18 chips, today marked, horizontal scroll on mobile */}
        <div className="mb-8">
          <div className="text-[10px] uppercase tracking-[0.28em] text-ink-700/55 font-medium">
            {t("kids_pick_day")}
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2 snap-x [-webkit-overflow-scrolling:touch]">
            {kidsPacks.map(pack => {
              const isSelected = pack.dayNumber === selectedDay;
              const isToday = isDuringTrip && pack.dayNumber === todayDay;
              return (
                <button
                  key={pack.dayNumber}
                  type="button"
                  onClick={() => setSelectedDay(pack.dayNumber)}
                  className={`shrink-0 snap-start inline-flex flex-col items-center justify-center min-w-12 px-3 py-2 rounded-2xl text-sm font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-mustard-500 text-ink-900 shadow-[0_3px_0_var(--color-mustard-600)]"
                      : "bg-cream-100 hover:bg-cream-200 active:bg-cream-300 ring-1 ring-cream-300/70 text-ink-900"
                  }`}
                >
                  <span>{pack.dayNumber}</span>
                  {isToday && (
                    <span
                      className={`text-[9px] uppercase tracking-[0.12em] ${
                        isSelected ? "text-rust-700" : "text-rust-600"
                      }`}
                    >
                      {t("kids_today_chip")}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-3 font-serif italic text-lg text-ink-700/85">
            {selectedDay === todayDay && isDuringTrip
              ? t("kids_today_pack", { n: selectedDay })
              : t("hero_photo_day", { n: selectedDay })}
          </div>
        </div>

        <FunPackBody key={selectedDay} dayNumber={selectedDay} showGamesLink={false} />
      </Section>

      {/* Road games library — the whole shared collection, always here */}
      <Section
        id="kids-games"
        eyebrow={t("kids_road_games")}
        title={t("kids_road_games_title")}
        kicker={t("kids_road_games_kicker")}
        toned
      >
        <div className="grid gap-3 md:grid-cols-2">
          {roadGames.map(game => (
            <RoadGameCard key={game.id} game={game} />
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm text-ink-700/70">
          <Gamepad2 size={16} className="text-rust-600/80 shrink-0" />
          {t("kids_games_footnote")}
        </div>
      </Section>
    </>
  );
}
