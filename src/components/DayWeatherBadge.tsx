import { Cloud, CloudRain, CloudSnow, Sun, CloudSun } from "lucide-react";
import type { Day } from "../data/types";
import { forecastForDay, useTripWeather } from "../lib/weather";
import { useT } from "../lib/dict";

/** Map a WMO weather code to an icon. Mirrors WeatherStrip's mapping. */
function iconFor(code: number, size: number) {
  if (code === 0) return <Sun size={size} className="opacity-90" />;
  if (code <= 2) return <CloudSun size={size} className="opacity-90" />;
  if (code <= 48) return <Cloud size={size} className="opacity-80" />;
  if (code >= 71 && code <= 77) return <CloudSnow size={size} className="opacity-90" />;
  if (code >= 85 && code <= 86) return <CloudSnow size={size} className="opacity-90" />;
  return <CloudRain size={size} className="opacity-90" />;
}

interface Props {
  day: Pick<Day, "dayNumber" | "date">;
  /** Icon + text size. Chapter hero is a touch larger than the list card. */
  size?: number;
}

/**
 * A compact "high° / low°" chip for a single itinerary day, backed by the live
 * trip forecast. Renders nothing while loading or when the date is still beyond
 * the forecast window — it's an additive glance, never a placeholder or a gap
 * that shifts the meta row.
 */
export default function DayWeatherBadge({ day, size = 11 }: Props) {
  const t = useT();
  const { weather } = useTripWeather();
  const forecast = forecastForDay(weather, day);
  if (!forecast) return null;

  return (
    <>
      <span aria-hidden>·</span>
      <span
        className="inline-flex items-center gap-1 normal-case tracking-normal text-cream-50/85 tabular-nums"
        dir="ltr"
        aria-label={t("weather_day_aria", {
          high: String(forecast.tMax),
          low: String(forecast.tMin)
        })}
      >
        <span className="opacity-80">{iconFor(forecast.code, size)}</span>
        <span className="font-semibold">{forecast.tMax}°</span>
        <span className="opacity-70">/ {forecast.tMin}°</span>
      </span>
    </>
  );
}
