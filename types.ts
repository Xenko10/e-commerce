// DTO - Data Type Object

type Id = { id: number };
type SetStateFunction = React.Dispatch<React.SetStateAction<Id[]>>;

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

export type ProductWithActionsDTO = {
  id: number;
  url: string;
  alt: string;
  header: string;
  price: number;
  priceAfterDiscount: number;
  stars: number;
  opinions: number;
  cart: Id[];
  setCart: SetStateFunction;
  wishlist: Id[];
  setWishlist: SetStateFunction;
};

export type ProductInCartDTO = {
  url: string;
  alt: string;
  header: string;
  price: number;
  priceAfterDiscount?: number;
};
