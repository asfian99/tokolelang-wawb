import React from "react";
import Product from "./Product";

const Products = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
    </div>
  );
};

export default Products;
