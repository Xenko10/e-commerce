import styles from "./Hero.module.css";
import Categories from "./Categories/Categories";
import MessageOfTheDay from "./MessageOfTheDay/MessageOfTheDay";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <Categories />
      <MessageOfTheDay />
    </div>
  );
}
