import styles from "./Copyright.module.css";

export default function Copyright() {
  return (
    <div className={styles.copyrightWrapper}>
      <p className={styles.copyright}>
        © Copyright <a href='https://github.com/Xenko10'>Xenko </a>
        {new Date().getFullYear()}. All rights reserved
      </p>
    </div>
  );
}
