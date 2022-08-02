import React from "react";

const ActionCard = () => {
  return (
    <div className="flex flex-col space-x-5 items-center">
      <div className="px-4 py-2 border rounded-full hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out cursor-pointer">
        ADD TO HISTORY
      </div>
      <div className="px-4 py-2 border rounded-full hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out cursor-pointer">
        ADD TO WATCHLIST
      </div>
    </div>
  );
};

export default ActionCard;
