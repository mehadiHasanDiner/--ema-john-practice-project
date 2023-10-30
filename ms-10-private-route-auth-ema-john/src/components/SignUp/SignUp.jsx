import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { createUser } = useContext(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    setSuccess("");
    if (password !== confirm) {
      setError("Your password did not match");
      return;
    } else if (password.length < 6) {
      setError("Your password must be 6 characters long");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccess("User created successfully");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });

    setError(" ");
    form.reset();

    // console.log(email, password, confirm);
  };
  return (
    <div className="max-w-md mx-auto mt-16">
      <form
        className="bg-fuchsia-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSignUp}
      >
        <h3 className="text-xl text-center text-black font-bold">Sign Up</h3>
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
            required
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
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirm"
            type="password"
            placeholder="Your Password"
            name="confirm"
            required
          />
        </div>
        <p className="font-bold text-red-600 text-center mb-2">{error}</p>
        <p className="font-bold text-green-600 text-center mb-2">{success}</p>
        <div className="flex items-center justify-between">
          <button
            className="bg-purple-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <h3 className="text-center text-black mt-3">
          Already have an account?{" "}
          <Link to="/login">
            <span className="font-bold text-purple-700">Login</span>
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default SignUp;
