import React from "react";
import Image from "next/image";
import PlaceholderImg from "../../assets/placeholder-img.png";
import { ClockIcon, LocationMarkerIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

const Product = () => {
  const router = useRouter();
  const onClick = () => {
    console.log("porduct");
    router.push(`/lelang-terbuka/${"1"}`);
  };

  return (
    <div className="p-5 border border-gray-300 rounded-lg group hover:bg-gray-50">
      <Image
        className="border border-gray-300 rounded-lg cursor-pointer"
        onClick={onClick}
        src={PlaceholderImg}
        alt="placeholderImage"
        height="400"
        width="400"
        objectFit="cover"
        layout="responsive"
      />
      <h2
        onClick={onClick}
        className="mt-4 font-bold cursor-pointer group-hover:text-black hover:underline"
      >
        Lorem ipsum dolor sit amet.
      </h2>
      <div className="flex flex-row items-center justify-start gap-2 mt-2 mb-4 text-red-600">
        <ClockIcon className="w-4 h-4 font-semibold" />
        <p className="text-sm font-semibold">24/11/2021 - 18.00</p>
      </div>

      <div className="flex flex-col items-start justify-between w-full gap-2 text-sm">
        <div className="flex flex-row items-start justify-between w-full gap-4">
          <p>Dibuka</p>
          <h4>Rp8.000.000</h4>
        </div>
        {/* <div className="flex flex-row items-end justify-between w-full gap-4 ">
          <h4>|</h4>
        </div> */}
        <div className="flex flex-row items-start justify-between w-full gap-4">
          <p>Tertinggi</p>
          <h4 className="text-base font-semibold">Rp10.250.000</h4>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 mt-4">
        <LocationMarkerIcon className="w-5 h-5" />
        <h4 className="text-base font-semibold">Surabaya</h4>
      </div>
    </div>
  );
};

export default Product;
