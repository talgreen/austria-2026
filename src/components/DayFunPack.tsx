import { Gamepad2, Laugh, PartyPopper, Puzzle, Speech } from "lucide-react";
import { getKidsPack, getRoadGame } from "../data/kids";
import { useT, type DictKey } from "../lib/dict";
import { useLang } from "../lib/i18n";
import { navigateTab } from "../lib/route";
import { ChallengeCard, RevealCard, TongueTwisterCard } from "./FunPackCards";

/** Small group label inside the pack — icon + localized heading. */
function GroupLabel({ icon: Icon, labelKey }: { icon: typeof Puzzle; labelKey: DictKey }) {
  const t = useT();
  return (
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-rust-600/85 font-medium">
      <Icon size={14} strokeWidth={2} />
      {t(labelKey)}
    </div>
  );
}

/** The pack's content — riddles, jokes, twisters, challenge, suggested
 *  games. Shared between the chapter page and the Kids tab (which wraps
 *  it with its own day picker). */
export function FunPackBody({
  dayNumber,
  showGamesLink = true
}: {
  dayNumber: number;
  /** Chips linking to the Kids tab's games library. The Kids tab itself
   *  renders the library on-page, so it hides the link. */
  showGamesLink?: boolean;
}) {
  const t = useT();
  const { lang } = useLang();
  const pack = getKidsPack(dayNumber);
  if (!pack) return null;

  const suggestedGames = (pack.gameIds ?? [])
    .map(getRoadGame)
    .filter(g => g !== undefined);

  return (
    <div className="space-y-8">
      {(pack.theme || lang === "en") && (
        <div dir="rtl" className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {pack.theme && (
            <p className="font-serif italic text-xl sm:text-2xl text-ink-900">
              {pack.theme}
            </p>
          )}
          {lang === "en" && (
            <span dir="ltr" className="text-xs text-ink-700/60 italic">
              {t("kids_hebrew_note")}
            </span>
          )}
        </div>
      )}

      <div className="space-y-3">
        <GroupLabel icon={Puzzle} labelKey="kids_riddles" />
        <div className="grid gap-3 md:grid-cols-2" dir="rtl">
          {pack.riddles.map((r, i) => (
            <RevealCard
              key={i}
              prompt={r.q}
              answer={r.a}
              difficulty={r.difficulty}
              emoji={r.emoji}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <GroupLabel icon={Laugh} labelKey="kids_jokes" />
        <div className="grid gap-3 md:grid-cols-2" dir="rtl">
          {pack.jokes.map((j, i) => (
            <RevealCard
              key={i}
              prompt={j.setup}
              answer={j.punchline}
              difficulty={j.difficulty}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <GroupLabel icon={Speech} labelKey="kids_twisters" />
        <div className="grid gap-3 md:grid-cols-2" dir="rtl">
          {pack.tongueTwisters.map((tw, i) => (
            <TongueTwisterCard key={i} twister={tw} />
          ))}
        </div>
      </div>

      <ChallengeCard challenge={pack.challenge} />

      {suggestedGames.length > 0 && (
        <div className="space-y-3">
          <GroupLabel icon={Gamepad2} labelKey="kids_suggested_games" />
          <div className="flex flex-wrap items-center gap-2" dir="rtl">
            {suggestedGames.map(g => (
              <button
                key={g.id}
                type="button"
                onClick={() => navigateTab("kids")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-cream-100 hover:bg-cream-200 active:bg-cream-300 ring-1 ring-cream-300/70 text-sm font-medium text-ink-900 transition-colors cursor-pointer"
              >
                <Gamepad2 size={14} className="text-rust-600" />
                {g.name}
              </button>
            ))}
            {showGamesLink && (
              <button
                type="button"
                onClick={() => navigateTab("kids")}
                className="text-sm font-medium text-rust-600 hover:text-rust-700 underline underline-offset-4 decoration-rust-500/40 cursor-pointer"
              >
                {t("kids_all_games_link")}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/** The chapter-page section: eyebrow/title header (visual language of
 *  the page's other `SectionLabel` sections) + the pack body. Rendered
 *  right before Quizzo so the chapter closes kids → parents. Unlike
 *  Quizzo there is no date gate — this content is for the drive *to*
 *  the day's stops, so it must be open before the day starts. */
export default function DayFunPack({ dayNumber }: { dayNumber: number }) {
  const t = useT();
  if (!getKidsPack(dayNumber)) return null;

  return (
    <section>
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] font-medium text-rust-600/85">
        <PartyPopper size={13} strokeWidth={2} />
        {t("kids_eyebrow")}
      </div>
      <h2 className="mt-1 font-serif font-black text-2xl sm:text-3xl text-ink-900 leading-tight">
        {t("funpack_title")}
      </h2>
      <div className="mt-6 sm:mt-8">
        <FunPackBody dayNumber={dayNumber} />
      </div>
    </section>
  );
}
