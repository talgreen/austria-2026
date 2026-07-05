import { Compass, UtensilsCrossed, ChevronRight } from "lucide-react";
import { useT, type DictKey } from "../../lib/dict";
import { navigateTab, type TabKey } from "../../lib/route";

const CARDS: {
  tab: TabKey;
  title: DictKey;
  sub: DictKey;
  Icon: typeof Compass;
  tint: string;
  iconColor: string;
}[] = [
  { tab: "places", title: "explore_card_places", sub: "explore_card_places_sub", Icon: Compass, tint: "bg-surface", iconColor: "text-coral-500" },
  { tab: "food", title: "explore_card_food", sub: "explore_card_food_sub", Icon: UtensilsCrossed, tint: "bg-surface-next", iconColor: "text-pine-600" }
];

export default function ExploreHub() {
  const t = useT();
  return (
    <div className="mx-auto max-w-lg px-4 pt-6 pb-8">
      <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-coral-500">
        {t("explore_eyebrow")}
      </div>
      <h1 className="mt-1 text-2xl font-extrabold text-ink-900">{t("explore_title")}</h1>
      <p className="mt-1 text-ink-700/80">{t("explore_kicker")}</p>

      <div className="mt-5 space-y-3">
        {CARDS.map(({ tab, title, sub, Icon, tint, iconColor }) => (
          <button
            key={tab}
            onClick={() => navigateTab(tab)}
            className={`w-full text-start rounded-[var(--radius-card)] p-4 ${tint} flex items-center gap-4 active:scale-[0.99] transition-transform`}
          >
            <Icon size={28} className={iconColor} />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-ink-900">{t(title)}</div>
              <div className="text-sm text-ink-700/75 truncate">{t(sub)}</div>
            </div>
            <ChevronRight size={20} className="text-ink-700/40 shrink-0 rtl:scale-x-[-1]" />
          </button>
        ))}
      </div>
    </div>
  );
}
