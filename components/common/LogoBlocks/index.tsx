import { Block } from "@/components/common/Block";
import styles from "./logoBlocks.module.scss";

// Three-block brand stack, vertical orientation. Used by Navbar and
// Footer so the brand mark renders identically in both places.
export function LogoBlocks() {
  return (
    <div className={styles.stack} aria-hidden="true">
      <Block size="tiny" color="purple" />
      <Block size="tiny" color="gold" />
      <Block size="tiny" color="green" />
    </div>
  );
}

export default LogoBlocks;
