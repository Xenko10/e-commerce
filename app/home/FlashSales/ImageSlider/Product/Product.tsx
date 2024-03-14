import styles from "./Product.module.css";
import Cart from "./Actions/Cart";
import Wishlist from "./Actions/Wishlist";
import { useState, useEffect } from "react";

type ProductWithFunctions = {
  id: number;
  url: string;
  alt: string;
  header: string;
  price: number;
  priceAfterDiscount: number;
  stars: number;
  opinions: number;
  addToCart: (id: number) => void;
  deleteFromCart: (id: number) => void;
  isCartUpdating: boolean;
  addToWishlist: (id: number) => void;
  deleteFromWishlist: (id: number) => void;
  isWishlistUpdating: boolean;
  cart: { id: number }[];
  wishlist: { id: number }[];
};

export default function Product({
  id,
  url,
  alt,
  header,
  price,
  priceAfterDiscount,
  stars,
  opinions,
  addToCart,
  deleteFromCart,
  isCartUpdating,
  addToWishlist,
  deleteFromWishlist,
  isWishlistUpdating,
  cart,
  wishlist,
}: ProductWithFunctions) {
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
    if (isAddedToCart === false && isCartUpdating === false) {
      setIsAddedToCart(true);
      addToCart(id);
    } else if (isAddedToCart === true && isCartUpdating === false) {
      setIsAddedToCart(false);
      deleteFromCart(id);
    }
  }

  function handleAddToWishlist() {
    if (isAddedToWishlist === false && isWishlistUpdating === false) {
      setIsAddedToWishlist(true);
      addToWishlist(id);
    } else if (isAddedToWishlist === true && isWishlistUpdating === false) {
      setIsAddedToWishlist(false);
      deleteFromWishlist(id);
    }
  }

  useEffect(() => {
    if (isCartUpdating === false && cart.some((item) => item.id === id)) {
      setIsAddedToCart(true);
    }
    if (
      isWishlistUpdating === false &&
      wishlist.some((item) => item.id === id)
    ) {
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
          <div className={styles.percentages}>
            -{Math.floor((1 - priceAfterDiscount / price) * 100)}%
          </div>
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
            className={`${styles.addToCart} ${isMouseOver ? styles.open : ""}`}
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
