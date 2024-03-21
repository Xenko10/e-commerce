import styles from "./ProductInCart.module.css";
import axios from "axios";
import { useState } from "react";
import { ProductInCartDTO } from "../../../../types";
import { API_URL } from "../../../../constant";

export default function ProductInCart({
  id,
  url,
  alt,
  header,
  price,
  priceAfterDiscount,
  setProducts,
}: ProductInCartDTO & {
  setProducts: React.Dispatch<React.SetStateAction<ProductInCartDTO[]>>;
}) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isCartUpdating, setIsCartUpdating] = useState(false);

  function deleteFromCart(id: number) {
    try {
      if (!isCartUpdating) {
        setIsCartUpdating(true);
        axios.delete(`${API_URL}/cart/${id}`).then(() => {
          setProducts((prevProducts) => {
            return prevProducts.filter((item) => {
              return item.id !== id;
            });
          });
          setIsCartUpdating(false);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div
        className={styles.imgProductNameWrapper}
        onMouseOver={() => {
          setIsMouseOver(true);
        }}
        onMouseLeave={() => {
          setIsMouseOver(false);
        }}>
        <div className={styles.imgWrapper}>
          <div
            className={`${styles.deleteFromCart} ${
              isMouseOver ? styles.show : null
            }`}
            onClick={() => deleteFromCart(id)}>
            X
          </div>
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
