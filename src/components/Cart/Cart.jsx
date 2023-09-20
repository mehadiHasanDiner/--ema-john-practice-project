import React from "react";

const Cart = ({ addCart }) => {
  let totalPrice = 0;
  let totalShippingCost = 0;
  for (const product of addCart) {
    totalPrice = totalPrice + product.price;
    totalShippingCost = totalShippingCost + product.shipping;
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
            <td>{addCart.length}</td>
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
    </div>
  );
};

export default Cart;
