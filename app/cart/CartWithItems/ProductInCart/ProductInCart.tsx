import styles from "./ProductInCart.module.css";
import { ProductInCartDTO } from "../../../../types";

export default function ProductInCart({
  url,
  alt,
  header,
  price,
  priceAfterDiscount,
}: ProductInCartDTO) {
  return (
    <>
      <div className={styles.imgProductNameWrapper}>
        <img src={`/img/flashsales/${url}`} alt={alt} />
        <div className={styles.productName}>{header}</div>
      </div>
      <div>${priceAfterDiscount ? priceAfterDiscount : price}</div>
      <div>1</div>
      <div className={styles.asd}>
        ${priceAfterDiscount ? priceAfterDiscount : price}
      </div>
    </>
  );
}
