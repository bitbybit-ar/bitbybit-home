import { cn } from "@/lib/utils";
import styles from "./block.module.scss";

type BlockSize = "tiny" | "small" | "medium" | "large";
type BlockColor = "purple" | "gold" | "green" | "red";

interface BlockProps {
  size?: BlockSize;
  color: BlockColor;
  flat?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Block({
  size = "medium",
  color,
  flat = false,
  className = "",
  children,
}: BlockProps) {
  return (
    <div
      className={cn(styles.block, styles[size], styles[color], flat && styles.flat, className)}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
