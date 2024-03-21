import styles from "./EmptyWishlist.module.css";

export default function EmptyWishlist() {
  return (
    <div className={styles.emptyWishlist}>
      <h2>Wishlist is empty</h2>
    </div>
  );
}
