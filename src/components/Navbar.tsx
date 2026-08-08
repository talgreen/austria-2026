import { useEffect, useState } from "react";
import { useT, type DictKey } from "../lib/dict";
import LanguageSwitcher from "./LanguageSwitcher";
import { navigateTab, type TabKey } from "../lib/route";

const links: { id: TabKey; key: DictKey }[] = [
  { id: "today",     key: "nav_today" },
  { id: "explore",   key: "nav_explore" },
  { id: "kids",      key: "nav_kids" },
  { id: "map",       key: "nav_map" },
  { id: "plan",      key: "nav_itinerary" },
  { id: "stays",     key: "nav_stays" },
  { id: "tips",      key: "nav_tips" },
  { id: "checklist", key: "nav_checklist" },
  { id: "emergency", key: "nav_emergency" }
];

export default function Navbar({ activeTab }: { activeTab: TabKey }) {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      dir="ltr"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-cream-300"
          : "bg-white/85 backdrop-blur-sm"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
        <button
          onClick={() => navigateTab("today")}
          className="flex items-baseline gap-2 group min-h-11"
        >
          <span className="font-extrabold tracking-tight text-lg sm:text-xl text-ink-900 group-hover:text-ink-700 transition-colors">
            {t("brand_short")}
          </span>
          <span className="font-extrabold text-terracotta-500 text-base sm:text-lg">{t("brand_year")}</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => navigateTab(l.id)}
              className={`px-3 py-2 text-sm transition-colors ${
                activeTab === l.id
                  ? "font-bold text-ink-900"
                  : "font-medium text-ink-700/80 hover:text-ink-900"
              }`}
            >
              {t(l.key)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher onDark={false} />
        </div>
      </div>
    </nav>
  );
}
