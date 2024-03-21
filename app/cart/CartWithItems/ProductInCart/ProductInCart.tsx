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
        <div className={styles.imgWrapper}>
          <img src={`/img/flashsales/${url}`} alt={alt} />
        </div>
        <div className={styles.productName}>{header}</div>
      </div>
      <div>${priceAfterDiscount ? priceAfterDiscount : price}</div>
      <div>1</div>
      <div>${priceAfterDiscount ? priceAfterDiscount : price}</div>
    </>
  );
}
