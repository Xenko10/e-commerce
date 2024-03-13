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
import axios from "axios";

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

  const [products, setProducts] = useState<ProductDataType[]>([]);
  const [cart, setCart] = useState<{ id: number }[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:3001/products").then((response) => {
        const data = response.data;
        setProducts(data);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:3001/cart").then((response) => {
        const data = response.data;
        setCart(data);
      });
    };
    fetchData();
  }, []);

  function addToCart(product: { id: number }) {
    try {
      const isInCart = cart?.find((item) => {
        return item.id === product.id;
      });
      if (!isInCart && isUpdating === false) {
        setIsUpdating(true);
        axios
          .post("http://localhost:3001/cart", { id: product.id })
          .then((response) => {
            setCart((prevCart) => [...prevCart, response.data]);
            setIsUpdating(false);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function deleteFromCart(product: { id: number }) {
    try {
      if (isUpdating === false) {
        setIsUpdating(true);
        axios.delete(`http://localhost:3001/cart/${product.id}`).then(() => {
          setCart((prevCart) => {
            return prevCart.filter((item) => {
              return item.id !== product.id;
            });
          });
          setIsUpdating(false);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CarouselProvider
      naturalSlideWidth={270}
      naturalSlideHeight={340}
      totalSlides={products.length}
      infinite={true}
      isPlaying={true}
      visibleSlides={slides}
      className={styles.sliderWrapper}
      dragEnabled={false}>
      <Slider>
        {products.map((product: ProductDataType) => (
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
              addToCart={(id: number) => addToCart({ id })}
              deleteFromCart={(id: number) => deleteFromCart({ id })}
              isUpdating={isUpdating}
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
