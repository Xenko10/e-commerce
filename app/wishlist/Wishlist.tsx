"use client";

import styles from "./Wishlist.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constant";
import Product from "../components/Product/Product";
import { ProductWithActionsDTO } from "../../types";
import EmptyWishlist from "./EmptyWishlist/EmptyWishlist";

export default function Wishlist() {
  const [products, setProducts] = useState<ProductWithActionsDTO[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [isSomethingInWishlist, setIsSomethingInWishlist] = useState(false);
  const [wishlist, setWishlist] = useState<{ id: number }[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/wishlist`);
      const wishlistData = response.data;
      setIsSomethingInWishlist(wishlistData.length !== 0);
      setWishlist(wishlistData);

      const productDataPromises = wishlistData.map((item: { id: number }) =>
        axios.get(`${API_URL}/products/${item.id}`)
      );
      const productDataResponses = await Promise.all(productDataPromises);
      const productData = productDataResponses.map((response) => response.data);
      setProducts(productData);
      setIsDataFetched(true);
    };
    fetchData();
  }, []);

  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${API_URL}/cart`).then((response) => {
        const data = response.data;
        setCart(data);
      });
    };
    fetchData();
  }, []);

  return (
    <div className={styles.wishlist}>
      <div className={styles.contentWrapper}>
        {isDataFetched ? (
          isSomethingInWishlist ? (
            <>
              <h2 className={styles.header}>
                Wishlist {wishlist.length !== 0 ? `(${wishlist.length})` : null}
              </h2>
              <div className={styles.productsWrapper}>
                {products.map((product: ProductWithActionsDTO) => (
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
            </>
          ) : (
            <EmptyWishlist />
          )
        ) : null}
      </div>
    </div>
  );
}
