import React from "react";
import { getTimeStamp } from "../../lib/formatDateTime";
import { ImageResponse } from "../../lib/mutations/imageMutations";
import { ItemResponseWithTrans } from "../../lib/mutations/itemMutations";
import Product from "./Product";

interface ProductsProps {
  data: ItemResponseWithTrans[];
  images: ImageResponse[];
}

const Products = ({ data, images }: ProductsProps) => {
  const items = data.filter((item) => item.closing_time > getTimeStamp());

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {items.map((item) => {
        const itemImage = images?.filter((img) => img.item_id === item.id);
        return <Product key={item.id} data={item} images={itemImage} />;
      })}
    </div>
  );
};

export default Products;
