import { BedDouble, ExternalLink } from "lucide-react";
import type { Area } from "../data/areas";
import { getStayForArea } from "../data/areas";
import { accentClasses } from "../lib/accent";
import { useT } from "../lib/dict";

export default function WhereYouSleep({
  area,
  variant = "inline"
}: {
  area: Area;
  variant?: "band" | "inline";
}) {
  const t = useT();
  const stay = getStayForArea(area);
  const a = accentClasses(area.accent);
  if (!stay) return null;
  const link = stay.bookingLink ?? stay.website;
  const nightsWord = area.nights === 1 ? t("night_label") : t("nights_label");

  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] ${a.bgTint} ${a.text} ${variant === "band" ? "font-semibold" : "font-medium"}`}>
      <BedDouble size={15} />
      <span className="text-ink-800">{t("where_you_sleep")}:</span>
      <span className="font-semibold text-ink-900">{stay.name}</span>
      <span className="text-ink-700/70">· {area.nights} {nightsWord}</span>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 hover:underline">
          <ExternalLink size={12} />
        </a>
      )}
    </div>
  );
}
