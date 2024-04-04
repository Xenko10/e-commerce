"use client";

import styles from "./Wishlist.module.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_URL } from "../../constant";
import Product from "../components/Product/Product";
import { ProductWithActionsDTO, WishlistDTO, CartDTO } from "../../types";
import EmptyWishlist from "./EmptyWishlist/EmptyWishlist";
import { ValuesContext } from "../components/NavbarChildrenWrapper/NavbarChildrenWrapper";

export default function Wishlist() {
  const { cart, setCart, wishlist, setWishlist } = useContext(ValuesContext);

  const [products, setProducts] = useState<ProductWithActionsDTO[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [isSomethingInWishlist, setIsSomethingInWishlist] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<WishlistDTO>(`${API_URL}/wishlist`);
      const wishlistData = response.data;
      setIsSomethingInWishlist(wishlistData.length !== 0);

      const productDataPromises = wishlistData.map((item) =>
        axios.get<ProductWithActionsDTO>(`${API_URL}/products/${item.id}`)
      );
      const productDataResponses = await Promise.all(productDataPromises);
      const productData = productDataResponses.map((response) => response.data);
      setProducts(productData);
      setIsDataFetched(true);
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
                {products.map((product) => (
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
