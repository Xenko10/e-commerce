import styles from "./Product.module.css";
import { useState } from "react";

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
  isUpdating,
}: {
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
  isUpdating: boolean;
}) {
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
  const [isLiked, setIsLiked] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  let cartStroke = isAddedToCart ? "white" : "black";

  function handleAddToCart() {
    if (isAddedToCart === false && isUpdating === false) {
      addToCart(id);
    } else if (isAddedToCart === true && isUpdating === false) {
      deleteFromCart(id);
    }
    setIsAddedToCart(!isAddedToCart);
  }

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
              isLiked ? `${styles.wishlist} ${styles.clicked}` : styles.wishlist
            }
            onClick={() => setIsLiked(!isLiked)}>
            <svg
              width='22'
              height='20'
              viewBox='0 0 22 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M6 1C3.239 1 1 3.216 1 5.95C1 8.157 1.875 13.395 10.488 18.69C10.6423 18.7839 10.8194 18.8335 11 18.8335C11.1806 18.8335 11.3577 18.7839 11.512 18.69C20.125 13.395 21 8.157 21 5.95C21 3.216 18.761 1 16 1C13.239 1 11 4 11 4C11 4 8.761 1 6 1Z'
                stroke={isLiked ? "white" : "black"}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <div
            className={
              isAddedToCart ? `${styles.cart} ${styles.clicked}` : styles.cart
            }
            onClick={() => {
              handleAddToCart();
            }}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8.25 20.25C8.66421 20.25 9 19.9142 9 19.5C9 19.0858 8.66421 18.75 8.25 18.75C7.83579 18.75 7.5 19.0858 7.5 19.5C7.5 19.9142 7.83579 20.25 8.25 20.25Z'
                stroke={cartStroke}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M18.75 20.25C19.1642 20.25 19.5 19.9142 19.5 19.5C19.5 19.0858 19.1642 18.75 18.75 18.75C18.3358 18.75 18 19.0858 18 19.5C18 19.9142 18.3358 20.25 18.75 20.25Z'
                stroke={cartStroke}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M2.25 3.75H5.25L7.5 16.5H19.5'
                stroke={cartStroke}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M7.5 12.5H19.1925C19.2792 12.5001 19.3633 12.4701 19.4304 12.4151C19.4975 12.3601 19.5434 12.2836 19.5605 12.1986L20.9105 5.44859C20.9214 5.39417 20.92 5.338 20.9066 5.28414C20.8931 5.23029 20.8679 5.18009 20.8327 5.13717C20.7975 5.09426 20.7532 5.05969 20.703 5.03597C20.6528 5.01225 20.598 4.99996 20.5425 5H6'
                stroke={cartStroke}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
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
