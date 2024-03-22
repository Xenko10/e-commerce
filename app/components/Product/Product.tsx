import styles from "./Product.module.css";
import Cart from "./Actions/Cart";
import Wishlist from "./Actions/Wishlist";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../constant";
import { ProductWithActionsDTO } from "../../../types";

export default function Product({
  id,
  url,
  alt,
  header,
  price,
  priceAfterDiscount,
  stars,
  opinions,
  cart,
  setCart,
  wishlist,
  setWishlist,
}: ProductWithActionsDTO) {
  const [isCartUpdating, setIsCartUpdating] = useState(false);
  const [isWishlistUpdating, setIsWishlistUpdating] = useState(false);

  function addToCart(product: { id: number }) {
    try {
      const isInCart = cart?.find((item) => {
        return item.id === product.id;
      });
      if (!isInCart && !isCartUpdating) {
        setIsCartUpdating(true);
        axios
          .post(`${API_URL}/cart`, { id: product.id, quantity: 1 })
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
      if (!isCartUpdating) {
        setIsCartUpdating(true);
        axios.delete(`${API_URL}/cart/${product.id}`).then(() => {
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
      if (!isInWishlist && !isWishlistUpdating) {
        setIsWishlistUpdating(true);
        axios
          .post(`${API_URL}/wishlist`, { id: product.id })
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
      if (!isWishlistUpdating) {
        setIsWishlistUpdating(true);
        axios.delete(`${API_URL}/wishlist/${product.id}`).then(() => {
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

  function renderStars() {
    const filledStars = Math.floor(stars);
    const halfFilledStar = stars - filledStars === 0.5;
    return (
      <>
        {Array.from(Array(5), (_, index) => (
          <img
            key={index}
            src={`/img/flashsales/${
              index < filledStars
                ? "star_filled.png"
                : index === filledStars && halfFilledStar
                ? "star_half_filled.png"
                : "star_not_filled.png"
            }`}
            alt='star'
          />
        ))}
      </>
    );
  }

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  let wishlistStroke = isAddedToWishlist ? "white" : "black";
  let cartStroke = isAddedToCart ? "white" : "black";

  function handleAddToCart() {
    if (!isAddedToCart && !isCartUpdating) {
      setIsAddedToCart(true);
      addToCart({ id });
    } else if (isAddedToCart && !isCartUpdating) {
      setIsAddedToCart(false);
      deleteFromCart({ id });
    }
  }

  function handleAddToWishlist() {
    if (!isAddedToWishlist && !isWishlistUpdating) {
      setIsAddedToWishlist(true);
      addToWishlist({ id });
    } else if (isAddedToWishlist && !isWishlistUpdating) {
      setIsAddedToWishlist(false);
      deleteFromWishlist({ id });
    }
  }

  useEffect(() => {
    if (!isCartUpdating && cart.some((item) => item.id === id)) {
      setIsAddedToCart(true);
    }
    if (!isWishlistUpdating && wishlist.some((item) => item.id === id)) {
      setIsAddedToWishlist(true);
    }
  }, [cart, wishlist]);

  return (
    <div className={styles.productWrapper}>
      <div
        className={styles.item}
        onMouseOver={() => {
          setIsMouseOver(true);
        }}
        onMouseLeave={() => {
          setIsMouseOver(false);
        }}>
        <div className={styles.imgActionsWrapper}>
          <img src={`/img/flashsales/${url}`} alt={alt} />

          {priceAfterDiscount ? (
            <div className={styles.percentages}>
              -{Math.floor((1 - priceAfterDiscount / price) * 100)}%
            </div>
          ) : null}
          <div
            className={
              isAddedToWishlist
                ? `${styles.wishlist} ${styles.clicked}`
                : styles.wishlist
            }
            onClick={() => handleAddToWishlist()}>
            <Wishlist wishlistStroke={wishlistStroke} />
          </div>
          <div
            className={
              isAddedToCart ? `${styles.cart} ${styles.clicked}` : styles.cart
            }
            onClick={() => {
              handleAddToCart();
            }}>
            <Cart cartStroke={cartStroke} />
          </div>
          <div
            className={`${styles.addToCart} ${
              isMouseOver ? styles.open : null
            }`}
            onClick={() => {
              handleAddToCart();
            }}>
            {isAddedToCart ? "Remove from cart" : "Add to cart"}
          </div>
        </div>
        <div className={styles.info}>
          <h3>{header}</h3>
          <div className={styles.prices}>
            <span className={styles.priceAfterDiscount}>
              ${priceAfterDiscount}
            </span>
            <span className={styles.price}>${price}</span>
          </div>
          <div className={styles.reviews}>
            <span>{renderStars()}</span>
            <span className={styles.opinions}>({opinions})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
