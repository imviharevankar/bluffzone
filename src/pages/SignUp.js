import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signup } from "../redux/actions/authActions";

const SignUp = () => {
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  console.log(auth);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerUser = (e) => {
    e.preventDefault();
    dispatch(signup(user));
    setUser({ username: "", email: "", password: "" });
  };

  return auth?._id ? (
    <Navigate to="/" />
  ) : (
    <div>
      <p>Sign Up</p>
      <form className="flex flex-col space-y-5 items-center">
        <input
          type="username"
          placeholder="Username"
          className="w-1/2"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-1/2"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          className="w-1/2"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button onClick={(e) => registerUser(e)} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
