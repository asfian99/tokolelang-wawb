import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DilelangkanInterface } from "../../pages/halaman-pelelang";

interface DilelangkanDetailInterface {
  data: DilelangkanInterface;
}

const DilelangkanDetailModal = (props: DilelangkanDetailInterface) => {
  const { data } = props;
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  console.log(data);

  return (
    <>
      <span
        onClick={openModal}
        className="cursor-pointer text-primary hover:text-blue-600 hover:underline"
      >
        Detail
      </span>

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
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
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
              <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900"
                >
                  Buat Lelang Baru
                </Dialog.Title>
                <Dialog.Description as={Fragment}>
                  <h2>{data.name}</h2>
                </Dialog.Description>

                <div className="flex flex-row justify-end gap-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DilelangkanDetailModal;
