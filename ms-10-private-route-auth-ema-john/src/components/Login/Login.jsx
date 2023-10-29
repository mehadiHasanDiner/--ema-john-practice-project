import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="max-w-md mx-auto mt-16">
      <form
        className="bg-fuchsia-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl text-center text-black font-bold">Login</h3>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Your Email"
            name="email"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Your Password"
            name="password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-purple-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
        <h3 className="text-center text-black mt-3">
          New to Ema-John?{" "}
          <Link to="/signUp">
            <span className="font-bold text-purple-700">Create an Account</span>
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default Login;
