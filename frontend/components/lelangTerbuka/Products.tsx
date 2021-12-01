import React from "react";
import { ImageResponse } from "../../lib/mutations/imageMutations";
import { ItemResponseWithTrans } from "../../lib/mutations/itemMutations";
import Product from "./Product";

interface ProductsProps {
  data: ItemResponseWithTrans[];
  images: ImageResponse[];
}

const Products = ({ data, images }: ProductsProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {data &&
        data?.map((item) => {
          const itemImage = images?.filter((img) => img.item_id === item.id);
          return <Product key={item.id} data={item} images={itemImage} />;
        })}
    </div>
  );
};

export default Products;
