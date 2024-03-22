import styles from "./CartWithItems.module.css";
import ProductInCart from "./ProductInCart/ProductInCart";
import { ProductInCartDTO } from "../../../types";

type Products = {
  products: ProductInCartDTO[];
};

export default function CartWithItems({
  products,
  setProducts,
}: Products & {
  setProducts: React.Dispatch<React.SetStateAction<ProductInCartDTO[]>>;
}) {
  return (
    <div className={styles.cartWithItems}>
      <div className={styles.row}>
        <div>Product</div>
        <div>Price</div>
        <div>Quantity</div>
        <div className={styles.subtotal}>Subtotal</div>
      </div>
      {products.map((product: ProductInCartDTO) => (
        <ProductInCart
          key={product.header}
          id={product.id}
          url={product.url}
          alt={product.alt}
          header={product.header}
          price={product.price}
          priceAfterDiscount={product.priceAfterDiscount}
          setProducts={setProducts}
          quantity={product.quantity}
        />
      ))}
      <div>
        Cart total:
        <div>
          $
          {products.reduce(
            (sum, addend) =>
              sum +
              addend.quantity *
                (addend.priceAfterDiscount
                  ? addend.priceAfterDiscount
                  : addend.price),
            0
          )}
        </div>
      </div>
    </div>
  );
}
