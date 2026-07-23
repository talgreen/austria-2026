import { useEffect, useState } from "react";
import { areas, getAreaForDay, getStayForArea } from "../data/areas";
import type { Day } from "../data/types";

/**
 * Live per-day weather for the trip.
 *
 * We fetch a single multi-location forecast from Open-Meteo (free, no key)
 * for each area's home base, then match the returned daily rows to each
 * itinerary day by ISO date. One fetch covers the whole trip and is shared
 * across every DayCard / chapter via a module-level singleton + localStorage
 * cache, so opening the app fires at most one request per hour.
 *
 * Open-Meteo only forecasts ~16 days ahead, so days further out simply have
 * no row yet — the UI shows nothing rather than a fake number (real data, no
 * placeholders). As the trip approaches, days fill in on their own.
 */

export interface DayForecast {
  /** ISO date, e.g. "2026-08-09". */
  date: string;
  tMax: number;
  tMin: number;
  /** WMO weather code (see iconFor consumers). */
  code: number;
}

/** location key (area.stayId) -> ISO date -> forecast for that day */
export type TripWeather = Record<string, Record<string, DayForecast>>;

interface Location {
  key: string;
  lat: number;
  lon: number;
}

/** One representative location per area, from that area's stay coords. */
const LOCATIONS: Location[] = areas
  .map(a => {
    const stay = getStayForArea(a);
    if (!stay) return null;
    return { key: a.stayId, lat: stay.coords[0], lon: stay.coords[1] };
  })
  .filter((l): l is Location => l !== null);

const CACHE_KEY = "austria-trip-weather-v1";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
/** Open-Meteo caps the free forecast window at 16 days. */
const FORECAST_DAYS = 16;

interface CacheShape {
  savedAt: number;
  data: TripWeather;
}

function readCache(): TripWeather | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheShape;
    if (Date.now() - parsed.savedAt < CACHE_TTL_MS) return parsed.data;
  } catch {
    /* ignore corrupt cache */
  }
  return null;
}

function writeCache(data: TripWeather) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), data } satisfies CacheShape)
    );
  } catch {
    /* storage full / unavailable — non-fatal */
  }
}

/**
 * Open-Meteo returns a bare object for a single location and an array of
 * objects when several coordinates are requested. Normalize to an array so
 * the caller can zip results back to LOCATIONS by index.
 */
function toResultsArray(json: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(json)) return json as Array<Record<string, unknown>>;
  return [json as Record<string, unknown>];
}

function parseDaily(result: Record<string, unknown> | undefined): Record<string, DayForecast> {
  const daily = result?.daily as
    | {
        time?: string[];
        temperature_2m_max?: number[];
        temperature_2m_min?: number[];
        weather_code?: number[];
      }
    | undefined;
  const out: Record<string, DayForecast> = {};
  const times = daily?.time ?? [];
  times.forEach((date, i) => {
    const tMax = daily?.temperature_2m_max?.[i];
    const tMin = daily?.temperature_2m_min?.[i];
    const code = daily?.weather_code?.[i];
    if (tMax == null || tMin == null || code == null) return;
    out[date] = { date, tMax: Math.round(tMax), tMin: Math.round(tMin), code };
  });
  return out;
}

let inflight: Promise<TripWeather | null> | null = null;

async function fetchTripWeather(): Promise<TripWeather | null> {
  if (LOCATIONS.length === 0) return null;
  const lat = LOCATIONS.map(l => l.lat).join(",");
  const lon = LOCATIONS.map(l => l.lon).join(",");
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
    `&timezone=Europe%2FVienna&forecast_days=${FORECAST_DAYS}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`weather ${res.status}`);
  const results = toResultsArray(await res.json());

  const data: TripWeather = {};
  LOCATIONS.forEach((loc, i) => {
    data[loc.key] = parseDaily(results[i]);
  });
  return data;
}

/**
 * Load the trip forecast, sharing a single in-flight request and honoring the
 * localStorage cache. Resolves to null if the network call fails so callers
 * can degrade gracefully.
 */
export function loadTripWeather(): Promise<TripWeather | null> {
  const cached = readCache();
  if (cached) return Promise.resolve(cached);
  if (inflight) return inflight;
  inflight = fetchTripWeather()
    .then(data => {
      if (data) writeCache(data);
      return data;
    })
    .catch(() => null)
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

/** Pull the forecast for a specific itinerary day, or null if none yet. */
export function forecastForDay(
  weather: TripWeather | null,
  day: Pick<Day, "dayNumber" | "date">
): DayForecast | null {
  if (!weather) return null;
  const area = getAreaForDay(day.dayNumber);
  return weather[area.stayId]?.[day.date] ?? null;
}

export interface UseTripWeather {
  weather: TripWeather | null;
  loading: boolean;
}

/**
 * React hook: returns the shared trip forecast, fetching once on first mount
 * (or serving the cache). Every consumer shares the same underlying request.
 */
export function useTripWeather(): UseTripWeather {
  const [weather, setWeather] = useState<TripWeather | null>(() => readCache());
  const [loading, setLoading] = useState(() => readCache() === null);

  useEffect(() => {
    if (weather) return; // fresh cache already in state
    let cancelled = false;
    loadTripWeather().then(data => {
      if (cancelled) return;
      setWeather(data);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [weather]);

  return { weather, loading };
}
