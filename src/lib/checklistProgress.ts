/** Persisted checklist "done" state, shared by ChecklistSection (writer)
 *  and the TodayHome before-trip card (reader). Single source of truth
 *  for the storage key + counting so the two never drift. */
export const CHECKLIST_STORAGE_KEY = "austria-checklist-v1";

export function loadChecklistChecked(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(CHECKLIST_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function countDone(
  items: { id: string }[],
  checked: Record<string, boolean>
): number {
  return items.filter(i => checked[i.id]).length;
}
