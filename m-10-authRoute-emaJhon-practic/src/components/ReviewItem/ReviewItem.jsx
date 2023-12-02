import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

const ReviewItem = ({ product, handleRemoveFromCart }) => {
  const { id, img, price, name, quantity } = product;
  return (
    <div className="w-[calc(100vh-(50px))] flex items-center justify-center ">
      <div className=" border-red-400 border-spacing-6 border-2 mt-2 p-1 rounded-md w-[400px] flex items-center">
        <div>
          <img className="w-28  rounded-md" src={img} alt="" />
        </div>
        <div className="grow px-2">
          <p className="font-bold text-lg">{name}</p>
          <p>
            Price: <span className="text-orange-500">${price}</span>
          </p>
          <p>
            Quantity: <span className="text-orange-500">{quantity}</span>
          </p>
        </div>
        <div className="rounded-full bg-white p-2 mr-1">
          <span onClick={() => handleRemoveFromCart(id)}>
            <TrashIcon className="h-6 w-6 text-orange-600" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
