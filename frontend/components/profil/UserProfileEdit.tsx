import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AccountResponse } from "../../lib/queries/accountQueries";

interface UserProfileEditProps {
  modal: { isOpen: boolean; closeModal: () => void };
}

const UserProfileEdit = (props: UserProfileEditProps) => {
  const { modal } = props;
  return (
    <Transition appear show={modal.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={modal.closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg" />
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
            enter="ease-out duration-150"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-text-d"
              >
                Mohon Maaf
              </Dialog.Title>

              <Dialog.Description as={Fragment}>
                <div className="my-4">
                  <p className="text-gray-600">
                    Fitur sedang dalam pengembangan
                  </p>
                </div>
              </Dialog.Description>

              <div className="flex flex-row justify-end gap-4 mt-4">
                <button onClick={modal.closeModal} className="btn-primary">
                  Tutup
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UserProfileEdit;
