"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  fadeUp,
  fadeUpStagger,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion/variants";
import { Bubble } from "@/components/common/Bubble";
import { BoltIcon, HeartIcon } from "@/components/icons";
import styles from "./mission.module.scss";

const VALUE_KEYS = ["value1", "value2", "value3", "value4"] as const;

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export function Mission() {
  const t = useTranslations("about.mission");

  return (
    <section className={styles.section}>
      <Bubble
        size={65}
        color="gold"
        variant="icon"
        icon={<BoltIcon />}
        opacity={0.3}
        position={{ top: "10%", left: "4%" }}
        animation="float"
        delay={0}
      />
      <Bubble
        size={50}
        color="green"
        variant="icon"
        icon={<HeartIcon />}
        opacity={0.25}
        position={{ bottom: "20%", left: "8%" }}
        animation="drift"
        delay={1.2}
      />

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
        <motion.p className={styles.manifesto} variants={fadeUp}>
          {renderBold(t("manifesto"))}
        </motion.p>

        <motion.ul className={styles.values} variants={fadeUpStagger}>
          {VALUE_KEYS.map((key) => (
            <motion.li key={key} className={styles.value} variants={fadeUp}>
              {renderBold(t(key))}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
