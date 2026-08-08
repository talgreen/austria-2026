import { useT } from "../lib/dict";

/**
 * Dark site footer (Sixt-style): near-black band with small, quiet
 * white text. Rendered under every scrolling tab; the map tab skips
 * it so the full-height map isn't pushed around.
 */
export default function SiteFooter() {
  const t = useT();
  return (
    <footer className="mt-10 bg-ink-900 text-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-baseline gap-2">
          <span className="font-extrabold tracking-tight text-lg">{t("brand_short")}</span>
          <span className="font-extrabold text-terracotta-400 text-base">{t("brand_year")}</span>
        </div>
        <p className="mt-2 text-[12px] font-semibold text-cream-50/70">{t("footer_made_with")}</p>
        <p className="mt-3 text-[11px] leading-relaxed text-cream-50/45">{t("footer_attribution")}</p>
      </div>
    </footer>
  );
}
