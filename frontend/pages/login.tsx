import axios from "axios";
import { NextPage } from "next";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

type Inputs = {
  username: string;
  password: string;
};

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const loginMutation = useMutation((data: any) => {
    return axios.post("http://localhost:8080/items", data, {headers: {Authorization : 'Bearer 6PZnoGZQAC5sZL4Zu7HPGH5z8M-Y584Y'}});
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newData = {
      name: data.username,
      description: data.password,
      open_bid: 4500000,
      fundraising: 1,
      created_at: 1635832481,
      updated_at: 1635832989,
      closing_time: 1638424481,
      user_id: 1
    }

    loginMutation.mutate(newData, {
      onError: (error) => console.log(error),
      onSuccess: (data) => console.log(data),
    });
  };

  React.useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
          "http://localhost:8080/users?username=asfian"
      );

      console.log(res.data);
    };

    fetch();
  });

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
                type="username"
                id="username"
                placeholder="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">
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
                <p className="mt-2 text-sm text-red-600">
                  <span className="font-medium">Oops!</span> Password are empty!
                </p>
              )}
            </div>
            <button
              type="submit"
              className="py-2 mt-4 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 "
            >
              Login
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
