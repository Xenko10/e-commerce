// DTO - Data Type Object

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
  setCart: React.Dispatch<React.SetStateAction<CartDTO>>;
  wishlist: WishlistDTO;
  setWishlist: React.Dispatch<React.SetStateAction<WishlistDTO>>;
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
