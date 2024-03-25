"use client";

import styles from "./Cart.module.css";
import EmptyCart from "./EmptyCart/EmptyCart";
import CartWithItems from "./CartWithItems/CartWithItems";
import { useState, useEffect } from "react";
import { API_URL } from "../../constant";
import { ProductInCartDTO, CartDTO } from "../../types";
import axios from "axios";

export default function Cart() {
  const [products, setProducts] = useState<ProductInCartDTO[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [isSomethingInCart, setIsSomethingInCart] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<CartDTO>(`${API_URL}/cart`);
      const cartData = response.data;
      if (cartData.length > 0) {
        setIsSomethingInCart(true);
        const productDataPromises = cartData.map((item) =>
          axios.get(`${API_URL}/products/${item.id}`)
        );
        const productDataResponses = await Promise.all(productDataPromises);
        const productData = productDataResponses.map((response, index) => {
          const data = response.data;
          const quantity =
            cartData[index].id == data.id ? cartData[index].quantity : 1;
          return {
            id: data.id,
            url: data.url,
            alt: data.alt,
            header: data.header,
            price: data.price,
            priceAfterDiscount: data.priceAfterDiscount,
            quantity: quantity,
          };
        });
        setProducts(productData);
      }
      setIsDataFetched(true);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.contentWrapper}>
        {isDataFetched ? (
          isSomethingInCart && products.length !== 0 ? (
            <CartWithItems products={products} setProducts={setProducts} />
          ) : (
            <EmptyCart />
          )
        ) : null}
      </div>
    </div>
  );
}
