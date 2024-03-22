"use client";

import styles from "./Cart.module.css";
import EmptyCart from "./EmptyCart/EmptyCart";
import CartWithItems from "./CartWithItems/CartWithItems";
import { useState, useEffect } from "react";
import { API_URL } from "../../constant";
import { ProductInCartDTO } from "../../types";
import axios from "axios";

export default function Cart() {
  // te dwa stany być może powinny byś złączone w jeden stand
  const [products, setProducts] = useState<ProductInCartDTO[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  // może modelować stan na przykład w ten sposób
  // const [fetchedProducts, setFetchedProducts] = useState<{
  //   data: ProductInCartDTO[];
  //   status: 'success' | 'pending' | 'failed';
  // }>({
  //   data: [],
  //   status: 'pending',
  // });

  const [isSomethingInCart, setIsSomethingInCart] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<{ id: number; quantity: number }[]>(
        `${API_URL}/cart`,
      );
      const cartData = response.data;
      if (cartData.length > 0) {
        setIsSomethingInCart(true);
        // to jest spoko podejście skoro masz ograniczony backend, ale musisz miec na uwadze, ze nie będzie się to skalowało

        const productDataPromises = cartData.map((item) =>
          axios.get<ProductInCartDTO>(`${API_URL}/products/${item.id}`),
        );
        const productDataResponses = await Promise.all(productDataPromises);
        const productData = productDataResponses.map((response, index) => {
          const data = response.data;
          const quantity = cartData[index].id == data.id ? cartData[index].quantity : 1;
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
