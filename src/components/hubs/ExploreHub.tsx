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
}[] = [
  {
    tab: "places",
    title: "explore_card_places",
    sub: "explore_card_places_sub",
    count: attractions.length,
    countKey: "explore_count_places",
    Icon: Compass
  },
  {
    tab: "food",
    title: "explore_card_food",
    sub: "explore_card_food_sub",
    count: dishes.length,
    countKey: "explore_count_food",
    Icon: UtensilsCrossed
  }
];

export default function ExploreHub() {
  const t = useT();
  return (
    <div className="mx-auto max-w-lg px-4 pt-6 pb-8">
      <h1 className="text-[28px] sm:text-4xl font-extrabold tracking-tight leading-tight text-ink-900">{t("explore_title")}</h1>
      <p className="mt-2 text-ink-700/75 text-[14px]">{t("explore_kicker")}</p>

      <div className="mt-6 card overflow-hidden divide-y divide-cream-300">
        {CARDS.map(({ tab, title, sub, count, countKey, Icon }) => (
          <button key={tab} onClick={() => navigateTab(tab)} className="list-row py-4">
            <span className="grid place-items-center w-11 h-11 rounded-full bg-cream-50 shrink-0">
              <Icon size={20} className="text-ink-900" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="list-row-title text-base">{t(title)}</div>
              <div className="list-row-sub mt-0.5">{t(sub)}</div>
              <div className="text-[11px] font-bold mt-1 text-terracotta-600">
                {t(countKey, { n: count })}
              </div>
            </div>
            <ChevronRight size={18} className="text-ink-700/40 shrink-0 rtl:scale-x-[-1]" />
          </button>
        ))}
        {/* Cross-link: the whole trip on the map */}
        <button onClick={() => navigateTab("map")} className="list-row py-4">
          <span className="grid place-items-center w-11 h-11 rounded-full bg-cream-50 shrink-0">
            <MapIcon size={20} className="text-ink-900" />
          </span>
          <span className="flex-1 list-row-title text-base">{t("explore_open_map")}</span>
          <ChevronRight size={18} className="text-ink-700/40 shrink-0 rtl:scale-x-[-1]" />
        </button>
      </div>
    </div>
  );
}
