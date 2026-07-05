import { useCallback, useRef } from "react";
import Navbar from "./components/Navbar";
import MobileBottomNav from "./components/MobileBottomNav";
import ChapterDetailPage from "./components/ChapterDetailPage";
import InstallPrompt from "./components/InstallPrompt";
import Gemininio from "./components/Gemininio";
import TabShell from "./components/TabShell";
import { MapFocusContext } from "./lib/mapContext";
import { useHashRoute, navigateTab } from "./lib/route";

export default function App() {
  const focusFnRef = useRef<((id: string) => void) | null>(null);
  const route = useHashRoute();

  const focusOn = useCallback((id: string) => {
    // Switching to the map tab before focusing guarantees the map is mounted.
    navigateTab("map");
    // Defer until MapView has registered its focus fn after mount.
    setTimeout(() => focusFnRef.current?.(id), 350);
  }, []);

  const registerFocus = useCallback((fn: (id: string) => void) => {
    focusFnRef.current = fn;
  }, []);

  if (route.kind === "chapter") {
    return (
      <>
        <ChapterDetailPage dayNumber={route.day} />
        <InstallPrompt />
        <Gemininio />
      </>
    );
  }

  return (
    <MapFocusContext.Provider value={{ focusOn }}>
      <Navbar activeTab={route.tab} />
      {route.tab === "today" && <div className="h-16 sm:h-20" aria-hidden />}
      <TabShell tab={route.tab} registerFocus={registerFocus} />
      <div className="h-20 md:hidden" aria-hidden />
      <MobileBottomNav activeTab={route.tab} />
      <InstallPrompt />
      <Gemininio />
    </MapFocusContext.Provider>
  );
}
