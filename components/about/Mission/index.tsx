"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
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
  const ref = useScrollReveal<HTMLDivElement>();

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

      <div className={cn(styles.container, "scroll-reveal")} ref={ref}>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.manifesto}>{renderBold(t("manifesto"))}</p>

        <ul className={styles.values}>
          {VALUE_KEYS.map((key) => (
            <li key={key} className={styles.value}>
              {renderBold(t(key))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
