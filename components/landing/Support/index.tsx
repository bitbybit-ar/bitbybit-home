"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Block } from "@/components/common/Block";
import { BoltIcon, GithubIcon } from "@/components/icons";
import styles from "./support.module.scss";

const LIGHTNING_ADDRESS =
  process.env.NEXT_PUBLIC_LIGHTNING_ADDRESS || "bitbybit@geyser.fund";

// Per-project repos. Add a new entry here when a project ships; the
// button row wraps on its own — no layout change needed.
const PROJECT_REPOS = [
  { key: "arenaRepo", url: "https://github.com/bitbybit-ar/bitbybit-arena" },
  { key: "habitsRepo", url: "https://github.com/bitbybit-ar/bitbybit-habits" },
  { key: "cursatsRepo", url: "https://github.com/bitbybit-ar/bitbybit-cursa" },
] as const;

export function Support() {
  const t = useTranslations("landing.support");
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.section}>
      <Block size="medium" color="gold" className={styles.floatBlock1}>
        <BoltIcon size={22} color="white" />
      </Block>
      <Block size="medium" color="purple" className={styles.floatBlock2}>
        <GithubIcon size={22} color="white" />
      </Block>

      <div className={cn(styles.container, "scroll-reveal")} ref={ref}>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>

        <div className={styles.primaryActions}>
          <a
            href={`lightning:${LIGHTNING_ADDRESS}`}
            className={styles.zapButton}
            aria-label={t("zapAriaLabel")}
          >
            <BoltIcon size={18} color="white" />
            {t("zapDevs")}
          </a>
          <a
            href="https://github.com/bitbybit-ar"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubButton}
          >
            <GithubIcon size={18} />
            {t("starOnGithub")}
          </a>
        </div>

        <p className={styles.contributeLabel}>{t("orContribute")}</p>
        <div className={styles.projectRepos}>
          {PROJECT_REPOS.map(({ key, url }) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.repoLink}
            >
              <GithubIcon size={16} />
              {t(key)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
