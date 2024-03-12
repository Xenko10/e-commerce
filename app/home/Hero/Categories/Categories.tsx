import styles from "./Categories.module.css";

export default function Categories() {
  return (
    <div className={styles.content}>
      <ul className={styles.categories}>
        <li>Woman&apos;s Fashion</li>
        <li>Men&apos;s Fashion</li>
        <li>Electronics</li>
        <li>Home & Lifestyle</li>
        <li>Medicine</li>
        <li>Sports & Outdoor</li>
        <li>Baby&apos;s & Toys</li>
        <li>Groceries & Pets</li>
        <li>Health & Beauty</li>
      </ul>
    </div>
  );
}
