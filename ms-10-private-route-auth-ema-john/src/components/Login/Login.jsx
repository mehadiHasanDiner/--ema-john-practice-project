import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { userSignIn } = useContext(AuthContext);
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const from = location.state?.from?.pathname || "/";
  console.log(from);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    userSignIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccess("You have successfully Login");
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
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
            type={show ? "text" : "password"}
            placeholder="Your Password"
            name="password"
          />
          <p
            className="text-black cursor-pointer"
            onClick={() => setShow(!show)}
          >
            {show ? <span>Hide Password</span> : <span>Show Password</span>}
          </p>
        </div>
        <p className="font-bold text-green-600 text-center mb-2">{success}</p>
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
