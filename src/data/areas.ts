import type { Stay } from "./types";
import type { Loc } from "../lib/lang";
import type { AreaAccent } from "../lib/accent";
import { stays } from "./stays";

/**
 * The trip's six contiguous AREA segments, in order. Areas are defined by
 * explicit day-number ranges (not by Day.base) because Vienna bookends the
 * trip at both ends and must stay chronologically separate. Each area maps
 * 1:1 to a stay in stays.ts and carries an accent colour (see accent.ts).
 */
export interface Area {
  id: string;
  name: Loc<string>;
  shortName: Loc<string>;
  dayNumbers: number[];
  startDate: string; // ISO of first day
  endDate: string;   // ISO of last day
  nights: number;
  stayId: string;
  accent: AreaAccent;
}

export const areas: Area[] = [
  {
    id: "salzburg",
    name: { en: "Salzburg", he: "זלצבורג" },
    shortName: { en: "Salzburg", he: "זלצבורג" },
    dayNumbers: [1, 2],
    startDate: "2026-08-09",
    endDate: "2026-08-11",
    nights: 2,
    stayId: "stay-salzburg",
    accent: "olive"
  },
  {
    id: "tyrol",
    name: { en: "Tyrol · Zillertal", he: "טירול · צילרטל" },
    shortName: { en: "Tyrol", he: "טירול" },
    dayNumbers: [3, 4, 5, 6],
    startDate: "2026-08-11",
    endDate: "2026-08-15",
    nights: 4,
    stayId: "stay-tyrol",
    accent: "lake"
  },
  {
    id: "zell",
    name: { en: "Zell am See · Pinzgau", he: "צל אם זה · פינצגאו" },
    shortName: { en: "Zell am See", he: "צל אם זה" },
    dayNumbers: [7, 8, 9, 10, 11],
    startDate: "2026-08-15",
    endDate: "2026-08-20",
    nights: 5,
    stayId: "stay-habachklause",
    accent: "gold"
  },
  {
    id: "werfenweng",
    name: { en: "Werfenweng", he: "וורפנונג" },
    shortName: { en: "Werfenweng", he: "וורפנונג" },
    dayNumbers: [12, 13, 14],
    startDate: "2026-08-20",
    endDate: "2026-08-23",
    nights: 3,
    stayId: "stay-gutwenghof",
    accent: "sienna"
  },
  {
    id: "vienna-finale",
    name: { en: "Vienna — finale", he: "וינה — סיום" },
    shortName: { en: "Vienna", he: "וינה" },
    dayNumbers: [15, 16, 17, 18],
    startDate: "2026-08-23",
    endDate: "2026-08-26",
    nights: 3,
    stayId: "stay-vienna",
    accent: "terracotta"
  }
];

export function getAreaForDay(dayNumber: number): Area {
  const found = areas.find(a => a.dayNumbers.includes(dayNumber));
  // Day numbers 1..18 are all covered; fall back to the first area defensively.
  return found ?? areas[0];
}

export function getAreaById(id: string): Area | undefined {
  return areas.find(a => a.id === id);
}

export function getStayForArea(area: Area): Stay | undefined {
  return stays.find(s => s.id === area.stayId);
}
