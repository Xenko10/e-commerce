import dynamic from "next/dynamic";

const FlashSales = dynamic(() => import("./FlashSalesComponent"), {
  ssr: false,
});

export default FlashSales;
