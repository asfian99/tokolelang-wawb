import React from "react";
import { ClockIcon } from "@heroicons/react/outline";
import { formatRupiah } from "../../lib/formatCurrency";
import { formatDate, formatTime } from "../../lib/formatDateTime";
import { PostItemResponse } from "../../lib/mutations/itemMutations";
import { PostImageResponse } from "../../lib/mutations/imageMutations";

interface ProductInfoProps {
  data: PostItemResponse;
}

const ProductInfo = (props: ProductInfoProps) => {
  const { data } = props;
  return (
    <div>
      <h2 className="mt-4 text-3xl font-bold ">{data.name}</h2>

      <div className="flex flex-row items-center justify-start gap-2 mt-2 mb-4 text-red-600">
        <ClockIcon className="w-4 h-4 font-semibold" />
        <p className="text-sm font-semibold">
          {formatDate(data.closing_time)} - {formatTime(data.closing_time)}
        </p>
      </div>

      <div className="mb-6 mr-8">
        <p className="text-gray-700">{data.description}</p>
      </div>
      <div className="flex flex-col items-start justify-between w-full gap-2 text-base">
        <div className="flex flex-col items-start justify-between w-full">
          <p className="font-medium text-gray-600">Dibuka</p>
          <h4 className="text-2xl">{formatRupiah(data.open_bid)}</h4>
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
