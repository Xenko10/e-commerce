import styles from "./MessageOfTheDay.module.css";

export default function MessageOfTheDay() {
  return (
    <div className={styles.content}>
      <div className={styles.message}>
        <img
          src='./img/hero/iphone14.png'
          alt='iphone14 up to 10% off voucher'
        />
      </div>
    </div>
  );
}
