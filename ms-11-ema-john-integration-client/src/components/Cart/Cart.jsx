import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

const Cart = ({ addCart, handleClearCartFromDb, children }) => {
  let totalPrice = 0;
  let totalShippingCost = 0;
  let quantity = 0;
  for (const product of addCart) {
    // if (product.quantity === 0) {
    //   product.quantity = 1;
    // }
    // product.quantity = quantity || 1;

    totalPrice = totalPrice + product.price * product.quantity;
    totalShippingCost = totalShippingCost + product.shipping;
    quantity = quantity + product.quantity;
  }

  const tax = (totalPrice * 7) / 100;
  const grandTotal = totalPrice + totalShippingCost + tax;
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Items</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Items </td>
            <td>{quantity}</td>
          </tr>
          <tr>
            <td>Total Price</td>
            <td>${totalPrice}</td>
          </tr>
          <tr>
            <td>Total Shipping Charge</td>
            <td>${totalShippingCost}</td>
          </tr>
          <tr>
            <td>Tax </td>
            <td>${tax.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Grand Total </td>
            <td>${grandTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <div className="py-3 ">
        <button
          onClick={handleClearCartFromDb}
          className="w-full btn btn-error"
        >
          Clear Cart
          <span className="">
            <TrashIcon className="h-6 w-6 text-white" />
          </span>
        </button>
      </div>

      {children}
    </div>
  );
};

export default Cart;
