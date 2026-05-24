"use client";

import { useEffect, useState } from "react";

// SSR-safe media-query subscription. Starts `false` (the static-render
// default) and updates after mount, so it never causes a hydration
// mismatch. Used to gate desktop-only motion such as the hero parallax.
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
