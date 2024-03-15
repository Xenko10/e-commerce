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
  const [isCartUpdating, setIsCartUpdating] = useState(false);

  const [isWishlistUpdating, setIsWishlistUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${API_URL}/products`).then((response) => {
        const data = response.data;
        setProducts(data);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${API_URL}/cart`).then((response) => {
        const data = response.data;
        setCart(data);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${API_URL}/wishlist`).then((response) => {
        const data = response.data;
        setWishlist(data);
      });
    };
    fetchData();
  }, []);

  function addToCart(product: { id: number }) {
    try {
      const isInCart = cart?.find((item) => {
        return item.id === product.id;
      });
      if (!isInCart && isCartUpdating === false) {
        setIsCartUpdating(true);
        axios
          .post("http://localhost:3001/cart", { id: product.id })
          .then((response) => {
            setCart((prevCart) => [...prevCart, response.data]);
            setIsCartUpdating(false);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function deleteFromCart(product: { id: number }) {
    try {
      if (isCartUpdating === false) {
        setIsCartUpdating(true);
        axios.delete(`http://localhost:3001/cart/${product.id}`).then(() => {
          setCart((prevCart) => {
            return prevCart.filter((item) => {
              return item.id !== product.id;
            });
          });
          setIsCartUpdating(false);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function addToWishlist(product: { id: number }) {
    try {
      const isInWishlist = wishlist?.find((item) => {
        return item.id === product.id;
      });
      if (!isInWishlist && isWishlistUpdating === false) {
        setIsWishlistUpdating(true);
        axios
          .post("http://localhost:3001/wishlist", { id: product.id })
          .then((response) => {
            setWishlist((prevWishlist) => [...prevWishlist, response.data]);
            setIsWishlistUpdating(false);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function deleteFromWishlist(product: { id: number }) {
    try {
      if (isWishlistUpdating === false) {
        setIsWishlistUpdating(true);
        axios
          .delete(`http://localhost:3001/wishlist/${product.id}`)
          .then(() => {
            setWishlist((prevWishlist) => {
              return prevWishlist.filter((item) => {
                return item.id !== product.id;
              });
            });
            setIsWishlistUpdating(false);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={styles.cart}>
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
            addToCart={(id: number) => addToCart({ id })}
            deleteFromCart={(id: number) => deleteFromCart({ id })}
            isCartUpdating={isCartUpdating}
            addToWishlist={(id: number) => addToWishlist({ id })}
            deleteFromWishlist={(id: number) => deleteFromWishlist({ id })}
            isWishlistUpdating={isWishlistUpdating}
            cart={cart}
            wishlist={wishlist}
          />
        ))}
      </div>
    </div>
  );
}
