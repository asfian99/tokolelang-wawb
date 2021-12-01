import React, { useState, Fragment, useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  cancelTransaction,
  TransactionUserResponse,
} from "../../lib/mutations/transactionMutations";
import { Dialog, Transition } from "@headlessui/react";
import { AxiosError } from "axios";
import { userContext } from "../../lib/contexts/userContext";

interface BatalkanPenawaranModalProps {
  isOpen: boolean;
  closeModal: () => void;
  data: TransactionUserResponse;
}

const BatalkanPenawaranModal = (props: BatalkanPenawaranModalProps) => {
  const { isOpen, closeModal } = props;
  const queryClient = useQueryClient();
  const { user } = useContext(userContext);

  const reqStatusDefault = { loading: false, error: false, success: false };
  const [reqStatus, setReqStatus] = useState({ ...reqStatusDefault });

  const cancelTransMutation = useMutation<null, AxiosError, number>((iid) =>
    cancelTransaction(iid)
  );

  const clickHandler = () => {
    setReqStatus({ loading: true, error: false, success: false });

    cancelTransMutation.mutate(props.data.id, {
      onError: (err) => {
        console.log(err.message);
        setReqStatus({ loading: false, error: true, success: false });
      },
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(`transaction_${user.data.username}`);
        setReqStatus({ loading: false, error: false, success: true });
        closeThisModal();
      },
    });
  };

  const closeThisModal = () => {
    closeModal();
    setReqStatus({ ...reqStatusDefault });
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
                Konfirmasi Pembatalan Penawaran
              </Dialog.Title>

              <Dialog.Description as={Fragment}>
                <div className="my-8">
                  <p className="text-gray-700">
                    Apakah anda yakin ingin membatalkan penawaran?
                  </p>
                </div>
              </Dialog.Description>

              <div className="flex flex-row justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={closeThisModal}
                >
                  Tidak
                </button>
                <button
                  type="submit"
                  onClick={clickHandler}
                  disabled={reqStatus.loading}
                  className="px-8 btn-danger"
                >
                  {reqStatus.loading ? "Loading..." : "Ya"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BatalkanPenawaranModal;
