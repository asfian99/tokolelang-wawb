import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import LelangBaruForms from "./LelangBaruForms";

interface LelangBaruModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const LelangBaruModal = (props: LelangBaruModalProps) => {
  const [isAccept, setIsAccept] = useState(false);
  const { isOpen, closeModal } = props;

  const closeThisModal = () => {
    setIsAccept(false);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeThisModal}
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
              <LelangBaruForms
                isAccept={isAccept}
                setIsAccept={setIsAccept}
                closeThisModal={closeThisModal}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LelangBaruModal;
