import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const fakePhoto = "https://source.unsplash.com/user/c_v_r";

const Product = (props) => {
  const { name, img, price, seller } = props.product;
  // console.log(props.product)
  const handleAddToCart = props.handleAddToCart;

  return (
    <div className="card card-compact w-full bg-base-100 shadow-2xl bg-fuchsia-900 relative h-[420px]">
      <figure>
        <img src={img ? img : fakePhoto} alt="Shoes" />
      </figure>
      <div className="card-body flex-grow-0">
        <h3 className="card-title text-sm">{name}</h3>
        <p>Price: {price}</p>
        <p>Seller: {seller}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleAddToCart(props.product)}
            className=" btn bg-accent w-full absolute bottom-0 left-0 rounded-tr-none rounded-tl-none rounded-br-xl rounded-bl-xl"
          >
            Add to cart
            <span>
              <ShoppingCartIcon className="h-6 w-6 " />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
