import styles from "./Navbar.module.css";
import { ValuesContext } from "../NavbarChildrenWrapper/NavbarChildrenWrapper";
import { useContext } from "react";
import Link from "next/link";

export default function Navbar() {
  const { cart, wishlist } = useContext(ValuesContext);

  return (
    <div className={styles.navbar}>
      <div className={styles.logoActionsWrapper}>
        <div className={styles.logo}>
          <Link href='/'>Exclusive</Link>
        </div>
        <div className={styles.menu}>
          <Link href='/'>Home</Link>
          <Link href='/contact'>Contact</Link>
          <Link href='/about'>About</Link>
          <Link href='/signup'>Sign Up</Link>
        </div>
        <button>☰</button>
        <div className={styles.actions}>
          <div className={styles.search}>
            <input type='text' placeholder='What are you looking for?' />
            <img src='./img/navbar/search.png' alt='Search' />
          </div>
          <Link href='/wishlist' className={styles.action}>
            <img src='./img/navbar/heart.png' alt='Wishlist' />
            {wishlist.length !== 0 ? <div>{wishlist.length}</div> : null}
          </Link>
          <Link href='/cart' className={styles.action}>
            <img src='./img/navbar/cart.png' alt='Cart' />
            {cart.length !== 0 ? <div>{cart.length}</div> : null}
          </Link>
        </div>
      </div>
    </div>
  );
}
