import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Languages,
  Laugh,
  Puzzle,
  Speech
} from "lucide-react";
import { kidsPacks, getKidsPack, roadGames } from "../data/kids";
import { itinerary } from "../data/itinerary";
import { useLocalizeDay } from "../data/i18n";
import { useT, localizeShortDate, type DictKey } from "../lib/dict";
import { useLang } from "../lib/i18n";
import { getCurrentOrUpcomingDayNumber, getTripState } from "../lib/tripState";
import Section from "./Section";
import CollapsibleSection from "./CollapsibleSection";
import GermanWordCarousel from "./GermanWordCarousel";
import { ChallengeCard, RevealCard, RoadGameCard, TongueTwisterCard } from "./FunPackCards";

type KidsSectionKey = "words" | "riddles" | "jokes" | "twisters" | "games";

const SECTION_META: Array<{
  key: KidsSectionKey;
  icon: typeof Puzzle;
  labelKey: DictKey;
}> = [
  { key: "words", icon: Languages, labelKey: "kids_words_title" },
  { key: "riddles", icon: Puzzle, labelKey: "kids_riddles" },
  { key: "jokes", icon: Laugh, labelKey: "kids_jokes" },
  { key: "twisters", icon: Speech, labelKey: "kids_twisters" },
  { key: "games", icon: Gamepad2, labelKey: "kids_road_games" }
];

/**
 * The Kids tab: a prev/next day stepper (replacing the old 18-chip
 * number strip), the day's spotting challenge front and center, and
 * everything else — German words, riddles, jokes, tongue twisters and
 * the road-games library — folded into collapsed sections. A quick-nav
 * chip row opens a section and scrolls straight to it.
 */
