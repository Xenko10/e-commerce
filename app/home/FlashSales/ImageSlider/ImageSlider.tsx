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
import axios from "axios";
import Product from "../../../components/Product/Product";
import styles from "./ImageSlider.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useMediaQuery } from "react-responsive";
import { API_URL } from "../../../../constant";
import { ProductDTO, WishlistDTO, CartDTO } from "../../../../types";

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

  const [products, setProducts] = useState<ProductDTO[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get<ProductDTO[]>(`${API_URL}/products`).then((response) => {
        const data = response.data;
        setProducts(data);
      });
    };
    fetchData();
  }, []);

  const [cart, setCart] = useState<CartDTO>([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get<CartDTO>(`${API_URL}/cart`).then((response) => {
        const data = response.data;
        setCart(data);
      });
    };
    fetchData();
  }, []);

  const [wishlist, setWishlist] = useState<WishlistDTO>([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get<WishlistDTO>(`${API_URL}/wishlist`).then((response) => {
        const data = response.data;
        setWishlist(data);
      });
    };
    fetchData();
  }, []);

  return (
    <CarouselProvider
      className={styles.sliderWrapper}
      naturalSlideWidth={270}
      naturalSlideHeight={340}
      totalSlides={products.length}
      infinite={true}
      isPlaying={true}
      visibleSlides={slides}
      dragEnabled={false}>
      <Slider>
        {products.map((product) => (
          <Slide index={product.id} key={product.id} className={styles.slide}>
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
