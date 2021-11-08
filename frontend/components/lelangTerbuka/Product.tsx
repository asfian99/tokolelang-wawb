import React from "react";
import Image from "next/image";
import PlaceholderImg from "../../assets/placeholder-img.png";

const Product = () => {
  return (
    <div className="p-5 border border-gray-300 rounded-lg">
      <Image
        className="border border-gray-300 rounded-lg"
        src={PlaceholderImg}
        alt="placeholderImage"
        height="400"
        width="400"
        objectFit="cover"
        layout="responsive"
      />
      <h2 className="my-4 font-bold">Lorem ipsum dolor sit amet.</h2>
    </div>
  );
};

export default Product;
