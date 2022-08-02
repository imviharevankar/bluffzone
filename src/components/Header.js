import React from "react";
import { SearchIcon, UserIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router";
import { useModal } from "../contexts/ModalContext";
import { useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import logo from "./../assets/images/logo/bluffzone-logo.png";

const Header = () => {
  const { openSearch, setOpenSearch } = useModal();
  const user = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  return (
    <div className="sticky xsm:px-1 px-5 h-12 top-0 shadow-lg  z-10">
      <div className="flex items-center justify-between">
        <IconButton
          onClick={() => {
            setOpenSearch(!openSearch);
            window.scrollTo(0, 0);
          }}
        >
          <SearchIcon className="h-6 cursor-pointer text-gray-500" />
        </IconButton>

        <div className="relative">
          <img
            onClick={() => navigate("/")}
            src={logo}
            // src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2015%2F04%2F05%2Ffeatured.jpg&q=85"
            className="object-fill relative h-12 cursor-pointer border-2 border-black"
            alt="app-logo"
          />
        </div>
        <div>
          {user._id ? (
            <IconButton onClick={() => navigate("/user")}>
              <UserIcon className="h-6 cursor-pointer text-gray-500" />
            </IconButton>
          ) : (
            <div className="space-x-5">
              <button
                className="bg-[#00FFA4]
               button__effect
                text-white font-bold py-2 px-4 rounded temporary-bounce"
                onClick={() => navigate("/sign-in")}
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
