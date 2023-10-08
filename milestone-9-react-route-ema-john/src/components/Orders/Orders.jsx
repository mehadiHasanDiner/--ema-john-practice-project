import React from "react";
import Cart from "../Cart/Cart";
import { useLoaderData } from "react-router-dom";

const Orders = () => {
  const cart = useLoaderData();
  // console.log(products);
  return (
    <div>
      <div>
        <h1>Order page: {cart.length} </h1>
      </div>
      <div className="px-4 bg-fuchsia-900 mx-4 w-1/4 leading-normal fixed top-0 right-0 mt-16">
        <h3 className="text-center font-bold text-xl py-4">Cart Container</h3>
        <h4 className="text-center font-bold text-md ">
          Product Added: {cart.length}
        </h4>
        <Cart addCart={cart}></Cart>
      </div>
    </div>
  );
};

export default Orders;
