import React from "react";
import Image from "next/image";
import { ClockIcon, LocationMarkerIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { PostItemResponse } from "../../lib/mutations/itemMutations";
import {
  formatDate,
  formatDateTime,
  formatTime,
} from "../../lib/formatDateTime";
import { formatRupiah } from "../../lib/formatCurrency";
import { formatSlug } from "../../lib/formatString";
import { PostImageResponse } from "../../lib/mutations/imageMutations";
import { rgbDataURL } from "../../lib/formatImage";
import { IMAGE_URL } from "../../lib/url";

interface ProductProps {
  data: PostItemResponse;
  images: PostImageResponse[];
}

const placeholderImg = "/uploads/item_placeholder.png";

const Product = ({ data, images }: ProductProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/lelang-terbuka/${formatSlug(data.name, data.id)}`);
  };

  // console.log(images);

  const img = images.length > 0 ? IMAGE_URL + "/w_400" + images[0].link : "";
  return (
    <div className="border border-gray-300 rounded-xl group hover:bg-gray-50">
      <figure className="border-b border-gray-300 cursor-pointer rounded-t-xl">
        <Image
          className="rounded-t-xl"
          onClick={onClick}
          src={images.length ? img : placeholderImg}
          alt="placeholderImage"
          height="400"
          width="400"
          objectFit="cover"
          layout="responsive"
          placeholder="blur"
          blurDataURL={rgbDataURL(220, 220, 220)}
        />
      </figure>

      <div className="px-4 pb-4">
        <h2
          onClick={onClick}
          className="mt-4 font-bold cursor-pointer group-hover:text-black hover:underline"
        >
          {data.name}
        </h2>
        <div className="flex flex-row items-center justify-start gap-2 mt-2 mb-4 text-red-600">
          <ClockIcon className="w-4 h-4 font-semibold" />
          <p className="text-sm font-semibold">
            {formatDateTime(data.closing_time)}
          </p>
        </div>

        <div className="flex flex-col items-start justify-between w-full gap-2 text-sm">
          <div className="flex flex-row items-start justify-between w-full gap-4">
            <p>Dibuka</p>
            <h4>{formatRupiah(data.open_bid)}</h4>
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
          <h4 className="text-base font-semibold">{data.location}</h4>
        </div>
      </div>
    </div>
  );
};

export default Product;
