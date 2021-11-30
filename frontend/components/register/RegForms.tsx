import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import nookies, { setCookie } from "nookies";
import { useRouter } from "next/router";
import { userContext } from "../../lib/contexts/userContext";
import { InformationCircleIcon } from "@heroicons/react/outline";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import {
  postRegister,
  RegisterInputs,
  RegisterResponse,
} from "../../lib/mutations/authMutations";
import {
  NewAccountInputs,
  NewAccountResponse,
  postNewAccount,
} from "../../lib/mutations/accountMutation";

interface InputType {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  password_repeat: string;
}

type reqStatusType = { loading: boolean; error: boolean; success: boolean };
interface RegFormsProps {
  req: {
    reqStatus: reqStatusType;
    setReqStatus: Dispatch<SetStateAction<reqStatusType>>;
  };
}

const schema = yup.object({
  first_name: yup.string().required("Required!"),
  last_name: yup.string().required("Required!"),
  email: yup.string().email("Email Invalid").required("Required!"),
  username: yup.string().required("Required!"),
  password: yup.string().min(6, "Too Sort!").required("Required!"),
  password_repeat: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match"),
});

const RegForms = (props: RegFormsProps) => {
  const { reqStatus, setReqStatus } = props.req;
  const { setUser } = useContext(userContext);
  const { formState, handleSubmit, register, reset } = useForm<InputType>({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const registerMutation = useMutation<
    RegisterResponse,
    AxiosError,
    RegisterInputs
  >((data) => postRegister(data));
  const newAccountMutation = useMutation<
    NewAccountResponse,
    AxiosError,
    NewAccountInputs
  >((data) => postNewAccount(data));

  const onSubmit: SubmitHandler<InputType> = (data) => {
    setReqStatus({ loading: true, error: false, success: false });
    console.log(data);

    const { username, password, password_repeat } = data;
    const { first_name, last_name, email } = data;

    const registerData = { username, password, password_repeat };
    const newAccountData = { first_name, last_name, email };

    registerMutation.mutate(registerData, {
      onError: (err) => {
        console.log(err.message);
        setReqStatus({ loading: false, error: true, success: false });
      },
      onSuccess: (user) => {
        const { id, access_token } = user;
        newAccountMutation.mutate(
          { ...newAccountData, user_id: id, access_token },
          {
            onError: (err) => {
              console.log(err.message);
              setReqStatus({ loading: false, error: true, success: false });
            },
            onSuccess: (account) => {
              console.log(account);
              const { id, username, user_id, is_master } = account;

              const cookieValue = `${user.access_token}&${account.id}&${username}`;
              setCookie(null, "token", cookieValue, {
                maxAge: 1 * 24 * 60 * 60,
                path: "/",
              });
              setUser({
                authenticated: true,
                data: { id, username, user_id, is_master, is_member: 1 },
              });
              setReqStatus({ loading: false, error: false, success: true });
            },
          }
        );
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        {/* FIRST_NAME */}
        <div className="">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            placeholder="First Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("first_name")}
          />
          {errors.first_name && (
            <p className="m-1 text-sm text-red-600">
              <span className="font-medium">Oops!</span>{" "}
              {errors.first_name.message}
            </p>
          )}
        </div>

        {/* LAST_NAME */}
        <div className="">
          <label
            htmlFor="last_name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            placeholder="Last Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("last_name")}
          />
          {errors.last_name && (
            <p className="mt-1 text-sm text-red-600">
              <span className="font-medium">Oops!</span>{" "}
              {errors.last_name.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div className="">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              <span className="font-medium">Oops!</span> {errors.email.message}
            </p>
          )}
        </div>

        {/* USERNAME */}
        <div className="">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("username")}
          />
          {errors.username && (
            <p className="m-1 text-sm text-red-600">
              <span className="font-medium">Oops!</span>{" "}
              {errors.username.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              <span className="font-medium">Oops!</span>{" "}
              {errors.password.message}
            </p>
          )}
        </div>

        {/* REPEAT_PASSWORD */}
        <div className="">
          <label
            htmlFor="password_repeat"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Ulangi Password
          </label>
          <input
            type="password"
            id="password_repeat"
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("password_repeat")}
          />
          {errors.password_repeat && (
            <p className="mt-1 text-sm text-red-600">
              <span className="font-medium">Oops!</span>{" "}
              {errors.password_repeat.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-row items-center justify-end w-full mt-2">
        <button
          type="submit"
          disabled={reqStatus.loading}
          className="w-1/5 px-8 py-2 mt-4 font-bold text-center text-white bg-blue-500 rounded-lg disabled:bg-blue-300 hover:bg-blue-600 "
        >
          {reqStatus.loading ? "Loading" : "Daftar"}
        </button>
      </div>

      {/* Error */}
      {reqStatus.error && (
        <div
          className="flex flex-row items-center p-4 mt-4 text-sm text-red-700 bg-red-100 rounded-lg"
          role="alert"
        >
          <InformationCircleIcon className="w-5 h-5 mr-3" />
          <span className="font-semibold">
            Something went wrong, please wait a minutes!
          </span>
        </div>
      )}
    </form>
  );
};

export default RegForms;
