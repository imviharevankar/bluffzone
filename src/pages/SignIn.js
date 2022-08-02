import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signin } from "../redux/actions/authActions";
import logo from "../assets/images/logo/bluffzone-logo.png";

const SignIn = () => {
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const signInUser = (e) => {
    e.preventDefault();
    dispatch(signin(user));
  };

  return auth?._id ? (
    <Navigate to="/" />
  ) : (
    <div className="flex h-[90vh] mx-auto justify-center items-center">
      <div className="a max-w-[500px] w-11/12 inset-y-24">
        {/* <div className="border border-black w-1/3 h-[100px]">
          <img src={logo} alt="bluffzone-logo" />
        </div> */}

        {/* <p className="text-3xl inset-y-1">Sign In</p> */}
        <form className="w-full border border-gray-100 max-w-lg bg-white shadow-md rounded">
          <div className="px-3 mb-6 md:mb-0">
            <label className="form__label" for="grid-first-name">
              Email
            </label>
            <input
              type="text"
              className="form__input"
              placeholder="bluffster"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />

            {/* <p class="form__error">Please fill out this field.</p> */}
          </div>
          <div className="px-3 mb-6 md:mb-0">
            <label className="form__label">Password</label>

            <input
              type="password"
              className="form__input"
              placeholder="********"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <div className="px-3 mb-6 md:mb-0">
            <button
              onClick={(e) => signInUser(e)}
              className="form__button w-[100%] focus:outline-none focus:shadow-outline mb-5 button__effect"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-right">
          <a href="/sign-up" className="underline">
            Create an Account?
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
