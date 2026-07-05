import { Compass, UtensilsCrossed, Map as MapIcon, ChevronRight } from "lucide-react";
import { useT, type DictKey } from "../../lib/dict";
import { navigateTab, type TabKey } from "../../lib/route";
import { attractions } from "../../data/attractions";
import { dishes } from "../../data/dishes";

const CARDS: {
  tab: TabKey;
  title: DictKey;
  sub: DictKey;
  count: number;
  countKey: DictKey;
  Icon: typeof Compass;
  tint: string;
  iconColor: string;
}[] = [
  {
    tab: "places",
    title: "explore_card_places",
    sub: "explore_card_places_sub",
    count: attractions.length,
    countKey: "explore_count_places",
    Icon: Compass,
    tint: "bg-surface",
    iconColor: "text-terracotta-600"
  },
  {
    tab: "food",
    title: "explore_card_food",
    sub: "explore_card_food_sub",
    count: dishes.length,
    countKey: "explore_count_food",
    Icon: UtensilsCrossed,
    tint: "bg-surface-next",
    iconColor: "text-olive-600"
  }
];

export default function ExploreHub() {
  const t = useT();
  return (
    <div className="mx-auto max-w-lg px-4 pt-6 pb-8">
      <h1 className="font-serif text-3xl sm:text-4xl leading-tight text-ink-900">{t("explore_title")}</h1>
      <p className="mt-2 font-serif italic text-ink-700/70 text-base">{t("explore_kicker")}</p>

      <div className="mt-6 space-y-3">
        {CARDS.map(({ tab, title, sub, count, countKey, Icon, tint, iconColor }) => (
          <button
            key={tab}
            onClick={() => navigateTab(tab)}
            className={`w-full text-start rounded-[var(--radius-card)] p-5 ${tint} flex items-center gap-4 active:scale-[0.99] transition-transform`}
          >
            <span className="grid place-items-center w-12 h-12 rounded-2xl bg-cream-50/70 shrink-0">
              <Icon size={24} className={iconColor} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-serif text-xl text-ink-900 leading-tight">{t(title)}</div>
              <div className="text-sm text-ink-700/75 mt-0.5">{t(sub)}</div>
              <div className={`text-[11px] font-semibold mt-1.5 ${iconColor}`}>
                {t(countKey, { n: count })}
              </div>
            </div>
            <ChevronRight size={20} className="text-ink-700/40 shrink-0 rtl:scale-x-[-1]" />
          </button>
        ))}
      </div>

      {/* Cross-link: the whole trip on the map */}
      <button
        onClick={() => navigateTab("map")}
        className="mt-3 w-full text-start rounded-[var(--radius-card)] px-5 py-3.5 border border-cream-300/70 flex items-center gap-3 text-ink-700 hover:bg-cream-100 active:scale-[0.99] transition"
      >
        <MapIcon size={18} className="text-lake-600 shrink-0" />
        <span className="flex-1 text-sm font-medium">{t("explore_open_map")}</span>
        <ChevronRight size={18} className="text-ink-700/40 shrink-0 rtl:scale-x-[-1]" />
      </button>
    </div>
  );
}
