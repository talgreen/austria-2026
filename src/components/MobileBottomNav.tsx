import { useState } from "react";
import { CalendarClock, Compass, Baby, Map, MoreHorizontal, Download } from "lucide-react";
import { useT, type DictKey } from "../lib/dict";
import { useLang } from "../lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import { canShowInstallOption, triggerInstallPrompt } from "../lib/install";
import { navigateTab, type TabKey } from "../lib/route";

const TABS: { id: TabKey | "more"; key: DictKey; Icon: typeof CalendarClock }[] = [
  { id: "today",   key: "nav_today",   Icon: CalendarClock },
  { id: "explore", key: "nav_explore", Icon: Compass },
  { id: "kids",    key: "nav_kids",    Icon: Baby },
  { id: "map",     key: "nav_map",     Icon: Map },
  { id: "more",    key: "nav_today",   Icon: MoreHorizontal } // label overridden below
];

const MORE_LINKS: { id: TabKey; key: DictKey }[] = [
  { id: "plan",      key: "nav_itinerary" },
  { id: "stays",     key: "nav_stays" },
  { id: "tips",      key: "nav_tips" },
  { id: "checklist", key: "nav_checklist" },
  { id: "emergency", key: "nav_emergency" }
];

const MORE_LABEL: Record<"en" | "he", string> = { en: "More", he: "עוד" };
const MORE_TAB_IDS = new Set<TabKey>(["plan", "stays", "tips", "checklist", "emergency"]);

export default function MobileBottomNav({ activeTab }: { activeTab: TabKey }) {
  const t = useT();
  const { lang } = useLang();
  const [moreOpen, setMoreOpen] = useState(false);
  const [showInstall] = useState<boolean>(() => canShowInstallOption());

  const handleInstallClick = () => {
    setMoreOpen(false);
    triggerInstallPrompt();
  };

  const go = (id: TabKey) => {
    setMoreOpen(false);
    navigateTab(id);
  };

  const activeIsMore = MORE_TAB_IDS.has(activeTab);

  return (
    <>
      {moreOpen && (
        <div
          className="fixed inset-0 z-[8000] bg-ink-900/30 backdrop-blur-sm md:hidden"
          onClick={() => setMoreOpen(false)}
        >
          <div
            className="absolute bottom-[calc(64px+env(safe-area-inset-bottom))] inset-x-0 bg-cream-50 border-t border-cream-300/70 rounded-t-3xl px-4 pt-3 pb-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-cream-300 rounded-full mx-auto mb-4" />
            <div className="grid grid-cols-2 gap-2">
              {MORE_LINKS.map(l => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="text-start bg-cream-100 hover:bg-cream-200 active:bg-cream-300 transition-colors rounded-xl px-4 py-4 text-base font-medium text-ink-900"
                >
                  {t(l.key)}
                </button>
              ))}
            </div>
            {showInstall && (
              <button
                onClick={handleInstallClick}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 text-cream-50 rounded-xl px-4 py-3 text-sm font-medium shadow-sm shadow-terracotta-700/20 transition-colors"
              >
                <Download size={16} />
                {t("install_menu_label")}
              </button>
            )}
            <div className="mt-3 flex justify-center">
              <LanguageSwitcher variant="minimal" />
            </div>
            <p className="mt-4 text-center text-[10px] leading-relaxed text-ink-700/45">
              {t("footer_attribution")}
            </p>
          </div>
        </div>
      )}

      <nav
        className="fixed bottom-0 inset-x-0 z-[8001] md:hidden bg-cream-50/95 backdrop-blur-md border-t border-cream-300/70 shadow-[0_-4px_24px_rgba(42,31,26,0.08)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5 h-16">
          {TABS.map(({ id, key, Icon }) => {
            const isActive = id === "more" ? activeIsMore : activeTab === id;
            const label = id === "more" ? MORE_LABEL[lang] : t(key);
            return (
              <li key={id}>
                <button
                  onClick={() => (id === "more" ? setMoreOpen(o => !o) : go(id))}
                  className={`w-full h-full flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors active:scale-[0.96] ${
                    isActive ? "text-terracotta-600" : "text-ink-700/70"
                  }`}
                >
                  <span className={`w-10 h-7 flex items-center justify-center rounded-full transition-colors ${isActive ? "bg-terracotta-500/12" : ""}`}>
                    <Icon size={18} strokeWidth={isActive ? 2.4 : 1.8} />
                  </span>
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
