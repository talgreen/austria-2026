import { Car, Clock, ExternalLink, MapPin } from "lucide-react";
import type { DayActivity } from "../data/types";
import { useT } from "../lib/dict";
import { accentClasses, type AreaAccent } from "../lib/accent";
import { getAttraction } from "../data/attractions";

/** A strong "Leave by HH:MM" badge for the top of a day. */
export function LeaveByBadge({ time, accent }: { time: string; accent: AreaAccent }) {
  const t = useT();
  const a = accentClasses(accent);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${a.bgTint} ${a.text}`}>
      <Clock size={15} strokeWidth={2.4} />
      {t("leave_by")} <span className="font-latin-serif tabular-nums">{time}</span>
    </span>
  );
}

/** The connector segment between two stops, showing the drive. */
export function DriveConnector({
  duration,
  note,
  departAt,
  accent
}: {
  duration: string;
  note?: string;
  departAt?: string;
  accent: AreaAccent;
}) {
  const t = useT();
  const a = accentClasses(accent);
  return (
    <div className="flex items-stretch gap-3 py-1 ps-1">
      <div className="flex flex-col items-center w-5">
        <span className={`w-px flex-1 ${a.border} border-s border-dashed opacity-60`} />
      </div>
      <div className="flex items-center gap-2 text-[12px] text-ink-700/80 py-1">
        <Car size={14} className={a.text} />
        <span className="font-medium">{t("drive_label")}</span>
        <span className="font-latin-serif tabular-nums">{duration}</span>
        {note && <span className="text-ink-700/55">· {note}</span>}
        {departAt && (
          <span className="text-ink-700/55">
            · {t("leave_by")} <span className="font-latin-serif tabular-nums">{departAt}</span>
          </span>
        )}
      </div>
    </div>
  );
}

/** A single stop node on the vertical spine. `card` = condensed (carousel),
 *  `detail` = full (chapter page). Surfaces a time chip, tag, title, body,
 *  the official link (from attraction.website or activity.link), and the
 *  Optional badge. */
export function TimelineStop({
  activity,
  accent,
  variant
}: {
  activity: DayActivity;
  accent: AreaAccent;
  variant: "card" | "detail";
}) {
  const t = useT();
  const a = accentClasses(accent);
  const attraction = activity.attractionId ? getAttraction(activity.attractionId) : undefined;
  const link = attraction?.website ?? activity.link;
  const isCompact = variant === "card";

  return (
    <div className="flex gap-3">
      {/* Spine dot */}
      <div className="flex flex-col items-center w-5 pt-1">
        <span className={`w-3 h-3 rounded-full ${a.dot} ring-2 ring-cream-50 shrink-0`} />
        <span className={`w-px flex-1 ${a.border} border-s opacity-25`} />
      </div>
      <div className={`${isCompact ? "pb-3" : "pb-5"} min-w-0`}>
        <div className="flex items-center gap-2 flex-wrap">
          {activity.time && (
            <span className={`text-[12px] font-semibold ${a.text}`}>
              <span className="font-latin-serif tabular-nums">{activity.time}</span>
            </span>
          )}
          {activity.optional && (
            <span className="text-[10px] uppercase tracking-wide rounded-full bg-ink-800/8 text-ink-700/70 px-2 py-0.5">
              {t("optional_label")}
            </span>
          )}
        </div>
        <div className={`font-serif text-ink-900 ${isCompact ? "text-base" : "text-lg"} leading-snug ${activity.optional ? "opacity-75" : ""}`}>
          {activity.title}
        </div>
        {!isCompact && (
          <p className="text-[14px] text-ink-700/85 mt-1 leading-relaxed">{activity.description}</p>
        )}
        <div className="flex items-center gap-3 mt-1">
          {attraction && (
            <span className="inline-flex items-center gap-1 text-[12px] text-ink-700/70">
              <MapPin size={12} /> {attraction.name}
            </span>
          )}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 text-[12px] font-medium ${a.text} hover:underline`}
            >
              {t("official_site")} <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
