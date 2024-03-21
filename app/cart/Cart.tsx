"use client";

import styles from "./Cart.module.css";
import EmptyCart from "./EmptyCart/EmptyCart";
import CartWithItems from "./CartWithItems/CartWithItems";
import { useState, useEffect } from "react";
import { API_URL } from "../../constant";
import { ProductInCartDTO } from "../../types";
import axios from "axios";

export default function Cart() {
  const [products, setProducts] = useState<ProductInCartDTO[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

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
          id: data.id,
          url: data.url,
          alt: data.alt,
          header: data.header,
          price: data.price,
          priceAfterDiscount: data.priceAfterDiscount,
        };
      });
      setProducts(productData);
      setIsDataFetched(true);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.contentWrapper}>
        {isDataFetched ? (
          isSomethingInCart ? (
            <CartWithItems products={products} setProducts={setProducts} />
          ) : (
            <EmptyCart />
          )
        ) : null}
      </div>
    </div>
  );
}
