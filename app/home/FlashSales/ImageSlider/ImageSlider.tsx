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
import Product from "../../../components/Product/Product";
import styles from "./ImageSlider.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { API_URL } from "../../../../constant";

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
  const [isCartUpdating, setIsCartUpdating] = useState(false);

  const [wishlist, setWishlist] = useState<{ id: number }[]>([]);
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
        axios.post(`${API_URL}/cart`, { id: product.id }).then((response) => {
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
      if (!isInWishlist && isWishlistUpdating === false) {
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
      if (isWishlistUpdating === false) {
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
              isCartUpdating={isCartUpdating}
              addToWishlist={(id: number) => addToWishlist({ id })}
              deleteFromWishlist={(id: number) => deleteFromWishlist({ id })}
              isWishlistUpdating={isWishlistUpdating}
              cart={cart}
              wishlist={wishlist}
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
