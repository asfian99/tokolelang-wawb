import { InformationCircleIcon } from "@heroicons/react/outline";
import React from "react";

const RequestFailed = () => {
  return (
    <div
      className="flex flex-row items-center p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg"
      role="alert"
    >
      <InformationCircleIcon className="w-5 h-5 mr-3" />
      <span className="font-semibold">OOPS! Request Failed</span>
    </div>
  );
};

export default RequestFailed;
