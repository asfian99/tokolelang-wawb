import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

const Login: NextPage = () => {
  React.useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:8080/v1/post", {
        method: "GET",
      });

      console.log(res.data);
      return res.data;
    };

    fetch();
  }, []);

  return (
    <div className="flex flex-row items-center justify-center min-h-[80vh]">
      <div className="px-24 py-24 border-2 border-gray-300 rounded-lg">
        <form>
          <div className="grid grid-cols-1 gap-4">
            <input
              className="w-full px-3 py-1 border-2 border-gray-200 rounded-lg "
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
            <input
              className="w-full px-3 py-1 border-2 border-gray-200 rounded-lg "
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <button
              type="submit"
              className="py-2 mt-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 "
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
