import React from "react";
import Login from "../components/Login";

export const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Login Page</h1>
      <Login />
    </div>
  );
};

export default LoginPage;
