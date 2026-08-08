import { Cloud, CloudRain, CloudSnow, Sun, CloudSun } from "lucide-react";
import type { Day } from "../data/types";
import { forecastForDay, useTripWeather } from "../lib/weather";
import { useT } from "../lib/dict";

/** Map a WMO weather code to an icon. Mirrors WeatherStrip's mapping. */
function iconFor(code: number, size: number) {
  if (code === 0) return <Sun size={size} />;
  if (code <= 2) return <CloudSun size={size} />;
  if (code <= 48) return <Cloud size={size} />;
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86))
    return <CloudSnow size={size} />;
  return <CloudRain size={size} />;
}

interface Props {
  day: Pick<Day, "dayNumber" | "date">;
  /** "lg" is the chapter-hero chip; "sm" fits a timeline row. */
  size?: "sm" | "lg";
}

/**
 * The day's forecast as a stand-alone chip — icon + bold high / low — the
 * weather promoted to a first-class element rather than an inline suffix.
 * Renders nothing while loading or when the date is beyond the forecast
 * window, so it never leaves a placeholder gap.
 */
export default function DayWeatherChip({ day, size = "lg" }: Props) {
  const t = useT();
  const { weather } = useTripWeather();
  const forecast = forecastForDay(weather, day);
  if (!forecast) return null;
  const lg = size === "lg";

  return (
    <span
      dir="ltr"
      aria-label={t("weather_day_aria", {
        high: String(forecast.tMax),
        low: String(forecast.tMin)
      })}
      className={`inline-flex items-center rounded-full bg-cream-50 ring-1 ring-cream-300 text-ink-900 ${
        lg ? "gap-2 px-3.5 py-1.5" : "gap-1.5 px-2.5 py-0.5"
      }`}
    >
      <span className="text-ink-700">{iconFor(forecast.code, lg ? 18 : 13)}</span>
      <span className={`font-bold tabular-nums ${lg ? "text-[15px]" : "text-[12px]"}`}>
        {forecast.tMax}°
      </span>
      <span className={`text-ink-700/60 tabular-nums ${lg ? "text-[13px]" : "text-[11px]"}`}>
        / {forecast.tMin}°
      </span>
    </span>
  );
}
