"use client";

import styles from "./NavbarChildrenWrapper.module.css";
import Navbar from "../Navbar/Navbar";
import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { API_URL } from "../../../constant";
import { ProductDTO, CartDTO, WishlistDTO } from "../../../types";
import axios from "axios";

type ContextData = {
  products: ProductDTO[];
  cart: CartDTO;
  wishlist: WishlistDTO;
  setCart: Dispatch<SetStateAction<CartDTO>>;
  setWishlist: Dispatch<SetStateAction<WishlistDTO>>;
};

export const ValuesContext = createContext<ContextData>(null!);

export function NavbarChildrenWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <ValuesContext.Provider
      value={{ products, cart, wishlist, setCart, setWishlist }}>
      <Navbar />
      {children}
    </ValuesContext.Provider>
  );
}
