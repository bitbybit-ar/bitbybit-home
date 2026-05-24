"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  fadeUp,
  fadeUpStagger,
  interactiveLift,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion/variants";
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

  return (
    <section className={styles.section}>
      <Block size="medium" color="gold" className={styles.floatBlock1}>
        <BoltIcon size={22} color="white" />
      </Block>
      <Block size="medium" color="purple" className={styles.floatBlock2}>
        <GithubIcon size={22} color="white" />
      </Block>

      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <motion.h2 className={styles.title} variants={fadeUp}>
          {t("title")}
        </motion.h2>
        <motion.p className={styles.subtitle} variants={fadeUp}>
          {t("subtitle")}
        </motion.p>

        <motion.div className={styles.primaryActions} variants={fadeUpStagger}>
          <motion.a
            href={`lightning:${LIGHTNING_ADDRESS}`}
            className={styles.zapButton}
            aria-label={t("zapAriaLabel")}
            variants={fadeUp}
            {...interactiveLift}
          >
            <BoltIcon size={18} color="white" />
            {t("zapDevs")}
          </motion.a>
          <motion.a
            href="https://github.com/bitbybit-ar"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubButton}
            variants={fadeUp}
            {...interactiveLift}
          >
            <GithubIcon size={18} />
            {t("starOnGithub")}
          </motion.a>
        </motion.div>

        <motion.p className={styles.contributeLabel} variants={fadeUp}>
          {t("orContribute")}
        </motion.p>
        {/* The row fades up as a unit; the chips keep their CSS
            ceramic-card hover (which owns their transform) so we don't
            give them a framer transform that would override it. */}
        <motion.div className={styles.projectRepos} variants={fadeUp}>
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
        </motion.div>
      </motion.div>
    </section>
  );
}
