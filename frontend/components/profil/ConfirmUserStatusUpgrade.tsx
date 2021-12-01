import React, { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
import {
  NewAccountResponse,
  upgradeAccountStatus,
} from "../../lib/mutations/accountMutation";
import { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AccountResponse } from "../../lib/queries/accountQueries";
import { userContext } from "../../lib/contexts/userContext";
import { useRouter } from "next/router";

interface ConfirmUserStatusUpgradeProps {
  data: AccountResponse;
  modal: { isOpen: boolean; closeModal: () => void };
}

const ConfirmUserStatusUpgrade = (props: ConfirmUserStatusUpgradeProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user, setUser } = useContext(userContext);
  const [isAccept, setIsAccept] = useState(false);
  const reqStatusDefault = { loading: false, error: false, success: false };
  const [reqStatus, setReqStatus] = useState({ ...reqStatusDefault });

  const upgradeAccountMutation = useMutation<
    NewAccountResponse,
    AxiosError,
    null
  >(() => upgradeAccountStatus());

  const clickHandler = () => {
    setReqStatus({ loading: false, error: false, success: false });

    upgradeAccountMutation.mutate(null, {
      onError: (err) => {
        console.log(err.message);
        setReqStatus({ loading: false, error: true, success: false });
      },
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(`profile_${data.username}`);
        setUser({
          authenticated: true,
          data: { ...user.data, is_master: 1 },
        });
        setReqStatus({ loading: false, error: false, success: true });
      },
    });
  };

  const reloadHandler = () => router.reload();

  return (
    <Transition appear show={props.modal.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={props.modal.closeModal}
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
              <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-text-d"
              >
                Konfirmasi Upgrade User Status
              </Dialog.Title>

              <Dialog.Description as={Fragment}>
                <div className="my-8">
                  {reqStatus.success ? (
                    <h4 className="font-medium text-gray-700">
                      Selamat! Anda menjadi User Master.
                    </h4>
                  ) : (
                    <>
                      <p className="text-gray-700">
                        Apakah anda yakin ingin upgrade menjadi user Master?
                        Pastikan anda telah membaca syarat & ketentuan
                      </p>

                      <div className="flex flex-row items-center gap-4 mt-5">
                        <input
                          type="checkbox"
                          checked={isAccept}
                          onChange={() => setIsAccept(!isAccept)}
                          id="syaratKetentuan"
                          className="w-4 h-4 border border-gray-300 rounded text-primary form-checkbox bg-gray-50 focus:ring-3 focus:ring-primary-l"
                        />
                        <label
                          htmlFor="syaratKetentuan"
                          className="text-sm text-gray-500"
                        >
                          Saya telah membaca & menyetujui{" "}
                          <Link href={`/syarat-ketentuan`}>
                            <a className="cursor-pointer text-primary hover:underline">
                              Syarat & Ketentuan.
                            </a>
                          </Link>{" "}
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </Dialog.Description>

              <div className="flex flex-row justify-end gap-4 mt-4">
                {reqStatus.success ? (
                  <button onClick={reloadHandler} className="btn-primary">
                    Muat Ulang
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={props.modal.closeModal}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      onClick={clickHandler}
                      disabled={!isAccept || reqStatus.loading}
                      className="btn-primary"
                    >
                      {reqStatus.loading ? "Loading..." : "Ya, Saya Yakin"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmUserStatusUpgrade;
