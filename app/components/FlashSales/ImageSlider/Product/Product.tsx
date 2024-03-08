import styles from "./Product.module.css";

export default function Product({
  url,
  alt,
  header,
  price,
  discount,
  stars,
  opinions,
}: {
  url: string;
  alt: string;
  header: string;
  price: number;
  discount: number;
  stars: number;
  opinions: number;
}) {
  function renderStars() {
    const filledStars = Math.floor(stars);
    const halfFilledStar = stars - filledStars === 0.5;
    return (
      <>
        {Array.from({ length: 5 }, (_, index) => (
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

  return (
    <div className={styles.productWrapper}>
      <div className={styles.item}>
        <div className={styles.imgWrapper}>
          <img src={`/img/flashsales/${url}`} alt={alt} />
        </div>
        <div className={styles.info}>
          <h3>{header}</h3>
          <div className={styles.prices}>
            <span className={styles.discount}>${discount}</span>
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
