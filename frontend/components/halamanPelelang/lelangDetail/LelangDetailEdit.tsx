import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Link from "next/link";
import * as yup from "yup";
import {
  patchItem,
  PostItemInputs,
  PostItemResponse,
} from "../../../lib/mutations/itemMutations";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { formatInputDateTime } from "../../../lib/formatDateTime";
import { useRouter } from "next/router";

interface LelangDetailEditProps {
  data: PostItemResponse;
  toggleEdit: () => void;
}

interface InputType {
  name: string;
  description: string;
  open_bid: number;
  bid_ratio: number;
  closing_time: string;
  fundraising: boolean;
  location: string;
  event: string;
}

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  open_bid: yup.number().positive().integer().required(),
  bid_ratio: yup.number().positive().integer().required(),
  closing_time: yup.string().required(),
  fundraising: yup.boolean().required(),
  location: yup.string().required(),
  event: yup.string().optional(),
});

const LelangDetailEdit = ({ data, toggleEdit }: LelangDetailEditProps) => {
  const queryClient = useQueryClient();
  const { slug } = useRouter().query;
  const { formState, handleSubmit, register } = useForm<InputType>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data.name,
      open_bid: data.open_bid,
      description: data.description,
      bid_ratio: data.bid_ratio,
      closing_time: formatInputDateTime(data.closing_time),
      fundraising: data.fundraising === 0 ? false : true,
      location: data.location,
      event: data.event,
    },
  });
  const { errors } = formState;
  // const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  // const formRef = React.useRef<HTMLFormElement | null>(null);
  const [reqStatus, setReqStatus] = useState({ loading: false, error: false });

  const itemMutation = useMutation<
    PostItemResponse,
    AxiosError,
    PostItemInputs
  >((data) => patchItem(data, slug));

  const onSubmit: SubmitHandler<InputType> = (data) => {
    setReqStatus({ loading: true, error: false });
    console.log(data);
    itemMutation.mutate(data, {
      onError: (error) => {
        console.log(error.message);
        setReqStatus({ loading: false, error: true });
      },
      onSuccess: async (data) => {
        console.log(data);
        queryClient.invalidateQueries(`item_${slug}`);
        toggleEdit();
      },
    });
  };

  return (
    <div className="py-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* NAMA BARANG */}
          <div>
            <label htmlFor="namaBarang" className="form-input-label">
              Nama Barang
            </label>
            <input
              type="text"
              id="namaBarang"
              placeholder="Nama"
              className="form-input form-input-text"
              {...register("name")}
            />
            {errors.name && (
              <p className="m-1 text-sm text-danger-d">
                Nama Penawaran Invalid
              </p>
            )}
          </div>

          {/* HARGA PEMBUKAAN */}
          <div>
            <label htmlFor="hargaPembukaan" className="form-input-label">
              Harga Pembukaan
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-text-d bg-gray-200 border border-r-0 border-gray-300 rounded-l-lg sm:text-sm">
                Rp
              </span>
              <input
                type="number"
                id="hargaPembukaan"
                placeholder="0"
                className="rounded-l-none form-input form-input-text"
                {...register("open_bid")}
              />
            </div>
            {errors.open_bid && (
              <p className="m-1 text-sm text-danger-d">Nilai Harga Invalid</p>
            )}
          </div>

          {/* DESKRIPSI */}
          <div>
            <label htmlFor="deskripsiBarang" className="form-input-label">
              Deskripsi Barang
            </label>
            <textarea
              id="deskripsiBarang"
              rows={4}
              className="form-input form-input-text"
              placeholder="Deskripsi..."
              {...register("description")}
            />
            {errors.description && (
              <p className="m-1 text-sm text-danger-d">
                Deskripsi Barang Invalid
              </p>
            )}
          </div>

          <div className="flex flex-col justify-between">
            {/* WAKTU PENUTUPAN */}
            <div>
              <label htmlFor="waktuPenutupan" className="form-input-label">
                Waktu Penutupan
              </label>
              <input
                type="datetime-local"
                id="waktuPenutupan"
                placeholder=""
                className="form-input form-input-text"
                {...register("closing_time")}
              />
              {errors.closing_time && (
                <p className="m-1 text-sm text-danger-d">
                  Waktu Penutupan Invalid
                </p>
              )}
            </div>

            {/* FUNDRAISING */}
            <label
              htmlFor="penggalanganDana"
              className="relative flex items-center mt-5 cursor-pointer"
            >
              <input
                type="checkbox"
                id="penggalanganDana"
                className="sr-only"
                {...register("fundraising")}
              />
              <div className="h-6 bg-gray-200 border-2 border-gray-200 rounded-full toggle-bg w-11"></div>
              <span className="ml-3 text-sm font-medium text-text-d">
                Penggalangan Dana
              </span>
            </label>
          </div>

          {/* KELIPATAN PENAWARAN */}
          <div>
            <label htmlFor="kelipatanPenawaran" className="form-input-label">
              Kelipatan Penawaran
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-text-d bg-gray-200 border border-r-0 border-gray-300 rounded-l-lg sm:text-sm">
                Rp
              </span>
              <input
                type="number"
                id="kelipatanPenawaran"
                placeholder="0"
                className="rounded-l-none form-input form-input-text"
                {...register("bid_ratio")}
              />
            </div>
            {errors.bid_ratio && (
              <p className="m-1 text-sm text-danger-d">Nilai Harga Invalid</p>
            )}
          </div>
          {/* LOKASI */}
          <div>
            <label htmlFor="location" className="form-input-label">
              Lokasi (Kabupaten / Kota)
            </label>
            <input
              type="text"
              id="location"
              placeholder="Kabupaten"
              className="form-input form-input-text"
              {...register("location")}
            />
            {errors.location && (
              <p className="m-1 text-sm text-danger-d">Lokasi Invalid</p>
            )}
          </div>

          {/* EVENT */}
          <div>
            <label htmlFor="event" className="form-input-label">
              Event
            </label>
            <input
              type="text"
              id="event"
              placeholder="Event (optional)"
              className="form-input form-input-text"
              {...register("event")}
            />
          </div>

          {/* IMAGE */}
          {/* <UploadImage img={{ selectedImg, setSelectedImg }} /> */}
        </div>

        <div className="flex flex-row items-center justify-end gap-4">
          <button onClick={toggleEdit} className="btn-secondary">
            Batal
          </button>
          <button type="submit" className="btn-primary">
            {reqStatus.loading ? "Loading" : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LelangDetailEdit;
