"use client";

import React, { useEffect, useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Product from "./Product/Product";
import styles from "./ImageSlider.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useMediaQuery } from "react-responsive";

const products = [
  {
    url: "gamepad.png",
    alt: "gamepad",
    header: "HAVIT HV-G92 Gamepad",
    price: 160,
    priceAfterDiscount: 120,
    stars: 4.5,
    opinions: 88,
  },
  {
    url: "keyboard.png",
    alt: "keyboard",
    header: "AK-900 Wired Keyboard",
    price: 1160,
    priceAfterDiscount: 920,
    stars: 4,
    opinions: 75,
  },
  {
    url: "monitor.png",
    alt: "monitor",
    header: "IPS LCD Gaming Monitor",
    price: 400,
    priceAfterDiscount: 240,
    stars: 5,
    opinions: 121,
  },
  {
    url: "chair.png",
    alt: "chair",
    header: "S-Series Comfort Chair",
    price: 400,
    priceAfterDiscount: 160,
    stars: 3.5,
    opinions: 99,
  },
  {
    url: "laptop.png",
    alt: "laptop",
    header: "ASUS FHD Gaming Laptop",
    price: 700,
    priceAfterDiscount: 525,
    stars: 5,
    opinions: 325,
  },
  {
    url: "camera.png",
    alt: "camera",
    header: "CANON EOS DSLR Camera",
    price: 360,
    priceAfterDiscount: 270,
    stars: 4,
    opinions: 95,
  },
];

export default function ImageSlider() {
  const [slides, setSlides] = useState(1);

  const isMediumScreen = useMediaQuery({ query: "(max-width: 1400px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1100px)" });
  const isSmartphone = useMediaQuery({ query: "(max-width: 600px)" });

  useEffect(() => {
    if (isSmartphone) {
      setSlides(1);
    } else if (isSmallScreen) {
      setSlides(2);
    } else if (isMediumScreen) {
      setSlides(3);
    } else {
      setSlides(4);
    }
  }, [isMediumScreen, isSmallScreen, isSmartphone]);

  return (
    <CarouselProvider
      naturalSlideWidth={270}
      naturalSlideHeight={340}
      totalSlides={products.length}
      infinite={true}
      isPlaying={true}
      visibleSlides={slides}
      className={styles.sliderWrapper}>
      <Slider>
        {products.map((product, index) => (
          <Slide index={index} key={product.header} className={styles.slide}>
            <Product
              key={product.header}
              url={product.url}
              alt={product.alt}
              header={product.header}
              price={product.price}
              priceAfterDiscount={product.priceAfterDiscount}
              stars={product.stars}
              opinions={product.opinions}
            />
          </Slide>
        ))}
      </Slider>
      <div className={styles.buttonWrapper}>
        <ButtonBack>
          <ArrowBackIcon />
        </ButtonBack>
        <ButtonNext>
          <ArrowForwardIcon />
        </ButtonNext>
      </div>
    </CarouselProvider>
  );
}
