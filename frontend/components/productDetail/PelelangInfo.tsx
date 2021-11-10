import React from "react";
import {
  TicketIcon,
  LocationMarkerIcon,
  UserIcon,
} from "@heroicons/react/outline";

const PelelangInfo = () => {
  return (
    <div className="grid items-center justify-between grid-cols-3 p-4 mb-6 bg-gray-100 border-2 border-gray-300 divide-x-2 divide-gray-300 rounded-2xl">
      <div className="flex flex-col items-start justify-center pl-6">
        <div className="flex flex-row items-center gap-2">
          <LocationMarkerIcon className="w-4 h-4" />
          <h4 className="text-base">Lokasi</h4>
        </div>
        <p className="text-lg font-semibold">Surabaya</p>
      </div>

      <div className="flex flex-col items-start justify-center pl-6">
        <div className="flex flex-row items-center gap-2">
          <UserIcon className="w-4 h-4" />
          <h4 className="text-base">Pelelang</h4>
        </div>
        <p className="text-lg font-semibold">asfian99</p>
      </div>

      <div className="flex flex-col items-start justify-center pl-6">
        <div className="flex flex-row items-center gap-2">
          <TicketIcon className="w-4 h-4" />
          <h4 className="text-base">Event</h4>
        </div>
        <p className="text-lg font-semibold">-</p>
      </div>
    </div>
  );
};

export default PelelangInfo;
