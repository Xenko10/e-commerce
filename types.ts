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

export type ProductWithActionsDTO = ProductDTO & {
  cart: { id: number; quantity: number }[];
  setCart: React.Dispatch<
    React.SetStateAction<{ id: number; quantity: number }[]>
  >;
  wishlist: { id: number }[];
  setWishlist: React.Dispatch<React.SetStateAction<{ id: number }[]>>;
};

export type ProductInCartDTO = {
  id: number;
  url: string;
  alt: string;
  header: string;
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
};
