import styles from "./ImageSlider.module.css";

export default function ImageSlider() {
  return (
    <div className={styles.content}>
      <div className={styles.imageSlider}>
        <img
          src='./img/hero/iphone14.png'
          alt='iphone14 up to 10% off voucher'
        />
      </div>
    </div>
  );
}
