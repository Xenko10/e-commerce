import styles from "./Hero.module.css";
import Categories from "./Categories/Categories";
import ImageSlider from "./ImageSlider/ImageSlider";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <Categories />
      <ImageSlider />
    </div>
  );
}
