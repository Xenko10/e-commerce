import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Exclusive</div>
      <div className={styles.menu}>
        <a href='#home'>Home</a>
        <a href='#about'>Contact</a>
        <a href='#contact'>About</a>
        <a href='#signup'>Sign Up</a>
      </div>
      <button>☰</button>
      <div className={styles.actions}>
        <div className={styles.search}>
          <input type='text' placeholder='What are you looking for?' />
          <img src='./img/navbar/search.png' alt='search' />
        </div>
        <img src='./img/navbar/heart.png' alt='heart' />
        <img src='./img/navbar/cart.png' alt='cart' />
      </div>
    </div>
  );
}
