"use client";

import { useEffect, useState, useContext, useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";
import Product from "../../../components/Product/Product";
import styles from "./ImageSlider.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useMediaQuery } from "react-responsive";
import { ValuesContext } from "../../../components/NavbarChildrenWrapper/NavbarChildrenWrapper";
import { getSlidesPerView } from "./utils/getSlidesPerView";

export default function ImageSlider() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const isMediumScreen = useMediaQuery({ query: "(max-width: 1400px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1100px)" });
  const isSmartphone = useMediaQuery({ query: "(max-width: 600px)" });

  const slides = getSlidesPerView(
    isSmartphone,
    isSmallScreen,
    isMediumScreen,
  );

  const { products, cart, wishlist, setCart, setWishlist } =
    useContext(ValuesContext);

  const updateNavigationState = (swiper: SwiperInstance) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
      updateNavigationState(swiperRef.current);
    }
  }, [products.length, slides]);

  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={slides}
        spaceBetween={16}
        autoplay={{ delay: 5000 }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateNavigationState(swiper);
        }}
        onSlideChange={updateNavigationState}
        onUpdate={updateNavigationState}
        className={styles.slider}>
        {products.map((product) => (
          <SwiperSlide key={product.id} className={styles.slide}>
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
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.buttonWrapper}>
        <button
          type="button"
          className={styles.previousButton}
          aria-label="Previous products"
          disabled={isBeginning}
          onClick={() => swiperRef.current?.slidePrev()}>
          <ArrowBackIcon />
        </button>
        <button
          type="button"
          className={styles.nextButton}
          aria-label="Next products"
          disabled={isEnd}
          onClick={() => swiperRef.current?.slideNext()}>
          <ArrowForwardIcon />
        </button>
      </div>
    </div>
  );
}
