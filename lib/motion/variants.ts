import type { Variants } from "framer-motion";

// Shared framer-motion presets for the landing. The motion stays modest
// (opacity + a short rise) so it reads the same on phones and desktops
// without feeling heavy. The root `<MotionConfig reducedMotion="user">`
// (see lib/contexts/theme-context.tsx) drops the transforms entirely for
// visitors who request reduced motion, leaving a plain fade.

// Standard eased curve reused across entrances (matches the cubic-bezier
// the old CSS scroll-reveal used, for visual continuity).
const EASE = [0.22, 1, 0.36, 1] as const;

// A single element fading and rising into place.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

// Container that releases its children one after another. Children must
// carry their own variants (e.g. `fadeUp`) and no `initial`/`animate`, so
// they inherit the hidden→show flip from this parent.
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

// A block that both fades up itself and staggers its children — used for
// the project/friend grids so the grid rises while its cards cascade.
export const fadeUpStagger: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Shared `whileInView` trigger: play once, when ~20% has scrolled in.
export const viewportOnce = { once: true, amount: 0.2 } as const;

// Tactile press feedback for cards and CTAs (tier C). `whileHover`/
// `whileFocus` own the transform so they don't fight the CSS box-shadow,
// and `whileTap` gives touch users a press cue CSS can't express.
export const interactiveLift = {
  whileHover: { y: -4 },
  whileFocus: { y: -4 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 400, damping: 28 },
};
