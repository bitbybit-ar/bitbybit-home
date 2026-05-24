"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Block } from "@/components/common/Block";
import { BoltIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import styles from "./block-tower.module.scss";

const COLORS = ["purple", "gold", "green", "red"] as const;
type BlockColor = (typeof COLORS)[number];

interface BlockTowerProps {
  maxBlocks?: number;
  blockSize?: "small" | "medium" | "large";
  animate?: boolean;
  /**
   * Use the flat Block variant (cheap paint, no ceramic gradient or
   * inset shadows). Enable it for loader placements where the tower
   * animates briefly and detail is imperceptible. Decorative placements
   * like the About Story page should leave this off.
   */
  flat?: boolean;
  className?: string;
}

// Glow colour token keyed off the block colour, kept in one place so the
// JSX below stays a single lookup instead of a nested ternary.
const GLOW_TOKEN: Record<BlockColor, string> = {
  gold: "secondary",
  purple: "primary",
  green: "accent-alt",
  red: "accent",
};

// Build the colour list once, avoiding two of the same colour back to
// back so adjacent blocks always contrast.
function buildColors(count: number): BlockColor[] {
  const out: BlockColor[] = [];
  for (let i = 0; i < count; i++) {
    const prev = out[out.length - 1];
    const options = COLORS.filter((c) => c !== prev);
    out.push(options[Math.floor(Math.random() * options.length)]);
  }
  return out;
}

// Each block carries its own explicit drop delay (DROP_DELAY + index *
// DROP_STAGGER) rather than leaning on a container `staggerChildren`.
// Because the blocks mount in one batch once their colours are ready,
// container-driven stagger would fire its clock before they exist and
// drop them all at once; a per-block delay is computed at mount and is
// immune to that timing. The wide spacing means each block visibly lands
// before the next starts falling, so the tower builds one block at a time.
const DROP_DELAY = 0.3;
const DROP_STAGGER = 0.34;

export function BlockTower({
  maxBlocks = 4,
  blockSize = "large",
  animate = true,
  flat = false,
  className = "",
}: BlockTowerProps) {
  // Colours are randomised per mount, so generate them client-side after
  // mount (Math.random would mismatch SSR). The tower is decorative
  // (aria-hidden), so rendering nothing on the server is harmless.
  const [colors, setColors] = useState<BlockColor[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  // Pause the idle glow when the tower scrolls out of view so it isn't
  // compositing forever behind the fold.
  const inView = useInView(ref, { amount: 0.2 });
  const reduce = useReducedMotion();

  useEffect(() => {
    setColors(buildColors(maxBlocks));
  }, [maxBlocks]);

  const iconSize = blockSize === "large" ? 28 : blockSize === "medium" ? 20 : 14;
  const topColor = colors[colors.length - 1];
  const glowing = inView && !reduce;

  return (
    <div ref={ref} className={cn(styles.tower, className)} aria-hidden="true">
      <div className={styles.blocks}>
        {colors.map((color, i) => {
          const delay = DROP_DELAY + i * DROP_STAGGER;
          return (
            <motion.div
              key={`${i}-${color}`}
              initial={animate ? { opacity: 0, y: -80 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={
                animate
                  ? {
                      y: { type: "spring", stiffness: 260, damping: 19, mass: 1, delay },
                      opacity: { duration: 0.12, delay },
                    }
                  : { duration: 0 }
              }
            >
              <Block size={blockSize} color={color} flat={flat}>
                <BoltIcon size={iconSize} />
              </Block>
            </motion.div>
          );
        })}
      </div>

      {topColor && (
        <motion.div
          className={styles.glow}
          style={{ background: `radial-gradient(ellipse, var(--color-${GLOW_TOKEN[topColor]}) 0%, transparent 70%)` }}
          animate={{ opacity: glowing ? [0.3, 0.5, 0.3] : 0.35 }}
          transition={
            glowing
              ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        />
      )}
    </div>
  );
}
