import dynamic from "next/dynamic";

const Product = dynamic(() => import("./ProductComponent"), {
  ssr: false,
});

export default Product;
