import React, { Fragment } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface PenawaranModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

type InputType = { penawaran: number };

const BuatPenawaranModal = (props: PenawaranModalProps) => {
  const { isOpen, closeModal } = props;
  const { formState, handleSubmit, register } = useForm<InputType>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<InputType> = (data) => console.log(data);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-gray-900"
              >
                Buat Penawaran
              </Dialog.Title>

              <Dialog.Description as={Fragment}>
                <div className="p-8">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 ">
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Nilai Penawaran
                      </label>
                      <input
                        type="number"
                        id="penawaran"
                        placeholder="0"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        {...register("penawaran", { required: true })}
                      />
                      {errors.penawaran && (
                        <p className="m-1 text-sm text-red-600">
                          {errors.penawaran?.message}
                        </p>
                      )}
                    </div>
                  </form>

                  <p className="text-sm text-gray-500">
                    Pastikan telah membaca{" "}
                    <Link href={`/syarat-ketentuan`}>
                      <a className="text-blue-600 cursor-pointer hover:underline">
                        Syarat & Ketentuan
                      </a>
                    </Link>{" "}
                    sebelum membuat penawaran.
                  </p>
                </div>
              </Dialog.Description>

              <div className="flex flex-row justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-primary hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  Buat Penawaran
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BuatPenawaranModal;