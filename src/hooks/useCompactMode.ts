import { useState, useEffect } from "react";

/**
 * Custom hook to manage compact mode preference with localStorage persistence.
 * Compact mode is the default state.
 */
export function useCompactMode() {
  const [isCompact, setIsCompact] = useState<boolean>(() => {
    const stored = localStorage.getItem("compactMode");
    return stored === null ? true : stored === "true";
  });

  useEffect(() => {
    localStorage.setItem("compactMode", String(isCompact));
  }, [isCompact]);

  const toggleCompactMode = () => setIsCompact((prev) => !prev);

  return { isCompact, toggleCompactMode };
}

