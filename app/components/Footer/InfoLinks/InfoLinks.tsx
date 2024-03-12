import styles from "./InfoLinks.module.css";
import Link from "next/link";

export default function InfoLinks() {
  return (
    <div className={styles.infoLinks}>
      <div className={styles.subsection}>
        <h3 className={styles.logo}>
          <Link href='/'>Exclusive</Link>
        </h3>
        <div className={styles.infoWrapper}>
          <div>Subscribe</div>
          <div className={styles.subscribeToGetPromotionWrapper}>
            <div>Get 10% off your first order</div>
            <div className={styles.email}>
              <input type='text' placeholder='Enter your email' />
              <img src='./img/footer/send.png' alt='send' />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.subsection}>
        <h3 className={styles.itemHeader}>Support</h3>
        <div className={styles.infoWrapper}>
          <div>Plac Tadeusza Kościuszki 45, 22-460 Szczebrzeszyn</div>
          <div>exclusive@gmail.com</div>
          <div>+688 987 654 321</div>
        </div>
      </div>
      <div className={styles.subsection}>
        <h3 className={styles.itemHeader}>Account</h3>
        <div className={styles.infoWrapper}>
          <div>My Account</div>
          <div>Login / Register</div>
          <Link href='/cart'>Cart</Link>
          <Link href='/wishlist'>Wishlist</Link>
          <div>Shop</div>
        </div>
      </div>
      <div className={styles.subsection}>
        <h3 className={styles.itemHeader}>Quick Link</h3>
        <div className={styles.infoWrapper}>
          <div>Privacy Policy</div>
          <div>Terms Of Use</div>
          <div>FAQ</div>
          <Link href='/contact'>Contact</Link>
        </div>
      </div>
      <div className={styles.subsection}>
        <h3 className={styles.itemHeader}>Download App</h3>
        <div className={styles.infoWrapper}>
          <div className={styles.discount}>Save $3 with App New User Only</div>
          <div className={styles.imgWrapper}>
            <img
              src='./img/footer/qr_code.png'
              alt='github.com/Xenko10'
              className={styles.qrCode}
            />
            <img
              src='./img/footer/googleplay.png'
              alt='Google Play'
              className={styles.downloadApp}
            />
            <img
              src='./img/footer/appstore.png'
              alt='App Store'
              className={styles.downloadApp}
            />
          </div>
          <div className={styles.socialsWrapper}>
            <img src='./img/footer/facebook.png' alt='facebook' />
            <img src='./img/footer/twitter.png' alt='twitter' />
            <img src='./img/footer/instagram.png' alt='instagram' />
            <img src='./img/footer/linkedin.png' alt='linkedin' />
          </div>
        </div>
      </div>
    </div>
  );
}
