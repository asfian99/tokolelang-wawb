import { ClockIcon } from "@heroicons/react/outline";
import React from "react";

const ProductInfo = () => {
  return (
    <div>
      <h2 className="mt-4 text-3xl font-bold ">Lorem ipsum dolor sit amet.</h2>

      <div className="flex flex-row items-center justify-start gap-2 mt-2 mb-4 text-red-600">
        <ClockIcon className="w-4 h-4 font-semibold" />
        <p className="text-sm font-semibold">24/11/2021 - 18.00</p>
      </div>

      <div className="mb-6 mr-8">
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
          blanditiis vero quod velit saepe quibusdam excepturi dignissimos ad,
          rem eos fuga!
        </p>
      </div>
      <div className="flex flex-col items-start justify-between w-full gap-2 text-base">
        <div className="flex flex-col items-start justify-between w-full">
          <p className="font-medium text-gray-600">Dibuka</p>
          <h4 className="text-2xl">Rp8.000.000</h4>
        </div>
        {/* <div className="flex flex-col items-end justify-between w-full ">
          <h4>|</h4>
        </div> */}
        <div className="flex flex-col items-start justify-between w-full">
          <p className="font-medium text-gray-600">Tertinggi</p>
          <h4 className="text-2xl font-bold">Rp10.250.000</h4>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
