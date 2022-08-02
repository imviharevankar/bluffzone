import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-96 border-2 border-blue-900 w-full bg-red-700">
      <h1>Page Not Found</h1>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
};

export default PageNotFound;
