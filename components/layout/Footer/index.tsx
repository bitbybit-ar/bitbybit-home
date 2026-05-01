import { useTranslations } from "next-intl";
import { LogoBlocks } from "@/components/common/LogoBlocks";
import { GithubIcon } from "@/components/icons";
import styles from "./footer.module.scss";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <LogoBlocks />
            <span className={styles.brandText}>BitByBit</span>
          </div>

          <nav className={styles.links} aria-label={t("ariaLabel")}>
            <a
              href="https://habits.bitbybit.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {t("habitsLink")}
            </a>
            <a
              href="https://arena.bitbybit.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {t("arenaLink")}
            </a>
          </nav>
        </div>

        <div className={styles.bottom}>
          <a
            href="https://github.com/bitbybit-ar"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
            aria-label={t("githubAriaLabel")}
          >
            <GithubIcon size={16} />
            {t("github")}
          </a>
          <p className={styles.copy}>
            © {new Date().getFullYear()} BitByBit Ar. {t("rightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
