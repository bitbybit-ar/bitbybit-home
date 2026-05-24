"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { interactiveLift } from "@/lib/motion/variants";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { Bubble } from "@/components/common/Bubble";
import { BlockTower } from "@/components/common/BlockTower";
import { PixelDissolve } from "@/components/common/PixelDissolve";
import { BoltIcon, HeartIcon } from "@/components/icons";
import styles from "./hero.module.scss";

const EASE = [0.22, 1, 0.36, 1] as const;

// Hero entrance timeline. The headline reveals its three nouns one at a
// time, with wide spacing so each word's rise lands distinctly before the
// next begins. The subline and CTA hold until the headline has finished,
// then follow in sequence — so the eye reads headline → subline → CTA
// rather than everything cascading at once.
const WORD_STAGGER = 0.42;
const HEADLINE_DELAY = 0.3;
// Three nouns: the last starts at HEADLINE_DELAY + 2 * WORD_STAGGER and
// needs ~0.5s to settle.
const HEADLINE_DONE = HEADLINE_DELAY + 2 * WORD_STAGGER + 0.5;

// Empty container whose only job is to flip its children from hidden to
// show on mount; each child (headline, subline, CTA) owns its own timing.
const contentVariants: Variants = {
  hidden: {},
  show: {},
};

const headlineVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: WORD_STAGGER, delayChildren: HEADLINE_DELAY },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 18, mass: 1 },
  },
};

const sublineVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: HEADLINE_DONE, duration: 0.5, ease: EASE },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: HEADLINE_DONE + 0.25, duration: 0.5, ease: EASE },
  },
};

export function Hero() {
  const t = useTranslations("landing.hero");
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // Parallax is a desktop-pointer-only flourish: skip it on touch/small
  // screens (cheaper, avoids jank) and whenever reduced motion is asked.
  const isDesktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const towerY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const enableParallax = isDesktop && !reduce;

  return (
    <section className={styles.section} ref={sectionRef}>
      <Bubble
        size={70}
        color="gold"
        variant="icon"
        icon={<BoltIcon />}
        opacity={0.3}
        position={{ top: "14%", left: "6%" }}
        animation="float"
        delay={0}
      />
      <Bubble
        size={48}
        color="green"
        variant="icon"
        icon={<HeartIcon />}
        opacity={0.25}
        position={{ top: "30%", left: "22%" }}
        animation="drift"
        delay={1.2}
      />
      <Bubble
        size={36}
        color="purple"
        variant="solid"
        opacity={0.18}
        position={{ bottom: "30%", left: "10%" }}
        animation="float-slow"
        delay={0.6}
      />
      <Bubble
        size={56}
        color="red"
        variant="icon"
        icon={<HeartIcon />}
        opacity={0.25}
        position={{ bottom: "18%", right: "32%" }}
        animation="float"
        delay={2.1}
      />
      <Bubble
        size={28}
        color="gold"
        variant="solid"
        opacity={0.22}
        position={{ top: "42%", right: "8%" }}
        animation="drift"
        delay={3.2}
      />

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial="hidden"
          animate="show"
          variants={contentVariants}
        >
          {/* Each noun is its own `<word>` tag so it rises on its own beat:
              the h1 is a nested stagger container (no fade of its own), and
              every word inherits `wordVariants`, landing one after another. */}
          <motion.h1 className={styles.headline} variants={headlineVariants}>
            {t.rich("headline", {
              word: (chunks) => (
                <motion.span className={styles.word} variants={wordVariants}>
                  {chunks}
                </motion.span>
              ),
              accent: (chunks) => (
                <span className={styles.headlineAccent}>{chunks}</span>
              ),
            })}
          </motion.h1>
          <motion.p className={styles.subline} variants={sublineVariants}>
            {t("subline")}
          </motion.p>
          <motion.a
            href="#projects"
            className={styles.cta}
            variants={ctaVariants}
            {...interactiveLift}
          >
            {t("ctaLabel")}
          </motion.a>
        </motion.div>
        {/* Tower keeps BlockTower's own block-by-block CSS assembly; framer
            adds only a desktop scroll-parallax on `y` (gated above) so it
            never overrides the mobile faded-background opacity. */}
        <motion.div
          className={styles.tower}
          style={enableParallax ? { y: towerY } : undefined}
        >
          <BlockTower maxBlocks={5} blockSize="large" animate />
        </motion.div>
      </div>

      <div className={styles.dissolveWrapper}>
        <PixelDissolve />
      </div>
    </section>
  );
}
