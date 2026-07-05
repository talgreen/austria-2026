import { useEffect, useState } from "react";

export type TabKey =
  | "today"
  | "explore"
  | "plan"
  | "map"
  | "places"
  | "food"
  | "kids"
  | "stays"
  | "tips"
  | "checklist"
  | "emergency";

export const TAB_KEYS: TabKey[] = [
  "today",
  "explore",
  "plan",
  "map",
  "places",
  "food",
  "kids",
  "stays",
  "tips",
  "checklist",
  "emergency"
];

export type Route =
  | { kind: "tab"; tab: TabKey }
  | { kind: "chapter"; day: number };

function isTabKey(v: string): v is TabKey {
  return (TAB_KEYS as string[]).includes(v);
}

export function parseHash(hash: string): Route {
  const chapter = hash.match(/^#chapter\/(\d+)$/);
  if (chapter) {
    const day = parseInt(chapter[1], 10);
    if (day >= 1 && day <= 18) return { kind: "chapter", day };
  }
  // Legacy: the old default tab was "plan" (itinerary). It now lives at
  // "#/itinerary"; a bare "#/plan" or "#/" lands on the new Today home.
  const tab = hash.match(/^#\/?([a-z]+)$/);
  if (tab) {
    if (tab[1] === "itinerary") return { kind: "tab", tab: "plan" };
    if (tab[1] === "plan") return { kind: "tab", tab: "today" };
    if (isTabKey(tab[1])) return { kind: "tab", tab: tab[1] };
  }
  return { kind: "tab", tab: "today" };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    typeof window !== "undefined" ? parseHash(window.location.hash) : { kind: "tab", tab: "today" }
  );
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export function navigateTab(tab: TabKey) {
  const hash =
    tab === "today" ? "/today" : tab === "plan" ? "/itinerary" : `/${tab}`;
  window.location.hash = hash;
  window.scrollTo({ top: 0 });
}

export function navigateChapter(day: number) {
  window.location.hash = `chapter/${day}`;
}

const REMEMBERED_KEY = "austria:lastChapter";

export function rememberChapter(day: number) {
  try {
    sessionStorage.setItem(REMEMBERED_KEY, String(day));
  } catch {
    /* ignore */
  }
}

export function getRememberedChapter(): number | null {
  try {
    const v = sessionStorage.getItem(REMEMBERED_KEY);
    if (!v) return null;
    const n = parseInt(v, 10);
    return n >= 1 && n <= 18 ? n : null;
  } catch {
    return null;
  }
}
