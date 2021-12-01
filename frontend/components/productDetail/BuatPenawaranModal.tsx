import React, { Fragment, useState } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BadgeCheckIcon } from "@heroicons/react/outline";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { ItemResponse } from "../../lib/mutations/itemMutations";
import { formatRupiah } from "../../lib/formatCurrency";
import { useMutation, useQueryClient } from "react-query";
import {
  postTransaction,
  TransactionInputs,
  TransactionResponse,
} from "../../lib/mutations/transactionMutations";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
interface PenawaranModalProps {
  isOpen: boolean;
  closeModal: () => void;
  data: ItemResponse;
}

type InputType = { penawaran: number };

const schema = yup.object({
  penawaran: yup.number().required("Required!"),
});

const BuatPenawaranModal = (props: PenawaranModalProps) => {
  const { isOpen, closeModal } = props;
  const { slug } = useRouter().query;
  const queryClient = useQueryClient();
  const [isAccept, setIsAccept] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { handleSubmit, register, reset } = useForm<InputType>({
    resolver: yupResolver(schema),
  });

  const transactionMutation = useMutation<
    TransactionResponse,
    AxiosError,
    TransactionInputs
  >((data) => postTransaction(data));

  const reqStatusDefault = { loading: false, error: false, success: false };
  const [reqStatus, setReqStatus] = useState({ ...reqStatusDefault });

  const onSubmit: SubmitHandler<InputType> = (data) => {
    setReqStatus({ loading: true, error: false, success: false });
    const { bid_ratio, open_bid, id } = props.data;
    console.log(data);

    if (data.penawaran < open_bid) {
      setReqStatus({ loading: false, error: true, success: false });
      setErrorMsg("Penawaran kurang dari harga pembukaan!");
    } else if ((data.penawaran - open_bid) % bid_ratio !== 0) {
      setReqStatus({ loading: false, error: true, success: false });
      setErrorMsg("Penawaran tidak sesuai dengan kelipatan penawaran!");
    } else {
      const newTrans = { bid_value: data.penawaran, item_id: id };
      transactionMutation.mutate(newTrans, {
        onError: (err) => {
          console.log(err.message);
          setReqStatus({ loading: false, error: true, success: false });
        },
        onSuccess: (data) => {
          console.log(data);
          queryClient.invalidateQueries(`transaction_${slug}`);
          setReqStatus({ loading: false, error: false, success: true });
        },
      });
    }
  };

  const closeThisModal = () => {
    closeModal();
    reset();
    setIsAccept(false);
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
            <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-text-d"
                >
                  Buat Penawaran
                </Dialog.Title>

                <Dialog.Description as={Fragment}>
                  <div className="p-8">
                    {reqStatus.success ? (
                      <div className="flex flex-col items-center justify-center gap-4">
                        <BadgeCheckIcon className="w-24 h-24 text-primary" />
                        <h2 className="text-xl font-bold">
                          Penawaran Berhasil Dibuat!
                        </h2>
                      </div>
                    ) : (
                      <div className="mb-4 ">
                        <label
                          htmlFor="penawaran"
                          className="block mb-2 text-sm font-medium text-text-d"
                        >
                          Nilai Penawaran
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-l-lg text-text-d sm:text-sm">
                            Rp
                          </span>
                          <input
                            type="number"
                            id="penawaran"
                            placeholder={String(props.data.open_bid)}
                            className="rounded-l-none form-input form-input-text"
                            {...register("penawaran")}
                          />
                        </div>
                        {reqStatus.error && (
                          <p className="m-1 text-sm text-danger-d">
                            {errorMsg}
                          </p>
                        )}

                        <p className="mt-2 text-sm font-medium text-text-l">
                          Harga Pembukaan : {formatRupiah(props.data.open_bid)}
                        </p>
                        <p className="mb-2 text-sm font-medium text-text-l">
                          Kelipatan Penawaran :{" "}
                          {formatRupiah(props.data.bid_ratio)}
                        </p>
                      </div>
                    )}

                    {reqStatus.success || (
                      <div className="flex flex-row items-center gap-4">
                        <input
                          type="checkbox"
                          checked={isAccept}
                          onChange={() => setIsAccept(!isAccept)}
                          id="syaratKetentuan"
                          className="w-4 h-4 border border-gray-300 rounded text-primary form-checkbox bg-gray-50 focus:ring-3 focus:ring-primary-l"
                        />
                        <label
                          htmlFor="syaratKetentuan"
                          className="text-sm text-text-l"
                        >
                          Saya telah membaca & menyetujui{" "}
                          <Link href={`/syarat-ketentuan`}>
                            <a className="cursor-pointer text-primary hover:underline">
                              Syarat & Ketentuan
                            </a>
                          </Link>{" "}
                          sebelum membuat penawaran.
                        </label>
                      </div>
                    )}
                  </div>
                </Dialog.Description>

                <div className="flex flex-row justify-end gap-4 mt-4">
                  {reqStatus.success ? (
                    <button onClick={closeThisModal} className="btn-primary">
                      Tutup
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={closeThisModal}
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={!isAccept || reqStatus.loading}
                        className="btn-primary"
                      >
                        {reqStatus.loading ? "Loading..." : "Buat Penawaran"}
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BuatPenawaranModal;
