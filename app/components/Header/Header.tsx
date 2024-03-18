import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.contentWrapper}>
        <div className={styles.discount}>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <span className={styles.shopNow}>ShopNow</span>
        </div>
        <select className={styles.languageSelection}>
          <option>English</option>
        </select>
      </div>
    </div>
  );
}
