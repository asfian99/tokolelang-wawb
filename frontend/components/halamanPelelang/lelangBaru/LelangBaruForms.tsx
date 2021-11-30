import React, { Dispatch, SetStateAction, Fragment, useState } from "react";
import { Dialog } from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Link from "next/link";
import * as yup from "yup";
import {
  postItemImage,
  uploadImage,
} from "../../../lib/mutations/imageMutations";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import type {
  PostImageInputs,
  PostImageResponse,
} from "../../../lib/mutations/imageMutations";
import {
  postItem,
  PostItemInputs,
  PostItemResponse,
} from "../../../lib/mutations/itemMutations";
// import { formatUnixTime } from "../../../lib/formatDateTime";
import UploadImage from "../../forms/UploadImage";

interface LelangBaruFormsProps {
  isAccept: boolean;
  setIsAccept: Dispatch<SetStateAction<boolean>>;
  closeThisModal: () => void;
}

interface InputType {
  name: string;
  description: string;
  open_bid: number;
  bid_ratio: number;
  closing_time: string;
  fundraising: boolean;
  event: string;
  location: string;
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

const LelangBaruForms = (props: LelangBaruFormsProps) => {
  const { isAccept, setIsAccept, closeThisModal } = props;
  const { formState, handleSubmit, register } = useForm<InputType>({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  // const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  // const formRef = React.useRef<HTMLFormElement | null>(null);
  const [reqStatus, setReqStatus] = useState({ loading: false, error: false });
  const [selectedImg, setSelectedImg] = useState();

  const itemMutation = useMutation<
    PostItemResponse,
    AxiosError,
    PostItemInputs
  >((data) => postItem(data));
  const imageMutation = useMutation<
    PostImageResponse,
    AxiosError,
    PostImageInputs
  >((data) => postItemImage(data));

  const upload = async (iid: number) => {
    if (!selectedImg) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);

    reader.onloadend = () => {
      uploadImage(reader.result).then((data) => {
        setSelectedImg(undefined);
        console.log(data.path);

        const newImage = { item_id: iid, link: data.path };
        imageMutation.mutate(newImage, {
          onError: (error) => {
            console.log(error.message);
            setReqStatus({ loading: false, error: true });
          },
          onSuccess: (data) => {
            console.log(data);
            closeThisModal();
            setReqStatus({ loading: false, error: false });
          },
        });
      });
    };
  };

  const onSubmit: SubmitHandler<InputType> = (data) => {
    setReqStatus({ loading: true, error: false });
    console.log(data);

    if (selectedImg) {
      itemMutation.mutate(data, {
        onError: (error) => {
          console.log(error.message);
          setReqStatus({ loading: false, error: true });
        },
        onSuccess: async (data) => {
          console.log(data);
          upload(data.id);
        },
      });
    }
  };

  return (
    <>
      <Dialog.Description as={Fragment}>
        <div className="p-8">
          <form>
            <div className="grid grid-cols-2 gap-4">
              {/* NAMA BARANG */}
              <div>
                <label
                  htmlFor="namaBarang"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nama Barang
                </label>
                <input
                  type="text"
                  id="namaBarang"
                  placeholder="Nama"
                  className="form-input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="m-1 text-sm text-red-600">
                    Nama Penawaran Invalid
                  </p>
                )}
              </div>

              {/* HARGA PEMBUKAAN */}
              <div>
                <label
                  htmlFor="hargaPembukaan"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Harga Pembukaan
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-lg sm:text-sm">
                    Rp
                  </span>
                  <input
                    type="number"
                    id="hargaPembukaan"
                    placeholder="0"
                    className="form-input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("open_bid")}
                  />
                </div>
                {errors.open_bid && (
                  <p className="m-1 text-sm text-red-600">
                    Nilai Harga Invalid
                  </p>
                )}
              </div>

              {/* DESKRIPSI */}
              <div>
                <label
                  htmlFor="deskripsiBarang"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Deskripsi Barang
                </label>
                <textarea
                  id="deskripsiBarang"
                  rows={4}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Deskripsi..."
                  {...register("description")}
                />
                {errors.description && (
                  <p className="m-1 text-sm text-red-600">
                    Deskripsi Barang Invalid
                  </p>
                )}
              </div>

              <div className="flex flex-col justify-between">
                {/* WAKTU PENUTUPAN */}
                <div>
                  <label
                    htmlFor="waktuPenutupan"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Waktu Penutupan
                  </label>
                  <input
                    type="datetime-local"
                    id="waktuPenutupan"
                    placeholder=""
                    className="form-input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("closing_time")}
                  />
                  {errors.closing_time && (
                    <p className="m-1 text-sm text-red-600">
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
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    Penggalangan Dana
                  </span>
                </label>
              </div>

              {/* KELIPATAN PENAWARAN */}
              <div>
                <label
                  htmlFor="kelipatanPenawaran"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Kelipatan Penawaran
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-lg sm:text-sm">
                    Rp
                  </span>
                  <input
                    type="number"
                    id="kelipatanPenawaran"
                    placeholder="0"
                    className="form-input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("bid_ratio")}
                  />
                </div>
                {errors.bid_ratio && (
                  <p className="m-1 text-sm text-red-600">
                    Nilai Harga Invalid
                  </p>
                )}
              </div>
              {/* LOKASI */}
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Lokasi (Kabupaten / Kota)
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="Kabupaten"
                  className="form-input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...register("location")}
                />
                {errors.location && (
                  <p className="m-1 text-sm text-red-600">Lokasi Invalid</p>
                )}
              </div>

              {/* EVENT */}
              <div>
                <label
                  htmlFor="event"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Event
                </label>
                <input
                  type="text"
                  id="event"
                  placeholder="Event (optional)"
                  className="form-input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...register("event")}
                />
              </div>

              {/* IMAGE */}
              <UploadImage img={{ selectedImg, setSelectedImg }} />
            </div>
          </form>

          <div className="flex flex-row items-center gap-4 mt-5">
            <input
              type="checkbox"
              checked={isAccept}
              onChange={() => setIsAccept(!isAccept)}
              id="syaratKetentuan"
              className="w-4 h-4 border border-gray-300 rounded form-checkbox bg-gray-50 focus:ring-3 focus:ring-blue-300"
            />
            <label htmlFor="syaratKetentuan" className="text-sm text-gray-500">
              Saya telah membaca & menyetujui{" "}
              <Link href={`/syarat-ketentuan`}>
                <a className="text-blue-600 cursor-pointer hover:underline">
                  Syarat & Ketentuan
                </a>
              </Link>{" "}
              sebelum membuat lelang baru.
            </label>
          </div>
        </div>
      </Dialog.Description>

      <div className="flex flex-row justify-end gap-4">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={closeThisModal}
        >
          Batal
        </button>
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!isAccept}
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-primary hover:bg-blue-600 focus:outline-none disabled:bg-blue-300 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          {reqStatus.loading ? "Loading" : "Buat Lelang Baru"}
        </button>
      </div>
    </>
  );
};

export default LelangBaruForms;
