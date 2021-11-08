import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postLogin } from "../lib/mutations/authMutations";
import type {
  LoginInputs,
  LoginResponse,
} from "../lib/mutations/authMutations";
import { getAccountDetail } from "../lib/queries/accountQueries";
import { setCookie } from "nookies";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();
  const { formState, handleSubmit, register, reset } = useForm<LoginInputs>();
  const { errors } = formState;

  const [reqStatus, setReqStatus] = useState({ loading: false, error: false });

  const loginMutation = useMutation<LoginResponse, AxiosError, LoginInputs>(
    (data) => postLogin(data)
  );

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    setReqStatus({ loading: true, error: false });
    // const newData = {...data}

    loginMutation.mutate(data, {
      onError: (error) => {
        console.log(error.message);
        setReqStatus({ loading: false, error: true });
      },
      onSuccess: async (data) => {
        const account = await getAccountDetail(data);

        console.log(data);
        console.log(account);

        setCookie(null, "token", data.access_token, {
          maxAge: 1 * 24 * 60 * 60,
          path: "/",
        });

        setReqStatus({ loading: false, error: false });
        // redirect
        router.replace("/lelang-terbuka");
      },
    });
  };

  return (
    <div className="flex flex-row items-center justify-center min-h-[80vh]">
      <div className="w-1/2 px-12 py-12 border-2 border-gray-300 rounded-lg md:w-1/3">
        <h2 className="mb-4 text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <div className="">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="m-1 text-sm text-red-600">
                  <span className="font-medium">Oops!</span> Username are empty!
                </p>
              )}
            </div>

            <div className="">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  <span className="font-medium">Oops!</span> Password are empty!
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={reqStatus.loading}
              className="py-2 mt-4 font-bold text-white bg-blue-500 rounded-lg disabled:bg-blue-300 hover:bg-blue-600 "
            >
              {reqStatus.loading ? "Loading" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

// export const getServerSideProps: GetServerSideProps = async (context) => {

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// };
