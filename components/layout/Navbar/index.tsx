"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { LogoBlocks } from "@/components/common/LogoBlocks";
import { MoonIcon, SunIcon } from "@/components/icons";
import { useTheme } from "@/lib/contexts/theme-context";
import { cn } from "@/lib/utils";
import styles from "./navbar.module.scss";

const SECTIONS = ["mission", "projects", "friends", "support"] as const;
const SCROLLED_THRESHOLD = 16;

export function Navbar() {
  const t = useTranslations("navbar");
  const { theme, toggleTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > SCROLLED_THRESHOLD);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (y / docHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLocale = () => {
    const next = locale === "es" ? "en" : "es";
    router.replace(pathname, { locale: next });
  };

  return (
    <nav className={cn(styles.navbar, scrolled && styles.scrolled)}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="BitByBit">
          <LogoBlocks />
          <span className={styles.logoText}>BitByBit</span>
        </Link>

        <div className={styles.links}>
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className={styles.link}>
              {t(id)}
            </a>
          ))}
        </div>

        <div className={styles.toggleGroup}>
          <button
            type="button"
            className={styles.toggle}
            onClick={toggleTheme}
            aria-label={
              mounted && theme === "dark"
                ? t("switchToLightMode")
                : t("switchToDarkMode")
            }
            suppressHydrationWarning
          >
            {mounted && theme === "dark" ? <SunIcon size={14} /> : <MoonIcon size={14} />}
          </button>
          <button
            type="button"
            className={styles.toggle}
            onClick={toggleLocale}
            aria-label={
              locale === "es" ? t("switchToEnglish") : t("switchToSpanish")
            }
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
        </div>
      </div>

      <div
        className={styles.scrollProgress}
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
    </nav>
  );
}
