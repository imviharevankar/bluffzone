import React from "react";
import { useData } from "../contexts/DataContext";

const VerticalNav = () => {
  const { setIsLogged } = useData();
  return (
    <div
      className=" tooltip cursor-pointer border z-10
    bg-red-200  border-blue-800 shadow-lg absolute right-1"
    >
      <ul>
        <li className="px-2  hover:bg-gray-200">Dashboard</li>
        <li className="px-2 my-2 hover:bg-gray-200">Profile</li>
        <li className="px-2 my-2 hover:bg-gray-200">Stats</li>
        <li
          onClick={() => setIsLogged(false)}
          className="px-2 my-2 hover:bg-gray-200"
        >
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default VerticalNav;
