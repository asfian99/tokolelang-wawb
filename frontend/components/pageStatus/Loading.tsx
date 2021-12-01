import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center my-4 space-x-2 animate-bounce">
      <div className="w-5 h-5 rounded-full bg-primary"></div>
      <div className="w-5 h-5 rounded-full bg-primary"></div>
      <div className="w-5 h-5 rounded-full bg-primary"></div>
    </div>
  );
};

export default Loading;
