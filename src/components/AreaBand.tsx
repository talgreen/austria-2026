import type { Area } from "../data/areas";
import { accentClasses } from "../lib/accent";
import { useLoc } from "../lib/i18n";
import WhereYouSleep from "./WhereYouSleep";

/** The header strip above the day carousel showing the CURRENT area:
 *  its name, dates and where-you-sleep chip, in the area accent. Updates
 *  as the active day changes. */
export default function AreaBand({ area }: { area: Area }) {
  const loc = useLoc();
  const a = accentClasses(area.accent);
  return (
    <div className={`flex flex-wrap items-center justify-between gap-2 rounded-2xl px-4 py-3 ${a.bgTint}`}>
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${a.dot}`} aria-hidden />
        <span className={`font-serif text-lg ${a.text}`}>{loc(area.name)}</span>
      </div>
      <WhereYouSleep area={area} variant="band" />
    </div>
  );
}
