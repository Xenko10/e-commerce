"use client";

import styles from "./Cart.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constant";
import Product from "../components/Product/Product";

type ProductDataType = {
  id: number;
  url: string;
  alt: string;
  header: string;
  price: number;
  priceAfterDiscount: number;
  stars: number;
  opinions: number;
};

export default function Cart() {
  const [products, setProducts] = useState<ProductDataType[]>([]);

  const [cart, setCart] = useState<{ id: number }[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/cart`);
      const cartData = response.data;
      setCart(cartData);

      const productDataPromises = cartData.map((item: { id: number }) =>
        axios.get(`${API_URL}/products/${item.id}`)
      );
      const productDataResponses = await Promise.all(productDataPromises);
      const productData = productDataResponses.map((response) => response.data);
      setProducts(productData);
    };
    fetchData();
  }, []);

  const [wishlist, setWishlist] = useState<{ id: number }[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${API_URL}/wishlist`).then((response) => {
        const data = response.data;
        setWishlist(data);
      });
    };
    fetchData();
  }, []);

  return (
    <div className={styles.cart}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.header}>
          Cart {cart.length !== 0 ? `(${cart.length})` : null}
        </h2>
        <div className={styles.productsWrapper}>
          {products.map((product: ProductDataType) => (
            <Product
              id={product.id}
              key={product.header}
              url={product.url}
              alt={product.alt}
              header={product.header}
              price={product.price}
              priceAfterDiscount={product.priceAfterDiscount}
              stars={product.stars}
              opinions={product.opinions}
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