export default function KidsSection() {
  const t = useT();
  const { lang } = useLang();
  const localizeDay = useLocalizeDay();
  // "Today" = the featured chapter during the trip, Day 1 before/after.
  const todayDay = getCurrentOrUpcomingDayNumber();
  const isDuringTrip = getTripState().phase === "during";
  const [selectedDay, setSelectedDay] = useState(todayDay);
  const [open, setOpen] = useState<Record<KidsSectionKey, boolean>>({
    words: false,
    riddles: false,
    jokes: false,
    twisters: false,
    games: false
  });

  const maxDay = kidsPacks.length;
  const pack = getKidsPack(selectedDay);
  const day = itinerary.find(d => d.dayNumber === selectedDay);
  const localDay = day ? localizeDay(day) : undefined;
  const germanWords = localDay?.germanWords ?? [];
  const isToday = isDuringTrip && selectedDay === todayDay;

  // RTL flips reading direction, so "previous day" points right in Hebrew.
  const PrevIcon = lang === "he" ? ChevronRight : ChevronLeft;
  const NextIcon = lang === "he" ? ChevronLeft : ChevronRight;

  const setOpenFor = (key: KidsSectionKey) => (next: boolean) =>
    setOpen(o => ({ ...o, [key]: next }));

  /** Quick-nav chip: open the section (if needed) and scroll to it. */
  const jumpTo = (key: KidsSectionKey) => {
    setOpen(o => ({ ...o, [key]: true }));
    window.setTimeout(() => {
      document
        .getElementById(`kids-${key}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 160);
  };

  const sectionsForDay = SECTION_META.filter(s => {
    if (s.key === "words") return germanWords.length > 0;
    if (s.key === "games") return true;
    return !!pack;
  });

  return (
    <Section
      id="kids"
      eyebrow={t("kids_eyebrow")}
      title={t("kids_title")}
      kicker={t("kids_kicker")}
    >
      {/* Day stepper — one day at a time instead of 18 number chips */}
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-cream-50 ring-1 ring-cream-300/70 px-2 py-2">
        <button
          type="button"
          onClick={() => setSelectedDay(d => Math.max(1, d - 1))}
          disabled={selectedDay <= 1}
          aria-label={t("kids_prev_day")}
          className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-ink-800 hover:bg-cream-100 active:bg-cream-200 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <PrevIcon size={20} strokeWidth={2} />
        </button>
        <div className="min-w-0 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="font-serif font-black text-xl text-ink-900">
              {t("hero_photo_day", { n: selectedDay })}
            </span>
            {isToday && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-mustard-500 text-rust-700 text-[10px] uppercase tracking-[0.12em] font-bold">
                {t("kids_today_chip")}
              </span>
            )}
          </div>
          {day && (
            <div className="text-[12px] text-ink-700/60">
              {localizeShortDate(day.date, lang)}
              {pack?.theme ? ` · ${pack.theme}` : ""}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setSelectedDay(d => Math.min(maxDay, d + 1))}
          disabled={selectedDay >= maxDay}
          aria-label={t("kids_next_day")}
          className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-ink-800 hover:bg-cream-100 active:bg-cream-200 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <NextIcon size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Quick-nav — opens a section and scrolls to it */}
      <div className="mt-4">
        <div className="text-[10px] uppercase tracking-[0.28em] text-ink-700/55 font-medium">
          {t("kids_jump_to")}
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
          {sectionsForDay.map(({ key, icon: Icon, labelKey }) => (
            <button
              key={key}
              type="button"
              onClick={() => jumpTo(key)}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-100 hover:bg-cream-200 active:bg-cream-300 ring-1 ring-cream-300/70 text-[13px] font-medium text-ink-900 transition-colors cursor-pointer"
            >
              <Icon size={13} className="text-rust-600" />
              {t(labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Today's challenge — the one always-open card, the day's face */}
      {pack && (
        <div className="mt-5">
          <ChallengeCard challenge={pack.challenge} />
        </div>
      )}

      {/* Folded sections — tap to open, content mounts lazily */}
      <div className="mt-5 space-y-3">
        {germanWords.length > 0 && (
          <CollapsibleSection
            id="kids-words"
            icon={Languages}
            title={t("kids_words_title")}
            accentClass="text-rust-600/85"
            open={open.words}
            onOpenChange={setOpenFor("words")}
            scrollOnOpen
          >
            <GermanWordCarousel key={selectedDay} dayNumber={selectedDay} words={germanWords} />
          </CollapsibleSection>
        )}

        {pack && (
          <CollapsibleSection
            id="kids-riddles"
            icon={Puzzle}
            title={t("kids_riddles")}
            accentClass="text-rust-600/85"
            open={open.riddles}
            onOpenChange={setOpenFor("riddles")}
            scrollOnOpen
          >
            <div className="grid gap-3 md:grid-cols-2" dir="rtl">
              {pack.riddles.map((r, i) => (
                <RevealCard
                  key={`${selectedDay}-${i}`}
                  prompt={r.q}
                  answer={r.a}
                  difficulty={r.difficulty}
                  emoji={r.emoji}
                />
              ))}
            </div>
          </CollapsibleSection>
        )}

        {pack && (
          <CollapsibleSection
            id="kids-jokes"
            icon={Laugh}
            title={t("kids_jokes")}
            accentClass="text-rust-600/85"
            open={open.jokes}
            onOpenChange={setOpenFor("jokes")}
            scrollOnOpen
          >
            <div className="grid gap-3 md:grid-cols-2" dir="rtl">
              {pack.jokes.map((j, i) => (
                <RevealCard
                  key={`${selectedDay}-${i}`}
                  prompt={j.setup}
                  answer={j.punchline}
                  difficulty={j.difficulty}
                />
              ))}
            </div>
          </CollapsibleSection>
        )}

        {pack && (
          <CollapsibleSection
            id="kids-twisters"
            icon={Speech}
            title={t("kids_twisters")}
            accentClass="text-rust-600/85"
            open={open.twisters}
            onOpenChange={setOpenFor("twisters")}
            scrollOnOpen
          >
            <div className="grid gap-3 md:grid-cols-2" dir="rtl">
              {pack.tongueTwisters.map((tw, i) => (
                <TongueTwisterCard key={`${selectedDay}-${i}`} twister={tw} />
              ))}
            </div>
          </CollapsibleSection>
        )}

        <CollapsibleSection
          id="kids-games"
          icon={Gamepad2}
          title={t("kids_road_games_title")}
          subtitle={t("kids_road_games_kicker")}
          accentClass="text-rust-600/85"
          open={open.games}
          onOpenChange={setOpenFor("games")}
          scrollOnOpen
        >
          <div className="grid gap-3 md:grid-cols-2">
            {roadGames.map(game => (
              <RoadGameCard key={game.id} game={game} />
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2 text-sm text-ink-700/70">
            <Gamepad2 size={16} className="text-rust-600/80 shrink-0" />
            {t("kids_games_footnote")}
          </div>
        </CollapsibleSection>
      </div>
    </Section>
  );
}
