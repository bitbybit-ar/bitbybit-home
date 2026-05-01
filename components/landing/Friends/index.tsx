"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Bubble } from "@/components/common/Bubble";
import { PixelDissolve } from "@/components/common/PixelDissolve";
import { HeartIcon } from "@/components/icons";
import styles from "./friends.module.scss";

interface Friend {
  name: string;
  url: string;
  // Logo path: local under `/images/friends/...` or remote (e.g.,
  // GitHub avatar). next/image handles both — `next.config.ts` already
  // allows the GitHub avatars domain.
  logo: string;
  descriptionKey: string;
  // Optional override for the photo-frame background. Useful for
  // logos designed for a dark surface (e.g., Mapping Bitcoin's white-
  // text wordmark needs a dark frame to read).
  frameBg?: string;
}

// Adding a new friend is one entry. Polaroid rotations cycle through
// three steps via :nth-child(3n+…) so a 4th entry resumes the
// pattern and the layout still reads as "pinned to a board".
const FRIENDS: Friend[] = [
  {
    name: "La Crypta",
    url: "https://lacrypta.ar",
    logo: "https://github.com/lacrypta.png?size=256",
    descriptionKey: "laCryptaDescription",
  },
  {
    name: "Nostr WoT",
    url: "https://nostr-wot.com/",
    logo: "/images/friends/nostr-wot.webp",
    descriptionKey: "nostrWotDescription",
  },
  {
    name: "Mapping Bitcoin",
    url: "https://mappingbitcoin.com/",
    logo: "/images/friends/mapping-bitcoin.svg",
    descriptionKey: "mappingBitcoinDescription",
    frameBg: "#0D0D0D",
  },
];

export function Friends() {
  const t = useTranslations("landing.friends");
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.section}>
      <Bubble
        size={70}
        color="gold"
        variant="icon"
        icon={<HeartIcon />}
        opacity={0.3}
        position={{ top: "12%", left: "5%" }}
        animation="float"
        delay={0}
      />
      <Bubble
        size={48}
        color="green"
        variant="icon"
        icon={<HeartIcon />}
        opacity={0.25}
        position={{ top: "22%", right: "7%" }}
        animation="drift"
        delay={1.4}
      />
      <Bubble
        size={36}
        color="purple"
        variant="solid"
        opacity={0.18}
        position={{ bottom: "28%", left: "12%" }}
        animation="float-slow"
        delay={0.6}
      />
      <Bubble
        size={56}
        color="red"
        variant="icon"
        icon={<HeartIcon />}
        opacity={0.28}
        position={{ bottom: "16%", right: "9%" }}
        animation="float"
        delay={2.1}
      />
      <Bubble
        size={28}
        color="gold"
        variant="solid"
        opacity={0.22}
        position={{ top: "55%", left: "3%" }}
        animation="drift"
        delay={3.2}
      />

      <div className={cn(styles.container, "scroll-reveal")} ref={ref}>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>

        <ul
          className={styles.board}
          aria-label={t("listLabel")}
        >
          {FRIENDS.map((friend) => (
            <li key={friend.name} className={styles.boardItem}>
              <a
                href={friend.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.polaroid}
              >
                <div
                  className={styles.photoFrame}
                  style={
                    friend.frameBg ? { background: friend.frameBg } : undefined
                  }
                >
                  <Image
                    src={friend.logo}
                    alt={`${friend.name}`}
                    width={256}
                    height={256}
                    className={styles.photo}
                  />
                </div>
                <div className={styles.caption}>
                  <h3 className={styles.name}>{friend.name}</h3>
                  <p className={styles.description}>
                    {t(friend.descriptionKey)}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.dissolveWrapper}>
        <PixelDissolve />
      </div>
    </section>
  );
}
