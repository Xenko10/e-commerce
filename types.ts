import { Dispatch, SetStateAction } from "react";

export type ProductDTO = {
  id: number;
  url: string;
  alt: string;
  header: string;
  price: number;
  priceAfterDiscount: number;
  stars: number;
  opinions: number;
};

export type CartDTO = {
  id: string;
  productId: number;
  quantity: number;
}[];
export type WishlistDTO = {
  id: string;
  productId: number;
}[];

export type ProductWithActionsDTO = ProductDTO & {
  cart: CartDTO;
  setCart: Dispatch<SetStateAction<CartDTO>>;
  wishlist: WishlistDTO;
  setWishlist: Dispatch<SetStateAction<WishlistDTO>>;
};

export type ProductInCartDTO = {
  id: number;
  cartId: string;
  url: string;
  alt: string;
  header: string;
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
};
