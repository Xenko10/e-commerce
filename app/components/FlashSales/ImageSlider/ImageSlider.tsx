import styles from "./ImageSlider.module.css";
import Product from "./Product/Product";

const products = [
  {
    url: "gamepad.png",
    alt: "gamepad",
    header: "HAVIT HV-G92 Gamepad",
    price: 160,
    discount: 120,
    stars: 4.5,
    opinions: 88,
  },
  {
    url: "keyboard.png",
    alt: "keyboard",
    header: "AK-900 Wired Keyboard",
    price: 1160,
    discount: 920,
    stars: 4,
    opinions: 75,
  },
  {
    url: "monitor.png",
    alt: "monitor",
    header: "IPS LCD Gaming Monitor",
    price: 400,
    discount: 240,
    stars: 5,
    opinions: 121,
  },
  {
    url: "chair.png",
    alt: "chair",
    header: "S-Series Comfort Chair",
    price: 400,
    discount: 160,
    stars: 3.5,
    opinions: 99,
  },
];

export default function () {
  return (
    <div className={styles.imageSlider}>
      {products.map((product) => (
        <Product
          key={product.header}
          url={product.url}
          alt={product.alt}
          header={product.header}
          price={product.price}
          discount={product.discount}
          stars={product.stars}
          opinions={product.opinions}
        />
      ))}
    </div>
  );
}
