import React from "react";
import { PostItemResponse } from "../../lib/mutations/itemMutations";
import Product from "./Product";

interface ProductsProps {
  data: PostItemResponse[];
}

const Products = ({ data }: ProductsProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {data.map((item) => (
        <Product key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Products;
