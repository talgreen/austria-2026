import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Binoculars, ChevronDown, Sparkles } from "lucide-react";
import type { KidsChallenge, KidsDifficulty, KidsRoadGame, KidsTongueTwister } from "../data/types";
import { useT } from "../lib/dict";

/**
 * Presentational primitives for the kids fun pack, shared by the
 * per-chapter `DayFunPack` and the `KidsSection` tab.
 *
 * The *content* (riddles, jokes, games) is Hebrew-only, so every card
 * hard-codes `dir="rtl"` — the same trick `Navbar` uses with `dir="ltr"`
 * — so it reads correctly even when the UI language is English. The
 * *chrome* (badges, hints, section labels) goes through `dict.ts` like
 * the rest of the app.
 */

export function DifficultyBadge({ difficulty }: { difficulty: KidsDifficulty }) {
  const t = useT();
  const style =
    difficulty === "easy"
      ? "bg-olive-500/10 text-olive-700"
      : "bg-gold-400/15 text-sienna-600";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-medium ${style}`}
    >
      {t(difficulty === "easy" ? "kids_difficulty_easy" : "kids_difficulty_medium")}
    </span>
  );
}

/** Tap-to-reveal card — the core interaction for riddles *and* jokes.
 *  The whole card is one big touch target: tap shows the answer with a
 *  soft spring, tap again hides it (kids love replaying the reveal). */
export function RevealCard({
  prompt,
  answer,
  difficulty,
  emoji
}: {
  prompt: string;
  answer: string;
  difficulty: KidsDifficulty;
  /** Answer-side payoff emoji (never shown with the prompt). */
  emoji?: string;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      dir="rtl"
      onClick={() => setOpen(o => !o)}
      aria-expanded={open}
      className="w-full text-start card-paper rounded-2xl p-4 sm:p-5 transition-transform active:scale-[0.98] cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="flex-1 text-[15px] sm:text-base text-ink-900 leading-relaxed">
          {prompt}
        </p>
        <DifficultyBadge difficulty={difficulty} />
      </div>

      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.div
            key="answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-cream-300/60 flex items-center gap-2">
              {emoji && (
                <span className="text-2xl leading-none" aria-hidden>
                  {emoji}
                </span>
              )}
              <span className="font-serif italic text-lg sm:text-xl text-terracotta-600 leading-snug">
                {answer}
              </span>
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-ink-700/45 font-medium">
              {t("kids_hide")}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-terracotta-600/75 font-medium"
          >
            <Sparkles size={12} strokeWidth={2} />
            {t("kids_reveal")}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

/** Always fully visible — the challenge is saying it, not guessing it. */
export function TongueTwisterCard({ twister }: { twister: KidsTongueTwister }) {
  const t = useT();
  return (
    <div dir="rtl" className="card-paper rounded-2xl p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="flex-1 font-serif text-lg sm:text-xl text-ink-900 leading-relaxed">
          {twister.text}
        </p>
        <DifficultyBadge difficulty={twister.difficulty} />
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-ink-700/50 font-medium">
        {t("kids_twister_hint")}
      </div>
    </div>
  );
}

/** The day's spotting mission — an accent callout in the visual language
 *  of the DrinkOfTheDay closing card (gradient, oversized watermark). */
export function ChallengeCard({ challenge }: { challenge: KidsChallenge }) {
  const t = useT();
  return (
    <article
      dir="rtl"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold-400/15 to-cream-100 ring-1 ring-cream-300/70 shadow-[0_18px_50px_-30px_rgba(151,109,76,0.45)]"
    >
      <Binoculars
        size={130}
        strokeWidth={1}
        className="absolute -top-5 end-0 text-sienna-600 opacity-[0.07] pointer-events-none rtl:scale-x-[-1]"
        aria-hidden
      />
      <div className="relative px-5 sm:px-7 py-5 sm:py-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-sienna-600/85 font-medium">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-400" />
          {t("kids_challenge")}
        </div>
        <h3 className="mt-3 font-serif italic text-2xl sm:text-3xl text-ink-900 leading-tight">
          {challenge.title}
        </h3>
        <p className="mt-2 text-[14.5px] sm:text-base text-ink-700/90 leading-relaxed">
          {challenge.description}
        </p>
      </div>
    </article>
  );
}

/** Collapsible road-game card: name + tagline on the collapsed face,
 *  numbered how-to-play steps when expanded. */
export function RoadGameCard({ game }: { game: KidsRoadGame }) {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <div dir="rtl" className="card-paper rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full text-start p-4 sm:p-5 transition-colors hover:bg-cream-100/60 active:bg-cream-200/50 cursor-pointer"
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-serif text-xl sm:text-2xl text-ink-900 leading-snug">
            {game.name}
          </h3>
          <div className="flex items-center gap-2 shrink-0">
            {game.minAge != null && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-terracotta-500/10 text-terracotta-600 text-[11px] font-medium">
                {game.minAge}+
              </span>
            )}
            <DifficultyBadge difficulty={game.difficulty} />
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-ink-700/60"
            >
              <ChevronDown size={18} strokeWidth={2} />
            </motion.span>
          </div>
        </div>
        <p className="mt-1.5 text-sm text-ink-700/80 leading-relaxed">
          {game.tagline}
        </p>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-cream-300/60">
              <div className="mt-3 text-[10px] uppercase tracking-[0.24em] text-terracotta-600/85 font-medium">
                {t("kids_how_to_play")}
              </div>
              <ol className="mt-2.5 space-y-2">
                {game.howToPlay.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="shrink-0 w-5 h-5 mt-0.5 rounded-full bg-terracotta-500/10 text-terracotta-600 text-[11px] font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-sm text-ink-700/90 leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
