import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then((result) => {})
      .catch((error) => console.error(error));
  };
  return (
    <>
      <nav className="bg-fuchsia-300 sticky top-0 z-10 flex justify-between items-center px-8">
        <div>
          <h3 className="text-3xl font-bold text-black text-center mb-4 p-2">
            Ema-John App
          </h3>
        </div>
        <div className="text-black">
          <Link className="mr-2" to="/">
            Shop
          </Link>
          <Link className="mr-2" to="/orders">
            Orders
          </Link>
          <Link className="mr-2" to="/inventory">
            Inventory
          </Link>
          {user && (
            <Link className="mr-2" to="/profile">
              Profile
            </Link>
          )}
          {user && (
            <>
              Welcome{" "}
              <span className="text-center font-bold">{user.email}</span>
            </>
          )}
          {user ? (
            <button className="btn btn-xs" onClick={handleLogout}>
              Sign Out
            </button>
          ) : (
            <Link className="mr-2" to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
