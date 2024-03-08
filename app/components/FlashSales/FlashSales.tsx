import styles from "./FlashSales.module.css";
import Timer from "./Timer/Timer";
import ImageSlider from "./ImageSlider/ImageSlider";

export default function FlashSales() {
  return (
    <div className={styles.flashSales}>
      <div className={styles.rectangleTodaysWrapper}>
        <div className={styles.rectangle}></div>
        <div className={styles.todays}>Today's</div>
      </div>
      <div className={styles.flashSalesTimerWrapper}>
        <h2>Flash Sales</h2>
        <Timer />
      </div>
      <ImageSlider />
    </div>
  );
}
