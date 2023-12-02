import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import googleLogo from "../../assets/google.png";
import { AuthContext } from "../../provider/AuthProvider";

const Login = () => {
  const [error, setError] = useState(" ");
  const [success, setSuccess] = useState(" ");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { userSignIn } = useContext(AuthContext);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    userSignIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccess("You have successfully Logged In");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
    form.reset();
  };
  return (
    <div>
      <div className="max-w-md mx-auto mt-4">
        <h1 className="text-3xl font-bold text-white text-center mb-4 p-2">
          Login
        </h1>
        <form
          onSubmit={handleOnSubmit}
          className="bg-white shadow-md  px-8 pt-6 pb-4 "
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              name="password"
              required
            />
            <span
              className="cursor-pointer"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <>Hide Password</> : <>Show Password</>}
            </span>
          </div>
          <p className="text-red-600 text-center mb-3">{error}</p>
          <p className="text-green-600 text-center mb-3">{success}</p>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center bg-white py-3 ">
          <button className="hover:bg-blue-500 text-black font-bold py-2 px-4 rounded border-blue-300 border-2 focus:outline-none focus:shadow-outline">
            <img
              src={googleLogo}
              alt="Google Logo"
              className="w-6 h-6 mr-2 inline"
            />
            Sign in with Google
          </button>
        </div>
      </div>
      <div className="text-center mt-3">
        Don't Have an Account?{" "}
        <span className="font-bold text-pink-500">
          <Link to="/register">Please Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
