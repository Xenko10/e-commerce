import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logoActionsWrapper}>
        <div className={styles.logo}>
          <Link href='/'>Exclusive</Link>
        </div>
        <div className={styles.menu}>
          <Link href='/'>Home</Link>
          <a href='/contact'>Contact</a>
          <a href='/about'>About</a>
          <a href='/signup'>Sign Up</a>
        </div>
        <button>☰</button>
        <div className={styles.actions}>
          <div className={styles.search}>
            <input type='text' placeholder='What are you looking for?' />
            <img src='./img/navbar/search.png' alt='search' />
          </div>
          <Link href='/wishlist'>
            <img src='./img/navbar/heart.png' alt='heart' />
          </Link>
          <Link href='/cart'>
            <img src='./img/navbar/cart.png' alt='cart' />
          </Link>
        </div>
      </div>
    </div>
  );
}
