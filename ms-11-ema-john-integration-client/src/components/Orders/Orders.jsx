import React, { useState } from "react";
import Cart from "../Cart/Cart";
import { Link, useLoaderData } from "react-router-dom";
import ReviewItem from "../ReviewItem/ReviewItem";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb2";
import { CreditCardIcon } from "@heroicons/react/24/solid";

const Orders = () => {
  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);
  // console.log(savedCart);

  const handleRemoveFromCart = (id) => {
    // console.log(id);
    const remaining = cart.filter((pd) => pd._id !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  const handleClearCartFromDb = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div>
      <div className="ml-4 mt-2">
        {cart.map((product) => (
          <ReviewItem
            key={product._id}
            product={product}
            handleRemoveFromCart={handleRemoveFromCart}
          ></ReviewItem>
        ))}
      </div>
      <div className="px-4 bg-fuchsia-900 mx-4 md:w-1/4 leading-normal  md:fixed top-0 right-0 mt-20">
        <h3 className="text-center font-bold text-xl py-4">Cart Container</h3>
        <h4 className="text-center font-bold text-md ">
          Product Added: {savedCart.length}
        </h4>
        <Cart addCart={cart} handleClearCartFromDb={handleClearCartFromDb}>
          <div className="pb-4 ">
            <Link to="/checkout">
              <button className="w-full btn btn-success">
                Checkout{" "}
                <span className="">
                  <CreditCardIcon className="h-6 w-6 text-white" />
                </span>
              </button>
            </Link>
          </div>
        </Cart>
      </div>
    </div>
  );
};

/*
** কোনো একটি জিনিন যখন Add, remove or change করব তখন জিনিসটাকে state রাখতে হয়।

*/

export default Orders;
