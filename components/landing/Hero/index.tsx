"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Bubble } from "@/components/common/Bubble";
import { BlockTower } from "@/components/common/BlockTower";
import { PixelDissolve } from "@/components/common/PixelDissolve";
import { BoltIcon, HeartIcon } from "@/components/icons";
import styles from "./hero.module.scss";

export function Hero() {
  const t = useTranslations("landing.hero");
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.section}>
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

      <div className={cn(styles.container, "scroll-reveal")} ref={ref}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            {t.rich("headline", {
              accent: (chunks) => (
                <span className={styles.headlineAccent}>{chunks}</span>
              ),
            })}
          </h1>
          <p className={styles.subline}>{t("subline")}</p>
          <a href="#projects" className={styles.cta}>
            {t("ctaLabel")}
          </a>
        </div>
        <div className={styles.tower}>
          <BlockTower maxBlocks={5} blockSize="large" animate />
        </div>
      </div>

      <div className={styles.dissolveWrapper}>
        <PixelDissolve />
      </div>
    </section>
  );
}
