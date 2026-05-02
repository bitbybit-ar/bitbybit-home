"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Block } from "@/components/common/Block";
import { PixelDissolve } from "@/components/common/PixelDissolve";
import { Button } from "@/components/ui/button";
import { FlagIcon, TrophyIcon, BoltIcon } from "@/components/icons";
import styles from "./projects.module.scss";

const HIGHLIGHT_KEYS = ["highlight1", "highlight2", "highlight3"] as const;

interface ProjectCard {
  prefix: "habits" | "arena";
  url: string;
  accentClass: string;
  buttonVariant: "accent" | "nostr";
}

const PROJECTS: ProjectCard[] = [
  {
    prefix: "habits",
    url: "https://habits.bitbybit.com.ar",
    accentClass: "accentGold",
    buttonVariant: "accent",
  },
  {
    prefix: "arena",
    url: "https://arena.bitbybit.com.ar",
    accentClass: "accentPurple",
    buttonVariant: "nostr",
  },
];

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export function Projects() {
  const t = useTranslations("about.projects");
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.section}>
      <Block size="medium" color="purple" className={styles.floatBlock1}>
        <FlagIcon size={22} color="white" />
      </Block>
      <Block size="medium" color="gold" className={styles.floatBlock2}>
        <TrophyIcon size={22} color="white" />
      </Block>
      <Block size="medium" color="green" className={styles.floatBlock3}>
        <BoltIcon size={22} color="white" />
      </Block>

      <div className={cn(styles.container, "scroll-reveal")} ref={ref}>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>

        <div className={styles.cards}>
          {PROJECTS.map(({ prefix, url, accentClass, buttonVariant }) => (
            <a
              key={prefix}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(styles.card, styles[accentClass])}
              aria-label={`${t(`${prefix}Name`)} — ${t(`${prefix}Cta`)}`}
            >
              <div className={styles.cardHead}>
                <h3 className={styles.cardName}>{t(`${prefix}Name`)}</h3>
                <p className={styles.cardTagline}>{t(`${prefix}Tagline`)}</p>
              </div>

              <p className={styles.cardStory}>{t(`${prefix}Story`)}</p>

              <ul className={styles.highlights}>
                {HIGHLIGHT_KEYS.map((slot) => (
                  <li key={slot} className={styles.highlight}>
                    {renderBold(t(`${prefix}${slot.charAt(0).toUpperCase()}${slot.slice(1)}`))}
                  </li>
                ))}
              </ul>

              <div className={styles.ctaWrapper}>
                {/* Visual button only — the parent <a> is the actual link.
                    `tabIndex={-1}` keeps tab focus on the card itself, and
                    `pointer-events: none` (in SCSS) lets clicks pass to
                    the parent. */}
                <Button variant={buttonVariant} tabIndex={-1}>
                  {t(`${prefix}Cta`)}
                </Button>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className={styles.dissolveWrapper}>
        <PixelDissolve />
      </div>
    </section>
  );
}
