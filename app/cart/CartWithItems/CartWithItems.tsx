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
  const subtotal = products.reduce(
    (sum, addend) =>
      sum +
      addend.quantity *
        (addend.priceAfterDiscount ? addend.priceAfterDiscount : addend.price),
    0
  );

  const deliveryPrice = 10;
  const shipping = subtotal >= 1000 || subtotal === 0 ? 0 : deliveryPrice;

  const total = subtotal + shipping;
  return (
    <div className={styles.cartWithItems}>
      <div className={styles.row}>
        <div>Product</div>
        <div>Price</div>
        <div>Quantity</div>
        <div className={styles.subtotal}>Subtotal</div>
      </div>
      {products.map((product) => (
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
      <div className={styles.total}>
        <h3>Cart Total:</h3>
        <div className={styles.totalRow}>
          <div>Subtotal: </div>
          <div>${subtotal}</div>
        </div>
        <hr />
        <div className={styles.totalRow}>
          <div>Shipping:</div>
          <div>{shipping === 0 ? "Free" : "$" + deliveryPrice}</div>
        </div>
        <hr />
        <div className={styles.totalRow}>
          <div>Total:</div>
          <div>${total}</div>
        </div>
        <button>Process to checkout</button>
      </div>
    </div>
  );
}
