import styles from "./Custom404.module.css";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className={styles.custom404}>
      <div className={styles.errorMessage}>
        <h1>404 Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
      <Link href='/'>Back to home page</Link>
    </div>
  );
}
