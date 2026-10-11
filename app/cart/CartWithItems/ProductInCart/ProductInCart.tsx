import styles from "./ProductInCart.module.css";
import axios from "axios";
import { ChangeEvent, useState, useContext, SetStateAction, Dispatch } from "react";
import { ProductInCartDTO } from "../../../../types";
import { API_URL } from "../../../../constant";
import { ValuesContext } from "../../../components/NavbarChildrenWrapper/NavbarChildrenWrapper";

export default function ProductInCart({
  id,
  cartId,
  url,
  alt,
  header,
  price,
  priceAfterDiscount,
  setProducts,
  quantity,
}: ProductInCartDTO & {
  setProducts: Dispatch<SetStateAction<ProductInCartDTO[]>>;
}) {
  const { setCart } = useContext(ValuesContext);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isCartUpdating, setIsCartUpdating] = useState(false);

  function deleteFromCart() {
    try {
      if (!isCartUpdating) {
        setIsCartUpdating(true);
        axios.delete(`${API_URL}/cart/${cartId}`).then(() => {
          setProducts((prevProducts) => {
            return prevProducts.filter((item) => {
              return item.id !== id;
            });
          });
          setCart((prevCart) =>
            prevCart.filter((item) => item.productId !== id)
          );
          setIsCartUpdating(false);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function updateQuantity(quantity: number) {
    try {
      if (!isCartUpdating) {
        setIsCartUpdating(true);
        axios.patch(`${API_URL}/cart/${cartId}`, { quantity: quantity });
        setIsCartUpdating(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    {
      if (Number(e.target.value) >= 0 && Number(e.target.value) <= 10) {
        updateQuantity(Number(e.target.value));
        setProducts((prevProducts) => {
          return prevProducts.map((prevProduct) => {
            if (prevProduct.id === id) {
              return {
                ...prevProduct,
                quantity: Number(e.target.value),
              };
            }
            return prevProduct;
          });
        });
      }
    }
  }

  return (
    <div
      className={styles.row}
      onMouseOver={() => {
        setIsMouseOver(true);
      }}
      onMouseLeave={() => {
        setIsMouseOver(false);
      }}>
      <div className={styles.imgProductNameWrapper}>
        <div className={styles.imgWrapper}>
          <div
            className={`${styles.deleteFromCart} ${
              isMouseOver ? styles.show : null
            }`}
            onClick={() => deleteFromCart()}>
            X
          </div>
          <img src={`/img/flashsales/${url}`} alt={alt} />
        </div>
        <div className={styles.productName}>{header}</div>
      </div>
      <div>${priceAfterDiscount ? priceAfterDiscount : price}</div>
      <div>
        <input
          type='number'
          value={quantity.toString()}
          className={styles.quantityInput}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </div>
      <div>
        ${priceAfterDiscount ? quantity * priceAfterDiscount : quantity * price}
      </div>
    </div>
  );
}
