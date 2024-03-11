"use client";

import React from "react";
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

const products = [
  {
    url: "gamepad.png",
    alt: "gamepad",
    header: "HAVIT HV-G92 Gamepad",
    price: 160,
    discount: 120,
    stars: 4.5,
    opinions: 88,
  },
  {
    url: "keyboard.png",
    alt: "keyboard",
    header: "AK-900 Wired Keyboard",
    price: 1160,
    discount: 920,
    stars: 4,
    opinions: 75,
  },
  {
    url: "monitor.png",
    alt: "monitor",
    header: "IPS LCD Gaming Monitor",
    price: 400,
    discount: 240,
    stars: 5,
    opinions: 121,
  },
  {
    url: "chair.png",
    alt: "chair",
    header: "S-Series Comfort Chair",
    price: 400,
    discount: 160,
    stars: 3.5,
    opinions: 99,
  },
];

export default function ImageSlider() {
  return (
    <CarouselProvider
      naturalSlideWidth={270}
      naturalSlideHeight={340}
      totalSlides={products.length}
      infinite={true}
      isPlaying={true}
      visibleSlides={3}
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
              discount={product.discount}
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
