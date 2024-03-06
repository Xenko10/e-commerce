import styles from "./InfoLinks.module.css";

export default function InfoLinks() {
  return (
    <div className={styles.infoLinks}>
      <div className={styles.item}>
        <h3 className={styles.logo}>Exclusive</h3>
        <div className={styles.infoWrapper}>
          <div>Subscribe</div>
          <div>Get 10% off your first order</div>
          <div className={styles.search}>
            <input type='text' placeholder='Enter your email' />
            <img src='./img/footer/send.png' alt='send' />
          </div>
        </div>
      </div>
      <div className={styles.item}>
        <h3>Support</h3>
        <div className={styles.infoWrapper}>
          <div>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</div>
          <div>exclusive@gmail.com</div>
          <div>+88015-88888-9999</div>
        </div>
      </div>
      <div className={styles.item}>
        <h3>Account</h3>
        <div className={styles.infoWrapper}>
          <div>My Account</div>
          <div>Login / Register</div>
          <div>Cart</div>
          <div>Wishlist</div>
          <div>Shop</div>
        </div>
      </div>
      <div className={styles.item}>
        <h3>Quick Link</h3>
        <div className={styles.infoWrapper}>
          <div>Privacy Policy</div>
          <div>Terms Of Use</div>
          <div>FAQ</div>
          <div>Contact</div>
        </div>
      </div>
      <div className={styles.item}>
        <h3>Download App</h3>
        <div className={styles.infoWrapper}>
          <div className={styles.discount}>Save $3 with App New User Only</div>
          <div className={styles.imgWrapper}>
            <img
              src='./img/footer/qr_code.png'
              alt='github.com/Xenko10'
              className={styles.qrCode}
            />
            <img src='./img/footer/googleplay.png' alt='Google Play' />
            <img src='./img/footer/appstore.png' alt='App Store' />
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
