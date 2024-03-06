import styles from "./Footer.module.css";
import InfoLinks from "./InfoLinks/InfoLinks";
import Copyright from "./Copyright/Copyright";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <InfoLinks />
        <Copyright />
      </div>
    </div>
  );
}
