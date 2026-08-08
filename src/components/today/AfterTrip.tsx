import { CalendarDays, Sparkles } from "lucide-react";
import { useT } from "../../lib/dict";
import { navigateTab, navigateChapter } from "../../lib/route";

export default function AfterTrip() {
  const t = useT();
  return (
    <div className="mx-auto max-w-lg px-4 pb-8 pt-6 space-y-4 text-center">
      <div className="text-4xl">🎉</div>
      <h1 className="text-[40px] font-extrabold tracking-tight leading-[1.02] text-ink-900">{t("today_after_title")}</h1>
      <p className="text-ink-700/80">{t("today_after_sub")}</p>
      <div className="grid grid-cols-2 gap-3 pt-2 text-start">
        <button
          onClick={() => navigateChapter(1)}
          className="card p-4 active:bg-cream-200 transition-colors"
        >
          <CalendarDays size={16} className="text-ink-900" />
          <div className="mt-2 font-bold text-ink-900">{t("today_after_itinerary")}</div>
        </button>
        <button
          onClick={() => navigateTab("kids")}
          className="card p-4 active:bg-cream-200 transition-colors"
        >
          <Sparkles size={16} className="text-ink-900" />
          <div className="mt-2 font-bold text-ink-900">{t("today_after_quiz")}</div>
        </button>
      </div>
    </div>
  );
}
