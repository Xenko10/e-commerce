"use client";

import styles from "./Cart.module.css";
import EmptyCart from "./EmptyCart/EmptyCart";
import CartWithItems from "./CartWithItems/CartWithItems";
import { useState, useEffect } from "react";
import { API_URL } from "../../constant";
import { ProductInCartDataType } from "../../types";
import axios from "axios";

export default function Cart() {
  const [products, setProducts] = useState<ProductInCartDataType[]>([]);
  const [didFetchData, setDidFetchData] = useState(false);

  const [isSomethingInCart, setIsSomethingInCart] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/cart`);
      const cartData = response.data;
      setIsSomethingInCart(cartData.length !== 0);
      const productDataPromises = cartData.map((item: { id: number }) =>
        axios.get(`${API_URL}/products/${item.id}`)
      );
      const productDataResponses = await Promise.all(productDataPromises);
      const productData = productDataResponses.map((response) => {
        const data = response.data;
        return {
          url: data.url,
          alt: data.alt,
          header: data.header,
          price: data.price,
          priceAfterDiscount: data.priceAfterDiscount,
        };
      });
      setProducts(productData);
      setDidFetchData(true);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.contentWrapper}>
        {didFetchData ? (
          isSomethingInCart ? (
            <CartWithItems products={products} />
          ) : (
            <EmptyCart />
          )
        ) : null}
      </div>
    </div>
  );
}
