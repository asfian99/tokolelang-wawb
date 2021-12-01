import React from "react";
import { formatRupiah } from "../../../lib/formatCurrency";
import { formatDateTime } from "../../../lib/formatDateTime";
import { ItemResponse } from "../../../lib/mutations/itemMutations";

interface LelangDetailViewProps {
  data: ItemResponse;
}

const LelangDetailView = ({ data }: LelangDetailViewProps) => {
  return (
    <div className="pr-4">
      <div className="flex flex-col mt-4">
        <label className="text-xs font-bold uppercase">Nama Barang</label>
        <h5 className="text-xl ">{data.name}</h5>
      </div>
      <div className="flex flex-col mt-4">
        <label className="text-xs font-bold uppercase">Deskripsi Barang</label>
        <h5 className="text-base">{data.description}</h5>
      </div>
      <div className="grid items-center justify-start grid-cols-2">
        <div className="flex flex-col mt-4">
          <label className="text-xs font-bold uppercase">Harga Pembukaan</label>
          <h5 className="text-base ">{formatRupiah(data.open_bid)}</h5>
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-xs font-bold uppercase">
            Kelipatan Penawaran
          </label>
          <h5 className="text-base ">{formatRupiah(data.bid_ratio)}</h5>
        </div>
      </div>
      <div className="grid items-center justify-start grid-cols-2">
        <div className="flex flex-col mt-4">
          <label className="text-xs font-bold uppercase">Waktu Penutupan</label>
          <h5 className="text-base ">{formatDateTime(data.closing_time)}</h5>
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-xs font-bold uppercase">Alamat</label>
          <h5 className="text-base ">{data.location}</h5>
        </div>{" "}
      </div>
      <div className="grid items-center justify-start grid-cols-2">
        <div className="flex flex-col mt-4">
          <label className="text-xs font-bold uppercase">
            Penggalangan Dana
          </label>
          <h5 className="text-base ">
            {data.fundraising > 0 ? "Ya" : "Tidak"}
          </h5>
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-xs font-bold uppercase">Event</label>
          <h5 className="text-base ">{data.event}</h5>
        </div>
      </div>
    </div>
  );
};

export default LelangDetailView;
