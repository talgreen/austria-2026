import { useEffect, useState } from "react";
import { useT, type DictKey } from "../lib/dict";
import LanguageSwitcher from "./LanguageSwitcher";
import { navigateTab, type TabKey } from "../lib/route";

const links: { id: TabKey; key: DictKey }[] = [
  { id: "plan",      key: "nav_plan" },
  { id: "places",    key: "nav_attractions" },
  { id: "food",      key: "nav_food" },
  { id: "map",       key: "nav_map" },
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
          ? "bg-cream-50/85 backdrop-blur-md border-b border-cream-300/60 shadow-sm"
          : "bg-cream-50/70 backdrop-blur-sm"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
        <button
          onClick={() => navigateTab("plan")}
          className="flex items-baseline gap-2 group min-h-11"
        >
          <span className={`font-serif text-xl sm:text-2xl text-ink-900 group-hover:text-terracotta-600 transition-colors`}>
            {t("brand_short")}
          </span>
          <span className="font-serif italic text-terracotta-600 text-base sm:text-lg">{t("brand_year")}</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => navigateTab(l.id)}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === l.id
                  ? "text-terracotta-600"
                  : "text-ink-700 hover:text-terracotta-600"
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
