"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp, interactiveLift, staggerContainer } from "@/lib/motion/variants";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { Bubble } from "@/components/common/Bubble";
import { BlockTower } from "@/components/common/BlockTower";
import { PixelDissolve } from "@/components/common/PixelDissolve";
import { BoltIcon, HeartIcon } from "@/components/icons";
import styles from "./hero.module.scss";

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
          variants={staggerContainer}
        >
          <motion.h1 className={styles.headline} variants={fadeUp}>
            {t.rich("headline", {
              accent: (chunks) => (
                <span className={styles.headlineAccent}>{chunks}</span>
              ),
            })}
          </motion.h1>
          <motion.p className={styles.subline} variants={fadeUp}>
            {t("subline")}
          </motion.p>
          <motion.a
            href="#projects"
            className={styles.cta}
            variants={fadeUp}
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
