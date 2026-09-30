import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Product from "../pages/Products";
import ProductCard from "./ProductCard";

const BestSeller = () => {
  const { navigate, products } = useContext(AppContext);
  return (
    <div>
      <p className="text-2xl font-medium md:text-3xl">Best Seller</p>
      <div
        className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
      lg:grid-cols-5 gap-4 items-center justify-center"
      >
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product}></ProductCard>
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
