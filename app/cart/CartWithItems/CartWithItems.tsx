import styles from "./CartWithItems.module.css";
import ProductInCart from "./ProductInCart/ProductInCart";
import { ProductInCartDataType } from "../../../types";

type Products = {
  products: ProductInCartDataType[];
};

export default function CartWithItems({ products }: Products) {
  return (
    <div className={styles.cartWithItems}>
      <div className={styles.row}>
        <div>Product</div>
        <div>Price</div>
        <div>Quantity</div>
        <div className={styles.subtotal}>Subtotal</div>
      </div>
      {products.map((product: ProductInCartDataType) => (
        <div className={styles.row} key={product.header}>
          <ProductInCart
            url={product.url}
            alt={product.alt}
            header={product.header}
            price={product.price}
            priceAfterDiscount={product.priceAfterDiscount}
          />
        </div>
      ))}
    </div>
  );
}
