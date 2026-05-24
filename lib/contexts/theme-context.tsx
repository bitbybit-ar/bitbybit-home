"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { MotionConfig } from "framer-motion";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem
      enableColorScheme={false}
    >
      {/* `reducedMotion="user"` makes every framer-motion animation honor
          the OS "reduce motion" setting globally: transforms are dropped
          and only opacity animates, so we don't repeat the guard per
          component. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}

export type ThemePreference = "system" | "light" | "dark";

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const setThemePreference = (value: ThemePreference) => setTheme(value);

  return {
    theme: (resolvedTheme ?? "light") as "light" | "dark",
    preference: (theme ?? "system") as ThemePreference,
    toggleTheme,
    setThemePreference,
  };
}
