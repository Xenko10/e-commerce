import styles from "./EmptyCart.module.css";

export default function EmptyCart() {
  return (
    <div className={styles.emptyCart}>
      <h2>Cart is empty</h2>
    </div>
  );
}
